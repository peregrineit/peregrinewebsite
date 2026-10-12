#!/usr/bin/env python3
"""Tests for scripts/gsc_report.py. Stdlib only.

Usage: python3 scripts/test_gsc_report.py                  run the checks (exit 1 on any failure)
       python3 scripts/test_gsc_report.py --write-fixtures regenerate tests/fixtures/gsc/exports
       python3 scripts/test_gsc_report.py --real DIR       also check a folder of real exports
                                                           (default: ~/Downloads, if the 2026-10-09 files are there)

The fixtures cover every input format the report accepts: .xlsx (shared strings, a skipped empty
cell), a .zip of CSVs, a folder of loose CSVs, a duplicate window, an hourly export, a 28-day export
that spans the title-change date, two page-filtered exports and a non-Performance workbook.
"""
import glob, importlib.util, io, os, shutil, subprocess, sys, tempfile, zipfile
from xml.sax.saxutils import escape

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIX = os.path.join(ROOT, "tests", "fixtures", "gsc")
EXPORTS = os.path.join(FIX, "exports")
TASKS = os.path.join(FIX, "TASKS-fixture.md")
spec = importlib.util.spec_from_file_location("gsc_report", os.path.join(ROOT, "scripts", "gsc_report.py"))
g = importlib.util.module_from_spec(spec); spec.loader.exec_module(g)
U = "https://peregrine-it.com"
HEAD = ["Clicks", "Impressions", "CTR", "Position"]

results = []
def check(name, cond, detail=""):
    results.append((name, bool(cond)))
    print(("  ok   " if cond else "  FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))
def eq(name, got, want):
    ok = abs(got - want) < 1e-6 if isinstance(want, float) else got == want
    check(name, ok, f"got {got!r}, want {want!r}")


# ---- fixture data ---------------------------------------------------------------------------
def rows(first, data):
    return [[first] + HEAD] + [[k, c, i, (c / i if i else 0), p] for k, c, i, p in data]

def days(start_day, month, imps, clicks, pos):
    return [(f"2026-{month:02d}-{start_day + n:02d}", clicks[n], imps[n], pos[n]) for n in range(len(imps))]

PREV = {  # 2026-10-03 to 2026-10-09: before the title change
    "Chart": rows("Date", days(3, 10, [50, 60, 70, 80, 90, 100, 50], [1, 0, 1, 2, 0, 1, 0], [12.0] * 7)),
    "Queries": rows("Top queries", [("mls api cost", 1, 40, 6.0), ("odoo integration", 0, 20, 40.0), ("peregrine it", 3, 30, 2.0)]),
    "Pages": rows("Top pages", [(U + "/blog/mls-idx-integration-cost", 1, 150, 6.5), (U + "/", 3, 100, 5.0),
                                (U + "/services/odoo-erp", 0, 40, 41.5), (U + "/about", 1, 30, 9.0)]),
    "Countries": rows("Country", [("United States", 3, 300, 12.0), ("Canada", 1, 50, 9.0), ("India", 1, 150, 13.0)]),
    "Devices": rows("Device", [("Desktop", 4, 400, 12.5), ("Mobile", 1, 100, 10.0)]),
    "Search appearance": [["Search Appearance"] + HEAD],
    "Filters": [["Filter", "Value"], ["Search type", "Web"], ["Date", "Last 7 days"]],
}
AI_QUERY = "which api offers the most competitive pricing for mls data"
CUR = {   # 2026-10-10 to 2026-10-16: after the change
    "Chart": rows("Date", days(10, 10, [100] * 6 + [200], [2] * 6 + [4], [10.0] * 6 + [15.0])),
    "Queries": rows("Top queries", [("mls api cost", 5, 90, 5.0), ("odoo integration", 0, 30, 44.0), ("peregrine it", 4, 50, 2.0),
                                    ("idx cost per month", 0, 12, 11.0), ("real time bom sync erp", 0, 6, 15.0), (AI_QUERY, 0, 8, 1.0)]),
    "Pages": rows("Top pages", [(U + "/blog/mls-idx-integration-cost", 9, 320, 5.0), (U + "/", 9, 150, 4.0), ("http://peregrine-it.com/", 0, 20, 4.0),
                                (U + "/services/odoo-erp", 0, 60, 45.0), (U + "/tools/mls-idx-cost-calculator", 1, 30, 9.0), (U + "/about", 0, 25, 9.5)]),
    "Countries": rows("Country", [("United States", 10, 500, 11.0), ("Canada", 2, 100, 8.0), ("India", 4, 200, 14.0)]),
    "Devices": rows("Device", [("Desktop", 12, 600, 12.0), ("Mobile", 4, 200, 9.0)]),
    "Search appearance": [["Search Appearance"] + HEAD],
    "Filters": [["Filter", "Value"], ["Search type", "Web"], ["Date", "Last 7 days"]],
}
LONG = dict(CUR)  # 28 days ending the same day: spans the change date
LONG["Chart"] = rows("Date", [(f"2026-09-{d:02d}", 1, 50, 12.0) for d in range(19, 31)] + [(f"2026-10-{d:02d}", 1, 50, 12.0) for d in range(1, 17)])
LONG["Pages"] = rows("Top pages", [(U + "/blog/mls-idx-integration-cost", 12, 500, 6.0)])
LONG["Filters"] = [["Filter", "Value"], ["Search type", "Web"], ["Date", "Last 28 days"]]
HOURLY = dict(CUR)
HOURLY["Chart"] = [["Time (UTC+05:30)"] + HEAD] + [[f"2026-10-17T{h:02d}:30:00", 0, 3, 0, 9.0] for h in range(24)]
HOURLY["Filters"] = [["Filter", "Value"], ["Search type", "Web"], ["Time range", "Last 24 hours"]]
PAGE_GUIDE = {
    "Chart": rows("Date", days(10, 10, [40, 40, 40, 50, 50, 50, 50], [1, 1, 1, 1, 1, 2, 2], [5.0] * 7)),
    "Queries": rows("Top queries", [("mls api cost", 4, 80, 5.0), ("mls idx cost calculator", 0, 15, 12.0), ("idx cost per month", 0, 12, 11.0)]),
    "Pages": rows("Top pages", [(U + "/blog/mls-idx-integration-cost", 9, 320, 5.0)]),
    "Countries": rows("Country", [("United States", 9, 320, 5.0)]),
    "Filters": [["Filter", "Value"], ["Search type", "Web"], ["Date", "Last 7 days"], ["Page", U + "/blog/mls-idx-integration-cost"]],
}
PAGE_CALC = {
    "Chart": rows("Date", days(10, 10, [4, 4, 4, 4, 4, 5, 5], [0, 0, 0, 0, 0, 0, 1], [9.0] * 7)),
    "Queries": rows("Top queries", [("mls idx cost calculator", 1, 10, 9.0), ("idx fee estimate", 0, 5, 14.0)]),
    "Pages": rows("Top pages", [(U + "/tools/mls-idx-cost-calculator", 1, 30, 9.0)]),
    "Countries": rows("Country", [("United States", 1, 30, 9.0)]),
    "Filters": [["Filter", "Value"], ["Search type", "Web"], ["Date", "Last 7 days"], ["Page", U + "/tools/mls-idx-cost-calculator"]],
}
COVERAGE = {"Chart": [["Date", "Not indexed", "Indexed", "Impressions"], ["2026-10-04", "", 30, 69]],
            "Critical issues": [["Reason", "Source", "Validation", "Pages"], ["Not found (404)", "Website", "Not Started", 2]]}
TASKS_TEXT = """# Fixture copy of the title-experiment table (same layout as docs/seo/TASKS.md)

## Title experiments (T1)
| Page | Impr. | Pos. | Clicks | Query signal | Old title | New title |
|---|---|---|---|---|---|---|
| `/blog/mls-idx-integration-cost` | 109 | 6.5 | 1 | mls api cost | MLS/IDX Integration Cost (2026) | MLS & IDX Cost per Month and per Year (2026) |
| `/services/odoo-erp` | 14 | 41.5 | 0 | odoo integration | Odoo Custom Modules & API Integration | Odoo Integration & Custom Module Development |

## Next section
"""


def write_xlsx(path, sheets):
    """Minimal workbook in the layout Search Console writes: shared strings, t="s"/t="n" cells."""
    strings, index = [], {}
    def sid(s):
        if s not in index: index[s] = len(strings); strings.append(s)
        return index[s]
    def col(n):
        return chr(65 + n)
    sheet_xml = []
    for name, data in sheets.items():
        out = []
        for r, row in enumerate(data, 1):
            cells = []
            for c, v in enumerate(row):
                if v == "": continue                      # empty cells are omitted, as in real files
                if isinstance(v, str): cells.append(f'<c r="{col(c)}{r}" t="s"><v>{sid(v)}</v></c>')
                else: cells.append(f'<c r="{col(c)}{r}" t="n"><v>{float(v)}</v></c>')
            out.append(f'<row r="{r}">{"".join(cells)}</row>')
        sheet_xml.append('<?xml version="1.0" encoding="UTF-8"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>'
                         + "".join(out) + "</sheetData></worksheet>")
    wb = ('<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" '
          'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>'
          + "".join(f'<sheet name="{escape(n)}" r:id="rId{i + 2}" sheetId="{i + 1}"/>' for i, n in enumerate(sheets)) + "</sheets></workbook>")
    rels = ('<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
            '<Relationship Id="rId1" Target="sharedStrings.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings"/>'
            + "".join(f'<Relationship Id="rId{i + 2}" Target="worksheets/sheet{i + 1}.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/>'
                      for i in range(len(sheets))) + "</Relationships>")
    sst = ('<?xml version="1.0" encoding="UTF-8"?><sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">'
           + "".join(f"<si><t>{escape(s)}</t></si>" for s in strings) + "</sst>")
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        for n, d in [("xl/workbook.xml", wb), ("xl/_rels/workbook.xml.rels", rels), ("xl/sharedStrings.xml", sst)] + \
                    [(f"xl/worksheets/sheet{i + 1}.xml", x) for i, x in enumerate(sheet_xml)]:
            z.writestr(zipfile.ZipInfo(n, (2026, 10, 10, 0, 0, 0)), d)


def csv_text(data, percent=True):
    """CSV as Search Console writes it: CTR as '16.67%', a BOM-less UTF-8 file."""
    import csv
    buf = io.StringIO(); w = csv.writer(buf, lineterminator="\n")
    for n, row in enumerate(data):
        if n and len(row) == 5 and percent: row = [row[0], row[1], row[2], f"{row[3] * 100:.2f}%", row[4]]
        w.writerow(row)
    return buf.getvalue()


def write_fixtures(dest=EXPORTS):
    shutil.rmtree(dest, ignore_errors=True); os.makedirs(dest)
    write_xlsx(os.path.join(dest, "peregrine-it.com-Performance-on-Search-2026-10-10.xlsx"), PREV)
    with zipfile.ZipFile(os.path.join(dest, "peregrine-it.com-Performance-on-Search-2026-10-17.zip"), "w") as z:
        for n, d in CUR.items(): z.writestr(zipfile.ZipInfo(n + ".csv", (2026, 10, 17, 0, 0, 0)), csv_text(d))
    write_xlsx(os.path.join(dest, "peregrine-it.com-Performance-on-Search-2026-10-17 (1).xlsx"), CUR)      # same window again
    write_xlsx(os.path.join(dest, "peregrine-it.com-Performance-on-Search-2026-10-17 (2).xlsx"), LONG)
    with zipfile.ZipFile(os.path.join(dest, "peregrine-it.com-Performance-on-Search-2026-10-17 (3).zip"), "w") as z:
        for n, d in HOURLY.items(): z.writestr(zipfile.ZipInfo(n + ".csv", (2026, 10, 17, 0, 0, 0)), csv_text(d))
    for folder, data in (("page-mls-cost-guide-2026-10-17", PAGE_GUIDE), ("page-mls-calculator-2026-10-17", PAGE_CALC)):
        os.makedirs(os.path.join(dest, folder))
        for n, d in data.items():
            with open(os.path.join(dest, folder, n + ".csv"), "w", encoding="utf-8") as f: f.write(csv_text(d))
    write_xlsx(os.path.join(dest, "peregrine-it.com-Coverage-2026-10-17.xlsx"), COVERAGE)
    if dest == EXPORTS:
        with open(TASKS, "w", encoding="utf-8") as f: f.write(TASKS_TEXT)
        print(f"fixtures written to {os.path.relpath(dest, ROOT)}")


# ---- checks ---------------------------------------------------------------------------------
def run_cli(*args):
    p = subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "gsc_report.py"), *args], capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


def test_units():
    print("unit checks")
    eq("expected CTR at position 1", g.expected_ctr(1.0), 0.27)
    eq("expected CTR at position 6.5 (interpolated)", g.expected_ctr(6.5), (0.042 + 0.033) / 2)
    eq("expected CTR at position 15", g.expected_ctr(15), 0.010)
    eq("expected CTR at position 48", g.expected_ctr(48), 0.002)
    check("6-word query is not an AI query", not g.is_ai_query("how much does idx cost monthly"))
    check("7-word query is an AI query", g.is_ai_query("how much does idx cost per month"))
    eq("path_of strips host and trailing slash", g.path_of("https://peregrine-it.com/about/"), "/about")
    eq("path_of root", g.path_of("http://peregrine-it.com/"), "/")
    eq("num parses a CSV percentage", g.num("16.67%"), 0.1667)
    eq("num parses thousands", g.num("1,234"), 1234.0)
    _, v = g.ctr_verdict(99, 3.0, 0); check("99 impressions is never judged", "too few" in v, v)
    _, v = g.ctr_verdict(109, 6.53, 1); check("109 impressions, position 6.5, 1 click is under-clicked", v.startswith("under-clicked"), v)
    _, v = g.ctr_verdict(150, 4.0, 9); check("150 impressions, position 4, 9 clicks is within range", v.startswith("within"), v)
    _, v = g.ctr_verdict(200, 45.0, 0); check("a page past position 20 is ranking-limited, not judged on CTR", v.startswith("ranking-limited"), v)
    base = {"impressions": 109, "position": 6.5, "clicks": 1}
    check("299 impressions gives no verdict", g.experiment_verdict(base, {"impressions": 299, "clicks": 9, "ctr": 0.03, "position": 5}).startswith("no verdict yet: 299 of 300"))
    check("300 impressions, CTR up, position held: KEEP", g.experiment_verdict(base, {"impressions": 300, "clicks": 9, "ctr": 0.03, "position": 5}).startswith("KEEP"))
    check("position worse by more than 3 with no CTR gain: REVERT", g.experiment_verdict(base, {"impressions": 400, "clicks": 2, "ctr": 0.005, "position": 10.0}).startswith("REVERT"))
    check("no CTR gain, position held: NO GAIN", g.experiment_verdict(base, {"impressions": 400, "clicks": 2, "ctr": 0.005, "position": 7.0}).startswith("NO GAIN"))
    check("CTR up, position much worse: MIXED", g.experiment_verdict(base, {"impressions": 400, "clicks": 20, "ctr": 0.05, "position": 11.0}).startswith("MIXED"))
    real_exps = g.parse_experiments(os.path.join(ROOT, "docs", "seo", "TASKS.md"))
    eq("docs/seo/TASKS.md yields the seven title experiments", len(real_exps), 7)
    if real_exps: eq("first experiment baseline is 109 impressions", real_exps[0]["impressions"], 109.0)
    # The watch groups must name every path listed under "Pairs to watch" in MONITORING.md.
    import re
    mon = open(os.path.join(ROOT, "docs", "seo", "MONITORING.md"), encoding="utf-8").read()
    section = mon[mon.index("Pairs to watch"):mon.index("5. **Countries")]
    listed = set(re.findall(r"`(/[^`]+)`", section)); watched = {p for _, ps in g.WATCH_GROUPS for p in ps}
    check("every path in MONITORING.md 'Pairs to watch' is in WATCH_GROUPS", listed <= watched, str(listed - watched))


def test_fixtures():
    print("fixture checks")
    tmp = tempfile.mkdtemp()
    try:
        fresh = os.path.join(tmp, "exports")
        committed = sorted(os.path.relpath(p, EXPORTS) for p in glob.glob(os.path.join(EXPORTS, "**"), recursive=True) if os.path.isfile(p))
        check("committed fixtures exist", len(committed) >= 15, f"{len(committed)} files")
        exports = g.load_folder(EXPORTS)
        current, previous, site = g.assign_roles(exports)
        by = {e.name: e for e in exports}
        eq("8 exports found", len(exports), 8)
        eq("current is a 7-day export, not the 28-day one", current.name, "peregrine-it.com-Performance-on-Search-2026-10-17 (1).xlsx")
        eq("previous is the earlier xlsx", previous.name, "peregrine-it.com-Performance-on-Search-2026-10-10.xlsx")
        check("same-window CSV zip is a duplicate", by["peregrine-it.com-Performance-on-Search-2026-10-17.zip"].role.startswith("duplicate"))
        check("hourly export is not used", by["peregrine-it.com-Performance-on-Search-2026-10-17 (3).zip"].role.startswith("hourly"))
        check("coverage workbook is ignored", by["peregrine-it.com-Coverage-2026-10-17.xlsx"].role.startswith("ignored"))
        eq("loose-CSV folder is page-filtered", by["page-mls-cost-guide-2026-10-17"].role, "page-filtered")
        eq("28-day export is 28 days", by["peregrine-it.com-Performance-on-Search-2026-10-17 (2).xlsx"].days, 28)
        t, p = current.totals(), previous.totals()
        eq("current impressions", t["impressions"], 800.0); eq("current clicks", t["clicks"], 16.0)
        eq("current CTR", t["ctr"], 0.02); eq("current position (impression-weighted)", t["position"], 11.25)
        eq("previous impressions", p["impressions"], 500.0); eq("previous clicks", p["clicks"], 5.0); eq("previous position", p["position"], 12.0)
        # xlsx and CSV copies of the same data parse to the same rows (CSV CTR is rounded to 2 dp)
        dup = by["peregrine-it.com-Performance-on-Search-2026-10-17.zip"]
        eq("xlsx and CSV agree on page rows", [(r["key"], r["clicks"], r["impressions"], r["position"]) for r in dup.pages],
           [(r["key"], r["clicks"], r["impressions"], r["position"]) for r in current.pages])
        eq("CSV percentage CTR parsed", round(dup.pages[0]["ctr"], 4), 0.0281)
        page_exports = [e for e in exports if not e.problem and e.scope == "page"]
        now, src = g.accumulate("/blog/mls-idx-integration-cost", "2026-10-10", site, page_exports)
        eq("experiment page: impressions since the change", now["impressions"], 320.0); eq("experiment page: clicks since the change", now["clicks"], 9.0)
        check("experiment page uses the page-filtered daily rows", "page-filtered" in src, src)
        now2, _ = g.accumulate("/blog/mls-idx-integration-cost", "2026-10-13", site, page_exports)
        eq("a later change date counts only later days", now2["impressions"], 200.0)
        odoo, src2 = g.accumulate("/services/odoo-erp", "2026-10-10", site, page_exports)
        eq("page without a filtered export falls back to the site-wide Pages sheet", odoo["impressions"], 60.0)
        check("the 28-day export that spans the change is not counted", "(2).xlsx" not in src2, src2)
        qp, _ = g.query_page_map(exports)
        eq("cannibalized query maps to two URLs", sorted(qp["mls idx cost calculator"]), ["/blog/mls-idx-integration-cost", "/tools/mls-idx-cost-calculator"])
        eq("only one query is on two URLs", sum(1 for m in qp.values() if len(m) > 1), 1)

        # Same report from freshly generated fixtures: the committed files are what the generator makes.
        write_fixtures(fresh)
        a = g.build_report(EXPORTS, TASKS, "2026-10-10", "2026-10-17")[0]; b = g.build_report(fresh, TASKS, "2026-10-10", "2026-10-17")[0]
        check("committed fixtures give the same report as regenerated ones", a.replace("exports/", "") == b.replace("exports/", ""))
        out = os.path.join(tmp, "report.md")
        code, stdout, stderr = run_cli(EXPORTS, "--tasks", TASKS, "--experiments-start", "2026-10-10", "--today", "2026-10-17", "--out", out)
        eq("CLI exit code 0", code, 0)
        check("CLI summary line", "800 impressions, 16 clicks, CTR 2.00%, position 11.2" in stdout, stdout)
        r = open(out, encoding="utf-8").read()
        for name, needle in [
            ("title names the window", "# Search Console report: 2026-10-10 to 2026-10-16"),
            ("totals row", "| Current | 2026-10-10 to 2026-10-16 (7 d) | 16 | 800 | 2.0% | 11.2 |"),
            ("change row", "| Change |  | +11 (+220%) | +300 (+60%) | +1.0 pt | -0.8 |"),
            ("like-for-like stated", "Like-for-like comparison (same length, no overlap)."),
            ("cost guide: expected against actual", "| `/blog/mls-idx-integration-cost` | 320 | 5.0 | ~17.6 | 9 | under-clicked"),
            ("homepage within range", "| `/` | 150 | 4.0 | ~10.5 | 9 | within the expected range |"),
            ("small page not judged", "| `/services/odoo-erp` | 60 | 45.0 | ~0.1 | 0 | too few impressions to judge (<100) |"),
            ("http duplicate called out", "`http://peregrine-it.com/` 20 impr."),
            ("page mover", "| `/blog/mls-idx-integration-cost` | 9 | +8 | 320 | +170 | 5.0 | 6.5 |"),
            ("query mover", "| mls api cost | 5 | +4 | 90 | +50 | 5.0 | 6.0 |"),
            ("experiment with 300+ gets a verdict", "| 109 / 6.5 / 1 | 320 / 5.0 / 9 | KEEP: CTR 0.9% -> 2.8%, position change -1.5 |"),
            ("experiment under 300 gets none", "| 14 / 41.5 / 0 | 60 / 45.0 / 0 | no verdict yet: 60 of 300 impressions |"),
            ("spanning export reported", "span the change date and cannot be split by day"),
            ("cannibalized query listed", "| mls idx cost calculator | `/blog/mls-idx-integration-cost` 15 impr., pos. 12.0 †<br>`/tools/mls-idx-cost-calculator` 10 impr., pos. 9.0 † | 25 |"),
            ("watch pair overlap", "| OVERLAP on: mls idx cost calculator |"),
            ("unexported watch pair says so", "nothing to compare yet"),
            ("US row", "| **United States** | 500 | 62.5% | 10 | 62.5% | 11.0 |"),
            ("Canada row", "| **Canada** | 100 | 12.5% | 2 | 12.5% | 8.0 |"),
            ("US + Canada row", "| **US + Canada (target market)** | 600 | 75.0% | 12 | 75.0% |"),
            ("country share change", "US + Canada share of impressions was 70.0% in the previous export and is 75.0% now"),
            ("few clicks flagged", "click shares rest on 16 click(s)"),
            ("next edits grouped by page", "**`/tools/mls-idx-cost-calculator`**"),
            ("next edit row", "| idx fee estimate | 5 | 14.0 † |"),
            ("next edit without a page", "| real time bom sync erp | 6 | 15.0 † |"),
            ("AI queries counted", "1 of 6 listed queries, 8 impressions, 0 click(s)"),
            ("AI query listed with word count", f"| {AI_QUERY} | 8 | 1.0 | 10 |"),
            ("CTR curve labelled as assumed", "Expected-CTR curve (assumed, not measured for this site)"),
        ]:
            check("report: " + name, needle in r, needle)
        top_queries = r[r.index("## 4."):r.index("## 5.")]
        check("AI query is not in the typed-query table", AI_QUERY not in top_queries)
        next_edits = r[r.index("## 9."):r.index("## 10.")]
        check("'idx cost per month' is attributed to its page, not listed as unknown", next_edits.count("idx cost per month") == 1)

        # No previous export: no change is invented.
        solo = os.path.join(tmp, "solo"); os.makedirs(solo)
        shutil.copy(os.path.join(EXPORTS, "peregrine-it.com-Performance-on-Search-2026-10-17.zip"), solo)
        r2 = g.build_report(solo, TASKS, "2026-10-10", "2026-10-17")[0]
        check("single export: no change computed", "**no change is computed**" in r2 and "| Change |" not in r2)
        check("single export: cannibalization not guessed", "**Cannot be determined from these exports.**" in r2)
        check("single export: movers unavailable", "Not available: needs an earlier export" in r2)
        empty = os.path.join(tmp, "empty"); os.makedirs(empty)
        shutil.copy(os.path.join(EXPORTS, "peregrine-it.com-Coverage-2026-10-17.xlsx"), empty)
        eq("folder with no Performance export exits 2", run_cli(empty)[0], 2)
        eq("missing folder exits 2", run_cli(os.path.join(tmp, "nope"))[0], 2)
        code, stdout, _ = run_cli("--help"); check("--help works", code == 0 and "Exit codes" in stdout)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


def test_real(folder):
    files = sorted(glob.glob(os.path.join(folder, "peregrine-it.com-Performance-on-Search-2026-10-09*.xlsx")))
    if len(files) < 4:
        print(f"real-export checks: skipped (the four 2026-10-09 exports are not in {folder})"); return
    print(f"real-export checks ({len(files)} files copied from {folder}; originals untouched)")
    tmp = tempfile.mkdtemp()
    try:
        for f in files: shutil.copy(f, tmp)
        exports = g.load_folder(tmp); current, previous, _ = g.assign_roles(exports)
        t = current.totals()
        eq("window", (current.start, current.end), ("2026-09-28", "2026-10-05"))
        eq("468 impressions", t["impressions"], 468.0); eq("7 clicks", t["clicks"], 7.0)
        eq("CTR 1.50%", round(t["ctr"], 4), 0.015); eq("average position 15.6", round(t["position"], 1), 15.6)
        check("no previous export (all four end by the same day or are hourly)", previous is None)
        eq("88 queries listed", len(current.queries), 88); eq("17 are 7+ words", sum(1 for r in current.queries if g.is_ai_query(r["key"])), 17)
        eq("25 AI-surface impressions", sum(r["impressions"] for r in current.queries if g.is_ai_query(r["key"])), 25.0)
        top = max(current.pages, key=lambda r: r["impressions"])
        eq("top page", (g.path_of(top["key"]), top["impressions"], top["clicks"]), ("/blog/mls-idx-integration-cost", 109.0, 1.0))
        us = next(r for r in current.countries if r["key"] == "United States"); ca = next(r for r in current.countries if r["key"] == "Canada")
        eq("US impressions 267, Canada 15", (us["impressions"], ca["impressions"]), (267.0, 15.0))
        eq("one window counted once: two duplicates/short windows are not 'current'", sum(1 for e in exports if e.role == "CURRENT"), 1)
        r = g.build_report(tmp, os.path.join(ROOT, "docs", "seo", "TASKS.md"), g.DEFAULT_EXPERIMENTS_START, "2026-10-10")[0]
        check("only the cost guide is called under-clicked", r.count("under-clicked (chance") == 1 and "| `/blog/mls-idx-integration-cost` | 109 | 6.5 |" in r)
        check("all seven experiments say no verdict yet", r.count("no verdict yet: 0 of 300 impressions") == 7)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv: print(__doc__); sys.exit(0)
    if "--write-fixtures" in sys.argv: write_fixtures(); sys.exit(0)
    real = sys.argv[sys.argv.index("--real") + 1] if "--real" in sys.argv else os.path.expanduser("~/Downloads")
    test_units(); test_fixtures(); test_real(real)
    failed = [n for n, ok in results if not ok]
    print(f"\n{len(results) - len(failed)} passed, {len(failed)} failed")
    sys.exit(1 if failed else 0)
