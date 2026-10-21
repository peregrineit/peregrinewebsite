import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import WebhookPathsDiagram, { RECEIVE, SEND } from '../../components/diagrams/WebhookPathsDiagram';

const SLUG = 'webhook-event-driven-integrations';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/webhook-event-driven-integrations.md. Stripe and GitHub are cited as
// published examples of how providers behave, not as recommendations of either product.
const STRIPE_WH = 'https://docs.stripe.com/webhooks';
const STRIPE_IDEM = 'https://docs.stripe.com/api/idempotent_requests';
const GH_VALIDATE = 'https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries';
const GH_BEST = 'https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks';
const GH_FAILED = 'https://docs.github.com/en/webhooks/using-webhooks/handling-failed-webhook-deliveries';
const STD_WH = 'https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md';
const AWS_JITTER = 'https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/';
// aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/ redirects (301) to this URL.
const AWS_RETRIES = 'https://builder.aws.com/content/3EumjoZascWd1oZiEgL8ORlv3qE/timeouts-retries-and-backoff-with-jitter';
const AWS_OUTBOX = 'https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html';
const OWASP_SSRF = 'https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html';
const NODE_CRYPTO = 'https://nodejs.org/api/crypto.html';
const PG_SELECT = 'https://www.postgresql.org/docs/current/sql-select.html';
const PG_INSERT = 'https://www.postgresql.org/docs/current/sql-insert.html';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Three guarantees a webhook does not give you</h2>
      <p>
        A webhook is one HTTP request from a system you do not control, sent once things have already happened
        there. Integrations built on the assumption that each event arrives exactly once, in order, and always,
        work in a demo and fail in production, because the published behavior of real providers is otherwise:
      </p>
      <ul>
        <li>
          <strong>Not exactly once.</strong> Stripe says endpoints{' '}
          <Src href={STRIPE_WH}>might occasionally receive the same event more than once</Src>.
        </li>
        <li>
          <strong>Not in order.</strong> Stripe{' '}
          <Src href={STRIPE_WH}>doesn&apos;t guarantee the delivery of events in the order that they&apos;re generated</Src>.
        </li>
        <li>
          <strong>Not always.</strong> Retry policies end. Stripe retries{' '}
          <Src href={STRIPE_WH}>for up to three days with an exponential backoff</Src> in live mode; GitHub{' '}
          <Src href={GH_FAILED}>does not automatically redeliver failed webhook deliveries</Src> at all.
        </li>
      </ul>
      <p>
        The same three facts apply in reverse when your product sends webhooks to customers: you will deliver
        duplicates, out of order, and sometimes not at all, unless the sending side is designed against it. This
        article covers both directions.
      </p>

      <h2>Both paths at a glance</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><WebhookPathsDiagram /></div>
        <figcaption>
          The receive path (left) and the send path (right). Both end in a state where a failed event is kept, not
          lost, and both are backed by reconciliation.
        </figcaption>
      </figure>
      <p><strong>Receiving:</strong></p>
      <ol>
        {RECEIVE.map((s) => <li key={s.name}><strong>{s.name}.</strong> {s.text}</li>)}
      </ol>
      <p><strong>Sending:</strong></p>
      <ol>
        {SEND.map((s) => <li key={s.name}><strong>{s.name}.</strong> {s.text}</li>)}
      </ol>
      <p>Under both: a scheduled reconciliation job that polls and compares current state on the two sides.</p>

      <h2>Receiving, step 1: verify the signature, the timestamp and the body you were actually sent</h2>
      <p>
        A webhook endpoint is a public URL that changes your data. Without verification, in Stripe&apos;s words,{' '}
        <Src href={STRIPE_WH}>an attacker could send fake webhook events to your endpoint to trigger actions like fulfilling orders, granting account access or modifying records</Src>.
        Providers solve this the same way, with a shared secret and an HMAC over the payload:
      </p>
      <ul>
        <li>
          GitHub <Src href={GH_VALIDATE}>uses your secret token to create a hash signature that is sent with each payload</Src>,
          in the <code>X-Hub-Signature-256</code> header, computed as{' '}
          <Src href={GH_VALIDATE}>an HMAC hex digest</Src>; it recommends that header because it{' '}
          <Src href={GH_VALIDATE}>uses the HMAC-SHA256 algorithm</Src>, the older SHA-1 header being kept only
          for legacy purposes.
        </li>
        <li>
          Stripe <Src href={STRIPE_WH}>signs every webhook event by including a signature in the Stripe-Signature header</Src>,
          and <Src href={STRIPE_WH}>includes a timestamp in the header that is part of the signed payload</Src>,
          so the timestamp cannot be altered without breaking the signature.
        </li>
      </ul>
      <p>Three implementation details decide whether the check holds:</p>
      <ul>
        <li>
          <strong>Hash the raw bytes.</strong> Stripe{' '}
          <Src href={STRIPE_WH}>requires the raw body of the request to perform signature verification</Src>, and{' '}
          <Src href={STRIPE_WH}>any manipulation to the raw body causes the verification to fail</Src>. A
          framework that parses JSON and re-serializes it before your handler runs has already changed the
          bytes. Capture the body before any parsing middleware.
        </li>
        <li>
          <strong>Compare in constant time.</strong> GitHub&apos;s instruction is to{' '}
          <Src href={GH_VALIDATE}>never use a plain == operator</Src> and to use a constant-time comparison
          such as <code>crypto.timingSafeEqual</code>. In Node.js that function{' '}
          <Src href={NODE_CRYPTO}>throws an error if the two buffers have different byte lengths</Src>, so
          compare the two digests as bytes of equal length and treat a malformed header as a failed check, not
          an unhandled exception.
        </li>
        <li>
          <strong>Reject stale requests.</strong> A valid signature proves who sent a message, not when. A
          captured request can be sent again. Stripe&apos;s libraries apply{' '}
          <Src href={STRIPE_WH}>a default tolerance of 5 minutes between the timestamp and the current time</Src>,
          and Stripe warns that <Src href={STRIPE_WH}>a tolerance value of 0 disables the recency check entirely</Src>.
          Where a provider signs no timestamp, the delivery id does the job: GitHub suggests using{' '}
          <Src href={GH_BEST}>the X-GitHub-Delivery header to ensure that each delivery is unique per event</Src>.
          A timestamp window needs an accurate clock, so time synchronization on the receiving hosts is part of
          the control.
        </li>
      </ul>
      <p>
        Use the provider&apos;s official library for verification where one exists; Stripe{' '}
        <Src href={STRIPE_WH}>recommends its official libraries</Src> for this. Write it by hand only for
        providers that offer none, and test it with the provider&apos;s published sample values.
      </p>

      <h2>Receiving, steps 2 and 3: store, acknowledge, then work</h2>
      <p>
        The sender is waiting, with a timeout, and treats a slow reply as a failure. GitHub expects{' '}
        <Src href={GH_BEST}>a 2XX response within 10 seconds of receiving a webhook delivery</Src>, after which
        it <Src href={GH_BEST}>terminates the connection and considers the delivery a failure</Src>. Stripe says
        the endpoint{' '}
        <Src href={STRIPE_WH}>must quickly return a successful status code (2xx) before any complex logic that could cause a timeout</Src>.
        Both recommend the same structure: Stripe to{' '}
        <Src href={STRIPE_WH}>process incoming events with an asynchronous queue</Src>, GitHub to{' '}
        <Src href={GH_BEST}>set up a queue to process webhook payloads asynchronously</Src>.
      </p>
      <p>
        The order inside the handler matters. Acknowledge only after the event is stored somewhere durable: if
        you reply 200 and then crash before enqueueing, the sender believes it is done and the event is gone. If
        the store fails, reply with a 5xx so the sender retries. The reverse mistake, doing the business work
        before replying, turns every slow database query into a failed delivery and then a duplicate.
      </p>
      <p><strong>Illustrative receiver</strong> (pseudocode; names are examples):</p>
      <pre className="cp-code"><code>{`// Illustrative pseudocode for a webhook receiver.
handle POST /webhooks/:provider (request):
    raw = request.rawBody                      // bytes, before any JSON parsing
    cfg = config_for(provider)

    // 1. Verify: any active secret may match (supports rotation)
    if not any(constant_time_equal(hmac_sha256(secret, signed_content(raw, request)),
                                   signature_from(request))
               for secret in cfg.active_secrets):
        return 401
    if cfg.signs_timestamp and abs(now() - timestamp_from(request)) > cfg.tolerance:
        return 401                             // replayed or badly delayed

    // 2. Enqueue: the provider's event id is the idempotency key
    event_id = event_id_from(request)          // an id header or a field in the body
    insert into inbound_event (provider, event_id, received_at, raw, status)
        values (provider, event_id, now(), raw, 'pending')
        on conflict (provider, event_id) do nothing
    // Enqueue even when the row already existed: the earlier attempt may have died
    // between its insert and its enqueue. The job id makes a second enqueue a no-op
    // while the first is still queued; the worker makes it harmless afterwards.
    enqueue('process-inbound-event', job_id = provider + '_' + event_id)

    // 3. Ack: duplicates get the same 2xx, so the sender stops retrying
    return 200

worker process-inbound-event (provider, event_id):
    event = select ... from inbound_event where provider, event_id
    if event.status == 'processed': return                 // 5. already applied
    current = fetch_current_state_if_needed(event)         // network call: before the transaction,
                                                           // and do not trust event order
    begin transaction
        locked = select status from inbound_event where ... for update
        if locked.status == 'processed': commit; return    // another worker finished first
        // The version test is part of the write. A separate "read version, then write"
        // lets two events for the same object both pass the check and apply out of order.
        upsert target keyed by the provider's object id
            set fields = current.fields, version = current.version
            where target.version < current.version          // no row yet counts as older
        mark_processed(event)                              // same transaction as the change
    commit`}</code></pre>
      <p>
        If the provider gives no version or update time to compare, two workers that each fetch the same object
        can still write their results in the wrong order. In that case serialize per object, for example with
        a lock keyed by the object id taken before the fetch, or a queue that runs one job per object at a time.
      </p>

      <h2>Receiving, step 5: duplicates and idempotency keys</h2>
      <p>
        Delivery is at least once, so processing has to be safe to repeat. Stripe&apos;s advice is to{' '}
        <Src href={STRIPE_WH}>guard against duplicated event receipts by logging the event IDs you&apos;ve processed, and then not processing already-logged events</Src>.
        The vendor-neutral Standard Webhooks specification describes the same idea: the message id{' '}
        <Src href={STD_WH}>remains the same no matter how many times a webhook that has failed is retried</Src>{' '}
        and <Src href={STD_WH}>is often used as an idempotency key</Src>.
      </p>
      <p>Turning that into something that holds under concurrency takes three decisions:</p>
      <ul>
        <li>
          <strong>The key is enforced by a unique constraint,</strong> not by a read followed by a write. Two
          deliveries of the same event can arrive on two servers in the same millisecond. In PostgreSQL the
          conflict clause makes this a single statement:{' '}
          <Src href={PG_INSERT}>ON CONFLICT DO NOTHING simply avoids inserting a row</Src> when the key exists.
        </li>
        <li>
          <strong>The &ldquo;processed&rdquo; mark commits with the effect.</strong> If the change is committed
          and the mark is not, the retry applies it twice; if the mark is committed first and the change fails,
          the event is silently skipped. One transaction for both removes the gap.
        </li>
        <li>
          <strong>Effects outside your database need their own key.</strong> Sending an email or calling another
          API cannot join your transaction. Pass an idempotency key derived from the event id to the downstream
          call where it is supported; Stripe&apos;s API, for example, accepts a key so that a client{' '}
          <Src href={STRIPE_IDEM}>can safely repeat the request without risk of creating a second object or performing the update twice</Src>.
          The AWS Builders&apos; Library states the general rule:{' '}
          <Src href={AWS_RETRIES}>APIs with side effects aren&apos;t safe to retry unless they provide idempotency</Src>.
        </li>
      </ul>
      <p>
        One further case: the same real-world change can arrive as two different events with different ids.
        Stripe notes that <Src href={STRIPE_WH}>in some cases, two separate Event objects are generated and sent</Src>,
        and suggests identifying them by the object id together with the event type. So the handler&apos;s
        effect should be idempotent in its own right (an upsert to a target state), with the event-id check as
        the first filter and not the only one.
      </p>

      <h2>Ordering: assume none</h2>
      <p>
        A &ldquo;subscription updated&rdquo; event can arrive before &ldquo;subscription created&rdquo;; a
        retry of an old event can arrive after a newer one. Stripe&apos;s guidance is to make sure the
        destination{' '}
        <Src href={STRIPE_WH}>isn&apos;t dependent on receiving events in a specific order</Src>, and not to use
        the event&apos;s created time to decide order, since{' '}
        <Src href={STRIPE_WH}>distinct events can share a timestamp</Src>. Three techniques cope with this, in
        the order we would reach for them:
      </p>
      <ol>
        <li>
          <strong>Treat the event as a signal and fetch current state.</strong> On any event about object X,
          read X from the provider&apos;s API and store what you get. Order stops mattering because every
          handler converges on the latest state. Stripe points to this:{' '}
          <Src href={STRIPE_WH}>you can also use the API to retrieve any missing objects</Src>. The cost is an
          API call per event and a dependency on the provider&apos;s rate limits.
        </li>
        <li>
          <strong>Compare versions.</strong> If the payload carries a version number or an update sequence for
          the object, store it and ignore any event whose version is not greater than the stored one. This needs
          no extra call, but only works when the sender provides a monotonic value.
        </li>
        <li>
          <strong>Tolerate missing parents.</strong> When an update arrives for an object you have never seen,
          create it from the fetched state, or requeue the event with a delay, instead of failing permanently.
        </li>
      </ol>
      <p>
        This is also the argument for small payloads when you design your own events. Standard Webhooks
        distinguishes{' '}
        <Src href={STD_WH}>full payloads, with the full information about the event, from thin payloads that only include identifiers to the affected entities</Src>.
        Thin events push receivers toward fetching current state, which makes ordering and schema changes less
        dangerous, at the price of a call back to your API.
      </p>

      <h2>Sending, steps 1 and 2: the transactional outbox</h2>
      <p>
        A common way to lose an outgoing event is to do two writes that cannot be made atomic: commit the
        database change, then publish to a queue or call the subscriber. A crash between the two loses the
        event; publishing first and failing the commit announces something that never happened. AWS&apos;s
        prescriptive guidance calls this the dual write problem, where{' '}
        <Src href={AWS_OUTBOX}>a failure in one of these operations might result in inconsistent data</Src>, and
        describes the fix: an outbox table that{' '}
        <Src href={AWS_OUTBOX}>is updated in the same transaction</Src> as the business table, so that if
        either write fails <Src href={AWS_OUTBOX}>the entire transaction is rolled back</Src>.
      </p>
      <p><strong>Illustrative outbox and delivery tables:</strong></p>
      <pre className="cp-code"><code>{`-- Illustrative. Written in the same transaction as the business change.
CREATE TABLE outbox_event (
  id             uuid PRIMARY KEY,               -- the event id receivers deduplicate on
  seq            bigserial NOT NULL,             -- rough order only; see the note on the relay
  tenant_id      uuid NOT NULL,
  type           text NOT NULL,                  -- e.g. 'lead.assigned'
  schema_version int  NOT NULL,
  aggregate_id   text NOT NULL,                  -- the object the event is about
  aggregate_ver  bigint NOT NULL,                -- lets receivers ignore stale events
  payload        jsonb NOT NULL,
  occurred_at    timestamptz NOT NULL DEFAULT now(),
  relayed_at     timestamptz                     -- null until fanned out to deliveries
);

-- One row per event per subscribed endpoint: retries are per endpoint, not per event.
CREATE TABLE webhook_delivery (
  id              uuid PRIMARY KEY,
  event_id        uuid NOT NULL REFERENCES outbox_event(id),
  endpoint_id     uuid NOT NULL,
  status          text NOT NULL DEFAULT 'pending',  -- pending | succeeded | dead
  attempts        int  NOT NULL DEFAULT 0,
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  last_status     int,                              -- HTTP status of the last attempt
  last_error      text,
  UNIQUE (event_id, endpoint_id)
);`}</code></pre>
      <p>
        A relay process reads committed outbox rows and fans each one out to a delivery row per subscribed
        endpoint. Two notes on the relay. Several relay workers can share the table without blocking each other
        by locking rows with <code>SKIP LOCKED</code>, which PostgreSQL documents as usable{' '}
        <Src href={PG_SELECT}>to avoid lock contention with multiple consumers accessing a queue-like table</Src>.
        And the relay itself can crash after sending and before marking the row, so the outbox gives
        at-least-once publication, not exactly-once. AWS says so directly: the relay{' '}
        <Src href={AWS_OUTBOX}>might send out duplicate messages or events</Src>, so the consuming service should
        be idempotent. That is why the event id is generated when the row is written and never changes. One
        trap: select rows by <code>relayed_at IS NULL</code>, not by &ldquo;<code>seq</code> greater than the
        last one I saw&rdquo;. A sequence value is assigned before its transaction commits, so a slow
        transaction can commit a lower number after the relay has moved past it, and a cursor would skip that
        event for good. For the same reason, and because several workers share the table, the relay does not
        promise order; <code>aggregate_ver</code> is what lets a receiver discard a stale event.
      </p>

      <h2>Sending, steps 3 to 5: deliver, retry with backoff and jitter, dead-letter</h2>
      <p>
        <strong>Deliver.</strong> Each attempt is a POST with a stable event id, a timestamp for this attempt,
        and a signature over both and the body. The Standard Webhooks header set is a reasonable template:{' '}
        <Src href={STD_WH}>webhook-id, webhook-timestamp and webhook-signature</Src>. Set a request timeout;
        that specification suggests <Src href={STD_WH}>somewhere between 15 and 30 seconds</Src>. Count only a
        2xx as success, and do not follow redirects (more on that under security).
      </p>
      <p>
        <strong>Retry.</strong> A subscriber that is down will usually come back, so failures are retried, with
        waits that grow. The reason for growing waits is load: as the AWS Builders&apos; Library puts it,{' '}
        <Src href={AWS_RETRIES}>retries can amplify the load on a dependent system</Src>. Plain exponential
        backoff is not enough, because deliveries that failed together retry together. The AWS Architecture
        Blog&apos;s analysis found that with un-jittered backoff{' '}
        <Src href={AWS_JITTER}>there are still clusters of calls</Src>, and that{' '}
        <Src href={AWS_JITTER}>the solution isn&apos;t to remove backoff, it&apos;s to add jitter</Src>. The
        &ldquo;full jitter&rdquo; form it describes picks a random wait between zero and the capped exponential
        value:
      </p>
      <pre className="cp-code"><code>{`// Illustrative. "Full jitter" as described in the AWS Architecture Blog article.
wait = random_between(0, min(cap, base * 2 ^ attempt))`}</code></pre>
      <p>
        For webhooks the schedule spans days, not seconds. Standard Webhooks recommends{' '}
        <Src href={STD_WH}>a retry schedule spanning multiple days, with an exponential backoff</Src> and{' '}
        <Src href={STD_WH}>some level of random jitter</Src>. It also suggests reading the status code: throttle
        on <Src href={STD_WH}>429 Too Many Requests</Src>, and on <Src href={STD_WH}>410 Gone</Src> disable the
        endpoint and stop sending. Retries are per endpoint, so{' '}
        <Link href="/blog/multi-tenant-real-estate-saas">one customer&apos;s broken URL never delays another&apos;s deliveries</Link>,
        and each endpoint gets a concurrency limit so a recovering subscriber is not
        hit with its whole backlog at once. The queue mechanics (attempt counts, backoff settings, per-key
        limits) are covered in{' '}
        <Link href="/blog/background-jobs-redis-bullmq">reliable background jobs with Redis and BullMQ</Link>.
      </p>
      <p>
        <strong>Dead-letter and replay.</strong> When attempts run out, the delivery moves to a dead state with
        its last status and error, and stays there. Three things make that state useful: an alert when the dead
        count for an endpoint rises; a way to replay one delivery or a time range after the subscriber is fixed,
        which Standard Webhooks calls{' '}
        <Src href={STD_WH}>immensely important to give consumers</Src>; and automatic disabling of an endpoint
        that has failed consistently, with a notice to its owner through another channel. A replay re-sends the
        original event id, so a correct receiver deduplicates it. The receiving side needs the same structure
        in mirror image: an inbound event whose processing keeps failing (a &ldquo;poison&rdquo; event) is
        parked after a bounded number of attempts with the error attached, so it stops blocking the queue and
        can be reprocessed after a fix.
      </p>

      <h2>Reconciliation: polling as the safety net</h2>
      <p>
        Everything above reduces loss; nothing above proves there was none. A sender&apos;s retry window can
        expire during your outage, an endpoint can be misconfigured for a week, a bug can mark events processed
        that were not. The safety net is a scheduled job that asks the other side for records changed since a
        cursor and compares them with yours. GitHub describes this pattern for its own webhooks:{' '}
        <Src href={GH_FAILED}>a script that checks for failed deliveries and attempts to redeliver any that failed</Src>,
        run on a schedule.
      </p>
      <p>
        A reconciliation job should correct through the same idempotent apply function the webhook worker uses,
        count what it corrected, and alert when that count is above its normal level, because a non-zero
        correction rate is the earliest sign that the event path is leaking. Three of our published case studies
        describe this pairing: carrier adapters where{' '}
        <Link href="/case-studies/supply-chain-visibility-platform">polling runs on a schedule and webhooks push when available</Link>,
        with deduplication and a retry queue with exponential backoff;{' '}
        <Link href="/case-studies/hr-payroll-saas-platform">idempotent sync logic and reconciliation jobs</Link>{' '}
        that compare records with provider data and alert on mismatches; and{' '}
        <Link href="/case-studies/legal-document-automation-platform">e-signature webhooks handled idempotently</Link>,
        where the application does not treat an envelope as complete until the webhook arrives. For listing
        data, where polling is the primary mechanism, see the{' '}
        <Link href="/blog/mls-sync-engine">MLS sync engine</Link> article; for an ERP and a storefront, see{' '}
        <Link href="/blog/odoo-shopify-marketplace-integration">Odoo integration with Shopify and marketplaces</Link>.
      </p>

      <h2>Schema versioning and backward compatibility</h2>
      <p>
        An event schema is an API that you cannot see being called. Receivers break quietly. The rules we would
        hold a sending system to:
      </p>
      <ul>
        <li><strong>Additive changes only within a version.</strong> New optional fields and new event types are compatible; removing or renaming a field, changing a type or changing the meaning of a value is not.</li>
        <li><strong>A version on every event,</strong> and the version pinned per endpoint. Stripe ties the structure of an event to an API version: <Src href={STRIPE_WH}>the API version in your account settings when the event occurs dictates the structure of an Event sent to your destination</Src>. Pinning lets each subscriber upgrade on its own schedule.</li>
        <li><strong>A stated deprecation window</strong> during which old and new versions are both produced, with per-endpoint visibility of which version is in use.</li>
      </ul>
      <p>
        And as a receiver: ignore fields you do not know, and do not assume the list of event types is closed.
        GitHub warns that it{' '}
        <Src href={GH_BEST}>continues to add new event types and new actions to existing event types</Src> and
        that an application{' '}
        <Src href={GH_BEST}>should check the event type and action of a webhook payload before processing</Src>.
        An unknown type should be stored, acknowledged and skipped, not answered with an error that triggers
        retries. Subscribe narrowly as well: GitHub advises subscribing only{' '}
        <Src href={GH_BEST}>to the webhook events that you need</Src>.
      </p>

      <h2>Security when you send: secrets and SSRF</h2>
      <p>
        <strong>Secrets.</strong> Generate a separate signing secret per endpoint, show it once, and store it
        encrypted. Rotation must not cause an outage, which means two secrets valid at once for a period. Stripe
        lets an account{' '}
        <Src href={STRIPE_WH}>delay the old secret&apos;s expiry for up to 24 hours</Src>, during which{' '}
        <Src href={STRIPE_WH}>multiple secrets are active for the endpoint and one signature is generated per secret</Src>;
        Standard Webhooks makes the signature header{' '}
        <Src href={STD_WH}>a space delimited list of signatures to support zero downtime secret rotation</Src>.
        Receivers therefore try each active secret, as the pseudocode above does. Keep credentials out of URLs
        too: GitHub warns{' '}
        <Src href={GH_BEST}>do not include sensitive information in your payload URL</Src>.
      </p>
      <p>
        <strong>Server-side request forgery.</strong> Letting customers register a URL means your servers make
        requests to addresses an outsider chose. OWASP names this case specifically: a user controls{' '}
        <Src href={OWASP_SSRF}>a URL to an external resource and the application makes a request to this URL (e.g. in case of WebHooks)</Src>,
        and an allowlist is not available because the destinations are not known in advance. The danger is the
        destinations inside your network; OWASP notes that in cloud environments SSRF{' '}
        <Src href={OWASP_SSRF}>is often used to access and steal credentials and access tokens from metadata services</Src>.
        The controls it describes for this case, which we would apply together:
      </p>
      <ul>
        <li>Resolve the host and reject any address that is not public: the check must cover <Src href={OWASP_SSRF}>the official private network ranges, localhost and IPv4/v6 link-local addresses</Src>, for every A and AAAA record.</li>
        <li>Connect to the address you validated. <Src href={OWASP_SSRF}>A second, unchecked DNS lookup between validation and connection can bypass these checks</Src> (DNS rebinding).</li>
        <li><Src href={OWASP_SSRF}>Disable the support for redirection in the web client</Src>, so a public URL cannot bounce the request inward.</li>
        <li>Accept HTTPS only, on expected ports, and validate again at send time, not only when the endpoint was registered.</li>
        <li>Send from an isolated network. Standard Webhooks recommends <Src href={STD_WH}>a proxy that filters internal IP addresses, and webhook workers in their own private subnet that cannot access internal services</Src>.</li>
        <li>Do not return the subscriber&apos;s response body to the customer verbatim in delivery logs without limits; a truncated status and body are enough for debugging.</li>
      </ul>

      <h2>Observability: what to log and what to alert on</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Signal</th><th>Receiving</th><th>Sending</th></tr></thead>
          <tbody>
            <tr><td><strong>Log per event</strong></td><td>Provider, event id, type, received time, verification result, processing status, attempts, error</td><td>Event id, endpoint, attempt number, HTTP status, duration, next attempt time</td></tr>
            <tr><td><strong>Lag</strong></td><td>Age of the oldest unprocessed inbound event</td><td>Age of the oldest unrelayed outbox row; age of the oldest pending delivery per endpoint</td></tr>
            <tr><td><strong>Failure rate</strong></td><td>Signature failures (a spike means a rotated secret or an attack); processing failures by event type</td><td>Non-2xx and timeout rate per endpoint; endpoints disabled</td></tr>
            <tr><td><strong>Dead letters</strong></td><td>Count of parked inbound events, by error</td><td>Count of dead deliveries, by endpoint</td></tr>
            <tr><td><strong>Silence</strong></td><td>No events from a provider for longer than its normal gap</td><td>No events produced by a busy tenant</td></tr>
            <tr><td><strong>Reconciliation</strong></td><td colSpan={2}>Records corrected per run; an increase means the event path is losing data</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The &ldquo;silence&rdquo; row is the easiest to leave out. A webhook integration that stops receiving
        raises no error anywhere; only an alert on absence, or the reconciliation count, reveals it. For
        subscribers, expose the delivery log: a customer who can see their own failed deliveries and replay them
        does not need to open a support ticket to find out their certificate expired.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'How do you verify a webhook signature?', answer: ['Compute an HMAC of the raw request body with the shared secret and compare it with the signature header using a constant-time comparison. GitHub sends ', ['an HMAC hex digest', GH_VALIDATE], ' in the X-Hub-Signature-256 header; Stripe ', ['includes a timestamp in the Stripe-Signature header', STRIPE_WH], ' that is part of the signed payload, so old requests can be rejected. Use the provider’s official library where one exists.'] },
        { question: 'How do you handle duplicate webhook events?', answer: ['Record each event id under a unique constraint and skip ids you have already processed, committing that record in the same transaction as the change the event causes. Stripe’s guidance is to ', ['guard against duplicated event receipts by logging the event IDs you’ve processed', STRIPE_WH], '. Make the change itself an upsert so a repeat is harmless.'] },
        { question: 'Are webhooks delivered in order?', answer: ['Do not rely on it. Stripe, for example, ', ['doesn’t guarantee the delivery of events in the order that they’re generated', STRIPE_WH], '. Treat an event as a signal to fetch the object’s current state, or compare a version number carried in the payload and ignore anything older than what you hold.'] },
      ]} />

      <p className="cp-note">
        Provider behavior and guidance were read from the linked Stripe, GitHub, Standard Webhooks, AWS, OWASP
        and PostgreSQL pages on October 12, 2026. Stripe and GitHub are quoted as published examples of how
        providers sign, retry and order events; other providers differ, and each one&apos;s current
        documentation decides. Pseudocode, table definitions and event names marked illustrative are examples,
        not a description of a client system.
      </p>
      <p>
        Connecting your product to payment, e-signature, CRM or messaging providers, or adding webhooks to your
        own API? See our <Link href="/services/api-integration">API integration service</Link>. Every project
        starts with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
