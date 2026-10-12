# Sources: webhook-event-driven-integrations

All pages fetched and read on 2026-10-12. Each row is the sentence or figure the article relies on.

| URL | Relied on | Date |
|---|---|---|
| https://docs.stripe.com/webhooks | "Webhook endpoints might occasionally receive the same event more than once. You can guard against duplicated event receipts by logging the event IDs you've processed, and then not processing already-logged events." | 2026-10-12 |
| same | "In some cases, two separate Event objects are generated and sent. To identify these duplicates, use the ID of the object in data.object along with the event.type." | 2026-10-12 |
| same | "Stripe doesn't guarantee the delivery of events in the order that they're generated." / "Make sure that your event destination isn't dependent on receiving events in a specific order. Snapshot events record created in seconds, so distinct events can share a timestamp. Don't use created to determine event order ... You can also use the API to retrieve any missing objects." | 2026-10-12 |
| same | "Stripe attempts to deliver events to your destination for up to three days with an exponential backoff in live mode." | 2026-10-12 |
| same | "Without verification, an attacker could send fake webhook events to your endpoint to trigger actions like fulfilling orders, granting account access or modifying records." | 2026-10-12 |
| same | "Stripe signs every webhook event by including a signature in the Stripe-Signature header." / "We recommend using our official libraries to verify signatures." | 2026-10-12 |
| same | "Stripe requires the raw body of the request to perform signature verification. ... Any manipulation to the raw body of the request causes the verification to fail." | 2026-10-12 |
| same | "To mitigate such attacks, Stripe includes a timestamp in the Stripe-Signature header. Because this timestamp is part of the signed payload, it's also verified by the signature" / "Our libraries have a default tolerance of 5 minutes between the timestamp and the current time." / "Using a tolerance value of 0 disables the recency check entirely." | 2026-10-12 |
| same | "Your endpoint must quickly return a successful status code (2xx) before any complex logic that could cause a timeout." / "Configure your handler to process incoming events with an asynchronous queue." | 2026-10-12 |
| same | "You can choose to immediately expire the current secret or delay its expiry for up to 24 hours ... During this time, multiple secrets are active for the endpoint. Stripe generates one signature per secret until expiry." | 2026-10-12 |
| same | "The API version in your account settings when the event occurs dictates the API version, and therefore the structure of an Event sent to your destination." | 2026-10-12 |
| https://docs.stripe.com/api/idempotent_requests | "if a connection error occurs, you can safely repeat the request without risk of creating a second object or performing the update twice." | 2026-10-12 |
| https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries | "GitHub will use your secret token to create a hash signature that's sent to you with each payload. The hash signature will appear in each delivery as the value of the X-Hub-Signature-256 header." / "GitHub uses an HMAC hex digest to compute the hash." | 2026-10-12 |
| same | "Never use a plain == operator. Instead consider using a method like secure_compare or crypto.timingSafeEqual, which performs a 'constant time' string comparison" | 2026-10-12 |
| same | "GitHub recommends that you use the X-Hub-Signature-256 header, which uses the HMAC-SHA256 algorithm. The X-Hub-Signature header uses the HMAC-SHA1 algorithm and is only included for legacy purposes." | 2026-10-12 |
| https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks | "Your server should respond with a 2XX response within 10 seconds of receiving a webhook delivery. If your server takes longer than that to respond, then GitHub terminates the connection and considers the delivery a failure." / "you may want to set up a queue to process webhook payloads asynchronously" | 2026-10-12 |
| same | "To protect against replay attacks, you can use the X-GitHub-Delivery header to ensure that each delivery is unique per event." | 2026-10-12 |
| same | "GitHub continues to add new event types and new actions to existing event types. Your application should check the event type and action of a webhook payload before processing the payload." / "You should only subscribe to the webhook events that you need." / "do not include sensitive information in your payload URL" | 2026-10-12 |
| https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries | "GitHub does not automatically redeliver failed deliveries." / "You can also write a script that checks for failed deliveries and attempts to redeliver any that failed. Your script should run on a schedule" | 2026-10-12 |
| https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md (read from the raw file on the main branch) | "The unique identifier ... remains the same no matter how many times a webhook that has failed is retried. The ID is often used as an idempotency key" | 2026-10-12 |
| same | Thin vs full payloads: "Full payloads consist of the full information about the event ... A thin payload will only include identifiers to the affected entities" | 2026-10-12 |
| same | Headers webhook-id, webhook-timestamp, webhook-signature; "The signature header is a space delimited list of signatures ... to support zero downtime secret rotation." | 2026-10-12 |
| same | "It's recommended to retry delivery following a retry schedule spanning multiple days, with an exponential backoff. It's recommended to also add some level of random jitter" / status handling for 410 Gone and 429 Too Many Requests / "A recommended request timeout value for webhooks is somewhere between 15 and 30s." | 2026-10-12 |
| same | SSRF: "proxy all webhook requests through a special proxy ... that filters internal IP addresses, and ... put the webhook workers (or proxy) in their own private subnet that can't access internal services." / "it's immensely important to give consumers a way to manually replay specific webhook[s]" | 2026-10-12 |
| https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ | "The problem also stands out: there are still clusters of calls." / "The solution isn't to remove backoff. It's to add jitter." / "The no-jitter exponential backoff approach is the clear loser." / the "Full Jitter" algorithm | 2026-10-12 |
| https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/ | "Retries can amplify the load on a dependent system." / "APIs with side effects aren't safe to retry unless they provide idempotency." | 2026-10-12 |
| https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html | "A failure in one of these operations might result in inconsistent data." / "When the flight table is updated, the outbox table is also updated in the same transaction." / "the entire transaction is rolled back" / "The events processing service might send out duplicate messages or events, so we recommend that you make the consuming service idempotent" | 2026-10-12 |
| https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html | "This case happens when a user can control a URL to an External resource and the application makes a request to this URL (e.g. in case of WebHooks). Allow lists cannot be used here because the list of IPs/domains is often unknown upfront" | 2026-10-12 |
| same | "the provided IP (V4 + V6) is not part of the official private networks ranges including also localhost and IPv4/v6 Link-Local addresses" / "A second, unchecked DNS lookup between validation and connection can bypass these checks" / "Disable the support for the following of the redirection in your web client" / "In cloud environments SSRF is often used to access and steal credentials and access tokens from metadata services" | 2026-10-12 |
| https://www.postgresql.org/docs/current/sql-select.html | "With SKIP LOCKED, any selected rows that cannot be immediately locked are skipped. ... can be used to avoid lock contention with multiple consumers accessing a queue-like table." | 2026-10-12 |
| https://www.postgresql.org/docs/current/sql-insert.html | "ON CONFLICT DO NOTHING simply avoids inserting a row as its alternative action." | 2026-10-12 |

## Independent QA, 2026-10-12

All 12 source URLs were fetched again by a second reviewer and every quoted sentence above was found. Three logged Stripe quotes differ from the page by a word and were not used verbatim in the article: the page says "exponential back off" and "delay its expiration for up to 24 hours ... until expiration". The Standard Webhooks sentence reads "manually replay specific webhooks or failures within a range". Also confirmed there: "410 Gone ... Sender should disable the webhook endpoint, and stop sending it messages" and the signed content "msg_id.timestamp.payload".

Added in QA:

| URL | Relied on | Date |
|---|---|---|
| https://nodejs.org/api/crypto.html | crypto.timingSafeEqual: "a and b must both be Buffers, TypedArrays, or DataViews, and they must have the same byte length. An error is thrown if a and b have different byte lengths." | 2026-10-12 |

Code bugs fixed in QA:

- The worker pseudocode read the stored version and then wrote, so two events for the same object could both pass the check and apply out of order. The version test is now part of the conditional upsert. It also called the provider's API while holding a row lock inside a transaction; the fetch now happens first.
- The receiver enqueued only when the insert created a row, so an attempt that died between insert and enqueue depended on the sweeper alone. It now enqueues on every delivery, deduplicated by job id.
- The job id was `provider + ':' + event_id`. BullMQ rejects ':' in a custom job id ("Custom Id cannot contain :", `src/classes/job.ts` on the master branch, read 2026-10-12); the separator is now '_'.
- The outbox `seq` column was described as the order the relay reads in. A sequence value is assigned before commit, so a cursor on it can skip a late-committing row; the text now says to select by `relayed_at IS NULL`.

Removed as unsupported: "the commonest way to lose an outgoing event", "cause most verification bugs", "the one most often missing", "fail in the second month". Cut for length: the closing checklist and two FAQ entries that restated sections, one of three AWS jitter quotes, a generic schema-publishing bullet; the case-study paragraph was shortened without changing what it attributes to each page.

## Peregrine statements and their source
- Supply chain: "Polling runs on a schedule; webhooks push when available. Deduplication ensures we don't store the same scan twice. Failed API calls go to a retry queue with exponential backoff." `src/app/case-studies/supply-chain-visibility-platform/page.tsx`
- HR and payroll: "We built idempotent sync logic and reconciliation jobs that compare our records with provider data. Mismatches trigger alerts" `src/app/case-studies/hr-payroll-saas-platform/page.tsx`
- Legal: "we designed our schema so the app never assumes an envelope is complete until we receive the webhook. Duplicate webhook delivery is handled idempotently." `src/app/case-studies/legal-document-automation-platform/page.tsx`

## Left out as unverifiable
- The exact format of the Stripe-Signature header (t=, v1=) and its manual verification steps: not present in the text fetched, so not described.
- Retry schedules of providers other than Stripe and GitHub; any delivery success rates or latency figures.
- owasp.org Top 10 A10 SSRF page returned no content to the fetch; the OWASP cheat sheet is cited instead.
