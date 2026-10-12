# Source verification log: /blog/real-estate-platform-tech-stack

Every URL below was fetched on **2026-10-12** and the quoted text was read on the page that day. Quotes are verbatim unless marked as a listing. A guide statement that paraphrases a source is listed under the sentence it paraphrases.

Method: `curl` with a browser user agent (HTTP 200), HTML stripped to text, then searched for the sentence. Exception: **dev.mysql.com returned HTTP 403 to curl**; those four pages were read through the WebFetch page fetcher instead, which returns quotes extracted by a small model. They are marked (WebFetch) and should be opened in a browser at the next re-check.

## Editorial revision, 2026-10-12

All 61 source URLs were fetched again and every quoted sentence in this log was searched for. 58 returned HTTP 200 to `curl` and all their quotes were found. The three dev.mysql.com pages still return 403 to `curl`; this time they were opened in a browser, which confirmed "JSON columns, like columns of other binary types, are not indexed directly; instead, you can create an index on a generated column that extracts a scalar value from the JSON column.", "SPATIAL INDEX creates an R-tree index." and "MySQL supports foreign keys, which permit cross-referencing related data across tables, and foreign key constraints, which help keep the related data consistent." The other MySQL quotes below still rest on the earlier WebFetch read.

Redirects seen, content unchanged: `laravel.com/docs/releases` and `/docs/scout` now resolve under `laravel.com/framework/docs/`; `docs.djangoproject.com/en/stable/…` resolves to `/en/6.1/…`; `cloud.typesense.org/pricing` resolves to `/pricing/calculator`.

Found and changed:

- **Hosted-search prices removed.** The guide quoted Algolia's Grow plan figures next to Typesense Cloud's model, which read as a vendor price comparison. It now states only how each meters (Algolia: "search requests" and "records" are the metered quantities on its pricing page; Typesense Cloud: "You get a dedicated cluster, with no limits on records or operations." · "Memory Based on the size of your data"). No figure is used.
- **Clustered map pins were credited to Elasticsearch only.** Added https://docs.opensearch.org/latest/aggregations/bucket/geotile-grid/ : "The geotile grid aggregation groups documents into grid cells for geographical analysis. Each grid cell corresponds to a map tile and is identified using the {zoom}/{x}/{y} format."
- **Replication stated with its source.** https://docs.mlsgrid.com/ : "We do not support real time data access at this time. Our service provides the data through a data replication process."
- **Cache staleness corrected.** "A few minutes behind" was wrong for a timeout equal to the sync interval; the row now says a cached result can lag the database by up to one interval, on top of the sync's lag. (Our reasoning, no source.)
- **Unsupported phrases recast as recommendations or qualified:** static generation "for a few thousand pages", Go "keeps sync workers cheap to maintain", "you must hold your own copies of listing photos" (true where the feed says so; MLS Grid does), "millions of photos", "you pay more per unit". A geography-point default for PostGIS and a note on map re-querying were added as recommendations.

## PostgreSQL and PostGIS

| URL | Text relied on |
|---|---|
| https://www.postgresql.org/docs/current/datatype-json.html | "jsonb also supports indexing, which can be a significant advantage." · "GIN indexes can be used to efficiently search for keys or key/value pairs occurring within a large number of jsonb documents (datums)." |
| https://www.postgresql.org/docs/current/ddl-constraints.html | "A foreign key constraint specifies that the values in a column (or a group of columns) must match the values appearing in some row of another table. We say this maintains the referential integrity between two related tables." |
| https://www.postgresql.org/docs/current/textsearch-intro.html | "Full Text Searching (or just text search) provides the capability to identify natural-language documents that satisfy a query, and optionally to sort them by relevance to the query." |
| https://www.postgresql.org/docs/current/textsearch-indexes.html | "GIN indexes are the preferred text search index type." |
| https://www.postgresql.org/docs/current/pgtrgm.html | "The pg_trgm module provides functions and operators for determining the similarity of alphanumeric text based on trigram matching, as well as index operator classes that support fast searching for similar strings." |
| https://www.postgresql.org/support/versioning/ | "The PostgreSQL Global Development Group supports a major version for 5 years after its initial release." |
| https://postgis.net/docs/using_postgis_dbmanagement.html | "it offers several kinds of index methods which work well for multi-dimensional data: GiST, BRIN and SP-GiST indexes." · "PostGIS uses an R-Tree index implemented on top of GiST to index spatial data." · "The geography data type allows you to store data in longitude/latitude coordinates, but at a cost: there are fewer functions defined on GEOGRAPHY than there are on GEOMETRY; those functions that are defined take more CPU time to execute." · "If your data is global or covers a continental region, you may find that GEOGRAPHY allows you to build a system without having to worry about projection details." |
| https://postgis.net/docs/ST_DWithin.html | "ST_DWithin — Tests if two geometries are within a given distance" · "For geography: units are in meters" · "This function call includes a bounding box comparison that makes use of any indexes that are available on the geometries." |
| https://postgis.net/docs/ST_Contains.html | "ST_Contains — Tests if every point of B lies in A, and their interiors have a point in common" |
| https://postgis.net/docs/geometry_distance_knn.html | "Used in the \"ORDER BY\" clause provides index-assisted nearest-neighbor result sets." |

## MongoDB

| URL | Text relied on |
|---|---|
| https://www.mongodb.com/docs/manual/data-modeling/ | "MongoDB has a flexible data model that allows you to store polymorphic data, meaning: Documents within a single collection are not required to have the same set of fields." |
| https://www.mongodb.com/docs/manual/core/schema-validation/ | "Schema validation lets you create validation rules for your fields, such as allowed data types and value ranges." · "After you establish an application schema, use schema validation to prevent unintended schema changes and data type errors." |
| https://www.mongodb.com/docs/manual/core/transactions/ | "MongoDB supports ACID transactions." · "You can use transactions across multiple operations, collections, databases, documents, and shards." · "In most cases, a distributed transaction incurs a greater performance cost over single document writes, and the availability of distributed transactions should not be a replacement for effective schema design." |
| https://www.mongodb.com/docs/manual/geospatial-queries/ | "In MongoDB, you can store geospatial data as GeoJSON objects or as legacy coordinate pairs." · Operator table: "$geoIntersects Selects geometries that intersect with a GeoJSON geometry." · "$geoWithin Selects geometries within a bounding GeoJSON geometry." · "$near Returns geospatial objects in proximity to a point." · "$nearSphere" |
| https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/ | "2dsphere indexes support geospatial queries on an earth-like sphere." |

## MySQL 8.4 (WebFetch; curl got 403)

| URL | Text relied on |
|---|---|
| https://dev.mysql.com/doc/refman/8.4/en/json.html | "MySQL supports a native JSON (JavaScript Object Notation) data type defined by RFC 8259" · "JSON columns, like columns of other binary types, are not indexed directly; instead, you can create an index on a generated column that extracts a scalar value from the JSON column." |
| https://dev.mysql.com/doc/refman/8.4/en/creating-spatial-indexes.html | "For InnoDB and MyISAM tables, MySQL can create spatial indexes using syntax similar to that for creating regular indexes, but using the SPATIAL keyword." · "SPATIAL INDEX creates an R-tree index." |
| https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html | "MySQL supports foreign keys, which permit cross-referencing related data across tables, and foreign key constraints, which help keep the related data consistent." · "In MySQL, InnoDB and NDB tables support checking of foreign key constraints." |
| https://docs.djangoproject.com/en/stable/ref/contrib/gis/db-api/ (curl) | On MySQL: "Django supports spatial functions operating on real geometries available in modern MySQL versions. However, the spatial functions are not as rich as other backends like PostGIS." · "GeoDjango currently provides the following spatial database backends: django.contrib.gis.db.backends.postgis django.contrib.gis.db.backends.mysql django.contrib.gis.db.backends.oracle django.contrib.gis.db.backends.spatialite" |

## Elasticsearch and OpenSearch

| URL | Text relied on |
|---|---|
| https://www.elastic.co/docs/reference/query-languages/query-dsl/geo-queries | "Elasticsearch supports two types of geo data: geo_point fields which support lat/lon pairs, and geo_shape fields, which support points, lines, circles, polygons, multi-polygons, etc." · listed queries: geo_bounding_box, geo_distance, geo_grid, geo_polygon, geo_shape |
| https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters | "The completion suggester provides auto-complete/search-as-you-type functionality." |
| https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation | "A multi-bucket aggregation that groups geo_point and geo_shape values into buckets that represent a grid. ... Each cell corresponds to a map tile as used by many online map sites." |
| https://www.elastic.co/docs/manage-data/data-store/near-real-time-search | "When a document is stored in Elasticsearch, it is indexed and fully searchable in near real-time--within 1 second." |
| https://www.elastic.co/docs/manage-data/data-store/aliases | "Aliases enable you to: Query multiple indices/data streams together with a single name; Change which indices/data streams your application uses in real time; Reindex data without downtime" |
| https://www.elastic.co/pricing/faq/licensing | "In September 2024, we are adding the Open Source Initiative (OSI) approved AGPLv3 license as an option alongside SSPL and our Elastic license" |
| https://docs.opensearch.org/latest/query-dsl/geo-and-xy/index/ | "OpenSearch provides the following geographic query types: Geo-bounding box ... Geodistance ... Geopolygon Returns documents containing geopoints that are within a polygon. Geoshape ..." |
| https://docs.opensearch.org/latest/search-plugins/searching-data/autocomplete/ | "Implement autocomplete using one of the following methods: Prefix matching, Edge n-gram matching, Search as you type, Completion suggesters" |
| https://docs.opensearch.org/latest/im-plugin/index-alias/ | "Alias changes are atomic. An alias never points to an unintended set of indexes, even for a moment." |
| https://opensearch.org/faq/ | "All of the software in the OpenSearch project is released under the Apache License, Version 2.0 (ALv2)." |

## Hosted search services (same two criteria for both: geo filtering, pricing model)

| URL | Text relied on |
|---|---|
| https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/ | Section headings "Filter around a central point" and "Filtering inside rectangular or polygonal areas" · "You can define a central geographical point and show only records within a certain radius of that point." |
| https://www.algolia.com/pricing | Grow plan: "10K search requests /month included then $0.50 per additional 1K search requests 100K records included then $0.40 per additional 1K records" |
| https://typesense.org/docs/30.2/api/geosearch.html | "You can filter records by distance or area and sort results by distance from a point." |
| https://cloud.typesense.org/pricing | "You get a dedicated cluster, with no limits on records or operations." · "Memory: Based on the size of your data" |

## Redis

| URL | Text relied on |
|---|---|
| https://redis.io/docs/latest/commands/expire/ | "Set a timeout on key. After the timeout has expired, the key will automatically be deleted." |
| https://redis.io/docs/latest/develop/reference/eviction/ | "The maxmemory configuration directive specifies the maximum amount of memory to use for the cache data." |
| https://redis.io/docs/latest/commands/unlink/ | "the command performs the actual memory reclaiming in a different thread, so it is not blocking, while DEL is." |

## Languages and frameworks: support policies and relevant features

| URL | Text relied on |
|---|---|
| https://nodejs.org/en/about/previous-releases | "LTS release status is \"long-term support\", which typically guarantees that critical bugs will be fixed for a total of 30 months. Production applications should only use Active LTS or Maintenance LTS releases." |
| https://devguide.python.org/versions/ | "end-of-life: Five years after a release, support ends." |
| https://www.djangoproject.com/download/ | Supported versions table: "5.2 LTS ... End of mainstream support December 3, 2025 ... End of extended support April 2028" |
| https://www.php.net/supported-versions.php | "Each release branch of PHP is fully supported for two years from its initial stable release." · "After this two year period of active support, each branch is then supported for two additional years for critical security issues only." |
| https://laravel.com/docs/releases | "For all Laravel releases, bug fixes are provided for 18 months and security fixes are provided for 2 years." |
| https://laravel.com/docs/scout | "Using model observers, Scout will automatically keep your search indexes in sync with your Eloquent records. Scout ships with a built-in database engine that uses MySQL / PostgreSQL full-text indexes and LIKE clauses" · drivers listed: Algolia, Meilisearch, Typesense, Turbopuffer |
| https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core | "LTS releases get free support and patches for three years. STS releases get free support and patches for two years." · table: ".NET 10 ... LTS Active November 14, 2028" |
| https://learn.microsoft.com/en-us/ef/core/modeling/spatial | "EF Core supports mapping to spatial data types using the NetTopologySuite spatial library." |
| https://go.dev/doc/devel/release | "Each major Go release is supported until there are two newer major releases." |
| https://go.dev/doc/go1compat | "It is intended that programs written to the Go 1 specification will continue to compile and run correctly, unchanged, over the lifetime of that specification." |

## Google Search Central and Next.js

| URL | Text relied on |
|---|---|
| https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics | "Google processes JavaScript web apps in three main phases: Crawling, Rendering, Indexing" · "The page may stay on this queue for a few seconds, but it can take longer than that." · "Keep in mind that server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript." |
| https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering | "Dynamic rendering was a workaround and not a long-term solution for problems with JavaScript-generated content in search engines. Instead, we recommend that you use server-side rendering, static rendering, or hydration as a solution." |
| https://nextjs.org/docs/app/guides/single-page-applications | "We'll define a \"strict SPA\" as: Client-side rendering (CSR): The app is served by one HTML file (e.g. index.html). Every route, page transition, and data fetch is handled by JavaScript in the browser." |
| https://nextjs.org/docs/app/api-reference/functions/generate-static-params | "The generateStaticParams function can be used in combination with dynamic route segments to statically generate routes at build time instead of on-demand at request time." |
| https://nextjs.org/docs/app/guides/incremental-static-regeneration | "Incremental Static Regeneration (ISR) enables you to: Update static content without rebuilding the entire site ... Handle large amounts of content pages without long next build times" · "ISR is only supported when using the Node.js runtime (default). ISR is not supported when creating a Static Export." |
| https://nextjs.org/docs/app/api-reference/functions/revalidateTag | "revalidateTag allows you to invalidate cached data on-demand for a specific cache tag." |
| https://nextjs.org/docs/app/getting-started/deploying | "Next.js can be deployed as a Node.js server, Docker container, static export, or adapted to run on different platforms." · "Next.js can be deployed to any provider that supports Node.js." |
| https://nextjs.org/docs/app/guides/self-hosting | "Image Optimization through next/image works self-hosted with zero configuration when deploying using next start." · "Note that images are optimized at runtime, not during the build." · "If you are hosting Next.js using a container orchestration platform like Kubernetes, each pod will have a copy of the cache." |
| https://nextjs.org/support-policy | "Each major version will remain in Maintenance LTS for two years following the initial release." |

## Listing data, media and hosting

| URL | Text relied on |
|---|---|
| https://dd.reso.org/ | "DD 2.0 Active Approved October 23, 2023 41 Resources 1,745 Fields 3,683 Lookups" |
| https://docs.mlsgrid.com/ | "Each record contains only the fields converted from its originating source MLS." · "You must maintain your own copy of all media files." |
| https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html | "Designed to provide 99.999999999% durability and 99.99% availability of objects over a given year." |
| https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html | "CloudFront delivers your content through a worldwide network of data centers called edge locations." |
| https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html | Page "Managing spatial data with the PostGIS extension": "PostGIS is an extension to PostgreSQL for storing and managing spatial information." (the page documents setting it up on RDS for PostgreSQL) |

## Not used because it could not be verified, or deliberately left out

- **MySQL support lifecycle** (mysql.com/support/eol-notice.html): HTTP 403. No MySQL support window is stated; the guide's note says so.
- **MySQL full-text and spatial-function pages**: read through WebFetch, but the spatial-relation quote it returned for ST_Contains looked garbled, so MySQL's own function list is not cited. The guide cites Django's documentation for the comparison with PostGIS instead. MySQL full-text search was fetched but cut from the guide for length.
- **MongoDB Search (Atlas Search)**: fetched; cut from the guide for length. Its geo operators were not verified and are not claimed.
- **Benchmarks and popularity or hiring surveys**: none fetched, none cited, by brief.
- **Per-listing photo counts, typical listing volumes per MLS, hosting prices, managed-service prices** other than the two hosted-search pricing statements above: not stated.
- **Elasticsearch geo_polygon deprecation status**: the geo queries page lists the query without a deprecation note in the fetched text; the guide only says both engines query "by bounding box, distance and polygon".
- **Redis geospatial commands, client-side caching; Elasticsearch search_as_you_type and _reindex; CloudFront pricing**: fetched, not used.

## Statements about Peregrine and where they come from

| Statement in the guide | Source |
|---|---|
| Redis as a read-through cache with a 2-hour TTL matched to a 2-hour sync; property detail pages read straight from the database so status, price and photo changes are current | /case-studies/scaling-real-estate-saas-platform ("Implemented Redis as a read-through cache with 2-hour TTL synced to the cron schedule"; "we bypass both Redis and Elasticsearch entirely and query MongoDB directly ... status changes, price updates, and newly uploaded photos") |
| Stack: Next.js with ISR, Node.js, MongoDB, Elasticsearch, Redis, AWS (S3 and SES), Linode / VPS | same page, "Tech Stack" and Phase 4 ("Optimized Next.js frontend with ISR") |
| Property search queried MongoDB directly and took 3 to 5 seconds under load; MongoDB as source of truth, Elasticsearch for search, filters, geo-queries and auto-suggestions, Redis caching repeated queries | same page ("MongoDB direct queries for property search were taking 3–5 seconds under load"; data-flow section) |
| W3\|re stack lists Node.js and Python, plus Next.js, React Native, PostgreSQL, Redis, Apache Kafka, Mapbox GL, AWS EKS; a valuation model and natural-language search; a pipeline that ingests from four MLS systems and deduplicates cross-listed properties | /case-studies/w3re-ai-real-estate-platform ("Technology Stack"; "Unified Multi-MLS Data Pipeline") |
| "Every project starts with a 30-minute technical discovery call with an engineer" | allowed statement in the common brief |

No Peregrine price, duration, client result, certification or vendor relationship is stated. A `{/* TODO(owner): vendor disclosure */}` comment sits at the start of the search section.
