#!/usr/bin/env python3
"""Integration tests for /api/lead. Stdlib only; sends nothing to the outside world.

Runs the built app (`npm run build` first) on port 3059 (LEAD_TEST_APP_PORT) in several configurations, with
Resend and the CRM webhook both pointed at a local mock server that behaves like Resend
where it matters: message ids, idempotency keys, error bodies, message status lookup.

  none          no RESEND_API_KEY, no LEAD_WEBHOOK_URL
  webhook       LEAD_WEBHOOK_URL only
  signed        LEAD_WEBHOOK_URL + LEAD_WEBHOOK_SECRET
  resend        RESEND_API_KEY only (RESEND_BASE_URL -> mock)
  both          both destinations
  unreachable   RESEND_BASE_URL points at a closed port
  store         LEAD_STORE=vercel-blob + token, with the Blob API pointed at the mock

Usage: python3 scripts/test_lead_api.py      (exits 1 on any failure)
"""
import hashlib, hmac, http.server, json, os, re, subprocess, sys, threading, time, urllib.error, urllib.parse, urllib.request, uuid

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Ports can be overridden so several checkouts can run the suite at once.
APP_PORT = int(os.environ.get("LEAD_TEST_APP_PORT", 3059)); MOCK_PORT = int(os.environ.get("LEAD_TEST_MOCK_PORT", 3997))
APP = f"http://127.0.0.1:{APP_PORT}"
MOCK = f"http://127.0.0.1:{MOCK_PORT}"
FROM = "Peregrine IT <hello@test.invalid>"
NOTIFY = "info@peregrine-it.com"

DEFAULTS = dict(emails=[], attempts=0, hooks=[], keys={}, events={}, fail=None, fail_once=None, fail_ack=None,
                hook_fail=False, hook_sleep=0, hook_plan=[], hook_attempts=[], email_sleep=0, ack_sleep=0,
                alerts=[], alert_fail=False, alert_sleep=0,
                blobs={}, blob_puts=[], blob_fail=None, blob_sleep=0, blob_wrong_path=False)
state = dict(DEFAULTS, domains=[{"name": "test.invalid", "status": "verified"}])
ERRORS = {
    422: {"statusCode": 422, "name": "validation_error", "message": "Invalid `from` field: hello@test.invalid is not allowed."},
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
        raw = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        body = json.loads(raw or b"{}")
        if self.path.startswith("/emails"):
            state["attempts"] += 1
            to = body.get("to"); to = to[0] if isinstance(to, list) else to
            delay = state["email_sleep"] if to == NOTIFY else state["ack_sleep"]
            if delay: time.sleep(delay)                       # a Resend call that does not come back in time
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
        if self.path.startswith("/alert"):
            if state["alert_sleep"]: time.sleep(state["alert_sleep"])
            if state["alert_fail"]: return self._send(500, {"error": "mock failure"})
            state["alerts"].append({**body, "_sig": self.headers.get("X-Peregrine-Signature"), "_raw": raw})
            return self._send(200, {"ok": True})
        if self.path.startswith("/hook"):
            # hook_attempts: every request that arrived. hooks: the ones the receiver accepted.
            state["hook_attempts"].append({"key": self.headers.get("Idempotency-Key"), "raw": raw})
            # hook_plan: one {"sleep": s, "status": code} per attempt, used up in order.
            step = state["hook_plan"].pop(0) if state["hook_plan"] else {}
            if state["hook_sleep"] or step.get("sleep"): time.sleep(state["hook_sleep"] or step["sleep"])
            if state["hook_fail"] or step.get("status", 200) >= 300:
                return self._send(step.get("status", 500), {"error": "mock failure"})
            # A 2xx that is not a receipt: {"ctype": ..., "body": ...}, e.g. Apps Script's sign-in or error page.
            if "ctype" in step:
                if step.get("recorded"): state["hooks"].append({**body, "_key": self.headers.get("Idempotency-Key")})
                return self._send_raw(step.get("code", 200), step["ctype"], step.get("body", "").encode())
            state["hooks"].append({**body, "_key": self.headers.get("Idempotency-Key"), "_sig": self.headers.get("X-Peregrine-Signature"), "_raw": raw})
            return self._send(200, {"ok": True})
        self._send(404, {})
    def do_PUT(self):
        # Stand-in for the Vercel Blob API as the @vercel/blob SDK calls it: PUT <api>/?pathname=<path>.
        raw = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        url = urllib.parse.urlparse(self.path)
        if url.path.rstrip("/") != "/blob": return self._send(404, {})
        pathname = urllib.parse.parse_qs(url.query).get("pathname", [""])[0]
        state["blob_puts"].append({"pathname": pathname, "headers": {k.lower(): v for k, v in self.headers.items()}})
        if state["blob_sleep"]: time.sleep(state["blob_sleep"])
        if self.headers.get("Authorization") != f"Bearer {BLOB_TOKEN}": return self._send(403, {"error": {"code": "forbidden"}})
        if state["blob_fail"]: return self._send(state["blob_fail"], {"error": {"code": "mock_failure"}})
        if pathname in state["blobs"] and self.headers.get("x-allow-overwrite") != "1": return self._send(400, {"error": {"code": "blob_already_exists"}})
        state["blobs"][pathname] = json.loads(raw)
        if state["blob_wrong_path"]: pathname = "somewhere/else.json"
        self._send(200, {"url": f"https://mockstore.private.blob.vercel-storage.com/{pathname}", "pathname": pathname, "contentType": "application/json"})
    def _send_raw(self, code, ctype, data):
        try:
            self.send_response(code)
            if ctype: self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data))); self.end_headers(); self.wfile.write(data)
        except (BrokenPipeError, ConnectionResetError):
            pass
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
    env = {k: v for k, v in os.environ.items() if k not in ("RESEND_API_KEY", "LEAD_WEBHOOK_URL", "LEAD_FROM_EMAIL", "RESEND_BASE_URL", "VERCEL_ENV")
           and not k.startswith(("LEAD_", "BLOB_"))}
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

# Attribution fields added in sprint 2 (src/lib/attribution.ts). Sent as the form sends them.
ATTR = {"lastTouchAt": "2026-10-10T09:30:00.000Z", "firstLandingPage": "/services/mls-idx-integration", "firstReferrer": "https://www.bing.com/",
        "firstUtm": "utm_source=newsletter&utm_medium=email", "firstTouchAt": "2026-09-01T12:00:00.000Z", "gclid": "Cj0KCQ-test_1.x",
        "msclkid": "abc123", "fbclid": "IwAR0-test", "ctaLocation": "service:saas-development", "pagesViewed": 4}

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

BLOB_TOKEN = "vercel_blob_rw_mockstore_notARealToken"
STORE_ENV = {"LEAD_STORE": "vercel-blob", "BLOB_READ_WRITE_TOKEN": BLOB_TOKEN, "LEAD_STORE_BLOB_API_URL": MOCK + "/blob"}
SECRET = "test-shared-secret-not-a-real-one"
def verifier(secret, header, raw):
    """Exit code of the reference Node verifier (0 = valid) for a captured request."""
    return subprocess.run(["node", os.path.join(ROOT, "docs/growth/lead/verify-signature.mjs"), secret, header], input=raw, capture_output=True).returncode

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
        # attribution: first and last touch, click ids, CTA location, pages viewed
        reset(); s, b = post({**LEAD, **ATTR}, ip()); h = state["hooks"]
        check("attribution: accepted with the new fields", s == 200 and len(h) == 1, f"got {s}")
        if h:
            for k, v in ATTR.items():
                check(f"attribution: webhook field {k}", h[0].get(k) == v, f"got {h[0].get(k)!r}")
            check("attribution: webhook payload stays flat (no nested object)", "attribution" not in h[0] and h[0].get("landingPage") == LEAD["landingPage"])
        reset(); s, b = post(LEAD, ip()); h = state["hooks"]
        check("attribution: fields are optional; absent ones arrive empty, pagesViewed 0",
              s == 200 and h and h[0].get("gclid") == "" and h[0].get("firstTouchAt") == "" and h[0].get("ctaLocation") == "" and h[0].get("pagesViewed") == 0, f"got {h[:1]}")
        reset(); s, b = post({**LEAD, "gclid": "x" * 300, "msclkid": "bad id\nPriority: high", "fbclid": {"a": 1}, "firstTouchAt": "yesterday",
                              "lastTouchAt": "2026-10-10T09:30:00.000Z\nX", "ctaLocation": "hero\r\nName: Injected <b>", "pagesViewed": 10 ** 9,
                              "firstLandingPage": "/a" * 400, "firstReferrer": "https://e.example/\nBcc: x", "firstUtm": 12}, ip()); h = state["hooks"]
        check("attribution: hostile values are still a lead", s == 200 and len(h) == 1, f"got {s}")
        if h:
            g = h[0]
            check("attribution: click ids over-long or outside the token alphabet are cut or dropped", len(g.get("gclid")) == 200 and g.get("msclkid") == "" and g.get("fbclid") == "", f"got {g.get('msclkid')!r} {g.get('fbclid')!r}")
            check("attribution: malformed times are dropped", g.get("firstTouchAt") == "" and g.get("lastTouchAt") == "", f"got {g.get('firstTouchAt')!r} {g.get('lastTouchAt')!r}")
            check("attribution: CTA location is one line, limited alphabet", g.get("ctaLocation") == "hero Name: Injected b", f"got {g.get('ctaLocation')!r}")
            check("attribution: pagesViewed is clamped", g.get("pagesViewed") == 999, f"got {g.get('pagesViewed')!r}")
            check("attribution: long and multi-line strings are cut to one line", len(g.get("firstLandingPage")) == 500 and "\n" not in g.get("firstReferrer") and g.get("firstUtm") == "", f"got {g.get('firstReferrer')!r}")
        reset(); s, b = post({**LEAD, "pagesViewed": "7"}, ip())
        check("attribution: pagesViewed sent as text is read as a number", s == 200 and state["hooks"][-1].get("pagesViewed") == 7)
        # priority (src/lib/lead-priority.ts; rules unit-tested in scripts/test_lead_priority.mjs)
        reset(); s, b = post(LEAD, ip()); h = state["hooks"]
        check("priority: webhook carries priority and its reasons", s == 200 and h and h[0].get("priority") == "high" and "timeline ASAP +2" in h[0].get("priorityReasons", ""), f"got {h[:1]}")
        check("priority: never returned to the visitor", "priority" not in json.dumps(b).lower(), f"got {b}")
        reset(); s, b = post({**LEAD, "email": "someone@gmail.com", "company": "", "timeline": "exploring", "service": "", "form": "quick-project"}, ip())
        check("priority: a thin enquiry is low, and still delivered", s == 200 and state["hooks"] and state["hooks"][0].get("priority") == "low", f"got {state['hooks'][:1]}")
        reset(); s, b = post({**LEAD, "pit_confirm_field": "x"}, ip())
        check("priority: a filled anti-spam field is always low", s == 200 and state["hooks"] and state["hooks"][0].get("priority") == "low")
        s, _ = post({**LEAD, "budget": "2-6-months", "timeline": ""}, ip())
        check("webhook: legacy `budget` maps to timeline", s == 200 and state["hooks"][-1].get("timeline") == "2-6-months")
        check("webhook: no signature header and status says unsigned when LEAD_WEBHOOK_SECRET is not set", h and h[0].get("_sig") is None and get().get("webhookSigned") is False)
        reset(hook_fail=True); before = len(app_log())
        s, b = post(LEAD, ip()); check("webhook: 502 when the webhook fails and nothing else is configured", s == 502 and b.get("success") is False, f"got {s}")
        check("webhook retry: a failing webhook is tried twice, no more", len(state["hook_attempts"]) == 2 and "webhook responded 500 after 2 attempts" in app_log()[before:], f"attempts {len(state['hook_attempts'])}")
        # retry: one, after a quick transient failure, inside the same 5 s budget
        reset(hook_plan=[{"status": 500}])
        s, b = post(LEAD, ip()); at = state["hook_attempts"]
        check("webhook retry: 500 then 200 -> accepted", s == 200 and b.get("webhook", {}).get("status") == "accepted" and b.get("durableStorage") == "webhook", f"got {s} {b}")
        check("webhook retry: two requests, one delivery", len(at) == 2 and len(state["hooks"]) == 1, f"got {len(at)} / {len(state['hooks'])}")
        check("webhook retry: both attempts carry the same idempotency key and the same bytes", len(at) == 2 and at[0]["key"] == at[1]["key"] == f"lead-{b.get('ref')}" and at[0]["raw"] == at[1]["raw"])
        for code in (429, 408, 503):
            reset(hook_plan=[{"status": code}]); s, b = post(LEAD, ip())
            check(f"webhook retry: {code} once is retried -> accepted", s == 200 and len(state["hook_attempts"]) == 2 and len(state["hooks"]) == 1, f"got {s}")
        for code in (400, 401, 404):
            reset(hook_plan=[{"status": code}]); s, b = post(LEAD, ip())
            check(f"webhook retry: {code} is not retried -> 502", s == 502 and len(state["hook_attempts"]) == 1 and not state["hooks"], f"got {s}, attempts {len(state['hook_attempts'])}")
        reset(hook_sleep=7)
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("webhook: timeout -> 502 within about 5 s, not a hang", s == 502 and dt < 6.5, f"got {s} in {dt:.1f}s")
        check("log: webhook timeout is named", "webhook timed out" in app_log())
        check("webhook retry: a timeout is not retried", len(state["hook_attempts"]) == 1, f"attempts {len(state['hook_attempts'])}")
        time.sleep(2.5)
        reset(hook_plan=[{"sleep": 3, "status": 500}, {"sleep": 7}])
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("webhook retry: slow failure then a hang still ends within the 5 s budget", s == 502 and 4.5 < dt < 6.5 and len(state["hook_attempts"]) == 2, f"got {s} in {dt:.1f}s, attempts {len(state['hook_attempts'])}")
        time.sleep(5.5)
        reset(hook_plan=[{"sleep": 4.4, "status": 500}])
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("webhook retry: no second attempt when too little of the budget is left", s == 502 and dt < 5.5 and len(state["hook_attempts"]) == 1, f"got {s} in {dt:.1f}s, attempts {len(state['hook_attempts'])}")
        # a 2xx is not always a receipt: an HTML page (Apps Script sign-in or error page) records nothing
        for label, ctype in (("text/html", "text/html; charset=utf-8"), ("TEXT/HTML", "TEXT/HTML")):
            reset(hook_plan=[{"ctype": ctype, "body": "<!DOCTYPE html><html><body>Sign in</body></html>"}]); before = len(app_log()); s, b = post(LEAD, ip())
            check(f"webhook html: 200 {label} is not accepted -> 502", s == 502 and b.get("success") is False, f"got {s} {b}")
            check(f"webhook html: {label} is named in the log and not retried", "webhook answered with an HTML page" in app_log()[before:] and len(state["hook_attempts"]) == 1, app_log()[before:][-200:])
        reset(hook_plan=[{"ctype": "application/json", "body": '{"ok":false,"error":"Exception: no sheet"}'}]); before = len(app_log()); s, b = post(LEAD, ip())
        check("webhook: 200 JSON saying ok:false (the Sheet script's error answer) is not accepted", s == 502 and "webhook answered ok:false" in app_log()[before:], f"got {s}")
        for label, step in (("text/plain", {"ctype": "text/plain", "body": "ok"}), ("empty 204", {"ctype": "", "code": 204}), ("JSON without ok", {"ctype": "application/json", "body": '{"status":"success","id":"abc"}'}),
                            ("JSON that is not an object", {"ctype": "application/json", "body": '"received"'}), ("broken JSON", {"ctype": "application/json", "body": "{nope"})):
            reset(hook_plan=[{**step, "recorded": True}]); s, b = post(LEAD, ip())
            check(f"webhook: 2xx {label} is still accepted (receivers answer differently)", s == 200 and b.get("webhook") == {"status": "accepted"}, f"got {s} {b}")
    finally: stop_app(app)

    # --- webhook with a shared secret: every request is signed
    reset(); app = start_app({**HOOK_ENV, "LEAD_WEBHOOK_SECRET": SECRET})
    try:
        st = get(); check("signature: status says signed, without the secret", st.get("webhookSigned") is True and SECRET not in json.dumps(st), f"got {st}")
        reset(hook_plan=[{"status": 500}]); s, b = post(LEAD, ip()); h = state["hooks"]
        check("signature: accepted (after one retry)", s == 200 and len(h) == 1 and len(state["hook_attempts"]) == 2, f"got {s}")
        if h:
            sig, raw = h[0].get("_sig") or "", h[0]["_raw"]
            check("signature: header is sha256=<HMAC-SHA256 of the raw body>", sig == "sha256=" + hmac.new(SECRET.encode(), raw, hashlib.sha256).hexdigest(), f"got {sig}")
            check("signature: reference verifier accepts it", verifier(SECRET, sig, raw) == 0)
            check("signature: wrong secret is rejected", verifier("another-secret", sig, raw) == 1)
            check("signature: altered body is rejected", verifier(SECRET, sig, raw.replace(b"Test Person", b"Someone Else")) == 1)
            check("signature: missing or malformed header is rejected", verifier(SECRET, "", raw) == 1 and verifier(SECRET, sig.replace("sha256=", ""), raw) == 1 and verifier(SECRET, "sha256=zz", raw) == 1)
        check("signature: the secret is never logged or returned", SECRET not in app_log() and SECRET not in json.dumps(b))
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
            check("resend: acknowledgement carries no attribution", "utm_source" not in a[0].get("text", "") and "google.com" not in a[0].get("text", ""))
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

        # attribution in the notification body
        reset(); s, b = post({**LEAD, **ATTR, "ctaLocation": "hero\nName: Injected"}, ip()); n = to_notify(); text = n[0].get("text", "") if n else ""
        check("attribution: notification lists first touch, click ids, CTA location and pages viewed",
              all(x in text for x in ("First visit: 2026-09-01", "First landing page: /services/mls-idx-integration", "First referrer: https://www.bing.com/",
                                      "First UTM: utm_source=newsletter&utm_medium=email", "Click IDs: gclid=Cj0KCQ-test_1.x msclkid=abc123 fbclid=IwAR0-test",
                                      "Pages viewed this visit: 4")), text)
        check("attribution: a new field cannot start a line of its own in the email", "Form opened from: hero Name: Injected" in text and "\nName: Injected" not in text, text)
        check("attribution: the response to the visitor carries none of it", "gclid" not in json.dumps(b) and "bing.com" not in json.dumps(b))
        check("log: attribution is not logged", "Cj0KCQ-test_1.x" not in app_log() and "bing.com" not in app_log())

        reset(); s, b = post(LEAD, ip()); n = to_notify(); text = n[0].get("text", "") if n else ""
        check("priority: notification has one Priority line with reasons", re.search(r"^Priority: High \(.*timeline ASAP \+2.*business email domain \+1.*\)$", text, re.M) is not None and text.count("Priority:") == 1, text)
        check("priority: not in the acknowledgement, not in the response", "riority" not in to_visitor()[0].get("text", "") and "priority" not in json.dumps(b).lower())

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
        check("log: Resend's error text is recorded with addresses removed", "Invalid `from` field: [email] is not allowed." in app_log() and "hello@test.invalid" not in app_log() and "domain is not verified" in app_log())
        reset(fail=422); s, b = post(LEAD, ip())
        check("diagnostic: outside production the 502 names the provider error, without addresses",
              "validation_error (422)" in b.get("diagnostic", {}).get("notification", "") and "[email]" in b["diagnostic"]["notification"] and "@" not in json.dumps(b.get("diagnostic")), f"got {b}")
        # acknowledgement fails on its own
        reset(fail_ack=422); before = len(app_log())
        s, b = post(LEAD, ip())
        check("ack failure: lead accepted, acknowledgement reported failed", s == 200 and b["notification"]["status"] == "accepted" and b["acknowledgement"] == {"status": "failed"}, f"got {s} {b}")
        check("ack failure: logged, not swallowed", "Lead accepted with a failed step" in app_log()[before:])
        # Resend does not answer in time: each send has a deadline (8 s notification, 5 s acknowledgement)
        reset(email_sleep=11); before = len(app_log()); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("resend timeout: a notification that does not come back fails after about 8 s", s == 502 and b.get("success") is False and 7.0 < dt < 9.5, f"got {s} in {dt:.1f}s")
        check("resend timeout: reported and logged as a timeout", "timeout" in b.get("diagnostic", {}).get("notification", "") and '"reason":"timeout"' in app_log()[before:], f"got {b}")
        time.sleep(3.5)
        reset(ack_sleep=8); before = len(app_log()); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("resend timeout: a hung acknowledgement is reported failed after about 5 s; the lead stays accepted",
              s == 200 and b.get("notification", {}).get("status") == "accepted" and b.get("acknowledgement") == {"status": "failed"} and 4.5 < dt < 6.5, f"got {s} in {dt:.1f}s {b}")
        check("resend timeout: acknowledgement timeout is logged", "Lead accepted with a failed step" in app_log()[before:] and '"reason":"timeout"' in app_log()[before:])
        time.sleep(3.5)
    finally: stop_app(app)

    # --- resend with a sender domain Resend has not verified
    reset(); state["domains"] = [{"name": "test.invalid", "status": "pending"}]; app = start_app(RESEND_ENV)
    try:
        st = get(); check("status: unverified sender domain is reported", st.get("senderDomainVerified") is False and st.get("sender") == "custom", f"got {st}")
    finally: stop_app(app); state["domains"] = [{"name": "test.invalid", "status": "verified"}]

    # --- production: no diagnostic in the response
    reset(fail=403); app = start_app({**RESEND_ENV, "VERCEL_ENV": "production"})
    try:
        s, b = post(LEAD, ip()); check("production: 502 carries no diagnostic", s == 502 and "diagnostic" not in b and len(b.get("ref", "")) == 8, f"got {s} {b}")
        check("production: the reason is still logged", "validation_error (403)" in app_log())
    finally: stop_app(app)

    # --- Resend unreachable (connection refused)
    reset(); app = start_app({**RESEND_ENV, "RESEND_BASE_URL": f"http://127.0.0.1:{MOCK_PORT + 2}"})
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
        check("alert: status says no alert channel when LEAD_ALERT_WEBHOOK_URL is not set", st.get("ownerAlert") is False)
        s, b = post(LEAD, ip())
        check("both: Resend down, webhook receives -> accepted, email reported failed", s == 200 and len(state["hooks"]) == 1 and b["notification"] == {"status": "failed"} and b["acknowledgement"] == {"status": "failed"}, f"got {s} {b}")
        reset(hook_fail=True)
        s, b = post(LEAD, ip()); check("both: webhook down, email accepted -> 200, webhook reported failed", s == 200 and len(state["emails"]) == 2 and b["webhook"] == {"status": "failed"} and b["durableStorage"] == "none", f"got {s} {b}")
        reset(hook_sleep=7)
        t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("both: webhook hangs, email accepted -> 200 without waiting on the webhook", s == 200 and b["webhook"] == {"status": "failed"} and dt < 6.5, f"got {s} in {dt:.1f}s")
        time.sleep(2.5)
        # line forging: a field cannot add lines to the notification or the acknowledgement
        reset(); forged = "Bob\nPriority: High (verified customer)\nEmail: ceo@victim.example"
        s, b = post({**LEAD, "name": forged}, ip()); n, a, h = to_notify(), to_visitor(), state["hooks"]
        text = n[0].get("text", "") if n else ""; lines = text.split("\n")
        check("forging: lead accepted", s == 200 and len(n) == 1 and len(a) == 1 and len(h) == 1, f"got {s}")
        check("forging: the name is one line", "Name: Bob Priority: High (verified customer) Email: ceo@victim.example" in lines, text)
        check("forging: exactly one Priority line and one Email line", len([l for l in lines if l.startswith("Priority:")]) == 1 and [l for l in lines if l.startswith("Email:")] == ["Email: lead@example.com"], text)
        if a: check("forging: the acknowledgement greets on one line and gains no lines", "Hi Bob Priority: High (verified customer) Email: ceo@victim.example," in a[0].get("text", "").split("\n") and a[0]["text"].count("\n") == 8, a[0].get("text"))
        if h: check("forging: webhook name is one line", h[0].get("name") == "Bob Priority: High (verified customer) Email: ceo@victim.example", f"got {h[0].get('name')!r}")
        reset(); single = ("name", "company", "form", "projectType", "timeline", "service", "pageUrl", "landingPage", "referrer", "utm")
        s, b = post({**LEAD, **{k: f"a\r\nb\u0085c\u2028d\u2029e\tf\u0000g\u202eh\u2066i\u200bj\ufeffk\u0007l" for k in single}}, ip()); h = state["hooks"]
        check("forging: every single-line field loses line breaks, control, bidi and zero-width characters",
              s == 200 and h and all(h[0].get(k) == "a b c d e fghijkl" for k in single), f"got {[(k, h[0].get(k)) for k in single if h and h[0].get(k) != 'a b c d e fghijkl']}")
        reset(); s, b = post({**LEAD, "email": "lead@example.com\nBcc: x@victim.example"}, ip())
        check("forging: an email address with a line break is refused", s == 400 and not state["emails"], f"got {s}")
        reset(); msg = "First line of a real message.\r\nPriority: High (verified)\nReference: 00000000\u2028Email: ceo@victim.example\n\u202eNew Project Inquiry"
        s, b = post({**LEAD, "message": msg}, ip()); n = to_notify(); text = n[0].get("text", "") if n else ""; lines = text.split("\n")
        check("forging: the message keeps its lines", s == 200 and "> First line of a real message." in lines and "> Priority: High (verified)" in lines and "> Email: ceo@victim.example" in lines, text)
        mark = next((i for i, l in enumerate(lines) if l.startswith("-----") and "typed by the visitor" in l), -1)
        check("forging: the message comes after a delimiter and every line of it is prefixed", mark > 0 and all(l.startswith(">") for l in lines[mark + 1:]) and len(lines[mark + 1:]) == 5, text)
        check("forging: nothing in the message can pass for a header line", len([l for l in lines if l.startswith(("Priority:", "Reference:", "Email:", "New Project Inquiry"))]) == 4
              and all(i < mark for i, l in enumerate(lines) if l.startswith(("Priority:", "Reference:", "Email:"))), text)
        check("forging: bidi override removed from the message", "\u202e" not in text)
        if state["hooks"]: check("forging: webhook message keeps real line breaks only", state["hooks"][0].get("message") == "First line of a real message.\nPriority: High (verified)\nReference: 00000000\nEmail: ceo@victim.example\nNew Project Inquiry", repr(state["hooks"][0].get("message")))
        reset(fail=500, hook_fail=True)
        s, b = post(LEAD, ip()); check("both: everything down -> 502", s == 502 and b.get("success") is False, f"got {s}")
    finally: stop_app(app)
    # --- owner alert: the email failed but the webhook holds the lead
    reset(); app = start_app({**RESEND_ENV, **HOOK_ENV, "LEAD_ALERT_WEBHOOK_URL": MOCK + "/alert", "LEAD_WEBHOOK_SECRET": SECRET})
    try:
        st = get(); check("alert: status says an alert channel is configured, without its URL", st.get("ownerAlert") is True and MOCK not in json.dumps(st), f"got {st}")
        s, b = post(LEAD, ip()); time.sleep(1.0)
        check("alert: none when everything worked", s == 200 and not state["alerts"])
        reset(fail_ack=422); s, b = post(LEAD, ip()); time.sleep(1.0)
        check("alert: none when only the visitor's acknowledgement failed", s == 200 and not state["alerts"])
        reset(fail=500, hook_fail=True); s, b = post(LEAD, ip()); time.sleep(1.0)
        check("alert: none when nothing accepted the lead (the visitor was told)", s == 502 and not state["alerts"])
        reset(fail=500, alert_sleep=2); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("alert: sent after the response, so a slow alert does not delay the visitor", s == 200 and dt < 1.5, f"got {s} in {dt:.1f}s")
        for _ in range(40):
            if state["alerts"]: break
            time.sleep(0.25)
        al = state["alerts"]
        check("alert: one alert when the notification failed and the webhook accepted", len(al) == 1 and len(state["hooks"]) == 1, f"got {len(al)}")
        if al:
            check("alert: names the reference, the reason and where the lead is held",
                  al[0].get("event") == "lead_notification_failed" and al[0].get("ref") == b.get("ref") and "internal_server_error" in al[0].get("reason", "") and al[0].get("heldBy") == "webhook", f"got {al[0]}")
            check("alert: carries no personal data", not any(x in al[0]["_raw"].decode() for x in ("Test Person", "lead@example.com", "Integration test message", "Acme")))
            check("alert: signed like the lead webhook", verifier(SECRET, al[0].get("_sig") or "", al[0]["_raw"]) == 0)
        time.sleep(0.5); check("alert: logged", "Lead alert sent" in app_log())
        reset(fail=500, alert_fail=True); s, b = post(LEAD, ip()); time.sleep(1.5)
        check("alert: a failing alert endpoint is logged and changes nothing for the visitor", s == 200 and "Lead alert FAILED" in app_log(), f"got {s}")
    finally: stop_app(app)

    # --- durable store behind its switch (src/lib/lead-store.ts). MOCK ONLY: the adapter has
    #     never been run against the real Vercel Blob API.
    reset(); app = start_app({**RESEND_ENV, **HOOK_ENV, **STORE_ENV})
    try:
        st = get(); check("store: status names the store, never the token",
                          st.get("store") == "vercel-blob" and st.get("durableStorage") == "webhook+vercel-blob" and BLOB_TOKEN not in json.dumps(st) and "mockstore" not in json.dumps(st), f"got {st}")
        s, b = post({**LEAD, **ATTR}, ip()); blobs = state["blobs"]; ref = b.get("ref", "")
        check("store: accepted lead is written once", s == 200 and len(blobs) == 1 and len(state["blob_puts"]) == 1, f"got {s}, {len(blobs)} objects")
        check("store: response reports the write", b.get("store") == {"status": "stored"} and b.get("durableStorage") == "webhook+vercel-blob", f"got {b}")
        if blobs:
            path, obj = next(iter(blobs.items())); hd = state["blob_puts"][0]["headers"]
            m = re.fullmatch(r"leads/\d{4}-\d{2}/" + re.escape(ref) + r"-([0-9a-f]{32})\.json", path)
            check("store: path holds the reference and a 128-bit unguessable suffix", m is not None, f"got {path}")
            check("store: private access, no second random suffix, JSON content type",
                  hd.get("x-vercel-blob-access") == "private" and hd.get("x-add-random-suffix") == "0" and hd.get("x-content-type") == "application/json" and hd.get("x-api-version"), f"got {hd}")
            check("store: object holds the lead", all(obj.get(k) == LEAD[k] for k in ("name", "email", "company", "message", "form", "service", "timeline", "pageUrl")) and obj.get("ref") == ref, f"got {obj}")
            check("store: object holds the attribution", all(obj.get(k) == v for k, v in ATTR.items()) and obj.get("landingPage") == LEAD["landingPage"] and obj.get("utm") == LEAD["utm"])
            check("store: object holds priority, time and how delivery went", obj.get("priority") == "high" and re.match(r"\d{4}-\d\d-\d\dT", obj.get("receivedAt", ""))
                  and obj.get("delivery") == {"notification": "accepted", "webhook": "accepted"}, f"got {obj.get('delivery')}")
            check("store: same receivedAt in the store and the webhook", state["hooks"] and state["hooks"][0].get("receivedAt") == obj.get("receivedAt"))
            if m:
                check("store: neither the path nor the token reaches the visitor or the log", m.group(1) not in json.dumps(b) and m.group(1) not in app_log()
                      and BLOB_TOKEN not in app_log() and "Lead accepted" in app_log())
        # the same submission twice replaces its own object; another lead gets another path
        reset(); sid = str(uuid.uuid4())
        post({**LEAD, "submissionId": sid}, ip()); s, b = post({**LEAD, "submissionId": sid}, ip())
        check("store: a repeated submission is still one object", s == 200 and len(state["blobs"]) == 1 and len(state["blob_puts"]) == 2 and b.get("store") == {"status": "stored"}, f"got {len(state['blobs'])}")
        post(LEAD, ip()); suffixes = {p.rsplit("-", 1)[1] for p in state["blobs"]}
        check("store: a different lead gets a different path", len(state["blobs"]) == 2 and len(suffixes) == 2)
        reset(); s, b = post({**LEAD, "pit_confirm_field": "x"}, ip())
        check("store: a suspected-spam lead is stored too, marked", s == 200 and len(state["blobs"]) == 1 and next(iter(state["blobs"].values())).get("spamSuspected") is True)
        # a failing store never fails the lead
        for label, kw, reason in (("500", {"blob_fail": 500}, "store responded 500"), ("403", {"blob_fail": 403}, "store responded 403"),
                                  ("unconfirmed write", {"blob_wrong_path": True}, "store did not confirm the write")):
            reset(**kw); before = len(app_log()); s, b = post(LEAD, ip())
            check(f"store {label}: lead still accepted, write reported failed", s == 200 and b.get("success") is True and b.get("store") == {"status": "failed"} and b.get("durableStorage") == "webhook", f"got {s} {b}")
            check(f"store {label}: both emails and the webhook still went out", len(state["emails"]) == 2 and len(state["hooks"]) == 1)
            check(f"store {label}: failure is logged with its reason", "Lead accepted with a failed step" in app_log()[before:] and reason in app_log()[before:], app_log()[before:][-300:])
        reset(blob_sleep=6); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("store hangs: lead accepted, write gives up after about 3 s", s == 200 and b.get("store") == {"status": "failed"} and dt < 4.5 and "store timed out" in app_log(), f"got {s} in {dt:.1f}s")
        time.sleep(3.5)
        # one deadline for webhook + store: together they never hold the response much beyond 5 s
        reset(hook_sleep=7, blob_sleep=6); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("budget: email accepted, webhook hangs, store hangs -> answered within about 5.5 s", s == 200 and dt < 6.0 and b.get("webhook") == {"status": "failed"} and b.get("store") == {"status": "failed"}, f"got {s} in {dt:.1f}s {b}")
        time.sleep(3.0)
        reset(hook_plan=[{"sleep": 3, "status": 500}, {"sleep": 7}], blob_sleep=6); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("budget: slow 500, hung retry and hung store -> answered within about 5.5 s", s == 200 and dt < 6.0 and len(state["hook_attempts"]) == 2 and b.get("store") == {"status": "failed"}, f"got {s} in {dt:.1f}s {b}")
        time.sleep(5.5)
        reset(hook_sleep=7); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t; obj = next(iter(state["blobs"].values()), {})
        check("budget: webhook hangs, store healthy -> stored without waiting for the webhook to give up, and the object says the webhook was still pending",
              s == 200 and dt < 6.0 and b.get("store") == {"status": "stored"} and b.get("durableStorage") == "vercel-blob" and obj.get("delivery") == {"notification": "accepted", "webhook": "pending"}, f"got {s} in {dt:.1f}s {b} {obj.get('delivery')}")
        time.sleep(2.5)
        reset(fail=500, hook_plan=[{"sleep": 3}], blob_sleep=6); t = time.time(); s, b = post(LEAD, ip()); dt = time.time() - t
        check("budget: email down, webhook accepts after 3 s, store hangs -> still within about 5.5 s", s == 200 and dt < 6.0 and b.get("webhook") == {"status": "accepted"} and b.get("store") == {"status": "failed"}, f"got {s} in {dt:.1f}s {b}")
        time.sleep(3.5)
        # the rule: a store is a record of an accepted lead, never acceptance
        reset(fail=500, hook_fail=True); s, b = post(LEAD, ip())
        check("store: email and webhook both down -> 502 and nothing is stored", s == 502 and b.get("success") is False and not state["blob_puts"], f"got {s}, {len(state['blob_puts'])} writes")
        reset(fail=500); s, b = post(LEAD, ip()); obj = next(iter(state["blobs"].values()), {})
        check("store: email down, webhook accepted -> stored, and the object says the email failed", s == 200 and obj.get("delivery") == {"notification": "failed", "webhook": "accepted"}, f"got {s} {obj.get('delivery')}")
    finally: stop_app(app)

    # --- store with email only: the store is the durable record, the email is the acceptance
    reset(); app = start_app({**RESEND_ENV, **STORE_ENV})
    try:
        st = get(); check("store+email: ok comes from the email; storage is the store", st.get("ok") is True and st.get("durableStorage") == "vercel-blob", f"got {st}")
        s, b = post(LEAD, ip()); check("store+email: accepted and stored", s == 200 and len(state["blobs"]) == 1 and b.get("durableStorage") == "vercel-blob", f"got {s} {b}")
        reset(fail=500); s, b = post(LEAD, ip())
        check("store+email: email down -> 502, nothing stored (a store write is not acceptance)", s == 502 and not state["blob_puts"], f"got {s}")
    finally: stop_app(app)

    # --- store alone: not a destination
    reset(); app = start_app(STORE_ENV)
    try:
        st = get(); check("store alone: status is not ok", st.get("ok") is False and st.get("store") == "vercel-blob", f"got {st}")
        s, b = post(LEAD, ip()); check("store alone: 502 and nothing stored", s == 502 and not state["blob_puts"], f"got {s}")
    finally: stop_app(app)

    # --- the switch: both LEAD_STORE and the token are needed
    for label, env in (("token without LEAD_STORE", {"BLOB_READ_WRITE_TOKEN": BLOB_TOKEN, "LEAD_STORE_BLOB_API_URL": MOCK + "/blob"}),
                       ("LEAD_STORE without token", {"LEAD_STORE": "vercel-blob", "LEAD_STORE_BLOB_API_URL": MOCK + "/blob"}),
                       ("unknown LEAD_STORE", {**STORE_ENV, "LEAD_STORE": "s3"})):
        reset(); app = start_app({**HOOK_ENV, **env})
        try:
            st = get(); s, b = post(LEAD, ip())
            check(f"switch off ({label}): nothing is written, behaviour as before",
                  st.get("store") == "none" and st.get("durableStorage") == "webhook" and s == 200 and not state["blob_puts"]
                  and b.get("store") == {"status": "skipped"} and b.get("durableStorage") == "webhook", f"got {st} {s} {b}")
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
