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
  caseStudy: string;
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
    dateModified: '2026-09-30',
    service: 'mls-idx-integration',
    caseStudy: 'w3re-ai-real-estate-platform',
  },
];

export function getGuide(slug: string): Guide {
  const g = guides.find((x) => x.slug === slug);
  if (!g) throw new Error(`Unknown guide: ${slug}`);
  return g;
}

export const formatDate = (d: string) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
