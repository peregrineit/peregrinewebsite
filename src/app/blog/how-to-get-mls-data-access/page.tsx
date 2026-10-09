import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'how-to-get-mls-data-access';
export const metadata = guideMetadata(SLUG);

// Sources checked 2026-09-30 on the MLS, NAR, RESO, MLS Grid, Trestle and Bridge pages.
const NAR_IDX = 'https://www.nar.realtor/handbook-on-multiple-listing-policy/advertising-print-and-electronic-section-1-internet-data-exchange-idx-policy-policy-statement-7-58';
const NAR_VOW = 'https://www.nar.realtor/handbook-on-multiple-listing-policy/virtual-office-websites-policy-governing-use-of-mls-data-in-connection-with-internet-brokerage';
const STELLAR = 'https://www.stellarmls.com/data-delivery';
const ARMLS = 'https://armls.com/data-feeds-vendor-info';
const MLSPIN = 'https://www.mlspin.com/resources/data-services';
const NORTHSTAR = 'https://northstarmls.com/third-party-data-usage/';
const RECO = 'https://cdn.recolorado.com/files/data/Participant-Pricing-Schedule.pdf';
// CREA's DDF Policy and Rules, June 2026 revision (replaces the February 2024 PDF cited before).
const CREA = 'https://us.v-cdn.net/6029909/uploads/WCDHHJMCZ480/ddf-28r-29-policy-and-rules-june-2026-eng.pdf';
const MLSGRID_FAQ = 'https://www.mlsgrid.com/faq';
const MLSGRID_GUIDE = 'https://www.mlsgrid.com/s/MLS-Grid-Data-Consumer-Access-Guide.pdf';
const TRESTLE_FAQ = 'https://trestle-documentation.corelogic.com/support/faq/';
const TRESTLE_PRICING = 'https://trestle-documentation.corelogic.com/data-pricing.html';
const BRIDGE_DOCS = 'https://bridgedataoutput.com/docs/platform/';
const ZILLOW_BRIDGE = 'https://www.zillowgroup.com/developers/api/mls-broker-data/mls-listings/';
const RESO_API = 'https://www.reso.org/reso-web-api/';
const RESO_DD = 'https://www.reso.org/data-dictionary/';
const RESO_CERT = 'https://www.reso.org/certification/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        You get MLS data by licensing it from each MLS you need, not from a standards body or a single national source.
        RESO, which publishes the data standards, <Src href={RESO_API}>does not provide MLS data and directs data
        requests to MLSs</Src>. In practice you choose the license type that matches your use, usually find a broker who
        is an MLS member to sponsor or ratify the agreement, apply and pass the MLS&apos;s review, and then receive
        credentials, either directly from the MLS or through a delivery platform such as MLS Grid, Trestle or Bridge.
      </p>

      <h2>Decide which license you need</h2>
      <p>
        MLSs license the same listings under different terms depending on how you will use them. The common categories:
      </p>
      <ul>
        <li><strong>IDX</strong> (Internet Data Exchange) for public listing display on a broker&apos;s website. Under NAR policy, participants <Src href={NAR_IDX}>may not use IDX-provided listings for any purpose other than IDX display</Src>.</li>
        <li><strong>VOW</strong> (virtual office website) for registered consumers who have <Src href={NAR_VOW}>first established a lawful consumer-broker relationship</Src> with the broker; a broker <Src href={NAR_VOW}>may designate an &ldquo;Affiliated VOW Partner&rdquo; to operate a VOW</Src>.</li>
        <li><strong>Broker back-office</strong> or internal use, for CRMs, reporting and analytics. Stellar MLS requires that firm-internal and VOW applications <Src href={STELLAR}>reside behind a login and be non-accessible to the public</Src>.</li>
        <li><strong>Vendor or technology-provider</strong> licenses for companies whose product, used by MLS members, is built on the data. ARMLS describes vendors as companies that <Src href={ARMLS}>create products used by ARMLS subscribers that incorporate ARMLS data</Src>.</li>
      </ul>
      <p>
        The names vary by MLS. Stellar MLS lists <Src href={STELLAR}>Firm Internal Use, Broker Data Release, VOW, Vendor Product and IDX</Src>; MLS PIN offers <Src href={MLSPIN}>broker, vendor/third-party and syndicator access, plus two free IDX options</Src>. Read each MLS&apos;s own data page before you design, because the category decides what you may show, to whom, and what it costs.
      </p>

      <h2>Find a sponsoring broker</h2>
      <p>
        Most MLSs license data to companies that serve their members, so a member broker is usually part of the agreement:
      </p>
      <ul>
        <li>Stellar MLS requires <Src href={STELLAR}>a three-party agreement between the Broker, Vendor, and Stellar MLS</Src> for custom feeds, with <Src href={STELLAR}>an individual agreement for each broker you work with</Src>. A vendor product <Src href={STELLAR}>must be actively working with at least one Broker that belongs to Stellar MLS</Src>.</li>
        <li>At ARMLS, <Src href={ARMLS}>broker data feed requests must be associated with an active ARMLS subscriber</Src>, and <Src href={ARMLS}>all feeds must be used under broker control</Src>.</li>
        <li>Trestle notes that <Src href={TRESTLE_FAQ}>MLOs typically require a real estate broker or agent to ratify the contract</Src>, or a periodic report of which members use your service.</li>
        <li>If you are a brokerage building your own technology, MLS Grid&apos;s access guide says <Src href={MLSGRID_GUIDE}>your brokerage will function as your own &ldquo;Vendor&rdquo;</Src>.</li>
      </ul>

      <h2>Find out how each MLS delivers data</h2>
      <p>Some MLSs deliver feeds themselves; many use a platform. The platform changes the paperwork, not the need for MLS approval.</p>
      <ul>
        <li><strong>MLS Grid</strong> has <Src href={MLSGRID_FAQ}>one standard license agreement</Src> across its feed types. It says <Src href={MLSGRID_FAQ}>you will only pay the license fee required by your MLS</Src>, which MLS Grid collects on the MLS&apos;s behalf, and that <Src href={MLSGRID_FAQ}>participation is at your MLS&apos;s discretion</Src>. NorthstarMLS, for example, requires that <Src href={NORTHSTAR}>VOW or back-office agreements be completed through the MLS Grid</Src>.</li>
        <li><strong>Trestle (Cotality)</strong>: you register and <Src href={TRESTLE_FAQ}>click &ldquo;ADD MLO CONNECTION&rdquo; to begin the data request workflow</Src>. Trestle <Src href={TRESTLE_FAQ}>only facilitates the license agreement; Cotality is not a party to it</Src>.</li>
        <li><strong>Bridge Interactive (Zillow)</strong>: <Src href={BRIDGE_DOCS}>all datasets require approval from the data provider</Src>, which <Src href={BRIDGE_DOCS}>may require license agreements, fees or compliance testing</Src>; every application gets <Src href={BRIDGE_DOCS}>automatic access to a test dataset</Src>. Zillow&apos;s developer page says the platform is <Src href={ZILLOW_BRIDGE}>currently invite only</Src>.</li>
      </ul>

      <h2>Apply and pass the review</h2>
      <p>The steps are similar everywhere: apply, sign, show your product, get approved, receive credentials.</p>
      <ul>
        <li>Stellar MLS asks you to <Src href={STELLAR}>fill out an online questionnaire</Src>, then its Data Delivery team contacts you. You need the <Src href={STELLAR}>ability to demonstrate a fully working application</Src>; <Src href={STELLAR}>sample or demo data is only available in MLS Grid</Src> without prior approval.</li>
        <li>ARMLS runs broker and vendor requests through intake forms that you <Src href={ARMLS}>submit for ARMLS review</Src>.</li>
        <li>MLS Grid&apos;s guide lays out the order: register, choose the MLS, <Src href={MLSGRID_GUIDE}>sign the Data License Agreement</Src>, add your broker or agent customers with a site or staging URL <Src href={MLSGRID_GUIDE}>for MLS review during the approval process</Src>, then pay <Src href={MLSGRID_GUIDE}>upon approval by the MLS</Src> and receive an access token.</li>
        <li>NorthstarMLS <Src href={NORTHSTAR}>reviews the request and, if approved, provides a license</Src>.</li>
      </ul>
      <p className="cp-note">
        None of the MLS or platform pages cited here publish an approval timeline, so ask each MLS how long its review
        usually takes before you commit to a launch date.
      </p>

      <h2>Budget for the fees</h2>
      <p>Fees are set by each MLS, and platforms may add their own. Published examples:</p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Source</th><th>Use</th><th>Published fee</th></tr></thead>
          <tbody>
            <tr><td>Stellar MLS</td><td>Firm internal use; VOW</td><td><Src href={STELLAR}>$450 per office per year, capped at $7,500</Src></td></tr>
            <tr><td>Stellar MLS</td><td>Vendor product</td><td><Src href={STELLAR}>$7,500 per product per year, $2,500 for each additional product</Src></td></tr>
            <tr><td>ARMLS</td><td>Broker IDX and back office</td><td><Src href={ARMLS}>Five free feeds per brokerage; additional feeds $150 per month</Src></td></tr>
            <tr><td>ARMLS</td><td>Vendor product</td><td><Src href={ARMLS}>Typically $1,000 to $1,500 per product per month</Src></td></tr>
            <tr><td>MLS PIN</td><td>Broker; vendor</td><td><Src href={MLSPIN}>$100 per month (broker); $525 per month (vendor)</Src></td></tr>
            <tr><td>NorthstarMLS</td><td>New vendor</td><td><Src href={NORTHSTAR}>One-time $1,000 development fee and $500 startup fee</Src>, then <Src href={NORTHSTAR}>$125 to $500 per month by number of users, billed by MLS Grid</Src></td></tr>
            <tr><td>REcolorado</td><td>IDX content; VOW</td><td><Src href={RECO}>$500 + $150 per month (IDX); $1,500 + $500 per month (VOW)</Src>. The schedule has no effective date; confirm current fees.</td></tr>
            <tr><td>CREA DDF® (Canada)</td><td>Technology provider</td><td>A company must enter <Src href={CREA}>a data access agreement with REALTOR.ca Canada Inc.</Src>; fees are in our <Link href="/blog/mls-data-access-canada">guide to MLS data access in Canada</Link></td></tr>
            <tr><td>Trestle</td><td>Per connection</td><td><Src href={TRESTLE_PRICING}>$30 per month (broker data feeds), $100 per month (other feeds); technology providers $100 to $175 per connection per month</Src>, plus MLS fees</td></tr>
            <tr><td>MLS Grid</td><td>Platform</td><td><Src href={MLSGRID_FAQ}>No platform fee beyond the MLS&apos;s license fee</Src></td></tr>
            <tr><td>Bridge Interactive</td><td>Platform</td><td><Src href={BRIDGE_DOCS}>No additional service fees; MLSs may charge their own</Src></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Our <Link href="/blog/mls-idx-integration-cost">MLS and IDX integration cost guide</Link> compares these fees with IDX
        vendor subscriptions and development costs.
      </p>

      <h2>Build on the RESO standards</h2>
      <p>
        RESO describes the Web API as <Src href={RESO_API}>the modern way to transport data in the real estate industry</Src>,
        and says RETS <Src href={RESO_API}>has been deprecated and is no longer supported</Src>. The RESO Data Dictionary
        standardizes field names, with <Src href={RESO_DD}>more than 1,700 fields and 3,100 lookups</Src>. RESO also{' '}
        <Src href={RESO_CERT}>tests technology systems to confirm compliance with ratified standards</Src>, so an MLS&apos;s
        certification status tells you how closely its feed follows the standard. Building against the Data Dictionary
        makes adding a second or third MLS a mapping exercise rather than a rewrite.
      </p>

      <h2>Stay compliant after launch</h2>
      <ul>
        <li><strong>Refresh:</strong> IDX displays must refresh <Src href={NAR_IDX}>not less frequently than every 12 hours</Src>; VOWs <Src href={NAR_VOW}>not less frequently than every three (3) days</Src>. In Canada, CREA DDF® websites must refresh <Src href={CREA}>at least once every twenty-four (24) hours</Src>.</li>
        <li><strong>Attribution:</strong> an IDX display <Src href={NAR_IDX}>must identify the listing firm, and the email or phone number</Src> provided by the listing participant.</li>
        <li><strong>Monitoring and audits:</strong> participants must <Src href={NAR_IDX}>give the MLS direct access for purposes of monitoring/ensuring compliance</Src>; an MLS may require an <Src href={NAR_VOW}>audit trail of registrants&apos; activity on the VOW</Src>; and Stellar vendor products are <Src href={STELLAR}>subject to routine data audit checks for compliance</Src>.</li>
      </ul>
      <p>
        These rules shape the architecture: sync frequency, where attribution appears, and what you log. Our{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> shows a pipeline built across four
        MLS systems.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Can we get MLS data without a broker?', answer: ['Usually not directly. MLSs license data to companies that serve their members, and many require a member broker to sign or ratify the agreement. Stellar MLS, for example, requires ', ['a three-party agreement between the Broker, Vendor, and Stellar MLS', STELLAR], ', and Trestle notes that ', ['MLOs typically require a real estate broker or agent to ratify the contract', TRESTLE_FAQ], '.'] },
        { question: 'Does RESO provide MLS data?', answer: ['No. RESO publishes the data standards, but ', ['does not provide MLS data and directs data requests to MLSs', RESO_API], '.'] },
        { question: 'Do MLS Grid, Trestle or Bridge charge their own fees?', answer: ['It varies. MLS Grid says ', ['you will only pay the license fee required by your MLS', MLSGRID_FAQ], ', Bridge says it ', ['charges no additional service fees', BRIDGE_DOCS], ', and Trestle charges ', ['$30 to $175 per connection per month depending on the feed and customer', TRESTLE_PRICING], ' on top of MLS fees.'] },
        { question: 'How often must listing data be refreshed?', answer: ['Under NAR policy, IDX displays must refresh ', ['not less frequently than every 12 hours', NAR_IDX], ' and VOWs ', ['not less frequently than every three (3) days', NAR_VOW], '. Individual MLSs can set their own rules, so check each license.'] },
        { question: 'How long does MLS approval take?', answer: ['None of the MLS or platform pages cited in this guide publish an approval timeline. Approval usually involves a review of your application and a working product, for example Stellar MLS asks for the ', ['ability to demonstrate a fully working application', STELLAR], ', so ask each MLS how long its review takes.'] },
      ]} />

      <p className="cp-note">
        Requirements and fees were taken from the linked MLS, NAR, RESO, MLS Grid, Trestle and Bridge pages on September 30,
        2026. On October 9, 2026 the CREA citation was updated to CREA&apos;s June 2026 rules. On that date NAR&apos;s
        policy handbook required a member login and NorthstarMLS&apos;s page could not be reached, so the NAR and
        NorthstarMLS statements are as read on September 30. Policies and fees change and differ by MLS; confirm them
        with each MLS before you apply.
      </p>
      <p>
        Planning an MLS integration? See our <Link href="/services/mls-idx-integration">RESO Web API and MLS data feed
        development service</Link> or <Link href="/contact">talk to an engineer</Link>.
      </p>
    </GuideLayout>
  );
}
