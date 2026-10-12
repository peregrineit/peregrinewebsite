#!/usr/bin/env python3
"""Weekly SEO report from Google Search Console exports. Stdlib only.

Drop Search Console "Performance" exports into one folder and run:

    python3 scripts/gsc_report.py ~/gsc-exports --out docs/growth/systems/reports/gsc-YYYY-MM-DD.md

Accepted inputs, any mix, any number of dated exports:
  * the .xlsx that "Export -> Download Excel" produces (sheets Chart/Dates, Queries, Pages,
    Countries, Devices, Search appearance, Filters)
  * the .zip that "Export -> Download CSV" produces (Chart.csv, Queries.csv, Pages.csv, ...)
  * a sub-folder holding those CSVs unzipped

Two kinds of export are understood:
  * site-wide (no Page or Query filter): totals, top pages, top queries, countries.
  * page-filtered (Performance -> + New -> Page -> exact URL, then Export): its Queries sheet is
    the only place Search Console says which query belongs to which URL. Cannibalization and
    "next edits by page" need these; without them the report says so instead of guessing.

Exit codes: 0 report written, 2 no usable export or bad arguments.
"""
import argparse, csv, datetime as dt, html, io, math, os, re, sys, zipfile
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = "https://peregrine-it.com"

# ---- stated thresholds (every one is printed in the report) ---------------------------------
EXPERIMENT_THRESHOLD = 300   # impressions after a title change before a verdict (docs/seo/MONITORING.md)
MIN_IMPR_CTR = 100           # below this, a page's click-through rate is not judged
MIN_IMPR_POSITION = 20       # below this, an average position is marked as a small sample
MIN_IMPR_SHARE = 100         # below this, country shares are marked as a small sample
AI_QUERY_WORDS = 7           # queries this long are treated as AI-surface fan-out, not typed searches
NEXT_EDIT_RANGE = (8.0, 20.0)
REVERT_POSITION_DROP = 3.0   # MONITORING.md: revert a title whose position drops by more than 3 with no CTR gain
UNDERPERFORM_P = 0.10        # Poisson tail probability below which a page is called under-clicked
DEFAULT_EXPERIMENTS_START = "2026-10-10"   # first full day after the seven titles went live (PR #7)

# Position -> expected click-through rate. AN ESTIMATE: round numbers in the range of commonly
# published organic-search curves, not measured for this site. Linear between whole positions.
CTR_CURVE = {1: 0.27, 2: 0.15, 3: 0.10, 4: 0.07, 5: 0.055, 6: 0.042, 7: 0.033, 8: 0.027, 9: 0.023, 10: 0.020}
CTR_PAGE_2, CTR_BEYOND = 0.010, 0.002   # positions 11-20, and past 20

# Mirrors "Pairs to watch" in docs/seo/MONITORING.md (scripts/test_gsc_report.py checks they agree).
WATCH_GROUPS = [
    ("MLS cost guide and calculator", ["/blog/mls-idx-integration-cost", "/tools/mls-idx-cost-calculator"]),
    ("MLS data access: US and Canada guides", ["/blog/how-to-get-mls-data-access", "/blog/mls-data-access-canada"]),
    ("Investor portal: service page and case study", ["/services/investor-portal-development", "/case-studies/proptech-investor-portal"]),
    ("Self-storage: industry page, case study, build-or-buy guide",
     ["/industries/self-storage", "/case-studies/self-storage-management-platform", "/blog/self-storage-software-build-vs-buy"]),
    ("React and Next.js service pages", ["/services/react-development", "/services/nextjs-development"]),
]
WATCH_TERMS = ["mls", "idx", "investor portal", "self storage", "odoo"]

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
      "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
      "p": "http://schemas.openxmlformats.org/package/2006/relationships"}


# ---- reading exports ------------------------------------------------------------------------
def _col_index(ref):
    n = 0
    for ch in re.match(r"[A-Z]+", ref).group(0):
        n = n * 26 + ord(ch) - 64
    return n - 1


def read_xlsx(path):
    """Return {sheet name: [[cell, ...], ...]} from an .xlsx using zipfile + ElementTree."""
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
        shared = []
        if "xl/sharedStrings.xml" in names:
            for si in ET.fromstring(z.read("xl/sharedStrings.xml")).findall("m:si", NS):
                shared.append("".join(t.text or "" for t in si.iter("{%s}t" % NS["m"])))
        rels = {r.get("Id"): r.get("Target") for r in ET.fromstring(z.read("xl/_rels/workbook.xml.rels")).findall("p:Relationship", NS)}
        sheets = {}
        for s in ET.fromstring(z.read("xl/workbook.xml")).find("m:sheets", NS):
            target = rels[s.get("{%s}id" % NS["r"])]
            target = target.lstrip("/") if target.startswith("/") else "xl/" + target
            rows = []
            for row in ET.fromstring(z.read(target)).iter("{%s}row" % NS["m"]):
                cells = []
                for c in row.findall("m:c", NS):
                    i = _col_index(c.get("r")) if c.get("r") else len(cells)
                    v = c.find("m:v", NS)
                    if c.get("t") == "s" and v is not None: val = shared[int(v.text)]
                    elif c.get("t") == "inlineStr": val = "".join(t.text or "" for t in c.iter("{%s}t" % NS["m"]))
                    else: val = v.text if v is not None and v.text is not None else ""
                    while len(cells) < i: cells.append("")
                    cells.append(val)
                rows.append(cells)
            sheets[s.get("name")] = rows
        return sheets


def _csv_rows(data):
    return [r for r in csv.reader(io.StringIO(data.decode("utf-8-sig"))) if r]


def read_csv_zip(path):
    with zipfile.ZipFile(path) as z:
        return {os.path.splitext(os.path.basename(n))[0]: _csv_rows(z.read(n)) for n in z.namelist() if n.lower().endswith(".csv")}


def read_csv_dir(path):
    out = {}
    for n in sorted(os.listdir(path)):
        if n.lower().endswith(".csv"):
            with open(os.path.join(path, n), "rb") as f: out[os.path.splitext(n)[0]] = _csv_rows(f.read())
    return out


def num(v):
    v = (v or "").strip().replace(",", "")
    if not v: return 0.0
    if v.endswith("%"): return float(v[:-1]) / 100.0
    try: return float(v)
    except ValueError: return 0.0


def clean(s):
    return " ".join(html.unescape(s or "").split())


def table(rows):
    """[[key, clicks, impressions, ctr, position], ...] with a header -> list of dicts."""
    out = []
    if not rows: return out
    head = [h.strip().lower() for h in rows[0]]
    want = ["clicks", "impressions", "ctr", "position"]
    if not all(w in head for w in want): return None      # compare-mode or unknown layout
    idx = {w: head.index(w) for w in want}
    for r in rows[1:]:
        r = r + [""] * (len(head) - len(r))
        if not clean(r[0]): continue
        out.append({"key": clean(r[0]), "clicks": num(r[idx["clicks"]]), "impressions": num(r[idx["impressions"]]),
                    "ctr": num(r[idx["ctr"]]), "position": num(r[idx["position"]])})
    return out


class Export:
    def __init__(self, path, sheets):
        self.path, self.name = path, os.path.basename(path.rstrip("/"))
        low = {k.lower(): v for k, v in sheets.items()}
        self.problem = None
        self.filters = {clean(r[0]).lower(): clean(r[1]) for r in low.get("filters", [])[1:] if len(r) > 1}
        chart_rows = low.get("chart") or low.get("dates") or []
        self.chart = table(chart_rows) if chart_rows else []
        self.queries, self.pages = table(low.get("queries", [])), table(low.get("pages", []))
        self.countries, self.devices = table(low.get("countries", [])), table(low.get("devices", []))
        if "queries" not in low and "pages" not in low:
            self.problem = "not a Performance export (no Queries or Pages sheet)"
        elif None in (self.chart, self.queries, self.pages, self.countries):
            self.problem = "unrecognised columns (a compare-mode export?); export one date range at a time"
        m = re.search(r"(\d{4}-\d{2}-\d{2})", self.name)
        self.export_date = m.group(1) if m else dt.date.fromtimestamp(os.path.getmtime(path)).isoformat()
        self.hourly, self.start, self.end, self.days = False, None, None, 0
        if not self.problem:
            stamps = [r["key"] for r in self.chart]
            self.hourly = any("T" in s for s in stamps)
            dates = sorted({s[:10] for s in stamps if re.match(r"\d{4}-\d{2}-\d{2}", s)})
            if dates:
                self.start, self.end = dates[0], dates[-1]
                self.days = (dt.date.fromisoformat(self.end) - dt.date.fromisoformat(self.start)).days + 1
            else:
                self.problem = "no dated rows in the Chart sheet"
        # Scope: site-wide unless the Filters sheet names a page or a query.
        self.scope, self.scope_value = "site", ""
        for k, v in self.filters.items():
            v2 = re.sub(r"^[+\-=~*\s]+", "", v)
            if k in ("page", "pages", "url", "top pages"): self.scope, self.scope_value = "page", v2
            elif k in ("query", "queries", "top queries"): self.scope, self.scope_value = "query", clean(v2).lower()
            elif k in ("country", "device", "search appearance"): self.scope, self.scope_value = "other", f"{k}: {v}"
        self.role = ""

    # Totals come from the Chart sheet, which is complete; the Queries sheet is not (anonymised
    # and low-volume queries are dropped), so the two are never reconciled.
    def totals(self, since=None):
        rows = [r for r in self.chart if since is None or r["key"][:10] >= since]
        imp, clk = sum(r["impressions"] for r in rows), sum(r["clicks"] for r in rows)
        pos = sum(r["position"] * r["impressions"] for r in rows) / imp if imp else 0.0
        return {"clicks": clk, "impressions": imp, "ctr": clk / imp if imp else 0.0, "position": pos}

    def window(self):
        return f"{self.start} to {self.end} ({self.days} d)" if self.start else "-"

    def filter_text(self):
        return "; ".join(f"{k}: {v}" for k, v in self.filters.items()) or "none recorded"


def load_folder(folder):
    exports = []
    for name in sorted(os.listdir(folder)):
        path = os.path.join(folder, name)
        if name.startswith((".", "~$")): continue
        try:
            if os.path.isdir(path):
                sheets = read_csv_dir(path)
                if not sheets: continue
            elif name.lower().endswith(".xlsx"): sheets = read_xlsx(path)
            elif name.lower().endswith(".zip"): sheets = read_csv_zip(path)
            else: continue
        except (zipfile.BadZipFile, KeyError, ET.ParseError, UnicodeDecodeError) as e:
            ex = Export.__new__(Export); ex.path, ex.name, ex.problem = path, name, f"unreadable ({type(e).__name__})"
            ex.role, ex.filters, ex.start, ex.end, ex.days, ex.scope, ex.hourly = "", {}, None, None, 0, "site", False
            ex.export_date = ""; exports.append(ex); continue
        exports.append(Export(path, sheets))
    return exports


def assign_roles(exports):
    """Pick the current and previous site-wide exports; mark duplicates, hourly and filtered ones."""
    site, seen = [], {}
    for e in exports:
        if e.problem: e.role = "ignored: " + e.problem; continue
        if e.scope == "page": e.role = "page-filtered"; continue
        if e.scope == "query": e.role = "query-filtered"; continue
        if e.scope == "other": e.role = "ignored: filtered by " + e.scope_value; continue
        if e.hourly: e.role = "hourly: listed only, not used for totals"; continue
        key = (e.start, e.end)
        if key in seen:
            keep = seen[key]
            if e.export_date > keep.export_date: keep.role = f"duplicate of {e.name} (same window)"; site.remove(keep); seen[key] = e; site.append(e)
            else: e.role = f"duplicate of {keep.name} (same window)"
            continue
        seen[key] = e; site.append(e)
    if not site: return None, None, []
    site.sort(key=lambda e: (e.end, e.days))
    latest = [e for e in site if e.end == site[-1].end]
    # Week over week: prefer the latest window that has an earlier window of the same length and
    # no overlap to compare with; otherwise take the longest latest window.
    current = previous = None
    for cand in sorted(latest, key=lambda e: e.days):
        match = [e for e in site if e.end < cand.start and e.days == cand.days]
        if match: current, previous = cand, match[-1]; break
    if current is None:
        current = latest[-1]
        older = [e for e in site if e.end < current.end]
        if older:
            clean_prev = [e for e in older if e.end < current.start]
            previous = (clean_prev or older)[-1]
    current.role = "CURRENT"
    if previous: previous.role = "PREVIOUS"
    for e in site:
        if not e.role: e.role = "site-wide: shorter or older window, used only for title experiments if after the change"
    return current, previous, site


# ---- arithmetic -----------------------------------------------------------------------------
def expected_ctr(position):
    if position <= 0: return 0.0
    if position <= 1: return CTR_CURVE[1]
    if position < 10:
        lo = int(math.floor(position)); frac = position - lo
        return CTR_CURVE[lo] + (CTR_CURVE[lo + 1] - CTR_CURVE[lo]) * frac
    if position <= 10.5: return CTR_CURVE[10]
    return CTR_PAGE_2 if position <= 20 else CTR_BEYOND


def poisson_cdf(k, lam):
    return sum(math.exp(-lam) * lam ** i / math.factorial(i) for i in range(int(k) + 1)) if lam > 0 else 1.0


def ctr_verdict(impressions, position, clicks):
    exp = impressions * expected_ctr(position)
    if impressions < MIN_IMPR_CTR: return exp, f"too few impressions to judge (<{MIN_IMPR_CTR})"
    if position > 20: return exp, "ranking-limited (past page 2): judge on position, not CTR"
    p = poisson_cdf(clicks, exp)
    if p < UNDERPERFORM_P: return exp, f"under-clicked (chance of this few clicks ~{p:.0%})"
    return exp, "within the expected range"


def is_ai_query(q):
    return len(q.split()) >= AI_QUERY_WORDS


def path_of(url):
    return re.sub(r"^https?://[^/]+", "", url).rstrip("/") or "/"


def parse_experiments(tasks_path):
    """Read the 'Title experiments' table from docs/seo/TASKS.md."""
    out = []
    try: text = open(tasks_path, encoding="utf-8").read()
    except OSError: return out
    m = re.search(r"^## Title experiments.*?$(.*?)(?=^## |\Z)", text, re.S | re.M)
    if not m: return out
    for line in m.group(1).splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) >= 7 and cells[0].startswith("`/"):
            out.append({"path": cells[0].strip("`"), "impressions": num(cells[1]), "position": num(cells[2]),
                        "clicks": num(cells[3]), "old": cells[5], "new": cells[6]})
    return out


def accumulate(path, start, site_exports, page_exports):
    """Impressions, clicks and position for one page since `start`. Returns (stats, source text)."""
    mine = [e for e in page_exports if path_of(e.scope_value) == path and not e.hourly and e.end >= start]
    if mine:
        e = max(mine, key=lambda e: (e.end, e.days)); t = e.totals(since=start)
        return t, f"daily rows of the page-filtered export {e.name}, {max(start, e.start)} to {e.end}"
    after = sorted([e for e in site_exports if e.start >= start], key=lambda e: (e.start, -e.days))
    used, last_end = [], ""
    for e in after:
        if e.start > last_end: used.append(e); last_end = e.end
    imp = clk = pos_w = 0.0
    for e in used:
        for r in e.pages:
            if path_of(r["key"]) == path and r["key"].startswith("https://"):
                imp += r["impressions"]; clk += r["clicks"]; pos_w += r["position"] * r["impressions"]
    stats = {"impressions": imp, "clicks": clk, "ctr": clk / imp if imp else 0.0, "position": pos_w / imp if imp else 0.0}
    if not used: return stats, "no export covers a window that starts on or after the change"
    return stats, "Pages sheet of " + ", ".join(f"{e.name} ({e.start} to {e.end})" for e in used)


def experiment_verdict(base, now):
    if now["impressions"] < EXPERIMENT_THRESHOLD:
        return f"no verdict yet: {int(now['impressions'])} of {EXPERIMENT_THRESHOLD} impressions"
    base_ctr = base["clicks"] / base["impressions"] if base["impressions"] else 0.0
    drop = now["position"] - base["position"]
    gain = now["ctr"] > base_ctr
    if drop > REVERT_POSITION_DROP and not gain:
        return f"REVERT: position worse by {drop:.1f} with no CTR gain"
    if gain and drop <= REVERT_POSITION_DROP:
        return f"KEEP: CTR {base_ctr:.1%} -> {now['ctr']:.1%}, position change {drop:+.1f}"
    if gain: return f"MIXED: CTR up ({base_ctr:.1%} -> {now['ctr']:.1%}) but position worse by {drop:.1f}; owner decides"
    return f"NO GAIN: CTR {base_ctr:.1%} -> {now['ctr']:.1%}, position change {drop:+.1f}; try another title"


def query_page_map(exports):
    """{query: {path: row}} from page-filtered (Queries sheet) and query-filtered (Pages sheet) exports."""
    qp, latest = {}, {}
    for e in exports:
        if e.problem or e.hourly: continue
        if e.scope in ("page", "query"):
            k = (e.scope, path_of(e.scope_value) if e.scope == "page" else e.scope_value)
            if k not in latest or (e.end, e.days) > (latest[k].end, latest[k].days): latest[k] = e
    for (scope, value), e in latest.items():
        if scope == "page":
            for r in e.queries: qp.setdefault(r["key"].lower(), {})[value] = r
        else:
            for r in e.pages: qp.setdefault(value, {}).setdefault(path_of(r["key"]), r)
    return qp, latest


# ---- report ---------------------------------------------------------------------------------
def f_int(x): return f"{int(round(x)):,}"
def f_pct(x): return f"{x * 100:.1f}%"
def f_pos(x, impressions=None):
    return f"{x:.1f}" + (" †" if impressions is not None and impressions < MIN_IMPR_POSITION else "")
def f_delta(a, b):
    d = a - b
    return f"{int(round(d)):+,}" + (f" ({d / b:+.0%})" if b else " (new)")
def md_table(head, rows):
    out = ["| " + " | ".join(head) + " |", "|" + "---|" * len(head)]
    out += ["| " + " | ".join(str(c).replace("|", "\\|") for c in r) + " |" for r in rows]
    return "\n".join(out)
def short(q, n=110): return q if len(q) <= n else q[: n - 1].rstrip() + "…"


def build_report(folder, tasks_path, experiments_start, today=None, top=15):
    exports = load_folder(folder)
    current, previous, site = assign_roles(exports)
    if current is None: return None, exports
    page_exports = [e for e in exports if not getattr(e, "problem", None) and e.scope == "page"]
    qp, latest_filtered = query_page_map(exports)
    L = []; add = L.append
    cur = current.totals()
    add(f"# Search Console report: {current.start} to {current.end}")
    add("")
    add(f"Generated {today or dt.date.today().isoformat()} by `scripts/gsc_report.py` from `{os.path.basename(os.path.abspath(folder))}/` "
        f"({len(exports)} export file(s)). Aggregate search data only.")
    add("")
    add("**Read this first.** " + (
        f"The current window holds {f_int(cur['impressions'])} impressions over {current.days} day(s). "
        + ("That is a small sample; most rows below carry a small-sample flag and are not conclusions. " if cur["impressions"] < 2000 else "")
        + f"Thresholds used: a page's CTR is judged only at {MIN_IMPR_CTR}+ impressions; a title experiment only at "
        f"{EXPERIMENT_THRESHOLD}+ impressions after the change; † marks a position averaged over fewer than {MIN_IMPR_POSITION} impressions."))
    add("")
    add("## 1. Exports read")
    add(md_table(["File", "Filters", "Window", "Role"],
                 [[f"`{e.name}`", e.filter_text() if not getattr(e, "problem", None) or e.filters else "-",
                   e.window() if e.start else "-", e.role] for e in exports]))
    add("")

    # -- totals
    add("## 2. Totals")
    rows = [["Current", current.window(), f_int(cur["clicks"]), f_int(cur["impressions"]), f_pct(cur["ctr"]), f_pos(cur["position"])]]
    comparable = False
    if previous:
        prev = previous.totals()
        rows.append(["Previous", previous.window(), f_int(prev["clicks"]), f_int(prev["impressions"]), f_pct(prev["ctr"]), f_pos(prev["position"])])
        rows.append(["Change", "", f_delta(cur["clicks"], prev["clicks"]), f_delta(cur["impressions"], prev["impressions"]),
                     f"{(cur['ctr'] - prev['ctr']) * 100:+.1f} pt", f"{cur['position'] - prev['position']:+.1f}"])
        comparable = previous.end < current.start and previous.days == current.days
    add(md_table(["", "Window", "Clicks", "Impressions", "CTR", "Avg position"], rows))
    add("")
    if not previous:
        add("No earlier export with a different end date is in the folder, so **no change is computed**. "
            "Keep each week's export in the folder; the next run compares against this one.")
    else:
        notes = []
        if previous.end >= current.start: notes.append("the two windows overlap, so the change understates real movement")
        if previous.days != current.days:
            notes.append(f"the windows differ in length ({previous.days} d and {current.days} d); per day: "
                         f"{prev['impressions'] / previous.days:.1f} -> {cur['impressions'] / current.days:.1f} impressions, "
                         f"{prev['clicks'] / previous.days:.2f} -> {cur['clicks'] / current.days:.2f} clicks")
        if min(cur["impressions"], prev["impressions"]) < MIN_IMPR_CTR: notes.append(f"one window has fewer than {MIN_IMPR_CTR} impressions: treat the CTR change as noise")
        add("Like-for-like comparison (same length, no overlap)." if comparable and not notes else "Caveats: " + "; ".join(notes) + ".")
    add("")
    add("Daily: " + " · ".join(f"{r['key'][5:10]} {int(r['impressions'])}/{int(r['clicks'])}" for r in current.chart) + " (impressions/clicks)")
    add("")

    # -- pages
    add("## 3. Pages: impressions, and expected against actual clicks")
    add(f"Expected clicks = impressions × an assumed CTR for the average position (curve in section 11). **An estimate, not a measurement.** "
        f"Verdicts are given only at {MIN_IMPR_CTR}+ impressions. Page impressions include AI-surface impressions "
        f"(section 10), which rarely produce a click, so 'under-clicked' is a prompt to look at the snippet, not proof it is weak.")
    add("")
    prev_pages = {r["key"]: r for r in previous.pages} if previous else {}
    rows = []
    for r in sorted(current.pages, key=lambda r: -r["impressions"])[:top]:
        exp, verdict = ctr_verdict(r["impressions"], r["position"], r["clicks"])
        rows.append([f"`{path_of(r['key'])}`" + (" (http)" if r["key"].startswith("http://") else ""), f_int(r["impressions"]),
                     f_pos(r["position"], r["impressions"]), f"~{exp:.1f}", f_int(r["clicks"]), verdict])
    add(md_table(["Page", "Impr.", "Pos.", "Expected clicks (est.)", "Actual", "Verdict"], rows))
    add("")
    variants = {}
    for r in current.pages: variants.setdefault(path_of(r["key"]), []).append(r)
    dup = {p: rs for p, rs in variants.items() if len(rs) > 1}
    if dup:
        add("**Same page reported under more than one URL** (stale index entries; check the redirect and request re-indexing):")
        for p, rs in dup.items():
            add("- `" + p + "`: " + "; ".join(f"`{r['key']}` {f_int(r['impressions'])} impr." for r in rs))
        add("")

    # -- queries
    typed = [r for r in current.queries if not is_ai_query(r["key"])]
    ai = [r for r in current.queries if is_ai_query(r["key"])]
    q_imp = sum(r["impressions"] for r in current.queries)
    add("## 4. Queries by impressions")
    add(f"The Queries sheet lists {len(current.queries)} queries holding {f_int(q_imp)} of the window's {f_int(cur['impressions'])} impressions; "
        "Search Console leaves out anonymised and very rare queries, so the two totals are different data and are not reconciled. "
        f"Queries of {AI_QUERY_WORDS}+ words are in section 10, not here.")
    add("")
    add(md_table(["Query", "Impr.", "Clicks", "Pos."],
                 [[short(r["key"]), f_int(r["impressions"]), f_int(r["clicks"]), f_pos(r["position"], r["impressions"])]
                  for r in sorted(typed, key=lambda r: (-r["impressions"], r["position"]))[:max(top, 20)]]))
    add("")

    # -- movers
    add("## 5. Movers against the previous export")
    if not previous:
        add("Not available: needs an earlier export (see section 2).")
    else:
        for label, cur_rows, prev_rows, fmt in (("Pages", current.pages, previous.pages, lambda k: f"`{path_of(k)}`" + (" (http)" if k.startswith("http://") else "")),
                                                ("Queries", typed, [r for r in previous.queries if not is_ai_query(r["key"])], short)):
            pm = {r["key"]: r for r in prev_rows}; cm = {r["key"]: r for r in cur_rows}
            moves = []
            for k in set(pm) | set(cm):
                c, p = cm.get(k), pm.get(k)
                moves.append((k, (c["clicks"] if c else 0) - (p["clicks"] if p else 0), (c["impressions"] if c else 0) - (p["impressions"] if p else 0), c, p))
            moves = [m for m in moves if m[1] or m[2]]
            moves.sort(key=lambda m: (-abs(m[1]), -abs(m[2]), m[0]))
            add(f"**{label}, by click change then impression change**")
            add("")
            add(md_table([label[:-1], "Clicks", "Δ clicks", "Impr.", "Δ impr.", "Pos. now", "Pos. before"],
                         [[fmt(k), f_int(c["clicks"]) if c else "0", f"{int(dc):+d}", f_int(c["impressions"]) if c else "0", f"{int(di):+d}",
                           f_pos(c["position"], c["impressions"]) if c else "not listed", f_pos(p["position"], p["impressions"]) if p else "not listed"]
                          for k, dc, di, c, p in moves[:top]]))
            add("")
        add("A row missing from one export counts as zero there; Search Console omits rows with very little data, so small changes are not signals."
            + ("" if comparable else " The windows are not like-for-like (section 2)."))
    add("")

    # -- experiments
    add("## 6. Title experiments")
    exps = parse_experiments(tasks_path)
    add(f"Pages and baselines from `{os.path.relpath(tasks_path, ROOT) if os.path.abspath(tasks_path).startswith(ROOT) else os.path.basename(tasks_path)}`. "
        f"Change date used: **{experiments_start}** (`--experiments-start`). A verdict needs **{EXPERIMENT_THRESHOLD} impressions after the change**; "
        f"until then the row says how many have accumulated. Rule: revert when position is worse by more than {REVERT_POSITION_DROP:.0f} with no CTR gain.")
    add("")
    if not exps:
        add("No experiment table found.")
    else:
        rows = []; sources = set(); straddle = [e for e in site if e.start < experiments_start <= e.end]
        for x in exps:
            now, src = accumulate(x["path"], experiments_start, site, page_exports); sources.add(src)
            rows.append([f"`{x['path']}`", x["new"], f"{f_int(x['impressions'])} / {f_pos(x['position'])} / {f_int(x['clicks'])}",
                         f"{f_int(now['impressions'])} / {f_pos(now['position']) if now['impressions'] else '-'} / {f_int(now['clicks'])}",
                         experiment_verdict(x, now)])
        add(md_table(["Page", "New title", "Baseline impr. / pos. / clicks", "Since change impr. / pos. / clicks", "Verdict"], rows))
        add("")
        add("Source of the since-change figures: " + "; ".join(sorted(sources)) + ".")
        if straddle:
            add(f"{len(straddle)} site-wide export(s) span the change date and cannot be split by day at page level, so they are not counted: "
                + ", ".join(f"`{e.name}`" for e in straddle) + ". A page-filtered export per experiment page gives daily figures and avoids this.")
    add("")

    # -- cannibalization
    add("## 7. Cannibalization")
    multi = {q: m for q, m in qp.items() if len(m) > 1}
    if not qp:
        add("**Cannot be determined from these exports.** A site-wide export lists queries and pages separately and never says which URL "
            "served which query. To measure it, export once per watched page: Performance → + New → Page → exact URL → Export, "
            "and drop the files in the same folder. Until then the table below shows only whether each watched page has impressions at all.")
    else:
        add(f"Query-to-URL data comes from {len(latest_filtered)} filtered export(s): "
            + ", ".join(f"`{v}`" for _, v in sorted(latest_filtered)) + ". Pages without a filtered export cannot appear here.")
        add("")
        if multi:
            rows = []
            for q, m in sorted(multi.items(), key=lambda kv: -sum(r["impressions"] for r in kv[1].values())):
                tot = sum(r["impressions"] for r in m.values())
                rows.append([short(q), "<br>".join(f"`{p}` {f_int(r['impressions'])} impr., pos. {f_pos(r['position'], r['impressions'])}"
                                                   for p, r in sorted(m.items(), key=lambda kv: -kv[1]["impressions"])),
                             f_int(tot) + (" (small sample)" if tot < MIN_IMPR_POSITION else "")])
            add(md_table(["Query", "URLs with impressions", "Total impr."], rows))
        else:
            add("No query has impressions on two or more of the exported URLs.")
    add("")
    add("**Watch pairs** (from `docs/seo/MONITORING.md`)")
    add("")
    cur_pages = {}
    for r in current.pages:
        if r["key"].startswith("https://"): cur_pages[path_of(r["key"])] = r
    rows = []
    for label, paths in WATCH_GROUPS:
        cells = []
        for p in paths:
            r = cur_pages.get(p)
            cells.append(f"`{p}`: " + (f"{f_int(r['impressions'])} impr., pos. {f_pos(r['position'], r['impressions'])}" if r else "no impressions listed"))
        shared = sorted(q for q, m in multi.items() if len(set(m) & set(paths)) > 1)
        have = [p for p in paths if ("page", p) in latest_filtered]
        if shared: status = "OVERLAP on: " + "; ".join(short(q, 60) for q in shared)
        elif len(have) == len(paths): status = "no shared query"
        elif sum(1 for p in paths if p in cur_pages) < 2: status = "fewer than two of these pages have impressions: nothing to compare yet"
        else: status = "both have impressions; needs page-filtered exports for " + ", ".join(f"`{p}`" for p in paths if p not in have)
        rows.append([label, "<br>".join(cells), status])
    add(md_table(["Group", "Pages in the current window", "Status"], rows))
    add("")
    term_rows = [r for r in current.queries if any(t in r["key"].lower().replace("-", " ") for t in WATCH_TERMS)]
    add(f"Queries containing a watch term ({', '.join(WATCH_TERMS)}): {len(term_rows)}, {f_int(sum(r['impressions'] for r in term_rows))} impressions. "
        "Which URL serves each is known only from page-filtered exports.")
    add("")

    # -- countries
    add("## 8. Countries")
    ctot_i = sum(r["impressions"] for r in current.countries); ctot_c = sum(r["clicks"] for r in current.countries)
    cm = {r["key"]: r for r in current.countries}
    def share(name):
        r = cm.get(name, {"impressions": 0, "clicks": 0, "position": 0})
        return [f"**{name}**", f_int(r["impressions"]), f_pct(r["impressions"] / ctot_i) if ctot_i else "-", f_int(r["clicks"]),
                (f_pct(r["clicks"] / ctot_c) if ctot_c else "-"), f_pos(r["position"], r["impressions"]) if r["impressions"] else "-"]
    target_i = sum(cm.get(n, {}).get("impressions", 0) for n in ("United States", "Canada"))
    target_c = sum(cm.get(n, {}).get("clicks", 0) for n in ("United States", "Canada"))
    rows = [share("United States"), share("Canada"),
            ["**US + Canada (target market)**", f_int(target_i), f_pct(target_i / ctot_i) if ctot_i else "-", f_int(target_c), f_pct(target_c / ctot_c) if ctot_c else "-", ""]]
    for r in sorted(current.countries, key=lambda r: -r["impressions"]):
        if r["key"] in ("United States", "Canada") or len(rows) >= 9: continue
        rows.append([r["key"], f_int(r["impressions"]), f_pct(r["impressions"] / ctot_i), f_int(r["clicks"]), f_pct(r["clicks"] / ctot_c) if ctot_c else "-", f_pos(r["position"], r["impressions"])])
    add(md_table(["Country", "Impr.", "Share of impr.", "Clicks", "Share of clicks", "Pos."], rows))
    add("")
    notes = []
    if ctot_c < 30: notes.append(f"click shares rest on {f_int(ctot_c)} click(s) and mean nothing yet")
    if ctot_i < MIN_IMPR_SHARE: notes.append(f"impression shares rest on fewer than {MIN_IMPR_SHARE} impressions")
    if previous:
        pt = sum(r["impressions"] for r in previous.countries); pm_ = {r["key"]: r for r in previous.countries}
        if pt:
            pshare = sum(pm_.get(n, {}).get("impressions", 0) for n in ("United States", "Canada")) / pt
            notes.append(f"US + Canada share of impressions was {f_pct(pshare)} in the previous export and is {f_pct(target_i / ctot_i)} now")
    add(("Small-sample note: " + "; ".join(notes) + ". ") if notes else "")
    add("A rise in other countries alone is not progress (MONITORING.md).")
    add("")

    # -- next edits
    lo, hi = NEXT_EDIT_RANGE
    add(f"## 9. Next edits: queries at positions {lo:.0f} to {hi:.0f}")
    add(f"Typed queries only ({AI_QUERY_WORDS}+ word queries excluded). These are within reach of page one; edit the page that already ranks rather than writing a new one.")
    add("")
    by_page = {}
    for q, m in qp.items():
        if is_ai_query(q): continue
        for p, r in m.items():
            if lo <= r["position"] <= hi: by_page.setdefault(p, []).append((q, r))
    if by_page:
        for p in sorted(by_page, key=lambda p: -sum(r["impressions"] for _, r in by_page[p])):
            add(f"**`{p}`**")
            add("")
            add(md_table(["Query", "Impr.", "Pos."], [[short(q), f_int(r["impressions"]), f_pos(r["position"], r["impressions"])]
                                                     for q, r in sorted(by_page[p], key=lambda x: -x[1]["impressions"])]))
            add("")
    covered = {q for q in qp}
    rest = [r for r in typed if lo <= r["position"] <= hi and r["key"].lower() not in covered]
    if rest:
        add("**Page not known** (site-wide export: Search Console does not say which URL ranks; open the query in Search Console, or add a page-filtered export)")
        add("")
        add(md_table(["Query", "Impr.", "Pos."], [[short(r["key"]), f_int(r["impressions"]), f_pos(r["position"], r["impressions"])]
                                                 for r in sorted(rest, key=lambda r: -r["impressions"])]))
        add("")
    if not by_page and not rest: add("None in this window."); add("")

    # -- AI queries
    add(f"## 10. AI-surface queries ({AI_QUERY_WORDS}+ words)")
    ai_imp = sum(r["impressions"] for r in ai)
    add(f"{len(ai)} of {len(current.queries)} listed queries, {f_int(ai_imp)} impressions, {f_int(sum(r['clicks'] for r in ai))} click(s). "
        "Long natural-language queries are most likely generated by AI search surfaces fanning out a user's prompt. "
        "**This is an inference from query shape: Search Console does not label them.** A top position here means being used in a generated answer; "
        "few or no clicks is expected, so these are **excluded from every CTR judgment** in this report.")
    add("")
    if ai:
        add(md_table(["Query", "Impr.", "Pos.", "Words"], [[short(r["key"], 150), f_int(r["impressions"]), f_pos(r["position"]), len(r["key"].split())]
                                                          for r in sorted(ai, key=lambda r: (-r["impressions"], r["position"]))]))
        add("")

    # -- method
    add("## 11. Method and limits")
    add("- **Expected-CTR curve (assumed, not measured for this site):** " + ", ".join(f"pos. {k} {v:.1%}" for k, v in CTR_CURVE.items())
        + f"; positions 11 to 20 {CTR_PAGE_2:.1%}; beyond 20 {CTR_BEYOND:.1%}; straight line between whole positions. "
        f"'Under-clicked' means the Poisson chance of seeing that few clicks is below {UNDERPERFORM_P:.0%}.")
    add(f"- **Small samples:** CTR verdicts need {MIN_IMPR_CTR}+ impressions; title verdicts {EXPERIMENT_THRESHOLD}+ after the change; "
        f"† = position over fewer than {MIN_IMPR_POSITION} impressions; country shares flagged under {MIN_IMPR_SHARE} impressions or 30 clicks.")
    add("- **Totals** come from the Chart sheet (complete). Query rows are incomplete by design and are never summed to a site total.")
    add("- **Average position** is impression-weighted across days; it worsens as a site starts to appear for more long-tail queries, which is not a decline.")
    add("- Exports with identical windows are counted once. Hourly ('Last 24 hours') exports are listed but not used.")
    add("")
    return "\n".join(L), exports


def main(argv=None):
    ap = argparse.ArgumentParser(description="Markdown SEO report from a folder of Search Console exports (xlsx, zip of CSVs, or CSV folders).",
                                 epilog="Exit codes: 0 report written; 2 no usable export or bad arguments.")
    ap.add_argument("folder", help="folder holding the exports")
    ap.add_argument("--out", help="write the report here (default: stdout)")
    ap.add_argument("--tasks", default=os.path.join(ROOT, "docs", "seo", "TASKS.md"), help="file holding the 'Title experiments' table")
    ap.add_argument("--experiments-start", default=DEFAULT_EXPERIMENTS_START, help=f"date the new titles went live (default {DEFAULT_EXPERIMENTS_START})")
    ap.add_argument("--today", help="override the 'Generated' date (for reproducible tests)")
    ap.add_argument("--top", type=int, default=15, help="rows in the top tables (default 15)")
    a = ap.parse_args(argv)
    if not os.path.isdir(a.folder):
        print(f"gsc_report: {a.folder} is not a folder", file=sys.stderr); return 2
    try: dt.date.fromisoformat(a.experiments_start)
    except ValueError:
        print("gsc_report: --experiments-start must be YYYY-MM-DD", file=sys.stderr); return 2
    report, exports = build_report(a.folder, a.tasks, a.experiments_start, a.today, a.top)
    if report is None:
        print(f"gsc_report: no usable site-wide Performance export in {a.folder}", file=sys.stderr)
        for e in exports: print(f"  {e.name}: {e.role}", file=sys.stderr)
        return 2
    if a.out:
        os.makedirs(os.path.dirname(os.path.abspath(a.out)), exist_ok=True)
        with open(a.out, "w", encoding="utf-8") as f: f.write(report + "\n")
        cur = next(e for e in exports if e.role == "CURRENT"); t = cur.totals()
        print(f"gsc_report: wrote {a.out} ({cur.start} to {cur.end}: {int(t['impressions'])} impressions, {int(t['clicks'])} clicks, "
              f"CTR {t['ctr']:.2%}, position {t['position']:.1f}; {len(exports)} export file(s) read)")
    else:
        print(report)
    return 0


if __name__ == "__main__":
    sys.exit(main())
