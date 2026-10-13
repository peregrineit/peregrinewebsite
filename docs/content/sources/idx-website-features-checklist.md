# Source log: /blog/idx-website-features-checklist

Article: "Engineering Requirements for a Production-Ready IDX Platform" (rewritten 2026-10-13; it replaces the earlier features checklist, whose log is `docs/growth/content/SOURCES-idx-website-features-checklist.md` and no longer describes this page).

Every URL below was fetched on **2026-10-13** and the quoted text was read on the page that day. Method: fetched once through a page reader, then fetched again with `urllib` (browser user agent, HTML stripped to text) and each quoted phrase matched as a literal substring. The MLS Grid IDX Rules PDF was converted with `pdftotext -layout`. Quotes are verbatim, spelling as published.

## RESO

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://www.reso.org/reso-web-api/ | A1: replication is the model RESO describes | "Replication is the copying of a database. Replicators initially pull an entire data set, and then continually request the most recent data changes to update their copy and keep it in sync with the primary database." |
| https://dd.reso.org/DD2.0/Property/InternetEntireListingDisplayYN/ | S3: the Data Dictionary has a seller display flag | "Indicates whether or not the seller has allowed the listing to be displayed on Internet sites." |

## MLS Grid (used as one published example; not presented as what every MLS requires)

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://docs.mlsgrid.com/ | A1 and FAQ: no real-time access, replication only | "We do not support real time data access at this time. Our service provides the data through a data replication process." |
| same | A4: local media copies are a condition | "You must maintain your own copy of all media files. The URLs contained in the Media resource are to be used ONLY for the purpose of downloading a local copy of the files. DO NOT us[e] these URLs on your website or in your application." |
| same | S1: token issued per approved subscription | "Once a subscription has been created, a licensee added, and the MLS has approved, an API token will be generated and presented on the token tab when viewing a subscription." |
| same | O3: re-replication is bounded by rate limits | "No more than 2 request per second (RPS) at all times." |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | A5: one source per request | "Each request must contain a single OriginatingSystemName specified in the filter criteria of the request." |
| same | D3: removal is signaled by a flag (MlgCanView) | "IF true, then save or update the existing record in your db. IF false, then remove the record from your database (or never save it in the first place)." |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf (302 to a static1.squarespace.com file; header "MLS GRID IDX Rules, Updated September 17,2026") | Intro: date of the rules | "Updated September 17,2026" |
| same | D2 and FAQ: refresh interval | Rule 11: "Each Member Participant must refresh all MLS GRID Data downloads and IDX displays automatically fed by those downloads at least once every twelve (12) hours to include new data and exclude data that has been removed from the MLS GRID Data." |
| same | S3: seller withholds listing or address, including on maps | Rule 7: "Listings, including property addresses, can be included in displays of MLS GRID Data except where a seller has directed their Member Participant to withhold their listing or the listing's property address from all public display on the Internet (including, but not limited to, display on publicly-accessible websites or VOWs or on maps) or other electronic forms of display or distribution." |
| same | S3: confidential fields | Rule 19: "Confidential fields intended only for other Member Participants (e.g. showing instructions, and property security information) may not be displayed." |
| same | S5: scraping monitoring; O5: reporting | Rule 29: "Each Member Participant shall make reasonable efforts to avoid "scraping" of the MLS GRID Data by third parties or displaying of that data on any other website. Reasonable efforts shall include but not be limited to (a) Monitoring the website for signs that a third party is "scraping" data ... If a Member Participant suspects "scraping" of the data has occurred, the suspicion and any evidence must be reported to MLS GRID or their applicable MLS immediately." |

## Trestle (Cotality)

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://trestle-documentation.corelogic.com/web-api/ | S1: OAuth2 client credentials, token lifetime | "Trestle's WebAPI uses an OAuth2 Client Credentials flow for authentication. Once you have obtained a token, it is good for up to 8 hours." |

## web.dev and Google Search Central

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://web.dev/articles/vitals | P2 and FAQ: thresholds | "LCP should occur within 2.5 seconds of when the page first starts loading." · "pages should have a INP of 200 milliseconds or less." · "pages should maintain a CLS of 0.1. or less." |
| same | P2: percentile and segmentation | "a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices." |
| https://web.dev/articles/ttfb | P2: server response guide | "As a rough guide, most sites should strive to have a TTFB of 0.8 seconds or less." |
| https://web.dev/articles/lab-and-field-data-differences | P2: field data takes priority | "As a general rule, if you have both field data and lab data for a given page, field data is what you should use to prioritize your efforts." |
| https://developers.google.com/search/docs/crawling-indexing/http-network-errors | D3: 4xx removes a URL from the index | "Google doesn't index URLs that return a 4xx status code, and URLs that are already indexed and return a 4xx status code are removed from the index." |
| same | D3: soft 404 | "If the content suggests an error for Google Search, an empty page or an error message, Search Console will show a soft 404 error." (in the 2xx section of the page) |
| https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | P1: content in the HTML response | "Crawling a URL and parsing the HTML response works well for classical websites or server-side rendered pages where the HTML in the HTTP response contains all content." · "...and not all bots can run JavaScript." |

## OWASP

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://top10.owasp.org/2021/A01_2021-Broken_Access_Control (OWASP Top 10:2021; owasp.org/Top10/2021/... redirects here) | S2: deny by default, record ownership | "Except for public resources, deny by default." · "Model access controls should enforce record ownership rather than accepting that the user can create, read, update, or delete any record." |
| same | S5: rate limiting | "Rate limit API and controller access to minimize the harm from automated attack tooling." |
| https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html | S1: hardcoded secrets, rotation | "Many organizations have them hardcoded within the source code in plaintext, littered throughout configuration files and configuration management tools." · "You should regularly rotate secrets so that any stolen credentials will only work for a short time." |
| https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html | S4: what to keep out of logs and what to log | Data to exclude: "Access tokens" · "Authentication passwords" · "Database connection strings". Events to log: "Authentication successes and failures" · "Authorization (access control) failures" |

## PostgreSQL and Elasticsearch

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://www.postgresql.org/docs/current/ddl-rowsecurity.html | S2: default deny with row-level security | "If no policy exists for the table, a default-deny policy is used, meaning that no rows are visible or can be modified." |
| https://www.postgresql.org/docs/current/continuous-archiving.html | O3: point-in-time recovery | "Thus, this technique supports point-in-time recovery: it is possible to restore the database to its state at any time since your base backup was taken." |
| https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore | O3: snapshots are the supported backup | "Taking a snapshot is the only reliable and supported way to back up a cluster. You cannot back up an Elasticsearch cluster by making copies of the data directories of its nodes." |
| https://www.elastic.co/docs/manage-data/data-store/near-real-time-search | D5: default refresh | "By default, Elasticsearch periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds." |

## Google SRE book

| URL | Claim in the article | Text relied on |
|---|---|---|
| https://sre.google/sre-book/service-level-objectives/ | O1: definition of an objective | "An SLO is a service level objective: a target value or range of values for a service level that is measured by an SLI." |
| same | P3 and FAQ: percentiles, not averages | "Averaging request latencies may seem attractive, but obscures an important detail: it's entirely possible for most of the requests to be fast, but for a long tail of requests to be much, much slower." |
| https://sre.google/sre-book/monitoring-distributed-systems/ | O1: golden signals | "The four golden signals of monitoring are latency, traffic, errors, and saturation." |
| same | O2: actionable pages | "Every page should be actionable." |

## Recommendations (ours, not a vendor's or a standard's)

The 25 requirements, their grouping and every verification method; the single display-policy layer; the fixture feed; keeping raw payloads; reconciliation by key set; "the team sets the number" for data age, latency percentiles, recovery point and recovery time; building a new index beside the old one and switching. None is presented as a rule of any MLS or as a measurement.

## Not used because it could not be verified

- NAR's IDX policy (https://www.nar.realtor/handbook-on-multiple-listing-policy/advertising-print-and-electronic-section-1-internet-data-exchange-idx-policy) returned "Login Required" on 2026-10-13. No NAR policy text is cited; MLS Grid's public rules are used as the example instead.
- Bridge documentation (https://bridgedataoutput.com/docs/platform/Introduction/Data-Access) rendered no text to the fetcher (client-side application). Bridge is not cited or named.
- No search-latency, uptime or restore-time benchmark is given: no primary source states one that would apply to a reader's system. The article tells the team to set these.
- Whether MLSs other than MLS Grid require local media copies, a given refresh interval, scraping reports or limits on non-production use: not asserted; listed as questions for the agreement.
- OWASP Top 10: the 2021 edition page is the one fetched and quoted; no claim is made about a later edition.

## Statements about Peregrine and where they come from

All from `src/app/case-studies/scaling-real-estate-saas-platform/page.tsx`, linked from the article:

- "MongoDB as the source of truth, Elasticsearch for search, and Redis as a cache on top": "The Architecture We Built".
- "its original sync ran as a single process, and one failed MLS feed would stall updates for all agents until the engine was rewritten with per-feed error isolation": "MLS Data Sync Failures" and "Phase 3".
- "search response time going from 3.5 seconds to 180 milliseconds after search moved from direct database queries to Elasticsearch with a Redis cache": "Slow Property Search", "The Architecture We Built" and "The Impact" (3.5s → 180ms).
- "separate environments for USA Live, Canada Live and Staging, each with its own Elasticsearch and Redis, so that staging changes never touch production data": "What Made This Work".
- Office in Noida, India; 30-minute technical discovery call with an engineer: allowed general facts (writing brief).
