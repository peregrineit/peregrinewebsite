// Service pages (/services and /services/[slug]) are generated from this file.
// The FAQ arrays feed both the visible FAQ and the FAQPage JSON-LD, so they always match.
//
// Owner confirmed the six services, including Odoo ERP (2026-09-29). Odoo is a
// capability page with no project claims until an Odoo case study exists.
// Engagement model confirmed by the owner (2026-09-30): see `engagementModel`.
// TODO(owner): prices. No prices are published and no Offer schema is emitted until the
//   owner supplies real Peregrine prices.

import { technologyBuyerGuides, technologyServices } from './technology-services';

export interface Service {
  slug: string;
  /** 'technology' pages are listed separately from the core services (hub, footer, about). */
  group?: 'technology';
  /** Short name for nav, cards and breadcrumbs. */
  name: string;
  /** schema.org serviceType */
  serviceType: string;
  /** <title> (the layout appends "| Peregrine IT Solutions"). */
  title: string;
  metaDescription: string;
  h1: string;
  /** One line on what Peregrine delivers (hub card). */
  offer: string;
  /** Answer-first intro: what it is, who it's for, what Peregrine delivers. */
  intro: string[];
  /** `proof`: slugs of the case studies that show this capability; rendered as links on the
   *  card. Set only where the card's body or the page's case-study notes already say so. */
  whatWeBuild: { title: string; body: string; proof?: string[] }[];
  process: { title: string; body: string }[];
  stack: string[];
  /** Case studies cited on the page, with what each one shows for this service. */
  caseStudies: { slug: string; note: string }[];
  /** Guides (src/data/guides.ts) linked from the page, most relevant first. */
  guides: string[];
  /** Date the page content last changed (YYYY-MM-DD); shown as "Last updated". */
  updated: string;
  faq: { question: string; answer: string }[];
  icon: string;
  /** 40-60-word direct answers that open each question-led section. Facts only from
   *  the existing site. In `cost`, [[guide]] becomes a link to the first guide. */
  answers: { includes: string; timeline: string; cost: string; work: string };
  /** "At a glance" table rows. `timeline` only where the site already states one. */
  glance: { delivered: string; timeline?: string };
}

/** Buyer guidance shown on a service or industry page. Vendor-neutral: it describes the
 *  buyer's situation and the inputs that change effort, never Peregrine's past work. */
export interface BuyerGuide {
  /** "A good fit when": situations the service suits. */
  fit: string[];
  /** "Probably not the right fit when", with an optional link to the cheaper or better route. */
  notFit: { text: string; link?: { href: string; label: string } }[];
  /** Inputs that change the effort. No prices and no durations. */
  scope: { factor: string; effect: string }[];
  /** One paragraph of guidance on a sensible first phase. */
  firstPhase: string;
  /** What to have ready for the scoping call. */
  bring: string[];
}

/** Shared by every service page. Facts only from the existing site (discovery call,
 *  discovery sprint, 2-week sprints with weekly demos, scoped estimates). The only
 *  reply-time promise on the site is "within 1 business day". */
export const engagement = {
  heading: 'How an Engagement Works',
  paragraphs: [
    'Every project starts with a 30-minute technical discovery call with an engineer, not a salesperson. We use it to understand the system you have, the outcome you need and whether we are the right team for it.',
    'Larger builds begin with a discovery sprint: we map requirements, design the architecture and hand you a written technical plan before development starts. Development then runs in two-week sprints with weekly demos, so you see working software early and can change priorities at each checkpoint.',
    'Smaller, well-defined tasks such as a single integration, a performance fix or an automation can be requested through the quick project form, and we reply within 1 business day and follow with a scoped estimate.',
  ],
  pricingNote: 'Pricing is scoped per project after the discovery call.',
};

/** Engagement model, confirmed by the owner (2026-09-30). Used in the "At a glance"
 *  tables, the cost answers and the homepage FAQ. */
export const engagementModel =
  'Fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call';

/** IP ownership, confirmed by the owner (2026-09-30). Appended to every service page's
 *  FAQ (visible and FAQPage JSON-LD). */
export const ipFaq = {
  question: 'Who owns the IP rights to what Peregrine builds?',
  answer:
    'You do. Once the work is paid for, the client owns the intellectual property (IP) rights to what Peregrine builds for the project, whether it is delivered as a fixed-scope project, a monthly retainer or a combination of the two.',
};

/** Direct answer for "How does a <service> project start?"; the same facts as `engagement`. */
export const startAnswer = (name: string) =>
  `A Peregrine ${name} project starts with a 30-minute technical discovery call with an engineer, not a salesperson. Larger builds then begin with a discovery sprint that maps requirements, designs the architecture and produces a written technical plan. Smaller, well-defined tasks can use the quick project form for a scoped estimate.`;

const coreServiceList: Service[] = [
  {
    slug: 'saas-development',
    name: 'SaaS Development',
    serviceType: 'SaaS application development',
    title: 'SaaS Development for Real Estate & Proptech',
    metaDescription:
      'Multi-tenant SaaS development for real estate, proptech and B2B companies: architecture, billing, integrations and scaling, backed by published case studies.',
    h1: 'SaaS Development for Real Estate, Proptech and B2B Products',
    offer: 'Multi-tenant SaaS platforms, from MVP architecture to scaling an existing product.',
    intro: [
      'SaaS development is the design and build of a subscription software product that many customers use from one shared platform, each with their own data, users and settings.',
      'We work with real estate and proptech companies and with B2B software teams in the US and Canada who need a production-grade platform: either a new product built on an architecture that will scale, or an existing MVP that is starting to break under real customers.',
      'Peregrine delivers the whole platform: multi-tenant data model, authentication and roles, billing, the integrations your customers expect, and the infrastructure to run it.',
    ],
    whatWeBuild: [
      {
        title: 'Multi-tenant architecture',
        body: 'Tenant isolation designed in from the start: per-customer data scoping, configuration and roles, so one customer\'s settings or data can never leak into another\'s. When we rebuilt a real estate SaaS platform, shared flat collections were one of the reasons it could not grow past a handful of agents.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'White-label and self-service products',
        body: 'Platforms where each customer gets their own branded experience, such as agent websites, career pages or tenant apps, all running from one codebase and one backend that you maintain once.',
      },
      {
        title: 'Billing and subscriptions',
        body: 'Stripe-based subscriptions, one-time purchases and usage billing, with webhook handling that keeps access, invoices and renewals in sync and retries failed payments instead of letting them fail silently.',
      },
      {
        title: 'Search and data-heavy features',
        body: 'Fast search over large datasets using Elasticsearch and Redis in front of the primary database, for listings, candidates, documents or inventory where users expect instant filtering and suggestions.',
      },
      {
        title: 'Admin, reporting and customer portals',
        body: 'The internal side of a SaaS business: admin consoles, usage and revenue dashboards, audit logs, and customer-facing portals with role-based access.',
      },
    ],
    process: [
      { title: 'Discovery and architecture', body: 'We audit the existing product or requirements, identify the scaling risks, and design the data model, tenancy strategy and infrastructure before writing features.' },
      { title: 'Core platform', body: 'Authentication, roles, tenancy, billing and the first product workflows, delivered in two-week sprints with a demo every week.' },
      { title: 'Integrations and hardening', body: 'Third-party integrations, background jobs with retry logic, load testing against realistic traffic, and monitoring.' },
      { title: 'Launch and migration', body: 'Phased rollout, usually a pilot group of customers first, with data migration from the old system and runbooks for your team.' },
    ],
    stack: ['Next.js', 'React', 'React Native', 'Node.js', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Stripe', 'AWS'],
    caseStudies: [
      { slug: 'scaling-real-estate-saas-platform', note: 'Rebuilt a white-label agent website platform on a three-layer data architecture (MongoDB, Elasticsearch, Redis) with proper multi-tenant isolation; the case study reports growth from 5 to 200+ agents.' },
      { slug: 'self-storage-management-platform', note: 'A multi-tenant SaaS for self-storage operators combining reservations, Stripe billing and smart-lock access control behind one event-driven backend.' },
      { slug: 'recruitment-ats-platform', note: 'A multi-tenant applicant tracking system with per-company pipelines, branded career pages, resume parsing and Elasticsearch candidate search.' },
    ],
    guides: ['cost-to-build-a-real-estate-platform', 'custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    answers: {
      includes:
        'Peregrine\'s SaaS development covers the whole platform: a multi-tenant data model, authentication and roles, Stripe billing, search over large datasets, admin and reporting tools, the integrations your customers expect, and the cloud infrastructure it runs on. We build new products and also take over existing MVPs that are starting to break under real customers.',
      timeline:
        'A typical SaaS MVP from Peregrine ships in 4 to 6 weeks, covering core features, authentication, billing, multi-tenancy and deployment. Complex SaaS platforms with advanced integrations take 8 to 12 weeks. The discovery sprint sets the actual schedule, and development runs in two-week sprints with a demo every week.',
      cost:
        'Peregrine works on SaaS development as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on features, integrations, data volume and whether an existing product is being rebuilt, and we do not publish a price list. For sourced market figures, read our guide [[guide]].',
      work:
        'Three published case studies show Peregrine\'s SaaS development work: a real estate SaaS platform rebuilt with proper multi-tenant isolation that grew from 5 to 200+ agents, a multi-tenant self-storage platform with Stripe billing and smart-lock access, and a multi-tenant applicant tracking system with branded career pages and resume parsing.',
    },
    glance: {
      delivered: 'Multi-tenant platform: data model, authentication and roles, billing, search, admin and reporting, integrations and cloud infrastructure',
      // Owner-confirmed (2026-09-30).
      timeline: 'Typical MVP 4 to 6 weeks; complex platforms 8 to 12 weeks',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'What does multi-tenant mean for a SaaS product?',
        answer: 'Multi-tenant means all of your customers run on one shared application and infrastructure, while each customer\'s data, users and settings stay isolated from the others. It keeps hosting and maintenance costs manageable because you deploy one platform, but the isolation has to be designed into the data model and the API from the beginning.',
      },
      {
        question: 'Can you take over and scale an existing SaaS MVP instead of starting over?',
        answer: 'Yes. We start with a code and architecture audit to find what is actually limiting growth, which is often the data model, search or background jobs rather than hosting. Then we rebuild the parts that need it while the product stays live. Our real estate SaaS case study is an example of this approach.',
      },
      {
        question: 'How do you handle subscription billing?',
        answer: 'We usually build on Stripe for subscriptions, one-time purchases and invoicing. The important part is the webhook handling: payment events update access, invoices and renewals automatically, and failed payments are retried and surfaced instead of being missed.',
      },
      {
        question: 'Can each of our customers have their own branding?',
        answer: 'Yes. White-label platforms serve every customer from one codebase and one backend, while each customer gets its own theme, domain and content. Our real estate SaaS case study runs branded agent websites this way, and our ATS case study gives each company its own career pages.',
      },
      {
        question: 'Do you only build real estate software?',
        answer: 'No. Real estate and proptech are a large share of our work, but our case studies also cover HR and payroll, recruitment, logistics, healthcare, education and e-commerce platforms. The multi-tenant patterns are the same across industries.',
      },
    ],
    icon: 'ri-cloud-line',
  },
  {
    slug: 'api-integration',
    name: 'API Integration',
    serviceType: 'API integration and development',
    title: 'API Integration for CRMs, ERPs & Carriers',
    metaDescription:
      'API integration connecting CRMs, ERPs, payroll, e-signature and carrier APIs into reliable workflows, with case studies on 12 carrier APIs and DocuSign.',
    h1: 'API Integration Services That Connect Your Systems',
    offer: 'Reliable integrations between your product, your vendors and your internal systems.',
    intro: [
      'API integration connects separate software systems so data moves between them automatically instead of being re-typed, exported to spreadsheets or synced overnight.',
      'It is for companies whose operations depend on several vendors and tools, such as CRMs, ERPs, payroll, payments, e-signature or shipping carriers, and whose teams are losing time reconciling them by hand.',
      'Peregrine designs and builds the integration layer: adapters for each external API, a normalized internal data model, webhooks and polling with retry logic, and monitoring so failures are visible before your customers notice them.',
    ],
    whatWeBuild: [
      {
        title: 'Integration layers across many vendors',
        body: 'An abstraction layer that hides each vendor\'s authentication, rate limits and payload format behind one internal schema, so adding the next vendor is an adapter and a config file rather than a change to your core application.',
        proof: ['supply-chain-visibility-platform'],
      },
      {
        title: 'Webhooks, polling and retry queues',
        body: 'Event ingestion that works whichever way the vendor supports it, with deduplication, exponential backoff and dead-letter handling so a vendor outage delays data instead of losing it.',
        proof: ['supply-chain-visibility-platform'],
      },
      {
        title: 'Finance, payroll and HR integrations',
        body: 'Syncing deductions, ledger entries and employee data with providers such as ADP and QuickBooks, with reconciliation reports so mismatches are caught before a pay run.',
        proof: ['hr-payroll-saas-platform'],
      },
      {
        title: 'E-signature and document workflows',
        body: 'DocuSign envelope creation, signing order and webhook callbacks wired into your own records, with a complete audit trail of who signed what and when.',
        proof: ['legal-document-automation-platform'],
      },
      {
        title: 'Public and partner APIs',
        body: 'REST or GraphQL APIs for your own product, with authentication, rate limiting, versioning and documentation that partners can build against.',
      },
    ],
    process: [
      { title: 'Map the systems', body: 'We document every API involved: authentication, endpoints, rate limits, webhook support and data formats, and agree on the canonical data model.' },
      { title: 'Build adapters', body: 'One adapter per external system, each with its own retry and rate-limit handling, tested against the vendor\'s sandbox where one exists.' },
      { title: 'Reconcile and monitor', body: 'Reconciliation jobs and alerts that compare what each system believes, so silent drift becomes a visible exception.' },
      { title: 'Roll out gradually', body: 'Pilot with a subset of accounts or records, compare results with the old process, then switch over.' },
    ],
    stack: ['Node.js', 'REST', 'GraphQL', 'Webhooks', 'PostgreSQL', 'TimescaleDB', 'Redis', 'DocuSign API', 'ADP API', 'QuickBooks API', 'Stripe', 'n8n'],
    caseStudies: [
      { slug: 'supply-chain-visibility-platform', note: 'A carrier abstraction layer normalizing 12 carrier APIs, with webhook and polling ingestion, per-carrier rate limiting and a retry queue with exponential backoff.' },
      { slug: 'hr-payroll-saas-platform', note: 'Payroll integrations with ADP and QuickBooks for deductions and ledger export, plus DocuSign for I-9 and W-4 forms, with reconciliation webhooks.' },
      { slug: 'legal-document-automation-platform', note: 'DocuSign integration for multi-party signing with webhook handlers for envelope events and retries that keep in-flight documents moving during outages.' },
    ],
    guides: ['custom-saas-vs-off-the-shelf-crm-for-brokerages'],
    answers: {
      includes:
        'Peregrine\'s API integration service builds the layer between your systems: one adapter per vendor behind a normalized internal data model, webhooks and polling with retry queues, reconciliation jobs, and monitoring. It covers CRMs, ERPs, payroll and finance tools, e-signature, shipping carriers, and public or partner APIs for your own product.',
      timeline:
        'Peregrine sets the timeline for an API integration after mapping every system involved: its authentication, endpoints, rate limits, webhook support and data formats. The number of vendors and the quality of their sandboxes drive the schedule. Work then runs in two-week sprints with weekly demos, and rollout starts with a pilot group.',
      cost:
        'Peregrine works on API integration as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on how many systems are involved and how reliable their APIs are. A single, well-defined integration can get a scoped estimate. For CRM build-or-buy economics, see [[guide]].',
      work:
        'Three published case studies show Peregrine\'s API integration work: a supply chain platform normalizing 12 carrier APIs with retry queues and per-carrier rate limits, an HR and payroll SaaS integrated with ADP, QuickBooks and DocuSign, and a legal document platform whose DocuSign webhooks keep multi-party signing moving during outages.',
    },
    glance: {
      delivered: 'Vendor adapters, a normalized data model, webhooks and polling with retries, reconciliation jobs, monitoring, and public or partner APIs',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'Should we use a no-code tool like Zapier or build a custom integration?',
        answer: 'For low-volume workflows between popular SaaS tools, a no-code tool such as Zapier or n8n is often the fastest and cheapest option, and we build those too. A custom integration makes sense when volume is high, when you need retries and reconciliation you can trust, or when the data feeds a core product your customers rely on.',
      },
      {
        question: 'What happens when a vendor\'s API goes down?',
        answer: 'A well-built integration treats outages as normal. Calls that fail go to a retry queue with exponential backoff, incoming events are deduplicated when the vendor resends them, and an alert fires if a backlog grows. Work already in progress continues once the vendor recovers.',
      },
      {
        question: 'Can you integrate with a system that has no API?',
        answer: 'Often, yes. Options include scheduled file exchange (CSV or SFTP), database-level replication where the vendor allows it, or email parsing. They are less real-time than an API, so we agree on the delay that is acceptable before choosing one.',
      },
      {
        question: 'How do you keep data consistent across systems?',
        answer: 'We define one canonical data model, decide which system is the source of truth for each field, and run reconciliation jobs that compare records and flag differences. That turns silent drift into a list of exceptions someone can act on.',
      },
      {
        question: 'Do you build APIs for our own product as well?',
        answer: 'Yes. We design REST or GraphQL APIs with authentication, rate limiting, versioning and documentation, so partners and customers can integrate with your platform.',
      },
    ],
    icon: 'ri-links-line',
  },
  {
    slug: 'mls-idx-integration',
    name: 'MLS & IDX Integration',
    serviceType: 'MLS and IDX data integration',
    title: 'RESO Web API & MLS Data Feed Development',
    metaDescription:
      'RESO Web API and MLS data feed development for proptech and brokerage software: feed ingestion, multi-MLS normalization, sync and listing search.',
    h1: 'RESO Web API and MLS Data Feed Development',
    offer: 'MLS data pipelines and IDX search for brokerage websites and proptech products.',
    intro: [
      'RESO Web API and MLS data feed development is building the software that pulls listing data from MLS boards into your own product, keeps it current, and makes it searchable. The RESO Web API is the current standard for that data; older boards may still offer RETS.',
      'It is for proptech companies, agent-website and brokerage platforms, and in-house brokerage teams that need MLS data from one or several boards in the US or Canada inside software they control, rather than a turnkey IDX plugin.',
      'Peregrine builds the pipeline end to end: feed ingestion over the RESO Web API or RETS, normalization across boards, deduplication, a fast search layer, and the IDX website or app on top. We also build and operate our own real estate product, RealFoyer.',
    ],
    whatWeBuild: [
      {
        title: 'Feed ingestion and sync',
        body: 'Scheduled and incremental sync from RESO Web API or legacy RETS feeds, with delta detection so only changed records are processed, per-feed error isolation, and retries so one failing board does not stall the others.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'Multi-MLS normalization',
        body: 'Each board uses its own fields and conventions. We map them into one schema and deduplicate properties listed in more than one MLS, so agents and buyers see a single clean record.',
        proof: ['w3re-ai-real-estate-platform'],
      },
      {
        title: 'IDX search and property pages',
        body: 'Search with filters, map and geo queries, and auto-suggest, backed by Elasticsearch and a cache, while property detail pages read the latest status so sold listings do not appear as active.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'Agent and brokerage websites',
        body: 'Branded IDX websites for individual agents or whole brokerages from one platform, with lead capture feeding the CRM.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'Natural-language search and valuation',
        body: 'On top of clean MLS data we can add conversational search and automated valuation models; see our AI automation service.',
        proof: ['w3re-ai-real-estate-platform'],
      },
    ],
    process: [
      { title: 'Board and license review', body: 'We list the MLS boards involved, the feed type each offers, and the display and refresh rules in their data license, since those rules shape the architecture.' },
      { title: 'Schema mapping', body: 'Field-by-field mapping from each board into the normalized schema, including status values, media and open houses.' },
      { title: 'Pipeline and search', body: 'Build the sync engine, search index and cache, then load-test with realistic listing volumes.' },
      { title: 'Frontend and launch', body: 'IDX pages, lead capture and CRM hooks, followed by monitoring of every feed after go-live.' },
    ],
    stack: ['RESO Web API', 'RETS', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Apache Kafka', 'Next.js', 'Mapbox GL'],
    caseStudies: [
      { slug: 'w3re-ai-real-estate-platform', note: 'A unified pipeline for four MLS systems (NTREIS, Stellar MLS, ARMLS and REcolorado) that normalizes schemas and deduplicates cross-listed properties.' },
      { slug: 'scaling-real-estate-saas-platform', note: 'Rebuilt the MLS sync engine for US and Canadian boards with delta detection, retry logic and per-feed error isolation, feeding Elasticsearch search for agent IDX sites.' },
    ],
    guides: ['mls-idx-integration-cost', 'how-to-get-mls-data-access', 'idx-vendor-vs-custom-build', 'reso-web-api-vs-rets', 'mls-data-pipeline-architecture', 'mls-data-access-canada', 'cost-to-build-a-real-estate-platform'],
    answers: {
      includes:
        'Peregrine\'s MLS and IDX integration service builds the full listing pipeline: feed ingestion over the RESO Web API or RETS, normalization across MLS boards, deduplication of cross-listed properties, a fast search layer, and the IDX website or app on top, with lead capture feeding your CRM. We also build and operate our own real estate product, RealFoyer.',
      timeline:
        'Peregrine sets the timeline for an MLS feed project after reviewing the boards involved, the feed type each offers and the display and refresh rules in each data license. Data access approval is set by each MLS, not by us. Development then runs in two-week sprints with weekly demos, and every feed is monitored after launch.',
      cost:
        'Peregrine works on MLS and IDX integration as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on the number of boards and what you build on top; MLS data fees go to each board. See [[guide]] for published fees.',
      work:
        'Two published case studies show Peregrine\'s MLS and IDX work: the W3|re platform, which unifies four MLS systems (NTREIS, Stellar MLS, ARMLS and REcolorado) and deduplicates cross-listed properties, and a real estate SaaS whose rebuilt MLS sync engine for US and Canadian boards feeds Elasticsearch search for agent IDX websites.',
    },
    glance: {
      delivered: 'MLS feed ingestion (RESO Web API or RETS), multi-board normalization and deduplication, listing search, and IDX websites with lead capture',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'What is the RESO Web API, and how is it different from RETS?',
        answer: 'Both are standards for transferring MLS data. RETS is the older, XML-based standard; the RESO Web API is its modern replacement, built on RESTful web conventions and the RESO Data Dictionary for field names. Most boards now offer the Web API, and new integrations should use it wherever it is available.',
      },
      {
        question: 'What is the difference between IDX and VOW?',
        answer: 'IDX lets a broker display other brokers\' listings on a public website under MLS display rules. A VOW (Virtual Office Website) is a password-protected site for registered consumers that can show more data, such as some sold information, under stricter rules. Which one you need depends on your MLS and the data you want to show.',
      },
      {
        question: 'Can you build one data feed from several MLS boards?',
        answer: 'Yes. Each board is ingested separately and mapped into one schema, and properties listed on more than one board are deduplicated. Our W3|re case study combines four MLS systems this way.',
      },
      {
        question: 'How current can MLS feed data be?',
        answer: 'It depends on the feed and on your MLS rules. Many boards allow frequent incremental updates through the Web API; RETS feeds are usually polled on a schedule. We design the sync around the refresh rate your license requires and your users expect.',
      },
      {
        question: 'Do we need our own MLS data license before development starts?',
        answer: 'Usually the broker or the platform applies for data access with each MLS and signs its license agreement. We can help with the technical parts of the application, but the license itself is between your company and the board.',
      },
    ],
    icon: 'ri-home-4-line',
  },
  {
    slug: 'investor-portal-development',
    name: 'Investor Portal Development',
    serviceType: 'Investor portal development',
    title: 'Investor Portal Development for Real Estate',
    metaDescription:
      'Custom investor portal development for real estate firms and funds: role-based access, watermarked documents, capital calls and distribution reporting.',
    h1: 'Custom Investor Portal Development for Real Estate Firms and Funds',
    // One published case study backs this page (proptech-investor-portal). Every feature
    // and figure below comes from it; the page says so rather than implying a practice.
    offer: 'Secure investor portals with role-based access, document management and automated reporting.',
    intro: [
      'An investor portal is a secure, self-service website where limited partners and other investors log in to see their own investments, documents, distributions and project updates, instead of receiving them by email.',
      'It is for real estate development firms, sponsors and funds whose investor relations still run on email, shared folders and quarterly PDF reports, and whose investors participate through different funds, co-investments and SPVs.',
      'Peregrine builds the portal end to end: the permission model, the document system with watermarking and an audit trail, capital call and distribution workflows, and the reporting engine behind the quarterly reports.',
    ],
    whatWeBuild: [
      {
        title: 'Role-based access by entity',
        body: 'Permissions modeled on the investment structure rather than on individual users, so an investor who is an LP in one fund and a co-investor in a single deal sees exactly those holdings. Our case study portal uses six role types, including family office administrators with delegate access, and gates every page and document at the API level.',
        proof: ['proptech-investor-portal'],
      },
      {
        title: 'Document management with watermarking',
        body: 'A document library for K-1s, distribution notices and offering documents, with each view or download watermarked with the investor\'s name, a timestamp and a tracking ID, version control, and a complete audit trail of who accessed what.',
      },
      {
        title: 'Capital calls and e-signature',
        body: 'Subscription documents and capital call notices sent for signature through DocuSign from inside the portal. In our case study, capital call processing went from 12 days to 3 days with the e-signature workflow.',
        proof: ['proptech-investor-portal'],
      },
      {
        title: 'Distribution and performance reporting',
        body: 'Automated quarterly reports with IRR, equity multiple and distribution waterfall calculations taken from one system of record, exportable to PDF, plus distribution and payment history for each investor.',
      },
      {
        title: 'Investor dashboard',
        body: 'A responsive dashboard with a personalized view per investor: fund performance charts, the document library, a project milestone tracker and distribution history.',
      },
      {
        title: 'Data migration and onboarding',
        body: 'Moving historical documents and investor records into the portal and onboarding existing investors. In our case study that meant three years of documents and more than 280 investors.',
        proof: ['proptech-investor-portal'],
      },
    ],
    process: [
      { title: 'Requirements and access modeling', body: 'We map the fund structure, investor hierarchies and document types, then design the role model, watermarking and audit trail before anything is built.' },
      { title: 'Core portal and documents', body: 'The investor dashboard, document management and watermarking pipeline, and the data model for multi-fund investment tracking.' },
      { title: 'Reporting and integrations', body: 'Report generation with IRR and waterfall calculations, e-signature for subscription documents and capital calls, and distribution tracking.' },
      { title: 'Security review and launch', body: 'Penetration testing and a security audit, migration of historical documents and data, then investor onboarding.' },
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'AWS S3', 'DocuSign API', 'Stripe', 'Chart.js'],
    caseStudies: [
      { slug: 'proptech-investor-portal', note: 'A role-based investor portal for a real estate development firm with a $450M portfolio and 280+ investors: watermarked documents, capital calls through DocuSign and automated quarterly reporting.' },
    ],
    guides: ['investor-portal-vs-file-sharing', 'investor-portal-security-checklist'],
    answers: {
      includes:
        'Peregrine\'s investor portal development covers role-based access modeled on your fund, co-investment and SPV structure, a document library with per-investor watermarking and an audit trail, capital calls and subscription documents with e-signature, automated distribution and performance reporting, an investor dashboard, and migration of your existing documents and investor records.',
      timeline:
        'Peregrine sets the timeline for an investor portal after mapping the fund structure, investor hierarchies and document types, because the permission model drives most of the work. The portal in our published case study took six months in four phases; that is one project, not a typical timeline.',
      cost:
        'Peregrine works on investor portal development as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on how complex the fund and permission structure is, the reporting calculations needed and how much history has to be migrated. We do not publish a price list.',
      work:
        'One published case study shows Peregrine\'s investor portal work: a portal for a real estate development firm with a $450M portfolio and 280+ investors, with six role types, watermarked documents and automated quarterly reports. It is a single project, so we would rather walk you through it than generalize from it.',
    },
    glance: {
      delivered: 'Role-based investor portal: access model, watermarked document library, capital calls with e-signature, distribution and performance reporting, migration',
      // TODO(owner): typical timeline for this service; the case study's six months is one project.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'How is an investor portal different from sharing files through Dropbox or email?',
        answer: 'File sharing gives everyone with the link the same files. A portal knows who each investor is and what they hold, so each person sees only their own documents and figures, every access is logged, and downloads can be watermarked. In our case study, the firm had been sharing K-1s and offering documents through shared links with no access controls or audit trail.',
      },
      {
        question: 'Can the portal handle investors in several funds, co-investments and SPVs?',
        answer: 'Yes. Permissions are modeled at the entity level, not the user level, so one investor can be an LP in a fund, a co-investor in a single deal and have an administrator with read-only access to both, without custom code for each case.',
      },
      {
        question: 'How are confidential documents protected?',
        answer: 'Documents are stored encrypted and served through signed URLs, access is permission-gated at the API level, and each viewed or downloaded copy is watermarked with the investor\'s name, a timestamp and a tracking ID. If a document leaks, the audit trail shows whose copy it was.',
      },
      {
        question: 'Can the portal produce our quarterly investor reports?',
        answer: 'Yes. Distribution waterfall, IRR and equity multiple calculations run from the portal\'s own data, so reports are generated rather than assembled by hand. In our case study, quarterly report preparation went from three weeks to two hours.',
      },
      {
        question: 'Should we buy an off-the-shelf investor portal instead of building one?',
        answer: 'Often, yes. Off-the-shelf investor portals suit firms whose fund structures and reports fit the product. A custom portal is worth considering when your participation structures, calculations or document rules do not fit, or when the portal has to connect to systems the product does not support.',
      },
    ],
    icon: 'ri-funds-box-line',
  },
  {
    slug: 'ai-automation',
    name: 'AI Automation',
    serviceType: 'AI and workflow automation',
    title: 'AI Automation & LLM Integration',
    metaDescription:
      'AI automation for real estate and B2B teams: LLM search and assistants, document extraction, lead qualification and workflow automation.',
    h1: 'AI Automation for Real Estate and B2B Operations',
    offer: 'AI features and automated workflows scoped to a specific business problem.',
    intro: [
      'AI automation uses machine learning and large language models to take over repetitive work such as reading documents, answering routine questions, qualifying leads or searching large datasets in plain language.',
      'It is for real estate and B2B teams with a clear, repetitive process that costs staff hours today, and with data they are allowed to use.',
      'Peregrine scopes each project to that business problem, builds the model or LLM pipeline, and wires it into your existing systems with human review where accuracy matters.',
    ],
    whatWeBuild: [
      {
        title: 'Natural-language search',
        body: 'Search that understands requests written the way people talk, parses them into structured filters and returns ranked results from your own data, whether listings, products or documents.',
        proof: ['w3re-ai-real-estate-platform'],
      },
      {
        title: 'Lead qualification assistants',
        body: 'Chat assistants that respond to inbound leads immediately, ask qualifying questions and route qualified conversations to the right person in your CRM.',
        proof: ['w3re-ai-real-estate-platform'],
      },
      {
        title: 'Document extraction',
        body: 'OCR and extraction pipelines that turn PDFs, scans and forms into structured records, with validation rules and confidence thresholds that send uncertain cases to a person.',
        proof: ['insurance-claims-automation-platform'],
      },
      {
        title: 'Predictive models',
        body: 'Valuation, scoring and forecasting models trained on your historical data, with the evaluation set and error metrics agreed before training.',
        proof: ['w3re-ai-real-estate-platform'],
      },
      {
        title: 'Workflow automation',
        body: 'Automations with n8n, Zapier or custom services that connect AI steps with your existing tools, replacing manual hand-offs.',
      },
    ],
    process: [
      { title: 'Pick the problem', body: 'We identify one workflow, measure how it performs today, and agree what "good enough" accuracy means before any model is chosen.' },
      { title: 'Prototype on real data', body: 'A short prototype on a sample of your data shows whether the approach works, before a full build is committed.' },
      { title: 'Build with human review', body: 'Production pipeline with confidence thresholds, review queues and logging so every automated decision can be traced.' },
      { title: 'Measure and tune', body: 'After launch we track accuracy and exceptions and retrain or adjust prompts as the data changes.' },
    ],
    stack: ['Python', 'LangChain', 'Pinecone', 'TensorFlow', 'XGBoost', 'AWS SageMaker', 'AWS Textract', 'Node.js', 'PostgreSQL', 'n8n'],
    caseStudies: [
      { slug: 'w3re-ai-real-estate-platform', note: 'Conversational property search with a fine-tuned LLM, an automated valuation model, and a lead qualification chatbot for a multi-market brokerage.' },
      { slug: 'insurance-claims-automation-platform', note: 'Claims document extraction with AWS Textract, custom validators and confidence thresholds that route uncertain extractions to human review.' },
      { slug: 'recruitment-ats-platform', note: 'Resume parsing that extracts structured candidate data from PDFs and Word files and makes it searchable with Elasticsearch.' },
    ],
    guides: [],
    answers: {
      includes:
        'Peregrine\'s AI automation service covers natural-language search over your own data, lead qualification assistants, document extraction from PDFs and scans, predictive models such as valuation or scoring, and workflow automation with n8n, Zapier or custom services. Each project targets one business problem and keeps human review where accuracy matters.',
      timeline:
        'Peregrine does not commit to an AI automation timeline before a prototype. We first pick one workflow and agree what accuracy is good enough, then run a short prototype on a sample of your data to show whether the approach works. The production build follows only once the prototype proves out, in two-week sprints.',
      cost:
        'Peregrine works on AI automation as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call and, for most work, after a short prototype on your own data. Cost depends on the workflow, the data available and how much human review the process needs. We do not publish a price list.',
      work:
        'Three published case studies show Peregrine\'s AI automation work: the W3|re real estate platform with conversational property search, an automated valuation model and a lead qualification chatbot; an insurance claims platform that extracts documents with AWS Textract and routes uncertain cases to people; and an ATS with resume parsing and candidate search.',
    },
    glance: {
      delivered: 'Natural-language search, lead qualification assistants, document extraction, predictive models and workflow automation, with human review',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'Where does AI automation actually help?',
        answer: 'It helps most in high-volume, repetitive work with a clear right answer: extracting fields from documents, answering routine questions, sorting and qualifying leads, or turning plain-language requests into database queries. It helps least where decisions are rare, high-stakes and hard to define.',
      },
      {
        question: 'How do you prevent an AI system from making things up?',
        answer: 'We ground answers in your own data through retrieval, constrain outputs to structured formats, validate them against business rules, and send low-confidence results to a person. Every automated decision is logged so it can be reviewed.',
      },
      {
        question: 'Will our data be used to train public models?',
        answer: 'It should not be. The major LLM API providers offer business terms that exclude customer data from training, and models can also be hosted in your own cloud account. Which option fits is agreed, in writing, before the project starts.',
      },
      {
        question: 'Do we need a lot of data to start?',
        answer: 'For LLM-based search, assistants and document extraction, you can often start with the data you already have. Predictive models such as valuation or scoring need enough historical examples, which we check during the prototype.',
      },
      {
        question: 'Can AI features be added to our existing software?',
        answer: 'Yes. Most of our AI work plugs into an existing CRM, website or internal tool through its API rather than replacing it.',
      },
    ],
    icon: 'ri-robot-2-line',
  },
  {
    slug: 'cloud-devops',
    name: 'Cloud & DevOps',
    serviceType: 'Cloud infrastructure and DevOps',
    title: 'Cloud & DevOps for SaaS Platforms',
    metaDescription:
      'Cloud architecture and DevOps for SaaS platforms: AWS infrastructure, CI/CD, caching and CDN, load testing and monitoring, with case studies.',
    h1: 'Cloud Infrastructure and DevOps for Growing SaaS Platforms',
    offer: 'Cloud architecture, CI/CD and performance work for platforms that need to scale.',
    intro: [
      'Cloud and DevOps work covers how your software is hosted, deployed, scaled and monitored: the infrastructure, the release pipeline and the tooling that tells you when something is wrong.',
      'It is for SaaS and platform teams whose product is slowing down under growth, whose releases are manual or risky, or who are moving from a single server to managed cloud services.',
      'Peregrine designs the cloud architecture, automates builds and deployments, adds caching and a CDN where they help, load-tests before launch, and sets up monitoring and alerts.',
    ],
    whatWeBuild: [
      {
        title: 'Cloud architecture',
        body: 'AWS architectures using managed services where they reduce operational load, such as S3, CloudFront, Lambda and managed databases, with separate environments for staging and production.',
      },
      {
        title: 'CI/CD pipelines',
        body: 'Automated build, test and deployment with GitHub Actions, GitLab CI or Jenkins, so every change goes through the same checks and releases can be rolled back.',
      },
      {
        title: 'Performance and caching',
        body: 'Profiling the slow paths, then adding the right layer: search indexes, Redis caches, CDN delivery for static and media assets, and database query and index work.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'Media and streaming pipelines',
        body: 'Event-driven processing for uploads, such as video transcoding to adaptive-bitrate HLS delivered through a CDN with signed URLs.',
        proof: ['edtech-learning-platform'],
      },
      {
        title: 'Monitoring and reliability',
        body: 'Metrics, logs and alerting, plus load tests that simulate realistic traffic before launch rather than after an outage.',
        proof: ['self-storage-management-platform'],
      },
    ],
    process: [
      { title: 'Assess', body: 'Review the current hosting, release process, costs and incidents, and identify the few changes with the most impact.' },
      { title: 'Design', body: 'Target architecture and migration plan, including how to move without downtime.' },
      { title: 'Automate and migrate', body: 'Infrastructure and pipelines built step by step, with each environment moved and verified in turn.' },
      { title: 'Load-test and hand over', body: 'Load tests against realistic traffic, dashboards and alerts, and runbooks for your team.' },
    ],
    stack: ['AWS (S3, CloudFront, Lambda, EKS, SES)', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Redis', 'Elasticsearch', 'Linode / VPS'],
    caseStudies: [
      { slug: 'scaling-real-estate-saas-platform', note: 'Split USA, Canada and staging environments, added Elasticsearch and a Redis cache, served images through S3 and a CDN, and load-tested with simulated 200-agent traffic before go-live.' },
      { slug: 'edtech-learning-platform', note: 'An event-driven video pipeline: uploads to S3 trigger Lambda and AWS MediaConvert jobs that produce HLS, delivered through CloudFront with signed URLs.' },
      { slug: 'self-storage-management-platform', note: 'An event-driven backend on AWS that was load-tested against simulated traffic for 45,000 units before a phased rollout.' },
    ],
    guides: ['cost-to-build-a-real-estate-platform'],
    answers: {
      includes:
        'Peregrine\'s cloud and DevOps service covers cloud architecture on AWS and other providers, CI/CD pipelines with GitHub Actions, GitLab CI or Jenkins, performance work with search indexes, Redis caching and CDN delivery, media pipelines, and monitoring with alerts. We load-test before launch and hand over runbooks so your team can run it.',
      timeline:
        'Peregrine sets the timeline for cloud and DevOps work after assessing your current hosting, release process, costs and incidents. The migration plan then moves one environment at a time, each verified before the next, with a rollback plan for every step. Work runs in two-week sprints and ends with load tests and a handover.',
      cost:
        'Peregrine works on cloud and DevOps as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on the current setup, how much moves and how much is automated. A single performance fix can get a scoped estimate. For infrastructure in context, see [[guide]].',
      work:
        'Three published case studies show Peregrine\'s cloud and DevOps work: a real estate SaaS split into USA, Canada and staging environments with Elasticsearch, Redis and a CDN; an edtech platform with an event-driven AWS video pipeline delivering HLS; and a self-storage platform load-tested against 45,000 simulated units before rollout.',
    },
    glance: {
      delivered: 'Cloud architecture, CI/CD pipelines, caching and CDN, media pipelines, load testing, monitoring and runbooks',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'Our platform is slow. Is more hosting the answer?',
        answer: 'Usually not on its own. Slowness under growth is more often caused by data architecture, missing indexes, search queries against the primary database, or no caching. We profile first and change the part that is actually slow.',
      },
      {
        question: 'Can you migrate us to the cloud without downtime?',
        answer: 'In most cases, yes. We run the new environment alongside the old one, replicate data, test with real traffic, and switch over in steps with a rollback plan for each step.',
      },
      {
        question: 'Do we need Kubernetes?',
        answer: 'Not always. Kubernetes suits teams running many services that need fine-grained scaling. Many SaaS products run well and more cheaply on managed services or a small number of containers. We recommend the simplest setup that meets your reliability needs.',
      },
      {
        question: 'Which clouds do you work with?',
        answer: 'Most of our case studies run on AWS. Our teams also work with Azure, Google Cloud Platform, DigitalOcean and Linode, and we can work within the provider you already use.',
      },
      {
        question: 'Will our team be able to run it afterwards?',
        answer: 'Yes. Infrastructure is defined in code, pipelines are documented, and we hand over runbooks and dashboards so your team can operate and change the setup without us.',
      },
    ],
    icon: 'ri-server-line',
  },
  {
    slug: 'odoo-erp',
    name: 'Odoo ERP',
    serviceType: 'Odoo ERP implementation and integration',
    title: 'Odoo Integration & Custom Module Development',
    metaDescription:
      'Odoo integration and custom module development: connect Odoo to your website, e-commerce, payment, shipping and finance systems through its external API.',
    h1: 'Odoo Custom Module and API Integration Development',
    // Capability page: the owner has no Odoo project to publish yet, so the page makes no
    // project claims and cites no case studies. Add case studies here once they exist.
    offer: 'Odoo setup for HR, CRM, Inventory and Accounting, plus custom modules and integrations.',
    intro: [
      'Odoo custom module and API integration development means extending Odoo where its standard modules stop: new fields, screens and workflows written as custom modules, and connections between Odoo and the other systems your business runs.',
      'It is for companies using Odoo, or moving to it, whose processes or integrations go beyond what configuration alone can do, and who need developers rather than a reseller.',
      'Peregrine builds custom Odoo modules, integrates Odoo with websites, e-commerce, payment and finance systems through its external API, and configures and migrates the HR, CRM, Inventory and Accounting modules those integrations depend on.',
    ],
    whatWeBuild: [
      {
        title: 'HR (Employees, Time Off, Attendance)',
        body: 'Employee records, departments and reporting lines, leave types and approval flows, and attendance tracking, configured around your policies so HR requests stop living in email and spreadsheets.',
      },
      {
        title: 'CRM',
        body: 'Lead and opportunity pipelines with stages that match your sales process, activity scheduling, lead assignment rules and reporting, connected to your website forms so new leads arrive in Odoo automatically.',
      },
      {
        title: 'Inventory',
        body: 'Warehouses and locations, product variants, reordering rules, receipts and deliveries, and multi-step routes, so stock levels in Odoo match what is on the shelf.',
      },
      {
        title: 'Accounting',
        body: 'Chart of accounts, customer invoices and vendor bills, payment and bank reconciliation, and financial reports, linked to the sales and inventory flows that create the entries.',
      },
      {
        title: 'Custom modules and integrations',
        body: 'Python modules that add the fields, workflows and screens you need without modifying Odoo\'s core, and integrations with e-commerce stores, payment providers, shipping carriers and existing finance systems through Odoo\'s external API.',
      },
      {
        title: 'Data migration',
        body: 'Cleaning and importing customers, products, employees, open orders and opening balances from spreadsheets or legacy systems, with trial migrations before the cut-over date.',
      },
    ],
    process: [
      { title: 'Process mapping', body: 'We map how leads, orders, stock, people and money move through the company today and decide which Odoo modules and settings fit.' },
      { title: 'Configure and extend', body: 'Configuration first, custom modules only where configuration cannot meet the need, so upgrades stay manageable.' },
      { title: 'Migrate and test', body: 'Trial migrations and user testing with real scenarios before the cut-over date.' },
      { title: 'Go live and support', body: 'Phased go-live, one module or department at a time, with training and documentation for your team.' },
    ],
    stack: ['Odoo', 'Python', 'PostgreSQL', 'Odoo external API (JSON-2, XML-RPC, JSON-RPC)', 'REST integrations', 'Next.js dashboards'],
    caseStudies: [],
    guides: ['odoo-implementation-cost'],
    answers: {
      includes:
        'Peregrine\'s Odoo service covers custom Odoo modules in Python, integrations between Odoo and websites, e-commerce, payment, shipping and finance systems through Odoo\'s external API, configuration of the HR, CRM, Inventory and Accounting modules, and data migration from spreadsheets or legacy systems, with trial migrations before cut-over.',
      timeline:
        'Peregrine sets the timeline for Odoo work after process mapping, because it depends on how much a module changes, how many systems an integration touches and how much data has to be migrated. We recommend delivering in phases, one module or integration at a time, so each phase is small enough to test properly.',
      cost:
        'Peregrine works on Odoo custom modules and integrations as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on how far the work goes beyond standard configuration, the number of integrations and the data migration. Odoo Enterprise is a paid edition from Odoo S.A. We do not publish a price list.',
      work:
        'Peregrine has no published Odoo case study yet, so this page makes no project claims. Our API integration case studies show how we build integrations: vendor adapters, webhooks, retries and reconciliation. You can browse every case study, or ask about Odoo on a discovery call.',
    },
    glance: {
      delivered: 'Custom Odoo modules, API integrations, HR, CRM, Inventory and Accounting configuration, and data migration',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'Which Odoo modules do your custom modules and integrations cover?',
        answer: 'We implement Odoo\'s HR (employees, time off and attendance), CRM, Inventory and Accounting modules, and build custom modules and integrations around them. If you need other modules, we assess them during process mapping.',
      },
      {
        question: 'What is the difference between Odoo Community and Odoo Enterprise?',
        answer: 'Community is the free, open-source edition. Enterprise is the paid edition from Odoo S.A. that adds modules and features such as full accounting, studio customization and official support. The right choice depends on which modules you need.',
      },
      {
        question: 'Should we customize Odoo or keep it standard?',
        answer: 'Keep it as standard as you can. Configure first, and add custom modules only where a real business need cannot be met otherwise; every customization is code that has to be maintained through upgrades.',
      },
      {
        question: 'Can Odoo connect to our existing systems?',
        answer: 'Yes. Odoo exposes an external API: the JSON-2 API introduced in Odoo 19, and the older XML-RPC and JSON-RPC APIs, which Odoo has scheduled for removal. Odoo makes external API access available on its Custom plan only. Integrations can be built for e-commerce, CRM, payments, shipping and finance systems; where a system has no API, file-based exchange is an option.',
      },
      {
        question: 'How long does a custom Odoo module or integration take?',
        answer: 'It depends on how much the module changes, how many systems the integration touches and how much data has to be migrated. We recommend delivering in phases, one module or integration at a time, so each phase is small enough to test properly.',
      },
    ],
    icon: 'ri-stack-line',
  },
];

/** Every service page: core services first, then technology pages. */
export const services: Service[] = [...coreServiceList, ...technologyServices];
export const coreServices = coreServiceList;
export { technologyServices };

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

// ---------------------------------------------------------------------------------------
// Buyer guidance (Sprint 2). Vendor-neutral: who a service suits, what changes the effort,
// what to prepare. These are not claims about Peregrine's past work. Where an item does
// state something about Peregrine it repeats a fact already on that page (for example
// "no case study is published") and says so in a comment.
// No prices, no durations, no named Odoo integrations, no MLS approval timelines.
// ---------------------------------------------------------------------------------------

const coreBuyerGuides: Record<string, BuyerGuide> = {
  'saas-development': {
    fit: [
      'You are building a subscription product that many customers will use from one platform, each with their own data, users and settings.',
      'An MVP works for the first customers and is starting to fail as accounts, data or traffic grow.',
      'Billing, roles, tenant isolation and integrations need to be designed together instead of added one at a time.',
    ],
    notFit: [
      { text: 'An existing product meets the need with configuration. Buying is usually cheaper than building; our brokerage comparison shows how to weigh it:', link: { href: '/blog/custom-saas-vs-off-the-shelf-crm-for-brokerages', label: 'custom SaaS vs off-the-shelf CRM' } },
      { text: 'You need a clickable prototype to test an idea with users. A design prototype or a no-code tool gets you there for less.' },
    ],
    scope: [
      { factor: 'Tenancy model', effect: 'How isolated each customer\'s data must be, and whether tenants get their own configuration, branding or domain. This is the hardest decision to change later.' },
      { factor: 'Roles and permissions', effect: 'The number of roles, and whether customers define their own. Each role multiplies the screens and the access rules to test.' },
      { factor: 'Billing', effect: 'Flat plans are small. Usage-based pricing, trials, invoicing, tax handling and split payments between parties each add work.' },
      { factor: 'Integrations', effect: 'Every third-party system your customers expect on day one is its own piece of work, sized by the quality of that system\'s API.' },
      { factor: 'Data volume and search', effect: 'Whether users filter thousands of records or millions decides if a search index and a cache are needed beside the database.' },
      { factor: 'Mobile apps', effect: 'Native iOS and Android apps beside the web app add a second client to build, test and release.' },
      { factor: 'Compliance', effect: 'Requirements such as HIPAA or SOC 2 constrain hosting, logging, access control and how data is encrypted.' },
      { factor: 'Existing product', effect: 'Rebuilding while customers stay live means staged migration and running old and new side by side.' },
    ],
    firstPhase:
      'A sensible first phase fixes the data model, tenancy and roles, then delivers one workflow a real customer can use from sign-up to payment. Features are easy to add later; tenancy and billing are costly to change once customers are on the platform.',
    bring: [
      'Who your customers are and what one customer account contains: users, data and settings.',
      'The three or four workflows the product cannot launch without.',
      'The pricing model you intend: plans, per seat, usage or a mix.',
      'The integrations customers will expect on day one.',
      'For an existing product: the stack, hosting, customer and record counts, and where it fails today.',
      'Any regulatory requirement, such as HIPAA or SOC 2.',
    ],
  },
  'api-integration': {
    fit: [
      'Two or more systems hold the same records and staff re-key or reconcile them by hand.',
      'Your product must connect to many vendors of the same kind, such as carriers, payroll providers or MLS boards, and present one model to your users.',
      'An existing integration loses or duplicates records and nobody notices until a customer does.',
      'You need to offer your own API to partners or customers.',
    ],
    notFit: [
      { text: 'Both systems are covered by a native connector or an automation tool, and volumes are low. That route is cheaper than custom code.' },
      { text: 'One system has no API and no export, and its vendor will provide neither. Access has to be resolved before any build.' },
    ],
    scope: [
      { factor: 'Number of systems', effect: 'Each system is its own adapter. The effort per system depends on its API documentation, authentication and whether a sandbox exists.' },
      { factor: 'Direction and ownership', effect: 'One-way sync is far simpler than two-way. Two-way needs a rule for which system owns each field and how conflicts are settled.' },
      { factor: 'Volume and timing', effect: 'Records per day, and whether changes must arrive in seconds (webhooks) or can wait for a batch, decide queueing and rate-limit handling.' },
      { factor: 'Failure handling', effect: 'What must happen when a system is down: retries, duplicate protection and a reconciliation job that makes silent drift visible.' },
      { factor: 'Data mapping', effect: 'How different the two data models are, and whether records can be matched when the systems share no identifier.' },
      { factor: 'Vendor access', effect: 'Partner programs, API keys and approvals are granted by the vendor on the vendor\'s schedule.' },
    ],
    firstPhase:
      'A sensible first phase is one system and one record type moving in one direction, with retries and a reconciliation report. It proves access, data quality and error handling before the remaining systems are added.',
    bring: [
      'The list of systems, their API documentation, and whether you hold sandbox or test accounts.',
      'For each record type: which system owns it and which direction it should move.',
      'Volumes: records on a normal day and on the busiest day.',
      'A few real sample records from each system, anonymized if needed.',
      'What happens today when the systems disagree, and who fixes it.',
      'Any vendor approval or partner agreement that is in place or still needed.',
    ],
  },
  'mls-idx-integration': {
    fit: [
      'You need listings from one or more MLS boards inside a product you control: a brokerage platform, an agent-website product, a proptech app or an internal tool.',
      'You use a turnkey IDX vendor and have hit a limit: search you cannot customize, data you cannot store beside your own, or per-agent fees that grow with the business.',
      'You are moving a working RETS integration to the RESO Web API and search has to stay up while you do it.',
    ],
    notFit: [
      { text: 'You want listing search on an existing brokerage website soon, and standard search pages are enough. A turnkey IDX vendor is the faster and cheaper route:', link: { href: '/blog/idx-vendor-vs-custom-build', label: 'IDX vendor or custom build' } },
      { text: 'You have no broker or MLS relationship yet, so no path to a data license. Start with access:', link: { href: '/blog/how-to-get-mls-data-access', label: 'how to get MLS data access' } },
    ],
    scope: [
      { factor: 'Number of MLS boards', effect: 'Each board is a separate license, feed, field mapping and set of display rules, so effort grows with every board added.' },
      { factor: 'Feed type per board', effect: 'RESO Web API, legacy RETS or, in Canada, CREA DDF. Each needs its own ingestion code, and older RETS feeds are polled on a schedule.' },
      { factor: 'License type and display rules', effect: 'IDX, VOW and back-office licenses allow different fields, statuses and refresh intervals. The rules shape the schema and the sync.' },
      { factor: 'Listing volume and freshness', effect: 'The number of listings and photos, and how soon a status change must appear, drive sync design, index size and media storage.' },
      { factor: 'What sits on top', effect: 'Search alone is the smallest build. Map search, saved searches and alerts, agent websites, lead routing and valuation each add to it.' },
      { factor: 'Existing pipeline', effect: 'Taking over a feed that already runs means working with its schema and its data-quality problems instead of starting clean.' },
    ],
    firstPhase:
      'A sensible first phase is one board, end to end: ingestion, field mapping, a search index and a basic results page over real data. It exposes license and data-quality problems early, and adding the second board then shows what multi-board normalization will take.',
    bring: [
      'The MLS boards or markets you need, and which of them you already have a license or broker relationship with.',
      'Any feed credentials or vendor documentation you hold, and whether each feed is RESO Web API or RETS.',
      'The license type you have or are applying for (IDX, VOW or back office) and a copy of its display rules.',
      'What users must be able to do: filters, map search, saved searches, alerts, agent sites, lead routing.',
      'The systems the listings must feed: CRM, website, mobile app, reporting.',
      'For an existing integration: what breaks today (stale statuses, slow search, failed syncs) and rough listing counts.',
    ],
  },
  'investor-portal-development': {
    fit: [
      'Investor relations run on email, shared folders and quarterly PDF packages, and preparing them takes your team days every quarter.',
      'Investors hold positions through several funds, co-investments or SPVs, and each must see only their own holdings and documents.',
      'You need to know who opened which document, or to send capital calls and subscription documents for signature from one place.',
      'You have evaluated off-the-shelf portals and they do not fit your participation structures, calculations or the systems the portal must connect to.',
    ],
    notFit: [
      { text: 'Your fund structure and reports fit a standard investor portal product. Buying one is usually faster and cheaper than building:', link: { href: '/blog/investor-portal-vs-file-sharing', label: 'investor portal vs file sharing' } },
      { text: 'You need fund accounting or a general ledger. A portal presents and distributes figures; it does not replace the system that produces them.' },
      { text: 'You have a handful of investors in a single vehicle and no document-security requirement beyond controlled sharing.' },
    ],
    scope: [
      { factor: 'Participation structures', effect: 'Funds, co-investments, SPVs and delegates such as family office administrators define the permission model, which drives most of the work.' },
      { factor: 'Roles', effect: 'The number of role types (investors, general partners, legal, auditors, your own team) and who is allowed to grant access.' },
      { factor: 'Document controls', effect: 'Per-investor watermarking, download restrictions, versioning, audit trail and retention rules each add to the document system.' },
      { factor: 'Where calculations live', effect: 'Computing IRR, equity multiple and waterfalls inside the portal is much more work than importing figures your accounting system already produces.' },
      { factor: 'Workflows', effect: 'Capital calls, subscription documents, e-signature and distribution notices are each a workflow with its own states and notifications.' },
      { factor: 'Migration', effect: 'The years of historical documents to move, and whether investor records live in a system or in spreadsheets.' },
      { factor: 'Integrations', effect: 'Connections to accounting or fund administration, e-signature, CRM and single sign-on.' },
    ],
    firstPhase:
      'A sensible first phase is the access model plus read-only documents: investors log in and see only their own holdings and files, with every access logged. Reporting and capital call workflows build on that model, so settling it first avoids rework.',
    bring: [
      'A sketch of your structure: funds, co-investments, SPVs, and the kinds of investor and delegate in each.',
      'One anonymized example of each document investors receive: K-1, distribution notice, capital call, quarterly report.',
      'How IRR, equity multiple and waterfall figures are produced today, and in which system.',
      'The number of investors and roughly how many years of documents have to move.',
      'The systems the portal must connect to: accounting or fund administration, e-signature, CRM.',
      'Security or compliance requirements set by your investors or counsel.',
    ],
  },
  'ai-automation': {
    fit: [
      'A specific, repeated task consumes staff time: reading documents, answering the same questions, qualifying leads or searching records.',
      'You have historical data or documents for that task and can say what a correct result looks like.',
      'A person can review the uncertain cases, so the automation does not have to be right every time.',
    ],
    notFit: [
      { text: 'The goal is to "add AI" with no workflow chosen and no measure of success. Pick the problem first.' },
      { text: 'Every result must be correct with no human review, in a domain where an error is costly. Design for review or do not automate that step.' },
      { text: 'There is no data to test against and none can be collected.' },
    ],
    scope: [
      { factor: 'Task and accuracy target', effect: 'What "good enough" means and what an error costs. A higher target means more evaluation, more review tooling and more iteration.' },
      { factor: 'Data', effect: 'Volume, format and quality of the inputs, and whether examples with known correct answers exist to measure against.' },
      { factor: 'Approach', effect: 'A hosted language model, retrieval over your own documents, a trained model or plain rules differ in build effort and in running cost.' },
      { factor: 'Human review', effect: 'Confidence thresholds, a review queue and a log of every automated decision are a large part of a production build.' },
      { factor: 'Where results go', effect: 'Writing results into a CRM, claims system or other tool is integration work on top of the model.' },
      { factor: 'Data restrictions', effect: 'Whether data may be sent to a third-party model provider, and rules for personal or health data, narrow the options.' },
      { factor: 'Running cost', effect: 'Model providers charge per request, so cost scales with volume and is paid to the provider, not to the builder.' },
    ],
    firstPhase:
      'A sensible first phase is a short prototype on a sample of your own data, measured against an accuracy target agreed beforehand. It tells you whether the approach works before a production build is committed.',
    bring: [
      'One workflow described step by step, and how long it takes today.',
      'A sample of real inputs, anonymized if needed, with the correct outcome for each.',
      'What a wrong result costs, and who would review the uncertain ones.',
      'The systems the result has to be written to.',
      'What data may and may not leave your environment.',
      'Volume: items per day.',
    ],
  },
  'cloud-devops': {
    fit: [
      'Releases are manual, slow or risky, and the team avoids deploying.',
      'The platform slows down or fails under load, or you are about to onboard far more customers or traffic.',
      'Cloud costs are rising faster than usage and nobody can say why.',
      'You have to move hosting or split environments without taking the product offline.',
    ],
    notFit: [
      // True of the site: no SLA or on-call terms are published anywhere (GO-NO-GO.md section 2).
      { text: 'You need a managed service provider with published SLA and round-the-clock on-call terms. This site publishes neither.' },
      { text: 'The application itself is the bottleneck, for example its queries or data model. Infrastructure alone will not fix that; an architecture audit comes first.' },
    ],
    scope: [
      { factor: 'Current state', effect: 'Which cloud, how many environments, and whether infrastructure is defined as code or was built by hand in a console.' },
      { factor: 'Services and data', effect: 'The number of services and databases, and how much data has to move.' },
      { factor: 'Downtime tolerance', effect: 'A migration with a maintenance window is simpler than one that must run old and new side by side with a staged switch.' },
      { factor: 'Compliance', effect: 'HIPAA, SOC 2 and similar requirements add logging, access control, encryption and evidence that has to be kept.' },
      { factor: 'Release process', effect: 'Existing automated tests make a deployment pipeline quick to add. Without tests, safe automated releases need them first.' },
      { factor: 'Traffic profile', effect: 'Steady or spiky load and the peak you expect set the scaling design and the load-test targets.' },
      { factor: 'Who runs it afterwards', effect: 'The experience of the team taking over decides how much documentation, alerting and runbook work is needed.' },
    ],
    firstPhase:
      'A sensible first phase is an assessment of hosting, release process, costs and recent incidents that ends with the few changes that matter most, in order. A deployment pipeline for one service is often the first, because it makes every later change safer.',
    bring: [
      'An architecture diagram, or a list of services and databases and where each runs.',
      'The last three months of cloud bills.',
      'How a release happens today, step by step.',
      'Recent incidents: what failed and how long recovery took.',
      'Expected growth in customers, traffic or data over the next year.',
      'Compliance requirements, and who will operate the system after handover.',
    ],
  },
  'odoo-erp': {
    fit: [
      'You run Odoo, or have decided on it, and need behavior that configuration alone does not provide.',
      'Odoo must exchange orders, stock, customers or invoices with another system, such as an online store, a warehouse or a finance tool.',
      'You are moving from spreadsheets or a legacy system and need the data cleaned, imported and the cut-over rehearsed.',
    ],
    notFit: [
      { text: 'Standard Odoo modules with default settings meet the need. A packaged implementation will cost less than custom work:', link: { href: '/blog/odoo-implementation-cost', label: 'Odoo implementation cost' } },
      { text: 'You have not chosen an ERP yet and want a vendor-neutral selection exercise. This page covers Odoo only.' },
      // Repeats the page's own statement: no Odoo case study is published.
      { text: 'You need a published Odoo reference project before shortlisting a firm. Peregrine has none published.' },
    ],
    scope: [
      { factor: 'Edition and hosting', effect: 'Community or Enterprise, and where Odoo is hosted. The hosting option and plan decide whether custom modules can be installed and whether the external API is available.' },
      { factor: 'Odoo version', effect: 'How far the installation is from the current release. Odoo\'s APIs and module structure change between versions.' },
      { factor: 'Distance from standard', effect: 'How far the requirement departs from what the module already does. Every customization is code to maintain through upgrades.' },
      { factor: 'Integrations', effect: 'For each system: whether it has an API, the direction of the sync, which system owns each record, and the volume.' },
      { factor: 'Data migration', effect: 'The number of record types, their quality, how much history comes across, and opening balances for accounting.' },
      { factor: 'Existing customizations', effect: 'Studio changes and third-party apps already installed that new work has to coexist with.' },
    ],
    firstPhase:
      'A sensible first phase is one module change or one integration, taken through a trial migration and user testing on a copy of your database. It shows how your data and existing customizations behave before a larger program is committed.',
    bring: [
      'Your Odoo version, edition (Community or Enterprise) and where it is hosted.',
      'The modules you use, and any Studio customizations or third-party apps already installed.',
      'The process you want changed, written as the steps a user takes today and the steps you want instead.',
      'For each system to connect: its name, whether it has an API, and which system should own each record.',
      'Sample exports of the data to migrate, with rough record counts.',
      'Your go-live constraint, such as a financial year end or a peak season to avoid.',
    ],
  },
};

const buyerGuides: Record<string, BuyerGuide> = { ...coreBuyerGuides, ...technologyBuyerGuides };
export const buyerGuideFor = (slug: string): BuyerGuide | undefined => buyerGuides[slug];

/** Related services per page, with one line on when the other service applies.
 *  Guidance about when to read the other page, not a claim about past work. */
const related: Record<string, [string, string][]> = {
  'saas-development': [
    ['api-integration', 'when the product has to connect to the systems your customers already use'],
    ['cloud-devops', 'for the environments, release pipeline and load testing under the product'],
    ['nextjs-development', 'for the web frontend and public pages'],
    ['react-development', 'when the product needs iOS and Android apps'],
  ],
  'api-integration': [
    ['mls-idx-integration', 'when the data source is an MLS feed, which has its own licensing and display rules'],
    ['odoo-erp', 'when one side of the integration is Odoo'],
    ['shopify-development', 'when one side is a Shopify store'],
    ['saas-development', 'when the integrations are part of a larger product build'],
  ],
  'mls-idx-integration': [
    ['saas-development', 'when listings feed a multi-tenant product such as agent or brokerage websites'],
    ['ai-automation', 'for natural-language search, valuation models or lead qualification on top of listing data'],
    ['nextjs-development', 'for the IDX pages themselves, where speed and indexing matter'],
    ['api-integration', 'for the CRM and lead-routing connections around the listing data'],
  ],
  'investor-portal-development': [
    ['api-integration', 'for e-signature, accounting and fund administration connections'],
    ['nextjs-development', 'for the portal frontend and investor dashboard'],
    ['cloud-devops', 'for encrypted storage, environments and the security review before launch'],
  ],
  'ai-automation': [
    ['api-integration', 'to write results into the CRM, claims or other system where the work happens'],
    ['mls-idx-integration', 'when the automation needs clean listing data underneath it'],
    ['saas-development', 'when the automation is a feature of a product you sell'],
  ],
  'cloud-devops': [
    ['saas-development', 'when the limit is the application\'s data model, not its hosting'],
    ['api-integration', 'when incidents come from third-party systems failing or drifting out of sync'],
    ['nextjs-development', 'for frontend performance: rendering, caching and image delivery'],
  ],
  'odoo-erp': [
    ['api-integration', 'for the adapters, retries and reconciliation between Odoo and other systems'],
    ['shopify-development', 'when the system on the other side is a Shopify store'],
  ],
  'nextjs-development': [
    ['react-development', 'when the product also needs iOS and Android apps'],
    ['saas-development', 'when the frontend is part of a multi-tenant product with billing'],
    ['wordpress-development', 'when editors keep WordPress as the content system behind a Next.js frontend'],
    ['cloud-devops', 'for hosting, caching and the release pipeline'],
  ],
  'react-development': [
    ['nextjs-development', 'for the web app and public pages beside the mobile apps'],
    ['api-integration', 'when the apps depend on payment, mapping or hardware vendor APIs'],
    ['saas-development', 'when web, mobile and backend are one product build'],
  ],
  'shopify-development': [
    ['odoo-erp', 'when the ERP on the other side of the sync is Odoo'],
    ['api-integration', 'for sync design: ownership of records, retries and reconciliation'],
    ['nextjs-development', 'for a headless storefront'],
  ],
  'laravel-development': [
    ['nextjs-development', 'for a web frontend on a Laravel API'],
    ['react-development', 'for mobile apps against the same API'],
    ['cloud-devops', 'for deployment pipelines and hosting moves'],
  ],
  'wordpress-development': [
    ['nextjs-development', 'for a headless frontend that reads content from WordPress'],
    ['saas-development', 'when the site has become an application and needs a purpose-built platform'],
    ['api-integration', 'for CRM, payment and internal-system connections'],
  ],
};
export const relatedServicesFor = (slug: string): { service: Service; why: string }[] =>
  (related[slug] ?? []).map(([s, why]) => ({ service: getService(s), why }));

/** /services index: core services grouped by the buyer's need. Every core service appears once. */
export const serviceNeeds: { id: string; heading: string; blurb: string; slugs: string[] }[] = [
  {
    id: 'build',
    heading: 'Build or Rebuild a Product',
    blurb: 'A new platform, or an existing one that has stopped keeping up with its customers.',
    slugs: ['saas-development', 'investor-portal-development'],
  },
  {
    id: 'connect',
    heading: 'Connect Systems and Data',
    blurb: 'Listings, orders, payroll, shipments: records that have to agree across systems you do not control.',
    slugs: ['mls-idx-integration', 'api-integration', 'odoo-erp'],
  },
  {
    id: 'operate',
    heading: 'Automate and Operate',
    blurb: 'Take repeated work off your staff, and make the platform you already run faster and safer to release.',
    slugs: ['ai-automation', 'cloud-devops'],
  },
];

/** "Working with Peregrine" FAQ on /services (visible text and FAQPage JSON-LD from this array).
 *  Every answer uses owner-confirmed facts only; the source of each is named beside it. */
export const buyerFaq: { question: string; answer: string }[] = [
  {
    // Confirmed: founded 2018; founder Mukesh Swami; team of 25+; office in Noida; most clients
    // are B2B companies in the US and Canada.
    question: 'Where is Peregrine based, and who is behind it?',
    answer:
      'Peregrine IT Solutions was founded in 2018 by Mukesh Swami and has a team of 25+ working from its office in Noida, India. Most of its clients are B2B companies in the United States and Canada.',
  },
  {
    // Confirmed: 30-minute technical discovery call with an engineer; discovery sprint for
    // larger builds; two-week sprints with weekly demos.
    question: 'How does a project with an offshore team start?',
    answer:
      'With a 30-minute technical discovery call with an engineer. Larger builds then start with a discovery sprint and run in two-week sprints with weekly demos. The checklist on each service page lists what to have ready so the call can get to specifics.',
  },
  {
    // Confirmed: engagement model; no price list is published.
    question: 'What contract models does Peregrine offer?',
    answer:
      'Fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. As a general rule, a fixed scope suits work whose requirements can be written down up front, and a retainer suits ongoing work where priorities change. No price list is published; pricing is scoped per project.',
  },
  {
    // Confirmed: two-week sprints with weekly demos on larger builds.
    question: 'How will we see progress during a build?',
    answer:
      'Larger builds run in two-week sprints with a demo every week, so you see working software as it is built. The weekly demo is the point at which to change priorities or raise a concern.',
  },
  ipFaq,
  {
    // Confirmed: replies within 1 business day.
    question: 'How quickly does Peregrine reply to an enquiry?',
    answer:
      'Within 1 business day. You can send a project enquiry, send a quick project request for a single task, or book the 30-minute discovery call directly from the contact page.',
  },
];

/** Vendor-neutral checklist on /services: questions worth asking any engineering firm.
 *  `here` says where this site already answers the question, if it does. */
export const vendorQuestions: { question: string; here?: string }[] = [
  { question: 'Who will be on the first call, and who will write the code?', here: 'The first call is with an engineer.' },
  { question: 'Who owns the intellectual property, and when does it transfer?', here: 'The client, once the work is paid for.' },
  { question: 'How is progress shown, and how often?', here: 'Weekly demos within two-week sprints on larger builds.' },
  { question: 'Is the work fixed-scope, time-based or a mix, and what happens when the scope changes?', here: 'Fixed-scope, monthly retainer or a combination; raise change handling on the call.' },
  { question: 'In whose repository and cloud accounts does the code live during the build?' },
  { question: 'What access to production data does the team need, and how is it protected?' },
  { question: 'What is handed over at the end: documentation, runbooks, credentials?' },
  { question: 'Which comparable project can I read about or discuss?', here: 'Each service page lists the published case studies that apply, or says there are none.' },
];
