import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'odoo-implementation-cost';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-10-09. Odoo shows different prices by visitor country, with no
// currency selector. Plan prices below are from the Internet Archive's capture of
// odoo.com/pricing as served to a Canadian visitor (CAD); Success Pack prices are from
// its capture of the page as served to a US visitor (USD). US-dollar plan prices could
// not be confirmed from a US connection, so none are stated.
// TODO(owner): if someone can open odoo.com/pricing from a US connection, add the USD
// plan prices here with that date.
const PRICING = 'https://www.odoo.com/pricing';
const PRICING_CA = 'https://web.archive.org/web/20261005210003/https://www.odoo.com/pricing';
const CONFIGURATOR = 'https://www.odoo.com/pricing-configurator?plan=custom';
const PACKS = 'https://www.odoo.com/pricing-packs';
const PACKS_US = 'https://web.archive.org/web/20260809055248/https://www.odoo.com/pricing-packs';
const EDITIONS = 'https://www.odoo.com/page/editions';
const LICENSES = 'https://www.odoo.com/documentation/19.0/legal/licenses.html';
const ONLINE = 'https://www.odoo.com/documentation/19.0/administration/odoo_online.html';
const SH = 'https://www.odoo.sh/pricing';
const UPGRADE = 'https://www.odoo.com/documentation/19.0/administration/upgrade.html';
const TERMS = 'https://www.odoo.com/documentation/19.0/legal/terms/enterprise.html';
const SUPPORT = 'https://www.odoo.com/documentation/19.0/administration/standard_extended_support.html';
const API = 'https://www.odoo.com/documentation/19.0/developer/reference/external_api.html';
const RPC = 'https://www.odoo.com/documentation/19.0/developer/reference/external_rpc_api.html';
const CLUTCH_ERP = 'https://clutch.co/it-services/msp/pricing';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        An Odoo implementation has four costs: user licences, hosting, implementation services, and the upkeep of any
        custom code. The first two are published and predictable. The last two depend on how far you move from
        standard Odoo, and one decision drives most of it: as soon as you need custom modules or an integration through
        Odoo&apos;s API, you are on Odoo&apos;s Custom plan, off Odoo Online, and paying to maintain code through
        every upgrade.
      </p>

      <h2>1. Licences</h2>
      <p>
        Odoo sells three plans: One App Free, Standard and Custom. The difference between the two paid plans is what
        matters for cost:
      </p>
      <ul>
        <li><strong>Standard</strong> covers all apps but <Src href={PRICING}>is hosted on Odoo Online, Odoo&apos;s cloud infrastructure for databases without custom modules</Src>.</li>
        <li><strong>Custom</strong> adds Odoo Studio, multi-company, the external API, and hosting on Odoo.sh or your own servers. Odoo says <Src href={PRICING}>if you install Studio or add companies to your database, you will automatically switch to the Custom plan</Src>.</li>
      </ul>
      <p>
        <strong>Prices depend on your country.</strong> Odoo shows a different price list by visitor location. As
        served to a Canadian visitor on October 5, 2026:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Plan (Canada, per user per month)</th><th>Billed yearly</th><th>Billed monthly</th></tr></thead>
          <tbody>
            <tr><td>Standard</td><td><Src href={PRICING_CA}>CAD 35.20, against a list price of CAD 44.00</Src></td><td><Src href={PRICING_CA}>CAD 44.00, against a list price of CAD 55.00</Src></td></tr>
            <tr><td>Custom</td><td><Src href={PRICING_CA}>CAD 57.90, against a list price of CAD 73.00</Src></td><td><Src href={PRICING_CA}>CAD 73.00, against a list price of CAD 91.90</Src></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The lower figure is an introductory price: <Src href={PRICING}>the discount is valid for 12 months, for initial users ordered</Src>,
        so budget the list price from year two. We could not confirm the US-dollar price list from a US connection,
        so check <Src href={PRICING}>Odoo&apos;s pricing page</Src> from your own location.
      </p>
      <p>
        Who counts as a user? <Src href={PRICING}>A paying user is someone who has access to the Odoo backend to create, view, or edit documents</Src>.
        Customers and suppliers using the portal <Src href={PRICING}>are not paying users</Src>.
      </p>

      <h3>The plan decision most buyers miss</h3>
      <p>
        Integrations decide the plan. Odoo&apos;s documentation states that{' '}
        <Src href={API}>access to data via the external API is only available on Custom Odoo pricing plans</Src>, and{' '}
        <Src href={API}>is not available on One App Free or Standard plans</Src>. If another system has to read from
        or write to Odoo, price the Custom plan for every user.
      </p>

      <h3>Community or Enterprise?</h3>
      <p>
        Odoo Community is open source: it is{' '}
        <Src href={LICENSES}>licensed under LGPL version 3</Src>, and Odoo calls it{' '}
        <Src href={EDITIONS}>the core upon which Odoo Enterprise is built</Src>. Enterprise{' '}
        <Src href={LICENSES}>can only be used with a valid Odoo Enterprise Subscription for the correct number of users</Src>.
        Community has no licence fee, but it lacks the Enterprise-only apps and Odoo&apos;s hosting, support and
        upgrade service, so its cost moves into hosting and engineering.
      </p>

      <h2>2. Hosting</h2>
      <ul>
        <li><strong>Odoo Online</strong> is included: <Src href={PRICING}>hosting on Odoo Online is free, with unmetered storage up to 100GB</Src>. The limit is that <Src href={ONLINE}>Odoo Online is incompatible with custom modules or modules from the Odoo Apps Store</Src>.</li>
        <li><strong>Odoo.sh</strong> is Odoo&apos;s platform for custom code, and <Src href={PRICING}>its cost is not included</Src> in the Custom plan. Its calculator, billed annually in US dollars, shows <Src href={SH}>$57.60 per worker per month, $0.20 per GB per month and $14.40 per staging environment per month</Src>, which makes the smallest configuration <Src href={SH}>$57.80 per month</Src>. That <Src href={SH}>does not include the enterprise licence</Src>, and you need dedicated hosting for <Src href={SH}>more than 16 workers</Src>.</li>
        <li><strong>On-premise</strong> means running Odoo Enterprise on servers you manage. It is offered on yearly billing only: <Src href={CONFIGURATOR}>the monthly plan is only available to cloud hosting options</Src>.</li>
      </ul>

      <h2>3. Implementation services</h2>
      <p>
        Odoo excludes implementation from its plans and sells it separately as Success Packs:{' '}
        <Src href={PACKS}>a package of premium services by a dedicated consultant</Src>, in blocks of hours. As served
        to a US visitor on August 9, 2026:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Pack</th><th>Hours</th><th>Returning customers</th><th>New customers (15% off)</th></tr></thead>
          <tbody>
            <tr><td>Starter</td><td>4</td><td>US$ 580</td><td>US$ 493</td></tr>
            <tr><td>Basic</td><td>25</td><td>US$ 3,600</td><td>US$ 3,060</td></tr>
            <tr><td>Standard</td><td>50</td><td>US$ 7,000</td><td>US$ 5,950</td></tr>
            <tr><td>Custom</td><td>100</td><td>US$ 12,500</td><td>US$ 10,625</td></tr>
            <tr><td>Pro</td><td>200</td><td>US$ 25,000</td><td>US$ 21,250</td></tr>
          </tbody>
        </table>
      </div>
      <p className="cp-muted">
        Source for the whole table: <Src href={PACKS_US}>Odoo&apos;s Success Packs page as captured for a US visitor on August 9, 2026</Src>.
        Pack prices also vary by country; check <Src href={PACKS}>the live page</Src>.
      </p>
      <p>Three conditions from Odoo&apos;s own pages affect what a pack is worth:</p>
      <ul>
        <li><Src href={PACKS}>A 15% discount applies automatically to new customers, for their first pack only</Src>.</li>
        <li>The hours <Src href={CONFIGURATOR}>expire after one year</Src>.</li>
        <li><Src href={PACKS}>Extra monthly charges apply for the maintenance of extra modules or lines of code</Src>, and custom <Src href={PACKS}>developments are charged per day of consulting</Src>, at a rate Odoo does not publish.</li>
      </ul>
      <p>
        Odoo also says that <Src href={PRICING}>mid-size and large companies (more than 50 employees) usually work with a partner</Src>.
        Partners and independent firms set their own rates. For a market reference, Clutch lists{' '}
        <Src href={CLUTCH_ERP}>ERP consulting at $25 to $49 per hour</Src> among the IT services companies on its
        platform (<Src href={CLUTCH_ERP}>updated September 21, 2026</Src>); that is ERP consulting in general, not
        Odoo specifically.
      </p>

      <h2>4. The cost of custom code over time</h2>
      <p>
        This is the part that is easy to leave out of a first-year budget. Upgrades are free with Enterprise:{' '}
        <Src href={UPGRADE}>upgrading a database to the most recent version of Odoo is free</Src>. Your custom code is
        a different matter:
      </p>
      <ul>
        <li>Odoo upgrades customizations only when they are <Src href={UPGRADE}>covered by a maintenance of customizations subscription</Src>. Modules <Src href={UPGRADE}>not covered by a maintenance contract, created in-house or by third parties</Src>, are excluded, so someone else has to port them.</li>
        <li>That maintenance is charged as <Src href={TERMS}>a monthly fee per 100 lines of code</Src>. The rate is agreed in writing with Odoo and is not published.</li>
        <li>Staying on an old version has a price: Odoo&apos;s agreement provides for <Src href={TERMS}>an extra fee equal to 25% of the annualized price</Src> for databases on versions it no longer covers.</li>
        <li>Each major version gets a limited window: <Src href={SUPPORT}>standard support covers the first three years after release</Src>, and <Src href={SUPPORT}>extended support requires an additional fee</Src>.</li>
        <li>Integrations age too. Odoo&apos;s older XML-RPC and JSON-RPC APIs are <Src href={RPC}>scheduled for removal in Odoo 22 (fall 2028)</Src>, so an integration built on them will need rework.</li>
      </ul>
      <p>
        The practical lesson is the one on our{' '}
        <Link href="/services/odoo-erp">Odoo service page</Link>: configure first, and add custom modules only where a
        real business need cannot be met otherwise, because every customization is code that has to be carried through
        each upgrade.
      </p>

      <h2>Putting it together</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Setup</th><th>Plan</th><th>Hosting</th><th>What else to budget</th></tr></thead>
          <tbody>
            <tr><td>Standard apps, no integrations</td><td>Standard</td><td>Odoo Online, included</td><td>Configuration, data import and training</td></tr>
            <tr><td>Standard apps plus an integration through the API</td><td>Custom</td><td>Odoo Online is possible if no custom module is installed</td><td>The integration itself, and its upkeep as APIs change</td></tr>
            <tr><td>Custom modules</td><td>Custom</td><td>Odoo.sh or on-premise</td><td>Development, hosting, and maintenance of the custom code through upgrades</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        As an example of the licence line alone, 20 users on the Standard plan at the Canadian yearly-billing price
        above come to CAD 8,448 for the first year (20 × 35.20 × 12) and CAD 10,560 a year at the list price. That is
        our arithmetic on Odoo&apos;s published figures; it excludes implementation, hosting beyond Odoo Online and
        any custom work.
      </p>

      <h2>Questions to answer before you budget</h2>
      <ol>
        <li>How many people need backend access? Portal users are free.</li>
        <li>Does any other system need to exchange data with Odoo? If so, price the Custom plan.</li>
        <li>Can your processes be met by configuration, or do they need custom modules?</li>
        <li>Who will implement it: Odoo, a partner, or your own team, and at what hourly or daily rate?</li>
        <li>Who will maintain custom code and integrations through each new Odoo version?</li>
      </ol>

      <GuideFaq slug={SLUG} items={[
        { question: 'How much does Odoo cost per user?', answer: ['It depends on your country and plan. As served to a Canadian visitor on October 5, 2026, the Standard plan was ', ['CAD 35.20 per user per month billed yearly, against a list price of CAD 44.00', PRICING_CA], ', and the Custom plan ', ['CAD 57.90, against a list price of CAD 73.00', PRICING_CA], '. Odoo says ', ['the discount is valid for 12 months, for initial users ordered', PRICING], '.'] },
        { question: 'Is Odoo free?', answer: ['Partly. Odoo Community is open source, ', ['licensed under LGPL version 3', LICENSES], ', and Odoo offers a One App Free plan. Odoo Enterprise ', ['can only be used with a valid Odoo Enterprise Subscription for the correct number of users', LICENSES], '.'] },
        { question: 'Do I need the Custom plan to integrate Odoo with other systems?', answer: ['Yes, if the other system calls Odoo. Odoo\'s documentation says ', ['access to data via the external API is only available on Custom Odoo pricing plans', API], ' and ', ['is not available on One App Free or Standard plans', API], '.'] },
        { question: 'What does Odoo.sh hosting cost?', answer: ['Odoo.sh is priced by resources. Billed annually in US dollars, its calculator shows ', ['$57.60 per worker per month, $0.20 per GB per month and $14.40 per staging environment per month', SH], ', and that ', ['does not include the enterprise licence', SH], '.'] },
        { question: 'Do custom Odoo modules cost more to maintain?', answer: ['Yes. Odoo upgrades customizations only when they are ', ['covered by a maintenance of customizations subscription', UPGRADE], ', which is charged as ', ['a monthly fee per 100 lines of code', TERMS], '. Custom modules that are not covered have to be ported by whoever maintains them.'] },
      ]} />

      <p className="cp-note">
        Odoo&apos;s plans, prices and terms were taken from the linked pages on October 9, 2026; the two price tables
        come from Internet Archive captures of Odoo&apos;s own pages on the dates shown, because Odoo prices by visitor
        country. Confirm current prices for your country with Odoo before you budget.
      </p>
    </GuideLayout>
  );
}
