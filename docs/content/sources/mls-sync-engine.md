# Source log: /blog/mls-sync-engine

Every URL below was fetched on **2026-10-12** (HTTP 200) and the quoted text was read on the page that day. QA re-fetched every URL on **2026-10-13** and found each quoted sentence still on its page. Quotes are verbatim (spelling as published). Method: `curl` with a browser user agent, HTML stripped to text; PDFs with `pdftotext -layout`.

## RESO

| URL | Text relied on |
|---|---|
| https://www.reso.org/reso-web-api/ | "Replication is the copying of a database. Replicators initially pull an entire data set, and then continually request the most recent data changes to update their copy and keep it in sync with the primary database." |
| https://transport.reso.org/proposals/web-api-core/ | "Providers MUST support server-driven paging using @odata.nextLink." · "Next links with $filter will also be tested. Since ModificationTimestamp is the only required field at this point, it will be used." |
| https://www.reso.org/blog/entityevent-resource/ | "Timestamps can be unreliable. Things like "clock drift" can cause events to be out of order and consumers to miss data." · "Events are produced when records are no longer part of a user's feed, ending the need for expensive and complicated reconciliations." |
| https://transport.reso.org/proposals/entity-events/ | Status "RATIFIED" · "EntityEventSequence is a durable, immutable, monotonic identifier that preserves the order that events occur in a system. It can only increase in value." |

## MLS Grid

| URL | Text relied on |
|---|---|
| https://docs.mlsgrid.com/ | "No more than 2 request per second (RPS) at all times. No more than 7,200 request submitted in any given hour. No more than 4 GB downloaded in any given hour. No more than 40,000 requests submitted per 24 hour period." · "If your API access has been suspended your client will receive an HTTP 429 error in response to any requests." · "the permissions for the token will be automatically reinstated once enough time has passed that the number of requests submitted or amount of data consumed falls back within these limits" · "The value of the ModificationTimestamp field coming from the Grid is the time that the record was modified by us." |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | "Each request must contain a single OriginatingSystemName specified in the filter criteria of the request." · "You can receive at most 5000 records per request. ... The application will default to 500 records per request if not specified." · "We don't want any deleted records so we set MlgCanView to being "equal" to true." · "We order our requests by ModificationTimestamp by default so that you do not miss changes that occur during your download and so that you can pick up where you left off in this manner." · "After you have the initial data fully downloaded, you would switch to using replication queries which do not contain an MlgCanView filter in them. This allows you to get all changes to the data including changes to MlgCanView=false so that you know when data is removed from the feed and needs to be deleted from your local data store." · "your replication queries need to contain the greatest ModificationTimestamp you have received in the data from the api regardless of whether or not you choose to store the records you receive" · "PLEASE NOTE: After 7 days records marked MlgCanView false will be removed from the data feed entirely." · Lookup resource: "Please do not pull from this resource more frequently than once a day" · "NOTE: If you use expand in the request, the records per request limit reduces to 1000 at most per request." (added in QA, 2026-10-13) · "MlgCanView: When changed to false, the record is no longer valid for the feed type you consume and must be removed from your local data store." (added in QA, 2026-10-13) |
| https://www.mlsgrid.com/s/MLS-Grid-Best-Practices-Guide-2.pdf | "If you encounter an error during your initial import DO NOT START OVER. Add a filter for ModificationTimestamp to your request and use the greatest ModificationTimestamp of the data you have received so far to pick up where you left off." · "DO NOT perform range queries on the ModificationTimestamp." · "DO NOT send the same request multiple times." · "DO NOT send more that one replication request at a time. ... Replication requests must be in sequential order." · "Performing these requests once every 15 minutes will be sufficient to keep your database fresh and in sync." · separate replication requests listed under PROPERTY RESOURCE, MEMBER RESOURCE, OFFICE RESOURCE, OPENHOUSE RESOURCE |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf | Rule 11: "must refresh all MLS GRID Data downloads and IDX displays automatically fed by those downloads at least once every twelve (12) hours" |
| https://docs.mlsgrid.com/recent-releases/maris-mls-migration-to-new-mls-system-and-new-originatingsystemname | "ALL Data Consumers should treat this change as an initial import of a new MLS source" · "NEW OriginatingSystemName: 'maris2'" |

## Trestle (Cotality)

| URL | Text relied on |
|---|---|
| https://trestle-documentation.corelogic.com/web-api/ | "Each set of quotas has a per hour quota and a per minute quota. The per hour quota is your baseline quota. ... The per minute quota is a burst quota." · "They are calculated per product/feed type pair." · "Trestle returns three headers that tell you about your quotas. Minute-Quota-Limit ... Hour-Quota-Limit ... Hour-Quota-ResetTime" |
| https://trestle-documentation.corelogic.com/web-api/reference/ | "you cannot skip records, so if your replication process fails part way through, you will have to restart it" · "Returned replication links expire after 5 minutes of inactivity" · "If you need to retrieve more than 1,000,000 records, you will need to use the replication endpoint." |
| https://trestle-documentation.corelogic.com/web-api/at-scale/ | "we recommend tracking the latest value you received from Trestle. Doing so will ensure that clock differences between your computers and Trestle's do not cause you to miss updates." · "The record can be updated in Trestle because it was updated in the source system or because we updated mappings or enumerations that affected the record." · "it is possible that they will update all of their records (by accident or on purpose). Being prepared for mass updates is important." · "Often this latter, more complex method, will involve one of the flow control algorithms like Leaky Bucket or Token Bucket." · "The exponential wait is our recommended practice. ... So you might start at waiting only 1 second, then 2, then 4, 8, 16, 32, ... up to some number of retries." · "While the incremental updates will catch new records and changed records, it will not provide you information on records that are no longer available." |

## Other technical documentation

| URL | Text relied on |
|---|---|
| https://www.postgresql.org/docs/current/sql-insert.html | "ON CONFLICT DO UPDATE guarantees an atomic INSERT or UPDATE outcome; provided there is no independent error, one of those two outcomes is guaranteed, even under high concurrency." |
| https://www.rfc-editor.org/rfc/rfc6585.html | "The 429 status code indicates that the user has sent too many requests in a given amount of time ("rate limiting"). The response representations SHOULD include details explaining the condition, and MAY include a Retry-After header indicating how long to wait before making a new request." |
| https://docs.bullmq.io/guide/retrying-failing-jobs | "The current built-in backoff functions are fixed and exponential." · "You can also provide a jitter option" |
| https://docs.bullmq.io/guide/jobs/deduplication | "Note that you must provide a deduplication id that should represent your job." |

## Arithmetic in the article (derived, not quoted)

- 2 requests per second x 3,600 seconds = 7,200 per hour. 86,400 seconds / 40,000 requests = 2.16 seconds per request. The article labels this as our arithmetic on the cited figures.

## Recommendations (ours, not a vendor's)

Saving the greatest timestamp below the last one on a page that has a next link (the article states that this is more conservative than MLS Grid's own wording, "the greatest ModificationTimestamp of the data you have received so far"); renewing the lease and checking its owner in the cursor transaction; taking the starting cursor before a Trestle bulk load; the lease on the checkpoint row; payload hashing; the sweeper; the credential-wide circuit breaker; the three monitoring numbers; the five tests. The SQL and pseudocode are illustrative.

## Not used because it could not be verified

- https://www.reso.org/replication/ returned 404; the RESO Web API page and RESO's EntityEvent article are cited for replication instead.
- Whether requests made during an MLS Grid suspension count toward the limits: not stated on the page; not claimed.
- The order of records returned by Trestle's replication endpoint: not stated; the article says so and recommends around it.
- MLS Grid's 60 GB per 24 hours cap appears in the PDF but not on docs.mlsgrid.com; left out.

## Statements about Peregrine and where they come from

- "the original sync ran as a single process with no error recovery, and one failed MLS feed would stall updates for all agents; the sync engine was rewritten with delta detection, retry logic and per-feed error isolation": `src/app/case-studies/scaling-real-estate-saas-platform/page.tsx` ("MLS Data Sync Failures" and "Phase 3").
- 30-minute technical discovery call with an engineer: allowed general fact (writing brief).
