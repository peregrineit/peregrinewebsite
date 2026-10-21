import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import ParallelRunMigrationDiagram from '../../components/diagrams/ParallelRunMigrationDiagram';

const SLUG = 'legacy-real-estate-platform-data-migration';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-13; the text relied on for each link is logged in
// docs/content/sources/legacy-real-estate-platform-data-migration.md. SQL blocks are illustrative.
const G_MOVE = 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes';
const G_SOFT404 = 'https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors';
const PG_LOGICAL = 'https://www.postgresql.org/docs/current/logical-replication.html';
const PG_RESTRICT = 'https://www.postgresql.org/docs/current/logical-replication-restrictions.html';
const MONGO_CS = 'https://www.mongodb.com/docs/manual/changestreams/';
const DMS_INTRO = 'https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html';
const DMS_VALIDATE = 'https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Validating.html';
const FOWLER = 'https://martinfowler.com/bliki/StranglerFigApplication.html';
const OWASP_PW = 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html';
const TRESTLE_FAQ = 'https://trestle-documentation.corelogic.com/support/faq/';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const GRID_BP = 'https://www.mlsgrid.com/s/MLS-Grid-Best-Practices-Guide-2.pdf';
const GRID_MARIS = 'https://docs.mlsgrid.com/recent-releases/maris-mls-migration-to-new-mls-system-and-new-originatingsystemname';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What makes a real estate migration different</h2>
      <p>
        A brokerage platform, an agent-website product or a proptech application reaches the point where the old
        system cannot be extended: an unsupported framework, a schema that grew by accretion, a vendor being left
        behind. The rebuild gets the attention. The data move decides whether the launch is quiet, and in this
        industry it has three properties that generic migration advice misses.
      </p>
      <ul>
        <li><strong>The largest dataset is not yours to move.</strong> Listings are licensed from the MLS and arrive through a feed. They are re-fetched, not migrated.</li>
        <li><strong>The most valuable data is small and relational.</strong> Users, saved searches, leads and their history are typically a small part of the rows and most of the business value. They are also the data most likely to be subtly wrong in the old system.</li>
        <li><strong>Visitors arrive on URLs you are about to change.</strong> Listing, area and agent pages are entry points from search, email alerts and printed material.</li>
      </ul>

      <h2>What moves, what is re-fetched, what is left behind</h2>
      <p>Start with an inventory that sorts every dataset into one of three treatments.</p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Data</th><th>Treatment</th><th>Why</th><th>What goes wrong</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Listing records and MLS photos</strong></td>
              <td>Re-fetch from the feed</td>
              <td>The data is licensed, the feed is the authority, and the new system needs its own sync state</td>
              <td>Copying stale or no-longer-licensed records; references to old internal listing ids</td>
            </tr>
            <tr>
              <td><strong>Users and credentials</strong></td>
              <td>Migrate</td>
              <td>Accounts cannot be recreated; password hashes cannot be reversed</td>
              <td>Duplicate accounts per email; hashes in an old algorithm; lost consent and unsubscribe flags</td>
            </tr>
            <tr>
              <td><strong>Saved searches and favorites</strong></td>
              <td>Migrate and translate</td>
              <td>They are the user&apos;s stated intent and drive alert email</td>
              <td>Criteria that mean something different in the new search; an alert storm on the first run</td>
            </tr>
            <tr>
              <td><strong>Leads and their history</strong></td>
              <td>Migrate, append-only</td>
              <td>Source, timestamps, assignment and conversation history are the CRM&apos;s value</td>
              <td>Flattened history; lost original timestamps; leads re-assigned or re-notified by import side effects</td>
            </tr>
            <tr>
              <td><strong>Agent and office records</strong></td>
              <td>Migrate; reconcile with the feed&apos;s Member and Office data</td>
              <td>Profiles, bios and routing rules are yours; license identifiers come from the MLS</td>
              <td>Agents matched by name instead of MLS identifier</td>
            </tr>
            <tr>
              <td><strong>Content and URLs</strong></td>
              <td>Migrate, with a URL map</td>
              <td>Area pages, posts and landing pages carry search equity and inbound links</td>
              <td>Unmapped URLs; internal links pointing at the old scheme</td>
            </tr>
            <tr>
              <td><strong>Your own media</strong> (agent photos, uploads, documents)</td>
              <td>Migrate</td>
              <td>No other copy exists</td>
              <td>Database rows moved and files left behind, or the reverse</td>
            </tr>
            <tr>
              <td><strong>Derived data</strong> (search indexes, caches, analytics rollups)</td>
              <td>Regenerate</td>
              <td>It can be rebuilt from the data above</td>
              <td>Migrating it anyway and importing old bugs</td>
            </tr>
            <tr>
              <td><strong>Sessions, queued jobs, logs</strong></td>
              <td>Leave behind or archive</td>
              <td>Short-lived or not needed by the new system</td>
              <td>In-flight jobs lost at cutover with nobody noticing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Why listings are re-fetched</h3>
      <p>
        Three reasons, in order of weight. First, ownership: Trestle&apos;s documentation states that for
        multiple listing data{' '}
        <Src href={TRESTLE_FAQ}>the MLO is the copyright holder and data licensor</Src>, and that MLOs{' '}
        <Src href={TRESTLE_FAQ}>typically require a real estate broker or agent to ratify the contract</Src> and
        disallow certain uses. A license that specific may not carry over to a new platform. As one published
        example, MLS Grid&apos;s IDX rules prohibit{' '}
        <Src href={GRID_IDX}>sharing the MLS Grid data compilation with any third party not authorized by MLS Grid</Src>.
        If the new platform is run by a different vendor or under a different agreement, check before a single
        record is copied.
      </p>
      <p>
        Second, correctness: a legacy listings table holds whatever the old sync got wrong, and a fresh import
        carries none of it. Third, mechanics: the new sync engine needs its own cursor and raw store, and it only
        has them after its own initial import. MLS platforms treat a change of source the same way; when MARIS moved to a new MLS
        system, MLS Grid told consumers to{' '}
        <Src href={GRID_MARIS}>treat the change as an initial import of a new MLS source</Src>. Plan the import
        as a project task with a lead time: MLS Grid asks consumers to{' '}
        <Src href={GRID_BP}>contact support in advance to request a grace period</Src> when an initial import will
        exceed normal limits. <Link href="/blog/mls-sync-engine">Building an MLS sync engine</Link> covers the
        import itself.
      </p>
      <p>
        What does migrate is every <em>reference</em> to a listing: favorites, lead inquiries, showing requests,
        notes. Those must be re-keyed from the old system&apos;s internal id to the listing&apos;s stable
        identity, the originating MLS and its listing key, and then resolved against the freshly imported data.
        References to listings that are no longer in the feed should be kept as history with the minimum needed
        to describe them, subject to your license, not resurrected as listing records.
      </p>

      <h3>Details that bite in user and lead data</h3>
      <ul>
        <li>
          <strong>Passwords.</strong> You can move hashes, not passwords. If the legacy algorithm is weak, OWASP
          describes two routes: <Src href={OWASP_PW}>re-hash with the new algorithm when the user next enters their password</Src>,
          or <Src href={OWASP_PW}>use the existing hashes as inputs for a more secure algorithm</Src> so no weak
          hash remains at rest. Decide before cutover; a forced reset for every user on launch day is a support
          event.
        </li>
        <li><strong>Consent and suppression.</strong> Unsubscribes, do-not-contact flags and communication preferences move with the user, and the import must not trigger welcome or verification email.</li>
        <li><strong>Saved searches.</strong> Translate criteria into the new search schema field by field, and test that the translated search returns a comparable result set. Carry over each search&apos;s <Link href="/blog/saved-searches-listing-alerts">last-notified state</Link>, or the first alert run after cutover treats the whole market as new.</li>
        <li><strong>Lead history.</strong> Import <Link href="/blog/real-estate-crm-architecture">events with their original timestamps and authors</Link>, with automation switched off for the import: no assignment rules, no notifications, no drip campaigns starting from day one.</li>
        <li><strong>Tenancy.</strong> If the old system kept all tenants in shared tables, the migration is the moment to assign every row an owner. Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes a platform where all agents shared configuration, leads and property data in flat collections, and MongoDB collections were restructured for clean multi-tenant separation. <Link href="/blog/multi-tenant-real-estate-saas">Multi-tenant real estate SaaS</Link> covers the target design.</li>
      </ul>

      <h2>Four strategies</h2>
      <p>
        The strategies differ in how long both systems are live, and therefore in how much machinery is needed to
        keep them consistent.
      </p>
      <h3>Big-bang cutover</h3>
      <p>
        Stop the old system, copy everything, start the new one. There is never a moment with two writable
        systems, which makes it the simplest to reason about. Its costs are a downtime window sized by the
        slowest dataset, and a rollback that gets worse by the hour, since anything written to the new system
        after launch is lost on return.
      </p>
      <h3>Phased by tenant or by feature</h3>
      <p>
        Move one office, one brand or one group of agents at a time, or one capability at a time (content first,
        then accounts, then the CRM). Each phase is a small big-bang, and the first phases find the mapping
        errors while they are cheap. The cost is a routing layer that knows which tenant or feature lives where,
        and a period in which reports span two systems. Google gives the same
        advice for the URL side of a move:{' '}
        <Src href={G_MOVE}>initially move just a piece of the site to test any effects on traffic and search indexing</Src>.
      </p>
      <h3>Parallel run</h3>
      <p>
        Load the new system while the old one stays live, keep the new one in step, verify, then switch. Two
        mechanisms keep it in step:
      </p>
      <ul>
        <li>
          <strong>Change data capture (CDC).</strong> The database reports its own changes. PostgreSQL&apos;s
          logical replication <Src href={PG_LOGICAL}>takes a snapshot of the table&apos;s data, copies it to the subscriber, and then sends changes continually</Src>,
          applied <Src href={PG_LOGICAL}>in the same order as the publisher</Src>. MongoDB change streams let an
          application <Src href={MONGO_CS}>subscribe to all data changes on a collection, a database or an entire deployment</Src>,
          and are <Src href={MONGO_CS}>resumable by specifying a resume token</Src>. Managed services package the
          pattern; AWS DMS, for one, can{' '}
          <Src href={DMS_INTRO}>perform one-time migrations or replicate ongoing changes to keep sources and targets in sync</Src>.
        </li>
        <li>
          <strong>Dual writes.</strong> The application writes each change to both systems. It needs no database
          feature, which is its appeal when the legacy database is old or hosted somewhere restrictive. Its
          weakness is that two writes are not one transaction: when the second fails, the systems disagree, so
          dual writes need a retry queue and the same reconciliation checks as CDC.
        </li>
      </ul>
      <p>
        CDC has limits to read before relying on it. PostgreSQL&apos;s documentation lists that{' '}
        <Src href={PG_RESTRICT}>the database schema and DDL commands are not replicated</Src> and that{' '}
        <Src href={PG_RESTRICT}>sequence data is not replicated</Src>, so sequences must be brought up to date
        before a switchover. MongoDB notes that to resume a change stream{' '}
        <Src href={MONGO_CS}>the oplog must have enough history to locate the operation</Src>; a consumer that is
        down for too long has to start over with a new bulk copy. And raw replication copies the old shape. When
        the schemas differ, which is usually the point of the project, the stream feeds a transformer, not the
        target tables.
      </p>
      <h3>Strangler pattern</h3>
      <p>
        Put a routing layer in front of the old system and move one slice of functionality at a time behind it
        until nothing is left. Martin Fowler, who named it, describes the{' '}
        <Src href={FOWLER}>strangler fig as a gradual approach to legacy modernization</Src> and argues that{' '}
        <Src href={FOWLER}>the reduced risk and earlier value from the gradual approach outweigh its costs</Src>.
        For data it means each slice brings its tables with it, and for a while some entities are owned by the
        old system and some by the new, with a defined owner for every one.
      </p>
      <h3>Choosing</h3>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Strategy</th><th>Fits when</th><th>Downtime</th><th>Rollback</th><th>Extra machinery</th></tr></thead>
          <tbody>
            <tr><td><strong>Big-bang</strong></td><td>Small data, one tenant or few, a real quiet period</td><td>The whole copy</td><td>Simple before launch, lossy after</td><td>Little: scripts and a rehearsal</td></tr>
            <tr><td><strong>Phased by tenant or feature</strong></td><td>Many tenants with few shared records; separable features</td><td>Short, per phase</td><td>Per phase; small blast radius</td><td>Routing by tenant or feature; cross-system reporting</td></tr>
            <tr><td><strong>Parallel run</strong></td><td>Downtime must be minutes; data is large or busy</td><td>A brief write freeze</td><td>Clean while reverse sync runs</td><td>CDC or dual writes, a transformer, reconciliation</td></tr>
            <tr><td><strong>Strangler</strong></td><td>Large or poorly understood system; no fixed end date</td><td>None planned</td><td>Per slice, by routing</td><td>A routing layer and clear data ownership per entity</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The strategies combine. A sound shape for a multi-tenant real estate platform is a parallel
        run for the shared data with cutover phased by tenant.
      </p>

      <h2>A parallel run on a timeline</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><ParallelRunMigrationDiagram /></div>
        <figcaption>
          A parallel-run migration. The legacy system is the source of truth until cutover; the new system is
          afterwards, with changes synced back until the rollback window closes.
        </figcaption>
      </figure>
      <p>The timeline as a list:</p>
      <ol>
        <li><strong>Backfill.</strong> The legacy system serves all traffic. Its data is bulk-copied into the new system through the transformation code.</li>
        <li><strong>Sync and verify.</strong> Changes flow continuously from legacy to new, by CDC or dual writes. The new system receives shadow reads. Three verification gates must pass: counts, checksums and sampled records.</li>
        <li><strong>Cutover.</strong> Freeze writes, let the final changes drain, run the gates one last time, arm reverse sync, switch traffic and turn on redirects.</li>
        <li><strong>Rollback window.</strong> The new system is the source of truth. Changes are synced back to the legacy system, which stands by read-only, so a return loses nothing.</li>
        <li><strong>Retire.</strong> When the window closes, reverse sync stops, rollback is no longer possible and the legacy system is archived.</li>
        <li><strong>Throughout,</strong> listing data follows its own lane: <Link href="/services/mls-idx-integration">a fresh import from the MLS feed into the new system</Link>, then incremental sync. It is never copied from legacy.</li>
      </ol>

      <h2>Mapping and transformation</h2>
      <p>The transformation code is the part of the migration that is actually software. Four rules keep it honest.</p>
      <p>
        <strong>Keep a permanent id map.</strong> Every migrated row records where it came from. The map is what
        makes the load repeatable, lets foreign keys be re-pointed, powers the URL redirects and answers support
        questions a year later. An illustrative shape:
      </p>
      <pre className="cp-code"><code>{`-- Illustrative. One row per migrated record.
CREATE TABLE migration_id_map (
  entity         text        NOT NULL,   -- 'user', 'lead', 'saved_search', 'agent', 'page'
  legacy_id      text        NOT NULL,
  new_id         uuid        NOT NULL,   -- several legacy ids may share one when duplicates are merged
  tenant_id      uuid        NOT NULL,
  source_hash    text        NOT NULL,   -- hash of the legacy row as last migrated
  migrated_at    timestamptz NOT NULL,
  run_id         text        NOT NULL,
  PRIMARY KEY (entity, legacy_id)
);`}</code></pre>
      <p>
        <strong>Make every load repeatable.</strong> A loader looks up the map, inserts when the legacy id is new
        and updates when the source hash has changed. Then the backfill, the continuous sync and a re-run after a
        bug fix are the same code path.
      </p>
      <p>
        <strong>Write the mapping down as a table people can review.</strong> One row per target field: source
        field, transformation, default, and what happens to values that do not fit. The rows that need a business
        decision (two accounts with one email, a lead with no agent, a status the new system does not have) are
        found here, weeks before cutover, and decided by someone who owns the outcome.
      </p>
      <p>
        <strong>Quarantine, do not drop.</strong> A row that fails transformation goes to a rejects table with
        its reason. The count of rejects by reason is a progress report in itself, and it must reach zero or an
        agreed, written exception list before cutover.
      </p>
      <p>
        Watch the usual technical edges as well: time zones (legacy systems often store local time with no
        zone), text encodings, free-text fields that became enumerations, soft-deleted rows, and orphans whose
        parent was deleted long ago.
      </p>

      <h2>Validation and reconciliation</h2>
      <p>
        &ldquo;The script finished without errors&rdquo; is not evidence. The three gates in the diagram are
        three levels of proof, each catching what the previous one cannot.
      </p>
      <ul>
        <li>
          <strong>Counts.</strong> Rows per entity, per tenant, and per meaningful group (leads by status, users
          by role, saved searches by active flag). Totals alone hide offsetting errors; grouped counts expose
          them. Every difference is explained by the rejects table or it is a bug.
        </li>
        <li>
          <strong>Checksums.</strong> For each entity, compute a hash over the fields that should survive
          unchanged, in a canonical form, on both sides, and compare by key. This finds truncated text, shifted
          timestamps and mangled characters that counts never will.
        </li>
        <li>
          <strong>Sampled record comparison.</strong> Take a random sample and a deliberate sample (the oldest
          records, the largest accounts, the known odd cases) and compare them through the application: log in
          as the user, open the lead, run the saved search. Fields the migration converts can only be checked this way,
          because their hashes are supposed to differ.
        </li>
      </ul>
      <p>An illustrative checksum query in PostgreSQL syntax, run on each side and compared by key:</p>
      <pre className="cp-code"><code>{`-- Illustrative. Same projection on both systems, keyed by the legacy id.
-- Every field is wrapped in coalesce: concat_ws skips NULLs, which would let
-- (NULL, 'x') and ('x', NULL) produce the same hash.
SELECT legacy_id,
       md5(concat_ws('|',
           coalesce(lower(trim(email)), ''),
           coalesce(phone_e164, ''),
           -- created_at is timestamptz on both sides; compare it in UTC
           coalesce(to_char(created_at AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS'), ''),
           coalesce(assigned_agent_legacy_id, '')
       )) AS row_hash
FROM   leads_for_comparison
ORDER  BY legacy_id;`}</code></pre>
      <p>
        Tools can do the row comparison for like-for-like copies. AWS DMS documents a validation feature that{' '}
        <Src href={DMS_VALIDATE}>compares each row in the source with its corresponding row at the target, verifies the rows contain the same data, and reports any mismatches</Src>.
        It does not know your business rules, so add invariants of your own: every lead belongs to exactly one
        tenant, every saved search has an owner who can log in, no agent has two profiles, every favorite
        resolves to a listing or is marked historical.
      </p>
      <p>
        Finally, shadow reads: during the parallel run, send a copy of real read requests to the new system and
        compare the answers, so the test uses the queries users actually make. Run all of these continuously, not
        once at the end. A gate is a query that returns zero rows.
      </p>

      <h2>URL preservation and redirects</h2>
      <p>
        If the URL scheme changes at all, Google treats it as a site move with URL changes, and its guidance is
        specific:
      </p>
      <ul>
        <li><Src href={G_MOVE}>Prepare a URL mapping from the current URLs to their corresponding new format</Src>. Build the list of old URLs from <Src href={G_MOVE}>your sitemaps and from server logs or analytics for the URLs that get the most traffic</Src>.</li>
        <li><Src href={G_MOVE}>Use HTTP permanent redirects if possible, such as 301 and 308</Src>, set up on the server.</li>
        <li><Src href={G_MOVE}>Avoid chaining redirects</Src>; redirect to the final destination directly.</li>
        <li><Src href={G_MOVE}>Do not redirect many old URLs to one irrelevant destination, such as the home page</Src>, which Google says may be treated as a soft 404.</li>
        <li>For content that is not moving, <Src href={G_MOVE}>return an HTTP 404 or 410</Src>.</li>
        <li><Src href={G_MOVE}>Keep the redirects for as long as possible, generally at least 1 year</Src>.</li>
        <li><Src href={G_MOVE}>Expect temporary fluctuation in site ranking during the move</Src>, and <Src href={G_MOVE}>time the move to coincide with lower traffic, if possible</Src>.</li>
      </ul>
      <p>For a real estate site the mapping has four families, and they are handled differently:</p>
      <ul>
        <li><strong>Listing pages.</strong> Old listing URLs usually contain the old internal id or the MLS number. Map them through the listing&apos;s stable identity to the new URL. This is a rule plus a lookup, not a static table, because listings keep changing. A URL for a listing that is no longer available gets the treatment in <Link href="/blog/listing-lifecycle-sold-expired-deleted">handling deleted, expired and sold listings</Link>: Google&apos;s instruction is to <Src href={G_SOFT404}>return a 404 or 410 when there is no replacement</Src>, not to redirect to search results.</li>
        <li><strong>Area, neighborhood and building pages.</strong> A finite list. Map one to one and check every row.</li>
        <li><strong>Agent and office pages.</strong> Map through the id map; agents who have left go to their office page only if that is a real replacement.</li>
        <li><strong>Search URLs with query strings.</strong> Saved in emails and bookmarks. Translate the parameters that matter and drop the rest; test the most frequent patterns from the logs.</li>
      </ul>
      <p>
        Test the redirect map before launch by replaying the old URL list against the new system and recording
        the status and final destination of each. After launch, watch the 404 log daily for the first weeks; it
        is the list of mappings you missed. Google also warns that after a move it{' '}
        <Src href={G_MOVE}>will temporarily crawl the new site more heavily than usual</Src>, so size the new
        system for that.
      </p>

      <h2>Rollback planning</h2>
      <p>
        A rollback plan is a decision made in advance about data, not a hope that the old servers still boot.
        Four things define it.
      </p>
      <ul>
        <li><strong>Where new writes go.</strong> From the moment the new system accepts writes, returning to the old one loses them unless they are synced back. Reverse sync is the price of a clean rollback. If it is not built, say so plainly: the plan is then &ldquo;fix forward&rdquo;, and the gates before cutover must be stricter.</li>
        <li><strong>The window.</strong> A fixed period, agreed beforehand, during which the legacy system is kept current and can take traffic again. It ends on a date, with a named person deciding to close it.</li>
        <li><strong>The triggers.</strong> Written conditions that cause a rollback without debate: a gate failing after cutover, logins failing above a threshold, leads not reaching agents, alerts sending wrongly.</li>
        <li><strong>What does not roll back.</strong> Emails already sent, redirects that search engines and browsers have already seen, changes in third-party systems, and the MLS-side configuration of the new feed. List them, so nobody expects a rollback to undo them.</li>
      </ul>
      <p>
        Rehearse the rollback as well as the cutover: switch to the new system, write test data, switch back,
        and confirm the data arrived in the legacy system.
      </p>

      <h2>Cutover runbook</h2>
      <p>
        A runbook is a numbered list with an owner, an expected duration and a verification for every step. The
        outline below is a starting point for a parallel-run cutover; durations come from your rehearsals.
      </p>
      <ol>
        <li><strong>Days before:</strong> the MLS import in the new system is complete and syncing; gates have been green for an agreed period; redirects are tested against the old URL list; a full rehearsal, including rollback, has been run on production-sized data.</li>
        <li><strong>Announce</strong> the window to agents and staff. Lower DNS time-to-live values if DNS will change.</li>
        <li><strong>Pause side effects</strong> in both systems: alert email, drip campaigns, lead routing notifications, outbound webhooks.</li>
        <li><strong>Freeze writes</strong> on the legacy system (maintenance mode for forms and logins; public pages stay readable).</li>
        <li><strong>Drain:</strong> wait for replication lag or the dual-write queue to reach zero.</li>
        <li><strong>Final gates:</strong> counts, checksums, invariants. Bring sequences and counters in the new database up to date.</li>
        <li><strong>Go or no-go,</strong> decided by the named owner against the written criteria. A no-go here costs only the unfreeze.</li>
        <li><strong>Arm reverse sync</strong> from the new system to the legacy one before any traffic moves, so the first write the new system accepts is captured. The legacy system stays closed to user writes.</li>
        <li><strong>Switch traffic</strong> to the new system and enable redirects.</li>
        <li><strong>Smoke tests</strong> through the public site: log in as a test user, submit a lead and confirm it reaches the right agent, run a saved search, open a listing, follow ten old URLs.</li>
        <li><strong>Resume side effects</strong> one at a time, alert email last, after checking that the first batch is the size you expect.</li>
        <li><strong>Watch</strong> error rates, the 404 log, login failures, lead flow and sync lag for the MLS feeds through the rollback window.</li>
        <li><strong>Close the window:</strong> stop reverse sync, take a final archive of the legacy data under your retention policy, remove legacy copies of MLS data as your license requires, and decommission.</li>
      </ol>
      <p>
        The case study mentioned above reports one more step worth copying: the full stack was load-tested with
        simulated 200-agent traffic before go-live.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should listing data be migrated from the old platform?', answer: ['Usually not. Listings are licensed data: Trestle’s documentation says that for multiple listing data ', ['the MLO is the copyright holder and data licensor', TRESTLE_FAQ], '. Run a fresh import from the MLS feed into the new system, and migrate only your references to listings (favorites, inquiries), re-keyed to the originating MLS and listing key.'] },
        { question: 'What is the difference between dual writes and change data capture?', answer: ['With dual writes the application sends each change to both systems. With change data capture the database reports its own changes, for example through PostgreSQL logical replication or ', ['MongoDB change streams', MONGO_CS], '. Dual writes need no database feature but can leave the systems inconsistent when one write fails; both approaches need reconciliation checks.'] },
        { question: 'How do you verify that a data migration is correct?', answer: ['In three levels: grouped row counts per entity and tenant, checksums over unchanged fields compared by key, and sampled records compared through the application. Add business invariants and, during a parallel run, shadow reads. Each check should be a query that returns zero rows when the data is right.'] },
        { question: 'How long should redirects from old URLs be kept?', answer: ['Google’s guidance for site moves is to ', ['keep the redirects for as long as possible, generally at least 1 year', G_MOVE], '. It also advises against redirecting many old URLs to one irrelevant page such as the home page.'] },
        { question: 'Can user passwords be migrated?', answer: ['The hashes can; the passwords themselves cannot be recovered. If the old hashing algorithm is weak, OWASP describes re-hashing when the user next logs in, or wrapping the existing hashes by using them ', ['as inputs for a more secure algorithm', OWASP_PW], '.'] },
      ]} />

      <p className="cp-note">
        Search guidance, database documentation, OWASP guidance and MLS platform documentation were read from the
        linked pages on October 13, 2026. MLS license terms differ by MLS and agreement; MLS Grid and Trestle are
        cited as published examples, and your own agreements decide what may be copied or retained. SQL blocks
        are illustrative.
      </p>
      <p>
        Planning a move off a legacy platform? See our{' '}
        <Link href="/services/saas-development">SaaS development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
