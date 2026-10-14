# Publication tracker: technical article batch

**Branch:** `content/tech-batch` (based on `content/more-heroes`, pull request #17, which is blog cover images only). **Status key:** written → reviewed → integrated → published (only after the live URL answers 200).

## New articles

| # | Title | URL | Search intent | Service | Status |
|---|---|---|---|---|---|
| 1 | Building a Scalable MLS Synchronization Engine | `/blog/mls-sync-engine` | how to build MLS sync: import, incremental, checkpoints | mls-idx-integration | published 2026-10-13 |
| 2 | Handling Deleted, Expired and Sold Listings Correctly | `/blog/listing-lifecycle-sold-expired-deleted` | what to do with off-market listings in data, index and page | mls-idx-integration | published 2026-10-13 |
| 3 | MLS Data Normalization Across Multiple Real Estate Boards | `/blog/mls-data-normalization` | mapping several MLS feeds to one schema | mls-idx-integration | published 2026-10-13 |
| 4 | Data Migration Strategies for Legacy Real Estate Platforms | `/blog/legacy-real-estate-platform-data-migration` | migrating a real estate platform without losing data or rankings | saas-development | published 2026-10-13 |
| 5 | Designing a Real Estate Search Engine with Elasticsearch | `/blog/real-estate-search-elasticsearch` | Elasticsearch design for listing search | mls-idx-integration | published 2026-10-13 |
| 6 | Building Map-Based Property Search with Geospatial Queries | `/blog/map-based-property-search` | map and polygon search implementation | mls-idx-integration | published 2026-10-13 |
| 7 | Designing Reliable Saved Searches and Listing Alerts | `/blog/saved-searches-listing-alerts` | saved search matching and alert delivery | mls-idx-integration | published 2026-10-13 |
| 8 | Real Estate Website Performance: Optimizing Listing Pages for Core Web Vitals | `/blog/listing-page-core-web-vitals` | Core Web Vitals on listing pages | nextjs-development | published 2026-10-13 |
| 9 | Building a Multi-Tenant Real Estate SaaS Platform | `/blog/multi-tenant-real-estate-saas` | multi-tenant architecture for brokerage SaaS | saas-development | published 2026-10-13 |
| 10 | Real Estate CRM Architecture: From Property Enquiry to Lead Management | `/blog/real-estate-crm-architecture` | CRM data model and lead flow | saas-development | published 2026-10-13 |
| 11 | Building Reliable Webhook and Event-Driven Integrations | `/blog/webhook-event-driven-integrations` | reliable webhook receiving and sending | api-integration | published 2026-10-13 |
| 12 | Designing Reliable Background Jobs with Redis and BullMQ | `/blog/background-jobs-redis-bullmq` | BullMQ job reliability | saas-development | published 2026-10-13 |

Per article: cover `public/images/blog/<slug>-hero.webp` (source `design/blog-heroes/<slug>.html`), diagram `src/app/components/diagrams/*.tsx`, sources `docs/content/sources/<slug>.md`.

## Release record

- Pull request: peregrineit/peregrinewebsite#18, merged to `main` as `a0ab994` on 2026-10-13. Production deploy by Vercel from `main`.
- Live check after deploy: all 12 new URLs and the 3 revised guides answer 200; canonical equals the URL; cover (`/images/blog/<slug>-hero.webp`) and Open Graph image answer 200; Article, BreadcrumbList and FAQPage schema present; `datePublished` 2026-10-13 on the 12 new articles (2026-10-12 kept on the 3 revised, `dateModified` 2026-10-13); every URL in `sitemap.xml` (78 URLs), `/blog` and `llms.txt`.
- `python3 scripts/seo_check.py https://peregrine-it.com`: 78 URLs, 216 schema nodes, 540 references, FAILS: 0.
- IndexNow: 17 URLs submitted, HTTP 200.
- Examples: SQL run on PostgreSQL 16 and Elasticsearch requests on 8.19.1; PostGIS SQL, BullMQ TypeScript and pseudocode not executed, stated on each page.

## Housekeeping (owner decisions of 2026-10-14; branch `release/idx-housekeeping`, not yet deployed)

- `/blog/cheapest-idx-options` retired: 301 to `/blog/mls-idx-integration-cost`; removed from the sitemap, `/blog`, `llms.txt`, related lists and the MLS/IDX service page. Reasoning in `RETIREMENT-cheapest-idx-options.md`. Sitemap: 77 URLs.
- `/blog/idx-website-features-checklist` rewritten as "Engineering Requirements for a Production-Ready IDX Platform" at the same URL and canonical; new cover and diagram; `datePublished` 2026-10-12 kept, `dateModified` 2026-10-14. Sources in `sources/idx-website-features-checklist.md`.

## Revised guides (original publication date kept)

| Title | URL | Change | Status |
|---|---|---|---|
| 15 US MLS Boards: A Data Access Reference | `/blog/mls-boards-compared` | reframed as a reference; cross-board fee comparisons removed | published 2026-10-13 |
| Tech Stack for a Real Estate Platform | `/blog/real-estate-platform-tech-stack` | vendor price figures removed; OpenSearch equivalent added | published 2026-10-13 |
| SEO, AEO and GEO for Real Estate Websites | `/blog/real-estate-website-seo-aeo-geo` | filtered-URL, cache invalidation and INP guidance added | published 2026-10-13 |

## Topic decisions (20-topic backlog)

| Topic | Decision | Reason |
|---|---|---|
| How an MLS Data Pipeline Works | not duplicated | `/blog/mls-data-pipeline-architecture` is this article; new deep dives link to it |
| Designing a Secure Investor Portal | not duplicated | `/blog/investor-portal-security-checklist` |
| Integration Layer Between Odoo and Shopify | not duplicated | `/blog/odoo-shopify-marketplace-integration` |
| Modernizing a Legacy Laravel Application | not duplicated | `/blog/laravel-upgrade-checklist` |
| Auth and RBAC in Multi-Tenant SaaS | alternate, not written | partly covered by the multi-tenant and investor-portal articles |
| Multi-Location Self-Storage Platform; Payments, Access Control and Rentals | alternates, not written | one article at most; overlap each other |
| Designing an API-First SaaS Application | alternate, not written | least specific to the site's audience |

## Owner decisions outstanding
- `/blog/cheapest-idx-options` and `/blog/idx-website-features-checklist` are live from the previous release and match directions the owner has since rejected. Not removed without instruction.
