import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'idx-website-features-checklist';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-idx-website-features-checklist.md. NAR's IDX policy page
// required a member login on that date, so display rules are cited from two public rule
// sets instead: MLS Grid's IDX and VOW Rules and San Diego MLS's Rules and Regulations.
// TODO(owner): vendor disclosure. This guide names no IDX vendors and compares none; if a
// vendor comparison is added later, state any commercial relationship here first.
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const GRID_VOW = 'https://www.mlsgrid.com/s/MLS-Grid-VOW-Rules.pdf';
const GRID_DOCS = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const SDMLS = 'https://sdmls.com/wp-content/uploads/2026/07/IDX-Rules-and-Compliance-July-2026.pdf';
const DD_NET_LISTING = 'https://dd.reso.org/DD2.0/Property/InternetEntireListingDisplayYN/';
const DD_NET_ADDRESS = 'https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/';
const DD_NET_AVM = 'https://dd.reso.org/DD2.0/Property/InternetAutomatedValuationDisplayYN/';
const DD_NET_COMMENT = 'https://dd.reso.org/DD2.0/Property/InternetConsumerCommentYN/';
const G = 'https://developers.google.com/search/docs';
const G_JS = `${G}/crawling-indexing/javascript/javascript-seo-basics`;
const G_LINKS = `${G}/crawling-indexing/links-crawlable`;
const G_PAGINATION = `${G}/specialty/ecommerce/pagination-and-incremental-page-loading`;
const G_FACETS = `${G}/crawling-indexing/crawling-managing-faceted-navigation`;
const G_SITEMAP = `${G}/crawling-indexing/sitemaps/build-sitemap`;
const G_STATUS = `${G}/crawling-indexing/http-network-errors`;
const G_CRAWL_BUDGET = `${G}/crawling-indexing/large-site-managing-crawl-budget`;
const G_STRUCTURED = `${G}/appearance/structured-data/intro-structured-data`;
const G_GALLERY = `${G}/appearance/structured-data/search-gallery`;
const G_CANONICAL = `${G}/crawling-indexing/consolidate-duplicate-urls`;
const G_ROBOTS_META = `${G}/crawling-indexing/robots-meta-tag`;
const G_MOBILE = `${G}/crawling-indexing/mobile/mobile-sites-mobile-first-indexing`;
const G_CWV = `${G}/appearance/core-web-vitals`;
const SCHEMA_LISTING = 'https://schema.org/RealEstateListing';
const CASE = '/case-studies/scaling-real-estate-saas-platform';

type Priority = 'Must-have' | 'Should-have' | 'Situational';
type Row = { feature: string; priority: Priority; ask: string; rules: string };
type Group = { serves: string; rows: Row[] };

// The scored checklist. Priorities are our judgment, on the basis stated above the table.
const CHECKLIST: Group[] = [
  {
    serves: 'Home buyer',
    rows: [
      { feature: 'Search filters, including listing status', priority: 'Must-have', ask: 'Which fields can be filtered and sorted, and can we add one without a product release?', rules: 'Yes: fields, result limits' },
      { feature: 'Map search with a drawn boundary', priority: 'Should-have', ask: 'Can a visitor draw an area, and what does the map show for a listing with a withheld address?', rules: 'Yes: withheld addresses' },
      { feature: 'Saved searches and listing alerts', priority: 'Should-have', ask: 'How soon after a listing changes is the alert sent, and what page does it link to?', rules: 'Yes: disclosures' },
      { feature: 'Listing detail pages', priority: 'Must-have', ask: 'On a live detail page for each of our MLSs, where are the listing brokerage, the source MLS and the disclaimer?', rules: 'Yes' },
      { feature: 'Photos served from your own storage', priority: 'Must-have', ask: 'Where are photos stored and served from, and how are changed photos picked up?', rules: 'Yes: media handling' },
      { feature: 'Sold and off-market listings', priority: 'Situational', ask: 'For each of our MLSs, which statuses and sold fields may we show, and how is that set?', rules: 'Yes: differs by MLS' },
      { feature: 'The same content and filters on a phone', priority: 'Must-have', ask: 'Is anything on the desktop layout missing from the phone layout?', rules: 'No' },
      { feature: 'Speed of search and detail pages', priority: 'Must-have', ask: 'What are the Core Web Vitals field figures for an existing customer’s search and detail pages?', rules: 'No' },
    ],
  },
  {
    serves: 'Agent or team',
    rows: [
      { feature: 'Lead capture with configurable registration', priority: 'Must-have', ask: 'Can we set when a visitor is asked to register (never, after some views, on an action), per site?', rules: 'For a VOW; some MLSs' },
      { feature: 'Lead routing', priority: 'Should-have', ask: 'Which routing rules are supported, and what happens to a lead nobody responds to?', rules: 'None found' },
      { feature: 'CRM sync', priority: 'Should-have', ask: 'Which visitor events are sent to the CRM, by webhook or API, and do they carry the listing ID?', rules: 'Partly: license scope' },
      { feature: 'Agent subdomains or sites', priority: 'Situational', ask: 'How is brokerage branding enforced on every agent site, and is each agent’s data isolated?', rules: 'Yes: control and branding' },
      { feature: 'Market reports', priority: 'Situational', ask: 'Which data feeds the reports, and does our license with each MLS allow that use?', rules: 'Yes: license scope' },
    ],
  },
  {
    serves: 'Brokerage',
    rows: [
      { feature: 'Several MLSs in one search', priority: 'Situational', ask: 'Which of our MLSs are live with you today, and how is the source shown on each listing?', rules: 'Yes: source labels' },
      { feature: 'Attribution and disclaimers per MLS', priority: 'Must-have', ask: 'When one of our MLSs changes a display rule, who updates the site and how quickly?', rules: 'Yes' },
      { feature: 'Refresh interval and removals', priority: 'Must-have', ask: 'How often does each feed sync, and where can we see sync lag and removals?', rules: 'Yes: maximum interval' },
      { feature: 'Seller opt-outs', priority: 'Must-have', ask: 'Which fields do you read for listing, address, valuation and comment opt-outs?', rules: 'Yes' },
      { feature: 'Analytics and scraping monitoring', priority: 'Should-have', ask: 'Can we export raw events per site and per agent, and how do you detect scraping?', rules: 'Partly: scraping' },
    ],
  },
  {
    serves: 'Search engines',
    rows: [
      { feature: 'Listing pages on your domain, in the HTML response', priority: 'Must-have', ask: 'With JavaScript off, is the listing in the response, and is the URL on our domain?', rules: 'No' },
      { feature: 'Crawlable links and pagination', priority: 'Should-have', ask: 'Are listing links and page-two links anchor elements with an href?', rules: 'No' },
      { feature: 'Control of filter URLs', priority: 'Should-have', ask: 'Which filter combinations get a crawlable URL, and how are the rest kept out of the crawl?', rules: 'No' },
      { feature: 'Sitemaps with accurate lastmod', priority: 'Should-have', ask: 'Are listing URLs in a sitemap rebuilt on each sync, with lastmod from the listing’s modification time?', rules: 'No' },
      { feature: 'Correct status codes for removed listings', priority: 'Should-have', ask: 'What does a removed listing’s URL return, and a sold listing’s we may still display?', rules: 'Indirectly: removals' },
      { feature: 'Structured data that matches the page', priority: 'Situational', ask: 'Which schema.org types do listing pages emit, and is every marked-up value visible on the page?', rules: 'No' },
      { feature: 'Canonical URLs across agent sites', priority: 'Situational', ask: 'When a listing is on many agent sites, which URL is declared canonical, and can we choose?', rules: 'No' },
    ],
  },
];

const FEATURE_COUNT = CHECKLIST.reduce((n, g) => n + g.rows.length, 0);

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        An IDX website serves four audiences, and a feature list written for one of them produces a site that
        demos well and disappoints in use. Home buyers need fast search that is accurate about status. Agents need
        leads that arrive with context. The brokerage needs every page to follow each MLS&apos;s display rules.
        Search engines need listing pages they can crawl on your own domain. The{' '}
        <a href="#checklist">checklist below</a> scores {FEATURE_COUNT} features across those groups, with a question
        to ask a vendor or developer for each and whether MLS rules limit it.
      </p>

      <h2>How to read this guide</h2>
      <p>
        MLS rules differ by MLS. Rules quoted here come from two public rule sets, used as worked examples: MLS
        Grid&apos;s <Src href={GRID_IDX}>IDX Rules, updated September 17, 2026</Src>, and San Diego MLS&apos;s{' '}
        <Src href={SDMLS}>Rules and Regulations, July 2026, section 12.16</Src>. Your own MLS&apos;s rules and license
        govern. For vendors and prices, see{' '}
        <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build</Link> and the{' '}
        <Link href="/blog/mls-idx-integration-cost">MLS and IDX cost guide</Link>.
      </p>

      <h2>Features for the home buyer</h2>
      <ul>
        <li>
          <strong>Search filters.</strong> Price, beds, baths, type and status are the base; what matters is how
          quickly a new filter can be added. <em>MLS rules:</em> an IDX
          display may contain <Src href={GRID_IDX}>only those fields of data designated by MLS Grid</Src>, and{' '}
          <Src href={GRID_IDX}>the type of listing agreement may not be displayed</Src>. Results per search are
          capped, and not the same way everywhere: MLS Grid sets (
          <Src href={GRID_IDX}>not fewer than 500 listings or 50%, whichever is fewer, and no more than 2,500 per search</Src>
          ), while San Diego MLS says <Src href={SDMLS}>not more than 500 in response to any inquiry</Src>.
        </li>
        <li>
          <strong>Map and polygon search.</strong> A drawn boundary needs a search index that supports geographic queries. <em>MLS rules:</em> a seller can have the address withheld from display,{' '}
          <Src href={GRID_IDX}>including on maps</Src>, so the map needs a rule for listings without a public
          address. Required elements can be left off a map pop-up{' '}
          <Src href={GRID_IDX}>if the visitor can click through to a page that has them</Src>.
        </li>
        <li>
          <strong>Saved searches and listing alerts.</strong> <em>MLS rules:</em> a short display such as a
          text message is exempt from the disclosure requirements{' '}
          <Src href={GRID_IDX}>only when linked directly to a display that includes all required disclosures</Src>,
          and listings may not be used for <Src href={GRID_IDX}>unsolicited or unauthorized advertising</Src>.
        </li>
        <li>
          <strong>Photos.</strong> <em>MLS rules:</em> MLS Grid requires that <Src href={GRID_DOCS}>you maintain your own copy of all media files</Src>{' '}
          and not use its media URLs on your website.
        </li>
        <li>
          <strong>Mobile behavior.</strong> Google uses{' '}
          <Src href={G_MOBILE}>the mobile version of a site&apos;s content for indexing and ranking</Src>, and{' '}
          <Src href={G_MOBILE}>will not load content that requires user interactions such as swiping, clicking or typing</Src>
          .
        </li>
        <li>
          <strong>Speed.</strong> Google&apos;s published targets are a Largest Contentful Paint{' '}
          <Src href={G_CWV}>within 2.5 seconds</Src>, an Interaction to Next Paint{' '}
          <Src href={G_CWV}>under 200 milliseconds</Src> and a Cumulative Layout Shift{' '}
          <Src href={G_CWV}>under 0.1</Src>. Search speed comes from architecture: in our{' '}
          <Link href={CASE}>real estate SaaS case study</Link>, search response time went from 3.5 seconds to 180
          milliseconds after search, filters, geo-queries and auto-suggestions moved from direct database queries to
          Elasticsearch with a Redis cache.
        </li>
      </ul>

      <h2>Features for the agent or team</h2>
      <ul>
        <li>
          <strong>Lead capture and registration rules.</strong> Neither IDX rule set cited here requires visitors to
          register, so when to ask is a business choice you should be able to set per site. <em>MLS rules:</em> two cases remove the choice. A
          Virtual Office Website, for consumers with whom the broker has first established a relationship, requires
          registration:
          MLS Grid&apos;s VOW Rules require{' '}
          <Src href={GRID_VOW}>the name of, and a valid email address for, each registrant</Src>, a verified email
          and agreement to terms of use. And some MLSs gate IDX itself: for Northstar MLS data,{' '}
          <Src href={GRID_IDX}>consumers must assent to an end-user license agreement before they can see the IDX data</Src>
          . Contact buttons are regulated too: San Diego MLS requires that a call to action near a listing{' '}
          <Src href={SDMLS}>clearly identify whether it puts the viewer in contact with the listing agent or an advertising agent</Src>
          .
        </li>
        <li>
          <strong>Lead routing.</strong> Rules for which agent gets a lead, and a fallback when nobody responds. We found no MLS rule on routing in the sources checked.
        </li>
        <li>
          <strong>CRM sync.</strong> The CRM should receive which listings a lead viewed and saved, not only a name
          and an email. <em>MLS rules:</em> license scope decides whether listing data may sit in the CRM. MLS Grid states that records marked for IDX{' '}
          <Src href={GRID_V2}>can be used for public display on IDX websites and in customer relationship management and transaction management tools</Src>
          .
        </li>
        <li>
          <strong>Agent subdomains or sites.</strong> Each agent gets a branded site from one platform.{' '}
          <em>MLS rules:</em> an IDX display must be{' '}
          <Src href={GRID_IDX}>under the actual and apparent control of a single Member Participant</Src>, with that
          participant&apos;s branding <Src href={GRID_IDX}>equal to or more prominent than that of any other entity</Src>
          , and it must <Src href={GRID_IDX}>clearly identify the name of the brokerage firm</Src>. Enforce this
          in the template. The case study above is this setup: each agent has a branded IDX website on one backend,
          restructured for multi-tenant separation.
        </li>
        <li>
          <strong>Market reports.</strong> <em>MLS rules:</em> price and inventory trends depend on sold data (see
          below) and on license scope. MLS Grid&apos;s rule is
          that participants <Src href={GRID_IDX}>may not use IDX provided listings for any purpose other than display</Src>{' '}
          as the rules provide, so ask your MLS which license covers statistics.
        </li>
      </ul>

      <h2>Features for the brokerage</h2>
      <ul>
        <li>
          <strong>Multi-MLS coverage.</strong> <em>MLS rules:</em> San
          Diego MLS allows co-mingling with other MLSs&apos; listings provided the participant{' '}
          <Src href={SDMLS}>holds participatory rights in those MLSs</Src>, and{' '}
          <Src href={SDMLS}>listings obtained from other MLSs must display the source</Src>. Merging the feeds is
          engineering work in its own right; our{' '}
          <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline reference design</Link> covers
          normalization and duplicates.
        </li>
        <li>
          <strong>Attribution.</strong> MLS Grid requires{' '}
          <Src href={GRID_IDX}>the listing brokerage name, the listing number, the email or phone provided, and the status, immediately adjacent to the property information</Src>
          , with stricter clauses for single MLSs. San Diego MLS
          requires the phrase <Src href={SDMLS}>&ldquo;Listed by&rdquo; or &ldquo;Listing [brokerage/agent]&rdquo; instead of &ldquo;Presented by&rdquo;</Src>
          .
        </li>
        <li>
          <strong>Disclaimers and notices.</strong> MLS Grid requires a source line (
          <Src href={GRID_IDX}>&ldquo;Listings courtesy of APPLICABLE MLS as distributed by MLS GRID&rdquo;</Src>),
          a disclaimer stating <Src href={GRID_IDX}>the date and time the data was obtained</Src>, a{' '}
          <Src href={GRID_IDX}>DMCA notice</Src>, and, if you exclude listings by objective criteria, the sentence{' '}
          <Src href={GRID_IDX}>&ldquo;Some IDX listings have been excluded from this website.&rdquo;</Src> It also
          bars wording such as <Src href={GRID_IDX}>&ldquo;search the MLS&rdquo;</Src>. A site on several MLSs needs these as
          per-MLS settings.
        </li>
        <li>
          <strong>Refresh interval.</strong> Both rule sets require a refresh{' '}
          <Src href={GRID_IDX}>at least once every twelve (12) hours</Src> (
          <Src href={SDMLS}>San Diego MLS says the same</Src>), and MLS Grid&apos;s wording includes removing data
          that has left the feed. The platform in the case study syncs every 2 hours and reads detail pages
          directly from the database, so status and price changes do not wait for a cache.
        </li>
        <li>
          <strong>Opt-outs.</strong> The RESO Data Dictionary carries seller flags for{' '}
          <Src href={DD_NET_LISTING}>whether the listing may be displayed on Internet sites</Src> and{' '}
          <Src href={DD_NET_ADDRESS}>whether the address may be</Src>. Listing brokers can also opt out of IDX
          entirely; MLS Grid then removes their listings <Src href={GRID_IDX}>within ten (10) business days</Src>.
        </li>
        <li>
          <strong>Analytics.</strong> Per-site and per-agent reporting with exportable events.{' '}
          <em>MLS rules:</em> one item is required: MLS Grid expects{' '}
          <Src href={GRID_IDX}>monitoring the website for signs that a third party is scraping data</Src>.
        </li>
      </ul>
      <p>
        The cost of getting display rules wrong is published too: under MLS Grid&apos;s rules a repeat notice for
        the same infraction within 180 days carries <Src href={GRID_IDX}>a $250 fine, rising to $500 and then to $1,000 and possible termination of the license</Src>
        , in addition to any fine the MLS sets (as published on October 12, 2026).
      </p>

      <h2>Features for search engines</h2>
      <p>
        Nothing in the two rule sets asks you to hide listings from search engines: both say the display-only rule{' '}
        <Src href={GRID_IDX}>does not require preventing indexing of listings by recognized search engines</Src> (
        <Src href={SDMLS}>San Diego MLS, 12.16(i)</Src>).
      </p>
      <ul>
        <li>
          <strong>Indexable pages versus framed or subdomain IDX.</strong> In a framed IDX the listings live at the
          vendor&apos;s URL and your page only embeds them; Google documents a separate indexing rule for content{' '}
          <Src href={G_ROBOTS_META}>embedded in another page through iframes</Src>. In a subdomain IDX the pages sit
          on a separate host, so ask who controls its robots rules, canonical tags and sitemap. The third pattern renders listing pages on your
          own domain; Google notes that crawling works well for{' '}
          <Src href={G_JS}>server-side rendered pages where the HTML in the HTTP response contains all content</Src>
          , and that <Src href={G_JS}>not all bots can run JavaScript</Src>.
        </li>
        <li>
          <strong>Crawlable links and pagination.</strong> Google can generally crawl a link only if it is{' '}
          <Src href={G_LINKS}>an a element with an href attribute</Src>, and its crawlers{' '}
          <Src href={G_PAGINATION}>don&apos;t &ldquo;click&rdquo; buttons</Src>. Results
          that load only on scroll or on a button hide everything after the first batch.
        </li>
        <li>
          <strong>Filter URLs.</strong> Google warns that filter navigation <Src href={G_FACETS}>can generate infinite URL spaces</Src> and slow the discovery
          of new pages. Decide which combinations (a city, a city plus a property type) deserve a page and keep the
          rest out of the crawl.
        </li>
        <li>
          <strong>Sitemaps.</strong> A single sitemap holds{' '}
          <Src href={G_SITEMAP}>50MB (uncompressed) or 50,000 URLs</Src>, so a listing site needs a sitemap index
          rebuilt as listings change. Google uses lastmod{' '}
          <Src href={G_SITEMAP}>if it is consistently and verifiably accurate</Src> and{' '}
          <Src href={G_SITEMAP}>ignores priority and changefreq</Src>.
        </li>
        <li>
          <strong>Removed listings.</strong> Google removes a URL from its index
          when it returns <Src href={G_STATUS}>a 4xx status such as 404 or 410</Src>, and says soft 404 pages{' '}
          <Src href={G_CRAWL_BUDGET}>will continue to be crawled, and waste your budget</Src>. A removed listing
          that still returns a normal page is a crawl problem and, if listing data remains on it, a display-rule
          problem.
        </li>
        <li>
          <strong>Structured data.</strong> Schema.org defines a{' '}
          <Src href={SCHEMA_LISTING}>RealEstateListing type</Src>, but Google&apos;s{' '}
          <Src href={G_GALLERY}>list of structured data features</Src> had no real-estate-listing feature when we
          checked on October 12, 2026. Do not mark up{' '}
          <Src href={G_STRUCTURED}>information that is not visible to the user</Src>.
        </li>
        <li>
          <strong>Canonical URLs.</strong> On a multi-agent platform one listing appears on many sites. Google
          lists <Src href={G_CANONICAL}>redirects, rel=&quot;canonical&quot; and sitemap inclusion</Src> as ways to
          state a preferred URL; choose the policy deliberately.
        </li>
      </ul>

      <h2 id="checklist">The scored checklist</h2>
      <p>
        The priorities are our judgment, on this basis. <strong>Must-have:</strong> a published rule requires it, or
        the site does not work as a listing search without it. <strong>Should-have:</strong> it affects leads or
        search traffic for most brokerages, and can follow launch. <strong>Situational:</strong> it depends on your
        business model or on what your MLS permits.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead>
            <tr><th>Feature</th><th>Serves</th><th>Priority</th><th>Question to ask</th><th>Constrained by MLS rules?</th></tr>
          </thead>
          <tbody>
            {CHECKLIST.flatMap((g) =>
              g.rows.map((r) => (
                <tr key={r.feature}>
                  <td><strong>{r.feature}</strong></td>
                  <td>{g.serves}</td>
                  <td>{r.priority}</td>
                  <td>{r.ask}</td>
                  <td>{r.rules}</td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      <h2>Features that depend on MLS permission</h2>
      <p>
        Four features sell well in a demo and then depend on your MLS, the listing broker or the seller. Confirm
        each in writing before it goes into a contract.
      </p>
      <ul>
        <li>
          <strong>Sold data.</strong> Availability and display both vary. San Diego MLS&apos;s IDX download includes{' '}
          <Src href={SDMLS}>publicly accessible sold listing data starting from January 1, 2012</Src>. Under MLS
          Grid, a sold listing must show{' '}
          <Src href={GRID_IDX}>the cooperating brokerage or a set disclaimer</Src>, and the per-MLS clauses differ:{' '}
          <Src href={GRID_IDX}>closed listings more than three years old may not be displayed</Src> for REcolorado
          and IRMLS, <Src href={GRID_IDX}>the sold price may not be displayed</Src> for SCKMLS, and for Unlock MLS{' '}
          <Src href={GRID_IDX}>neither the sale price nor photographs other than the primary one</Src>. Expired and
          withdrawn listings <Src href={GRID_IDX}>may be prohibited and may be excluded from the data</Src>.
        </li>
        <li>
          <strong>Automated valuations (AVMs).</strong> An estimate shown next to a listing must be{' '}
          <Src href={GRID_IDX}>disabled for that listing at the request of the seller</Src> (
          <Src href={SDMLS}>San Diego MLS has the same rule</Src>). The Data Dictionary has a field for it:{' '}
          <Src href={DD_NET_AVM}>whether the seller allows the listing to be displayed with an AVM</Src>.
        </li>
        <li>
          <strong>Comments and reviews on listings.</strong> The same rule covers third-party comments; the field is{' '}
          <Src href={DD_NET_COMMENT}>whether the seller allows a comment or blog system attached to the listing</Src>
          .
        </li>
        <li>
          <strong>Co-mingling non-MLS listings.</strong> MLS Grid allows property information from non-MLS sources
          in the same search if{' '}
          <Src href={GRID_IDX}>the source is prominently identified in the search results and in the property details</Src>{' '}
          and the search <Src href={GRID_IDX}>lets the user filter results by the source of the information</Src>{' '}
          (the rule exempts some MLSs from the filter). San Diego MLS requires it to be{' '}
          <Src href={SDMLS}>clearly separated from the data supplied by the MLS</Src>.
        </li>
      </ul>

      <h2>Using the checklist with a vendor or a developer</h2>
      <ol>
        <li>Ask for written answers to the question column, with a live URL as evidence for each must-have.</li>
        <li>Test that URL yourself: a listing page with JavaScript off, the attribution on another brokerage&apos;s listing, and what a removed listing&apos;s address returns.</li>
        <li>If several must-haves come back as &ldquo;not possible on our platform,&rdquo; compare a custom build; the <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link> adds up the published fees for a specific setup.</li>
      </ol>
      <p>
        We build this kind of search and data layer as part of our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration</Link> work. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Which IDX website features are required by MLS rules?', answer: ['The display rules, not the search features. Under MLS Grid’s IDX Rules a listing must show ', ['the listing brokerage name, the listing number, the email or phone provided, and the status', GRID_IDX], ', and data must be refreshed ', ['at least once every twelve (12) hours', GRID_IDX], '. Each MLS has its own version, so check yours.'] },
        { question: 'Can an IDX website show sold listings?', answer: ['Only where the MLS allows it, and often with limits. In MLS Grid’s rules, ', ['closed listings more than three years old may not be displayed', GRID_IDX], ' for REcolorado and IRMLS, and ', ['the sold price may not be displayed', GRID_IDX], ' for SCKMLS. Get the rule for each of your MLSs before treating sold data as a feature.'] },
        { question: 'Does an IDX website have to make visitors register?', answer: ['The two IDX rule sets cited in this guide do not require it, with exceptions for single MLSs: for Northstar MLS data, ', ['consumers must assent to an end-user license agreement before they can see the IDX data', GRID_IDX], '. A Virtual Office Website is different; MLS Grid’s VOW Rules require ', ['the name of, and a valid email address for, each registrant', GRID_VOW], ' before any search.'] },
      ]} />

      <p className="cp-note">
        Sources were read on their publishers&apos; pages on October 12, 2026. MLS rules change and differ by MLS;
        this guide is not legal advice, and your license and your MLS&apos;s current rules govern.
      </p>
    </GuideLayout>
  );
}
