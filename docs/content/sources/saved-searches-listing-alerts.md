# Source verification log: /blog/saved-searches-listing-alerts

Every URL below was fetched on **2026-10-13** with `curl` (browser user agent, HTTP 200 unless noted; the FTC page through WebFetch, see notes), the HTML was stripped to text, and each statement was checked against that text by script. "Verbatim" means the link text in the article appears on the page word for word. For a paraphrased link the exact sentence relied on is given.

| URL | Article link text | Sentence or figure relied on |
|---|---|---|
| https://dd.reso.org/DD2.0/SavedSearch/ | saved search criteria and related data | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/ModificationTimestamp/ | the date/time the listing was last modified | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/ModificationTimestamp/ | 100% | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/PriceChangeTimestamp/ | the listing&apos;s price was last changed | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/PriceChangeTimestamp/ | 92% | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/StatusChangeTimestamp/ | 70% | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/PreviousListPrice/ | 64% | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | parses a json structure into a native query and stores that query, so that the percolate query can use it to match provided documents | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | Fields referred to in a percolator query must already exist in the mapping associated with the index used for percolation | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | a dedicated percolator index | "Instead of adding percolate queries to the index the data resides in, these queries can also be added to a dedicated index. The advantage of this is that this dedicated percolator index can have its own index settings" |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | you need to make sure that the mappings from the normal index are also available on the percolate index | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | Reindexing percolator queries is sometimes required | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/percolator | fields referred to in a percolator query must already exist in the mapping | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-percolate-query | can be used to match queries stored in an index | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-percolate-query | can improve performance as queries only need to be parsed and matched once instead of multiple times | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-percolate-query | better performance can be expected by wrapping the percolator query in a bool query&apos;s filter clause | verbatim on the page |
| https://www.postgresql.org/docs/current/datatype-datetime.html | uses the widely-used IANA (Olson) time zone database | verbatim on the page |
| https://www.postgresql.org/docs/current/datatype-datetime.html | prone to arbitrary changes, particularly with respect to daylight-savings rules | verbatim on the page |
| https://support.google.com/a/answer/81126?hl=en | marketing messages and subscribed messages must support one-click unsubscribe, and include a clearly visible unsubscribe link in the message body | verbatim on the page |
| https://support.google.com/a/answer/81126?hl=en | keep spam rates reported in Postmaster Tools below 0.3% | verbatim on the page |
| https://support.google.com/a/answer/81126?hl=en | marketing messages and subscribed messages must support one-click unsubscribe | verbatim on the page |
| https://support.google.com/a/answer/14229414?hl=en | transactional messages are excluded from this requirement | verbatim on the page |
| https://support.google.com/a/answer/14229414?hl=en | unsubscribe requests aren&apos;t honored within 48 hours | verbatim on the page |
| https://senders.yahooinc.com/best-practices/ | a functioning list-unsubscribe header, which supports one-click unsubscribe for marketing and subscribed messages | verbatim on the page |
| https://senders.yahooinc.com/best-practices/ | honor unsubscribes within 2 days | verbatim on the page |
| https://senders.yahooinc.com/best-practices/ | an obvious and visible unsubscribe process that doesn&apos;t require users to log in | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | places one List-Unsubscribe header field and one List-Unsubscribe-Post header field in the message | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | MUST contain one HTTPS URI | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | MUST contain the single key/value pair &quot;List-Unsubscribe=One-Click&quot; | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | MUST have a valid DomainKeys Identified Mail (DKIM) signature that covers at least the List-Unsubscribe and List-Unsubscribe-Post headers | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | MUST contain enough information to identify the mail recipient and the list | verbatim on the page |
| https://www.rfc-editor.org/rfc/rfc8058.html | MUST NOT include cookies, HTTP authorization, or any other context information | verbatim on the page |
| https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business | you must honor a recipient&apos;s opt-out request within 10 business days | verbatim on the page |
| https://resend.com/docs/dashboard/webhooks/event-types | the recipient&apos;s mail server permanently rejected the email | verbatim on the page |
| https://resend.com/docs/dashboard/webhooks/event-types | couldn&apos;t be delivered due to a temporary issue | verbatim on the page |
| https://resend.com/docs/dashboard/emails/email-suppressions | intentionally skipping sending to any addresses on your list | verbatim on the page |
| https://resend.com/docs/dashboard/emails/email-suppressions | not all Inbox Service Providers return a complained event, most notably, Gmail/Google Workspace | verbatim on the page |
| https://resend.com/docs/dashboard/emails/idempotency-keys | checks whether an email with the same idempotency key has already been sent in the last 24 hours | verbatim on the page |
| https://resend.com/docs/dashboard/emails/idempotency-keys | can be up to 256 characters and must be unique per API request | verbatim on the page |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | is no longer valid for the feed type you consume and must be removed from your local data store | verbatim on the page |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | must be removed from your local data store | verbatim on the page |

## Notes

- Fetch date is 2026-10-13: the writing session crossed midnight after the first two articles of the batch. The guide's `datePublished` stays 2026-10-12 as assigned.
- https://www.ftc.gov/... returned HTTP 404 to curl. It was read through the WebFetch page fetcher, which returns quotes extracted by a small model: "You must honor a recipient's opt-out request within 10 business days." Open it in a browser at the next re-check.
- RESO Data Dictionary adoption figures as shown on each field page (footer "Generated October 12, 2026"): ModificationTimestamp "Usage Adoption 100% 420 of 420 Organizations"; PriceChangeTimestamp "92% 385 of 420"; StatusChangeTimestamp "70% 294 of 420"; PreviousListPrice "64% 267 of 420".
- Google FAQ (answer 14229414), enforcement table: "Unsubscribe requests aren't honored within 48 hours | Delivery support or mitigations unavailable". Also: "One-click unsubscribe is required only for marketing and promotional messages. Transactional messages are excluded from this requirement."
- Google guidelines (answer 81126): "Starting February 1, 2024, email senders who send more than 5,000 messages per day to Gmail accounts must meet the requirements in this section." · "Marketing messages and subscribed messages must support one-click unsubscribe, and include a clearly visible unsubscribe link in the message body." · "Keep spam rates reported in Postmaster Tools below 0.30%."
- Left out as unverifiable: Canada's anti-spam rules (https://crtc.gc.ca/eng/com500/faq500.htm returned HTTP 403 to both curl and WebFetch); consent rules for SMS and push; any provider's retry schedule; any claim about whether a specific MLS license permits listing data in email (the article says to check the agreement).
- Provider named: Resend only, as an example of documented behavior (idempotency keys, event types, suppressions). AWS SES suppression-list documentation was fetched but is not cited.
- No Peregrine case study is cited: none of the published case studies describes saved searches or listing alerts.
- The schema and pseudocode are illustrative and were not executed.

## Independent QA, 2026-10-13

- Every URL above was fetched again on 2026-10-13 and every link text re-checked; paraphrased links were read in context.
- FTC: the page still returns HTTP 404 to `curl`. It was opened in a browser on 2026-10-13 (page title "CAN-SPAM Act: A Compliance Guide for Business | Federal Trade Commission"). The sentence is on the page word for word, under "Honor opt-out requests promptly": "You must honor a recipient's opt-out request within 10 business days." The same page says the Act "covers all commercial messages" and treats "transactional or relationship" messages differently, so the article now says the deadline applies to the commercial email the Act covers and leaves whether listing alerts are such messages as a question for counsel.
- RFC 8058 confirmed: "The List-Unsubscribe-Post header MUST contain the single key/value pair \"List-Unsubscribe=One-Click\"", "MUST contain one HTTPS URI", the DKIM requirement, and "The POST request MUST NOT include cookies, HTTP authorization, or any other context information."
- Google (answer 81126) confirmed: the 5,000 messages per day threshold, "Starting February 1, 2024", one-click unsubscribe for marketing and subscribed messages, spam rate "below 0.3%" (the page also prints "0.30%"). Google FAQ (answer 14229414): the table cell beside "Unsubscribe requests aren't honored within 48 hours" reads "Delivery support or mitigations unavailable"; the article now uses that wording.
- Yahoo confirmed: "honor unsubscribes within 2 days", the list-unsubscribe header sentence and the no-login sentence.
- Resend confirmed on its three pages: `email.bounced`, `email.delivery_delayed`, `email.complained`, `email.suppressed`; "Idempotency keys are kept in the system for 24 hours"; "up to 256 characters".
- Reworded as questions for the MLS agreement or counsel, or as our recommendation: "An email about it would display data you no longer hold a right to show", "Removal is not optional", "is a license matter", "Agents are not exempt", "It must not be sent". Removed as unsourced: "Other providers use different names for the same four ideas", "Many platforms end up with both".
- Pseudocode fix: the earlier version of a listing is matched only if it was displayable, so a listing that becomes displayable again counts as a new match.
- Cut for length: two FAQ entries that restated the body.
