// Single source of truth for case-study data: the hub cards, Article/BreadcrumbList
// JSON-LD, related links and homepage "Selected work" all read from here.
// Case studies have no publish dates, so none are stored (don't derive them from git).

export type CaseStudyTheme = "cyan" | "purple" | "orange" | "teal" | "green" | "amber" | "blue";

export interface CaseStudy {
  slug: string;
  /** Short title used for hub cards, related links and the Article headline. */
  title: string;
  /** Matches the page's meta description. */
  description: string;
  /** Site-relative image path. */
  image: string;
  industry: string;
  stack: string[];
  /** Slugs of 2–3 case studies sharing an industry or stack. */
  related: string[];
  /** Primary service page (src/data/services.ts) this case study is linked to. */
  service: string;
  /** Presentation for the /case-studies hub card. */
  card: {
    category: string;
    theme: CaseStudyTheme;
    iconTheme?: CaseStudyTheme;
    icons: [string, string, string];
    flow: string;
    industryIcon: string;
    /** Only set where the card label differs from `industry`. */
    industry?: string;
    duration: string;
    summary: string;
    badges: [string, string];
  };
}

export const SITE_URL = "https://peregrine-it.com";

export const caseStudies: CaseStudy[] = [
  {
    slug: "scaling-real-estate-saas-platform",
    title: "Scaling a Real Estate SaaS Platform from 5 Agents to 200+",
    description: "How we re-architected a US and Canadian property search platform to handle millions of MLS listings with sub-second search, growing from 5 agents to 200+.",
    image: "/ogimage.png",
    industry: "Real Estate / PropTech",
    stack: ["Next.js", "Node.js", "MongoDB", "Elasticsearch", "Redis", "AWS (SES, S3)", "Linode / VPS", "MLS / RETS API"],
    related: ["w3re-ai-real-estate-platform", "proptech-investor-portal", "self-storage-management-platform"],
    service: "saas-development",
    card: {
      category: "proptech saas",
      theme: "cyan",
      iconTheme: "blue",
      icons: ["ri-search-line", "ri-database-2-line", "ri-flashlight-line"],
      flow: "MongoDB → Elasticsearch → Redis",
      industryIcon: "ri-building-line",
      duration: "8 month project",
      summary: "How we re-architected a property search platform across the US and Canada — handling millions of MLS listings with sub-second response times.",
      badges: ["94% faster search", "99.9% uptime"],
    },
  },
  {
    slug: "w3re-ai-real-estate-platform",
    title: "AI-Powered Multi-Market Real Estate Platform",
    description: "How we built an AI platform for W3|re across 4 MLS markets: natural-language search, a valuation model, a lead chatbot and a unified data pipeline.",
    image: "/images/case-studies/Image7-e7e8a93c-2e0c-4711-85a8-0dfbba6cd59a.png",
    industry: "Real Estate / PropTech",
    stack: ["Next.js", "React Native", "Node.js", "Python", "PostgreSQL", "Redis", "Apache Kafka", "TensorFlow", "XGBoost", "LangChain", "Pinecone", "Mapbox GL", "AWS EKS", "SageMaker"],
    related: ["scaling-real-estate-saas-platform", "proptech-investor-portal", "self-storage-management-platform"],
    service: "ai-automation",
    card: {
      category: "proptech saas",
      theme: "purple",
      icons: ["ri-robot-2-line", "ri-chat-voice-line", "ri-calculator-line"],
      flow: "AI · NLP Search · AVM · Chatbot",
      industryIcon: "ri-building-line",
      duration: "14 month project",
      summary: "How we built an AI-native platform for W3|re — 62% workload reduction, 3.8× lead conversion, 94% valuation accuracy across 4 MLS markets.",
      badges: ["4 MLS", "AI/ML"],
    },
  },
  {
    slug: "self-storage-management-platform",
    title: "Self-Storage Management Platform with IoT-Powered Access Control",
    description: "How we built a SaaS platform for self-storage operators with smart-lock integration, automated billing and live occupancy dashboards for 150+ facilities.",
    image: "/ogimage.png",
    industry: "Self-Storage / Property Management",
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Redis", "MQTT / IoT", "Stripe", "AWS"],
    related: ["logistics-fleet-tracking-platform", "manufacturing-erp-system", "proptech-investor-portal"],
    service: "saas-development",
    card: {
      category: "proptech saas iot mobile",
      theme: "purple",
      icons: ["ri-door-lock-box-line", "ri-wifi-line", "ri-dashboard-3-line"],
      flow: "IoT Locks → Billing → Occupancy",
      industryIcon: "ri-building-3-line",
      industry: "Self-Storage / PropTech",
      duration: "10 month project",
      summary: "How we engineered a full-stack SaaS platform for 150+ storage facilities — with smart lock integration, automated billing, and real-time occupancy dashboards.",
      badges: ["150+ facilities", "IoT access"],
    },
  },
  {
    slug: "logistics-fleet-tracking-platform",
    title: "Real-Time Fleet Tracking Platform for a Regional Logistics Company",
    description: "How we built a GPS fleet management system with live tracking, route optimization, driver apps and customer ETA alerts for 500+ vehicles in the MENA region.",
    image: "/ogimage.png",
    industry: "Logistics / Transportation",
    stack: ["React Native", "Next.js", "Node.js", "TimescaleDB", "Redis", "MQTT", "Google Maps API", "AWS"],
    related: ["supply-chain-visibility-platform", "food-delivery-aggregator-platform", "self-storage-management-platform"],
    service: "api-integration",
    card: {
      category: "logistics saas mobile iot",
      theme: "orange",
      icons: ["ri-truck-line", "ri-map-pin-line", "ri-route-line"],
      flow: "GPS → Routes → Live ETAs",
      industryIcon: "ri-truck-line",
      duration: "7 month project",
      summary: "How we built a GPS-powered fleet management system with live tracking, route optimization, driver mobile apps, and customer ETA notifications — managing 500+ vehicles.",
      badges: ["23% fuel savings", "500+ vehicles"],
    },
  },
  {
    slug: "multi-location-clinic-management",
    title: "Unified Clinic Management System for a Multi-Location Healthcare Network",
    description: "How we built a HIPAA-compliant practice management platform unifying patient records, telehealth, scheduling and insurance billing across 35 clinics.",
    image: "/ogimage.png",
    industry: "Healthcare / HealthTech",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebRTC", "AWS (HIPAA BAA)", "Stripe", "HL7 FHIR"],
    related: ["insurance-claims-automation-platform", "fitness-wellness-subscription-app"],
    service: "saas-development",
    card: {
      category: "healthcare saas",
      theme: "teal",
      icons: ["ri-heart-pulse-line", "ri-shield-check-line", "ri-video-chat-line"],
      flow: "EHR → Telehealth → Claims",
      industryIcon: "ri-heart-pulse-line",
      duration: "12 month project",
      summary: "How we built a HIPAA-compliant practice management platform — unifying patient records, telehealth, and insurance billing across 35 clinic locations.",
      badges: ["HIPAA compliant", "35 clinics"],
    },
  },
  {
    slug: "multi-vendor-ecommerce-marketplace",
    title: "Multi-Vendor E-Commerce Marketplace with Split Payments & Bilingual UX",
    description: "How we built a bilingual Arabic/English marketplace for 400+ Gulf vendors with automated split payments, vendor onboarding and real-time inventory sync.",
    image: "/ogimage.png",
    industry: "E-Commerce / Marketplace",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "Stripe Connect", "Redis", "AWS", "React Native"],
    related: ["food-delivery-aggregator-platform", "event-ticketing-platform", "restaurant-pos-ordering-system"],
    service: "saas-development",
    card: {
      category: "ecommerce saas",
      theme: "green",
      icons: ["ri-store-2-line", "ri-bank-card-line", "ri-translate-2"],
      flow: "Vendors → Payments → AR/EN",
      industryIcon: "ri-store-2-line",
      duration: "9 month project",
      summary: "How we engineered a marketplace for 400+ vendors in the Gulf region — with automated split payments, vendor onboarding, and full Arabic/English support.",
      badges: ["400+ vendors", "RTL/LTR"],
    },
  },
  {
    slug: "proptech-investor-portal",
    title: "Investor Communication Portal for a Real Estate Development Firm",
    description: "How we built a role-based investor portal with document management, milestone tracking, capital calls and distribution reporting for a $450M portfolio.",
    image: "/ogimage.png",
    industry: "Real Estate / Investment",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS S3", "DocuSign API", "Stripe", "Chart.js"],
    related: ["w3re-ai-real-estate-platform", "scaling-real-estate-saas-platform", "legal-document-automation-platform"],
    service: "saas-development",
    card: {
      category: "proptech fintech saas",
      theme: "amber",
      icons: ["ri-funds-box-line", "ri-file-lock-line", "ri-pie-chart-line"],
      flow: "Documents → RBAC → Reporting",
      industryIcon: "ri-funds-box-line",
      duration: "6 month project",
      summary: "How we built a secure, role-based portal for 280+ investors — with document management, milestone tracking, and automated distribution reporting across a $450M portfolio.",
      badges: ["$450M AUM", "85% time saved"],
    },
  },
  {
    slug: "edtech-learning-platform",
    title: "EdTech Learning Platform with LMS & Video Streaming",
    description: "How we built a full-stack EdTech platform with LMS, HLS video streaming, and course management — serving 12K+ enrollments across 500+ courses with 99.2% uptime.",
    image: "/ogimage.png",
    industry: "Education / EdTech",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS MediaConvert", "Stripe", "AWS", "CloudFront"],
    related: ["fitness-wellness-subscription-app", "realtime-collaboration-tool"],
    service: "cloud-devops",
    card: {
      category: "saas mobile",
      theme: "teal",
      icons: ["ri-video-line", "ri-book-open-line", "ri-donut-chart-line"],
      flow: "LMS → HLS Video → 12K+ enrollments",
      industryIcon: "ri-book-open-line",
      duration: "9 month project",
      summary: "How we built a full-stack EdTech platform with course management, HLS video delivery, and progress tracking — serving 12K+ enrollments and 500+ courses.",
      badges: ["500+ courses", "99.2% uptime"],
    },
  },
  {
    slug: "food-delivery-aggregator-platform",
    title: "Food Delivery Aggregator for Multi-Restaurant Marketplace",
    description: "How we built a multi-restaurant food delivery platform with 200+ restaurants, 50K+ orders a month and real-time driver dispatch.",
    image: "/ogimage.png",
    industry: "FoodTech / E-Commerce",
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Redis", "Firebase", "Stripe", "Geo Services"],
    related: ["restaurant-pos-ordering-system", "multi-vendor-ecommerce-marketplace", "logistics-fleet-tracking-platform"],
    service: "saas-development",
    card: {
      category: "ecommerce mobile saas logistics",
      theme: "orange",
      icons: ["ri-restaurant-2-line", "ri-truck-line", "ri-map-pin-line"],
      flow: "200+ Restaurants → Real-Time Dispatch",
      industryIcon: "ri-restaurant-2-line",
      duration: "11 month project",
      summary: "How we built a FoodTech aggregator with 200+ restaurants, 50K+ orders/month, and real-time driver dispatch achieving <3min delivery.",
      badges: ["50K+ orders/mo", "Real-time"],
    },
  },
  {
    slug: "hr-payroll-saas-platform",
    title: "HR & Payroll SaaS for Mid-Market Companies",
    description: "How we built an HR and payroll SaaS for 85+ mid-market companies and 12K employees, with multi-state tax, benefits integration and 99.9% payroll accuracy.",
    image: "/ogimage.png",
    industry: "HR Tech / FinTech",
    stack: ["Next.js", "Node.js", "PostgreSQL", "ADP API", "QuickBooks API", "DocuSign", "SOC 2", "AWS"],
    related: ["recruitment-ats-platform", "legal-document-automation-platform"],
    service: "api-integration",
    card: {
      category: "saas fintech",
      theme: "purple",
      icons: ["ri-user-3-line", "ri-money-dollar-circle-line", "ri-shield-check-line"],
      flow: "Multi-State Tax → 99.9% Accuracy",
      industryIcon: "ri-user-3-line",
      duration: "10 month project",
      summary: "How we built an HR & payroll SaaS for 85+ companies and 12K employees — with multi-state tax, benefits integration, and 99.9% payroll accuracy.",
      badges: ["12K employees", "SOC 2"],
    },
  },
  {
    slug: "insurance-claims-automation-platform",
    title: "Insurance Claims Automation for Claims Processing",
    description: "How we built a claims automation platform processing 45K+ claims a year, with document extraction, multi-carrier rules and a full audit trail.",
    image: "/ogimage.png",
    industry: "InsurTech / FinTech",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS Textract", "HL7 FHIR", "HIPAA", "AWS", "Encryption"],
    related: ["multi-location-clinic-management", "legal-document-automation-platform", "hr-payroll-saas-platform"],
    service: "ai-automation",
    card: {
      category: "fintech saas healthcare",
      theme: "cyan",
      icons: ["ri-file-search-line", "ri-robot-2-line", "ri-shield-check-line"],
      flow: "Textract → Multi-Carrier → HIPAA",
      industryIcon: "ri-shield-check-line",
      duration: "14 month project",
      summary: "How we built an InsurTech claims platform processing 45K+ claims/year — with document extraction, multi-carrier rules, and 60% faster processing.",
      badges: ["45K+ claims/yr", "HIPAA"],
    },
  },
  {
    slug: "restaurant-pos-ordering-system",
    title: "Restaurant POS & Online Ordering for QSR Chains",
    description: "How we built a POS and online ordering platform for QSR chains across 120+ locations, with offline-first POS, kitchen display and multi-location sync.",
    image: "/ogimage.png",
    industry: "Hospitality / FoodTech",
    stack: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "WebSocket", "SQLite"],
    related: ["food-delivery-aggregator-platform", "multi-vendor-ecommerce-marketplace", "event-ticketing-platform"],
    service: "saas-development",
    card: {
      category: "ecommerce saas mobile",
      theme: "green",
      icons: ["ri-tablet-line", "ri-restaurant-2-line", "ri-shopping-bag-line"],
      flow: "Offline POS → KDS → 120+ Locations",
      industryIcon: "ri-restaurant-2-line",
      duration: "8 month project",
      summary: "How we built a POS and online ordering platform for 120+ locations — with offline-first tablets, kitchen display, and 25K daily orders.",
      badges: ["25K daily", "98% uptime"],
    },
  },
  {
    slug: "legal-document-automation-platform",
    title: "Legal Document Automation for Contract Generation & E-Signature",
    description: "How we built a legal document automation platform for 15K+ documents a month, with contract templates, clause libraries and multi-party e-signature.",
    image: "/ogimage.png",
    industry: "Legal Tech / FinTech",
    stack: ["Next.js", "Node.js", "PostgreSQL", "DocuSign", "AWS S3", "Redis", "SOC2", "PDF Generation"],
    related: ["hr-payroll-saas-platform", "proptech-investor-portal", "insurance-claims-automation-platform"],
    service: "api-integration",
    card: {
      category: "fintech saas",
      theme: "amber",
      icons: ["ri-file-text-line", "ri-user-add-line", "ri-shield-check-line"],
      flow: "15K+ docs · DocuSign · SOC2",
      industryIcon: "ri-file-text-line",
      duration: "9 month project",
      summary: "How we built a legal document automation platform processing 15K+ documents/month with multi-party e-signature and SOC2 compliance.",
      badges: ["40% faster", "SOC2"],
    },
  },
  {
    slug: "manufacturing-erp-system",
    title: "Manufacturing ERP for Production & Inventory",
    description: "How we built a manufacturing ERP for 8 factories and 50K SKUs with multi-plant sync, BOM management, shop-floor data capture and 30% lower inventory.",
    image: "/ogimage.png",
    industry: "Manufacturing / Industrial",
    stack: ["Next.js", "Node.js", "PostgreSQL", "MQTT", "Redis", "SAP Integration", "Multi-Plant", "Analytics"],
    related: ["supply-chain-visibility-platform", "self-storage-management-platform", "logistics-fleet-tracking-platform"],
    service: "api-integration",
    card: {
      category: "saas iot",
      theme: "cyan",
      icons: ["ri-building-4-line", "ri-stack-line", "ri-bar-chart-box-line"],
      flow: "8 Factories · 50K SKUs · SAP",
      industryIcon: "ri-building-4-line",
      duration: "12 month project",
      summary: "How we built a manufacturing ERP spanning 8 factories and 50K SKUs with MQTT shop floor data and 30% inventory reduction.",
      badges: ["30% reduction", "Real-time"],
    },
  },
  {
    slug: "recruitment-ats-platform",
    title: "Recruitment ATS for Applicant Tracking & Hiring",
    description: "How we built a recruitment ATS for 200+ companies and 80K+ candidates, with resume parsing, interview scheduling and a 65% cut in time-to-hire.",
    image: "/ogimage.png",
    industry: "HR Tech / SaaS",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Elasticsearch", "SendGrid", "Calendly API", "Resume Parsing", "Multi-Tenant"],
    related: ["hr-payroll-saas-platform", "realtime-collaboration-tool"],
    service: "saas-development",
    card: {
      category: "saas",
      theme: "teal",
      icons: ["ri-user-search-line", "ri-file-search-line", "ri-calendar-check-line"],
      flow: "200+ Companies · 80K+ Candidates",
      industryIcon: "ri-user-3-line",
      duration: "8 month project",
      summary: "How we built a recruitment ATS for 200+ companies and 80K+ candidates with resume parsing and 65% time-to-hire reduction.",
      badges: ["65% faster", "Elasticsearch"],
    },
  },
  {
    slug: "event-ticketing-platform",
    title: "Event Ticketing Platform with Real-Time Availability",
    description: "How we built an event ticketing platform for 500+ events and 120K tickets, with scalable checkout, fraud prevention and refund workflows.",
    image: "/ogimage.png",
    industry: "Events / E-Commerce",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Stripe", "Twilio", "Fraud Prevention", "Multi-Venue"],
    related: ["multi-vendor-ecommerce-marketplace", "restaurant-pos-ordering-system"],
    service: "saas-development",
    card: {
      category: "ecommerce saas",
      theme: "green",
      icons: ["ri-calendar-event-line", "ri-ticket-2-line", "ri-shopping-cart-line"],
      flow: "500+ Events · 120K Tickets · Redis",
      industryIcon: "ri-calendar-event-line",
      duration: "7 month project",
      summary: "How we built an event ticketing platform for 500+ events and 120K tickets with 99.5% availability accuracy and fraud prevention.",
      badges: ["99.5% accuracy", "Stripe"],
    },
  },
  {
    slug: "supply-chain-visibility-platform",
    title: "Supply Chain Visibility for Shipment Tracking & Alerts",
    description: "How we built a supply chain visibility platform tracking 2M+ shipments across 12 carriers, with ETA prediction, exception alerts and 45% fewer inquiries.",
    image: "/ogimage.png",
    industry: "Logistics / Supply Chain",
    stack: ["Next.js", "Node.js", "PostgreSQL", "TimescaleDB", "Redis", "AWS", "Carrier APIs", "Multi-Tenant"],
    related: ["logistics-fleet-tracking-platform", "manufacturing-erp-system"],
    service: "api-integration",
    card: {
      category: "logistics saas",
      theme: "orange",
      icons: ["ri-truck-line", "ri-map-pin-line", "ri-error-warning-line"],
      flow: "2M+ Shipments · 12 Carriers",
      industryIcon: "ri-truck-line",
      duration: "10 month project",
      summary: "How we built a supply chain visibility platform for 2M+ shipments across 12 carriers with ETA prediction and 45% fewer inquiries.",
      badges: ["45% fewer", "TimescaleDB"],
    },
  },
  {
    slug: "realtime-collaboration-tool",
    title: "Real-Time Collaboration Tool for Documents & Chat",
    description: "How we built a real-time collaboration platform for 5K+ workspaces and 25K users, with presence, permissions, offline sync and sub-100ms sync latency.",
    image: "/ogimage.png",
    industry: "SaaS / Productivity",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "WebSocket", "CRDT", "Yjs", "Presence"],
    related: ["recruitment-ats-platform", "edtech-learning-platform"],
    service: "saas-development",
    card: {
      category: "saas mobile",
      theme: "purple",
      icons: ["ri-file-edit-line", "ri-chat-3-line", "ri-user-follow-line"],
      flow: "5K+ Workspaces · <100ms Sync",
      industryIcon: "ri-cloud-line",
      duration: "11 month project",
      summary: "How we built a real-time collaboration platform for 5K+ workspaces and 25K users with CRDT, presence, and <100ms sync.",
      badges: ["25K users", "WebSocket"],
    },
  },
  {
    slug: "fitness-wellness-subscription-app",
    title: "Fitness Subscription App with Workout Tracking & Live Classes",
    description: "How we built a fitness subscription app with 80K+ subscribers and 2M+ workouts logged, featuring video streaming, workout sync and offline mode.",
    image: "/ogimage.png",
    industry: "Health & Wellness",
    stack: ["React Native", "Node.js", "PostgreSQL", "AWS", "Stripe", "Agora/Twilio", "HLS", "SQLite"],
    related: ["edtech-learning-platform", "multi-location-clinic-management"],
    service: "saas-development",
    card: {
      category: "mobile saas healthcare",
      theme: "purple",
      icons: ["ri-run-line", "ri-video-line", "ri-pie-chart-line"],
      flow: "80K+ Subs → 2M+ Workouts → 4.8★",
      industryIcon: "ri-run-line",
      duration: "7 month project",
      summary: "How we built a fitness app with 80K+ subscribers, 2M+ workouts logged, and 4.8 rating — with video streaming, offline mode, and live classes.",
      badges: ["2M+ workouts", "4.8 rating"],
    },
  },
];

/** Featured on the homepage "Selected work" section. */
export const featuredCaseStudySlugs = [
  "w3re-ai-real-estate-platform",
  "scaling-real-estate-saas-platform",
  "proptech-investor-portal",
  "supply-chain-visibility-platform",
  "self-storage-management-platform",
  "hr-payroll-saas-platform",
];

export function getCaseStudy(slug: string): CaseStudy {
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) throw new Error(`Unknown case study: ${slug}`);
  return study;
}

export const caseStudyUrl = (slug: string) => `${SITE_URL}/case-studies/${slug}`;
