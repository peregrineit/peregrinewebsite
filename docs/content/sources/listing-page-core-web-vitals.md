# Source verification log: /blog/listing-page-core-web-vitals

Every URL below was fetched on **2026-10-13** with `curl` (browser user agent, HTTP 200 unless noted), the HTML was stripped to text, and each statement was checked against that text by script. "Verbatim" means the link text in the article appears on the page word for word. For a paraphrased link the exact sentence relied on is given.

| URL | Article link text | Sentence or figure relied on |
|---|---|---|
| https://web.dev/articles/lcp | the render time of the largest image, text block, or video visible in the viewport | verbatim on the page |
| https://web.dev/articles/vitals | within 2.5 seconds of when the page first starts loading | verbatim on the page |
| https://web.dev/articles/vitals | 200 milliseconds or less | verbatim on the page |
| https://web.dev/articles/vitals | maintain a CLS of 0.1 | verbatim on the page |
| https://web.dev/articles/vitals | the 75th percentile of page loads, segmented across mobile and desktop devices | verbatim on the page |
| https://web.dev/articles/vitals | at the 75th percentile for all three | verbatim on the page |
| https://web.dev/articles/inp | observes the latency of all interactions a user has made with the page | verbatim on the page |
| https://web.dev/articles/inp | the final INP value is the longest interaction observed, ignoring outliers | verbatim on the page |
| https://web.dev/articles/lab-and-field-data-differences | collected in a controlled environment with predefined device and network settings | verbatim on the page |
| https://web.dev/articles/lab-and-field-data-differences | collected from the real users visiting your site | verbatim on the page |
| https://web.dev/articles/lab-and-field-data-differences | The LCP element identified in a lab test may not be the same LCP element users see | verbatim on the page |
| https://developer.chrome.com/docs/crux | reflects how real-world Chrome users experience popular destinations on the web | verbatim on the page |
| https://developer.chrome.com/docs/crux/methodology | publicly discoverable | verbatim on the page |
| https://developer.chrome.com/docs/crux/methodology | sufficiently popular | verbatim on the page |
| https://developers.google.com/speed/docs/insights/v5/about | over the previous 28-day collection period | verbatim on the page |
| https://developers.google.com/speed/docs/insights/v5/about | is useful for debugging issues, as it is collected in a controlled environment | verbatim on the page |
| https://developers.google.com/speed/docs/insights/v5/about | is useful for capturing true, real-world user experience - but has a more limited set of metrics | verbatim on the page |
| https://developers.google.com/speed/docs/insights/v5/about | will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website | verbatim on the page |
| https://github.com/GoogleChrome/web-vitals/blob/main/README.md | a tiny (~3K, brotli&apos;d), modular library for measuring all the Web Vitals metrics on real users | verbatim on the page |
| https://github.com/GoogleChrome/web-vitals/blob/main/README.md | in a way that accurately matches how they&apos;re measured by Chrome | verbatim on the page |
| https://github.com/GoogleChrome/web-vitals/blob/main/README.md | send additional data to help you debug why the metric values are the way they are | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/functions/use-report-web-vitals | can be used in combination with your analytics service | verbatim on the page |
| https://web.dev/articles/optimize-lcp | time to first byte | verbatim on the page |
| https://web.dev/articles/optimize-lcp | are guidelines, not strict rules | verbatim on the page |
| https://web.dev/articles/optimize-lcp | it&apos;s critical that the resource is discoverable in the initial HTML document response by the browser&apos;s preload scanner | verbatim on the page |
| https://web.dev/articles/optimize-lcp | src or srcset attributes are present in the initial HTML markup | verbatim on the page |
| https://web.dev/articles/optimize-lcp | never lazy-load your LCP image | verbatim on the page |
| https://web.dev/articles/optimize-lcp | wouldn&apos;t actually improve LCP because the time would just shift | verbatim on the page |
| https://web.dev/articles/optimize-lcp | save time by reusing the existing connection | verbatim on the page |
| https://web.dev/articles/optimize-ttfb | most sites should strive to have a TTFB of 0.8 seconds or less | verbatim on the page |
| https://nextjs.org/docs/app/guides/incremental-static-regeneration | reduce server load by serving prerendered, static pages for most requests | verbatim on the page |
| https://nextjs.org/docs/app/guides/incremental-static-regeneration | handle large amounts of content pages without long next build times | verbatim on the page |
| https://nextjs.org/docs/app/guides/incremental-static-regeneration | the next visitor will still receive the cached (stale) version of the page immediately | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/functions/revalidateTag | allows you to invalidate cached data on-demand for a specific cache tag | verbatim on the page |
| https://nextjs.org/docs/app/getting-started/fetching-data | if you have any slow data requests, the whole route will be blocked from rendering until all the data is fetched | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/file-conventions/loading | show an instant loading state from the server while the content of a route segment streams in | verbatim on the page |
| https://nextjs.org/docs/app/getting-started/server-and-client-components | reduce the amount of JavaScript sent to the browser | verbatim on the page |
| https://nextjs.org/docs/app/getting-started/server-and-client-components | the files that define your interactive components instead of marking large parts of your UI as Client Components | verbatim on the page |
| https://nextjs.org/docs/app/getting-started/server-and-client-components | React&apos;s process for attaching event handlers to the DOM, to make the static HTML interactive | verbatim on the page |
| https://web.dev/articles/fetch-priority | boosting the priority of the LCP image by specifying fetchpriority=&quot;high&quot; on the image element, causing LCP to happen sooner | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/image | starting with Next.js 16, the priority property has been deprecated in favor of the preload property | "Starting with Next.js 16, the `priority` property has been deprecated in favor of the [`preload`](#preload) property in order to make the behavior clear." |
| https://nextjs.org/docs/app/api-reference/components/image | in most cases, you should use loading=&quot;eager&quot; or fetchPriority=&quot;high&quot; instead of preload | "In most cases, you should use `loading="eager"` or `fetchPriority="high"` instead of `preload`." |
| https://nextjs.org/docs/app/api-reference/components/image | if sizes is missing, the browser assumes the image will be as wide as the viewport (100vw). This can cause unnecessarily large images to be downloaded | "If `sizes` is missing, the browser assumes the image will be as wide as the viewport (`100vw`). This can cause unnecessarily large images to be downloaded." |
| https://nextjs.org/docs/app/api-reference/components/image | you can enable AVIF support | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/image | reserve space for the image and avoid layout shift during loading | verbatim on the page |
| https://web.dev/articles/optimize-cls | always include width and height size attributes on your images and video elements | verbatim on the page |
| https://web.dev/articles/optimize-cls | ads, embeds, and iframes without dimensions | verbatim on the page |
| https://web.dev/articles/carousel-best-practices | probably the single biggest performance mistake to avoid when using carousels | verbatim on the page |
| https://web.dev/articles/carousel-best-practices | the potential to cause infinite CLS | verbatim on the page |
| https://web.dev/articles/browser-level-image-lazy-loading | until it reaches a calculated distance from the viewport | verbatim on the page |
| https://web.dev/articles/browser-level-image-lazy-loading | don&apos;t lazy-load images that are likely to be in-viewport when the page loads | verbatim on the page |
| https://nextjs.org/docs/app/guides/lazy-loading | helps improve the initial loading performance of an application by decreasing the amount of JavaScript needed to render a route | verbatim on the page |
| https://nextjs.org/docs/app/guides/lazy-loading | will only work for Client Components | verbatim on the page |
| https://web.dev/articles/embed-best-practices | many users may not interact with them | verbatim on the page |
| https://web.dev/articles/embed-best-practices | a facade is a static element that looks similar to the actual embedded third-party but is not functional and, therefore, much less taxing on the page load | verbatim on the page |
| https://nextjs.org/docs/app/guides/third-party-libraries | uses the loading attribute to lazy-load the embed below the fold | verbatim on the page |
| https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript | always use async or defer for third-party scripts, unless the script is necessary for the critical rendering path | verbatim on the page |
| https://web.dev/articles/optimizing-content-efficiency-loading-third-party-javascript | if the script doesn&apos;t add clear value to your site, remove it | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/script | before any Next.js code and before any page hydration occurs | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/script | early but after some hydration on the page occurs | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/script | during browser idle time | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/script | (experimental) Load in a web worker | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/components/script | is not yet stable and does not yet work with the App Router | verbatim on the page |
| https://nextjs.org/docs/app/guides/self-hosting | s-maxage | verbatim on the page |
| https://nextjs.org/docs/app/guides/self-hosting | your CDN/reverse proxy must respect these directives | verbatim on the page |
| https://nextjs.org/docs/app/guides/self-hosting | private, no-cache, no-store, max-age=0, must-revalidate | verbatim on the page |
| https://nextjs.org/docs/app/guides/self-hosting | public, max-age=31536000, immutable | verbatim on the page |
| https://web.dev/articles/optimize-inp | three subparts | verbatim on the page |
| https://web.dev/articles/optimize-long-tasks | any task that takes longer than 50 milliseconds is a long task | verbatim on the page |
| https://react.dev/reference/react/useTransition | lets you render a part of the UI in the background | verbatim on the page |
| https://web.dev/articles/performance-budgets-101 | a performance budget is a set of limits imposed on metrics that affect site performance | verbatim on the page |
| https://nextjs.org/docs/app/api-reference/functions/revalidateTag | pass { expire: 0 } to expire the data immediately | "When the invalidation comes from outside a Server Action, for example a webhook or another service calling a Route Handler, updateTag is not available. Pass { expire: 0 } to expire the data immediately" (added in QA, 2026-10-13) |

## Notes

- Fetch date is 2026-10-13: the writing session crossed midnight after the first two articles of the batch. The guide's `datePublished` stays 2026-10-12 as assigned.
- nextjs.org served the Image component page to curl as Markdown, so quotes from it carry backticks; the article drops them. Next.js pages showed "Latest Version 16.4.0".
- web.dev/articles/vitals prints the CLS threshold as "pages should maintain a CLS of 0.1. or less" (stray full stop in the source).
- web.dev/articles/optimize-lcp, LCP subpart guideline table: "Time to first byte ~40% | Resource load delay <10% | Resource load duration ~40% | Element render delay <10%" followed by "Note that these time breakdowns are guidelines, not strict rules."
- Next.js Script examples relied on: beforeInteractive "Bot detectors, Cookie consent managers"; afterInteractive "Tag managers, Analytics"; lazyOnload "Chat support plugins, Social media widgets"; worker "The worker strategy is not yet stable and does not yet work with the App Router."
- The web-vitals README was read at the GitHub page above and at https://raw.githubusercontent.com/GoogleChrome/web-vitals/main/README.md.
- https://web.dev/articles/serve-images-avif returned 404 and is not cited.
- Peregrine statement: `/case-studies/scaling-real-estate-saas-platform` states "Optimized Next.js frontend with ISR, dynamic imports, image optimization via S3 + CDN." The article repeats only that. The case study's search-time and percentage figures are deliberately not repeated in this article.
- Not stated: any benchmark, Lighthouse score, CrUX figure or before-and-after result for any site, including peregrine-it.com; any numeric input budget (bundle size, image bytes), because those are site-specific.
- The JSX sample is illustrative and was not built.

## Independent QA, 2026-10-13

- Every URL above was fetched again with `curl` on 2026-10-13 (31 distinct URLs, all HTTP 200) and every link text re-checked; paraphrased links were read in context.
- Thresholds confirmed on web.dev/articles/vitals: LCP "within 2.5 seconds of when the page first starts loading", INP "200 milliseconds or less", CLS "0.1. or less", "the 75th percentile of page loads, segmented across mobile and desktop devices".
- PageSpeed Insights confirmed: "PSI will fall back to origin-level granularity, which encompasses all user experiences on all pages of the website", the 28-day collection period, and that lab data comes from Lighthouse.
- Next.js Image page (documentation version 16.4.0; this repository runs `next` 16.1.6), exact text. Under `preload`: "A boolean that indicates if the image should be preloaded ... true: Preloads the image by inserting a <link> in the <head>" and "In most cases, you should use loading=\"eager\" or fetchPriority=\"high\" instead of preload." Under `priority`: "Starting with Next.js 16, the priority property has been deprecated in favor of the preload property in order to make the behavior clear." The article's statement is accurate; it now also says what `preload` does.
- Corrected: the article implied `revalidateTag(tag)` alone. The current page documents a second argument (single-argument form deprecated) and the `{ expire: 0 }` form for callers outside a Server Action (row above).
- Removed as unsupported: "most MLS licenses require your own copy in any case" (now "Some feeds also require your own copy of media", with a link to the pipeline guide, which cites MLS Grid). Softened as unsourced generalizations: "almost always the first photo", "Hydration is the largest task on most server-rendered pages", "will not finish inside the threshold on a mid-range phone", "rarely has page-level data in CrUX".
- Case study statement re-read in the case-study page: "Optimized Next.js frontend with ISR, dynamic imports, image optimization via S3 + CDN." No figure from the case study is repeated.
- Cut for length: the opening web.dev quotation on third-party scripts (row removed above), two FAQ entries, and the listing-detail and search checklists, which restated the sections above them. The area-page checklist stays.
