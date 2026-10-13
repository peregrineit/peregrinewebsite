import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import IdxRequirementLayersDiagram from '../../components/diagrams/IdxRequirementLayersDiagram';

const SLUG = 'idx-website-features-checklist';
export const metadata = guideMetadata(SLUG);

// Rewritten 2026-10-13 as a requirements article (the earlier features checklist was withdrawn).
// Sources fetched and checked 2026-10-13; the sentence relied on for each link is logged in
// docs/content/sources/idx-website-features-checklist.md. NAR's IDX policy page needs a member
// login, so MLS rules are quoted from MLS Grid's public documentation and IDX Rules as one example.
// TODO(owner): the URL slug still says "features-checklist"; changing it needs a redirect decision.
const RESO_API = 'https://www.reso.org/reso-web-api/';
const DD_NET_LISTING = 'https://dd.reso.org/DD2.0/Property/InternetEntireListingDisplayYN/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const TRESTLE_API = 'https://trestle-documentation.corelogic.com/web-api/';
const WEB_VITALS = 'https://web.dev/articles/vitals';
const WEB_TTFB = 'https://web.dev/articles/ttfb';
const WEB_LAB_FIELD = 'https://web.dev/articles/lab-and-field-data-differences';
const G_STATUS = 'https://developers.google.com/search/docs/crawling-indexing/http-network-errors';
const G_JS = 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics';
const OWASP_A01 = 'https://top10.owasp.org/2021/A01_2021-Broken_Access_Control';
const OWASP_SECRETS = 'https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html';
const OWASP_LOGGING = 'https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html';
const PG_PITR = 'https://www.postgresql.org/docs/current/continuous-archiving.html';
const PG_RLS = 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html';
const ES_SNAPSHOT = 'https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore';
const ES_NRT = 'https://www.elastic.co/docs/manage-data/data-store/near-real-time-search';
const SRE_SLO = 'https://sre.google/sre-book/service-level-objectives/';
const SRE_MON = 'https://sre.google/sre-book/monitoring-distributed-systems/';
const CASE = '/case-studies/scaling-real-estate-saas-platform';

type Req = { id: string; must: string; verify: string };

// The requirements table. Each row is the short form of a requirement explained in its section above the table.
const REQUIREMENTS: { group: string; rows: Req[] }[] = [
  {
    group: 'Architecture and data ownership',
    rows: [
      { id: 'A1', must: 'Pages are served from the platform’s own replica, never a live MLS API call.', verify: 'Block the feed hosts in staging; search and listing pages still load.' },
      { id: 'A2', must: 'Raw payloads are stored unmodified beside normalized records.', verify: 'Change a mapping and rebuild from raw without calling the feed.' },
      { id: 'A3', must: 'One system of record; index and caches can be rebuilt from it.', verify: 'Delete the index, flush the cache, rebuild, and time it.' },
      { id: 'A4', must: 'Media is served from storage the platform controls.', verify: 'Crawl pages; no image URL points at a feed host.' },
      { id: 'A5', must: 'Records carry source and license type; feeds sync in isolation.', verify: 'Revoke one feed’s credential; the others keep syncing.' },
    ],
  },
  {
    group: 'Data reliability',
    rows: [
      { id: 'D1', must: 'Sync is resumable and idempotent.', verify: 'Kill the worker mid-page; replay a page twice; compare with a clean run.' },
      { id: 'D2', must: 'Each feed has a stated, measured maximum data age.', verify: 'Pause a feed; the alert fires before the stated age.' },
      { id: 'D3', must: 'A removed or restricted listing leaves every store and output.', verify: 'Remove a fixture listing; check each store and the URL’s status code.' },
      { id: 'D4', must: 'Scheduled reconciliation compares local keys with the feed’s.', verify: 'Delete one row and plant one orphan; the next run reports both.' },
      { id: 'D5', must: 'Index and system of record match; index lag is measured.', verify: 'Compare counts and samples; chart time from write to searchable.' },
      { id: 'D6', must: 'Unknown fields and values are kept for review without stopping the sync.', verify: 'Feed a fixture with an unseen field and value.' },
    ],
  },
  {
    group: 'Security',
    rows: [
      { id: 'S1', must: 'Feed credentials are managed secrets with rehearsed rotation.', verify: 'Secret scan in CI; rotate in staging without a deploy; search logs.' },
      { id: 'S2', must: 'Authorization is server-side, deny by default, per record.', verify: 'Request another user’s or tenant’s ids through every route.' },
      { id: 'S3', must: 'Display rules are applied in one layer in front of every output.', verify: 'Restricted fixtures; inspect pages, API, map data, email, sitemaps.' },
      { id: 'S4', must: 'Consumer data is inventoried, kept out of logs, exportable and deletable.', verify: 'Delete a test account; search stores and logs for it.' },
      { id: 'S5', must: 'Automated access is rate limited and monitored.', verify: 'Drive one client past the limit; it is throttled and an event is raised.' },
    ],
  },
  {
    group: 'Performance',
    rows: [
      { id: 'P1', must: 'Listing content is in the HTML response.', verify: 'Fetch without JavaScript; assert price, address and attribution.' },
      { id: 'P2', must: 'Core Web Vitals targets are set per template and measured in the field.', verify: 'Field 75th percentile by template and device; lab check in CI.' },
      { id: 'P3', must: 'Search has a percentile latency budget at a stated load and index size.', verify: 'Load test a production-size index with a realistic query mix.' },
      { id: 'P4', must: 'Imports and reindexing keep reads inside budget.', verify: 'Repeat the P3 test during a full import and a reindex.' },
    ],
  },
  {
    group: 'Production operations',
    rows: [
      { id: 'O1', must: 'Feed and visitor signals are monitored against written objectives.', verify: 'Inject a failed feed, a slow search and an error spike.' },
      { id: 'O2', must: 'Every paging alert is actionable and links to a runbook.', verify: 'Someone who did not write the runbook follows it on a game day.' },
      { id: 'O3', must: 'Recovery targets are set per store and restores are rehearsed.', verify: 'Timed restore into a clean environment, on a schedule.' },
      { id: 'O4', must: 'Deploys are reversible; staging has its own credentials and stores.', verify: 'Roll back the latest release, schema and index changes included.' },
      { id: 'O5', must: 'Incidents have an owner, severities and an MLS notification path.', verify: 'Tabletop a display-rule breach and a leaked credential.' },
    ],
  },
];

const REQ_COUNT = REQUIREMENTS.reduce((n, g) => n + g.rows.length, 0);

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What production-ready has to mean</h2>
      <p>
        A demo of an IDX platform proves that listings can be fetched and shown. It says nothing about what
        happens when a feed is unreachable for a day, a listing is withdrawn, a seller opts out of address
        display, a credential leaks, or the search index has to be rebuilt during business hours. That is where
        requirements documents tend to be thin: long on screens and filters, short on properties of the system
        that someone can test.
      </p>
      <p>
        This article is a requirements-level overview for the technical lead who writes or reviews that document.
        It states {REQ_COUNT} requirements in five groups, each phrased as something the system must do, with a
        way to verify it and a pointer to a longer article on the mechanics. It is not a list of site features,
        a vendor comparison or a cost guide. Whether to build at all is covered in <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build</Link>, and licensing in{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>.
      </p>
      <p>Two conventions apply throughout:</p>
      <ul>
        <li>
          <strong>The team sets the numbers.</strong> Where a requirement needs a figure (maximum data age, a
          latency percentile, a restore time), it says the team must set one. The right value depends on your
          license, traffic and budget, and we do not supply benchmarks here.
        </li>
        <li>
          <strong>MLS rules are examples, not universals.</strong> Rules are quoted from MLS Grid&apos;s public
          documentation and its <Src href={GRID_IDX}>IDX Rules, updated September 17, 2026</Src>, as one
          published example. Every MLS sets its own terms, so each rule-driven requirement ends as a question
          for your own agreement.
        </li>
      </ul>

      <h2>Where the requirements sit</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><IdxRequirementLayersDiagram /></div>
        <figcaption>
          The data path of an IDX platform, with each requirement group drawn under the stages it governs.
        </figcaption>
      </figure>
      <p>The same picture as a list:</p>
      <ol>
        <li><strong>Data path.</strong> MLS feeds, the system of record (replicated listings and raw payloads), derived stores (search index, cache, media copies), a display policy layer, then the outputs: pages, API, email and sitemaps.</li>
        <li><strong>Architecture and data ownership (A1 to A5)</strong> and <strong>data reliability (D1 to D6)</strong> govern the path from the feeds to the derived stores.</li>
        <li><strong>Security (S1 to S5)</strong> and <strong>production operations (O1 to O5)</strong> govern the whole path.</li>
        <li><strong>Performance (P1 to P4)</strong> governs the path from the derived stores to the outputs.</li>
        <li>Every requirement has a verification the team can run and record.</li>
      </ol>

      <h2>Architecture and data ownership</h2>
      <p>
        These five decide what the platform holds, where it lives and what can be thrown away and rebuilt. The
        reference design behind them is in{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture</Link>, and the choice
        of database, search engine and cache in the{' '}
        <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link>.
      </p>
      <h3>A1. Pages are served from your own replica</h3>
      <p>
        The system must answer every search and listing request from data it holds. RESO describes the model:{' '}
        <Src href={RESO_API}>replicators initially pull an entire data set, and then continually request the most recent data changes</Src>.
        Some platforms leave no alternative; MLS Grid states that it{' '}
        <Src href={GRID}>does not support real time data access and provides data through a replication process</Src>.
        Where live queries are offered, a page that depends on them still inherits the feed&apos;s latency,
        rate limits and outages. <em>Verify:</em> block outbound
        access to the feed hosts in staging and confirm that search and listing pages still render.
      </p>
      <h3>A2. Raw payloads are kept beside normalized records</h3>
      <p>
        The system must store what the feed sent, unmodified, as well as the normalized record the application
        reads. Mapping mistakes are found weeks later, and a raw copy turns the fix into a local rebuild instead
        of a rate-limited re-download. <em>Verify:</em> change one field mapping, rebuild from raw and diff the
        output, with no call to the feed. Field mapping itself is covered in{' '}
        <Link href="/blog/mls-data-normalization">MLS data normalization</Link>.
      </p>
      <h3>A3. One system of record; everything else is derived</h3>
      <p>
        The system must name one store as the source of truth and treat the search index and caches as
        disposable. Our{' '}
        <Link href={CASE}>real estate SaaS case study</Link> describes that shape: MongoDB as the source of
        truth, Elasticsearch for search, and Redis as a cache on top. <em>Verify:</em> delete the index and flush the cache in staging,
        rebuild both, and time the rebuild against the target the team set. Index design is in{' '}
        <Link href="/blog/real-estate-search-elasticsearch">real estate search with Elasticsearch</Link>.
      </p>
      <h3>A4. Media is served from storage you control</h3>
      <p>
        The system must copy listing photos to its own storage and serve them from there. MLS Grid makes this a
        condition: <Src href={GRID}>you must maintain your own copy of all media files</Src>, and its media URLs
        are for downloading a local copy only. Whether other feeds require the same is a question for each
        agreement.{' '}
        <em>Verify:</em> crawl rendered pages and assert that no image URL points at a feed host.
      </p>
      <h3>A5. Every record knows its source, and feeds are isolated</h3>
      <p>
        The system must stamp each record with its originating system and the license it arrived under, and run
        each feed&apos;s sync independently. Sources are already separate at the API in some cases: on MLS Grid{' '}
        <Src href={GRID_V2}>each request must contain a single OriginatingSystemName</Src>. The case study shows
        the cost of ignoring this: its original sync ran as a single process, and{' '}
        <Link href={CASE}>one failed MLS feed would stall updates for all agents</Link> until the engine was
        rewritten with per-feed error isolation. <em>Verify:</em> revoke one feed&apos;s credential in staging;
        the others keep syncing and only that feed raises an alert.
      </p>

      <h2>Data reliability</h2>
      <p>
        These six cover how the replica gets to match the source, how stale it may be, and how drift is found.
        The mechanics are in{' '}
        <Link href="/blog/mls-sync-engine">designing an MLS sync engine</Link>.
      </p>
      <h3>D1. Sync is resumable and idempotent</h3>
      <p>
        The system must be able to stop at any point and resume without skipping or duplicating records, and
        processing the same page twice must leave the same state as processing it once. <em>Verify:</em> kill the worker in the middle of a
        page and restart it; replay one page twice; compare row counts and checksums with a clean run.
      </p>
      <h3>D2. Freshness is a stated, measured objective</h3>
      <p>
        The team must set a maximum data age for each feed, and the system must measure the actual age and alert
        before the limit. The outer bound usually comes from the license. MLS Grid&apos;s rule, as one example,
        is a refresh <Src href={GRID_IDX}>at least once every twelve (12) hours to include new data and exclude data that has been removed</Src>.
        That is a ceiling, not a target. <em>Verify:</em> pause one feed in staging and confirm the staleness alert fires before the stated
        age is reached.
      </p>
      <h3>D3. Removals reach every store and every output</h3>
      <p>
        When a listing is removed or a restriction is applied at the source, the system must remove it from the
        database, the search index, caches, media storage, sitemaps and any queued alert email. Feeds signal
        removal in their own ways; MLS Grid uses a flag, and when it is false the instruction is to{' '}
        <Src href={GRID_V2}>remove the record from your database</Src>. The public URL needs a deliberate status
        too, because Google treats the two cases differently: URLs that return a 4xx status{' '}
        <Src href={G_STATUS}>are removed from the index</Src>, while an error page served with a success status
        is reported as <Src href={G_STATUS}>a soft 404</Src>. <em>Verify:</em> remove a fixture listing at the
        source and check each store and the URL&apos;s status code. Status handling is covered in{' '}
        <Link href="/blog/listing-lifecycle-sold-expired-deleted">the listing lifecycle</Link>.
      </p>
      <h3>D4. Reconciliation finds what incremental sync missed</h3>
      <p>
        The system must periodically compare the set of record keys it holds with the set the feed says it
        should hold, per source, and report the difference in both directions. Incremental sync assumes every
        change is announced; reconciliation catches the ones that were not.{' '}
        <em>Verify:</em> delete one local row and plant one orphan in staging; the next run reports both.
      </p>
      <h3>D5. The search index matches the system of record</h3>
      <p>
        The system must update the index from the same stream of changes that updates the system of record, and
        measure the delay. Elasticsearch itself is not the slow step; by default it{' '}
        <Src href={ES_NRT}>periodically refreshes indices every second</Src>. The lag that matters is your own
        pipeline between the database write and the index request. <em>Verify:</em> compare counts and a sample
        of records between the two on a schedule, and chart the time from write to searchable.
      </p>
      <h3>D6. Unknown values are recorded, not lost</h3>
      <p>
        When a feed sends a field or an enumeration value the mapping has never seen, the system must keep
        syncing, keep the value, and queue it for review. <em>Verify:</em> feed a fixture with an unseen field and an unseen
        value; the sync completes and both appear in the review queue.
      </p>

      <h2>Security</h2>
      <p>
        An IDX platform holds three things worth protecting: credentials that reach licensed data, consumer
        accounts and enquiries, and the display restrictions it has agreed to. The third is usually written up as
        a compliance checklist; it belongs here, as a property of the system.
      </p>
      <h3>S1. Feed credentials are managed secrets</h3>
      <p>
        The system must keep MLS credentials in a secrets manager, out of source code, container images and
        logs, with access limited to the sync service. OWASP names the common failure:{' '}
        <Src href={OWASP_SECRETS}>many organizations have them hardcoded within the source code in plaintext</Src>.
        Its guidance is to <Src href={OWASP_SECRETS}>regularly rotate secrets so that any stolen credentials will only work for a short time</Src>.
        Feeds differ in what the long-lived secret is. Trestle uses{' '}
        <Src href={TRESTLE_API}>an OAuth2 Client Credentials flow</Src> in which a token{' '}
        <Src href={TRESTLE_API}>is good for up to 8 hours</Src>, so the client secret is the thing to guard; MLS
        Grid issues <Src href={GRID}>an API token once the MLS has approved the subscription</Src>.{' '}
        <em>Verify:</em> scan repository history for secrets in CI, rotate a staging credential without a
        deploy, and search a log sample for token strings.
      </p>
      <h3>S2. Authorization is enforced on the server, per record</h3>
      <p>
        The system must check, on the server, that the caller may act on the specific record requested: a saved
        search, an enquiry, an agent&apos;s leads, another brokerage&apos;s configuration. OWASP&apos;s guidance
        on broken access control is direct:{' '}
        <Src href={OWASP_A01}>except for public resources, deny by default</Src>, and{' '}
        <Src href={OWASP_A01}>enforce record ownership rather than accepting that the user can create, read, update, or delete any record</Src>.
        On a platform with many brokerages or agent sites the database can back this up; with PostgreSQL
        row-level security enabled and no policy defined,{' '}
        <Src href={PG_RLS}>a default-deny policy is used</Src>. <em>Verify:</em> an automated test signs in as
        one user or tenant and requests another&apos;s record ids through every route, expecting not-found each
        time. Tenant boundaries are covered in{' '}
        <Link href="/blog/multi-tenant-real-estate-saas">multi-tenant real estate SaaS</Link>.
      </p>
      <h3>S3. Display rules are enforced in one place</h3>
      <p>
        The system must apply display restrictions in a single policy layer that sits between the stores and
        every output, so that a restricted value never leaves the server. A rule implemented only in a page
        template is not enforced: the same record also leaves through the search API, map data, alert emails,
        sitemaps and structured data. The RESO Data Dictionary defines a flag for{' '}
        <Src href={DD_NET_LISTING}>whether or not the seller has allowed the listing to be displayed on Internet sites</Src>.
        MLS Grid&apos;s rules cover a seller who directs that{' '}
        <Src href={GRID_IDX}>the listing or the listing&apos;s property address be withheld from all public display on the Internet, including on maps</Src>,
        and state that <Src href={GRID_IDX}>confidential fields intended only for other Member Participants may not be displayed</Src>.{' '}
        <em>Verify:</em> fixture listings carry each restriction, and an automated test inspects every output
        channel for the restricted value; API responses are checked against an allow-list of fields per license
        type.
      </p>
      <h3>S4. Consumer data is inventoried and removable</h3>
      <p>
        The system must know every place a consumer&apos;s account, saved searches and enquiries are stored,
        keep them out of logs, and be able to export and delete them per account. OWASP&apos;s logging guidance
        lists what should not be written to logs directly, including{' '}
        <Src href={OWASP_LOGGING}>access tokens, authentication passwords and database connection strings</Src>,
        and what should be: <Src href={OWASP_LOGGING}>authentication successes and failures and authorization failures</Src>.
        What must be retained, and for how long, is a question for counsel in each jurisdiction you serve, not
        something to assume. <em>Verify:</em> create a test account, use every feature, delete it, then search
        all stores and a log sample for its email address.
      </p>
      <h3>S5. Automated access is limited and watched</h3>
      <p>
        The system must rate limit search and listing endpoints per client and record signs of bulk extraction.
        OWASP recommends that teams{' '}
        <Src href={OWASP_A01}>rate limit API and controller access to minimize the harm from automated attack tooling</Src>.
        For listing data there is often a contractual side as well. MLS Grid&apos;s rules call for reasonable
        efforts to avoid scraping, including{' '}
        <Src href={GRID_IDX}>monitoring the website for signs that a third party is scraping data</Src>, and say
        a suspicion must be reported. <em>Verify:</em> drive one client past the limit; requests are throttled
        and an event reaches the on-call channel.
      </p>

      <h2>Performance</h2>
      <p>
        Each of these names a measurement, a place to measure it and a number the team has to choose.
      </p>
      <h3>P1. Listing content is in the HTML response</h3>
      <p>
        The system must return the content of listing and search-result pages in the server response, not
        assemble it in the browser. Google&apos;s documentation says that crawling works well for{' '}
        <Src href={G_JS}>server-side rendered pages where the HTML in the HTTP response contains all content</Src>,
        and that <Src href={G_JS}>not all bots can run JavaScript</Src>. <em>Verify:</em> fetch the URL without
        running JavaScript and assert that price, address and attribution are present. Crawling and indexing are
        covered in <Link href="/blog/real-estate-website-seo-aeo-geo">real estate website SEO, AEO and GEO</Link>.
      </p>
      <h3>P2. Core Web Vitals targets are set per template and measured in the field</h3>
      <p>
        The team must set targets for each page template (search results, map, listing detail) and measure them
        on real visits. The published thresholds are a starting point: a Largest Contentful Paint{' '}
        <Src href={WEB_VITALS}>within 2.5 seconds</Src>, an Interaction to Next Paint of{' '}
        <Src href={WEB_VITALS}>200 milliseconds or less</Src> and a Cumulative Layout Shift of{' '}
        <Src href={WEB_VITALS}>0.1 or less</Src>, assessed at{' '}
        <Src href={WEB_VITALS}>the 75th percentile of page loads, segmented across mobile and desktop devices</Src>.
        Server response time needs its own budget inside that; web.dev&apos;s rough guide is a time to first byte
        of <Src href={WEB_TTFB}>0.8 seconds or less</Src>. Lab tools are for catching regressions before
        release, and when the two disagree,{' '}
        <Src href={WEB_LAB_FIELD}>field data is what you should use to prioritize your efforts</Src>.{' '}
        <em>Verify:</em> real-user monitoring reports the 75th percentile by template and device class, and a lab
        check in CI fails a build that regresses. Techniques are in{' '}
        <Link href="/blog/listing-page-core-web-vitals">Core Web Vitals for listing pages</Link>.
      </p>
      <h3>P3. Search has a latency budget, stated as a percentile</h3>
      <p>
        The team must write the search API&apos;s latency target as a percentile, under a stated request rate and
        index size. An average is the wrong unit; as Google&apos;s SRE book puts it, it is{' '}
        <Src href={SRE_SLO}>entirely possible for most of the requests to be fast, but for a long tail of requests to be much, much slower</Src>.
        As one published data point, the <Link href={CASE}>case study</Link> reports search response time going from 3.5 seconds to
        180 milliseconds after search moved from direct database queries to Elasticsearch with a Redis cache.{' '}
        <em>Verify:</em> load test against a production-size index with a realistic mix of filter, text and
        geographic queries, and report the percentiles against the budget. Polygon and viewport queries are
        covered in <Link href="/blog/map-based-property-search">map-based property search</Link>.
      </p>
      <h3>P4. Write-heavy work does not starve reads</h3>
      <p>
        The system must keep search and page latency inside budget while a bulk import, a reindex or an alert
        run is in progress; these jobs share databases and search nodes with visitor traffic. <em>Verify:</em> repeat the P3 load test while a full import
        and a reindex run. Queue design is in{' '}
        <Link href="/blog/background-jobs-redis-bullmq">background jobs with Redis and BullMQ</Link>, and alert
        fan-out in <Link href="/blog/saved-searches-listing-alerts">saved searches and listing alerts</Link>.
      </p>

      <h2>Production operations</h2>
      <p>
        These five are about whether the system tells the people who run it what they need to know in time to
        act.
      </p>
      <h3>O1. Signals and objectives are written down</h3>
      <p>
        The system must expose, per feed, the time since the last successful cycle, records processed, failures
        and queue depth; and for visitor traffic, what Google&apos;s SRE book calls{' '}
        <Src href={SRE_MON}>the four golden signals of monitoring: latency, traffic, errors, and saturation</Src>.
        Each should be tied to an objective in the book&apos;s sense,{' '}
        <Src href={SRE_SLO}>a target value or range of values for a service level that is measured by an SLI</Src>.
        The objectives are D2, P2 and P3 above, plus an availability target the team sets.{' '}
        <em>Verify:</em> inject a failed feed, a slow search and an error spike in staging; each appears on the
        dashboard within the interval the team set.
      </p>
      <h3>O2. Alerts are actionable and have runbooks</h3>
      <p>
        Every alert that pages a person must describe a condition that person can do something about, and link
        to a runbook. The SRE book&apos;s rule is short:{' '}
        <Src href={SRE_MON}>every page should be actionable</Src>. A minimum set of runbooks for an IDX
        platform: a feed returns authentication errors; a feed is stale; the index must be rebuilt; a listing
        must be taken down now. <em>Verify:</em> during a game day, an
        engineer who did not write the runbook follows it to resolution.
      </p>
      <h3>O3. Backups are restored on a schedule</h3>
      <p>
        The team must set a recovery point and a recovery time for each store, and the system must meet them in
        a rehearsed restore. Sort the stores first. Consumer accounts, saved searches, enquiries and
        configuration exist nowhere else. Listing data can be replicated again, but only as fast as the feed
        allows (MLS Grid, for example, caps consumers at{' '}
        <Src href={GRID}>2 requests per second</Src>), so a backup of it still shortens recovery. Use each
        engine&apos;s supported method. PostgreSQL&apos;s continuous archiving supports point-in-time recovery,
        where <Src href={PG_PITR}>it is possible to restore the database to its state at any time since your base backup was taken</Src>.
        For Elasticsearch, <Src href={ES_SNAPSHOT}>taking a snapshot is the only reliable and supported way to back up a cluster</Src>;
        under A3 a rebuild from the system of record is the alternative. <em>Verify:</em> restore into a clean
        environment on a schedule, time it, and compare the result with the targets.
      </p>
      <h3>O4. Deploys are reversible and environments are separate</h3>
      <p>
        The system must be able to roll back any release, which means schema changes that the previous version
        can still run against and index changes made by building a new index beside the old one and switching.
        Staging must have its own credentials, stores and search cluster. The case study describes{' '}
        <Link href={CASE}>separate environments for USA Live, Canada Live and Staging</Link>, each with its own
        Elasticsearch and Redis, so that staging changes never touch production data. Whether a feed credential
        may be used in a non-production environment is a question for the agreement.{' '}
        <em>Verify:</em> roll back the latest release in staging, including its schema and index changes.
      </p>
      <h3>O5. Incidents have an owner and a notification path</h3>
      <p>
        The team must define severity levels, who is on call, and who decides, and must treat a display-rule
        breach, a leaked credential and suspected scraping as incidents alongside outages. Some of these carry
        duties to the MLS. MLS Grid&apos;s rules say that a suspicion of scraping{' '}
        <Src href={GRID_IDX}>must be reported to MLS GRID or the applicable MLS immediately</Src>.{' '}
        <em>Verify:</em> run a tabletop exercise for a display-rule breach and a leaked credential, and file the
        written review. Outbound notifications to other systems are covered in{' '}
        <Link href="/blog/webhook-event-driven-integrations">webhook and event-driven integrations</Link>.
      </p>

      <h2>Questions for the MLS agreement</h2>
      <p>
        Several requirements take a value or a constraint from the license. We do not state what any MLS
        requires beyond the quoted examples; put these to each MLS or data platform in writing.
      </p>
      <ul>
        <li><strong>A1, A4:</strong> must data and media be replicated and served locally, or is live querying permitted?</li>
        <li><strong>A5:</strong> may one credential or feed serve more than one brokerage&apos;s site, and how must the source be identified?</li>
        <li><strong>D2:</strong> what is the maximum interval between refreshes?</li>
        <li><strong>D3:</strong> how are removals signaled, how quickly must they take effect, and which statuses may remain on display?</li>
        <li><strong>S3:</strong> which fields are confidential, which seller opt-outs apply, and do the rules differ for a registered-user display?</li>
        <li><strong>S5, O5:</strong> what does the agreement require on scraping, security measures and incident notice?</li>
        <li><strong>O3, O4:</strong> may listing data be held in backups and non-production environments, and what must be deleted when the license ends?</li>
      </ul>

      <h2 id="requirements">Acceptance testing: the requirements table</h2>
      <p>
        Use the table as the acceptance section of a statement of work, or as a review sheet for a platform that
        already exists. Three practices make it workable:
      </p>
      <ul>
        <li><strong>Build a fixture feed.</strong> Most verifications need a source you control: a small synthetic data set served in the feed&apos;s format, in which a record can be changed, restricted or removed on demand.</li>
        <li><strong>Automate what repeats.</strong> The access tests (S2), display-rule tests (S3) and the rendered-content check (P1) belong in CI. Restore drills (O3) and game days (O2, O5) belong on a calendar.</li>
        <li><strong>Record evidence.</strong> For each row keep the date, the result and the number the team set. A requirement with no recorded run is unverified, whatever the code looks like.</li>
      </ul>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>Id</th><th>Requirement</th><th>How to verify</th></tr>
          </thead>
          <tbody>
            {REQUIREMENTS.flatMap((g) => [
              <tr key={g.group}><th colSpan={3} scope="colgroup">{g.group}</th></tr>,
              ...g.rows.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.id}</strong></td>
                  <td>{r.must}</td>
                  <td>{r.verify}</td>
                </tr>
              )),
            ])}
          </tbody>
        </table>
      </div>

      <GuideFaq slug={SLUG} items={[
        { question: 'What makes an IDX platform production-ready?', answer: ['Evidence, not features. A platform is ready when each requirement for architecture, data reliability, security, performance and operations has a verification that has been run and recorded. The table in this article lists 25 such requirements.'] },
        { question: 'How fresh does IDX listing data have to be?', answer: ['The outer limit comes from your MLS agreement. As one published example, MLS Grid’s IDX Rules require a refresh ', ['at least once every twelve (12) hours', GRID_IDX], '. Treat that as a ceiling: set a tighter maximum age per feed, measure it, and alert before it is reached.'] },
        { question: 'Should listing pages query the MLS API directly?', answer: ['No. Serve pages from your own replica. Some platforms offer no alternative; MLS Grid states that it ', ['does not support real time data access and provides data through a replication process', GRID], '. Even where live queries exist, a page that depends on them inherits the feed’s latency, rate limits and outages.'] },
        { question: 'What search latency should an IDX platform target?', answer: ['The team has to set it, as a percentile under a stated load and index size, because it depends on the query mix and hardware. Averages hide slow requests: Google’s SRE book notes it is ', ['entirely possible for most of the requests to be fast, but for a long tail of requests to be much, much slower', SRE_SLO], '. Page-level targets can start from the published Core Web Vitals thresholds, such as a Largest Contentful Paint ', ['within 2.5 seconds', WEB_VITALS], '.'] },
      ]} />

      <p className="cp-note">
        Sources were read on their publishers&apos; pages on October 13, 2026. MLS Grid&apos;s documentation and
        IDX Rules are quoted as one public example; every MLS sets its own terms, and your license agreement
        decides. This article is not legal advice. The requirements and verification methods are our engineering
        recommendations, not a description of any client system except where the case study is cited.
      </p>
      <p>
        We build and review this kind of platform as part of our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration</Link> work, from our office in
        Noida, India. Every project starts with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
