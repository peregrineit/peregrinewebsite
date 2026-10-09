#!/usr/bin/env python3
"""Integration tests for /api/lead. Stdlib only; sends nothing to the outside world.

Runs the built app (`npm run build` first) on port 3059 in several configurations, with
Resend and the CRM webhook both pointed at a local mock server that behaves like Resend
where it matters: message ids, idempotency keys, error bodies, message status lookup.

  none          no RESEND_API_KEY, no LEAD_WEBHOOK_URL
  webhook       LEAD_WEBHOOK_URL only
  resend        RESEND_API_KEY only (RESEND_BASE_URL -> mock)
  both          both destinations
  unreachable   RESEND_BASE_URL points at a closed port

Usage: python3 scripts/test_lead_api.py      (exits 1 on any failure)
"""
import http.server, json, os, re, subprocess, sys, threading, time, urllib.error, urllib.request, uuid

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP_PORT, MOCK_PORT = 3059, 3997
APP = f"http://127.0.0.1:{APP_PORT}"
MOCK = f"http://127.0.0.1:{MOCK_PORT}"
FROM = "Peregrine IT <hello@test.invalid>"
NOTIFY = "info@peregrine-it.com"

DEFAULTS = dict(emails=[], attempts=0, hooks=[], keys={}, events={}, fail=None, fail_once=None, fail_ack=None,
                hook_fail=False, hook_sleep=0)
state = dict(DEFAULTS, domains=[{"name": "test.invalid", "status": "verified"}])
ERRORS = {
    422: {"statusCode": 422, "name": "validation_error", "message": "Invalid `from` field."},
    403: {"statusCode": 403, "name": "validation_error", "message": "The test.invalid domain is not verified."},
    401: {"statusCode": 401, "name": "invalid_api_key", "message": "API key is invalid"},
    429: {"statusCode": 429, "name": "rate_limit_exceeded", "message": "Too many requests."},
    500: {"statusCode": 500, "name": "internal_server_error", "message": "Something went wrong."},
}

class Mock(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/domains"):
            return self._send(200, {"object": "list", "has_more": False, "data": state["domains"]})
        m = re.match(r"/emails/([0-9a-f-]{36})", self.path)
        if m:
            return self._send(200, {"object": "email", "id": m.group(1), "last_event": state["events"].get(m.group(1), "sent")})
        self._send(404, {})
    def do_POST(self):
        body = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))) or b"{}")
        if self.path.startswith("/emails"):
            state["attempts"] += 1
            to = body.get("to"); to = to[0] if isinstance(to, list) else to
            code = state["fail"] or (state["fail_ack"] if to != NOTIFY else None)
            if state["fail_once"]:
                code, state["fail_once"] = state["fail_once"], None
            if code:
                return self._send(code, ERRORS[code])
            key = self.headers.get("Idempotency-Key")
            if key and key in state["keys"]:      # Resend returns the first response again
                return self._send(200, {"id": state["keys"][key]})
            mid = str(uuid.uuid4())
            if key: state["keys"][key] = mid
            state["emails"].append({**body, "to": to, "_id": mid, "_key": key})
            return self._send(200, {"id": mid})
        if self.path.startswith("/hook"):
            if state["hook_sleep"]: time.sleep(state["hook_sleep"])
            if state["hook_fail"]:
                return self._send(500, {"error": "mock failure"})
            state["hooks"].append({**body, "_key": self.headers.get("Idempotency-Key")})
            return self._send(200, {"ok": True})
        self._send(404, {})
    def _send(self, code, obj):
        data = json.dumps(obj).encode()
        try:
            self.send_response(code); self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)
        except (BrokenPipeError, ConnectionResetError):
            pass                                   # the app gave up waiting (timeout test)
    def log_message(self, *a): pass

def get(path="/api/lead"):
    with urllib.request.urlopen(APP + path, timeout=30) as r: return json.loads(r.read())

def post(payload, ip):
    req = urllib.request.Request(APP + "/api/lead", data=json.dumps(payload).encode(),
                                 headers={"Content-Type": "application/json", "X-Forwarded-For": ip})
    try:
        with urllib.request.urlopen(req, timeout=40) as r: return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e: return e.code, json.loads(e.read() or b"{}")

LOG = os.path.join(ROOT, ".lead-test.log")
def start_app(env_extra):
    env = {k: v for k, v in os.environ.items() if k not in ("RESEND_API_KEY", "LEAD_WEBHOOK_URL", "LEAD_FROM_EMAIL", "RESEND_BASE_URL")}
    env.update(env_extra, PORT=str(APP_PORT))
    proc = subprocess.Popen(["npx", "next", "start"], cwd=ROOT, env=env, stdout=open(LOG, "w"), stderr=subprocess.STDOUT)
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

def app_log():
    try: return open(LOG).read()
    except OSError: return ""

LEAD = {"form": "strategy-call", "service": "service:saas-development", "name": "Test Person", "email": "lead@example.com",
        "company": "Acme", "projectType": "new-build", "timeline": "asap", "message": "Integration test message.",
        "pageUrl": "http://localhost/services/saas-development", "landingPage": "/blog/mls-idx-integration-cost",
        "referrer": "https://www.google.com/", "utm": "utm_source=test"}

fails, passed, ipn = [], 0, [0]
def ip():
    ipn[0] += 1; return f"10.0.{ipn[0] // 250}.{ipn[0] % 250 + 1}"
def check(name, cond, detail=""):
    global passed
    if cond: passed += 1
    else: fails.append(f"{name} {detail}")
def reset(**kw):
    state.update({k: (v.copy() if isinstance(v, (list, dict)) else v) for k, v in DEFAULTS.items()}); state.update(kw)
def to_notify(): return [e for e in state["emails"] if e["to"] == NOTIFY]
def to_visitor(): return [e for e in state["emails"] if e["to"] != NOTIFY]

RESEND_ENV = {"RESEND_API_KEY": "re_test_mock", "RESEND_BASE_URL": MOCK, "LEAD_FROM_EMAIL": FROM}
HOOK_ENV = {"LEAD_WEBHOOK_URL": MOCK + "/hook"}

def run():
    server = http.server.ThreadingHTTPServer(("127.0.0.1", MOCK_PORT), Mock)
    threading.Thread(target=server.serve_forever, daemon=True).start()

    # --- none: nothing configured -> never a success
    reset(); app = start_app({})
    try:
        st = get()
        check("none: status reports nothing configured and no storage",
              st.get("ok") is False and st.get("resend") is False and st.get("sender") == "resend-test-sender"
              and st.get("senderDomainVerified") is None and st.get("webhook") is False and st.get("durableStorage") == "none", f"got {st}")
        s, b = post(LEAD, ip())
        check("none: 502, success false, status not-accepted", s == 502 and b.get("success") is False and b.get("status") == "not-accepted" and NOTIFY in b.get("error", ""), f"got {s} {b}")
        check("none: a reference is still returned for the failed attempt", len(b.get("ref", "")) == 8)
        s, b = post({**LEAD, "pit_confirm_field": "http://spam"}, ip())
        check("honeypot: no false success when nothing can accept the lead", s == 502 and b.get("success") is False, f"got {s} {b}")
        s, b = post({**LEAD, "email": "nope"}, ip()); check("validation: bad email 400", s == 400)
        s, b = post({**LEAD, "name": " "}, ip()); check("validation: empty name 400", s == 400)
        s, b = post({**LEAD, "message": "short"}, ip()); check("validation: short message 400", s == 400)
        s, b = post(None, ip()); check("validation: null body 400", s == 400, f"got {s}")
        s, b = post({**LEAD, "website": "https://acme.example"}, ip()); check("autofilled `website` is not treated as spam", s == 502, f"got {s}")
        one = ip(); codes = [post(LEAD, one)[0] for _ in range(6)]
        check("rate limit: 6th request from one IP is 429", codes[:5] == [502] * 5 and codes[5] == 429, f"got {codes}")
        check("log: failure is logged with the reference, not swallowed", "Lead NOT accepted by any destination" in app_log())
    finally: stop_app(app)

    # --- webhook only
    reset(); app = start_app(HOOK_ENV)
    try:
        s, b = post(LEAD, ip()); h = state["hooks"]
        check("webhook: 200 accepted", s == 200 and b.get("success") is True and b.get("status") == "accepted", f"got {s} {b}")
        check("webhook: response says email was skipped, storage is the webhook",
              b.get("notification", {}).get("status") == "skipped" and b.get("acknowledgement", {}).get("status") == "skipped"
              and b.get("webhook", {}).get("status") == "accepted" and b.get("durableStorage") == "webhook", f"got {b}")
        check("webhook: one delivery, no email", len(h) == 1 and not state["emails"])
        if h:
            for k in ("name", "email", "company", "form", "projectType", "timeline", "service", "message", "pageUrl", "landingPage", "referrer", "utm"):
                check(f"webhook: field {k}", h[0].get(k) == LEAD[k], f"got {h[0].get(k)!r}")
            check("webhook: receivedAt + source + ref", "receivedAt" in h[0] and h[0].get("source") == "peregrine-it.com" and h[0].get("ref") == b.get("ref"))
            check("webhook: idempotency key carries the reference", h[0].get("_key") == f"lead-{b.get('ref')}")
            check("webhook: honeypot field not forwarded", "pit_confirm_field" not in h[0] and "website" not in h[0])
        s, _ = post({**LEAD, "budget": "2-6-months", "timeline": ""}, ip())
        check("webhook: legacy `budget` maps to timeline", s == 200 and state["hooks"][-1].get("timeline") == "2-6-months")
        reset(hook_fail=True)
        s, b = post(LEAD, ip()); check("webhook: 502 when the webhook fails and nothing else is configured", s == 502 and b.get("success") is False, f"got {s}")
        reset(hook_sleep=7)
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("webhook: timeout -> 502 within about 5 s, not a hang", s == 502 and dt < 6.5, f"got {s} in {dt:.1f}s")
        check("log: webhook timeout is named", "webhook timed out" in app_log())
        time.sleep(2.5)
    finally: stop_app(app)

    # --- resend only (mocked)
    reset(); app = start_app(RESEND_ENV)
    try:
        s, b = post(LEAD, ip()); n, a = to_notify(), to_visitor()
        check("resend: 200 accepted", s == 200 and b.get("success") is True and b.get("status") == "accepted", f"got {s} {b}")
        check("resend: one notification and one acknowledgement", len(n) == 1 and len(a) == 1, f"got {len(n)} + {len(a)}")
        check("resend: response never claims delivery", "delivered" not in json.dumps(b).lower())
        check("resend: no durable storage is reported honestly", b.get("durableStorage") == "none")
        if n and a:
            check("resend: notification to info@", n[0]["to"] == NOTIFY)
            check("resend: from is LEAD_FROM_EMAIL on both", n[0].get("from") == FROM and a[0].get("from") == FROM, f"got {n[0].get('from')}")
            check("resend: reply-to is the lead", n[0].get("reply_to") in ("lead@example.com", ["lead@example.com"]), f"got {n[0].get('reply_to')}")
            check("resend: body has attribution", all(x in n[0].get("text", "") for x in ("Acme", "asap", "/blog/mls-idx-integration-cost", "utm_source=test", "service:saas-development")))
            check("resend: acknowledgement to the lead, with the reference", a[0]["to"] == "lead@example.com" and b["ref"] in a[0].get("text", ""))
            check("resend: reference in subject, body and response", f"[{b['ref']}]" in n[0].get("subject", "") and f"Reference: {b['ref']}" in n[0].get("text", ""))
            check("resend: provider message ids returned, one per email",
                  b["notification"] == {"status": "accepted", "id": n[0]["_id"]} and b["acknowledgement"] == {"status": "accepted", "id": a[0]["_id"]}, f"got {b}")
            check("resend: idempotency keys are per message", n[0]["_key"] == f"lead-notify-{b['ref']}" and a[0]["_key"] == f"lead-ack-{b['ref']}")
            log = app_log()
            check("log: ids and per-message status recorded", "Lead accepted" in log and n[0]["_id"] in log and a[0]["_id"] in log)
            check("log: no personal data", "lead@example.com" not in log and "Test Person" not in log and "Integration test message" not in log)
            # delivery lookup: accepted is not delivered until Resend says so
            ids = f"{n[0]['_id']},{a[0]['_id']}"
            ev = get(f"/api/lead?delivery={ids}")["events"]
            check("delivery: accepted message is not reported as delivered", [e["lastEvent"] for e in ev] == ["sent", "sent"], f"got {ev}")
            state["events"][n[0]["_id"]] = "delivered"; state["events"][a[0]["_id"]] = "bounced"
            ev = get(f"/api/lead?delivery={ids}")["events"]
            check("delivery: notification delivered and acknowledgement bounced are told apart", [e["lastEvent"] for e in ev] == ["delivered", "bounced"], f"got {ev}")
            check("delivery: malformed ids are ignored", get("/api/lead?delivery=abc,../x")["events"] == [])

        # duplicates: the same submission sent twice
        reset(); sid = str(uuid.uuid4())
        s1, b1 = post({**LEAD, "submissionId": sid}, ip()); s2, b2 = post({**LEAD, "submissionId": sid}, ip())
        check("duplicate: same submissionId -> same reference", s1 == s2 == 200 and b1["ref"] == b2["ref"] == sid.replace("-", "")[:8], f"got {b1.get('ref')} {b2.get('ref')}")
        check("duplicate: one notification and one acknowledgement in total", len(to_notify()) == 1 and len(to_visitor()) == 1, f"got {len(to_notify())} + {len(to_visitor())}")
        check("duplicate: second response returns the first message ids", b1["notification"]["id"] == b2["notification"]["id"])

        # honeypot: flagged and delivered, never a silent success
        reset(); s, b = post({**LEAD, "pit_confirm_field": "x"}, ip()); n = to_notify()
        check("honeypot: lead still reaches the inbox, marked", s == 200 and len(n) == 1 and n[0]["subject"].startswith("[Possible spam]"), f"got {s} {[e.get('subject') for e in n]}")
        check("honeypot: no acknowledgement is sent", not to_visitor() and b["acknowledgement"]["status"] == "skipped")

        # realistic Resend failures
        reset(fail_once=500)
        s, b = post(LEAD, ip()); check("resend 500 once: retried -> accepted, one notification", s == 200 and len(to_notify()) == 1, f"got {s}")
        reset(fail_once=429)
        s, b = post(LEAD, ip()); check("resend 429 once: retried -> accepted", s == 200 and len(to_notify()) == 1, f"got {s}")
        for code, label in ((422, "invalid from"), (403, "domain not verified"), (401, "invalid API key"), (500, "outage")):
            reset(fail=code); before = len(app_log())
            s, b = post(LEAD, ip())
            check(f"resend {code} ({label}): 502, success false", s == 502 and b.get("success") is False and b.get("status") == "not-accepted", f"got {s} {b}")
            check(f"resend {code}: nothing sent, no acknowledgement attempted", not state["emails"] and state["attempts"] == (1 if code < 500 else 2), f"attempts {state['attempts']}")
            check(f"resend {code}: error name logged", ERRORS[code]["name"] in app_log()[before:], app_log()[before:][-200:])
        check("log: Resend's error message (may echo addresses) is not logged", "is not verified" not in app_log() and "Invalid `from`" not in app_log())
        # acknowledgement fails on its own
        reset(fail_ack=422); before = len(app_log())
        s, b = post(LEAD, ip())
        check("ack failure: lead accepted, acknowledgement reported failed", s == 200 and b["notification"]["status"] == "accepted" and b["acknowledgement"] == {"status": "failed"}, f"got {s} {b}")
        check("ack failure: logged, not swallowed", "Lead accepted with a failed step" in app_log()[before:])
    finally: stop_app(app)

    # --- resend with a sender domain Resend has not verified
    reset(); state["domains"] = [{"name": "test.invalid", "status": "pending"}]; app = start_app(RESEND_ENV)
    try:
        st = get(); check("status: unverified sender domain is reported", st.get("senderDomainVerified") is False and st.get("sender") == "custom", f"got {st}")
    finally: stop_app(app); state["domains"] = [{"name": "test.invalid", "status": "verified"}]

    # --- Resend unreachable (connection refused)
    reset(); app = start_app({**RESEND_ENV, "RESEND_BASE_URL": "http://127.0.0.1:3995"})
    try:
        s, b = post(LEAD, ip()); check("resend unreachable: 502, success false", s == 502 and b.get("success") is False, f"got {s} {b}")
    finally: stop_app(app)

    # --- both
    reset(); app = start_app({**RESEND_ENV, **HOOK_ENV})
    try:
        st = get(); check("both: status reports both, no secret values",
                          st.get("ok") is True and st.get("resend") is True and st.get("sender") == "custom" and st.get("senderDomainVerified") is True
                          and st.get("webhook") is True and "re_test_mock" not in json.dumps(st) and MOCK not in json.dumps(st), f"got {st}")
        s, b = post(LEAD, ip()); check("both: 200, 2 emails, 1 webhook, storage webhook", s == 200 and len(state["emails"]) == 2 and len(state["hooks"]) == 1 and b["durableStorage"] == "webhook")
        reset(fail=500)
        s, b = post(LEAD, ip())
        check("both: Resend down, webhook receives -> accepted, email reported failed", s == 200 and len(state["hooks"]) == 1 and b["notification"] == {"status": "failed"} and b["acknowledgement"] == {"status": "failed"}, f"got {s} {b}")
        reset(hook_fail=True)
        s, b = post(LEAD, ip()); check("both: webhook down, email accepted -> 200, webhook reported failed", s == 200 and len(state["emails"]) == 2 and b["webhook"] == {"status": "failed"} and b["durableStorage"] == "none", f"got {s} {b}")
        reset(hook_sleep=7)
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("both: webhook hangs, email accepted -> 200 without waiting on the webhook", s == 200 and b["webhook"] == {"status": "failed"} and dt < 6.5, f"got {s} in {dt:.1f}s")
        time.sleep(2.5)
        reset(fail=500, hook_fail=True)
        s, b = post(LEAD, ip()); check("both: everything down -> 502", s == 502 and b.get("success") is False, f"got {s}")
    finally: stop_app(app)
    server.shutdown()
    try: os.remove(LOG)
    except OSError: pass

if __name__ == "__main__":
    if not os.path.isdir(os.path.join(ROOT, ".next")): sys.exit("No build found. Run `npm run build` first.")
    run()
    print(f"lead API integration tests: {passed} passed, {len(fails)} failed")
    for f in fails: print("  FAIL " + f)
    sys.exit(1 if fails else 0)
