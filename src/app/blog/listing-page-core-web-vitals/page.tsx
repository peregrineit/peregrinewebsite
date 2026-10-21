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
        A real estate site is mostly three page templates repeated many thousands of times, and each strains a
        different metric. A listing detail page is a large photograph followed by dozens more, a map and a contact
        form: its risk is the time until the first photo appears and the layout moving as the rest arrives. A
        search results page is filters, a map and a list that re-render together when a checkbox changes: its
        risk is responsiveness. An area page is statistics and a grid of listing cards, often with embedded
        charts: its risk is layout shift and script weight.
      </p>
      <p>
        So &quot;make the site faster&quot; is not one task. It is a per-template budget and a set of build
        decisions that hold on every page generated from the template. Our{' '}
        <Link href="/blog/real-estate-website-seo-aeo-geo">SEO, AEO and GEO guide</Link> covers what Google says
        about Core Web Vitals and ranking; this article is the implementation side. Examples use Next.js because
        its documentation states the relevant behavior precisely; the principles apply to any server-rendering
        framework. No measured result for any site appears here: the numbers that matter are the ones from your
        own visitors.
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
        <Src href={VITALS}>at the 75th percentile for all three</Src>.
      </p>

      <h2>Field data and lab data answer different questions</h2>
      <p>
        There are two kinds of measurement. web.dev&apos;s definitions: lab data
        is <Src href={LAB_FIELD}>collected in a controlled environment with predefined device and network settings</Src>;
        field data is <Src href={LAB_FIELD}>collected from the real users visiting your site</Src>. The thresholds
        above are judged on field data.
      </p>
      <ul>
        <li>
          <strong>CrUX</strong> is the public field dataset. The Chrome User Experience Report{' '}
          <Src href={CRUX}>reflects how real-world Chrome users experience popular destinations on the web</Src>.
          A page or origin is included only if it is <Src href={CRUX_METHOD}>publicly discoverable</Src> and{' '}
          <Src href={CRUX_METHOD}>sufficiently popular</Src>.
        </li>
        <li>
          <strong>PageSpeed Insights</strong> shows both kinds for a URL. Its field section is CrUX data{' '}
          <Src href={PSI}>over the previous 28-day collection period</Src>; its lab section is a Lighthouse run.
          Lab data{' '}
          <Src href={PSI}>is useful for debugging issues, as it is collected in a controlled environment</Src>,
          while field data <Src href={PSI}>is useful for capturing true, real-world user experience - but has a more limited set of metrics</Src>.
        </li>
        <li>
          <strong>The web-vitals library</strong> is how you collect your own field data. It is{' '}
          <Src href={WEB_VITALS_LIB}>a tiny (~3K, brotli&apos;d), modular library for measuring all the Web Vitals metrics on real users</Src>,{' '}
          <Src href={WEB_VITALS_LIB}>in a way that accurately matches how they&apos;re measured by Chrome</Src>.
          In Next.js, the <code>useReportWebVitals</code> hook{' '}
          <Src href={NEXT_VITALS}>can be used in combination with your analytics service</Src>.
        </li>
      </ul>
      <p>
        Listing sites have a particular reason to collect their own. An individual listing page is live for a
        limited time and may have few visitors, so it can lack page-level data in CrUX. When that happens,
        PageSpeed Insights{' '}
        <Src href={PSI}>will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website</Src>.
        The number you then see for a listing URL blends the homepage, blog, search and every listing. It cannot
        tell you that listing detail pages have an LCP problem while search pages have an INP problem. Your own
        measurements, tagged with the template name, can.
      </p>
      <p>
        Lab and field also disagree for structural reasons.{' '}
        <Src href={LAB_FIELD}>The LCP element identified in a lab test may not be the same LCP element users see</Src>,
        and a lab run that loads a page without clicking anything says nothing about how the filter panel
        responds. Use the lab to find causes and prevent regressions; use the field to decide whether there is a
        problem.
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
        these <Src href={OPT_LCP}>are guidelines, not strict rules</Src>. For server response its rough guide is
        that <Src href={TTFB}>most sites should strive to have a TTFB of 0.8 seconds or less</Src>. A listing
        page that waits on a database, a search index and a mortgage widget before sending a byte spends that
        time before the photo is even requested.
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
          and the listing sync can call it through a route handler for the listings it changed. In the current
          documentation the function takes a second argument that sets how long stale content may still be
          served; for a caller outside a Server Action that needs the old data gone, it says to{' '}
          <Src href={NEXT_TAG}>pass {'{ expire: 0 }'} to expire the data immediately</Src>.
        </li>
        <li>
          <strong>Search results: rendered per request.</strong> Filter combinations are unbounded, so the first
          page of results is rendered on the server for the requested criteria and cached briefly, if at all.
          What matters is that the result list is in the HTML, not fetched after the script loads, with only the
          first row of card images eager.
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
        On a listing page, the hero photo, price and address belong in the part that is sent first. Similar
        homes, price history, school data and anything fetched from a third party go inside boundaries, with
        fallbacks of the final height so that arriving content does not shift the page.
      </p>
      <p>
        Keep the server-rendered part large and the hydrated part small. In the App Router, pages and layouts are
        Server Components by default, which among other things{' '}
        <Src href={NEXT_SERVER}>reduce the amount of JavaScript sent to the browser</Src>. Next.js&apos;s advice
        is to put <code>&apos;use client&apos;</code> on{' '}
        <Src href={NEXT_SERVER}>the files that define your interactive components instead of marking large parts of your UI as Client Components</Src>:
        the gallery controls, the save button and the contact form, but not the description, facts table or
        breadcrumbs.
      </p>

      <h2>The LCP image: the first listing photo</h2>
      <p>
        On a listing detail page the LCP element is usually the first photo. Four things decide how soon it
        paints.
      </p>
      <h3>1. The browser must find it in the HTML</h3>
      <p>
        web.dev: <Src href={OPT_LCP}>it&apos;s critical that the resource is discoverable in the initial HTML document response by the browser&apos;s preload scanner</Src>,
        which is the case when the LCP element is an <code>img</code> whose{' '}
        <Src href={OPT_LCP}>src or srcset attributes are present in the initial HTML markup</Src>. A gallery
        component that renders an empty container and inserts the photo after its script runs fails this, however
        fast the script is. The same guide warns about the other common mistake:{' '}
        <Src href={OPT_LCP}>never lazy-load your LCP image</Src>.
      </p>
      <h3>2. It must be requested at high priority</h3>
      <p>
        Images do not start at the top of the browser&apos;s queue. Fetch Priority exists for this:{' '}
        <Src href={FETCH_PRIORITY}>boosting the priority of the LCP image by specifying fetchpriority=&quot;high&quot; on the image element, causing LCP to happen sooner</Src>.
        In Next.js the props changed in version 16, which matters if you maintain older code. The Image
        documentation says that{' '}
        <Src href={NEXT_IMAGE}>starting with Next.js 16, the priority property has been deprecated in favor of the preload property</Src>,
        where <code>preload</code> inserts a preload link in the document head, and adds that{' '}
        <Src href={NEXT_IMAGE}>in most cases, you should use loading=&quot;eager&quot; or fetchPriority=&quot;high&quot; instead of preload</Src>.
        Apply it to one image per page. Marking the first five gallery photos as high priority makes them compete
        with each other.
      </p>
      <h3>3. It must be the right size and format</h3>
      <p>
        MLS photos arrive large. Serve a width that matches the slot. In Next.js, <code>sizes</code> tells the
        browser how wide the image will be at each breakpoint, and omitting it has a cost:{' '}
        <Src href={NEXT_IMAGE}>if sizes is missing, the browser assumes the image will be as wide as the viewport (100vw). This can cause unnecessarily large images to be downloaded</Src>.
        For format, the Image component negotiates by the browser&apos;s <code>Accept</code> header; WebP is the
        default and <Src href={NEXT_IMAGE}>you can enable AVIF support</Src> in configuration. One caution from
        web.dev: if the photo is discovered late, shrinking it{' '}
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
        photos come in mixed aspect ratios, so give the hero slot a fixed ratio and fit the photo inside it, and
        store each photo&apos;s pixel dimensions when the media worker downloads it.
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
        <Src href={OPT_LCP}>save time by reusing the existing connection</Src>. Photos copied to your own storage
        can be served that way, or at least from a hostname you control; a hot link to a third-party media host
        cannot. Some feeds also require your own copy of media: see the media stage of the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture guide</Link>.
      </p>

      <h2>Galleries and carousels: one photo now, the rest when asked</h2>
      <p>
        A listing can have dozens of photos. The gallery&apos;s job at load time is to show one and stay out of
        the way.
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
          <strong>Do not put every image element in the first response.</strong> Lazy loading saves the
          downloads, not the markup. Render the first slide and its neighbors, and add slides as the visitor
          advances.
        </li>
        <li>
          <strong>The full-screen viewer is a separate bundle.</strong> Zoom, swipe physics and thumbnail strips
          are needed only after a tap. Lazy loading in Next.js{' '}
          <Src href={NEXT_LAZY}>helps improve the initial loading performance of an application by decreasing the amount of JavaScript needed to render a route</Src>;
          load the viewer with <code>next/dynamic</code> on first interaction.
        </li>
        <li>
          <strong>No autoplay.</strong> Autoplaying carousels with non-composited animations have, in
          web.dev&apos;s words,{' '}
          <Src href={CAROUSEL}>the potential to cause infinite CLS</Src>.
        </li>
        <li>
          <strong>A fixed frame.</strong> The slide area keeps one aspect ratio whatever the photo, so moving
          from a landscape photo to a portrait one does not move the price and the contact button.
        </li>
      </ul>

      <h2>Maps are expensive; load them when they are wanted</h2>
      <p>
        An interactive map is a script, a stylesheet, tile requests and often a billing event, placed on a page
        where, as web.dev observes about map embeds generally,{' '}
        <Src href={EMBEDS}>many users may not interact with them</Src>.
      </p>
      <ul>
        <li>
          <strong>Listing detail and area pages: a facade.</strong> Show a static map image, or a placeholder
          with the address and an &quot;open map&quot; control, in a box of the final size. In web.dev&apos;s words,{' '}
          <Src href={EMBEDS}>a facade is a static element that looks similar to the actual embedded third-party but is not functional and, therefore, much less taxing on the page load</Src>.
          Load the real map when the visitor taps it or scrolls it into view. For an iframe embed,{' '}
          <code>loading=&quot;lazy&quot;</code> does the same with no script; the Next.js Google Maps embed
          component, for example,{' '}
          <Src href={NEXT_3P}>uses the loading attribute to lazy-load the embed below the fold</Src>.
        </li>
        <li>
          <strong>Search pages: list first, map second.</strong> Render the result list in the HTML so there is
          content and an LCP candidate without the map. Load the map library as a client-only component; in
          Next.js, <code>ssr: false</code> with <code>next/dynamic</code>{' '}
          <Src href={NEXT_LAZY}>will only work for Client Components</Src>. On phones, where the list is the
          default view, wait until the visitor switches to the map.
        </li>
        <li>
          <strong>Always reserve the box.</strong> A map that appears and pushes the description down is a layout
          shift; web.dev lists <Src href={OPT_CLS}>ads, embeds, and iframes without dimensions</Src> among the most
          common causes.
        </li>
      </ul>

      <h2>Third-party scripts: analytics, chat and tag managers</h2>
      <p>
        Real estate sites collect third-party scripts: analytics, a tag manager, chat, a CRM tracker, a mortgage
        calculator, a scheduling widget, review badges, ad pixels. Each runs on the same main thread as your
        filter panel. The baseline rule from web.dev:{' '}
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
        <li><strong>Load widgets where they are used.</strong> A mortgage calculator script belongs on listing pages, below the fold, loaded on visibility, not in the root layout.</li>
        <li><strong>Use a facade for chat.</strong> A button that looks like the chat launcher and loads the real widget on click costs almost nothing until someone wants to talk.</li>
        <li><strong>Govern the tag manager.</strong> It lets people outside engineering add scripts to every page without a deploy. Give it an owner, a review step and a budget, and include its tags in your measurements.</li>
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
          <Src href={NEXT_SELF}>public, max-age=31536000, immutable</Src>.
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
        active for the length of a cache lifetime, so the sync that records the change should also{' '}
        <Link href="/blog/listing-lifecycle-sold-expired-deleted">invalidate the listing page</Link>, the area
        pages that count it, and any cached search responses. Tie cache tags to listing and
        area identifiers from the start.
      </p>
      <p>
        Peregrine&apos;s{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        a Next.js frontend optimized with ISR, dynamic imports and image optimization through S3 and a CDN.
      </p>

      <h2>INP on filter-heavy search pages</h2>
      <p>
        A search page is the most interactive page on the site, and{' '}
        <Src href={INP}>the final INP value is the longest interaction observed, ignoring outliers</Src>, so one
        slow filter click can set the number. web.dev splits every interaction into{' '}
        <Src href={OPT_INP}>three subparts</Src>: input delay, processing duration and presentation delay. Each has
        a typical cause on a search page.
      </p>
      <ul>
        <li>
          <strong>Input delay: the main thread is busy.</strong> The visitor taps a filter while the page is still
          hydrating or a third-party script is executing. web.dev defines the unit:{' '}
          <Src href={LONG_TASKS}>any task that takes longer than 50 milliseconds is a long task</Src>, and the
          browser cannot respond while one runs. Hydration is often such a task on a server-rendered page; in
          Next.js&apos;s description it is{' '}
          <Src href={NEXT_SERVER}>React&apos;s process for attaching event handlers to the DOM, to make the static HTML interactive</Src>.
          The less of the page that is a client component, the less there is to hydrate. Keep result cards as
          server output and hydrate only the filter panel, the sort control and the save buttons.
        </li>
        <li>
          <strong>Processing: the handler does everything at once.</strong> A checkbox handler that updates state,
          rewrites the URL, re-renders fifty cards, recomputes the map markers and fires analytics events before
          returning risks missing the threshold on a mid-range phone. Paint the cheap feedback first (the
          checkbox, a pending state on the list), then do the expensive work in a separate task. In React,{' '}
          <code>useTransition</code>{' '}
          <Src href={REACT_TRANSITION}>lets you render a part of the UI in the background</Src>, which suits the
          list update.
        </li>
        <li>
          <strong>Presentation: too much to draw.</strong> Replacing a long list means a large layout and paint.
          Render a bounded number of cards, keep card markup light, and avoid re-creating map markers that did not
          change.
        </li>
      </ul>
      <p>
        Also debounce text inputs and range sliders so that a drag is one search, cancel superseded requests so a
        late response does not trigger a second full re-render, and keep analytics calls out of the
        handler&apos;s synchronous path. The request side of this is covered in{' '}
        <Link href="/blog/map-based-property-search">building map-based property search</Link>.
      </p>

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
        figures because they depend on your design and audience. The process:
      </p>
      <ol>
        <li>Report LCP, INP and CLS from real visitors with the web-vitals library, tagging each report with the template and the device class.</li>
        <li>Use the library&apos;s attribution build, which lets you <Src href={WEB_VITALS_LIB}>send additional data to help you debug why the metric values are the way they are</Src>: which element was the LCP, which interaction was slow.</li>
        <li>Look at the 75th percentile per template, not the site average, and reproduce the worst template in the lab on a throttled mid-range profile.</li>
        <li>Fix the cause, add an input budget that would have caught it, and watch the field number over the following four weeks, because public field data is a 28-day window.</li>
      </ol>

      <h2>Area and neighborhood pages: the same rules, applied</h2>
      <ul className="cp-checklist">
        <li>Statically generated with revalidation; statistics computed ahead of the request, not during it.</li>
        <li>The heading and summary text can be the LCP element; if a banner image is, it follows the hero photo rules.</li>
        <li>Charts render as server-side SVG or images where possible; an interactive chart library loads on visibility.</li>
        <li>Listing card images are lazy with dimensions, and the grid keeps a stable height while loading.</li>
        <li>Embedded maps and school or transit widgets use facades and reserved boxes.</li>
        <li>Late-inserted elements (consent bar, promotion bar) have reserved space or overlay the page instead of pushing it.</li>
      </ul>

            <GuideFaq slug={SLUG} items={[
        { question: 'What are the Core Web Vitals thresholds?', answer: ['As published on web.dev: LCP ', ['within 2.5 seconds of when the page first starts loading', VITALS], ', INP of ', ['200 milliseconds or less', VITALS], ' and CLS of 0.1 or less, each assessed at ', ['the 75th percentile of page loads, segmented across mobile and desktop devices', VITALS], '.'] },
        { question: 'Why does PageSpeed Insights show the same field data for every listing page?', answer: ['Because a single listing page rarely has enough visits to appear in the Chrome UX Report on its own. In that case PageSpeed Insights ', ['will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website', PSI], '. To see how one template performs, collect your own field data and tag it by template.'] },
        { question: 'Does Next.js still use the priority prop for the hero image?', answer: ['The Image documentation says that ', ['starting with Next.js 16, the priority property has been deprecated in favor of the preload property', NEXT_IMAGE], ', and that in most cases you should use loading="eager" or fetchPriority="high" instead of preload.'] },
      ]} />

      <p className="cp-note">
        Thresholds, definitions and framework behavior were read from the linked web.dev, Chrome, Google, React
        and Next.js pages on October 13, 2026 (Next.js documentation at version 16.4.0). They change; check the
        current pages for the version you run. No performance result is claimed for any site. The code sample is
        illustrative and was not built.
      </p>
      <p>
        Rebuilding listing, search or area pages on Next.js? See our{' '}
        <Link href="/services/nextjs-development">Next.js development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
