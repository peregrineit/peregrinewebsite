import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'odoo-shopify-marketplace-integration';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-10; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-odoo-shopify-marketplace-integration.md. Odoo facts are from
// odoo.com documentation (19.0); Shopify facts from shopify.dev. Peregrine has no published
// Odoo case study and no confirmed named Odoo integration, so this guide claims none. No
// marketplace other than Shopify is named: no public developer documentation for another
// could be fetched and verified on that date.
const OD_API = 'https://www.odoo.com/documentation/19.0/developer/reference/external_api.html';
const OD_RPC = 'https://www.odoo.com/documentation/19.0/developer/reference/external_rpc_api.html';
const OD_SHOPIFY = 'https://www.odoo.com/documentation/19.0/applications/sales/sales/shopify_connector.html';
const OD_WEBHOOKS = 'https://www.odoo.com/documentation/19.0/applications/studio/automated_actions/webhooks.html';
const OD_UOM = 'https://www.odoo.com/documentation/19.0/applications/inventory_and_mrp/inventory/product_management/configure/uom.html';
const OD_FISCAL = 'https://www.odoo.com/documentation/19.0/applications/finance/accounting/taxes/fiscal_positions.html';
const OD_CURRENCY = 'https://www.odoo.com/documentation/19.0/applications/finance/accounting/get_started/multi_currency.html';
const SH_WEBHOOKS = 'https://shopify.dev/docs/apps/build/webhooks';
const SH_VERIFY = 'https://shopify.dev/docs/apps/build/webhooks/verify-deliveries';
const SH_TROUBLE = 'https://shopify.dev/docs/apps/build/webhooks/troubleshoot';
const SH_LIMITS = 'https://shopify.dev/docs/api/usage/limits';
const SH_GQL_LIMITS = 'https://shopify.dev/docs/apps/build/apis/graphql-admin/rate-limits';
const SH_REST_LIMITS = 'https://shopify.dev/docs/api/admin-rest/usage/rate-limits';
const SH_IDEMPOTENT = 'https://shopify.dev/docs/api/usage/idempotent-requests';
const SH_VERSIONING = 'https://shopify.dev/docs/api/usage/versioning';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Connecting Odoo to a storefront or marketplace is mostly a set of decisions, not code: which system owns
        each record, which way it flows, and what happens when a message is lost, repeated or late. Get those
        written down and the build is routine. Skip them and you get the usual symptoms: oversold stock, duplicate
        orders, and accounts that do not match the channel&apos;s payouts.
      </p>
      <p>
        This guide uses Shopify as the worked example because its API is publicly documented. The pattern is the
        same for any marketplace or order-management system; the last section lists what to find out about a
        channel before you start. For what Odoo itself costs, including which plan allows API access, see{' '}
        <Link href="/blog/odoo-implementation-cost">Odoo implementation cost</Link>.
      </p>

      <h2>First, check whether Odoo&apos;s own connector is enough</h2>
      <p>
        Odoo ships a Shopify Connector. Its documentation says it{' '}
        <Src href={OD_SHOPIFY}>synchronizes orders, products, inventory, deliveries, returns, and refunds between a Shopify store and Odoo</Src>,
        in these directions:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Data</th><th>Direction in Odoo&apos;s Shopify Connector</th></tr></thead>
          <tbody>
            <tr><td>Orders, products, customers</td><td><Src href={OD_SHOPIFY}>Shopify → Odoo</Src></td></tr>
            <tr><td>Inventory; fulfillments and deliveries</td><td><Src href={OD_SHOPIFY}>Both ways</Src></td></tr>
            <tr><td>Returns; refunds and credit notes</td><td><Src href={OD_SHOPIFY}>Shopify → Odoo</Src></td></tr>
            <tr><td>Invoices and payments</td><td><Src href={OD_SHOPIFY}>Created in Odoo automatically</Src></td></tr>
          </tbody>
        </table>
      </div>
      <p>Three documented behaviors decide whether it fits:</p>
      <ul>
        <li>
          <strong>It is not real-time.</strong> The connector{' '}
          <Src href={OD_SHOPIFY}>does not perform real-time synchronization and does not rely on webhooks</Src>;
          by default <Src href={OD_SHOPIFY}>orders are pulled every 10 minutes</Src>, and stock is pushed to
          Shopify <Src href={OD_SHOPIFY}>after each order synchronization</Src>.
        </li>
        <li>
          <strong>Products start in Shopify.</strong> The product direction is Shopify to Odoo, so a catalog
          mastered in Odoo does not fit the default.
        </li>
        <li>
          <strong>Returns depend on where deliveries are handled.</strong> When deliveries are handled in Odoo,{' '}
          <Src href={OD_SHOPIFY}>returns initiated in Shopify do not sync automatically</Src>.
        </li>
      </ul>
      <p>
        If one Shopify store, a ten-minute delay and those directions suit you, use the connector. A custom
        integration is for the other cases: a channel Odoo has no connector for, several channels sharing one
        stock pool, a catalog owned by Odoo, or stock that must update faster than a polling interval. A custom
        integration talks to Odoo through its external API, and Odoo states that{' '}
        <Src href={OD_API}>access to data via the external API is only available on Custom Odoo pricing plans</Src>.
      </p>

      <h2>Decide which system owns each record</h2>
      <p>
        One system owns each record; the other holds a copy and never edits it. The table is a default for a
        business that runs stock, purchasing and accounts in Odoo and sells through one or more channels. Change
        a row if your business differs, but do not leave a row with two owners.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Record</th><th>Owner</th><th>Direction</th><th>Trigger</th><th>Match on</th><th>Watch for</th></tr></thead>
          <tbody>
            <tr><td><strong>Product and variants</strong></td><td>Odoo (or the channel, if you use Odoo&apos;s connector)</td><td>Odoo → channel</td><td>On change, plus nightly compare</td><td>SKU, stored with the channel&apos;s variant ID</td><td>Duplicate or blank SKUs; variants modeled differently on each side</td></tr>
            <tr><td><strong>Descriptions and images</strong></td><td>Channel</td><td>None</td><td>None</td><td>None</td><td>Marketing edits overwritten by a sync that sends every field</td></tr>
            <tr><td><strong>Price</strong></td><td>Odoo pricelist, one per channel</td><td>Odoo → channel</td><td>On change</td><td>SKU and currency</td><td>Tax-inclusive against tax-exclusive prices; rounding</td></tr>
            <tr><td><strong>Stock</strong></td><td>Odoo</td><td>Odoo → channel</td><td>On every stock move, plus scheduled full push</td><td>SKU and location</td><td>Which Odoo quantity you publish (on hand or available after reservations); buffer for slow channels</td></tr>
            <tr><td><strong>Order</strong></td><td>Channel until paid, then Odoo</td><td>Channel → Odoo</td><td>Webhook, plus polling for missed orders</td><td>Channel order ID, stored on the Odoo sales order</td><td>Edits and cancellations after import; orders with unknown SKUs</td></tr>
            <tr><td><strong>Customer</strong></td><td>Channel for the storefront account; Odoo for the accounting contact</td><td>Channel → Odoo</td><td>With the order</td><td>Channel customer ID, then email</td><td>Guest checkouts; one person with several emails; marketplaces that mask buyer details</td></tr>
            <tr><td><strong>Fulfillment and tracking</strong></td><td>Whoever ships (usually Odoo)</td><td>Odoo → channel</td><td>On delivery validation</td><td>Order ID and line</td><td>Partial shipments; split across warehouses; carrier name mapping</td></tr>
            <tr><td><strong>Return and refund</strong></td><td>Channel starts it; Odoo records stock and credit note</td><td>Channel → Odoo</td><td>Webhook, plus polling</td><td>Channel refund ID</td><td>Refund without a return; partial refunds; restock or not</td></tr>
            <tr><td><strong>Invoice and payment</strong></td><td>Odoo</td><td>None, or Odoo → customer</td><td>On order confirmation or delivery</td><td>Order ID</td><td>Channel fees and payouts: reconcile against the payout report, not order totals</td></tr>
            <tr><td><strong>Tax</strong></td><td>Decide once: channel calculates and Odoo records, or Odoo calculates</td><td>Channel → Odoo</td><td>With the order</td><td>Tax code mapping table</td><td>Two systems each calculating tax and disagreeing by a cent</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Webhooks and polling: use both</h2>
      <p>
        Webhooks are fast and polling is complete. Shopify says so about its own webhooks: an app{' '}
        <Src href={SH_WEBHOOKS}>shouldn&apos;t rely on receiving data from Shopify webhooks</Src> because{' '}
        <Src href={SH_WEBHOOKS}>delivery isn&apos;t always guaranteed</Src>, and it recommends{' '}
        <Src href={SH_WEBHOOKS}>reconciliation jobs that periodically fetch data</Src>, built on updated-at
        filters. Four more documented behaviors shape the receiver:
      </p>
      <ul>
        <li>
          <strong>Five seconds to answer.</strong> Shopify has{' '}
          <Src href={SH_VERIFY}>a one-second connection timeout and a five-second timeout for the entire request</Src>,
          and treats <Src href={SH_VERIFY}>any response outside the 200 range, including 3XX codes, as an error</Src>.
          The receiver verifies, stores the payload on a queue and answers. It never calls Odoo before answering.
        </li>
        <li>
          <strong>Retries, then removal.</strong> On failure Shopify{' '}
          <Src href={SH_VERIFY}>retries 8 times over the next 4 hours</Src>; after 8 consecutive failures{' '}
          <Src href={SH_VERIFY}>the subscription is automatically deleted</Src> if it was created through the
          Admin API. An outage longer than that leaves you with no webhooks at all until you subscribe again.
        </li>
        <li>
          <strong>No ordering.</strong> Shopify{' '}
          <Src href={SH_WEBHOOKS}>doesn&apos;t guarantee ordering within a topic, or across different topics for the same resource</Src>,
          so an update can arrive before the create. Compare timestamps, or treat the webhook as a signal and
          fetch the current record.
        </li>
        <li>
          <strong>Duplicates happen.</strong> An app{' '}
          <Src href={SH_VERIFY}>might receive the same webhook more than once</Src>; each delivery carries an{' '}
          <Src href={SH_VERIFY}>X-Shopify-Webhook-Id header to detect and skip duplicates</Src>, and an{' '}
          <Src href={SH_VERIFY}>HMAC signature in the X-Shopify-Hmac-SHA256 header</Src> to verify first.
        </li>
      </ul>
      <p>
        On the Odoo side, changes leave by an automated action or by your integration polling for records changed
        since its last run. Odoo can also receive webhooks: its documentation describes them as created in Studio
        to <Src href={OD_WEBHOOKS}>automate an action in your Odoo database when a specific event occurs in an external system</Src>,
        with a warning that <Src href={OD_WEBHOOKS}>if not properly configured, webhooks may disrupt the Odoo database</Src>.
        For a channel integration we would not point the channel straight at Odoo. A small service in between
        gives you the queue, the duplicate check and the retry policy in one place.
      </p>
      <p>The resulting flow for an order:</p>
      <ol>
        <li>Receiver verifies the signature, records the delivery ID, queues the payload, answers 200.</li>
        <li>Worker takes the job, skips it if that delivery or order version was already processed.</li>
        <li>Worker maps the order and calls one Odoo method that creates or updates the sales order.</li>
        <li>On failure the job is retried with backoff; after a set number of attempts it goes to a dead-letter list a person reviews.</li>
        <li>A scheduled job asks the channel for orders updated since the last run and queues any the webhooks missed.</li>
        <li>Stock changes in Odoo are pushed to the channel, and a scheduled full comparison corrects drift.</li>
      </ol>

      <h2>Idempotency and replay</h2>
      <p>
        Every message will at some point be delivered twice, and every job will at some point be run twice. The
        integration is correct only if doing so changes nothing.
      </p>
      <ul className="cp-checklist">
        <li>Store the channel&apos;s order, refund and fulfillment IDs on the Odoo records and look them up before creating anything. &ldquo;Create order&rdquo; becomes &ldquo;create unless this ID exists, otherwise update&rdquo;.</li>
        <li>Keep processed delivery IDs for longer than the channel&apos;s retry window.</li>
        <li>
          Do each business operation in one Odoo call. Odoo&apos;s JSON-2 API runs{' '}
          <Src href={OD_API}>every call in its own SQL transaction</Src> and{' '}
          <Src href={OD_API}>it is not possible to chain multiple calls inside a single transaction</Src>, which
          Odoo calls <Src href={OD_API}>especially dangerous for operations related to reservations and payments</Src>.
          Its advice is to <Src href={OD_API}>call a single method that performs all the related operations</Src>,
          and where none exists, to add one <Src href={OD_API}>in a dedicated module</Src>. An order import that
          creates the customer, the order and the lines in three calls can stop after the second.
        </li>
        <li>
          Use the channel&apos;s idempotency support for writes. Shopify&apos;s lets you{' '}
          <Src href={SH_IDEMPOTENT}>safely retry requests that might have failed due to connection issues, without causing duplication</Src>,
          through an idempotency key or an <Src href={SH_IDEMPOTENT}>@idempotent directive</Src> on mutations
          that accept one.
        </li>
        <li>Send stock as an absolute quantity, not a change. A repeated &ldquo;set to 12&rdquo; is harmless; a repeated &ldquo;subtract 1&rdquo; is not.</li>
        <li>Keep raw payloads long enough to replay a day of traffic into a test database.</li>
      </ul>

      <h2>Rate limits on both sides</h2>
      <p>
        <strong>Shopify.</strong> The GraphQL Admin API is limited by calculated query cost:{' '}
        <Src href={SH_GQL_LIMITS}>100 points per second on standard plans, 200 on Advanced Shopify, 1,000 on Shopify Plus and 2,000 for enterprise</Src>,
        with <Src href={SH_GQL_LIMITS}>a single query capped at 1,000 points</Src> and{' '}
        <Src href={SH_LIMITS}>input arrays capped at 250 items</Src>. Limits apply{' '}
        <Src href={SH_GQL_LIMITS}>per combination of app and store</Src>. The older REST Admin API, which Shopify
        has marked <Src href={SH_REST_LIMITS}>legacy as of October 1, 2024</Src>, allows{' '}
        <Src href={SH_REST_LIMITS}>2 requests per second on standard plans</Src> and answers{' '}
        <Src href={SH_REST_LIMITS}>429 Too Many Requests</Src> beyond that. Shopify&apos;s{' '}
        <Src href={SH_LIMITS}>recommended backoff time is one second</Src>, and it notes it{' '}
        <Src href={SH_LIMITS}>may temporarily reduce rate limits to protect platform stability</Src>. Very large
        catalogs meet one more limit: <Src href={SH_LIMITS}>once a store has 500,000 product variants, no more than 10,000 new variants can be created per day</Src>,
        except on Shopify Plus.
      </p>
      <p>
        <strong>Odoo.</strong> The external API pages we read publish no request-rate figure, so do not assume
        one. Measure on a staging copy, keep concurrency low, and ask Odoo about limits on your hosting. What the
        documentation does say: use <Src href={OD_API}>dedicated bot users for integrations</Src>, so that{' '}
        <Src href={OD_API}>the minimum required permissions can be granted</Src>, and note that every API key has{' '}
        <Src href={OD_API}>a duration, after which the key becomes invalid</Src>. An expired key is a common cause
        of an integration that stops overnight.
      </p>
      <p>
        The design consequence is the same on both sides: all outbound calls go through a queue with a limiter per
        system, bulk jobs such as a full stock push run at a lower priority than orders, and a throttle response
        slows the queue instead of failing the job.
      </p>

      <h2>Versions expire: plan for it</h2>
      <ul>
        <li>
          <strong>Shopify</strong> releases <Src href={SH_VERSIONING}>a new API version every three months</Src>,
          and each stable version <Src href={SH_VERSIONING}>is supported for a minimum of 12 months</Src>. If you
          call a retired version, Shopify <Src href={SH_VERSIONING}>falls forward and responds using the oldest accessible stable version</Src>,
          so a field can change under you without an error. Webhook payloads{' '}
          <Src href={SH_VERSIONING}>are versioned the same way</Src>.
        </li>
        <li>
          <strong>Odoo</strong> introduced the JSON-2 API as <Src href={OD_API}>new in version 19.0</Src>. The
          older XML-RPC and JSON-RPC endpoints are{' '}
          <Src href={OD_RPC}>scheduled for removal in Odoo 22 (fall 2028) and Online 21.1 (winter 2027)</Src>. A
          new integration should use JSON-2; an existing one on the older endpoints has a dated rewrite ahead.
        </li>
      </ul>
      <p>
        Pin the version in every request, log the version the channel reports back, and put a recurring task in the
        calendar to move forward one version at a time.
      </p>

      <h2>Mapping pitfalls: units, tax and currency</h2>
      <ul>
        <li>
          <strong>SKU.</strong> It is the only practical join between systems, and neither enforces it the way you
          need. Check for blanks and duplicates on both sides before the first sync, and store the channel&apos;s
          own IDs next to it so a renamed SKU does not break the link.
        </li>
        <li>
          <strong>Units of measure.</strong> Odoo{' '}
          <Src href={OD_UOM}>automatically converts unit measurements</Src> between a product&apos;s units;
          a channel usually sells &ldquo;1&rdquo; of a listing. If you stock in single units and sell a pack of
          six, the listing must map to six units, both when the order comes in and when stock goes out.
        </li>
        <li>
          <strong>Tax.</strong> Odoo applies tax through fiscal positions, which{' '}
          <Src href={OD_FISCAL}>adapt the taxes and the income and expense accounts used for a transaction automatically</Src>.
          If the channel has already calculated tax, import its amounts and map them to Odoo tax codes; do not let
          Odoo recalculate and differ. Decide whether prices are sent tax-inclusive or tax-exclusive, per channel.
        </li>
        <li>
          <strong>Currency.</strong> Odoo can{' '}
          <Src href={OD_CURRENCY}>record transactions in currencies other than the main currency configured for your company</Src>.
          Record the order in the currency the customer paid, and take the exchange rate from the payout, not from
          the day of import.
        </li>
        <li><strong>Rounding.</strong> Line-level and order-level rounding give different totals. Compare order totals on import and post any difference to a rounding account, with an alert above a cent or two.</li>
        <li><strong>Time zones.</strong> Store timestamps in UTC and convert for display. Day-boundary errors show up as orders in the wrong accounting period.</li>
        <li><strong>Status.</strong> Write the mapping from each channel status to an Odoo action (confirm, cancel, hold) as a table, including what happens to an order edited after it was imported.</li>
        <li><strong>Bundles and kits.</strong> Decide whether a bundle is one stock item or a bill of components, because that determines what stock number the channel is sent.</li>
      </ul>

      <h2>Failure modes and how to detect them</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Failure</th><th>How to detect it</th><th>What to do</th></tr></thead>
          <tbody>
            <tr><td><strong>Missed order</strong> (webhook lost, receiver down)</td><td>Scheduled comparison of channel order IDs against Odoo for the last few days</td><td>Queue the missing orders; this job is part of the design, not a repair tool</td></tr>
            <tr><td><strong>Webhook subscription removed</strong></td><td>Daily check that expected subscriptions exist; no deliveries for longer than normal</td><td>Re-subscribe, then run the comparison for the gap. Shopify warns that <Src href={SH_TROUBLE}>if failures persist, the subscription is removed</Src></td></tr>
            <tr><td><strong>Duplicate order in Odoo</strong></td><td>More than one sales order with the same channel order ID</td><td>Unique constraint on that field; create-or-update logic</td></tr>
            <tr><td><strong>Order stuck</strong> (unknown SKU, missing tax mapping, validation error)</td><td>Dead-letter queue count above zero; age of oldest unprocessed job</td><td>A screen where staff see the reason, fix the data and retry</td></tr>
            <tr><td><strong>Oversell</strong></td><td>Channel stock differs from Odoo&apos;s published quantity in the scheduled comparison; negative available stock</td><td>Push on every move, full push on a schedule, a safety buffer for slow channels</td></tr>
            <tr><td><strong>Half-created order</strong></td><td>Sales orders with no lines, or customers created with no order, from the integration user</td><td>One Odoo method per operation, so it commits or rolls back as a whole</td></tr>
            <tr><td><strong>Throttled</strong></td><td>429 responses; queue depth growing; Shopify&apos;s reported available cost near zero</td><td>Limiter per system; slow the queue; move bulk work off-peak</td></tr>
            <tr><td><strong>Expired or revoked credentials</strong></td><td>Authentication errors on every call; key expiry date within two weeks</td><td>Alert before expiry; documented rotation</td></tr>
            <tr><td><strong>Silent API version change</strong></td><td>Version in the response header differs from the version requested</td><td>Upgrade on a schedule; contract tests on the fields you read</td></tr>
            <tr><td><strong>Out-of-order update</strong></td><td>Stored record has a newer timestamp than the incoming message</td><td>Ignore older messages, or always fetch the current record</td></tr>
            <tr><td><strong>Refund not in the accounts</strong></td><td>Channel refund total against Odoo credit notes per period</td><td>Import refunds as their own record type, with or without a stock return</td></tr>
            <tr><td><strong>Totals do not reconcile</strong></td><td>Sum of imported orders against the channel&apos;s payout report</td><td>Record fees and adjustments from the payout; fix tax and rounding mapping</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Go-live checklist</h2>
      <ul className="cp-checklist">
        <li>Ownership table agreed and signed by operations and finance.</li>
        <li>SKUs unique and non-blank on both sides; channel IDs stored in Odoo.</li>
        <li>Odoo plan allows external API access; a dedicated integration user with minimum permissions; key expiry on the calendar.</li>
        <li>Receiver answers inside the channel&apos;s timeout under load, with signature verification on.</li>
        <li>Replay test passed: the same day of payloads sent twice produces no duplicates and no stock change.</li>
        <li>Out-of-order test passed: update before create, cancel before create.</li>
        <li>Outage test passed: receiver off for longer than the retry window, then recovered by the comparison job.</li>
        <li>Tax, currency and rounding checked on real orders from every country and price type you sell in.</li>
        <li>Partial shipment, partial refund and refund-without-return each run end to end.</li>
        <li>Limiters set below each system&apos;s documented limit; a full stock push tested without starving orders.</li>
        <li>Dashboards and alerts live: queue age, dead letters, 429s, missing subscriptions, stock drift.</li>
        <li>A first full stock push scheduled for a quiet hour, and a rollback plan: channel listings paused, integration off, manual order entry.</li>
        <li>API version pinned on both sides, with the next upgrade date written down.</li>
      </ul>

      <h2>Applying this to another marketplace or order system</h2>
      <p>
        Nothing above is specific to Shopify except the numbers. For any other channel, whether a general
        marketplace, a specialist one or an order-management system, get the answers to these from its own
        developer documentation before estimating the work:
      </p>
      <ol>
        <li>Does it push events, or must you poll? If it pushes, what are the timeout, retry schedule and signature method?</li>
        <li>Is there a stable ID for every order, line, shipment and refund, and a delivery ID for every message?</li>
        <li>Can you ask for &ldquo;everything changed since a timestamp&rdquo;? That is the reconciliation job.</li>
        <li>What are the rate limits, and are they per account, per key or per endpoint?</li>
        <li>Does it accept an absolute stock quantity, and how quickly does a stock update take effect?</li>
        <li>Who calculates tax, and what does the order payload contain: gross, net, tax lines, fees?</li>
        <li>How are API versions retired, and how much notice is given?</li>
        <li>Is there a sandbox with realistic data?</li>
      </ol>
      <p>
        If the documentation does not answer a question, ask the channel in writing before you build. We have not
        named other marketplaces here because we only describe an API from its own published documentation.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Does Odoo have a Shopify integration?', answer: ['Yes. Odoo’s Shopify Connector ', ['synchronizes orders, products, inventory, deliveries, returns, and refunds between a Shopify store and Odoo', OD_SHOPIFY], '. It is scheduled, not real-time: it ', ['does not rely on webhooks', OD_SHOPIFY], ', and by default ', ['orders are pulled every 10 minutes', OD_SHOPIFY], '.'] },
        { question: 'Is the Odoo Shopify integration real-time?', answer: ['Not with Odoo’s own connector, which ', ['does not perform real-time synchronization', OD_SHOPIFY], '. A custom integration can react to Shopify webhooks within seconds, but still needs a scheduled comparison because Shopify says ', ['webhook delivery isn’t always guaranteed', SH_WEBHOOKS], '.'] },
        { question: 'Which Odoo plan do I need to connect Odoo to another system through its API?', answer: ['Odoo’s documentation says ', ['access to data via the external API is only available on Custom Odoo pricing plans', OD_API], '. Our Odoo implementation cost guide covers the plans.'] },
        { question: 'Should a new Odoo integration use XML-RPC or the JSON-2 API?', answer: ['JSON-2. Odoo’s XML-RPC and JSON-RPC endpoints are ', ['scheduled for removal in Odoo 22 (fall 2028) and Online 21.1 (winter 2027)', OD_RPC], ', and Odoo names the JSON-2 API as the replacement.'] },
        { question: 'How do you stop duplicate orders when syncing a sales channel with Odoo?', answer: ['Store the channel’s order ID on the Odoo sales order and create only if it is absent. Skip repeated deliveries using the delivery ID; Shopify sends an ', ['X-Shopify-Webhook-Id header to detect and skip duplicates', SH_VERIFY], '. Create the order in one Odoo call, because ', ['each JSON-2 call runs in its own SQL transaction', OD_API], '.'] },
        { question: 'Can Odoo connect to marketplaces other than Shopify?', answer: ['Through its external API, yes, where the marketplace also offers an API. The pattern in this guide applies: decide ownership per record, combine events with scheduled comparison, make every operation safe to repeat, and respect both systems’ rate limits. Read the marketplace’s own developer documentation for its limits and retry behavior.'] },
      ]} />

      <p className="cp-note">
        Odoo facts are from Odoo&apos;s 19.0 documentation and Shopify facts from shopify.dev, read on October 10,
        2026. Limits, intervals and version dates change; check the linked pages before you rely on a number.
        This is neutral technical guidance: Peregrine has not published an Odoo case study, and nothing here
        describes a client project or a delivered integration.
      </p>
      <p>
        Planning an Odoo integration? See our <Link href="/services/odoo-erp">Odoo service</Link> and how we
        approach <Link href="/services/api-integration">API integration</Link> in general. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
