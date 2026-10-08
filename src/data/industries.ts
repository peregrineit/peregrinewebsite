// Industry pages (/industries and /industries/[slug]) are generated from this file.
//
// Rules:
// - An industry gets its own page only when two or more published case studies back it.
//   Self-storage is the one exception: a single case study, but Search Console shows
//   people looking for self-storage software and landing on the case study.
// - Every statement here restates what the linked case studies already say. No new
//   figures, clients, vendors or results. Verticals with one case study are listed on
//   the hub (`singleCaseStudyVerticals`) and link straight to that case study.

export interface Industry {
  slug: string;
  /** Short name for cards, breadcrumbs and links. */
  name: string;
  /** <title> (the layout appends " | Peregrine IT"). */
  title: string;
  metaDescription: string;
  h1: string;
  badge: string;
  icon: string;
  /** Answer-first intro paragraph. */
  lead: string;
  /** Second paragraph: why this industry is different, pointing at the evidence below. */
  leadMuted: string;
  /** One line for the hub card. */
  summary: string;
  caseStudies: string[];
  services: string[];
  /** Guide slugs relevant to this industry (may be empty). */
  guides: string[];
  /** Mention RealFoyer, Peregrine's own real estate product. */
  ownProduct?: boolean;
  /** Optional "what we build" cards for landing-page style industries. */
  whatWeBuild?: { title: string; body: string }[];
  /** Optional FAQ; rendered visibly and as FAQPage JSON-LD from the same array. */
  faq?: { question: string; answer: string }[];
  cta: { heading: string; text: string };
}

export const industries: Industry[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate & Proptech',
    title: 'Real Estate & Proptech Software Development',
    metaDescription:
      'Software for brokerages and proptech companies: MLS/IDX integration, real estate SaaS, AI search, lead qualification and investor portals, with case studies.',
    h1: 'Software Development for Real Estate and Proptech',
    badge: 'Real estate & proptech',
    icon: 'ri-building-line',
    lead:
      'We build software for brokerages, agent-website platforms and proptech companies: MLS data pipelines, IDX search, CRMs and lead handling, AI search and valuation, and investor and property management portals.',
    leadMuted:
      'Real estate software has problems general software firms tend to underestimate: every MLS board has its own fields and license rules, listing status has to be current, and agents expect search to be instant. The case studies below show how we handled those problems, and the service pages explain how we would approach yours.',
    summary:
      'MLS data pipelines and IDX search, brokerage and agent platforms, AI search and lead qualification, and investor portals.',
    caseStudies: ['w3re-ai-real-estate-platform', 'scaling-real-estate-saas-platform', 'proptech-investor-portal', 'self-storage-management-platform'],
    services: ['mls-idx-integration', 'investor-portal-development', 'saas-development', 'ai-automation', 'api-integration', 'cloud-devops'],
    guides: ['mls-idx-integration-cost', 'how-to-get-mls-data-access', 'cost-to-build-a-real-estate-platform', 'custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    ownProduct: true,
    cta: {
      heading: 'Planning a Real Estate Platform or Integration?',
      text: 'Tell us which MLS boards, user groups and features are in scope. Your first conversation is with an engineer, not a sales team.',
    },
  },
  {
    slug: 'self-storage',
    name: 'Self-Storage',
    title: 'Self-Storage Management Software Development',
    metaDescription:
      'Custom self-storage management software: reservations, Stripe billing, smart-lock gate access and multi-site occupancy dashboards, with a published case study.',
    h1: 'Custom Self-Storage Management Software Development',
    badge: 'Self-storage',
    icon: 'ri-building-3-line',
    lead:
      'Peregrine builds custom self-storage management software: one platform for unit reservations, tenant billing, gate and smart-lock access, and occupancy reporting across every facility an operator runs.',
    leadMuted:
      'An off-the-shelf facility management system is usually the faster start. Custom software is worth considering when reservations, billing and access control live in separate systems that do not talk to each other, or when facilities use different lock hardware. Our published case study covers exactly that situation for an operator running 150+ facilities.',
    summary:
      'One platform for reservations, Stripe billing, smart-lock access and multi-site occupancy dashboards.',
    caseStudies: ['self-storage-management-platform'],
    services: ['saas-development', 'api-integration', 'cloud-devops'],
    guides: [],
    whatWeBuild: [
      {
        title: 'Reservations, units and leases',
        body: 'Tenants, units, leases, payments and facility settings in one data store, with each operator\'s data isolated from every other operator\'s. In our case study this replaced separate reservation, billing and access systems that were reconciled by hand every morning.',
      },
      {
        title: 'Automated billing with Stripe',
        body: 'Recurring billing on Stripe with automatic retries. A failed autopay is detected immediately, retried with exponential backoff, and facility managers are alerted only when a person needs to step in.',
      },
      {
        title: 'Smart-lock and gate access',
        body: 'An IoT bridge that puts different lock hardware, whether Bluetooth LE, Wi-Fi or cellular, behind one API. When a tenant pays, access is granted automatically; when a lease expires, the lock deactivates. The case study platform integrated three lock vendors this way.',
      },
      {
        title: 'Multi-site occupancy and revenue dashboards',
        body: 'Live occupancy and revenue for each facility and for the whole portfolio, with configurable alerts, in place of weekly manual reports.',
      },
      {
        title: 'Tenant app and manager portal',
        body: 'A mobile app where tenants pay and control their lock, and a web portal for facility managers, with role-based access so managers, corporate admins and tenants each see only their own data.',
      },
    ],
    faq: [
      {
        question: 'Can custom self-storage software use Stripe for billing?',
        answer:
          'Yes. In our self-storage case study, billing runs on Stripe with automatic retries for failed payments, and payment events drive access: when a tenant pays, their lock access is granted without staff involvement.',
      },
      {
        question: 'Can one platform manage access control across facilities with different locks?',
        answer:
          'Yes. The approach is an abstraction layer that normalizes lock, unlock and status commands across vendors, so the application does not need to know which hardware a facility uses. The platform in our case study integrated three smart-lock vendors behind one API.',
      },
      {
        question: 'What reporting should self-storage management software provide?',
        answer:
          'At minimum, live occupancy and revenue per facility and across the portfolio, with alerts when a facility falls outside the range you set. In our case study this replaced occupancy figures that were updated weekly from manual reports.',
      },
      {
        question: 'When is custom software a better choice than an off-the-shelf facility management system?',
        answer:
          'An off-the-shelf system is usually the faster start and suits operators whose processes fit the product. Custom is worth considering when your reservation, billing and access systems cannot be integrated, when facilities run mixed lock hardware, or when you need portfolio reporting the product does not offer.',
      },
      {
        question: 'How long does a self-storage platform take to build?',
        answer:
          'It depends on the number of facilities, the lock hardware and what has to be migrated. The project in our case study ran for 10 months in four phases, with 10 pilot sites before the full rollout. That is one project, not a typical timeline; the discovery sprint sets yours.',
      },
    ],
    cta: {
      heading: 'Planning Self-Storage Software?',
      text: 'Tell us how many facilities you run, which lock hardware they use and which systems you want to replace. An engineer will tell you how we would approach it.',
    },
  },
  {
    slug: 'logistics',
    name: 'Logistics & Supply Chain',
    title: 'Logistics & Supply Chain Software Development',
    metaDescription:
      'Logistics software development: fleet tracking with driver apps and ETA alerts, and multi-carrier shipment visibility across carrier APIs, with case studies.',
    h1: 'Software Development for Logistics and Supply Chain',
    badge: 'Logistics & supply chain',
    icon: 'ri-truck-line',
    lead:
      'Peregrine builds software for logistics operators, 3PLs and freight brokerages: live fleet tracking with driver apps and customer ETA alerts, and shipment visibility platforms that normalize tracking data from many carrier APIs into one view.',
    leadMuted:
      'The two published case studies below cover both sides of that work: a GPS fleet management system for 500+ vehicles, and a visibility platform tracking 2M+ shipments across 12 carriers.',
    summary:
      'Fleet tracking with driver apps and ETA alerts, and multi-carrier shipment visibility.',
    caseStudies: ['supply-chain-visibility-platform', 'logistics-fleet-tracking-platform'],
    services: ['api-integration', 'saas-development', 'cloud-devops'],
    guides: [],
    cta: {
      heading: 'Building Logistics or Visibility Software?',
      text: 'Tell us which carriers, vehicles or systems you need to connect. An engineer will tell you how we would design the data model and the integration layer.',
    },
  },
  {
    slug: 'healthcare-insurance',
    name: 'Healthcare & Insurance',
    title: 'Healthcare & Insurance Software Development',
    metaDescription:
      'Healthcare and insurance software development: multi-location clinic management and claims automation with document extraction, with two published case studies.',
    h1: 'Software Development for Healthcare and Insurance',
    badge: 'Healthcare & insurance',
    icon: 'ri-heart-pulse-line',
    lead:
      'Peregrine builds software for healthcare networks and insurers: practice management that unifies patient records, telehealth, scheduling and insurance billing, and claims automation with document extraction and a full audit trail.',
    leadMuted:
      'Both published case studies below deal with regulated data: a HIPAA-compliant practice management platform across 35 clinics, and a claims automation platform processing 45K+ claims a year.',
    summary:
      'Clinic management across locations, and claims automation with document extraction and audit trails.',
    caseStudies: ['multi-location-clinic-management', 'insurance-claims-automation-platform'],
    services: ['saas-development', 'ai-automation', 'api-integration'],
    guides: [],
    cta: {
      heading: 'Building Healthcare or Insurance Software?',
      text: 'Tell us about the workflow, the systems involved and the compliance requirements. Your first conversation is with an engineer.',
    },
  },
  {
    slug: 'hr-recruitment',
    name: 'HR, Payroll & Recruitment',
    title: 'HR & Recruitment Software Development',
    metaDescription:
      'HR, payroll and recruitment software development: multi-state payroll with ADP and QuickBooks integration, and applicant tracking with resume parsing.',
    h1: 'Software Development for HR, Payroll and Recruitment',
    badge: 'HR, payroll & recruitment',
    icon: 'ri-user-3-line',
    lead:
      'Peregrine builds HR, payroll and recruitment software: payroll platforms with multi-state tax and benefits integration, and applicant tracking systems with resume parsing, candidate search and interview scheduling.',
    leadMuted:
      'The two published case studies below are both multi-company SaaS products: an HR and payroll platform for 85+ mid-market companies, and a recruitment ATS used by 200+ companies.',
    summary:
      'Multi-state payroll with accounting integrations, and applicant tracking with resume parsing.',
    caseStudies: ['recruitment-ats-platform', 'hr-payroll-saas-platform'],
    services: ['saas-development', 'api-integration', 'ai-automation'],
    guides: [],
    cta: {
      heading: 'Building HR or Recruitment Software?',
      text: 'Tell us what you are building and which payroll, accounting or scheduling systems it has to work with. An engineer will reply.',
    },
  },
  {
    slug: 'ecommerce-food-ordering',
    name: 'E-Commerce, Marketplaces & Food Ordering',
    title: 'E-Commerce & Ordering Platform Development',
    metaDescription:
      'Marketplace, food delivery and restaurant ordering platform development: multi-vendor payments, real-time dispatch and offline-first POS, with case studies.',
    h1: 'Software Development for E-Commerce, Marketplaces and Food Ordering',
    badge: 'E-commerce & ordering',
    icon: 'ri-store-2-line',
    lead:
      'Peregrine builds ordering platforms: multi-vendor marketplaces with split payments and vendor onboarding, food delivery platforms with real-time driver dispatch, and restaurant POS and online ordering that keeps working offline.',
    leadMuted:
      'The three published case studies below cover a bilingual Arabic and English marketplace for 400+ vendors, a delivery platform for 200+ restaurants, and POS and ordering across 120+ restaurant locations.',
    summary:
      'Multi-vendor marketplaces, food delivery with live dispatch, and restaurant POS and online ordering.',
    caseStudies: ['multi-vendor-ecommerce-marketplace', 'food-delivery-aggregator-platform', 'restaurant-pos-ordering-system'],
    services: ['saas-development', 'api-integration', 'shopify-development', 'cloud-devops'],
    guides: [],
    cta: {
      heading: 'Building a Marketplace or Ordering Platform?',
      text: 'Tell us about your vendors, order volume and the payment and delivery systems involved. An engineer will tell you how we would approach it.',
    },
  },
];

/** Verticals with a single published case study: shown on the hub, linking to the case study. */
export const singleCaseStudyVerticals: { name: string; caseStudy: string }[] = [
  { name: 'Legal', caseStudy: 'legal-document-automation-platform' },
  { name: 'Education', caseStudy: 'edtech-learning-platform' },
  { name: 'Manufacturing', caseStudy: 'manufacturing-erp-system' },
  { name: 'Events and ticketing', caseStudy: 'event-ticketing-platform' },
  { name: 'Fitness and wellness', caseStudy: 'fitness-wellness-subscription-app' },
  { name: 'Productivity and collaboration', caseStudy: 'realtime-collaboration-tool' },
];

export function getIndustry(slug: string): Industry {
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) throw new Error(`Unknown industry: ${slug}`);
  return industry;
}

/** The industry page a case study belongs to, if any. Self-storage wins over real estate
 *  for the self-storage case study, which is listed under both. */
export function industryForCaseStudy(caseStudySlug: string): Industry | undefined {
  const matches = industries.filter((i) => i.caseStudies.includes(caseStudySlug));
  return matches.find((i) => i.slug !== 'real-estate') ?? matches[0];
}
