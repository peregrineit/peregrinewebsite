import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'mls-data-access-canada';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-10-09. Statements are as published by CREA, the boards and the
// platforms on that date. Prices are in Canadian dollars where CREA states so.
const POLICY = 'https://us.v-cdn.net/6029909/uploads/WCDHHJMCZ480/ddf-28r-29-policy-and-rules-june-2026-eng.pdf';
const API_DOCS = 'https://ddfapi-docs.realtor.ca/';
const TP_FAQ = 'https://www.realtor.ca/ddf/technology-providers';
const TP_PRICING = 'https://crea.vanillacommunity.com/discussion/73/ddf-r-technology-provider-pricing-tiers';
const LEGACY_FEED = 'https://crea.vanillacommunity.com/discussion/31/ddf-data-feed-technical-documentation';
const CREA_TM = 'https://www.crea.ca/standards-programs/trademark-protection-competition/';
const PROPTX = 'https://www.proptx.ca/';
const PROPTX_IDX = 'https://webapp.proptx.ca/oas/common/IDX_Data_Feed.jsp';
const PROPTX_VOW = 'https://webapp.proptx.ca/oas/common/VOW_Data_Feed.jsp';
const PROPTX_RULES = 'https://proptx.ca/files/proptx_mls_rules.pdf';
const OREB = 'https://www.oreb.ca/newsroom/ottawa-real-estate-board-launches-new-proptx-mls-system/';
const BC_ROC = 'https://members.rebgv.org/news/Rules-of-Cooperation-Interactive-July-17-2023.pdf';
const VREB = 'https://www.vreb.org/vreb-idx-reciprocity-program';
const PILLAR9 = 'https://pillarnine.com/about';
const RESO_2023 = 'https://www.reso.org/blog/festival-of-nations/';
const RESO_DDF = 'https://www.reso.org/blog/expanding-intl-impact-reso/';
const REPLIERS = 'https://repliers.com/';
const SIMPLYRETS_FAQ = 'https://simplyrets.com/faq';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Canada has two layers of listing data. The national one is CREA&apos;s Data Distribution Facility (DDF®), the
        feed behind REALTOR.ca, which now speaks the RESO Web API and has published rules and technology-provider
        fees. The local one is each board&apos;s own IDX or VOW program, such as PropTx for Toronto or MLS®
        Reciprocity in British Columbia. Which you need depends on what you are building: DDF for national listing
        display on REALTOR® websites, board feeds for fuller local data, and often both.
      </p>

      <h2>CREA DDF: the national feed</h2>
      <p>
        CREA describes the DDF as a facility created{' '}
        <Src href={POLICY}>to enable CREA&apos;s members to easily disseminate MLS® listing content to multiple websites</Src>.
        RESO says <Src href={RESO_DDF}>the DDF accounts for almost 100% of properties across Canada</Src>, with one
        published exception: <Src href={TP_FAQ}>Manitoba and Quebec boards and associations do not participate in the National Shared Pool</Src>.
      </p>
      <h3>The distribution channels</h3>
      <p>
        The DDF is permission-based, and CREA&apos;s rules name six channels:{' '}
        <Src href={POLICY}>the National Shared Pool, National Franchisor Pool, Franchisor Direct Feed, Member Website Feed, Real Estate Advertising Websites and Partner Websites</Src>.
        The two that matter most to a brokerage or its developer:
      </p>
      <ul>
        <li><strong>National Shared Pool:</strong> <Src href={POLICY}>participants contribute their listings to a national data pool and receive a feed from that pool</Src>.</li>
        <li><strong>Member Website Feed:</strong> <Src href={POLICY}>a feed of only a participating salesperson&apos;s or their brokerage&apos;s listing content</Src>, for display on their own website.</li>
      </ul>
      <p>
        Boards must take part in four of the channels, but{' '}
        <Src href={POLICY}>brokerages have the option to participate or not in any listing distribution channel</Src>,
        so coverage in the shared pool depends on brokerage choices.
      </p>

      <h3>Who can receive DDF data</h3>
      <p>
        Access runs through CREA members. A developer works as a <strong>Technology Provider</strong>, which the rules
        define as <Src href={POLICY}>a company that has entered into a data access agreement with REALTOR.ca Canada Inc.</Src>{' '}
        to operate a website for a participant. CREA&apos;s FAQ adds that{' '}
        <Src href={TP_FAQ}>technology providers can build personal websites for REALTORS® only</Src>, and that members{' '}
        <Src href={POLICY}>may not share or disclose their DDF® credentials</Src> to a technology provider. If your
        product is not a REALTOR® website, DDF is probably not your route; a board feed or a partner agreement is.
      </p>

      <h3>The API</h3>
      <p>
        RESO reports that CREA moved the DDF to the RESO Web API{' '}
        <Src href={RESO_2023}>in 2023</Src>. CREA&apos;s documentation says the DDF Web API lets you query data{' '}
        <Src href={API_DOCS}>using the RESO Web API specification, which is based on OData</Src>, with data{' '}
        <Src href={API_DOCS}>normalized based on the RESO Data Dictionary standards</Src>. Two practical details:
        an access token <Src href={API_DOCS}>lasts for 60 minutes</Src>, and pages go up to{' '}
        <Src href={API_DOCS}>a maximum of 100 records</Src>. The older feed, with its{' '}
        <Src href={LEGACY_FEED}>Login, Metadata, Search, GetObject and Logout transactions</Src>, is still documented.
        If you are moving from one to the other, our guide to{' '}
        <Link href="/blog/reso-web-api-vs-rets">RESO Web API vs RETS</Link> covers what changes.
      </p>

      <h3>Technology provider fees</h3>
      <p>
        CREA publishes its technology-provider pricing. <Src href={TP_PRICING}>New technology providers pay a $1,500 onboarding fee</Src>,
        then a fee by number of feeds. <Src href={TP_PRICING}>All prices are in Canadian dollars</Src>:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Number of feeds</th><th>Monthly</th><th>Quarterly</th><th>Yearly</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>$25</td><td>$75</td><td>$300</td></tr>
            <tr><td>2 to 10</td><td>$200</td><td>$600</td><td>$2,400</td></tr>
            <tr><td>11 to 50</td><td>$750</td><td>$2,250</td><td>$9,000</td></tr>
            <tr><td>51 to 250</td><td>$2,500</td><td>$7,500</td><td>$30,000</td></tr>
            <tr><td>251 to 1,000</td><td>$7,500</td><td>$22,500</td><td>$90,000</td></tr>
            <tr><td>Unlimited</td><td>$10,000</td><td>$30,000</td><td>$120,000</td></tr>
          </tbody>
        </table>
      </div>
      <p className="cp-muted">
        Source for the whole table: <Src href={TP_PRICING}>CREA&apos;s DDF technology provider pricing tiers</Src>, where
        it is published as an image. CREA bills quarterly and{' '}
        <Src href={TP_PRICING}>does not allow a technology provider to prepay for the entire year</Src>. The post is
        dated 2020 and marked as edited in April 2025, so confirm the tiers with CREA.
      </p>

      <h3>Display rules that affect the build</h3>
      <ul>
        <li><strong>Refresh:</strong> websites <Src href={POLICY}>must refresh at least once every twenty-four (24) hours</Src>. CREA says listing data is <Src href={TP_FAQ}>updated an average of 46 times per day</Src>.</li>
        <li><strong>Number of sites:</strong> a participant <Src href={POLICY}>may not operate more than ten (10) websites</Src> using DDF listing content.</li>
        <li><strong>Attribution:</strong> the &ldquo;Powered by REALTOR.ca&rdquo; logo must be shown at <Src href={POLICY}>a minimum of 90 pixels in width</Src>, and each page needs an MLS® and REALTOR® trademark statement.</li>
        <li><strong>Filtering:</strong> on national pool websites, listings may be filtered <Src href={POLICY}>based only on objective criteria</Src>.</li>
        <li><strong>Trademarks:</strong> CREA says <Src href={CREA_TM}>the MLS® mark can never be used as part of a business name, trade name or in any corporate branding</Src>.</li>
        <li><strong>AI:</strong> the June 2026 rules state that nothing in them <Src href={POLICY}>provides any person the right to use listing content for the purpose of training artificial intelligence systems</Src>.</li>
      </ul>

      <h2>Board feeds: the local layer</h2>
      <p>
        CREA itself points developers to the boards: asked whether you must be a technology provider to build REALTOR®
        sites, its FAQ answers that <Src href={TP_FAQ}>data feeds are usually available from local boards or associations</Src>.
        Board programs differ in name, platform and rules. What the boards we could verify publish:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Board or system</th><th>Program</th><th>What its own page says</th></tr></thead>
          <tbody>
            <tr>
              <td>PropTx (Toronto, TRREB)</td>
              <td>IDX and VOW</td>
              <td>PropTx is <Src href={PROPTX}>the MLS® technology subsidiary of the Toronto Regional Real Estate Board</Src>. IDX <Src href={PROPTX_IDX}>is now offered in RESO API format</Src>; VOW access <Src href={PROPTX_VOW}>requires brokerages to sign the PropTx VOW Datafeed Agreement</Src>. Its rules require a VOW to be <Src href={PROPTX_RULES}>refreshed at least once every twenty-four (24) hours</Src></td>
            </tr>
            <tr>
              <td>Ottawa (OREB)</td>
              <td>On the PropTx system</td>
              <td>OREB moved its members to the PropTx MLS® System <Src href={OREB}>as of November 25, 2024</Src></td>
            </tr>
            <tr>
              <td>Greater Vancouver, Fraser Valley, Chilliwack</td>
              <td>MLS® Reciprocity</td>
              <td>The joint rules describe <Src href={BC_ROC}>a program which enables participants to display on their websites the listings of other corporate members</Src> (rules revised July 2023)</td>
            </tr>
            <tr>
              <td>Victoria (VREB)</td>
              <td>IDX Reciprocity</td>
              <td>Reciprocity information is <Src href={VREB}>updated at least every 24 hours</Src></td>
            </tr>
            <tr>
              <td>Alberta (Pillar 9)</td>
              <td>Data requests from non-members</td>
              <td>For data and report requests, Pillar 9 says that if a request is approved it <Src href={PILLAR9}>will send an NDA to sign and then discuss the fees for report options</Src>. We found no public page describing an IDX or VOW feed program</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        None of these pages publishes a fee, and several do not name the platform that delivers the data. Ask each
        board for its current data agreement, fee schedule and API before you plan a build. Other boards and systems,
        including Centris in Quebec and the associations in Edmonton and Nova Scotia, are not in the table because we
        could not verify their fees or delivery platforms from public pages.
      </p>

      <h2>Aggregators that state Canadian coverage</h2>
      <ul>
        <li><strong>Repliers</strong> says <Src href={REPLIERS}>you can connect to any MLS in the U.S. or Canada</Src>; access still depends on each board&apos;s licensing.</li>
        <li><strong>SimplyRETS</strong> says it <Src href={SIMPLYRETS_FAQ}>works with any standard RETS or RESO Web API data feed</Src> and is not specific to any MLS area, which means you bring your own feed.</li>
      </ul>
      <p>
        An aggregator does not replace the license. You still need the board&apos;s or CREA&apos;s agreement; the
        aggregator changes how the data reaches you, and adds its own fee.
      </p>

      <h2>Choosing a route</h2>
      <ol>
        <li><strong>A REALTOR® or brokerage website showing national listings:</strong> the DDF, through a technology provider agreement, is built for this.</li>
        <li><strong>A brokerage site that needs fuller local data,</strong> such as sold information behind a login: the board&apos;s VOW program.</li>
        <li><strong>A product used by many brokerages across provinces:</strong> expect a mix of board feeds and DDF, each with its own agreement, and plan to normalize them yourself.</li>
        <li><strong>A product that is not a REALTOR® website:</strong> talk to the boards and to CREA about partner arrangements before you design anything; the member-website rules above will not fit.</li>
      </ol>
      <p>
        For the United States side, see <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access for
        your app</Link> and the <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>. Our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes an
        MLS sync engine built for both US and Canadian boards.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'What is CREA DDF?', answer: ['The Data Distribution Facility is CREA\'s national listing feed, created ', ['to enable CREA\'s members to easily disseminate MLS® listing content to multiple websites', POLICY], '. RESO says it ', ['accounts for almost 100% of properties across Canada', RESO_DDF], '.'] },
        { question: 'Does CREA DDF use the RESO Web API?', answer: ['Yes. CREA\'s documentation says the DDF Web API lets you query data ', ['using the RESO Web API specification, which is based on OData', API_DOCS], ', and RESO reports that CREA made the move ', ['in 2023', RESO_2023], '.'] },
        { question: 'How much does CREA charge technology providers for DDF?', answer: ['CREA publishes ', ['a $1,500 onboarding fee for new technology providers', TP_PRICING], ' and tiered fees by number of feeds, in Canadian dollars, from $25 per month for one feed to $10,000 per month for unlimited feeds, as listed on the same page.'] },
        { question: 'How often must a website refresh DDF listings?', answer: ['CREA\'s rules say national pool and member websites ', ['must refresh at least once every twenty-four (24) hours', POLICY], '. CREA also says listing data is ', ['updated an average of 46 times per day', TP_FAQ], '.'] },
        { question: 'Is DDF enough, or do I need a board feed as well?', answer: ['It depends on the product. DDF is built for listing display on REALTOR® websites. For fuller local data, such as a registered-user VOW, boards run their own programs: PropTx in Toronto, for example, offers ', ['IDX in RESO API format', PROPTX_IDX], ' and a separate VOW agreement. Many products need both.'] },
      ]} />

      <p className="cp-note">
        Rules, fees and program details were taken from the linked CREA, board and platform pages on October 9, 2026.
        Board rules are revised often; confirm the current version with each board before you build. REALTOR® and
        REALTORS® are trademarks controlled by The Canadian Real Estate Association (CREA).
      </p>
    </GuideLayout>
  );
}
