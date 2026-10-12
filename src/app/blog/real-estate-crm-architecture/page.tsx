import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import LeadTimelineDiagram, { TIMELINE } from '../../components/diagrams/LeadTimelineDiagram';

const SLUG = 'real-estate-crm-architecture';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/real-estate-crm-architecture.md. CTIA's messaging principles page did not
// return its content to a plain fetch, so it is not cited; SMS rules are quoted from the FCC's
// consumer guide and 47 CFR 64.1200 and otherwise left as questions for counsel.
const FTC_CANSPAM = 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business';
const FCC_GUIDE = 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts';
const CFR_1200 = 'https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200';
const CASL = 'https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en';
const CCPA = 'https://oag.ca.gov/privacy/ccpa';
const PG_INSERT = 'https://www.postgresql.org/docs/current/sql-insert.html';
const GA_UTM = 'https://support.google.com/analytics/answer/10917952?hl=en';
const DD_LISTING_KEY = 'https://dd.reso.org/DD2.0/Property/ListingKey/';
const DD_LISTING_ID = 'https://dd.reso.org/DD2.0/Property/ListingId/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What has to be true one minute after an enquiry</h2>
      <p>
        A buyer fills in &ldquo;Ask about this property&rdquo; on a listing page at nine in the evening. A minute
        later, a well-built system can answer six questions without anyone opening a spreadsheet: who is this
        person, and have we seen them before; which listing and which search brought them here; what did they
        agree to be contacted about, and how; which agent owns the enquiry; what has been sent so far; and what
        happens if nobody responds.
      </p>
      <p>
        Most CRM problems in brokerages are one of those six answers going missing between systems: the website
        knows the listing but the CRM only receives a name and a phone number; the same buyer exists three times
        under three email addresses; a portal lead lands in a shared inbox; a text goes to someone who opted out
        by replying to a different agent. This article is about the architecture that keeps those answers
        attached to the lead from capture to follow-up. It applies whether you build the CRM, or keep a
        commercial one and build around it, which is the more common route (the trade-off is in{' '}
        <Link href="/blog/custom-saas-vs-off-the-shelf-crm-for-brokerages">custom SaaS vs an off-the-shelf CRM</Link>).
      </p>

      <h2>The flow, on one contact&apos;s timeline</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><LeadTimelineDiagram /></div>
        <figcaption>
          Illustrative timeline for one contact. Event names are examples; the left column is the system that
          owns each step and writes the event.
        </figcaption>
      </figure>
      <p>The same timeline as a list:</p>
      <ol>
        {TIMELINE.map((r) => (
          <li key={r.event + r.detail}>
            <strong>{r.event}</strong> ({r.owner}){r.property ? ', a property interaction' : ''}: {r.detail.replace(/ · /g, '; ')}.
          </li>
        ))}
      </ol>
      <p>
        Two things in that picture drive the rest of the design. The record of what happened is a single ordered
        log per contact, written by whichever system did the work. And property interactions, the views, saves
        and shares, are first-class events on that log, because in real estate the listings a person looked at
        are the main thing an agent needs to know before calling.
      </p>

      <h2>Capture: every channel into one front door</h2>
      <p>
        Leads arrive in different shapes. The design goal is one capture endpoint with one schema, and an adapter
        per channel that fills it, so that routing and deduplication never depend on where a lead came from.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Channel</th><th>How it arrives</th><th>Record at capture</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Enquiry on a listing</strong></td>
              <td>Website form posted to the capture API</td>
              <td>Listing key and source MLS, the page URL, the search that led there, message text, consent choices as shown</td>
            </tr>
            <tr>
              <td><strong>General forms</strong> (contact, valuation, newsletter, showing request)</td>
              <td>Website form posted to the capture API</td>
              <td>Form type, the page, requested time for showings, consent choices</td>
            </tr>
            <tr>
              <td><strong>Phone calls</strong></td>
              <td>Call-tracking or telephony provider webhook, or an agent logging the call</td>
              <td>Caller number, number dialed (which maps to a source or listing), time, duration, outcome; recording only where disclosed and lawful</td>
            </tr>
            <tr>
              <td><strong>Portal leads</strong></td>
              <td>The portal&apos;s lead API or webhook where one is offered, otherwise parsed notification email</td>
              <td>Portal name, the portal&apos;s lead id, listing reference, raw payload kept as received</td>
            </tr>
            <tr>
              <td><strong>Chat or assistant</strong></td>
              <td>Conversation service posting a summary to the capture API</td>
              <td>Transcript reference, answers given (budget, timeline, area), the listing in view</td>
            </tr>
            <tr>
              <td><strong>Manual and import</strong></td>
              <td>Agent entry, open-house sign-in, spreadsheet import</td>
              <td>Who entered it, the stated origin, and how consent was obtained (often: unknown)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Whatever the channel, we would record the same core at capture, before any processing:</p>
      <ul>
        <li><strong>The raw submission, unmodified,</strong> so a parsing bug can be fixed and the enquiry reprocessed.</li>
        <li><strong>A capture id generated by the sender</strong> (the form, the adapter), so a retried submission is recognized as the same enquiry.</li>
        <li><strong>Server time, tenant and site.</strong> In a multi-tenant product the brokerage and agent site come from the request context, not the form body; see <Link href="/blog/multi-tenant-real-estate-saas">multi-tenant real estate SaaS</Link>.</li>
        <li><strong>Consent as evidence:</strong> the exact wording shown, which boxes were ticked, the form version, time and IP address. A boolean is not enough to answer a later complaint.</li>
      </ul>
      <p>
        The capture endpoint does three things and nothing else: validates, stores, and returns. Spam scoring,
        deduplication, routing and notifications run afterwards from a queue, so a slow email provider can never
        lose an enquiry. That split is the subject of{' '}
        <Link href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</Link>.
      </p>

      <h2>Attribution: source, campaign, listing and search</h2>
      <p>Attribution answers two different questions, and they need different fields.</p>
      <p>
        <strong>Where did the visitor come from?</strong> Capture the landing URL, the referrer, and campaign
        parameters on the first page view, and keep them in first-party storage until a form is submitted. The
        common convention is Google&apos;s campaign parameters, such as{' '}
        <Src href={GA_UTM}>utm_source for the referrer, utm_medium for the marketing medium and utm_campaign for the campaign</Src>.
        Store first touch and the touch at conversion separately; overwriting one with the other is how
        &ldquo;all our leads come from direct&rdquo; reports are made.
      </p>
      <p>
        <strong>What did they want?</strong> This is the part generic CRMs do not model. For a listing enquiry,
        store the listing&apos;s key and its source system, not just an address string. The RESO Data Dictionary
        defines ListingKey as{' '}
        <Src href={DD_LISTING_KEY}>a unique identifier for this record from the immediate source</Src>, and warns
        that the human-facing ListingId{' '}
        <Src href={DD_LISTING_ID}>in a multiple originating system or a merged system may not be unique</Src>.
        So the enquiry references source plus key. Alongside it, store the search that led to the listing as
        structured criteria (area, price range, beds, property type), because &ldquo;enquired about a
        three-bedroom after searching one zip code under a price&rdquo; is what lets an agent suggest alternatives
        when that listing goes under contract. Snapshot the price and status at the time of enquiry too: the
        listing will change, and the enquiry should still make sense.
      </p>

      <h2>Identity resolution and deduplication</h2>
      <p>
        An enquiry is an event; a contact is a person. Mixing them is the root of most duplicate problems. Each
        enquiry is stored as its own row and then <em>resolved</em> to a contact:
      </p>
      <ol>
        <li><strong>Normalize identifiers.</strong> Lower-case and trim emails; convert phone numbers to one international format with country code. Keep the original as typed.</li>
        <li><strong>Match on exact identifiers first.</strong> A contact can hold several emails and phones, so the match is against an identifier table, not columns on the contact.</li>
        <li><strong>Treat everything else as a suggestion.</strong> Same name with a similar address, or a shared family phone, produces a &ldquo;possible duplicate&rdquo; for a person to confirm. Automatic merges on fuzzy evidence join spouses, and parents with adult children, into one record.</li>
        <li><strong>Join the anonymous history.</strong> When the form is submitted, the visitor id from the browser is attached to the contact, and earlier listing views and saves under that id join the timeline.</li>
        <li><strong>Merge by pointer, not by deletion.</strong> A merge marks one contact as merged into another and re-points its identifiers; the original rows and events stay, so a wrong merge can be undone.</li>
      </ol>
      <p>
        Uniqueness has to be enforced by the database, since two submissions from the same person can arrive in
        the same second. In PostgreSQL, the insert-or-update form is safe under that race:{' '}
        <Src href={PG_INSERT}>ON CONFLICT DO UPDATE guarantees an atomic INSERT or UPDATE outcome, even under high concurrency</Src>.
      </p>

      <h2>An illustrative data model</h2>
      <p>
        Four tables carry the core: contact, enquiry, activity and assignment. Names and columns are examples to
        show the relationships, not a client schema.
      </p>
      <pre className="cp-code"><code>{`-- Illustrative. Every table also carries tenant_id (omitted from keys here for brevity).
CREATE TABLE contact (
  id            uuid PRIMARY KEY,
  display_name  text,
  stage         text NOT NULL DEFAULT 'new',     -- current pipeline stage (a projection)
  owner_agent   uuid,                            -- current assignee (a projection)
  merged_into   uuid REFERENCES contact(id),     -- set when merged; row is kept
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE contact_identifier (
  contact_id    uuid NOT NULL REFERENCES contact(id),
  kind          text NOT NULL,                   -- email | phone | visitor_id | external_crm_id
  value_norm    text NOT NULL,                   -- normalized form used for matching
  value_raw     text,
  UNIQUE (kind, value_norm)                      -- one owner per identifier
);

CREATE TABLE enquiry (
  id              uuid PRIMARY KEY,
  capture_id      text NOT NULL UNIQUE,          -- sender-generated; makes retries harmless
  contact_id      uuid REFERENCES contact(id),   -- null until resolved
  channel         text NOT NULL,                 -- listing_form | call | portal | chat | import
  listing_source  text,                          -- originating MLS system
  listing_key     text,
  listing_snapshot jsonb,                        -- price and status at the time
  search_criteria jsonb,                         -- the search that led here
  first_touch     jsonb,                         -- source, medium, campaign, referrer, landing URL
  last_touch      jsonb,
  consent         jsonb,                         -- wording shown, choices, form version, IP
  raw_payload     jsonb NOT NULL,
  received_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE activity (                          -- the append-only timeline
  id            uuid PRIMARY KEY,                -- event id; also the idempotency key
  contact_id    uuid NOT NULL REFERENCES contact(id),
  type          text NOT NULL,                   -- e.g. enquiry.created, listing.viewed, message.sent
  occurred_at   timestamptz NOT NULL,            -- when it happened, per the source
  recorded_at   timestamptz NOT NULL DEFAULT now(),
  actor         text NOT NULL,                   -- system or user that produced it
  payload       jsonb NOT NULL
);

CREATE TABLE assignment (
  id            uuid PRIMARY KEY,
  enquiry_id    uuid NOT NULL REFERENCES enquiry(id),
  agent_id      uuid NOT NULL,
  rule          text NOT NULL,                   -- which routing rule decided
  assigned_at   timestamptz NOT NULL DEFAULT now(),
  respond_by    timestamptz,                     -- from the tenant's response target
  responded_at  timestamptz,
  ended_at      timestamptz,                     -- reassigned or closed
  end_reason    text
);`}</code></pre>

      <h2>The timeline as an append-only event log</h2>
      <p>
        The <code>activity</code> table is never updated or deleted in normal operation. Stage, owner, last
        contacted and &ldquo;hot lead&rdquo; flags on the contact row are projections computed from it. That
        choice costs some storage and buys four things: an audit trail for &ldquo;who reassigned this lead and
        when&rdquo;; the ability to rebuild a projection after a logic change; safe ingestion of late and
        duplicate events, because inserting the same event id twice does nothing; and one stream to feed
        reporting, notifications and outbound integrations.
      </p>
      <p><strong>Illustrative event</strong>, as it might be stored and published:</p>
      <pre className="cp-code"><code>{`{
  "id": "evt_01JAB3F7Q2",
  "type": "enquiry.created",
  "version": 1,
  "occurred_at": "2026-10-12T21:04:11Z",
  "recorded_at": "2026-10-12T21:04:12Z",
  "actor": "website:oak-realty",
  "contact_id": "c_8842",
  "payload": {
    "enquiry_id": "enq_5521",
    "channel": "listing_form",
    "listing": { "source": "example_mls", "key": "L-1042",
                 "price_at_enquiry": 525000, "status_at_enquiry": "Active" },
    "search": { "area": "78704", "max_price": 550000, "min_beds": 3 },
    "first_touch": { "source": "google", "medium": "cpc", "campaign": "south-austin" },
    "consent": { "email": true, "sms": false, "form_version": "2026-09" }
  }
}`}</code></pre>
      <p>
        Two timestamps are deliberate. Events arrive out of order (a call recording posted minutes after the
        call, a portal lead delayed by an email relay), so the timeline is ordered by when things happened and
        the log is processed in the order it was recorded.
      </p>

      <h2>Assignment and routing</h2>
      <p>
        Routing is a small rules engine with a strict requirement: every enquiry ends with exactly one owner, and
        the reason is recorded. The usual rules, in the order we would evaluate them:
      </p>
      <ol>
        <li><strong>Existing relationship.</strong> If the contact already has an active owner, the enquiry goes to that agent. Skipping this rule is how two agents end up calling the same buyer.</li>
        <li><strong>Listing agent.</strong> An enquiry on the brokerage&apos;s own listing goes to the listing agent or their team, if the brokerage&apos;s policy says so.</li>
        <li><strong>Area or specialty.</strong> Zip code, price band, property type or language, matched against agent profiles.</li>
        <li><strong>Round robin</strong> within the eligible pool, optionally weighted, skipping agents who are marked away or over a cap.</li>
        <li><strong>Fallback.</strong> A named queue or person when no rule matches or the pool is empty. A lead with no owner should be an alert, not a quiet state.</li>
      </ol>
      <p>Details that decide whether this works in production:</p>
      <ul>
        <li><strong>The round-robin pointer is shared state.</strong> Two enquiries arriving together must not both read &ldquo;next agent = 4&rdquo;. Advance the pointer in the same transaction that writes the assignment, or with an atomic counter.</li>
        <li><strong>Rules are tenant data with versions,</strong> and each assignment stores which rule and version decided, so &ldquo;why did I not get this lead&rdquo; has an answer.</li>
        <li><strong>Response targets are a design input, not a promise.</strong> If a brokerage wants a first response within some number of minutes, that becomes a <code>respond_by</code> time on the assignment and a delayed job that checks it. What the timer does on expiry (remind, escalate to a manager, reassign) is the brokerage&apos;s policy. The platform&apos;s job is to make the timer reliable and the outcome visible, not to guarantee that a person answers.</li>
        <li><strong>Reassignment appends.</strong> The old assignment gets an end time and reason; a new row is created. Nothing is overwritten.</li>
        <li><strong>Office hours and time zones</strong> belong to the agent and the office, and timers pause or not by explicit rule.</li>
      </ul>
      <p>
        Timers and escalations are delayed jobs; the mechanics, including what happens to them in a restart, are
        in <Link href="/blog/background-jobs-redis-bullmq">reliable background jobs with Redis and BullMQ</Link>.
        Our <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> describes a brokerage
        whose inbound leads had been routed to a shared inbox, and a lead-qualification chatbot that qualifies by
        budget, timeline, location and pre-approval status; in this model, such an assistant is one more actor
        writing events to the timeline before a person takes over.
      </p>

      <h2>Communication records, consent and opt-out</h2>
      <p>
        Emails, texts and calls are sent through providers, but the record of them belongs on the timeline. For
        each message we would store: direction, channel, the provider&apos;s message id, the template and version
        or the body, who or what sent it, and then each status the provider reports (accepted, delivered,
        bounced, complained, replied) as its own event. Provider message ids are what make status webhooks
        idempotent.
      </p>
      <p>
        Consent is modeled per contact, per channel and per purpose, as its own append-only record with the
        evidence captured at the form. Before every send, one function checks it; there is no second path that
        skips the check for &ldquo;just one quick text&rdquo;. A few published rules shape that function. They
        are quoted here as design inputs, not legal advice:
      </p>
      <ul>
        <li>
          <strong>US email.</strong> The FTC&apos;s CAN-SPAM guide says a message{' '}
          <Src href={FTC_CANSPAM}>must include a clear and conspicuous explanation of how the recipient can opt out</Src>,
          that the opt-out mechanism{' '}
          <Src href={FTC_CANSPAM}>must be able to process opt-out requests for at least 30 days after you send your message</Src>,
          that you <Src href={FTC_CANSPAM}>must honor a recipient&apos;s opt-out request within 10 business days</Src>,
          and that the message <Src href={FTC_CANSPAM}>must include your valid physical postal address</Src>. It
          also says that hiring another company to handle email does not{' '}
          <Src href={FTC_CANSPAM}>contract away your legal responsibility to comply with the law</Src>: the
          brokerage is responsible for what the platform sends in its name.
        </li>
        <li>
          <strong>US texts and automated calls.</strong> The FCC&apos;s consumer guide states that{' '}
          <Src href={FCC_GUIDE}>commercial texts require written consent</Src> when sent with an autodialer, and
          that a person <Src href={FCC_GUIDE}>may opt out of any robocall or robotext at any time and in any reasonable manner</Src>.
          The rule itself lists reply words that count as revocation, including{' '}
          <Src href={CFR_1200}>&ldquo;stop,&rdquo; &ldquo;quit,&rdquo; &ldquo;end,&rdquo; &ldquo;revoke,&rdquo; &ldquo;opt out,&rdquo; &ldquo;cancel,&rdquo; or &ldquo;unsubscribe&rdquo;</Src>,
          and says revocation requests{' '}
          <Src href={CFR_1200}>must be honored within a reasonable time not to exceed ten business days</Src>.
          Whether a given texting setup is covered, and what consent wording is sufficient, is a question for
          the brokerage&apos;s counsel.
        </li>
        <li>
          <strong>Canada.</strong> Canada&apos;s anti-spam legislation is built on consent: the federal
          government describes it as requiring that{' '}
          <Src href={CASL}>businesses obtain consent before sending commercial electronic messages</Src>. A
          platform serving both countries needs the contact&apos;s jurisdiction as an input to the send check.
        </li>
      </ul>
      <p>Engineering consequences that follow from those rules:</p>
      <ul>
        <li>An inbound reply is parsed for opt-out words before anything else, and the opt-out is written as an event that takes effect immediately, well inside any deadline.</li>
        <li>Opt-out is stored against the identifier (the phone number or email address) at brokerage level, so it holds when the lead is reassigned to another agent or the contact is merged.</li>
        <li>Suppression survives deletion: a minimal record of &ldquo;do not contact this address&rdquo; is kept so an import next month does not re-add it. How that sits with deletion requests is one of the privacy questions below.</li>
        <li>Unsubscribe links work without a login and keep working for old messages.</li>
        <li>One-to-one messages typed by an agent and automated campaigns are distinguished in the data, because the rules that apply to them can differ.</li>
      </ul>

      <h2>Property interactions joined to the contact</h2>
      <p>
        Views, saves, shares, saved searches and alert clicks are high-volume and low-value individually, and
        decisive in aggregate. The architecture question is where the join to a person happens.
      </p>
      <ul>
        <li><strong>The website records interactions</strong> against a first-party visitor id, with the listing&apos;s source and key. Known contacts get the same events with their contact id.</li>
        <li><strong>Raw interactions go to a high-volume store;</strong> the timeline gets a digest. Fifty views in one session become one &ldquo;viewed 12 listings, mostly three-bedroom, one zip code&rdquo; (illustrative) activity, with the detail one click away.</li>
        <li><strong>Listing data is referenced, not copied.</strong> The CRM stores source and key, plus a small snapshot for display. Price and status are read from the listing store at view time, so the agent sees that a saved listing has dropped in price or gone pending.</li>
        <li><strong>Listing changes fan out to people.</strong> A price change on a listing is a reason to contact everyone who saved it; that is a query from listing to contacts, which the interaction store must support. The alert side of this is covered in the guide to <Link href="/blog/saved-searches-listing-alerts">saved searches and listing alerts</Link>.</li>
        <li><strong>MLS display rules still apply.</strong> A listing that leaves the feed may have to stop being shown; the interaction record stays, the listing detail may not.</li>
      </ul>

      <h2>Pipeline stages</h2>
      <p>
        Stages are a projection of the event log with a small, explicit state machine. A workable default for
        buyers is New, Attempted contact, Contacted, Qualified, Showing, Offer, Under contract, Closed, with Lost
        and Nurture as exits that record a reason. Two rules keep reports honest: every stage change is an event
        with an actor and a time, and stages are per opportunity, not per person, because one contact can be
        selling one home and buying another. Let each brokerage rename stages; keep a fixed internal category
        behind each name so cross-tenant product analytics and integrations do not depend on labels.
      </p>

      <h2>Integration boundaries: who owns what</h2>
      <p>
        A CRM sits between four or five other systems. Each fact should have one owner; everyone else holds a
        reference or a copy they know is a copy.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>System</th><th>Owns</th><th>Gives the CRM</th><th>Gets from the CRM</th></tr></thead>
          <tbody>
            <tr><td><strong>Website</strong></td><td>Sessions, visitor ids, forms, property interactions</td><td>Enquiries and interaction events through the capture API</td><td>Who is signed in, their saved listings and assigned agent</td></tr>
            <tr><td><strong>MLS data pipeline</strong></td><td>Listings, media, status and price history, display rules</td><td>Listing lookups by source and key; change events</td><td>Nothing. Lead data does not flow back into listing data</td></tr>
            <tr><td><strong>Email and SMS providers</strong></td><td>Delivery, bounces, complaints, carrier-level opt-outs</td><td>Status and inbound-reply webhooks</td><td>Send requests that already passed the consent check</td></tr>
            <tr><td><strong>CRM</strong></td><td>Contacts, identifiers, consent, enquiries, timeline, assignments, stages</td><td colSpan={2}>The system of record for the person and the relationship</td></tr>
            <tr><td><strong>A third-party CRM</strong> (when one is kept)</td><td>Whatever the brokerage decides: often the agent&apos;s working view and tasks</td><td>Stage and note changes by webhook or polling</td><td>New leads and events as idempotent upserts keyed by an external id</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        When a third-party CRM stays in place, decide field by field which side wins, and write it down. A sound
        default is that the system where agents work owns stage and notes, and the platform owns capture,
        attribution, consent and property interactions. Sync is then two one-way flows, not one two-way merge:
      </p>
      <ul>
        <li><strong>Outbound:</strong> events are written to an outbox in the same transaction as the change and delivered with retries. The receiving call is an upsert keyed by your contact id stored as an external id on their side, so a retry updates and never duplicates.</li>
        <li><strong>Inbound:</strong> their webhooks are verified, acknowledged, queued and applied idempotently, with the provider&apos;s event id recorded. Ordering is not assumed.</li>
        <li><strong>Echo suppression:</strong> a change you pushed will come back as their webhook. Tag writes with their origin and drop the echo, or two systems will update each other indefinitely.</li>
        <li><strong>Reconciliation:</strong> a scheduled comparison of recently changed records on both sides catches what webhooks missed.</li>
      </ul>
      <p>
        Signature checks, retries, the outbox and reconciliation are covered in detail in{' '}
        <Link href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</Link>.
      </p>

      <h2>Privacy and data-subject requests: questions to plan for</h2>
      <p>
        A CRM is a database of personal information, and requests about it will come. California&apos;s Attorney
        General lists, among the rights the CCPA gives residents,{' '}
        <Src href={CCPA}>the right to know about the personal information a business collects about them</Src>,{' '}
        <Src href={CCPA}>the right to delete personal information collected from them (with some exceptions)</Src> and{' '}
        <Src href={CCPA}>the right to correct inaccurate personal information</Src>, and notes that a deletion
        request extends to telling <Src href={CCPA}>service providers to do the same</Src>. Whether a particular
        brokerage is covered by that law or by others is for its counsel. The architecture should be able to
        answer these whatever the answer is:
      </p>
      <ul className="cp-checklist">
        <li>Can we produce everything held about one person, across contact, enquiries, timeline, raw interactions, message bodies and call recordings, from one identifier?</li>
        <li>Can we delete or anonymize a person in every store, including the search index, analytics, backups after a stated period, and the third-party CRM we synced them to?</li>
        <li>Which records must be kept despite a deletion request (for example suppression entries, transaction records), and who decided?</li>
        <li>When a contact is merged, do requests against either original still find the data?</li>
        <li>In a multi-tenant platform, is the brokerage the party that decides and the platform the processor acting on its instruction? Is that in the contract?</li>
        <li>Who can export contacts, is every export logged, and what happens to an agent&apos;s access and their leads the day they leave?</li>
        <li>How long are raw payloads, IP addresses and recordings kept, and is that enforced by a job or by intention?</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'What should a real estate CRM record when an enquiry arrives?', answer: ['The raw submission, a sender-generated capture id, server time, the tenant and site, the listing’s source and key with a price and status snapshot, the search that led to it, first-touch and last-touch campaign data, and the consent wording and choices shown on the form. Store the enquiry as its own record and resolve it to a contact afterwards.'] },
        { question: 'How do you stop duplicate contacts in a CRM?', answer: ['Normalize emails and phone numbers, keep them in an identifier table with a unique constraint, and match on exact identifiers only. Offer fuzzy matches as suggestions for a person to confirm. Use an atomic upsert so two simultaneous submissions cannot create two rows: in PostgreSQL, ', ['ON CONFLICT DO UPDATE guarantees an atomic INSERT or UPDATE outcome', PG_INSERT], '. Merge by pointer so a wrong merge can be reversed.'] },
        { question: 'How should lead routing handle an agent who does not respond?', answer: ['Record a respond-by time on the assignment from the brokerage’s own response target and run a delayed job that checks it. On expiry, apply the brokerage’s policy: remind, escalate or reassign, appending a new assignment and keeping the old one with its end reason. The target is an input to the design; the platform makes the timer reliable but cannot promise a person answers.'] },
        { question: 'How quickly must an SMS or email opt-out take effect?', answer: ['Build it to take effect immediately. The published outer limits are longer: the FTC says you ', ['must honor a recipient’s opt-out request within 10 business days', FTC_CANSPAM], ' for commercial email, and the FCC rule says consent revocations ', ['must be honored within a reasonable time not to exceed ten business days', CFR_1200], '. Which rules apply to your messages is a question for counsel.'] },
        { question: 'Should the CRM store listing data?', answer: ['It should store a reference: the listing’s source system and key, plus a small snapshot of price and status at the time of the event. Current listing details are read from the listing store, which owns them and applies MLS display rules. The RESO Data Dictionary defines ListingKey as ', ['a unique identifier for this record from the immediate source', DD_LISTING_KEY], ', which is why the reference includes the source.'] },
      ]} />

      <p className="cp-note">
        Regulatory and documentation statements were read from the linked FTC, FCC, eCFR, Government of Canada,
        California Attorney General, PostgreSQL, Google and RESO pages on October 12, 2026 (the eCFR page showed
        Title 47 as up to date as of October 8, 2026). They are quoted as inputs to system design and are not
        legal advice; rules differ by jurisdiction and change. Schemas, event names, identifiers and figures
        marked illustrative are examples, not measurements or descriptions of a client system.
      </p>
      <p>
        Building a CRM, or connecting your website and MLS data to the one you have? See our{' '}
        <Link href="/services/saas-development">SaaS development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
