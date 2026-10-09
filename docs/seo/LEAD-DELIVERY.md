# Lead delivery: how it works and how to configure it

## What the code does (verified by reading `src/app/api/lead/route.ts` and `package.json`)

- **Email provider:** Resend, and only Resend. `resend` is the only mail dependency; there is no SMTP, SendGrid or other provider in the code or its history.
- **Recipient:** `info@peregrine-it.com`, fixed in code (`NOTIFY_TO`). Not an environment variable.
- **Sender:** `LEAD_FROM_EMAIL` if set; otherwise Resend's test sender `onboarding@resend.dev`, which Resend delivers only to the Resend account owner's own address.
- **Second destination (optional):** `LEAD_WEBHOOK_URL`, a JSON POST with a 5-second timeout.
- **Success rule:** the visitor sees "sent" only when the email or the webhook accepted the lead. The notification email is retried once. Otherwise the API returns 502 and the form shows an error with an email link. **That link is a last resort for the visitor. It is not a delivered lead and is not counted as one** (`lead_error` is tracked, not `lead_submit`).
- **Persistence:** none in the app. Vercel has no writable disk and the project has no database. The durable record is the email in the inbox, the copy Resend keeps in its dashboard, and the webhook's destination if one is set.
- **Reference:** each lead gets an 8-character reference that appears in the email subject, the webhook payload and the server log (the log carries no personal data), so the three can be reconciled.

## What is not known

| Question | Evidence so far | How to settle it |
|---|---|---|
| Is `RESEND_API_KEY` set in Vercel production? | Unknown. No access to the project from this machine; no `.env` file in the repo | `/api/lead` → `resend: true` |
| Is the sender domain verified in Resend? | Unknown. Public DNS shows no `resend._domainkey.peregrine-it.com` and no `send.peregrine-it.com` records, which is a hint and not proof: the account could use a subdomain or custom record names | `/api/lead` → `senderDomainVerified: true` (the app asks Resend). `null` means the key is restricted to sending; check Resend → Domains instead |
| Do emails arrive today on production? | Unknown. Production's current code reports success even when Resend rejects | One test submission |

## Minimal steps: production sender and recipient

1. **Resend → Domains.** If `peregrine-it.com` (or a subdomain) shows **Verified**, skip to step 3.
2. Otherwise **Add domain** → `peregrine-it.com`, and create at your DNS host exactly the records Resend lists (a DKIM `TXT`, and an `MX` and SPF `TXT` on the `send` subdomain). They sit beside the Google Workspace records and do not change them. Wait for **Verified**.
3. **Vercel → peregrinewebsite → Settings → Environment Variables** (Production and Preview):
   - `RESEND_API_KEY`: confirm it exists.
   - `LEAD_FROM_EMAIL` = `Peregrine IT <hello@peregrine-it.com>` (any address on the verified domain; the mailbox need not exist, replies go to the visitor's address or to the `Reply-To`).
4. Redeploy. Open `/api/lead`. Expected: `{"ok":true,"resend":true,"sender":"custom","senderDomainVerified":true,"webhook":false}`.
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

Vercel → Logs: `Lead delivered` lines carry the reference and which destination accepted it; `Lead not delivered` and `Lead notification email failed` are the ones to act on.
