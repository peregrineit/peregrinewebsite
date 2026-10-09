// Industry pages (/industries and /industries/[slug]) are generated from this file.
//
// Rules:
// - An industry gets its own page only when two or more published case studies back it.
//   Self-storage is the one exception: a single case study, but Search Console shows
//   people looking for self-storage software and landing on the case study.
// - Every statement here restates what the linked case studies already say. No new
//   figures, clients, vendors or results. Verticals with one case study are listed on
//   the hub (`singleCaseStudyVerticals`) and link straight to that case study.

import type { BuyerGuide } from './services';

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
  whatWeBuild?: { title: string; body: string; proof?: string[] }[];
  /** Buyer guidance: fit, scope inputs, first phase and scoping-call checklist. */
  buyer?: BuyerGuide;
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
    guides: ['mls-idx-integration-cost', 'how-to-get-mls-data-access', 'cost-to-build-a-real-estate-platform', 'custom-saas-vs-off-the-shelf-crm-for-brokerages', 'investor-portal-vs-file-sharing', 'idx-vendor-vs-custom-build', 'reso-web-api-vs-rets', 'mls-data-access-canada'],
    ownProduct: true,
    // Cards restate the linked case studies (re-read 2026-10-10); `proof` names the source of each.
    // Buyer guidance is vendor-neutral. Its only statements about Peregrine are in `firstPhase`
    // and restate the case studies' own phase descriptions.
    whatWeBuild: [
      {
        title: 'MLS data pipelines',
        body: 'Ingestion from several MLS boards into one schema, with cross-listed properties deduplicated. The W3|re case study describes a pipeline over four MLS systems; the real estate SaaS case study describes a sync engine with delta detection, retry logic and per-feed error isolation.',
        proof: ['w3re-ai-real-estate-platform', 'scaling-real-estate-saas-platform'],
      },
      {
        title: 'Listing search and agent websites',
        body: 'Search with filters, geo queries and auto-suggestions on Elasticsearch with a Redis cache, behind white-label agent websites. In the real estate SaaS case study, search response went from 3.5 seconds to 180 milliseconds.',
        proof: ['scaling-real-estate-saas-platform'],
      },
      {
        title: 'AI search, valuation and lead qualification',
        body: 'Natural-language property search, an automated valuation model and a lead qualification chatbot, as built for W3|re.',
        proof: ['w3re-ai-real-estate-platform'],
      },
      {
        title: 'Investor portals',
        body: 'Role-based portals where each investor sees only their own holdings and documents, with watermarked files and an audit trail. The case study portal serves 280+ investors across a $450M portfolio.',
        proof: ['proptech-investor-portal'],
      },
      {
        title: 'Property operations platforms',
        body: 'Reservations, Stripe billing and smart-lock access in one platform, built for a self-storage operator with 150+ facilities.',
        proof: ['self-storage-management-platform'],
      },
    ],
    buyer: {
      fit: [
        'You are a brokerage, agent-website platform or proptech company whose product depends on MLS data, and a vendor\'s IDX product no longer does what you need.',
        'Agents or investors work across several tools, such as a CRM, listing search and document systems, and you want one product and one login.',
        'You operate in more than one market, and each board, fund or facility has rules your current software handles by exception.',
        'You sell software to agents, brokerages, sponsors or operators, and one codebase has to serve all of them.',
      ],
      notFit: [
        { text: 'A single-office brokerage that needs a website with listing search and a CRM. Off-the-shelf products cover that:', link: { href: '/blog/custom-saas-vs-off-the-shelf-crm-for-brokerages', label: 'custom SaaS vs off-the-shelf CRM' } },
        { text: 'You have not yet secured MLS data access for the markets you want. Start there:', link: { href: '/blog/how-to-get-mls-data-access', label: 'how to get MLS data access' } },
      ],
      scope: [
        { factor: 'Markets and boards', effect: 'Which MLS boards, in which states or provinces. Each one adds a license, a feed and its own display rules.' },
        { factor: 'User groups', effect: 'Agents, brokers, team leads, buyers and sellers, investors, back-office staff. Each group needs its own views and permissions.' },
        { factor: 'Brokerage structure', effect: 'Offices, teams and agent hierarchies, and whether each agent or office gets a branded site of its own.' },
        { factor: 'Lead handling', effect: 'Where leads come from, how they are routed, and which CRM owns them.' },
        { factor: 'Listing data rights', effect: 'What your license lets you display, store and reuse, for example in valuation models or on sold-data pages. Bring the agreement instead of assuming.' },
        { factor: 'Transactions and documents', effect: 'Whether the product handles offers, signatures, investor documents or payments. Each brings its own integrations and audit needs.' },
        { factor: 'Existing product', effect: 'Whether a platform has to keep running for its users while it is rebuilt.' },
      ],
      firstPhase:
        'A sensible first phase picks one market and one user group, and takes real listing data through to the screen that group uses most. The real estate SaaS project in our case studies began with a three-week audit and architecture design before the rebuild.',
      bring: [
        'The markets you operate in and the MLS boards behind each.',
        'Your data license or IDX vendor agreement for each board.',
        'The user groups and a rough count of each: agents, offices, investors, staff.',
        'The tools in use today (IDX vendor, CRM, transaction management, accounting) and which you want to keep.',
        'Where leads come from and how they are assigned today.',
        'For an existing platform: the stack, listing and agent counts, and the complaints you hear most.',
      ],
    },
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
    guides: ['self-storage-software-build-vs-buy'],
    whatWeBuild: [
      {
        title: 'Reservations, units and leases',
        body: 'Tenants, units, leases, payments and facility settings in one data store, with each operator\'s data isolated from every other operator\'s. In our case study this replaced separate reservation, billing and access systems that were reconciled by hand every morning.',
        proof: ['self-storage-management-platform'],
      },
      {
        title: 'Automated billing with Stripe',
        body: 'Recurring billing on Stripe with automatic retries. A failed autopay is detected immediately, retried with exponential backoff, and facility managers are alerted only when a person needs to step in.',
        proof: ['self-storage-management-platform'],
      },
      {
        title: 'Smart-lock and gate access',
        body: 'An IoT bridge that puts different lock hardware, whether Bluetooth LE, Wi-Fi or cellular, behind one API. When a tenant pays, access is granted automatically; when a lease expires, the lock deactivates. The case study platform integrated three lock vendors this way.',
        proof: ['self-storage-management-platform'],
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
    // Vendor-neutral buying guidance. The one statement about Peregrine's work (first
    // phase) restates the self-storage case study: Phase 1 mapped workflows and lock vendor
    // APIs; rollout began with 10 pilot sites.
    buyer: {
      fit: [
        'Reservations, billing and access control run in separate systems that staff reconcile by hand.',
        'Facilities use different gate or lock hardware and you need one way to grant, revoke and audit access.',
        'You need live occupancy and revenue across the portfolio, not periodic reports.',
        'You are building self-storage software as a product for other operators.',
      ],
      notFit: [
        { text: 'An off-the-shelf facility management system fits your processes and works with your locks. Buy it:', link: { href: '/blog/self-storage-software-build-vs-buy', label: 'self-storage software, build or buy' } },
        { text: 'You run a few facilities on one lock vendor with standard billing. Custom software is unlikely to pay for itself.' },
      ],
      scope: [
        { factor: 'Facilities and units', effect: 'The number of facilities and units sets data volume and rollout effort. Bring your late-fee and lien procedures for each state you operate in.' },
        { factor: 'Lock and gate hardware', effect: 'The number of vendors, how each connects (keypad, Bluetooth, Wi-Fi, cellular) and whether each offers an API. Every vendor is its own integration.' },
        { factor: 'Billing rules', effect: 'Autopay, proration, late fees, retries on failed payments, protection plans and taxes. The rules, not the payment provider, are the work.' },
        { factor: 'Systems being replaced', effect: 'What each current system can export, and how tenants, leases, balances and access codes are migrated while facilities stay open.' },
        { factor: 'Apps', effect: 'A tenant mobile app, a manager portal, a website reservation flow and a kiosk are separate clients on one backend.' },
        { factor: 'Reporting', effect: 'Portfolio occupancy and revenue, alerts, and any pricing rules that depend on them.' },
        { factor: 'Rollout', effect: 'How many pilot sites, and how facilities are switched over without interrupting access for tenants.' },
      ],
      firstPhase:
        'A sensible first phase is discovery across a few representative facilities: the workflows, the lock vendor APIs and the data held in each current system, ending in a written architecture. The project in our case study began that way and went live at 10 pilot sites before the full rollout.',
      bring: [
        'The number of facilities and units, and the states they are in.',
        'The lock and gate hardware at each facility, by vendor and model, and whether the vendor offers an API.',
        'The software used today for reservations, billing and access, and what each can export.',
        'Your billing rules: autopay, late fees, proration and what happens when a payment fails.',
        'Who uses the system (tenants, facility managers, corporate) and what each needs from it.',
        'Rollout constraints, such as facilities that cannot change during a busy season.',
      ],
    },
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
    // Cards restate the linked case studies (re-read 2026-10-10); `proof` names the source of each.
    // Buyer guidance is vendor-neutral. Its only statements about Peregrine are in `firstPhase`
    // and restate the case studies' own phase descriptions.
    whatWeBuild: [
      {
        title: 'Carrier integration layer',
        body: 'One adapter per carrier behind a canonical tracking-event schema, with webhook and polling ingestion, deduplication and a retry queue. The visibility platform in our case study normalizes 12 carrier APIs this way.',
        proof: ['supply-chain-visibility-platform'],
      },
      {
        title: 'Shipper portals and exception alerts',
        body: 'A portal where each shipper sees only its own shipments, with alerts for delays, damage and customs holds. The case study reports 45% fewer customer inquiries.',
        proof: ['supply-chain-visibility-platform'],
      },
      {
        title: 'Live fleet tracking',
        body: 'GPS data streamed from vehicle devices over MQTT, with geofencing, speed alerts and route-deviation detection. Our fleet case study covers 500+ vehicles, with devices from three OBD vendors behind one abstraction layer.',
        proof: ['logistics-fleet-tracking-platform'],
      },
      {
        title: 'Driver apps that work offline',
        body: 'A React Native driver app that queues delivery confirmations, GPS pings and proof-of-delivery photos on the device and syncs when coverage returns.',
        proof: ['logistics-fleet-tracking-platform'],
      },
      {
        title: 'Route optimization and ETAs',
        body: 'Route planning that accounts for traffic, vehicle capacity, delivery windows and driver hours, and ETA prediction from historical lane data.',
        proof: ['logistics-fleet-tracking-platform', 'supply-chain-visibility-platform'],
      },
    ],
    buyer: {
      fit: [
        'Customer service spends its day answering "where is my shipment?" from carrier portals or phone calls to drivers.',
        'You work with many carriers or telematics vendors and need one view across them.',
        'Drivers work where coverage is unreliable, and paper or messaging apps are the system of record.',
        'Your customers ask for a tracking portal or an API under your brand.',
      ],
      notFit: [
        { text: 'You use one or two carriers whose own tracking pages already meet your customers\' needs.' },
        { text: 'A commercial TMS or telematics product covers your fleet and carriers, and the gap is configuration or training.' },
        { text: 'You need the hardware itself. Trackers and in-cab devices come from their vendors; this is the software around them.' },
      ],
      scope: [
        { factor: 'Carriers and devices', effect: 'The number of carriers or telematics vendors, and whether each offers an API, webhooks or only a web portal.' },
        { factor: 'Event volume', effect: 'Shipments or vehicles tracked, and how often each reports. A position every few seconds is a different storage problem from a few scans per shipment.' },
        { factor: 'Customers and tenancy', effect: 'Whether shippers log in, how many, and how strictly their data has to be separated.' },
        { factor: 'Offline operation', effect: 'What drivers must be able to do with no signal, and for how long.' },
        { factor: 'Routing rules', effect: 'The constraints a route has to respect: capacity, delivery windows, driver hours, vehicle types.' },
        { factor: 'ETAs and alerts', effect: 'Whether carrier ETAs are enough or you need your own prediction, which depends on having delivery history to learn from.' },
        { factor: 'Regions', effect: 'Countries of operation, languages, and how good mapping data is in each.' },
        { factor: 'Systems of record', effect: 'The TMS, WMS, ERP or order system that shipments come from and results return to.' },
      ],
      firstPhase:
        'A sensible first phase connects two or three carriers, or one device type, end to end and puts the result in front of a small group of real users. Both of our logistics case studies began with discovery in the field: documenting each carrier API in one, riding along with drivers in the other.',
      bring: [
        'Your carriers or telematics vendors, with the share of volume each handles.',
        'Shipments per month, or vehicles and drivers on the road.',
        'How tracking questions are answered today, and roughly how many arrive.',
        'The systems orders and shipments originate in.',
        'A sample of tracking data or a device export.',
        'For driver apps: the devices drivers carry and where coverage fails.',
      ],
    },
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
    // Cards restate the linked case studies (re-read 2026-10-10); `proof` names the source of each.
    // Buyer guidance is vendor-neutral. Its only statements about Peregrine are in `firstPhase`
    // and restate the case studies' own phase descriptions.
    // No certification, attestation or compliance status is claimed, and no legal requirement is
    // restated: regulated topics are phrased as decisions and documents the buyer brings.
    whatWeBuild: [
      {
        title: 'Unified patient records across locations',
        body: 'One record that follows the patient between clinics, with data migrated from the systems each location used before. In our clinic case study, 120K+ patient records were migrated from four legacy EHR systems.',
        proof: ['multi-location-clinic-management'],
      },
      {
        title: 'Access control and audit logging',
        body: 'Role-based access and a log of every read, write and export of patient data. The clinic platform in our case study uses 12 role types and field-level encryption for protected health information.',
        proof: ['multi-location-clinic-management'],
      },
      {
        title: 'Telehealth inside the record',
        body: 'Video visits over WebRTC with visit documentation written into the patient record, so clinicians do not switch tools.',
        proof: ['multi-location-clinic-management'],
      },
      {
        title: 'Claims coding and eligibility checks',
        body: 'CPT and ICD-10 code validation, eligibility checks and electronic claim submission with a denial workflow. The case study reports claim denials falling from 18% to 4.2%.',
        proof: ['multi-location-clinic-management'],
      },
      {
        title: 'Claims document extraction with human review',
        body: 'Extraction from PDFs and scans with AWS Textract, validators for codes, dates and amounts, a review queue for anything below the confidence threshold, and HL7 FHIR endpoints for provider systems. The insurer in our case study processes 45K+ claims a year.',
        proof: ['insurance-claims-automation-platform'],
      },
    ],
    buyer: {
      fit: [
        'A clinic group has grown by acquisition, and each location runs different record, scheduling and billing systems.',
        'Claims or intake documents are read and re-keyed by staff, and the backlog or denial rate shows it.',
        'Telehealth, scheduling or billing sit outside the clinical record, and staff move data between them by hand.',
        'You need every access to patient or claim data logged in a form you can show an auditor.',
      ],
      notFit: [
        { text: 'A single practice whose needs a commercial EHR or practice management system already meets.' },
        { text: 'You need a certified product, or a firm that holds a specific certification or attestation. Ask any firm, this one included, for the document itself; this site publishes none.' },
        { text: 'You need advice on what regulations require of you. That comes from your compliance officer or counsel; software implements their decisions.' },
      ],
      scope: [
        { factor: 'Locations and source systems', effect: 'The number of sites and the distinct record, scheduling and billing systems to migrate from. Each source system is its own migration.' },
        { factor: 'Data classification', effect: 'Which data counts as protected health information, who may see which fields, and where it may be stored and processed. Your compliance officer decides; the build follows.' },
        { factor: 'Roles', effect: 'The staff types, and what each may read, change and export.' },
        { factor: 'Integrations', effect: 'Clearinghouses, payers, labs, pharmacies and existing EHRs, and whether each offers HL7 v2, FHIR or a proprietary interface.' },
        { factor: 'Claims rules', effect: 'The number of payers or plans and how often their rules change, since rules are maintained as configuration long after launch.' },
        { factor: 'Document quality', effect: 'For extraction: the mix of clean PDFs, scans and faxes, and how sure the system must be before a claim skips human review.' },
        { factor: 'Agreements and reviews', effect: 'Which agreements your organization requires vendors and hosting providers to sign, and which security review or risk assessment must pass before go-live.' },
        { factor: 'Rollout', effect: 'Pilot sites, staff training, and how long old and new systems run side by side.' },
      ],
      firstPhase:
        'A sensible first phase is a review of data flows and access before any feature work: what data exists, where it lives, who touches it and what has to be logged. Both of our case studies began that way, one with a gap analysis across 35 clinics and the other with rule modeling and an encryption strategy.',
      bring: [
        'The number of locations and the systems each uses for records, scheduling and billing.',
        'Your compliance officer or security lead, or their written requirements, including any agreement a vendor must sign.',
        'The staff roles and what each needs to see.',
        'The payers or plans you bill, and the current denial rate and backlog if billing is in scope.',
        'Sample documents with patient data removed.',
        'The systems you must exchange data with, and the interface each supports.',
        'The questions your reviewers will ask about hosting region, encryption and audit logging, so they can be answered in writing.',
      ],
    },
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
    // Cards restate the linked case studies (re-read 2026-10-10); `proof` names the source of each.
    // Buyer guidance is vendor-neutral. Its only statements about Peregrine are in `firstPhase`
    // and restate the case studies' own phase descriptions.
    // Payroll tax: no rule or rate is stated; the buyer is asked to bring jurisdictions and the
    // source of tax content.
    whatWeBuild: [
      {
        title: 'Multi-state payroll engine',
        body: 'A tax rule engine with versioned, state-specific configuration and effective dates, regression-tested against known pay scenarios before each release. The platform in our case study covers 40+ states.',
        proof: ['hr-payroll-saas-platform'],
      },
      {
        title: 'Payroll, accounting and e-signature integrations',
        body: 'ADP and QuickBooks integrations for deductions and ledger entries, and DocuSign for I-9 and W-4 forms.',
        proof: ['hr-payroll-saas-platform'],
      },
      {
        title: 'Employee self-service',
        body: 'A portal for pay stubs, W-4 updates, direct deposit and document downloads, with every change logged with the user, the time and the before and after values.',
        proof: ['hr-payroll-saas-platform'],
      },
      {
        title: 'Applicant tracking with resume parsing',
        body: 'Resumes in PDF and Word parsed into structured candidate records and indexed in Elasticsearch. The case study reports parsing accuracy improving from 60% to 92%.',
        proof: ['recruitment-ats-platform'],
      },
      {
        title: 'Configurable pipelines and branded career pages',
        body: 'Pipeline stages that each company defines for itself, interview scheduling through the Calendly API, and career pages on custom domains.',
        proof: ['recruitment-ats-platform'],
      },
    ],
    buyer: {
      fit: [
        'You sell HR, payroll or recruiting software to many employers, and each needs its own data, pipeline or pay rules.',
        'Payroll spans several states and rule changes are applied by hand.',
        'Recruiters re-key resumes and schedule interviews over email.',
        'Employees call HR for pay stubs and form changes they could handle themselves.',
      ],
      notFit: [
        { text: 'You are a single employer whose payroll a commercial provider already runs correctly. A payroll engine for one company rarely makes sense.' },
        { text: 'You need tax or employment-law advice. Rates and rules come from your tax-content provider or counsel; software applies them.' },
        { text: 'An existing applicant tracking system fits your hiring process and the gap is adoption.' },
      ],
      scope: [
        { factor: 'Jurisdictions', effect: 'The states and localities where employees work and live. Bring the list; each one adds rules to configure and test.' },
        { factor: 'Source of tax rules', effect: 'Whether rates and rules come from a tax-content provider or are maintained in-house, and who is accountable when one changes.' },
        { factor: 'Pay complexity', effect: 'Pay schedules, the mix of hourly and salaried staff, bonuses, garnishments and benefits deductions.' },
        { factor: 'Integrations', effect: 'Payroll providers, accounting, benefits carriers, e-signature, calendars and job boards.' },
        { factor: 'Tenancy', effect: 'The number of employer customers, and what each can configure for itself.' },
        { factor: 'Audit and retention', effect: 'What must be logged, how long documents are kept, and who can see them. Bring your auditor\'s or counsel\'s requirements.' },
        { factor: 'Candidate data', effect: 'Resume formats and volume, the fields that matter for search, and your rules for keeping or deleting candidate data.' },
        { factor: 'Migration', effect: 'Employee, pay-history and candidate records to move, and where the cut-over falls relative to a pay period or year end.' },
      ],
      firstPhase:
        'For payroll, a sensible first phase is the rule model and a suite of known pay scenarios for a few states, run in parallel with the current system before anyone is paid from the new one; the payroll platform in our case study was piloted with 10 companies before rollout. For recruiting, it is one company\'s pipeline from application to offer, using real resumes.',
      bring: [
        'The states and localities you run payroll in, with employee counts for each.',
        'Your current payroll provider, where your tax rules come from, and the systems payroll must exchange data with.',
        'A few anonymized pay scenarios with known correct results.',
        'Audit, retention and access requirements from your auditor or counsel.',
        'For recruiting: sample resumes, your pipeline stages and monthly applicant volume.',
        'The number of employer customers and what each should be able to configure.',
      ],
    },
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
    // Cards restate the linked case studies (re-read 2026-10-10); `proof` names the source of each.
    // Buyer guidance is vendor-neutral. Its only statements about Peregrine are in `firstPhase`
    // and restate the case studies' own phase descriptions.
    // Card data: no PCI requirement is stated; the buyer is asked to bring the payment
    // provider's guidance.
    whatWeBuild: [
      {
        title: 'Multi-vendor carts and split payments',
        body: 'Orders that contain products from several vendors, with commission, tax and payouts calculated for each vendor through Stripe Connect.',
        proof: ['multi-vendor-ecommerce-marketplace'],
      },
      {
        title: 'Vendor onboarding and inventory sync',
        body: 'Self-service onboarding, bulk catalog import and stock sync, so vendors who sell on several channels do not oversell. The marketplace in our case study went from 50 vendors at soft launch to 400+.',
        proof: ['multi-vendor-ecommerce-marketplace'],
      },
      {
        title: 'Bilingual storefronts',
        body: 'A server-rendered storefront in Arabic and English, with layouts that mirror for right-to-left reading.',
        proof: ['multi-vendor-ecommerce-marketplace'],
      },
      {
        title: 'Order routing and driver dispatch',
        body: 'Orders assigned to the nearest restaurant branch and pushed to drivers ranked by distance and current load, with live status for the customer, the kitchen and the driver.',
        proof: ['food-delivery-aggregator-platform'],
      },
      {
        title: 'Offline-capable POS and kitchen displays',
        body: 'A tablet POS that stores orders locally and syncs when the connection returns, kitchen displays fed over WebSocket, and a nightly job that reconciles in-store and online payments.',
        proof: ['restaurant-pos-ordering-system'],
      },
    ],
    buyer: {
      fit: [
        'Several sellers, restaurants or locations transact through one platform, and money has to be split between them.',
        'In-store and online orders live in separate systems and are reconciled by hand.',
        'Locations lose sales when the internet drops.',
        'Dispatch runs on messaging groups, and customers call to ask where the order is.',
        'You sell in a market or language that hosted store platforms do not handle properly.',
      ],
      notFit: [
        { text: 'A single brand selling its own products online. A hosted store platform is the cheaper start; if it needs extending, see', link: { href: '/services/shopify-development', label: 'Shopify development' } },
        { text: 'One restaurant or a few locations that an off-the-shelf POS and a delivery marketplace already serve.' },
        { text: 'You plan to store or process card numbers yourself. Use a payment provider\'s hosted fields or terminals, and ask the provider what that leaves in your PCI scope.' },
      ],
      scope: [
        { factor: 'Sides of the platform', effect: 'Buyers, vendors or restaurants, drivers and your own operations team each need an app or portal.' },
        { factor: 'Money flow', effect: 'Who the merchant of record is, how commission and tax are calculated, payout schedules, refunds and chargebacks.' },
        { factor: 'Payment methods', effect: 'Cards, wallets, buy-now-pay-later and in-person terminals, and which providers serve your market.' },
        { factor: 'Card data', effect: 'Whether any card data touches your systems. Bring your payment provider\'s guidance on your PCI responsibilities instead of assuming.' },
        { factor: 'Catalog and menus', effect: 'The number of items, variants and modifiers, how vendors supply them, and how often prices change.' },
        { factor: 'Peak load', effect: 'Orders in the busiest hour, such as a flash sale or a lunch rush, which sets the load-test target.' },
        { factor: 'Offline and hardware', effect: 'What must work without a connection, and the tablets, printers, terminals and kitchen screens in use.' },
        { factor: 'Delivery', effect: 'Your own drivers, third-party fleets or pickup only, and whether live tracking is needed.' },
        { factor: 'Languages and regions', effect: 'Languages, right-to-left layouts, currencies and tax rules for each market.' },
      ],
      firstPhase:
        'A sensible first phase follows one order from placement to payout using payment test accounts: one vendor or location, one payment method, one fulfillment path. The projects in our case studies then launched small: a soft launch with 50 vendors in one, offline testing at a pilot location in another.',
      bring: [
        'Each side of the platform and rough counts: vendors, restaurants or locations, drivers, monthly orders and the peak hour.',
        'How money should move: the commission model, payout timing and who handles refunds.',
        'The payment providers you use or prefer, and what they have told you about your PCI responsibilities.',
        'Sample catalogs or menus in the format vendors actually supply.',
        'The hardware at each location.',
        'The systems used today for orders, POS and delivery, and what is reconciled by hand.',
        'Markets, languages and currencies.',
      ],
    },
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
