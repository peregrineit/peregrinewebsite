import Link from 'next/link';
import GuideLayout, { Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'cost-to-build-a-real-estate-platform';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-09-29. Figures are as published on each page on that date.
const CLUTCH = 'https://clutch.co/developers/pricing';
const BLS = 'https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm';
const JOBBANK = 'https://www.jobbank.gc.ca/marketreport/wages-occupation/22548/ca';
const GMAPS = 'https://developers.google.com/maps/billing-and-pricing/pricing';
const MAPBOX = 'https://www.mapbox.com/pricing';
const RDS = 'https://aws.amazon.com/rds/postgresql/pricing/';
const TRESTLE = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const STELLAR = 'https://www.stellarmls.com/data-delivery';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        The cost of a real estate platform is mostly engineering time, and engineering time depends on scope: how many
        MLS boards you pull data from, which user groups you serve (buyers, agents, brokers, investors), and which
        features go into the first release. On top of the build come recurring costs: MLS data fees, maps, hosting and
        third-party services, plus ongoing maintenance.
      </p>
      <p>
        For a market reference point, Clutch reports an{' '}
        <Src href={CLUTCH}>average software development project cost of $132,480.29</Src>, with most projects falling
        between <Src href={CLUTCH}>$10,000 and $49,999</Src> and an{' '}
        <Src href={CLUTCH}>average duration of about 13 months</Src> (Clutch, updated September 21, 2026). Those figures cover all kinds of software, not
        just real estate, so treat them as context rather than a quote.
      </p>

      <h2>What drives the build cost</h2>
      <h3>Scope: which platform are you building?</h3>
      <p>&ldquo;Real estate platform&rdquo; covers very different products. The main types, from our own case studies:</p>
      <ul>
        <li><strong>Agent and brokerage websites with IDX search.</strong> MLS sync, search, property pages and lead capture. Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study lists an 8-month project</Link> for a multi-tenant version serving agents in the US and Canada.</li>
        <li><strong>Multi-market brokerage platforms with AI features.</strong> Several MLS feeds, a CRM, valuation and conversational search. Our <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study lists 14 months</Link>.</li>
        <li><strong>Investor and property-owner portals.</strong> Role-based access, documents, reporting and distributions. Our <Link href="/case-studies/proptech-investor-portal">investor portal case study lists 6 months</Link>.</li>
        <li><strong>Property operations software.</strong> Billing, access control and occupancy, as in our <Link href="/case-studies/self-storage-management-platform">self-storage platform case study</Link>.</li>
      </ul>
      <p>
        Those durations are for the specific scopes described in each case study; a smaller first release can take much
        less time.
      </p>

      <h3>Labor rates</h3>
      <p>Engineering rates vary more by where the team is than by anything else:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Reference</th><th>Figure</th><th>Source</th></tr></thead>
          <tbody>
            <tr><td>Software development companies in India (typical hourly rate)</td><td><Src href={CLUTCH}>$25 to $49 per hour</Src></td><td>Clutch, Sept 2026</td></tr>
            <tr><td>Software development companies in the United States (typical hourly rate)</td><td><Src href={CLUTCH}>$50 to $99 per hour</Src></td><td>Clutch, Sept 2026</td></tr>
            <tr><td>Software development companies in Canada (typical hourly rate)</td><td><Src href={CLUTCH}>$100 to $149 per hour</Src></td><td>Clutch, Sept 2026</td></tr>
            <tr><td>US software developer median annual wage (employee, not agency rate)</td><td><Src href={BLS}>$135,980 (May 2025)</Src></td><td>U.S. Bureau of Labor Statistics</td></tr>
            <tr><td>Canada software developer median hourly wage (employee, CAD)</td><td><Src href={JOBBANK}>$48.08 per hour (2023–2024)</Src></td><td>Government of Canada Job Bank</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Agency rates and employee wages are not directly comparable: an in-house team also carries hiring time,
        benefits, management and tooling, while an agency rate usually includes them. A small offshore team often
        pairs lower hourly rates with the need for clear specifications and regular overlap in working hours.
      </p>
      {/* TODO(owner): add Peregrine's own rates here, labelled as Peregrine's rates, once supplied. */}

      <h3>MLS data</h3>
      <p>
        Listing data carries its own fees, set by each MLS and sometimes by a data vendor. For example, Stellar MLS lists
        a <Src href={STELLAR}>vendor product fee of $7,500 per product per year</Src>, and Trestle charges technology
        providers <Src href={TRESTLE}>$100 to $175 per connection per month</Src> on top of MLS fees. Our{' '}
        <Link href="/blog/mls-idx-integration-cost">MLS and IDX integration cost guide</Link> compares fees across
        several boards and vendors.
      </p>

      <h3>Maps, hosting and third-party services</h3>
      <p>Most of these are billed by usage and are small at launch, but they grow with traffic:</p>
      <ul>
        <li><strong>Maps.</strong> Google Maps Platform includes <Src href={GMAPS}>10,000 free Dynamic Maps loads per month, then $7.00 per 1,000</Src>; <Src href={GMAPS}>geocoding is free up to 10,000 requests, then $5.00 per 1,000</Src>. Mapbox includes <Src href={MAPBOX}>50,000 free web map loads per month, then $5.00 per 1,000</Src>.</li>
        <li><strong>Database and hosting.</strong> Cloud providers offer free tiers for early development; for example, AWS lists <Src href={RDS}>750 hours per month of selected single-AZ RDS instances with 20 GB of storage</Src> on its free tier for new accounts. Production workloads cost more and depend on traffic and data volume.</li>
        <li><strong>Search.</strong> Fast map and filter search over large listing sets usually needs a search engine such as Elasticsearch or OpenSearch, hosted or managed.</li>
        <li><strong>Email, SMS and e-signature.</strong> Lead notifications, texting and document signing are separate subscriptions or usage fees.</li>
      </ul>

      <h3>Maintenance after launch</h3>
      <p>
        MLS boards change fields and rules, vendors change APIs, and security patches never stop. Budget for ongoing
        engineering time after launch rather than treating the build as a one-off cost.
      </p>

      <h2>How to keep the first release affordable</h2>
      <ol>
        <li><strong>Start with one MLS.</strong> Design the data model for several boards, but launch with the market that matters most.</li>
        <li><strong>Use off-the-shelf pieces where they are not your differentiator.</strong> An existing CRM, e-signature or email service connected by API is cheaper than building one. Our guide on <Link href="/blog/custom-saas-vs-off-the-shelf-crm-for-brokerages">custom SaaS versus off-the-shelf CRMs</Link> covers this choice.</li>
        <li><strong>Get the data architecture right early.</strong> Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> is a rebuild of a platform whose original data design could not scale past a handful of agents.</li>
        <li><strong>Ship in short increments.</strong> Two-week sprints with working demos let you drop features that turn out not to matter.</li>
        <li><strong>Check MLS rules before design.</strong> Display, attribution and refresh requirements shape the architecture.</li>
      </ol>

      <h2>Questions to ask any development team</h2>
      <ul>
        <li>Which MLS boards have you integrated, and through which feeds (RESO Web API, RETS, vendor platforms)?</li>
        <li>How do you handle multiple boards, duplicate listings and status changes?</li>
        <li>What does the estimate include: design, QA, infrastructure setup, MLS applications, launch support?</li>
        <li>Who owns the code, the infrastructure accounts and the data?</li>
        <li>What will it cost to run and maintain in the first year after launch?</li>
      </ul>
      <p className="cp-note">
        Figures were taken from the linked public sources on September 29, 2026. Rates and prices change; confirm them
        before budgeting. Project durations are from Peregrine IT Solutions&apos; published case studies.
      </p>
      <p>
        Planning a build? See our <Link href="/services/saas-development">SaaS development service</Link>, our{' '}
        <Link href="/industries/real-estate">real estate work</Link>, or <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
