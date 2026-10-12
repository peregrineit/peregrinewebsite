# Source log: /blog/listing-lifecycle-sold-expired-deleted

Every URL below was fetched on **2026-10-12** (HTTP 200) and the quoted text was read on the page that day. Quotes are verbatim (spelling as published). Method: `curl` with a browser user agent, HTML stripped to text; PDFs with `pdftotext -layout`.

## RESO

| URL | Text relied on |
|---|---|
| https://dd.reso.org/DD2.0/Property/StandardStatus/ | "Lookup Status Locked with Enumerations" · "Adoption 96% 404 of 420 Organizations" · "Lookups (11)" with definition and usage per value: "Active The listing is on market and an offer has not been accepted. 96%" · "Active Under Contract An offer has been accepted but the listing is still on market. 54%" · "Canceled The listing contract has been terminated. 52%" · "Closed The purchase agreement has been fulfilled or the lease agreement has been executed. 77%" · "Coming Soon ... 27%" · "Delete The listing contract was never valid or there is another reason for the contract to be nullified. 21%" · "Expired The listing contract has expired. 77%" · "Hold ... 31%" · "Incomplete ... 2%" · "Pending An offer has been accepted and the listing is no longer on market. 92%" · "Withdrawn The listing has been withdrawn from the market, but a contract still exists between the seller and the listing member. ... 71%" · footer "Generated October 12, 2026" |
| https://dd.reso.org/DD2.0/Property/MlsStatus/ | "A local or regional status that is well known by business users. Each MlsStatus field must map to a single StandardStatus. Multiple MlsStatus fields may map to a single StandardStatus." · "Lookup Status Open" · "This is an open enumeration. Any value is allowed and no standard lookup values are defined. Providers may use local values." |
| https://www.reso.org/blog/entityevent-resource/ | "consumers usually implement reconciliation processes that run daily to query by all keys so they can figure out which records are no longer available" · "Events are produced when records are no longer part of a user's feed, ending the need for expensive and complicated reconciliations." |

## MLS Grid

| URL | Text relied on |
|---|---|
| https://docs.mlsgrid.com/ | "Each record in the system has a field called MlgCanView which is a boolean field and indicates whether the record should be kept in your database or not. This is how we have implemented our delete mechanism." · example reasons: "The property was deleted. The property listing office decided that they don't want to feed out any of their listings. The property changed status and made it unavailable in IDX" |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | "MlgCanView: When changed to false, the record is no longer valid for the feed type you consume and must be removed from your local data store." · "PLEASE NOTE: After 7 days records marked MlgCanView false will be removed from the data feed entirely." · "you would switch to using replication queries which do not contain an MlgCanView filter in them. This allows you to get all changes to the data including changes to MlgCanView=false" · "users can select for specific fields as expected using the $select param in the URL" · "Records that contain ONLY the VOW value can not be used for IDX Use Cases." |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf | Header "MLS GRID IDX Rules Updated September 17,2026" · Rule 11: "at least once every twelve (12) hours to include new data and exclude data that has been removed from the MLS GRID Data" · Rule 22: "shall identify the listing brokerage name, the listing number, the email or phone provided by the Member Participant, and the status of the listing immediately adjacent to the property information. When displaying a sold listing, the name of the cooperating brokerage OR the following disclaimer must also appear" · Rule 27: "The display of Expired, and Withdrawn listings may be prohibited by the Member Participant's applicable Governing Documents, and may be excluded from MLS GRID Data. If Expired, and Withdrawn listings are available in MLS GRID Data for IDX, the display of those listings is authorized, except to the extent these rules expressly state otherwise." · "For Unlock Participants only: On Closed listings, Member Participants may not display the sale price or photographs other than the primary photograph as designated in the data feed." · "For Heartland MLS Participants only: Additionally, to the above mentioned expired and withdrawn listings, the display of Temporarily Off Market, and Cancelled listings is prohibited." · "For Northwest MLS Participants only: the display of Expired, Canceled, Temporarily Off Market, and Sale-Fail release listings is prohibited." · "For REcolorado Participants only: The display of Closed listings more than three years old is prohibited." · "For SCKMLS Participants only: The display of Expired, Cancelled, and Withdrawn listings are prohibited. Additionally, on closed listings, the display of Sold Price and Net Sold Price is prohibited." · "For IRMLS Participants only: The display of Closed listings more than three years old is prohibited." |

## Trestle (Cotality)

| URL | Text relied on |
|---|---|
| https://trestle-documentation.corelogic.com/web-api/at-scale/ | "While the incremental updates will catch new records and changed records, it will not provide you information on records that are no longer available. In order to determine which listings are no longer available (off-market, deleted, no longer being distributed on the Internet, etc.), you must use a reconciliation process. The basics of this process are that you will query Trestle for all of the keys for the resource and remove any records that do not match that list of keys." |
| https://trestle-documentation.corelogic.com/web-api/reference/ | "For queries that only select key fields, you can return up to 300,000. If you need to retrieve more than 1,000,000 records, you will need to use the replication endpoint." |

## Google Search Central

| URL | Text relied on |
|---|---|
| https://developers.google.com/crawling/docs/troubleshooting/http-status-codes (developers.google.com/search/docs/crawling-indexing/http-network-errors redirects here with a 301) | "If the server responded with a 2xx status code, the content received in the response may be considered for indexing." · "All 4xx errors, except 429, are treated the same" · "Google doesn't index URLs that return a 4xx status code, and URLs that are already indexed and return a 4xx status code are removed from the index." |
| https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors | "A soft 404 error is when a URL that returns a page telling the user that the page does not exist and also a 200 (success) status code." · "Such pages are excluded from Search." · "If you removed the page and there's no replacement page on your site with similar content, return a 404 (not found) or 410 (gone) response (status) code for the page." · "If your page has moved or has a clear replacement on your site, return a 301 (permanent redirect)" · "Custom 404 pages are created solely for users. Since these pages are useless from a search engine's perspective, make sure the server returns a 404 HTTP status code to prevent having the pages indexed." |
| https://developers.google.com/search/docs/crawling-indexing/301-redirects | "Permanent: Googlebot follows the redirect, and the indexing pipeline uses the redirect as a signal that the redirect target should be canonical." |
| https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag | "unavailable_after: [date/time] Do not show this page in search results after the specified date/time." |

## Framework and search engine documentation

| URL | Text relied on |
|---|---|
| https://nextjs.org/docs/app/api-reference/functions/not-found | "The response starts streaming from the <Suspense> boundary before notFound() runs, so it keeps its 200 status. Next.js adds a noindex tag." · "Calling notFound() before streaming starts returns a 404." |
| https://nextjs.org/docs/app/api-reference/functions/revalidatePath | "revalidatePath allows you to invalidate cached data on-demand for a specific path." |
| https://www.elastic.co/docs/manage-data/data-store/near-real-time-search | "When a document is stored in Elasticsearch, it is indexed and fully searchable in near real-time--within 1 second." · "By default, Elasticsearch periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds." |
| https://www.elastic.co/docs/manage-data/data-store/aliases | "You can use the aliases API to perform multiple actions in a single atomic operation." |

## Recommendations (ours, not a vendor's)

Driving logic from StandardStatus; treating unknown statuses as not displayable; one transition function; the first two columns of the decision table; 410 for known-removed URLs; the reconciliation outline, its partial-list abort and removal threshold; the minimal tombstone; the calendar-driven job for age limits; the checks list. The pseudocode and the policy object are illustrative; `mls-a`, `mls-b`, `mls-c` are invented names.

## Not used because it could not be verified

- NAR IDX policy text on sold-listing display: not fetched (member login on the earlier check); no NAR rule is cited.
- Full definitions of Withdrawn, Hold and Coming Soon are truncated on the field page; only the visible part of the Withdrawn definition is used.
- Whether a minimal tombstone (key and removal time only) satisfies "must be removed from your local data store": not stated by MLS Grid; the article says to confirm it against the agreement.
- Bridge Interactive removal behavior: documentation not readable without scripts; not mentioned.

## Statements about Peregrine and where they come from

- "one of the four problems found in the audit ...: sold and active properties lived in one collection with no clear status management, and agents were showing sold properties as active on their sites": `src/app/case-studies/scaling-real-estate-saas-platform/page.tsx` ("we identified four critical bottlenecks"; "Sold & Active Data Conflicts").
- 30-minute technical discovery call with an engineer: allowed general fact (writing brief).
