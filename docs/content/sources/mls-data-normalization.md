# Source log: /blog/mls-data-normalization

Every URL below was fetched on **2026-10-13** shortly after midnight IST (HTTP 200), in the same working session that began on 2026-10-12, and the quoted text was read on the page then. The dd.reso.org pages carry the footer "Generated October 12, 2026". Quotes are verbatim. Method: `curl` with a browser user agent, HTML stripped to text; the PDF with `pdftotext -layout`.

## RESO Data Dictionary (dd.reso.org, DD 2.0)

| URL | Text relied on |
|---|---|
| https://dd.reso.org/ | "DD 2.0 Active Approved October 23, 2023 41 Resources 1,745 Fields 3,683 Lookups" · "DD 2.1 Draft In development 43 Resources 2,139 Fields 4,129 Lookups" · "DD 2.0 is the current version for RESO certification." |
| https://dd.reso.org/DD2.0/Property/ListPrice/ | "The current price of the property as determined by the seller and the seller's broker. For auctions, this is the minimum or reserve price." · "Adoption 100% 420 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Property/LivingArea/ | "The total livable area within the structure." · "Adoption 79% 331 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Property/LivingAreaUnits/ | "A pick list of the unit of measurement for the area (e.g., Square Feet, Square Meters)." · "Adoption 39% 165 of 420 Organizations" · "Lookups (2)": Square Feet 33%, Square Meters 1% |
| https://dd.reso.org/DD2.0/Property/LotSizeSquareFeet/ | "The total square footage of the lot. This field is related to Lot Size Area and Lot Size Units and must be in sync with the values represented in those fields." |
| https://dd.reso.org/DD2.0/Property/LotSizeUnits/ | "Lookups (3)": Acres 83%, Square Feet 45%, Square Meters 1% |
| https://dd.reso.org/DD2.0/Property/SourceSystemName/ | "The name of the immediate record provider. The system from which the record was directly received." · "Adoption 40% 170 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Property/ListingKey/ | "A unique identifier for this record from the immediate source. ... This is the local key of the system." |
| https://dd.reso.org/DD2.0/Property/ListingId/ | "In a multiple originating system or a merged system, this value may not be unique and may require the use of the provider system to create a synthetic unique value." |
| https://dd.reso.org/DD2.0/Property/OriginatingSystemName/ | "The name of the originating record provider, most commonly the name of the MLS." |
| https://dd.reso.org/DD2.0/Property/OriginatingSystemKey/ | "The originating system is the system with authoritative control over the record (e.g., the MLS where the listing was input). There may be cases where the source system (how the record was received) is not the originating system." |
| https://dd.reso.org/DD2.0/Property/UniversalPropertyId/ | "The RESO Universal Property Identifier (UPI) is a unique identifier for all real property in the U.S. and Canada." · "Adoption 21% 90 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Property/ParcelNumber/ | "The assessor's parcel number (APN) format varies from county to county. It is recommended that all parcel numbers are transmitted without dashes or hyphens." |
| https://dd.reso.org/DD2.0/Property/PropertyType/ | "Lookup Status Open with Enumerations" · "Lookups (9)": Business Opportunity 16%, Commercial Lease 46%, Commercial Sale 71%, Farm 31%, Land 96%, Manufactured In Park 6%, Residential 98%, Residential Income 52%, Residential Lease 49% |
| https://dd.reso.org/DD2.0/Property/PropertySubType/ | "Lookups (31)" · "Apartment A unit within a wholly owned structure of five or more units. This may not be used for Residential or Residential Income. For Residential, use Condo...." · "Condominium A unit within a structure where ownership is on a unit-by-unit basis." |
| https://dd.reso.org/DD2.0/Property/BathroomsTotalInteger/ | "The simple sum of the number of bathrooms. For example, for a property with two full bathrooms and one half bathroom, the Bathrooms Total Integer would be 3. ... Decimal-based bathrooms are not recommended" |
| https://dd.reso.org/DD2.0/Property/InternetEntireListingDisplayYN/ | "Indicates whether or not the seller has allowed the listing to be displayed on Internet sites." |
| https://dd.reso.org/DD2.0/Property/InternetAddressDisplayYN/ | "Indicates whether or not the seller has allowed the listing address to be displayed on Internet sites." |
| https://dd.reso.org/DD2.0/Property/InternetAutomatedValuationDisplayYN/ | "Indicates whether or not the seller allows the listing to be displayed with an automated valuation model (AVM) on Internet sites." |
| https://dd.reso.org/DD2.0/Property/InternetConsumerCommentYN/ | "Indicates whether or not the seller allows a comment or blog system to be attached to the listing on Internet sites." |
| https://dd.reso.org/DD2.0/Media/MediaKey/ | "Adoption 61% 257 of 420 Organizations" |
| https://dd.reso.org/DD2.0/Media/Order/ | "Only a positive integer, including zero. Element zero is the primary photo per RESO convention." |
| https://dd.reso.org/DD2.0/Media/MediaCategory/ | "Adoption 45% 190 of 420 Organizations" · lookups include Document, Floor Plan, Photo, Unbranded Virtual Tour, Video |

## RESO (other)

| URL | Text relied on |
|---|---|
| https://www.reso.org/universal-parcel-identifier/ | "Property data is inconsistent when it relies upon addresses and standalone parcel numbers for identification." · "It is currently in version 2.0 with a new, URN-based model for universal uniqueness ... codes for country and region assigning parcel numbers, the parcel numbers themselves, and subcomponents of the property." |
| https://transport.reso.org/proposals/web-api-core/ | String List, Single: "Edm.EnumType or Edm.String with the Lookup Resource. RESO supports either Edm.EnumType or Edm.String lookups." |
| https://www.reso.org/moving-replication-reso-web-api/ | (Scott Lockhart, CEO of Showcase IDX, quoted by RESO) "Although the field names were mostly consistent with the adoption of the RESO Data Dictionary, the implementation of the data in those fields was not as consistent." · created-date example: "Some just give the date ... Some use local server time. Some don't have the date of a listing at all." |

## MLS Grid

| URL | Text relied on |
|---|---|
| https://docs.mlsgrid.com/ | "at this time the MLS Grid conversion rules only concern themselves with field names (unless specified otherwise) and when applicable data dictionary lookups" · "Each record contains only the fields converted from its originating source MLS." · "ALL date fields are converted to a DD field are represented in UTC ... Any date fields passed through as a local field are kept in their original representation." |
| https://docs.mlsgrid.com/api-documentation/api-version-2.0 | "Local fields specific to an MLS have been prefixed to identify which MLS they originate from." (table: ACT_ / ACTRIS MLS) · "This prefix should be removed from the data prior to displaying externally but must be added back whenever requesting records within the MLS Grid." · "Each record in the system has a field called MlgCanUse which is an array that helps indicate which of the Use Cases ... the record qualifies for." |
| https://www.mlsgrid.com/s/MLS-Grid-IDX-Rules.pdf | Header "Updated September 17,2026" · Rule 7: "Listings, including property addresses, can be included in displays of MLS GRID Data except where a seller has directed their Member Participant to withhold their listing or the listing's property address from all public display on the Internet" · Rule 14: an IDX display that allows third-party comments or "displays an automated estimate of the market value of the listing ... shall disable or discontinue either or both of those features as to the seller's listing at the request of the seller." |

## Trestle (Cotality)

| URL | Text relied on |
|---|---|
| https://trestle-documentation.corelogic.com/support/faq/ | "Trestle standardizes listing data per the Real Estate Standards Organization (RESO) Data Dictionary specification. Trestle transforms data from each MLO into a consistent data structure ... Trestle is Certified by RESO for Data Dictionary 2.0." |
| https://trestle-documentation.corelogic.com/web-api/at-scale/ | "$expand=Rooms,Units,OpenHouse,CustomProperty,Media to get all of the rooms, unit, open house, and custom data as well as all of the information about the photos for the property" |
| https://trestle-documentation.corelogic.com/web-api/reference/ | "The dates and timestamps exposed through Trestle are exposed in UTC." · "OpenHouse dates and times are exposed in the timezone of the MLS" · "the data you get from Trestle will look like ActiveUnderContract instead of Active Under Contract" · "With PrettyEnums=true, Trestle will do the translations for you" |
| https://trestle-documentation.corelogic.com/metadata/resources/Media/ | Order: "Only a positive integer. Element one is the primary photo. Element zero is an alias for element one to comply with RETS convention." |

## Illustrative content (invented for the article)

- The mapping table: Board A, Board B, Board C and every cell. No real MLS is described.
- The canonical record: all names, values, `feed-b`, `board-b`, rule identifiers.
- The diagram's field names and values.
- Arithmetic in the example: 172 square meters is about 1,851 square feet; 0.2 acres is 8,712 square feet.

## Recommendations (ours, not a vendor's)

The composite key of feed, originating system and record key; per-source unit defaults marked as assumed; precedence and conflict flags for lot size; storing price with currency and not converting at ingestion; full and half bath counts as canonical; re-numbering photo order; the three-way distinction for missing values; restrictive defaults for display flags; field-level provenance; the operating checklist.

## Not used because it could not be verified

- https://dd.reso.org/DD2.0/Property/UniversalParcelId/ and https://dd.reso.org/DD2.0/Property/Currency/ returned 404. The article cites the UniversalPropertyId field page and does not claim that the dictionary lacks a currency field; it says only that the ListPrice definition does not state one.
- Trestle's CustomProperty resource page lists fields but has no prose description; the article relies on the scaling guide's sentence instead.
- A square-foot to acre conversion factor from a standards body: the NIST page fetched gives only approximate metric conversions, so no factor is stated in the prose.
- Bridge Interactive documentation: not readable without scripts; not mentioned.

## Statements about Peregrine and where they come from

- "a brokerage across four MLS regions where each MLS used different RETS and Web API standards and schemas, and a pipeline that ingests from four MLS systems, normalizes schemas and deduplicates cross-listed properties": `src/app/case-studies/w3re-ai-real-estate-platform/page.tsx` ("Fragmented MLS Data Across 4 Markets"; "Unified Multi-MLS Data Pipeline").
- 30-minute technical discovery call with an engineer: allowed general fact (writing brief).
