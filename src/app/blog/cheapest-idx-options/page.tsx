import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import GuideFigure from '../../components/GuideFigure';

const SLUG = 'cheapest-idx-options';
export const metadata = guideMetadata(SLUG);

// Every figure below was read on its source page on 2026-10-12.
// Log: docs/growth/content/SOURCES-cheapest-idx-options.md
const BUDDY = 'https://www.buyingbuddy.com/pricing.php';
const BUDDY_LIST = 'https://www.buyingbuddy.com/price-list.php';
const MLSIMPORT = 'https://mlsimport.com/mls-import-plugin-pricing/';
const MLSIMPORT_REQ = 'https://mlsimport.com/requirements-before-you-buy/';
const FBS = 'https://fbsproducts.com/pricing/';
const WOVAX = 'https://wovax.com/pricing/';
const PLACESTER = 'https://placester.com/pricing';
const IDXB = 'https://www.idxbroker.com/compare-idx';
const MRP = 'https://myrealpage.com/real-estate-website-pricing/';
const SHOWCASE = 'https://showcaseidx.com/pricing/';
const REALTYNA = 'https://realtyna.com/mls-on-the-fly/';
const REALTYNA_TIERS = 'https://realtyna.com/mls-providers/';
const IHF = 'https://www.ihomefinder.com/platform-pricing/';
const CRMLS = 'https://go.crmls.org/idx-resources/';
const MIAMI = 'https://www.miamirealtors.com/mls/webapi/';
const WPCOM = 'https://wordpress.com/pricing/';
const PORKBUN = 'https://porkbun.com/tld/com';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        The least you can pay for working IDX depends on your MLS. Some MLSs give members a framed search link at no
        extra charge: CRMLS, for example, says its frameable IDX links are{' '}
        <Src href={CRMLS}>available to all CRMLS users at no additional cost</Src>. If your MLS has no such link, or
        you want listings that look like part of your own site, the lowest published vendor price we found on October
        12, 2026 is <Src href={BUDDY}>$49 per month</Src>, which is $588 over twelve months. Three vendors publish
        that figure, and they are not equivalent: one has no setup fee and no contract, one needs you to obtain your
        own MLS API credentials, and one adds a setup fee it does not publish.
      </p>
      <p>
        For a solo agent or a small brokerage that wants listings and lead capture on a website, one of these low-cost
        plans is usually the right answer. Custom development is not, and the last section of this guide says when
        that changes.
      </p>

      <GuideFigure

        slug="cheapest-idx-options"

        alt="Bar chart of the lowest published monthly IDX plan from nine vendors: Buying Buddy, MLSImport and Flexmls IDX at $49; Wovax and Placester at $59; IDX Broker at $60; myRealPage at $69.99; Showcase IDX at $94.95; Realtyna at $99."

        caption="Lowest published monthly plan per vendor, as published on October 12, 2026. The table below has setup fees, MLS fees and what each plan leaves out."

      />


      <h2>The lowest published plan from each IDX vendor</h2>
      <p>
        The table lists only vendors whose own pricing page showed a dollar price for the plan on October 12, 2026,
        sorted by monthly price. &ldquo;Not stated&rdquo; means the pricing page does not say, not that the answer is
        zero. Yearly figures in later sections are our arithmetic on these prices.
      </p>
      {/* TODO(owner): vendor disclosure */}
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr>
              <th>Vendor and lowest plan</th>
              <th>Published price</th>
              <th>Setup fee</th>
              <th>MLS fees</th>
              <th>Limits of the lowest plan</th>
              <th>Contract terms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Buying Buddy</strong>, Agent</td>
              <td><Src href={BUDDY}>$49 per month</Src>; <Src href={BUDDY}>$29 per month for 12 months</Src> for agents licensed in the last 12 months</td>
              <td><Src href={BUDDY}>No setup fee</Src></td>
              <td>For extra feeds, <Src href={BUDDY_LIST}>MLS passthrough fees may apply</Src></td>
              <td><Src href={BUDDY}>1 user, 1 MLS feed on 1 website</Src>. Extra feeds are <Src href={BUDDY_LIST}>$25 per feed per month</Src>, extra domains <Src href={BUDDY_LIST}>$15 per domain per month</Src></td>
              <td><Src href={BUDDY}>No contract; upgrade or cancel at any time</Src></td>
            </tr>
            <tr>
              <td><strong>MLSImport</strong>, Single MLS</td>
              <td><Src href={MLSIMPORT}>$49 per month</Src>; yearly billing <Src href={MLSIMPORT}>saves 15%</Src></td>
              <td><Src href={MLSIMPORT}>No setup fee</Src></td>
              <td><Src href={MLSIMPORT_REQ}>Anything your MLS or its data platform charges for API access is separate</Src></td>
              <td>WordPress only. <Src href={MLSIMPORT}>Imports from 1 MLS board</Src>, and you need <Src href={MLSIMPORT_REQ}>your own RESO Web API credentials</Src> from the MLS</td>
              <td><Src href={MLSIMPORT}>Month to month, 30-day free trial, cancel anytime</Src></td>
            </tr>
            <tr>
              <td><strong>Flexmls IDX</strong> (FBS), SmartFrame</td>
              <td><Src href={FBS}>$49 per month</Src> for agents; the WordPress plugin is <Src href={FBS}>$59 per month</Src></td>
              <td><Src href={FBS}>A one-time setup fee applies</Src>; amount not published</td>
              <td>Not stated</td>
              <td>The $49 product is a framed search that FBS says fits <Src href={FBS}>any website, including Wix, Weebly and Squarespace</Src>. Broker and team packages are priced separately</td>
              <td>Term not stated; <Src href={FBS}>30-day money-back guarantee</Src>, multi-year discounts on request</td>
            </tr>
            <tr>
              <td><strong>Wovax</strong>, Wovax IDX</td>
              <td><Src href={WOVAX}>$59 per month, or $590 per year</Src></td>
              <td>Not stated for the plugin</td>
              <td>Not stated</td>
              <td>WordPress only. Priced <Src href={WOVAX}>per IDX feed, per website</Src>. The Wovax CRM is listed as <Src href={WOVAX}>coming soon</Src></td>
              <td><Src href={WOVAX}>Cancel anytime in the account dashboard</Src></td>
            </tr>
            <tr>
              <td><strong>Placester</strong>, Agent Essential (hosted website)</td>
              <td><Src href={PLACESTER}>$59 per month, or $566 billed annually</Src></td>
              <td>Not stated; setup services are sold separately</td>
              <td>The plan lists <Src href={PLACESTER}>single MLS integration with an additional charge of $25 per month</Src></td>
              <td><Src href={PLACESTER}>25 pages and posts</Src>, 100 emails per month, and no multi-MLS option on this plan</td>
              <td><Src href={PLACESTER}>No contracts; 14-day free trial</Src></td>
            </tr>
            <tr>
              <td><strong>IDX Broker</strong>, Core</td>
              <td><Src href={IDXB}>$60 per month</Src></td>
              <td><Src href={IDXB}>One-time setup fee on all plans</Src>; amount not published</td>
              <td><Src href={IDXB}>Some MLSs charge additional data fees</Src>, set by the board</td>
              <td>Market reports, sold listing data, AI Smart Search and AI Redesign start at <Src href={IDXB}>Engage, $99 per month</Src>; a hosted website comes with <Src href={IDXB}>Elite, $149 per month</Src></td>
              <td><Src href={IDXB}>Month to month, no cancellation fee</Src>; cancel at least two business days before renewal</td>
            </tr>
            <tr>
              <td><strong>myRealPage</strong> (hosted website with IDX)</td>
              <td><Src href={MRP}>$69.99 per month</Src></td>
              <td>Not stated</td>
              <td><Src href={MRP}>Plus taxes and board fees for certain boards</Src></td>
              <td>One published plan. <Src href={MRP}>The domain name is not included</Src>, and sold data is available in select markets only</td>
              <td><Src href={MRP}>No contracts; cancel anytime</Src></td>
            </tr>
            <tr>
              <td><strong>Showcase IDX</strong>, Essentials</td>
              <td><Src href={SHOWCASE}>From $94.95 per month</Src>, or <Src href={SHOWCASE}>$849.50 per year</Src></td>
              <td><Src href={SHOWCASE}>No setup fees</Src></td>
              <td><Src href={SHOWCASE}>Pass-through fees typically $0 to $33 per month</Src>, shown at signup</td>
              <td>WordPress plugin with <Src href={SHOWCASE}>2 seats</Src>. Locked listings, advanced lead routing, third-party CRM integrations and XML sitemaps are in <Src href={SHOWCASE}>Premium, from $124.95 per month</Src></td>
              <td>Term not stated; <Src href={SHOWCASE}>10-day trial without a credit card</Src></td>
            </tr>
            <tr>
              <td><strong>Realtyna</strong>, MLS On The Fly</td>
              <td><Src href={REALTYNA}>$99 per month for Tier 1 MLSs</Src>; other tiers run <Src href={REALTYNA_TIERS}>$149 to $449 per month per MLS feed</Src></td>
              <td><Src href={REALTYNA}>$850</Src></td>
              <td>Not stated; the price depends on the tier Realtyna assigns your MLS</td>
              <td>WordPress only. Your MLS may sit in a higher tier than the $99 one, and every connection is <Src href={REALTYNA_TIERS}>subject to the MLS&apos;s approval</Src></td>
              <td>Not stated</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two vendors that people often ask about are missing because we could not read a plan price on their own page.
        iHomefinder&apos;s pricing page names three plans <Src href={IHF}>without a dollar price for any of them</Src>,
        though it does list add-ons such as an extra MLS at{' '}
        <Src href={IHF}>$25 per month on the one-agent plan</Src>. IDXBoost&apos;s pricing page refused our request on
        the day we checked, so it is not included.
      </p>

      <h3>What the three $49 plans have in common, and what they do not</h3>
      <ul>
        <li><strong>Buying Buddy</strong> is the only one of the three with every cost on the page: no setup fee, no contract, and a CRM included. The price covers one user, one MLS and one website.</li>
        <li><strong>MLSImport</strong> is a different kind of product. It copies listings into your WordPress site, and it works only if your MLS gives you RESO Web API access. Its own documentation says the credentials are <Src href={MLSIMPORT_REQ}>issued to you or your brokerage</Src> and that some MLSs <Src href={MLSIMPORT_REQ}>charge for that access separately</Src>. The $49 is the plugin, not the data.</li>
        <li><strong>Flexmls IDX SmartFrame</strong> is $49 per month plus a setup fee that FBS does not publish, so its first-year cost cannot be worked out from the pricing page. Ask for the setup fee, and whether the product covers your MLS, before comparing.</li>
      </ul>

      <h2>Costs that sit on top of any plan</h2>
      <h3>MLS fees</h3>
      <p>
        Your MLS dues are separate from all of this, and some boards also charge for IDX data. With a vendor plan the
        vendor usually holds the data license and passes any board fee through to you: Showcase IDX puts that at{' '}
        <Src href={SHOWCASE}>typically $0 to $33 per month</Src>, and CRMLS says it{' '}
        <Src href={CRMLS}>does not charge an additional cost</Src> for working with a licensed vendor. Fees by board
        are in our <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>, and the{' '}
        <Link href="/tools/mls-idx-cost-calculator">cost calculator</Link> totals them for a specific setup.
      </p>
      <h3>A website to put it on</h3>
      <p>
        A plugin needs a site. If you do not have one, the low end of hosted WordPress is small: WordPress.com&apos;s
        Personal plan is <Src href={WPCOM}>US$4 per month billed every 12 months</Src>, includes a{' '}
        <Src href={WPCOM}>free domain for one year</Src>, and WordPress.com says{' '}
        <Src href={WPCOM}>plugin installation is available on every paid plan</Src>. Confirm with the IDX vendor that
        its plugin runs on the host and plan you pick. A plugin that stores listings in your own database needs more:
        MLSImport says <Src href={MLSIMPORT_REQ}>shared hosting is fine for a few hundred listings</Src> and that tens
        of thousands need a VPS or dedicated server. Hosted products such as Placester{' '}
        <Src href={PLACESTER}>include hosting on all plans</Src>.
      </p>
      <h3>A domain</h3>
      <p>
        A .com domain is a small yearly cost. Porkbun, for example, lists .com at{' '}
        <Src href={PORKBUN}>$11.08</Src>. Some hosts include the first year, and myRealPage says a domain{' '}
        <Src href={MRP}>is not included</Src> in its monthly price.
      </p>

      <h2>First-year totals for four low-cost setups</h2>
      <p>
        Each total uses only the published figures above, as read on October 12, 2026. Taxes, your MLS dues and any
        board fee your MLS charges are not included.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Setup</th><th>Arithmetic</th><th>First-year total</th><th>What is not in the total</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>MLS-provided framed link</strong> on a new WordPress.com site</td>
              <td>IDX link <Src href={CRMLS}>at no additional cost</Src> + hosting <Src href={WPCOM}>$4 × 12</Src></td>
              <td>$48</td>
              <td>Only where your MLS offers a link. The domain renews at the host&apos;s price after year one</td>
            </tr>
            <tr>
              <td><strong>Plugin on a site you already have</strong> (Buying Buddy Agent)</td>
              <td><Src href={BUDDY}>$49 × 12</Src>, no setup fee</td>
              <td>$588</td>
              <td>The hosting and domain you already pay for</td>
            </tr>
            <tr>
              <td><strong>Plugin on a new WordPress.com site</strong> (Wovax IDX, paid yearly)</td>
              <td><Src href={WOVAX}>$590</Src> + hosting <Src href={WPCOM}>$4 × 12 = $48</Src>, domain free in year one</td>
              <td>$638</td>
              <td>Any setup or MLS fee Wovax charges; its pricing page does not state either</td>
            </tr>
            <tr>
              <td><strong>Hosted website with IDX</strong> (myRealPage)</td>
              <td><Src href={MRP}>$69.99 × 12 = $839.88</Src> + domain <Src href={PORKBUN}>$11.08</Src></td>
              <td>$850.96</td>
              <td><Src href={MRP}>Taxes and board fees for certain boards</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For comparison, the better-known plans cost more in year one. Showcase IDX Essentials paid yearly is{' '}
        <Src href={SHOWCASE}>$849.50</Src>, plus pass-through fees of{' '}
        <Src href={SHOWCASE}>$0 to $33 per month</Src> ($0 to $396 a year), so $849.50 to $1,245.50. IDX Broker Core is{' '}
        <Src href={IDXB}>$60 × 12 = $720</Src> plus a setup fee it does not publish. Realtyna on a Tier 1 MLS is{' '}
        <Src href={REALTYNA}>$99 × 12 = $1,188, plus $850 setup</Src>, so $2,038. Placester Agent Essential is{' '}
        <Src href={PLACESTER}>$566 billed annually</Src>; if the{' '}
        <Src href={PLACESTER}>$25 per month MLS charge</Src> applies to your one MLS, add $300 for $866. Ask Placester
        which applies before you sign up.
      </p>

      <h2>Free and near-free routes, and their limits</h2>
      <h3>An IDX link from your MLS</h3>
      <p>
        Many MLS systems can generate a search link that you embed in a page of your site. Two MLSs that describe this
        in public:
      </p>
      <ul>
        <li><strong>CRMLS</strong> offers two frameable options, IDX Standard and IDX Plus, each <Src href={CRMLS}>available to all CRMLS users at no additional cost</Src>.</li>
        <li><strong>MIAMI REALTORS</strong> describes IDX as <Src href={MIAMI}>a free member benefit</Src> and its Matrix frameable link as <Src href={MIAMI}>a no-cost solution for MIAMI members</Src>.</li>
      </ul>
      <p>The limits are stated by the MLSs themselves:</p>
      <ul>
        <li><strong>You do the installation.</strong> CRMLS supports generating the link but <Src href={CRMLS}>does not provide support for the design and process of implementing</Src> it in a website.</li>
        <li><strong>Little or no customization.</strong> CRMLS says of IDX Plus that <Src href={CRMLS}>features are not customizable</Src>. MIAMI says its link suits those who want <Src href={MIAMI}>a simple way to display listings without the need for advanced customization</Src>.</li>
        <li><strong>It is a frame.</strong> The search runs inside a section of your page that the MLS system serves. Lead capture, saved searches and alerts are whatever that system provides, not a CRM of your choosing.</li>
      </ul>
      <p>
        Whether your MLS has an equivalent is a question for its member support desk. Ask what the link costs, whether
        it includes a map search and a contact form, and whether it works on phones.
      </p>
      <h3>A site or search page from your brokerage</h3>
      <p>
        Many brokerages give agents a page or a site with listing search already on it. The cost to you may be nothing,
        but the terms are your brokerage&apos;s, so we cannot cite a general rule. Ask who owns the leads, and what
        happens to the page and its address if you change brokerages.
      </p>
      <h3>Trials and introductory prices</h3>
      <p>
        These lower the cost of the first weeks or months, not of the year. MLSImport has a{' '}
        <Src href={MLSIMPORT}>30-day free trial</Src>, Placester a <Src href={PLACESTER}>14-day free trial</Src> and
        Showcase IDX a <Src href={SHOWCASE}>10-day trial</Src>. Buying Buddy&apos;s offer for newly licensed agents,{' '}
        <Src href={BUDDY}>$29 per month for 12 months</Src>, comes to $348 for the first year.
      </p>

      <h2>Which low-cost route fits which situation</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Your situation</th><th>Lowest-cost route that fits</th><th>What you give up</th></tr></thead>
          <tbody>
            <tr>
              <td>You need listing search on your site this month and have almost no budget</td>
              <td>The framed IDX link from your MLS, if it offers one</td>
              <td>Design control, and lead tools beyond what the MLS system has</td>
            </tr>
            <tr>
              <td>You have a website on any platform and want lead capture and a CRM</td>
              <td>A plugin with no setup fee and no contract, on one MLS</td>
              <td>Extra agents, extra MLSs and extra sites, which are all add-ons</td>
            </tr>
            <tr>
              <td>You have no website and do not want to run one</td>
              <td>A hosted website that includes IDX</td>
              <td>Portability: the site lives on the vendor&apos;s platform</td>
            </tr>
            <tr>
              <td>You run WordPress, have a developer, and your MLS will issue you API credentials</td>
              <td>An import plugin that writes listings into your own site</td>
              <td>Convenience: you obtain the MLS access, carry the hosting and handle display rules</td>
            </tr>
            <tr>
              <td>You work in two or more MLSs</td>
              <td>Price every vendor again with the per-MLS add-on included</td>
              <td>The headline price; the plan with the lowest base fee may no longer cost the least</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Signs the cheap plan has stopped being cheap</h2>
      <p>The lowest plan is priced for one agent, one MLS and one website. Check these once a year:</p>
      <ul className="cp-checklist">
        <li><strong>You are paying for a second MLS.</strong> Buying Buddy charges <Src href={BUDDY_LIST}>$25 per feed per month</Src>, Wovax prices <Src href={WOVAX}>per IDX feed</Src>, MLSImport&apos;s next plan is <Src href={MLSIMPORT}>$99 per month for up to 3 MLS boards</Src>, and Realtyna charges <Src href={REALTYNA_TIERS}>per MLS feed, by tier</Src>.</li>
        <li><strong>You have added agents.</strong> Buying Buddy&apos;s two-user plan is <Src href={BUDDY}>$77 per month</Src> and further CRM agents are <Src href={BUDDY_LIST}>$17 per user per month</Src>. Showcase IDX charges <Src href={SHOWCASE}>$4 per user per month</Src> for users 3 to 10 on Essentials.</li>
        <li><strong>You have added websites.</strong> Buying Buddy charges <Src href={BUDDY_LIST}>$15 per extra domain per month</Src>, and Wovax prices per website.</li>
        <li><strong>The features you want are one plan up.</strong> At IDX Broker, sold data and market reports mean <Src href={IDXB}>$99 instead of $60 per month</Src>, which is $468 more a year.</li>
        <li><strong>You pay for a separate tool to do what the plan lacks,</strong> such as a CRM or email marketing alongside a framed search.</li>
        <li><strong>The work is no longer &ldquo;listings on a website&rdquo;.</strong> You want several MLSs merged into one search, sites for many agents from one system, or listing data inside your own CRM.</li>
      </ul>
      <p>
        A worked example of the first two: a two-agent team on two MLSs with Buying Buddy pays{' '}
        <Src href={BUDDY}>$77</Src> + <Src href={BUDDY_LIST}>$25</Src> = $102 per month, or $1,224 a year, not $588.
        That is still a vendor plan and still far below the cost of building anything. The first five signs mean
        &ldquo;compare vendors again&rdquo;. Only the last one points toward a data vendor API or a custom pipeline,
        and our guide on <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build: when to switch</Link>{' '}
        covers that decision.
      </p>

      <h2>Before you sign up: seven questions for any low-cost vendor</h2>
      <ol>
        <li>Do you cover my MLS, and at which price tier?</li>
        <li>What is the setup fee, in dollars?</li>
        <li>Does my MLS charge a fee that you pass through, and how much is it?</li>
        <li>What do a second agent, a second MLS and a second website each cost?</li>
        <li>Is there a minimum term, and how do I cancel?</li>
        <li>Do listings appear as pages on my own domain or inside a frame?</li>
        <li>If I leave, what happens to my leads and saved searches?</li>
      </ol>

      <GuideFaq slug={SLUG} items={[
        { question: 'What is the cheapest IDX solution in 2026?', answer: ['Where an MLS offers one, a framed IDX link from the MLS costs nothing extra: CRMLS says its frameable links are ', ['available to all CRMLS users at no additional cost', CRMLS], '. Among vendors that publish prices, the lowest monthly figure we found on October 12, 2026 is ', ['$49 per month', BUDDY], ', published by Buying Buddy, MLSImport and FBS for Flexmls IDX SmartFrame. Of those, FBS adds a ', ['one-time setup fee', FBS], ' it does not publish, and MLSImport needs your own MLS API credentials.'] },
        { question: 'How much does the cheapest IDX plan cost per year?', answer: ['At ', ['$49 per month', BUDDY], ' with no setup fee, twelve months come to $588. Wovax IDX paid yearly is ', ['$590', WOVAX], '. Those totals are before hosting, a domain and any fee your MLS charges; the first-year table in this guide shows the arithmetic for four setups.'] },
        { question: 'Is there a free IDX option?', answer: ['Sometimes. Some MLSs provide members with a framed search link: MIAMI REALTORS describes IDX as ', ['a free member benefit', MIAMI], ' and CRMLS offers two frameable options ', ['at no additional cost', CRMLS], '. The trade-off is that you install the link yourself and cannot customize much. Ask your own MLS whether it has an equivalent.'] },
        { question: 'What do you give up on the lowest IDX plan?', answer: ['Usually capacity and a few features. Buying Buddy\'s $49 plan covers ', ['1 user, 1 MLS feed on 1 website', BUDDY], '. IDX Broker Core leaves market reports and sold listing data to ', ['Engage at $99 per month', IDXB], '. Showcase IDX Essentials has ', ['2 seats', SHOWCASE], ', with third-party CRM integrations and locked listings in Premium.'] },
        { question: 'Do IDX vendors charge MLS fees on top of the plan price?', answer: ['Some do, when the MLS charges the vendor. Showcase IDX says pass-through fees are ', ['typically $0 to $33 per month', SHOWCASE], ' and are shown at signup. IDX Broker says ', ['some MLSs charge additional data fees set by the local board', IDXB], '. Ask the vendor for the figure for your MLS before you subscribe.'] },
      ]} />

      <p className="cp-note">
        Prices and plan terms were read on each vendor&apos;s and MLS&apos;s own page on October 12, 2026 and are
        given as published on that date. The Showcase IDX page lists its Essentials yearly price as $849.50 and
        describes it as two months free; ten times $94.95 is $949.50, so confirm the yearly price at signup. Prices
        change; check the linked page before you budget.
      </p>
      <p>
        If your needs have outgrown a vendor plan, see our{' '}
        <Link href="/services/mls-idx-integration">MLS &amp; IDX integration service</Link> or{' '}
        <Link href="/contact">talk to an engineer</Link>. Every project starts with a 30-minute technical discovery
        call.
      </p>
    </GuideLayout>
  );
}
