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
}

export const guides: Guide[] = [
  {
    slug: 'mls-idx-integration-cost',
    related: ['idx-vendor-vs-custom-build', 'how-to-get-mls-data-access'],
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
    related: ['mls-idx-integration-cost', 'investor-portal-vs-file-sharing', 'investor-portal-security-checklist'],
    cta: {
      heading: 'Planning a Real Estate Platform?',
      text: 'Tell us the scope: MLS boards, user groups and first-release features. We will map what drives the cost for your build.',
    },
    title: 'What It Costs to Build a Real Estate Platform',
    metaTitle: 'Cost to Build a Real Estate Platform',
    description:
      'What drives the cost of a real estate platform: developer rates in the US, Canada and India, MLS data fees, maps and hosting, with every figure sourced.',
    datePublished: '2026-09-29',
    dateModified: '2026-09-30',
    service: 'saas-development',
    caseStudy: 'proptech-investor-portal',
  },
  {
    slug: 'how-to-get-mls-data-access',
    related: ['mls-data-pipeline-architecture', 'reso-web-api-vs-rets', 'mls-data-access-canada'],
    cta: {
      heading: 'Have MLS Access and Need the Pipeline Built?',
      text: 'Tell us which boards have approved you, or which you are applying to. We build the ingestion, normalization and search on top of that access.',
    },
    title: 'How to Get MLS Data Access for Your App',
    metaTitle: 'How to Get MLS Data Access for Your App',
    description:
      'The licenses, broker sponsorship, agreements, platforms (MLS Grid, Trestle, Bridge), fees and compliance rules for getting MLS data into your app, with sources.',
    datePublished: '2026-09-30',
    dateModified: '2026-10-09',
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
    related: ['mls-idx-integration-cost', 'reso-web-api-vs-rets', 'mls-data-pipeline-architecture'],
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
    related: ['mls-data-pipeline-architecture', 'how-to-get-mls-data-access', 'mls-data-access-canada'],
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
    related: ['custom-saas-vs-off-the-shelf-crm-for-brokerages', 'laravel-upgrade-checklist'],
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
    related: ['reso-web-api-vs-rets', 'how-to-get-mls-data-access', 'idx-vendor-vs-custom-build'],
    cta: {
      heading: 'Designing or Repairing an MLS Pipeline?',
      text: 'Tell us which feeds you pull, how they sync today and where the data goes wrong. An engineer will tell you which parts of this architecture your setup is missing.',
    },
    title: 'MLS Data Pipeline Architecture: A Reference Design for the RESO Web API',
    metaTitle: 'MLS Data Pipeline: Reference Architecture',
    description:
      'A reference architecture for ingesting MLS data via the RESO Web API: replication, media, normalization, duplicates, compliance checkpoints and failure modes.',
    datePublished: '2026-10-10',
    dateModified: '2026-10-10',
    service: 'mls-idx-integration',
    caseStudy: 'scaling-real-estate-saas-platform',
  },
  {
    slug: 'laravel-upgrade-checklist',
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
