import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'idx-vendor-vs-custom-build';
export const metadata = guideMetadata(SLUG);

// Every third-party figure below is also cited in /blog/mls-idx-integration-cost and was
// re-checked against its source page on 2026-10-09. This guide is about the decision;
// the full fee tables stay in the cost guide.
const IDXB = 'https://www.idxbroker.com/compare-idx';
const BUDDY = 'https://www.buyingbuddy.com/pricing.php';
const REALTYNA = 'https://realtyna.com/mls-on-the-fly/';
const STELLAR = 'https://www.stellarmls.com/data-delivery';
const ARMLS = 'https://armls.com/data-feeds-vendor-info';
const MLSPIN = 'https://www.mlspin.com/resources/data-services';
const TRESTLE = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const MLSGRID = 'https://www.mlsgrid.com/faq';
const SIMPLYRETS = 'https://simplyrets.com/';
const REPLIERS = 'https://repliers.com/plans-and-pricing/';
const CLUTCH = 'https://clutch.co/developers/pricing';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Stay with an IDX vendor for as long as &ldquo;listings on our website&rdquo; describes what you need. Move to
        a custom build when listing data has to live inside software you control: when you combine several MLSs your
        own way, when the website is itself the product you sell to agents, or when search, CRM and other features
        have to work on the same data. There is also a middle path, a RESO Web API data vendor feeding your own
        front end, that many teams should try before building a full pipeline.
      </p>

      <h2>Three ways to get listings into your site</h2>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th></th><th>IDX plugin or hosted IDX</th><th>Data vendor API + your front end</th><th>Direct MLS feeds + your pipeline</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>What you run</strong></td>
              <td>The vendor&apos;s search and listing pages on your site</td>
              <td>Your own website or app, reading listings from the vendor&apos;s API</td>
              <td>Your own ingestion, database, search index and front end</td>
            </tr>
            <tr>
              <td><strong>Published cost examples</strong></td>
              <td><Src href={BUDDY}>$49 per month</Src> (Buying Buddy) to <Src href={IDXB}>$149 per month</Src> (IDX Broker Elite); Realtyna <Src href={REALTYNA}>$99 per month plus $850 one-time setup</Src></td>
              <td>SimplyRETS <Src href={SIMPLYRETS}>$49, $99 or $199 per month plus a one-time $99 connection fee</Src>; Repliers <Src href={REPLIERS}>$199, $299 or $399 per month</Src> for one MLS; plus development</td>
              <td>MLS license fees, for example MLS PIN <Src href={MLSPIN}>$100 per month for a broker, $525 per month for a vendor</Src>; a delivery platform where the MLS uses one; plus development and operations</td>
            </tr>
            <tr>
              <td><strong>Where the data lives</strong></td>
              <td>In the vendor&apos;s product</td>
              <td>With the vendor; your app queries it</td>
              <td>In your own systems, under your MLS license terms</td>
            </tr>
            <tr>
              <td><strong>Control of search and design</strong></td>
              <td>What the vendor offers</td>
              <td>Full control of the front end; data model is the vendor&apos;s</td>
              <td>Full control of both</td>
            </tr>
            <tr>
              <td><strong>Engineering needed</strong></td>
              <td>Little or none</td>
              <td>A front-end build</td>
              <td>A data pipeline, search and a front end, then ongoing upkeep</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The full fee tables, with every vendor and MLS we could find a published price for, are in our{' '}
        <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>, and the{' '}
        <Link href="/tools/mls-idx-cost-calculator">cost calculator</Link> adds them up for a specific setup.
      </p>

      <h2>Signs an IDX vendor is still the right choice</h2>
      <ul>
        <li><strong>You are one agent or a small brokerage</strong> and the goal is listings and lead capture on your website.</li>
        <li><strong>You have no developers and do not want any.</strong> A plugin is a subscription; a custom build is software you own and have to keep running.</li>
        <li><strong>You work in one MLS</strong> and its listings, shown the way the vendor shows them, are enough.</li>
        <li><strong>The monthly fee is small next to what the site earns.</strong> At the published prices above, a plugin costs less in a year than a few days of development at the{' '}
          <Src href={CLUTCH}>$50 to $99 per hour</Src> Clutch reports for software companies in the United States.</li>
      </ul>

      <h2>Signs it is time to build</h2>
      <h3>The website is the product</h3>
      <p>
        If you provide websites to many agents, each with their own branding, you are running a platform, not a
        website. Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link>{' '}
        is that situation: white-label IDX websites for individual agents across US and Canadian boards, which grew
        from 5 agents to 200+ after the data layer was rebuilt.
      </p>
      <h3>You need several MLSs as one dataset</h3>
      <p>
        Each board has its own fields and status values, and a property can be listed on more than one. Combining them
        means normalizing schemas and removing duplicates yourself. Our{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> covers a brokerage that needed
        four MLS systems (NTREIS, Stellar MLS, ARMLS and REcolorado) in one pipeline.
      </p>
      <h3>Other features have to work on the listing data</h3>
      <p>
        A CRM that knows which listings a lead viewed, valuation models, or search in plain language all need the data
        inside your own systems. In the W3|re project, conversational search and an automated valuation model were
        built on top of the unified pipeline, after it existed.
      </p>
      <h3>Search has to be faster or different</h3>
      <p>
        Map search, auto-suggest and filtering over millions of listings need a search index and a cache that you tune
        for your users. The real estate SaaS case study reports 2M+ listings with search responses under 200 ms after
        the rebuild.
      </p>

      <h2>What changes in cost when you build</h2>
      <p>Moving off a plugin replaces one subscription with three kinds of cost:</p>
      <ul>
        <li><strong>MLS license fees, in a different category.</strong> A company that sells a product built on MLS data to agents is licensed as a vendor, and vendor fees are higher than broker fees. Stellar MLS charges <Src href={STELLAR}>$450 per office per year, capped at $7,500</Src> for a broker back-office feed and <Src href={STELLAR}>$7,500 per product per year</Src> for a vendor product; ARMLS gives brokerages <Src href={ARMLS}>five free feeds</Src> and says vendor products are <Src href={ARMLS}>typically $1,000 to $1,500 per product per month</Src>.</li>
        <li><strong>A delivery platform, if your MLS uses one.</strong> Trestle charges <Src href={TRESTLE}>$30 per month for broker data feeds and $100 per month for other feeds</Src>; MLS Grid says <Src href={MLSGRID}>you only pay the license fee required by your MLS</Src>.</li>
        <li><strong>Development and upkeep.</strong> This is usually the largest part and it does not end at launch: feeds change, boards retire old interfaces, and sync jobs need monitoring. We do not publish a price for it, because it depends on how many boards you combine, how fresh the data must be and what you build on top.</li>
      </ul>
      <p>
        Before any of that, you need the data license itself. Our guide on{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access for your app</Link> covers license
        types, broker sponsorship and the approval steps.
      </p>

      <h2>The middle path</h2>
      <p>
        A data vendor API lets you build your own front end without running an ingestion pipeline. It suits a
        brokerage that wants its own design and search experience in one or two markets. Its limits are the
        vendor&apos;s: which MLSs it covers, how it models the data, and its pricing per MLS or connection. If you
        later need several boards merged your own way, or data inside a CRM or valuation model, you are back to
        deciding whether to build the pipeline.
      </p>

      <h2>Questions to answer before you decide</h2>
      <ol>
        <li>Is the listing search a feature of your website, or is the website a product you sell?</li>
        <li>How many MLSs do you need now, and in two years?</li>
        <li>Which license category would each MLS put you in, and what does it charge for that category?</li>
        <li>Which features need listing data in your own database: CRM, alerts, valuation, analytics?</li>
        <li>Who will keep the feeds running after launch?</li>
      </ol>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is an IDX plugin cheaper than a custom IDX build?', answer: ['Yes, by a wide margin, for a single site. Published plugin plans run from ', ['$49 per month', BUDDY], ' to ', ['$149 per month', IDXB], ', while a custom build adds MLS license fees, sometimes a data vendor, and development. A custom build is a decision about control and capability, not about saving money.'] },
        { question: 'When should a brokerage switch from an IDX vendor to a custom build?', answer: ['When the listing data has to live in software the brokerage controls: several MLSs merged into one dataset, branded sites for many agents from one platform, or features such as a CRM or valuation that work on the same data. If listings on a website is the whole requirement, stay with the vendor.'] },
        { question: 'Is there an option between an IDX plugin and a full custom pipeline?', answer: ['Yes: a RESO Web API data vendor feeding your own front end. For example, SimplyRETS publishes plans at ', ['$49, $99 or $199 per month plus a one-time $99 connection fee', SIMPLYRETS], ' and Repliers at ', ['$199, $299 or $399 per month', REPLIERS], ' for one MLS. You build the website; the vendor supplies the data.'] },
        { question: 'Do MLS fees change if we build our own product?', answer: ['They can. MLSs license the same data in different categories, and a product sold to agents is usually a vendor product. Stellar MLS, for example, charges ', ['$450 per office per year, capped at $7,500', STELLAR], ' for a broker back-office feed and ', ['$7,500 per product per year', STELLAR], ' for a vendor product.'] },
        { question: 'What ongoing work does a custom IDX build need?', answer: ['Feeds have to be monitored and kept in sync, schemas change, boards retire old interfaces, and search has to be tuned as listing volume grows. Plan for a team, in-house or contracted, that keeps the pipeline running after launch.'] },
      ]} />

      <p className="cp-note">
        Prices were taken from the vendors&apos; and MLSs&apos; public pages and re-checked on October 9, 2026. Fees
        change, so confirm current pricing with each provider.
      </p>
    </GuideLayout>
  );
}
