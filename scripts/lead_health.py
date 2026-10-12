#!/usr/bin/env python3
"""Lead-delivery health check. Stdlib only. Read-only: one GET, never a POST, never a lead.

    python3 scripts/lead_health.py                      # production, https://peregrine-it.com
    python3 scripts/lead_health.py http://localhost:3057 --expect-environment local
    python3 scripts/lead_health.py --json               # machine-readable, for cron or CI

It reads GET <base>/api/lead (the configuration status endpoint) and checks:
  ok == true, resend == true                 a destination is configured
  sender == "custom"                         LEAD_FROM_EMAIL is set (not Resend's test sender)
  senderDomainVerified == true               null = could not be determined -> WARN
  environment == production                  (override with --expect-environment)

Exit codes: 0 ok, 1 warn (works, but something could not be confirmed), 2 fail.
The endpoint reports configuration, not delivery: a pass does not prove an email arrived.
"""
import argparse, json, sys, urllib.error, urllib.request

DEFAULT_BASE = "https://peregrine-it.com"
METHOD = "GET"   # the only method this script ever sends


def fetch(base, timeout):
    url = base.rstrip("/") + "/api/lead"
    req = urllib.request.Request(url, method=METHOD, headers={"User-Agent": "peregrine-lead-health/1.0", "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8", "replace")


def evaluate(data, expect_env="production"):
    """Return (level, problems, warnings): level is 'ok', 'warn' or 'fail'."""
    problems, warnings = [], []
    if not isinstance(data, dict): return "fail", ["response is not a JSON object"], []
    if data.get("ok") is not True: problems.append(f"ok is {data.get('ok')!r}, expected true (no destination configured)")
    if data.get("resend") is not True: problems.append(f"resend is {data.get('resend')!r}, expected true (RESEND_API_KEY missing)")
    if data.get("sender") != "custom": problems.append(f"sender is {data.get('sender')!r}, expected 'custom' (LEAD_FROM_EMAIL missing)")
    verified = data.get("senderDomainVerified", "missing")
    if verified is None: warnings.append("senderDomainVerified is null: the sender domain's status could not be determined")
    elif verified is not True: problems.append(f"senderDomainVerified is {verified!r}, expected true")
    if data.get("environment") != expect_env: problems.append(f"environment is {data.get('environment')!r}, expected {expect_env!r}")
    return ("fail" if problems else "warn" if warnings else "ok"), problems, warnings


def main(argv=None):
    ap = argparse.ArgumentParser(description="Read-only health check of the lead endpoint's configuration (GET /api/lead).",
                                 epilog="Exit codes: 0 ok, 1 warn, 2 fail. Never sends a POST.")
    ap.add_argument("base", nargs="?", default=DEFAULT_BASE, help=f"site base URL (default {DEFAULT_BASE})")
    ap.add_argument("--json", action="store_true", help="print one JSON object instead of the summary line")
    ap.add_argument("--expect-environment", default="production", help="expected 'environment' value (default production)")
    ap.add_argument("--timeout", type=float, default=20, help="seconds (default 20)")
    a = ap.parse_args(argv)
    data, status = None, None
    try:
        status, body = fetch(a.base, a.timeout)
        try:
            data = json.loads(body)
            level, problems, warnings = evaluate(data, a.expect_environment)
        except json.JSONDecodeError:
            level, problems, warnings = "fail", [f"HTTP {status} but the body is not JSON"], []
    except urllib.error.HTTPError as e:
        status = e.code; level, problems, warnings = "fail", [f"HTTP {e.code}"], []
    except Exception as e:  # DNS, TLS, timeout, refused
        level, problems, warnings = "fail", [f"request failed: {type(e).__name__}: {e}"], []
    code = {"ok": 0, "warn": 1, "fail": 2}[level]
    if a.json:
        print(json.dumps({"level": level, "exit": code, "base": a.base.rstrip("/"), "httpStatus": status, "problems": problems,
                          "warnings": warnings, "response": data}, sort_keys=True))
    else:
        d = data if isinstance(data, dict) else {}
        fields = " ".join(f"{k}={json.dumps(d[k])}" for k in ("ok", "resend", "sender", "senderDomainVerified", "webhook", "durableStorage", "environment") if k in d)
        detail = "; ".join(problems + warnings)
        print(f"LEAD HEALTH {level.upper()}: {a.base.rstrip('/')}/api/lead " + (fields or "(no status)") + (f" | {detail}" if detail else ""))
    return code


if __name__ == "__main__":
    sys.exit(main())
