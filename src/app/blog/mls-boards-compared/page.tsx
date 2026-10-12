import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'mls-boards-compared';
export const metadata = guideMetadata(SLUG);

// Every source below was fetched and read on 2026-10-12; the sentence relied on for each link is
// logged in docs/growth/content/SOURCES-mls-boards-compared.md. Bright MLS, OneKey MLS and MIAMI
// pages render with scripts or refuse plain requests, so they were read in a browser that day.
// Left out because their sites could not be read: HAR (403 and 504), Georgia MLS (no connection)
// and Canopy MLS (its content host did not respond; only its MLS Grid listing was verified).
const CRMLS_ABOUT = 'https://go.crmls.org/about/';
const CRMLS_IDX = 'https://go.crmls.org/idx-resources/';
const BRIGHT_ABOUT = 'https://www.brightmls.com/about-us';
const BRIGHT_DEV = 'https://www.brightmls.com/benefits/developers';
const STELLAR_ABOUT = 'https://www.stellarmls.com/about';
const STELLAR = 'https://www.stellarmls.com/data-delivery';
const STELLAR_API = 'https://www.stellarmls.com/api-options';
const NTREIS = 'https://ntreis.net/data/';
const MIAMI_ABOUT = 'https://www.miamirealtors.com/about/';
const MIAMI_IDX = 'https://www.miamirealtors.com/mls/webapi/';
const MIAMI_PRICE = 'https://www.miamirealtors.com/mls/webapi/pricing/';
const FMLS_ABOUT = 'https://firstmls.com/about/';
const FMLS_DATA = 'https://www.fmls.com/marketplace-info';
const FMLS_PRICE = 'https://www.fmls.com/marketplace-pricing/';
const ARMLS = 'https://armls.com/data-feeds-vendor-info';
const ARMLS_API = 'https://armls.com/rets-to-api';
const MRED_DATA = 'https://ww2.mredllc.com/data-delivery/idx-vow/';
const MRED_GRID = 'https://ww2.mredllc.com/data-delivery/the-mls-grid/';
const MRED_BOOK = 'https://www.mredllc.com/comms/resources/2026-little-book-of-mred.pdf';
const ONEKEY = 'https://www.onekeymls.com/about-us';
const MLSPIN_ABOUT = 'https://www.mlspin.com/about';
const MLSPIN = 'https://www.mlspin.com/resources/data-services';
const NWMLS = 'https://www.nwmls.com/about-nwmls/';
const RECO_ABOUT = 'https://recolorado.com/about/';
const RECO_DATA = 'https://recolorado.com/data/';
const RECO_FEES = 'https://cdn.recolorado.com/files/data/Participant-Pricing-Schedule.pdf';
const NS_ABOUT = 'https://northstarmls.com/about-us/';
const NS_DATA = 'https://northstarmls.com/third-party-data-usage/';
const RC_ABOUT = 'https://www.realcomp.com/Company/About-Realcomp';
const RC_IDX = 'https://www.realcomp.com/Products-Services/Services-Products/Internet-Data-Exchange-IDX-for-Realcomp-Customers';
const RC_IDXSVC = 'https://www.realcomp.com/Products-Services/Services-Products/IDX-Service';
const METRO_ABOUT = 'https://metromls.com/about-metro-mls/';
const METRO = 'https://metromls.com/participant-data-feed-information/';
const GRID_DOCS = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_FAQ = 'https://www.mlsgrid.com/faq';
const TRESTLE_FAQ = 'https://trestle-documentation.corelogic.com/support/faq/';
const TRESTLE_PRICE = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const BRIDGE_API = 'https://www.bridgeinteractive.com/mls/bridge-api/';
const RESO_MAP = 'https://www.reso.org/certification/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        No two MLSs hand out data the same way. Of the 15 US MLSs compared here, five deliver through MLS Grid,
        three through Trestle, four through Bridge Interactive (two of them alongside another platform), and
        five issue API access themselves. Published vendor fees run from a few dollars per website per month to
        six-figure annual licenses at the largest client tier, and the rules on who may apply differ just as much. So the work for a new market cannot be estimated from the last
        one: it has to be read off that MLS&apos;s own data page.
      </p>
      <p>
        This is a reference to keep open while scoping. Every cell is taken from the MLS&apos;s own site, or from
        its platform&apos;s documentation, as read on October 12, 2026. &ldquo;Not published&rdquo; means the pages
        we could read do not say; it does not mean free. For the process of getting approved, see{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>.
      </p>

      <h2>Who they are and how they deliver data</h2>
      <p>
        Sizes are quoted as each organization states them, and they do not count the same thing: some count
        subscribers, some REALTOR members, some all professionals served. They are not a ranking.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>MLS</th><th>Region, as it states</th><th>Size, as it states</th><th>Delivery platform</th><th>Feed types it names</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CRMLS</strong></td>
              <td>California</td>
              <td><Src href={CRMLS_ABOUT}>more than 93,000 real estate professionals from 39 associations, boards and MLS organizations</Src></td>
              <td><Src href={CRMLS_IDX}>Trestle, for a RESO API or RETS feed</Src></td>
              <td>Free frame links, IDX through a licensed vendor, RESO feed, <Src href={CRMLS_IDX}>broker feed of the office&apos;s own listings</Src></td>
            </tr>
            <tr>
              <td><strong>Bright MLS</strong></td>
              <td><Src href={BRIGHT_ABOUT}>The Mid-Atlantic</Src></td>
              <td><Src href={BRIGHT_ABOUT}>100,000+ real estate professionals</Src></td>
              <td>Its own <Src href={BRIGHT_DEV}>RESO Web API; RETS is still available to vendors</Src></td>
              <td><Src href={BRIGHT_DEV}>IDX and VOW; other use cases considered by request</Src></td>
            </tr>
            <tr>
              <td><strong>Stellar MLS</strong></td>
              <td><Src href={STELLAR_ABOUT}>Florida and Puerto Rico</Src></td>
              <td><Src href={STELLAR_ABOUT}>80,000+ real estate professionals</Src></td>
              <td><Src href={STELLAR_API}>MLS Grid and Bridge API</Src></td>
              <td><Src href={STELLAR}>IDX, firm internal use (back office), broker data release, VOW, vendor product</Src></td>
            </tr>
            <tr>
              <td><strong>NTREIS</strong></td>
              <td><Src href={NTREIS}>Texas, Louisiana and beyond</Src></td>
              <td><Src href={NTREIS}>53,000+ real estate professionals</Src></td>
              <td><Src href={NTREIS}>Trestle</Src></td>
              <td><Src href={NTREIS}>IDX and VOW, back office, brokers&apos; own data</Src></td>
            </tr>
            <tr>
              <td><strong>MIAMI MLS</strong> (MIAMI Association of REALTORS)</td>
              <td><Src href={MIAMI_ABOUT}>South Florida</Src></td>
              <td>The association <Src href={MIAMI_ABOUT}>represents over 60,000 real estate professionals</Src></td>
              <td><Src href={MIAMI_IDX}>Trestle (head brokers and vendors) and Bridge API (brokers, agents and vendors)</Src></td>
              <td>Free frame link, IDX, <Src href={MIAMI_IDX}>IDX Plus, back office and VOW</Src></td>
            </tr>
            <tr>
              <td><strong>FMLS</strong> (First Multiple Listing Service)</td>
              <td><Src href={FMLS_ABOUT}>Georgia and the Southeast</Src></td>
              <td><Src href={FMLS_ABOUT}>over 57,000 real estate professionals and REALTORS</Src></td>
              <td><Src href={FMLS_DATA}>Bridge Interactive: Bridge API, RESO Web API or vRETS</Src></td>
              <td>Per approved product in <Src href={FMLS_DATA}>FMLS Marketplace</Src>; types are not listed publicly</td>
            </tr>
            <tr>
              <td><strong>ARMLS</strong></td>
              <td>Arizona</td>
              <td>Not stated on the pages read</td>
              <td><Src href={ARMLS_API}>Spark and RESO Web API; ARMLS issues API keys directly</Src></td>
              <td><Src href={ARMLS}>IDX, VOW, company back office, brokerage listings only</Src></td>
            </tr>
            <tr>
              <td><strong>MRED</strong></td>
              <td><Src href={MRED_BOOK}>Northern Illinois at the start, now more than one state</Src></td>
              <td>Not stated on the pages read</td>
              <td><Src href={MRED_GRID}>MLS Grid, which MRED says it was the first MLS to launch</Src>, for IDX; <Src href={MRED_DATA}>MRED directly for other uses</Src></td>
              <td><Src href={MRED_DATA}>IDX, VOW, broker back office, own listings</Src></td>
            </tr>
            <tr>
              <td><strong>OneKey MLS</strong></td>
              <td><Src href={ONEKEY}>Long Island, Hudson Valley, Manhattan, parts of Connecticut and New Jersey</Src></td>
              <td><Src href={ONEKEY}>more than 43,000 REALTORS</Src></td>
              <td><Src href={GRID_V2}>MLS Grid</Src></td>
              <td>Not published on the pages read</td>
            </tr>
            <tr>
              <td><strong>MLS PIN</strong></td>
              <td><Src href={MLSPIN_ABOUT}>Massachusetts, Rhode Island and much of New Hampshire</Src></td>
              <td><Src href={MLSPIN_ABOUT}>over 37,050 real estate professionals</Src></td>
              <td>Its own <Src href={MLSPIN}>RESO Web API (Core 2.0.0 certified, Data Dictionary 1.7)</Src></td>
              <td><Src href={MLSPIN}>Free IDX links, brokerage access, vendor access, syndicator access</Src></td>
            </tr>
            <tr>
              <td><strong>NWMLS</strong></td>
              <td><Src href={NWMLS}>Washington state and Oregon</Src></td>
              <td><Src href={NWMLS}>30,000+ brokers in more than 2,500 member offices</Src></td>
              <td><Src href={GRID_V2}>MLS Grid</Src></td>
              <td>Not published on the pages read</td>
            </tr>
            <tr>
              <td><strong>REcolorado</strong></td>
              <td>Colorado</td>
              <td><Src href={RECO_ABOUT}>more than 26,000 real estate professionals</Src></td>
              <td><Src href={RECO_DATA}>Bridge Interactive, which it calls its exclusive data delivery platform</Src></td>
              <td><Src href={RECO_DATA}>IDX, back office, VOW, participant data access (PDAP)</Src></td>
            </tr>
            <tr>
              <td><strong>NorthstarMLS</strong></td>
              <td><Src href={NS_ABOUT}>Minnesota and the Upper Midwest</Src></td>
              <td><Src href={NS_ABOUT}>more than 22,000 real estate professionals</Src></td>
              <td><Src href={NS_DATA}>MLS Grid</Src></td>
              <td><Src href={NS_DATA}>IDX, VOW, back office</Src></td>
            </tr>
            <tr>
              <td><strong>Realcomp</strong></td>
              <td>Michigan</td>
              <td><Src href={RC_ABOUT}>more than 16,000 REALTORS in more than 2,600 offices</Src></td>
              <td>Its own <Src href={RC_IDX}>API, through an account Realcomp creates</Src></td>
              <td>Framed IDX search, <Src href={RC_IDXSVC}>IDX data, VOW, back office data for brokers</Src></td>
            </tr>
            <tr>
              <td><strong>Metro MLS</strong></td>
              <td>Wisconsin</td>
              <td><Src href={METRO_ABOUT}>more than 9,000 members</Src></td>
              <td>Its own <Src href={METRO}>RETS or Web API; it says RETS will be sunset soon</Src></td>
              <td><Src href={METRO}>IDX, VOW, back office, AVM, brokerage listings only</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Three more names you may expect are missing. The sites of HAR (Houston) and Georgia MLS did not load for
        us on the day we checked, so they have no row. Canopy MLS appears in{' '}
        <Src href={GRID_V2}>MLS Grid&apos;s list of originating systems</Src>, which is the only fact about it we
        could verify.
      </p>

      <h2>Who can license, what it costs, where to start</h2>
      {/* TODO(owner): vendor disclosure */}
      <p>
        Fees are as published on October 12, 2026, in US dollars, and are the MLS&apos;s own charges. Platform
        fees, where a platform charges any, are in the next section. Add them up for your own case with the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link>.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>MLS</th><th>Who may license</th><th>Published fees</th><th>Where the application starts</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CRMLS</strong></td>
              <td><Src href={CRMLS_IDX}>Brokers or vendors, under a data licensing agreement with CRMLS</Src>. A developer working for one broker is <Src href={CRMLS_IDX}>treated as an IDX vendor request</Src></td>
              <td><Src href={CRMLS_IDX}>Two feeds for a broker at no charge</Src>; for vendors and developers, <Src href={CRMLS_IDX}>$7 per website URL per month, first two URLs included</Src></td>
              <td><Src href={CRMLS_IDX}>Trestle&apos;s subscription wizard</Src></td>
            </tr>
            <tr>
              <td><strong>Bright MLS</strong></td>
              <td><Src href={BRIGHT_DEV}>Licenses go to agents and brokerages</Src>; the API is available to vendors</td>
              <td>Not published</td>
              <td>Its <Src href={BRIGHT_DEV}>developers page</Src> and developer portal</td>
            </tr>
            <tr>
              <td><strong>Stellar MLS</strong></td>
              <td><Src href={STELLAR}>A three-party agreement between broker, vendor and Stellar MLS</Src>. A vendor product needs <Src href={STELLAR}>at least one Stellar broker as an active client</Src></td>
              <td>Firm internal use or VOW: <Src href={STELLAR}>$450 per office per year, capped at $7,500</Src>. Vendor product: <Src href={STELLAR}>$7,500 per product per year, $2,500 for each additional product</Src></td>
              <td>The <Src href={STELLAR}>data delivery questionnaire</Src>, or MLS Grid registration for IDX</td>
            </tr>
            <tr>
              <td><strong>NTREIS</strong></td>
              <td><Src href={NTREIS}>Vendors, brokers, and agents seeking an IDX or VOW feed</Src></td>
              <td>Vendors: <Src href={NTREIS}>$500 one-time setup, then $36 per client per month, capped at $2,400</Src>. <Src href={NTREIS}>Brokers are not charged</Src> for IDX, VOW or their own back office feed</td>
              <td><Src href={NTREIS}>Trestle&apos;s subscription wizard, or NTREIS data services by email</Src></td>
            </tr>
            <tr>
              <td><strong>MIAMI MLS</strong></td>
              <td>Trestle for head brokers and vendors; <Src href={MIAMI_IDX}>Bridge for brokers, agents and vendors</Src></td>
              <td>Agent or broker IDX feed: <Src href={MIAMI_PRICE}>free, one feed only</Src>. Vendor IDX Plus: <Src href={MIAMI_PRICE}>$1,310 a year for 1 to 10 clients, rising by tier to $102,375</Src>. Vendor VOW or back office: <Src href={MIAMI_PRICE}>from $1,703 a year</Src></td>
              <td><Src href={MIAMI_IDX}>A vendor invitation from MIAMI&apos;s IDX department for Bridge, or Trestle&apos;s wizard</Src></td>
            </tr>
            <tr>
              <td><strong>FMLS</strong></td>
              <td>Third-party vendors, and <Src href={FMLS_DATA}>member brokerages for their own products</Src></td>
              <td><Src href={FMLS_DATA}>$250 application fee, waived for member brokerages</Src>. Monthly fee per subscribed member: <Src href={FMLS_PRICE}>first two free, $22 each for the 3rd to 10th, falling by tier to $0.10</Src></td>
              <td>An <Src href={FMLS_DATA}>FMLS Marketplace account, then a data request in Bridge</Src></td>
            </tr>
            <tr>
              <td><strong>ARMLS</strong></td>
              <td>Broker feeds <Src href={ARMLS}>must be tied to an active ARMLS subscriber</Src>; vendors apply separately</td>
              <td>Broker: <Src href={ARMLS}>five free IDX or back office feeds, then $150 per month per feed</Src>. Vendor: <Src href={ARMLS}>typically $1,000 to $1,500 per product per month</Src></td>
              <td>The <Src href={ARMLS}>broker or vendor intake form</Src></td>
            </tr>
            <tr>
              <td><strong>MRED</strong></td>
              <td><Src href={MRED_DATA}>Brokerages, managing brokers, agents, and vendors who have one of them as a customer</Src></td>
              <td>Not published</td>
              <td><Src href={MRED_DATA}>MLS Grid for IDX; MRED&apos;s orders desk for anything else</Src></td>
            </tr>
            <tr>
              <td><strong>OneKey MLS</strong></td>
              <td>Not published on the pages read</td>
              <td>Not published</td>
              <td><Src href={GRID_DOCS}>An MLS Grid data consumer account</Src></td>
            </tr>
            <tr>
              <td><strong>MLS PIN</strong></td>
              <td>Brokerages (<Src href={MLSPIN}>signed by the broker of record</Src>), vendors and syndicators</td>
              <td>Brokerage: <Src href={MLSPIN}>$100 per month, branch offices included</Src>. Vendor: <Src href={MLSPIN}>$525 per month, whatever the number of subscribers</Src></td>
              <td>An <Src href={MLSPIN}>agreement and application from MLS PIN data services</Src></td>
            </tr>
            <tr>
              <td><strong>NWMLS</strong></td>
              <td>Not published on the pages read</td>
              <td>Not published</td>
              <td><Src href={GRID_DOCS}>An MLS Grid data consumer account</Src></td>
            </tr>
            <tr>
              <td><strong>REcolorado</strong></td>
              <td>Vendors apply directly; a PDAP feed needs <Src href={RECO_DATA}>a three-party agreement signed by the office&apos;s participant</Src></td>
              <td>Its schedule lists <Src href={RECO_FEES}>IDX at $500 to establish and $150 per month; VOW at $1,500 and $500 per month</Src>. The data page says to ask its licensing team for pricing</td>
              <td>A <Src href={RECO_DATA}>Bridge account, then a data access request</Src></td>
            </tr>
            <tr>
              <td><strong>NorthstarMLS</strong></td>
              <td>Vendors and participants; <Src href={NS_DATA}>NorthstarMLS reviews each request</Src></td>
              <td>New vendors: <Src href={NS_DATA}>$1,000 development fee and $500 startup fee, once</Src>. Then <Src href={NS_DATA}>$125 per month for one user, up to $500 for 101 or more</Src></td>
              <td><Src href={NS_DATA}>MLS Grid</Src></td>
            </tr>
            <tr>
              <td><strong>Realcomp</strong></td>
              <td><Src href={RC_IDX}>Full subscribers only</Src>; the developer signs as <Src href={RC_IDX}>IDX consultant and alone receives the credentials</Src></td>
              <td>Not published on the pages read</td>
              <td>The <Src href={RC_IDXSVC}>IDX contract on its IDX service page</Src></td>
            </tr>
            <tr>
              <td><strong>Metro MLS</strong></td>
              <td>Participants (broker-owners). Vendors <Src href={METRO}>apply on the participant&apos;s behalf, and fees are billed to the participant</Src></td>
              <td><Src href={METRO}>$300 one-time per new feed</Src>. Monthly: <Src href={METRO}>IDX $15, VOW $30, back office $50 to $100</Src>, charged on the first ten offices only; own listings free</td>
              <td>The <Src href={METRO}>participant feed web application</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Read the rows together and one pattern stands out: almost nobody licenses a vendor alone. Stellar MLS,
        MRED, Realcomp and Metro MLS all tie a vendor&apos;s feed to a member broker or agent. Trestle says the same of the
        MLSs it serves:{' '}
        <Src href={TRESTLE_FAQ}>they typically require a real estate broker or agent to ratify the contract, or a periodic report of which members use the service</Src>.
        The fee model differs too: per office (Stellar MLS), per client (NTREIS, MIAMI, FMLS, NorthstarMLS), per
        product (ARMLS), per website (CRMLS) or flat (MLS PIN). A product with 5 broker clients and one with 500
        land in different places on each of those.
      </p>

      <h2>What the platform adds to the bill</h2>
      <ul>
        <li>
          <strong>MLS Grid:</strong> no fee of its own. You{' '}
          <Src href={GRID_FAQ}>only pay the license fee required by your MLS</Src>, which MLS Grid collects.
        </li>
        <li>
          <strong>Trestle:</strong> a fee per connection on top of the MLS&apos;s. Its pricing page lists{' '}
          <Src href={TRESTLE_PRICE}>$30 per month for a broker&apos;s own-data feed, $100 for other broker feeds, and $100 to $175 for technology providers by tier</Src>,
          with <Src href={TRESTLE_PRICE}>a 5% increase for technology providers from January 2027</Src>. Two MLSs
          quote other amounts: CRMLS says{' '}
          <Src href={CRMLS_IDX}>$85 per month for an IDX feed and $25 for a broker feed</Src>, and MIAMI says{' '}
          <Src href={MIAMI_PRICE}>$85 per month per feed for vendors</Src>. Trestle shows{' '}
          <Src href={TRESTLE_FAQ}>the fees for a connection before you activate it</Src>; go by that figure.
        </li>
        <li>
          <strong>Bridge Interactive:</strong> says it charges{' '}
          <Src href={BRIDGE_API}>no additional fees for members or vendors</Src>, and MIAMI confirms{' '}
          <Src href={MIAMI_IDX}>no additional service fees from Bridge to access its data</Src>.
        </li>
        <li>
          <strong>An MLS&apos;s own API:</strong> nothing beyond the license, on the pages we read for Bright MLS,
          MLS PIN, ARMLS, Realcomp and Metro MLS.
        </li>
      </ul>
      <p>
        The <Link href="/blog/mls-idx-integration-cost">cost guide</Link> covers vendor plans and development
        cost, which this page leaves out.
      </p>

      <h2>What the differences mean for an integration</h2>
      <p>
        The platform decides how much of your code is new for each market. Four differences matter when you
        estimate.
      </p>
      <p>
        <strong>One connector can cover several boards, or only one.</strong> MLS Grid has{' '}
        <Src href={GRID_FAQ}>one standard license agreement for IDX, VOW and back office products</Src>, and its
        documentation lists <Src href={GRID_V2}>37 originating systems</Src> behind one API. Trestle says
        it carries data from <Src href={TRESTLE_FAQ}>over 90 multiple listing organizations</Src>. So Stellar MLS,
        MRED, NorthstarMLS, NWMLS and OneKey MLS share a connector, and CRMLS, NTREIS and MIAMI share another. Bright
        MLS, MLS PIN, ARMLS, Realcomp and Metro MLS each need their own. Each board is still approved, licensed and
        billed one at a time: MLS Grid gives a broker{' '}
        <Src href={GRID_FAQ}>data only from the MLS where it holds participatory rights</Src>.
      </p>
      <p>
        <strong>Some platforms only replicate; others answer live queries.</strong> MLS Grid states it does{' '}
        <Src href={GRID_DOCS}>not support real-time data access and provides data through replication</Src>, so you
        must run your own database and search. Trestle&apos;s Web API is{' '}
        <Src href={TRESTLE_FAQ}>appropriate for both real-time access and replication</Src>, and ARMLS says its
        APIs <Src href={ARMLS_API}>support live queries passed straight through to a website or app</Src>. The
        design that works on all of them is in the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline reference architecture</Link>.
      </p>
      <p>
        <strong>RETS is at a different stage in each market.</strong> ARMLS{' '}
        <Src href={ARMLS_API}>shut its RETS feeds off on December 15, 2023</Src>. Metro MLS still offers RETS
        but says it will be sunset soon, MRED says it is{' '}
        <Src href={MRED_DATA}>transitioning from RETS to Web API</Src>, and Bright MLS keeps both. Build new work on
        the Web API; <Link href="/blog/reso-web-api-vs-rets">RESO Web API vs RETS</Link> covers what changes.
      </p>
      <p>
        <strong>The platform itself can change.</strong> REcolorado&apos;s data page now names{' '}
        <Src href={RECO_DATA}>Bridge Interactive as its exclusive data delivery platform for all new data customers</Src>,
        while MLS Grid&apos;s documentation still{' '}
        <Src href={GRID_V2}>lists REcolorado among its originating systems</Src>. Stellar MLS offers two platforms
        at once. Treat the platform as a per-feed setting in your code, and re-check it before each renewal.
      </p>
      <p>
        One of our published projects spans four of the MLSs above. The{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> describes a brokerage
        whose markets include Texas (NTREIS), Florida (Stellar MLS), Arizona (ARMLS) and Colorado (REcolorado),
        and a pipeline that ingests from the four MLS systems and normalizes their schemas. In the tables above
        those four arrive over Trestle, MLS Grid or Bridge, Spark, and Bridge, and each prices its feeds in a
        different unit.
      </p>

      <h2>How to find which MLS covers a market</h2>
      <ol>
        <li>
          <strong>Ask the broker first.</strong> Access follows the broker&apos;s participation, so the MLS your
          client belongs to is the one that matters, even where two MLSs overlap. Florida alone has two rows in
          the tables above.
        </li>
        <li>
          <strong>Use RESO&apos;s map and list.</strong> RESO counts{' '}
          <Src href={RESO_MAP}>484 functioning MLS systems in the United States and more than 30 in Canada</Src>,
          and its certification and MLS map page links a list of certified organizations.
        </li>
        <li>
          <strong>Check the platform&apos;s own list.</strong> MLS Grid&apos;s API documentation{' '}
          <Src href={GRID_V2}>names every originating system it carries</Src>. If the MLS is there, you know the
          platform before you speak to anyone.
        </li>
        <li>
          <strong>Ask what a data share adds.</strong> One feed can reach past the MLS&apos;s own members: CRMLS
          IDX data <Src href={CRMLS_IDX}>contains all CRMLS and data share listings</Src>, and Metro MLS offers a
          second feed, WiREx, with <Src href={METRO}>listings from the seven Wisconsin MLSs in that program</Src>.
          That can remove a second integration from the plan.
        </li>
      </ol>

      <h2>New-market checklist: eight questions before you estimate</h2>
      <p>
        Answer these from the MLS&apos;s own data page and license before putting a number on a new market. Each
        maps to a column above.
      </p>
      <ul className="cp-checklist">
        <li><strong>Which MLS, and which broker?</strong> Name the participant whose membership the feed will sit under, and who signs.</li>
        <li><strong>Which platform delivers the feed today?</strong> MLS Grid, Trestle, Bridge, Spark or the MLS&apos;s own API, and whether you already have a connector for it.</li>
        <li><strong>Which feed type fits the use?</strong> IDX, VOW, back office or a vendor product. A public search and an internal analytics tool are different licenses at most of these MLSs.</li>
        <li><strong>Who is the licensee?</strong> The broker, the agent or you as vendor, and whether a three-party agreement or a consultant form is required.</li>
        <li><strong>What is the fee unit?</strong> Per office, per client, per product, per website or flat, plus any setup fee and any platform fee. Work it out at your expected client count.</li>
        <li><strong>What does approval need?</strong> A working product to demonstrate, a site open for compliance review, a questionnaire, and whether AI features get extra review, as <Src href={NTREIS}>NTREIS says they may</Src>.</li>
        <li><strong>Replication or live query, and is RETS involved?</strong> This sets whether the market needs your full pipeline or only a new source in it.</li>
        <li><strong>What reporting and audits follow?</strong> For example, Stellar MLS asks vendors for <Src href={STELLAR}>a quarterly list of shared clients</Src>, and NTREIS expects approved sites to be <Src href={NTREIS}>live and compliant within two weeks of approval</Src>.</li>
      </ul>
      <p>
        If you can answer all eight, the unknowns left are engineering ones. If you cannot answer the first four,
        the estimate is not ready, whatever the code looks like.
      </p>

      <h2>Canada</h2>
      <p>
        Canadian markets do not fit these tables. A national feed from CREA sits beside board-level IDX and VOW
        programs, with different rules and fees. See{' '}
        <Link href="/blog/mls-data-access-canada">MLS data access in Canada</Link> for that side of the border.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Do all MLSs use the same data platform?', answer: ['No. Among the 15 US MLSs compared here, several deliver through MLS Grid, whose documentation ', ['names every originating system it carries', GRID_V2], ', others through Trestle or Bridge Interactive, and several run their own API. Stellar MLS offers ', ['both MLS Grid and Bridge API', STELLAR_API], '.'] },
        { question: 'Can a software vendor license MLS data without a broker?', answer: ['Rarely. Stellar MLS requires ', ['a three-party agreement between the broker, the vendor and Stellar MLS', STELLAR], ', and Trestle says the MLSs it serves ', ['typically require a real estate broker or agent to ratify the contract', TRESTLE_FAQ], '. Plan on having at least one member broker as a client in each market.'] },
        { question: 'Which MLSs publish their data license fees?', answer: ['Of the 15 here, ten publish at least some fees, including NTREIS at ', ['$36 per client per month for vendors, capped at $2,400', NTREIS], ', and MLS PIN at ', ['$525 per month for vendors', MLSPIN], '. Bright MLS, MRED, OneKey MLS, NWMLS and Realcomp did not publish fees on the pages we could read on October 12, 2026.'] },
        { question: 'Does one MLS Grid or Trestle account cover every MLS on the platform?', answer: ['One account and one API, but not one approval. On MLS Grid a broker gets ', ['data only from the MLS where it holds participatory rights', GRID_FAQ], ', and on Trestle each connection has ', ['its own MLS license fee, which varies greatly by market', TRESTLE_FAQ], '.'] },
        { question: 'How do I find out which MLS covers a city?', answer: ['Ask the broker you are building for which MLS they participate in, then confirm on that MLS’s site. RESO counts ', ['484 functioning MLS systems in the United States', RESO_MAP], ' and links a list of certified organizations from its certification and MLS map page.'] },
      ]} />

      <p className="cp-note">
        All figures and rules were read from the linked pages on October 12, 2026. Member counts are quoted as
        each organization states them and are not comparable with each other. Fees, platforms and rules change,
        and several MLSs publish only part of their schedule: your license and the MLS&apos;s current page decide.
        HAR, Georgia MLS and Canopy MLS are left out because their pages could not be read that day.
      </p>
      <p>
        Adding a market to an existing product, or starting with several at once? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
