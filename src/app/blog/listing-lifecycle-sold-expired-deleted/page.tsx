import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import ListingLifecycleDiagram from '../../components/diagrams/ListingLifecycleDiagram';

const SLUG = 'listing-lifecycle-sold-expired-deleted';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/listing-lifecycle-sold-expired-deleted.md. Code and config blocks are illustrative.
const DD_STATUS = 'https://dd.reso.org/DD2.0/Property/StandardStatus/';
const DD_MLS_STATUS = 'https://dd.reso.org/DD2.0/Property/MlsStatus/';
const RESO_EE_BLOG = 'https://www.reso.org/blog/entityevent-resource/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const TRESTLE_SCALE = 'https://trestle-documentation.corelogic.com/web-api/at-scale/';
const TRESTLE_REF = 'https://trestle-documentation.corelogic.com/web-api/reference/';
// developers.google.com/search/docs/crawling-indexing/http-network-errors redirects (301) to this URL.
const G_STATUS = 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes';
const G_SOFT404 = 'https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors';
const G_REDIRECTS = 'https://developers.google.com/search/docs/crawling-indexing/301-redirects';
const G_ROBOTS_META = 'https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag';
const NEXT_NOT_FOUND = 'https://nextjs.org/docs/app/api-reference/functions/not-found';
const NEXT_REVALIDATE = 'https://nextjs.org/docs/app/api-reference/functions/revalidatePath';
const ES_NRT = 'https://www.elastic.co/docs/manage-data/data-store/near-real-time-search';
const ES_ALIAS = 'https://www.elastic.co/docs/manage-data/data-store/aliases';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The problem: a listing ends in more ways than it begins</h2>
      <p>
        A listing enters your system one way: it appears in the feed. It can leave in at least six, and only some
        of them arrive as an update. It can go under contract, close, expire, be withdrawn or canceled, be deleted
        at the MLS, or simply stop being distributed to you while it is still active for everyone else. A site
        that handles only &ldquo;status changed to Closed&rdquo; will, sooner or later, advertise a home that is
        not for sale, send an alert for it, and keep a page for it in Google. In our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link>, one of the
        four problems found in the audit was exactly this: sold and active properties lived in one collection
        with no clear status management, and agents were showing sold properties as active on their sites.
      </p>
      <p>
        The <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline reference architecture</Link>{' '}
        says in a paragraph that removals arrive differently on each platform. This article follows a listing
        through each ending and says what the pipeline, the search index and the web page should do, and which
        questions only your MLS license can answer.
      </p>

      <h2>Two status fields, and they are not the same on every MLS</h2>
      <p>
        The RESO Data Dictionary gives every listing two statuses. StandardStatus is{' '}
        <Src href={DD_STATUS}>a locked lookup with 11 values</Src>. MlsStatus is{' '}
        <Src href={DD_MLS_STATUS}>a local or regional status that is well known by business users</Src>, defined as{' '}
        <Src href={DD_MLS_STATUS}>an open enumeration: any value is allowed</Src>. The link between them is one
        rule: <Src href={DD_MLS_STATUS}>each MlsStatus must map to a single StandardStatus, and several may map to the same one</Src>.
      </p>
      <p>
        The standard values that matter for a listing&apos;s ending, as RESO defines them:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>StandardStatus</th><th>RESO definition</th><th>Organizations using the value</th></tr></thead>
          <tbody>
            <tr><td><strong>Active</strong></td><td>On market and an offer has not been accepted</td><td>96%</td></tr>
            <tr><td><strong>Active Under Contract</strong></td><td>An offer has been accepted but the listing is still on market</td><td>54%</td></tr>
            <tr><td><strong>Pending</strong></td><td>An offer has been accepted and the listing is no longer on market</td><td>92%</td></tr>
            <tr><td><strong>Closed</strong></td><td>The purchase agreement has been fulfilled or the lease agreement has been executed</td><td>77%</td></tr>
            <tr><td><strong>Expired</strong></td><td>The listing contract has expired</td><td>77%</td></tr>
            <tr><td><strong>Withdrawn</strong></td><td>Withdrawn from the market, but a contract still exists between the seller and the listing member</td><td>71%</td></tr>
            <tr><td><strong>Canceled</strong></td><td>The listing contract has been terminated</td><td>52%</td></tr>
            <tr><td><strong>Delete</strong></td><td>The listing contract was never valid, or there is another reason for the contract to be nullified</td><td>21%</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Definitions and usage figures are from the{' '}
        <Src href={DD_STATUS}>StandardStatus page of the Data Dictionary, generated October 12, 2026</Src>, which
        reports usage across 420 organizations. The other three values are Coming Soon, Hold and Incomplete.
      </p>
      <p>
        The right-hand column is the point of the table. About half of the organizations measured use Canceled
        and Active Under Contract; about a fifth use Delete. So code that waits for{' '}
        <code>StandardStatus = &apos;Delete&apos;</code> will never fire on most feeds, and a board without Active
        Under Contract is expressing that state some other way, usually through MlsStatus. Three working rules
        follow:
      </p>
      <ul>
        <li>Drive logic (search filters, counts, page treatment) from StandardStatus. Show MlsStatus where the board&apos;s own wording matters to agents.</li>
        <li>Store both, and store the mapping you observed per originating system. When a pair appears that you have not seen, flag it; do not guess. <Link href="/blog/mls-data-normalization">MLS data normalization across boards</Link> covers the mapping layer.</li>
        <li>Treat an unknown or missing status as not displayable until someone has looked at it. Showing a listing you should not is the worse error.</li>
      </ul>

      <h2>Three ways a removal reaches you</h2>
      <h3>1. A flag on the record (MLS Grid)</h3>
      <p>
        MLS Grid implements deletion as a boolean on every record. Its documentation says MlgCanView{' '}
        <Src href={GRID}>indicates whether the record should be kept in your database or not</Src>, and that when
        it changes to false the record{' '}
        <Src href={GRID_V2}>is no longer valid for the feed type you consume and must be removed from your local data store</Src>.
        Two details decide the design:
      </p>
      <ul>
        <li>
          <strong>False does not mean deleted.</strong> The reasons MLS Grid lists include{' '}
          <Src href={GRID}>the property was deleted, the listing office decided not to feed out its listings, and the property changed status and became unavailable in IDX</Src>.
          On an IDX feed, then, an expiry or a withdrawal may never arrive as a status at all. It arrives as
          MlgCanView false, and your record&apos;s last known status stays Active. Do not infer the reason.
        </li>
        <li>
          <strong>The flag has a window.</strong>{' '}
          <Src href={GRID_V2}>After 7 days, records marked MlgCanView false are removed from the data feed entirely</Src>.
          A consumer that was offline for longer never sees those removals.
        </li>
      </ul>
      <p>
        The flag is also only visible to the right query. The initial import filters on MlgCanView equal to true;
        the replication queries that follow{' '}
        <Src href={GRID_V2}>do not contain an MlgCanView filter, so that changes to false arrive</Src>. The{' '}
        <Link href="/blog/mls-sync-engine">sync engine article</Link> covers that handoff.
      </p>
      <h3>2. Nothing at all (Trestle, and hard deletes generally)</h3>
      <p>
        Trestle documents the opposite model. Its incremental updates catch new and changed records, but{' '}
        <Src href={TRESTLE_SCALE}>will not provide information on records that are no longer available</Src>. To
        find listings that are{' '}
        <Src href={TRESTLE_SCALE}>off-market, deleted or no longer being distributed on the Internet</Src>, the
        consumer must{' '}
        <Src href={TRESTLE_SCALE}>query for all of the keys for the resource and remove any records that do not match</Src>.
        The record just stops existing. RESO describes this as the general state of timestamp replication:
        consumers <Src href={RESO_EE_BLOG}>usually implement reconciliation processes that run daily to query by all keys</Src>.
      </p>
      <h3>3. An ordinary status change</h3>
      <p>
        Where the license includes off-market records, a listing moves to Pending, Closed, Expired, Withdrawn or
        Canceled as a normal update with a new ModificationTimestamp. This is the easy case, and it is the one
        most code is written for. Whether you receive these at all depends on the feed type and the MLS: MLS
        Grid&apos;s IDX rules say expired and withdrawn listings{' '}
        <Src href={GRID_IDX}>may be excluded from MLS Grid data</Src>.
      </p>
      <p>
        A pipeline has to handle all three, because one platform can use more than one, and because the second is
        also what a missed flag looks like after an outage.
      </p>

      <h2>The lifecycle as a state machine</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><ListingLifecycleDiagram /></div>
        <figcaption>
          Typical listing status transitions, with the pipeline action taken on entering each state. Which
          transitions exist, and what may be displayed in each state, is set by each MLS.
        </figcaption>
      </figure>
      <p>The same diagram as a list of transitions and actions:</p>
      <ul>
        <li><strong>First seen in the feed, to Active:</strong> index it, serve the page with a 200, match it against saved searches.</li>
        <li><strong>Active to Pending</strong> (offer accepted): re-index with the new status; the page stays up with the status shown. <strong>Pending back to Active</strong> (back on market): re-index. It is a status change, not a new listing.</li>
        <li><strong>Pending to Closed</strong> (sale closes): take it out of active search; keep it as a sold record only if the license allows.</li>
        <li><strong>Active to Expired</strong> (term ends) or <strong>to Withdrawn or Canceled:</strong> take it out of active search; the page is treated according to the license. Either can return to Active if the same record is relisted or put back on market.</li>
        <li><strong>Any state, Active and Pending included, to Removed</strong> (MlgCanView false, a Delete status, or the key missing at reconciliation): delete it from the store and the index, purge the cached page, cancel pending alerts, and return 404 or 410 for its URL.</li>
      </ul>
      <p>
        Implement the transitions in one place: a function that takes the previous and the new state of a record
        and returns the actions. Search, page rendering, alerts and the sitemap then read the result. When status
        logic is spread across templates and queries, each surface develops its own idea of what
        &ldquo;active&rdquo; means.
      </p>

      <h2>Decision table: status, index, page, license</h2>
      <p>
        The first two columns are our recommended defaults. The page column follows Google&apos;s documentation,
        cited in the section after the table. The last column is the question to put to your MLS agreement;
        the examples are from{' '}
        <Src href={GRID_IDX}>MLS Grid&apos;s IDX Rules, updated September 17, 2026</Src>, and apply only to the
        MLSs they name.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Status or signal</th><th>Index action</th><th>Page treatment</th><th>License question</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Active</strong></td>
              <td>In the active index</td>
              <td>200, full listing</td>
              <td>Which fields and which attribution must be shown</td>
            </tr>
            <tr>
              <td><strong>Active Under Contract, Pending</strong></td>
              <td>In the active index with a status facet; let users exclude it</td>
              <td>200, status shown next to the property details</td>
              <td>Is this status in the feed for your use, and must it be labeled? MLS Grid requires <Src href={GRID_IDX}>the status of the listing immediately adjacent to the property information</Src></td>
            </tr>
            <tr>
              <td><strong>Closed</strong></td>
              <td>Out of the active index; into a separate sold index if permitted</td>
              <td>200 with sold content if display is permitted; otherwise 404 or 410</td>
              <td>May sold listings be shown, for how long, and with which fields? Examples: <Src href={GRID_IDX}>closed listings more than three years old may not be displayed (REcolorado, IRMLS)</Src>; <Src href={GRID_IDX}>no sale price, and only the primary photograph (Unlock)</Src></td>
            </tr>
            <tr>
              <td><strong>Expired, Withdrawn</strong></td>
              <td>Out of the active index</td>
              <td>404 or 410 unless display is permitted and the page has real content</td>
              <td>MLS Grid: display <Src href={GRID_IDX}>may be prohibited by the participant&apos;s governing documents; if such listings are in the IDX data, display is authorized except where the rules state otherwise</Src>. SCKMLS prohibits display of both, and Northwest MLS of expired listings</td>
            </tr>
            <tr>
              <td><strong>Canceled, Hold or a local off-market status</strong></td>
              <td>Out of the active index</td>
              <td>404 or 410 by default</td>
              <td>Named per MLS. Example: <Src href={GRID_IDX}>Heartland MLS prohibits display of Temporarily Off Market and Cancelled listings</Src></td>
            </tr>
            <tr>
              <td><strong>MlgCanView false</strong></td>
              <td>Delete from every index in the same job</td>
              <td>404 or 410; purge the cached page</td>
              <td>None to ask: the record <Src href={GRID_V2}>must be removed from your local data store</Src></td>
            </tr>
            <tr>
              <td><strong>Key missing at reconciliation</strong></td>
              <td>Delete from every index after the safety checks below</td>
              <td>404 or 410; purge the cached page</td>
              <td>How soon removed data must leave your displays. MLS Grid: refresh <Src href={GRID_IDX}>at least once every twelve (12) hours, to exclude data that has been removed</Src></td>
            </tr>
            <tr>
              <td><strong>Unknown or unmapped status</strong></td>
              <td>Hold out of the index; alert</td>
              <td>Not served until mapped</td>
              <td>Ask the MLS what the status means for display</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What the web page should return</h2>
      <p>Google&apos;s documentation gives three outcomes for a page whose content has gone, and a listing fits each of them at different times.</p>
      <ul>
        <li>
          <strong>The listing is gone and nothing replaces it: 404 or 410.</strong> Google&apos;s instruction is to{' '}
          <Src href={G_SOFT404}>return a 404 (not found) or 410 (gone) response code</Src> when a page is removed
          and there is no replacement with similar content. The two are equivalent for Search:{' '}
          <Src href={G_STATUS}>all 4xx errors, except 429, are treated the same</Src>, and already indexed URLs
          that return a 4xx <Src href={G_STATUS}>are removed from the index</Src>. We would still send 410 for a
          URL known to have existed, because it is the accurate answer for other clients.
        </li>
        <li>
          <strong>The listing changed state and you may still show it: 200 with real content.</strong> A sold
          page with the status, the permitted sold details and the required attribution is a page. A 2xx
          response <Src href={G_STATUS}>may be considered for indexing</Src>, with no guarantee.
        </li>
        <li>
          <strong>There is a clear replacement: 301.</strong> Google says to redirect when a page{' '}
          <Src href={G_SOFT404}>has moved or has a clear replacement on your site</Src>, and treats a permanent
          redirect as <Src href={G_REDIRECTS}>a signal that the redirect target should be canonical</Src>. For
          listings this is narrow: the same property under a changed URL scheme, or, as a judgment call, the same
          property relisted under a new record. A search-results page or the home page is not a replacement for
          a specific home.
        </li>
      </ul>
      <p>
        The outcome to avoid is the fourth one, which is the most common in practice: a 200 page that says
        &ldquo;this listing is no longer available&rdquo;. Google defines a soft 404 as{' '}
        <Src href={G_SOFT404}>a URL that returns a page telling the user that the page does not exist and also a 200 (success) status code</Src>,
        and says such pages <Src href={G_SOFT404}>are excluded from Search</Src>. You can and should make the 404
        useful to a visitor, with nearby and similar active homes; Google notes that{' '}
        <Src href={G_SOFT404}>custom 404 pages are created solely for users, so the server should still return a 404 status code</Src>.
      </p>
      <p>
        Two implementation traps deserve a mention. In the Next.js App Router, calling <code>notFound()</code>{' '}
        before the response starts streaming returns a 404, but if streaming has begun the response{' '}
        <Src href={NEXT_NOT_FOUND}>keeps its 200 status and Next.js adds a noindex tag</Src>. Resolve the
        listing&apos;s state before anything streams. And a statically generated or cached page does not know the
        listing has gone: the removal job must invalidate it, for example with{' '}
        <Src href={NEXT_REVALIDATE}>revalidatePath, which invalidates cached data on demand for a specific path</Src>,
        and purge any CDN copy.
      </p>
      <p>
        Google also supports an <Src href={G_ROBOTS_META}>unavailable_after rule: do not show this page in search results after the specified date and time</Src>.
        It suits pages with a known end date, such as an open house or an auction. A listing&apos;s end date is
        rarely known in advance, so it does not replace the status code. The wider indexing picture for listing
        sites is in <Link href="/blog/real-estate-website-seo-aeo-geo">SEO, AEO and GEO for real estate websites</Link>.
      </p>

      <h2>The reconciliation job</h2>
      <p>
        Reconciliation is a separate job from incremental sync, on its own schedule, and it is required on every
        platform: as the only removal mechanism on some, and as the safety net behind a flag on others. An
        illustrative outline:
      </p>
      <pre className="cp-code"><code>{`// Illustrative. Runs per feed, originating system and resource.
async function reconcile(key) {
  const startedAt = now()
  const remote = new Map()                       // record key -> { modified, status }
  for await (const page of feed.listKeys(key)) { // key fields only, every page
    for (const r of page) remote.set(r.key, r)
  }
  if (!feed.completed(key)) return abort('incomplete key list')   // never diff a partial list

  const local = await store.keysFor(key)         // records we hold as displayable
  const missing = local.filter(k => !remote.has(k.key) && k.firstSeenAt < startedAt)
  const stale   = local.filter(k => remote.has(k.key) && remote.get(k.key).modified > k.modified)

  if (missing.length > local.length * MAX_REMOVAL_FRACTION) {
    return alert('removal count above threshold; held for review', missing.length)
  }
  for (const k of missing) await lifecycle.apply(k, { signal: 'KEY_MISSING' })
  await sync.refetch(key, stale)                 // drifted records go back through normal sync
  await checkpoints.markReconciled(key, startedAt)
}`}</code></pre>
      <p>Four decisions in that outline are worth stating:</p>
      <ul>
        <li>
          <strong>Key-only queries.</strong> Trestle allows a query that selects only key fields to return{' '}
          <Src href={TRESTLE_REF}>up to 300,000 records</Src>, and points to its replication endpoint for
          resources of more than a million. On MLS Grid, which supports <code>$select</code>, the equivalent is
          to page through the resource with the initial-import filter (MlgCanView equal to true) selecting the
          key and the timestamp.
        </li>
        <li>
          <strong>Never act on a partial list.</strong> If the key download fails halfway, every key not yet
          fetched looks deleted. The job diffs only after the last page.
        </li>
        <li>
          <strong>A removal threshold.</strong> If the diff wants to remove more than a set fraction of a feed,
          stop and ask a person. Either the feed has a problem or the license scope changed, and in both cases a
          human should decide. The fraction is a setting to tune per feed, not a number we can give you.
        </li>
        <li>
          <strong>Drift as well as absence.</strong> Selecting the timestamp with the key finds records whose
          stored copy is older than the feed&apos;s, which catches updates lost to a past bug. Those are
          re-fetched through the normal path, not patched in place.
        </li>
      </ul>
      <p>
        How often to run it is set by the license, not by convenience. Under MLS Grid&apos;s twelve-hour refresh
        rule, a feed whose only removal mechanism is reconciliation needs that job to complete well inside twelve
        hours. After any outage longer than the platform&apos;s flag window, run it before trusting incremental
        sync again.
      </p>
      <p>
        RESO has ratified a cleaner mechanism. With the EntityEvent resource,{' '}
        <Src href={RESO_EE_BLOG}>events are produced when records are no longer part of a user&apos;s feed</Src>,
        which would make removals part of the normal stream where a provider offers it. Until yours does,
        reconciliation stays.
      </p>

      <h2>Cleaning up everything derived from the record</h2>
      <p>
        Deleting the row is the smallest part of a removal. The listing also lives in every copy made from it,
        and each copy has its own way of going stale:
      </p>
      <ul>
        <li>
          <strong>Search index.</strong> Delete the document in the same job that applies the removal, not in a
          later batch. In Elasticsearch a change becomes{' '}
          <Src href={ES_NRT}>visible to search within about a second by default</Src>, at the next refresh.
        </li>
        <li><strong>Query caches.</strong> A cached result set still contains the listing until it expires. Either keep cache lifetimes shorter than your refresh obligation, or filter cached results against the store before rendering.</li>
        <li><strong>Rendered pages and the CDN.</strong> Invalidate the listing page, and any area or building page that lists it.</li>
        <li><strong>Media.</strong> Remove your stored copies of the photos on the same trigger, unless the license permits keeping them for a sold display.</li>
        <li><strong>Sitemap.</strong> Drop the URL at the next generation, so you are not asking search engines to crawl a 404.</li>
        <li><strong>Alerts and saved lists.</strong> Cancel queued notifications for the listing, and decide what a user&apos;s favorites list shows for a home that is gone. <Link href="/blog/saved-searches-listing-alerts">Saved searches and listing alerts</Link> covers the notification side.</li>
        <li><strong>Embeddings and AI features.</strong> A vector index is a copy too. It must be removed with the record, and whether you may build one at all is a license matter.</li>
      </ul>
      <p>
        Because per-record deletes can be missed, verify in bulk as well: compare the document count in the index
        with the count of displayable rows in the store, per originating system, on a schedule. And rebuild the
        index from the store periodically behind an alias. Elasticsearch&apos;s alias API can{' '}
        <Src href={ES_ALIAS}>perform multiple actions in a single atomic operation</Src>, so the swap to a clean
        index is not visible to users, and anything orphaned in the old one disappears with it.
      </p>
      <p>
        One design question is whether to keep a tombstone. MLS Grid&apos;s wording is that the record must be
        removed from your data store, so a soft-delete flag on the full record is not a removal. What we would
        keep is a minimal tombstone: the key, the removal time and the signal, with no listing content. It lets
        the site answer 410 for a URL that once existed, stops a late-arriving job from recreating the record, and
        gives support a way to answer &ldquo;where did this listing go&rdquo;. Confirm even that against your
        agreement.
      </p>

      <h2>Sold and historical records are licensed data</h2>
      <p>
        It is tempting to treat sold listings as your own archive once they are in your database. They are not.
        They remain MLS data, and what you may do with them is written per MLS. Staying with MLS Grid&apos;s
        public IDX rules as the worked example, and without generalizing beyond the MLSs they name:
      </p>
      <ul>
        <li>For <Src href={GRID_IDX}>REcolorado participants, display of closed listings more than three years old is prohibited</Src>; the same limit is stated for IRMLS.</li>
        <li>For <Src href={GRID_IDX}>Unlock participants, closed listings may not show the sale price or photographs other than the primary photograph</Src>.</li>
        <li>For <Src href={GRID_IDX}>SCKMLS participants, display of Sold Price and Net Sold Price on closed listings is prohibited</Src>.</li>
        <li>When a sold listing is displayed, <Src href={GRID_IDX}>the name of the cooperating brokerage or a stated disclaimer must also appear</Src>.</li>
      </ul>
      <p>These rules have three engineering consequences.</p>
      <p>
        <strong>Rules are data, keyed by originating system.</strong> An illustrative shape:
      </p>
      <pre className="cp-code"><code>{`// Illustrative. Values must come from each MLS's current rules and your license.
const displayPolicy = {
  'mls-a': { offMarket: ['Closed'],            closedMaxAgeDays: 1095, closedHide: [],            closedPhotos: 'all' },
  'mls-b': { offMarket: ['Closed'],            closedMaxAgeDays: null, closedHide: ['ClosePrice'], closedPhotos: 'primary' },
  'mls-c': { offMarket: [],                    closedMaxAgeDays: null, closedHide: [],            closedPhotos: 'all' },
}`}</code></pre>
      <p>
        <strong>Some transitions are caused by the calendar, not the feed.</strong> A closed listing under a
        three-year limit becomes non-displayable on a date, with no update arriving to trigger it. The lifecycle
        therefore needs a scheduled job that evaluates age-based rules and applies the same removal actions as
        any other transition. Without it, compliance decays silently.
      </p>
      <p>
        <strong>Feed type decides what you hold at all.</strong> MLS Grid marks each record with the uses it
        qualifies for, and records that <Src href={GRID_V2}>contain only the VOW value cannot be used for IDX</Src>.
        Sold data offered to registered users under one program is not automatically displayable on public pages
        under another. The display-policy filter has to know the surface as well as the status.
      </p>
      <p>
        Rules change, too. The document cited here carries an update date of September 17, 2026. Keep the policy
        versioned, record which version each display decision was made under, and re-run the policy over stored
        records whenever it changes.
      </p>

      <h2>Checks that prove it works</h2>
      <ul className="cp-checklist">
        <li>Request the URL of a removed listing and read the status code: 404 or 410, not 200.</li>
        <li>Search for a removed listing by address and by listing number: no result in search, autocomplete or map pins.</li>
        <li>Count displayable rows in the store and documents in the index per originating system: equal.</li>
        <li>For each board, query your store for statuses its rules prohibit: zero displayable rows.</li>
        <li>Query for closed listings older than each board&apos;s limit: zero displayable rows.</li>
        <li>Simulate an outage longer than the flag window, then confirm reconciliation removes what incremental sync missed.</li>
        <li>Feed reconciliation a truncated key list: it must abort, not delete.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should a sold listing page return 404 or stay live?', answer: ['It depends on your MLS license. If you may display sold listings and the page has real content, keep it at 200 with the status shown. If not, Google says to ', ['return a 404 (not found) or 410 (gone) response code', G_SOFT404], '. A 200 page that only says the listing is unavailable is a soft 404.'] },
        { question: 'Is there a difference between 404 and 410 for removed listings?', answer: ['Not for Google Search, which says ', ['all 4xx errors, except 429, are treated the same', G_STATUS], '. A 410 is the more accurate answer for a URL you know existed, which is one reason to keep a minimal record of removed keys.'] },
        { question: 'How do you detect a listing that was deleted at the MLS?', answer: ['It depends on the platform. MLS Grid sets MlgCanView to false, and the record ', ['must be removed from your local data store', GRID_V2], '. Trestle’s incremental updates ', ['will not provide information on records that are no longer available', TRESTLE_SCALE], ', so you compare your keys with the feed’s keys on a schedule.'] },
        { question: 'Do all MLSs use the same listing statuses?', answer: ['No. RESO’s StandardStatus has 11 locked values, but its Data Dictionary shows that not every organization uses every value, and MlsStatus is ', ['an open enumeration: any value is allowed', DD_MLS_STATUS], '. Store both fields and the mapping between them for each MLS.'] },
        { question: 'How long can sold listings be displayed?', answer: ['Only as long as each MLS allows. As one published example, MLS Grid’s IDX rules state that for REcolorado participants ', ['display of closed listings more than three years old is prohibited', GRID_IDX], '. Other MLSs set different limits or none; your license decides.'] },
      ]} />

      <p className="cp-note">
        Status definitions, platform behavior, MLS Grid rules and Google guidance were read from the linked pages
        on October 12, 2026. MLS rules are quoted from MLS Grid&apos;s public IDX Rules as a worked example and
        apply only to the MLSs named in them. Rules change and differ by MLS and by feed type; your license and
        the current documents decide. Code and configuration blocks are illustrative.
      </p>
      <p>
        Need status handling that holds up to an MLS audit? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
