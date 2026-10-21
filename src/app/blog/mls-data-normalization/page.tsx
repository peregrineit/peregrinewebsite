import Link from 'next/link';
import GuideLayout, { GuideFaq, Src, guideMetadata } from '../../components/GuideLayout';
import NormalizationDiagram from '../../components/diagrams/NormalizationDiagram';

const SLUG = 'mls-data-normalization';
export const metadata = guideMetadata(SLUG);

// Sources fetched and checked 2026-10-13 (Data Dictionary pages carry "Generated October 12, 2026"); the text
// relied on for each link is logged in docs/content/sources/mls-data-normalization.md. The mapping table,
// the board names and the schema are illustrative.
const DD = 'https://dd.reso.org/';
const DD_P = 'https://dd.reso.org/DD2.0/Property';
const DD_LISTING_KEY = `${DD_P}/ListingKey/`;
const DD_LISTING_ID = `${DD_P}/ListingId/`;
const DD_ORIG_NAME = `${DD_P}/OriginatingSystemName/`;
const DD_ORIG_KEY = `${DD_P}/OriginatingSystemKey/`;
const DD_SOURCE_NAME = `${DD_P}/SourceSystemName/`;
const DD_UPI = `${DD_P}/UniversalPropertyId/`;
const DD_PARCEL = `${DD_P}/ParcelNumber/`;
const DD_PTYPE = `${DD_P}/PropertyType/`;
const DD_PSUB = `${DD_P}/PropertySubType/`;
const DD_LIVING = `${DD_P}/LivingArea/`;
const DD_LIVING_UNITS = `${DD_P}/LivingAreaUnits/`;
const DD_LOT_SF = `${DD_P}/LotSizeSquareFeet/`;
const DD_LOT_UNITS = `${DD_P}/LotSizeUnits/`;
const DD_PRICE = `${DD_P}/ListPrice/`;
const DD_BATHS = `${DD_P}/BathroomsTotalInteger/`;
const DD_NET_ADDRESS = `${DD_P}/InternetAddressDisplayYN/`;
const DD_NET_LISTING = `${DD_P}/InternetEntireListingDisplayYN/`;
const DD_NET_AVM = `${DD_P}/InternetAutomatedValuationDisplayYN/`;
const DD_NET_COMMENT = `${DD_P}/InternetConsumerCommentYN/`;
const DD_MEDIA_KEY = 'https://dd.reso.org/DD2.0/Media/MediaKey/';
const DD_MEDIA_ORDER = 'https://dd.reso.org/DD2.0/Media/Order/';
const DD_MEDIA_CAT = 'https://dd.reso.org/DD2.0/Media/MediaCategory/';
const RESO_UPI = 'https://www.reso.org/universal-parcel-identifier/';
const RESO_CORE = 'https://transport.reso.org/proposals/web-api-core/';
const RESO_SHOWCASE = 'https://www.reso.org/moving-replication-reso-web-api/';
const GRID = 'https://docs.mlsgrid.com/';
const GRID_V2 = 'https://docs.mlsgrid.com/api-documentation/api-version-2.0';
const GRID_IDX = 'https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf';
const TRESTLE_FAQ = 'https://trestle-documentation.corelogic.com/support/faq/';
const TRESTLE_REF = 'https://trestle-documentation.corelogic.com/web-api/reference/';
const TRESTLE_SCALE = 'https://trestle-documentation.corelogic.com/web-api/at-scale/';
const TRESTLE_MEDIA = 'https://trestle-documentation.corelogic.com/metadata/resources/Media/';

export default function Guide() {
  return (
    <GuideLayout slug={SLUG}>
      <h2>The problem starts with the second board</h2>
      <p>
        With one MLS, the feed&apos;s field names become your schema by default and nothing looks wrong. The
        trouble arrives with the second board: a search for homes over 2,000 square feet returns nothing from one
        market because its area is in a differently named field, a status filter drops half the inventory, and
        the same house appears twice. The usual first fix is an <code>if board == ...</code> in the search code.
        By the fourth board there are dozens, and nobody can say where a given value on a listing page came from.
      </p>
      <p>
        One of our published projects had this shape. The{' '}
        <Link href="/case-studies/w3re-ai-real-estate-platform">W3|re case study</Link> describes a brokerage
        across four MLS regions where each MLS used different RETS and Web API standards and schemas, and a
        pipeline that ingests from four MLS systems, normalizes schemas and deduplicates cross-listed properties.
      </p>
      <p>
        Normalization is one stage of the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">MLS data pipeline reference architecture</Link>. Here
        it is taken apart: what the standard settles and what it leaves open, what the platforms convert for you,
        how to design the mapping layer and the canonical schema, and how to keep the source of every value.
      </p>

      <h2>A shared dictionary is not a shared dataset</h2>
      <p>
        The target is the RESO Data Dictionary.{' '}
        <Src href={DD}>DD 2.0 is the current version for RESO certification</Src>, with{' '}
        <Src href={DD}>41 resources, 1,745 fields and 3,683 lookups</Src>; a{' '}
        <Src href={DD}>2.1 draft lists 43 resources, 2,139 fields and 4,129 lookups</Src>. Pin your canonical
        schema to a named version, because the next one adds fields.
      </p>
      <p>
        The dictionary standardizes names, types and lookup values. It does not make every MLS populate every
        field. Its own pages publish an adoption figure for each one, as a share of 420 organizations, and the
        figures make the point:
      </p>
      <div className="cp-table-wrap">
        <table>
          <thead><tr><th>Field</th><th>Organizations using it (of 420)</th><th>What that means for a consumer</th></tr></thead>
          <tbody>
            <tr><td><Src href={DD_PRICE}>ListPrice</Src></td><td>100%</td><td>Safe to require</td></tr>
            <tr><td><Src href={DD_LIVING}>LivingArea</Src></td><td>79%</td><td>About one organization in five does not send it</td></tr>
            <tr><td><Src href={DD_LIVING_UNITS}>LivingAreaUnits</Src></td><td>39%</td><td>The unit is often implied, not stated</td></tr>
            <tr><td><Src href={DD_SOURCE_NAME}>SourceSystemName</Src></td><td>40%</td><td>You often have to record the immediate source yourself</td></tr>
            <tr><td><Src href={DD_MEDIA_KEY}>MediaKey</Src></td><td>61%</td><td>Photo identity is not guaranteed</td></tr>
            <tr><td><Src href={DD_UPI}>UniversalPropertyId</Src></td><td>21%</td><td>Cannot be the only basis for matching properties</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Those percentages are from Data Dictionary pages generated October 12, 2026. Consumers have said the same
        from experience. In a RESO article on moving to the Web API, the chief executive of an IDX vendor says
        that although{' '}
        <Src href={RESO_SHOWCASE}>field names were mostly consistent, the implementation of the data in those fields was not</Src>,
        and gives a listing&apos;s created date as an example: a plain date from one MLS, a timestamp in local
        server time from another, missing from a third.
      </p>

      <h2>What the platforms convert, and what they leave to you</h2>
      <p>
        Aggregation platforms do part of the work. How much is documented, and it is less than
        &ldquo;normalized&rdquo; suggests.
      </p>
      <ul>
        <li>
          <strong>MLS Grid converts names and lookups, not values.</strong> Its conversion rules{' '}
          <Src href={GRID}>only concern themselves with field names and, when applicable, Data Dictionary lookups</Src>.
          It keeps non-conforming fields, and{' '}
          <Src href={GRID_V2}>local fields are prefixed to identify which MLS they originate from</Src> (the ACTRIS
          prefix is <code>ACT_</code>, for example). Records are sparse:{' '}
          <Src href={GRID}>each contains only the fields converted from its originating MLS</Src>.
        </li>
        <li>
          <strong>Trestle transforms to one structure and keeps the remainder separately.</strong> Its FAQ says it{' '}
          <Src href={TRESTLE_FAQ}>transforms data from each MLO into a consistent data structure</Src> and is
          certified for Data Dictionary 2.0. Data outside the standard is available by expanding other
          resources: its scaling guide shows{' '}
          <Src href={TRESTLE_SCALE}>expanding CustomProperty alongside Rooms, Units, OpenHouse and Media to get the custom data</Src>.
        </li>
        <li>
          <strong>Lookup values have two legal encodings.</strong> RESO allows a single-valued lookup to be{' '}
          <Src href={RESO_CORE}>either an OData enumeration or a string backed by the Lookup resource</Src>. In
          practice one feed sends <code>ActiveUnderContract</code> and another sends{' '}
          <code>Active Under Contract</code>. Trestle documents both forms and a{' '}
          <Src href={TRESTLE_REF}>PrettyEnums option that returns the human-friendly value</Src>.
        </li>
        <li>
          <strong>Time zones are mixed inside one feed.</strong> On MLS Grid, date fields converted to a
          dictionary field <Src href={GRID}>are in UTC, while dates passed through as local fields keep their original representation</Src>.
          On Trestle, dates and timestamps <Src href={TRESTLE_REF}>are exposed in UTC</Src>, except that{' '}
          <Src href={TRESTLE_REF}>OpenHouse dates and times are in the time zone of the MLS</Src>.
        </li>
      </ul>
      <p>
        So even through a platform, the consumer still owns value semantics, units, local fields, missing data
        and time zones. A direct feed from an MLS vendor may leave more.
      </p>

      <h2>The shape of the solution</h2>
      <figure className="cp-diagram">
        <div className="cp-diagram-scroll"><NormalizationDiagram /></div>
        <figcaption>
          Three source schemas, one canonical schema. Board names, field names and values are illustrative.
        </figcaption>
      </figure>
      <p>The diagram as a list:</p>
      <ol>
        <li><strong>Source schemas.</strong> Each board&apos;s feed arrives with its own field names, lookup values and units. In the illustration, Board A sends standard names, Board B sends a local status and a metric area, and Board C sends prefixed local fields with a number formatted as text.</li>
        <li><strong>Raw store.</strong> Every payload is saved exactly as received, one row per source record, and never edited.</li>
        <li><strong>Mapping layer.</strong> Versioned rules per source rename fields, map lookup values, convert units, cast types, keep local fields under a namespace and flag anything unmapped.</li>
        <li><strong>Canonical schema.</strong> One listing shape that search, pages and APIs read, including the display flags that travel with the record.</li>
        <li><strong>Provenance.</strong> Every canonical value records its source system and field, the raw record, the rule version and the transform. Because the raw record is kept, the rules can be re-run when they change.</li>
      </ol>
      <p>
        Data flows one way, from raw to canonical, through rules that are configuration. Nothing downstream of
        the mapping layer should know which board a record came from, except to show attribution and apply that
        board&apos;s display rules.
      </p>

      <h2>An illustrative mapping</h2>
      <p>
        The table below is illustrative. The three boards are invented to show the kinds of difference a mapping
        layer has to absorb; none of the cells describes a real MLS.
      </p>
      <div className="cp-table-wrap cp-table-wide">
        <table>
          <thead><tr><th>Canonical field</th><th>Board A (illustrative)</th><th>Board B (illustrative)</th><th>Board C (illustrative)</th><th>Rule</th></tr></thead>
          <tbody>
            <tr><td><code>standard_status</code></td><td>StandardStatus: <code>Active</code></td><td>StandardStatus: <code>ActiveUnderContract</code></td><td>XYZ_Status: <code>A</code></td><td>Lookup map per source; unknown value is flagged, not guessed</td></tr>
            <tr><td><code>living_area_sqft</code></td><td>LivingArea: <code>1850</code>, no units field</td><td>LivingArea: <code>172</code>, LivingAreaUnits: <code>Square Meters</code></td><td>XYZ_SqFtTotal: <code>&quot;1,850&quot;</code></td><td>Unit from the field, else the source&apos;s declared default; convert; parse text</td></tr>
            <tr><td><code>lot_size_sqft</code></td><td>LotSizeSquareFeet: <code>8712</code></td><td>LotSizeArea: <code>0.2</code>, LotSizeUnits: <code>Acres</code></td><td>LotSizeAcres: <code>0.2</code></td><td>Prefer the explicit field; convert; keep the original pair</td></tr>
            <tr><td><code>property_sub_type</code></td><td>PropertySubType: <code>Condominium</code></td><td>PropertySubType: <code>Apartment</code></td><td>XYZ_Style: <code>Condo/Co-op</code></td><td>Lookup map; one-to-many cases go to review</td></tr>
            <tr><td><code>bathrooms_total</code></td><td>BathroomsTotalInteger: <code>3</code></td><td>BathroomsFull: <code>2</code>, BathroomsHalf: <code>1</code></td><td>XYZ_Baths: <code>2.5</code></td><td>Keep full and half counts where known; never derive a count from a decimal silently</td></tr>
            <tr><td><code>photos[].position</code></td><td>Order starts at <code>0</code></td><td>Order starts at <code>1</code></td><td>No order; array position</td><td>Re-number from 1 per listing; keep the source order value</td></tr>
            <tr><td><code>show_address</code></td><td>InternetAddressDisplayYN: <code>false</code></td><td>Field absent</td><td>XYZ_AddrDisp: <code>N</code></td><td>Absent is not true; apply the source&apos;s documented default</td></tr>
            <tr><td><code>record_key</code></td><td>ListingKey</td><td>ListingKey with a platform prefix</td><td>ListingKey</td><td>Store as received; composite key with the originating system</td></tr>
          </tbody>
        </table>
      </div>
      <p>The sections below take the hard rows in turn, with what the standard actually says.</p>

      <h2>Identifiers</h2>
      <p>
        A listing arrives with several identifiers that are easy to confuse. The dictionary defines each one:
      </p>
      <ul>
        <li><Src href={DD_LISTING_KEY}>ListingKey</Src>: a unique identifier for the record <Src href={DD_LISTING_KEY}>from the immediate source; the local key of the system</Src>.</li>
        <li><Src href={DD_LISTING_ID}>ListingId</Src>: the identifier a person uses. RESO warns that <Src href={DD_LISTING_ID}>in a multiple originating system or a merged system, this value may not be unique</Src>.</li>
        <li><Src href={DD_ORIG_NAME}>OriginatingSystemName</Src>: <Src href={DD_ORIG_NAME}>the name of the originating record provider, most commonly the name of the MLS</Src>.</li>
        <li><Src href={DD_ORIG_KEY}>OriginatingSystemKey</Src>: the key from <Src href={DD_ORIG_KEY}>the system with authoritative control over the record</Src>, which may not be the system you received it from.</li>
        <li><Src href={DD_SOURCE_NAME}>SourceSystemName</Src>: <Src href={DD_SOURCE_NAME}>the immediate record provider, the system from which the record was directly received</Src>.</li>
      </ul>
      <p>
        The distinction between originating and source matters as soon as a platform sits between you and the
        MLS, or one MLS shares data with another. Our recommendation for the canonical key is the triple of feed
        (the connection you pulled from), originating system and record key. The feed is part of the key because
        the same listing can reach you through two licensed connections with different permitted uses, and those
        are different records for compliance purposes. ListingId is a display and lookup field, never a key.
      </p>
      <p>
        Platforms also decorate keys: MLS Grid prefixes key fields, and the prefix{' '}
        <Src href={GRID_V2}>should be removed before displaying externally but must be added back when requesting records</Src>.
        Store both forms.
      </p>
      <h3>Linking the same property across boards</h3>
      <p>
        One property listed in two MLSs is two legitimate records; the{' '}
        <Link href="/blog/mls-data-pipeline-architecture">pipeline guide</Link> sets out why they are linked, never
        merged. The normalization layer&apos;s job is to produce the comparable values that matching needs:
      </p>
      <ul>
        <li>
          <strong>The universal identifier, where present.</strong> RESO created the Universal Parcel Identifier
          because property data is inconsistent when it{' '}
          <Src href={RESO_UPI}>relies upon addresses and standalone parcel numbers for identification</Src>. It
          is <Src href={RESO_UPI}>in version 2.0, with a URN-based model</Src> built from{' '}
          <Src href={RESO_UPI}>codes for the country and region assigning parcel numbers, the parcel numbers themselves, and subcomponents of the property</Src>.
          The dictionary field that carries it, UniversalPropertyId, shows{' '}
          <Src href={DD_UPI}>usage by 21% of organizations</Src>, so treat it as strong evidence when both
          records have it and plan for its absence.
        </li>
        <li>
          <strong>A normalized parcel number.</strong> The dictionary notes that the assessor&apos;s parcel number{' '}
          <Src href={DD_PARCEL}>format varies from county to county</Src> and recommends that parcel numbers be{' '}
          <Src href={DD_PARCEL}>transmitted without dashes or hyphens</Src>. Not every source follows the
          recommendation, so strip punctuation into a comparison column and keep the original for display.
        </li>
        <li><strong>A normalized address.</strong> Parsed components (number, direction, name, suffix, unit), a standard casing and a unit that is never dropped.</li>
        <li><strong>Coordinates</strong> in one datum and one numeric type.</li>
      </ul>

      <h2>Property types and subtypes</h2>
      <p>
        Type is where a lookup map earns its keep. PropertyType is{' '}
        <Src href={DD_PTYPE}>open with enumerations, with 9 standard values</Src>: sources may add their own.
        Usage of the standard values is uneven. The dictionary reports{' '}
        <Src href={DD_PTYPE}>Residential at 98% of organizations and Land at 96%, but Residential Lease at 49%, Farm at 31% and Manufactured In Park at 6%</Src>.
        A board that does not use Residential Lease may still carry rentals, classified another way.
      </p>
      <p>
        PropertySubType has <Src href={DD_PSUB}>31 standard values</Src> with precise definitions that boards do
        not always share. The dictionary defines Apartment as{' '}
        <Src href={DD_PSUB}>a unit within a wholly owned structure of five or more units</Src> and Condominium as{' '}
        <Src href={DD_PSUB}>a unit within a structure where ownership is on a unit-by-unit basis</Src>, and notes
        that Apartment may not be used for Residential or Residential Income listings. A local value such as &ldquo;Condo/Co-op&rdquo;
        spans more than one standard value. Three rules for the map:
      </p>
      <ul>
        <li>Map local values to standard values per source, in data. Keep the local value beside the standard one.</li>
        <li>When one local value could be two standard values, do not pick. Send it to a review queue or map it to a deliberately broad canonical value.</li>
        <li>Search facets read the standard value; the listing page may show the board&apos;s own wording.</li>
      </ul>

      <h2>Units: area, lot size and currency</h2>
      <p>
        <strong>Living area.</strong> The dictionary pairs LivingArea,{' '}
        <Src href={DD_LIVING}>the total livable area within the structure</Src>, with LivingAreaUnits, whose
        standard values are <Src href={DD_LIVING_UNITS}>Square Feet and Square Meters</Src>. Since far fewer
        organizations send the units field than the area field, the unit must often come from a declared
        per-source default. Record that the unit was assumed, and from which rule.
      </p>
      <p>
        <strong>Lot size.</strong> The dictionary offers three representations: LotSizeArea with LotSizeUnits,
        whose standard values are <Src href={DD_LOT_UNITS}>Acres, Square Feet and Square Meters</Src>, plus the
        explicit LotSizeSquareFeet and LotSizeAcres. It says the explicit fields{' '}
        <Src href={DD_LOT_SF}>must be in sync with the values represented in Lot Size Area and Lot Size Units</Src>.
        A consumer should not assume they are. Choose a precedence, compute one canonical value, and flag records
        where the representations disagree beyond rounding. A flag of that kind is how you would catch, for
        example, a lot entered in acres in a square-foot field.
      </p>
      <p>
        <strong>Currency.</strong> ListPrice is defined as{' '}
        <Src href={DD_PRICE}>the current price of the property as determined by the seller and the seller&apos;s broker</Src>:
        a number, with no currency in the definition. A platform serving both US and Canadian boards has to
        attach the currency from the originating system and store it on the record. Do not convert prices at
        ingestion; store the original amount and currency, and convert for display or comparison with a dated
        rate if the product needs it.
      </p>
      <p>
        <strong>Counts that look like measures.</strong> BathroomsTotalInteger is{' '}
        <Src href={DD_BATHS}>the simple sum of the number of bathrooms: two full and one half is 3</Src>, and the
        dictionary says <Src href={DD_BATHS}>decimal-based bathrooms are not recommended</Src>, while allowing
        them in a non-standard field. A feed may therefore still send 2.5. The two numbers answer different questions, and a &ldquo;3+ baths&rdquo; filter gives different
        results depending on which was stored. Keep full and half counts as the canonical facts and derive any
        total from them.
      </p>

      <h2>Photos and media</h2>
      <p>
        Media rules (who may host photos, how URLs expire) are platform matters covered in the pipeline guide.
        Normalization has three smaller jobs:
      </p>
      <ul>
        <li>
          <strong>Order.</strong> The Data Dictionary says of Order that{' '}
          <Src href={DD_MEDIA_ORDER}>element zero is the primary photo per RESO convention</Src>. Trestle&apos;s
          metadata for the same field says{' '}
          <Src href={TRESTLE_MEDIA}>element one is the primary photo, and element zero is an alias for element one</Src>.
          Both are documented; a consumer of several feeds must re-number positions itself and pick the primary
          photo by rule.
        </li>
        <li>
          <strong>Category.</strong> MediaCategory distinguishes photos from{' '}
          <Src href={DD_MEDIA_CAT}>floor plans, documents, videos and virtual tours</Src>, but it is used by{' '}
          <Src href={DD_MEDIA_CAT}>45% of organizations</Src>. Where it is absent, classify by media type and
          keep the classification marked as inferred.
        </li>
        <li>
          <strong>Identity.</strong> Use the source&apos;s MediaKey where it exists. Where it does not, derive a
          stable identity from the listing key and the source URL or a content hash, so a re-sync does not
          download and store the same photo twice.
        </li>
      </ul>

      <h2>Missing and differently populated fields</h2>
      <p>
        Sparse records are normal, so the canonical schema has to distinguish three things that a nullable column
        merges: the source does not have this field, the source has it and sent no value, and the source sent a
        value we could not interpret. They lead to different behavior. A missing year built should exclude a
        listing from a &ldquo;built after 2010&rdquo; filter without implying it is old; an uninterpretable one
        should raise a mapping alert.
      </p>
      <ul>
        <li>Never write a default into a factual field. Zero bedrooms and unknown bedrooms are different listings.</li>
        <li>Keep a per-source field inventory: which canonical fields this source can populate at all. Search can then tell a user that a filter does not apply in a market, instead of silently returning nothing.</li>
        <li>Track fill rate per source and field over time. A drop in one field on one source is the earliest sign of a mapping or feed change.</li>
      </ul>
      <p>
        Local fields deserve the opposite of neglect. Keep every one under a namespace for its source; promote a
        local field to the canonical schema only when a product feature needs it and at least a second source can
        supply the same fact.
      </p>

      <h2>Rules that travel with the data</h2>
      <p>
        Some fields are not facts about the property. They are instructions about display, and they must survive
        normalization with their meaning intact. The dictionary defines four seller-level flags:
      </p>
      <ul>
        <li><Src href={DD_NET_LISTING}>InternetEntireListingDisplayYN</Src>: whether the seller has allowed the listing to be displayed on Internet sites.</li>
        <li><Src href={DD_NET_ADDRESS}>InternetAddressDisplayYN</Src>: whether the seller has allowed the listing address to be displayed.</li>
        <li><Src href={DD_NET_AVM}>InternetAutomatedValuationDisplayYN</Src>: whether the listing may be displayed with an automated valuation.</li>
        <li><Src href={DD_NET_COMMENT}>InternetConsumerCommentYN</Src>: whether a comment or blog system may be attached to the listing.</li>
      </ul>
      <p>
        Each has a matching rule in an MLS&apos;s display policy. In MLS Grid&apos;s IDX rules, for example,
        listings and addresses may be displayed{' '}
        <Src href={GRID_IDX}>except where a seller has directed that the listing or its address be withheld from public display</Src>,
        and a site that shows comments or an automated value estimate next to a listing{' '}
        <Src href={GRID_IDX}>must disable either feature for that listing at the seller&apos;s request</Src>.
        Platforms add their own: MLS Grid&apos;s MlgCanUse field{' '}
        <Src href={GRID_V2}>indicates which use cases a record qualifies for</Src>.
      </p>
      <p>Three recommendations for handling them:</p>
      <ul>
        <li><strong>Do not map a missing flag to true.</strong> Decide the default per source from that MLS&apos;s documentation, and until it is decided, use the most restrictive reading.</li>
        <li><strong>Enforce them in one filter before the index,</strong> not in page templates. An address that is in the search index can leak through autocomplete, a map pin or an API response even if the page hides it.</li>
        <li><strong>Apply them to derived data.</strong> A hidden address also means <Link href="/blog/map-based-property-search">no street-level map pin</Link> and no address in the page URL, title or structured data.</li>
      </ul>
      <p>
        Status is the other field that carries rules; see{' '}
        <Link href="/blog/listing-lifecycle-sold-expired-deleted">handling deleted, expired and sold listings</Link>.
      </p>

      <h2>An illustrative canonical record with provenance</h2>
      <p>
        The example below is illustrative: the names, values and rule identifiers are invented.
      </p>
      <pre className="cp-code"><code>{`// Illustrative canonical listing (one per feed + originating system + record key).
{
  "feed_id": "feed-b",
  "originating_system": "board-b",
  "record_key": "B-20481",
  "listing_id": "20481",
  "standard_status": "ActiveUnderContract",
  "mls_status": "ACT-UC",
  "property_type": "Residential",
  "property_sub_type": "Condominium",
  "list_price": { "amount": 425000, "currency": "USD" },
  "living_area_sqft": 1851,
  "lot_size_sqft": 8712,
  "bathrooms_full": 2,
  "bathrooms_half": 1,
  "display": { "listing": true, "address": false, "avm": true, "comments": true },
  "local": { "board-b": { "ZoningOverlay": "R-2A" } },

  "raw_ref": { "raw_id": "raw_9f31c2", "received_at": "2026-10-12T14:03:22Z", "payload_hash": "sha256:5d1e..." },
  "mapping_version": "board-b@2026-10-01.3",
  "provenance": {
    "living_area_sqft":  { "from": "LivingArea", "raw": 172, "unit": "Square Meters", "transform": "sqm_to_sqft" },
    "lot_size_sqft":     { "from": "LotSizeArea", "raw": 0.2, "unit": "Acres", "transform": "acres_to_sqft" },
    "property_sub_type": { "from": "PropertySubType", "raw": "Condo", "transform": "lookup:board-b/subtype" },
    "display.address":   { "from": "InternetAddressDisplayYN", "raw": false, "transform": "identity" },
    "list_price.currency": { "from": null, "transform": "source_default", "assumed": true }
  },
  "quality": { "unmapped_fields": [], "unmapped_values": [], "conflicts": [] }
}`}</code></pre>
      <p>Why each part is there:</p>
      <ul>
        <li><strong>The raw reference</strong> answers &ldquo;what did the MLS actually send?&rdquo; without a new download. The <Link href="/blog/mls-sync-engine">sync engine article</Link> covers how the raw store is written.</li>
        <li><strong>The mapping version</strong> says which rules produced this record, so after a rule change you can find and re-process exactly the records made under the old one.</li>
        <li><strong>Field-level provenance</strong> is kept for every field that was converted, mapped or assumed; identity copies can be implied by the mapping version to save space.</li>
        <li><strong>The assumed marker</strong> separates what the source said from what you inferred. When an agent disputes a figure, that is the first thing support needs to know.</li>
        <li><strong>The quality block</strong> records unmapped fields, unmapped lookup values and conflicts between representations, so they can be counted per source.</li>
      </ul>
      <p>
        The search index is built from this record, not from the raw one.{' '}
        <Link href="/blog/real-estate-search-elasticsearch">Real estate search with Elasticsearch</Link> covers the
        index mapping that sits on top.
      </p>

      <h2>Running the mapping layer</h2>
      <ul className="cp-checklist">
        <li>Mapping rules are data in version control, one set per originating system, each with a version identifier written onto every record it produces.</li>
        <li>Each source has a small set of saved raw payloads with expected canonical output, run as tests on every rule change.</li>
        <li>Unmapped fields and unmapped lookup values are counted per source per run, and a rise alerts someone.</li>
        <li>Fill rate per source and field is charted; unit and representation conflicts are counted.</li>
        <li>A full re-normalization from the raw store is a routine job that has been rehearsed, with the index rebuilt after it.</li>
        <li>Adding a board means adding a source configuration and its tests. If it means editing search or page code, the boundary has leaked.</li>
        <li>Display flags and license scope have tests of their own: for each surface, a query for records it must not show returns zero.</li>
      </ul>

      <GuideFaq slug={SLUG} items={[
        { question: 'If every MLS uses the RESO Data Dictionary, why is normalization still needed?', answer: ['Because the dictionary standardizes names, types and lookup values, not which fields each MLS fills or how. Its own pages show, for example, LivingAreaUnits used by ', ['39% of organizations', DD_LIVING_UNITS], '. Platforms also leave work: MLS Grid’s conversion rules ', ['only concern themselves with field names and, when applicable, Data Dictionary lookups', GRID], '.'] },
        { question: 'Should local MLS fields be kept or dropped?', answer: ['Kept, under a namespace for their source. MLS Grid already delivers them that way: ', ['local fields are prefixed to identify which MLS they originate from', GRID_V2], '. A field dropped at ingestion has to be re-imported to add later; a field kept in the raw store and a local namespace costs little.'] },
        { question: 'What should the primary key of a normalized listing be?', answer: ['Not the listing number. RESO warns that in a merged system ListingId ', ['may not be unique', DD_LISTING_ID], '. Use the originating system together with the record key, and add the feed where the same listing can reach you through more than one licensed connection.'] },
        { question: 'How do you track where a normalized value came from?', answer: ['Keep the raw payload unchanged, stamp every canonical record with the version of the mapping rules that produced it, and record field-level provenance (source field, value as received, transform) for anything converted, mapped or assumed.'] },
        { question: 'What should happen when a display flag such as InternetAddressDisplayYN is missing?', answer: ['Do not treat missing as permission. The field ', ['indicates whether the seller has allowed the listing address to be displayed on Internet sites', DD_NET_ADDRESS], '. Set the default per source from that MLS’s documentation, and use the most restrictive reading until it is confirmed.'] },
      ]} />

      <p className="cp-note">
        Data Dictionary definitions and usage figures, platform documentation and MLS Grid&apos;s IDX Rules were
        read from the linked pages on October 13, 2026; the Data Dictionary pages state that they were generated
        on October 12, 2026. Usage figures change as organizations certify. The mapping table, the board names and
        the canonical record are illustrative and describe no real MLS.
      </p>
      <p>
        Adding a board, or untangling per-board conditions in an existing platform? See our{' '}
        <Link href="/services/mls-idx-integration">MLS and IDX integration service</Link>. Every project starts
        with a 30-minute technical discovery call with an engineer.
      </p>
    </GuideLayout>
  );
}
