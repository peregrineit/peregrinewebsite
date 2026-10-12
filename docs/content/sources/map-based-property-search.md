# Source verification log: /blog/map-based-property-search

Every URL below was fetched on **2026-10-12** with `curl` (browser user agent, HTTP 200 unless noted), the HTML was stripped to text, and each statement was checked against that text by script. "Verbatim" means the link text in the article appears on the page word for word. For a paraphrased link the exact sentence relied on is given.

| URL | Article link text | Sentence or figure relied on |
|---|---|---|
| https://postgis.net/docs/using_postgis_dbmanagement.html | without indexing, a search for features requires a sequential scan of every record in the database | verbatim on the page |
| https://postgis.net/docs/using_postgis_dbmanagement.html | uses an R-Tree index implemented on top of GiST to index spatial data | verbatim on the page |
| https://postgis.net/docs/ST_MakeEnvelope.html | creates a rectangular Polygon from minimum and maximum coordinates | verbatim on the page |
| https://postgis.net/docs/geometry_overlaps.html | the 2D bounding box of geometry A intersects the 2D bounding box of geometry B | verbatim on the page |
| https://postgis.net/docs/geometry_overlaps.html | will make use of any indexes that may be available | verbatim on the page |
| https://postgis.net/docs/ST_Covers.html | no point of B lies outside (in the exterior of) A | verbatim on the page |
| https://postgis.net/docs/ST_Covers.html | automatically includes a bounding box comparison that makes use of any spatial indexes | verbatim on the page |
| https://postgis.net/docs/ST_Covers.html | do not use this function with invalid geometries. You will get unexpected results | verbatim on the page |
| https://www.elastic.co/docs/reference/elasticsearch/mapping-reference/geo-shape | the data being indexed contains shapes other than just points | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-bounding-box-query | matches geo_point and geo_shape values that intersect a bounding box | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-shape-query | documents indexed using either the geo_shape or the geo_point type | verbatim on the page |
| https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-geo-shape-query | a shape which has already been indexed in another index | verbatim on the page |
| https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/ | supports geospatial queries on an earth-like sphere | "2dsphere indexes support geospatial queries on an earth-like sphere." |
| https://www.mongodb.com/docs/manual/reference/operator/query/box/ | does not query for GeoJSON shapes | verbatim on the page |
| https://www.mongodb.com/docs/manual/reference/operator/query/box/ | specify longitude first | verbatim on the page |
| https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/ | with geospatial data that exists entirely within a specified shape | verbatim on the page |
| https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/ | does not require a geospatial index | verbatim on the page |
| https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/ | does not return sorted results | verbatim on the page |
| https://postgis.net/docs/ST_IsValid.html | tests if a geometry is well-formed in 2D | verbatim on the page |
| https://postgis.net/docs/ST_MakeValid.html | attempts to make an invalid geometry valid without losing vertices | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation | groups geo_point and geo_shape values into buckets that represent a grid | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation | each cell corresponds to a map tile as used by many online map sites | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation | between 0 and 29, inclusive | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation | a filter like geo_bounding_box should be applied to narrow the subject area. Otherwise, potentially millions of buckets will be created and returned | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geohashgrid-aggregation | a choice of precision between 1 and 12 | verbatim on the page |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-metrics-geocentroid-aggregation | computes the weighted centroid from all coordinate values | verbatim on the page |
| https://postgis.net/docs/ST_SnapToGrid.html | snaps all points of the input geometry to a regular grid | "Snap all points of the input geometry to a regular grid." |
| https://github.com/mapbox/supercluster/blob/main/README.md | a very fast JavaScript library for geospatial point clustering for browsers and Node | verbatim on the page |
| https://github.com/mapbox/supercluster/blob/main/README.md | the zoom on which the cluster expands into several children | verbatim on the page |
| https://github.com/mapbox/supercluster/blob/main/README.md | cluster radius of 40 pixels and a maximum cluster zoom of 16 | "Cluster radius, in pixels." |
| https://github.com/mapbox/supercluster/blob/main/README.md | once loaded, index is immutable | verbatim on the page |
| https://developer.mozilla.org/en-US/docs/Web/API/AbortController | represents a controller object that allows you to abort one or more Web requests as and when desired | verbatim on the page |
| https://developer.mozilla.org/en-US/docs/Web/API/AbortController | able to abort fetch requests | verbatim on the page |
| https://developer.mozilla.org/en-US/docs/Web/API/AbortController | allows you to abort one or more Web requests as and when desired | verbatim on the page |
| https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState | modifies the current history entry | verbatim on the page |
| https://developers.google.com/crawling/docs/faceted-navigation | can generate infinite URL spaces | verbatim on the page |
| https://developers.google.com/crawling/docs/faceted-navigation | Google Search generally doesn&apos;t support URL fragments in crawling and indexing | verbatim on the page |
| https://developers.google.com/crawling/docs/faceted-navigation | use the industry standard URL parameter separator | verbatim on the page |
| https://developers.google.com/crawling/docs/faceted-navigation | when a filter combination doesn&apos;t return results | verbatim on the page |
| https://developers.google.com/search/docs/crawling-indexing/url-structure | not to use fragments to change the content of a page | "Don't use fragments to change the content of a page, as Google Search generally doesn't support URL fragments." |
| https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action | sets how an element&apos;s region can be manipulated by a touchscreen user | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/ | indicates whether or not the seller has allowed the listing address to be displayed on Internet sites | verbatim on the page |
| https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/ | usage adoption of 98%, 410 of 420 organizations | "Usage Adoption 98% 410 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Property/Latitude/ | the geographic latitude of some reference point on the property | verbatim on the page |

## Notes

- supercluster options table (README): "maxZoom | 16 | Maximum zoom level at which clusters are generated. Capped at 30." and "radius | 40 | Cluster radius, in pixels." The README was read both at the GitHub page above and at https://raw.githubusercontent.com/mapbox/supercluster/main/README.md.
- RESO Data Dictionary pages carried the footer "Generated October 12, 2026" when fetched.
- Map provider terms: none fetched and none stated; the article lists questions to check.
- Not stated because not verified: any MLS rule on what must happen on a map when InternetAddressDisplayYN is false (rules differ by MLS; the article says to read them); antimeridian behavior of any specific engine; any performance figure.
- Peregrine statement: `/case-studies/scaling-real-estate-saas-platform` states "Elasticsearch — Search Layer: Handles property search, filters, geo-queries, auto-suggestions" and "Built property search indexing pipeline, auto-suggestion engine, and geo-based filtering." The article repeats only that.
- The SQL, Elasticsearch request and JavaScript in the article are illustrative and were not executed.
