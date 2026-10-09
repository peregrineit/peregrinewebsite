import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import MlsPipelineDiagram, { STAGES, lowerFirst } from '../../components/diagrams/MlsPipelineDiagram';

const SLUG = 'mls-data-pipeline-architecture';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-10; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-mls-data-pipeline-architecture.md. NAR's policy handbook
// required a member login on that date, so display rules are cited from MLS Grid's public
// IDX Rules instead. Bridge's documentation did not render without scripts and is not cited.
const RESO_CORE = 'https://transport.reso.org/proposals/web-api-core/';
const RESO_API = 'https://www.reso.org/reso-web-api/';
const RESO_EVENTS = 'https://transport.reso.org/proposals/entity-events/';
const RESO_UPI = 'https://www.reso.org/universal-parcel-identifier/';
const DD = 'https://dd.reso.org/';
const DD_LISTING_KEY = 'https://dd.reso.org/DD2.0/Property/ListingKey/';
const DD_LISTING_ID = 'https://dd.reso.org/DD2.0/Property/ListingId/';
const DD_ORIG_KEY = 'https://dd.reso.org/DD2.0/Property/OriginatingSystemKey/';
const DD_STATUS = 'https://dd.reso.org/DD2.0/Property/StandardStatus/';
const DD_MLS_STATUS = 'https://dd.reso.org/DD2.0/Property/MlsStatus/';
const DD_UPI = 'https://dd.reso.org/DD2.0/Property/UniversalPropertyId/';
const DD_NET_LISTING = 'https://dd.reso.org/DD2.0/Property/InternetEntireListingDisplayYN/';
const DD_NET_ADDRESS = 'https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_BP = 'https://www.mlsgrid.com/s/MLS-Grid-Best-Practices-Guide-2.pdf';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const GRID_AI = 'https://www.mlsgrid.com/s/MLS-Grid-AI-Use-Addendum.pdf';
const GRID_UA = 'https://docs.mlsgrid.com/recent-releases/changes-to-mls-grid-media-access';
const GRID_MARIS = 'https://docs.mlsgrid.com/recent-releases/maris-mls-migration-to-new-mls-system-and-new-originatingsystemname';
const GRID_MRED = 'https://docs.mlsgrid.com/recent-releases/mred-idx-and-vow-rules-changes';
const TRESTLE_API = 'https://trestle-documentation.corelogic.com/web-api/';
const TRESTLE_REF = 'https://trestle-documentation.corelogic.com/web-api/reference/';
const TRESTLE_SCALE = 'https://trestle-documentation.corelogic.com/web-api/at-scale/';
const STELLAR = 'https://www.stellarmls.com/data-delivery';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        An MLS integration is a replication system, not a set of API calls. RESO describes the pattern:{' '}
        <Src href={RESO_API}>replicators initially pull an entire data set, and then continually request the most recent data changes</Src>.
        A design that holds up has nine parts: a connector per feed, replication jobs with a stored cursor, a raw
        store, normalization to the RESO Data Dictionary, a separate media worker, a canonical store, duplicate
        linking across boards, a display-policy filter, and a search index that can be rebuilt. Compliance and
        monitoring are attached to specific stages, not added at the end.
      </p>
      <p>
        This guide is the design reference. For what changes between RETS and the Web API, see{' '}
        <Link href="/blog/reso-web-api-vs-rets">RESO Web API vs RETS</Link>; for licenses and approval, see{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>.
      </p>

      <h2>The reference architecture</h2>
      <MlsPipelineDiagram />
      <p>The same architecture as a list:</p>
      <ol>
        {STAGES.map((s) => (
          <li key={s.n}>
            <strong>{s.name}.</strong> {s.text}
            {s.check && <> <em>Compliance checkpoint:</em> {lowerFirst(s.check)}.</>}
            {s.signal && <> <em>Monitoring signal:</em> {lowerFirst(s.signal)}.</>}
          </li>
        ))}
      </ol>
      <p>
        Two properties matter more than the choice of database. First, every stage after the raw store can be
        re-run from stored data, so a mapping fix or a rule change does not need a new download. Second, each feed
        runs on its own: its own credentials, cursor, queue and error budget, so one board&apos;s outage does not
        stop the others.
      </p>

      <h2>1. Connector: authentication, paging and rate limits</h2>
      <p>
        The transport is fixed by the standard. The RESO Web API uses{' '}
        <Src href={RESO_CORE}>the OAuth2 Bearer Token and Client Credentials standards for authorization</Src>,
        requires <Src href={RESO_CORE}>TLS 1.2 or above</Src>, and says providers{' '}
        <Src href={RESO_CORE}>must support server-driven paging using @odata.nextLink</Src>. So the paging loop is
        the same everywhere: request, store, follow the next link until there is none.
      </p>
      <p>What differs per platform is the budget, and the connector has to enforce it:</p>
      <ul>
        <li>
          <strong>Tokens.</strong> A Trestle token is <Src href={TRESTLE_API}>good for up to 8 hours</Src>, and
          Trestle recommends <Src href={TRESTLE_API}>caching the token and its expiration and refreshing it only when necessary</Src>.
          MLS Grid issues <Src href={GRID}>long term tokens</Src> from its web application.
        </li>
        <li>
          <strong>Request limits.</strong> MLS Grid allows{' '}
          <Src href={GRID}>no more than 2 requests per second, 7,200 requests in any hour, 4 GB downloaded in any hour and 40,000 requests per 24-hour period</Src>.
          Trestle&apos;s baseline is <Src href={TRESTLE_API}>7,200 queries per hour and 180 queries per minute</Src>.
        </li>
        <li>
          <strong>What happens when you exceed them.</strong> On MLS Grid a suspended token{' '}
          <Src href={GRID}>receives an HTTP 429 error in response to any requests</Src> until usage falls back
          within the limits. Trestle also answers with 429 and recommends{' '}
          <Src href={TRESTLE_SCALE}>an exponential wait between retries</Src>.
        </li>
        <li>
          <strong>Concurrency.</strong> MLS Grid tells consumers{' '}
          <Src href={GRID_BP}>not to send more than one replication request at a time</Src>, because replication
          requests must be in sequential order. Parallelism belongs across feeds, not inside one.
        </li>
      </ul>
      <p>
        In practice: one worker per feed and resource, a token-bucket limiter set below the published limit, and
        backoff that treats 429 as a signal to slow the whole feed rather than to retry one request.
      </p>

      <h2>2. Initial replication</h2>
      <p>
        The first load is the largest job the pipeline will run, and it should be resumable. MLS Grid&apos;s
        guidance is explicit: order is by ModificationTimestamp, so after an error you{' '}
        <Src href={GRID_V2}>continue where you left off by adding the ModificationTimestamp that you last received</Src>{' '}
        to the query. It asks for the initial query to filter on{' '}
        <Src href={GRID_V2}>MlgCanView equal to true</Src>, so deleted records are not loaded, and for{' '}
        <Src href={GRID_V2}>a single OriginatingSystemName in every request</Src>, which means one load per MLS.
        A request returns <Src href={GRID_V2}>at most 5,000 records, or 1,000 when $expand is used</Src>. Its
        best-practices guide also says to <Src href={GRID_BP}>ask support for a grace period in advance</Src> if
        the initial import will exceed the normal limits.
      </p>
      <p>
        Trestle works differently at volume. A normal query returns{' '}
        <Src href={TRESTLE_REF}>a maximum of 1,000 records</Src>; for{' '}
        <Src href={TRESTLE_REF}>more than 1,000,000 records you need the replication endpoint</Src>. That endpoint
        is not resumable: <Src href={TRESTLE_REF}>if the process fails part way through, you have to restart it</Src>,
        and its <Src href={TRESTLE_REF}>links expire after 5 minutes of inactivity</Src>. Write each page to the
        raw store as it arrives so a slow downstream step can never stall the download.
      </p>

      <h2>3. Incremental sync and removals</h2>
      <p>
        After the first load, each run asks for records changed since the cursor. Three details decide whether the
        copy stays correct.
      </p>
      <p>
        <strong>The cursor is a value you received, not your clock.</strong> Trestle recommends{' '}
        <Src href={TRESTLE_SCALE}>tracking the latest value you received, so clock differences do not cause you to miss updates</Src>.
        MLS Grid says the same, and adds that if you store only part of the data, the cursor must still be{' '}
        <Src href={GRID_V2}>the greatest ModificationTimestamp you have received, whether or not you store the record</Src>.
        It also warns against <Src href={GRID_BP}>range queries on ModificationTimestamp</Src>: use &ldquo;greater
        than the cursor&rdquo; only.
      </p>
      <p>
        <strong>Know whose timestamp it is.</strong> On MLS Grid, ModificationTimestamp is{' '}
        <Src href={GRID}>the time the record was modified by MLS Grid</Src>; the MLS&apos;s own time is in
        OriginatingSystemModificationTimestamp. On Trestle a record&apos;s timestamp can move{' '}
        <Src href={TRESTLE_SCALE}>because mappings or enumerations that affect it were updated</Src>, not only
        because the listing changed. Both mean a large batch of &ldquo;changes&rdquo; can arrive with no agent
        having touched a listing. Trestle names this directly:{' '}
        <Src href={TRESTLE_SCALE}>being prepared for mass updates is important</Src>.
      </p>
      <p>
        <strong>Removals do not arrive the same way on every platform.</strong> MLS Grid flags them: when{' '}
        <Src href={GRID_V2}>MlgCanView changes to false, the record must be removed from your local data store</Src>,
        and <Src href={GRID_V2}>after 7 days such records are removed from the feed entirely</Src>. A sync that is
        down for longer than that will never see those removals, so it needs a full comparison when it comes back.
        Trestle&apos;s incremental feed does not report removals at all; you{' '}
        <Src href={TRESTLE_SCALE}>query for all of the keys and remove any records that do not match</Src>, and a
        key-only query can return <Src href={TRESTLE_REF}>up to 300,000 records</Src> at a time.
      </p>
      <p>
        How often to run is a platform answer too. MLS Grid says a replication request{' '}
        <Src href={GRID_BP}>once every 15 minutes is sufficient</Src>; Trestle suggests{' '}
        <Src href={TRESTLE_SCALE}>every few minutes to every hour</Src>. RESO has ratified an event-based
        alternative to timestamp polling, the{' '}
        <Src href={RESO_EVENTS}>EntityEvent resource, with a sequence number that can only increase</Src>, which
        removes the timestamp problems above where a provider offers it.
      </p>

      <h2>4. Media</h2>
      <p>
        Photos need their own design, and on MLS Grid the rules changed in 2026:
      </p>
      <ul>
        <li>
          You <Src href={GRID}>must maintain your own copy of all media files</Src>, and the URLs are{' '}
          <Src href={GRID}>only for downloading a local copy, not for use on your website or in your application</Src>.
        </li>
        <li>
          From <Src href={GRID}>September 8, 2026, media is served from media.mlsgrid.com</Src> with URLs that are{' '}
          <Src href={GRID}>signed, single-use and expire one hour after they are generated</Src>. A second
          download attempt within the hour <Src href={GRID}>returns a 429 error</Src>.
        </li>
        <li>
          Every media download must send{' '}
          <Src href={GRID_UA}>a User-Agent header whose value is your OAuth 2 access token</Src>, required from June 1, 2026.
        </li>
        <li>
          Media is never edited in place: <Src href={GRID_V2}>a change issues a new MediaKey and Media URL</Src>,
          and <Src href={GRID_V2}>PhotosChangeTimestamp</Src> on the listing tells you the set changed.
        </li>
      </ul>
      <p>
        Those four facts dictate the design. The media worker takes the URL from the replication response and
        downloads straight away, inside the hour; it never stores a URL to fetch later. A failed download is
        retried by asking the API for the record again, not by replaying the URL. Work is keyed by MediaKey, so a
        photo is fetched once and a missing key means a deletion.
      </p>
      <p>
        On Trestle, media URLs have <Src href={TRESTLE_API}>their own quota of 18,000 requests per hour and 480 per minute</Src>,
        separate from data queries. Trestle notes this suits{' '}
        <Src href={TRESTLE_SCALE}>downloading primary photos first and secondary photos when they are requested</Src>.
        Either way, media runs on its own queue with its own limiter, so a backlog of photos cannot delay price and
        status changes.
      </p>

      <h2>5. Normalization to the Data Dictionary</h2>
      <p>
        The target schema is the RESO Data Dictionary. <Src href={DD}>DD 2.0 is the current version for RESO certification</Src>,
        with <Src href={DD}>41 resources, 1,745 fields and 3,683 lookups</Src>; a 2.1 draft is in development.
        A platform that converts for you still leaves work:
      </p>
      <ul>
        <li>
          <strong>Names are converted, values mostly are not.</strong> MLS Grid&apos;s conversion{' '}
          <Src href={GRID}>concerns itself with field names and, where applicable, Data Dictionary lookups</Src>.
          Anything else arrives as the MLS wrote it.
        </li>
        <li>
          <strong>Local fields survive.</strong> MLS Grid keeps non-conforming fields and{' '}
          <Src href={GRID_V2}>prefixes them to identify which MLS they come from</Src>. Store them in a per-MLS
          namespace instead of dropping them: a field dropped today has to be re-imported to add later.
        </li>
        <li>
          <strong>Records are sparse.</strong> On MLS Grid{' '}
          <Src href={GRID}>each record contains only the fields converted from its originating MLS</Src>. A
          missing field is normal, not an error.
        </li>
        <li>
          <strong>Time zones are mixed.</strong> Date fields converted to a Data Dictionary field{' '}
          <Src href={GRID}>are in UTC; dates passed through as local fields keep their original representation</Src>.
        </li>
        <li>
          <strong>Status needs two fields.</strong> StandardStatus is{' '}
          <Src href={DD_STATUS}>a locked list of 11 values</Src>. MlsStatus is the local status, and{' '}
          <Src href={DD_MLS_STATUS}>each MlsStatus must map to a single StandardStatus</Src>. Filter and count on
          the first; show the second where the board&apos;s wording matters.
        </li>
      </ul>
      <p>
        Keep the mapping as versioned configuration per originating system, and expect it to be replaced. When
        MARIS moved to a new MLS system, MLS Grid published it under{' '}
        <Src href={GRID_MARIS}>a new OriginatingSystemName and told every consumer to run a new initial import</Src>,
        with <Src href={GRID_MARIS}>new local-field and key prefixes</Src>. A pipeline that treats &ldquo;one
        MLS&rdquo; as a fixed schema has to be rewritten for that; one that treats each originating system as a
        loadable source just adds a source and retires the old one.
      </p>

      <h2>6. Identity and duplicates across boards</h2>
      <p>
        Three identifiers do three jobs. ListingKey is{' '}
        <Src href={DD_LISTING_KEY}>a unique identifier for the record from the immediate source</Src>. ListingId is
        the number people quote, and RESO warns that{' '}
        <Src href={DD_LISTING_ID}>in a merged system it may not be unique</Src>. OriginatingSystemKey is the key{' '}
        <Src href={DD_ORIG_KEY}>from the system with authoritative control over the record</Src>. The primary key
        of the canonical store is therefore the pair of originating system and key, never the listing number
        alone. On MLS Grid, key fields carry an MLS prefix that{' '}
        <Src href={GRID_V2}>should be removed before displaying externally but added back when requesting records</Src>,
        so store both forms.
      </p>
      <p>
        The harder problem is one property listed in two MLSs. RESO&apos;s answer is the Universal Parcel
        Identifier, created so that property data does not depend on{' '}
        <Src href={RESO_UPI}>addresses and standalone parcel numbers for identification</Src>. But the Data
        Dictionary page for UniversalPropertyId shows{' '}
        <Src href={DD_UPI}>usage adoption of 21%, 90 of 420 organizations</Src>, so you cannot rely on it being
        present. A workable order of evidence:
      </p>
      <ol>
        <li>UniversalPropertyId, where both records carry it.</li>
        <li>Parcel number plus county or region.</li>
        <li>A normalized address (unit included) plus coordinates within a small distance.</li>
        <li>Listing-level agreement as a tie-breaker: same listing office, price and status dates.</li>
      </ol>
      <p>
        Link duplicates into a group; do not merge or delete. Each record still belongs to its board, with that
        board&apos;s attribution and removal rules, and a wrong match must be reversible. Choose which record to
        show by a written rule (for example, the board the viewing brokerage belongs to). MLS Grid&apos;s IDX
        rules also require that where MLS data is shown with data from other sources,{' '}
        <Src href={GRID_IDX}>the source of the information is prominently identified</Src>, so the source has to
        survive every later stage.
      </p>

      <h2>7. Search index and read path</h2>
      <p>
        The index is a derived copy. Build it only from records that passed the display-policy filter, and make a
        full rebuild from the canonical store a routine job, because rule changes and mapping fixes both need it.
        Index removals in the same run that applies them to the store.
      </p>
      <p>
        Two of our published projects show this shape. The{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        MongoDB as the source of truth, Elasticsearch for search and Redis as a cache, a sync engine rewritten with
        delta detection, retry logic and per-feed error isolation, and property detail pages read directly from
        the database. The <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> describes
        a pipeline that ingests from four MLS systems, normalizes schemas and deduplicates cross-listed properties.
      </p>

      <h2>8. Compliance checkpoints</h2>
      <p>
        Display and license rules are enforced by code at fixed points, so they cannot be skipped by a new page or
        a new API route. The rules below are MLS Grid&apos;s public{' '}
        <Src href={GRID_IDX}>IDX Rules, updated September 17, 2026</Src>, used as a worked example; every MLS has
        its own, and yours are in your license.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Checkpoint</th><th>Where it is enforced</th><th>Published rule (example)</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>License scope</strong></td>
              <td>Recorded at the raw store; checked by the display-policy filter per surface</td>
              <td>MLS Grid&apos;s MlgCanUse field <Src href={GRID_V2}>indicates which use cases a record qualifies for</Src>; records with <Src href={GRID_V2}>only the VOW value cannot be used for IDX</Src></td>
            </tr>
            <tr>
              <td><strong>Refresh and removal</strong></td>
              <td>Replication; alert when sync lag approaches the limit</td>
              <td>Refresh <Src href={GRID_IDX}>at least once every twelve (12) hours</Src>, including removing data no longer in the feed</td>
            </tr>
            <tr>
              <td><strong>Seller opt-outs</strong></td>
              <td>Display-policy filter, before the index</td>
              <td>Data Dictionary flags for whether the seller allows <Src href={DD_NET_LISTING}>the listing</Src> and <Src href={DD_NET_ADDRESS}>the address</Src> on Internet sites; MLS Grid rule 7 covers <Src href={GRID_IDX}>withholding the listing or its address from display</Src></td>
            </tr>
            <tr>
              <td><strong>Attribution</strong></td>
              <td>Fields carried to the index; templates for results and detail pages</td>
              <td>Show <Src href={GRID_IDX}>the listing brokerage name, the listing number, the email or phone provided, and the status</Src> next to the property information</td>
            </tr>
            <tr>
              <td><strong>Mixed sources</strong></td>
              <td>Source kept on every record; a filter in search</td>
              <td>Search across MLS and other sources <Src href={GRID_IDX}>must let the user filter results by the source of the information</Src>; the rule lists MLSs it does not apply to</td>
            </tr>
            <tr>
              <td><strong>Media</strong></td>
              <td>Media worker</td>
              <td><Src href={GRID_BP}>Do not link directly to the media URLs you receive</Src></td>
            </tr>
            <tr>
              <td><strong>AI features</strong></td>
              <td>Anything that builds embeddings or sends listing data to a model</td>
              <td>MLS Grid&apos;s AI addendum defines AI training to include <Src href={GRID_AI}>vector embeddings and retrieval indices that persist beyond a single user session</Src>, and bars it <Src href={GRID_AI}>without prior express authorization</Src></td>
            </tr>
            <tr>
              <td><strong>Scraping</strong></td>
              <td>Edge and application logs</td>
              <td>Make <Src href={GRID_IDX}>reasonable efforts to avoid scraping, including monitoring the website for signs of it</Src></td>
            </tr>
            <tr>
              <td><strong>Audit access</strong></td>
              <td>Operations</td>
              <td>Give MLS Grid <Src href={GRID_IDX}>direct access for monitoring and ensuring compliance</Src>; Stellar MLS vendor products are <Src href={STELLAR}>subject to routine data audit checks</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Rules also differ inside one platform. MLS Grid&apos;s rules carry clauses for single MLSs, such as an MRED
        requirement that a site which limits listings by objective criteria{' '}
        <Src href={GRID_MRED}>states that some listings have been excluded</Src>. Model rules as data keyed by
        originating system, not as conditions scattered through templates. For Canada, where CREA&apos;s rules
        apply instead, see <Link href="/blog/mls-data-access-canada">MLS data access in Canada</Link>.
      </p>

      <h2>Failure modes and how to detect them</h2>
      <p>
        Many of these failures raise no error; the data just stops being right. Each row below is a failure
        that follows from the platform behavior cited above, with the signal that exposes it.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Failure</th><th>How to detect it</th><th>What to do</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Sync stalls silently</strong> (expired token, crashed worker, suspended access)</td>
              <td>Sync lag per feed: current time minus the newest timestamp received. Alert well inside the refresh rule in your license</td>
              <td>Page someone; lag is the one metric every feed needs</td>
            </tr>
            <tr>
              <td><strong>Removed listings stay on the site</strong></td>
              <td>Daily count of your keys against the feed&apos;s keys, per originating system; any key you hold that the feed does not</td>
              <td>Run reconciliation on a schedule, not only after incidents</td>
            </tr>
            <tr>
              <td><strong>Outage longer than the removal window</strong></td>
              <td>Lag exceeded the platform&apos;s retention for removal flags (7 days on MLS Grid)</td>
              <td>Do a full key comparison before resuming incremental sync</td>
            </tr>
            <tr>
              <td><strong>Missed updates from a clock-based cursor</strong></td>
              <td>Sample of records whose stored timestamp is older than the feed&apos;s</td>
              <td>Store the greatest timestamp received and query strictly from it</td>
            </tr>
            <tr>
              <td><strong>Mass update floods the queue</strong></td>
              <td>Changed-record count per run far above the feed&apos;s normal range</td>
              <td>Let it drain under the rate limit; skip downstream work when a content hash is unchanged</td>
            </tr>
            <tr>
              <td><strong>Rate-limit suspension</strong></td>
              <td>429 responses; request and byte counters per hour and per day against the published limits</td>
              <td>Limiter below the limit, backoff on 429, one replication request at a time per feed</td>
            </tr>
            <tr>
              <td><strong>Photos missing or stale</strong></td>
              <td>Listings with zero stored photos; media queue age; MediaKeys in the store without a file</td>
              <td>Download at once from a fresh URL; re-request the record instead of retrying an expired URL</td>
            </tr>
            <tr>
              <td><strong>Schema drift</strong> (new field, renamed field, new lookup value)</td>
              <td>Count of unmapped fields and lookup values per run; a diff of the metadata document</td>
              <td>Hold unknown values in the raw store, alert, extend the mapping, re-run normalization</td>
            </tr>
            <tr>
              <td><strong>Source system replaced</strong></td>
              <td>Platform notices; a feed whose change volume drops to zero</td>
              <td>Load the new originating system as a new source, then switch and retire the old one</td>
            </tr>
            <tr>
              <td><strong>Wrong duplicate match</strong></td>
              <td>Groups whose members disagree on price, beds or coordinates beyond a tolerance</td>
              <td>Unlink (records were never merged) and tighten the rule</td>
            </tr>
            <tr>
              <td><strong>Record shown outside its license scope</strong></td>
              <td>Automated test per surface that queries for records it must not show; expect zero</td>
              <td>Enforce scope in the display-policy filter, not in page code</td>
            </tr>
            <tr>
              <td><strong>Index out of step with the store</strong></td>
              <td>Document count in the index against displayable rows in the store</td>
              <td>Rebuild from the store; the index holds nothing that cannot be rebuilt</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>A build checklist</h2>
      <ul className="cp-checklist">
        <li>List every feed: platform, license type, resources, rate limits, and how removals are signaled.</li>
        <li>Give each feed its own credentials store, limiter, cursor and queue.</li>
        <li>Make the initial load resumable where the platform allows it, and write pages to the raw store as they arrive.</li>
        <li>Store the cursor as the greatest timestamp received, per feed and resource.</li>
        <li>Schedule reconciliation separately from incremental sync.</li>
        <li>Put media on its own queue, keyed by MediaKey, writing to your own storage.</li>
        <li>Keep mappings and display rules as versioned data per originating system.</li>
        <li>Key the canonical store by originating system and key; link duplicates, never merge them.</li>
        <li>Enforce opt-outs, license scope and attribution fields before the index.</li>
        <li>Alert on sync lag, key-count drift, 429s, media queue age and unmapped values.</li>
        <li>Rehearse a full index rebuild and a full re-normalization before launch.</li>
      </ul>
      <p>
        Feed and license fees are a separate question: the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link> adds up published fees for
        the boards you pick, and the <Link href="/blog/mls-idx-integration-cost">cost guide</Link> explains them.
        If you are still deciding whether to own a pipeline at all, read{' '}
        <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build</Link>.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'How often should an MLS sync run?', answer: ['Often enough to stay well inside your license’s refresh rule. MLS Grid’s IDX rules require a refresh ', ['at least once every twelve (12) hours', GRID_IDX], ', and its replication guide says a request ', ['once every 15 minutes is sufficient', GRID_BP], '. Trestle suggests ', ['every few minutes to every hour', TRESTLE_SCALE], '.'] },
        { question: 'How do you detect deleted MLS listings?', answer: ['It depends on the platform. MLS Grid sets a flag: when ', ['MlgCanView changes to false the record must be removed', GRID_V2], '. Trestle’s incremental feed does not report removals, so you ', ['query for all of the keys and remove any records that do not match', TRESTLE_SCALE], '. Run that comparison on a schedule either way.'] },
        { question: 'Can we display photos straight from the MLS media URLs?', answer: ['Not on MLS Grid, which says ', ['you must maintain your own copy of all media files', GRID], ' and that its media URLs are ', ['signed, single-use and expire after one hour', GRID], '. Download each photo once to your own storage and serve it from there.'] },
        { question: 'How do you deduplicate a property listed in two MLSs?', answer: ['Link the records rather than merging them. Use the RESO Universal Property Identifier where present, but the Data Dictionary shows ', ['usage adoption of 21%', DD_UPI], ' for that field, so fall back to parcel number, normalized address and coordinates. Keep both records so each board’s attribution and removal rules still apply.'] },
        { question: 'Can MLS data be used for AI search or embeddings?', answer: ['Check each license. MLS Grid’s AI Use Addendum permits AI-assisted search and response for IDX and VOW uses, but defines AI training to include ', ['vector embeddings and retrieval indices that persist beyond a single user session', GRID_AI], ' and bars it ', ['without prior express authorization', GRID_AI], '. Other MLSs set their own terms.'] },
      ]} />

      <p className="cp-note">
        Standards, platform limits and rules were read from the linked RESO, MLS Grid, Trestle and Stellar MLS
        pages on October 10, 2026. NAR&apos;s policy handbook required a member login on that date, so display
        rules are quoted from MLS Grid&apos;s public IDX Rules as an example. Limits and rules change and differ by
        MLS; your license and the current documentation decide.
      </p>
      <p>
        Planning or repairing an MLS pipeline? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
