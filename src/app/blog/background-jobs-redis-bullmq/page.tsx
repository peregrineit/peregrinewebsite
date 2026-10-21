import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import JobLifecycleDiagram from '../../components/diagrams/JobLifecycleDiagram';

const SLUG = 'background-jobs-redis-bullmq';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/background-jobs-redis-bullmq.md. Option names, defaults and the version
// number are as docs.bullmq.io showed them that day (changelog top entry: 6.3.13, 2026-10-12).
const BQ = 'https://docs.bullmq.io';
const BQ_HOME = `${BQ}/`;
const BQ_CHANGELOG = `${BQ}/changelog`;
const BQ_V6 = `${BQ}/guide/migrations/migrate-from-v5-to-v6`;
const BQ_PG = `${BQ}/guide/postgresql`;
const BQ_ARCH = `${BQ}/guide/architecture`;
const BQ_WORKERS = `${BQ}/guide/workers`;
const BQ_CONC = `${BQ}/guide/workers/concurrency`;
const BQ_GCONC = `${BQ}/guide/queues/global-concurrency`;
const BQ_SANDBOX = `${BQ}/guide/workers/sandboxed-processors`;
const BQ_SHUTDOWN = `${BQ}/guide/workers/graceful-shutdown`;
const BQ_STALLED = `${BQ}/guide/jobs/stalled`;
const BQ_RETRY = `${BQ}/guide/retrying-failing-jobs`;
const BQ_STOP = `${BQ}/patterns/stop-retrying-jobs`;
const BQ_TIMEOUT = `${BQ}/patterns/timeout-jobs`;
const BQ_IDEM = `${BQ}/patterns/idempotent-jobs`;
const BQ_RATE = `${BQ}/guide/rate-limiting`;
const BQ_FLOWS = `${BQ}/guide/flows/`;
const BQ_SCHED = `${BQ}/guide/job-schedulers/`;
const BQ_JOBIDS = `${BQ}/guide/jobs/job-ids`;
const BQ_DEDUP = `${BQ}/guide/jobs/deduplication`;
const BQ_DELAYED = `${BQ}/guide/jobs/delayed`;
const BQ_PRIO = `${BQ}/guide/jobs/prioritized`;
const BQ_REMOVE = `${BQ}/guide/queues/auto-removal-of-jobs`;
const BQ_PROD = `${BQ}/guide/going-to-production`;
const BQ_CONN = `${BQ}/guide/connections`;
const BQ_FAILFAST = `${BQ}/patterns/failing-fast-when-redis-is-down`;
const BQ_EVENTS = `${BQ}/guide/events/`;
const BQ_METRICS = `${BQ}/guide/metrics/`;
const BQ_PROM = `${BQ}/guide/metrics/prometheus`;
const BQ_TELEMETRY = `${BQ}/guide/telemetry/`;
const BQ_TROUBLE = `${BQ}/guide/troubleshooting`;
const BQ_GETTERS = `${BQ}/guide/jobs/getters`;
const REDIS_EVICT = 'https://redis.io/docs/latest/develop/reference/eviction/';
const REDIS_PERSIST = 'https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Why background jobs fail in production and not in development</h2>
      <p>
        Moving work out of the request is the easy part: add a job, return a response, let a worker send the
        email or sync the feed. The trouble starts later and has little to do with the queue library&apos;s API.
        A deploy kills a worker halfway through a job. A job that takes ninety seconds on a busy CPU is declared
        dead and handed to a second worker while the first is still running it. Redis, set up as a cache, evicts
        a key the queue depended on. A year of completed jobs fills memory. The same alert goes out twice.
      </p>
      <p>
        Each of those is a documented behavior with a documented setting. This article walks through them for
        BullMQ on Redis, quoting the BullMQ and Redis documentation as read on October 12, 2026.
      </p>

      <h2>What BullMQ is, and its model</h2>
      <p>
        BullMQ describes itself as{' '}
        <Src href={BQ_HOME}>a Node.js library that implements a queue system built on top of Redis</Src>. Its
        stated delivery goal is worth reading closely, because it sets the rules for everything else: it{' '}
        <Src href={BQ_HOME}>attempts to deliver every message exactly one time, but it will deliver at least once in the worst case scenario</Src>.
        A job can therefore run more than once, and the handler has to be written for that.
      </p>
      <p>
        The version current in the documentation&apos;s changelog on the day we read it was{' '}
        <Src href={BQ_CHANGELOG}>6.3.13, dated 2026-10-12</Src>. Version 6 matters if you are reading older
        tutorials: it{' '}
        <Src href={BQ_V6}>removes the legacy repeatable-job APIs introduced before Job Schedulers</Src> and
        removes the old debounce option in favor of deduplication, and its 6.0.0 changelog entry{' '}
        <Src href={BQ_CHANGELOG}>introduces the IQueueBackend abstraction, with Redis and PostgreSQL backends</Src>.
        The documentation describes <Src href={BQ_PG}>an optional PostgreSQL backend</Src> that runs the same
        API, and says{' '}
        <Src href={BQ_PG}>the Redis backend remains the default and the most battle-tested option</Src>. Redis
        is the backend this article covers. Beyond the <code>Queue</code> that producers add jobs to and the{' '}
        <code>Worker</code> that processes them, two building blocks are worth naming:
      </p>
      <ul>
        <li>
          <strong>Flows.</strong> Parent and child jobs, added with the <code>FlowProducer</code> class. A parent{' '}
          <Src href={BQ_FLOWS}>will not be moved to the wait status until all its children jobs have been processed successfully</Src>,
          and it can read their results with <code>getChildrenValues</code>.
        </li>
        <li>
          <strong>Job Schedulers.</strong> The current name for recurring work. A Job Scheduler{' '}
          <Src href={BQ_SCHED}>acts as a factory, producing jobs based on specified &ldquo;repeat&rdquo; settings</Src>:
          a fixed interval or a cron pattern. The documentation notes that, for historical reasons, the jobs it
          produces <Src href={BQ_SCHED}>are often referred to as &ldquo;Repeatable Jobs&rdquo;</Src>.
        </li>
      </ul>

      <h2>The job lifecycle</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><JobLifecycleDiagram /></div>
        <figcaption>
          Job states as named in BullMQ&apos;s documentation. The violet line is the retry path from active back
          to wait.
        </figcaption>
      </figure>
      <p>The same lifecycle as a list, with the documentation&apos;s state names:</p>
      <ul>
        <li>
          <strong>wait, prioritized, delayed.</strong> A job added to a queue{' '}
          <Src href={BQ_ARCH}>can be in one of three states</Src>: <em>wait</em>, the waiting list;{' '}
          <em>prioritized</em>; or <em>delayed</em>, waiting for a timeout before it joins the waiting list or
          the prioritized set.
        </li>
        <li>
          <strong>active.</strong> Jobs <Src href={BQ_ARCH}>that are currently being processed</Src>. A job stays
          active until the process function completes or throws.
        </li>
        <li>
          <strong>completed, failed.</strong> The two final states. By default finished jobs are kept in{' '}
          <Src href={BQ_REMOVE}>two special sets, the &ldquo;completed&rdquo; and the &ldquo;failed&rdquo; set</Src>.
        </li>
        <li>
          <strong>waiting-children.</strong> A parent job added by a flow producer that{' '}
          <Src href={BQ_ARCH}>is waiting for all its children to be completed</Src>; it joins the waiting list,
          the delayed set or the prioritized set when the last child completes.
        </li>
        <li>
          <strong>Retry path.</strong> A job that throws while attempts remain goes back to be processed again,
          after its backoff delay if one is set. A stalled job takes the same route:{' '}
          <Src href={BQ_STALLED}>there is not a &lsquo;stalled&rsquo; state, only a &lsquo;stalled&rsquo; event emitted when a job is automatically moved from active to waiting state</Src>.
        </li>
      </ul>
      <p>
        These are also the names the counting API takes:{' '}
        <Src href={BQ_GETTERS}>getJobCounts(&apos;wait&apos;, &apos;completed&apos;, &apos;failed&apos;)</Src>,
        which is the simplest queue-depth metric you can export.
      </p>

      <h2>A queue, a worker and an idempotent handler</h2>
      <p>
        The example below is a listing-alert email job, the kind of work behind{' '}
        <Link href="/blog/saved-searches-listing-alerts">saved searches and listing alerts</Link>. It is
        illustrative: the queue name, limits and helper functions are examples, and the option names are the
        ones in the BullMQ documentation.
      </p>
      <pre className="cp-code"><code>{`// Illustrative. queue.ts: the producer side.
import { Queue } from 'bullmq';

export const alerts = new Queue('listing-alerts', {
  // Producers should fail fast if Redis is unreachable (see "Connection handling").
  connection: { host: process.env.REDIS_HOST, port: 6379, enableOfflineQueue: false },
  defaultJobOptions: {
    attempts: 5,                                   // 1 try + 4 retries
    backoff: { type: 'exponential', delay: 2000, jitter: 0.5 },
    removeOnComplete: { age: 3600, count: 1000 },  // keep 1 hour, at most 1,000
    removeOnFail: { age: 7 * 24 * 3600 },          // keep failures a week for inspection
  },
});

export async function enqueueAlert(tenantId: string, searchId: string, listingKey: string) {
  // A custom job id: adding the same alert twice while the first is still in the
  // queue is ignored. BullMQ rejects ':' in a custom id and ids that are digits only,
  // so strip ':' from listing keys if your MLS source uses it.
  await alerts.add(
    'send-alert',
    { tenantId, searchId, listingKey },             // ids only: no personal data in the payload
    { jobId: \`alert-\${searchId}-\${listingKey}\` },
  );
}`}</code></pre>
      <pre className="cp-code"><code>{`// Illustrative. worker.ts: the consumer side, with retry/backoff and an idempotent handler.
import { Worker, UnrecoverableError } from 'bullmq';
import { db, mailer, isPermanent, log } from './deps'; // your own modules

const worker = new Worker(
  'listing-alerts',
  async (job) => {
    const { tenantId, searchId, listingKey } = job.data;
    const key = \`alert-\${searchId}-\${listingKey}\`;

    // 1. Read current state; the world may have changed since the job was added.
    const search = await db.savedSearch.find(tenantId, searchId);
    if (!search || !search.active) return 'search removed';

    // 2. Claim the effect. One INSERT ... ON CONFLICT under a unique constraint on
    //    (tenant, key), so two workers running this job at once cannot both proceed.
    //    A check-then-send would let both pass the check and both send.
    //    takeOverAfterMs must exceed the time a send can take (the mailer times out at 5 s).
    const claim = await db.alertSent.claim(tenantId, key, { takeOverAfterMs: 10_000 });
    if (claim === 'sent') return 'already sent';      // an earlier run finished
    if (claim === 'held') throw new Error('claim held by another run'); // retried with backoff
    // claim === 'mine': a new claim, or one abandoned by a run that crashed

    // 3. Do the side effect, passing the same key downstream where the provider supports it.
    try {
      await mailer.send({ to: search.email, template: 'new-listing', listingKey, idempotencyKey: key });
    } catch (err) {
      if (isPermanent(err)) throw new UnrecoverableError('address rejected'); // no retries
      throw err;                                      // an Error: retried with backoff
    }

    // 4. Mark the claim as sent.
    await db.alertSent.markSent(tenantId, key);
    return 'sent';
  },
  {
    connection: { host: process.env.REDIS_HOST, port: 6379 },
    concurrency: 10,                                  // I/O-bound work
    limiter: { max: 20, duration: 1000 },             // at most 20 jobs per second, across all workers
  },
);

worker.on('failed', (job, err) => log.warn({ jobId: job?.id, attempts: job?.attemptsMade, err }));
worker.on('error', (err) => log.error(err));          // connection problems surface here

const shutdown = async () => { await worker.close(); process.exit(0); };
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);`}</code></pre>
      <p>The sections below explain each choice in those two files.</p>

      <h2>Retries and backoff</h2>
      <p>
        Retries are off until you ask for them: to activate automatic retries you{' '}
        <Src href={BQ_RETRY}>use the attempts setting with a value larger than 1</Src>, and without a backoff
        function jobs are <Src href={BQ_RETRY}>retried without delay as soon as they fail</Src>, which is rarely
        what a struggling downstream service needs.
      </p>
      <ul>
        <li>
          <strong>Built-in strategies.</strong> <Src href={BQ_RETRY}>The current built-in backoff functions are fixed and exponential</Src>.
          Exponential backoff <Src href={BQ_RETRY}>will retry after 2 ^ (attempts - 1) * delay milliseconds</Src>.
        </li>
        <li>
          <strong>Jitter.</strong> Both accept a <code>jitter</code> option, a value{' '}
          <Src href={BQ_RETRY}>between 0 and 1</Src>, where 0 means no randomness and 1 means delays anywhere
          between zero and the computed maximum. With 0.5, as in the example, the delay falls between half the
          computed value and the full value. Jitter keeps jobs that failed together from retrying together; the
          reasoning is in{' '}
          <Link href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</Link>.
        </li>
        <li>
          <strong>Custom strategies.</strong> A <code>backoffStrategy</code> function in the worker settings
          computes the delay; returning <Src href={BQ_RETRY}>-1 means jobs won&apos;t be retried</Src> and are
          moved to failed. This is the place to honor a <code>Retry-After</code> header.
        </li>
        <li>
          <strong>Do not retry what cannot succeed.</strong> Throwing <code>UnrecoverableError</code> makes
          BullMQ <Src href={BQ_STOP}>move the job to the failed set without performing any retries</Src>. A
          malformed payload or a rejected address is not going to improve on the fifth attempt.
        </li>
        <li>
          <strong>Throw real errors.</strong> The documentation warns that{' '}
          <Src href={BQ_RETRY}>the exceptions thrown in a processor must be an Error object for BullMQ to work correctly</Src>.
        </li>
      </ul>
      <p>
        Choose attempts and delay from how long the dependency is likely to be unavailable. With the example
        values, the last retry happens at most about thirty seconds after the first failure (2 + 4 + 8 + 16),
        which covers a restart but not a provider outage. For longer outages, prefer a higher base delay to
        dozens of attempts.
      </p>

      <h2>Concurrency and rate limiting</h2>
      <p>These are different controls, and BullMQ has three of them:</p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Control</th><th>Scope</th><th>What the documentation says</th><th>Use it for</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Worker <code>concurrency</code></strong></td>
              <td>One worker instance</td>
              <td><Src href={BQ_CONC}>How many jobs are allowed to be processed concurrently for that instance</Src>; it works only when the processor <Src href={BQ_CONC}>performs asynchronous operations</Src></td>
              <td>I/O-bound jobs: HTTP calls, database queries</td>
            </tr>
            <tr>
              <td><strong>More worker processes</strong></td>
              <td>The fleet</td>
              <td><Src href={BQ_CONC}>The recommended way to setup BullMQ</Src>, because it also gives higher availability</td>
              <td>Throughput and surviving a host failure</td>
            </tr>
            <tr>
              <td><strong>Global concurrency</strong></td>
              <td>The whole queue</td>
              <td><Src href={BQ_GCONC}>How many jobs are allowed to be processed in parallel across all your worker instances</Src>, set with <code>setGlobalConcurrency</code></td>
              <td>Protecting a resource that tolerates only N simultaneous users, for example one MLS feed</td>
            </tr>
            <tr>
              <td><strong><code>limiter</code></strong> (<code>max</code>, <code>duration</code>)</td>
              <td>The whole queue</td>
              <td><Src href={BQ_RATE}>The rate limiter is global</Src>: ten workers with a limit of 10 per second still process 10 per second in total. Rate-limited jobs <Src href={BQ_RATE}>stay in the waiting state</Src></td>
              <td>Staying under an API&apos;s published request rate</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two practical notes. When an API answers 429, a worker can pause the whole queue for the period the API
        asks for with the manual rate limit (<code>await worker.rateLimit(ms)</code>, then{' '}
        <code>throw Worker.RateLimitError()</code>, with <code>limiter</code> options set on the worker), and
        the documentation says that in this case{' '}
        <Src href={BQ_STOP}>the attempts check is ignored, as rate limiting is not considered a real error</Src>.
        And the open-source limiter is per queue, not per key: the documentation states that{' '}
        <Src href={BQ_RATE}>from BullMQ 3.0 and onwards, group keys support is removed</Src>. In a multi-tenant
        product that means per-tenant fairness is something you design, for example with a queue per class of
        work plus a per-tenant counter checked in the handler; the tenancy side is in{' '}
        <Link href="/blog/multi-tenant-real-estate-saas">multi-tenant real estate SaaS</Link>.
      </p>

      <h2>Stalled jobs: what makes a job stall</h2>
      <p>
        When a worker starts a job, BullMQ{' '}
        <Src href={BQ_WORKERS}>will place a lock on this job</Src>, and the worker must keep renewing it. If it
        cannot, the job is treated as abandoned. That is the mechanism that rescues jobs from crashed workers,
        and it is also how a job comes to run twice. The troubleshooting page lists why a lock is
        lost; the first three are the ones to design against:
      </p>
      <ul>
        <li><Src href={BQ_TROUBLE}>The worker is consuming too much CPU and has no time to renew the lock every 30 seconds</Src>, the default expiration time for locks. Node.js runs the processor and the lock renewal on the same event loop, so a long synchronous loop (parsing a large file, resizing images, a heavy JSON transform) blocks both.</li>
        <li><Src href={BQ_TROUBLE}>The worker has lost communication with Redis and cannot renew the lock in time</Src>.</li>
        <li><Src href={BQ_TROUBLE}>The Redis instance has a wrong maxmemory policy</Src>, so Redis removed the lock key itself.</li>
        <li>The process was killed without a graceful shutdown.</li>
      </ul>
      <p>
        What happens next: a stalled job{' '}
        <Src href={BQ_WORKERS}>is moved back to the waiting status and will be processed again by another worker</Src>,
        and if it stalls more than <code>maxStalledCount</code> allows it is{' '}
        <Src href={BQ_STALLED}>failed permanently with the error &ldquo;job stalled more than allowable limit&rdquo;</Src>.{' '}
        <Src href={BQ_STALLED}>The default is 1, as stalled jobs should be a rare occurrence</Src>. The original
        worker may not know it lost the job. If it was only slow, it carries on, and two workers are now
        running the same job. That is the concrete reason handlers must be idempotent.
      </p>
      <p>
        For CPU-heavy work, the documentation&apos;s answer is sandboxed processors, which run the processor in
        a separate process (or worker thread) from the bookkeeping, so that{' '}
        <Src href={BQ_SANDBOX}>they will not result in stalled jobs as easily as standard workers</Src>. In
        ordinary workers, break long computations into chunks that yield to the event loop.
      </p>

      <h2>Idempotent handlers, job ids and deduplication</h2>
      <p>
        BullMQ&apos;s own pattern page puts the requirement in one sentence: it{' '}
        <Src href={BQ_IDEM}>should not make a difference to the final state of the system if a job successfully completes on its first attempt, or if it fails initially and succeeds when retried</Src>.
        There are two layers, and they solve different problems.
      </p>
      <p>
        <strong>Layer 1: do not enqueue the same work twice.</strong> A custom <code>jobId</code> does this:{' '}
        <Src href={BQ_JOBIDS}>if you add a job with an existing id then that job will just be ignored and not added to the queue at all</Src>.
        Three caveats from the same page: the id{' '}
        <Src href={BQ_JOBIDS}>must not contain the : separator</Src>; it{' '}
        <Src href={BQ_JOBIDS}>must not be a string that consists only of digits</Src>; and removed jobs do not
        count, so <Src href={BQ_JOBIDS}>you can add the same job id many times over as long as the previous job has already been removed from the queue</Src>.
        With <code>removeOnComplete</code> in use, that last point means a job id protects only while the
        earlier job still exists.
      </p>
      <p>
        The newer <code>deduplication</code> option covers the timing cases explicitly. In simple mode, a job
        with the same deduplication id <Src href={BQ_DEDUP}>will be ignored as long as the job remains in an incomplete state</Src>;
        with a <code>ttl</code> (throttle mode), a similar job added{' '}
        <Src href={BQ_DEDUP}>during this delay period is ignored</Src>; debounce mode keeps only the most recent
        job&apos;s data; and <code>keepLastIfActive</code> guarantees{' '}
        <Src href={BQ_DEDUP}>at most 1 job per deduplication ID is active at any time</Src> while still running
        once more with the latest data. That last mode fits &ldquo;re-index this listing&rdquo; or &ldquo;sync
        this feed&rdquo; triggers that can fire many times in a burst.
      </p>
      <p>
        <strong>Layer 2: make the handler safe to run twice anyway.</strong> Layer 1 cannot help when a job
        stalls and runs on two workers, or fails after its side effect and is retried. The handler in the
        example shows the pattern we would use:
      </p>
      <ol>
        <li>Derive a key from what must happen once (this alert for this search and listing), not from the job.</li>
        <li>Re-read current state; do not act on a snapshot in the payload.</li>
        <li>Claim the key with an insert under a unique constraint. Checking first and recording afterwards is not enough: two runs of a stalled job can both pass the check before either records anything.</li>
        <li>Perform the side effect, passing the key to the provider as an idempotency key if it accepts one.</li>
        <li>Mark the claim as done.</li>
      </ol>
      <p>
        One gap remains, between steps 4 and 5: a crash there leaves a claim that is never marked done. The
        example takes such a claim over after ten seconds and sends again, so the retry is a duplicate unless
        the provider deduplicates on the key. That figure is illustrative and tied to two others: it must be
        longer than a send can take, and the retry schedule must outlast it, or the job runs out of attempts
        while the claim is still held (here the last retry comes at least 15 seconds after the first failure).
        Refusing to take over closes that gap and opens the opposite one (claimed but never sent). No ordering
        removes both without the downstream system&apos;s help, so decide per job which error is cheaper: a
        rare duplicate email, or a rare missing one. For a payment or a payout the answer is different from an
        alert, and the provider&apos;s idempotency key is not optional.
        Keeping jobs small helps: the pattern page advises that jobs{' '}
        <Src href={BQ_IDEM}>should be as atomic and simple as possible</Src>, and a job with five side effects
        has five places to fail halfway. Split them, with a flow if the order matters.
      </p>

      <h2>Delayed jobs, Job Schedulers and priorities</h2>
      <p>
        <strong>Delayed jobs.</strong> A <code>delay</code> in milliseconds puts the job in the delayed set. The
        timing is a lower bound: it is{' '}
        <Src href={BQ_DELAYED}>not guaranteed that the job will be processed at the exact delayed time specified, as it depends on how busy the workers are</Src>.
        Delayed jobs suit follow-ups such as &ldquo;check in ten minutes whether this lead got a response&rdquo;
        (see <Link href="/blog/real-estate-crm-architecture">real estate CRM architecture</Link>). Design them
        so the job checks whether it is still needed when it runs, instead of cancelling it when circumstances
        change; a delayed job can also be rescheduled with <code>changeDelay</code>.
      </p>
      <p>
        <strong>Job Schedulers.</strong> Recurring work is created with <code>upsertJobScheduler</code>, given a
        scheduler id and either <code>every</code> (milliseconds) or a cron <code>pattern</code>. Four
        documented properties matter in production:
      </p>
      <ul>
        <li>It is an upsert, which <Src href={BQ_SCHED}>ensures the scheduler is updated or created without duplications</Src>. Calling it at every deploy is safe; this replaces the old problem of duplicate repeatable jobs after a schedule change.</li>
        <li><Src href={BQ_SCHED}>The scheduler will only generate new jobs when the last job begins processing</Src>, so a busy queue yields fewer runs than the interval suggests. A missed run is not queued up behind the current one.</li>
        <li>For cron in UTC, <Src href={BQ_SCHED}>use tz: &apos;UTC&apos; in scheduler options</Src>.</li>
        <li>Jobs from a scheduler get a special id, so <Src href={BQ_SCHED}>you cannot choose a custom job id</Src> for them.</li>
      </ul>
      <p>
        A scheduler fires the trigger; it does not make the work safe to overlap. A sync that sometimes runs
        longer than its interval still needs a guard, such as a queue-level global concurrency of one or a
        deduplication id. The <Link href="/blog/mls-sync-engine">MLS sync engine</Link> article covers that
        case for listing feeds.
      </p>
      <p>
        <strong>Priorities.</strong> Priority values run{' '}
        <Src href={BQ_PRIO}>from 1 to 2 097 151, where a lower number is always a higher priority</Src>, and the
        counter-intuitive part is the default: jobs without a priority{' '}
        <Src href={BQ_PRIO}>get the highest priority, being processed before jobs with priorities assigned to them</Src>.
        Adding prioritized jobs is also slower,{' '}
        <Src href={BQ_PRIO}>with a complexity O(log(n)) relative to the number of jobs in the prioritized set</Src>.
        Priorities reorder one queue; they do not reserve capacity. If password-reset emails must never wait
        behind a bulk campaign, give them their own queue and workers. Use priorities for ordering within one
        kind of work.
      </p>

      <h2>Graceful shutdown</h2>
      <p>
        Every deploy stops workers. <code>worker.close()</code>{' '}
        <Src href={BQ_SHUTDOWN}>will mark the worker as closing so it will not pick up new jobs, and at the same time it will wait for all the current jobs to be processed (or failed)</Src>.
        The catch is in the next sentence of the documentation:{' '}
        <Src href={BQ_SHUTDOWN}>this call will not timeout by itself</Src>. Your orchestrator has a timeout
        even if the call does not. If jobs can run for two minutes and the platform sends a kill signal after
        thirty seconds, every deploy produces stalled jobs, which are picked up{' '}
        <Src href={BQ_PROD}>with a waiting time of about 30 seconds by default</Src> and run again from the
        start.
      </p>
      <ul>
        <li>Handle both signals. The documentation recommends <Src href={BQ_PROD}>listening for both SIGINT and SIGTERM</Src>.</li>
        <li>Set the platform&apos;s termination grace period longer than your longest normal job, or make long jobs shorter.</li>
        <li>For long jobs, checkpoint progress in your database so a rerun resumes instead of restarting, or split the work into a flow of small children.</li>
        <li>BullMQ has no built-in job timeout: the documentation says it <Src href={BQ_TIMEOUT}>does not provide a specific mechanism to timeout jobs</Src> and shows the pattern with an <code>AbortController</code> inside the processor. Put a timeout on every outbound call a job makes.</li>
      </ul>

      <h2>Redis configuration BullMQ requires</h2>
      <p>
        A Redis instance configured as a cache is the wrong shape for a queue, and the two settings below are
        the ones the BullMQ documentation is emphatic about.
      </p>
      <p>
        <strong>Eviction: <code>maxmemory-policy noeviction</code>.</strong> The production guide says BullMQ{' '}
        <Src href={BQ_PROD}>cannot work properly if Redis evicts keys arbitrarily</Src>, and that setting
        maxmemory-policy to noeviction{' '}
        <Src href={BQ_PROD}>is the only setting that guarantees the correct behavior of the queues</Src>. Redis
        defines that policy as:{' '}
        <Src href={REDIS_EVICT}>keys are not evicted but the server will return an error when you try to execute commands that cache new data</Src>.
        So the failure changes from silent corruption (a lock or a job vanishing) to a loud one (writes
        rejected when memory is full), which is the one you can alert on. It follows that a queue should not
        share a Redis instance with a cache that relies on eviction; the cache settings are covered in the{' '}
        <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link>.
      </p>
      <p>
        <strong>Persistence: AOF.</strong> The guide notes that{' '}
        <Src href={BQ_PROD}>many hosting solutions do not offer persistence by default</Src> and recommends{' '}
        <Src href={BQ_PROD}>enabling AOF (Append Only File)</Src>, adding that{' '}
        <Src href={BQ_PROD}>1 second per write is enough for most applications</Src>. Redis documents what that
        setting means: with the default policy of fsync every second,{' '}
        <Src href={REDIS_PERSIST}>you can only lose one second worth of writes</Src>, whereas with snapshots
        (RDB) alone, which are usually taken every five minutes or more, Redis says it{' '}
        <Src href={REDIS_PERSIST}>is NOT good if you need to minimize the chance of data loss</Src>. Without
        persistence, a Redis restart empties every queue, including delayed jobs and schedulers.
      </p>
      <p>
        Even with AOF, up to a second of acknowledged <code>add</code> calls can be lost in a crash. If a job
        must not be lost, the database is the source of truth and the queue is the delivery mechanism: write a
        row saying the work is needed, in the same transaction as the business change, then enqueue from it.
        That is{' '}
        <Link href="/blog/webhook-event-driven-integrations">the outbox pattern from the webhook article</Link>,
        applied to jobs.
      </p>

      <h2>Connection handling</h2>
      <ul>
        <li>
          <strong>Producers and workers want opposite behavior when Redis is down.</strong> The production
          guide: operations on the <code>Queue</code> class{' '}
          <Src href={BQ_PROD}>should fail quickly if there is a temporal disconnection, whereas for Workers we want to wait indefinitely</Src>.
          By default <code>add</code> <Src href={BQ_FAILFAST}>will keep waiting for a reconnection</Src>; in an
          HTTP handler that means a hung request. Passing <code>enableOfflineQueue: false</code> on the
          producer&apos;s connection makes it throw instead, so the endpoint can return an error.
        </li>
        <li>
          <strong>Workers need <code>maxRetriesPerRequest: null</code></strong> when you pass your own ioredis
          instance; BullMQ <Src href={BQ_CONN}>will throw an exception if this setting is not set to null</Src>{' '}
          when the client is passed to a worker.
        </li>
        <li>
          <strong>Count connections.</strong> <Src href={BQ_CONN}>Every class will consume at least one Redis connection</Src>,
          and classes that use blocking commands, such as <code>Worker</code> and <code>QueueEvents</code>,
          create an extra one. Managed Redis plans cap connections, so the total across all processes is worth
          computing before scaling out.
        </li>
        <li>
          <strong>Do not use ioredis <code>keyPrefix</code>.</strong> It{' '}
          <Src href={BQ_CONN}>is not compatible with BullMQ, which provides its own key prefixing mechanism</Src>{' '}
          through the <code>prefix</code> option.
        </li>
        <li>
          <strong>Attach error handlers.</strong> An <code>error</code> listener on queues and workers logs
          connection problems and, as the guide puts it, <Src href={BQ_PROD}>prevents &ldquo;unhandled errors&rdquo;</Src>.
        </li>
        <li>
          <strong>Keep sensitive data out of payloads.</strong> The guide points out that{' '}
          <Src href={BQ_PROD}>the data field of the jobs is stored in clear text</Src>. Put ids in the payload
          and read the record in the handler, which also means the job acts on current data.
        </li>
      </ul>

      <h2>Observability</h2>
      <p>What we would export from day one, and where BullMQ provides it:</p>
      <ul>
        <li>
          <strong>Queue depth and age.</strong> Counts by state from <code>getJobCounts</code>, plus the age of
          the oldest job in wait. Depth alone misleads; a queue of ten jobs that are an hour old is worse than a
          thousand that are a second old.
        </li>
        <li>
          <strong>Throughput and failures.</strong> Built-in metrics let workers{' '}
          <Src href={BQ_METRICS}>count the number of jobs they have processed per minute</Src>, enabled with the{' '}
          <code>metrics</code> worker option and read with <code>getMetrics</code>. There is also{' '}
          <Src href={BQ_PROM}>a simple API to export metrics to Prometheus</Src>,{' '}
          <code>exportPrometheusMetrics()</code>.
        </li>
        <li>
          <strong>Events.</strong> Worker events are local to the process that ran the job; the{' '}
          <code>QueueEvents</code> class listens across all workers and{' '}
          <Src href={BQ_EVENTS}>is implemented using Redis streams</Src>, so events are not lost during a
          disconnection the way plain pub-sub messages would be. The stream is trimmed,{' '}
          <Src href={BQ_EVENTS}>by default to about 10,000 events</Src>, so treat it as a live feed, not an
          audit log. The <code>stalled</code> and <code>failed</code> events are the two to alert on.
        </li>
        <li>
          <strong>Traces.</strong> BullMQ has a telemetry interface that{' '}
          <Src href={BQ_TELEMETRY}>supports the OpenTelemetry specification</Src>, which links the request that
          enqueued a job to the worker that ran it.
        </li>
        <li>
          <strong>A dashboard</strong> for inspecting and retrying individual jobs can delete jobs and read
          every payload, so put it behind your own authentication and treat it as an admin tool.
        </li>
      </ul>

      <h2>Failure modes and what to do about them</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Failure</th><th>What happens</th><th>Design response</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Redis unreachable</strong></td>
              <td>Workers wait and reconnect; <code>add</code> hangs by default</td>
              <td><code>enableOfflineQueue: false</code> on producers; return an error or fall back to an outbox row; alert on the <code>error</code> event</td>
            </tr>
            <tr>
              <td><strong>Redis restarts without persistence</strong></td>
              <td>All queued, delayed and scheduled jobs are gone</td>
              <td>AOF enabled; database rows as the source of truth for work that must not be lost; a reconciliation job that re-enqueues what is missing</td>
            </tr>
            <tr>
              <td><strong>Redis memory full</strong></td>
              <td>With <code>noeviction</code>, writes are rejected; with any other policy, keys disappear</td>
              <td><code>noeviction</code>, a memory alert well below the limit, and job removal settings</td>
            </tr>
            <tr>
              <td><strong>Memory growth from finished jobs</strong></td>
              <td>By default jobs are <Src href={BQ_PROD}>either completed or failed and kept forever</Src></td>
              <td><code>removeOnComplete</code> and <code>removeOnFail</code> with a count, an age, or both; the documentation suggests keeping <Src href={BQ_REMOVE}>a handful of completed jobs and a much larger value of failed jobs</Src></td>
            </tr>
            <tr>
              <td><strong>Poison job</strong> (always throws)</td>
              <td>Consumes its attempts, then sits in failed; without attempts set it fails once</td>
              <td>Bounded attempts; <code>UnrecoverableError</code> for known-permanent errors; alert on the failed count; keep failed jobs long enough to inspect and retry after a fix</td>
            </tr>
            <tr>
              <td><strong>Long or CPU-heavy job</strong></td>
              <td>Lock not renewed; job stalls and runs again elsewhere</td>
              <td>Sandboxed processors; chunk the work; idempotent handler; alert on the <code>stalled</code> event</td>
            </tr>
            <tr>
              <td><strong>Worker killed during deploy</strong></td>
              <td>Active jobs stall and restart from the beginning</td>
              <td><code>worker.close()</code> on SIGTERM; grace period longer than the longest job; checkpoints</td>
            </tr>
            <tr>
              <td><strong>Duplicate execution</strong></td>
              <td>Side effect happens twice</td>
              <td>Idempotent handler keyed on the business effect; provider idempotency keys</td>
            </tr>
            <tr>
              <td><strong>Backlog after an outage</strong></td>
              <td>Thousands of jobs start at once against a recovering dependency</td>
              <td>Queue rate limit or global concurrency; backoff with jitter</td>
            </tr>
            <tr>
              <td><strong>Scheduler falls behind</strong></td>
              <td>Fewer runs than the interval; runs do not pile up</td>
              <td>Alert on time since the last successful run, not on the schedule</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        One detail on removal: it is lazy. The documentation notes that{' '}
        <Src href={BQ_REMOVE}>jobs are not removed unless a new job completes or fails</Src>, so an idle queue
        keeps its last finished jobs until activity resumes. And failed jobs are your dead-letter store, so
        size <code>removeOnFail</code> by how long it takes someone to look at them.
      </p>

      <h2>When a queue is the wrong tool</h2>
      <ul>
        <li><strong>The caller needs the answer now.</strong> If the user is waiting for the result, a job adds latency and a polling problem. Do it in the request, with a timeout, and queue only the parts that can lag.</li>
        <li><strong>The work must commit atomically with a database change.</strong> A job enqueued before the transaction commits can run against data that is not there; one enqueued after can be lost in a crash between the two. Use an outbox row and enqueue from it.</li>
        <li><strong>You need strict ordering per entity.</strong> Concurrency above one, retries and stalls all reorder jobs. Either serialize per entity in your own data model (a version check in the handler) or use a log with ordered partitions.</li>
        <li><strong>You need an event log that many consumers replay.</strong> A job queue delivers each job to one worker and then discards or archives it. Replay, fan-out to independent consumers and long retention are what a streaming log is for.</li>
        <li><strong>The process takes days and waits on people.</strong> Approval chains and multi-step onboarding are workflows: model the state in your database and use jobs only for the individual steps and timers.</li>
        <li><strong>A simple schedule on one host would do.</strong> A nightly report with no retry requirement does not need Redis. Add the queue when you need retries, concurrency control or more than one worker.</li>
        <li><strong>You do not want to operate Redis.</strong> Since version 6 BullMQ documents an optional PostgreSQL backend for teams that <Src href={BQ_PG}>would rather not operate a separate Redis instance</Src>, with requirements of its own: <Src href={BQ_PG}>PostgreSQL 13 or newer</Src>, explicit schema migrations, and job throughput the same page describes as <Src href={BQ_PG}>usually lower than Redis</Src>. Nothing in this article about Redis settings applies to it. A managed queue service is the other route.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'Does BullMQ guarantee a job runs exactly once?', answer: ['No. Its documentation says it ', ['attempts to deliver every message exactly one time, but it will deliver at least once in the worst case scenario', BQ_HOME], '. A stalled or retried job can run again, so handlers must be idempotent.'] },
        { question: 'What Redis settings does BullMQ need in production?', answer: ['Set maxmemory-policy to noeviction, which the BullMQ production guide calls ', ['the only setting that guarantees the correct behavior of the queues', BQ_PROD], ', and enable persistence; the guide recommends ', ['enabling AOF (Append Only File)', BQ_PROD], '. Keep queues on a different Redis instance from a cache that relies on eviction.'] },
        { question: 'Why do BullMQ jobs stall?', answer: ['A worker holds a lock on each active job and must renew it. The troubleshooting page lists the usual causes: ', ['the worker is consuming too much CPU and has no time to renew the lock every 30 seconds', BQ_TROUBLE], ', lost communication with Redis, or a wrong maxmemory policy. A stalled job goes back to the waiting list and runs again.'] },
      ]} />

      <p className="cp-note">
        BullMQ option names, defaults and behavior were read from docs.bullmq.io, and Redis behavior from
        redis.io, on October 12, 2026; the newest changelog entry that day was 6.3.13. Libraries change, and
        the documentation for the version you install decides. Code, queue names, limits and timings marked
        illustrative are examples, not measurements or a description of a client system.
      </p>
      <p>
        Building or stabilizing a job system behind a SaaS product? See our{' '}
        <Link href="/services/saas-development">SaaS development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
