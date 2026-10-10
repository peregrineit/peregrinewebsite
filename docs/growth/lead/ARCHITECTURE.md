# Lead capture: architecture, data flow and retention

**Written:** 2026-10-10 (Growth Sprint 2, stream A; revised the same day after review, see "Changes after review") · **Branch:** `growth/s2-lead` · **Nothing here is deployed.**

This describes the code as it is on this branch. The incident history and the three delivery states are in `docs/seo/LEAD-DELIVERY.md`; that behaviour is unchanged.

## What is not production-ready

| Thing | State |
|---|---|
| Durable store | **Not implemented.** An experimental Vercel Blob adapter was written in Sprint 2 and removed before release: it relied on the HTTP request the Blob SDK makes, which Vercel does not document, and had only run against a mock. The variables that switched it on now do nothing |
| Owner alert | Tested against a mock only. Off unless `LEAD_ALERT_WEBHOOK_URL` is set. The Sheet-script half (mail through Google) has never been run |
| Sheet script changes (`scripts/lead-sheet-webhook.gs`) | Not run. Apps Script cannot be executed from this repo. New columns, the duplicate check and the alert handler need one manual test after pasting |
| Privacy wording at the end | A draft for the owner. The published policy page is untouched |

Everything else (attribution, Calendly parameters, form events, priority, webhook retry and signature) is exercised by the tests listed at the end.

## Data flow

```
Browser                                              Server: POST /api/lead                    Destinations
-------                                              ----------------------                    ------------
page load   -> first touch  (sessionStorage; localStorage too only if analytics were accepted)
            -> last touch   (sessionStorage)
            -> page views   (sessionStorage)
CTA click   -> CTA location (sessionStorage)

submit form -> JSON: fields + attribution ---------> 1 parse, rate limit (5 / IP / 10 min)
               + submissionId                        2 clean every field: one line each, message multi-line
                                                     3 reference = hash(submissionId + cleaned content)
                                                     4 validate name, email, message
                                                     5 priority = f(fields)            (no I/O)
                                                     6 in parallel:
                                                         notification email (8 s limit) ---> Resend -> info@peregrine-it.com
                                                         webhook (signed if a secret is set; retry only if switched on; 5 s) ---> LEAD_WEBHOOK_URL (e.g. Google Sheet)
                                                     7 accepted = email accepted OR webhook accepted
                                                        not accepted -> HTTP 502, nothing below runs
                                                     8 when both of step 6 have answered:
                                                         acknowledgement email (5 s limit) -> Resend -> the visitor
                                                     9 one log line, no personal data -----> Vercel runtime log
                                                    10 respond: ref, per-step status
                                                    11 after the response, only if the
                                                       notification failed: alert --------> LEAD_ALERT_WEBHOOK_URL
```

Nothing is sent to the server before the visitor submits a form. The analytics events (below) are a separate path and never contain form values.

### In the browser, before submit

`src/lib/attribution.ts`, called from `components/Tracking.tsx`. No cookie is set by any of this.

| Key | Where | Content | Lifetime as far as this code controls it |
|---|---|---|---|
| `pit_first_touch` | sessionStorage, always | time, landing path, referrer (origin and path only), `utm_*`, `gclid`, `msclkid`, `fbclid` of the first arrival in this tab session | until the tab is closed |
| `pit_first_touch` | localStorage, **only while `pit_analytics_consent` is `granted`** | the same record, so a later visit can be tied to the first | at most 90 days: deleted when read after that. Deleted as soon as the choice is `denied`, and on the next page load if the choice is missing |
| `pit_attribution` | sessionStorage | the same fields for the last touch: the first arrival of this tab session, replaced by a later full page load that has campaign tags, a click id or a referrer from another site | until the tab is closed |
| `pit_pages_viewed` | sessionStorage | a number: page views in this tab (first load and each client-side navigation, capped at 999) | until the tab is closed |
| `pit_cta` | sessionStorage | which CTA last opened a popup form: form name, location, page path | until the tab is closed |
| `pit_analytics_consent` | localStorage | `granted` or `denied` (existed before this sprint) | until cleared |

Rules the code enforces (`readFirstTouch` and `syncTouches` in `src/lib/attribution.ts`):

- **Without an explicit "accept" on the analytics bar, nothing about the arrival is written to localStorage.** First touch, last touch and click ids live in sessionStorage and end with the tab. If a first-touch record is found in localStorage without consent, it is deleted, not used. **Advertising click ids are not read at all without that accept** (release review, 2026-10-10): a `gclid`, `msclkid` or `fbclid` in the URL is ignored, and any captured while consent was in force are removed when it is declined or withdrawn.
- **With consent**, the first touch is also kept in localStorage for at most 90 days. An older record is deleted when it is read.
- **Declining, or withdrawing an earlier acceptance,** deletes the localStorage record at once (the consent bar calls `applyConsentChoice()`), and so does any page load on which the choice is not `granted`.
- **Referrers are stored as origin + path.** The query string and fragment (search phrases, tokens) are dropped before anything is stored.
- The consent bar exists only when `NEXT_PUBLIC_GA_ID` is set. Without it nobody can accept, so the first touch never outlives the session. "First touch" then means "first arrival in this tab session".
- The session values are not cleared after a submit: a second enquiry in the same visit carries the same source.

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

"One line" (`oneLine()` in `src/lib/attribution.ts`) means: CR, LF, NEL (U+0085), U+2028, U+2029 and tab become one space; other control characters, zero-width characters (U+200B to U+200F, U+2060 to U+2064, U+FEFF) and bidirectional overrides, embeddings and isolates (U+202A to U+202E, U+2066 to U+2069, U+061C) are removed. It applies to **every** field printed as `Label: value`: `name`, `email`, `company`, `form`, `projectType`, `timeline`, `service`, `pageUrl` and all attribution fields. So no field can add a line to the notification or to the acknowledgement (which is sent to an address the submitter chose and contains the name).

`message` is the one multi-line field. Its line breaks are normalized to LF, the same invisible characters are removed, and in the notification it is printed last, under the line `----- Message, exactly as typed by the visitor. Every line of it starts with ">" -----`, with each line prefixed `> `. A line in the message that reads `Priority: High` therefore appears as `> Priority: High`, below the delimiter.

`utm` no longer contains `gclid`; it has its own field.

**Anti-spam field.** `pit_confirm_field` flags the lead (`[Possible spam]`, no acknowledgement, priority low) when it holds anything other than nothing, `null` or a blank string. That includes non-string values such as `true`, `1`, `0`, `[]` or an object, which only a script sends.

### Reference and duplicates

The 8-character reference is the first 8 hex characters of SHA-256 over the form's `submissionId` and the cleaned content (every form field and every attribution field). Without a valid `submissionId` it is random. Every idempotency key (`lead-notify-<ref>`, `lead-ack-<ref>`, webhook `Idempotency-Key: lead-<ref>`, alert `lead-alert-<ref>`) and the store path derive from it.

- **Identical retry** (same id, same content; the form keeps its id after a network error or any 5xx): same reference, same keys. Resend returns the first message instead of sending again; a receiver that deduplicates on `ref` keeps one row.
- **Edited retry** (same id, the visitor changed something first): a new reference, delivered as a new message. So the visible reference changes when the content changes.
- A reused key with a different payload cannot occur, because the content is part of the reference. That matters: Resend answers such a request with HTTP 409 `invalid_idempotent_request` (its documentation, read 2026-10-10) rather than sending it.

### Time limits

What the visitor can wait for, at most:

| Step | Limit | On expiry |
|---|---|---|
| Notification email (retry included) | 8 s | reported `failed`, reason `timeout`; the send may still complete at Resend, which is why a retry reuses the key |
| Webhook (the optional retry and its backoff included) | 5 s | reported `failed`, reason `webhook timed out` |
| Acknowledgement email (retry included) | 5 s, after the two above have answered | reported `failed`; the visitor is told to keep the reference |

The webhook has 5 seconds in total, the optional retry included; each Resend call has its own deadline.

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
| Email on a disposable-mailbox domain (short explicit list in the file) | -3 |
| Message of 400 characters or more | +2 |
| Message of 120 to 399 characters | +1 |
| Message of 30 to 119 characters | 0 |
| Message under 30 characters, or the form's default text | -1 |
| Strategy-call form | +1 |
| Sent from a service, industry or guide page (`service` not empty) | +1 |

Score 5 or more is **high**, -1 or less is **low**, otherwise **normal** (0 is normal). Range -5 to 8. A filled anti-spam field is always **low**.

Why these bands: a lead with nothing for or against it (free-mail address, "2-6 months", a sentence or two) scores 0 and is an ordinary enquiry, so low needs an actual negative that nothing offsets: "just exploring", a near-empty message, or a throwaway address. A free-mail address is never negative. The quick-project form has no company field and is rarely on a service page, so its leads score about 0 to 3 and are normal unless something counts against them. The disposable penalty is sized so that no combination of other signals reaches high (the maximum with one is 4).

It appears as `Priority: High (timeline ASAP +2; company given +1; ...)` in the notification email, as `priority` and `priorityReasons` in the webhook payload and the stored object, and as `priority` in the log line. It is never in the response to the visitor, never in the acknowledgement, and it does not change whether or how a lead is delivered. The thresholds are a first guess with no lead data behind them; change them in the file, the test and this table together.

### Webhook

`src/lib/lead-webhook.ts`.

- **Body:** flat JSON: `receivedAt`, `source`, `ref`, the form fields (not `submissionId`, not the anti-spam field's value), `spamSuspected`, the attribution fields, `priority`, `priorityReasons`.
- **Headers:** `Idempotency-Key: lead-<ref>`; with `LEAD_WEBHOOK_SECRET` set, `X-Peregrine-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of the raw body>`.
- **Budget:** 5 seconds for everything, retry and backoff included.
- **Retry:** one, 300 ms later, only after a failure that came back quickly and may be transient (5xx, 408, 429, connection error), and only if at least 500 ms of the budget is left. A timeout is not retried. Other 4xx are not retried. Both attempts send identical bytes.
- **Receivers must deduplicate on `ref`.** Since sprint 2 the site may send the same lead twice: once more after a quick 5xx, 408, 429 or connection error, and again if the visitor retries an unchanged form after an error. Every repeat has the same `ref`, the same `Idempotency-Key` and (for the automatic retry) the same bytes. A receiver that appends a row or creates a contact for every POST will create duplicates unless it treats a repeated `ref` as the lead it already has. The Sheet script checks the last 20 rows for the `ref`. A timeout is not retried by the site.
- **What counts as accepted:** any 2xx, except a 2xx whose `Content-Type` is `text/html` (reason `webhook answered with an HTML page`) and a 2xx JSON body containing `"ok": false` (reason `webhook answered ok:false`). An Apps Script web app answers 200 with an HTML page for a sign-in prompt or an uncaught exception, having recorded nothing; the Sheet script therefore catches its own errors and answers JSON `ok: false`. No other body is required: plain text, an empty body, or JSON without `ok` all count. A receiver that answers a successful POST with an HTML page will be treated as failing.
- **Verifying the signature:** `docs/growth/lead/verify-signature.mjs` (Node). A Google Apps Script web app cannot read request headers, so the Sheet receiver cannot verify it; its protection is the secrecy of its URL.

### Durable store

None. The app has no database and no writable disk, and the experimental Vercel Blob adapter was removed before release (see the table at the top). The durable record of a lead is:

- the notification email in the inbox, and Resend's own log of it;
- the webhook's destination when `LEAD_WEBHOOK_URL` is set (for example the Google Sheet receiver in `scripts/lead-sheet-webhook.gs`).

`GET /api/lead` reports `durableStorage` as `webhook` or `none`. A supported store should be added only with a documented API, a real test against that service on a preview deployment, and a deletion routine.

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

## Release review decisions (2026-10-10)

| Topic | Decision | Why |
|---|---|---|
| Durable store | Removed | Undocumented endpoint, mock-tested only |
| Webhook retry | **Off by default.** `LEAD_WEBHOOK_RETRY=1` turns on one retry | A receiver can record a lead and still answer 5xx; only a receiver that deduplicates on `ref` or `Idempotency-Key` makes a retry safe. The Sheet script does; a generic automation webhook may not |
| Duplicate emails | Unchanged: one idempotency key per message, derived from the submission id and its content | Resend documents that a repeated key returns the first result and that a changed payload with the same key is refused |
| Webhook signature | `X-Peregrine-Signature: t=<unix seconds>,v1=<HMAC-SHA256 of "<t>.<body>">`; secrets under 16 characters are ignored and reported as unsigned | The timestamp is signed, so a captured request cannot be replayed after the verifier's age limit (5 minutes in the reference verifier) |
| Owner alert | Off unless `LEAD_ALERT_WEBHOOK_URL` is set; `GET /api/lead` shows `ownerAlert: false` otherwise | Nothing is sent anywhere new by default |
| Advertising click ids (`gclid`, `msclkid`, `fbclid`) | Read **only after** an explicit analytics consent; never stored or sent without it; removed if consent is declined or withdrawn | They identify one person's ad click and the published privacy policy does not mention them. Today there is no consent bar (no GA4 ID), so none are collected |
| Other attribution (landing page, referrer without query string, UTM parameters, pages viewed, form location) | Session storage only without consent; sent only when the visitor submits a form | The published policy already lists "pages visited, time spent, and referral source" as collected automatically |
| Lead priority | Kept, reworded: reasons state the observed fact, and the line ends "Sorting hint from the form fields only; nothing about the sender is verified." | It must not read as a verified qualification |

## Environment variables

| Variable | Default | Effect |
|---|---|---|
| `RESEND_API_KEY` | not set | Enables the notification and acknowledgement emails. Unchanged |
| `LEAD_FROM_EMAIL` | Resend's test sender | Sender of both emails. Unchanged |
| `LEAD_WEBHOOK_URL` | not set | Every lead is POSTed there as JSON. Unchanged, plus one retry |
| `LEAD_WEBHOOK_SECRET` | not set | **New.** When set, webhook and alert requests carry `X-Peregrine-Signature`. Any long random string; the receiver needs the same value |
| `LEAD_WEBHOOK_RETRY` | not set (no retry) | **New.** `1` allows one retry after a quick transient failure. Only for receivers that deduplicate |
| `LEAD_ALERT_WEBHOOK_URL` | not set | **New.** Where the owner alert is POSTed when the notification email fails on an accepted lead |
| `NEXT_PUBLIC_GA_ID` | not set | GA4 and the consent bar. Unchanged |
| `RESEND_BASE_URL` | Resend's API | Read by the Resend SDK; used by the tests only |
| `VERCEL_ENV` | set by Vercel | `production` hides the diagnostic in a 502 response. Unchanged |

No variable's value is ever returned by `GET /api/lead` or written to the log.

## What each destination holds, and for how long

"As far as this code controls it" is the honest limit: the code sets no retention period anywhere. Retention is each service's setting or the owner's manual action.

| Destination | Holds | Retention controlled by this code | Who controls it in practice |
|---|---|---|---|
| Visitor's browser | first and last touch, page-view count, CTA location, consent choice | sessionStorage values end with the tab. The localStorage first touch exists only while analytics are accepted, for at most 90 days, and is deleted when that choice changes | the visitor (the consent bar; clear site data) |
| Notification email in `info@peregrine-it.com` | the whole lead: name, email, company, message, form fields, page URL, attribution, priority, reference | none | the mailbox owner (Google Workspace retention and manual deletion) |
| Acknowledgement email in the visitor's inbox | their name as typed, the reference, the reply-time sentence | none | the visitor |
| Resend | both emails as sent (recipient, subject, body) and their delivery events | none | Resend's retention for the account's plan; the owner can delete from the Resend dashboard. **TODO(owner): confirm the plan's retention period before quoting one in the policy** |
| Webhook destination (Google Sheet when the provided script is used) | one row per lead: every field of the webhook body | none | the sheet's owner; rows stay until deleted |
| Alert destination (only if set) | reference, time, form name, priority, where the lead is held, the provider's error name. No personal data | none | whoever owns that URL |
| Vercel runtime log | one line per lead: reference, form name, environment, priority, per-step status, Resend message ids, error names. No name, address, message, attribution or storage path | none | Vercel's log retention for the plan |
| Vercel Analytics / GA4 | event name with `form`, `page`, `service`, `location`, `status`. No form values, no reference | none | those services' retention settings |
| The server itself | nothing durable. An in-memory per-instance rate-limit table of IP address and timestamps; timestamps older than 10 minutes are dropped the next time that address posts (or when the table passes 5,000 addresses), and all of it is lost when the instance stops | as described | automatic |
| Calendly | whatever the visitor enters when booking, plus the four UTM parameters naming our page and CTA | none | Calendly account settings |

Deleting one person's data on request therefore means, by hand: the notification email (and any reply thread), the Resend log entries, and the sheet row if the store is on. The reference in the email subject finds the row and the object (`leads/<yyyy-mm>/<ref>-…`).

## Draft privacy-policy wording (for the owner to review; not published)

This is a proposal. It has not been reviewed by a lawyer, and the published page (`src/app/privacy-policy/page.tsx`) is unchanged. Two things in it need the owner's confirmation and are marked.

> **Enquiry forms.** When you send us a project request through a form on this site, we receive what you typed (your name, email address, company if you gave one, the project type and timeline you chose, and your message) together with the address of the page you sent it from.
>
> **How you found us.** With your request we also receive: the page on which you first arrived and the address of the site that referred you (without any search terms or other parameters in that address), for your first visit and for the visit in which you wrote to us; any campaign tags (`utm` parameters) and advertising click identifiers (`gclid`, `msclkid`, `fbclid`) that were in the address of the page you arrived on; which button or section of the page you used to open the form; and how many pages you viewed in that visit. Until you submit a form this information stays in your browser and is not sent to us. We do not use cookies for it. It is held in your browser's session storage and disappears when you close the tab. Only if you have accepted analytics cookies do we also keep the record of your first visit in your browser's local storage, for up to 90 days, so that a later visit can be connected to it; if you decline or later withdraw that acceptance, the record is deleted. If you never submit a form, we never receive any of it.
>
> **What we do with it.** We use your request to reply to you, and the information about how you found us to understand which pages and channels lead to enquiries. We sort incoming requests by urgency using only what you wrote in the form (for example the timeline you selected). This sorting decides the order in which we read requests and nothing else; every request is read by a person.
>
> **Where it goes.** Your request is delivered to our mailbox by Resend (our email delivery provider), which also sends you a confirmation email, and it may be recorded in a spreadsheet in our Google Workspace account and in file storage provided by Vercel, our hosting provider. These providers process the information on our behalf. [TODO(owner): list only the destinations actually switched on, and confirm the provider names as they should appear.]
>
> **How long we keep it.** We keep enquiries for as long as needed to respond and, where a project follows, for the life of that relationship. [TODO(owner): state the period you will actually apply, for example "up to 24 months after our last contact", and put a deletion routine in place for the mailbox, the spreadsheet and the file storage; nothing deletes them automatically today.] You can ask us to delete your enquiry at any time by writing to info@peregrine-it.com.
>
> **Booking a call.** Links to our Calendly page include the address of the page you were on and the name of the link you used. They identify our page, not you.

Points for the owner while reviewing:
- Storage before consent: the code now writes nothing about the arrival to localStorage unless the visitor accepted analytics, and sessionStorage is cleared by the browser when the tab closes. Whether session storage of a campaign tag needs consent in the EU or UK is a legal question this document does not answer; the site's market is the US and Canada.
- "Accepted analytics cookies" in the draft refers to the existing consent bar, which only appears when GA4 is configured (`NEXT_PUBLIC_GA_ID`). If GA4 is never enabled, drop that sentence: the first-visit record then never leaves session storage.
- The published policy lists "Phone number (if provided)"; no form on the site asks for one.

## Changes after review (2026-10-10)

| # | Finding | Change |
|---|---|---|
| 1 | Hung webhook plus hung store answered after 8 s | the store was removed before release; the webhook alone is limited to 5 s |
| 2 | Resend calls had no timeout | 8 s for the notification, 5 s for the acknowledgement; `failed` with reason `timeout` |
| 3 | A 200 HTML page from the webhook counted as accepted | `text/html` 2xx and JSON `ok:false` are refused; the Sheet script always answers JSON |
| 4 | Neutral leads were low priority; a throwaway address could be high | low needs -1 or less; disposable-mailbox list at -3 |
| 5 | A name with line breaks forged lines in both emails | every single-line field is forced onto one line; the message is delimited and prefixed |
| 6 | Edited retry with the same `submissionId` was dropped and overwrote the stored object | reference derived from id and content; the reference changes when the content changes |
| 7 | Non-string anti-spam value not flagged; retry undocumented | all three addressed (anti-spam field above, env table, "Webhook") |
| 8 | First touch persisted in localStorage before consent, with click ids and full referrer | sessionStorage only without consent; localStorage for 90 days with it; referrer cut to origin + path |

## Tests

| Command | Covers | Result on this branch |
|---|---|---|
| `python3 scripts/test_lead_api.py` (needs `npm run build`) | the API against local mocks of Resend, the webhook, and the alert endpoint: every pre-existing check, plus attribution cleaning, priority, retry and budget, signature (verified by the Node reference verifier), store switch and failure modes, owner alert | 229 passed |
| `node --experimental-strip-types scripts/test_lead_priority.mjs` | every scoring rule and threshold | 54 passed |
| `node --experimental-strip-types scripts/test_lead_client.mjs` | touch parsing, first/last touch rules, the three consent states for first-touch storage, referrer stripping, server-side cleaning, Calendly URL rewriting, the form start/abandon state machine, the Blob URL rule in production, and the Sheet script run with stand-ins for the Apps Script services | 87 passed |
| `node scripts/test_lead_browser.mjs` (needs a build and an installed Chrome) | headless Chrome over the DevTools protocol: storage after a real arrival with UTM, click id and referrer; no cookie; page-view count across a client-side navigation; Calendly hrefs after a click on four pages and after a context-menu event; the server-rendered ConsultationCta link; `lead_form_start` once; the POST body of an inline and a popup form; `lead_form_abandon` on a real unload; a retry after a 502 reusing its submission id; localStorage empty without consent, filled after accepting, emptied after declining | 39 passed |

Not verified anywhere: a real Resend send, the Apps Script receiver, Calendly actually recording the UTM parameters on a booking, GA4 or Vercel Analytics receiving an event sent during page unload, and any browser other than Chrome.
