import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'mls-idx-integration-cost';
export const metadata = guideMetadata(SLUG);

// Sources first checked 2026-09-29 and every figure re-checked against its page on 2026-10-09.
const IDXB = 'https://www.idxbroker.com/compare-idx';
const SHOWCASE = 'https://showcaseidx.com/pricing/';
const BUDDY = 'https://www.buyingbuddy.com/pricing.php';
const REALTYNA = 'https://realtyna.com/mls-on-the-fly/';
const IHF = 'https://www.ihomefinder.com/pricing/';
const STELLAR = 'https://www.stellarmls.com/data-delivery';
const ARMLS = 'https://armls.com/data-feeds-vendor-info';
const RECO = 'https://cdn.recolorado.com/files/data/Participant-Pricing-Schedule.pdf';
const MLSPIN = 'https://www.mlspin.com/resources/data-services';
const CREA = 'https://crea.vanillacommunity.com/discussion/73/ddf-r-technology-provider-pricing-tiers';
const TRESTLE = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const MLSGRID = 'https://www.mlsgrid.com/faq';
const SIMPLYRETS = 'https://simplyrets.com/';
const REPLIERS = 'https://repliers.com/plans-and-pricing/';
const NAR_790 = 'https://www.nar.realtor/handbook-on-multiple-listing-policy/operational-issues-section-12-real-estate-transaction-standards-rets-policy-statement-790';
const RESO = 'https://www.reso.org/reso-web-api/';
const ARMLS_RETS = 'https://armls.com/rets-to-api';
const CLUTCH = 'https://clutch.co/developers/pricing';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        MLS and IDX integration costs come from three places: the <strong>MLS</strong> (data license fees, which vary
        widely by board and by how you use the data), a <strong>data vendor or IDX provider</strong> if you use one
        (monthly subscriptions), and <strong>development</strong> if you build your own search, website or pipeline.
        An agent or small brokerage that only needs listings on its website can usually use an IDX plugin for a monthly
        subscription. A brokerage or proptech company that needs listing data inside its own product, from one or several
        MLS boards, pays MLS license fees, often a data vendor, and the cost of building and running the pipeline.
      </p>

      <h2>MLS and IDX cost at a glance</h2>
      <p>
        Published prices, grouped by how each cost is billed. Each figure links to the page it comes from and is
        explained in the sections below. To total the fees for your own setup, use the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link>.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Cost</th><th>Billed</th><th>Published examples</th></tr></thead>
          <tbody>
            <tr><td>IDX plugin or hosted IDX site</td><td>Per month</td><td>From <Src href={BUDDY}>$49 per month</Src> (Buying Buddy) to <Src href={IDXB}>$149 per month</Src> (IDX Broker Elite)</td></tr>
            <tr><td>RESO Web API data vendor</td><td>Per month, per feed or connection</td><td>MLS Grid: <Src href={MLSGRID}>no fee beyond your MLS&apos;s license fee</Src>. Trestle: <Src href={TRESTLE}>$30 per month for broker data feeds</Src>. Repliers: <Src href={REPLIERS}>$199 to $399 per month</Src></td></tr>
            <tr><td>MLS license, broker use</td><td>Per month or per office per year</td><td>MLS PIN: <Src href={MLSPIN}>$100 per month</Src>. Stellar MLS: <Src href={STELLAR}>$450 per office per year</Src></td></tr>
            <tr><td>MLS license, vendor product</td><td>Per product, per month or per year</td><td>MLS PIN: <Src href={MLSPIN}>$525 per month</Src>. Stellar MLS: <Src href={STELLAR}>$7,500 per product per year</Src>. ARMLS: <Src href={ARMLS}>$1,000 to $1,500 per product per month</Src></td></tr>
            <tr><td>Custom development</td><td>Per hour</td><td>Market rates reported by Clutch: <Src href={CLUTCH}>$25 to $49</Src> (India), <Src href={CLUTCH}>$50 to $99</Src> (United States), <Src href={CLUTCH}>$100 to $149</Src> (Canada)</td></tr>
          </tbody>
        </table>
      </div>

      <h2>First, which kind of data access do you need?</h2>
      <ul>
        <li><strong>IDX</strong> lets a broker display other brokers&apos; listings on a public website under the MLS&apos;s display rules. IDX vendors charge a subscription, and some MLSs add their own IDX fee (see the examples below).</li>
        <li><strong>VOW</strong> (virtual office website) is a registered-user site that can show more data under stricter rules, and it usually has its own fee.</li>
        <li><strong>Broker back-office</strong> feeds are for internal use such as CRMs, reporting and valuation.</li>
        <li><strong>Vendor or technology-provider</strong> licenses apply when a company sells a product built on MLS data to agents or brokers. These are typically the most expensive.</li>
      </ul>

      <h2>Option one: an IDX plugin or hosted IDX website</h2>
      <p>Published prices from IDX vendors&apos; own pricing pages:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Vendor</th><th>Published price</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>IDX Broker</td><td><Src href={IDXB}>$60, $99 or $149 per month</Src> (Core, Engage, Elite)</td><td>All plans include a one-time setup fee; the amount isn&apos;t published</td></tr>
            <tr><td>Showcase IDX</td><td><Src href={SHOWCASE}>From $94.95 or $124.95 per month</Src></td><td><Src href={SHOWCASE}>No setup fee; MLS pass-through fees typically $0 to $33 per month</Src></td></tr>
            <tr><td>Buying Buddy</td><td><Src href={BUDDY}>$49 or $77 per month</Src></td><td>No setup fee</td></tr>
            <tr><td>Realtyna MLS On The Fly</td><td><Src href={REALTYNA}>$99 per month for Tier 1 MLSs, plus $850 one-time setup</Src></td><td>Other tiers depend on the MLS</td></tr>
            <tr><td>iHomefinder</td><td><Src href={IHF}>Plan prices not published</Src></td><td><Src href={IHF}>Extra MLS $25 per month (one-agent plan) or $50 per month (two or more agents)</Src></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        This route suits agents and brokerages whose main need is listings on a website. The trade-off is limited
        control: search, design and lead handling work the way the vendor built them, and the data stays inside the
        vendor&apos;s product.
      </p>

      <h2>Option two: MLS data in your own product</h2>
      <h3>MLS data license fees</h3>
      <p>
        When the data goes into your own software, the MLS license is the first cost. There is no national price list:
        each board sets its own fees and rules. Some examples from published fee schedules:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>MLS</th><th>Use</th><th>Published fee</th></tr></thead>
          <tbody>
            <tr><td>Stellar MLS (Florida)</td><td>Broker back office; VOW</td><td><Src href={STELLAR}>$450 per office per year, capped at $7,500</Src> (each)</td></tr>
            <tr><td>Stellar MLS</td><td>Vendor product</td><td><Src href={STELLAR}>$7,500 per product per year, $2,500 for each additional product</Src></td></tr>
            <tr><td>ARMLS (Arizona)</td><td>Broker feeds</td><td><Src href={ARMLS}>Five free feeds per brokerage; additional feeds $150 per month each</Src></td></tr>
            <tr><td>ARMLS</td><td>Vendor product</td><td><Src href={ARMLS}>Typically $1,000 to $1,500 per product per month</Src></td></tr>
            <tr><td>REcolorado</td><td>IDX content</td><td><Src href={RECO}>$500 establishment fee, $150 per month</Src></td></tr>
            <tr><td>REcolorado</td><td>VOW or all content</td><td><Src href={RECO}>$1,500 establishment fee, $500 per month</Src></td></tr>
            <tr><td>MLS PIN (New England)</td><td>Broker</td><td><Src href={MLSPIN}>$100 per month</Src>, covering branch offices</td></tr>
            <tr><td>MLS PIN</td><td>Vendor</td><td><Src href={MLSPIN}>$525 per month</Src></td></tr>
            <tr><td>CREA DDF® (Canada)</td><td>New technology provider</td><td><Src href={CREA}>$1,500 onboarding fee</Src> (CAD), plus tiered feed fees</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The same data can cost very different amounts depending on who licenses it and why. A brokerage using its own
        back-office feed at Stellar pays per office, while a company selling a product to agents pays a vendor fee.
        Confirm the category with each MLS before you build, because it also sets the display and refresh rules. Our guide
        on <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access for your app</Link> walks through the
        licenses, broker sponsorship, agreements and approval steps.
      </p>

      <h3>RESO Web API data vendors</h3>
      <p>
        Many MLSs deliver data through a platform or aggregator rather than directly. These add their own fees on top of
        the MLS license, or none at all:
      </p>
      <ul>
        <li><strong>Trestle (Cotality):</strong> <Src href={TRESTLE}>$30 per month for broker data feeds and $100 per month for other feeds</Src>. Technology providers pay <Src href={TRESTLE}>$100 to $175 per connection per month</Src> depending on volume, plus the MLS&apos;s own fees.</li>
        <li><strong>MLS Grid:</strong> <Src href={MLSGRID}>states that you only pay the license fee your MLS requires</Src>.</li>
        <li><strong>SimplyRETS:</strong> <Src href={SIMPLYRETS}>$49, $99 or $199 per month, plus a one-time $99 connection fee per feed</Src>.</li>
        <li><strong>Repliers:</strong> <Src href={REPLIERS}>free Preview plan, then $199, $299 or $399 per month</Src> for one MLS.</li>
      </ul>

      <h3>What does MLS Grid charge?</h3>
      <p>
        MLS Grid does not publish a price list of its own. Its FAQ says{' '}
        <Src href={MLSGRID}>you only pay the license fee required by your MLS, which MLS Grid collects on the MLS&apos;s behalf</Src>.
        So the cost of data through MLS Grid is whatever your MLS charges for your license type, under one license
        agreement and one feed for all participating MLSs you belong to. Ask your MLS for its fee schedule rather than
        looking for an MLS Grid price.
      </p>

      <h3>Is MLS or IDX data priced per user?</h3>
      <p>
        Not in any of the fee schedules cited here. The published fees are billed per month, per office, per product,
        or per feed or connection, not per user or per agent. The closest to per-agent pricing in this guide is
        iHomefinder&apos;s extra-MLS fee, which is{' '}
        <Src href={IHF}>$25 per month on the one-agent plan or $50 per month for two or more agents</Src>. If a vendor
        quotes you a per-user price, that is the vendor&apos;s own software licensing, separate from what the MLS charges
        for data.
      </p>

      <h3>RETS is being retired</h3>
      <p>
        If you are quoted a RETS integration, ask about the RESO Web API instead. <Src href={NAR_790}>NAR MLS Policy Statement 7.90</Src> required
        REALTOR® association MLSs to implement the{' '}
        <Src href={NAR_790}>RESO Web API by June 30, 2016</Src>. RESO describes RETS as{' '}
        <Src href={RESO}>deprecated and no longer supported</Src>, and boards have been switching it off. ARMLS, for
        example, <Src href={ARMLS_RETS}>shut down RETS on December 15, 2023</Src>. New work should use the Web API.
      </p>

      <h2>Development cost</h2>
      <p>
        Building your own search, website or data pipeline adds engineering time, and that is usually the largest cost.
        There is no reliable fixed price for &ldquo;an MLS integration&rdquo;, because the work depends on:
      </p>
      <ul>
        <li><strong>The number of MLS boards.</strong> Each has its own fields, status values and rules. Combining several means normalizing schemas and deduplicating properties listed on more than one board.</li>
        <li><strong>Freshness.</strong> Incremental sync with retries and error isolation costs more to build than a nightly import, and is usually required.</li>
        <li><strong>Search.</strong> Map search, auto-suggest and fast filtering across large datasets need a search index and caching, not just database queries.</li>
        <li><strong>What sits on top.</strong> IDX pages, a CRM, valuation or AI search each add their own scope.</li>
      </ul>
      <p>
        For a sense of market labor rates, Clutch reports that software development companies listed in India typically
        charge <Src href={CLUTCH}>$25 to $49 per hour</Src>, those in the United States{' '}
        <Src href={CLUTCH}>$50 to $99</Src>, and those in Canada <Src href={CLUTCH}>$100 to $149</Src> (<Src href={CLUTCH}>Clutch, updated September 21, 2026</Src>). Our guide to{' '}
        <Link href="/blog/cost-to-build-a-real-estate-platform">what it costs to build a real estate platform</Link>{' '}
        covers labor and infrastructure costs in more detail.
      </p>
      {/* TODO(owner): add Peregrine's own rate or typical MLS integration price here once supplied, labelled as Peregrine's rate. */}

      <h2>How the pieces fit together: an example</h2>
      <p>
        Our <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> describes a brokerage that
        needed listings from four MLS systems (NTREIS, Stellar MLS, ARMLS and REcolorado) in one platform. That meant four
        MLS feeds, one pipeline to normalize and deduplicate the feeds, and a search layer on top, before
        any of the AI features were built. Our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> shows the same
        pattern for agent IDX websites across US and Canadian boards.
      </p>

      <h2>Checklist before you budget</h2>
      <ol>
        <li>List every MLS board you need and ask each for its data license categories and fees.</li>
        <li>Decide whether the data is for IDX display, internal broker use, or a product you sell. The fee category depends on it.</li>
        <li>Ask whether each board delivers through the RESO Web API directly or through a vendor such as Trestle or MLS Grid, and what that vendor charges.</li>
        <li>Check each board&apos;s display, attribution and refresh rules, since they affect the design.</li>
        <li>Price development against the number of boards, the required freshness and the search features, not against &ldquo;one integration&rdquo;.</li>
      </ol>
      <GuideFaq slug={SLUG} items={[
  { question: 'How much does IDX cost per month?', answer: ['Published IDX plugin plans run from ', ['$49 per month', BUDDY], ' at Buying Buddy to ', ['$149 per month', IDXB], ' for IDX Broker\'s top plan. Some vendors add a one-time setup fee, and Showcase IDX notes ', ['MLS pass-through fees of typically $0 to $33 per month', SHOWCASE], '.'] },
  { question: 'How much does IDX cost per year?', answer: ['IDX plugins are billed monthly, so the yearly cost is twelve times the plan price: about $588 a year at ', ['$49 per month', BUDDY], ' and $1,788 a year at ', ['$149 per month', IDXB], ', before any setup or MLS pass-through fees. Those yearly figures are our arithmetic on the published monthly prices.'] },
  { question: 'What does MLS Grid charge?', answer: ['MLS Grid does not publish its own price list. Its FAQ says ', ['you only pay the license fee required by your MLS', MLSGRID], ', which MLS Grid collects on the MLS\'s behalf, so the cost is your MLS\'s fee for your license type.'] },
  { question: 'Is MLS data priced per user?', answer: ['Not in the fee schedules cited in this guide. They are billed per month, per office, per product, or per feed or connection. For example, Stellar MLS charges ', ['$450 per office per year', STELLAR], ' for broker back-office use, and Trestle charges ', ['$100 to $175 per connection per month', TRESTLE], ' for technology providers.'] },
  { question: 'What does an IDX plugin cost?', answer: ['Published plans include IDX Broker at ', ['$60, $99 or $149 per month', IDXB], ', Showcase IDX ', ['from $94.95 or $124.95 per month', SHOWCASE], ' and Buying Buddy at ', ['$49 or $77 per month', BUDDY], '. Some vendors also charge a one-time setup fee or pass MLS fees through.'] },
  { question: 'How much do MLSs charge for data feeds?', answer: ['It depends on the MLS and on how the data is used. Stellar MLS charges ', ['$450 per office per year for broker back-office use, capped at $7,500', STELLAR], ' and ', ['$7,500 per product per year for a vendor product', STELLAR], ', while ARMLS gives each brokerage ', ['five free feeds, with additional feeds at $150 per month each', ARMLS], '.'] },
  { question: 'Do RESO Web API data vendors add their own fees?', answer: ['Some do. Trestle charges ', ['$30 per month for broker data feeds and $100 per month for other feeds', TRESTLE], ' on top of MLS fees, while MLS Grid ', ['states that you only pay the license fee your MLS requires', MLSGRID], '.'] },
  { question: 'Should a new integration use RETS or the RESO Web API?', answer: ['The RESO Web API. RESO describes RETS as ', ['deprecated and no longer supported', RESO], ', and NAR policy required REALTOR® association MLSs to implement the ', ['RESO Web API by June 30, 2016', NAR_790], '.'] },
  { question: 'What does custom MLS integration development cost?', answer: ['There is no fixed price: it depends on the number of MLS boards, how current the data must be and the search features on top. For market labor rates, Clutch reports that software development companies in India typically charge ', ['$25 to $49 per hour', CLUTCH], ' and those in the United States ', ['$50 to $99 per hour', CLUTCH], '.'] },
]} />

      <p className="cp-note">
        Prices were taken from the vendors&apos; and MLSs&apos; public pages on September 29, 2026 and re-checked on
        October 9, 2026. Fees change, and many
        MLSs publish different rates for brokers and vendors, so confirm current pricing with each provider.
      </p>
      <p>
        Planning an MLS or IDX project? See our <Link href="/services/mls-idx-integration">MLS &amp; IDX integration
        service</Link> or <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
