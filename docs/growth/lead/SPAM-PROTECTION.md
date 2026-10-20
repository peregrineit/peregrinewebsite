# Lead form spam protection

Added after the 2026-10-20 submission with reference c05bc740. Investigation and evidence:
`~/Code/peregrine-it.com-audit/2026-10-20/spam-c05bc740/INVESTIGATION.md` (outside the repo).

## What happens to a submission

1. **Rate limit** per IP (hashed): `LEAD_RATE_MAX` POSTs per 10 minutes (default 5). Over it: 429.
2. **Validation**: JSON object body, name present, valid email, message ≥ 10 characters. Fields are cut to size and forced onto one line (unchanged).
3. **Duplicate check**: the reference is derived from the form's submission id and the content. A repeat of the same submission (double click, client retry, replayed request, concurrent copies) gets the first answer and sends nothing. Across server instances the Resend idempotency key `lead-notify-<ref>` (24 hours) does the same.
4. **Turnstile** (only when `TURNSTILE_SECRET_KEY` is set): the token is verified with Cloudflare's siteverify (secret, token, visitor IP, idempotency key; hostname must be in `TURNSTILE_ALLOWED_HOSTNAMES`).
   - missing, invalid, spent or wrong-host token → 400 `verification_failed`, nothing sent; the form fetches a fresh token and retries once, then shows an error with a "send it by email instead" link;
   - Cloudflare unreachable or timing out (4 s) → the lead is **kept**, in quarantine.
5. **Spam score** (`src/lib/lead-spam.ts`). Signals and default weights: hidden field filled 10; Turnstile unavailable 5; random mixed-case text (a 12+ letter word with 4+ lower-to-upper switches, e.g. `evNIOhEFuplOwQcdVjWg`) 4; digits-only message 3; 3+ links 3; form fields in the page URL 3; form completed in under 3 s 3; message with no spaces 2. Threshold 5.
   Not signals, by design: name script or alphabet, short names, university or free-mail addresses, short messages that read as words, country.
6. **Quarantine** (score ≥ threshold): the lead is still delivered, to `LEAD_QUARANTINE_TO` or the normal inbox, with the subject prefix `[Possible spam]` and a first line giving the score and reasons. No acknowledgement is sent. The visitor sees the normal confirmation (the response does not reveal quarantine). Webhook rows carry `spamSuspected`, `spamScore`, `spamReasons`.
7. **Acknowledgement limit**: at most `LEAD_ACK_MAX_PER_DAY` (default 3) acknowledgement emails per recipient address per 24 hours, so the form cannot be used to send repeated mail to someone else's address. Notifications are not limited.

## Reviewing quarantine
- In Google Workspace, create a filter: Subject contains `[Possible spam]` → apply label "Lead quarantine" (and skip inbox if wanted). Review the label weekly; reply to real ones normally (Reply-To is the visitor).
- Or set `LEAD_QUARANTINE_TO` to a separate mailbox or group.
- If `LEAD_WEBHOOK_URL` is set (e.g. the Google Sheet receiver), filter the sheet on `spamSuspected`.
- Tune with `LEAD_SPAM_THRESHOLD`, `LEAD_SPAM_WEIGHTS` (JSON, e.g. `{"tooFast":2}`) and `LEAD_SPAM_MIN_ELAPSED_MS`. Unknown keys and malformed JSON fall back to the defaults.

## Privacy
- Logs never contain names, emails, messages or raw IPs. Each line has the reference, form, outcome, spam score and reasons, Turnstile outcome, and `ipHash`: 12 hex chars of SHA-256 over `LEAD_LOG_SALT`, the date and the IP (changes daily).
- `pageUrl` sent with a lead is origin + path + `utm_*` only. Form fields can no longer reach the address bar: both forms use `method="post"`, and any `scName`/`qpName`… parameters already in an address are removed on load (`lib/attribution.ts`).
- Turnstile loads only when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set, and only after a visitor focuses a field in a lead form or submits. **Privacy policy:** if Turnstile is enabled, add Cloudflare Turnstile to "Third-Party Services" (owner decision; text not changed in this PR).

## Configuration

### Cloudflare (owner, in the Cloudflare dashboard)
1. Turnstile → Add widget. Hostnames: `peregrine-it.com`, `www.peregrine-it.com` (add the Vercel preview hostname pattern only if previews should work with real keys; otherwise use test keys there).
2. Widget mode: **Managed**. The site renders it with `appearance: interaction-only`, so most visitors see nothing.
3. Copy the site key and secret key.

### Vercel environment variables
| Variable | Where | Required | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production (and Preview if wanted) | to enable Turnstile | Public site key, compiled into the build: redeploy after setting |
| `TURNSTILE_SECRET_KEY` | same environments | to enable Turnstile | Server-side verification. **Set both or neither**: secret without site key refuses every lead |
| `TURNSTILE_ALLOWED_HOSTNAMES` | optional | no | Comma list; default `peregrine-it.com,www.peregrine-it.com`. `*` = any (needed with Cloudflare's test keys, which report a test hostname) |
| `LEAD_QUARANTINE_TO` | optional | no | Mailbox for quarantined leads; default the normal inbox |
| `LEAD_SPAM_THRESHOLD`, `LEAD_SPAM_WEIGHTS`, `LEAD_SPAM_MIN_ELAPSED_MS` | optional | no | Scoring tuning |
| `LEAD_RATE_MAX`, `LEAD_DELIVERY_RATE_MAX`, `LEAD_ACK_MAX_PER_DAY` | optional | no | Limits (defaults 5 POST / 10 min / IP; 30 delivery lookups / 10 min / IP; 3 acknowledgements / day / address) |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | optional | no | Shares rate-limit counts across serverless instances (Upstash REST). Without them limits are per instance. Falls back to in-memory if Redis does not answer within 0.8 s |
| `LEAD_LOG_SALT` | optional | recommended | Salt for `ipHash` in logs |

`GET /api/lead` now also reports `turnstile`, `sharedRateLimit` and `quarantineTo` (booleans/labels only).

### Testing with Cloudflare's test keys
From https://developers.cloudflare.com/turnstile/troubleshooting/testing/ (read 2026-10-20): site key `1x00000000000000000000AA` always passes, `2x00000000000000000000AB` always blocks; secret `1x0000000000000000000000000000000AA` always passes, `2x0000000000000000000000000000000AA` always fails. Test keys work on any domain including localhost; production secrets reject test tokens. Use them on Preview, with `TURNSTILE_ALLOWED_HOSTNAMES=*`.

### Content Security Policy
`challenges.cloudflare.com` was added to `script-src` and `frame-src` in the report-only policy (next.config.ts), as Cloudflare documents.

## Rollback
Remove `TURNSTILE_SECRET_KEY` (and the site key) to switch Turnstile off; scoring, quarantine and limits keep working. To stop quarantining, raise `LEAD_SPAM_THRESHOLD` (e.g. 100); the honeypot then still marks nothing, so prefer adjusting weights.
