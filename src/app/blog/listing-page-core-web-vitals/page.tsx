import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import ListingPageVitalsDiagram from '../../components/diagrams/ListingPageVitalsDiagram';

const SLUG = 'listing-page-core-web-vitals';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-13; the sentence relied on for each link is logged in
// docs/content/sources/listing-page-core-web-vitals.md. Next.js documentation showed version
// 16.4.0 that day. No benchmark, score or measured result is stated for any site, including this
// one. The code sample is illustrative.
const VITALS = 'https://web.dev/articles/vitals';
const LCP = 'https://web.dev/articles/lcp';
const OPT_LCP = 'https://web.dev/articles/optimize-lcp';
const OPT_CLS = 'https://web.dev/articles/optimize-cls';
const INP = 'https://web.dev/articles/inp';
const OPT_INP = 'https://web.dev/articles/optimize-inp';
const LONG_TASKS = 'https://web.dev/articles/optimize-long-tasks';
const LAB_FIELD = 'https://web.dev/articles/lab-and-field-data-differences';
const FETCH_PRIORITY = 'https://web.dev/articles/fetch-priority';
const LAZY_IMG = 'https://web.dev/articles/browser-level-image-lazy-loading';
const THIRD_PARTY = 'https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript';
const EMBEDS = 'https://web.dev/articles/embed-best-practices';
const CAROUSEL = 'https://web.dev/articles/carousel-best-practices';
const BUDGET = 'https://web.dev/articles/performance-budgets-101';
const TTFB = 'https://web.dev/articles/optimize-ttfb';
const CRUX = 'https://developer.chrome.com/docs/crux';
const CRUX_METHOD = 'https://developer.chrome.com/docs/crux/methodology';
const PSI = 'https://developers.google.com/speed/docs/insights/v5/about';
const WEB_VITALS_LIB = 'https://github.com/GoogleChrome/web-vitals/blob/main/README.md';
const REACT_TRANSITION = 'https://react.dev/reference/react/useTransition';
const NEXT = 'https://nextjs.org/docs/app';
const NEXT_IMAGE = `${NEXT}/api-reference/components/image`;
const NEXT_SCRIPT = `${NEXT}/api-reference/components/script`;
const NEXT_ISR = `${NEXT}/guides/incremental-static-regeneration`;
const NEXT_TAG = `${NEXT}/api-reference/functions/revalidateTag`;
const NEXT_LOADING = `${NEXT}/api-reference/file-conventions/loading`;
const NEXT_FETCHING = `${NEXT}/getting-started/fetching-data`;
const NEXT_LAZY = `${NEXT}/guides/lazy-loading`;
const NEXT_SERVER = `${NEXT}/getting-started/server-and-client-components`;
const NEXT_3P = `${NEXT}/guides/third-party-libraries`;
const NEXT_SELF = `${NEXT}/guides/self-hosting`;
const NEXT_VITALS = `${NEXT}/api-reference/functions/use-report-web-vitals`;

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Three templates, three different problems</h2>
      <p>
        A real estate site is mostly three page templates repeated many thousands of times, and each one strains a
        different metric. A listing detail page is a large photograph followed by forty more, a map and a contact
        form: its risk is the time until the first photo appears and the layout moving as the rest arrives. A
        search results page is filters, a map and a list that all re-render together when a checkbox changes: its
        risk is responsiveness. An area page is statistics and a grid of listing cards, often with embedded
        charts: its risk is layout shift and script weight.
      </p>
      <p>
        So &quot;make the site faster&quot; is not one task. It is a per-template budget and a set of build
        decisions that hold on every page generated from the template. Our{' '}
        <Link href="/blog/real-estate-website-seo-aeo-geo">SEO, AEO and GEO guide</Link> explains why photo
        galleries are a hard case for Core Web Vitals and what Google says about their role in ranking. This
        article is the implementation side: how to render, load and measure each template. Examples use Next.js
        because its documentation states the relevant behavior precisely; the principles apply to any server-side
        framework. No measured result for any site appears here, since the only numbers that matter are the ones
        from your own visitors.
      </p>

      <h2>The three metrics and their thresholds</h2>
      <p>
        Core Web Vitals are three measurements, each with a published target. As read on web.dev on October 13,
        2026:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Metric</th><th>What it measures</th><th>&quot;Good&quot; threshold</th><th>Template most at risk</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Largest Contentful Paint (LCP)</strong></td>
              <td>Loading: <Src href={LCP}>the render time of the largest image, text block, or video visible in the viewport</Src></td>
              <td><Src href={VITALS}>within 2.5 seconds of when the page first starts loading</Src></td>
              <td>Listing detail (the hero photo)</td>
            </tr>
            <tr>
              <td><strong>Interaction to Next Paint (INP)</strong></td>
              <td>Responsiveness: it <Src href={INP}>observes the latency of all interactions a user has made with the page</Src></td>
              <td><Src href={VITALS}>200 milliseconds or less</Src></td>
              <td>Search results (filters, map, list)</td>
            </tr>
            <tr>
              <td><strong>Cumulative Layout Shift (CLS)</strong></td>
              <td>Visual stability: unexpected movement of visible elements</td>
              <td><Src href={VITALS}>maintain a CLS of 0.1</Src> or less</td>
              <td>All three (photos, maps, embeds, late banners)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The target is not an average. web.dev sets the bar at{' '}
        <Src href={VITALS}>the 75th percentile of page loads, segmented across mobile and desktop devices</Src>,
        and says a page passes when it meets the targets{' '}
        <Src href={VITALS}>at the 75th percentile for all three</Src>. A page that is quick on the office network
        and slow on a buyer&apos;s phone in a parking lot is judged by the phone.
      </p>

      <h2>Field data and lab data answer different questions</h2>
      <p>
        There are two kinds of measurement, and confusing them wastes weeks. web.dev&apos;s definitions: lab data
        is <Src href={LAB_FIELD}>collected in a controlled environment with predefined device and network settings</Src>;
        field data is <Src href={LAB_FIELD}>collected from the real users visiting your site</Src>. The thresholds
        above are judged on field data.
      </p>
      <ul>
        <li>
          <strong>CrUX</strong> is the public field dataset. The Chrome User Experience Report{' '}
          <Src href={CRUX}>reflects how real-world Chrome users experience popular destinations on the web</Src>.
          A page or origin is included only if it is{' '}
          <Src href={CRUX_METHOD}>publicly discoverable</Src> and{' '}
          <Src href={CRUX_METHOD}>sufficiently popular</Src>.
        </li>
        <li>
          <strong>PageSpeed Insights</strong> shows both kinds for a URL. Its field section is CrUX data{' '}
          <Src href={PSI}>over the previous 28-day collection period</Src>; its lab section is a Lighthouse run.
          Google&apos;s own description of the trade-off: lab data{' '}
          <Src href={PSI}>is useful for debugging issues, as it is collected in a controlled environment</Src>,
          while field data <Src href={PSI}>is useful for capturing true, real-world user experience - but has a more limited set of metrics</Src>.
        </li>
        <li>
          <strong>The web-vitals library</strong> is how you collect your own field data. It is{' '}
          <Src href={WEB_VITALS_LIB}>a tiny (~3K, brotli&apos;d), modular library for measuring all the Web Vitals metrics on real users</Src>,{' '}
          <Src href={WEB_VITALS_LIB}>in a way that accurately matches how they&apos;re measured by Chrome</Src>.
          In a Next.js app, the <code>useReportWebVitals</code> hook{' '}
          <Src href={NEXT_VITALS}>can be used in combination with your analytics service</Src> for the same purpose.
        </li>
      </ul>
      <p>
        Listing sites have a particular reason to collect their own. An individual listing page is live for weeks
        and visited by few people, so it rarely has page-level data in CrUX. When that happens, PageSpeed Insights{' '}
        <Src href={PSI}>will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website</Src>.
        The number you then see for a listing URL is a blend of the homepage, blog, search and every listing. It
        cannot tell you that listing detail pages have an LCP problem while search pages have an INP problem. Your
        own measurements, tagged with the template name, can.
      </p>
      <p>
        Lab and field also disagree for structural reasons that apply here.{' '}
        <Src href={LAB_FIELD}>The LCP element identified in a lab test may not be the same LCP element users see</Src>:
        a lab run loads the page cold at one viewport size, while a returning visitor on a phone has a cookie
        banner, a different crop and a warm cache. And a lab run that loads a page without clicking anything tells
        you nothing about how the filter panel responds. Use the lab to find causes and prevent regressions; use
        the field to decide whether there is a problem.
      </p>

      <h2>A listing detail page, annotated</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><ListingPageVitalsDiagram /></div>
        <figcaption>
          A listing detail wireframe: the LCP candidate, the regions that are deferred, and the metric each
          decision affects. The photo count and fold position are illustrative.
        </figcaption>
      </figure>
      <p>The annotations, top to bottom:</p>
      <ul>
        <li><strong>Hero photo (LCP, CLS).</strong> The first photo is the LCP candidate. It is an <code>img</code> in the server HTML, loaded eagerly at high priority, with dimensions that reserve its space.</li>
        <li><strong>Other photos (deferred).</strong> Photos 2 onward are lazy and are fetched as the visitor reaches them.</li>
        <li><strong>Price, facts and actions (INP).</strong> The text is server HTML. Save, Contact and the gallery arrows are the first things people tap, so their handlers are small and there is little script to hydrate.</li>
        <li><strong>Map (deferred, CLS).</strong> The map script loads when the map is visible or tapped; a placeholder holds the final size.</li>
        <li><strong>Similar homes (deferred).</strong> Streamed after the main content, with lazy images.</li>
        <li><strong>Chat and tag scripts (deferred, INP).</strong> Loaded after the page is interactive, or when the browser is idle.</li>
      </ul>

      <h2>Rendering strategy: get the HTML out early, with the photo in it</h2>
      <p>
        LCP cannot be better than the time it takes the HTML to arrive. web.dev breaks LCP into four subparts and
        gives a guideline in which <Src href={OPT_LCP}>time to first byte</Src> and the resource load each take
        roughly 40% on a well-optimized page, with the two &quot;delay&quot; subparts under 10% each, adding that
        these <Src href={OPT_LCP}>are guidelines, not strict rules</Src>. For server response it offers a rough
        guide: <Src href={TTFB}>most sites should strive to have a TTFB of 0.8 seconds or less</Src>. A listing
        page that queries a database, a search index and a mortgage widget before sending a byte spends its budget
        before the photo is even requested.
      </p>
      <p>The three rendering modes map onto the three templates:</p>
      <ul>
        <li>
          <strong>Listing detail: static with revalidation.</strong> The content is the same for every visitor and
          changes only when the listing does. Incremental Static Regeneration lets you{' '}
          <Src href={NEXT_ISR}>reduce server load by serving prerendered, static pages for most requests</Src> and{' '}
          <Src href={NEXT_ISR}>handle large amounts of content pages without long next build times</Src>. After the
          revalidation period, <Src href={NEXT_ISR}>the next visitor will still receive the cached (stale) version of the page immediately</Src>{' '}
          while a fresh one is generated. For price and status changes, do not wait for a timer:{' '}
          <code>revalidateTag</code> <Src href={NEXT_TAG}>allows you to invalidate cached data on-demand for a specific cache tag</Src>,
          and the listing sync can call it for the listings it changed.
        </li>
        <li>
          <strong>Search results: rendered per request.</strong> Filter combinations are unbounded, so the first
          page of results is rendered on the server for the requested criteria and cached briefly, if at all.
          What matters is that the result list is in the HTML rather than fetched after the script loads.
        </li>
        <li>
          <strong>Area pages: static with revalidation,</strong> on a schedule that matches how often the
          statistics change.
        </li>
      </ul>
      <p>
        <strong>Streaming</strong> is the tool for the slow parts of any of them. Without it, Next.js notes,{' '}
        <Src href={NEXT_FETCHING}>if you have any slow data requests, the whole route will be blocked from rendering until all the data is fetched</Src>.
        With a Suspense boundary or a <code>loading.js</code> file you can{' '}
        <Src href={NEXT_LOADING}>show an instant loading state from the server while the content of a route segment streams in</Src>.
        The rule for listing pages is about where the boundary goes: the hero photo, price and address belong in
        the part that is sent first. Similar homes, price history, school data and anything fetched from a third
        party go inside boundaries, with fallbacks that have the final height so that the arriving content does
        not shift the page.
      </p>
      <p>
        Keep the server-rendered part large and the hydrated part small. In the App Router, pages and layouts are
        Server Components by default, which among other things{' '}
        <Src href={NEXT_SERVER}>reduce the amount of JavaScript sent to the browser</Src>. Next.js&apos;s advice
        for the interactive pieces is to put <code>&apos;use client&apos;</code> on{' '}
        <Src href={NEXT_SERVER}>the files that define your interactive components instead of marking large parts of your UI as Client Components</Src>.
        On a listing page that means the gallery controls, the save button and the contact form are client
        components; the description, facts table and breadcrumbs are not.
      </p>

      <h2>The LCP image: the first listing photo</h2>
      <p>
        On a listing detail page the LCP element is almost always the first photo. Four things decide how soon it
        paints.
      </p>
      <h3>1. The browser must find it in the HTML</h3>
      <p>
        web.dev: <Src href={OPT_LCP}>it&apos;s critical that the resource is discoverable in the initial HTML document response by the browser&apos;s preload scanner</Src>,
        which is the case when the LCP element is an <code>img</code> whose{' '}
        <Src href={OPT_LCP}>src or srcset attributes are present in the initial HTML markup</Src>. A gallery
        component that renders an empty container and inserts the photo after its script runs fails this, however
        fast the script is. The same guide is blunt about the other common mistake:{' '}
        <Src href={OPT_LCP}>never lazy-load your LCP image</Src>.
      </p>
      <h3>2. It must be requested at high priority</h3>
      <p>
        Images do not start at the top of the browser&apos;s queue. Fetch Priority exists for this:{' '}
        <Src href={FETCH_PRIORITY}>boosting the priority of the LCP image by specifying fetchpriority=&quot;high&quot; on the image element, causing LCP to happen sooner</Src>.
        In Next.js the relevant props changed recently, which is worth knowing if you maintain older code:{' '}
        <Src href={NEXT_IMAGE}>starting with Next.js 16, the priority property has been deprecated in favor of the preload property</Src>,
        and the same page says that <Src href={NEXT_IMAGE}>in most cases, you should use loading=&quot;eager&quot; or fetchPriority=&quot;high&quot; instead of preload</Src>.
        Apply it to exactly one image per page. Marking the first five gallery photos as high priority makes them
        compete with each other.
      </p>
      <h3>3. It must be the right size and format</h3>
      <p>
        MLS photos arrive large. Serve a width that matches the slot. In Next.js, <code>sizes</code> tells the
        browser how wide the image will be at each breakpoint, and omitting it has a cost:{' '}
        <Src href={NEXT_IMAGE}>if sizes is missing, the browser assumes the image will be as wide as the viewport (100vw). This can cause unnecessarily large images to be downloaded</Src>.
        For format, the Image component negotiates by the browser&apos;s <code>Accept</code> header; WebP is the
        default and <Src href={NEXT_IMAGE}>you can enable AVIF support</Src> in configuration. One caution from
        web.dev before spending effort on compression: if the photo is discovered late, shrinking it{' '}
        <Src href={OPT_LCP}>wouldn&apos;t actually improve LCP because the time would just shift</Src> to another
        subpart. Fix discovery and priority first.
      </p>
      <h3>4. Its space must be reserved</h3>
      <p>
        Photos without dimensions are the first cause web.dev lists for layout shift, with the instruction to{' '}
        <Src href={OPT_CLS}>always include width and height size attributes on your images and video elements</Src>{' '}
        or reserve the space with CSS <code>aspect-ratio</code>. The Next.js Image component requires{' '}
        <code>width</code> and <code>height</code> (or <code>fill</code> inside a sized container), which it uses
        to <Src href={NEXT_IMAGE}>reserve space for the image and avoid layout shift during loading</Src>. MLS
        photos come in mixed aspect ratios, so give the hero slot a fixed ratio and fit the photo inside it; store
        each photo&apos;s pixel dimensions when the media worker downloads it, so the page never has to guess.
      </p>
      <p>Illustrative: a hero photo in a Next.js 16 Server Component. Names, sizes and breakpoints are examples.</p>
      <pre className="cp-code"><code>{`import Image from 'next/image';

export function HeroPhoto({ photo, address }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '3 / 2' }}>
      <Image
        src={photo.url}                  // your own storage or CDN, not the MLS media URL
        alt={\`Front of \${address}\`}
        fill
        sizes="(max-width: 768px) 100vw, 66vw"
        loading="eager"                  // never lazy for the LCP image
        fetchPriority="high"             // one image per page
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}`}</code></pre>
      <p>
        Where the photo is served from matters too. web.dev notes that hosting critical resources on the same
        origin as the document lets them{' '}
        <Src href={OPT_LCP}>save time by reusing the existing connection</Src>. Photos you have copied to your own
        storage and serve through your own CDN hostname meet that more easily than a hot link to a third-party
        media host, and most MLS licenses require your own copy in any case (see the media stage of the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture guide</Link>).
      </p>

      <h2>Galleries and carousels: one photo now, the rest when asked</h2>
      <p>
        A listing has dozens of photos and most visitors look at a few. The gallery&apos;s job at load time is to
        show one and stay out of the way.
      </p>
      <ul>
        <li>
          <strong>Slides are HTML, not script output.</strong> web.dev calls using JavaScript to initiate the
          loading of carousel content{' '}
          <Src href={CAROUSEL}>probably the single biggest performance mistake to avoid when using carousels</Src>.
          The first slide is a plain image in the markup.
        </li>
        <li>
          <strong>Everything after the first slide is lazy.</strong> The browser&apos;s <code>loading=&quot;lazy&quot;</code>{' '}
          defers a resource <Src href={LAZY_IMG}>until it reaches a calculated distance from the viewport</Src>,
          and it is the Next.js Image default. The caution is the mirror image of the LCP rule:{' '}
          <Src href={LAZY_IMG}>don&apos;t lazy-load images that are likely to be in-viewport when the page loads</Src>.
        </li>
        <li>
          <strong>Do not put forty image elements in the first response.</strong> Lazy loading saves the
          downloads, not the markup. Render the first slide and its neighbors, and add slides as the visitor
          advances. Keep the full list of photo URLs available to crawlers through structured data or a plain
          linked photo page rather than by rendering every image up front.
        </li>
        <li>
          <strong>The full-screen viewer is a separate bundle.</strong> Zoom, swipe physics and thumbnail strips
          are needed only after a tap. Lazy loading in Next.js{' '}
          <Src href={NEXT_LAZY}>helps improve the initial loading performance of an application by decreasing the amount of JavaScript needed to render a route</Src>;
          load the viewer with <code>next/dynamic</code> on first interaction.
        </li>
        <li>
          <strong>No autoplay.</strong> Besides being unwanted on a page someone is studying, autoplaying
          carousels with non-composited animations have, in web.dev&apos;s words,{' '}
          <Src href={CAROUSEL}>the potential to cause infinite CLS</Src>.
        </li>
        <li>
          <strong>A fixed frame.</strong> The slide area keeps one aspect ratio whatever the photo, so moving
          from a landscape photo to a portrait one does not move the price and the contact button.
        </li>
      </ul>

      <h2>Maps are expensive; load them when they are wanted</h2>
      <p>
        An interactive map is a large script, a stylesheet, tile requests and often a billing event, placed on a
        page where, as web.dev observes about map embeds generally,{' '}
        <Src href={EMBEDS}>many users may not interact with them</Src>. On a listing detail page the map is below
        the photos; on a search page it may be the main feature. The treatment differs.
      </p>
      <ul>
        <li>
          <strong>Listing detail and area pages: a facade.</strong> Show a static map image, or a styled
          placeholder with the address and an &quot;open map&quot; control, in a box of the final size. web.dev
          describes the pattern: <Src href={EMBEDS}>a facade is a static element that looks similar to the actual embedded third-party but is not functional and, therefore, much less taxing on the page load</Src>.
          Load the real map when the visitor taps it or when it scrolls into view, using an intersection
          observer. For an iframe embed, <code>loading=&quot;lazy&quot;</code> on the iframe does the same with no
          script; the Next.js Google Maps embed component, for example,{' '}
          <Src href={NEXT_3P}>uses the loading attribute to lazy-load the embed below the fold</Src>.
        </li>
        <li>
          <strong>Search pages: list first, map second.</strong> Render the result list in the HTML so there is
          content and an LCP candidate without the map. Load the map library as a client-only component; in
          Next.js, <code>ssr: false</code> with <code>next/dynamic</code>{' '}
          <Src href={NEXT_LAZY}>will only work for Client Components</Src>. On phones, where the list is the
          default view, do not load the map until the visitor switches to it.
        </li>
        <li>
          <strong>Always reserve the box.</strong> A map that appears and pushes the description down is a layout
          shift; web.dev lists <Src href={OPT_CLS}>ads, embeds, and iframes without dimensions</Src> among the most
          common causes.
        </li>
      </ul>
      <p>
        What the map does once it is loaded, and how to keep it responsive, is covered in{' '}
        <Link href="/blog/map-based-property-search">building map-based property search</Link>.
      </p>

      <h2>Third-party scripts: analytics, chat and tag managers</h2>
      <p>
        web.dev opens its guide on the subject this way:{' '}
        <Src href={THIRD_PARTY}>if you&apos;ve optimized your code, but your site still loads too slowly, it&apos;s probably the fault of third-party scripts</Src>.
        Real estate sites collect them: analytics, a tag manager, chat, a CRM tracker, a mortgage calculator, a
        scheduling widget, review badges, ad pixels. Each one was added for a reason, and each runs on the same
        main thread as your filter panel.
      </p>
      <p>
        The baseline rule from web.dev:{' '}
        <Src href={THIRD_PARTY}>always use async or defer for third-party scripts, unless the script is necessary for the critical rendering path</Src>,
        and <Src href={THIRD_PARTY}>if the script doesn&apos;t add clear value to your site, remove it</Src>.
        Next.js turns the loading choice into a named strategy on its Script component:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Strategy</th><th>When it loads (Next.js documentation)</th><th>Use on a listing site</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><code>beforeInteractive</code></td>
              <td><Src href={NEXT_SCRIPT}>before any Next.js code and before any page hydration occurs</Src></td>
              <td>Almost nothing. The documentation&apos;s examples are bot detectors and cookie consent managers.</td>
            </tr>
            <tr>
              <td><code>afterInteractive</code> (default)</td>
              <td><Src href={NEXT_SCRIPT}>early but after some hydration on the page occurs</Src></td>
              <td>Analytics and the tag manager, which the documentation names as good candidates.</td>
            </tr>
            <tr>
              <td><code>lazyOnload</code></td>
              <td><Src href={NEXT_SCRIPT}>during browser idle time</Src></td>
              <td>Chat, review badges, social widgets. The documentation&apos;s examples are chat support plugins and social media widgets.</td>
            </tr>
            <tr>
              <td><code>worker</code></td>
              <td><Src href={NEXT_SCRIPT}>(experimental) Load in a web worker</Src></td>
              <td>Not yet: the documentation says it <Src href={NEXT_SCRIPT}>is not yet stable and does not yet work with the App Router</Src>.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Beyond the loading strategy, four practices keep third parties from eroding the work above:</p>
      <ul>
        <li><strong>Load widgets where they are used.</strong> A mortgage calculator script belongs on listing pages, below the fold, loaded on visibility. It does not belong in the root layout.</li>
        <li><strong>Use a facade for chat.</strong> A button that looks like the chat launcher and loads the real widget on click costs nothing until someone wants to talk.</li>
        <li><strong>Govern the tag manager.</strong> A tag manager lets people outside engineering add scripts to every page without a deploy. Give it an owner, a review step and a budget, and include its tags in your measurements. A tag added on a Friday is a common cause of an INP change nobody can explain.</li>
        <li><strong>Reserve space for anything that renders.</strong> Consent banners, promotion bars and badges that insert themselves above content shift everything below them.</li>
      </ul>

      <h2>Caching and the CDN</h2>
      <p>Three kinds of response are cached, with three different lifetimes.</p>
      <ul>
        <li>
          <strong>HTML.</strong> For statically generated pages with revalidation, Next.js sets a{' '}
          <code>Cache-Control</code> header with <Src href={NEXT_SELF}>s-maxage</Src> and{' '}
          <code>stale-while-revalidate</code>, and warns that to benefit at the edge{' '}
          <Src href={NEXT_SELF}>your CDN/reverse proxy must respect these directives</Src>. Dynamically rendered
          pages are sent as <Src href={NEXT_SELF}>private, no-cache, no-store, max-age=0, must-revalidate</Src>,
          so a search results page is not cached by the CDN unless you design it to be. Check the response
          headers of each template; do not assume.
        </li>
        <li>
          <strong>Build assets.</strong> Scripts and styles with a content hash in the file name get{' '}
          <Src href={NEXT_SELF}>public, max-age=31536000, immutable</Src> and can sit at the edge indefinitely.
        </li>
        <li>
          <strong>Photos.</strong> The heaviest bytes on the site. Serve resized variants from a CDN in front of
          your own storage with long lifetimes and versioned URLs, so a replaced photo gets a new URL instead of a
          purge. Decide whether resizing happens in the application or in a separate image service; the{' '}
          <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link> covers that choice.
        </li>
      </ul>
      <p>
        Cached pages make invalidation part of correctness. A listing that goes under contract must not show as
        active for the length of a cache lifetime, so the sync that records the change should also invalidate the
        listing page, the area pages that count it, and any cached search responses. Tie cache tags to listing and
        area identifiers from the start.
      </p>
      <p>
        Peregrine&apos;s{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        a front end built this way: a Next.js frontend optimized with ISR, dynamic imports and image optimization
        through S3 and a CDN. See also our{' '}
        <Link href="/services/nextjs-development">Next.js development service</Link>.
      </p>

      <h2>INP on filter-heavy search pages</h2>
      <p>
        A search page is the most interactive page on the site, and INP reports close to the worst interaction a
        visitor had: <Src href={INP}>the final INP value is the longest interaction observed, ignoring outliers</Src>.
        One slow filter click sets the number. web.dev splits every interaction into{' '}
        <Src href={OPT_INP}>three subparts</Src>: input delay, processing duration and presentation delay. Each has
        a typical cause on a search page.
      </p>
      <ul>
        <li>
          <strong>Input delay: the main thread is busy.</strong> The visitor taps a filter while the page is still
          hydrating or a third-party script is executing. web.dev defines the unit:{' '}
          <Src href={LONG_TASKS}>any task that takes longer than 50 milliseconds is a long task</Src>, and the
          browser cannot respond while one runs. Hydration is the largest task on most server-rendered pages; in
          Next.js&apos;s description it is{' '}
          <Src href={NEXT_SERVER}>React&apos;s process for attaching event handlers to the DOM, to make the static HTML interactive</Src>.
          The less of the page that is a client component, the shorter that task. Keep result cards as server
          output and hydrate only the filter panel, the sort control and the save buttons.
        </li>
        <li>
          <strong>Processing: the handler does everything at once.</strong> A checkbox handler that updates state,
          rewrites the URL, re-renders fifty cards, recomputes the map markers and fires three analytics events
          before returning will not finish inside the threshold on a mid-range phone. Paint the cheap feedback
          first (the checkbox, a pending state on the list), then do the expensive work in a separate task and
          let the network request run in the background. In React, <code>useTransition</code>{' '}
          <Src href={REACT_TRANSITION}>lets you render a part of the UI in the background</Src>, which suits the
          list update.
        </li>
        <li>
          <strong>Presentation: too much to draw.</strong> Replacing a long list means a large layout and paint.
          Render a bounded number of cards, keep card markup light, and avoid re-creating map markers that did not
          change.
        </li>
      </ul>
      <p>Other habits that help on this template:</p>
      <ul>
        <li>Debounce text inputs and range sliders so that a drag is one search, not thirty.</li>
        <li>Cancel superseded requests, so a late response does not trigger a second full re-render.</li>
        <li>Load the map library after the list is interactive, not in the same task as hydration.</li>
        <li>Keep analytics calls out of the handler&apos;s synchronous path.</li>
        <li>Test with the filter panel a real listing site has, not a three-checkbox demo.</li>
      </ul>

      <h2>Measuring and setting a budget</h2>
      <p>
        web.dev&apos;s definition is a good starting point:{' '}
        <Src href={BUDGET}>a performance budget is a set of limits imposed on metrics that affect site performance</Src>.
        For a listing site we would set it per template and per device class, with two layers.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Layer</th><th>What it limits</th><th>Where it is checked</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Outcome budget</strong></td>
              <td>LCP, INP and CLS at the 75th percentile, per template, on mobile and desktop, against the published &quot;good&quot; thresholds</td>
              <td>Your field data, reviewed weekly and alerted on</td>
            </tr>
            <tr>
              <td><strong>Input budget</strong></td>
              <td>The things that cause the outcomes: script shipped per template, bytes of the hero image at each breakpoint, number of third-party origins, images requested before interaction</td>
              <td>The build and a lab run in continuous integration, failing the change that breaks it</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The outcome thresholds are published. The input limits are yours to set: measure the current state of
        each template, decide what you are willing to defend, and write the numbers down. We do not suggest
        figures here because they depend on your design and audience. The process is what matters:
      </p>
      <ol>
        <li>Report LCP, INP and CLS from real visitors with the web-vitals library, tagging each report with the template, the device class and whether the visit was a first load.</li>
        <li>Use the library&apos;s attribution build, which lets you <Src href={WEB_VITALS_LIB}>send additional data to help you debug why the metric values are the way they are</Src>: which element was the LCP, which interaction was slow.</li>
        <li>Look at the 75th percentile per template, not the site average.</li>
        <li>Reproduce the worst template in the lab on a throttled mid-range profile and find the cause.</li>
        <li>Fix it, add an input budget that would have caught it, and watch the field number over the following four weeks, because public field data is a 28-day window.</li>
      </ol>

      <h2>A checklist for each template</h2>
      <h3>Listing detail</h3>
      <ul className="cp-checklist">
        <li>First photo is an <code>img</code> in the server HTML, eager, high priority, with <code>sizes</code> and reserved dimensions.</li>
        <li>No other image is high priority; photos after the first are lazy and not all rendered up front.</li>
        <li>Photos come from your own storage through a CDN, in a modern format, at the slot&apos;s width.</li>
        <li>Price, status, address and facts are in the first chunk of HTML; slow sections stream in behind sized fallbacks.</li>
        <li>The page is statically generated and invalidated by the listing sync on change.</li>
        <li>Map and full-screen viewer load on visibility or tap, into reserved boxes.</li>
        <li>Chat and widgets load on idle or on click; nothing third-party loads before interactivity without a reason.</li>
      </ul>
      <h3>Search results</h3>
      <ul className="cp-checklist">
        <li>The first page of results is in the server HTML for the requested criteria.</li>
        <li>Only the first row of card images is eager; the rest are lazy, all with dimensions.</li>
        <li>Result cards are server-rendered; client components are limited to filters, sort, save and the map.</li>
        <li>A filter change paints feedback at once and does the heavy update in a separate task.</li>
        <li>Inputs are debounced and superseded requests canceled.</li>
        <li>The map loads after the list is interactive, and not at all on phones until requested.</li>
        <li>The number of cards rendered at once is bounded.</li>
      </ul>
      <h3>Area and neighborhood pages</h3>
      <ul className="cp-checklist">
        <li>Statically generated with revalidation; statistics computed ahead of the request, not during it.</li>
        <li>The heading and summary text can be the LCP element; if a banner image is, it follows the hero photo rules.</li>
        <li>Charts render as server-side SVG or images where possible; an interactive chart library loads on visibility.</li>
        <li>Listing card grid images are lazy with dimensions; the grid has a stable height while loading.</li>
        <li>Embedded maps and school or transit widgets use facades and reserved boxes.</li>
        <li>Late-inserted elements (consent bar, promotion bar) have reserved space or overlay the page instead of pushing it.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'What are the Core Web Vitals thresholds?', answer: ['As published on web.dev: LCP ', ['within 2.5 seconds of when the page first starts loading', VITALS], ', INP of ', ['200 milliseconds or less', VITALS], ' and CLS of 0.1 or less, each assessed at ', ['the 75th percentile of page loads, segmented across mobile and desktop devices', VITALS], '.'] },
        { question: 'Why does PageSpeed Insights show the same field data for every listing page?', answer: ['Because a single listing page rarely has enough visits to appear in the Chrome UX Report on its own. In that case PageSpeed Insights ', ['will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website', PSI], '. To see how one template performs, collect your own field data and tag it by template.'] },
        { question: 'Should the first listing photo be lazy-loaded?', answer: ['No. It is usually the LCP element, and web.dev’s guidance is to ', ['never lazy-load your LCP image', OPT_LCP], '. Load it eagerly with high fetch priority, make sure it is in the server HTML, and lazy-load the photos after it.'] },
        { question: 'Does Next.js still use the priority prop for the hero image?', answer: ['The Image documentation says that ', ['starting with Next.js 16, the priority property has been deprecated in favor of the preload property', NEXT_IMAGE], ', and that in most cases you should use loading="eager" or fetchPriority="high" instead of preload.'] },
        { question: 'How should a chat widget or tag manager be loaded?', answer: ['After the page is usable. In Next.js, the default afterInteractive strategy loads a script ', ['early but after some hydration on the page occurs', NEXT_SCRIPT], ', which the documentation suggests for tag managers and analytics, and lazyOnload loads ', ['during browser idle time', NEXT_SCRIPT], ', which it suggests for chat support plugins. A click-to-load facade is lighter still.'] },
      ]} />

      <p className="cp-note">
        Thresholds, definitions and framework behavior were read from the linked web.dev, Chrome, Google and
        Next.js pages on October 13, 2026 (Next.js documentation at version 16.4.0). They change; check the
        current pages for the version you run. No performance result is claimed for any site. The code sample is
        illustrative.
      </p>
      <p>
        Rebuilding listing, search or area pages on Next.js? See our{' '}
        <Link href="/services/nextjs-development">Next.js development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
