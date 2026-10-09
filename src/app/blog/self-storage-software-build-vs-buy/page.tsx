import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'self-storage-software-build-vs-buy';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-10-09. Product statements are quoted or summarized from each
// vendor's own pages on that date; we have not used or evaluated these products.
const EDGE = 'https://www.storable.com/products/edge/';
const STORABLE_ACCESS = 'https://www.storable.com/products/access-control/';
const SITELINK = 'https://www.storable.com/products/sitelink/';
const EASY_FAQ = 'https://www.storageunitsoftware.com/faq/';
const EASY = 'https://www.storageunitsoftware.com/';
const YARDI = 'https://www.yardibreeze.com/self-storage-features/';
const HUMMINGBIRD = 'https://www.tenantinc.com/products/hummingbird';
const NECTAR = 'https://www.tenantinc.com/products/nectar-gds';
const TENANT_FAQ = 'https://www.tenantinc.com/frequently-asked-questions';
const SIX = 'https://www.6storage.com/self-storage-management-software/';
const SIX_PARTNERS = 'https://www.6storage.com/partners-integrations/';
const STOREGANISE_PRICING = 'https://storeganise.com/pricing';
const STOREGANISE = 'https://storeganise.com/features';
const STORA_PRICING = 'https://stora.co/pricing';
const STORA_API = 'https://stora.co/features/api';
const SC = 'https://www.storagecommander.com/pricing';
const UNITTRAC = 'https://www.unittrac.com/pricing';
const NOKE_FAQ = 'https://www.janusintl.com/products/noke/noke-faqs';
const OPENTECH = 'https://opentechalliance.com/solutions/insomniac-cia-access-control/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Buy first. Off-the-shelf self-storage management software already covers online rentals, automated billing and
        gate integration, and several products now publish an open API. Build your own platform only when you have
        a specific limit the products cannot remove: systems that will not integrate across the facilities you have
        acquired, portfolio reporting you cannot get, or a business that sells the software itself. Before a full
        build, check whether extending a product through its API solves the problem.
      </p>

      <h2>What off-the-shelf products list</h2>
      <p>
        This is what each vendor&apos;s own site says as of October 9, 2026. We have not evaluated these products, and
        the list is not a ranking.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Product</th><th>Published price</th><th>What its site lists</th></tr></thead>
          <tbody>
            <tr>
              <td>Storable Edge</td>
              <td><Src href={EDGE}>None published; demo request</Src></td>
              <td>With Storable Access Control, <Src href={STORABLE_ACCESS}>automatic lockout of tenants who miss payments</Src></td>
            </tr>
            <tr>
              <td>SiteLink (Storable)</td>
              <td><Src href={SITELINK}>No figure; billed monthly with a monthly commitment</Src></td>
              <td><Src href={SITELINK}>A third-party marketplace it describes as the largest in the industry</Src></td>
            </tr>
            <tr>
              <td>Storable Easy</td>
              <td><Src href={EASY_FAQ}>Varies with the number of facilities and units</Src></td>
              <td><Src href={EASY_FAQ}>Integrations with access control systems, QuickBooks and payment processors</Src>; aimed at operators <Src href={EASY}>running a single facility or five</Src></td>
            </tr>
            <tr>
              <td>Yardi Breeze Premier</td>
              <td><Src href={YARDI}>On request for self storage</Src></td>
              <td><Src href={YARDI}>Online reservations and leases, autopay, portfolio performance comparison</Src></td>
            </tr>
            <tr>
              <td>Tenant Inc. (Hummingbird)</td>
              <td><Src href={HUMMINGBIRD}>None published; demo request</Src></td>
              <td><Src href={NECTAR}>An open API with a developer portal and 40+ pre-built integrations</Src>; access integrations including <Src href={TENANT_FAQ}>Noke, SpiderDoor, Doorking and PTI Security Systems</Src></td>
            </tr>
            <tr>
              <td>6Storage</td>
              <td><Src href={SIX}>No fixed pricing listed</Src></td>
              <td><Src href={SIX_PARTNERS}>Payments through Stripe or Fortis Pay, access-control partners, and an open API</Src></td>
            </tr>
            <tr>
              <td>Storeganise</td>
              <td><Src href={STOREGANISE_PRICING}>A calculator by locations and units; exact price by quote</Src></td>
              <td><Src href={STOREGANISE_PRICING}>An open API in every subscription</Src>; <Src href={STOREGANISE}>payments with Stripe, Fortis or Mollie; access through PTI, Nokē or OpenTech</Src></td>
            </tr>
            <tr>
              <td>Stora</td>
              <td><Src href={STORA_PRICING}>Published by unit count, starting at 50 units</Src></td>
              <td><Src href={STORA_API}>A public API on its Advanced and Premium plans</Src></td>
            </tr>
            <tr>
              <td>Storage Commander</td>
              <td><Src href={SC}>Three packages, no figures; pricing on request</Src></td>
              <td><Src href={SC}>Online rental, reservation and payment; cloud-based gate integration</Src></td>
            </tr>
            <tr>
              <td>Unit Trac</td>
              <td><Src href={UNITTRAC}>Published on its pricing page, with a minimum of $30.00 per month</Src></td>
              <td><Src href={UNITTRAC}>API access among its included features</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two things stand out. Most vendors do not publish a price, so expect to request quotes. And access control,
        which used to be the hard part, is widely integrated: Nokē says its system{' '}
        <Src href={NOKE_FAQ}>integrates with all major property management software providers</Src> and that{' '}
        <Src href={NOKE_FAQ}>new integrations typically take 4-6 weeks</Src>, and OpenTech says its platform{' '}
        <Src href={OPENTECH}>includes an open API so any property management software can integrate</Src>.
      </p>

      <h2>Where multi-site operators hit limits</h2>
      <p>
        The limits are usually not missing features. They come from how a portfolio was assembled. In our{' '}
        <Link href="/case-studies/self-storage-management-platform">self-storage case study</Link>, an operator with
        150+ facilities across 12 states had:
      </p>
      <ul>
        <li><strong>Different access hardware at different facilities:</strong> keypads at some, Bluetooth locks at others, physical keys at a few, and no central way to grant, revoke or audit access.</li>
        <li><strong>Three separate vendors</strong> for reservations, billing and access control, with no API integration between them, synchronized by nightly CSV exports.</li>
        <li><strong>Billing spread across systems,</strong> so failed autopay went unnoticed for days.</li>
        <li><strong>Occupancy reported weekly</strong> from manual reports, so corporate could not see underperforming facilities in time to act.</li>
      </ul>
      <p>
        A single modern product can remove several of these. The question is whether it removes all of them for your
        mix of facilities, hardware and reporting needs.
      </p>

      <h2>Three options, not two</h2>
      <h3>1. Standardize on one product</h3>
      <p>
        If one product supports the lock hardware you have, or you are willing to replace hardware, moving every
        facility onto it is the least engineering. Ask each vendor which access systems it integrates with for your
        specific hardware, since integration lists differ.
      </p>
      <h3>2. Keep the product and build on its API</h3>
      <p>
        Several products in the table publish an API. That allows a custom layer for the parts you need to own, such
        as portfolio dashboards, a tenant app or pricing rules, while the product keeps handling rentals and billing.
        Check plan limits first: Stora, for example, offers its API{' '}
        <Src href={STORA_API}>to customers on Advanced, Premium and legacy higher level plans</Src>.
      </p>
      <h3>3. Build the platform</h3>
      <p>
        A full build makes sense when the platform is your product, or when no product fits the way your portfolio
        runs. The case study above took this route: one platform for units, tenants, billing and smart locks, with an
        abstraction layer that put three lock vendors behind one API, Stripe billing with automatic retries, and live
        occupancy and revenue dashboards. It ran for 10 months in four phases, with 10 pilot sites before the full
        rollout, and the case study reports 99.7% billing accuracy and an 82% reduction in revenue leakage.
      </p>
      <p>
        That is one project, not a typical cost or timeline. A build also means owning the software afterwards:
        hardware vendors change their protocols, payment rules change, and someone has to keep the platform running.
      </p>

      <h2>Questions to answer before you decide</h2>
      <ol>
        <li>Which lock and gate hardware is installed at each facility, and which products integrate with all of it?</li>
        <li>What do you need to see across the portfolio that your current software cannot show?</li>
        <li>Does the product you use, or one you would switch to, have an API, and on which plan?</li>
        <li>Is the software a cost of running facilities, or something you intend to sell to other operators?</li>
        <li>Who will maintain a custom platform after launch?</li>
      </ol>
      <p>
        Our <Link href="/industries/self-storage">self-storage software</Link> page describes what we build, and the
        case study covers the architecture in detail.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should a self-storage operator build custom software or buy it?', answer: ['Buy first. Off-the-shelf products cover online rentals, billing and gate integration, and several publish an API. Build only when a specific limit remains, such as systems that will not integrate across acquired facilities, or when the software is the product you sell.'] },
        { question: 'How much does self-storage management software cost?', answer: ['Most vendors do not publish a price. Storable Easy says its price ', ['varies based on how many facilities and units you have', EASY_FAQ], ', 6Storage says it does ', ['not list fixed pricing', SIX], ', and Unit Trac publishes its pricing, with ', ['a minimum of $30.00 per month', UNITTRAC], '.'] },
        { question: 'Do self-storage software products have an API?', answer: ['Several say so. Storeganise includes ', ['an open API in every subscription', STOREGANISE_PRICING], ', Tenant Inc. lists ', ['an open API with a developer portal', NECTAR], ', and Stora offers its API ', ['on Advanced and Premium plans', STORA_API], '.'] },
        { question: 'Can smart locks from different vendors work with one management system?', answer: ['Often, yes. Nokē says its system ', ['integrates with all major property management software providers', NOKE_FAQ], ', and OpenTech says its platform ', ['includes an open API so any property management software can integrate', OPENTECH], '. Confirm the exact hardware at each of your facilities with the software vendor.'] },
        { question: 'How long does it take to build a custom self-storage platform?', answer: ['It depends on the number of facilities, the lock hardware and what has to be migrated. The platform in our case study took 10 months in four phases, with 10 pilot sites before a 150+ facility rollout. That is one project, not a typical timeline.'] },
      ]} />

      <p className="cp-note">
        Product features, plan limits and prices were taken from each vendor&apos;s public pages on October 9, 2026 and
        change often. Confirm them with the vendor before you decide.
      </p>
      {/* TODO(owner): add a disclosure line here if Peregrine has a partnership or referral arrangement with any vendor named above. */}
    </GuideLayout>
  );
}
