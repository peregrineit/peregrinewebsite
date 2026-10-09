# Lead delivery: how it works, the P0 of 2026-10-09, and how to verify it

## P0: form showed success, no email arrived (preview, 2026-10-09)

**Observed by the owner:** `/api/lead` reported `resend: true`, `sender: custom`; the contact form showed its success message; neither the notification nor the acknowledgement arrived.

**Root cause: not proven.** No Resend activity or Vercel log was available to me. Reading the code that produced that preview (`72a9276`) there were exactly two ways to get a success message, and they are told apart by evidence only the owner can read (next section):

| Path | What happened in the code | Would explain both emails missing? |
|---|---|---|
| **A. Hidden anti-spam field had a value** | The API returned `{success: true}` at once, sent nothing and logged nothing. Meant for bots, but a browser's autofill or a password manager filling the off-screen field triggers it for a real person | **Yes, completely.** Nothing reached Resend |
| **B. Resend accepted the notification** | The API returned success as soon as Resend returned no error for the first email. It never looked at what happened afterwards (delivered, bounced, spam) | Only if both messages were then lost, bounced or put in spam |

**Defects confirmed by reading the code, whichever path it was:**
1. A filled hidden field produced a false success with nothing sent and no log line (path A).
2. The acknowledgement's result was never checked: the SDK returns errors instead of throwing, and the code only caught exceptions. A rejected acknowledgement was invisible.
3. "Success" meant "Resend returned no error for the notification", and the form said "Request sent successfully".
4. Resend's message ids were discarded, so a submission could not be matched to Resend's activity log.
5. The webhook alone could produce a success (by design, but unstated to the visitor).
6. Retries had no idempotency key, so a retry after a lost response could send a second email.

### Evidence needed from the owner (one request)

For the failed test, from the time it was submitted:

1. **Resend → Emails** (activity list). Are there two entries, one to `info@peregrine-it.com` and one to the test address?
   - **No entries:** path A (or the key in Vercel belongs to a different Resend account than the one with the verified domain).
   - **Entries exist:** send me each one's status word only (Delivered, Bounced, Complained, Delivery Delayed, Suppressed). No content.
2. **Vercel → peregrinewebsite → Logs**, filter `/api/lead`, same time. Is there a `Lead delivered` line (the old build's wording)? Present = path B; a `POST 200` with no such line = path A.
3. Spam folders of both inboxes.
4. Which browser was used, and whether autofill or a password manager filled the form.

None of this blocks the fix below; it decides whether the root cause is recorded as proven.

## Second owner test, on the fixed build (`8097170`): "We could not send your request."

**What that message proves:** the API answered 502 `not-accepted`. With no webhook configured, that happens only when **Resend rejected the notification email** (or could not be reached). So the earlier "success" on the old build did not come from Resend accepting anything: it is consistent with path A (the hidden field), and the real fault, Resend refusing the send, was hidden behind it.

**What it does not prove:** why Resend refused. That is in one log line I cannot read.

**Not application code, as far as can be shown locally:** the same build, run on this machine against the real Resend API with a deliberately invalid key, returned 502 and logged `"notification":{"status":"failed","reason":"validation_error (401)"}`. The request reaches Resend and Resend's error is recorded correctly.

**No code was changed for this report.** A fix follows the cause.

### Needed from the owner (two items, both free of personal data)

1. **Vercel → peregrinewebsite → Logs**, filter text `Lead NOT accepted`, the most recent line. Paste the whole line: it contains a reference, statuses and a `reason` such as `validation_error (403)`; no name, address or message.
2. Open `<preview>/api/lead` and paste the JSON (booleans and words only).

| `reason` in the log | Cause | Class | Fix |
|---|---|---|---|
| `validation_error (401)` or `missing_api_key`, `invalid_api_key` | The key in Vercel's Preview scope is wrong, revoked or truncated | configuration | paste a valid key from the Resend account that owns the domain |
| `validation_error (403)` | The key is valid but its account has not verified the domain in `LEAD_FROM_EMAIL` (a different Resend account or team, or the address is on another domain or subdomain than the verified one) | authorization | use a key from the account where `peregrine-it.com` shows Verified, or correct the address |
| `validation_error (422)` or `invalid_from_address` | `LEAD_FROM_EMAIL` is malformed (for example stray quotes around the value, or a missing `>`) | configuration | set exactly `Peregrine IT <hello@peregrine-it.com>` with no surrounding quotes |
| `restricted_api_key` | The key is limited to another domain | authorization | use an unrestricted or correctly scoped key |
| `daily_quota_exceeded`, `monthly_quota_exceeded`, `rate_limit_exceeded (429)` | Plan limit | provider rejection | wait or raise the limit |
| `invalid_idempotency_key` or anything naming the request shape | Something this code sends | application code | I fix it |
| `fetch failed` or a timeout | Resend unreachable from Vercel | provider or network | retry; check Resend status |

And from the status JSON: `senderDomainVerified: false` means the key works but its account does not have the sender's domain verified; `null` means the key is invalid or is a sending-only key; `true` rules out the first two rows.

## Why the failed POST is not in the Vercel log export (2026-10-10)

**Owner's findings:** the export (53 rows, October 9) has `GET /api/lead` 200 and CSP warnings, no `POST /api/lead`. The preview reports `resend: true`, `sender: custom`, `senderDomainVerified: true`.

**What the code review establishes (facts, from the source):**

| Question | Finding |
|---|---|
| Does the form validate before sending? | Browser validation only: name, email, project type and timeline are `required`. A message under 10 characters is rejected by the server with a different text ("Message must be at least 10 characters") |
| Endpoint and method | One call site: `fetch('/api/lead', { method: 'POST' })` in `LeadForms.tsx`, same origin. No other form, `action` attribute, middleware or rewrite |
| Where can "We could not send your request" come from? | **Only** from this API's HTTP 502 response. The text does not exist in client code, and it does not exist on `main` (production). So when that text was shown, a POST reached `/api/lead` on a preview build and was answered 502 |
| Does a 502 always write a log line? | Yes. Every 502 runs `console.error` first: `Lead not delivered…` on the build before `616e559`, `Lead NOT accepted by any destination {…}` after. Sanitized: reference, statuses, provider error name. Confirmed locally against the real Resend API |
| What does `senderDomainVerified: true` rule out? | An invalid key, a sending-only key, and a key whose account lacks the sender's domain. It does **not** show that a send succeeds |

**So the POST happened and the export does not contain it.** That is a property of the export, not of the request. Which of these applies is not known:

1. **Time window.** The fixed build was pushed at 22:16 IST on October 9 (16:46 UTC). A test after that is at the very end of October 9 or on October 10 in the log's time zone.
2. **Retention.** Vercel keeps runtime logs for a short period on the Hobby plan (about an hour) and longer on paid plans. A later export no longer has the row.
3. **Deployment or environment filter.** Each push creates a new preview deployment. A view filtered to one deployment or to Production omits the others.
4. **Row or level filter.** The 502 line is at error level; a text or level filter can hide it.

**Not established:** why Resend refused the notification. No evidence of the failing POST has been seen by me.

### How to capture the evidence (new preview build, no log access needed)

The form now prints what the API answered. After the Vercel check passes on the latest commit:

1. Open `https://peregrinewebsite-git-seo-phase-12-mukeshs-projects-36e886df.vercel.app/contact`, hard-refresh, submit with "TEST" in the name and a message of 10+ characters.
2. If it fails, a grey line appears under the error, for example:
   `HTTP 502 · reference d0b2c113 · email: validation_error (401): API key is invalid; webhook: LEAD_WEBHOOK_URL not set`
   Send me that line. It carries no address and no secret. (The provider detail is shown on preview builds only; production shows the status and reference.)
3. Optional cross-check: browser DevTools → Network → the `lead` request → status code and response body; and in Vercel → Logs, with Environment = Preview and the time range set to the last 30 minutes, search the reference.

If the line says `no response from /api/lead`, the request never reached the API (something in front answered); then the Network tab's status code for `lead` is the evidence.

## What the code does now (`src/app/api/lead/route.ts`)

Three states, never merged:

| State | Meaning | Where it shows |
|---|---|---|
| **Submission accepted** | validated, given an 8-character reference | response `ref`; log |
| **Provider accepted** | Resend returned a message id, or the webhook returned 2xx | response `notification.status`, `acknowledgement.status`, `webhook.status`; ids in the log |
| **Delivered** | Resend later records `delivered` for the message | `GET /api/lead?delivery=<id>`; the form checks it for the notification; Resend dashboard |

- **Acceptance rule:** the form shows "Request received" only when the notification was accepted by Resend **or** the webhook accepted the lead. Otherwise HTTP 502, `success: false`, and the error with the email link. The email link is not a lead.
- **The API never says delivered.** The form says "Request received" and shows the reference. It then asks the API what Resend recorded for the notification; if Resend reports a bounce or failure, the visitor is told and `lead_delivery_failed` is tracked.
- **Notification and acknowledgement are tracked separately.** An acknowledgement failure is reported in the response, shown to the visitor ("we could not send you a confirmation email, keep this reference") and logged.
- **Hidden field:** a filled field no longer returns a silent success. The lead still goes to the inbox with `[Possible spam]` in the subject and no acknowledgement is sent (a bot could otherwise use the acknowledgement to mail a third party). The field now sits in a `display: none` wrapper, which browsers and password managers skip.
- **Duplicates:** the form sends one `submissionId` per attempt and reuses it while the outcome is unknown. The reference and the Resend idempotency keys (`lead-notify-<ref>`, `lead-ack-<ref>`) derive from it, so a retry is the same message to Resend.
- **Retries:** one, only for errors that can be transient (5xx, 429, network). A 4xx is not retried.
- **Log line per lead** (`Lead accepted`, `Lead accepted with a failed step`, `Lead NOT accepted by any destination`): reference, form, environment, sender type, each message's status and Resend id, failure reason as error name and status. No name, address or message text.
- **Durable storage: none in this app.** There is no database and Vercel has no writable disk. The response and `GET /api/lead` say `durableStorage: "none"` unless the webhook accepted the lead. The record is the email in the inbox, Resend's own log, and the webhook destination if configured.
- **Preview:** sending happens in any environment that has `RESEND_API_KEY`. `GET /api/lead` now reports `environment`.
- **Provider:** Resend only. **Recipient:** `info@peregrine-it.com`, fixed in code.

`GET /api/lead?delivery=` needs an API key allowed to read emails. With a "Sending access" key it returns `null` and the form simply shows no delivery line; nothing breaks.

## Minimal steps: production sender and recipient

1. **Resend → Domains.** If `peregrine-it.com` (or a subdomain) shows **Verified**, skip to step 3.
2. Otherwise **Add domain** → `peregrine-it.com`, and create at your DNS host exactly the records Resend lists (a DKIM `TXT`, and an `MX` and SPF `TXT` on the `send` subdomain). They sit beside the Google Workspace records and do not change them. Wait for **Verified**.
3. **Vercel → peregrinewebsite → Settings → Environment Variables** (Production and Preview):
   - `RESEND_API_KEY`: confirm it exists.
   - `LEAD_FROM_EMAIL` = `Peregrine IT <hello@peregrine-it.com>` (any address on the verified domain; the mailbox need not exist, replies go to the visitor's address or to the `Reply-To`).
4. Redeploy. Open `/api/lead`. Expected: `"ok":true`, `"resend":true`, `"sender":"custom"`, `"senderDomainVerified":true` (or `null` with a sending-only key).
5. Submit the form once. Pass = the notification is in `info@peregrine-it.com` **and** the auto-reply is in the address you typed. Check spam on both.

The recipient needs no configuration. To change it, edit `NOTIFY_TO` in the route.

## Durable record in a Google Sheet (optional, free, uses the existing Google Workspace)

Nothing is created by this repo; these are owner steps.

1. Create a Google Sheet named "Website leads".
2. Extensions → Apps Script. Replace the editor's contents with `scripts/lead-sheet-webhook.gs`.
3. Deploy → New deployment → type **Web app**; Execute as **Me**; Who has access **Anyone**. Copy the web app URL. Treat the URL as a secret: anyone who has it can add rows.
4. In Vercel set `LEAD_WEBHOOK_URL` to that URL (Production and Preview) and redeploy.
5. `/api/lead` shows `webhook: true`. Submit a test lead; a row appears with the same reference as the email subject.

With both set, a lead is recorded when either works, and the visitor sees an error only when both fail.

## After it works

Vercel → Logs: `Lead accepted` lines carry the reference and each message's Resend id; `Lead NOT accepted by any destination` and `Lead accepted with a failed step` are the ones to act on.
