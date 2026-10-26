# Cloudflare Turnstile on the lead forms

Every lead reaches the site through one endpoint, `POST /api/lead`, from the two forms in
`src/app/components/LeadForms.tsx` (strategy call, quick project request). Those forms appear
inline on /contact and on service and landing pages, and in the footer popups on every page.
The endpoint refuses any lead without a Turnstile token that Cloudflare has verified.

## How it works

- **Browser** (`src/lib/turnstile-client.ts`): the widget script loads the first time a form
  field is focused. Its mode (Managed) is set in Cloudflare; `appearance: 'interaction-only'`
  keeps it out of the way unless Cloudflare needs the visitor to interact. On submit, the
  form waits up to 15 s for a token and sends it as `turnstileToken`. Without one it sends
  nothing, shows "Please verify that you're human and try again." and offers the mailto
  fallback. The widget is reset after every request, because a token is single use.
- **Server** (`src/lib/turnstile.ts`, called from `src/app/api/lead/route.ts`) works in this order:
  1. parse the request;
  2. apply the existing rate limit;
  3. run the existing name, email and message checks;
  4. require the token;
  5. call Siteverify (`https://challenges.cloudflare.com/turnstile/v0/siteverify`, 5 s timeout, no retry);
  6. only then send the notification, the webhook and the acknowledgement.

  A lead is accepted only when the answer is `success: true` from an allowed hostname.

| Situation | Response | What is sent |
|---|---|---|
| No token | 400, generic message | nothing |
| Token refused (invalid, expired, reused, other hostname) | 403, generic message | nothing |
| Cloudflare unreachable, timeout, 5xx | 503, "try again" | nothing (fails closed) |
| `TURNSTILE_SECRET_KEY` not set | 503 | nothing (fails closed) |
| Verified | the existing flow | notification, webhook and acknowledgement as before |

The server logs `TURNSTILE_FAILED` with Cloudflare's error-code names, or `TURNSTILE_UNAVAILABLE`
with a reason, plus the lead reference and form. It never logs the token or the secret. The
token is not copied into the lead, the emails, the webhook row or analytics.

## Configuration

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Vercel (build time) | Site key in the forms. Inlined at build: after adding or changing it, redeploy. |
| `TURNSTILE_SECRET_KEY` | Vercel (server) | Secret sent to Siteverify. Never `NEXT_PUBLIC_`, never in client code. |
| `TURNSTILE_ALLOWED_HOSTNAMES` | optional | Comma-separated hostnames a token may come from. Default: `peregrine-it.com,www.peregrine-it.com`. No wildcard. |
| `TURNSTILE_VERIFY_URL` | tests only | Points verification at a local mock. Only a loopback `http://` URL is honoured. |

`GET /api/lead` reports `turnstileSecret` and `turnstileSiteKey` as booleans (never values).

**Preview deployments.** A token verified for a `*.vercel.app` preview host carries that
hostname and is refused unless it is listed in `TURNSTILE_ALLOWED_HOSTNAMES` for the Preview
environment, and the widget in Cloudflare must also allow that hostname. To test forms on a
preview, use a stable staging hostname added in both places. Do not allow arbitrary
`*.vercel.app` hosts. If the keys are set only for Production in Vercel, preview forms refuse
every lead (fail closed).

## Local development and tests

Use Cloudflare's test keys (https://developers.cloudflare.com/turnstile/troubleshooting/testing/),
never the production ones:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build   # always-pass widget
```

To submit a form against the real Siteverify in local development, set
`TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (always passes) and
`TURNSTILE_ALLOWED_HOSTNAMES=example.com`, because test-key answers carry that hostname.
Without a secret, local submissions are refused, which is the same behaviour as production.

The automated tests never call Cloudflare's Siteverify:

- `scripts/test_turnstile.mjs`: helper unit tests with a stubbed fetch.
- `scripts/test_lead_api.py`: API tests against a mock Siteverify. They cover:
  - a missing, invalid, reused or wrong-host token;
  - Cloudflare 5xx, timeout and unreachable;
  - no secret configured;
  - an invalid payload being refused before Siteverify is called;
  - a valid token, where everything is sent once;
  - no token or secret in logs or output.
- `scripts/test_lead_browser.mjs`: the real widget with the test site key, and the server
  verified against a mock.

## Production check after deploy (no fake leads)

1. Open https://peregrine-it.com/contact in a private window, focus a field and confirm the
   widget loads, with no console or CSP errors.
2. Confirm `curl -s https://peregrine-it.com/api/lead` reports
   `"turnstileSecret":true,"turnstileSiteKey":true`.
3. Bypass checks, which send nothing:
   - `curl -s -X POST https://peregrine-it.com/api/lead -H 'Content-Type: application/json' -d '{"name":"Check","email":"check@example.com","message":"Turnstile bypass check"}'`
     should return 400.
   - The same with `,"turnstileToken":"invalid"` should return 403.
4. A real submission only through a controlled recipient or path the owner chooses. Confirm
   one notification arrives and that the analytics `lead_submit` event still fires.
