#!/usr/bin/env python3
"""Metadata snapshot: catch an unintended change to titles, descriptions, canonicals, H1s,
robots directives or JSON-LD types. Stdlib only. Read-only (GET).

    python3 scripts/meta_snapshot.py                         # compare http://localhost:3057 with the baseline
    python3 scripts/meta_snapshot.py http://localhost:3080   # compare another build
    python3 scripts/meta_snapshot.py https://peregrine-it.com --update   # rewrite the baseline from production

The baseline (tests/fixtures/meta-baseline.json) holds, for every sitemap URL: HTTP status, title,
meta description, canonical, H1 text, robots meta and the sorted JSON-LD @types. An intended change
(a new page, a new title) shows up as a diff: review it, then refresh the baseline with --update
from the build you reviewed and commit the JSON with the change.

Exit codes: 0 identical to the baseline (or baseline written); 1 differences found; 2 could not run.
"""
import argparse, datetime as dt, html, json, os, re, sys, urllib.error, urllib.parse, urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_BASELINE = os.path.join(ROOT, "tests", "fixtures", "meta-baseline.json")
FIELDS = ("status", "title", "description", "canonical", "h1", "robots", "jsonld_types")


def get(url, timeout=30):
    req = urllib.request.Request(url, headers={"User-Agent": "peregrine-meta-snapshot"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r: return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""


def text_of(fragment):
    fragment = re.sub(r"</?(a|strong|em|b|i|span|time|code|sup|sub)\b[^>]*>", "", fragment)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())


def meta(page, name):
    for tag in re.findall(r"<meta\b[^>]*>", page):
        if re.search(r'\bname="%s"' % re.escape(name), tag):
            m = re.search(r'\bcontent="([^"]*)"', tag)
            return html.unescape(m.group(1)) if m else ""
    return None


def types_of(node, out):
    """Every @type in the JSON-LD, nested ones included."""
    if isinstance(node, dict):
        t = node.get("@type")
        if isinstance(t, str): out.append(t)
        elif isinstance(t, list): out.extend(x for x in t if isinstance(x, str))
        for v in node.values(): types_of(v, out)
    elif isinstance(node, list):
        for v in node: types_of(v, out)


def extract(status, page):
    body = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", page, flags=re.S)
    title = re.search(r"<title[^>]*>(.*?)</title>", page, re.S)
    canon = None
    for tag in re.findall(r"<link\b[^>]*>", page):
        if re.search(r'\brel="canonical"', tag):
            m = re.search(r'\bhref="([^"]*)"', tag); canon = html.unescape(m.group(1)) if m else ""; break
    types = []
    for block in re.findall(r'<script type="application/ld\+json"[^>]*>(.*?)</script>', page, re.S):
        try: types_of(json.loads(block), types)
        except json.JSONDecodeError: types.append("INVALID JSON-LD")
    return {"status": status, "title": html.unescape(title.group(1)).strip() if title else None, "description": meta(page, "description"),
            "canonical": canon, "h1": [text_of(h) for h in re.findall(r"<h1\b[^>]*>(.*?)</h1>", body, re.S)],
            "robots": meta(page, "robots"), "jsonld_types": sorted(types)}


def snapshot(base, workers=4):
    status, sm = get(base + "/sitemap.xml")
    if status != 200: raise RuntimeError(f"{base}/sitemap.xml returned {status}")
    paths = []
    for loc in re.findall(r"<loc>([^<]+)</loc>", sm):
        p = urllib.parse.urlsplit(html.unescape(loc.strip())).path.rstrip("/") or "/"
        if p not in paths: paths.append(p)
    if not paths: raise RuntimeError("the sitemap lists no URL")
    with ThreadPoolExecutor(workers) as ex:
        pages = list(ex.map(lambda p: (p, extract(*get(base + p))), paths))
    return dict(pages)


def diff(baseline, current):
    """List of human-readable differences; empty when identical."""
    out = []
    for p in sorted(set(baseline) - set(current)): out.append(f"REMOVED  {p}: in the baseline, not in the sitemap now")
    for p in sorted(set(current) - set(baseline)): out.append(f"ADDED    {p}: in the sitemap now, not in the baseline (title: {current[p].get('title')!r})")
    for p in sorted(set(baseline) & set(current)):
        for f in FIELDS:
            a, b = baseline[p].get(f), current[p].get(f)
            if a != b:
                if f == "jsonld_types":
                    gone = sorted(set(a or []) - set(b or [])); new = sorted(set(b or []) - set(a or []))
                    detail = "; ".join(x for x in (f"removed {gone}" if gone else "", f"added {new}" if new else "") if x) or f"counts changed: {a} -> {b}"
                    out.append(f"CHANGED  {p} jsonld_types: {detail}")
                else:
                    out.append(f"CHANGED  {p} {f}:\n           baseline: {a!r}\n           now:      {b!r}")
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description="Compare a site's titles, descriptions, canonicals, H1s, robots meta and JSON-LD types with a committed baseline.",
                                 epilog="Exit codes: 0 identical (or baseline written); 1 differences; 2 could not run.")
    ap.add_argument("base", nargs="?", default="http://localhost:3057", help="site base URL (default http://localhost:3057)")
    ap.add_argument("--baseline", default=DEFAULT_BASELINE, help="baseline JSON (default tests/fixtures/meta-baseline.json)")
    ap.add_argument("--update", action="store_true", help="write the baseline from BASE instead of comparing")
    a = ap.parse_args(argv)
    base = a.base.rstrip("/")
    try: pages = snapshot(base)
    except Exception as e:
        print(f"meta_snapshot: cannot read {base}: {type(e).__name__}: {e}", file=sys.stderr); return 2
    if a.update:
        bad = [p for p, d in pages.items() if d["status"] != 200]
        if bad:
            print(f"meta_snapshot: refusing to write a baseline: {len(bad)} page(s) did not return 200: {bad[:5]}", file=sys.stderr); return 2
        os.makedirs(os.path.dirname(os.path.abspath(a.baseline)), exist_ok=True)
        with open(a.baseline, "w", encoding="utf-8") as f:
            json.dump({"source": base, "captured": dt.date.today().isoformat(), "fields": list(FIELDS), "pages": pages}, f, indent=1, ensure_ascii=False, sort_keys=True); f.write("\n")
        print(f"meta_snapshot: baseline written: {len(pages)} URLs from {base} -> {os.path.relpath(a.baseline)}"); return 0
    try: base_doc = json.load(open(a.baseline, encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        print(f"meta_snapshot: cannot read the baseline {a.baseline}: {e}. Create it with --update.", file=sys.stderr); return 2
    differences = diff(base_doc["pages"], pages)
    head = f"meta_snapshot: {base} against the baseline from {base_doc.get('source')} ({base_doc.get('captured')}): {len(pages)} URLs now, {len(base_doc['pages'])} in the baseline"
    if not differences:
        print(head); print("DIFFERENCES: 0"); return 0
    print(head); print(f"DIFFERENCES: {len(differences)}")
    for d in differences: print("  " + d)
    print("If every change is intended, refresh the baseline with --update from the reviewed build and commit it.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
