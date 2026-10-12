import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import SyncCycleDiagram from '../../components/diagrams/SyncCycleDiagram';

const SLUG = 'mls-sync-engine';
export const metadata = guideMetadata(SLUG);

// Sources fetched 2026-10-12 and re-checked 2026-10-13; the sentence relied on for each link is logged in
// docs/content/sources/mls-sync-engine.md. Code and schema blocks are illustrative, not from a client system.
const RESO_API = 'https://www.reso.org/reso-web-api/';
const RESO_CORE = 'https://transport.reso.org/proposals/web-api-core/';
const RESO_EE_BLOG = 'https://www.reso.org/blog/entityevent-resource/';
const RESO_EVENTS = 'https://transport.reso.org/proposals/entity-events/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_BP = 'https://www.mlsgrid.com/s/MLS-Grid-Best-Practices-Guide-2.pdf';
const GRID_MARIS = 'https://docs.mlsgrid.com/recent-releases/maris-mls-migration-to-new-mls-system-and-new-originatingsystemname';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const TRESTLE_API = 'https://trestle-documentation.corelogic.com/web-api/';
const TRESTLE_REF = 'https://trestle-documentation.corelogic.com/web-api/reference/';
const TRESTLE_SCALE = 'https://trestle-documentation.corelogic.com/web-api/at-scale/';
const PG_INSERT = 'https://www.postgresql.org/docs/current/sql-insert.html';
const RFC_6585 = 'https://www.rfc-editor.org/rfc/rfc6585.html';
const BULLMQ_RETRY = 'https://docs.bullmq.io/guide/retrying-failing-jobs';
const BULLMQ_DEDUP = 'https://docs.bullmq.io/guide/jobs/deduplication';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Where a sync engine breaks</h2>
      <p>
        The first version of an MLS sync is usually a scheduled script: ask the feed for records changed since the
        last run, save them, remember the time. It works for one feed on a quiet day. It stops being correct in
        five situations, and none of them raises an error on its own: the process dies halfway through a page; the
        feed re-stamps every record at once; the feed is unreachable for a day; a second and third board are added
        to the same job; a field arrives that the code has never seen.
      </p>
      <p>
        RESO describes the job in one sentence:{' '}
        <Src href={RESO_API}>replicators initially pull an entire data set, and then continually request the most recent data changes</Src>.
        Our <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline reference architecture</Link> places
        that job as stage two of nine and lists the platform limits around it. This article is about the inside of
        that stage: the loop, the checkpoint, the queue behind it, and what the engine does when each step fails.
      </p>

      <h2>One sync cycle</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><SyncCycleDiagram /></div>
        <figcaption>
          One cycle of a sync job for a single feed and resource. Solid arrows are the normal path; dashed boxes
          are what happens when a step fails.
        </figcaption>
      </figure>
      <p>The same cycle as a list:</p>
      <ol>
        <li><strong>Read the checkpoint</strong> for this feed and resource. It holds the cursor.</li>
        <li><strong>Fetch one page</strong> of records changed since the cursor, through the rate limiter. On a 429, a 5xx or a timeout: back off and retry the same request. The cursor does not move.</li>
        <li><strong>Write the page to the raw store</strong> with an idempotent upsert keyed by the record key.</li>
        <li><strong>Advance the cursor</strong> in the same transaction as the write. If either fails, both roll back and the next run fetches the page again.</li>
        <li><strong>Enqueue downstream work</strong> (normalize, media, index). If enqueueing fails, the rows stay marked unprocessed and a sweeper re-queues them. A record that keeps failing downstream is quarantined; it never holds the cursor back.</li>
        <li>If the response carried a next link, go back to the fetch step. If not, record the time of the successful run and wait for the next one.</li>
      </ol>
      <p>
        Everything else in this article is a consequence of two decisions in that loop: the cursor only moves
        after a durable write, and every write can be repeated without harm.
      </p>

      <h2>The checkpoint: what to store and when to move it</h2>
      <p>
        On MLS Grid and Trestle the cursor is a timestamp. RESO&apos;s Web API Core tests page
        through results filtered on ModificationTimestamp because it is{' '}
        <Src href={RESO_CORE}>the only required field at this point</Src>, and providers{' '}
        <Src href={RESO_CORE}>must support server-driven paging using @odata.nextLink</Src>. Three platform rules
        shape what goes in the checkpoint row:
      </p>
      <ul>
        <li>
          <strong>The value comes from the feed, not from your clock.</strong> Trestle recommends{' '}
          <Src href={TRESTLE_SCALE}>tracking the latest value you received</Src> so that clock differences do not
          cause missed updates. RESO says the same of timestamp replication generally:{' '}
          <Src href={RESO_EE_BLOG}>clock drift can cause events to be out of order and consumers to miss data</Src>.
        </li>
        <li>
          <strong>It covers what you received, not what you chose to keep.</strong> MLS Grid requires{' '}
          <Src href={GRID_V2}>the greatest ModificationTimestamp you have received, regardless of whether you store the records</Src>.
          Writing every received record to a raw store makes the two the same thing.
        </li>
        <li>
          <strong>There is one cursor per feed, originating system and resource.</strong> MLS Grid requires{' '}
          <Src href={GRID_V2}>a single OriginatingSystemName in the filter of every request</Src>, and its
          replication guide gives <Src href={GRID_BP}>a separate request for Property, Member, Office and OpenHouse</Src>.
          A checkpoint keyed only by feed cannot express that.
        </li>
      </ul>
      <p>An illustrative checkpoint table, in PostgreSQL syntax:</p>
      <pre className="cp-code"><code>{`-- Illustrative. One row per feed, originating system and resource.
CREATE TABLE sync_checkpoint (
  feed_id              text        NOT NULL,  -- for example 'mlsgrid-idx'
  originating_system   text        NOT NULL,  -- for example 'actris'
  resource             text        NOT NULL,  -- Property, Member, Office, OpenHouse
  phase                text        NOT NULL,  -- 'initial' or 'incremental'
  cursor_ts            timestamptz,           -- greatest feed timestamp durably stored
  last_attempt_at      timestamptz,
  last_success_at      timestamptz,           -- last run that drained the feed
  last_reconciled_at   timestamptz,           -- last full key comparison
  consecutive_failures integer     NOT NULL DEFAULT 0,
  paused_until         timestamptz,           -- set by the circuit breaker
  last_error           text,
  lease_owner          text,                  -- run id holding the lease
  lease_expires_at     timestamptz,
  PRIMARY KEY (feed_id, originating_system, resource)
);`}</code></pre>
      <p>
        <strong>Why the cursor moves only after a durable write.</strong> The cursor is a claim: everything up to
        this timestamp is safely in our store. If it advances when the page is fetched and the process dies before
        the write, nothing will ever re-request those records, because the next query starts after them. If it
        advances after the write, a crash costs one repeated page. So the write and the cursor update belong in
        one transaction where the raw store and the checkpoint share a database. Where they do not, write first,
        advance second, and rely on the write being repeatable.
      </p>
      <p>
        <strong>Page boundaries.</strong> MLS Grid warns against{' '}
        <Src href={GRID_BP}>range queries on ModificationTimestamp</Src>; the filter is &ldquo;greater than the
        cursor&rdquo;. That raises a question the documentation does not answer: if a page ends on timestamp T and
        the next page begins with more records stamped T, a cursor saved as T would skip them after a crash. Our
        recommendation is to treat the last timestamp of a page that has a next link as incomplete, and save the
        greatest timestamp below it. The final page, with no next link, saves its true maximum. This is more
        conservative than MLS Grid&apos;s own wording, which is to use the greatest timestamp received: it can
        only re-request records, never skip them, and the cost is a few records fetched twice after a restart.
      </p>
      <p>
        <strong>The lease.</strong> MLS Grid says not to{' '}
        <Src href={GRID_BP}>send more than one replication request at a time</Src>, because requests must be in
        sequential order. A lease on the checkpoint row, with an expiry so a dead worker cannot hold it forever,
        keeps a slow run and the next scheduled run from interleaving. Two details make it hold: the run renews
        the lease as it works, and the transaction that advances the cursor checks that the run still owns it,
        so a worker that stalled past its expiry cannot write.
      </p>

      <h2>Initial full import</h2>
      <p>
        The pipeline guide covers the platform limits for the first load. What matters for the engine is the
        handoff from import to incremental sync, because a gap there loses changes silently.
      </p>
      <p>
        On MLS Grid the import is the same loop as incremental sync with one extra filter. Results are{' '}
        <Src href={GRID_V2}>ordered by ModificationTimestamp so that you do not miss changes that occur during your download</Src>,
        and after an error the instruction is to <Src href={GRID_BP}>not start over</Src> but continue from the
        greatest timestamp received. The initial query filters on{' '}
        <Src href={GRID_V2}>MlgCanView equal to true</Src>; once it has drained, the engine flips the checkpoint
        to incremental and{' '}
        <Src href={GRID_V2}>drops that filter, so that changes to MlgCanView arrive and removals can be applied</Src>.
        Forgetting to drop it is a real bug: the site keeps syncing and never removes anything.
      </p>
      <p>
        Trestle is different above a million records, where its replication endpoint{' '}
        <Src href={TRESTLE_REF}>cannot skip records, so a process that fails part way through has to restart</Src>,
        and <Src href={TRESTLE_REF}>its links expire after 5 minutes of inactivity</Src>. Two recommendations
        follow. First, do nothing slow between pages: write the raw payload and request the next link. Second, do
        not derive the starting cursor from the bulk download, whose order the documentation does not state. We
        would read the greatest ModificationTimestamp in the feed <em>before</em> the bulk load begins and start
        incremental sync from that value. Records changed during the load are then fetched a second time, which
        is harmless, instead of being missed.
      </p>
      <p>
        During an import, per-record downstream jobs are wasteful. A sound default is to mark rows unprocessed and
        let batch workers normalize and bulk-index them, switching to per-record jobs when the phase changes.
      </p>

      <h2>Incremental sync: the loop</h2>
      <p>
        Pseudocode for one run, matching the diagram. It is illustrative: names and helpers are invented for the
        example.
      </p>
      <pre className="cp-code"><code>{`// Illustrative. One run for one (feed, originating system, resource).
async function runSync(key) {
  // Returns null if another run holds the lease or the circuit breaker is open.
  const cp = await checkpoints.acquireLease(key)
  if (!cp) return

  try {
    let url = buildQuery(key, { modifiedAfter: cp.cursor_ts, phase: cp.phase })
    while (url) {
      await limiter.take(key.feed_id)              // requests and bytes, under the published limits
      const page = await fetchWithBackoff(url)     // retries 429, 5xx and timeouts, then throws

      if (page.value.length > 0) {
        const maxTs  = maxTimestamp(page.value)
        const safeTs = page.nextLink
          ? greatestBelow(page.value, maxTs) ?? cp.cursor_ts   // last timestamp may continue on the next page
          : maxTs

        const changed = await db.transaction(async (tx) => {
          const ids = []
          for (const rec of page.value) {
            // Skips a copy older than the stored one. Returns true only if the payload hash changed.
            if (await tx.upsertRaw(key, rec)) ids.push(rec.key)
          }
          // Forward only. Throws, and so rolls the page back, if this run no longer owns the lease.
          await tx.advanceCursor(key, safeTs, cp.lease_owner)
          return ids
        })

        await queue.enqueueChanged(key, changed)   // a sweeper covers a failure here
        cp.cursor_ts = safeTs
      }
      await checkpoints.renewLease(key, cp.lease_owner)
      url = page.nextLink
    }
    await checkpoints.markSuccess(key, cp.lease_owner)      // last_success_at, failures = 0, release lease
  } catch (err) {
    await checkpoints.markFailure(key, cp.lease_owner, err) // failures + 1, last_error, release lease
    throw err
  }
}`}</code></pre>
      <p>
        Three details are easy to miss. The run only records success when the feed is drained, so a run that dies
        on page three leaves a truthful <code>last_success_at</code>. A failed run records the failure and
        releases the lease instead of holding it until expiry. And the cursor changes on every page, which
        keeps the engine inside another MLS Grid rule:{' '}
        <Src href={GRID_BP}>do not send the same request multiple times</Src>.
      </p>

      <h2>Idempotent writes</h2>
      <p>
        The loop delivers every record at least once, and sometimes twice. Correctness therefore depends on a
        second delivery changing nothing. Three rules get there:
      </p>
      <ul>
        <li>
          <strong>Upsert by a stable key.</strong> The raw store is keyed by feed, originating system, resource
          and record key. In PostgreSQL,{' '}
          <Src href={PG_INSERT}>ON CONFLICT DO UPDATE guarantees an atomic INSERT or UPDATE outcome</Src>, so two
          workers cannot create two rows for one listing.
        </li>
        <li>
          <strong>Never let an older copy overwrite a newer one.</strong> Make the update conditional on the
          incoming ModificationTimestamp being greater than or equal to the stored one. This matters whenever a
          replay or a reconciliation job runs beside the incremental sync. A removal is a write too: on MLS Grid
          a record that arrives with MlgCanView false{' '}
          <Src href={GRID_V2}>must be removed from your local data store</Src>, so the upsert replaces the
          payload with a removal marker instead of keeping it.
        </li>
        <li>
          <strong>Detect &ldquo;changed&rdquo; by content, not by arrival.</strong> A record&apos;s timestamp can
          move without the listing changing. On MLS Grid, ModificationTimestamp is{' '}
          <Src href={GRID}>the time the record was modified by MLS Grid</Src>, not by the MLS. On Trestle a record
          can be updated <Src href={TRESTLE_SCALE}>because mappings or enumerations that affected it were updated</Src>,
          and Trestle warns that source systems may update all of their records at once:{' '}
          <Src href={TRESTLE_SCALE}>being prepared for mass updates is important</Src>. Store a hash of the
          payload (excluding the timestamps) and enqueue downstream work only when it differs.
        </li>
      </ul>
      <p>
        With the third rule a mass update still downloads every record, but the index, the media queue and the
        alert emails see only what really changed. A re-stamped record must never look like a new listing or a
        price change to anything that notifies people.
      </p>

      <h2>Queues: separate fetching from processing</h2>
      <p>
        Fetching is sequential by rule and limited by quota. Processing (normalization, media, indexing) is
        neither, and in one process a slow image host or an indexing error would stall replication. Separate
        them with a queue, and treat the raw store, not the queue, as the record of what is outstanding:
      </p>
      <ul>
        <li>Each raw row carries a processed marker. The transaction that writes the row clears it.</li>
        <li>After the commit, the engine enqueues a job per changed record. This is the only step outside the transaction.</li>
        <li>A sweeper periodically enqueues rows that have been unprocessed for longer than expected. It repairs a failed enqueue, a lost queue and a worker that crashed mid-job with one mechanism.</li>
        <li>Job identifiers are derived from the record key and version, so a duplicate enqueue collapses instead of doubling the work. BullMQ, for one, documents <Src href={BULLMQ_DEDUP}>deduplication by an identifier you supply</Src>.</li>
        <li>Use separate queues per kind of work and, for fairness, per feed, so one board&apos;s import does not starve another board&apos;s price changes.</li>
      </ul>
      <p>
        Queue mechanics in Node.js (retries, concurrency, stalled jobs) are the subject of{' '}
        <Link href="/blog/background-jobs-redis-bullmq">background jobs with Redis and BullMQ</Link>.
      </p>

      <h2>Rate limiting and backoff</h2>
      <p>
        The limiter belongs to the feed credential, not to the job, because every job on that credential spends
        the same budget. The published budgets differ in shape:
      </p>
      <ul>
        <li>
          <strong>MLS Grid</strong> limits requests and bytes:{' '}
          <Src href={GRID}>no more than 2 requests per second, 7,200 requests in any hour, 4 GB downloaded in any hour and 40,000 requests per 24-hour period</Src>.
          Our arithmetic on those figures: two per second for an hour is exactly 7,200, but 40,000 spread over
          the 86,400 seconds of a day is one request every 2.16 seconds. The daily cap is the one a steady
          engine has to plan around, and the limiter has to count bytes as well as requests.
        </li>
        <li>
          <strong>Trestle</strong> sets <Src href={TRESTLE_API}>a per-hour baseline quota and a per-minute burst quota</Src>,{' '}
          <Src href={TRESTLE_API}>calculated per product and feed type pair</Src>, and reports them in response
          headers: <Src href={TRESTLE_API}>Minute-Quota-Limit, Hour-Quota-Limit and Hour-Quota-ResetTime</Src>.
          Read the headers instead of hard-coding the baseline.
        </li>
      </ul>
      <p>
        Backoff is what happens after the limiter was wrong. HTTP defines 429 as{' '}
        <Src href={RFC_6585}>too many requests in a given amount of time</Src> and says the response{' '}
        <Src href={RFC_6585}>may include a Retry-After header</Src>; honor it when present. Otherwise Trestle
        recommends <Src href={TRESTLE_SCALE}>an exponential wait, for example 1 second, then 2, then 4, 8, 16, 32, up to some number of retries</Src>.
        Add random jitter so several workers do not retry in step; BullMQ documents{' '}
        <Src href={BULLMQ_RETRY}>exponential backoff with a jitter option</Src> if the retries run as queue jobs.
      </p>
      <p>
        On MLS Grid a 429 can mean the token is suspended: it then{' '}
        <Src href={GRID}>receives an HTTP 429 error in response to any requests</Src> until access is{' '}
        <Src href={GRID}>reinstated automatically once usage falls back within the limits</Src>. Retrying each
        request on its own schedule is the wrong response. Open a circuit breaker for the whole credential: set{' '}
        <code>paused_until</code>, stop every job that uses it, alert, and probe with a single request when the
        pause ends.
      </p>

      <h2>Monitoring: three numbers per feed</h2>
      <ul>
        <li>
          <strong>Last successful sync.</strong> Now minus <code>last_success_at</code>. This is the alarm for a
          dead worker, an expired token or an open breaker. MLS Grid suggests a replication request{' '}
          <Src href={GRID_BP}>once every 15 minutes</Src>, and its IDX rules require a refresh{' '}
          <Src href={GRID_IDX}>at least once every twelve (12) hours</Src>; alert long before the second figure.
          Your own license sets the real limit.
        </li>
        <li>
          <strong>Lag.</strong> Now minus <code>cursor_ts</code>. Lag alone misleads: a feed with no changes
          overnight shows hours of lag while every run succeeds. Read it together with the first number. Rising
          lag with recent successful runs means the engine is working and behind (an import or a mass update);
          rising lag with no successful run means it is stopped.
        </li>
        <li>
          <strong>Error rate.</strong> Failed requests over total, per feed, with 429s counted separately from
          5xx and timeouts. They have different causes and different owners.
        </li>
      </ul>
      <p>
        Four secondary signals explain the first three: records received per run against that feed&apos;s usual
        range (a spike is a mass update; a long run of zeros on a busy feed is a scoping or credential problem),
        the count of unprocessed raw rows and its oldest age, the size of the quarantine, and requests and bytes
        spent against each published limit. Keep a history row per run as well as the checkpoint.
      </p>

      <h2>Failure recovery</h2>
      <h3>Replay from a checkpoint</h3>
      <p>
        Because writes are idempotent, recovery from most data problems is one operation: set{' '}
        <code>cursor_ts</code> back and let the loop run. It is a forward query from the earlier timestamp, never
        a window, in keeping with MLS Grid&apos;s rule on range queries. Know its limit. A replay re-delivers
        records that still exist in the feed. It cannot re-deliver a removal the feed no longer carries: on MLS
        Grid, records marked MlgCanView false are{' '}
        <Src href={GRID_V2}>removed from the data feed entirely after 7 days</Src>. A replay from further back
        than that must be followed by a full key comparison.{' '}
        <Link href="/blog/listing-lifecycle-sold-expired-deleted">Handling deleted, expired and sold listings</Link>{' '}
        covers that reconciliation job.
      </p>
      <h3>Poison records</h3>
      <p>
        A poison record is one that fails every time it is processed. The design above confines it. The raw write
        does not interpret the payload, so an unexpected value cannot fail it, and the cursor moves on. The
        failure surfaces in a downstream worker, where the rule is: retry a bounded number of times with backoff,
        then move the record to a quarantine table with the error and the raw payload, and alert. After the
        mapping is fixed, re-queue the quarantine.
      </p>
      <p>
        The harder case is a page that cannot be read at all. We would retry it with a smaller page size to narrow
        the fault (MLS Grid defaults to <Src href={GRID_V2}>500 records per request and allows up to 5,000</Src>,
        or <Src href={GRID_V2}>1,000 when the request uses $expand</Src>), and contact the platform. Advancing the cursor by hand past the fault should be a logged, deliberate act,
        followed by a reconciliation.
      </p>
      <h3>A feed that goes down</h3>
      <p>
        Isolation comes first: one feed&apos;s failures must not consume another feed&apos;s workers or stop its
        schedule. In our published{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link>, the
        original sync ran as a single process with no error recovery, and one failed MLS feed would stall updates
        for all agents; the sync engine was rewritten with delta detection, retry logic and per-feed error
        isolation. In the design here that isolation is the checkpoint row: its own lease, failure count and
        breaker.
      </p>
      <p>
        When the feed returns, the breaker closes and the loop resumes from the stored cursor with no special
        code. The one decision is whether the incremental query is still enough. Compare the length of the outage
        with the platform&apos;s retention for removal signals, and run a reconciliation if it was exceeded or if
        the platform, like Trestle, <Src href={TRESTLE_SCALE}>does not report records that are no longer available</Src>{' '}
        in incremental updates at all.
      </p>
      <h3>A field or schema change</h3>
      <p>
        A new field, a renamed field or a new lookup value should never stop replication, and with a raw store it
        does not: the payload is saved as received and the change is a normalization problem. Detect it there,
        with a count of unmapped fields and lookup values per run and a daily diff of the metadata document. MLS
        Grid publishes lookup values as a resource and asks consumers{' '}
        <Src href={GRID_V2}>not to pull it more than once a day</Src>, which sets the cadence. After the mapping
        is extended, re-run normalization from the raw store; the cursor is not involved.{' '}
        <Link href="/blog/mls-data-normalization">MLS data normalization across boards</Link> covers the mapping
        layer.
      </p>
      <p>
        The larger version of this event is an MLS moving to a new system. When MARIS did, MLS Grid told consumers
        to <Src href={GRID_MARIS}>treat the change as an initial import of a new MLS source</Src> under a new
        OriginatingSystemName. Because the checkpoint is keyed by originating system, that is a new row, not a
        code change. Replacing your own platform works the same way; see{' '}
        <Link href="/blog/legacy-real-estate-platform-data-migration">data migration for legacy real estate platforms</Link>.
      </p>

      <h2>Timestamps are not the only cursor</h2>
      <p>
        RESO has ratified an alternative. The EntityEvent resource carries a sequence number that is{' '}
        <Src href={RESO_EVENTS}>durable, immutable and monotonic, and can only increase in value</Src>, and RESO
        notes that <Src href={RESO_EE_BLOG}>events are produced when records are no longer part of a user&apos;s feed</Src>.
        Where a provider offers it, the checkpoint stores a sequence number instead of a timestamp, the
        page-boundary problem disappears and removals arrive in the same stream. The loop, the transaction and
        the idempotent write stay exactly as described. Build the engine so the cursor type is a property of the
        connector.
      </p>

      <h2>Five tests before launch</h2>
      <ul className="cp-checklist">
        <li>Kill the worker between the fetch and the commit. The next run must fetch the same page and store each record once.</li>
        <li>Deliver the same page twice. Row counts and downstream job counts must not change.</li>
        <li>Replay a full day by moving the cursor back. No older copy may overwrite a newer one.</li>
        <li>Return 429 for every request on one feed. That feed must pause and alert; the others must keep their schedule.</li>
        <li>Send a record with an unknown field and an unknown lookup value. Replication must continue, the record must be quarantined or flagged, and the unmapped count must rise.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'What should an MLS sync checkpoint store?', answer: ['At minimum, one row per feed, originating system and resource holding the cursor, the time of the last successful run and a failure count. The cursor is a value received from the feed: Trestle recommends ', ['tracking the latest value you received', TRESTLE_SCALE], ', and MLS Grid requires ', ['the greatest ModificationTimestamp you have received', GRID_V2], '.'] },
        { question: 'How should a sync engine respond to HTTP 429?', answer: ['Stop sending on that credential, wait, and retry with increasing delays. Trestle recommends ', ['an exponential wait', TRESTLE_SCALE], '. On MLS Grid a suspended token ', ['receives an HTTP 429 error in response to any requests', GRID], ' until usage falls back within the limits, so the whole feed should pause, not one request.'] },
        { question: 'Can an MLS sync be resumed after a failure?', answer: ['Usually. MLS Grid says that after an error you should ', ['not start over', GRID_BP], ' and should continue from the greatest timestamp received. Trestle’s replication endpoint for very large resources is the exception: ', ['if the process fails part way through, you have to restart it', TRESTLE_REF], '.'] },
        { question: 'What is a poison record in a sync pipeline?', answer: ['A record that fails every time it is processed, for example because of a value the mapping does not expect. Store the raw payload first so replication is not blocked, retry processing a bounded number of times, then quarantine the record with its error and alert. The cursor should never wait for it.'] },
      ]} />

      <p className="cp-note">
        Platform behavior and limits were read from the linked RESO, MLS Grid, Trestle, PostgreSQL, BullMQ and
        RFC pages on October 12, 2026, and checked again the next day. They change, and they differ by MLS and by license; the current
        documentation and your agreement decide. Code and schema blocks are illustrative.
      </p>
      <p>
        Building or repairing a sync engine? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
