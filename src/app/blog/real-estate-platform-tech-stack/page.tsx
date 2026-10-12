import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';

const SLUG = 'real-estate-platform-tech-stack';
export const metadata = guideMetadata(SLUG);

// Every capability, limit and support window below was read on the technology's own page on
// 2026-10-12; the sentence relied on for each link is logged in
// docs/growth/content/SOURCES-real-estate-platform-tech-stack.md. No benchmark or popularity
// survey is cited. dev.mysql.com refused a plain HTTP client that day and was read through a
// page fetcher instead (noted in the log).
const PG_JSON = 'https://www.postgresql.org/docs/current/datatype-json.html';
const PG_FK = 'https://www.postgresql.org/docs/current/ddl-constraints.html';
const PG_FTS = 'https://www.postgresql.org/docs/current/textsearch-intro.html';
const PG_FTS_IDX = 'https://www.postgresql.org/docs/current/textsearch-indexes.html';
const PG_TRGM = 'https://www.postgresql.org/docs/current/pgtrgm.html';
const PG_VER = 'https://www.postgresql.org/support/versioning/';
const GIS_DATA = 'https://postgis.net/docs/using_postgis_dbmanagement.html';
const GIS_DWITHIN = 'https://postgis.net/docs/ST_DWithin.html';
const GIS_CONTAINS = 'https://postgis.net/docs/ST_Contains.html';
const GIS_KNN = 'https://postgis.net/docs/geometry_distance_knn.html';
const MDB_MODEL = 'https://www.mongodb.com/docs/manual/data-modeling/';
const MDB_VALID = 'https://www.mongodb.com/docs/manual/core/schema-validation/';
const MDB_TX = 'https://www.mongodb.com/docs/manual/core/transactions/';
const MDB_GEO = 'https://www.mongodb.com/docs/manual/geospatial-queries/';
const MDB_2DS = 'https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/';
const MY_JSON = 'https://dev.mysql.com/doc/refman/8.4/en/json.html';
const MY_SPATIAL = 'https://dev.mysql.com/doc/refman/8.4/en/creating-spatial-indexes.html';
const MY_FK = 'https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html';
const ES_GEO = 'https://www.elastic.co/docs/reference/query-languages/query-dsl/geo-queries';
const ES_ALIAS = 'https://www.elastic.co/docs/manage-data/data-store/aliases';
const ES_NRT = 'https://www.elastic.co/docs/manage-data/data-store/near-real-time-search';
const ES_SUGGEST = 'https://www.elastic.co/docs/reference/elasticsearch/rest-apis/search-suggesters';
const ES_GRID = 'https://www.elastic.co/docs/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation';
const ES_LICENSE = 'https://www.elastic.co/pricing/faq/licensing';
const OS_GEO = 'https://docs.opensearch.org/latest/query-dsl/geo-and-xy/index/';
const OS_AUTO = 'https://docs.opensearch.org/latest/search-plugins/searching-data/autocomplete/';
const OS_ALIAS = 'https://docs.opensearch.org/latest/im-plugin/index-alias/';
const OS_FAQ = 'https://opensearch.org/faq/';
const ALGOLIA_GEO = 'https://www.algolia.com/doc/guides/managing-results/refine-results/geolocation/';
const ALGOLIA_PRICE = 'https://www.algolia.com/pricing';
const TYPESENSE_GEO = 'https://typesense.org/docs/30.2/api/geosearch.html';
const TYPESENSE_PRICE = 'https://cloud.typesense.org/pricing';
const REDIS_EXPIRE = 'https://redis.io/docs/latest/commands/expire/';
const REDIS_EVICT = 'https://redis.io/docs/latest/develop/reference/eviction/';
const REDIS_UNLINK = 'https://redis.io/docs/latest/commands/unlink/';
const NODE_REL = 'https://nodejs.org/en/about/previous-releases';
const PHP_VER = 'https://www.php.net/supported-versions.php';
const LARAVEL_REL = 'https://laravel.com/docs/releases';
const LARAVEL_SCOUT = 'https://laravel.com/docs/scout';
const PY_VER = 'https://devguide.python.org/versions/';
const DJANGO_DL = 'https://www.djangoproject.com/download/';
const DJANGO_GIS = 'https://docs.djangoproject.com/en/stable/ref/contrib/gis/db-api/';
const DOTNET_POLICY = 'https://dotnet.microsoft.com/en-us/platform/support/policy/dotnet-core';
const EF_SPATIAL = 'https://learn.microsoft.com/en-us/ef/core/modeling/spatial';
const GO_REL = 'https://go.dev/doc/devel/release';
const GO_COMPAT = 'https://go.dev/doc/go1compat';
const GOOGLE_JS = 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics';
const GOOGLE_DYN = 'https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering';
const NEXT_ISR = 'https://nextjs.org/docs/app/guides/incremental-static-regeneration';
const NEXT_PARAMS = 'https://nextjs.org/docs/app/api-reference/functions/generate-static-params';
const NEXT_TAG = 'https://nextjs.org/docs/app/api-reference/functions/revalidateTag';
const NEXT_SPA = 'https://nextjs.org/docs/app/guides/single-page-applications';
const NEXT_DEPLOY = 'https://nextjs.org/docs/app/getting-started/deploying';
const NEXT_SELF = 'https://nextjs.org/docs/app/guides/self-hosting';
const NEXT_SUPPORT = 'https://nextjs.org/support-policy';
const GRID = 'https://docs.mlsgrid.com/';
const DD = 'https://dd.reso.org/';
const S3 = 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html';
const CLOUDFRONT = 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html';
const RDS_POSTGIS = 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.PostgreSQL.CommonDBATasks.PostGIS.html';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The short answer</h2>
      <p>
        Several stacks work for a real estate platform, and the one your team already runs well is a legitimate
        choice. Three decisions carry most of the weight: where map and filter search runs (in the database or in
        a separate search engine), how public listing pages are rendered (as HTML on the server), and how many
        systems your team can operate. Each layer below ends with a &ldquo;choose this when&rdquo; table, and the
        worksheet at the end collects the questions that decide them.
      </p>
      <p>
        This guide covers the choice of technology only. For budgets see{' '}
        <Link href="/blog/cost-to-build-a-real-estate-platform">what it costs to build a real estate platform</Link>;
        for how listings get from the MLS into the database see the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture</Link>.
      </p>

      <h2>What listing data asks of a stack</h2>
      <ul>
        <li>
          <strong>Records are wide and sparse.</strong> The RESO Data Dictionary 2.0 defines{' '}
          <Src href={DD}>41 resources, 1,745 fields and 3,683 lookups</Src>, and on MLS Grid{' '}
          <Src href={GRID}>each record contains only the fields converted from its originating MLS</Src>.
        </li>
        <li><strong>Every listing has a location,</strong> and buyers search by map area, radius and drawn shape.</li>
        <li><strong>Your copy is refreshed on a schedule,</strong> so every derived layer needs a staleness rule.</li>
        <li>
          <strong>Each listing carries a set of photos,</strong> and on MLS Grid you{' '}
          <Src href={GRID}>must maintain your own copy of all media files</Src>.
        </li>
      </ul>

      <h2>1. System of record: PostgreSQL with PostGIS, MongoDB or MySQL</h2>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>For listing data</th><th>PostgreSQL with PostGIS</th><th>MongoDB</th><th>MySQL 8.4</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Integrity between records</strong></td>
              <td>Foreign keys <Src href={PG_FK}>maintain referential integrity between two related tables</Src></td>
              <td><Src href={MDB_TX}>Supports ACID transactions</Src> across documents and collections, with a warning that they are <Src href={MDB_TX}>not a replacement for effective schema design</Src></td>
              <td><Src href={MY_FK}>Foreign key constraints help keep related data consistent</Src>; InnoDB tables check them</td>
            </tr>
            <tr>
              <td><strong>Fields that differ per MLS</strong></td>
              <td>A <Src href={PG_JSON}>jsonb column, which supports indexing</Src>; GIN indexes <Src href={PG_JSON}>search for keys or key/value pairs</Src> inside it</td>
              <td>Native: <Src href={MDB_MODEL}>documents in a collection are not required to have the same set of fields</Src>; <Src href={MDB_VALID}>schema validation</Src> can lock down the fields you depend on</td>
              <td>A <Src href={MY_JSON}>native JSON data type</Src>, but JSON columns <Src href={MY_JSON}>are not indexed directly</Src>; you index a generated column</td>
            </tr>
            <tr>
              <td><strong>Geospatial index</strong></td>
              <td><Src href={GIS_DATA}>GiST, BRIN and SP-GiST</Src>; GiST is an R-tree</td>
              <td><Src href={MDB_2DS}>2dsphere indexes for queries on an earth-like sphere</Src></td>
              <td><Src href={MY_SPATIAL}>SPATIAL INDEX creates an R-tree index</Src> on InnoDB and MyISAM tables</td>
            </tr>
            <tr>
              <td><strong>Radius and polygon queries</strong></td>
              <td><Src href={GIS_DWITHIN}>ST_DWithin in meters on the geography type</Src>, <Src href={GIS_CONTAINS}>ST_Contains</Src> for shapes, and <Src href={GIS_KNN}>index-assisted nearest-neighbor ordering</Src></td>
              <td><Src href={MDB_GEO}>$geoWithin, $geoIntersects, $near and $nearSphere</Src> on GeoJSON</td>
              <td>Spatial relation functions exist; Django&apos;s documentation says they <Src href={DJANGO_GIS}>are not as rich as other backends like PostGIS</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>PostgreSQL with PostGIS</strong></td><td>Listings sit among relational data (agents, tenants, saved searches, leads, billing), you want spatial joins such as &ldquo;listings inside this school boundary&rdquo;, or search will run in the database at first.</td></tr>
            <tr><td><strong>MongoDB</strong></td><td>The listing document is the center of the product, feeds differ widely in shape, and a separate search engine will handle complex queries anyway.</td></tr>
            <tr><td><strong>MySQL</strong></td><td>The team and application are already on MySQL and geospatial needs are modest. Check the spatial functions you need first.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        One PostGIS detail to settle early: its geography type takes longitude and latitude directly, but{' '}
        <Src href={GIS_DATA}>fewer functions are defined on it and they take more CPU time</Src>; PostGIS suggests
        it for data that <Src href={GIS_DATA}>covers a continental region</Src>, which a US and Canada platform
        does. Also check support windows: PostgreSQL{' '}
        <Src href={PG_VER}>supports a major version for 5 years after its initial release</Src>.
      </p>

      <h2>2. Search: a search engine, the database or a hosted service</h2>
      {/* TODO(owner): vendor disclosure */}
      <p>
        Listing search is filters, geography (map bounds, radius, drawn polygon), free text and autocomplete.
        Each option handles the first two. They differ on the rest and on what you must run.
      </p>
      <ul>
        <li>
          <strong>Elasticsearch and OpenSearch.</strong> Both store points and shapes and query them by bounding
          box, distance and polygon (<Src href={ES_GEO}>Elasticsearch geo queries</Src>,{' '}
          <Src href={OS_GEO}>OpenSearch geographic queries</Src>). Both offer as-you-type suggestions (
          <Src href={ES_SUGGEST}>Elasticsearch completion suggester</Src>,{' '}
          <Src href={OS_AUTO}>four OpenSearch autocomplete methods</Src>). Elasticsearch can{' '}
          <Src href={ES_GRID}>group points into map-tile grid cells</Src>, which is what clustered map pins need,
          and makes a stored document <Src href={ES_NRT}>searchable within 1 second</Src>. For rebuilds, both let
          you fill a new index and then repoint an alias: Elasticsearch lists{' '}
          <Src href={ES_ALIAS}>reindexing data without downtime</Src> as a use of aliases, and OpenSearch states
          that <Src href={OS_ALIAS}>alias changes are atomic</Src>. The licenses differ: OpenSearch is{' '}
          <Src href={OS_FAQ}>released under the Apache License, Version 2.0</Src>, and Elastic offers{' '}
          <Src href={ES_LICENSE}>AGPLv3 alongside SSPL and the Elastic License</Src>.
        </li>
        <li>
          <strong>The database itself.</strong> PostgreSQL combines PostGIS filters with built-in text search,
          where <Src href={PG_FTS_IDX}>GIN indexes are the preferred text search index type</Src>, and the pg_trgm
          module adds <Src href={PG_TRGM}>fast searching for similar strings</Src>. One system, one copy, no
          sync job; you write autocomplete and ranking yourself.
        </li>
        <li>
          <strong>A hosted search service.</strong> Algolia filters{' '}
          <Src href={ALGOLIA_GEO}>around a central point and inside rectangular or polygonal areas</Src>; Typesense{' '}
          <Src href={TYPESENSE_GEO}>filters records by distance or area and sorts by distance from a point</Src>.
          Pricing models differ. As published on October 12, 2026, Algolia&apos;s
          Grow plan includes{' '}
          <Src href={ALGOLIA_PRICE}>10K search requests a month and 100K records, then $0.50 per additional 1K requests and $0.40 per additional 1K records</Src>;
          Typesense Cloud sells{' '}
          <Src href={TYPESENSE_PRICE}>a dedicated cluster, with no limits on records or operations</Src>, sized by
          memory. Also read your MLS license before sending listing data to any third-party service.
        </li>
      </ul>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>Search in PostgreSQL</strong></td><td>A few markets, filters plus map bounds and radius, and a small team. Moving search out later does not change the system of record.</td></tr>
            <tr><td><strong>Elasticsearch or OpenSearch</strong></td><td>Autocomplete across addresses and neighborhoods, clustered map pins, relevance tuning, or a system of record that is slow at ad hoc queries. You accept a second copy of the data and a reindex job.</td></tr>
            <tr><td><strong>A hosted search service</strong></td><td>You want those features without running a cluster, the pricing works at your volume, and your MLS agreements allow the data to be held there.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The index is a derived copy, rebuildable from the system of record; the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">pipeline guide</Link> covers which records may enter it.
      </p>

      <h2>3. Cache: what to store in Redis and when to drop it</h2>
      <p>
        A cache is optional. Add one when the same expensive answers are requested repeatedly: popular search
        results, autocomplete responses, map cluster counts, per-tenant configuration. Do not cache anything whose
        staleness would break a display rule, such as a listing&apos;s status.
      </p>
      <p>
        Redis has the tools the job needs. A key can carry{' '}
        <Src href={REDIS_EXPIRE}>a timeout after which it is deleted automatically</Src>. A memory limit with an
        eviction policy <Src href={REDIS_EVICT}>caps the memory used for cache data</Src>. And UNLINK removes
        keys <Src href={REDIS_UNLINK}>without blocking, reclaiming memory in a different thread</Src>.
      </p>
      <p>
        The design question is invalidation, and for listing data the answer is the sync. Either set the timeout
        to the sync interval, or have the sync job delete the keys for the markets it just changed. Our{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        the first approach: Redis as a read-through cache with a 2-hour TTL matched to a 2-hour sync, and property
        detail pages read straight from the database so that status, price and photo changes are never served
        from cache.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>No cache yet</strong></td><td>Search answers fast enough from the index or database, or you cannot yet say what invalidates each key.</td></tr>
            <tr><td><strong>Timeout equal to the sync interval</strong></td><td>Sync runs on a fixed schedule and results a few minutes behind are acceptable inside your license&apos;s refresh rule.</td></tr>
            <tr><td><strong>Deletion by the sync job</strong></td><td>Sync is frequent or event-driven and you can key the cache by market or feed.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>4. Backend language and framework</h2>
      <p>
        All five options below can replicate an MLS feed, serve an API and run background jobs. Benchmark rankings
        rarely decide a listing platform, because the slow parts are the database, the index and the feed&apos;s
        rate limits. Judge on the ecosystem for this work, whom you can hire, and how long each version is
        supported:
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Option</th><th>Relevant to this work (from its own documentation)</th><th>Published support policy</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Node.js with TypeScript</strong></td>
              <td>Same language as a React or Next.js frontend; Next.js itself <Src href={NEXT_DEPLOY}>deploys to any provider that supports Node.js</Src></td>
              <td>LTS releases get critical fixes <Src href={NODE_REL}>for a total of 30 months</Src>; production should use <Src href={NODE_REL}>Active LTS or Maintenance LTS releases</Src></td>
            </tr>
            <tr>
              <td><strong>Python with Django</strong></td>
              <td>GeoDjango ships <Src href={DJANGO_GIS}>spatial database backends for PostGIS, MySQL, Oracle and SpatiaLite</Src></td>
              <td>Python: <Src href={PY_VER}>support ends five years after a release</Src>. Django 5.2 LTS has <Src href={DJANGO_DL}>extended support until April 2028</Src></td>
            </tr>
            <tr>
              <td><strong>PHP with Laravel</strong></td>
              <td>Laravel Scout <Src href={LARAVEL_SCOUT}>keeps search indexes in sync with Eloquent records</Src>, with engines including Algolia, Meilisearch, Typesense and database full-text indexes</td>
              <td>PHP: <Src href={PHP_VER}>two years of active support, then two years of critical security fixes</Src>. Laravel: <Src href={LARAVEL_REL}>bug fixes for 18 months and security fixes for 2 years</Src></td>
            </tr>
            <tr>
              <td><strong>.NET</strong></td>
              <td>EF Core <Src href={EF_SPATIAL}>maps spatial data types using the NetTopologySuite library</Src></td>
              <td><Src href={DOTNET_POLICY}>LTS releases are supported for three years and STS releases for two</Src>; .NET 10 (LTS) until November 14, 2028</td>
            </tr>
            <tr>
              <td><strong>Go</strong></td>
              <td>Go 1 programs are intended to <Src href={GO_COMPAT}>continue to compile and run correctly, unchanged</Src>, which keeps long-running sync workers cheap to maintain</td>
              <td>Each major release is supported <Src href={GO_REL}>until there are two newer major releases</Src></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>Node.js with TypeScript</strong></td><td>The frontend is React or Next.js and you want one language and shared types across the stack.</td></tr>
            <tr><td><strong>Python</strong></td><td>Valuation models, natural-language search or heavy data work are part of the product, or the team is a Python team.</td></tr>
            <tr><td><strong>PHP with Laravel</strong></td><td>The existing application or team is Laravel and the platform is mostly forms, accounts, CRM screens and jobs.</td></tr>
            <tr><td><strong>.NET</strong></td><td>The company already runs Microsoft infrastructure and employs .NET developers.</td></tr>
            <tr><td><strong>Go</strong></td><td>You have Go engineers and the workload is ingestion services and APIs more than screens.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Two languages in one platform is common and reasonable: the{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> lists both Node.js and
        Python in its stack, next to a valuation model and natural-language search. On hiring, look at the
        candidates and agencies available to you at your budget; a global popularity survey says little about
        that.
      </p>

      <h2>5. Frontend rendering: listing pages must arrive as HTML</h2>
      <p>
        Listing, neighborhood and search landing pages exist to be found. Google processes JavaScript pages in{' '}
        <Src href={GOOGLE_JS}>three phases: crawling, rendering and indexing</Src>, and a page waiting to be
        rendered <Src href={GOOGLE_JS}>may stay on the queue for a few seconds, but it can take longer</Src>.
        Google&apos;s own advice is that{' '}
        <Src href={GOOGLE_JS}>server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript</Src>.
        It calls serving bots a separate pre-rendered version{' '}
        <Src href={GOOGLE_DYN}>a workaround and not a long-term solution</Src>.
      </p>
      <p>
        So pages that must rank are rendered on the server or generated ahead of time, and screens behind a login
        can be client-rendered. Next.js defines a strict single-page app as{' '}
        <Src href={NEXT_SPA}>served by one HTML file, with every route and data fetch handled by JavaScript in the browser</Src>.
        The alternatives for public pages:
      </p>
      <ul>
        <li>
          <strong>Static generation.</strong> <Src href={NEXT_PARAMS}>generateStaticParams statically generates routes at build time</Src>.
          Fine for a few thousand pages that change rarely; too slow for a full MLS.
        </li>
        <li>
          <strong>Incremental static regeneration.</strong> ISR lets you{' '}
          <Src href={NEXT_ISR}>update static content without rebuilding the entire site</Src> and{' '}
          <Src href={NEXT_ISR}>handle large amounts of content pages without long build times</Src>. Pages can be
          refreshed on a timer or on demand, for example with{' '}
          <Src href={NEXT_TAG}>revalidateTag, which invalidates cached data for a specific tag</Src>, called by
          the sync job. ISR <Src href={NEXT_ISR}>needs the Node.js runtime and is not supported in a static export</Src>.
        </li>
        <li>
          <strong>Server rendering on each request.</strong> Right for search result pages with many filter
          combinations and for anything personalized.
        </li>
      </ul>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>ISR or server rendering</strong></td><td>Public listing detail, city, neighborhood and saved-search landing pages: anything that should appear in search results.</td></tr>
            <tr><td><strong>Static generation</strong></td><td>Marketing pages, guides and a small, slow-changing inventory.</td></tr>
            <tr><td><strong>Client-only SPA</strong></td><td>Agent dashboards, CRM screens, admin tools and investor portals behind a login, where indexing is not wanted.</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Next.js is one way to get all three in one codebase; any server-side framework that returns complete HTML
        meets the requirement. A Next.js major version{' '}
        <Src href={NEXT_SUPPORT}>stays in Maintenance LTS for two years following its initial release</Src>, so
        budget for framework upgrades.
      </p>

      <h2>6. Media storage and delivery</h2>
      <p>
        Since you must hold your own copies of listing photos, the usual design is object storage for the
        originals, a CDN in front, and resized variants made on upload or on first request. Amazon S3, as one
        example, is <Src href={S3}>designed to provide 99.999999999% durability</Src>, and a CDN such as
        CloudFront <Src href={CLOUDFRONT}>delivers content through a worldwide network of edge locations</Src>.
        If the frontend is Next.js, its image optimization{' '}
        <Src href={NEXT_SELF}>works self-hosted with zero configuration</Src> under <code>next start</code>, but
        images are <Src href={NEXT_SELF}>optimized at runtime, not during the build</Src>, so at MLS photo volumes
        that work competes with page rendering unless you move it to a separate service.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>Resize on first request, cache at the CDN</strong></td><td>Millions of photos of which most are rarely viewed; you pay only for what is looked at.</td></tr>
            <tr><td><strong>Resize on ingestion</strong></td><td>A smaller inventory, a fixed set of sizes, and a media worker that already touches each photo.</td></tr>
            <tr><td><strong>A separate image service</strong></td><td>Photo traffic is heavy enough to slow the application servers.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>7. Hosting</h2>
      <p>
        Hosting follows from the layers above and from who will be on call. Next.js{' '}
        <Src href={NEXT_DEPLOY}>can be deployed as a Node.js server, a Docker container, a static export, or adapted to run on different platforms</Src>;
        if you run several instances yourself, note that{' '}
        <Src href={NEXT_SELF}>each Kubernetes pod keeps its own copy of the cache</Src> unless you configure a
        shared one. Managed databases remove backups and patching from your list; Amazon RDS for PostgreSQL, for
        one, <Src href={RDS_POSTGIS}>supports the PostGIS extension</Src>; confirm the extensions you need before
        you sign up.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Choose</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><strong>A platform plus managed database and search</strong></td><td>A small team without operations staff. You pay more per unit and operate less.</td></tr>
            <tr><td><strong>Containers on a cloud with managed data services</strong></td><td>Several services (API, sync and media workers) and someone who owns deployment.</td></tr>
            <tr><td><strong>Your own virtual servers</strong></td><td>Cost control matters most and you have the skills to patch, back up and monitor.</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Two published stacks, as worked examples</h2>
      <p>These are what two of our case-study pages state, not a house standard.</p>
      <ul>
        <li>
          <strong><Link href="/case-studies/scaling-real-estate-saas-platform">White-label agent websites for a brokerage</Link>.</strong>{' '}
          Next.js with ISR, Node.js, MongoDB, Elasticsearch, Redis, AWS (S3 and SES) and Linode / VPS hosting.
          The page gives the reason for the split: property search queried MongoDB directly and took 3 to 5
          seconds under load, so MongoDB stayed the source of truth, Elasticsearch took over search, filters,
          geo-queries and auto-suggestions, and Redis cached repeated queries.
        </li>
        <li>
          <strong><Link href="/case-studies/w3re-ai-real-estate-platform">W3|re, a multi-market brokerage platform</Link>.</strong>{' '}
          Next.js, React Native, Node.js, Python, PostgreSQL, Redis, Apache Kafka, Mapbox GL and AWS EKS, among
          others, with a pipeline that ingests from four MLS systems and deduplicates cross-listed properties.
        </li>
      </ul>
      <p>One uses a document database and the other a relational one. Both fit what their pages describe.</p>

      <h2>The stack worksheet</h2>
      <p>Answer these on one page before anyone proposes a technology.</p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Question</th><th>Your answer</th><th>What it decides</th></tr></thead>
          <tbody>
            <tr><td><strong>1. Listing volume</strong></td><td>Active listings, plus sold history you will keep</td><td>Whether database search is enough; hosted-search pricing; static build feasibility</td></tr>
            <tr><td><strong>2. MLS feeds</strong></td><td>How many, on which platforms, with how many local fields</td><td>How much per-MLS data needs a flexible column or document; number of sync workers</td></tr>
            <tr><td><strong>3. Search features</strong></td><td>Filters, map bounds, radius, drawn polygon, autocomplete, clustered pins, natural language</td><td>Database search, a search engine, or a hosted service</td></tr>
            <tr><td><strong>4. Data around listings</strong></td><td>Tenants, agents, leads, saved searches, billing, documents</td><td>Relational or document system of record</td></tr>
            <tr><td><strong>5. Pages that must rank</strong></td><td>Which page types, how many, how often they change</td><td>ISR, server rendering or static; revalidation hooked to sync</td></tr>
            <tr><td><strong>6. Freshness</strong></td><td>Sync interval and the refresh rule in each license</td><td>Cache timeouts, page revalidation, index refresh</td></tr>
            <tr><td><strong>7. Team skills</strong></td><td>Languages and databases the team runs in production today; who you can hire</td><td>Backend language, and often the database</td></tr>
            <tr><td><strong>8. Compliance</strong></td><td>MLS license terms on third-party processors and AI use; privacy law where your users are</td><td>Hosted versus self-run services; hosting region</td></tr>
            <tr><td><strong>9. Operations budget</strong></td><td>Who is on call, and monthly spend you accept for managed services</td><td>Number of separate systems; platform versus cloud versus servers</td></tr>
            <tr><td><strong>10. Media</strong></td><td>Photos per listing, sizes needed, retention after a listing closes</td><td>Storage size, resize strategy, CDN</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        If answers 1 to 3 are small (one or two feeds, filters and a map), one database, one application and
        server-rendered pages are enough. Add a search engine, a cache and separate workers when an answer calls
        for them. Feed and license fees are a separate line: the{' '}
        <Link href="/tools/mls-idx-cost-calculator">MLS and IDX cost calculator</Link> adds up published fees for
        the boards you pick.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Is PostgreSQL or MongoDB the right database for a real estate platform?', answer: ['Both work. PostgreSQL with PostGIS suits platforms where listings sit among relational data, with ', ['radius queries in meters on the geography type', GIS_DWITHIN], '. MongoDB suits products built around the listing document and supports ', ['$geoWithin and $near queries on GeoJSON', MDB_GEO], '. Team experience is a fair tiebreaker.'] },
        { question: 'Do I need Elasticsearch for property search?', answer: ['Not always. PostgreSQL with PostGIS handles filters, map bounds and radius, and has ', ['built-in full text search', PG_FTS], '. A search engine earns its place when you need autocomplete, clustered map pins or relevance tuning; Elasticsearch, for example, provides a ', ['completion suggester for search-as-you-type', ES_SUGGEST], '.'] },
        { question: 'Can a real estate site be a client-only single-page app?', answer: ['The logged-in parts can. Public listing pages should arrive as HTML: Google says ', ['server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript', GOOGLE_JS], '.'] },
      ]} />

      <p className="cp-note">
        Capabilities, prices and support windows were read from each technology&apos;s own documentation on October
        12, 2026, and change with new versions. MySQL&apos;s support-lifecycle page could not be read that day,
        so no MySQL support window is given. No benchmark or popularity survey is cited.
      </p>
      <p>
        Choosing or reviewing a stack for a listing platform? See our{' '}
        <Link href="/services/saas-development">SaaS development service</Link>. Every project starts with a
        30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
