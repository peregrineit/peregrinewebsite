// Guides published under /blog. Every figure in a guide links to a third-party
// source; there are no Peregrine prices (none have been supplied by the owner).
export interface Guide {
  slug: string;
  title: string;
  /** <title>; the layout appends "| Peregrine IT Solutions". */
  metaTitle: string;
  description: string;
  /** Heading and one line for the closing consultation block; a default is used if absent. */
  cta?: { heading: string; text: string };
  datePublished: string; // YYYY-MM-DD
  dateModified: string;
  /** Service page and case study the guide links to. */
  service: string;
  /** Related case study; omitted when no published case study fits the guide. */
  caseStudy?: string;
  /** Slugs of guides on a neighboring question, shown under "Related". */
  related?: string[];
  /** What was and was not executed among the article's code samples; shown under the article. */
  examples?: string;
  /** Alt text of the hero image at public/images/blog/<slug>-hero.webp (design/blog-heroes); omitted when there is none. */
  hero?: string;
}

export const guides: Guide[] = [
  {
    slug: 'mls-idx-integration-cost',
    related: ['idx-vendor-vs-custom-build', 'idx-website-features-checklist'],
    cta: {
      heading: 'Scoping an MLS or IDX Integration?',
      text: 'Tell us which MLS boards you need and what you are building on top. We will tell you which feeds, vendors and license types apply before you budget.',
    },
    title: 'MLS and IDX Integration Cost in 2026: Monthly and Yearly Fees by Vendor and MLS',
    metaTitle: 'MLS & IDX Cost per Month and per Year (2026)',
    description:
      'MLS and IDX costs per month and per year in 2026: IDX plugin plans, MLS license fees by board, MLS Grid and Trestle fees, and development rates, all sourced.',
    datePublished: '2026-09-29',
    dateModified: '2026-10-09',
    service: 'mls-idx-integration',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
  {
    slug: 'custom-saas-vs-off-the-shelf-crm-for-brokerages',
    related: ['idx-vendor-vs-custom-build', 'self-storage-software-build-vs-buy', 'laravel-upgrade-checklist'],
    cta: {
      heading: 'Deciding Between a CRM Subscription and a Custom Build?',
      text: 'Tell us how your brokerage works today and where the current tools fall short. An engineer will tell you plainly whether custom is worth it.',
    },
    title: 'Custom SaaS vs Off-the-Shelf CRM for Brokerages',
    metaTitle: 'Custom SaaS vs Off-the-Shelf Brokerage CRM',
    description:
      'When a brokerage should subscribe to a real estate CRM and when a custom platform makes sense, with published CRM pricing and the trade-offs of building.',
    datePublished: '2026-09-29',
    dateModified: '2026-09-30',
    service: 'saas-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'cost-to-build-a-real-estate-platform',
    related: ['real-estate-platform-tech-stack', 'mls-idx-integration-cost'],
    cta: {
      heading: 'Planning a Real Estate Platform?',
      text: 'Tell us the scope: MLS boards, user groups and first-release features. We will map what drives the cost for your build.',
    },
    title: 'What It Costs to Build a Real Estate Platform',
    metaTitle: 'Cost to Build a Real Estate Platform',
    description:
      'What drives the cost of a real estate platform: developer rates in the US, Canada and India, MLS data fees, maps and hosting, with every figure sourced.',
    datePublished: '2026-09-29',
    dateModified: '2026-10-21',
    service: 'saas-development',
    caseStudy: 'proptech-investor-portal',
  },
  {
    slug: 'how-to-get-mls-data-access',
    related: ['mls-boards-compared', 'reso-web-api-vs-rets'],
    cta: {
      heading: 'Have MLS Access and Need the Pipeline Built?',
      text: 'Tell us which boards have approved you, or which you are applying to. We build the ingestion, normalization and search on top of that access.',
    },
    title: 'How to Get MLS Data Access for Your App',
    metaTitle: 'How to Get MLS Data Access for Your App',
    description:
      'The licenses, broker sponsorship, agreements, platforms (MLS Grid, Trestle, Bridge), fees and compliance rules for getting MLS data into your app, with sources.',
    datePublished: '2026-09-30',
    dateModified: '2026-10-21',
    service: 'mls-idx-integration',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
  {
    slug: 'investor-portal-vs-file-sharing',
    related: ['investor-portal-security-checklist', 'cost-to-build-a-real-estate-platform'],
    cta: {
      heading: 'Outgrowing Shared Folders for Investor Reporting?',
      text: 'Tell us how your funds and investors are structured and what you send each quarter. An engineer will tell you whether an off-the-shelf portal fits or a custom one is worth it.',
    },
    title: 'Investor Portal vs File Sharing: What Real Estate Firms Need for LP Reporting',
    metaTitle: 'Investor Portal vs File Sharing for LPs',
    description:
      'When shared folders are enough for investor documents and when a portal is worth it: access control, audit trails, watermarking and published portal prices.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'investor-portal-development',
    caseStudy: 'proptech-investor-portal',
  },
  {
    slug: 'idx-vendor-vs-custom-build',
    related: ['idx-website-features-checklist', 'mls-idx-integration-cost'],
    cta: {
      heading: 'Deciding Whether to Move Off Your IDX Vendor?',
      text: 'Tell us which MLSs you work in and what your current IDX cannot do. An engineer will tell you whether a data vendor, a custom pipeline or staying put makes sense.',
    },
    title: 'IDX Vendor or Custom Build: When to Switch',
    metaTitle: 'IDX Vendor vs Custom Build: When to Switch',
    description:
      'When an IDX plugin is enough, when a data vendor API fits, and when a brokerage or proptech team should build its own MLS pipeline, with sourced costs.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'reso-web-api-vs-rets',
    related: ['mls-data-pipeline-architecture', 'mls-boards-compared'],
    cta: {
      heading: 'Still on a RETS Feed?',
      text: 'Tell us which MLSs you pull from and what the data feeds today. An engineer will tell you what the move to the RESO Web API involves for your setup.',
    },
    title: 'RESO Web API vs RETS: What Changes and How to Migrate',
    metaTitle: 'RESO Web API vs RETS: How to Migrate',
    description:
      'What changes when you move an MLS integration from RETS to the RESO Web API: authentication, queries, field names, media and sync, with sources and a checklist.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'self-storage-software-build-vs-buy',
    hero: 'Illustration: a row of storage unit doors under two cards labelled Buy and Build.',
    related: ['custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    cta: {
      heading: 'Weighing a Custom Self-Storage Platform?',
      text: 'Tell us how many facilities you run, which software and lock hardware they use, and what you cannot do today. An engineer will tell you whether a product, its API or a build fits.',
    },
    title: 'Self-Storage Management Software: Build or Buy?',
    metaTitle: 'Self-Storage Software: Build or Buy?',
    description:
      'When off-the-shelf self-storage software is enough, when to extend it through its API, and when a multi-site operator should build, with vendor facts sourced.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'saas-development',
    caseStudy: 'self-storage-management-platform',
  },
  {
    slug: 'self-storage-access-control-integration',
    hero: 'Cover: a tenancy moving from active to past due, gate lockout and overlock, and back to active when the balance clears.',
    examples: 'The desired-state function and the adapter interface are pseudocode and were not executed. Vendor behavior is quoted from public pages read on October 19, 2026.',
    related: ['self-storage-software-build-vs-buy', 'webhook-event-driven-integrations', 'background-jobs-redis-bullmq'],
    cta: {
      heading: 'Integrating Management, Billing and Access Systems?',
      text: 'Tell us which management software, payment processor and gate or lock vendors your facilities run, and where access and billing drift apart today. An engineer will walk through the integration with you.',
    },
    title: 'Self-Storage Access Control Integration: Keeping Gates, Smart Locks and Billing in Sync',
    metaTitle: 'Self-Storage Access Control Integration',
    description:
      'How self-storage management, billing and gate or smart-lock systems stay in sync: who owns tenant status, integration models, lockout states and reconciliation.',
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    service: 'api-integration',
    caseStudy: 'self-storage-management-platform',
  },
  {
    slug: 'self-storage-software-migration',
    hero: 'Cover: three acquired facilities, each with its own software, gate system and payment processor, moving through a pilot into one system.',
    related: ['self-storage-software-build-vs-buy', 'self-storage-access-control-integration', 'legacy-real-estate-platform-data-migration'],
    cta: {
      heading: 'Consolidating Facilities onto One System?',
      text: 'Tell us how many facilities you acquired, which software, gates and payment processor each one runs, and when you need to switch. An engineer will tell you how we would plan the move.',
    },
    title: 'Migrating Self-Storage Software After Acquiring Facilities',
    metaTitle: 'Self-Storage Software Migration Runbook',
    description:
      'Moving acquired self-storage facilities onto one system: exports, tenants, paid-through dates, payment data, gate codes, a pilot site, cutover and checks.',
    datePublished: '2026-10-21',
    dateModified: '2026-10-21',
    service: 'api-integration',
    caseStudy: 'self-storage-management-platform',
  },
  {
    slug: 'mls-data-access-canada',
    related: ['how-to-get-mls-data-access', 'mls-idx-integration-cost'],
    cta: {
      heading: 'Building on Canadian Listing Data?',
      text: 'Tell us which provinces and boards you need and what you are building. An engineer will tell you which feeds and agreements apply and how we would combine them.',
    },
    title: 'MLS Data Access in Canada: CREA DDF and Board Feeds',
    metaTitle: 'MLS Data in Canada: CREA DDF & Board Feeds',
    description:
      'How listing data access works in Canada: CREA DDF channels, rules, API and technology-provider fees, plus board IDX and VOW programs, with sources.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'odoo-implementation-cost',
    related: ['odoo-shopify-marketplace-integration', 'custom-saas-vs-off-the-shelf-crm-for-brokerages', 'laravel-upgrade-checklist'],
    cta: {
      heading: 'Budgeting an Odoo Project?',
      text: 'Tell us which Odoo apps you need, which systems Odoo has to connect to and what you want customized. An engineer will tell you what that means for plan, hosting and upkeep.',
    },
    title: 'Odoo Implementation Cost: Licences, Hosting and Custom Development',
    metaTitle: 'Odoo Implementation Cost: What to Budget',
    description:
      'What an Odoo implementation costs: per-user plans, Odoo.sh hosting, Success Packs and the upkeep of custom modules and integrations, from Odoo\'s own pages.',
    datePublished: '2026-10-09',
    dateModified: '2026-10-09',
    service: 'odoo-erp',
    // No caseStudy: Peregrine has no published Odoo case study.
  },
  {
    slug: 'mls-data-pipeline-architecture',
    hero: 'Illustration: five pipeline stages from connector to search index and API, with media worker and display policy alongside.',
    related: ['mls-sync-engine', 'mls-data-normalization', 'listing-lifecycle-sold-expired-deleted'],
    cta: {
      heading: 'Designing or Repairing an MLS Pipeline?',
      text: 'Tell us which feeds you pull, how they sync today and where the data goes wrong. An engineer will tell you which parts of this architecture your setup is missing.',
    },
    title: 'MLS Data Pipeline Architecture: A Reference Design for the RESO Web API',
    metaTitle: 'MLS Data Pipeline: Reference Architecture',
    description:
      'A reference architecture for ingesting MLS data via the RESO Web API: replication, media, normalization, duplicates, compliance checkpoints and failure modes.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'laravel-upgrade-checklist',
    hero: 'Illustration: Laravel versions 9 to 13 in a row above an upgrade checklist and three routes: upgrade in place, replace in stages, rewrite.',
    related: ['odoo-implementation-cost', 'custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    cta: {
      heading: 'Planning a Laravel Upgrade?',
      text: 'Tell us your Laravel and PHP versions, the packages you depend on and how much of the code is tested. An engineer will tell you which route fits and where the risk is.',
    },
    title: 'Laravel Upgrade and Modernization Checklist: Upgrade in Place, Replace in Stages or Rewrite',
    metaTitle: 'Laravel Upgrade & Modernization Checklist',
    description:
      'A phase-by-phase Laravel upgrade checklist from the official support policy and upgrade guides, plus a decision table: upgrade, replace in stages or rewrite.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    service: 'laravel-development',
    // No caseStudy: Peregrine has no published Laravel case study. The guide makes no project claims.
  },
  {
    slug: 'investor-portal-security-checklist',
    hero: 'Illustration: a shield with a padlock and four checklist items: access by role and entity, watermarked documents, audit trail, sessions and sign-in.',
    related: ['investor-portal-vs-file-sharing', 'cost-to-build-a-real-estate-platform'],
    cta: {
      heading: 'Specifying or Reviewing an Investor Portal?',
      text: 'Tell us how your funds, entities and investor roles are structured and what the portal has to hold. An engineer will walk through the access model and the controls it needs.',
    },
    title: 'Investor Portal Security Checklist: Threats, Controls and Questions to Ask',
    metaTitle: 'Investor Portal Security Design Checklist',
    description:
      'A security design checklist for LP portals: access model, threat-to-control table, MFA and session settings, audit trail and vendor questions, with sources.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    service: 'investor-portal-development',
    caseStudy: 'proptech-investor-portal',
  },
  {
    slug: 'odoo-shopify-marketplace-integration',
    hero: 'Illustration: Odoo and Shopify connected by arrows, with the sync direction for products, stock, orders and refunds.',
    related: ['odoo-implementation-cost', 'laravel-upgrade-checklist'],
    cta: {
      heading: 'Connecting Odoo to a Sales Channel?',
      text: 'Tell us which channels you sell through, which system holds stock and prices today, and where orders go wrong. An engineer will walk through ownership, sync and failure handling for your setup.',
    },
    title: 'Odoo Integration with Shopify and Marketplaces: Ownership, Sync and Failure Handling',
    metaTitle: 'Odoo–Shopify Sync: Integration Design Guide',
    description:
      'How to connect Odoo to Shopify or a marketplace: which system owns each record, webhooks and polling, idempotency, rate limits, mapping pitfalls, a checklist.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    service: 'odoo-erp',
    // No caseStudy: Peregrine has no published Odoo case study and no confirmed named integration.
  },
  {
    slug: 'idx-website-features-checklist',
    // Rewritten 2026-10-13 as an engineering requirements article; the slug is unchanged pending the owner's decision.
    hero: 'Illustration: five stacked requirement layers for an IDX platform: architecture, data, security, performance and operations.',
    related: ['mls-sync-engine', 'multi-tenant-real-estate-saas'],
    cta: {
      heading: 'Writing Requirements for an IDX Platform?',
      text: 'Tell us which MLS feeds you replicate and which rows of the requirements table you cannot verify today. An engineer will tell you how we would approach closing them.',
    },
    title: 'Engineering Requirements for a Production-Ready IDX Platform',
    metaTitle: 'Engineering Requirements for an IDX Platform',
    description:
      'Testable engineering requirements for an IDX platform: architecture, data reliability, security, performance and operations, each with a way to verify it.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-14',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'mls-boards-compared',
    hero: 'Illustration: nine of the fifteen MLS names arranged around a RESO Web API hub.',
    related: ['how-to-get-mls-data-access', 'mls-data-normalization'],
    cta: {
      heading: 'Adding a New MLS Market?',
      text: 'Tell us which MLSs you need and which brokers you work with. An engineer will tell you which platform, license and feed type each one involves before you estimate.',
    },
    title: '15 US MLS Boards: A Data Access Reference',
    metaTitle: '15 US MLS Boards: A Data Access Reference',
    description:
      'Reference profiles of 15 US MLSs in alphabetical order: who each serves, data delivery, feed types, who may license and where to apply, each fact sourced.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
  {
    slug: 'real-estate-platform-tech-stack',
    hero: 'Illustration: stacked layers labelled frontend, backend, search, cache and system of record.',
    related: ['real-estate-search-elasticsearch', 'multi-tenant-real-estate-saas', 'background-jobs-redis-bullmq'],
    cta: {
      heading: 'Choosing a Stack for a Listing Platform?',
      text: 'Tell us your listing volume, MLS feeds, search features and what your team runs today. An engineer will walk through which layers you need and which you can leave out.',
    },
    title: 'Tech Stack for a Real Estate Platform: Database, Search, Backend and Frontend Choices',
    metaTitle: 'Choosing a Real Estate Platform Tech Stack',
    description:
      'How to choose the database, search engine, cache, backend language, frontend rendering, media storage and hosting for a real estate platform, with sources.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-13',
    service: 'saas-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'real-estate-website-seo-aeo-geo',
    hero: 'Illustration: three overlapping circles labelled SEO, AEO and GEO around indexable listing pages.',
    related: ['listing-page-core-web-vitals', 'listing-lifecycle-sold-expired-deleted'],
    cta: {
      heading: 'Rebuilding Listing Pages So They Can Be Found?',
      text: 'Tell us how your listing pages are served today and which MLSs feed them. An engineer will tell you which items on this checklist your setup is missing.',
    },
    title: 'SEO, AEO and GEO for Real Estate Websites: What to Build',
    metaTitle: 'Real Estate Website SEO, AEO & GEO Checklist',
    description:
      'What a brokerage or proptech site must build to be found in search, answer features and AI answers: indexing, listing lifecycle, schema and crawlers, sourced.',
    datePublished: '2026-10-12',
    dateModified: '2026-10-13',
    service: 'nextjs-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'multi-tenant-real-estate-saas',
    hero: 'Cover: three isolated tenant columns between tenant resolution at the edge and shared services.',
    examples: 'The schema and the row-level security policy were run in PostgreSQL 16 on October 13, 2026 as a non-superuser role: each tenant read only its own rows, a cross-tenant insert was refused, and a query with no tenant set failed.',
    related: ['real-estate-platform-tech-stack', 'custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    cta: {
      heading: 'Designing a Multi-Tenant Real Estate Platform?',
      text: 'Tell us who your tenants are (brokerages, teams or agent sites), which MLSs they license and how the data is separated today. An engineer will walk through the tenancy model and isolation it needs.',
    },
    title: 'Building a Multi-Tenant Real Estate SaaS Platform',
    metaTitle: 'Multi-Tenant Real Estate SaaS Architecture',
    description:
      'How to design tenancy for a real estate SaaS: tenant hierarchy, data isolation with row-level security, custom domains, per-tenant MLS licenses and lifecycle.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'saas-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'real-estate-crm-architecture',
    hero: 'Cover: an enquiry on a listing followed by a four-step lead timeline.',
    examples: 'The data model was created in PostgreSQL 16 on October 13, 2026 and the event example is valid JSON. Neither was run inside a CRM.',
    related: ['multi-tenant-real-estate-saas', 'custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    cta: {
      heading: 'Designing Lead Capture, Routing or a CRM Integration?',
      text: 'Tell us where your enquiries come from, which CRM your agents use and where leads get lost or duplicated. An engineer will walk through capture, routing and sync for your setup.',
    },
    title: 'Real Estate CRM Architecture: From Property Enquiry to Lead Management',
    metaTitle: 'Real Estate CRM Architecture: Lead Management',
    description:
      'How to design a real estate CRM: enquiry capture, attribution, deduplication, lead routing, an event timeline, consent records and integration boundaries.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'saas-development',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
  {
    slug: 'webhook-event-driven-integrations',
    hero: 'Cover: a webhook path from sender through verification and a queue to a worker, with a dead-letter step.',
    examples: 'The outbox table was created in PostgreSQL 16 on October 13, 2026. The receiver and the backoff function are pseudocode and were not executed.',
    related: ['odoo-shopify-marketplace-integration', 'real-estate-crm-architecture', 'vibe-coded-app-security-checklist'],
    cta: {
      heading: 'Building or Repairing a Webhook Integration?',
      text: 'Tell us which providers you receive events from, what you send to your own customers and where events get lost or duplicated. An engineer will walk through both paths with you.',
    },
    title: 'Building Reliable Webhook and Event-Driven Integrations',
    metaTitle: 'Reliable Webhooks & Event-Driven Integrations',
    description:
      'How to receive and send webhooks reliably: signature checks, idempotency, ordering, retries with jitter, the outbox pattern, reconciliation and SSRF defenses.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'api-integration',
    caseStudy: 'supply-chain-visibility-platform',
  },
  {
    slug: 'background-jobs-redis-bullmq',
    hero: 'Cover: job states waiting, active, completed, failed and delayed with the retry path, above Redis.',
    examples: 'The TypeScript samples parse but were not compiled against the BullMQ package or run against Redis. Option names follow the BullMQ documentation as read on October 12, 2026.',
    related: ['webhook-event-driven-integrations', 'multi-tenant-real-estate-saas'],
    cta: {
      heading: 'Building or Stabilizing a Background Job System?',
      text: 'Tell us what your jobs do, how they fail today and how Redis is set up. An engineer will walk through retries, stalled jobs, idempotency and the Redis settings your queues need.',
    },
    title: 'Designing Reliable Background Jobs with Redis and BullMQ',
    metaTitle: 'Reliable Background Jobs with Redis & BullMQ',
    description:
      'How to run BullMQ on Redis in production: retries and backoff, concurrency, stalled jobs, idempotent handlers, Job Schedulers, Redis settings and failure modes.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'saas-development',
    // No caseStudy: no published case study describes a BullMQ job system.
  },
  {
    slug: 'vibe-coded-app-security-checklist',
    hero: 'Cover: a shield above a launch checklist: server-side authorization, row-level security, no secrets in the browser, verified webhooks, a tested restore and error alerts.',
    related: ['webhook-event-driven-integrations', 'background-jobs-redis-bullmq', 'multi-tenant-real-estate-saas'],
    cta: {
      heading: 'Getting an AI-Built App Ready for Real Users?',
      text: 'Tell us what the app does, what it was built with and which items on this checklist you are unsure about. An engineer will tell you what looks fine, what needs work and how much.',
    },
    title: 'Vibe-Coded App Security Checklist: What to Check Before Launch',
    metaTitle: 'Vibe-Coded App Security Checklist',
    description:
      'What to check before an AI-built app takes real users and data: access rules, Supabase RLS, secrets, webhooks, backups and monitoring, each with a safe test.',
    datePublished: '2026-10-20',
    dateModified: '2026-10-20',
    service: 'ai-app-to-production',
    // No caseStudy: no published case study describes taking over an AI-generated codebase.
  },
  {
    slug: 'mls-sync-engine',
    hero: 'Cover: a timeline of one sync run, from initial full import through checkpoints and backoff to resuming from a checkpoint.',
    examples: 'The checkpoint table was created in PostgreSQL 16 on October 13, 2026. The sync loop is TypeScript-style pseudocode: it parses but was not run against an MLS feed.',
    related: ['mls-data-pipeline-architecture', 'reso-web-api-vs-rets'],
    cta: {
      heading: 'Building or Repairing an MLS Sync Engine?',
      text: 'Tell us which feeds you replicate, how the cursor is stored and what happens today when a run fails. An engineer will walk through where records can be lost.',
    },
    title: 'Building a Scalable MLS Synchronization Engine',
    metaTitle: 'Building a Scalable MLS Sync Engine',
    description:
      'How to build an MLS sync engine: full import, incremental sync, checkpoints, queues, rate limits, backoff, idempotent writes, monitoring and failure recovery.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'listing-lifecycle-sold-expired-deleted',
    hero: 'Cover: listing statuses Active, Pending, Expired, Sold and Removed joined by transition arrows.',
    examples: "The code samples are TypeScript-style pseudocode. They parse but were not run against an MLS feed; status values and windows must come from each MLS's current rules.",
    related: ['mls-sync-engine', 'real-estate-website-seo-aeo-geo'],
    cta: {
      heading: 'Sold or Removed Listings Still Showing on Your Site?',
      text: 'Tell us which feeds you pull and how removals reach you today. An engineer will walk through reconciliation, index cleanup and what each listing URL should return.',
    },
    title: 'Handling Deleted, Expired and Sold Listings Correctly',
    metaTitle: 'Handling Deleted, Expired & Sold Listings',
    description:
      'How to handle sold, expired, withdrawn and deleted MLS listings: status mapping, removal signals, reconciliation, index cleanup, HTTP status and license rules.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'mls-data-normalization',
    hero: 'Cover: three source schemas with different field names merging into one canonical listing.',
    examples: 'The canonical record and the three-board mapping are illustrative outlines, not code that was executed. The boards in the mapping are invented.',
    related: ['mls-sync-engine', 'listing-lifecycle-sold-expired-deleted'],
    cta: {
      heading: 'Adding a Second or Third MLS Board?',
      text: 'Tell us which boards you pull, through which platforms, and where the fields disagree. An engineer will walk through the mapping layer and canonical schema for your feeds.',
    },
    title: 'MLS Data Normalization Across Multiple Real Estate Boards',
    metaTitle: 'MLS Data Normalization Across Multiple Boards',
    description:
      'How to normalize MLS data from several boards: RESO field mapping, identifiers, property types, units, media, display flags, provenance and a canonical schema.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
  {
    slug: 'legacy-real-estate-platform-data-migration',
    hero: 'Cover: legacy and new platforms running in parallel with sync, validation gates and a cutover line.',
    examples: 'Both SQL samples were run in PostgreSQL 16 on October 13, 2026; the checksum query was checked on rows that differ only in which field is NULL.',
    related: ['mls-sync-engine', 'mls-data-normalization'],
    cta: {
      heading: 'Planning a Move Off a Legacy Platform?',
      text: 'Tell us what the old system holds, how many tenants and users it serves and how much downtime you can accept. An engineer will walk through strategy, validation and rollback for your case.',
    },
    title: 'Data Migration Strategies for Legacy Real Estate Platforms',
    metaTitle: 'Legacy Real Estate Platform Data Migration',
    description:
      'How to migrate a legacy real estate platform: what to move or re-fetch, cutover strategies, validation, URL redirects, rollback planning and a cutover runbook.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'saas-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'real-estate-search-elasticsearch',
    hero: 'Cover: a search box with filters above an alias pointing at a live index while a new one reindexes.',
    examples: 'The mapping and the query were run against Elasticsearch 8.19.1 on October 13, 2026 and were accepted. They were not load-tested, and OpenSearch was not checked.',
    related: ['real-estate-platform-tech-stack', 'mls-data-pipeline-architecture'],
    cta: {
      heading: 'Designing or Repairing Listing Search?',
      text: 'Tell us your listing volume, the filters and map features you need, and where search is slow or wrong today. An engineer will walk through the index and sync design with you.',
    },
    title: 'Designing a Real Estate Search Engine with Elasticsearch',
    metaTitle: 'Real Estate Search with Elasticsearch',
    description:
      'Designing listing search on Elasticsearch: mappings, filters, geo queries, autocomplete, pagination, facet counts, relevance and zero-downtime reindexing.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'map-based-property-search',
    hero: 'Cover: a map with a drawn search area, listing markers and one cluster.',
    examples: 'The Elasticsearch query was run against Elasticsearch 8.19.1 on October 13, 2026 and was accepted. The PostGIS query and the browser snippet were read against the documentation but not executed.',
    related: ['real-estate-search-elasticsearch', 'real-estate-platform-tech-stack'],
    cta: {
      heading: 'Building Map Search on Listing Data?',
      text: 'Tell us your data store, listing volume and how the map should behave on desktop and mobile. An engineer will walk through the query, clustering and sync design with you.',
    },
    title: 'Building Map-Based Property Search with Geospatial Queries',
    metaTitle: 'Map-Based Property Search: Geospatial Queries',
    description:
      'How to build map search for listings: viewport and polygon queries, spatial indexes, clustering, list and map sync, URL state, mobile and address display.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'saved-searches-listing-alerts',
    hero: 'Cover: a saved search and a listing change meeting in a matcher that feeds an instant alert and a daily digest.',
    examples: 'The schema was created in PostgreSQL 16 on October 13, 2026. The matcher is pseudocode and was not executed.',
    related: ['real-estate-search-elasticsearch', 'mls-data-pipeline-architecture'],
    cta: {
      heading: 'Building Saved Searches and Listing Alerts?',
      text: 'Tell us how listings reach your platform and how alerts should behave. An engineer will walk through matching, deduplication, scheduling and the rules that must stop a send.',
    },
    title: 'Designing Reliable Saved Searches and Listing Alerts',
    metaTitle: 'Designing Saved Searches and Listing Alerts',
    description:
      'How to build saved searches and listing alerts that do not miss, duplicate or misfire: storage, matching, dedupe, scheduling, unsubscribe and delivery.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'mls-idx-integration',
  },
  {
    slug: 'listing-page-core-web-vitals',
    hero: 'Cover: a listing page wireframe marking the hero photo, the map and the gallery, beside LCP, INP and CLS rings.',
    examples: 'The component sample was checked against the Next.js version this site runs (16.1.6), where preload exists on the Image component and priority is marked deprecated. No performance measurement is reported in this article.',
    related: ['real-estate-website-seo-aeo-geo', 'map-based-property-search'],
    cta: {
      heading: 'Listing Pages Failing Core Web Vitals?',
      text: 'Tell us how your listing, search and area pages are rendered and what your field data shows. An engineer will tell you which template to fix first and how.',
    },
    title: 'Real Estate Website Performance: Optimizing Listing Pages for Core Web Vitals',
    metaTitle: 'Listing Page Core Web Vitals: What to Build',
    description:
      'How to build listing, search and area pages that meet Core Web Vitals: rendering, the hero photo, galleries, maps, third-party scripts, caching and INP.',
    datePublished: '2026-10-13',
    dateModified: '2026-10-13',
    service: 'nextjs-development',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'idx-crm-integration',
    related: ['real-estate-crm-architecture', 'webhook-event-driven-integrations', 'how-to-get-mls-data-access'],
    cta: {
      heading: 'Connecting Your IDX Website to a CRM?',
      text: 'Tell us which IDX vendor and CRM you use and which leads are getting lost. An engineer will tell you which documented path fits and what to build around it.',
    },
    title: 'IDX CRM Integration: Sending Website Leads to Follow Up Boss, HubSpot and GoHighLevel',
    metaTitle: 'IDX CRM Integration: FUB, HubSpot, HighLevel',
    description:
      'How IDX website leads reach Follow Up Boss, HubSpot and GoHighLevel: each vendor\'s documented intake path, credentials, duplicates and failure handling.',
    datePublished: '2026-10-21',
    dateModified: '2026-10-21',
    service: 'api-integration',
  },
  {
    slug: 'php2shell-php-security-vulnerabilities-2026',
    related: ['laravel-upgrade-checklist'],
    cta: {
      heading: 'Need Help Assessing or Upgrading a PHP Application?',
      text: 'Tell us which PHP version, framework and host you run. An engineer will help you confirm the patch status and plan a move to a supported version.',
    },
    title: 'PHP2Shell in 2026: Vulnerabilities, Patched Versions & What Website Owners Should Do',
    metaTitle: 'PHP2Shell: Patched PHP Versions & What to Do',
    description:
      'The October 2026 PHP security releases: the two CVEs, which PHP versions are patched, and what WordPress, Laravel and custom PHP site owners should check.',
    datePublished: '2026-10-27',
    dateModified: '2026-10-27',
    service: 'php-upgrade-migration',
    // No caseStudy: Peregrine has no published PHP case study.
  },
];

export function getGuide(slug: string): Guide {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

/** Guides that cite a case study, for the link back from that case study's page. */
export const guidesForCaseStudy = (slug: string): Guide[] => guides.filter((g) => g.caseStudy === slug);

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** The four guides shown on the homepage (a four-column grid); /blog lists them all. */
export const homeGuides: Guide[] = [
  'mls-idx-integration-cost',
  'how-to-get-mls-data-access',
  'investor-portal-vs-file-sharing',
  'cost-to-build-a-real-estate-platform',
].map((slug) => guides.find((g) => g.slug === slug)!);
