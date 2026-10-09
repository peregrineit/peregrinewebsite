#!/usr/bin/env python3
"""Integration tests for POST /api/lead. Stdlib only; sends nothing to the outside world.

Runs the built app (`npm run build` first) on port 3059 in four configurations, with
Resend and the CRM webhook both pointed at a local mock server:

  none          no RESEND_API_KEY, no LEAD_WEBHOOK_URL
  webhook       LEAD_WEBHOOK_URL only
  resend        RESEND_API_KEY only (RESEND_BASE_URL -> mock)
  both          both destinations

Usage: python3 scripts/test_lead_api.py      (exits 1 on any failure)
"""
import http.server, json, os, subprocess, sys, threading, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_PORT, MOCK_PORT = 3059, 3997
APP = f"http://127.0.0.1:{APP_PORT}"
MOCK = f"http://127.0.0.1:{MOCK_PORT}"
FROM = "Peregrine IT <hello@test.invalid>"

state = {"emails": [], "hooks": [], "resend_fail": False, "hook_fail": False}

class Mock(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        if self.path.startswith("/emails"):
            if state["resend_fail"]:
                return self._send(422, {"name": "validation_error", "message": "mock failure", "statusCode": 422})
            state["emails"].append(body)
            return self._send(200, {"id": f"mock-{len(state['emails'])}"})
        if self.path.startswith("/hook"):
            if state["hook_fail"]:
                return self._send(500, {"error": "mock failure"})
            state["hooks"].append(body)
            return self._send(200, {"ok": True})
        self._send(404, {})
    def _send(self, code, obj):
        data = json.dumps(obj).encode()
        self.send_response(code); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)
    def log_message(self, *a): pass

def status():
    with urllib.request.urlopen(APP + "/api/lead", timeout=30) as r: return json.loads(r.read())

def post(payload, ip):
    req = urllib.request.Request(APP + "/api/lead", data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json", "X-Forwarded-For": ip})
    try:
        with urllib.request.urlopen(req, timeout=30) as r: return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b"{}")

def start_app(env_extra):
    env = {k: v for k, v in os.environ.items() if k not in ("RESEND_API_KEY", "LEAD_WEBHOOK_URL", "LEAD_FROM_EMAIL", "RESEND_BASE_URL")}
    env.update(env_extra, PORT=str(APP_PORT))
    proc = subprocess.Popen(["npx", "next", "start"], cwd=ROOT, env=env, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    for _ in range(60):
        try: urllib.request.urlopen(APP + "/robots.txt", timeout=2); return proc
        except Exception: time.sleep(0.5)
    proc.kill(); raise RuntimeError("app did not start")

def stop_app(proc):
    proc.terminate()
    try: proc.wait(timeout=10)
    except subprocess.TimeoutExpired: proc.kill()
    subprocess.run(f"lsof -tiTCP:{APP_PORT} -sTCP:LISTEN | xargs kill 2>/dev/null", shell=True)
    time.sleep(0.5)

LEAD = {"form": "strategy-call", "service": "service:saas-development", "name": "Test Person", "email": "lead@example.com",
        "company": "Acme", "projectType": "new-build", "timeline": "asap", "message": "Integration test message.",
        "pageUrl": "http://localhost/services/saas-development", "landingPage": "/blog/mls-idx-integration-cost",
        "referrer": "https://www.google.com/", "utm": "utm_source=test"}

fails, passed, ipn = [], 0, [0]
def ip():
    ipn[0] += 1; return f"10.0.0.{ipn[0]}"
def check(name, cond, detail=""):
    global passed
    if cond: passed += 1
    else: fails.append(f"{name} {detail}")
def reset(): state.update(emails=[], hooks=[], resend_fail=False, hook_fail=False)

RESEND_ENV = {"RESEND_API_KEY": "re_test_mock", "RESEND_BASE_URL": MOCK, "LEAD_FROM_EMAIL": FROM}
HOOK_ENV = {"LEAD_WEBHOOK_URL": MOCK + "/hook"}

def run():
    server = http.server.ThreadingHTTPServer(("127.0.0.1", MOCK_PORT), Mock)
    threading.Thread(target=server.serve_forever, daemon=True).start()

    # --- none: nothing configured -> honest error, never a false "sent"
    app = start_app({})
    try:
        check("none: status endpoint reports nothing configured", status() == {"ok": False, "resend": False, "sender": "resend-test-sender", "webhook": False}, f"got {status()}")
        s, b = post(LEAD, ip()); check("none: 502 when no destination", s == 502 and "info@peregrine-it.com" in b.get("error", ""), f"got {s} {b}")
        s, b = post({**LEAD, "pit_confirm_field": "http://spam"}, ip()); check("honeypot: 200 and dropped", s == 200 and b.get("success") is True, f"got {s}")
        s, b = post({**LEAD, "email": "nope"}, ip()); check("validation: bad email 400", s == 400)
        s, b = post({**LEAD, "name": " "}, ip()); check("validation: empty name 400", s == 400)
        s, b = post({**LEAD, "message": "short"}, ip()); check("validation: short message 400", s == 400)
        s, b = post(None, ip()); check("validation: null body 400", s == 400, f"got {s}")
        s, b = post({**LEAD, "website": "https://acme.example"}, ip()); check("autofilled `website` is not treated as spam", s == 502, f"got {s}")
        one = ip(); codes = [post(LEAD, one)[0] for _ in range(6)]
        check("rate limit: 6th request from one IP is 429", codes[:5] == [502] * 5 and codes[5] == 429, f"got {codes}")
    finally: stop_app(app)

    # --- webhook only
    reset(); app = start_app(HOOK_ENV)
    try:
        s, b = post(LEAD, ip()); h = state["hooks"]
        check("webhook: 200", s == 200 and b.get("success") is True, f"got {s} {b}")
        check("webhook: one delivery, no email", len(h) == 1 and not state["emails"])
        if h:
            for k in ("name", "email", "company", "form", "projectType", "timeline", "service", "message", "pageUrl", "landingPage", "referrer", "utm"):
                check(f"webhook: field {k}", h[0].get(k) == LEAD[k], f"got {h[0].get(k)!r}")
            check("webhook: receivedAt + source", "receivedAt" in h[0] and h[0].get("source") == "peregrine-it.com")
            check("webhook: honeypot field not forwarded", "pit_confirm_field" not in h[0] and "website" not in h[0])
        s, _ = post({**LEAD, "budget": "2-6-months", "timeline": ""}, ip())
        check("webhook: legacy `budget` maps to timeline", s == 200 and state["hooks"][-1].get("timeline") == "2-6-months")
        reset(); state["hook_fail"] = True
        s, b = post(LEAD, ip()); check("webhook: 502 when the webhook fails and nothing else is configured", s == 502, f"got {s}")
        reset(); s, _ = post({**LEAD, "pit_confirm_field": "x"}, ip()); check("honeypot: nothing delivered", s == 200 and not state["hooks"])
    finally: stop_app(app)

    # --- resend only (mocked)
    reset(); app = start_app(RESEND_ENV)
    try:
        s, b = post(LEAD, ip()); e = state["emails"]
        check("resend: 200", s == 200 and b.get("success") is True, f"got {s} {b}")
        check("resend: notification + auto-reply", len(e) == 2, f"got {len(e)} emails")
        if len(e) == 2:
            n, a = e
            check("resend: notification to info@", n.get("to") in ("info@peregrine-it.com", ["info@peregrine-it.com"]), f"got {n.get('to')}")
            check("resend: from is LEAD_FROM_EMAIL", n.get("from") == FROM and a.get("from") == FROM, f"got {n.get('from')}")
            check("resend: reply-to is the lead", n.get("reply_to") in ("lead@example.com", ["lead@example.com"]), f"got {n.get('reply_to')}")
            check("resend: body has attribution", all(x in n.get("text", "") for x in ("Acme", "asap", "/blog/mls-idx-integration-cost", "utm_source=test", "service:saas-development")))
            check("resend: auto-reply to the lead", a.get("to") in ("lead@example.com", ["lead@example.com"]))
        reset(); state["resend_fail"] = True
        s, b = post(LEAD, ip()); check("resend: 502 when Resend rejects and nothing else is configured", s == 502, f"got {s} {b}")
    finally: stop_app(app)

    # --- both
    reset(); app = start_app({**RESEND_ENV, **HOOK_ENV})
    try:
        st = status(); check("both: status endpoint reports both, no secret values", st == {"ok": True, "resend": True, "sender": "verified-domain", "webhook": True}, f"got {st}")
        s, _ = post(LEAD, ip()); check("both: 200, 2 emails, 1 webhook", s == 200 and len(state["emails"]) == 2 and len(state["hooks"]) == 1)
        reset(); state["resend_fail"] = True
        s, _ = post(LEAD, ip()); check("both: Resend down, webhook still receives -> 200", s == 200 and len(state["hooks"]) == 1, f"got {s}")
        reset(); state["hook_fail"] = True
        s, _ = post(LEAD, ip()); check("both: webhook down, email still sent -> 200", s == 200 and len(state["emails"]) == 2, f"got {s}")
        reset(); state["resend_fail"] = state["hook_fail"] = True
        s, _ = post(LEAD, ip()); check("both: everything down -> 502", s == 502, f"got {s}")
    finally: stop_app(app)
    server.shutdown()

if __name__ == "__main__":
    if not os.path.isdir(os.path.join(ROOT, ".next")): sys.exit("No build found. Run `npm run build` first.")
    run()
    print(f"lead API integration tests: {passed} passed, {len(fails)} failed")
    for f in fails: print("  FAIL " + f)
    sys.exit(1 if fails else 0)
