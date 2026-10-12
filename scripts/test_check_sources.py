#!/usr/bin/env python3
"""Tests for scripts/check_sources.py against a local mock site and mock targets. Stdlib only.

Usage: python3 scripts/test_check_sources.py   (exit 1 on any failure; takes about 10 seconds)

The mock site is reached as http://localhost:<port> and its "external" targets as
http://127.0.0.1:<port>, so they count as a different host. Nothing leaves this machine.
"""
import http.server, importlib.util, json, os, subprocess, sys, tempfile, threading, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(ROOT, "scripts", "check_sources.py")
spec = importlib.util.spec_from_file_location("check_sources", SCRIPT)
cs = importlib.util.module_from_spec(spec); spec.loader.exec_module(cs)
hits, results = [], []
state = {"flaky": 0}

def check(name, cond, detail=""):
    results.append(bool(cond)); print(("  ok   " if cond else "  FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))

class Mock(http.server.BaseHTTPRequestHandler):
    def send(self, code, body="ok", headers=None):
        self.send_response(code)
        for k, v in (headers or {}).items(): self.send_header(k, v)
        data = body.encode(); self.send_header("Content-Length", str(len(data))); self.end_headers()
        if self.command != "HEAD": self.wfile.write(data)
    def route(self):
        port = self.server.server_address[1]; T = f"http://127.0.0.1:{port}"
        path = self.path.split("?")[0]
        hits.append((self.command, self.headers.get("Host", "").split(":")[0], self.path, time.monotonic(), self.headers.get("User-Agent", "")))
        if path == "/sitemap.xml":
            locs = ["/", "/blog/guide-a", "/services/svc", "/industries/ind", "/tools/tool", "/case-studies/skip-me"]
            return self.send(200, "<urlset>" + "".join(f"<url><loc>https://peregrine-it.com{p}</loc></url>" for p in locs) + "</urlset>")
        if path == "/blog/guide-a":
            return self.send(200, f'''<html><body><a href="/contact">internal</a><a href="https://peregrine-it.com/about">own domain</a>
              <a href="{T}/ok#section" class="cp-src">A source</a> <a class="cp-src" href="{T}/moved">Moved source</a>
              <a href="{T}/slash">slash</a> <a href="{T}/missing">gone</a> <a href="{T}/boom">boom</a> <a href="{T}/forbidden">forbidden</a>
              <a href="{T}/private">private</a> <a href="{T}/head-405">head405</a> <a href="{T}/flaky">flaky</a> <a href="{T}/slow">slow</a>
              <a href="{T}/limited">limited</a><a href="mailto:x@example.com">mail</a><script>var a='<a href="{T}/in-script">x</a>'</script></body></html>''')
        if path in ("/services/svc", "/industries/ind", "/tools/tool"):
            return self.send(200, f'<html><body><a href="{T}/ok">Same source again</a><a href="http://127.0.0.1:1/refused">refused</a></body></html>')
        if path in ("/", "/case-studies/skip-me"): return self.send(200, f'<a href="{T}/not-in-scope">x</a>')
        if path in ("/ok", "/new-home", "/slash/"): return self.send(200)
        if path == "/moved": return self.send(301, "", {"Location": "/hop"})
        if path == "/hop": return self.send(302, "", {"Location": f"{T}/new-home"})
        if path == "/slash": return self.send(308, "", {"Location": "/slash/"})
        if path == "/missing": return self.send(404)
        if path == "/boom": return self.send(500)
        if path == "/forbidden": return self.send(403)
        if path == "/limited": return self.send(429)
        if path == "/private": return self.send(302, "", {"Location": "/login?next=/private"})
        if path == "/login": return self.send(200)
        if path == "/head-405": return self.send(405 if self.command == "HEAD" else 200)
        if path == "/flaky":
            if self.command == "GET": state["flaky"] += 1
            return self.send(200 if state["flaky"] >= 2 else 503)
        if path == "/slow":
            time.sleep(2.5); return self.send(200)
        self.send(404)
    do_GET = do_HEAD = route
    def do_POST(self): hits.append(("POST", "", self.path, 0, "")); self.send(405)
    def log_message(self, *a): pass

if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv: print(__doc__); sys.exit(0)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Mock)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    port = srv.server_address[1]; T = f"http://127.0.0.1:{port}"
    tmp = tempfile.mkdtemp(); md, js = os.path.join(tmp, "r.md"), os.path.join(tmp, "r.json")
    p = subprocess.run([sys.executable, SCRIPT, f"http://localhost:{port}", "--out-md", md, "--out-json", js, "--timeout", "1", "--host-interval", "0.3", "--today", "2026-10-10"],
                       capture_output=True, text=True)
    data = json.load(open(js)); by = {r["url"].replace(T, "").replace("http://127.0.0.1:1", "X"): r for r in data["links"]}
    report = open(md).read()
    check("exit code 1 when something is broken", p.returncode == 1, f"{p.returncode} {p.stderr}")
    check("only guide, tool, service and industry pages are crawled", data["pages"] == ["/blog/guide-a", "/services/svc", "/industries/ind", "/tools/tool"], str(data["pages"]))
    check("13 distinct external links (internal, own-domain, mailto, in-script and out-of-scope ones are not collected)", len(data["links"]) == 13, str(sorted(by)))
    expect = {"/ok#section": "ok", "/ok": "ok", "/moved": "redirected", "/slash": "redirected", "/missing": "client-error", "/boom": "server-error",
              "/forbidden": "blocked-or-login", "/limited": "blocked-or-login", "/private": "blocked-or-login", "/head-405": "ok", "/flaky": "ok",
              "/slow": "timeout", "X/refused": "connection-error"}
    for path, cls in expect.items():
        check(f"{path} is {cls}", by.get(path, {}).get("class") == cls, str(by.get(path)))
    check("moved link records the destination and both hops", by["/moved"]["final_url"] == T + "/new-home" and [h["status"] for h in by["/moved"]["redirects"]] == [301, 302])
    check("moved link is described as moved", by["/moved"]["note"].startswith("moved to"))
    check("trailing-slash redirect is described as the same page", by["/slash"]["note"].startswith("same page"), by["/slash"]["note"])
    check("sign-in redirect is named", "sign-in page" in by["/private"]["note"])
    check("HEAD 405 falls back to GET", by["/head-405"]["method"] == "GET")
    check("flaky link passes on the single retry", by["/flaky"]["attempts"] == 2)
    check("a failing link is tried at most twice", by["/boom"]["attempts"] == 2 and by["/slow"]["attempts"] == 2 and by["/missing"]["attempts"] == 1)
    check("link pages are recorded", by["/ok"]["pages"] == ["/industries/ind", "/services/svc", "/tools/tool"], str(by["/ok"]["pages"]))
    check("source citations are marked", by["/ok#section"]["source_citation"] and by["/moved"]["source_citation"] and not by["/missing"]["source_citation"])
    check("fragment is not sent to the server", not any("#" in h[2] for h in hits))
    target_hits = [h for h in hits if h[1] == "127.0.0.1"]
    check("only HEAD and GET are ever sent", {h[0] for h in hits} <= {"HEAD", "GET"}, str({h[0] for h in hits}))
    check("browser-like User-Agent on link checks", all("Mozilla/5.0" in h[4] for h in target_hits))
    times = sorted(h[3] for h in target_hits); gaps = [b - a for a, b in zip(times, times[1:])]
    check("requests to one host are spaced by the host interval", min(gaps) >= 0.25, f"min gap {min(gaps):.3f}s over {len(times)} requests")
    check("counts in JSON", data["counts"] == {"ok": 4, "redirected": 2, "client-error": 1, "server-error": 1, "blocked-or-login": 3, "timeout": 1, "connection-error": 1}, str(data["counts"]))
    for name, needle in [("summary", "**Broken (needs a fix or a manual check): 4.** **Moved: 1.** **Could not be checked automatically: 3.**"),
                         ("broken table row", f"| {T}/missing | client-error: HTTP 404 | link | `/blog/guide-a` |"),
                         ("moved row", f"| {T}/moved | {T}/new-home | 301 → 302 | source | `/blog/guide-a` |"),
                         ("blocked section", "## Blocked or behind a sign-in (3)"), ("same-page section", "## Redirected: same page, different address form (1)")]:
        check("report: " + name, needle in report, needle)
    check("defaults are the polite ones", (cs.MAX_WORKERS, cs.HOST_INTERVAL, cs.TIMEOUT) == (4, 1.0, 15.0))
    c = cs.classify
    check("classify: 999 is blocked", c("https://a.example/x", {"error": None, "status": 999, "final_url": "https://a.example/x", "redirects": []})[0] == "blocked-or-login")
    check("classify: http->https www change is the same page", c("http://a.example/x", {"error": None, "status": 200, "final_url": "https://www.a.example/x/", "redirects": [1]})[1].startswith("same page"))
    check("classify: redirect to login host", c("https://a.example/x", {"error": None, "status": 200, "final_url": "https://login.a.example/start", "redirects": [1]})[0] == "blocked-or-login")
    check("classify: 'author' path is not a login page", c("https://a.example/x", {"error": None, "status": 200, "final_url": "https://a.example/author/x", "redirects": [1]})[0] == "redirected")
    p2 = subprocess.run([sys.executable, SCRIPT, "http://127.0.0.1:1"], capture_output=True, text=True)
    check("unreachable site exits 2", p2.returncode == 2, p2.stderr)
    p3 = subprocess.run([sys.executable, SCRIPT, "--help"], capture_output=True, text=True)
    check("--help works", p3.returncode == 0 and "Exit codes" in p3.stdout)
    srv.shutdown()
    print(f"\n{sum(results)} passed, {len(results) - sum(results)} failed")
    sys.exit(0 if all(results) else 1)
