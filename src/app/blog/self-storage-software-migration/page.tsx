import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'self-storage-software-migration';
export const metadata = guideMetadata(SLUG);

// Sources are logged in docs/content/sources/self-storage-software-migration.md. Owner decision
// 2026-10-21: gate, lock and payment vendors are not named; they are referred to generically, as the
// case study does. Stripe appears only as the case study states it (its billing integration).
// Peregrine statements restate the published self-storage case study only.
const ISS = 'https://www.insideselfstorage.com/software/iss-blog-upgrading-my-self-storage-management-software-hiccups-and-lessons-learned';
const CASE = '/case-studies/self-storage-management-platform';
const LEGACY = '/blog/legacy-real-estate-platform-data-migration';
const BUILD_BUY = '/blog/self-storage-software-build-vs-buy';
const ACCESS = '/blog/self-storage-access-control-integration';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What makes this migration different</h2>
      <p>
        You have bought a group of facilities, and each one arrived with its own management software, its own gate
        system and its own payment processor. Moving them onto one system is a data migration, but three things make
        it different from moving a typical business application. The facilities stay open while you do it. Every
        tenant record is tied to money (a balance, a paid-through date, an autopay) and to physical access (a gate
        code, a lock). And the most sensitive part of that record, the stored card or bank account, usually does not
        come out of a software export at all.
      </p>
      <p>
        The order of work: inventory each facility, get exports and answers from the outgoing vendors, map the data,
        settle the payment-data route with the processors early, plan access separately, pilot one facility, then
        move the rest in waves, reconciling before each old system is switched off.
      </p>
      <p>
        This guide assumes you have chosen the target system; if not, start with{' '}
        <Link href={BUILD_BUY}>self-storage management software: build or buy</Link>. General migration mechanics
        (id maps, change data capture, checksums, rollback windows) are in our{' '}
        <Link href={LEGACY}>legacy platform data migration guide</Link>, and how gates, locks and billing stay in
        step after the move is in{' '}
        <Link href={ACCESS}>self-storage access control integration</Link>. This article covers what is specific to
        moving self-storage facilities.
      </p>

      <h2>Start with a facility-by-facility inventory</h2>
      <p>
        Acquired portfolios are rarely uniform. In our <Link href={CASE}>self-storage case study</Link>, an operator
        running 150+ facilities across 12 states had keypads at some facilities, Bluetooth locks at others and
        physical keys at a few, and its reservation system, billing engine and access control software were three
        separate vendors with no API integration, synchronized by nightly CSV exports. Before anything moves, write
        down what each facility actually runs. One row per facility:
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>What to record</th><th>Why it matters</th></tr></thead>
          <tbody>
            <tr><td>Management software, edition and hosting (cloud or on-premises)</td><td>Decides the export options and who you ask for them</td></tr>
            <tr><td>Contract owner, term, renewal date and notice period</td><td>Sets the latest date you can switch without paying for overlap</td></tr>
            <tr><td>Export formats available, and who can run them (you, or only the vendor)</td><td>Some data may only come out through the vendor&apos;s support team</td></tr>
            <tr><td>Gate and keypad vendor, and how it connects to the software</td><td>Decides whether access can move with the data or needs its own cutover</td></tr>
            <tr><td>Smart locks or overlocks on units, by vendor</td><td>Each vendor is its own integration in the new system</td></tr>
            <tr><td>Payment processor, merchant account owner, and the share of tenants on autopay</td><td>Decides how stored payment methods move (see below)</td></tr>
            <tr><td>Website, online rental, call center, kiosk and insurance links</td><td>Every one of these is an integration that will point at the wrong system after cutover</td></tr>
            <tr><td>Number of units, occupied units, tenants on autopay, tenants past due</td><td>The baseline numbers you will reconcile against</td></tr>
            <tr><td>State the facility is in</td><td>Delinquency, notice and lien rules are set by each state</td></tr>
            <tr><td>Local constraints</td><td>Busy season, a manager leaving, construction, a pending sale</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The table also sets your migration order: facilities on the same source software share a conversion script,
        and those with unusual gate hardware or many past-due tenants go later.
      </p>

      <h2>Questions to ask the outgoing vendor</h2>
      <p>
        The contract with each outgoing vendor decides what you can get and when. These are questions to put to the
        vendor and to your own counsel, not legal conclusions; terms differ by vendor and by contract.
      </p>
      <ul>
        <li><strong>Who owns the data?</strong> Does the contract say the facility data belongs to the operator, and does that survive the change of ownership that came with the acquisition? Is the agreement assignable to you, or does it have to be re-signed?</li>
        <li><strong>What exactly is in the export?</strong> Tenants and contacts only, or also ledgers, payment history, notes, documents, signed leases, gate access logs and audit history? In which format, and with which identifiers?</li>
        <li><strong>Can you run the export yourself, and how often?</strong> You will need more than one: a trial export for mapping, a rehearsal export, and the final one on cutover day.</li>
        <li><strong>Is read-only access offered after termination?</strong> For how long, and at what cost? Staff will need to look up old history.</li>
        <li><strong>What is the notice period, and what stops at the end?</strong> The gate integration, the online rental page, automated emails: on which date and at what time?</li>
        <li><strong>Who controls the payment data, and will they cooperate with a transfer?</strong> Often this is the processor rather than the software vendor (see the payment section). Find out who the merchant of record is for each facility.</li>
        <li><strong>What happens to the data after termination?</strong> Deleted, retained or returned, with written confirmation?</li>
      </ul>
      <p>Ask early. The answers often set the migration date.</p>

      <h2>Map the data, entity by entity</h2>
      <p>
        Write the mapping down as a table, one row per target field, with the source field, the transformation and
        what happens to values that do not fit. The rows that need a business decision appear here, weeks before
        cutover. The mechanics (the mapping table, a permanent id map, and a quarantine for rejected rows that must
        reach zero) are described in the <Link href={LEGACY}>legacy migration guide</Link>; below are the
        self-storage entities and what tends to go wrong with each.
      </p>

      <h3>Units and unit inventory</h3>
      <p>
        Units are the anchor: leases, access zones and smart locks are assigned to them, and occupancy is counted
        from them. Agree on the unit identifier first. Unit numbers that look the same can differ in zero-padding,
        suffixes or building prefixes between systems (&ldquo;A-101&rdquo;, &ldquo;A101&rdquo;, &ldquo;0101&rdquo;),
        and every downstream match depends on them. Carry over type, dimensions, building, climate control, status
        (rentable, occupied, reserved, out of service), and the standard and current rates separately. If you rename
        units to a portfolio standard, do it in the mapping with a lookup table, before any lock or gate data is
        matched.
      </p>

      <h3>Tenants and leases</h3>
      <p>
        Carry primary and alternate contacts, the business name for commercial tenants, communication preferences,
        signed leases, and protection or insurance enrollment. Keep the original move-in date; do not let the import
        set it to the conversion date. Tenants with several units, and units with several authorized people, are
        where duplicates and missing access appear, so give them their own test cases.
      </p>

      <h3>Billing: balances, paid-through dates and credits</h3>
      <p>
        The paid-through date is the field to protect most. It decides when a tenant is next billed, when they
        become late, and when access is restricted. For each occupied unit, carry over:
      </p>
      <ul>
        <li>current rent and any scheduled rent change;</li>
        <li>the paid-through date;</li>
        <li>the balance, split into rent, fees, protection, merchandise and tax where the source allows;</li>
        <li>prepaid rent, credits and deposits;</li>
        <li>the autopay flag and billing day;</li>
        <li>discounts and promotions with their end dates.</li>
      </ul>
      <p>
        Decide whether to migrate the full ledger as transactions, or an opening balance plus read-only history. An
        opening balance is simpler to load and reconcile; full history helps staff in disputes, but every
        transaction must map to a type in the new system. Either way, each tenant&apos;s balance must match the old
        system on cutover day.
      </p>
      <p>
        Settle billing-day logic before cutover. If one system bills on the move-in anniversary and the other on the
        first of the month, every tenant needs an explicit rule for the first period.
      </p>

      <h3>Delinquency and historical records</h3>
      <p>
        Tenants who are past due on cutover day are the highest-risk records in the migration. Late fees, notices,
        access restrictions, overlocks and lien sales are governed by the law of the state where each facility sits,
        and the procedures differ between states. This article does not describe those rules. The operator&apos;s
        counsel sets them, and the new system should hold them as per-state configuration that counsel has reviewed.
      </p>
      <p>What the migration has to do is narrower and still important:</p>
      <ul>
        <li><strong>Freeze delinquency automation around cutover.</strong> Pause automated late fees, notices and access changes in the old system before the final export, and keep them paused in the new system until the first reconciliation passes. A fee or notice generated twice, or a step skipped because the new system starts counting from zero, is the failure to avoid.</li>
        <li><strong>Carry the current stage and its history.</strong> For each past-due tenant: the date the balance became past due, the fees already charged, every notice already sent with its date and method, and whether access is restricted or the unit is overlocked. The new system needs these to continue a process already in progress rather than restart it.</li>
        <li><strong>Keep the documents.</strong> Copies of notices, proof of mailing and any related correspondence must be retrievable after the switch, whether imported or archived.</li>
        <li><strong>Consider moving facilities with active lien proceedings later</strong>, and ask counsel whether to complete or pause those steps first.</li>
      </ul>
      <p>
        For closed history (move-outs, past tenants, old payments), decide what is imported, what is archived, and
        for how long.
      </p>

      <h2>Payment methods: a processor question, not an export field</h2>
      <p>
        A software export usually gives you a tenant&apos;s autopay flag and perhaps the last four digits of a card.
        It does not normally give you the card itself. Card numbers are held by the payment processor or its vault,
        and moving them is a transfer between processors under PCI rules, which both processors have to agree to and
        carry out. Whether a given set of stored cards or bank accounts can move to your new processor depends on the
        old processor, the new processor and your agreements with them. Confirm it with both before you set a date.
      </p>
      <p>Questions to put to both the old and the new processor before you set a date:</p>
      <ul>
        <li>Who has to request the transfer, and how long does it take from request to completion?</li>
        <li>Which payment methods move (cards, bank accounts) and which do not?</li>
        <li>What happens to card updates made at the old processor while the transfer is running?</li>
        <li>How will the new processor tell you which old customer record became which new one, so your system can link each tenant to the right payment method?</li>
        <li>Can new tenants be charged on the new processor while existing tenants are still charged on the old one?</li>
      </ul>
      <p>
        Each processor has its own terms, and some transfers are not possible at all. Plan for three outcomes per
        facility:
      </p>
      <ol>
        <li><strong>Transfer confirmed.</strong> Schedule it with both processors, freeze card updates in the old system for the window, and load the old-to-new customer mapping before the first billing run.</li>
        <li><strong>Transfer partial.</strong> For example, cards move but bank accounts do not, or some tenants&apos; records are rejected. Identify those tenants before cutover.</li>
        <li><strong>No transfer.</strong> Tenants re-enter their payment details. Start the outreach well before cutover, through more than one channel, and keep those tenants off automatic late fees until they have had a fair chance to re-enroll.</li>
      </ol>
      <p>
        Payment history is separate from the stored payment method: export it from the old software&apos;s ledger and
        from the old processor&apos;s reports. For reference, billing in our <Link href={CASE}>case study</Link> runs on
        Stripe with automatic retries for failed payments.
      </p>

      <h2>Gate codes and lock assignments</h2>
      <p>
        Access is where a migration becomes visible to tenants within minutes. Plan it as its own workstream with its
        own vendor contacts. How access stays in step with billing once everything runs on the new system is covered
        in our <Link href={ACCESS}>access control integration guide</Link>; these are the points specific to the move.
      </p>
      <p>
        <strong>Gate codes follow the tenant.</strong> Migrate each code with the tenant and unit, and decide in
        advance whether codes stay the same. Keeping them avoids a wave of calls on cutover day. If the new system
        needs a different format, or old codes were shared, change them and tell tenants before the switch.
      </p>
      <p>
        <strong>Sync speed decides your cutover window.</strong> Ask your gate-access vendor how quickly a new code,
        and separately an edited code, reaches the keypad on both the old and the new software; the answers can
        differ. If the new path is slower than staff expect, a tenant who pays a past-due balance after cutover may
        stand at a locked gate.
      </p>
      <p>
        <strong>The gate integration may need to be set up, not just switched.</strong> A gate or smart-lock vendor
        listing your new software as supported does not mean the connection is live for your facilities. Confirm
        support for your exact hardware and target software, ask how the connection is made and how long setup
        takes, and put that lead time in the plan.
      </p>
      <p>
        <strong>Lock assignment depends on unit naming.</strong> For smart locks and electronic overlocks, the
        lock-to-unit assignment must survive the move. Ask your smart-lock vendor how it matches locks to units when
        it is connected to a new management system; if it relies on unit numbers, those numbers must match the
        naming in the new system exactly. This is another reason to settle unit identifiers before anything else.
      </p>
      <p>
        <strong>Mixed hardware across acquired facilities is normal.</strong> If facilities keep different gate and
        lock vendors, the target system needs one way to grant, revoke and audit access across all of them. In our{' '}
        <Link href={CASE}>case study</Link> that was an abstraction layer that normalizes lock commands (lock, unlock,
        check status) across vendors, with three smart lock vendors behind one API; when the client later added a
        fourth lock vendor, integration took two weeks instead of two months.
      </p>
      <p>
        <strong>Several software platforms can also mean several vendor accounts.</strong> Ask whether your gate
        vendor needs a separate account or configuration for each management software platform. During a staged
        migration you will have facilities on both the old and the new software, so staff may work across two admin
        logins until the last facility moves.
      </p>

      <h2>Pilot one facility, then move the rest in waves</h2>
      <p>
        Move one facility first. Choose one that is small enough to recover by hand, but whose data includes the
        hard cases: autopay tenants, past-due tenants, multi-unit tenants, and the gate hardware most of your
        portfolio uses. One operator who wrote for Inside Self-Storage about switching his own software, Tim Davis of
        American Storage (January 16, 2026), described the same instinct:{' '}
        <Src href={ISS}>&ldquo;I started with my smallest self-storage facility first&rdquo;</Src>, because it would be
        the <Src href={ISS}>easiest one to update and change back if it didn&apos;t work out</Src>. The rollout in our{' '}
        <Link href={CASE}>case study</Link> went to 10 pilot sites before the full deployment across 150+ facilities.
      </p>
      <p>
        <strong>What &ldquo;parallel&rdquo; can mean here.</strong> A full parallel run, with both systems live and
        kept in step, is hard in self-storage because there is one gate, one keypad and one stored card per tenant.
        Two systems cannot both own them. A more practical parallel period:
      </p>
      <ul>
        <li>The new system is loaded from a rehearsal export and refreshed daily, but takes no payments and controls no gates.</li>
        <li>Staff work in the old system as usual; someone repeats a sample in the new one and compares results: a move-in, a payment, a partial payment, a move-out, a unit transfer, a late fee.</li>
        <li>Daily reconciliation (below) runs against both until differences are zero or explained.</li>
      </ul>
      <p>Schedule the cutover once that period has covered these transaction types and at least one billing day.</p>
      <p>
        <strong>Waves after the pilot.</strong> Group the remaining facilities by source software, gate vendor and
        state, so each wave reuses a tested conversion and gate setup, and let the previous wave complete a billing
        cycle first.
      </p>

      <h2>Cutover at a facility</h2>
      <p>A per-facility checklist, owned by a named person, with a verification for each step:</p>
      <ol>
        <li>Tenants told in advance about anything they will notice: a new payment portal, a new app, new gate codes, new receipts.</li>
        <li>Gate vendor and lock vendor booked for the cutover window, with the new integration tested against a test unit.</li>
        <li>Payment-data transfer completed, or the re-collection plan started, for every autopay tenant.</li>
        <li>Delinquency automation paused in the old system; scheduled jobs (late fees, notices, autopay runs) checked for the cutover day.</li>
        <li>Old system closed to new transactions at a set time; final export taken.</li>
        <li>Final load into the new system; reconciliation checks run; go or no-go decided by the named owner against written criteria.</li>
        <li>Gate integration switched to the new system; a test code, a new code and a suspended code tested at the keypad.</li>
        <li>Website rental flow, call center, kiosk and insurance links pointed at the new system.</li>
        <li>Staff on site or on call for the first hours; a manual access procedure ready if the gate sync fails.</li>
        <li>Automation resumed one item at a time, autopay and late fees last, after the first reconciliation passes.</li>
      </ol>
      <p>
        Some operators keep access permissive during the switch. The operator quoted above{' '}
        <Src href={ISS}>&ldquo;left the gate open on the first day until I was sure all the data had transferred&rdquo;</Src>.
        That is a security trade-off. A narrower option is to keep the old codes valid in the gate system until the
        new sync is confirmed, with staff present.
      </p>

      <h2>Reconciliation</h2>
      <p>
        Run the same checks on both systems. Each has an expected difference of zero or a written exception.
        Checksum and sampling techniques are in the <Link href={LEGACY}>legacy migration guide</Link>; these are the
        self-storage checks.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Check</th><th>Compared how</th><th>Typical cause of a difference</th></tr></thead>
          <tbody>
            <tr><td>Units by status and type</td><td>Counts per facility</td><td>Unit renaming, out-of-service units mapped as rentable</td></tr>
            <tr><td>Occupied units and occupancy</td><td>Counts per facility</td><td>Reserved units or move-outs on cutover day</td></tr>
            <tr><td>Tenants and active leases</td><td>Counts, plus a sample by name</td><td>Multi-unit tenants merged or split</td></tr>
            <tr><td>Balance per tenant</td><td>Per-tenant comparison, not only totals</td><td>Fees not mapped, credits dropped, tax split differently</td></tr>
            <tr><td>Paid-through date per unit</td><td>Per-unit comparison</td><td>Billing-day rule change, prepaid months</td></tr>
            <tr><td>Autopay tenants with a working payment method</td><td>Count of autopay flags vs payment methods loaded</td><td>Rejected or untransferred cards</td></tr>
            <tr><td>Past-due tenants by stage</td><td>Per-tenant comparison of stage and notice history</td><td>Notices not imported, stage recalculated from zero</td></tr>
            <tr><td>Gate codes and access status</td><td>Per-tenant comparison of code and status, then a sample tested at the keypad</td><td>Code format changes, suspended tenants imported as active</td></tr>
            <tr><td>Lock assignments</td><td>Per-unit comparison</td><td>Unit naming mismatch</td></tr>
            <tr><td>Revenue for the last full month</td><td>Old system report vs migrated history</td><td>History loaded partially</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A total that matches can hide two errors that cancel out. Compare per tenant and per unit, and treat any
        unexplained difference as a bug.
      </p>

      <h2>Rollback planning</h2>
      <p>
        Decide before cutover how you would go back, and what you could not undo. The general structure (a defined
        window, written triggers, reverse sync or an explicit fix-forward decision) is in the{' '}
        <Link href={LEGACY}>legacy migration guide</Link>. In self-storage, the list of things that do not roll back is
        long:
      </p>
      <ul>
        <li>Payments already taken through the new processor, and refunds issued.</li>
        <li>Notices already sent, late fees already charged, and access changes already made at the gate.</li>
        <li>Gate codes already communicated to tenants.</li>
        <li>The payment-data transfer itself, and any cancellation of automatic billing at the old processor.</li>
        <li>The old vendor contract, once its notice period has ended.</li>
      </ul>
      <p>
        So keep the old system readable and its contract active until the window closes, keep gate codes unchanged
        if you can so the old system remains a working fallback, and write the triggers down: for example, the gate
        rejects current tenants, or balances fail reconciliation for more than an agreed number of tenants. Name who
        decides.
      </p>

      <h2>Validation through the first billing cycle</h2>
      <p>Most data errors surface when the new system first acts on its own. Watch:</p>
      <ul>
        <li><strong>The first autopay run.</strong> Compare the number and value of charges with what the old system would have run, and review declines by reason before retrying cards in bulk.</li>
        <li><strong>The first invoice or statement run.</strong> Review a sample before it is sent.</li>
        <li><strong>The first late-fee and notice run</strong>, against counsel&apos;s per-state configuration, with someone checking it before it goes out.</li>
        <li><strong>Gate access logs</strong> for denied entries by tenants who are current.</li>
        <li><strong>Staff corrections.</strong> Log every manual fix with its cause; a pattern points to a mapping error that would affect later waves.</li>
        <li><strong>Old-processor charges.</strong> Confirm that the old processor has stopped billing tenants, so no one is charged twice.</li>
      </ul>
      <p>
        Run the reconciliation daily until a full billing cycle completes with no unexplained differences, then
        decommission the old system and archive its final export.
      </p>

      <h2>Standardize, or put a layer over several systems?</h2>
      <p>
        Sometimes a facility cannot move yet: a long contract, unsupported gate hardware, a pending sale. The
        alternative is an integration layer that reads from several management systems and gives one portfolio view
        of occupancy, revenue and access while facilities move over time. That is close to the second option in our{' '}
        <Link href={BUILD_BUY}>build or buy guide</Link>, keeping a product and building on its API, and the{' '}
        <Link href={CASE}>case study</Link> shows the third: one platform that replaced the separate systems.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Can stored cards move from one payment processor to another?', answer: ['Sometimes, as a transfer between the processors rather than a software export. Whether it is possible depends on the old processor, the new processor and your agreements with them. Confirm with both before setting a date, and plan for tenants whose details do not transfer.'] },
        { question: 'Do gate codes have to change when we switch management software?', answer: ['Not necessarily. Migrating each code with its tenant and unit avoids calls on cutover day. Change codes only if the new system needs a different format or old codes were shared, and tell tenants first. Ask the gate vendor how long new and edited codes take to reach the keypad on the new software.'] },
        { question: 'How should tenants who are past due on cutover day be handled?', answer: ['Pause delinquency automation before the final export, carry each tenant’s current stage, fees and notice history into the new system, and resume automation only after reconciliation passes. Late-fee, notice and lien rules are set by each state’s law and the operator’s counsel, not by the migration.'] },
        { question: 'Should all acquired facilities move at once?', answer: ['Move one pilot facility first, then the rest in waves grouped by source software, gate vendor and state. The rollout in our self-storage case study went to 10 pilot sites before the full deployment across 150+ facilities.'] },
      ]} />

      <p className="cp-note">
        This guide does not name gate, lock or payment vendors and claims no partnership with any. Nothing here is
        legal advice; delinquency, notice and lien procedures are for your counsel.
      </p>
      <p>
        Consolidating facilities onto one system? See our <Link href="/industries/self-storage">self-storage software</Link>{' '}
        page and our <Link href="/services/api-integration">API integration service</Link>, which covers connecting
        management software, gate systems and payment processors. Every project starts with a 30-minute technical
        discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
