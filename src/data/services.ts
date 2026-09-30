// Service pages (/services and /services/[slug]) are generated from this file.
// The FAQ arrays feed both the visible FAQ and the FAQPage JSON-LD, so they always match.
//
// Owner confirmed the six services, including Odoo ERP (2026-09-29). Odoo is a
// capability page with no project claims until an Odoo case study exists.
// Engagement model confirmed by the owner (2026-09-30): see `engagementModel`.
// TODO(owner): prices. No prices are published and no Offer schema is emitted until the
//   owner supplies real Peregrine prices.

export interface Service {
  slug: string;
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
  whatWeBuild: { title: string; body: string }[];
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

/** Shared by every service page. Facts only from the existing site (discovery call,
 *  discovery sprint, 2-week sprints with weekly demos, 48-hour scoped estimates). */
export const engagement = {
  heading: 'How an Engagement Works',
  paragraphs: [
    'Every project starts with a 30-minute technical discovery call with an engineer, not a salesperson. We use it to understand the system you have, the outcome you need and whether we are the right team for it.',
    'Larger builds begin with a discovery sprint: we map requirements, design the architecture and hand you a written technical plan before development starts. Development then runs in two-week sprints with weekly demos, so you see working software early and can change priorities at each checkpoint.',
    'Smaller, well-defined tasks such as a single integration, a performance fix or an automation can be requested through the quick project form, and we reply with a scoped estimate within 48 hours.',
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
  `A Peregrine ${name} project starts with a 30-minute technical discovery call with an engineer, not a salesperson. Larger builds then begin with a discovery sprint that maps requirements, designs the architecture and produces a written technical plan. Smaller, well-defined tasks can use the quick project form for a scoped estimate within 48 hours.`;

export const services: Service[] = [
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
    updated: '2026-09-30',
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
      },
      {
        title: 'Webhooks, polling and retry queues',
        body: 'Event ingestion that works whichever way the vendor supports it, with deduplication, exponential backoff and dead-letter handling so a vendor outage delays data instead of losing it.',
      },
      {
        title: 'Finance, payroll and HR integrations',
        body: 'Syncing deductions, ledger entries and employee data with providers such as ADP and QuickBooks, with reconciliation reports so mismatches are caught before a pay run.',
      },
      {
        title: 'E-signature and document workflows',
        body: 'DocuSign envelope creation, signing order and webhook callbacks wired into your own records, with a complete audit trail of who signed what and when.',
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
        'Peregrine works on API integration as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on how many systems are involved and how reliable their APIs are. A single, well-defined integration can get a scoped estimate within 48 hours. For CRM build-or-buy economics, see [[guide]].',
      work:
        'Three published case studies show Peregrine\'s API integration work: a supply chain platform normalizing 12 carrier APIs with retry queues and per-carrier rate limits, an HR and payroll SaaS integrated with ADP, QuickBooks and DocuSign, and a legal document platform whose DocuSign webhooks keep multi-party signing moving during outages.',
    },
    glance: {
      delivered: 'Vendor adapters, a normalized data model, webhooks and polling with retries, reconciliation jobs, monitoring, and public or partner APIs',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-09-30',
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
      },
      {
        title: 'Multi-MLS normalization',
        body: 'Each board uses its own fields and conventions. We map them into one schema and deduplicate properties listed in more than one MLS, so agents and buyers see a single clean record.',
      },
      {
        title: 'IDX search and property pages',
        body: 'Search with filters, map and geo queries, and auto-suggest, backed by Elasticsearch and a cache, while property detail pages read the latest status so sold listings do not appear as active.',
      },
      {
        title: 'Agent and brokerage websites',
        body: 'Branded IDX websites for individual agents or whole brokerages from one platform, with lead capture feeding the CRM.',
      },
      {
        title: 'Natural-language search and valuation',
        body: 'On top of clean MLS data we can add conversational search and automated valuation models; see our AI automation service.',
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
    guides: ['mls-idx-integration-cost', 'how-to-get-mls-data-access', 'cost-to-build-a-real-estate-platform'],
    answers: {
      includes:
        'Peregrine\'s MLS and IDX integration service builds the full listing pipeline: feed ingestion over the RESO Web API or RETS, normalization across MLS boards, deduplication of cross-listed properties, a fast search layer, and the IDX website or app on top, with lead capture feeding your CRM. We also build and operate our own real estate product, RealFoyer.',
      timeline:
        'Peregrine sets the timeline for an MLS feed project after reviewing the boards involved, the feed type each offers and the display and refresh rules in each data license. Data access approval is set by each MLS, not by us. Development then runs in two-week sprints with weekly demos, and every feed is monitored after launch.',
      cost:
        'Peregrine works on MLS and IDX integration as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on the number of boards and what you build on top; MLS data fees are paid to each board. Our guide [[guide]] lists published fees.',
      work:
        'Two published case studies show Peregrine\'s MLS and IDX work: the W3|re platform, which unifies four MLS systems (NTREIS, Stellar MLS, ARMLS and REcolorado) and deduplicates cross-listed properties, and a real estate SaaS whose rebuilt MLS sync engine for US and Canadian boards feeds Elasticsearch search for agent IDX websites.',
    },
    glance: {
      delivered: 'MLS feed ingestion (RESO Web API or RETS), multi-board normalization and deduplication, listing search, and IDX websites with lead capture',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-09-30',
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
      },
      {
        title: 'Lead qualification assistants',
        body: 'Chat assistants that respond to inbound leads immediately, ask qualifying questions and route qualified conversations to the right person in your CRM.',
      },
      {
        title: 'Document extraction',
        body: 'OCR and extraction pipelines that turn PDFs, scans and forms into structured records, with validation rules and confidence thresholds that send uncertain cases to a person.',
      },
      {
        title: 'Predictive models',
        body: 'Valuation, scoring and forecasting models trained on your historical data, with the evaluation set and error metrics agreed before training.',
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
    updated: '2026-09-30',
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
      },
      {
        title: 'Media and streaming pipelines',
        body: 'Event-driven processing for uploads, such as video transcoding to adaptive-bitrate HLS delivered through a CDN with signed URLs.',
      },
      {
        title: 'Monitoring and reliability',
        body: 'Metrics, logs and alerting, plus load tests that simulate realistic traffic before launch rather than after an outage.',
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
        'Peregrine works on cloud and DevOps as fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Cost depends on the current setup, how much moves and how much is automated. A single performance fix can get a scoped estimate within 48 hours. For infrastructure in context, see [[guide]].',
      work:
        'Three published case studies show Peregrine\'s cloud and DevOps work: a real estate SaaS split into USA, Canada and staging environments with Elasticsearch, Redis and a CDN; an edtech platform with an event-driven AWS video pipeline delivering HLS; and a self-storage platform load-tested against 45,000 simulated units before rollout.',
    },
    glance: {
      delivered: 'Cloud architecture, CI/CD pipelines, caching and CDN, media pipelines, load testing, monitoring and runbooks',
      // TODO(owner): typical timeline for this service; omitted until stated on the site.
    },
    updated: '2026-09-30',
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
    title: 'Odoo Custom Modules & API Integration',
    metaDescription:
      'Odoo custom module and API integration development: new modules, workflow changes and integrations with your website, e-commerce, payment and finance systems.',
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
    stack: ['Odoo', 'Python', 'PostgreSQL', 'XML-RPC / JSON-RPC APIs', 'REST integrations', 'Next.js dashboards'],
    caseStudies: [],
    guides: [],
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
    updated: '2026-09-30',
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
        answer: 'Yes. Odoo exposes an external API (XML-RPC and JSON-RPC), and integrations can be built for e-commerce, CRM, payments, shipping and finance systems. Where a system has no API, file-based exchange is an option.',
      },
      {
        question: 'How long does a custom Odoo module or integration take?',
        answer: 'It depends on how much the module changes, how many systems the integration touches and how much data has to be migrated. We recommend delivering in phases, one module or integration at a time, so each phase is small enough to test properly.',
      },
    ],
    icon: 'ri-stack-line',
  },
];

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
