import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import NarPolicyToFeedDiagram from '../../components/diagrams/NarPolicyToFeedDiagram';

const SLUG = 'nar-mls-policy-changes-november-2026';
export const metadata = guideMetadata(SLUG);

// Sources opened and re-checked 2026-11-19; the public source list is in
// docs/content/sources/nar-mls-policy-changes-november-2026.md. The claim-by-claim record is kept
// outside this public repository. NAR's announcement and news item are primary; Real Estate News,
// The Close and Florida Realtors are secondary and are named wherever a detail comes from them.
// Rules for edits: the copyright and data feed policies are optional for each MLS; the use-of-data
// policy statement is not labeled optional by NAR; no effective dates are published; neither NAR
// document mentions AI; no MLS is named as having adopted anything. The full policy text was not
// on NAR's MLS policy page on 2026-11-19, so nothing here quotes it.
const NAR_PR = 'https://www.nar.realtor/newsroom/national-association-of-realtors-announces-approval-of-four-mls-policy-recommendations-at-nar-nxt';
const NAR_NEWS = 'https://www.nar.realtor/news/real-estate-news/nar-committee-approves-4-new-mls-policy-changes';
const NAR_HUB = 'https://www.nar.realtor/about-nar/policies/mls-policy';
const REN = 'https://www.realestatenews.com/2026/11/09/nar-approves-new-mls-policies-to-boost-local-control';
const CLOSE = 'https://theclose.com/news/news-nar-mls-copyright-policy-changes/';
const FLA = 'https://www.floridarealtors.org/news-media/news-articles/2026/11/nar-adopts-mls-policy-changes-copyright-data-use';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <p>
        On November 8, 2026 the National Association of REALTORS (NAR){' '}
        <Src href={NAR_PR}>announced that four MLS policy recommendations had been adopted at NAR NXT 2026</Src>.
        These NAR MLS policy changes cover copyright in listing content, eligibility for MLS data feeds, the
        permitted use of MLS data and who can sit on NAR&apos;s MLS committee.
      </p>
      <p>
        For IDX developers and brokerages, the main point is that two of the four, the copyright policy and the
        data feed policy, are <Src href={NAR_PR}>optional for each local MLS</Src>, and NAR has published no
        effective dates. Nothing changes in your feed, your license or your display rules until your own MLS acts.
        This guide sets out what was approved, which parts are optional, and what to check now.
      </p>

      <h2>The four changes at a glance</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Policy</th><th>Optional or mandatory</th><th>What it allows</th><th>Who feels it first</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Copyright</strong> (a revision to MLS Policy Statement 7.85 and a new copyright policy)</td>
              <td><Src href={NAR_PR}>Optional for each MLS</Src>. Participants <Src href={NAR_NEWS}>can opt out</Src>.</td>
              <td>An MLS may require <Src href={NAR_PR}>up to a 50% copyright interest in certain listing content</Src>, with quarterly copyright registration.</td>
              <td>Listing brokers, their photographers and MLS legal staff.</td>
            </tr>
            <tr>
              <td><strong>MLS data feed services</strong></td>
              <td><Src href={NAR_PR}>Optional for each MLS</Src>.</td>
              <td>Local eligibility and licensing requirements for data feeds, which must be <Src href={NAR_PR}>reasonable, objective and applied equally</Src>.</td>
              <td>Brokers and vendors that receive feeds of other participants&apos; listings.</td>
            </tr>
            <tr>
              <td><strong>Use of MLS data</strong></td>
              <td>Not labeled optional by NAR. Real Estate News reports it is <Src href={REN}>mandatory</Src>.</td>
              <td>States that use <Src href={NAR_PR}>must follow the participation or data licensing agreement</Src> and be tied to brokerage services, appraisals or other valuations.</td>
              <td>Teams that use MLS data beyond display: analytics, valuation, data products.</td>
            </tr>
            <tr>
              <td><strong>MLS committee qualifications</strong></td>
              <td>Applies to NAR&apos;s own committee, not to MLS data.</td>
              <td><Src href={NAR_PR}>Updated qualifications</Src> for people applying for a committee seat.</td>
              <td>Committee applicants. No effect on feeds.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What NAR approved on November 8</h2>
      <p>
        The recommendations came from NAR&apos;s Multiple Listing Issues and Policies Committee and were{' '}
        <Src href={NAR_PR}>considered and adopted at NAR NXT 2026</Src>. The reports differ slightly on the
        sequence. NAR&apos;s news item says{' '}
        <Src href={NAR_NEWS}>the committee approved the changes on Sunday during the conference</Src>, while Real
        Estate News reports that{' '}
        <Src href={REN}>the committee approved them on November 7 and NAR&apos;s Executive Committee gave final approval on Sunday</Src>.
        Either way, they were approved at NAR NXT and announced on November 8, 2026. NAR&apos;s chief executive,
        Nykia Wright, said the updates reflect a commitment to keeping MLS policies{' '}
        <Src href={NAR_PR}>&ldquo;relevant, effective, and responsive&rdquo;</Src>.
      </p>
      <p>
        Two things are missing from both NAR documents. Neither gives an effective date for any of the four
        changes, and the full policy text was not yet on <Src href={NAR_HUB}>NAR&apos;s MLS policy page</Src> when
        we checked on November 19, 2026. What follows is based on NAR&apos;s announcement and news item, with trade
        reporting named wherever it adds a detail. Treat the specifics as provisional until the policy text and
        your MLS&apos;s own rules are published.
      </p>
      <p>The four changes do not apply in the same way, and that decides whether anything reaches your feed:</p>
      <ul>
        <li>
          <strong>Two are optional local decisions:</strong> the copyright policy and the data feed services
          policy. They change nothing in a market unless that MLS adopts them.
        </li>
        <li>
          <strong>One is a statement about permitted use.</strong> NAR does not call it optional, and Real Estate
          News reports it is mandatory. It is described as restating principles that MLS agreements already
          contain.
        </li>
        <li>
          <strong>One concerns NAR&apos;s own committee.</strong> It sets who may apply for a seat and does not
          touch MLS data.
        </li>
      </ul>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><NarPolicyToFeedDiagram /></div>
        <figcaption>
          From NAR policy to your feed. A model policy reaches your participation or data license agreement only
          through your local MLS, and the two optional policies stop there unless that MLS adopts them.
        </figcaption>
      </figure>

      <h2>Copyright: can your MLS now co-own listing content?</h2>
      <p>
        Only if it chooses to, and only up to a limit. NAR approved{' '}
        <Src href={NAR_PR}>a revision to MLS Policy Statement 7.85 and a new optional copyright policy</Src>, which
        Florida Realtors&apos; summary names <Src href={FLA}>Copyright Protection of MLS Data</Src>. As described
        so far:
      </p>
      <ul>
        <li>
          An MLS may <Src href={NAR_PR}>require up to a 50% copyright interest in certain listing content</Src>.
          Real Estate News describes this as{' '}
          <Src href={REN}>no more than a 50% undivided copyright interest</Src> assigned by the participant.
        </li>
        <li>
          An MLS that does so takes on <Src href={NAR_PR}>quarterly copyright registration requirements</Src>.
          The Close reports that it must{' '}
          <Src href={CLOSE}>register eligible database updates with the US Copyright Office at least quarterly</Src>.
        </li>
        <li>
          <Src href={NAR_NEWS}>MLSs must give participants the opportunity to opt out</Src>.
        </li>
        <li>
          Brokers <Src href={NAR_PR}>keep the right to use and license their own listing content</Src>.
        </li>
      </ul>
      <p>
        So the answer to &ldquo;can an MLS own my listing photos&rdquo; is: not outright, and not by default. The
        Close&apos;s reading is that{' '}
        <Src href={CLOSE}>no listing copyright transfers automatically under the national policy</Src>. An
        assignment happens only where a local MLS adopts the policy, and a participant can opt out.
      </p>
      <p>
        The purpose given is enforcement: the policy is meant{' '}
        <Src href={FLA}>to strengthen copyright enforcement</Src>. California Regional MLS (CRMLS) already runs a
        program of this kind for photographers. Its general counsel told Real Estate News that{' '}
        <Src href={REN}>192 of more than 600 photographers had opted in</Src>, that the MLS sent a DMCA notice
        relying on that ownership, and that each of the 192 would receive{' '}
        <Src href={REN}>a check for $1,300</Src>. The Close adds two figures for scale: CRMLS{' '}
        <Src href={CLOSE}>distributes listings to more than 22,000 broker IDX websites</Src>, and in 2023 a
        federal appeals court <Src href={CLOSE}>upheld a $1.93 million award against Zillow</Src> over listing
        photos on its former Digs platform.
      </p>
      <p>
        For a build, the effect is narrow. The copyright notice shown with listings, and the terms under which
        photos reach you, may differ from one MLS to the next. For a brokerage, it is a reason to read
        photography contracts, because what a broker can assign depends on what those contracts gave the broker
        in the first place. That is a question for counsel.
      </p>

      <h2>Data feeds: who gets an IDX, VOW or back-office feed</h2>
      <p>
        The second optional policy concerns MLS data feed services. It{' '}
        <Src href={NAR_PR}>lets an MLS set local eligibility and licensing requirements for data feeds</Src>, on
        the condition that the requirements are{' '}
        <Src href={NAR_PR}>&ldquo;reasonable, objective, and applied equally to all participants&rdquo;</Src>.
      </p>
      <p>
        Real Estate News describes the effect as{' '}
        <Src href={REN}>separating MLS participation from data feed access</Src>. Quoting a co-chair of
        NAR&apos;s MLS work group, it lists the feeds concerned as those containing other participants&apos;
        listings: <Src href={REN}>IDX, VOW, broker back office and syndication</Src>. It also reports that the
        policy <Src href={REN}>allows an MLS to recover the cost of providing feeds</Src>.
      </p>
      <p>
        Two limits are part of NAR&apos;s description. Participants{' '}
        <Src href={NAR_PR}>keep access to listing information and to data feeds for their own listings</Src>. And
        the policy is optional, so an MLS that does nothing keeps the rules it has now.
      </p>
      <p>
        This MLS data feed policy does not end IDX, and it does not ask anyone to re-apply today. It changes an
        assumption that many integrations rest on: that being an MLS participant in good standing is enough to
        qualify for a feed of other brokers&apos; listings. Where an MLS adopts the policy, IDX feed eligibility
        becomes a local question, and it may be answered differently for each feed type. Our guide on{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link> explains the license
        types, and the <Link href="/blog/mls-boards-compared">reference to 15 US MLS boards</Link> shows how much
        the application route already varies.
      </p>

      <h2>Permitted use: what you can do with MLS data</h2>
      <p>
        The third change is a new policy statement on the use of MLS data. It says use{' '}
        <Src href={NAR_PR}>must comply with the applicable participation or data licensing agreement and be tied to brokerage services, appraisals or other valuations</Src>.
        NAR&apos;s news item says it addresses{' '}
        <Src href={NAR_NEWS}>concerns around unauthorized use of MLS content</Src>.
      </p>
      <p>
        This one differs from the two above. NAR&apos;s announcement does not call it optional. Real Estate News
        reports that it is mandatory, that one committee member objected to that, and that NAR&apos;s associate
        general counsel, Charlie Lee, answered that it is{' '}
        <Src href={REN}>&ldquo;mandatory in that these are already principles that are reflected in MLS policies&rdquo;</Src>.
        Read that way, it restates a rule most MLS data licensing agreements already contain. If your use of MLS
        data matches your license today, this policy is not a reason to expect a change.
      </p>
      <p>
        A note on AI, because product teams ask about it first. Neither NAR&apos;s announcement nor its news item
        mentions AI, and nothing published so far says the policy addresses model training, generated
        descriptions or chat-based search. The ordinary reading applies: any AI use of MLS data has to fit the
        license you hold, and where the license is silent, ask the MLS in writing before you build.
      </p>

      <h2>Before and after: what actually changes</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Topic</th><th>Before November 2026</th><th>After (if your MLS adopts)</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Copyright ownership</strong></td>
              <td>No NAR option for an MLS to require a copyright interest in listing content. NAR describes the option as <Src href={NAR_PR}>new</Src>.</td>
              <td>The MLS may require up to a 50% interest in certain listing content. Participants can opt out, and brokers keep the right to use and license their own content.</td>
            </tr>
            <tr>
              <td><strong>Feed eligibility</strong></td>
              <td>Feed access followed MLS participation, as <Src href={REN}>Real Estate News describes it</Src>.</td>
              <td>The MLS may set its own eligibility and licensing requirements for feeds of other participants&apos; listings. Access to your own listings stays.</td>
            </tr>
            <tr>
              <td><strong>Permitted use</strong></td>
              <td>Set by your participation or data license agreement.</td>
              <td>Still set by that agreement. This row does not depend on local adoption: the policy statement is not one of the optional ones, and it is reported to restate existing principles.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>What changes for IDX websites and PropTech builds</h2>
      <p>
        Nothing here requires a code change today. What changes is the list of things that are safe to hard-code.
        The points below are our engineering reading of the announcement, not requirements NAR has set.
      </p>
      <ul>
        <li>
          <strong>Check eligibility per MLS, not per platform.</strong> If feed eligibility becomes a local
          decision, onboarding a new board starts with that board&apos;s requirements for your feed type, even
          when the same aggregator delivers the data.
        </li>
        <li>
          <strong>Store license terms as configuration.</strong> Keep the terms for each MLS and feed type as
          data your system reads, not as a rule assumed once in code.
        </li>
        <li>
          <strong>Keep attribution and copyright notices data-driven.</strong> The notice an MLS requires next to
          a listing may change where it takes a copyright interest. Changing it should be a data update.
        </li>
        <li>
          <strong>Log where each listing field is used.</strong> Search, saved-search emails, CRM records,
          analytics, valuation models and exports are different uses. A permitted-use question from an MLS is
          easier to answer from an inventory than from memory.
        </li>
        <li>
          <strong>Expect different rules per board.</strong> A multi-MLS platform should be able to switch a feed
          type, a use or a notice on or off for one board without a release.
        </li>
      </ul>
      <p>A minimal record to keep for each MLS and feed type:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Setting</th><th>Why it may now vary by MLS</th></tr></thead>
          <tbody>
            <tr><td>Who holds the license, and under which broker</td><td>Eligibility may be set locally.</td></tr>
            <tr><td>Feed type: IDX, VOW, broker back office or syndication</td><td>Each can be licensed on its own terms.</td></tr>
            <tr><td>Permitted uses, as written in the agreement</td><td>The agreement is what the use policy points to.</td></tr>
            <tr><td>Attribution and copyright notice text</td><td>May change where an MLS adopts the copyright policy.</td></tr>
            <tr><td>Fees and renewal date</td><td>Cost recovery for feeds is reported as allowed.</td></tr>
            <tr><td>Agreement version and the date you accepted it</td><td>Shows which terms applied when data was ingested.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        None of the four changes concerns how data is delivered; our{' '}
        <Link href="/blog/reso-web-api-vs-rets">RESO Web API vs RETS</Link> guide covers that side. If local rules
        make you reconsider who should hold the license, see{' '}
        <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build</Link>. For budgets, the{' '}
        <Link href="/blog/mls-idx-integration-cost">MLS and IDX integration cost guide</Link> and the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link> use published license fees.
      </p>

      <h2>Who needs to check what</h2>
      <p>
        IDX, VOW, broker back-office and syndication feeds are separate licenses with separate terms. A change to
        one is not a change to all four, so each check below should name the feed type.
      </p>
      <ul>
        <li>
          <strong>Agent.</strong> Usually nothing to change. Your IDX site runs under your broker&apos;s
          participation and your vendor&apos;s license. Ask your broker whether the MLS has announced anything,
          and check your own photography contracts if you commission photos yourself.
        </li>
        <li>
          <strong>Brokerage.</strong> The participant owns the participation agreement, the decision to opt out
          of any copyright assignment, the firm&apos;s photography contracts and the list of every feed issued in
          the firm&apos;s name.
        </li>
        <li>
          <strong>Technology vendor.</strong> The vendor holds its own data license with each MLS. It is
          responsible for checking eligibility and terms per MLS and per feed type, and for telling clients what
          changed.
        </li>
        <li>
          <strong>MLS or aggregator.</strong> The MLS decides whether to adopt each optional policy and publishes
          the requirements. An aggregator delivers data under the terms each MLS sets; it does not set them.
        </li>
      </ul>

      <h2>Questions to send your MLS before an IDX project</h2>
      <p>These can be copied into an email to your MLS administrator or data licensing contact.</p>
      <ol>
        <li>Has the MLS adopted, or scheduled a vote on, NAR&apos;s optional copyright policy or its optional data feed services policy? If so, from what date?</li>
        <li>Do the eligibility requirements for an IDX feed differ from those for VOW, broker back-office or syndication feeds?</li>
        <li>Will our current participation and data license agreements be amended, and how much notice will we get?</li>
        <li>Which uses of MLS data does our agreement permit beyond public display, for example analytics, valuation models or AI features?</li>
        <li>If the copyright policy is adopted, how does a participant opt out, and by when?</li>
        <li>What attribution and copyright notice must appear with listings, and will it change?</li>
        <li>Are feed fees changing, and are they charged per feed, per vendor or per broker?</li>
        <li>Who is the contact for a vendor working on our behalf, and what does the vendor need to sign?</li>
      </ol>

      <h2>What to do now</h2>
      <h3>For brokerages</h3>
      <ul className="cp-checklist">
        <li>Read your participation agreement and note what it says about listing content and data use.</li>
        <li>Review photography contracts to see who owns the photos and what you are allowed to license.</li>
        <li>Ask your MLS about adoption plans and timing, using the questions above.</li>
        <li>List every feed issued in your firm&apos;s name, its type and the vendor that receives it.</li>
        <li>Ask each IDX or CRM vendor whether its license with your MLS is changing.</li>
        <li>Decide who in the firm watches MLS notices, so an opt-out window is not missed.</li>
      </ul>
      <h3>For technology vendors</h3>
      <ul className="cp-checklist">
        <li>List every MLS you hold a data license with, by feed type.</li>
        <li>Ask each MLS the adoption and eligibility questions, and record the answers with dates.</li>
        <li>Compare each product&apos;s use of MLS data with the permitted uses in each agreement.</li>
        <li>Check that attribution and copyright notices can be changed per MLS without a release.</li>
        <li>Tell clients what you have confirmed and what is still open, in writing.</li>
      </ul>
      <h3>For developers</h3>
      <ul className="cp-checklist">
        <li>Find every place eligibility, feed type or notice text is hard-coded, and move it to per-MLS configuration.</li>
        <li>Inventory every destination of MLS data: indexes, caches, emails, CRM syncs, exports, analytics and models.</li>
        <li>Store the agreement version and feed type with each data source.</li>
        <li>Make it possible to disable one feed or one use for one MLS without affecting the others.</li>
        <li>Confirm you can remove one MLS&apos;s data from every downstream store if a license ends.</li>
      </ul>

      <h2>Timeline and what we don&apos;t know yet</h2>
      <ul>
        <li><strong>Effective dates:</strong> none published by NAR for any of the four changes.</li>
        <li>
          <strong>Committee qualifications:</strong> Real Estate News reports the new criteria apply{' '}
          <Src href={REN}>starting next year</Src>, and NAR says they{' '}
          <Src href={NAR_NEWS}>will not affect existing committee members</Src>.
        </li>
        <li><strong>Local adoption:</strong> each MLS decides separately, so timing will differ by market. We have not seen an MLS publish an adoption decision, and this guide names none.</li>
        <li><strong>Policy text:</strong> not on <Src href={NAR_HUB}>NAR&apos;s MLS policy page</Src> when we checked. The exact definitions of &ldquo;certain listing content&rdquo; and of the feeds covered depend on it.</li>
      </ul>
      <p>
        We will update this guide when NAR publishes the text or effective dates. Last updated November 19, 2026.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Do the NAR changes ban or change IDX websites?', answer: ['No. None of the four changes ends IDX. The data feed services policy is ', ['optional for each MLS', NAR_PR], ', so an IDX website changes only if your MLS adopts new eligibility or licensing requirements, and NAR has published no effective dates.'] },
        { question: 'Can an MLS own my listing photos?', answer: ['Not outright. Under the optional copyright policy an MLS may require ', ['up to a 50% copyright interest in certain listing content', NAR_PR], ', and ', ['participants must be given the opportunity to opt out', NAR_NEWS], '. Brokers keep the right to use and license their own listing content.'] },
        { question: 'Does NAR or the MLS now own half of every photo?', answer: ['No. The policy concerns MLSs, not NAR, and nothing transfers to an MLS unless that MLS adopts the optional policy. The Close reports that ', ['no listing copyright transfers automatically under the national policy', CLOSE], '.'] },
        { question: 'Who can get an MLS data feed?', answer: ['That depends on your MLS. Under the optional data feed services policy an MLS may set local eligibility and licensing requirements, which must be ', ['reasonable, objective and applied equally to all participants', NAR_PR], '. Ask your MLS which requirements apply to your feed type.'] },
        { question: 'Do brokers keep access to their own listings?', answer: ['Yes. NAR says participants ', ['keep access to listing information and to data feeds for their own listings', NAR_PR], ' under the data feed services policy.'] },
        { question: 'Can MLS data be used for AI?', answer: ['NAR’s announcement does not mention AI. The policy on the use of MLS data says use ', ['must comply with the participation or data licensing agreement', NAR_PR], ', so any AI use has to fit the license you hold. If the license is silent, ask the MLS in writing.'] },
        { question: 'When do local rules take effect, and are existing agreements void?', answer: ['NAR has published no effective dates, and each MLS decides separately whether to adopt the optional policies. Nothing in the announcement says existing agreements are void. Your current agreement applies until your MLS amends it, so ask the MLS how and when it would give notice.'] },
      ]} />

      <h2>Sources</h2>
      <ul>
        <li><Src href={NAR_PR}>NAR newsroom: approval of four MLS policy recommendations at NAR NXT</Src> (November 8, 2026; primary)</li>
        <li><Src href={NAR_NEWS}>NAR news: committee approves four new MLS policy changes</Src> (November 8, 2026; primary)</li>
        <li><Src href={NAR_HUB}>NAR MLS policy page</Src> (checked November 19, 2026; the new policy text was not yet posted)</li>
        <li><Src href={REN}>Real Estate News: NAR approves new MLS policies to boost local control</Src> (November 9, 2026; secondary)</li>
        <li><Src href={CLOSE}>The Close: NAR&apos;s new MLS copyright policy</Src> (November 9, 2026; secondary)</li>
        <li><Src href={FLA}>Florida Realtors: NAR adopts MLS policy changes</Src> (November 9, 2026; secondary)</li>
      </ul>

      <p className="cp-note">
        Last reviewed November 19, 2026, against the linked sources. This guide summarizes published information
        and is not legal advice. Confirm how the policies apply to you with your MLS and your counsel.
      </p>

      <p>
        Planning an IDX site or a multi-MLS platform? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link> or{' '}
        <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
