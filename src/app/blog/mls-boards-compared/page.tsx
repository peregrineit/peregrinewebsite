import type { ReactNode } from 'react';
import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import GuideFigure from '../../components/GuideFigure';

const SLUG = 'mls-boards-compared';
export const metadata = guideMetadata(SLUG);

// A reference, not a ranking: the 15 boards are in alphabetical order throughout.
// Every source below was fetched and read on 2026-10-12 (first for publication, then again for the
// reference revision the same day); the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-mls-boards-compared.md. Bright MLS, OneKey MLS and MIAMI pages render
// with scripts or refuse plain requests, so they were read in a browser that day.
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
const RESO_MAP = 'https://www.reso.org/certification/';

const CHECKED = 'October 12, 2026';

type ProfileProps = {
  id: string;
  name: string;
  serves: ReactNode;
  delivery: ReactNode;
  feeds: ReactNode;
  license: ReactNode;
  start: ReactNode;
  pages: ReactNode;
};

/** One board, always the same six lines in the same order. */
function Profile({ id, name, serves, delivery, feeds, license, start, pages }: ProfileProps) {
  return (
    <>
      <h3 id={id}>{name}</h3>
      <ul>
        <li><strong>Serves:</strong> {serves}</li>
        <li><strong>Data delivery:</strong> {delivery}</li>
        <li><strong>Feed types named:</strong> {feeds}</li>
        <li><strong>Who may license:</strong> {license}</li>
        <li><strong>Application starts:</strong> {start}</li>
        <li><strong>Checked:</strong> {CHECKED}. Pages read: {pages}.</li>
      </ul>
    </>
  );
}

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>What this reference covers</h2>
      <p>
        This page records how 15 US multiple listing services hand out listing data to brokers and software
        vendors: who each one serves, which platform delivers its data, the feed types it names, who may hold
        a license, the fees it publishes and where an application starts. Each statement is taken from the
        MLS&apos;s own site, or from the documentation of the platform that delivers its data, as read on{' '}
        {CHECKED}, and links to the page it came from.
      </p>
      <p>
        The boards are listed in alphabetical order everywhere on this page. The order is not a ranking, and
        the page does not recommend one board, platform or vendor over another: a brokerage does not choose its
        MLS, its market does. &ldquo;Not published&rdquo; means the pages we could read do not say; it does not
        mean free, and it does not mean there is no rule. For the approval process itself, see{' '}
        <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>.
      </p>

      <GuideFigure

        slug="mls-boards-compared"

        alt="Five data platforms and the MLSs delivered through each. MLS Grid: Stellar MLS, MRED, OneKey MLS, NWMLS, NorthstarMLS. Trestle: CRMLS, NTREIS, MIAMI MLS. Bridge Interactive: Stellar MLS, MIAMI MLS, FMLS, REcolorado. Spark: ARMLS. Its own API: Bright MLS, MLS PIN, Realcomp, Metro MLS."

        caption="Data delivery platform for each of the 15 MLSs, as each MLS's own site states it. Stellar MLS and MIAMI MLS appear under two platforms."

      />


      <h2>Index: the 15 boards and how each delivers data</h2>
      <p>
        Alphabetical. Sizes are quoted as each organization states them, and they do not count the same thing:
        some count subscribers, some REALTOR members, some all professionals served. Each name links to its
        profile below.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>MLS</th><th>Region, as it states</th><th>Size, as it states</th><th>Delivery platform</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong><a href="#armls">ARMLS</a></strong></td>
              <td>Arizona</td>
              <td>Not stated on the pages read</td>
              <td><Src href={ARMLS_API}>Spark and RESO Web API; ARMLS issues API keys directly</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#bright-mls">Bright MLS</a></strong></td>
              <td><Src href={BRIGHT_ABOUT}>The Mid-Atlantic</Src></td>
              <td><Src href={BRIGHT_ABOUT}>100,000+ real estate professionals</Src></td>
              <td>Its own <Src href={BRIGHT_DEV}>RESO Web API; RETS is still available to vendors</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#crmls">CRMLS</a></strong></td>
              <td>California</td>
              <td><Src href={CRMLS_ABOUT}>more than 93,000 real estate professionals from 39 associations, boards and MLS organizations</Src></td>
              <td><Src href={CRMLS_IDX}>Trestle, for a RESO API or RETS feed</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#fmls">FMLS</a></strong> (First Multiple Listing Service)</td>
              <td><Src href={FMLS_ABOUT}>Georgia and the Southeast</Src></td>
              <td><Src href={FMLS_ABOUT}>over 57,000 real estate professionals and REALTORS</Src></td>
              <td><Src href={FMLS_DATA}>Bridge Interactive: Bridge API, RESO Web API or vRETS</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#metro-mls">Metro MLS</a></strong></td>
              <td>Wisconsin</td>
              <td><Src href={METRO_ABOUT}>more than 9,000 members</Src></td>
              <td>Its own <Src href={METRO}>RETS or Web API; it says RETS will be sunset soon</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#miami-mls">MIAMI MLS</a></strong> (MIAMI Association of REALTORS)</td>
              <td><Src href={MIAMI_ABOUT}>South Florida</Src></td>
              <td>The association <Src href={MIAMI_ABOUT}>represents over 60,000 real estate professionals</Src></td>
              <td><Src href={MIAMI_IDX}>Trestle (head brokers and vendors) and Bridge API (brokers, agents and vendors)</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#mls-pin">MLS PIN</a></strong></td>
              <td><Src href={MLSPIN_ABOUT}>Massachusetts, Rhode Island and much of New Hampshire</Src></td>
              <td><Src href={MLSPIN_ABOUT}>over 37,050 real estate professionals</Src></td>
              <td>Its own <Src href={MLSPIN}>RESO Web API (Core 2.0.0 certified, Data Dictionary 1.7)</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#mred">MRED</a></strong> (Midwest Real Estate Data)</td>
              <td><Src href={MRED_BOOK}>Northern Illinois at the start, now more than one state</Src></td>
              <td>Not stated on the pages read</td>
              <td><Src href={MRED_GRID}>MLS Grid, which MRED says it was the first MLS to launch</Src>, for IDX; <Src href={MRED_DATA}>MRED directly for other uses</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#northstarmls">NorthstarMLS</a></strong></td>
              <td><Src href={NS_ABOUT}>Minnesota and the Upper Midwest</Src></td>
              <td><Src href={NS_ABOUT}>more than 22,000 real estate professionals</Src></td>
              <td><Src href={NS_DATA}>MLS Grid</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#ntreis">NTREIS</a></strong></td>
              <td><Src href={NTREIS}>Texas, Louisiana and beyond</Src></td>
              <td><Src href={NTREIS}>53,000+ real estate professionals</Src></td>
              <td><Src href={NTREIS}>Trestle</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#nwmls">NWMLS</a></strong></td>
              <td><Src href={NWMLS}>Washington state and Oregon</Src></td>
              <td><Src href={NWMLS}>30,000+ brokers in more than 2,500 member offices</Src></td>
              <td><Src href={GRID_V2}>MLS Grid</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#onekey-mls">OneKey MLS</a></strong></td>
              <td><Src href={ONEKEY}>Long Island, Hudson Valley, Manhattan, parts of Connecticut and New Jersey</Src></td>
              <td><Src href={ONEKEY}>more than 43,000 REALTORS</Src></td>
              <td><Src href={GRID_V2}>MLS Grid</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#realcomp">Realcomp</a></strong></td>
              <td>Michigan</td>
              <td><Src href={RC_ABOUT}>more than 16,000 REALTORS in more than 2,600 offices</Src></td>
              <td>Its own <Src href={RC_IDX}>API, through an account Realcomp creates</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#recolorado">REcolorado</a></strong></td>
              <td>Colorado</td>
              <td><Src href={RECO_ABOUT}>more than 26,000 real estate professionals</Src></td>
              <td><Src href={RECO_DATA}>Bridge Interactive, which it calls its exclusive data delivery platform</Src></td>
            </tr>
            <tr>
              <td><strong><a href="#stellar-mls">Stellar MLS</a></strong></td>
              <td><Src href={STELLAR_ABOUT}>Florida and Puerto Rico</Src></td>
              <td><Src href={STELLAR_ABOUT}>80,000+ real estate professionals</Src></td>
              <td><Src href={STELLAR_API}>MLS Grid and Bridge API</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Counted by platform: five of the 15 deliver through MLS Grid, three through Trestle, four through Bridge
        Interactive (two of them alongside another platform), and five issue API access themselves.
      </p>
      <p>
        Three more names you may expect are missing. The sites of HAR (Houston) and Georgia MLS did not load for
        us on the day we checked, so they have no entry. Canopy MLS appears in{' '}
        <Src href={GRID_V2}>MLS Grid&apos;s list of originating systems</Src>, which is the only fact about it we
        could verify.
      </p>

      <h2>Board profiles</h2>
      <p>
        Each profile has the same six lines in the same order: who the MLS serves, how its data is delivered,
        the feed types it names, who may license, where the application starts, and the date and pages checked.
        Published fees are in one table after the profiles.
      </p>

      <Profile
        id="armls"
        name="ARMLS (Arizona Regional Multiple Listing Service)"
        serves={<>Arizona; the organization is based in Tempe. The pages we read do not state a subscriber count.</>}
        delivery={<>The <Src href={ARMLS_API}>Spark API and RESO Web API</Src>. ARMLS <Src href={ARMLS_API}>issues API keys directly to developers</Src> and <Src href={ARMLS_API}>shut its RETS feeds off on December 15, 2023</Src>. It says the APIs <Src href={ARMLS_API}>support live queries passed straight through to a website or app</Src>.</>}
        feeds={<><Src href={ARMLS}>IDX, VOW, company back-office application, and brokerage listings only</Src>. Back-office data <Src href={ARMLS}>must not be displayed publicly</Src>, and ARMLS treats automated valuation models as back-office tools.</>}
        license={<>Participants (broker-owners or brokerage principals) are entitled to a feed of their own listings. Other broker feeds <Src href={ARMLS}>must be tied to an active ARMLS subscriber</Src> and used under broker control; the subscriber or a consultant may submit the request. Vendors apply separately, and a consultant who supports several subscribers is pointed to <Src href={ARMLS}>preferred vendor status, which allows one feed across multiple clients</Src>.</>}
        start={<>The <Src href={ARMLS}>broker feed intake form or the vendor intake form</Src> on its data feeds page.</>}
        pages={<><Src href={ARMLS}>data feeds and vendor information</Src>, <Src href={ARMLS_API}>RETS to API</Src></>}
      />

      <Profile
        id="bright-mls"
        name="Bright MLS"
        serves={<><Src href={BRIGHT_ABOUT}>100,000+ real estate professionals across the Mid-Atlantic</Src>. Bright says it was <Src href={BRIGHT_ABOUT}>founded in 2015 through the merger of 43 real estate associations</Src>.</>}
        delivery={<>Its own RESO Web API, which Bright calls <Src href={BRIGHT_DEV}>the preferred method over the legacy RETS transport</Src>. Both <Src href={BRIGHT_DEV}>are available to vendors and may be used concurrently</Src>. It states <Src href={BRIGHT_DEV}>RESO Data Dictionary 1.6 Platinum certification</Src>.</>}
        feeds={<><Src href={BRIGHT_DEV}>IDX and VOW websites; other use cases are considered by request</Src>.</>}
        license={<><Src href={BRIGHT_DEV}>Agents and brokerages are offered the data license</Src>; the API is available to vendors.</>}
        start={<>Its <Src href={BRIGHT_DEV}>developers page</Src>, which points to a developer portal and a contact form.</>}
        pages={<><Src href={BRIGHT_ABOUT}>about</Src>, <Src href={BRIGHT_DEV}>developers</Src> (both in a browser)</>}
      />

      <Profile
        id="crmls"
        name="CRMLS (California Regional Multiple Listing Service)"
        serves={<>California: <Src href={CRMLS_ABOUT}>more than 93,000 real estate professionals from 39 associations, boards and MLS organizations</Src>.</>}
        delivery={<><Src href={CRMLS_IDX}>Trestle, for a RESO API feed or a RETS feed</Src>, which CRMLS describes as a raw data connection between a website and CRMLS. It also generates <Src href={CRMLS_IDX}>frameable IDX links at no additional cost to its users</Src>.</>}
        feeds={<>Frameable links, an IDX feed and a broker feed, which <Src href={CRMLS_IDX}>carries listing information tied to the broker&apos;s office</Src>. IDX data <Src href={CRMLS_IDX}>contains all CRMLS and data share listings</Src>.</>}
        license={<><Src href={CRMLS_IDX}>Brokers or vendors, under a data licensing agreement with CRMLS</Src>. A developer working for one broker is <Src href={CRMLS_IDX}>treated as a general IDX vendor request</Src>.</>}
        start={<><Src href={CRMLS_IDX}>Trestle&apos;s subscription wizard</Src>.</>}
        pages={<><Src href={CRMLS_ABOUT}>about</Src>, <Src href={CRMLS_IDX}>IDX resources</Src></>}
      />

      <Profile
        id="fmls"
        name="FMLS (First Multiple Listing Service)"
        serves={<>Georgia and the Southeast: <Src href={FMLS_ABOUT}>over 57,000 real estate professionals and REALTORS</Src>. FMLS says it was <Src href={FMLS_ABOUT}>founded in 1957 by a group of brokers</Src>.</>}
        delivery={<><Src href={FMLS_DATA}>Bridge Interactive, by the Bridge API, the RESO Web API or vRETS (a RETS emulator)</Src>. FMLS says fields outside the RESO Data Dictionary <Src href={FMLS_DATA}>carry an FMLS_ prefix in the Bridge feed</Src>.</>}
        feeds={<>Not listed by type. Each use is entered as a product in <Src href={FMLS_DATA}>FMLS Marketplace, which approves and manages all third-party data access</Src>.</>}
        license={<>Third-party vendors, and <Src href={FMLS_DATA}>member brokerages for their own brokerage products</Src>.</>}
        start={<>An <Src href={FMLS_DATA}>FMLS Marketplace account, then a data request in Bridge</Src>. After development the product is submitted in Marketplace; FMLS gives a <Src href={FMLS_DATA}>typical review turnaround of 2 business days</Src>.</>}
        pages={<><Src href={FMLS_ABOUT}>about</Src>, <Src href={FMLS_DATA}>Marketplace information</Src>, <Src href={FMLS_PRICE}>fee exhibit</Src></>}
      />

      <Profile
        id="metro-mls"
        name="Metro MLS"
        serves={<>Wisconsin: <Src href={METRO_ABOUT}>more than 9,000 members and eight Realtor associations</Src>.</>}
        delivery={<>Its own <Src href={METRO}>RETS or Web API</Src>. Metro MLS advises licensees to use the Web API <Src href={METRO}>because RETS will be sunset soon</Src>.</>}
        feeds={<><Src href={METRO}>IDX, VOW, brokerage back-office application, automated valuation, and brokerage listings only</Src>. IDX and VOW each come as two feeds: Metro MLS, and WiREx with <Src href={METRO}>listings from the seven Wisconsin MLSs in that program</Src>.</>}
        license={<>Participants (broker-owners or brokerage principals). Subscribers who are not participants <Src href={METRO}>are not eligible for a direct feed, except for a VOW</Src>, and may otherwise only frame their participant&apos;s site or a named public search. Vendors <Src href={METRO}>apply on the participant&apos;s behalf, and fees are billed to the participant</Src>.</>}
        start={<>The <Src href={METRO}>participant feed web application</Src>; Metro MLS says other forms of application are rejected.</>}
        pages={<><Src href={METRO_ABOUT}>about</Src>, <Src href={METRO}>participant data feed information</Src></>}
      />

      <Profile
        id="miami-mls"
        name="MIAMI MLS (MIAMI Association of REALTORS)"
        serves={<>South Florida. The association <Src href={MIAMI_ABOUT}>represents over 60,000 real estate professionals</Src>.</>}
        delivery={<><Src href={MIAMI_IDX}>Trestle, for head brokers and vendors, and the Bridge API, for brokers, agents and vendors</Src>. Members can also use a <Src href={MIAMI_IDX}>no-cost frameable link</Src>.</>}
        feeds={<>The frameable link, an IDX feed, and <Src href={MIAMI_IDX}>IDX Plus, back office and VOW feeds</Src>.</>}
        license={<>Head brokers and vendors on Trestle; brokers, agents and vendors on Bridge. An agent with an in-house or private vendor <Src href={MIAMI_IDX}>can apply for a courtesy IDX feed by API</Src>.</>}
        start={<><Src href={MIAMI_IDX}>A vendor invitation requested by email from MIAMI&apos;s IDX department for Bridge, or Trestle&apos;s application</Src>.</>}
        pages={<><Src href={MIAMI_ABOUT}>about</Src>, <Src href={MIAMI_IDX}>IDX services</Src>, <Src href={MIAMI_PRICE}>IDX and API pricing</Src> (all in a browser)</>}
      />

      <Profile
        id="mls-pin"
        name="MLS PIN (MLS Property Information Network)"
        serves={<>New England: its about page cites <Src href={MLSPIN_ABOUT}>public records for all of Massachusetts and Rhode Island and much of New Hampshire</Src> and <Src href={MLSPIN_ABOUT}>a subscriber base of over 37,050 real estate professionals</Src>.</>}
        delivery={<>Its own <Src href={MLSPIN}>RESO Web API server, Core 2.0.0 certified, with Data Dictionary 1.7</Src>.</>}
        feeds={<><Src href={MLSPIN}>Free IDX links and a free manual IDX download; brokerage access; vendor or third-party access; syndicator access</Src>.</>}
        license={<>Brokerages, with an agreement <Src href={MLSPIN}>signed by the broker of record</Src>; vendors, under a vendor data access agreement; and syndicators that run a public portal and <Src href={MLSPIN}>display brokers&apos; opted-in data for free</Src>.</>}
        start={<>An <Src href={MLSPIN}>agreement and application obtained from MLS PIN data services</Src>, by email or phone.</>}
        pages={<><Src href={MLSPIN_ABOUT}>about</Src>, <Src href={MLSPIN}>data services</Src></>}
      />

      <Profile
        id="mred"
        name="MRED (Midwest Real Estate Data)"
        serves={<><Src href={MRED_BOOK}>Northern Illinois at the start, and now more than one state</Src>. The pages we read do not state a subscriber count.</>}
        delivery={<>MLS Grid for IDX: MRED is a founding member and says it was <Src href={MRED_GRID}>the first MLS to launch the platform</Src>. Other data uses go through MRED directly. MRED says it is <Src href={MRED_DATA}>transitioning from RETS to Web API</Src>.</>}
        feeds={<><Src href={MRED_DATA}>IDX, VOW, broker back office, My Listings and My Private Listings</Src>. MRED puts participation in its IDX program at <Src href={MRED_DATA}>about 99.5% of all companies and listings</Src>, which is why a VOW can show listings an IDX site cannot.</>}
        license={<><Src href={MRED_DATA}>MRED brokerages, managing brokers, brokers (agents), and vendors who have one of them as a customer</Src>.</>}
        start={<><Src href={MRED_DATA}>MLSGrid.com for IDX; MRED&apos;s orders desk by email for all other data uses</Src>.</>}
        pages={<><Src href={MRED_DATA}>IDX and VOW data delivery</Src>, <Src href={MRED_GRID}>the MLS Grid</Src>, <Src href={MRED_BOOK}>2026 Little Book of MRED (PDF)</Src></>}
      />

      <Profile
        id="northstarmls"
        name="NorthstarMLS (Regional Multiple Listing Service of Minnesota)"
        serves={<>Minnesota and the Upper Midwest: <Src href={NS_ABOUT}>more than 22,000 real estate professionals</Src>.</>}
        delivery={<><Src href={NS_DATA}>The MLS Grid Web API; new accounts are set up through MLS Grid</Src>.</>}
        feeds={<><Src href={NS_DATA}>IDX, VOW and back office</Src>. Its examples of third-party use are statistics tools, showing scheduling and accounting software.</>}
        license={<>Vendors and participants. For uses other than IDX or VOW, <Src href={NS_DATA}>NorthstarMLS reviews the request and licenses only to the extent the agreement permits</Src>.</>}
        start={<><Src href={NS_DATA}>MLS Grid</Src>, which also bills the monthly access fee.</>}
        pages={<><Src href={NS_ABOUT}>about</Src>, <Src href={NS_DATA}>third-party data usage</Src></>}
      />

      <Profile
        id="ntreis"
        name="NTREIS (North Texas Real Estate Information Systems)"
        serves={<><Src href={NTREIS}>53,000+ real estate professionals across Texas, Louisiana and beyond</Src>.</>}
        delivery={<><Src href={NTREIS}>Trestle</Src>.</>}
        feeds={<><Src href={NTREIS}>Consumer display (IDX and VOW), back-office systems such as CMA or CRM, analytics, marketing, and licensing brokers their own data back</Src>.</>}
        license={<><Src href={NTREIS}>Vendors, brokers, and agents seeking an IDX or VOW feed</Src>. For back-office access the participant <Src href={NTREIS}>completes a data access agreement before credentials are issued</Src>.</>}
        start={<><Src href={NTREIS}>Trestle&apos;s subscription wizard, or NTREIS data services by email</Src>. A site submitted for approval must be open to review, applications with AI features <Src href={NTREIS}>may require additional review</Src>, and approved IDX and VOW sites are expected to be <Src href={NTREIS}>live and compliant within two weeks of approval</Src>.</>}
        pages={<><Src href={NTREIS}>data</Src></>}
      />

      <Profile
        id="nwmls"
        name="NWMLS (Northwest Multiple Listing Service)"
        serves={<>Washington state and Oregon: <Src href={NWMLS}>a broker-owned, not-for-profit organization with more than 2,500 member offices and 30,000+ brokers</Src>.</>}
        delivery={<>MLS Grid, whose documentation <Src href={GRID_V2}>lists Northwest MLS among its originating systems</Src>.</>}
        feeds={<>Not published on the pages read. We found no public data licensing page on its site.</>}
        license={<>Not published on the pages read.</>}
        start={<><Src href={GRID_DOCS}>An MLS Grid data consumer account</Src>.</>}
        pages={<><Src href={NWMLS}>about</Src>, <Src href={GRID_V2}>MLS Grid API documentation</Src></>}
      />

      <Profile
        id="onekey-mls"
        name="OneKey MLS"
        serves={<><Src href={ONEKEY}>More than 43,000 REALTORS across Long Island, Hudson Valley, Manhattan, and parts of Connecticut and New Jersey</Src>. It is <Src href={ONEKEY}>owned and operated by the Long Island Board of REALTORS and the Hudson Gateway Association of REALTORS</Src>.</>}
        delivery={<>MLS Grid, whose documentation <Src href={GRID_V2}>lists OneKey MLS among its originating systems</Src>.</>}
        feeds={<>Not published on the pages read.</>}
        license={<>Not published on the pages read.</>}
        start={<><Src href={GRID_DOCS}>An MLS Grid data consumer account</Src>.</>}
        pages={<><Src href={ONEKEY}>about</Src> (in a browser), <Src href={GRID_V2}>MLS Grid API documentation</Src></>}
      />

      <Profile
        id="realcomp"
        name="Realcomp"
        serves={<>Michigan: <Src href={RC_ABOUT}>more than 16,000 REALTORS affiliated with more than 2,600 offices</Src>.</>}
        delivery={<>Its own API: raw data goes to an IDX consultant <Src href={RC_IDX}>through a data access account created by Realcomp</Src>, and data layouts are read from the API metadata. A pre-made framed search is the alternative.</>}
        feeds={<>Framed IDX search, <Src href={RC_IDXSVC}>IDX data, VOW, and back office data for brokers</Src>.</>}
        license={<><Src href={RC_IDX}>Brokers and agents who are full subscribers to Realcomp</Src>. Whoever downloads and programs with the data signs the contract&apos;s IDX consultant form, and <Src href={RC_IDX}>only the IDX consultant receives the account credentials</Src>.</>}
        start={<>The <Src href={RC_IDXSVC}>IDX contract on its IDX service page</Src>, after reading its IDX rules. Realcomp says its IDX department <Src href={RC_IDX}>responds to IDX and VOW approval requests within 1 business day</Src>.</>}
        pages={<><Src href={RC_ABOUT}>about</Src>, <Src href={RC_IDX}>IDX for Realcomp customers</Src>, <Src href={RC_IDXSVC}>IDX service</Src></>}
      />

      <Profile
        id="recolorado"
        name="REcolorado"
        serves={<>Colorado: <Src href={RECO_ABOUT}>more than 26,000 real estate professionals</Src>.</>}
        delivery={<><Src href={RECO_DATA}>Bridge Interactive, its exclusive data delivery platform for all new data customers</Src>. MLS Grid&apos;s documentation still <Src href={GRID_V2}>lists REcolorado among its originating systems</Src>.</>}
        feeds={<><Src href={RECO_DATA}>IDX, back office, VOW, and participant data access (PDAP)</Src>. REcolorado grants <Src href={RECO_DATA}>one data feed per application, except that one back office feed may support several approved uses</Src>.</>}
        license={<>Vendors apply directly in Bridge. A PDAP feed needs <Src href={RECO_DATA}>a three-party agreement executed by the office&apos;s participant that includes the vendor</Src>.</>}
        start={<>A <Src href={RECO_DATA}>Bridge account, an application describing the product, then a data access request</Src>; REcolorado reviews it and supplies the license agreement and questionnaire that fit the use.</>}
        pages={<><Src href={RECO_ABOUT}>about</Src>, <Src href={RECO_DATA}>data</Src>, <Src href={RECO_FEES}>participant pricing schedule (PDF)</Src></>}
      />

      <Profile
        id="stellar-mls"
        name="Stellar MLS"
        serves={<><Src href={STELLAR_ABOUT}>80,000+ real estate professionals, through 19 association partnerships across Florida and Puerto Rico</Src>.</>}
        delivery={<>For IDX, <Src href={STELLAR_API}>two API options: MLS Grid and Bridge API</Src>.</>}
        feeds={<>IDX, plus <Src href={STELLAR}>firm internal use (broker back office), broker data release, VOW and vendor product</Src>. Firm internal use and VOW applications <Src href={STELLAR}>must sit behind a login</Src>.</>}
        license={<><Src href={STELLAR}>A three-party agreement between the broker, the vendor and Stellar MLS</Src>, one per broker. A vendor product needs <Src href={STELLAR}>at least one Stellar MLS broker as an active client</Src> and <Src href={STELLAR}>a quarterly list of shared clients</Src>. A broker data release is for brokers only.</>}
        start={<>The <Src href={STELLAR}>data delivery questionnaire</Src>, or MLS Grid registration for IDX. Applicants must be able to <Src href={STELLAR}>demonstrate a working product; a sample data set is offered during development</Src>.</>}
        pages={<><Src href={STELLAR_ABOUT}>about</Src>, <Src href={STELLAR}>data delivery</Src>, <Src href={STELLAR_API}>API options</Src></>}
      />

      <h2>Published license fees, board by board</h2>
      {/* TODO(owner): vendor disclosure */}
      <p>
        These are each MLS&apos;s own published charges, in US dollars, as read on {CHECKED}. Each MLS charges
        in its own unit (per feed, per office, per client, per product, per website or a flat amount), so the
        rows record what each one publishes and are not a like-for-like price list. Several MLSs publish only
        part of their schedule, and five publish none on the pages we could read.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>MLS</th><th>Published fees, as the MLS states them</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ARMLS</strong></td>
              <td>Broker: <Src href={ARMLS}>five free IDX or back office feeds, then $150 per month per feed</Src>; a feed of the brokerage&apos;s own listings is free. Vendor: <Src href={ARMLS}>typically $1,000 to $1,500 per product per month</Src></td>
            </tr>
            <tr>
              <td><strong>Bright MLS</strong></td>
              <td>Not published</td>
            </tr>
            <tr>
              <td><strong>CRMLS</strong></td>
              <td><Src href={CRMLS_IDX}>Two feeds for a broker at no charge</Src>. For vendors and developers, <Src href={CRMLS_IDX}>$7 per website URL per month, first two URLs included</Src>. CRMLS also quotes Trestle&apos;s own service fee: <Src href={CRMLS_IDX}>$85 per month for an IDX feed and $25 for a broker feed</Src></td>
            </tr>
            <tr>
              <td><strong>FMLS</strong></td>
              <td><Src href={FMLS_DATA}>$250 application fee, waived for member brokerages</Src>. Monthly fee per subscribed member: <Src href={FMLS_PRICE}>first two free, $22 each for the 3rd to 10th, falling by tier to $0.10</Src></td>
            </tr>
            <tr>
              <td><strong>Metro MLS</strong></td>
              <td><Src href={METRO}>$300 one-time per new feed</Src>. Monthly: <Src href={METRO}>IDX $15, VOW $30, back office $50 to $100</Src>, charged on the first ten offices only; own listings free</td>
            </tr>
            <tr>
              <td><strong>MIAMI MLS</strong></td>
              <td>Agent or broker IDX feed: <Src href={MIAMI_PRICE}>free, one feed only</Src>. Vendor IDX Plus: <Src href={MIAMI_PRICE}>$1,310 a year for 1 to 10 clients, rising by tier to $102,375</Src>. Vendor VOW or back office: <Src href={MIAMI_PRICE}>from $1,703 a year</Src>. MIAMI also quotes Trestle at <Src href={MIAMI_PRICE}>$85 per month per feed for vendors</Src> and <Src href={MIAMI_IDX}>no additional service fees from Bridge</Src></td>
            </tr>
            <tr>
              <td><strong>MLS PIN</strong></td>
              <td>Brokerage: <Src href={MLSPIN}>$100 per month, branch offices included</Src>. Vendor: <Src href={MLSPIN}>$525 per month, whatever the number of subscribers</Src></td>
            </tr>
            <tr>
              <td><strong>MRED</strong></td>
              <td>Not published</td>
            </tr>
            <tr>
              <td><strong>NorthstarMLS</strong></td>
              <td>New vendors: <Src href={NS_DATA}>$1,000 development fee and $500 startup fee, once</Src>. Then <Src href={NS_DATA}>$125 per month for one user, up to $500 for 101 or more</Src></td>
            </tr>
            <tr>
              <td><strong>NTREIS</strong></td>
              <td>Vendors: <Src href={NTREIS}>$500 one-time setup, then $36 per client per month, capped at $2,400</Src>. <Src href={NTREIS}>Brokers are not charged</Src> for IDX, VOW or their own back office feed</td>
            </tr>
            <tr>
              <td><strong>NWMLS</strong></td>
              <td>Not published</td>
            </tr>
            <tr>
              <td><strong>OneKey MLS</strong></td>
              <td>Not published</td>
            </tr>
            <tr>
              <td><strong>Realcomp</strong></td>
              <td>Not published on the pages read</td>
            </tr>
            <tr>
              <td><strong>REcolorado</strong></td>
              <td>Its schedule lists <Src href={RECO_FEES}>IDX at $500 to establish and $150 per month; VOW at $1,500 and $500 per month</Src>. The data page says to ask its licensing team for pricing</td>
            </tr>
            <tr>
              <td><strong>Stellar MLS</strong></td>
              <td>Firm internal use or VOW: <Src href={STELLAR}>$450 per office per year, capped at $7,500</Src>. Vendor product: <Src href={STELLAR}>$7,500 per product per year, $2,500 for each additional product</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        A delivery platform may bill separately from the MLS. Trestle publishes{' '}
        <Src href={TRESTLE_PRICE}>its own per-connection fee schedule</Src> and shows{' '}
        <Src href={TRESTLE_FAQ}>the fees for a connection before you activate it</Src>; go by that figure. MLS
        Grid says you <Src href={GRID_FAQ}>only pay the license fee required by your MLS</Src>, which it collects
        on the MLS&apos;s behalf. To total the published fees for the boards in your own plan, use the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link>.
      </p>

      <h2>What recurs across the profiles</h2>
      <p>
        <strong>A vendor is rarely licensed alone.</strong> Stellar MLS, MRED, Realcomp and Metro MLS all tie a
        vendor&apos;s feed to a member broker or agent. Trestle says the same of the MLSs it serves:{' '}
        <Src href={TRESTLE_FAQ}>they typically require a real estate broker or agent to ratify the contract, or a periodic report of which members use the service</Src>.
      </p>
      <p>
        <strong>One connector can cover several boards, or only one.</strong> MLS Grid has{' '}
        <Src href={GRID_FAQ}>one standard license agreement for IDX, VOW and back office products</Src>, and its
        documentation lists <Src href={GRID_V2}>37 originating systems</Src> behind one API. Trestle says
        it carries data from <Src href={TRESTLE_FAQ}>over 90 multiple listing organizations</Src>. So MRED,
        NorthstarMLS, NWMLS, OneKey MLS and Stellar MLS share a connector, and CRMLS, MIAMI MLS and NTREIS share
        another. ARMLS, Bright MLS, Metro MLS, MLS PIN and Realcomp each need their own. Each board is still
        approved, licensed and billed one at a time: MLS Grid gives a broker{' '}
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
        and a pipeline that ingests from the four MLS systems and normalizes their schemas. In the profiles above
        those four arrive over Trestle, MLS Grid or Bridge, Spark, and Bridge.
      </p>

      <h2>How to find which MLS covers a market</h2>
      <ol>
        <li>
          <strong>Ask the broker first.</strong> Access follows the broker&apos;s participation, so the MLS your
          client belongs to is the one that matters, even where two MLSs overlap. Florida alone has two entries
          on this page.
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
        maps to a line in the profiles or to the fee table.
      </p>
      <ul className="cp-checklist">
        <li><strong>Which MLS, and which broker?</strong> Name the participant whose membership the feed will sit under, and who signs.</li>
        <li><strong>Which platform delivers the feed today?</strong> MLS Grid, Trestle, Bridge, Spark or the MLS&apos;s own API, and whether you already have a connector for it.</li>
        <li><strong>Which feed type fits the use?</strong> IDX, VOW, back office or a vendor product. A public search and an internal analytics tool are different licenses at most of these MLSs.</li>
        <li><strong>Who is the licensee?</strong> The broker, the agent or you as vendor, and whether a three-party agreement or a consultant form is required.</li>
        <li><strong>What is the fee unit?</strong> Per feed, per office, per client, per product, per website or flat, plus any setup fee and any platform fee. Work it out at your expected client count.</li>
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
        Canadian markets do not fit these profiles. A national feed from CREA sits beside board-level IDX and VOW
        programs, with different rules and fees. See{' '}
        <Link href="/blog/mls-data-access-canada">MLS data access in Canada</Link> for that side of the border.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Do all MLSs use the same data platform?', answer: ['No. Among the 15 US MLSs profiled here, several deliver through MLS Grid, whose documentation ', ['names every originating system it carries', GRID_V2], ', others through Trestle or Bridge Interactive, and several run their own API. Stellar MLS offers ', ['both MLS Grid and Bridge API', STELLAR_API], '.'] },
        { question: 'Can a software vendor license MLS data without a broker?', answer: ['Rarely. Stellar MLS requires ', ['a three-party agreement between the broker, the vendor and Stellar MLS', STELLAR], ', and Trestle says the MLSs it serves ', ['typically require a real estate broker or agent to ratify the contract', TRESTLE_FAQ], '. Plan on having at least one member broker as a client in each market.'] },
        { question: 'Which MLSs publish their data license fees?', answer: ['Of the 15 here, ten publish at least some fees on their own pages: ARMLS, CRMLS, FMLS, Metro MLS, MIAMI MLS, MLS PIN, NorthstarMLS, NTREIS, REcolorado and Stellar MLS. Bright MLS, MRED, NWMLS, OneKey MLS and Realcomp did not publish fees on the pages we could read on October 12, 2026. For example, NTREIS states its vendor pricing on ', ['its data page', NTREIS], ' and MLS PIN on ', ['its data services page', MLSPIN], '.'] },
        { question: 'Does one MLS Grid or Trestle account cover every MLS on the platform?', answer: ['One account and one API, but not one approval. On MLS Grid a broker gets ', ['data only from the MLS where it holds participatory rights', GRID_FAQ], ', and on Trestle each connection has ', ['its own MLS license fee, which varies greatly by market', TRESTLE_FAQ], '.'] },
        { question: 'How do I find out which MLS covers a city?', answer: ['Ask the broker you are building for which MLS they participate in, then confirm on that MLS’s site. RESO counts ', ['484 functioning MLS systems in the United States', RESO_MAP], ' and links a list of certified organizations from its certification and MLS map page.'] },
      ]} />

      <p className="cp-note">
        All figures and rules were read from the linked pages on {CHECKED}. The boards are in alphabetical
        order, which is not a ranking. Member counts are quoted as each organization states them and do not
        count the same thing. Fees, platforms and rules change, and several MLSs publish only part of their
        schedule: your license and the MLS&apos;s current page decide. HAR, Georgia MLS and Canopy MLS are left
        out because their pages could not be read that day.
      </p>
      <p>
        Adding a market to an existing product, or starting with several at once? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
