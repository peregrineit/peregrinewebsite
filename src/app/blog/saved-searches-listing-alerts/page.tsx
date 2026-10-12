import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import AlertFlowDiagram from '../../components/diagrams/AlertFlowDiagram';

const SLUG = 'saved-searches-listing-alerts';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-13; the sentence relied on for each link is logged in
// docs/content/sources/saved-searches-listing-alerts.md. ftc.gov returned 404 to curl and was read
// through a page fetcher instead (noted in the log). Canada's anti-spam guidance (crtc.gc.ca)
// returned 403 and is not cited. Resend is named as one provider example because its
// documentation states the behavior precisely; this is not a recommendation of a vendor.
const ES = 'https://www.elastic.co/docs';
const PERCOLATOR = `${ES}/reference/elasticsearch/mapping-reference/percolator`;
const PERCOLATE_Q = `${ES}/reference/query-languages/query-dsl/query-dsl-percolate-query`;
const RFC8058 = 'https://www.rfc-editor.org/rfc/rfc8058.html';
const GMAIL = 'https://support.google.com/a/answer/81126?hl=en';
const GMAIL_FAQ = 'https://support.google.com/a/answer/14229414?hl=en';
const YAHOO = 'https://senders.yahooinc.com/best-practices/';
const FTC = 'https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business';
const RESEND_IDEM = 'https://resend.com/docs/dashboard/emails/idempotency-keys';
const RESEND_EVENTS = 'https://resend.com/docs/dashboard/webhooks/event-types';
const RESEND_SUPP = 'https://resend.com/docs/dashboard/emails/email-suppressions';
const DD_SAVED = 'https://dd.reso.org/DD2.0/SavedSearch/';
const DD_MOD = 'https://dd.reso.org/DD2.0/Property/ModificationTimestamp/';
const DD_PRICE_TS = 'https://dd.reso.org/DD2.0/Property/PriceChangeTimestamp/';
const DD_STATUS_TS = 'https://dd.reso.org/DD2.0/Property/StatusChangeTimestamp/';
const DD_PREV_PRICE = 'https://dd.reso.org/DD2.0/Property/PreviousListPrice/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const PG_TZ = 'https://www.postgresql.org/docs/current/datatype-datetime.html';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Five ways a listing alert fails</h2>
      <p>
        Saved searches look like a small feature: store the filters, email the user when something new matches.
        The failures show up after launch, and they are specific.
      </p>
      <ul>
        <li><strong>The missed alert.</strong> A home matched, and the buyer heard about it from another site. Usually the change was processed while the matcher was down, or the listing came to match through a price drop and only new listings were being checked.</li>
        <li><strong>The duplicate.</strong> The same home arrives twice, because a job was retried, because two of the user&apos;s searches matched, or because two MLSs carry the same property.</li>
        <li><strong>The 3 a.m. alert.</strong> The sync ran overnight and the notification went out the moment it finished, in the server&apos;s time zone.</li>
        <li><strong>The alert for a home that is gone.</strong> The digest was assembled in the morning from matches made the day before; the listing went under contract or was withdrawn in between.</li>
        <li><strong>The alert that cannot be stopped.</strong> The unsubscribe link needs a login, or stops one search while four others keep sending.</li>
      </ul>
      <p>
        A reliable alert system is one where each qualifying change produces exactly one notification per user, at
        a time that user would accept, about a listing that may still be shown, to someone who still wants it.
        Each part of that sentence is a component. This article walks through them in order. Search itself is
        covered in{' '}
        <Link href="/blog/real-estate-search-elasticsearch">designing a real estate search engine with Elasticsearch</Link>,
        and the sync that produces the changes in the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture guide</Link>.
      </p>

      <h2>The flow from a listing change to a delivery status</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><AlertFlowDiagram /></div>
        <figcaption>
          Matching runs left to right on the top row; delivery runs right to left on the bottom row. The gate is
          checked at send time, not at match time.
        </figcaption>
      </figure>
      <p>The same flow as a list:</p>
      <ol>
        <li><strong>Listing change.</strong> The sync pipeline reports that a listing is new, changed price or changed status.</li>
        <li><strong>Matcher.</strong> It reads the stored saved-search criteria and finds the searches this listing matches.</li>
        <li><strong>Dedupe.</strong> A unique key of search, listing, event type and change version allows one alert per change.</li>
        <li><strong>Alert events.</strong> The match is stored before anything is sent.</li>
        <li><strong>Scheduler.</strong> It decides between instant and digest, using the user&apos;s time zone and quiet hours.</li>
        <li><strong>Send-time gate.</strong> It checks that the listing is still displayable, the license allows it, and the user has not opted out or been suppressed.</li>
        <li><strong>Channel.</strong> Email, push or SMS, each send carrying an idempotency key.</li>
        <li><strong>Delivery status.</strong> Delivered, delayed, bounced or complained. Bounces, complaints and unsubscribes update the suppression list the gate reads.</li>
      </ol>

      <h2>Storing a saved search: criteria, not a URL</h2>
      <p>
        The shortcut is to save the search page&apos;s URL. It works until the first time the filter UI changes: a
        parameter is renamed, price steps change, a property type is split in two. Every stored URL now means
        something slightly different or nothing at all, and there is no way to query &quot;which saved searches
        include condos&quot;.
      </p>
      <p>
        Store the search as structured criteria: a document with typed fields for price range, beds, property
        types, status set, area (a named area ID or a GeoJSON polygon) and keywords. The RESO Data Dictionary has
        a resource for the idea, SavedSearch, defined as{' '}
        <Src href={DD_SAVED}>saved search criteria and related data</Src>, which is a reminder that a saved
        search is data that may need to move between systems. Four properties make the stored form hold up:
      </p>
      <ul>
        <li><strong>A criteria version.</strong> Each document records the schema version it was written in. When filters change, a migration rewrites old documents or a reader upgrades them on load. Never guess.</li>
        <li><strong>Canonical form.</strong> Sort arrays, drop empty fields, normalize units. Two users who saved the same search then have byte-identical criteria, and a hash of it lets the matcher evaluate the search once for both.</li>
        <li><strong>Absolute where it matters.</strong> &quot;Listed in the last 7 days&quot; stays relative. A drawn polygon is stored as coordinates, not as a map viewport.</li>
        <li><strong>Separate from preferences.</strong> What to match is one thing; how and when to notify (frequency, channel, paused) is another, and changes more often.</li>
      </ul>
      <p>
        The URL is still generated from the criteria for the &quot;view results&quot; link. It is an output, not
        the record.
      </p>

      <h3>An illustrative schema</h3>
      <p>Illustrative: three tables in PostgreSQL syntax, trimmed to the columns discussed in this article.</p>
      <pre className="cp-code"><code>{`CREATE TABLE saved_search (
  id               uuid PRIMARY KEY,
  user_id          uuid NOT NULL,
  name             text NOT NULL,
  criteria         jsonb NOT NULL,          -- structured filters, canonical form
  criteria_version int  NOT NULL,           -- schema version of "criteria"
  criteria_hash    text NOT NULL,           -- identical searches share one evaluation
  frequency        text NOT NULL,           -- 'instant' | 'daily' | 'off'
  channel          text NOT NULL,           -- 'email' | 'push' | 'sms'
  paused_at        timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE alert_event (
  id               uuid PRIMARY KEY,
  saved_search_id  uuid NOT NULL REFERENCES saved_search (id) ON DELETE CASCADE,
  user_id          uuid NOT NULL,
  listing_key      text NOT NULL,           -- originating system + key
  property_group   text,                    -- same home listed in two MLSs
  event_type       text NOT NULL,           -- 'new_match' | 'price_change' | 'status_change'
  change_version   bigint NOT NULL,         -- the listing version that caused it
  payload          jsonb NOT NULL,          -- old and new values needed to render
  matched_at       timestamptz NOT NULL DEFAULT now(),
  state            text NOT NULL DEFAULT 'pending',  -- 'pending' | 'sent' | 'dropped'
  dropped_reason   text,
  UNIQUE (saved_search_id, listing_key, event_type, change_version)
);

CREATE TABLE delivery (
  id               uuid PRIMARY KEY,        -- also used as the idempotency key
  user_id          uuid NOT NULL,
  channel          text NOT NULL,
  kind             text NOT NULL,           -- 'instant' | 'digest'
  alert_event_ids  uuid[] NOT NULL,
  scheduled_for    timestamptz NOT NULL,
  attempts         int NOT NULL DEFAULT 0,
  provider_id      text,
  status           text NOT NULL DEFAULT 'scheduled'
                   -- 'scheduled' | 'sent' | 'delivered' | 'delayed' | 'bounced' | 'complained' | 'canceled'
);`}</code></pre>

      <h2>Change detection: the sync pipeline decides what happened</h2>
      <p>
        An alert begins with a statement like &quot;this listing&apos;s price went from 700,000 to 640,000&quot;.
        Only the sync pipeline can make it, because only it sees the record before and after. So change detection
        belongs there: when the pipeline writes a listing, it compares the stored version with the incoming one
        and emits a typed event.
      </p>
      <p>
        Feeds do carry change fields, and it is tempting to rely on them. The RESO Data Dictionary defines{' '}
        <code>ModificationTimestamp</code> as{' '}
        <Src href={DD_MOD}>the date/time the listing was last modified</Src>,{' '}
        <code>PriceChangeTimestamp</code> as the time{' '}
        <Src href={DD_PRICE_TS}>the listing&apos;s price was last changed</Src>, and{' '}
        <code>StatusChangeTimestamp</code> likewise for status. The dictionary&apos;s own adoption figures, as
        generated on October 12, 2026, show why they cannot be the only signal:{' '}
        <Src href={DD_MOD}>100%</Src> of the organizations it lists provide the modification timestamp, but{' '}
        <Src href={DD_PRICE_TS}>92%</Src> the price change timestamp,{' '}
        <Src href={DD_STATUS_TS}>70%</Src> the status change timestamp and{' '}
        <Src href={DD_PREV_PRICE}>64%</Src> the previous list price. A modification timestamp alone says that
        something changed, which includes a corrected typo or a reordered photo. Your own before-and-after
        comparison works for every feed.
      </p>
      <p>Rules we would build into the detector:</p>
      <ul>
        <li><strong>Events are typed and carry both values.</strong> New listing, price change (old and new), status change (old and new). Decide which transitions matter: &quot;back on market&quot; is news; &quot;active to pending&quot; is news to someone who saved the home, not to someone searching.</li>
        <li><strong>Bulk operations are silent.</strong> An initial load, a backfill, a re-normalization or a search reindex touches every record. None of those is a change in the market. Tag pipeline runs and emit events only from incremental sync, or the first rebuild sends every user every listing.</li>
        <li><strong>The event follows the commit.</strong> Emit after the listing is written, and let the matcher read the committed record. An alert that links to a page still showing the old price is a bug report.</li>
        <li><strong>Each event has a version.</strong> A monotonically increasing version per listing (the feed&apos;s modification timestamp works) identifies the change. Everything downstream uses it to recognize a repeat.</li>
      </ul>

      <h2>Matching: re-run the searches, or reverse-match the listing</h2>
      <p>There are two ways to find out which saved searches a change concerns, and they scale in opposite directions.</p>
      <h3>Re-running each saved search on a schedule</h3>
      <p>
        Every N minutes, for each saved search, run its query with an extra condition, &quot;changed since the last
        run&quot;, and record the hits. It reuses the search engine you already have and is easy to reason about. Its
        cost is proportional to the number of saved searches, whether or not anything changed, and its latency is
        the schedule interval. Grouping by criteria hash helps, because popular searches are saved many times.
      </p>
      <h3>Reverse matching each changed listing</h3>
      <p>
        Turn the question around: store the searches as queries, and ask of each changed listing, which of these
        match? Elasticsearch has a field type for it. The percolator field{' '}
        <Src href={PERCOLATOR}>parses a json structure into a native query and stores that query, so that the percolate query can use it to match provided documents</Src>;
        the percolate query <Src href={PERCOLATE_Q}>can be used to match queries stored in an index</Src>. Cost is
        now proportional to the number of changes, and a match can be known seconds after the sync writes the
        record. The documentation adds details that shape the design:
      </p>
      <ul>
        <li>
          <Src href={PERCOLATOR}>Fields referred to in a percolator query must already exist in the mapping associated with the index used for percolation</Src>.
          The saved-search index needs the listing mapping, and both must change together.
        </li>
        <li>
          Queries can live in{' '}
          <Src href={PERCOLATOR}>a dedicated percolator index</Src> with its own settings, but then{' '}
          <Src href={PERCOLATOR}>you need to make sure that the mappings from the normal index are also available on the percolate index</Src>.
        </li>
        <li>
          Several listings can be checked at once, and doing so{' '}
          <Src href={PERCOLATE_Q}>can improve performance as queries only need to be parsed and matched once instead of multiple times</Src>.
          A sync batch maps naturally onto one percolate request.
        </li>
        <li>
          Scores are irrelevant here, and{' '}
          <Src href={PERCOLATE_Q}>better performance can be expected by wrapping the percolator query in a bool query&apos;s filter clause</Src>.
        </li>
        <li>
          <Src href={PERCOLATOR}>Reindexing percolator queries is sometimes required</Src> after upgrades. Another
          reason the criteria document, not the stored query, is the source of truth.
        </li>
      </ul>
      <p>
        Reverse matching does not require a search engine. For criteria that are mostly ranges and sets, a
        relational table of saved searches with indexed columns can be queried with the listing&apos;s values as
        parameters. It runs out of road with keywords and polygons, which is where the percolator earns its place.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th></th><th>Scheduled re-run</th><th>Reverse matching</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Work grows with</strong></td><td>Number of saved searches</td><td>Number of listing changes</td></tr>
            <tr><td><strong>Latency</strong></td><td>The schedule interval</td><td>Shortly after the sync writes the change</td></tr>
            <tr><td><strong>Extra moving parts</strong></td><td>None beyond the search you have</td><td>A stored-query index kept in step with the listing mapping and the criteria</td></tr>
            <tr><td><strong>Detecting &quot;now matches after a change&quot;</strong></td><td>Needs a record of what was already alerted</td><td>Evaluate the old and new versions and compare</td></tr>
            <tr><td><strong>Fits</strong></td><td>Daily digests; a modest number of saved searches</td><td>Instant alerts; many saved searches; frequent sync</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Many platforms end up with both: reverse matching for instant alerts, and a nightly scheduled pass as a
        safety net that catches anything the event path missed and writes it through the same dedupe key.
      </p>

      <h3>What &quot;matches&quot; means when a listing changes</h3>
      <p>
        The subtle case is a change that moves a listing into or out of a search. A home drops from 700,000 to
        640,000; a search has a maximum of 650,000. For that user this is not a price change on a home they knew
        about, it is a new result. The matcher therefore evaluates both versions of the listing:
      </p>
      <ul>
        <li>Matches now, did not before: a <strong>new match</strong>, whatever the underlying event was.</li>
        <li>Matched before and still matches, and the price or status changed: a <strong>change on a known match</strong>.</li>
        <li>Matched before, does not now: nothing to send, but pending alerts for it should be reconsidered at the gate.</li>
      </ul>
      <p>Illustrative pseudocode for the matcher:</p>
      <pre className="cp-code"><code>{`// Illustrative pseudocode. Runs once per batch of committed listing changes.
function matchBatch(changes):
  for change in changes:
    if change.run_type != "incremental":        // initial loads and rebuilds are silent
      continue

    listing_now    = change.after
    listing_before = change.before               // null for a brand-new listing

    if not displayable(listing_now):             // removed, opted out, outside license scope
      dropPendingAlertsFor(listing_now.key)
      continue

    now    = searchesMatching(listing_now)       // percolate, or indexed lookup
    before = listing_before ? searchesMatching(listing_before) : {}

    for search in now:
      if search.paused or search.frequency == "off":
        continue

      if search not in before:
        type = "new_match"
      else if change.kind in ("price_change", "status_change"):
        type = change.kind
      else:
        continue                                 // matched before, nothing newsworthy changed

      // The unique key makes this safe to run twice.
      insertIgnoreDuplicate(alert_event,
        saved_search_id = search.id,
        user_id         = search.user_id,
        listing_key     = listing_now.key,
        property_group  = listing_now.property_group,
        event_type      = type,
        change_version  = change.version,
        payload         = { before: summary(listing_before), after: summary(listing_now) })`}</code></pre>

      <h2>Deduplication at three levels</h2>
      <p>Duplicates have three different causes and need three different guards.</p>
      <ul>
        <li>
          <strong>The same work done twice.</strong> A job retried after a timeout, a webhook delivered again, the
          nightly safety net finding what the event path already found. The unique constraint on (search, listing,
          event type, change version) turns the second insert into a no-op. This is why the event is stored
          before anything is sent: the database, not the worker&apos;s memory, decides what is new. Queue-level
          retries and idempotent jobs are covered in{' '}
          <Link href="/blog/background-jobs-redis-bullmq">background jobs with Redis and BullMQ</Link>.
        </li>
        <li>
          <strong>The same home, several reasons.</strong> One user has three searches that all match, or the same
          property is listed in two MLSs. The user should get one mention. Collapse at assembly time: group a
          user&apos;s pending events by property group (or listing key where there is no group), keep one, and
          list the matching search names under it. Both listing records stay in your data, as the pipeline guide
          explains; only the notification is merged.
        </li>
        <li>
          <strong>The same home, changing repeatedly.</strong> A price corrected twice in an hour, a status that
          flips and flips back. For a digest, show the net change from what the user last saw to the current
          state, and nothing at all if they are equal. For instant alerts, a short per-listing cool-down prevents
          a burst.
        </li>
      </ul>

      <h2>Scheduling: instant, digest, time zones and quiet hours</h2>
      <p>
        Matching answers what; scheduling answers when. Keep them apart, so that a matcher that runs at 03:00 has
        no way to send anything at 03:00.
      </p>
      <ul>
        <li>
          <strong>Frequency is per search.</strong> A buyer may want instant alerts for one narrow search and a
          daily summary for a broad one. &quot;Instant&quot; still passes through the scheduler; it means
          &quot;as soon as allowed&quot;.
        </li>
        <li>
          <strong>Store a time zone name, not an offset.</strong> A fixed offset is wrong for half the year
          wherever daylight saving applies. Store the IANA zone name (for example America/Chicago) on the user and
          let the database or library do the conversion; PostgreSQL, for one,{' '}
          <Src href={PG_TZ}>uses the widely-used IANA (Olson) time zone database</Src> and notes that zone rules
          are <Src href={PG_TZ}>prone to arbitrary changes, particularly with respect to daylight-savings rules</Src>.
          Default the zone from the market being searched when the user has not set one.
        </li>
        <li>
          <strong>Quiet hours hold, they do not drop.</strong> An instant alert matched during the user&apos;s
          quiet window is scheduled for the window&apos;s end. If several accumulate, send them as one message.
        </li>
        <li>
          <strong>Digests are assembled at send time.</strong> At the user&apos;s local send hour, gather pending
          events, apply the three dedupe rules, re-read each listing&apos;s current state, and build the message
          from that. A digest built from yesterday&apos;s snapshot is how the alert for a home that is gone gets
          sent.
        </li>
        <li>
          <strong>Empty means silent.</strong> No &quot;no new listings today&quot; message. And cap the total
          per user per day; a search that matches four hundred changes should produce a summary with a link, not
          four hundred items.
        </li>
        <li>
          <strong>Spread the load.</strong> Everyone in a time zone choosing 08:00 creates a spike for your sender
          and your site. Scheduling within a window around the chosen hour smooths it.
        </li>
      </ul>

      <h2>Preferences and unsubscribe</h2>
      <p>
        Listing alerts are mail a person subscribed to, and mailbox providers have rules for that. Google&apos;s
        guidelines say senders of more than 5,000 messages a day to Gmail must ensure that{' '}
        <Src href={GMAIL}>marketing messages and subscribed messages must support one-click unsubscribe, and include a clearly visible unsubscribe link in the message body</Src>.
        Its FAQ clarifies that <Src href={GMAIL_FAQ}>transactional messages are excluded from this requirement</Src>,
        with password resets and confirmations as examples; an alert about new listings is not in that group, so
        we would treat it as subscribed mail from the start. Yahoo asks bulk senders for{' '}
        <Src href={YAHOO}>a functioning list-unsubscribe header, which supports one-click unsubscribe for marketing and subscribed messages</Src>.
      </p>
      <p>The mechanism is defined in RFC 8058, and its requirements are precise:</p>
      <ul>
        <li>
          The sender <Src href={RFC8058}>places one List-Unsubscribe header field and one List-Unsubscribe-Post header field in the message</Src>.
          The first <Src href={RFC8058}>MUST contain one HTTPS URI</Src>; the second{' '}
          <Src href={RFC8058}>MUST contain the single key/value pair &quot;List-Unsubscribe=One-Click&quot;</Src>.
        </li>
        <li>
          The message <Src href={RFC8058}>MUST have a valid DomainKeys Identified Mail (DKIM) signature that covers at least the List-Unsubscribe and List-Unsubscribe-Post headers</Src>.
        </li>
        <li>
          The URI <Src href={RFC8058}>MUST contain enough information to identify the mail recipient and the list</Src>,
          and the request <Src href={RFC8058}>MUST NOT include cookies, HTTP authorization, or any other context information</Src>.
          In practice: a signed token in the URL, no login, and an endpoint that acts on a POST.
        </li>
      </ul>
      <p>
        Deadlines differ by source, so build to the shortest. US law, in the FTC&apos;s summary of the CAN-SPAM
        Act, says <Src href={FTC}>you must honor a recipient&apos;s opt-out request within 10 business days</Src>.
        Yahoo says to <Src href={YAHOO}>honor unsubscribes within 2 days</Src>, and Google&apos;s FAQ lists{' '}
        <Src href={GMAIL_FAQ}>unsubscribe requests aren&apos;t honored within 48 hours</Src> among the conditions
        under which it withholds delivery support. With a send-time gate, the practical answer is immediately:
        the opt-out is a row the gate reads before the next send, including for digests already scheduled.
      </p>
      <p>Design choices that follow:</p>
      <ul>
        <li><strong>What the header unsubscribes from.</strong> We would make the one-click header stop all listing-alert email for that address. A person who presses the mail client&apos;s unsubscribe button and then receives an alert from a different saved search will press &quot;spam&quot; next. Finer control belongs on the preference page linked in the body.</li>
        <li><strong>Preferences without a login.</strong> The body link opens a page, authorized by the same kind of token, where each search can be paused, switched to a digest or deleted. Yahoo asks for <Src href={YAHOO}>an obvious and visible unsubscribe process that doesn&apos;t require users to log in</Src>.</li>
        <li><strong>Opt-out is per channel and outlives the search.</strong> Deleting and recreating a search must not re-subscribe an address that opted out. Push and SMS have their own consent rules, which this article does not cover.</li>
        <li><strong>Agents are not exempt.</strong> On platforms where an agent sets up a search for a client, the client is the recipient, and the client&apos;s opt-out wins.</li>
      </ul>

      <h2>Delivery failures: bounces, suppression and safe retries</h2>
      <p>
        Handing a message to a provider is not delivery. Providers report what happened afterwards as events, and
        the alert system has to consume them. Using Resend&apos;s documentation as one example of the vocabulary:
        a bounce means <Src href={RESEND_EVENTS}>the recipient&apos;s mail server permanently rejected the email</Src>;
        a delivery delay means it <Src href={RESEND_EVENTS}>couldn&apos;t be delivered due to a temporary issue</Src>;
        and there are separate events for complaints and for mail the provider suppressed. Other providers use
        different names for the same four ideas.
      </p>
      <ul>
        <li>
          <strong>Permanent failure: stop.</strong> A hard bounce or a complaint suppresses the address for alerts.
          Providers keep their own list (Resend describes its list as{' '}
          <Src href={RESEND_SUPP}>intentionally skipping sending to any addresses on your list</Src>), but keep
          yours too. Your gate should not schedule mail the provider will discard, and your record survives a
          change of provider. Note the caveat in the same documentation:{' '}
          <Src href={RESEND_SUPP}>not all Inbox Service Providers return a complained event, most notably, Gmail/Google Workspace</Src>.
          Complaint rates for Gmail are read in Google&apos;s own tools, where the guideline is to{' '}
          <Src href={GMAIL}>keep spam rates reported in Postmaster Tools below 0.3%</Src>.
        </li>
        <li>
          <strong>Temporary failure: let the provider retry.</strong> A delayed delivery is the provider still
          trying. Record it; do not send a second copy.
        </li>
        <li>
          <strong>Failure to hand over: retry with an idempotency key.</strong> If the API call times out, you do
          not know whether the message was accepted. Retrying blind is how duplicates are born. An idempotency key
          makes the retry safe. In Resend&apos;s case, the API{' '}
          <Src href={RESEND_IDEM}>checks whether an email with the same idempotency key has already been sent in the last 24 hours</Src>,
          and keys <Src href={RESEND_IDEM}>can be up to 256 characters and must be unique per API request</Src>.
          Use the delivery row&apos;s ID as the key, so one planned message can only ever become one email.
        </li>
        <li>
          <strong>Know the window.</strong> A provider&apos;s key memory is finite (24 hours in that example). Cap
          your own retries well inside it, and after that treat the delivery as failed rather than retrying into
          a window where the key no longer protects you. The delivery table, with its status and attempt count, is
          the real guard.
        </li>
        <li>
          <strong>Status events can repeat and arrive out of order.</strong> Apply them idempotently, keyed by the
          provider&apos;s message ID, and never move a delivery backward from a final state.
        </li>
      </ul>

      <h2>What must stop an alert</h2>
      <p>
        Between a match and a send, minutes or a day can pass. The send-time gate re-checks everything that could
        have changed, and each check has a reason.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Condition at send time</th><th>Action</th><th>Why</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>The listing was removed from the feed</td>
              <td>Drop the event</td>
              <td>
                Removal is not optional. On MLS Grid, for example, when <code>MlgCanView</code> changes to false the
                record <Src href={GRID_V2}>is no longer valid for the feed type you consume and must be removed from your local data store</Src>.
                An email about it would display data you no longer hold a right to show.
              </td>
            </tr>
            <tr>
              <td>The listing&apos;s status is no longer one this search or this surface may show</td>
              <td>Drop, or convert to a status-change alert if the user saved that home</td>
              <td>Which statuses may be displayed, and to whom, is a license matter</td>
            </tr>
            <tr>
              <td>The license for the feed does not cover this use</td>
              <td>Never match it in the first place; drop if it slips through</td>
              <td>An email is a display surface. Whether a given license type permits listing data in email to a registered consumer is for your MLS agreement to answer; check it per feed</td>
            </tr>
            <tr>
              <td>The seller opted the listing or its address out of internet display</td>
              <td>Apply the same display policy as the website</td>
              <td>The opt-out fields apply to what you send as much as to what you serve</td>
            </tr>
            <tr>
              <td>The listing no longer matches the search</td>
              <td>Drop</td>
              <td>The price went back up, or the user edited the search</td>
            </tr>
            <tr>
              <td>The search is paused or deleted, or the account is closed</td>
              <td>Cancel pending events and deliveries</td>
              <td>Deleting a search should take effect on the next send, not after the queue drains</td>
            </tr>
            <tr>
              <td>The address is unsubscribed or suppressed</td>
              <td>Cancel</td>
              <td>The deadlines in the previous section</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        One more consequence of removal rules: an email, once sent, cannot be recalled. Keep the message thin. A
        photo served from your own storage, the headline facts, and a link to the live listing page mean that when
        a listing is later removed, the image can be withdrawn and the link leads to a page that returns the right
        status. What those pages should return is covered in{' '}
        <Link href="/blog/listing-lifecycle-sold-expired-deleted">handling sold, expired and deleted listings</Link>.
      </p>

      <h2>Signals to monitor</h2>
      <ul className="cp-checklist">
        <li>Match lag: time from a listing change being committed to its alert events being written.</li>
        <li>Changes processed against changes emitted, per sync run; a gap is a missed alert.</li>
        <li>Inserts rejected by the dedupe key; a sudden rise means something upstream is repeating.</li>
        <li>Events dropped at the gate, by reason.</li>
        <li>Alert events per run compared with a ceiling; a bulk operation leaking events trips it before users see it.</li>
        <li>Deliveries by final status, with bounce and complaint rates per sending domain.</li>
        <li>Unsubscribes per message sent, by search type; a spike points at a noisy alert.</li>
        <li>Deliveries scheduled inside a user&apos;s quiet hours: expected to be zero.</li>
        <li>Time from an unsubscribe request to the last message sent to that address: expected to be zero.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should a saved search be stored as a URL?', answer: ['No. Store it as structured criteria with a schema version, and generate the URL from it. A URL breaks when filter names or values change and cannot be queried or migrated. The RESO Data Dictionary treats it as data too: its SavedSearch resource holds ', ['saved search criteria and related data', DD_SAVED], '.'] },
        { question: 'Is the Elasticsearch percolator required for listing alerts?', answer: ['No. Re-running each saved search on a schedule works for digests and modest volumes. The percolator suits instant alerts at scale because it reverses the lookup: it ', ['can be used to match queries stored in an index', PERCOLATE_Q], ' against each changed listing. It needs the listing mapping on the stored-query index, since ', ['fields referred to in a percolator query must already exist in the mapping', PERCOLATOR], '.'] },
        { question: 'How do we stop the same listing from being alerted twice?', answer: ['Write every match as a row with a unique key of search, listing, event type and change version before sending anything, so a repeated job cannot create a second alert. Collapse one user’s matches for the same property when assembling the message, and send through the provider with an idempotency key; Resend, for example, ', ['checks whether an email with the same idempotency key has already been sent in the last 24 hours', RESEND_IDEM], '.'] },
        { question: 'Do listing alert emails need one-click unsubscribe?', answer: ['Treat them as subscribed mail. Google requires that, for senders of more than 5,000 messages a day, ', ['marketing messages and subscribed messages must support one-click unsubscribe', GMAIL], ', and RFC 8058 defines the headers: a List-Unsubscribe header that ', ['MUST contain one HTTPS URI', RFC8058], ' and a List-Unsubscribe-Post header.'] },
        { question: 'What happens to a pending alert when the listing is removed?', answer: ['It must not be sent. Re-check every listing at send time, not only when it matched. On MLS Grid, for example, a record whose MlgCanView becomes false ', ['must be removed from your local data store', GRID_V2], ', and an alert is a display of that record.'] },
      ]} />

      <p className="cp-note">
        Sources were read on October 13, 2026: Elastic, RFC 8058, Google and Yahoo sender guidelines, Resend,
        PostgreSQL, MLS Grid and the RESO Data Dictionary (whose pages were generated October 12, 2026). The FTC
        page was read through a page fetcher. Canada&apos;s anti-spam rules, and the consent rules for SMS and
        push, were not checked for this article and are not summarized. Sender requirements and MLS rules change;
        your MLS agreements decide what listing data may be sent to whom. This is engineering guidance, not legal
        advice. The schema and pseudocode are illustrative.
      </p>
      <p>
        Building saved searches and alerts on MLS data? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
