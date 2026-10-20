# Lead form spam protection

Added after the 2026-10-20 submission with reference c05bc740. Investigation and evidence:
`~/Code/peregrine-it.com-audit/2026-10-20/spam-c05bc740/INVESTIGATION.md` (outside the repo).

## What happens to a submission

1. **Rate limit** per IP (hashed): `LEAD_RATE_MAX` POSTs per 10 minutes (default 5). Over it: 429.
2. **Validation**: JSON object body, name present, valid email, message ≥ 10 characters. Fields are cut to size and forced onto one line (unchanged).
3. **Duplicate check**: the reference is derived from the form's submission id and the content. A repeat of the same submission (double click, client retry, replayed request, concurrent copies) gets the first answer and sends nothing.
   - With Upstash: a lock (`SET NX`, 30 s) and the stored successful answer (10 minutes) in Redis, shared by all serverless instances; a copy that arrives while the first is in flight waits for its answer.
   - Without Upstash (or if Redis does not answer in 0.8 s): a map on each instance, plus Resend's idempotency key `lead-notify-<ref>` (24 hours), which stops sequential repeats on other instances. Truly simultaneous copies landing on two different instances could each send: **configure Upstash in production to close this.**
   - A failed attempt (anything but 200) is never stored, so the visitor's retry runs again; the Resend key prevents a second email if the first send had in fact gone through.
4. **Turnstile** — mode from configuration: **enabled** (secret set and site key compiled into the build), **off** (neither set), **misconfigured** (only one; a site key added in Vercel without a redeploy counts as missing). Misconfigured never silently skips protection and never silently refuses leads: every lead is accepted into quarantine with reason "verification unavailable" and an error log line; `GET /api/lead` reports `"turnstile": "misconfigured"`. When enabled, the token is verified with Cloudflare's siteverify (secret, token, visitor IP, idempotency key; hostname must be in `TURNSTILE_ALLOWED_HOSTNAMES`).
   - missing, invalid, spent or wrong-host token → 400 `verification_failed`, nothing sent; the form fetches a fresh token and retries once, then shows an error with a "send it by email instead" link;
   - Cloudflare unreachable or timing out (4 s) → the lead is **kept**, in quarantine.
5. **Spam score** (`src/lib/lead-spam.ts`). Signals and default weights: hidden field filled 10; Turnstile unavailable 5; random mixed-case text (a 12+ letter word with 4+ lower-to-upper switches, e.g. `evNIOhEFuplOwQcdVjWg`) 4; digits-only message 3; 3+ links 3; form fields in the page URL 3; form completed in under 3 s 3; message with no spaces 2. Threshold 5.
   Not signals, by design: name script or alphabet, short names, university or free-mail addresses, short messages that read as words, country.
6. **Quarantine** (score ≥ threshold): the lead is still delivered, to `LEAD_QUARANTINE_TO` or the normal inbox, with the subject prefix `[Possible spam]` and a first line giving the score and reasons. No acknowledgement is sent. The visitor sees the normal confirmation (the response does not reveal quarantine). Webhook rows carry `spamSuspected`, `spamScore`, `spamReasons`.
7. **Acknowledgement limit**: at most `LEAD_ACK_MAX_PER_DAY` (default 3) acknowledgement emails per recipient address per 24 hours, so the form cannot be used to send repeated mail to someone else's address. Notifications are not limited.

Priority (`lib/lead-priority.ts`) and the spam score are independent: priority is computed from the form fields only and is not lowered by quarantine; the quarantine is shown separately (subject prefix and first line).

## Known automation family (c05bc740, e1874d34, 2026-10-20)
Both submissions share: a native GET of the strategy-call form first (fields `scName`, `scCompany`, `scMessage` in the URL; empty honeypot), random two-word names, an "<random> LLC" company, `scMessage` of 10 digits (3875958733, 8585431138), then a scripted POST with a different random name and a single random mixed-case message (20 and 24 letters, 6 case switches each). e1874d34 posted through the quick-project form with a dotted Gmail address; c05bc740 used a real-looking university address. The shared pattern indicates one automation family. Both are quarantined by the message alone. Email domains are not signals: Gmail and university addresses are not blocked.

## Reviewing quarantine
- In Google Workspace, create a filter: Subject contains `[Possible spam]` → apply label "Lead quarantine" (and skip inbox if wanted). Review the label weekly; reply to real ones normally (Reply-To is the visitor).
- Or set `LEAD_QUARANTINE_TO` to a separate mailbox or group.
- If `LEAD_WEBHOOK_URL` is set (e.g. the Google Sheet receiver), filter the sheet on `spamSuspected`.
- Tune with `LEAD_SPAM_THRESHOLD`, `LEAD_SPAM_WEIGHTS` (JSON, e.g. `{"tooFast":2}`) and `LEAD_SPAM_MIN_ELAPSED_MS`. Unknown keys and malformed JSON fall back to the defaults.

## Privacy
- Logs never contain names, emails, messages or raw IPs. Each line has the reference, form, outcome, spam score and reasons, Turnstile outcome, and `ipHash`: 12 hex chars of SHA-256 over `LEAD_LOG_SALT`, the date and the IP (changes daily).
- `pageUrl` sent with a lead is origin + path + `utm_*` only.
- **New leakage is prevented:** both forms use `method="post"`, so a submission made before the page's script runs (or with script disabled) sends the fields in the request body, never in the address (covered by a browser test with script execution disabled).
- **Old leakage is not erased:** form-field parameters already in an address (from earlier native submissions or crafted links) are dropped from the address bar on load, so this site stops carrying them further. That does not delete copies already made: Vercel/CDN request logs of the original GET (which recorded the full URL, including the e1874d34 email address), the browser history entry, or anything a third party already received. Owner: consider the Vercel log retention for those requests.
- Turnstile loads only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set, and only after a visitor focuses a field in a lead form or submits. **Privacy policy:** if Turnstile is enabled, add Cloudflare Turnstile to "Third-Party Services" (owner decision; text not changed in this PR).

## Configuration

### Cloudflare (owner, in the Cloudflare dashboard)
1. Turnstile → Add widget. Hostname: `peregrine-it.com`. Cloudflare documents that adding a hostname also authorizes all its subdomains, so `www.peregrine-it.com` is covered (https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/, read 2026-10-20). Previews on `*.vercel.app` are not covered: use the test keys there.
2. Widget mode: **Managed**. The site renders it with `appearance: interaction-only`, so most visitors see nothing.
3. Copy the site key and secret key.

### Vercel environment variables
| Variable | Where | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production | to enable Turnstile | Public site key, compiled into the build: **redeploy after setting** |
| `TURNSTILE_SECRET_KEY` | Production | to enable Turnstile | Server-side verification. Set both or neither: one alone puts every lead in quarantine (by design) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Production | **recommended** | Shared de-duplication and limits across instances (see below) |
| `TURNSTILE_ALLOWED_HOSTNAMES` | optional | no | Comma list; default `peregrine-it.com,www.peregrine-it.com`. `*` = any (needed with Cloudflare's test keys, which report a test hostname) |
| `LEAD_QUARANTINE_TO` | optional | no | Mailbox for quarantined leads; default the normal inbox |
| `LEAD_SPAM_THRESHOLD`, `LEAD_SPAM_WEIGHTS`, `LEAD_SPAM_MIN_ELAPSED_MS` | optional | no | Scoring tuning |
| `LEAD_RATE_MAX`, `LEAD_DELIVERY_RATE_MAX`, `LEAD_ACK_MAX_PER_DAY` | optional | no | Limits (defaults 5 POST / 10 min / IP; 30 delivery lookups / 10 min / IP; 3 acknowledgements / day / address) |
| `LEAD_LOG_SALT` | optional | recommended | Salt for `ipHash` in logs |

### Upstash
Create a Redis database (Upstash console, or Vercel Marketplace → Upstash). Copy the **REST URL** and **REST token** into the two variables (Production). Keys used: `pit:rl:*` (rate-limit windows, expire with the window), `pit:lead:lock:<ref>` (30 s), `pit:lead:result:<ref>` (10 minutes; stores the API's answer to the visitor: reference, status and provider ids, no personal data). If Redis is unreachable the app falls back to per-instance behaviour rather than failing. Upstash is a new third-party service and may have plan costs: owner decision.

`GET /api/lead` now also reports `turnstile` ("enabled" / "off" / "misconfigured"), `sharedRateLimit` and `quarantineTo` (labels only).

### Local development and automated tests
Without Turnstile variables the mode is **off** and forms work as before. The integration tests use a mock siteverify (`TURNSTILE_VERIFY_URL`) and `TURNSTILE_TEST_SITE_KEY=1`, which stands in for a compiled site key and is ignored when `VERCEL_ENV=production`. They also use a mock Upstash.

### Testing with Cloudflare's test keys
From https://developers.cloudflare.com/turnstile/troubleshooting/testing/ (read 2026-10-20): site key `1x00000000000000000000AA` always passes, `2x00000000000000000000AB` always blocks; secret `1x0000000000000000000000000000000AA` always passes, `2x0000000000000000000000000000000AA` always fails. Test keys work on any domain including localhost; production secrets reject test tokens. Use them on Preview, with `TURNSTILE_ALLOWED_HOSTNAMES=*`.

### Content Security Policy
`challenges.cloudflare.com` was added to `script-src` and `frame-src` in the report-only policy (next.config.ts), as Cloudflare documents.

## Rollback
Remove `TURNSTILE_SECRET_KEY` (and the site key) to switch Turnstile off; scoring, quarantine and limits keep working. To stop quarantining, raise `LEAD_SPAM_THRESHOLD` (e.g. 100); the honeypot then still marks nothing, so prefer adjusting weights.
