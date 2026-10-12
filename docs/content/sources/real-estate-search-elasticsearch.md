# Source verification log: /blog/real-estate-search-elasticsearch

Every URL below was fetched on **2026-10-12** with `curl` (browser user agent, HTTP 200 unless noted), the HTML was stripped to text, and each statement was checked against that text by script. "Verbatim" means the link text in the article appears on the page word for word. For a paraphrased link the exact sentence relied on is given.

| URL | Article link text | Sentence or figure relied on |
|---|---|---|
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/dynamic | an exception is thrown and the document is rejected | verbatim on the page |
| https://www.elastic.co/docs/manage-data/data-store/mapping/update-mappings-examples | you cannot change the field type of an existing field | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/keyword | structured content such as IDs, email addresses, hostnames, status codes, zip codes, or tags | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/keyword | sorting, aggregations, or scripting | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/number | term query searches on keyword fields are often faster than term searches on numeric fields | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/number | optimized for range queries | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/number | pick the smallest type which is enough for your use-case | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/text | to search for individual words within each full text field | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/text | are not used for sorting and seldom used for aggregations | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/date | a long number representing milliseconds-since-the-epoch | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/geo-point | within a bounding box, within a certain distance of a central point, or within a geo_shape query | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/geo-point | sorting documents by distance | "to sort documents by distance." |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/geo-shape | if the data being indexed contains shapes other than just points | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/multi-fields | it is often useful to index the same field in different ways for different purposes | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/normalizer | similar to analyzer except that it guarantees that the analysis chain produces a single token | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | has no concept of inner objects | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | the association between | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | each nested object can be queried independently of the others | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | as a separate hidden document | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | nested documents and queries are typically expensive | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | 100 distinct nested mappings and a document at 10,000 nested objects | "Default is 10000" |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/nested | typically expensive | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/flattened | into one field as keywords | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/flattened | all values in the JSON object are treated as keywords | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-filter-context | how well does this document match | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-filter-context | simply &quot;yes&quot; or &quot;no&quot; | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-filter-context | Elasticsearch automatically caches frequently used filters | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-bool-query | meaning that scoring is ignored and clauses are considered for caching | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/node-query-cache-settings | a maximum of 10000 queries in up to 10% of the total heap space | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/node-query-cache-settings | a segment contains at least 10000 documents and the segment has at least 3% of the total documents of a shard | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/configuration-reference/node-query-cache-settings | term queries and queries used outside of a filter context are not eligible for caching | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/distributed-architecture/shard-request-cache | only where size=0, so it will not cache hits, but it will cache hits.total, aggregations, and suggestions | "By default, the requests cache will only cache the results of search requests where size=0 , so it will not cache hits , but it will cache hits.total , aggregations , and suggestions ." |
| https://www.elastic.co/docs/deploy-manage/distributed-architecture/shard-request-cache | invalidated automatically whenever the shard refreshes | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/distributed-architecture/shard-request-cache | most queries that use now cannot be cached | "Most queries that use now (see Date Math ) cannot be cached." |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-bounding-box-query | matches geo_point and geo_shape values that intersect a bounding box | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-distance-query | matches geo_point and geo_shape values within a given distance of a geopoint | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-shape-query | documents indexed using either the geo_shape or the geo_point type | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-shape-query | intersects, contains, within, or disjoint | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-shape-query | a shape which has already been indexed in another index | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-polygon-query | deprecated in 7.12 | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters | Optimized for speed | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters | costly to build and are stored in-memory | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters | considers all documents in the index | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters | optimized for speed | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-edgengram-tokenizer | text which has a widely known order | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-edgengram-tokenizer | Useful for search-as-you-type queries | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-edgengram-tokenizer | when trying to autocomplete words that can appear in any order | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-edgengram-tokenizer | search terms longer than the max_gram length may not match any indexed terms | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/search-as-you-type | both prefix completion and infix completion | "Both prefix completion (i.e matching terms starting at the beginning of the input) and infix completion (i.e. matching terms at any position within the input) are supported." |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/search-as-you-type | can match the query terms in any order, but will score documents higher if they contain the terms in order | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/search-as-you-type | the query terms in any order | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/sort-search-results | avoid sorting by text fields | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/sort-search-results | the default is _last | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/sort-search-results | _geo_distance | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results | your paged results could miss or duplicate hits | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results | can be completely different across replicas of the same data | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results | you cannot page through more than 10,000 hits | "By default, you cannot use from and size to page through more than 10,000 hits." |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results | using a set of sort values from the previous page | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/paginate-search-results | we no longer recommend using the scroll API for deep pagination | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/index-settings/index-modules | search requests take heap memory and time proportional to from + size | verbatim on the page |
| https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-open-point-in-time | a lightweight view into the state of the data as it existed when initiated | verbatim on the page |
| https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-open-point-in-time | just needs to be long enough for the next request | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-terms-aggregation | the top ten terms with the most documents | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-range-aggregation | includes the from value and excludes the to value for each range | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results | to both search hits and aggregations | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/filter-search-results | only to search hits, not aggregations | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-synonym-graph-tokenfilter | multi-word synonyms correctly | verbatim on the page |
| https://www.elastic.co/docs/reference/text-analysis/analysis-synonym-graph-tokenfilter | designed to be used as part of a search analyzer only | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query | treats fields with the same analyzer as though they were one big field | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-multi-match-query | individual fields can be boosted with the caret (^) notation | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query | Fuzziness | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-function-score-query | the distance of a numeric field value of the document from a user given origin | verbatim on the page |
| https://www.elastic.co/docs/manage-data/data-store/aliases | reindexing data without downtime | "Reindex data without downtime" |
| https://www.elastic.co/docs/manage-data/data-store/aliases | perform multiple actions in a single atomic operation | verbatim on the page |
| https://www.elastic.co/docs/manage-data/data-store/aliases | has no downtime and never points to both | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | will yield much better performance than single-document index requests | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | advisable to avoid going beyond a couple tens of megabytes per request | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | disable refreshing by setting the refresh interval to -1 | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | index.number_of_replicas to 0 | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | it is important that the data lives elsewhere | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | TOO_MANY_REQUESTS (429) | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | randomized exponential backoff | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | e.g. 30s, might help improve indexing speed | verbatim on the page |
| https://www.elastic.co/docs/deploy-manage/production-guidance/optimize-performance/indexing-speed | the data lives elsewhere | verbatim on the page |
| https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk | perform multiple index, create, delete, and update actions in a single request | verbatim on the page |
| https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-bulk | one or more of the operations in the bulk request did not complete successfully | verbatim on the page |
| https://www.elastic.co/docs/manage-data/data-store/near-real-time-search | periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds | verbatim on the page |
| https://www.elastic.co/docs/manage-data/data-store/near-real-time-search | refreshes indices every second | verbatim on the page |
| https://www.elastic.co/docs/api/doc/elasticsearch/operation/operation-create | if the specified version is strictly higher than the version of the stored document | verbatim on the page |

## Notes

- Nested limits: the nested page gives three defaults. `index.mapping.nested_fields.limit`: "this setting limits the number of unique nested types per index. Default is 100." `index.mapping.nested_parents.limit`: "Default is 50." `index.mapping.nested_objects.limit`: "The maximum number of nested JSON objects that a single document can contain across all nested types... Default is 10000." The article cites the first and third.
- OpenSearch documentation was not fetched for this article; the article states no OpenSearch behavior.
- The mapping and query in the article are illustrative and were not executed against a cluster. Syntax follows the examples on the linked pages (normalizer definition, `geo_bounding_box` with `top_left` / `bottom_right`, `search_after` with a two-field sort, `post_filter` with a `terms` aggregation).
- Peregrine statement: the case-study page `/case-studies/scaling-real-estate-saas-platform` states "MongoDB direct queries for property search were taking 3–5 seconds under load", "Elasticsearch — Search Layer: Handles property search, filters, geo-queries, auto-suggestions", "MongoDB — Source of Truth" and "Search response time 3.5s → 180ms". The article repeats only those.
- Left out as unverified: any statement about RESO resource names for rooms and open houses (not fetched); context-suggester filtering details beyond the one quoted sentence; any latency or capacity figure for Elasticsearch itself.
