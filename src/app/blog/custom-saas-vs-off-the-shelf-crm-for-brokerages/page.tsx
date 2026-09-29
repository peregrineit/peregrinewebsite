import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'custom-saas-vs-off-the-shelf-crm-for-brokerages';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-09-29. Prices are the vendors' published list prices on that date.
const FUB = 'https://www.followupboss.com/pricing';
const FUB_API = 'https://www.followupboss.com/integrations';
const WISE = 'https://www.wiseagent.com/pricing/';
const RG = 'https://www.realgeeks.com/pricing/';
const SF = 'https://www.salesforce.com/sales/pricing/';
const LOFTY = 'https://lofty.com/pricing';
const BOLD = 'https://boldtrail.com/pricing/';
const CINC = 'https://www.cincpro.com/pricing';
const NAR_2026 = 'https://www.nar.realtor/newsroom/realtors-adopt-technology-to-save-time-and-improve-the-client-experience-nar-report-finds';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Most brokerages should start with an off-the-shelf real estate CRM. Subscriptions are predictable, setup is
        mostly configuration rather than development, and the vendor carries the cost of maintenance. A custom platform starts to make sense when
        the CRM has become the product you sell to agents, when you need workflows or data that no vendor supports, or
        when you are paying for several tools that each cover part of the job and still reconciling them by hand.
      </p>
      <p>
        Many brokerages end up in between: they keep a subscription CRM and build custom pieces around it, such as a
        lead-routing service, a reporting layer or an agent portal, connected through the CRM&apos;s API.
      </p>

      <h2>How many agents already use a CRM?</h2>
      <p>
        In the National Association of REALTORS® 2026 technology report, CRM was reported by{' '}
        <Src href={NAR_2026}>46% of agents</Src> as a technology they use. The same report puts agents&apos; monthly
        technology spending at:{' '}
        <Src href={NAR_2026}>less than $50 for 18%, $50 to $250 for 36%, $251 to $500 for 19%, and more than $500 for 22%</Src>{' '}
        (NAR, September 22, 2026).
      </p>

      <h2>What off-the-shelf CRMs cost in 2026</h2>
      <p>
        These are list prices published on each vendor&apos;s own pricing page when we checked them in September 2026.
        Vendors change prices often, so confirm them before you budget.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Product</th><th>Plan</th><th>Published price</th><th>Users included</th></tr>
          </thead>
          <tbody>
            <tr><td>Follow Up Boss</td><td>Grow</td><td><Src href={FUB}>$69 per user per month ($58 billed annually)</Src></td><td>Per user</td></tr>
            <tr><td>Follow Up Boss</td><td>Pro</td><td><Src href={FUB}>$499 per month ($416 billed annually)</Src></td><td><Src href={FUB}>10; extra users $49/month</Src></td></tr>
            <tr><td>Follow Up Boss</td><td>Platform</td><td><Src href={FUB}>$1,000 per month ($833 billed annually)</Src></td><td><Src href={FUB}>30; extra users $20/month</Src></td></tr>
            <tr><td>Wise Agent</td><td>CRM</td><td><Src href={WISE}>$49 per month ($499 per year)</Src></td><td><Src href={WISE}>Up to 5 team members on a shared login; extra logins $20/month</Src></td></tr>
            <tr><td>Real Geeks</td><td>Platform (includes an IDX website)</td><td><Src href={RG}>$399 per month plus a $500 one-time setup fee</Src></td><td><Src href={RG}>2; users 3–10 are $25/month each</Src></td></tr>
            <tr><td>Salesforce Sales Cloud</td><td>Starter Suite to Max</td><td><Src href={SF}>$25 to $550 per user per month</Src> depending on edition</td><td>Per user</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Several of the platforms most often marketed to brokerages do not publish prices and ask you to request a quote,
        including <Src href={LOFTY}>Lofty</Src>, <Src href={BOLD}>BoldTrail</Src> and <Src href={CINC}>CINC</Src>. Real
        Geeks also lists IDX feeds at <Src href={RG}>$10 per board per month</Src>, which matters if your agents work
        across several MLS boards.
      </p>

      <h3>A worked example</h3>
      <p>
        Pricing structure changes the answer as a brokerage grows. Using Follow Up Boss&apos;s published prices,{' '}
        <Src href={FUB}>30 users on the per-user Grow plan would list at 30 × $69 = $2,070 a month</Src>, while the
        Platform plan lists at <Src href={FUB}>$1,000 a month with 30 users included</Src>. Per-seat pricing is cheap for a small team and
        expensive for a large one, and bundled plans flip that. Run the numbers for your own headcount on the vendor&apos;s
        page, and include add-ons such as calling and texting.
      </p>

      <h2>What you give up with an off-the-shelf CRM</h2>
      <ul>
        <li><strong>Your workflows bend to the product.</strong> Lead routing, commission rules, onboarding and reporting work the way the vendor designed them.</li>
        <li><strong>Data lives in someone else&apos;s schema.</strong> Exports and APIs vary by vendor and plan. Some publish an open API; Follow Up Boss, for example, invites customers to <Src href={FUB_API}>build their own integration with its open API</Src>.</li>
        <li><strong>Costs scale with seats.</strong> Per-user pricing grows with every agent you recruit.</li>
        <li><strong>You cannot sell it.</strong> If your technology is part of how you recruit agents, a product every competitor can buy is not a differentiator.</li>
      </ul>

      <h2>What a custom platform involves</h2>
      <p>
        A custom brokerage platform is a software product you own and maintain. Beyond the initial build, plan for:
      </p>
      <ul>
        <li><strong>MLS data.</strong> Listing feeds require data access from each MLS and a sync pipeline that keeps status current. Our guide to <Link href="/blog/mls-idx-integration-cost">MLS and IDX integration cost</Link> covers the fees.</li>
        <li><strong>Development and maintenance.</strong> Engineering time is the largest cost; see <Link href="/blog/cost-to-build-a-real-estate-platform">what it costs to build a real estate platform</Link> for sourced labor rates.</li>
        <li><strong>Hosting and third-party services.</strong> Maps, email and SMS, search and storage are billed by usage.</li>
        <li><strong>Security and compliance.</strong> Role-based access, audit logs and data retention become your responsibility.</li>
      </ul>

      <h2>When custom is the better choice</h2>
      <ul>
        <li>You run a franchise, a network of brokerages or an agent-website platform where the software is part of the product.</li>
        <li>You need data or workflows no CRM supports, such as multi-MLS search across markets, custom commission logic or investor reporting.</li>
        <li>You are paying for several overlapping tools and reconciling them by hand.</li>
        <li>You want to own your lead and client data outright, in a schema you control.</li>
      </ul>
      <p>
        Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> is an example
        of the first case: a white-label platform serving branded IDX websites and lead capture for agents across the US
        and Canada from one backend.
      </p>

      <h2>A middle path: keep the CRM, build around it</h2>
      <p>
        If a subscription CRM covers most of your needs, custom work can fill the gaps without replacing it: a routing
        service that assigns leads by your own rules, a reporting warehouse that combines CRM, MLS and transaction data,
        or an agent portal that pulls from the CRM&apos;s API. This is usually the lowest-risk way to get custom
        behavior. Our <Link href="/services/api-integration">API integration service</Link> covers this kind of work.
      </p>

      <h2>Questions to answer before you decide</h2>
      <ol>
        <li>Is the CRM a tool your agents use, or part of what you sell to agents?</li>
        <li>Which workflows do you currently handle outside the CRM, in spreadsheets or other tools?</li>
        <li>How many seats will you have in three years, and how does each vendor&apos;s pricing scale with that?</li>
        <li>Can you export all of your data, and does your plan include API access?</li>
        <li>Who will maintain a custom platform after launch?</li>
      </ol>
      <GuideFaq slug={SLUG} items={[
  { question: 'How many real estate agents use a CRM?', answer: ['In NAR\'s 2026 technology report, ', ['46% of agents', NAR_2026], ' reported using a CRM.'] },
  { question: 'What does Follow Up Boss cost?', answer: ['Its pricing page lists ', ['$69 per user per month on Grow, $499 per month for Pro with 10 users, and $1,000 per month for Platform with 30 users', FUB], ', billed monthly, with lower prices when billed annually.'] },
  { question: 'Which brokerage CRMs don\'t publish their prices?', answer: ['', ['Lofty', LOFTY], ', ', ['BoldTrail', BOLD], ' and ', ['CINC', CINC], ' ask you to request a quote instead of listing prices on their pricing pages.'] },
  { question: 'When does a custom brokerage platform make sense?', answer: ['When the software is part of what you sell to agents, when you need data or workflows no CRM supports (such as multi-MLS search or custom commission logic), when you pay for overlapping tools and reconcile them by hand, or when you want to own your data in a schema you control.'] },
  { question: 'Can we keep an off-the-shelf CRM and still add custom features?', answer: ['Yes. Custom services such as lead routing, reporting or an agent portal can sit around a subscription CRM and connect through its API. Follow Up Boss, for example, invites customers to ', ['build their own integration with its open API', FUB_API], '.'] },
]} />

      <p className="cp-note">
        Prices were taken from the vendors&apos; public pricing pages on September 29, 2026 and exclude taxes and
        optional add-ons unless stated.
        {/* TODO(owner): add a disclosure line if Peregrine has any partnership with a vendor listed here. */}
      </p>
      <p>
        If you are weighing a custom build, see our <Link href="/services/saas-development">SaaS development service</Link>{' '}
        or <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
