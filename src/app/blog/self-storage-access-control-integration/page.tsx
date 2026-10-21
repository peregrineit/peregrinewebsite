import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import StorageAccessStateDiagram, { ACCESS_STATES } from '../../components/diagrams/StorageAccessStateDiagram';

const SLUG = 'self-storage-access-control-integration';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-19; the sentence relied on for each link is logged in
// docs/content/sources/self-storage-access-control-integration.md. Vendors are quoted from their own
// public pages (or trade-press reports of their releases) as examples of published behavior. We have
// not used or evaluated these products and claim no partnership with any of them.
const PTI = 'https://www.ptisecurity.com/us/en/pti-partners/pms-integrations';
const PTI_STORABLE = 'https://www.insideselfstorage.com/suppliers-products/pti-security-systems-partners-with-storable-to-launch-real-time-cloud-integration-for-self-storage-operators';
const QUIKSTOR = 'https://www.insideselfstorage.com/suppliers-products/quikstor-self-storage-software-integrates-with-opentech-cia-access-control-insomniac-smartlock';
const OPENTECH = 'https://opentechalliance.com/solutions/insomniac-cia-access-control/';
const NOKE = 'https://www.janusintl.com/products/noke/noke-faqs';
const DAVINCI = 'https://support.davincilock.com/facility-management-software-integration-partners';
const SPIDER = 'https://www.spiderdoor.com/multi-site-gate-access-control/';
const STORABLE_AC = 'https://www.storable.com/products/access-control/';
const STORA_ACCESS = 'https://docs.stora.co/2025-09/guides/allocations-and-access';
const STORA_WH = 'https://docs.stora.co/2025-09/guides/webhooks';
const STRIPE_RETRY = 'https://docs.stripe.com/billing/revenue-recovery/smart-retries';
const STRIPE_SUBS = 'https://docs.stripe.com/billing/subscriptions/webhooks';
const CASE = '/case-studies/self-storage-management-platform';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What an access-control integration does</h2>
      <p>
        A self-storage access-control integration turns the account status held in the management software into
        permissions at the facility: which gate codes work, which mobile keys open which units, and which units
        are overlocked. It also carries information back the other way, mainly the gate and door activity log. Five
        kinds of system take part:
      </p>
      <ul>
        <li><strong>The property management system (PMS)</strong>, sometimes called the facility management software: tenants, leases, unit assignments, the ledger and the delinquency rules.</li>
        <li><strong>The payment processor</strong>: card and bank payments, autopay, and retries when a payment fails.</li>
        <li><strong>The access-control platform</strong>, usually a cloud service from the gate or lock vendor, which holds credentials and talks to the hardware.</li>
        <li><strong>The hardware on site</strong>: keypads, gate and door controllers, and Bluetooth or networked unit locks.</li>
        <li><strong>Reconciliation and monitoring</strong>, which someone has to own: the jobs and alerts that notice when the other four disagree.</li>
      </ul>
      <p>
        The integration is working when a tenant who has just paid can get in, a tenant the operator has locked
        out cannot, and a moved-out tenant&apos;s code no longer opens anything, at every facility, including the
        ones acquired last year on different software. It is not working when those outcomes depend on how fast a
        particular vendor happens to sync. Sync speed varies by product: SpiderDoor, a gate-access vendor, says{' '}
        <Src href={SPIDER}>the management software at that location decides how fast a code reaches the keypad</Src>,
        and that <Src href={SPIDER}>some platforms sync in real time</Src> while{' '}
        <Src href={SPIDER}>others sync every eight to twelve minutes</Src>.
        This article covers how to design for that: who owns each fact, the integration models, the move-in,
        move-out and delinquency flows as states and events, mixed hardware, and recovery when events go missing.
        Whether to build a platform at all is covered separately in{' '}
        <Link href="/blog/self-storage-software-build-vs-buy">self-storage software: build or buy</Link>.
      </p>

      <h2>Who owns what: the source of truth</h2>
      <p>
        Most access problems we would expect to see in a multi-site portfolio come from two systems both believing
        they decide whether a tenant may enter. The published integrations agree on the split. In QuikStor&apos;s
        integration with OpenTech, as reported by Inside Self-Storage,{' '}
        <Src href={QUIKSTOR}>QuikStor serves as the system of record for tenant accounts, while OpenTech&apos;s systems execute access permissions automatically</Src>.
        SpiderDoor puts it from the gate side:{' '}
        <Src href={SPIDER}>your management software holds each tenant&apos;s status and the rules that go with it</Src>,
        and <Src href={SPIDER}>when an account goes past due, the software shuts off the gate code until the balance clears</Src>.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Fact</th><th>Owner (writes it)</th><th>Consumers (read it)</th></tr></thead>
          <tbody>
            <tr><td>Tenant, lease, unit assignment, move-in and move-out dates</td><td>Management software</td><td>Access platform, tenant app, reporting</td></tr>
            <tr><td>Balance, days past due, payment arrangements, manual overrides</td><td>Management software (its ledger)</td><td>Access platform, collections</td></tr>
            <tr><td>Payment attempts, declines and retry schedule</td><td>Payment processor</td><td>Management software, which posts the result to the ledger</td></tr>
            <tr><td>Desired access state for each tenant and unit</td><td>Management software, computed from the rows above</td><td>Access platform</td></tr>
            <tr><td>Credentials as programmed into the hardware, and lock status</td><td>Access platform</td><td>Management software, reconciliation</td></tr>
            <tr><td>Gate and door activity log</td><td>Access platform</td><td>Facility managers, dispute handling, reporting</td></tr>
          </tbody>
        </table>
      </div>
      <p>Three consequences follow, and they are the core of the design we would recommend:</p>
      <ul>
        <li>
          <strong>The payment processor does not decide access.</strong> A processor knows that an invoice failed. It
          does not know that the manager agreed a payment plan, waived a fee, or that the tenant paid cash at the
          counter. Those live in the PMS ledger. Processor events update the ledger; the ledger decides access.
        </li>
        <li>
          <strong>Overrides belong to the owner too.</strong> SiteLink, according to SpiderDoor, offers a per-tenant
          override in either direction, <Src href={SPIDER}>&ldquo;Always Lock Out at Gate&rdquo; or &ldquo;Never Lock Out at Gate&rdquo;</Src>.
          If staff can also open a gate or add a code directly in the access platform, that is a second writer, and
          it needs an expiry. SpiderDoor&apos;s own warning about master codes makes the point: one{' '}
          <Src href={SPIDER}>left in place opens the gate no matter what the balance says</Src>.
        </li>
        <li>
          <strong>The access platform reports what it actually did.</strong> The PMS holds the desired state; only
          the access platform knows whether a keypad or lock accepted it. An integration that never reads that back
          cannot tell &ldquo;sent&rdquo; from &ldquo;applied&rdquo;.
        </li>
      </ul>

      <h2>Integration models and their trade-offs</h2>
      <p>
        Vendors connect these systems in several ways, and a portfolio assembled through acquisitions usually has
        more than one of them at once. PTI, for example, says its StorLogix Cloud platform{' '}
        <Src href={PTI}>integrates with nearly every PMS on the market</Src>, and its integrations table lists each
        PMS under two columns, &ldquo;BridgeApp&rdquo; and &ldquo;API&rdquo;, without defining either: SiteLink
        appears under BridgeApp only, Unit Trac under API only, Yardi Breeze under both, and StorEdge twice, once
        under BridgeApp and once as &ldquo;StorEdge Webhooks&rdquo; under API. Ask the vendor what each route means
        for your facilities; the table does not say.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Model</th><th>How it works</th><th>What you get</th><th>What to watch</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Native</strong> (one vendor for PMS and access)</td>
              <td>The PMS vendor sells the access product too.</td>
              <td>The fewest moving parts. Storable, for example, lists the ability to <Src href={STORABLE_AC}>automatically lock out tenants who miss payments and send them a payment link to restore access</Src>, noted as Storable Edge only.</td>
              <td>Only covers facilities on that PMS and that hardware.</td>
            </tr>
            <tr>
              <td><strong>Cloud-to-cloud events</strong></td>
              <td>The PMS sends changes to the access platform&apos;s cloud as they happen.</td>
              <td>Short delays. In a March 2026 release reported by Inside Self-Storage, PTI said <Src href={PTI_STORABLE}>events in Storable Edge can now transfer to StorLogix Cloud in near real time</Src>, and that the integration removes the need for <Src href={PTI_STORABLE}>onsite syncing tools</Src>.</td>
              <td>Events can be lost or delayed; you still need reconciliation.</td>
            </tr>
            <tr>
              <td><strong>Bridge or sync tool</strong></td>
              <td>A connector, sometimes running on a computer at the facility, copies changes between the two systems.</td>
              <td>Works with PMS products that have no event feed.</td>
              <td>One more component per site that can stop, fall behind or lose its network.</td>
            </tr>
            <tr>
              <td><strong>Scheduled sync</strong></td>
              <td>The access platform polls the PMS, or receives batches, at intervals.</td>
              <td>Simple and predictable.</td>
              <td>Delays measured in minutes or hours. SpiderDoor says <Src href={SPIDER}>on SiteLink, an edited gate code syncs roughly three times in a twenty four hour period</Src>.</td>
            </tr>
            <tr>
              <td><strong>PMS API as the control point</strong></td>
              <td>Your code calls the PMS API, and the PMS pushes the change on to whichever access provider the operator configured.</td>
              <td>One integration instead of one per lock vendor. Stora&apos;s public docs say <Src href={STORA_ACCESS}>the API is your single point of control for both the logical state of a unit and the physical access to it</Src>.</td>
              <td>Only as broad as that PMS&apos;s list of supported access providers.</td>
            </tr>
            <tr>
              <td><strong>Your own bridge service</strong></td>
              <td>A service you run talks to each lock vendor&apos;s cloud or local controllers behind one internal API.</td>
              <td>Mixed hardware across facilities under one model; new vendors added as adapters.</td>
              <td>You own every vendor integration, its credentials and its failures.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        None of these models removes the need for a reconciliation job, covered below. Gate and lock vendors also
        publish different amounts of detail: OpenTech says its platform{' '}
        <Src href={OPENTECH}>includes an open API so any property management software, call center, or other applications can easily integrate with the platform</Src>,
        Nokē says its system{' '}
        <Src href={NOKE}>integrates with all major property management software providers</Src> and that{' '}
        <Src href={NOKE}>new integrations typically take 4-6 weeks</Src>. Neither page publishes the API itself,
        so endpoint details come from the vendor once you engage with it.
      </p>

      <h2>The access states, and what moves a tenant between them</h2>
      <p>
        Treat access as a small set of named states held by the PMS, not as a series of commands sent to a gate.
        Stora&apos;s public documentation is a useful published example of the idea: units move between{' '}
        <Src href={STORA_ACCESS}>available, reserved, occupied and overlocked</Src>, and when an operator has
        configured a smart entry provider,{' '}
        <Src href={STORA_ACCESS}>every status change described in this guide automatically syncs to the third-party access control system</Src>.
        The model below is our own, slightly finer-grained, because many operators lock the gate before they
        overlock the unit.
      </p>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><StorageAccessStateDiagram /></div>
        <figcaption>
          Illustrative access states for one tenancy. Arrows are events or policy checks; the thresholds behind
          them are the operator&apos;s, and lien steps are outside the diagram.
        </figcaption>
      </figure>
      <ul>
        {ACCESS_STATES.map((s) => (
          <li key={s.name}><strong>{s.name}</strong> (access: {s.access}). {s.text}</li>
        ))}
      </ul>
      <p>
        From any state, a move-out leads to Moved out. A cleared balance returns Gate locked out or Overlocked to
        Active, and that restore should take priority over any lockout still waiting in a queue.
      </p>

      <h2>Move-in: getting a working code out today</h2>
      <p>The move-in path, step by step, with what can delay each step:</p>
      <ol>
        <li><strong>Lease signed and first payment taken</strong> in the PMS or the online rental flow.</li>
        <li><strong>Unit assigned and credential created.</strong> Depending on the products, the PMS generates the gate code, or the access platform does and reports it back.</li>
        <li><strong>Change sent to the access platform</strong> by whichever model applies above. This is where the delay lives.</li>
        <li><strong>Credential programmed at the site:</strong> to a cloud-connected keypad, a gate controller, or, for Bluetooth locks, to a mobile key the tenant&apos;s phone presents. Nokē, for example, says its current system <Src href={NOKE}>uses Bluetooth unit controllers at the door to control each lock</Src>.</li>
        <li><strong>Confirmation</strong>, where the platform offers it, that the credential is live.</li>
      </ol>
      <p>
        Two published details show why the tenant-facing message should depend on the facility&apos;s integration
        rather than promise &ldquo;instant&rdquo; access. SpiderDoor says{' '}
        <Src href={SPIDER}>a tenant with a future move-in date will not have a working code until that date arrives</Src>,
        and suggests a temporary master code that deletes itself for early access. Stora says it{' '}
        <Src href={STORA_ACCESS}>automatically transitions reserved units to occupied on the tenancy&apos;s start date</Src>,
        a job that <Src href={STORA_ACCESS}>runs at approximately 6:00 AM in the operator&apos;s local timezone</Src>,
        and offers a separate grant-access call for earlier access.
      </p>
      <p>What we would build around that:</p>
      <ul>
        <li>Store the expected sync delay per facility, from the vendor&apos;s answer, and show the tenant an honest message (&ldquo;your code will work within a few minutes&rdquo;) instead of a guess.</li>
        <li>Give managers a resync action and a visible status per tenant: desired state, last sent, last confirmed. SpiderDoor, for instance, has a <Src href={SPIDER}>Sync Location Codes</Src> button that <Src href={SPIDER}>can be used up to ten times in a 24-hour period</Src>; know whether yours has a limit like that.</li>
        <li>Make any manual override (an early-access code, a gate opened remotely) carry an expiry and an author, so reconciliation can tell it from drift.</li>
      </ul>

      <h2>Move-out: revoking everything</h2>
      <p>
        Move-out is the flow most likely to leave a stale permission behind, because nothing goes wrong visibly when a
        former tenant&apos;s code keeps working. The PMS ends the lease and computes the target state, no access,
        for every credential tied to that tenant: gate codes, mobile keys, shared or secondary users if the product
        supports them, and any temporary codes. The unit returns to inventory only after the access platform confirms
        the revocation, or after reconciliation does. Where the hardware supports it, a reassigned unit lock should be
        re-keyed or re-paired for the next tenant rather than inherited.
      </p>
      <p>
        Unit identity is the other trap. DaVinci Lock&apos;s help center says that when a facility already using its
        locks is connected to a management system, its software{' '}
        <Src href={DAVINCI}>will attempt to retroactively assign the locks to your units in your FMS</Src>, and asks
        operators to <Src href={DAVINCI}>ensure the unit numbers match the naming convention within your FMS</Src>.
        A unit called <code>A-101</code> in one system and <code>A101</code> in the other is a lock attached to the
        wrong tenant, or to none. We would keep an explicit mapping table per facility and validate it before any
        facility goes live.
      </p>

      <h2>Failed payments and access restrictions as events</h2>
      <p>
        Delinquency is where billing and access meet, and where an integration has to be precise about what each
        event means. Taking Stripe as a documented example of a processor:
      </p>
      <ul>
        <li><Src href={STRIPE_RETRY}>Stripe Billing can automatically retry failed subscription and invoice payments for you</Src>, and <Src href={STRIPE_RETRY}>the recommended default setting is 8 tries within 2 weeks</Src>.</li>
        <li>Stripe&apos;s instruction is to <Src href={STRIPE_RETRY}>use the invoice.payment_failed webhook to receive subscription payment failure events and retry attempt updates</Src>.</li>
        <li>A hard decline is different: <Src href={STRIPE_RETRY}>we can&apos;t retry invoice payment without a new payment method</Src>. And <Src href={STRIPE_RETRY}>after the final payment attempt, Stripe makes no further payment attempts</Src>; what happens to the subscription then (canceled, unpaid, left past due or paused) is a setting the account chooses.</li>
        <li>A <code>past_due</code> subscription is not a promise of another try: Stripe says <Src href={STRIPE_SUBS}>this status doesn&apos;t guarantee another payment attempt</Src>.</li>
        <li>On success, Stripe&apos;s guidance after <code>invoice.paid</code> is to <Src href={STRIPE_SUBS}>retrieve the associated subscription and confirm that its status is active before extending the customer&apos;s access expiry date</Src>.</li>
      </ul>
      <p>
        Those are payment facts, not access decisions. Stripe&apos;s subscription guidance is written for software
        products, where revoking access is low stakes. At a storage facility, the decisions that follow a failed
        payment (how long the grace period is, when the gate code stops working, when a unit is overlocked, what
        notices go out) are the operator&apos;s policy. Products automate the steps the operator configures: Stora
        notes that <Src href={STORA_ACCESS}>operators can also configure Stora to auto-overlock units when a payment fails</Src>,
        Nokē lists <Src href={NOKE}>automated overlocking and release</Src> among its features, and OpenTech says
        operators can <Src href={OPENTECH}>automate and monitor overlocks and unit access remotely</Src>.
      </p>
      <p className="cp-note">
        <strong>Lien and notice rules are not software defaults.</strong> Notice periods, the conditions for denying
        access, and the steps before a lien sale are set by each state&apos;s law and by the operator&apos;s own
        counsel. A platform should hold them as per-state, per-facility configuration that counsel has reviewed, keep
        a record of every notice and state change, and never ship one state&apos;s rules as the default for another.
        This article states no legal rules.
      </p>
      <p>
        The pattern we would use is to compute the desired access state from current facts each time anything
        relevant changes, instead of reacting to each event with a command. A payment event, a manager override, a
        nightly policy check and a reconciliation run all call the same function, so repeated or reordered events
        converge on the same answer.
      </p>
      <p><strong>Illustrative desired-state function</strong> (pseudocode; field and policy names are examples):</p>
      <pre className="cp-code"><code>{`// Illustrative pseudocode. Thresholds come from per-facility policy that the
// operator (and, for lien steps, its counsel) has configured; none are defaults.
desired_access(tenancy, ledger, policy, overrides, today):
    if tenancy.ended:                         return 'revoked'
    if today < tenancy.start_date and not overrides.early_access_active:
                                              return 'none'
    if overrides.never_lock_out_active:       return 'full'
    days = ledger.days_past_due(tenancy, today)   // ledger, not the processor's status
    if days >= policy.overlock_after_days:    return 'overlocked'
    if days >= policy.gate_lockout_after_days or overrides.always_lock_out_active:
                                              return 'gate_locked'
    return 'full'

on any of (payment_posted, payment_failed, lease_changed, override_changed,
           daily_policy_check, reconciliation_run) for tenancy t:
    target = desired_access(t, ...)
    if target != t.access_state:
        record_transition(t, from = t.access_state, to = target, cause = event)
        enqueue_access_change(t, target)     // job id = tenancy + target version
        // restores go to a higher-priority queue than lockouts`}</code></pre>
      <p>
        Two details in that sketch matter in production. The daily policy check runs per facility in the
        facility&apos;s local time zone, so a lockout does not fire at the wrong local hour. And restores outrank
        lockouts: a tenant who has just paid and is standing at the gate is the most visible failure an integration
        can have. For the queue mechanics behind <code>enqueue_access_change</code> (attempts, backoff, job ids and
        priorities), see{' '}
        <Link href="/blog/background-jobs-redis-bullmq">reliable background jobs with Redis and BullMQ</Link>.
      </p>

      <h2>Facilities with different gate and lock vendors</h2>
      <p>
        An operator that grows by acquisition inherits whatever each facility ran. SpiderDoor describes the effect on
        logins alone: <Src href={SPIDER}>sites on different management software sit in separate accounts</Src>.
        Across lock vendors the differences go deeper: some control the gate only, some control each unit, some talk
        to their cloud over a site network or cellular link, and some deliver credentials through the tenant&apos;s
        phone over Bluetooth.
      </p>
      <p>
        The approach is an internal access interface with one adapter per vendor, so the rest of the platform never
        needs to know which hardware a facility has. That is the approach in our{' '}
        <Link href={CASE}>self-storage management platform case study</Link>: an operator running 150+ facilities
        across 12 states, where an IoT bridge put Nokē, PTI and Janus smart locks behind one API over MQTT and{' '}
        normalized commands (lock, unlock, check status) across vendors. The case study reports gate access setup in
        under 3 seconds on that platform, and that a fourth lock vendor added later took two weeks instead of two
        months. Those are figures for one platform, not a promise for another vendor mix.
      </p>
      <p><strong>Illustrative adapter interface</strong> (TypeScript-style; names are examples, not a vendor API):</p>
      <pre className="cp-code"><code>{`// Illustrative. Each vendor adapter declares what it can do; the platform
// checks capabilities instead of branching on vendor names.
interface AccessAdapter {
  capabilities: {
    gate: boolean;            // gate or door controller
    unitLocks: boolean;       // per-unit lock control
    overlock: boolean;        // can secure a unit remotely
    readBack: boolean;        // can list credentials actually applied
    offlineBehavior: string;  // as documented by the vendor
  };
  // Idempotent: applying the same change twice has no further effect.
  apply(facilityId: string, change: AccessChange): Promise<ApplyResult>;
  // What the site actually enforces, for reconciliation.
  listApplied(facilityId: string): Promise<AppliedCredential[]>;
}`}</code></pre>
      <p>
        Two parts of that design carry most of the weight. The <code>capabilities</code> object is what turns
        &ldquo;overlock&rdquo; into a lock command at one facility and a staff task with a padlock and a confirmation
        step at another. And <code>listApplied</code>, where a vendor supports it, is what makes reconciliation
        possible; where it does not, the plan has to say how drift will be detected instead.
      </p>

      <h2>Failure and reconciliation</h2>
      <p>
        Every model above loses or delays a change sometimes. Webhook senders give up eventually: Stora, for example,
        says it <Src href={STORA_WH}>automatically retries failed deliveries up to 6 times</Src>, and that{' '}
        <Src href={STORA_WH}>after 6 failed attempts, the delivery is marked as failed</Src>. Receiving those events
        safely (signatures, duplicates, ordering, dead letters) is covered in{' '}
        <Link href="/blog/webhook-event-driven-integrations">reliable webhook and event-driven integrations</Link>;
        what follows is specific to access.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Failure</th><th>What the tenant or manager sees</th><th>What catches it</th></tr></thead>
          <tbody>
            <tr><td>Missed event</td><td>A paid tenant still locked out, or a moved-out tenant still able to enter</td><td>Reconciliation that compares desired state with applied state; an alert on the count of paid-but-locked tenants</td></tr>
            <tr><td>Duplicate or out-of-order events</td><td>Access flips back to an older state</td><td>Recomputing the desired state from current facts instead of replaying commands; idempotent apply keyed on tenancy and version</td></tr>
            <tr><td>Bridge or sync tool stopped</td><td>Changes stop reaching one facility; nothing errors</td><td>An alert on silence: no applied change from a facility for longer than its normal gap</td></tr>
            <tr><td>Site offline</td><td>Codes changed during the outage do not take effect</td><td>Per-facility queues that hold changes, then apply the latest desired state for each tenant when the site returns</td></tr>
            <tr><td>Stale or stray credentials</td><td>A temporary or master code still works</td><td>Expiry on every manual credential; reconciliation lists credentials with no owning tenancy</td></tr>
            <tr><td>Unit mapping drift</td><td>A lock follows the wrong unit or tenant</td><td>A mapping check after any unit renumbering, and before each facility goes live</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Offline behavior is a hardware question as much as a software one, so get it in writing per facility.
        SpiderDoor, for example, says that{' '}
        <Src href={SPIDER}>if the building&apos;s internet drops, cellular keypads keep running</Src>, and that{' '}
        <Src href={SPIDER}>whether the gate stays shut or opens with the power out is set by the gate hardware, not the keypad</Src>.
      </p>
      <p>
        The reconciliation job itself runs per facility on a schedule and after any outage: read the desired state
        for every tenancy, read what the access platform reports as applied where it can, and repair differences
        through the same apply path the event handler uses. It should report three numbers to the people who run the
        facilities: changes repaired per run (a rise means the event path is leaking), tenants paid but locked out,
        and credentials active with no current tenancy. The first is an engineering signal; the other two are the
        ones a district manager will care about.
      </p>

      <h2>Questions to ask each gate and lock vendor</h2>
      <ol>
        <li>Which management systems do you integrate with, and by which route for ours: a direct API, webhooks, a bridge application, or a scheduled sync?</li>
        <li>How long does a new credential take to work at the gate, and is an edited or revoked credential slower than a new one?</li>
        <li>Where is a lockout decision made, in your system or in the management software? (SpiderDoor publishes this exact question among <Src href={SPIDER}>the questions worth asking any vendor</Src>.)</li>
        <li>Can we read back the credentials and lock states actually applied at a facility, through an API or an export?</li>
        <li>Does your platform report delivery and failure of each change, or only accept it?</li>
        <li>What keeps working when a site loses internet or power, and how do changes made during an outage catch up?</li>
        <li>Is a manual resync available, and is it rate-limited?</li>
        <li>How are units matched between your system and the management software, and what happens when a unit is renumbered?</li>
        <li>How are overlocks handled: a remote lock command, a staff task, or both? Can release be automated on payment?</li>
        <li>Who activates a new facility on the integration, how long does it take, and what credentials does each facility need?</li>
      </ol>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should the management software or the access-control system decide when a tenant is locked out?', answer: ['The management software, because it holds the ledger, payment arrangements and overrides. The access platform enforces the result. Published integrations describe the same split: in QuikStor’s integration with OpenTech, ', ['QuikStor serves as the system of record for tenant accounts', QUIKSTOR], ' and OpenTech’s systems execute access permissions.'] },
        { question: 'How quickly do gate codes sync from self-storage software to the keypad?', answer: ['It depends on the management software and the integration. SpiderDoor says ', ['some platforms sync in real time', SPIDER], ' while ', ['others sync every eight to twelve minutes', SPIDER], ', and that on SiteLink an edited code syncs roughly three times a day. Ask each vendor for the figure that applies to your facilities.'] },
        { question: 'Can a tenant get access back immediately after paying a past-due balance?', answer: ['Only as fast as the slowest step: the payment posting to the ledger, the change reaching the access platform, and the platform programming the site. Some products automate it; Storable, for example, lists sending locked-out tenants ', ['a payment link to restore access', STORABLE_AC], ' on Storable Edge. In a custom platform, restores should run ahead of any queued lockouts.'] },
        { question: 'Can facilities with different gate and lock vendors run on one system?', answer: ['Yes, with an internal access interface and one adapter per vendor, so the rest of the platform does not depend on which hardware a facility has. Our case study platform put Nokē, PTI and Janus smart locks behind one API this way.'] },
        { question: 'Should lien and lockout rules be hard-coded in the software?', answer: ['No. Notice periods, access restrictions and lien steps are set by each state’s law and the operator’s counsel. Hold them as per-state, per-facility configuration that counsel has reviewed, with a record of every notice and state change.'] },
      ]} />

      <p className="cp-note">
        Vendor statements were read on their public pages, or in trade-press reports of vendor releases, on October
        19, 2026, and products change often. We have not evaluated these products, this is not a ranking, and we do
        not claim a partnership with any vendor named. Pseudocode and interfaces marked illustrative are examples,
        not a vendor API or a description of a client system.
      </p>
      <p>
        Planning to connect management, billing and access systems across your facilities? See our{' '}
        <Link href="/industries/self-storage">self-storage software</Link> page and our{' '}
        <Link href="/services/api-integration">API integration service</Link>. Every project starts with a 30-minute
        technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
