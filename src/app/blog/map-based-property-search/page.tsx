import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import MapSearchFlowDiagram from '../../components/diagrams/MapSearchFlowDiagram';

const SLUG = 'map-based-property-search';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-12; the sentence relied on for each link is logged in
// docs/content/sources/map-based-property-search.md. No map provider's terms are quoted: they
// differ by provider and plan and are presented only as questions to check. Queries and code
// are illustrative and were not run.
const GIS_INDEX = 'https://postgis.net/docs/using_postgis_dbmanagement.html';
const GIS_OVERLAPS = 'https://postgis.net/docs/geometry_overlaps.html';
const GIS_ENVELOPE = 'https://postgis.net/docs/ST_MakeEnvelope.html';
const GIS_COVERS = 'https://postgis.net/docs/ST_Covers.html';
const GIS_ISVALID = 'https://postgis.net/docs/ST_IsValid.html';
const GIS_MAKEVALID = 'https://postgis.net/docs/ST_MakeValid.html';
const GIS_SNAP = 'https://postgis.net/docs/ST_SnapToGrid.html';
const ES = 'https://www.elastic.co/docs';
const ES_GEO_SHAPE = `${ES}/reference/elasticsearch/mapping-reference/geo-shape`;
const ES_BBOX = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-bounding-box-query`;
const ES_SHAPE_Q = `${ES}/reference/query-languages/query-dsl/query-dsl-geo-shape-query`;
const ES_GEOTILE = `${ES}/reference/aggregations/search-aggregations-bucket-geotilegrid-aggregation`;
const ES_GEOHASH = `${ES}/reference/aggregations/search-aggregations-bucket-geohashgrid-aggregation`;
const ES_CENTROID = `${ES}/reference/aggregations/search-aggregations-metrics-geocentroid-aggregation`;
const MDB_2DS = 'https://www.mongodb.com/docs/manual/core/indexes/index-types/geospatial/2dsphere/';
const MDB_WITHIN = 'https://www.mongodb.com/docs/manual/reference/operator/query/geoWithin/';
const MDB_BOX = 'https://www.mongodb.com/docs/manual/reference/operator/query/box/';
const SUPERCLUSTER = 'https://github.com/mapbox/supercluster/blob/main/README.md';
const DD_ADDRESS = 'https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/';
const DD_LATITUDE = 'https://dd.reso.org/DD2.0/Property/Latitude/';
const MDN_ABORT = 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController';
const MDN_REPLACE = 'https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState';
const MDN_TOUCH = 'https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action';
const G_URL = 'https://developers.google.com/search/docs/crawling-indexing/url-structure';
const G_FACETED = 'https://developers.google.com/crawling/docs/faceted-navigation';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>Why map search is harder than it looks</h2>
      <p>
        A filter form sends one query when the user presses a button. A map sends a query every time the user&apos;s
        hand moves. Dragging across a city can change the search area dozens of times in a few seconds, each change
        asks for a different set of listings, and the answers come back in whatever order the network delivers them.
        At a zoomed-out view the honest answer may be forty thousand homes, which no browser should draw as forty
        thousand pins. Meanwhile a list beside the map has to show the same homes, with the same count, at every
        moment.
      </p>
      <p>
        So map search is three problems at once: a spatial query that stays fast at any zoom, a way to summarize
        too many results, and a front end that keeps map, list and URL consistent while requests overlap. This
        article covers each, for teams building it on PostGIS, Elasticsearch or MongoDB. For the index design
        behind the Elasticsearch examples, see{' '}
        <Link href="/blog/real-estate-search-elasticsearch">designing a real estate search engine with Elasticsearch</Link>;
        for choosing between these stores in the first place, see the{' '}
        <Link href="/blog/real-estate-platform-tech-stack">tech stack guide</Link>.
      </p>

      <h2>What happens when the map moves</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><MapSearchFlowDiagram /></div>
        <figcaption>
          A viewport with a drawn area, clusters and single markers, and the five steps from a map movement to a
          synchronized map and list. Counts are illustrative.
        </figcaption>
      </figure>
      <p>The diagram as a list:</p>
      <ol>
        <li><strong>The map moves.</strong> The user pans, zooms or finishes drawing an area. The viewport is described by two corners; the drawn area by a polygon.</li>
        <li><strong>Debounce and cancel.</strong> The front end waits for the movement to settle, and cancels the request already in flight.</li>
        <li><strong>Write the URL.</strong> Bounds, zoom, filters and any drawn area go into the address bar, so the view can be reloaded or shared.</li>
        <li><strong>One query.</strong> The search API applies the same filters to two outputs: a page of hits for the list, and grid buckets or points for the map.</li>
        <li><strong>One response updates both.</strong> Markers, clusters, list rows and the total come from the same response. A response that is no longer the newest is dropped.</li>
      </ol>
      <p>
        In the example, three clusters (128, 42 and 9 listings) and five single markers add up to the 184 homes the
        list reports. That arithmetic is the test of a correct implementation: at any moment, the map and the list
        describe the same result set.
      </p>

      <h2>Viewport queries: the bounding box</h2>
      <p>
        The visible map is a rectangle defined by two corners, and &quot;homes in view&quot; is a bounding-box
        query. Two things about it change as the user moves.
      </p>
      <p>
        <strong>Panning changes which box; zooming changes how big it is.</strong> Each zoom level out roughly
        quadruples the area and, in a dense market, the number of matching listings. A query that returns 60
        listings at street level returns tens of thousands at metro level. The spatial filter is the same; what
        must change is what you ask for: individual listings when there are few, aggregated counts when there are
        many. Pick the mode from the result count or the zoom level on the server, not in the browser after
        downloading everything.
      </p>
      <p>
        <strong>Raw bounds are unique; snapped bounds repeat.</strong> A viewport read from the map library has
        many decimal places and is different for every user and every pixel of drag. We would snap the requested
        bounds outward to a grid (for example the edges of the map tiles that cover the view) before querying.
        The user sees no difference, small pans inside the same tiles need no new request, and the same request
        recurs across users, which is what lets a cache help. Draw only what is inside the true viewport.
      </p>
      <p>
        Two edge cases deserve a test each: a box that crosses the 180th meridian, where the left longitude is
        greater than the right, and a view tilted or rotated by the map library, where the visible area is not an
        axis-aligned rectangle and you should query its enclosing box.
      </p>

      <h2>Spatial indexing in three data stores</h2>
      <p>
        Without a spatial index, a viewport query checks every listing. PostGIS puts it plainly:{' '}
        <Src href={GIS_INDEX}>without indexing, a search for features requires a sequential scan of every record in the database</Src>.
        Each of the three stores commonly used for listings has an index for this.
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th>Store</th><th>Index</th><th>Viewport</th><th>Polygon</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>PostgreSQL with PostGIS</strong></td>
              <td>
                GiST. PostGIS <Src href={GIS_INDEX}>uses an R-Tree index implemented on top of GiST to index spatial data</Src>.
              </td>
              <td>
                The <code>&amp;&amp;</code> operator against <code>ST_MakeEnvelope</code>, which{' '}
                <Src href={GIS_ENVELOPE}>creates a rectangular Polygon from minimum and maximum coordinates</Src>.{' '}
                <code>&amp;&amp;</code> is true when{' '}
                <Src href={GIS_OVERLAPS}>the 2D bounding box of geometry A intersects the 2D bounding box of geometry B</Src>,
                and it <Src href={GIS_OVERLAPS}>will make use of any indexes that may be available</Src>.
              </td>
              <td>
                <code>ST_Covers</code>, which tests that{' '}
                <Src href={GIS_COVERS}>no point of B lies outside (in the exterior of) A</Src> and{' '}
                <Src href={GIS_COVERS}>automatically includes a bounding box comparison that makes use of any spatial indexes</Src>.
              </td>
            </tr>
            <tr>
              <td><strong>Elasticsearch</strong></td>
              <td>
                A <code>geo_point</code> field for listings; <code>geo_shape</code> where{' '}
                <Src href={ES_GEO_SHAPE}>the data being indexed contains shapes other than just points</Src>.
              </td>
              <td>
                <code>geo_bounding_box</code>, which{' '}
                <Src href={ES_BBOX}>matches geo_point and geo_shape values that intersect a bounding box</Src>.
              </td>
              <td>
                The <code>geo_shape</code> query, which works on{' '}
                <Src href={ES_SHAPE_Q}>documents indexed using either the geo_shape or the geo_point type</Src>.
              </td>
            </tr>
            <tr>
              <td><strong>MongoDB</strong></td>
              <td>
                <code>2dsphere</code>, which <Src href={MDB_2DS}>supports geospatial queries on an earth-like sphere</Src>{' '}
                over GeoJSON objects or legacy coordinate pairs.
              </td>
              <td>
                <code>$geoWithin</code> with a GeoJSON rectangle. The <code>$box</code> shorthand is for legacy
                coordinates: it <Src href={MDB_BOX}>does not query for GeoJSON shapes</Src>.
              </td>
              <td>
                <code>$geoWithin</code>, which selects documents{' '}
                <Src href={MDB_WITHIN}>with geospatial data that exists entirely within a specified shape</Src>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Two notes from the documentation that affect design. MongoDB&apos;s <code>$geoWithin</code>{' '}
        <Src href={MDB_WITHIN}>does not require a geospatial index</Src>, so a missing index shows up as slowness,
        not as an error; and it <Src href={MDB_WITHIN}>does not return sorted results</Src>, so the list&apos;s
        sort is a separate step. In all three stores the spatial clause is one filter among several. Price,
        status and bedrooms narrow the same query, and which condition the planner uses first depends on how
        selective each is, so test with realistic filter combinations and not only with the map.
      </p>

      <h3>An illustrative PostGIS query</h3>
      <p>Illustrative: table, column names and values are examples.</p>
      <pre className="cp-code"><code>{`-- One-time: the spatial index
CREATE INDEX listing_search_geom_gix
  ON listing_search USING GIST (geom);

-- Listings in the viewport, optionally inside a drawn area
SELECT listing_key, list_price, bedrooms, geom
FROM   listing_search
WHERE  standard_status = 'Active'
  AND  list_price BETWEEN 400000 AND 650000
  AND  geom && ST_MakeEnvelope(-97.90, 30.18, -97.62, 30.42, 4326)
       -- xmin (west), ymin (south), xmax (east), ymax (north), SRID
  AND  ($1::geometry IS NULL OR ST_Covers($1::geometry, geom))
       -- $1: the drawn polygon in SRID 4326, or NULL when nothing is drawn
ORDER  BY listed_at DESC, listing_key
LIMIT  200;`}</code></pre>

      <h2>Polygon and drawn-area search</h2>
      <p>
        Letting a buyer draw a shape is popular because neighborhoods in people&apos;s heads do not match postal
        codes. The query is a point-in-polygon test, shown above for PostGIS and below for Elasticsearch. The
        engineering is mostly in treating the polygon as untrusted input.
      </p>
      <ul>
        <li>
          <strong>Reduce the vertices.</strong> A freehand stroke produces a point for every few pixels. Simplify
          it in the browser before sending, and cap the vertex count on the server. A polygon with thousands of
          vertices is slower to test and too long for a URL.
        </li>
        <li>
          <strong>Close and validate the ring.</strong> A stroke that crosses itself is not a valid polygon.
          PostGIS warns about <code>ST_Covers</code>:{' '}
          <Src href={GIS_COVERS}>do not use this function with invalid geometries. You will get unexpected results</Src>.{' '}
          <code>ST_IsValid</code> <Src href={GIS_ISVALID}>tests if a geometry is well-formed in 2D</Src>, and{' '}
          <code>ST_MakeValid</code>{' '}
          <Src href={GIS_MAKEVALID}>attempts to make an invalid geometry valid without losing vertices</Src>.
          Validate once, when the shape is submitted.
        </li>
        <li>
          <strong>Mind coordinate order.</strong> GeoJSON and these databases use longitude then latitude; many
          map libraries hand you latitude then longitude. MongoDB&apos;s documentation repeats the instruction{' '}
          <Src href={MDB_BOX}>specify longitude first</Src> for a reason. A swapped pair for a US location lands
          in Antarctica or fails validation; test for it.
        </li>
        <li>
          <strong>Keep the viewport filter too.</strong> A drawn area and the visible box are separate
          conditions. With both applied, panning away from the drawn area shows fewer results instead of loading
          markers the user cannot see.
        </li>
        <li>
          <strong>Store it as data.</strong> A drawn area that becomes a saved search should be stored as GeoJSON
          with the other criteria, not as a URL string.
        </li>
      </ul>
      <p>
        For named areas such as a school attendance zone, keep the boundary on the server and reference it by ID.
        Elasticsearch supports this directly: the <code>geo_shape</code> query can use{' '}
        <Src href={ES_SHAPE_Q}>a shape which has already been indexed in another index</Src>.
      </p>

      <h2>Clustering at low zoom</h2>
      <p>
        When the result is too large to draw as individual markers, group it. There are two places to do the
        grouping, and they suit different sizes of result.
      </p>
      <h3>On the server: grid aggregations</h3>
      <p>
        The server divides the map into cells and returns one count per cell. In Elasticsearch,{' '}
        <code>geotile_grid</code> <Src href={ES_GEOTILE}>groups geo_point and geo_shape values into buckets that represent a grid</Src>,
        where <Src href={ES_GEOTILE}>each cell corresponds to a map tile as used by many online map sites</Src> and
        the precision is a zoom level <Src href={ES_GEOTILE}>between 0 and 29, inclusive</Src>. The{' '}
        <code>geohash_grid</code> aggregation does the same with geohash cells at{' '}
        <Src href={ES_GEOHASH}>a choice of precision between 1 and 12</Src>. Because tile cells line up with the
        map&apos;s own zoom levels, the tile grid is the natural choice for a web map: ask for a precision a few
        levels above the current zoom and each map tile is divided into a fixed number of cells.
      </p>
      <p>Three details make it work well:</p>
      <ul>
        <li>
          <strong>Always bound it.</strong> Elastic&apos;s warning is specific: at high precision{' '}
          <Src href={ES_GEOTILE}>a filter like geo_bounding_box should be applied to narrow the subject area. Otherwise, potentially millions of buckets will be created and returned</Src>.
        </li>
        <li>
          <strong>Place the cluster where the listings are.</strong> A marker at the cell center can sit in a
          lake. Add a <code>geo_centroid</code> sub-aggregation, which{' '}
          <Src href={ES_CENTROID}>computes the weighted centroid from all coordinate values</Src>, and draw the
          cluster there.
        </li>
        <li>
          <strong>Enjoy the stability.</strong> Grid cells are fixed to the world, not to the viewport, so
          clusters do not reshuffle when the user pans. The price is that a tight group of homes on a cell
          boundary is split in two.
        </li>
      </ul>
      <p>
        In PostGIS, grouping by a snapped coordinate gives the same shape of answer: <code>ST_SnapToGrid</code>{' '}
        <Src href={GIS_SNAP}>snaps all points of the input geometry to a regular grid</Src>, and a{' '}
        <code>GROUP BY</code> on the snapped point with a count returns one row per cell.
      </p>

      <h3>In the browser: supercluster</h3>
      <p>
        The other approach sends the points to the browser and clusters them there. The supercluster library
        describes itself as <Src href={SUPERCLUSTER}>a very fast JavaScript library for geospatial point clustering for browsers and Node</Src>.
        You load GeoJSON points once, then call <code>getClusters(bbox, zoom)</code> on every map movement with no
        network request; <code>getClusterExpansionZoom</code> returns{' '}
        <Src href={SUPERCLUSTER}>the zoom on which the cluster expands into several children</Src>, which is the
        &quot;click a cluster to zoom in&quot; behavior. Its defaults are a{' '}
        <Src href={SUPERCLUSTER}>cluster radius of 40 pixels and a maximum cluster zoom of 16</Src>. One
        constraint drives the design: <Src href={SUPERCLUSTER}>once loaded, index is immutable</Src>, so a filter
        change means fetching the new point set and building a new index.
      </p>

      <h3>When each fits</h3>
      <div className="cp-table-wrap">
        <table>
          <thead>
            <tr><th></th><th>Server-side grid</th><th>Client-side clustering</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Result size</strong></td><td>Any; the response size depends on the number of cells, not listings</td><td>Bounded by what you are willing to download and hold in memory on a phone</td></tr>
            <tr><td><strong>Pan and zoom</strong></td><td>A request per movement (debounced, cacheable when bounds are snapped)</td><td>Instant after the first load</td></tr>
            <tr><td><strong>Filter change</strong></td><td>One aggregation request</td><td>Download the matching points again and rebuild the index</td></tr>
            <tr><td><strong>Cluster shape</strong></td><td>Grid cells; stable, sometimes splits a natural group</td><td>Radius-based; follows the data more closely</td></tr>
            <tr><td><strong>Data exposure</strong></td><td>Only counts leave the server at low zoom</td><td>Every matching coordinate is sent to the browser</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A sound default for an MLS-scale site is a hybrid: grid aggregations from the server while the result is
        large, and individual points (clustered in the browser if they overlap) once the filtered result in view
        is small. For a single brokerage&apos;s own listings, where the whole set is a few hundred points,
        client-side clustering alone is simpler and needs no search engine. The last row of the table matters
        more than it seems; it returns in the section on address display below.
      </p>

      <h3>An illustrative Elasticsearch request</h3>
      <p>
        Illustrative: the cluster request for a viewport with a drawn polygon. It asks for no hits, only cells
        with a count and a centroid. Values are examples.
      </p>
      <pre className="cp-code"><code>{`POST /listings/_search
{
  "size": 0,
  "query": {
    "bool": {
      "filter": [
        { "term":  { "standard_status": "Active" } },
        { "range": { "list_price": { "gte": 400000, "lte": 650000 } } },
        { "geo_bounding_box": {
            "location": {
              "top_left":     { "lat": 30.42, "lon": -97.90 },
              "bottom_right": { "lat": 30.18, "lon": -97.62 }
            }
        } },
        { "geo_shape": {
            "location": {
              "shape": {
                "type": "Polygon",
                "coordinates": [[
                  [-97.84, 30.38], [-97.70, 30.40], [-97.66, 30.30],
                  [-97.74, 30.22], [-97.86, 30.26], [-97.84, 30.38]
                ]]
              },
              "relation": "intersects"
            }
        } }
      ]
    }
  },
  "aggs": {
    "cells": {
      "geotile_grid": { "field": "location", "precision": 13 },
      "aggs": {
        "center": { "geo_centroid": { "field": "location" } }
      }
    }
  }
}`}</code></pre>

      <h2>Keeping the list and the map in sync</h2>
      <p>
        The list and the map are two views of one result set, and most visible bugs in map search are the two
        disagreeing: a count of 184 over a list that ends at 150, a marker with no row, a row whose marker is off
        screen. The rules we would hold to:
      </p>
      <ul>
        <li><strong>One criteria object.</strong> Filters, bounds, drawn area and sort live in one state object. Both the list request and the map request are built from it, by the same function, on the server.</li>
        <li><strong>One response, or one version.</strong> Either a single request returns hits, total and clusters together, or each response carries the criteria version it answers and the UI applies only matching pairs.</li>
        <li><strong>One total.</strong> The number above the list is the total of the query, and the cluster counts sum to it. Test that sum automatically.</li>
        <li><strong>The list is a page; the map is the whole set.</strong> The list shows the first page of the sort order. The map shows every match, as markers or clusters. Do not draw only the markers for the current list page unless the design says so explicitly.</li>
        <li><strong>Shared identity.</strong> Hovering a row highlights its marker and the reverse, keyed by listing ID. When the listing is inside a cluster, highlight the cluster.</li>
        <li><strong>A choice about movement.</strong> &quot;Search as I move the map&quot; on by default, with a visible way to turn it off and a &quot;search this area&quot; button when it is off. Selecting a list row should not move the map and trigger a new search that removes the row.</li>
      </ul>

      <h2>Debouncing and cancelling requests</h2>
      <p>
        During a drag the map fires movement events continuously. Sending a query for each wastes the server and,
        worse, produces responses that arrive out of order: the answer for where the map was two seconds ago can
        land after the answer for where it is now. Two mechanisms, used together, prevent that.
      </p>
      <p>
        <strong>Debounce:</strong> wait until movement has paused for a short interval before querying, or query
        on the map library&apos;s &quot;movement ended&quot; event. <strong>Cancel:</strong> abort the previous
        request when a new one starts. The browser&apos;s <code>AbortController</code>{' '}
        <Src href={MDN_ABORT}>represents a controller object that allows you to abort one or more Web requests as and when desired</Src>,
        and its <code>abort()</code> method is <Src href={MDN_ABORT}>able to abort fetch requests</Src>. Because a
        response may already be on its way when you cancel, keep a sequence number as well and ignore any response
        that is not the latest.
      </p>
      <p>Illustrative: helper names and the 250 ms interval are examples, not recommendations for every device.</p>
      <pre className="cp-code"><code>{`let controller = null;
let latest = 0;

const onMapSettled = debounce(async () => {
  if (controller) controller.abort();          // cancel the request in flight
  controller = new AbortController();
  const mine = ++latest;

  const state = readSearchState();             // bounds, zoom, filters, drawn area
  history.replaceState(null, '', toUrl(state));

  try {
    const res = await fetch('/api/search?' + toQuery(state), { signal: controller.signal });
    const data = await res.json();
    if (mine !== latest) return;               // a newer request has started; drop this one
    renderMap(data.clusters, data.markers);
    renderList(data.hits, data.total);
  } catch (err) {
    if (err.name !== 'AbortError') showSearchError(err);
  }
}, 250);`}</code></pre>
      <p>
        Cancelling in the browser does not by itself stop work on the server. If map queries are expensive, give
        them a server-side timeout too, so abandoned requests do not pile up behind a slow one.
      </p>

      <h2>URL state: shareable and crawlable are different goals</h2>
      <p>
        A buyer who sends a link expects the recipient to see the same map. That requires the bounds, zoom,
        filters and drawn area in the URL, updated as the map moves. For continuous movement use{' '}
        <code>history.replaceState</code>, which{' '}
        <Src href={MDN_REPLACE}>modifies the current history entry</Src> instead of adding one, so the back button
        leaves the search rather than replaying forty pans. Add a real history entry only for deliberate steps,
        such as choosing a city or applying a filter.
      </p>
      <p>
        Crawlable is a separate question, and the answer is mostly no. Every viewport is a distinct URL, and
        Google describes what that produces: parameter-based faceted navigation{' '}
        <Src href={G_FACETED}>can generate infinite URL spaces</Src>, with crawlers spending time on URLs that
        are of no use. Its guidance offers two directions. If the filtered URLs need not be indexed, prevent
        crawling of them, or keep the state in the fragment, since{' '}
        <Src href={G_FACETED}>Google Search generally doesn&apos;t support URL fragments in crawling and indexing</Src>.
        If some must be indexable, keep them orderly:{' '}
        <Src href={G_FACETED}>use the industry standard URL parameter separator</Src> and return a 404{' '}
        <Src href={G_FACETED}>when a filter combination doesn&apos;t return results</Src>.
      </p>
      <p>The structure we would recommend separates the two goals:</p>
      <ul>
        <li>
          <strong>Place in the path, crawlable.</strong> City, neighborhood and postal-code pages have stable
          paths, a server-rendered first page of listings, and links to listing detail pages. These are the pages
          that should rank. Google&apos;s URL guidance is to use the History API for content changed by JavaScript
          and <Src href={G_URL}>not to use fragments to change the content of a page</Src>, which applies to
          these.
        </li>
        <li>
          <strong>Viewport and drawn area as state, not crawled.</strong> Bounds, zoom and polygon are query
          parameters or a fragment on top of the place page, excluded from crawling and canonicalized to the place
          page. They exist for people sharing links.
        </li>
        <li>
          <strong>The server can render from the URL.</strong> When the state is in query parameters, the first
          response can already contain the matching list, so a shared link does not open on an empty map.
        </li>
      </ul>
      <p>
        Indexing, canonical tags and listing status codes are covered in{' '}
        <Link href="/blog/real-estate-website-seo-aeo-geo">SEO, AEO and GEO for real estate websites</Link>.
      </p>

      <h2>The mobile experience</h2>
      <p>On a phone the map and the list cannot sit side by side, and a finger does two jobs.</p>
      <ul>
        <li>
          <strong>Touch conflicts.</strong> A one-finger drag means &quot;scroll the page&quot; to the browser and
          &quot;pan the map&quot; to the map. The CSS <code>touch-action</code> property{' '}
          <Src href={MDN_TOUCH}>sets how an element&apos;s region can be manipulated by a touchscreen user</Src>;
          a full-screen map takes all gestures, while a map embedded in a scrolling page should not trap the
          scroll. Decide which you have and test both directions.
        </li>
        <li>
          <strong>Bottom sheet.</strong> The common pattern is a full-screen map with the list in a sheet that
          rests at a peek height, expands to half and to full. Tapping a marker should show that listing&apos;s
          card without covering the marker. When the sheet covers part of the map, the searched bounds should be
          the visible part, or results will hide under the sheet.
        </li>
        <li>
          <strong>Drawing.</strong> Freehand drawing conflicts with panning, so drawing needs an explicit mode with
          a clear way out.
        </li>
        <li>
          <strong>Targets.</strong> Markers a few pixels wide are hard to tap. Cluster more aggressively on small
          screens and make single markers large enough to hit.
        </li>
        <li>
          <strong>Low-end devices.</strong> The costs are the map library itself, the number of marker elements
          and the size of each response. Load the map code only when the map is shown, render markers on the
          map&apos;s canvas layer instead of as hundreds of HTML elements, prefer server-side clusters so the
          phone never holds the full point set, and return only the fields a marker needs. Measure on a real
          mid-range phone, not on a laptop with the window narrowed; the loading side of this is covered in{' '}
          <Link href="/blog/listing-page-core-web-vitals">optimizing listing pages for Core Web Vitals</Link>.
        </li>
      </ul>

      <h2>Address display restrictions and marker precision</h2>
      <p>
        A map pin is an address. The RESO Data Dictionary defines a field for the seller&apos;s choice:{' '}
        <code>InternetAddressDisplayYN</code>{' '}
        <Src href={DD_ADDRESS}>indicates whether or not the seller has allowed the listing address to be displayed on Internet sites</Src>.
        The dictionary page shows it in wide use, with{' '}
        <Src href={DD_ADDRESS}>usage adoption of 98%, 410 of 420 organizations</Src>, as generated on October 12,
        2026. Coordinates come from the same record:{' '}
        <Src href={DD_LATITUDE}>the geographic latitude of some reference point on the property</Src>.
      </p>
      <p>
        The field tells you the seller&apos;s instruction. What your site must do about the map when it is false
        is set by your MLS&apos;s rules and your license, which you should read; we do not state a universal rule
        here. As an engineering matter, plan for three consequences:
      </p>
      <ul>
        <li>
          <strong>An exact pin discloses the address.</strong> Hiding the street line in the card while plotting
          the precise coordinates does not hide anything. Treat the flag as an input to the map layer, not only to
          the text template.
        </li>
        <li>
          <strong>Coordinates in a response are public.</strong> Whatever the browser receives, a visitor can
          read. If a listing&apos;s location must not be shown, do not send its coordinates, including inside the
          point set for client-side clustering. This is where server-side clusters help: at low zoom only counts
          leave the server.
        </li>
        <li>
          <strong>The filter itself can leak.</strong> If a withheld listing still matches by its true position,
          a visitor can shrink the viewport or a drawn polygon around it until the area is one lot. For such
          listings we would match on a coarser location, such as the postal code or a snapped grid cell, and show
          them in the list without a marker, or with an area-level marker if your MLS permits it.
        </li>
      </ul>
      <p>
        Implement this once, in the display-policy stage described in the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline architecture guide</Link>: the
        indexer writes a display-safe location and a flag, and nothing downstream sees the exact point.
      </p>

      <h2>Map provider terms: check, do not assume</h2>
      <p>
        The map itself comes from a provider, under terms that differ by provider and by plan and that change. We
        do not summarize any provider&apos;s terms here. Before committing to one, read its current terms and
        pricing pages for the answers to these questions:
      </p>
      <ul className="cp-checklist">
        <li>What is billed: map loads, tile requests, sessions, monthly users, geocoding calls? Which of those does a pan or zoom generate?</li>
        <li>May geocoding results be stored, for how long, and may they be shown on a different provider&apos;s map?</li>
        <li>Is the map allowed behind a login, in a native app, or on white-label sites for many client domains?</li>
        <li>What attribution must be displayed, and may the logo be restyled or moved?</li>
        <li>May you overlay third-party data such as MLS listings, and are there restrictions on real estate use?</li>
        <li>Are static map images, printing or use in emails covered?</li>
        <li>What happens at the quota: throttling, an error, or an automatic charge?</li>
      </ul>
      <p>
        Keep the provider behind a thin interface in your own code (bounds in, markers out), so that a change of
        terms is a contained piece of work.
      </p>

      <h2>A test checklist before launch</h2>
      <ul className="cp-checklist">
        <li>Cluster counts plus single markers equal the list total, for several zooms and filter sets.</li>
        <li>A fast drag across the map ends with results for the final position, never an earlier one.</li>
        <li>Reloading the URL reproduces the same bounds, zoom, filters, drawn area and results.</li>
        <li>The back button leaves the search page in one step after many pans.</li>
        <li>A self-crossing drawn shape, a two-point shape and a swapped latitude and longitude are handled.</li>
        <li>A viewport crossing the 180th meridian returns sensible results or is prevented.</li>
        <li>A listing with address display off sends no exact coordinates to the browser at any zoom.</li>
        <li>The spatial query uses the index with realistic filters (check the query plan or profile).</li>
        <li>On a mid-range phone: the page scrolls past an embedded map, markers are tappable, and the sheet does not hide results.</li>
        <li>Viewport URLs are excluded from crawling or canonicalized; place pages are server-rendered.</li>
      </ul>
      <p>
        Peregrine&apos;s{' '}
        <Link href="/case-studies/scaling-real-estate-saas-platform">real estate SaaS case study</Link> describes a
        platform where Elasticsearch handles property search, filters and geo-queries, with a search indexing
        pipeline and geo-based filtering built as part of the work.
      </p>

      <GuideFaq slug={SLUG} items={[
        { question: 'Should map clustering happen on the server or in the browser?', answer: ['It depends on how many listings match. Server-side grid aggregations return one count per cell whatever the result size; Elasticsearch’s geotile grid ', ['groups geo_point and geo_shape values into buckets that represent a grid', ES_GEOTILE], '. Client-side clustering with a library such as supercluster is instant on pan and zoom but needs every matching point in the browser, and ', ['once loaded, index is immutable', SUPERCLUSTER], '. Many sites use the grid at low zoom and points at high zoom.'] },
        { question: 'Do I need Elasticsearch for map search, or is PostGIS enough?', answer: ['PostGIS is enough for viewport and polygon queries: it ', ['uses an R-Tree index implemented on top of GiST to index spatial data', GIS_INDEX], ', and a grouped query on snapped coordinates can produce cluster counts. A search engine becomes worthwhile when the same search also needs autocomplete, facet counts and text relevance at volume.'] },
        { question: 'How do I stop the map from sending a query on every pixel of a drag?', answer: ['Debounce the movement, query when it settles, and cancel the request in flight. AbortController ', ['allows you to abort one or more Web requests as and when desired', MDN_ABORT], '. Also ignore any response that is not the most recent, because a cancelled request may already have been answered.'] },
        { question: 'Should map search URLs be indexed by Google?', answer: ['Usually not. Viewport and filter URLs are a form of faceted navigation, which ', ['can generate infinite URL spaces', G_FACETED], '. Keep city and neighborhood pages crawlable and server-rendered, and treat bounds, zoom and drawn areas as shareable state that is excluded from crawling or canonicalized to the place page.'] },
        { question: 'Can we show a pin for a listing whose address is withheld?', answer: ['Check your MLS rules. The RESO field InternetAddressDisplayYN ', ['indicates whether or not the seller has allowed the listing address to be displayed on Internet sites', DD_ADDRESS], ', and an exact pin discloses the address as surely as the text does. Plan for a display-safe location and never send exact coordinates for such a listing to the browser.'] },
      ]} />

      <p className="cp-note">
        Database, search engine, browser and Google documentation was read on October 12, 2026, as was the RESO
        Data Dictionary page and the supercluster README. Queries and code are illustrative and are not drop-in
        implementations. Address display rules are set by each MLS and license; map provider terms are set by
        each provider. Read the current versions of both.
      </p>
      <p>
        Building or fixing map search on MLS data? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
