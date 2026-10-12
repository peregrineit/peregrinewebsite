#!/usr/bin/env python3
"""Tests for scripts/lead_health.py against a local mock. Stdlib only; nothing leaves this machine.

Usage: python3 scripts/test_lead_health.py   (exit 1 on any failure)
"""
import http.server, json, os, subprocess, sys, threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCRIPT = os.path.join(ROOT, "scripts", "lead_health.py")
GOOD = {"ok": True, "resend": True, "sender": "custom", "senderDomainVerified": True, "webhook": False, "durableStorage": "none", "environment": "production"}
state = {"body": json.dumps(GOOD), "status": 200, "methods": []}
results = []

class Mock(http.server.BaseHTTPRequestHandler):
    def _any(self):
        state["methods"].append((self.command, self.path))
        body = state["body"].encode()
        self.send_response(state["status"]); self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body))); self.end_headers(); self.wfile.write(body)
    do_GET = do_POST = do_PUT = do_DELETE = do_HEAD = _any
    def log_message(self, *a): pass

def check(name, cond, detail=""):
    results.append(bool(cond)); print(("  ok   " if cond else "  FAIL ") + name + (f"  [{detail}]" if detail and not cond else ""))

def run(base, *args, **override):
    state["body"] = override.get("raw", json.dumps({**GOOD, **{k: v for k, v in override.items() if k not in ("raw", "status")}}))
    state["status"] = override.get("status", 200)
    p = subprocess.run([sys.executable, SCRIPT, base, *args], capture_output=True, text=True)
    return p.returncode, p.stdout.strip()

if __name__ == "__main__":
    if "--help" in sys.argv or "-h" in sys.argv: print(__doc__); sys.exit(0)
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Mock)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{srv.server_address[1]}"
    code, out = run(base)
    check("healthy production status exits 0", code == 0, out)
    check("one summary line starting LEAD HEALTH OK", out.startswith("LEAD HEALTH OK:") and "\n" not in out, out)
    check("summary carries the fields", 'sender="custom" senderDomainVerified=true' in out and 'environment="production"' in out, out)
    code, out = run(base, senderDomainVerified=None)
    check("senderDomainVerified null exits 1 (warn)", code == 1 and out.startswith("LEAD HEALTH WARN:"), out)
    for label, change in [("senderDomainVerified false", {"senderDomainVerified": False}), ("ok false", {"ok": False}), ("resend false", {"resend": False}),
                          ("test sender", {"sender": "resend-test-sender"}), ("preview environment", {"environment": "preview"}),
                          ("HTTP 500", {"status": 500}), ("HTML instead of JSON", {"raw": "<html>"}), ("JSON array", {"raw": "[]"})]:
        code, out = run(base, **change)
        check(f"{label} exits 2 (fail)", code == 2 and out.startswith("LEAD HEALTH FAIL:"), f"{code} {out}")
    code, out = run(base, "--expect-environment", "local", environment="local")
    check("--expect-environment local accepts a local build", code == 0, out)
    code, out = run(base, "--json", senderDomainVerified=None)
    j = json.loads(out)
    check("--json prints one object with level, exit and the response", j["level"] == "warn" and j["exit"] == 1 and j["response"]["sender"] == "custom" and len(j["warnings"]) == 1, out)
    code, out = run("http://127.0.0.1:1")
    check("unreachable host exits 2", code == 2 and "request failed" in out, out)
    check("every request the script sent was GET /api/lead", state["methods"] and all(m == ("GET", "/api/lead") for m in state["methods"]), str(set(state["methods"])))
    src = open(SCRIPT, encoding="utf-8").read()
    check("the script has no way to send a body", "data=" not in src and 'METHOD = "GET"' in src and src.count("urllib.request.Request(") == 1)
    p = subprocess.run([sys.executable, SCRIPT, "--help"], capture_output=True, text=True)
    check("--help works", p.returncode == 0 and "Exit codes" in p.stdout)
    srv.shutdown()
    print(f"\n{sum(results)} passed, {len(results) - sum(results)} failed")
    sys.exit(0 if all(results) else 1)
