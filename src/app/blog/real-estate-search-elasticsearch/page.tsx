import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import SearchIndexArchitectureDiagram from '../../components/diagrams/SearchIndexArchitectureDiagram';

const SLUG = 'real-estate-search-elasticsearch';
export const metadata = guideMetadata(SLUG);

// Every capability, default and limit below was read on elastic.co on 2026-10-12 and re-checked on
// 2026-10-13; the sentence
// relied on for each link is logged in docs/content/sources/real-estate-search-elasticsearch.md.
// OpenSearch documentation was not fetched for this article, so no OpenSearch behavior is stated.
// The mapping and the query are illustrative and were not run against a cluster.
const ES = 'https://www.elastic.co/docs';
const KEYWORD = `${ES}/reference/elasticsearch/mapping-reference/keyword`;
const TEXT = `${ES}/reference/elasticsearch/mapping-reference/text`;
const NUMBER = `${ES}/reference/elasticsearch/mapping-reference/number`;
const DATE = `${ES}/reference/elasticsearch/mapping-reference/date`;
const GEO_POINT = `${ES}/reference/elasticsearch/mapping-reference/geo-point`;
const GEO_SHAPE = `${ES}/reference/elasticsearch/mapping-reference/geo-shape`;
const NESTED = `${ES}/reference/elasticsearch/mapping-reference/nested`;
const FLATTENED = `${ES}/reference/elasticsearch/mapping-reference/flattened`;
const DYNAMIC = `${ES}/reference/elasticsearch/mapping-reference/dynamic`;
const NORMALIZER = `${ES}/reference/elasticsearch/mapping-reference/normalizer`;
const MULTI_FIELDS = `${ES}/reference/elasticsearch/mapping-reference/multi-fields`;
const SAYT = `${ES}/reference/elasticsearch/mapping-reference/search-as-you-type`;
const UPDATE_MAPPING = `${ES}/manage-data/data-store/mapping/update-mappings-examples`;
const FILTER_CTX = `${ES}/reference/query-languages/query-dsl/query-filter-context`;
const BOOL = `${ES}/reference/query-languages/query-dsl/query-dsl-bool-query`;
const QUERY_CACHE = `${ES}/reference/elasticsearch/configuration-reference/node-query-cache-settings`;
const REQUEST_CACHE = `${ES}/deploy-manage/distributed-architecture/shard-request-cache`;
const GEO_BBOX = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-bounding-box-query`;
const GEO_DISTANCE = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-distance-query`;
const GEO_SHAPE_Q = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-shape-query`;
const GEO_POLYGON = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-polygon-query`;
const SUGGEST = `${ES}/reference/elasticsearch/rest-apis/search-suggesters`;
const EDGE_NGRAM = `${ES}/reference/text-analysis/analysis-edgengram-tokenizer`;
const SORT = `${ES}/reference/elasticsearch/rest-apis/sort-search-results`;
const PAGINATE = `${ES}/reference/elasticsearch/rest-apis/paginate-search-results`;
const PIT = `${ES}/api/doc/elasticsearch/operation/operation-open-point-in-time`;
const INDEX_SETTINGS = `${ES}/reference/elasticsearch/index-settings/index-modules`;
const TERMS_AGG = `${ES}/reference/aggregations/search-aggregations-bucket-terms-aggregation`;
const RANGE_AGG = `${ES}/reference/aggregations/search-aggregations-bucket-range-aggregation`;
const POST_FILTER = `${ES}/reference/elasticsearch/rest-apis/filter-search-results`;
const ALIASES = `${ES}/manage-data/data-store/aliases`;
const NRT = `${ES}/manage-data/data-store/near-real-time-search`;
const INDEXING_SPEED = `${ES}/deploy-manage/production-guidance/optimize-performance/indexing-speed`;
const BULK = `${ES}/api/doc/elasticsearch/operation/operation-bulk`;
const INDEX_API = `${ES}/api/doc/elasticsearch/operation/operation-create`;
const MULTI_MATCH = `${ES}/reference/query-languages/query-dsl/query-dsl-multi-match-query`;
const MATCH = `${ES}/reference/query-languages/query-dsl/query-dsl-match-query`;
const SYNONYM_GRAPH = `${ES}/reference/text-analysis/analysis-synonym-graph-tokenfilter`;
const FUNCTION_SCORE = `${ES}/reference/query-languages/query-dsl/query-dsl-function-score-query`;

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The problem: one search box, five kinds of question</h2>
      <p>
        A buyer on a listing site asks five different things through the same screen. Which homes match these
        filters. Which of them are inside this map view. What was that address I started typing. How many condos
        are left if I add a price cap. And, occasionally, which listings mention a fenced yard. A relational or
        document database answers the first well, the second with a spatial index, and the rest with increasing
        effort, which is when teams add a search engine as a second, derived copy of the listing data.
      </p>
      <p>
        Whether you need one at all is covered in our{' '}
        <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link>, and how listings reach your
        database in the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture guide</Link>. This
        article starts after both decisions: you have chosen Elasticsearch, the listings are in a system of
        record, and the question is how to design the index, the queries and the sync. Each capability and limit
        is linked to Elastic&apos;s documentation as read on October 12 and 13, 2026.
      </p>

      <h2>Where the index sits</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><SearchIndexArchitectureDiagram /></div>
        <figcaption>
          The index is a derived copy. The indexer writes to versioned indices; the application reads through one
          alias. Index names are illustrative.
        </figcaption>
      </figure>
      <p>The same architecture in words:</p>
      <ul>
        <li><strong>Write path.</strong> When rows change in the primary database, an indexer builds one search document per listing and sends bulk upserts and deletes to the live index (here <code>listings_v7</code>).</li>
        <li><strong>Rebuild.</strong> When the mapping changes, the indexer fills a new index (<code>listings_v8</code>) with a full load plus the same ongoing changes. Nothing searches it yet.</li>
        <li><strong>Read path.</strong> The website and apps call a search API, which builds the query, adds the display filters, and queries only the alias <code>listings</code>.</li>
        <li><strong>Swap.</strong> After the new index is verified, the alias moves from <code>listings_v7</code> to <code>listings_v8</code> in one atomic step, and the old index is kept for rollback.</li>
      </ul>
      <p>
        Two rules follow: the application never names a physical index, and the index never holds anything that
        cannot be rebuilt from the database.
      </p>

      <h2>Index design: one document per listing</h2>
      <p>
        Start with explicit mappings. Elasticsearch will guess types if you let it, but with{' '}
        <code>&quot;dynamic&quot;: &quot;strict&quot;</code>, when new fields are detected{' '}
        <Src href={DYNAMIC}>an exception is thrown and the document is rejected</Src>. For MLS data, where a feed can
        add a field without notice, we would take a rejected document that raises an alert over a silently
        mis-typed field, because <Src href={UPDATE_MAPPING}>you cannot change the field type of an existing field</Src>;
        the fix is a new index and a reindex.
      </p>
      <p>The type you choose for each field decides which operations are possible on it:</p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Listing data</th><th>Type</th><th>Why</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Status, property type, city, postal code, feature tags, listing ID</td>
              <td><code>keyword</code></td>
              <td>
                Meant for <Src href={KEYWORD}>structured content such as IDs, email addresses, hostnames, status codes, zip codes, or tags</Src>,
                and usable for <Src href={KEYWORD}>sorting, aggregations, or scripting</Src>. Elastic also notes that{' '}
                <Src href={NUMBER}>term query searches on keyword fields are often faster than term searches on numeric fields</Src>,
                so an MLS number you never range over is a keyword even when it is all digits.
              </td>
            </tr>
            <tr>
              <td>Public remarks</td>
              <td><code>text</code></td>
              <td>
                Analyzed, <Src href={TEXT}>to search for individual words within each full text field</Src>. Text
                fields <Src href={TEXT}>are not used for sorting and seldom used for aggregations</Src>.
              </td>
            </tr>
            <tr>
              <td>Price, bedrooms, bathrooms, living area, lot size, year built</td>
              <td><code>long</code>, <code>short</code>, <code>half_float</code>, <code>integer</code></td>
              <td>
                Numeric fields are <Src href={NUMBER}>optimized for range queries</Src>, which is what a price or
                bedroom filter is. For integers, <Src href={NUMBER}>pick the smallest type which is enough for your use-case</Src>.
              </td>
            </tr>
            <tr>
              <td>List date, modification time, open house start</td>
              <td><code>date</code></td>
              <td>
                Stored internally as <Src href={DATE}>a long number representing milliseconds-since-the-epoch</Src>,
                in UTC. Send dates with their offset.
              </td>
            </tr>
            <tr>
              <td>The listing&apos;s coordinates</td>
              <td><code>geo_point</code></td>
              <td>
                Supports finding points <Src href={GEO_POINT}>within a bounding box, within a certain distance of a central point, or within a geo_shape query</Src>,
                plus grid aggregations and <Src href={GEO_POINT}>sorting documents by distance</Src>.
              </td>
            </tr>
            <tr>
              <td>Neighborhood, school zone or custom area boundaries</td>
              <td><code>geo_shape</code></td>
              <td>
                Required <Src href={GEO_SHAPE}>if the data being indexed contains shapes other than just points</Src>.
                Boundaries belong in their own small index, not on the listing.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        One field often needs two types: a city name is filtered and counted as a keyword but also typed into a
        search box. Multi-fields exist for this, since{' '}
        <Src href={MULTI_FIELDS}>it is often useful to index the same field in different ways for different purposes</Src>.
        For keyword fields that users type, add a normalizer, which is{' '}
        <Src href={NORMALIZER}>similar to analyzer except that it guarantees that the analysis chain produces a single token</Src>,
        so that &quot;AUSTIN&quot; from one feed and &quot;Austin&quot; from another land in the same bucket.
      </p>

      <h3>Arrays of objects: nested, flattened, or neither</h3>
      <p>
        Rooms and open houses arrive as arrays of objects, and this is where a listing mapping usually goes wrong.
        Elasticsearch <Src href={NESTED}>has no concept of inner objects</Src>: it flattens an array of objects into
        multi-value fields, and <Src href={NESTED}>the association between</Src> the values of one object is lost.
        A listing with a Saturday open house at 10:00 and a Sunday one at 14:00 would then match a search for
        &quot;Saturday at 14:00&quot;.
      </p>
      <ul>
        <li>
          <strong>Nested</strong> keeps each object separate:{' '}
          <Src href={NESTED}>each nested object can be queried independently of the others</Src>. The cost is
          that every nested object is indexed <Src href={NESTED}>as a separate hidden document</Src>, and Elastic
          says that{' '}
          <Src href={NESTED}>nested documents and queries are typically expensive</Src>. The defaults cap an index
          at <Src href={NESTED}>100 distinct nested mappings and a document at 10,000 nested objects</Src>.
        </li>
        <li>
          <strong>Flattened</strong> maps a whole object as one field and indexes its leaf values{' '}
          <Src href={FLATTENED}>into one field as keywords</Src>. It suits the long tail of board-specific fields
          you want searchable without mapping each one. Its limit:{' '}
          <Src href={FLATTENED}>all values in the JSON object are treated as keywords</Src>, so there are no numeric
          ranges on it.
        </li>
        <li>
          <strong>Neither.</strong> Often the question buyers ask is simpler than the data. &quot;Has an open house
          this weekend&quot; needs one top-level date, the next open house start, computed by the indexer. We
          would use nested only when the product filters on two properties of the same object.
        </li>
      </ul>

      <h3>An illustrative mapping</h3>
      <p>Illustrative: field names, analyzers and settings are examples, trimmed to the fields discussed here.</p>
      <pre className="cp-code"><code>{`PUT /listings_v8
{
  "settings": {
    "refresh_interval": "30s",
    "analysis": {
      "normalizer": {
        "lower_ascii": { "type": "custom", "filter": ["lowercase", "asciifolding"] }
      }
    }
  },
  "mappings": {
    "dynamic": "strict",
    "properties": {
      "listing_key":     { "type": "keyword" },
      "source_system":   { "type": "keyword" },
      "standard_status": { "type": "keyword" },
      "property_type":   { "type": "keyword" },
      "city":            { "type": "keyword", "normalizer": "lower_ascii" },
      "postal_code":     { "type": "keyword" },
      "features":        { "type": "keyword" },
      "list_price":      { "type": "long" },
      "bedrooms":        { "type": "short" },
      "bathrooms":       { "type": "half_float" },
      "living_area":     { "type": "integer" },
      "listed_at":       { "type": "date" },
      "modified_at":     { "type": "date" },
      "next_open_house": { "type": "date" },
      "location":        { "type": "geo_point" },
      "address":         { "type": "search_as_you_type" },
      "address_exact":   { "type": "keyword", "normalizer": "lower_ascii" },
      "remarks":         { "type": "text", "analyzer": "english" },
      "open_houses": {
        "type": "nested",
        "properties": {
          "kind":      { "type": "keyword" },
          "starts_at": { "type": "date" },
          "ends_at":   { "type": "date" }
        }
      },
      "local_fields":    { "type": "flattened" }
    }
  }
}`}</code></pre>

      <h2>Filters versus queries, and why filters cache</h2>
      <p>
        Every clause in a search runs in one of two contexts. In query context a clause answers{' '}
        <Src href={FILTER_CTX}>how well does this document match</Src> and produces a score. In filter context the
        answer is <Src href={FILTER_CTX}>simply &quot;yes&quot; or &quot;no&quot;</Src>. Elastic lists the
        consequences: filters skip score calculation, and{' '}
        <Src href={FILTER_CTX}>Elasticsearch automatically caches frequently used filters</Src>. In a{' '}
        <code>bool</code> query, clauses under <code>filter</code> and <code>must_not</code> run in filter context,{' '}
        <Src href={BOOL}>meaning that scoring is ignored and clauses are considered for caching</Src>.
      </p>
      <p>
        Almost everything in a property search is a filter: status, price range, bedrooms, property type and the
        map bounds are yes-or-no conditions. Only free text belongs in query context. A search with no text
        should have an empty <code>must</code> and an explicit sort.
      </p>
      <p>The caching has edges worth knowing, because they shape how you write filters:</p>
      <ul>
        <li>
          The node query cache holds, by default,{' '}
          <Src href={QUERY_CACHE}>a maximum of 10000 queries in up to 10% of the total heap space</Src>, and caches
          per segment only where{' '}
          <Src href={QUERY_CACHE}>a segment contains at least 10000 documents and the segment has at least 3% of the total documents of a shard</Src>.
          The same page says that{' '}
          <Src href={QUERY_CACHE}>term queries and queries used outside of a filter context are not eligible for caching</Src>,
          so the benefit is on ranges, geo clauses and compound conditions that many users share.
        </li>
        <li>
          The shard request cache stores whole responses, but by default{' '}
          <Src href={REQUEST_CACHE}>only where size=0, so it will not cache hits, but it will cache hits.total, aggregations, and suggestions</Src>.
          That fits a facet-count or map-cluster request, which wants counts and no hits.
        </li>
        <li>
          Cached responses are <Src href={REQUEST_CACHE}>invalidated automatically whenever the shard refreshes</Src>,
          and <Src href={REQUEST_CACHE}>most queries that use now cannot be cached</Src>. Round time-based filters
          in the application (for example &quot;listed since midnight&quot; as a fixed timestamp) instead of
          sending <code>now-7d</code> on every request.
        </li>
      </ul>
      <p>
        So make filters repeatable. A viewport snapped to a tile grid and a price range chosen from fixed steps
        produce the same clause for many users; a raw bounding box with fourteen decimal places is unique to one
        mouse movement.
      </p>

      <h2>Geospatial search</h2>
      <p>
        Three shapes cover what buyers do on a map. The viewport is a <code>geo_bounding_box</code>, which{' '}
        <Src href={GEO_BBOX}>matches geo_point and geo_shape values that intersect a bounding box</Src>. A radius
        (&quot;within 5 miles of this school&quot;) is <code>geo_distance</code>, which{' '}
        <Src href={GEO_DISTANCE}>matches geo_point and geo_shape values within a given distance of a geopoint</Src>.
        A drawn area or a neighborhood boundary is the <code>geo_shape</code> query, which filters{' '}
        <Src href={GEO_SHAPE_Q}>documents indexed using either the geo_shape or the geo_point type</Src> by a
        spatial relationship: <Src href={GEO_SHAPE_Q}>intersects, contains, within, or disjoint</Src>. The older{' '}
        <code>geo_polygon</code> query is <Src href={GEO_POLYGON}>deprecated in 7.12</Src>; new code should not
        use it.
      </p>
      <p>
        For named areas, do not send the boundary with every request. The <code>geo_shape</code> query accepts{' '}
        <Src href={GEO_SHAPE_Q}>a shape which has already been indexed in another index</Src>, so a neighborhood
        search references the boundary by ID. For stable boundaries we would also weigh resolving them at index
        time and storing neighborhood IDs on the listing as keywords: a spatial test becomes a term filter, at the
        cost of reindexing listings when a boundary changes. Viewport behavior, clustering and drawn areas are
        covered in <Link href="/blog/map-based-property-search">building map-based property search</Link>.
      </p>

      <h2>Autocomplete: two tools for two jobs</h2>
      <p>
        The search box suggests two kinds of thing. Places (cities, neighborhoods, postal codes, schools) form a
        small, slowly changing list typed from the beginning. Addresses are a large, constantly changing set
        typed in any order: &quot;main 123&quot;, &quot;123 n main&quot;.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Approach</th><th>What the documentation says</th><th>Fits</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Completion suggester</strong></td>
              <td>
                <Src href={SUGGEST}>Optimized for speed</Src>, with data structures that are{' '}
                <Src href={SUGGEST}>costly to build and are stored in-memory</Src>. It{' '}
                <Src href={SUGGEST}>considers all documents in the index</Src> unless you add context mappings.
                Elastic recommends it for <Src href={EDGE_NGRAM}>text which has a widely known order</Src>.
              </td>
              <td>A dedicated places index: every entry should be suggested, and names are typed from the start.</td>
            </tr>
            <tr>
              <td><strong><code>search_as_you_type</code> field</strong></td>
              <td>
                Creates shingle and prefix subfields; supports{' '}
                <Src href={SAYT}>both prefix completion and infix completion</Src>. Queried with a{' '}
                <code>multi_match</code> of type <code>bool_prefix</code>, which{' '}
                <Src href={SAYT}>can match the query terms in any order, but will score documents higher if they contain the terms in order</Src>.
              </td>
              <td>Addresses on the listing index. It is an ordinary query, so status and display filters apply.</td>
            </tr>
            <tr>
              <td><strong>Custom edge n-grams</strong></td>
              <td>
                <Src href={EDGE_NGRAM}>Useful for search-as-you-type queries</Src>, with the advantage{' '}
                <Src href={EDGE_NGRAM}>when trying to autocomplete words that can appear in any order</Src>. With an
                index analyzer, <Src href={EDGE_NGRAM}>search terms longer than the max_gram length may not match any indexed terms</Src>.
              </td>
              <td>When you need control over tokenization that the built-in field type does not give.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The second row matters most for listings. Because <code>search_as_you_type</code> is queried like any
        other field, the filter that hides a listing from results also hides it from suggestions. The completion
        suggester needs separate handling for that, which is one reason we would keep it for places. A
        suggestion for a listing you no longer display is more than a dead link: whether it may appear at all is
        a question for your MLS rules.
      </p>

      <h2>Sorting and pagination</h2>
      <p>
        Sort on keyword, numeric and date fields. Elastic&apos;s guidance is to{' '}
        <Src href={SORT}>avoid sorting by text fields</Src>. Three details prevent the usual bugs:
      </p>
      <ul>
        <li>
          <strong>Missing values.</strong> Listings without a price or a lot size exist. The <code>missing</code>{' '}
          parameter decides where they go, and <Src href={SORT}>the default is _last</Src>. Decide it per sort
          rather than discovering it in production.
        </li>
        <li>
          <strong>Ties.</strong> Many listings share a price or a list date. Without a unique final sort field,
          Elastic warns that <Src href={PAGINATE}>your paged results could miss or duplicate hits</Src>, because the
          internal IDs used to break ties{' '}
          <Src href={PAGINATE}>can be completely different across replicas of the same data</Src>. Always end the
          sort with the listing key.
        </li>
        <li>
          <strong>Distance.</strong> &quot;Nearest first&quot; is a <Src href={SORT}>_geo_distance</Src> sort on the{' '}
          <code>geo_point</code> field, not a relevance trick.
        </li>
      </ul>
      <p>
        Pagination has a hard default. With <code>from</code> and <code>size</code>,{' '}
        <Src href={PAGINATE}>you cannot page through more than 10,000 hits</Src>; the cap is{' '}
        <code>index.max_result_window</code>, and it exists because{' '}
        <Src href={INDEX_SETTINGS}>search requests take heap memory and time proportional to from + size</Src>.
        We would not raise it. Three patterns cover a listing site:
      </p>
      <ul>
        <li>
          <strong>Numbered pages for people.</strong> <code>from</code> and <code>size</code> are fine for the
          first pages of a result list. Stop offering page numbers well before the cap.
        </li>
        <li>
          <strong>&quot;Load more&quot; and deep paging.</strong> <code>search_after</code> retrieves the next page{' '}
          <Src href={PAGINATE}>using a set of sort values from the previous page</Src>. The cursor is the last
          hit&apos;s sort values, which is why the unique tiebreaker matters.
        </li>
        <li>
          <strong>Consistent sweeps for jobs.</strong> If the index refreshes between pages, the order can change.
          A point in time is <Src href={PIT}>a lightweight view into the state of the data as it existed when initiated</Src>,
          and its <code>keep_alive</code> <Src href={PIT}>just needs to be long enough for the next request</Src>.
          The scroll API is no longer the answer here: Elastic says{' '}
          <Src href={PAGINATE}>we no longer recommend using the scroll API for deep pagination</Src>.
        </li>
      </ul>
      <p>
        A map does not paginate. When thousands of listings fall inside the viewport, return clusters from a grid
        aggregation and a short list.
      </p>

      <h2>Facet counts with aggregations</h2>
      <p>
        The numbers beside each filter option (&quot;Condo (212)&quot;) come from aggregations run with the search.
        A <code>terms</code> aggregation on a keyword field returns, by default,{' '}
        <Src href={TERMS_AGG}>the top ten terms with the most documents</Src>; set <code>size</code> for longer
        lists such as cities. A <code>range</code> aggregation gives price bands, and it{' '}
        <Src href={RANGE_AGG}>includes the from value and excludes the to value for each range</Src>, so bands do
        not double count at their edges.
      </p>
      <p>
        The design question is what a count should mean once the user has selected something in that same facet.
        If the buyer ticks &quot;Condo&quot; and that filter is applied to everything, every other type shows zero
        and the facet is useless for adding a second type. Elasticsearch separates the two
        scopes: boolean filters apply <Src href={POST_FILTER}>to both search hits and aggregations</Src>, while a{' '}
        <code>post_filter</code> applies <Src href={POST_FILTER}>only to search hits, not aggregations</Src>. So
        filters that should narrow every count go in the <code>bool</code> filter, and a multi-select facet&apos;s
        own selection goes in <code>post_filter</code>, with each other facet&apos;s aggregation wrapped in a{' '}
        <code>filter</code> aggregation that re-applies the selections it should respect.
      </p>
      <p>
        Ask only for the facets on screen, and consider sending counts as a separate <code>size: 0</code>{' '}
        request, which is the form the shard request cache stores.
      </p>

      <h3>An illustrative query</h3>
      <p>
        Illustrative: a text search for &quot;fenced yard&quot; among active three-bedroom homes in a viewport, with a
        multi-select property type, newest first, continuing after the previous page. Values are examples.
      </p>
      <pre className="cp-code"><code>{`POST /listings/_search
{
  "size": 24,
  "query": {
    "bool": {
      "must": [
        { "match": { "remarks": { "query": "fenced yard", "operator": "and" } } }
      ],
      "filter": [
        { "term":  { "standard_status": "Active" } },
        { "range": { "list_price": { "gte": 400000, "lte": 650000 } } },
        { "range": { "bedrooms":   { "gte": 3 } } },
        { "geo_bounding_box": {
            "location": {
              "top_left":     { "lat": 30.42, "lon": -97.90 },
              "bottom_right": { "lat": 30.18, "lon": -97.62 }
            }
        } }
      ]
    }
  },
  "post_filter": { "terms": { "property_type": ["Condominium", "Townhouse"] } },
  "aggs": {
    "property_types": { "terms": { "field": "property_type", "size": 20 } }
  },
  "sort": [
    { "listed_at":   "desc" },
    { "listing_key": "asc" }
  ],
  "search_after": [1791763200000, "ACT-1048812"]
}`}</code></pre>

      <h2>Relevance for addresses and free text</h2>
      <p>
        Most listing searches have no text and so no relevance problem. Where text appears, it is one of two
        different things. <strong>Addresses are identifiers that people type inconsistently:</strong>{' '}
        &quot;123 N Main St #4&quot; and &quot;123 north main street apt 4&quot; are the same place. What we would
        build:
      </p>
      <ul>
        <li>An exact path first: the normalized full address and the listing ID as keyword fields, checked before anything fuzzy. A user who pastes an MLS number wants that listing.</li>
        <li>
          A standard-form address produced by the pipeline, plus search-time synonyms for street suffixes and
          directionals. The <code>synonym_graph</code> filter handles{' '}
          <Src href={SYNONYM_GRAPH}>multi-word synonyms correctly</Src> and is{' '}
          <Src href={SYNONYM_GRAPH}>designed to be used as part of a search analyzer only</Src>, which means the
          list can change without a reindex.
        </li>
        <li>
          When street, city and postal code live in separate fields, a <code>multi_match</code> of type{' '}
          <code>cross_fields</code>, which{' '}
          <Src href={MULTI_MATCH}>treats fields with the same analyzer as though they were one big field</Src>.
        </li>
        <li>Sparing use of typo tolerance. <Src href={MATCH}>Fuzziness</Src> on a house number turns 123 into 128, which is a different house.</li>
      </ul>
      <p>
        <strong>Remarks are prose.</strong> Use a language analyzer, require all terms for short queries, and
        weight a headline field where one exists:{' '}
        <Src href={MULTI_MATCH}>individual fields can be boosted with the caret (^) notation</Src>. If a text
        search should still favor fresh inventory, a decay function scores a document by{' '}
        <Src href={FUNCTION_SCORE}>the distance of a numeric field value of the document from a user given origin</Src>,
        for example the list date from today. Keep such a boost mild and drop it when the user has chosen a sort.
      </p>

      <h2>Keeping the index in sync with the database</h2>
      <h3>Aliases and zero-downtime reindexing</h3>
      <p>
        Mappings change: a new filter, a different analyzer, a field that should have been a keyword. Since field
        types cannot be changed in place, every such change is a new index. Elastic lists{' '}
        <Src href={ALIASES}>reindexing data without downtime</Src> as a purpose of aliases, and the aliases API can{' '}
        <Src href={ALIASES}>perform multiple actions in a single atomic operation</Src>, so that during the swap
        the alias <Src href={ALIASES}>has no downtime and never points to both</Src> at the same time. The
        procedure we would follow:
      </p>
      <ol>
        <li>Create the next versioned index with the new mapping.</li>
        <li>Start sending live changes to both the current and the new index.</li>
        <li>Fill the new index from the database, not from the old index, so that the rebuild also proves the index is rebuildable. With external versions (below), the backfill cannot overwrite a newer live change.</li>
        <li>Verify: document count against displayable rows in the database, and a fixed set of saved queries run against both indices.</li>
        <li>Swap the alias in one request. Keep the old index until you are sure, then delete it.</li>
      </ol>
      <p>
        For the load itself, bulk requests{' '}
        <Src href={INDEXING_SPEED}>will yield much better performance than single-document index requests</Src>;
        the batch size is found by testing, and it is{' '}
        <Src href={INDEXING_SPEED}>advisable to avoid going beyond a couple tens of megabytes per request</Src>.
        During a large load you can{' '}
        <Src href={INDEXING_SPEED}>disable refreshing by setting the refresh interval to -1</Src> and set{' '}
        <Src href={INDEXING_SPEED}>index.number_of_replicas to 0</Src>, which Elastic pairs with a condition a
        derived index meets: <Src href={INDEXING_SPEED}>it is important that the data lives elsewhere</Src>.
        Restore both before the swap. If the cluster answers{' '}
        <Src href={INDEXING_SPEED}>TOO_MANY_REQUESTS (429)</Src>, pause and retry with{' '}
        <Src href={INDEXING_SPEED}>randomized exponential backoff</Src>.
      </p>

      <h3>Incremental updates and the refresh interval</h3>
      <p>
        Between rebuilds, each batch of changed listings becomes one bulk request of index and delete actions. A
        bulk request can{' '}
        <Src href={BULK}>perform multiple index, create, delete, and update actions in a single request</Src>, and
        it can partly fail: the response carries an <code>errors</code> flag that is true when{' '}
        <Src href={BULK}>one or more of the operations in the bulk request did not complete successfully</Src>,
        with a result for each item. An indexer that checks only the HTTP status will lose documents quietly.
      </p>
      <p>
        Changes are not searchable at once. By default Elasticsearch{' '}
        <Src href={NRT}>periodically refreshes indices every second, but only on indices that have received one search request or more in the last 30 seconds</Src>.
        A listing index fed by a sync that runs every few minutes has little use for one-second refreshes, and
        Elastic notes that raising <code>index.refresh_interval</code>,{' '}
        <Src href={INDEXING_SPEED}>e.g. 30s, might help improve indexing speed</Src>. A longer interval also keeps
        cached facet responses valid for longer.
      </p>
      <p>
        Out-of-order writes are the subtle failure. Two workers process two changes to the same listing and the
        older one lands last. With external versioning, a document is indexed only{' '}
        <Src href={INDEX_API}>if the specified version is strictly higher than the version of the stored document</Src>.
        Using the listing&apos;s modification timestamp as that version turns a late, stale write into a
        version conflict you can ignore. Deletes need the same care: send the version with the delete, and note
        that <code>index.gc_deletes</code>, the time{' '}
        <Src href={INDEX_SETTINGS}>a deleted document&apos;s version number remains available for further versioned operations</Src>,
        defaults to 60 seconds. A stale write that arrives later than that can bring a removed listing back,
        which is one job of the reconciliation below.
      </p>

      <h3>Removals</h3>
      <p>
        A listing that is sold, withdrawn or no longer licensed for display must leave search results. We would
        handle that in three layers. The indexer turns &quot;no longer displayable&quot; into a delete action in
        the same bulk request as the updates. The search API adds the status and display filters to every query,
        so a document that lingers is still not returned. And a scheduled reconciliation compares listing keys in
        the index against displayable keys in the database and deletes the difference. How long a removed listing
        may remain visible is set by your MLS license; the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">pipeline guide</Link> covers those rules.
      </p>

      <h2>What to watch in production</h2>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Signal</th><th>What it tells you</th></tr>
          </thead>
          <tbody>
            <tr><td>Index document count against displayable rows in the database</td><td>Missed updates or missed removals</td></tr>
            <tr><td>Age of the newest <code>modified_at</code> in the index against the database</td><td>Indexing lag</td></tr>
            <tr><td>Bulk item failures and rejected documents (strict mapping)</td><td>A feed added or changed a field</td></tr>
            <tr><td>429 responses to bulk requests</td><td>Indexing faster than the cluster can absorb</td></tr>
            <tr><td>Search latency by request type: list, facets, map, suggestions</td><td>Which query shape is slow, instead of one blended average</td></tr>
            <tr><td>Searches that return zero results, with their text</td><td>Missing synonyms and address forms</td></tr>
            <tr><td>Requests rejected at the 10,000-hit window</td><td>A client paging with <code>from</code> where it should use <code>search_after</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Peregrine&apos;s{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes
        this separation of roles: MongoDB as the source of truth and Elasticsearch handling property search,
        filters, geo-queries and auto-suggestions, in place of direct database queries that were taking 3 to 5
        seconds under load. The case study reports search response time going from 3.5 seconds to 180
        milliseconds. That is one platform&apos;s result as published there, not a figure to expect elsewhere.
      </p>
      <p>
        A saved search is a stored query; that design is covered in{' '}
        <Link href="/blog/saved-searches-listing-alerts">saved searches and listing alerts</Link>, and the field
        mapping that feeds this index in <Link href="/blog/mls-data-normalization">MLS data normalization</Link>.
      </p>

            <GuideFaq slug={SLUG} items={[
        { question: 'Should Elasticsearch be the primary database for listings?', answer: ['We recommend against it. Treat the index as a derived copy that can be rebuilt from the system of record. Elastic’s own guidance for fast initial loads with no replicas depends on the fact that ', ['the data lives elsewhere', INDEXING_SPEED], ', and a mapping change requires a new index because ', ['you cannot change the field type of an existing field', UPDATE_MAPPING], '.'] },
        { question: 'How deep can users page through search results?', answer: ['With from and size, ', ['you cannot page through more than 10,000 hits', PAGINATE], ' by default. Beyond that, use search_after with a unique tiebreaker in the sort, and a point in time when the pages must be consistent with each other.'] },
        { question: 'Completion suggester or search-as-you-type for the search box?', answer: ['Both, for different lists. The completion suggester is ', ['optimized for speed', SUGGEST], ' and suits a small index of place names. Addresses fit a search_as_you_type field, which matches ', ['the query terms in any order', SAYT], ' and is filtered like any other query, so listings you may not display stay out of suggestions.'] },
      ]} />

      <p className="cp-note">
        Capabilities, defaults and limits were read from the linked Elastic documentation on October 12 and 13,
        2026 and can change between versions. The mapping and the query are illustrative, were not run against a
        cluster, and are not a drop-in configuration. OpenSearch was not checked.
      </p>
      <p>
        Building or repairing listing search? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
