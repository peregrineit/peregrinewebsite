# Lead capture: architecture, data flow and retention

**Written:** 2026-10-10 (Growth Sprint 2, stream A) · **Branch:** `growth/s2-lead` · **Nothing here is deployed.**

This describes the code as it is on this branch. The incident history and the three delivery states are in `docs/seo/LEAD-DELIVERY.md`; that behaviour is unchanged.

## What is not production-ready

| Thing | State |
|---|---|
| Durable store (Vercel Blob) | **Not production-ready. Tested against a mock only.** Off unless two variables are set. The owner has to create a Blob store, set the variables and submit a real test lead before relying on it. The HTTP interface it uses is not documented by Vercel (see "Durable store") |
| Owner alert | Tested against a mock only. Off unless `LEAD_ALERT_WEBHOOK_URL` is set. The Sheet-script half (mail through Google) has never been run |
| Sheet script changes (`scripts/lead-sheet-webhook.gs`) | Not run. Apps Script cannot be executed from this repo. New columns, the duplicate check and the alert handler need one manual test after pasting |
| Privacy wording at the end | A draft for the owner. The published policy page is untouched |

Everything else (attribution, Calendly parameters, form events, priority, webhook retry and signature) is exercised by the tests listed at the end.

## Data flow

```
Browser                                              Server: POST /api/lead                    Destinations
-------                                              ----------------------                    ------------
page load   -> first touch  (localStorage)
            -> last touch   (sessionStorage)
            -> page views   (sessionStorage)
CTA click   -> CTA location (sessionStorage)
                                                                                    
submit form -> JSON: fields + attribution ---------> 1 parse, rate limit (5 / IP / 10 min)
               + submissionId                        2 clean and length-limit every field
                                                     3 validate name, email, message
                                                     4 priority = f(fields)            (no I/O)
                                                     5 in parallel, 5 s webhook budget:
                                                         notification email ---------------> Resend -> info@peregrine-it.com
                                                         webhook (1 retry, signed) --------> LEAD_WEBHOOK_URL (e.g. Google Sheet)
                                                     6 accepted = email accepted OR webhook accepted
                                                        not accepted -> HTTP 502, nothing below runs
                                                     7 in parallel:
                                                         acknowledgement email ------------> Resend -> the visitor
                                                         store write (if switched on) -----> Vercel Blob
                                                     8 one log line, no personal data -----> Vercel runtime log
                                                     9 respond: ref, per-step status
                                                    10 after the response, only if the
                                                       notification failed: alert --------> LEAD_ALERT_WEBHOOK_URL
```

Nothing is sent to the server before the visitor submits a form. The analytics events (below) are a separate path and never contain form values.

### In the browser, before submit

`src/lib/attribution.ts`, called from `components/Tracking.tsx`. No cookie is set by any of this.

| Key | Where | Content | Lifetime as far as this code controls it |
|---|---|---|---|
| `pit_first_touch` | localStorage | time, landing path, referrer, `utm_*`, `gclid`, `msclkid`, `fbclid` of the first arrival | replaced when older than 90 days; otherwise until the visitor clears site data |
| `pit_attribution` | sessionStorage | the same fields for the last touch: the first arrival of this tab session, replaced by a later full page load that has campaign tags, a click id or a referrer from another site | until the tab is closed |
| `pit_pages_viewed` | sessionStorage | a number: page views in this tab (first load and each client-side navigation, capped at 999) | until the tab is closed |
| `pit_cta` | sessionStorage | which CTA last opened a popup form: form name, location, page path | until the tab is closed |
| `pit_analytics_consent` | localStorage | `granted` or `denied` (existed before this sprint) | until cleared |

The values are not cleared after a submit: a second enquiry in the same visit should carry the same source.

### Fields in the POST

Form fields: `form`, `name`, `email`, `company`, `projectType`, `timeline`, `service`, `message`, `pit_confirm_field` (hidden anti-spam field), `submissionId`, `pageUrl`.

Attribution fields (all optional; the server accepts a lead without any of them):

| Field | Meaning | Server limit |
|---|---|---|
| `landingPage`, `referrer`, `utm` | last touch (names kept from the first version) | one line, 500 characters each |
| `lastTouchAt` | time of the last touch | ISO time or dropped |
| `firstLandingPage`, `firstReferrer`, `firstUtm` | first touch | one line, 500 characters each |
| `firstTouchAt` | time of the first touch | ISO time or dropped |
| `gclid`, `msclkid`, `fbclid` | most recent click id seen (last touch, else first touch) | `A-Z a-z 0-9 _ . -` only, 200 characters; anything else is dropped |
| `ctaLocation` | for a popup form, the location of the CTA that opened it (`nav`, `footer`, a section id, a `data-cta-location` value); for an inline form, `inline:<where it sits>` | one line, 80 characters, letters, digits and `_ : . / # -` and spaces |
| `pagesViewed` | page views in the session up to the submit | integer 0 to 999 |

"One line" means control characters, including line breaks, are replaced by a space, so a field cannot start a line of its own in the notification email. `utm` no longer contains `gclid`; it has its own field.

### Priority

`src/lib/lead-priority.ts`, a pure function of fields the visitor typed. Unit tests: `scripts/test_lead_priority.mjs`.

| Signal | Points |
|---|---|
| Timeline `asap` | +2 |
| Timeline `1-2-months` | +1 |
| Timeline `2-6-months`, none, or unrecognized | 0 |
| Timeline `exploring` | -1 |
| Company given | +1 |
| Email on a business domain (not in the free-mail list in the file) | +1 |
| Email on a free-mail domain | 0 |
| Message of 400 characters or more | +2 |
| Message of 120 to 399 characters | +1 |
| Message of 30 to 119 characters | 0 |
| Message under 30 characters, or the form's default text | -1 |
| Strategy-call form | +1 |
| Sent from a service, industry or guide page (`service` not empty) | +1 |

Score 5 or more is **high**, 0 or less is **low**, otherwise **normal**. Range -2 to 8. A filled anti-spam field is always **low**.

It appears as `Priority: High (timeline ASAP +2; company given +1; ...)` in the notification email, as `priority` and `priorityReasons` in the webhook payload and the stored object, and as `priority` in the log line. It is never in the response to the visitor, never in the acknowledgement, and it does not change whether or how a lead is delivered. The thresholds are a first guess with no lead data behind them; change them in the file, the test and this table together.

### Webhook

`src/lib/lead-webhook.ts`.

- **Body:** flat JSON: `receivedAt`, `source`, `ref`, the form fields (not `submissionId`, not the anti-spam field's value), `spamSuspected`, the attribution fields, `priority`, `priorityReasons`.
- **Headers:** `Idempotency-Key: lead-<ref>`; with `LEAD_WEBHOOK_SECRET` set, `X-Peregrine-Signature: sha256=<hex HMAC-SHA256 of the raw body>`.
- **Budget:** 5 seconds for everything, retry and backoff included.
- **Retry:** one, 300 ms later, only after a failure that came back quickly and may be transient (5xx, 408, 429, connection error), and only if at least 500 ms of the budget is left. A timeout is not retried. Other 4xx are not retried. Both attempts send identical bytes.
- **Receivers must deduplicate on `ref`.** Since sprint 2 the site may send the same lead twice: once more after a quick 5xx, 408, 429 or connection error, and again if the visitor retries an unchanged form after an error. Every repeat has the same `ref`, the same `Idempotency-Key` and (for the automatic retry) the same bytes. A receiver that appends a row or creates a contact for every POST will create duplicates unless it treats a repeated `ref` as the lead it already has. The Sheet script checks the last 20 rows for the `ref`. A timeout is not retried by the site.
- **What counts as accepted:** any 2xx, except a 2xx whose `Content-Type` is `text/html` (reason `webhook answered with an HTML page`) and a 2xx JSON body containing `"ok": false` (reason `webhook answered ok:false`). An Apps Script web app answers 200 with an HTML page for a sign-in prompt or an uncaught exception, having recorded nothing; the Sheet script therefore catches its own errors and answers JSON `ok: false`. No other body is required: plain text, an empty body, or JSON without `ok` all count. A receiver that answers a successful POST with an HTML page will be treated as failing.
- **Verifying the signature:** `docs/growth/lead/verify-signature.mjs` (Node). A Google Apps Script web app cannot read request headers, so the Sheet receiver cannot verify it; its protection is the secrecy of its URL.

### Durable store

`src/lib/lead-store.ts`. A `LeadStore` interface with a no-op default and one adapter.

- **Switch:** the adapter runs only when `LEAD_STORE=vercel-blob` **and** `BLOB_READ_WRITE_TOKEN` are both set. One without the other, or any other `LEAD_STORE` value, is the no-op store and the API behaves exactly as before.
- **Rule:** a store write is a record of a lead that was already accepted. It is not acceptance. The visitor is told "received" only when the notification email or the webhook accepted the lead; if neither did, the response is the 502 it always was and **nothing is stored**. Reason: nobody is notified when an object appears in a Blob store, so a store-only lead would be one the visitor believes was received and nobody reads.
- **Failure:** a failed or slow write (3 second limit, no retry) is logged (`Lead accepted with a failed step`, with the reason) and reported (`store.status: "failed"`). It never fails the lead.
- **Object:** `leads/<yyyy-mm>/<ref>-<32 hex>.json` containing the webhook body plus `delivery: { notification, webhook }`. The 32 hex characters are an HMAC of the reference keyed with the store token: not guessable from the reference the visitor sees, and the same for a retry of the same submission, so a retry replaces its own object. The path is never logged or returned.
- **Access:** sent as `private` by default, which needs a **private** Blob store (reads then need the token). `LEAD_STORE_BLOB_ACCESS=public` exists for a public store, where the unguessable path is the only protection; a private store is the recommendation.
- **Interface used:** `PUT <api>/?pathname=<path>` with `authorization: Bearer <token>`, `x-api-version`, `x-vercel-blob-access`, `x-content-type`, `x-add-random-suffix: 0`, `x-allow-overwrite: 1`. Vercel's documentation (`vercel.com/docs/vercel-blob`, read 2026-10-10) describes the SDK only; this is the request the `@vercel/blob` SDK source makes (`packages/blob/src/put.ts`, `api.ts`, API version 12, base `https://vercel.com/api/blob`). It is not the older `https://blob.vercel-storage.com/<path>` form. Because it is undocumented it can change; the effect would be failed writes in the log, not lost leads. If the owner prefers a supported interface, swap the adapter's `fetch` for the SDK's `put()` (one dependency).
- **Status:** `GET /api/lead` reports `store` (`none` or `vercel-blob`) and `durableStorage` (`none`, `webhook`, `vercel-blob`, `webhook+vercel-blob`) for what is configured; the POST response reports what was actually written for that lead.

**Turning the store on (owner steps, not done):**
1. Vercel → Storage → Create → Blob → access **Private**. Connect it to the project (Production, and Preview if wanted).
2. Confirm `BLOB_READ_WRITE_TOKEN` exists in the project's variables (newer stores connect with OIDC by default; this adapter needs the read-write token).
3. Set `LEAD_STORE=vercel-blob`. Redeploy.
4. `GET /api/lead` shows `"store":"vercel-blob"`. Submit a test lead: the response shows `"store":{"status":"stored"}` and an object appears under `leads/` in the Blob browser. If it shows `"failed"`, the reason is in the `Lead accepted with a failed step` log line.

### Owner alert

Problem: when Resend refuses the notification but the webhook accepts the lead, the visitor rightly sees "received", and the lead sits in a sheet nobody was told to look at.

What is possible without new infrastructure: the alert must not use Resend. The only other outbound channel this app has is an HTTP POST. So:

- With `LEAD_ALERT_WEBHOOK_URL` set, a notification failure on an accepted lead sends `{ event: "lead_notification_failed", ref, receivedAt, source, environment, form, priority, heldBy, reason }` to that URL, signed like the lead webhook, after the response has been sent. No name, address or message.
- The Sheet script handles that event by mailing the sheet's owner through Google (`MailApp`), which is independent of Resend. Setting `LEAD_ALERT_WEBHOOK_URL` to the same web-app URL as `LEAD_WEBHOOK_URL` is enough. Any service that turns a POST into a notification works as well.
- Without the variable there is no alert, only the error-level log line. `GET /api/lead` shows `ownerAlert: false`.

Not covered: an email that Resend accepted and later bounced. The form detects that in the browser (`lead_delivery_failed`) while the visitor is still on the page; the server is not told. Covering it needs a Resend webhook endpoint, which is new infrastructure.

A notification that is *skipped* because `RESEND_API_KEY` is not set does not alert: that is a configuration, not a failure.

### Calendly links

`calendlyUrl()` in `src/lib/attribution.ts`. Every `https://…calendly.com/…` link gets `utm_source=peregrine-it.com`, `utm_medium=website`, `utm_content=<page path>`, `utm_term=<CTA location>`, which Calendly stores with the booking. `ConsultationCta` renders the link with the parameters; every other Calendly link on the site is plain HTML and is rewritten by one delegated handler in `Tracking.tsx` on click, middle-click or context menu. A visitor with JavaScript off follows the plain link, without parameters. The parameters describe our page, not the visitor.

### Analytics events

`src/lib/track.ts` sends to Vercel Analytics and, when `NEXT_PUBLIC_GA_ID` is set and the visitor accepted, GA4. Added or changed in this sprint:

| Event | Fires when | Properties |
|---|---|---|
| `lead_form_start` | first input in a lead form, once per form per page view | `form`, `page` |
| `lead_form_abandon` | the page is hidden or unloaded with a started, unsent form, once per form per page view | `form`, `page` |
| `lead_error` | a lead form fails | `form`, `page`, `service`, **`status`** (HTTP status; 0 = no response) |
| `cta_open` | unchanged, but now also fires for the footer "quick project" links | `form`, `location`, `page` |

`lead_form_abandon` includes tab switches: a visitor who switches away, returns and submits produces an abandon and then a `lead_submit`. No event ever contains a field name or value. `docs/seo/TASKS.md` holds the event table and should get these rows (not edited from this stream).

## Environment variables

| Variable | Default | Effect |
|---|---|---|
| `RESEND_API_KEY` | not set | Enables the notification and acknowledgement emails. Unchanged |
| `LEAD_FROM_EMAIL` | Resend's test sender | Sender of both emails. Unchanged |
| `LEAD_WEBHOOK_URL` | not set | Every lead is POSTed there as JSON. Unchanged, plus one retry |
| `LEAD_WEBHOOK_SECRET` | not set | **New.** When set, webhook and alert requests carry `X-Peregrine-Signature`. Any long random string; the receiver needs the same value |
| `LEAD_ALERT_WEBHOOK_URL` | not set | **New.** Where the owner alert is POSTed when the notification email fails on an accepted lead |
| `LEAD_STORE` | not set (no store) | **New.** `vercel-blob` selects the Blob adapter; needs the token as well |
| `BLOB_READ_WRITE_TOKEN` | not set | **New to this app.** Vercel's read-write token for the Blob store. Used only when `LEAD_STORE=vercel-blob` |
| `LEAD_STORE_BLOB_ACCESS` | `private` | **New.** `public` only for a public Blob store |
| `LEAD_STORE_BLOB_API_URL` | `https://vercel.com/api/blob` | **New.** Base URL of the Blob API. Exists so the tests can point at a mock; do not set it in Vercel. **Ignored when `VERCEL_ENV` is `production`**, because every request to that URL carries the store token |
| `NEXT_PUBLIC_GA_ID` | not set | GA4 and the consent bar. Unchanged |
| `RESEND_BASE_URL` | Resend's API | Read by the Resend SDK; used by the tests only |
| `VERCEL_ENV` | set by Vercel | `production` hides the diagnostic in a 502 response. Unchanged |

No variable's value is ever returned by `GET /api/lead` or written to the log.

## What each destination holds, and for how long

"As far as this code controls it" is the honest limit: the code sets no retention period anywhere. Retention is each service's setting or the owner's manual action.

| Destination | Holds | Retention controlled by this code | Who controls it in practice |
|---|---|---|---|
| Visitor's browser | first and last touch, page-view count, CTA location, consent choice | first touch replaced after 90 days; session values end with the tab | the visitor (clear site data) |
| Notification email in `info@peregrine-it.com` | the whole lead: name, email, company, message, form fields, page URL, attribution, priority, reference | none | the mailbox owner (Google Workspace retention and manual deletion) |
| Acknowledgement email in the visitor's inbox | their name as typed, the reference, the reply-time sentence | none | the visitor |
| Resend | both emails as sent (recipient, subject, body) and their delivery events | none | Resend's retention for the account's plan; the owner can delete from the Resend dashboard. **TODO(owner): confirm the plan's retention period before quoting one in the policy** |
| Webhook destination (Google Sheet when the provided script is used) | one row per lead: every field of the webhook body | none | the sheet's owner; rows stay until deleted |
| Vercel Blob (only if switched on) | one JSON object per accepted lead: the webhook body plus the delivery outcome | none. Objects are never deleted or expired by this code | the Vercel team owning the store; delete in the Blob browser or by script. **A retention routine does not exist yet and should before this is switched on in production** |
| Alert destination (only if set) | reference, time, form name, priority, where the lead is held, the provider's error name. No personal data | none | whoever owns that URL |
| Vercel runtime log | one line per lead: reference, form name, environment, priority, per-step status, Resend message ids, error names. No name, address, message, attribution or storage path | none | Vercel's log retention for the plan |
| Vercel Analytics / GA4 | event name with `form`, `page`, `service`, `location`, `status`. No form values, no reference | none | those services' retention settings |
| The server itself | nothing durable. An in-memory per-instance rate-limit table of IP address and timestamps; timestamps older than 10 minutes are dropped the next time that address posts (or when the table passes 5,000 addresses), and all of it is lost when the instance stops | as described | automatic |
| Calendly | whatever the visitor enters when booking, plus the four UTM parameters naming our page and CTA | none | Calendly account settings |

Deleting one person's data on request therefore means, by hand: the notification email (and any reply thread), the Resend log entries, the sheet row, and the Blob object if the store is on. The reference in the email subject finds the row and the object (`leads/<yyyy-mm>/<ref>-…`).

## Draft privacy-policy wording (for the owner to review; not published)

This is a proposal. It has not been reviewed by a lawyer, and the published page (`src/app/privacy-policy/page.tsx`) is unchanged. Two things in it need the owner's confirmation and are marked.

> **Enquiry forms.** When you send us a project request through a form on this site, we receive what you typed (your name, email address, company if you gave one, the project type and timeline you chose, and your message) together with the address of the page you sent it from.
>
> **How you found us.** With your request we also receive: the page on which you first arrived and the site that referred you, for your first visit and for the visit in which you wrote to us; any campaign tags (`utm` parameters) and advertising click identifiers (`gclid`, `msclkid`, `fbclid`) that were in the address of those pages; which button or section of the page you used to open the form; and how many pages you viewed in that visit. Until you submit a form this information stays in your browser's local and session storage and is not sent to us. We do not use cookies for it. It is stored in your browser for up to 90 days, or until you clear the site's data. If you never submit a form, we never receive it.
>
> **What we do with it.** We use your request to reply to you, and the information about how you found us to understand which pages and channels lead to enquiries. We sort incoming requests by urgency using only what you wrote in the form (for example the timeline you selected). This sorting decides the order in which we read requests and nothing else; every request is read by a person.
>
> **Where it goes.** Your request is delivered to our mailbox by Resend (our email delivery provider), which also sends you a confirmation email, and it may be recorded in a spreadsheet in our Google Workspace account and in file storage provided by Vercel, our hosting provider. These providers process the information on our behalf. [TODO(owner): list only the destinations actually switched on, and confirm the provider names as they should appear.]
>
> **How long we keep it.** We keep enquiries for as long as needed to respond and, where a project follows, for the life of that relationship. [TODO(owner): state the period you will actually apply, for example "up to 24 months after our last contact", and put a deletion routine in place for the mailbox, the spreadsheet and the file storage; nothing deletes them automatically today.] You can ask us to delete your enquiry at any time by writing to info@peregrine-it.com.
>
> **Booking a call.** Links to our Calendly page include the address of the page you were on and the name of the link you used. They identify our page, not you.

Points for the owner while reviewing:
- The published policy says analytics data is collected "through cookies and similar technologies". The first-touch record in local storage is a "similar technology"; the paragraph above describes it specifically. In jurisdictions that apply consent rules to local storage as well as cookies (the EU and UK), storing the first touch before consent may need the same consent as analytics cookies. The site's market is the US and Canada; if EU visitors matter, gate `rememberAttribution()` on the existing consent choice. That is a product decision, not made here.
- The published policy lists "Phone number (if provided)"; no form on the site asks for one.

## Tests

| Command | Covers | Result on this branch |
|---|---|---|
| `python3 scripts/test_lead_api.py` (needs `npm run build`) | the API against local mocks of Resend, the webhook, the alert endpoint and the Blob API: every pre-existing check, plus attribution cleaning, priority, retry and budget, signature (verified by the Node reference verifier), store switch and failure modes, owner alert | 181 passed |
| `node --experimental-strip-types scripts/test_lead_priority.mjs` | every scoring rule and threshold | 36 passed |
| `node --experimental-strip-types scripts/test_lead_client.mjs` | touch parsing, first/last touch rules, server-side cleaning, Calendly URL rewriting, the form start/abandon state machine | 45 passed |
| `node scripts/test_lead_browser.mjs` (needs a build and an installed Chrome) | headless Chrome over the DevTools protocol: storage after a real arrival with UTM, click id and referrer; no cookie; page-view count across a client-side navigation; Calendly hrefs after a click on four pages and after a context-menu event; the server-rendered ConsultationCta link; `lead_form_start` once; the POST body of an inline and a popup form; `lead_form_abandon` on a real unload | 33 passed |

Not verified anywhere: a real Resend send, a real Vercel Blob write, the Apps Script receiver, Calendly actually recording the UTM parameters on a booking, GA4 or Vercel Analytics receiving an event sent during page unload, and any browser other than Chrome.
