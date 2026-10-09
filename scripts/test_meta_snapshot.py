#!/usr/bin/env python3
"""Tests for scripts/meta_snapshot.py against a local mock site. Stdlib only.

Usage: python3 scripts/test_meta_snapshot.py   (exit 1 on any failure)
Also checks that the committed baseline (tests/fixtures/meta-baseline.json) is well formed.
"""
import http.server, json, os, subprocess, sys, tempfile, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(ROOT, "scripts", "meta_snapshot.py")
results = []
def page(title="Guide A | Peregrine IT", desc="What a guide &amp; a page say.", canon="https://peregrine-it.com/blog/a", h1="Guide <span>A</span>",
         robots="index, follow, max-image-preview:large", extra_ld=""):
    return f'''<html><head><title>{title}</title><meta name="description" content="{desc}"/><link rel="canonical" href="{canon}"/>
<meta name="robots" content="{robots}"/><script type="application/ld+json">{{"@context":"https://schema.org","@graph":[{{"@type":"Organization","founder":{{"@type":"Person"}}}},{{"@type":"Article"}}{extra_ld}]}}</script>
<script>var x = "<h1>not a heading</h1>";</script></head><body><h1 class="t">{h1}</h1></body></html>'''
site = {}
def reset():
    site.clear(); site.update({"/": page("Home | Peregrine IT", canon="https://peregrine-it.com", h1="Home"), "/blog/a": page(), "/services/s": page("Service S | Peregrine IT", canon="https://peregrine-it.com/services/s", h1="Service S")})

class Mock(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/sitemap.xml":
            body = "<urlset>" + "".join(f"<url><loc>https://peregrine-it.com{'' if p == '/' else p}</loc></url>" for p in site if site[p] is not None) + "</urlset>"; code = 200
        elif self.path in site and site[self.path] != "500": body, code = site[self.path], 200
        elif site.get(self.path) == "500": body, code = "", 500
        else: body, code = "", 404
        data = body.encode(); self.send_response(code); self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)
    def log_message(self, *a): pass

def check(name, cond, detail=""):
    results.append(bool(cond)); print(("  ok   " if cond else "  FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))
def run(*args):
    p = subprocess.run([sys.executable, SCRIPT, *args], capture_output=True, text=True); return p.returncode, p.stdout + p.stderr

if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv: print(__doc__); sys.exit(0)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Mock); threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}"; tmp = tempfile.mkdtemp(); bl = os.path.join(tmp, "b.json")
    reset()
    code, out = run(base, "--baseline", bl)
    check("comparing without a baseline exits 2", code == 2 and "--update" in out, out)
    code, out = run(base, "--baseline", bl, "--update")
    check("--update writes the baseline and exits 0", code == 0 and "3 URLs" in out, out)
    b = json.load(open(bl))["pages"]
    check("fields captured", b["/blog/a"] == {"status": 200, "title": "Guide A | Peregrine IT", "description": "What a guide & a page say.", "canonical": "https://peregrine-it.com/blog/a",
                                               "h1": ["Guide A"], "robots": "index, follow, max-image-preview:large", "jsonld_types": ["Article", "Organization", "Person"]}, str(b["/blog/a"]))
    check("an <h1> inside a script is not counted", len(b["/"]["h1"]) == 1)
    code, out = run(base, "--baseline", bl)
    check("unchanged site: exit 0 and DIFFERENCES: 0", code == 0 and "DIFFERENCES: 0" in out, out)
    for label, change, needle in [
        ("title", dict(title="Guide A, Renamed | Peregrine IT"), "CHANGED  /blog/a title"),
        ("description", dict(desc="Another description."), "CHANGED  /blog/a description"),
        ("canonical", dict(canon="https://peregrine-it.com/blog/b"), "CHANGED  /blog/a canonical"),
        ("H1", dict(h1="Guide B"), "CHANGED  /blog/a h1"),
        ("robots (noindex)", dict(robots="noindex"), "CHANGED  /blog/a robots"),
        ("JSON-LD types", dict(extra_ld=',{"@type":"FAQPage"}'), "CHANGED  /blog/a jsonld_types: added ['FAQPage']")]:
        reset(); site["/blog/a"] = page(**change); code, out = run(base, "--baseline", bl)
        check(f"changed {label}: exit 1 and reported", code == 1 and needle in out and "DIFFERENCES: 1" in out, out)
    reset(); site["/blog/new"] = page("New | Peregrine IT"); code, out = run(base, "--baseline", bl)
    check("new sitemap URL: exit 1, ADDED", code == 1 and "ADDED    /blog/new" in out, out)
    reset(); site["/services/s"] = None; code, out = run(base, "--baseline", bl)
    check("URL dropped from the sitemap: exit 1, REMOVED", code == 1 and "REMOVED  /services/s" in out, out)
    reset(); site["/services/s"] = "500"; code, out = run(base, "--baseline", bl)
    check("page returning 500: exit 1, status change reported", code == 1 and "CHANGED  /services/s status" in out, out)
    code, out = run(base, "--baseline", os.path.join(tmp, "c.json"), "--update")
    check("--update refuses to record a failing page", code == 2 and not os.path.exists(os.path.join(tmp, "c.json")), out)
    code, out = run("http://127.0.0.1:1", "--baseline", bl); check("unreachable site exits 2", code == 2, out)
    code, out = run("--help"); check("--help works", code == 0 and "Exit codes" in out)
    committed = os.path.join(ROOT, "tests", "fixtures", "meta-baseline.json")
    if os.path.exists(committed):
        doc = json.load(open(committed, encoding="utf-8")); pages = doc["pages"]
        check("committed baseline: source is production", doc["source"] == "https://peregrine-it.com", doc["source"])
        check("committed baseline: every page 200 with title, description, self canonical and one H1",
              all(d["status"] == 200 and d["title"] and d["description"] and len(d["h1"]) == 1 and
                  d["canonical"].rstrip("/") == ("https://peregrine-it.com" + p).rstrip("/") for p, d in pages.items()))
    else:
        print("  (committed baseline not present yet: skipped)")
    srv.shutdown()
    print(f"\n{sum(results)} passed, {len(results) - sum(results)} failed"); sys.exit(0 if all(results) else 1)
