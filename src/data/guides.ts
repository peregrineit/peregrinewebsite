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
}

export const guides: Guide[] = [
  {
    slug: 'mls-idx-integration-cost',
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
];

export function getGuide(slug: string): Guide {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

/** The four guides shown on the homepage (a four-column grid); /blog lists them all. */
export const homeGuides: Guide[] = [
  'mls-idx-integration-cost',
  'how-to-get-mls-data-access',
  'investor-portal-vs-file-sharing',
  'cost-to-build-a-real-estate-platform',
].map((slug) => guides.find((g) => g.slug === slug)!);
