import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'real-estate-website-seo-aeo-geo';
export const metadata = guideMetadata(SLUG);

// Every source below was fetched on 2026-10-12; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-real-estate-website-seo-aeo-geo.md. Several Google pages have moved from
// /search/docs/crawling-indexing/ to /crawling/docs/; the constants hold the URL each one resolved to.
// Bing's webmaster guidelines page returned no article text without scripts on that date and is not cited.
const G = 'https://developers.google.com/search/docs';
const G_JS = `${G}/crawling-indexing/javascript/javascript-seo-basics`;
const G_CANON = `${G}/crawling-indexing/canonicalization`;
const G_CANON_HOW = `${G}/crawling-indexing/consolidate-duplicate-urls`;
const G_STATUS = 'https://developers.google.com/crawling/docs/troubleshooting/http-status-codes';
const G_SOFT404 = `${G}/crawling-indexing/troubleshoot-crawling-errors`;
const G_ROBOTS_META = `${G}/crawling-indexing/robots-meta-tag`;
const G_SITEMAP = `${G}/crawling-indexing/sitemaps/build-sitemap`;
const G_SITEMAP_INDEX = `${G}/crawling-indexing/sitemaps/large-sitemaps`;
const G_CRAWL = 'https://developers.google.com/crawling/docs/crawl-budget';
const G_GALLERY = `${G}/appearance/structured-data/search-gallery`;
const G_SD_INTRO = `${G}/appearance/structured-data/intro-structured-data`;
const G_SD_POLICY = `${G}/appearance/structured-data/sd-policies`;
const G_LOCALBIZ = `${G}/appearance/structured-data/local-business`;
const G_VACATION = `${G}/appearance/structured-data/vacation-rental`;
const G_UPDATES = 'https://developers.google.com/search/updates';
const G_SPAM = `${G}/essentials/spam-policies`;
const G_SNIPPET = `${G}/appearance/featured-snippets`;
const G_AI = `${G}/appearance/ai-features`;
const G_AI_GUIDE = `${G}/fundamentals/ai-optimization-guide`;
const G_THIRD = `${G}/fundamentals/third-party-seo`;
const G_HELPFUL = `${G}/fundamentals/creating-helpful-content`;
const G_PAGE_EXP = `${G}/appearance/page-experience`;
const G_IMAGES = `${G}/appearance/google-images`;
const G_CRAWLERS = 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers';
const GBP = 'https://support.google.com/business/answer/3038177?hl=en';
const S_LISTING = 'https://schema.org/RealEstateListing';
const S_SFR = 'https://schema.org/SingleFamilyResidence';
const S_OFFER = 'https://schema.org/Offer';
const S_PLACE = 'https://schema.org/Place';
const S_AGENT = 'https://schema.org/RealEstateAgent';
const OPENAI = 'https://developers.openai.com/api/docs/bots';
const ANTHROPIC = 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler';
const PERPLEXITY = 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers';
const LLMS = 'https://llmstxt.org/';
const INDEXNOW = 'https://www.indexnow.org/';
const GRID_AI = 'https://www.mlsgrid.com/s/MLS-Grid-AI-Use-Addendum.pdf';
const VITALS = 'https://web.dev/articles/vitals';
const LCP = 'https://web.dev/articles/optimize-lcp';
const CLS = 'https://web.dev/articles/cls';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        A listing site is found in search, in answer boxes and in AI answers for the same reason: its pages can be
        crawled, they return the right HTTP status, and they say something the next IDX site does not. Google states
        that there are <Src href={G_AI}>no additional requirements to appear in AI Overviews or AI Mode</Src>, and
        that optimizing for generative AI search is <Src href={G_AI_GUIDE}>&ldquo;still SEO&rdquo;</Src>. So the
        work is mostly engineering: server-rendered listing pages on your own hostname, a deliberate treatment for
        sold and expired listings, sitemaps with honest dates, structured data that matches the page, and area pages
        built from data you are licensed to use. For assistants outside Google, the documented controls are
        robots.txt tokens. No vendor publishes how sources are chosen for an answer.
      </p>
      <p>
        The terms: SEO is classic search results. AEO (answer engine optimization) is featured snippets and
        Google&apos;s AI features. GEO (generative engine optimization) is answers from assistants such as ChatGPT,
        Claude, Perplexity and Gemini. Every rule below was read on its publisher&apos;s page on October 12, 2026.
        This is a build checklist, not a promise of rankings.
      </p>

      <h2>1. Serve listing pages from your own hostname, in the HTML</h2>
      <h3>Iframes and vendor subdomains</h3>
      <p>
        Many IDX products put listing pages in an iframe or on a hostname the vendor runs. Either way the content
        lives at the vendor&apos;s URL. Google&apos;s crawl documentation defines a site as{' '}
        <Src href={G_CRAWL}>a unique hostname</Src> and gives two hostnames on one domain as separate sites with
        separate crawl budgets, so <code>search.yourbrokerage.com</code> is crawled as a different site from{' '}
        <code>www.yourbrokerage.com</code>. For iframes, the only statement we found is the{' '}
        <code>indexifembedded</code> rule, which lets Google{' '}
        <Src href={G_ROBOTS_META}>index the content of a page if it&apos;s embedded in another page through iframes</Src>{' '}
        despite a noindex rule. Nothing there says the embedding page gets the benefit. The option you control is a
        listing URL on your main hostname, fed from your own systems or a data API; see <Link href="/blog/idx-vendor-vs-custom-build">IDX vendor or custom build</Link>.
      </p>
      <h3>JavaScript rendering</h3>
      <p>
        Google renders JavaScript in a second step:{' '}
        <Src href={G_JS}>Googlebot queues pages for both crawling and rendering</Src>, and a page{' '}
        <Src href={G_JS}>may stay on this queue for a few seconds, but it can take longer than that</Src>. The same
        page says server-side or pre-rendering is still a good idea because{' '}
        <Src href={G_JS}>not all bots can run JavaScript</Src>. The AI crawler pages cited below do not say whether those
        crawlers execute scripts. Put the price, address, remarks, photos and
        the canonical link in the first HTML response and the question goes away; Google warns that conflicting or
        multiple canonical tags <Src href={G_JS}>may lead to unexpected results</Src>.
      </p>
      <h3>The same listing is on every IDX site</h3>
      <p>
        Google&apos;s documentation does not describe a penalty for this. It describes deduplication: when pages
        have the same or very similar primary content, Google{' '}
        <Src href={G_CANON}>clusters them together</Src>, chooses the one that is{' '}
        <Src href={G_CANON}>objectively the most complete and useful for search users</Src> as canonical, and a
        result <Src href={G_CANON}>usually points to the canonical page</Src>. It also says{' '}
        <Src href={G_CANON}>some duplicate content on a site is normal</Src>.
      </p>
      <p>
        Google does not publish how it picks among IDX sites carrying one listing, and we will not guess. One
        thing follows from the mechanism: a page with only the feed&apos;s fields has the same primary content
        as everyone else&apos;s. What you add, within your MLS license, is yours: price and status history,
        comparable sales, the agent&apos;s own notes, a link to an area page with real data. On your own site give
        each listing one URL with a self-referencing canonical, which Google says to{' '}
        <Src href={G_CANON_HOW}>include on the canonical page itself</Src>.
      </p>

      <h2>2. Decide what happens when a listing stops being active</h2>
      <p>
        The default in many builds is a page that says &ldquo;no longer available&rdquo; and returns 200. Google
        calls that a soft 404: such pages <Src href={G_SOFT404}>are excluded from Search</Src> and{' '}
        <Src href={G_CRAWL}>will continue to be crawled, and waste your budget</Src>. Map each status to a response:
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Situation</th><th>Treatment</th><th>What Google documents</th></tr></thead>
          <tbody>
            <tr>
              <td>Sold or pending, and your MLS lets you keep displaying it</td>
              <td>200 with real content: status, dates, permitted sold data</td>
              <td>A 2xx response <Src href={G_STATUS}>may be considered for indexing</Src>; an empty or error-like page becomes a <Src href={G_STATUS}>soft 404</Src></td>
            </tr>
            <tr>
              <td>Expired, withdrawn or removed, and you may no longer show it</td>
              <td>404 or 410, with similar homes for the visitor</td>
              <td>With no replacement, <Src href={G_SOFT404}>return a 404 (not found) or 410 (gone)</Src>; Google treats <Src href={G_STATUS}>all 4xx errors, except 429, the same</Src></td>
            </tr>
            <tr>
              <td>Relisted, or the URL scheme changed</td>
              <td>301 to the replacement listing</td>
              <td>For a page that <Src href={G_SOFT404}>has moved or has a clear replacement</Src>; a 301 is <Src href={G_STATUS}>a strong signal</Src></td>
            </tr>
            <tr>
              <td>End date known in advance (open house, auction)</td>
              <td><code>unavailable_after</code> meta tag or header</td>
              <td>Google will <Src href={G_ROBOTS_META}>not show the page in search results after the specified date/time</Src></td>
            </tr>
            <tr>
              <td>Sorted and filtered search results</td>
              <td>Canonical to the unfiltered page, or block in robots.txt</td>
              <td>Listed as duplicates: <Src href={G_CANON}>the results of sorting and filtering functions</Src>; robots.txt is suggested for <Src href={G_CRAWL}>differently sorted versions of the same page</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Do not use noindex to save crawling: Google <Src href={G_CRAWL}>will still request, but then drop the page</Src>.
        Client-rendered apps that answer 200 for every route are told to{' '}
        <Src href={G_JS}>redirect to a URL for which the server responds with a 404</Src>; server rendering sends
        the real status. Which statuses you may display at all is set by your MLS (see the display-policy stage in
        our <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture</Link> guide).
      </p>
      <h3>Sitemaps and crawl budget for a daily-changing inventory</h3>
      <ul>
        <li><strong>Split by the limits.</strong> A sitemap holds <Src href={G_SITEMAP}>50MB (uncompressed) or 50,000 URLs</Src>; an index holds <Src href={G_SITEMAP_INDEX}>up to 50,000 loc tags</Src>.</li>
        <li><strong>Take <code>lastmod</code> from the listing&apos;s modification time,</strong> not the build time. Google uses it <Src href={G_SITEMAP}>if it&apos;s consistently and verifiably accurate</Src> and <Src href={G_SITEMAP}>ignores priority and changefreq</Src>.</li>
        <li><strong>Check whether crawl budget applies.</strong> Google&apos;s guide is for sites with <Src href={G_CRAWL}>1 million+ unique pages</Src> changing weekly or <Src href={G_CRAWL}>10,000+ unique pages</Src> changing daily; a multi-MLS site is often in the second group. It also recommends <Src href={G_CRAWL}>supporting 304 (Not Modified)</Src>.</li>
        <li><strong>Other engines.</strong> IndexNow pings participating engines when a URL <Src href={INDEXNOW}>has been added, updated, or deleted</Src>; it lists <Src href={INDEXNOW}>Microsoft Bing, Naver, Seznam.cz, Yandex and Yep</Src>.</li>
      </ul>

      <h2>3. Structured data: more vocabulary than rich results</h2>
      <p>
        Which schema.org types describe a listing and which rich results Google shows are separate questions. Google
        says its own documentation, not schema.org, is{' '}
        <Src href={G_SD_INTRO}>definitive for Google Search behavior</Src>.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>schema.org type</th><th>Describes</th><th>Google rich result, October 12, 2026</th></tr></thead>
          <tbody>
            <tr>
              <td><Src href={S_LISTING}>RealEstateListing</Src></td>
              <td>The listing page; schema.org still places it in its &ldquo;new&rdquo; area</td>
              <td rowSpan={4}>None. Google&apos;s <Src href={G_GALLERY}>structured data gallery</Src> has no feature for homes for sale or rent. Its one property feature, <Src href={G_VACATION}>vacation rental</Src>, is limited to sites connected to Google&apos;s Hotel Center</td>
            </tr>
            <tr>
              <td><Src href={S_SFR}>SingleFamilyResidence</Src></td>
              <td>The home: bedrooms, bathrooms, floor size, and a <code>yearBuilt</code> that schema.org maps to the RESO YearBuilt field</td>
            </tr>
            <tr>
              <td><Src href={S_OFFER}>Offer</Src></td>
              <td>Price and terms</td>
            </tr>
            <tr>
              <td><Src href={S_PLACE}>Place</Src></td>
              <td>Address and coordinates</td>
            </tr>
            <tr>
              <td><Src href={S_AGENT}>RealEstateAgent</Src></td>
              <td>The brokerage or agent; a LocalBusiness subtype</td>
              <td><Src href={G_GALLERY}>Local business</Src> is supported; Google says to use <Src href={G_LOCALBIZ}>the most specific LocalBusiness sub-type possible</Src></td>
            </tr>
            <tr>
              <td>BreadcrumbList</td>
              <td>State, city, neighborhood, listing</td>
              <td><Src href={G_GALLERY}>Breadcrumb</Src> is supported</td>
            </tr>
            <tr>
              <td>FAQPage</td>
              <td>Questions and answers</td>
              <td>Withdrawn: the FAQ rich result <Src href={G_UPDATES}>is no longer shown in Google Search results</Src>, as of <Src href={G_UPDATES}>May 7, 2026</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Listing markup will not produce a listing rich result on Google today. It is still reasonable to publish:
        Google notes that properties it does not use{' '}
        <Src href={G_SD_INTRO}>may be useful for other search engines, services, tools, and platforms</Src>. Do not{' '}
        <Src href={G_SD_POLICY}>mark up content that is not visible to readers of the page</Src>; Google <Src href={G_SD_POLICY}>does not guarantee</Src> that valid markup is shown. Generate the JSON-LD from
        the record that renders the page, so a price change cannot leave the two disagreeing.
      </p>

      <h2>4. Area and neighborhood pages: data or doorway</h2>
      <p>
        A page for every city, ZIP code and subdivision is easy to generate, and it is the pattern Google&apos;s spam
        policies describe. Doorway examples include{' '}
        <Src href={G_SPAM}>multiple domain names or pages targeted at specific regions or cities that funnel users to one page</Src>;
        scaled content abuse includes{' '}
        <Src href={G_SPAM}>scraping feeds, search results, or other content to generate many pages</Src> of little
        value. Creating a page per query variation to manipulate rankings or AI responses{' '}
        <Src href={G_AI_GUIDE}>violates the scaled content abuse policy</Src>. An area page earns its place when it
        holds something the search results page behind it does not:
      </p>
      <ul>
        <li><strong>Market statistics from your MLS data:</strong> median price, days on market and inventory for that area, each with its period and the date computed. Whether you may publish statistics derived from the feed is a license question (see <Link href="/blog/how-to-get-mls-data-access">how to get MLS data access</Link>).</li>
        <li><strong>Local knowledge with a named author.</strong> Google&apos;s own example of commodity content is <Src href={G_AI_GUIDE}>&ldquo;7 Tips for First-Time Homebuyers&rdquo;</Src>, set against a first-hand account of an inspection decision.</li>
        <li><strong>A real hierarchy</strong> with breadcrumbs, not pages <Src href={G_SPAM}>closer to search results than a clearly defined, browseable hierarchy</Src>.</li>
        <li><strong>A publish threshold:</strong> an area with two listings and no data gets no page.</li>
      </ul>

      <h2>5. AEO: answers that can be quoted</h2>
      <p>
        You cannot nominate a page for a featured snippet; <Src href={G_SNIPPET}>Google systems determine</Src>{' '}
        that. To be a supporting link in AI Overviews or AI Mode a page{' '}
        <Src href={G_AI}>must be indexed and eligible to be shown in Google Search with a snippet</Src>, and the site
        must be <Src href={G_AI_GUIDE}>included in Search generative AI features in Search Console</Src>. What remains is
        editorial discipline, which we recommend for readers and for accurate quotation, not because any search
        engine documents a reward for it:
      </p>
      <ul>
        <li><strong>Answer in the first sentence</strong> under a heading that is the buyer&apos;s or seller&apos;s question, with the figure, its date and its source.</li>
        <li><strong>Put comparable facts in an HTML table,</strong> not an image; Google lists <Src href={G_AI}>making sure that important content is available in textual form</Src>.</li>
        <li><strong>Name the author.</strong> Google encourages <Src href={G_HELPFUL}>accurate authorship information, such as bylines</Src>.</li>
        <li><strong>Audit snippet controls.</strong> <code>nosnippet</code>, <code>data-nosnippet</code> and <code>max-snippet</code> are <Src href={G_AI}>the documented ways to limit</Src> what Search and its AI features show; a template that sets them by mistake opts the page out.</li>
      </ul>

      <h2>6. GEO: what is documented, and what is not</h2>
      <p>AI vendors document who their crawlers are and how to allow or block them:</p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>robots.txt token</th><th>Operator</th><th>Documented purpose</th></tr></thead>
          <tbody>
            <tr><td>OAI-SearchBot</td><td>OpenAI</td><td><Src href={OPENAI}>Used to surface websites in search results in ChatGPT&apos;s search features</Src></td></tr>
            <tr><td>GPTBot</td><td>OpenAI</td><td>Content that <Src href={OPENAI}>may be used in training</Src>; set independently of OAI-SearchBot</td></tr>
            <tr><td>ChatGPT-User</td><td>OpenAI</td><td>User-initiated fetches, where <Src href={OPENAI}>robots.txt rules may not apply</Src></td></tr>
            <tr><td>ClaudeBot, Claude-SearchBot, Claude-User</td><td>Anthropic</td><td>In order: <Src href={ANTHROPIC}>training data, search result quality, and user-directed retrieval</Src>; Anthropic says its bots honor robots.txt</td></tr>
            <tr><td>PerplexityBot</td><td>Perplexity</td><td><Src href={PERPLEXITY}>Designed to surface and link websites in search results on Perplexity</Src>, not for model training</td></tr>
            <tr><td>Google-Extended</td><td>Google</td><td>A control token for Gemini training and grounding that <Src href={G_CRAWLERS}>does not impact a site&apos;s inclusion in Google Search</Src>; AI Overviews and AI Mode follow <Src href={G_AI}>Googlebot rules</Src></td></tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li><strong>Decide per token.</strong> Blocking &ldquo;AI bots&rdquo; as one group also blocks the search crawlers that link to you.</li>
        <li><strong>Check the firewall too.</strong> Google mentions crawling being allowed <Src href={G_AI}>by any CDN or hosting infrastructure</Src>, and Perplexity publishes <Src href={PERPLEXITY}>WAF configuration guidance and IP ranges</Src>.</li>
        <li><strong>Read your MLS license first.</strong> MLS Grid&apos;s AI Use Addendum, for example, says its data may not be used for AI training <Src href={GRID_AI}>without the prior express authorization of MLS Grid or an MLS</Src>. Allowing a training crawler on listing pages is a question for your MLS before it is a marketing decision.</li>
      </ul>
      <p>
        <strong>llms.txt</strong> is <Src href={LLMS}>a proposal</Src> by Jeremy Howard, first published in
        September 2024, for a Markdown file that gives agents an overview of a site. Google says it will{' '}
        <Src href={G_AI_GUIDE}>neither harm nor help</Src> visibility in Search, which ignores it, and the AI crawler
        pages cited above do not mention it. This
        site publishes an llms.txt and allows AI crawlers in its robots.txt. That describes what we do; we have no
        evidence that it changes how often anyone cites us.
      </p>
      <p>
        <strong>What is not known:</strong> no vendor cited here publishes a formula for which sources an AI answer
        uses. Google describes retrieval from its index and <Src href={G_AI_GUIDE}>query fan-out</Src> in general
        terms and warns that{' '}
        <Src href={G_AI_GUIDE}>no third-party tool has access to its internal ranking or AI systems</Src>. Anyone who
        promises citations in AI answers is guessing. Google&apos;s{' '}
        <Src href={G_AI_GUIDE}>Search Console reporting</Src> is the first-party measure; for other assistants,
        server logs show which user agents fetched which pages, and nothing more.
      </p>

      <h2>7. Performance: why photo galleries fail Core Web Vitals</h2>
      <p>
        The thresholds are an LCP <Src href={VITALS}>within 2.5 seconds</Src>, an INP of{' '}
        <Src href={VITALS}>200 milliseconds or less</Src> and a CLS of <Src href={VITALS}>0.1 or less</Src>, at{' '}
        <Src href={VITALS}>the 75th percentile of page loads</Src>. Google says{' '}
        <Src href={G_PAGE_EXP}>Core Web Vitals are used by its ranking systems</Src> and, in the same answer, that
        good scores guarantee nothing. A listing page is a hard case for specific reasons:
      </p>
      <ul>
        <li><strong>A carousel script loads the first photo.</strong> The LCP image should be <Src href={LCP}>discoverable in the initial HTML document response</Src> as a plain <code>img</code> tag. Google Images needs the same: it <Src href={G_IMAGES}>doesn&apos;t index CSS images</Src>.</li>
        <li><strong>Every photo is lazy-loaded.</strong> web.dev: <Src href={LCP}>never lazy-load your LCP image</Src>. Give the first photo <code>fetchpriority=&quot;high&quot;</code> and hidden slides <Src href={LCP}>a low priority</Src>.</li>
        <li><strong>Photos come from another origin,</strong> such as an MLS media host, which costs <Src href={LCP}>a connection to that origin before the resource can start loading</Src>.</li>
        <li><strong>Photos lack dimensions and widgets resize.</strong> Layout shifts come from <Src href={CLS}>images or videos with unknown dimensions</Src> and self-resizing third-party widgets, which describes an embedded IDX search box.</li>
      </ul>
      <p>
        Our <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        this kind of front end: agent IDX websites on Next.js with incremental static regeneration, dynamic imports
        and images served through S3 and a CDN. See <Link href="/services/nextjs-development">Next.js development</Link> and{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration</Link>.
      </p>

      <h2>8. Local signals: Business Profiles for agents and offices</h2>
      <p>
        Google&apos;s Business Profile guidelines name real estate agents as{' '}
        <Src href={GBP}>individual practitioners</Src>. An agent should have a profile only if they{' '}
        <Src href={GBP}>operate in a public-facing role</Src> and can be contacted at the verified location during
        stated hours. Where several agents share an office, the brokerage has its own profile and each agent&apos;s
        title <Src href={GBP}>should include only the name of the practitioner</Src>; a sole agent at a branded
        office shares one profile named <Src href={GBP}>[brand/company]: [practitioner name]</Src>. A practitioner{' '}
        <Src href={GBP}>shouldn&apos;t have multiple Business Profiles</Src> for specializations, and a virtual
        office <Src href={GBP}>isn&apos;t eligible</Src>. Match it on the website: one page per real office.
      </p>

      <h2>What to build: the checklist</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Item</th><th>Why</th><th>How to verify it worked</th><th>Source</th></tr></thead>
          <tbody>
            <tr><td>Listing pages on your main hostname</td><td>Another hostname is crawled as a separate site</td><td>Listing URLs appear under your own property in Search Console&apos;s Page Indexing report</td><td><Src href={G_CRAWL}>Crawl budget</Src></td></tr>
            <tr><td>Listing content in the first HTML response</td><td>Rendering is queued; not every bot runs scripts</td><td><code>curl</code> the URL and find price, address and remarks; compare with URL Inspection&apos;s rendered HTML</td><td><Src href={G_JS}>JavaScript SEO</Src></td></tr>
            <tr><td>One URL per listing, self-referencing canonical in the HTML</td><td>State your canonical once, consistently</td><td>URL Inspection shows the Google-selected canonical equal to yours</td><td><Src href={G_CANON_HOW}>Canonical methods</Src></td></tr>
            <tr><td>Status-to-response rules for sold, expired, withdrawn</td><td>A 200 &ldquo;not available&rdquo; page is a soft 404</td><td>Request a removed listing and read the status code; soft 404 count falls</td><td><Src href={G_SOFT404}>Soft 404 errors</Src></td></tr>
            <tr><td>Sitemap index under the limits; <code>lastmod</code> from listing modification time</td><td><code>lastmod</code> is used only when accurate</td><td>Sitemaps report reads every file; only changed listings show a new <code>lastmod</code></td><td><Src href={G_SITEMAP}>Build a sitemap</Src></td></tr>
            <tr><td>JSON-LD generated from the page&apos;s own record</td><td>Markup must match visible content</td><td>Rich Results Test for breadcrumb and local business; spot-check price against the page</td><td><Src href={G_SD_POLICY}>Structured data policies</Src></td></tr>
            <tr><td>Area pages with licensed statistics, an author, a publish threshold</td><td>City pages that only funnel to search match the doorway examples</td><td>Each page shows a dated figure its search results page does not</td><td><Src href={G_SPAM}>Spam policies</Src></td></tr>
            <tr><td>robots.txt decision per AI token, mirrored in the WAF</td><td>Search and training crawlers are separate</td><td>Server logs show the documented user agents receiving 200</td><td><Src href={OPENAI}>OpenAI</Src>, <Src href={ANTHROPIC}>Anthropic</Src>, <Src href={PERPLEXITY}>Perplexity</Src></td></tr>
            <tr><td>First gallery photo in the HTML, prioritized, with dimensions</td><td>It is usually the LCP element</td><td>Field data in the Core Web Vitals report, not one lab run</td><td><Src href={LCP}>Optimize LCP</Src></td></tr>
          </tbody>
        </table>
      </div>
      {/* TODO(owner): vendor disclosure — no IDX or SEO products are compared in this guide; add a disclosure here if that changes. */}

      <h2>Claims to be skeptical of</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>The claim</th><th>What the primary source says</th></tr></thead>
          <tbody>
            <tr><td>&ldquo;We will get you cited in AI Overviews and ChatGPT.&rdquo;</td><td>Google: third-party tools <Src href={G_THIRD}>can&apos;t guarantee performance</Src>. The AI vendors document crawler access, not selection.</td></tr>
            <tr><td>&ldquo;GEO replaces SEO.&rdquo;</td><td>Google&apos;s AI features are <Src href={G_AI_GUIDE}>rooted in its core Search ranking and quality systems</Src>.</td></tr>
            <tr><td>&ldquo;You need llms.txt to appear in AI answers.&rdquo;</td><td>It is a proposal; Google Search <Src href={G_AI_GUIDE}>ignores it</Src>.</td></tr>
            <tr><td>&ldquo;Listing schema gets you rich results for your homes.&rdquo;</td><td>Google&apos;s <Src href={G_GALLERY}>gallery</Src> lists no home listing feature.</td></tr>
            <tr><td>&ldquo;Add FAQ schema for more space in the results.&rdquo;</td><td>The FAQ rich result <Src href={G_UPDATES}>is no longer shown</Src>.</td></tr>
            <tr><td>&ldquo;Content must be chunked and rewritten for AI.&rdquo;</td><td>Google: <Src href={G_AI_GUIDE}>no requirement</Src>, and no ideal page length.</td></tr>
            <tr><td>&ldquo;A page for every city and keyword captures local searches.&rdquo;</td><td>That is the pattern in Google&apos;s <Src href={G_SPAM}>doorway and scaled content policies</Src>.</td></tr>
            <tr><td>&ldquo;Duplicate listings get your site penalized.&rdquo;</td><td>Google documents <Src href={G_CANON}>clustering and choosing a canonical</Src>, and calls some duplication normal.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>MLS rules come first</h2>
      <p>
        Search guidance says how to make a page indexable; your MLS agreement decides whether the page may exist,
        which fields and statuses are public and what attribution is required. Budget the data side with the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link>.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is GEO different from SEO for a real estate website?', answer: ['For Google, no: its generative AI features are ', ['rooted in its core Search ranking and quality systems', G_AI_GUIDE], ', with ', ['no additional requirements', G_AI], ' to appear in them. For other assistants, the documented controls are robots.txt tokens; no vendor cited here publishes how sources are chosen.'] },
        { question: 'What should a sold or expired listing page return?', answer: ['If you may still display it and the page has real content, 200. If it is removed with no replacement, Google says to ', ['return a 404 (not found) or 410 (gone)', G_SOFT404], '. A 200 page that only says the listing is unavailable is a soft 404. Your MLS rules decide which of these you may do.'] },
        { question: 'Is there a Google rich result for real estate listings?', answer: ['Not on October 12, 2026. Google’s ', ['structured data gallery', G_GALLERY], ' lists no feature for homes for sale or rent. Breadcrumb and local business markup are supported, and the FAQ rich result ', ['is no longer shown', G_UPDATES], '.'] },
      ]} />

      <p className="cp-note">
        Sources were read on October 12, 2026. Search documentation changes often; check Google&apos;s{' '}
        <Src href={G_UPDATES}>documentation changelog</Src> before acting on a rule above. This guide describes
        published guidance and does not forecast how any page will rank.
      </p>
    </GuideLayout>
  );
}
