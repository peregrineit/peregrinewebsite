# Source log: /blog/legacy-real-estate-platform-data-migration

Every URL below was fetched on **2026-10-13** shortly after midnight IST (HTTP 200), in the same working session that began on 2026-10-12, and the quoted text was read on the page then. Quotes are verbatim. QA re-fetched every URL later on 2026-10-13 and found each quoted sentence still on its page. Method: `curl` with a browser user agent, HTML stripped to text; PDFs with `pdftotext -layout`.

## Google Search Central

| URL | Text relied on |
|---|---|
| https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | "Prepare a URL mapping from the current URLs to their corresponding new format." · "If your site is large and it's technically possible, we recommend initially moving just a piece of the site to test any effects on traffic and search indexing." · "Time your move to coincide with lower traffic, if possible." · "Expect temporary fluctuation in site ranking during the move." · "Look in your sitemaps" / "Check your server logs or analytics software for the URLs that get the most traffic" · "we recommend that you use HTTP permanent redirects if possible, such as 301 and 308" · "Avoid chaining redirects. ... we advise redirecting to the final destination directly." · "Don't redirect many old URLs to one irrelevant single URL destination, such as the home page of the new site. This can confuse users and might be treated as a soft 404 error." · "if you're not moving to the new site all your old content, make sure those URLs correctly return an HTTP 404 or 410 error response code on the new site" · "Keep the redirects for as long as possible, generally at least 1 year." · "will temporarily crawl your new site more heavily than usual ... Ensure that your new site has sufficient capacity to handle the increased traffic from Google." |
| https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors | "If you removed the page and there's no replacement page on your site with similar content, return a 404 (not found) or 410 (gone) response (status) code for the page." |

## Database and migration tooling

| URL | Text relied on |
|---|---|
| https://www.postgresql.org/docs/current/logical-replication.html | "When logical replication of a table typically starts, PostgreSQL takes a snapshot of the table's data on the publisher database and copies it to the subscriber. Once complete, changes on the publisher since the initial copy are sent continually to the subscriber. The subscriber applies the data in the same order as the publisher so that transactional consistency is guaranteed for publications within a single subscription." |
| https://www.postgresql.org/docs/current/logical-replication-restrictions.html | "The database schema and DDL commands are not replicated." · "Sequence data is not replicated. ... If, however, some kind of switchover or failover to the subscriber database is intended, then the sequences would need to be updated to the latest values" |
| https://www.mongodb.com/docs/manual/changeStreams/ | "Applications can use change streams to subscribe to all data changes on a single collection, a database, or an entire deployment, and immediately react to them." · "Change streams are resumable by specifying a resume token to either resumeAfter or startAfter when opening the cursor." · "The oplog must have enough history to locate the operation associated with the token or the timestamp, if the timestamp is in the past." |
| https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html | "You can perform one-time migrations or replicate ongoing changes to keep sources and targets in sync." |
| https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Validating.html | "During data validation, AWS DMS compares each row in the source with its corresponding row at the target, verifies the rows contain the same data, and reports any mismatches." |
| https://martinfowler.com/bliki/StranglerFigApplication.html | "the term "Strangler Fig" is now often used to describe a gradual approach to legacy modernization" · "the reduced risk and earlier value from the gradual approach outweigh its costs" |
| https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html | "Upgrading Legacy Hashes ... When the users enter their password (usually by authenticating on the application), that input should be re-hashed using the new algorithm." · "Upgrade Method Two: Use the existing password hashes as inputs for a more secure algorithm." |

## MLS platforms

| URL | Text relied on |
|---|---|
| https://trestle-documentation.corelogic.com/support/faq/ | "In the case of multiple listing data, the MLO is the copyright holder and data licensor. Trestle only facilitates the license agreement between you and the MLO" · "IMPORTANT NOTE: Generally, MLOs license data to technology providers that provide value to their membership. As a result, MLOs typically require a real estate broker or agent to ratify the contract ... MLOs typically disallow certain uses of their data" (added in QA) |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf | Header "Updated September 17,2026" · Rule 12: "Sharing of the MLS GRID Data compilation with any third party not authorized by MLS GRID is prohibited." |
| https://www.mlsgrid.com/s/MLS-Grid-Best-Practices-Guide-2.pdf | "When conducting your initial import of data please reach out to support@mlsgrid.com in advance to request a "Grace Period" to exceed normal rate limits and data caps" |
| https://docs.mlsgrid.com/recent-releases/maris-mls-migration-to-new-mls-system-and-new-originatingsystemname | "ALL Data Consumers should treat this change as an initial import of a new MLS source" |

## Recommendations (ours, not a vendor's)

The move / re-fetch / regenerate / leave inventory; re-keying listing references to originating MLS and listing key; carrying over last-notified state; importing lead history with automation off; the four-strategy comparison and decision table; the id map and repeatable loaders; the rejects table; the three gates, invariants and shadow reads; the four URL families; the rollback plan's four parts; the runbook. The SQL blocks are illustrative.

## Not used because it could not be verified

- https://developers.google.com/search/docs/crawling-indexing/site-move-overview returned 404; only the "site move with URL changes" page is cited.
- "Your right to hold a listing comes from a license tied to a feed, a use and often a named vendor": no fetched page says this in general; replaced in QA with what Trestle's FAQ states.
- No statistic on what share of real estate site traffic lands on listing pages was found in a primary source; none is given.
- Whether a specific MLS agreement lets listing data be transferred between vendors or platforms: depends on each agreement; the article cites MLS Grid rule 12 as one example and says to check.
- Debezium, pglogical and other named CDC tools: not fetched, so not named.

## Statements about Peregrine and where they come from

- "a platform where all agents shared configuration, leads and property data in flat collections, and MongoDB collections were restructured for clean multi-tenant separation": `src/app/case-studies/scaling-real-estate-saas-platform/page.tsx` ("No Multi-Tenant Isolation"; "Phase 3").
- "the full stack was load-tested with simulated 200-agent traffic before go-live": same page ("Phase 4": "Load-tested the full stack with simulated 200-agent traffic before go-live").
- 30-minute technical discovery call with an engineer: allowed general fact (writing brief).
