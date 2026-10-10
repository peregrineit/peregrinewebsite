import type { BuyerGuide, Service } from './services';
import { caseStudies } from './case-studies';

// Technology service pages (/services/<slug>, group: 'technology'). They use the same
// template as the core services.
//
// Evidence rules:
// - Next.js and React: backed by published case studies; each note restates how that
//   case study describes its own stack.
// - Shopify, Laravel, WordPress: the owner approved these pages (2026-10-09) but no
//   project has been published, so they are capability pages. They describe what the
//   work covers, cite no project, and say that no case study is published yet.
//   TODO(owner): supply one real project each (B5 in docs/seo/BLOCKERS.md) and replace
//   the "no published case study" wording with it.

const usingStack = (name: string) => caseStudies.filter((c) => c.stack.some((s) => s.includes(name))).length;
const NEXT_COUNT = usingStack('Next.js');
// Case studies whose page actually describes a React Native app (the five cited on the
// React page). Two more list React Native in their stack without describing a mobile app.
const RN_COUNT = 5;
const TOTAL = caseStudies.length;
const MODEL = 'fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call';

export const technologyServices: Service[] = [
  {
    slug: 'nextjs-development',
    group: 'technology',
    name: 'Next.js Development',
    serviceType: 'Next.js web application development',
    title: 'Next.js Development for SaaS and Portals',
    metaDescription:
      'Next.js development for SaaS products, portals and storefronts: server rendering, dashboards, white-label sites and performance work, with case studies.',
    h1: 'Next.js Development for SaaS Platforms, Portals and Storefronts',
    offer: 'Server-rendered web apps, dashboards and portals built on Next.js and React.',
    intro: [
      'Next.js development is building web applications on Next.js, the React framework that renders pages on the server, so they load quickly, can be indexed by search engines and still behave like an app once loaded.',
      'It is for teams building a SaaS product, a customer or investor portal, a storefront or a set of white-label sites, where page speed and search visibility matter as much as the features behind the login.',
      `Peregrine uses Next.js as its default web frontend: ${NEXT_COUNT} of our ${TOTAL} published case studies run on it, and so does this website.`,
    ],
    whatWeBuild: [
      {
        title: 'Server-rendered storefronts and public pages',
        body: 'Pages that have to rank and load fast: storefronts, listing and property pages, career pages and catalogs. Our marketplace case study uses a server-rendered Next.js storefront in Arabic and English with a true right-to-left layout.',
        proof: ['multi-vendor-ecommerce-marketplace'],
      },
      {
        title: 'Portals and dashboards',
        body: 'Signed-in applications with a personalized view per user and role-based access: investor portals, shipper portals, clinician dashboards and claims workspaces all appear in our case studies as Next.js apps.',
        proof: ['proptech-investor-portal'],
      },
      {
        title: 'Admin consoles and internal tools',
        body: 'The operating side of a product: HR and payroll admin, course management for instructors, plant dashboards and a bill-of-materials editor.',
      },
      {
        title: 'White-label and multi-tenant sites',
        body: 'Many branded sites served from one codebase, such as agent IDX websites or per-company career pages, with each tenant\'s theme, domain and content kept separate.',
      },
      {
        title: 'Performance work on existing Next.js apps',
        body: 'Incremental static regeneration, dynamic imports and image delivery through a CDN. That is how the frontend in our real estate SaaS case study was optimized before launch.',
        proof: ['scaling-real-estate-saas-platform'],
      },
    ],
    process: [
      { title: 'Rendering and data plan', body: 'For each page type we decide what is rendered on the server, what is cached and what is fetched in the browser, based on how fresh the data must be.' },
      { title: 'Design system and core pages', body: 'Shared components first, then the pages that carry the product: the catalog or dashboard, detail pages and the signed-in flows.' },
      { title: 'Integrations and auth', body: 'Authentication, roles, payments and the API behind the app, with the backend your product needs.' },
      { title: 'Performance and launch', body: 'Core Web Vitals checks, caching and image optimization, then a phased rollout.' },
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Tailwind CSS', 'Vercel', 'AWS'],
    caseStudies: [
      { slug: 'multi-vendor-ecommerce-marketplace', note: 'A server-rendered bilingual Next.js storefront with a true right-to-left layout engine for Arabic.' },
      { slug: 'scaling-real-estate-saas-platform', note: 'Agent IDX websites on a Next.js frontend optimized with incremental static regeneration, dynamic imports and CDN image delivery.' },
      { slug: 'proptech-investor-portal', note: 'The investor portal is a responsive Next.js dashboard with a personalized view for each investor.' },
      { slug: 'recruitment-ats-platform', note: 'A Next.js recruiter portal with a Kanban pipeline, plus branded career pages for each company.' },
      { slug: 'insurance-claims-automation-platform', note: 'A Next.js workspace where adjusters handle claim intake, the review queue, corrections to extracted data and approvals.' },
    ],
    guides: [],
    answers: {
      includes:
        'Peregrine\'s Next.js development covers server-rendered storefronts and public pages, signed-in portals and dashboards, admin consoles, white-label and multi-tenant sites, and performance work on existing Next.js apps. We build the React frontend together with the API, authentication and data layer behind it, so one team owns the whole product.',
      timeline:
        'Peregrine sets the timeline for a Next.js project in the discovery sprint, because it depends on the number of page types, the integrations and whether a backend already exists. For reference, a typical SaaS MVP from Peregrine ships in 4 to 6 weeks and complex platforms take 8 to 12 weeks.',
      cost:
        `Peregrine works on Next.js development as ${MODEL}. Cost depends on the number of page types, the integrations behind them and whether we are also building the backend. We do not publish a price list. A single, well-defined task can get a scoped estimate.`,
      work:
        `${NEXT_COUNT} of Peregrine's ${TOTAL} published case studies use Next.js. Five are listed here: a bilingual marketplace storefront, agent IDX websites for a real estate SaaS, an investor portal, a recruiter portal with branded career pages, and an insurance claims workspace. Each case study describes the architecture around the frontend.`,
    },
    glance: {
      delivered: 'Next.js web application: server-rendered pages, portals and dashboards, admin tools, with the API and data layer behind them',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'When is Next.js a good choice?',
        answer: 'When pages need to load quickly and be indexed by search engines while still behaving like an application: storefronts, listing sites, portals with public pages, and SaaS products with a marketing site. It also suits teams that want one framework for both public pages and the signed-in app.',
      },
      {
        question: 'When is Next.js the wrong choice?',
        answer: 'For an app that lives entirely behind a login and has no public pages, a plain React single-page app can be simpler. For a native mobile experience you need a mobile framework such as React Native. And a mostly static brochure site may not need a framework at all.',
      },
      {
        question: 'Can you take over an existing Next.js or React codebase?',
        answer: 'Yes. We start with a code and architecture audit to find what is limiting the product, then fix or rebuild the parts that need it while the product stays live.',
      },
      {
        question: 'Do you build the backend as well?',
        answer: 'Yes. In our published case studies the Next.js frontend sits on a Node.js backend (one stack also lists Python) with PostgreSQL or MongoDB, plus Redis and Elasticsearch where search and caching need them. We can also build a Next.js frontend on an API you already have.',
      },
      {
        question: 'Is Next.js good for SEO?',
        answer: 'It gives you the right foundations: pages are rendered on the server, so search engines and AI crawlers receive complete HTML, and metadata, structured data and sitemaps are part of the framework. Rankings still depend on the content and on how the site is built.',
      },
    ],
    icon: 'ri-window-line',
  },
  {
    slug: 'react-development',
    group: 'technology',
    name: 'React & React Native Development',
    serviceType: 'React and React Native application development',
    title: 'React and React Native Development',
    metaDescription:
      'React and React Native development for web and mobile products: offline-first driver and POS apps, tenant and customer apps, with published case studies.',
    h1: 'React and React Native Development for Web and Mobile Products',
    offer: 'Web interfaces in React and mobile apps in React Native, sharing one backend.',
    intro: [
      'React development is building user interfaces from reusable components; React Native uses the same approach to build iOS and Android apps from one codebase.',
      'It is for products that need a web app and a mobile app working against the same data: field and driver apps, tablet point-of-sale, tenant and customer apps, alongside a web portal for staff.',
      `Peregrine builds both sides. ${RN_COUNT} of our ${TOTAL} published case studies describe a React Native app, and four of those pair it with a web app built on Next.js.`,
    ],
    whatWeBuild: [
      {
        title: 'Offline-first field and driver apps',
        body: 'Apps that keep working without a signal and sync when it returns. Our fleet tracking case study has a React Native driver app with offline sync, proof-of-delivery photos and turn-by-turn navigation.',
        proof: ['logistics-fleet-tracking-platform'],
      },
      {
        title: 'Tablet point-of-sale and kitchen displays',
        body: 'React Native apps on tablets with a local database, so orders can be taken and paid for during an outage. Our restaurant POS case study stores orders in SQLite on the device and syncs them later.',
        proof: ['restaurant-pos-ordering-system'],
      },
      {
        title: 'Customer and tenant apps',
        body: 'Consumer-facing apps for ordering, payments and live tracking, and a tenant app that controls a smart lock over Bluetooth or remotely, as in our food delivery and self-storage case studies.',
        proof: ['food-delivery-aggregator-platform', 'self-storage-management-platform'],
      },
      {
        title: 'Video and subscription apps',
        body: 'Streaming video playback with workout sync and an offline mode, as built for the subscription app in our fitness case study.',
        proof: ['fitness-wellness-subscription-app'],
      },
      {
        title: 'React web apps and shared components',
        body: 'Portals, dashboards and admin tools in React on Next.js, with data models and business rules shared between web and mobile through one API.',
      },
    ],
    process: [
      { title: 'Platforms and offline rules', body: 'We agree which platforms are in scope, what must work offline and how conflicts are resolved when devices sync.' },
      { title: 'Core flows', body: 'The few screens people use every day first, on real devices, with the API they depend on.' },
      { title: 'Device features', body: 'Camera, location, Bluetooth, push notifications and payments, each tested on the hardware it will run on.' },
      { title: 'Release', body: 'App store submission, a pilot group, then the wider rollout, with crash and performance monitoring.' },
    ],
    stack: ['React', 'React Native', 'Next.js', 'TypeScript', 'Node.js', 'SQLite', 'PostgreSQL', 'Redis', 'Stripe'],
    caseStudies: [
      { slug: 'logistics-fleet-tracking-platform', note: 'A React Native driver app with an offline-first architecture, proof-of-delivery camera and turn-by-turn navigation.' },
      { slug: 'restaurant-pos-ordering-system', note: 'A React Native POS for tablets with a local SQLite database for offline orders, plus kitchen displays.' },
      { slug: 'food-delivery-aggregator-platform', note: 'React Native apps for customers, drivers and restaurant kitchen displays, with a Next.js web app for diners and restaurant management.' },
      { slug: 'self-storage-management-platform', note: 'A React Native tenant app for payments and lock control, with Bluetooth and remote unlock.' },
      { slug: 'fitness-wellness-subscription-app', note: 'A React Native subscription app with streaming video playback, workout sync and an offline mode.' },
    ],
    guides: [],
    answers: {
      includes:
        'Peregrine\'s React and React Native development covers mobile apps for iOS and Android from one codebase, including offline-first field apps, tablet point-of-sale, and customer and tenant apps, together with React web portals and the shared API behind them. One team builds web, mobile and backend, so the data model stays consistent.',
      timeline:
        'Peregrine sets the timeline for a React or React Native project in the discovery sprint. It depends on how many platforms are in scope, what has to work offline and which device features are involved, such as Bluetooth, camera or payments. App store review also adds time that neither of us controls.',
      cost:
        `Peregrine works on React and React Native development as ${MODEL}. Cost depends on the platforms, the offline requirements, device features and whether the backend exists already. We do not publish a price list. A single, well-defined task can get a scoped estimate.`,
      work:
        `${RN_COUNT} of Peregrine's ${TOTAL} published case studies describe a React Native app. They are listed here: an offline-first driver app, a tablet point-of-sale that works offline, customer, driver and kitchen apps for food delivery, a tenant app with smart-lock control, and a fitness subscription app with video.`,
    },
    glance: {
      delivered: 'React web apps and React Native mobile apps for iOS and Android, with the shared API behind them',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'What is the difference between React and React Native?',
        answer: 'React builds interfaces for the web browser. React Native uses the same component model to build real iOS and Android apps. Teams that use both can share business logic, data models and developers between web and mobile.',
      },
      {
        question: 'Can a React Native app work offline?',
        answer: 'Yes, if it is designed for it. Data is stored on the device and synced when a connection returns, with rules for resolving conflicts. The POS in our restaurant case study and the driver app in our fleet tracking case study both work this way.',
      },
      {
        question: 'Can React Native use device hardware such as Bluetooth and the camera?',
        answer: 'Yes. Our case studies include Bluetooth smart-lock control in a tenant app and a proof-of-delivery camera in a driver app. Each device feature is tested on the hardware it will run on.',
      },
      {
        question: 'Should we build native apps instead of React Native?',
        answer: 'Fully native apps make sense when the product depends on the newest platform features or on heavy graphics. React Native suits most business apps, where one codebase for iOS and Android matters more than platform-specific polish.',
      },
      {
        question: 'Can you add a mobile app to our existing web product?',
        answer: 'Yes. If the product already has an API, a React Native app can be built against it; if it does not, we build the API first so web and mobile share one source of truth.',
      },
    ],
    icon: 'ri-reactjs-line',
  },
  {
    slug: 'shopify-development',
    group: 'technology',
    name: 'Shopify Development',
    serviceType: 'Shopify app and integration development',
    title: 'Shopify App and Integration Development',
    metaDescription:
      'Shopify development: custom apps, theme and headless storefront work, and integrations between Shopify and ERP, accounting and fulfillment systems.',
    h1: 'Shopify App, Storefront and Integration Development',
    // Capability page: no Shopify project has been published. No project claims.
    offer: 'Custom Shopify apps, storefront work and integrations with the systems around the store.',
    intro: [
      'Shopify development is extending a Shopify store beyond what themes and off-the-shelf apps provide: custom apps, storefront changes, and connections between Shopify and the other systems a business runs.',
      'It is for merchants whose store has outgrown app-store plugins, who need Shopify to exchange orders, stock and customers with an ERP, accounting or fulfillment system, or who want a custom storefront on top of Shopify\'s checkout.',
      'Peregrine offers Shopify app, storefront and integration development. We have not published a Shopify case study yet, so this page describes the work rather than citing a project.',
    ],
    whatWeBuild: [
      {
        title: 'Custom Shopify apps',
        body: 'Apps built on Shopify\'s Admin API and webhooks for logic the store needs and no existing app provides, such as custom pricing rules, order routing or approval steps, installed privately on your store.',
      },
      {
        title: 'ERP, accounting and fulfillment integrations',
        body: 'Two-way sync of orders, inventory, products and customers between Shopify and systems such as an ERP, an accounting package or a warehouse, with retries and reconciliation so a missed webhook does not become a missing order.',
      },
      {
        title: 'Theme customization',
        body: 'Changes to Liquid themes and sections: new templates, product page logic and performance fixes, kept compatible with the theme editor so your team can still manage content.',
      },
      {
        title: 'Headless storefronts',
        body: 'A custom storefront built with Next.js or Hydrogen on Shopify\'s Storefront API, for brands that need full control of the front end while Shopify keeps handling products, checkout and payments.',
      },
      {
        title: 'Migrations to Shopify',
        body: 'Moving products, customers and order history from another platform, with redirects planned so existing search rankings and links keep working.',
      },
    ],
    process: [
      { title: 'Store and systems review', body: 'We look at the store\'s theme, installed apps and the systems it must exchange data with, and decide what should be an app, a theme change or an integration.' },
      { title: 'Build on a development store', body: 'Work happens on a development store or a duplicate theme, never on the live store.' },
      { title: 'Test with real orders', body: 'Test orders through the full path: checkout, webhooks, the connected system and back.' },
      { title: 'Go live and monitor', body: 'A scheduled switch-over outside peak hours, with monitoring of webhooks and sync jobs afterwards.' },
    ],
    stack: ['Shopify Admin API', 'Storefront API', 'Liquid', 'Hydrogen', 'Next.js', 'Node.js', 'Webhooks', 'PostgreSQL'],
    caseStudies: [],
    guides: [],
    answers: {
      includes:
        'Peregrine\'s Shopify development covers custom apps built on Shopify\'s Admin API and webhooks, integrations between Shopify and ERP, accounting and fulfillment systems, Liquid theme customization, headless storefronts on the Storefront API, and migrations to Shopify from another platform. Work is done on a development store, not on the live one.',
      timeline:
        'Peregrine sets the timeline for Shopify work after reviewing the store, its installed apps and the systems it has to exchange data with. A theme change, a custom app and a two-way ERP integration are very different sizes, so we scope each separately and deliver in phases.',
      cost:
        `Peregrine works on Shopify development as ${MODEL}. Cost depends on whether the work is a theme change, a custom app or an integration, and on the systems involved. Shopify's own plan and app fees are separate. We do not publish a price list.`,
      work:
        'Peregrine has no published Shopify case study yet, so this page makes no project claims. Our published e-commerce work is custom-built: a multi-vendor marketplace with split payments, and API integration case studies that show how we handle webhooks, retries and reconciliation. Ask about Shopify on a discovery call.',
    },
    glance: {
      delivered: 'Custom Shopify apps, ERP and fulfillment integrations, theme customization, headless storefronts and migrations',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'When does a store need a custom Shopify app?',
        answer: 'When the logic you need is specific to your business and no app in the Shopify App Store does it, or when several apps are being chained together to approximate it. A custom app is installed only on your store and does exactly what you specify.',
      },
      {
        question: 'Can Shopify be connected to an ERP such as Odoo?',
        answer: 'Yes. Shopify exposes orders, products, inventory and customers through its Admin API and webhooks, and Odoo exposes an external API, so the two can be kept in sync. We decide which system owns each record before building the sync.',
      },
      {
        question: 'What is a headless Shopify storefront?',
        answer: 'A storefront where the pages customers see are a separate application, often built with Next.js or Hydrogen, that reads products and carts from Shopify through the Storefront API. Shopify still handles checkout and payments. It gives more design freedom and costs more to build and maintain than a theme.',
      },
      {
        question: 'Do you work on Shopify Plus?',
        answer: 'The same APIs and theme system apply across Shopify plans, and some features, such as certain checkout customizations, are limited to Shopify Plus. We confirm which plan features a project depends on during the store review.',
      },
      {
        question: 'Have you published Shopify case studies?',
        answer: 'Not yet. Our published e-commerce case studies are custom-built platforms rather than Shopify stores. We will add Shopify work here when a project can be published.',
      },
    ],
    icon: 'ri-shopping-bag-line',
  },
  {
    slug: 'laravel-development',
    group: 'technology',
    name: 'Laravel Development',
    serviceType: 'Laravel web application development',
    title: 'Laravel Development Services',
    metaDescription:
      'Laravel development: APIs and SaaS backends, admin panels, queues and scheduled jobs, and upgrades of older Laravel and PHP applications.',
    h1: 'Laravel Development for APIs, SaaS Backends and Legacy PHP',
    // Capability page: no Laravel project has been published. No project claims.
    offer: 'Laravel backends, admin panels and upgrades of older PHP applications.',
    intro: [
      'Laravel development is building and maintaining web applications on Laravel, the PHP framework, which provides routing, a database layer, queues, scheduling and authentication out of the box.',
      'It is for teams that already run on PHP or Laravel and need new features, an API for a mobile or JavaScript frontend, or an upgrade from an older version, and for new products where PHP hosting and skills are already in place.',
      'Peregrine offers Laravel development alongside its Node.js and Python work. We have not published a Laravel case study yet, so this page describes the work rather than citing a project.',
    ],
    whatWeBuild: [
      {
        title: 'APIs for web and mobile frontends',
        body: 'REST APIs in Laravel with authentication, rate limiting and versioning, serving a React or Next.js frontend, a mobile app or partner integrations.',
      },
      {
        title: 'SaaS backends',
        body: 'Multi-tenant data models, roles and permissions, subscription billing with Stripe, and the background jobs a SaaS product needs for email, reports and imports.',
      },
      {
        title: 'Admin panels and internal tools',
        body: 'Back-office screens for managing records, users and content, with audit logs and role-based access.',
      },
      {
        title: 'Queues, scheduling and integrations',
        body: 'Queued jobs with retries for anything slow or unreliable, scheduled tasks, and integrations with payment, email and third-party APIs.',
      },
      {
        title: 'Upgrades and legacy PHP modernization',
        body: 'Moving older Laravel versions or plain PHP applications onto a supported release in stages, adding tests around the risky parts first, while the application stays in use.',
      },
    ],
    process: [
      { title: 'Codebase and hosting review', body: 'For existing applications we check the Laravel and PHP versions, dependencies, tests and hosting before proposing changes.' },
      { title: 'Plan in stages', body: 'New features, upgrades and refactoring are split into steps that can each be released on their own.' },
      { title: 'Build with tests', body: 'Feature and integration tests around the code we touch, with a staging environment that mirrors production.' },
      { title: 'Release and hand over', body: 'Deployments through a pipeline, with documentation so your team can run and extend the application.' },
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'PostgreSQL', 'Redis', 'Laravel queues', 'Stripe', 'Docker', 'AWS'],
    caseStudies: [],
    guides: ['laravel-upgrade-checklist'],
    answers: {
      includes:
        'Peregrine\'s Laravel development covers REST APIs for web and mobile frontends, multi-tenant SaaS backends with roles and Stripe billing, admin panels, queued and scheduled jobs, third-party integrations, and staged upgrades of older Laravel and PHP applications. Existing applications start with a review of the codebase, its tests and its hosting.',
      timeline:
        'Peregrine sets the timeline for Laravel work after reviewing the codebase or the requirements. An upgrade depends on how many versions behind the application is and how well it is tested; new work depends on the features and integrations. We split both into stages that can be released separately.',
      cost:
        `Peregrine works on Laravel development as ${MODEL}. Cost depends on the size and condition of the existing codebase, the features needed and the integrations involved. We do not publish a price list. A single, well-defined task can get a scoped estimate.`,
      work:
        'Peregrine has no published Laravel case study yet, so this page makes no project claims. Every published case study lists Node.js in its stack, and one also lists Python; they show how we approach multi-tenancy, billing and integrations. Ask about Laravel specifically on a discovery call.',
    },
    glance: {
      delivered: 'Laravel APIs and SaaS backends, admin panels, queues and integrations, and staged upgrades of older PHP applications',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'Can you take over an existing Laravel application?',
        answer: 'Yes. We start by reviewing the Laravel and PHP versions, dependencies, test coverage and hosting, then agree what to fix first. The application stays in use while changes are released in stages.',
      },
      {
        question: 'Can you upgrade an old Laravel version?',
        answer: 'Yes. Upgrades are done one major version at a time, with tests added around the areas most likely to break. How long it takes depends on how far behind the application is and how many packages it relies on.',
      },
      {
        question: 'Can Laravel serve as the backend for a React or mobile app?',
        answer: 'Yes. Laravel works well as an API for a React, Next.js or React Native frontend, with token-based authentication and versioned endpoints.',
      },
      {
        question: 'Should a new product use Laravel or Node.js?',
        answer: 'Either can work. Laravel suits teams with PHP skills and hosting already in place and products that are mostly forms, records and workflows. Node.js suits real-time features and teams that want one language across frontend and backend. We recommend based on your team and the product, not on preference.',
      },
      {
        question: 'Have you published Laravel case studies?',
        answer: 'Not yet. Every published case study lists Node.js in its stack, and one also lists Python. We will add Laravel work here when a project can be published.',
      },
    ],
    icon: 'ri-code-s-line',
  },
  {
    slug: 'wordpress-development',
    group: 'technology',
    name: 'WordPress Development',
    serviceType: 'WordPress development and migration',
    title: 'WordPress Development and Migration',
    metaDescription:
      'WordPress development: custom themes and plugins, headless WordPress with Next.js, performance and security work, and migration to a custom platform.',
    h1: 'WordPress Development, Headless WordPress and Migration',
    // Capability page: no WordPress build has been published. One case study mentions that
    // the client's content had lived partly in WordPress; it is cited as exactly that.
    offer: 'Custom themes and plugins, headless WordPress, and moves from WordPress to a custom platform.',
    intro: [
      'WordPress development is building and maintaining sites on WordPress beyond what stock themes and plugins provide: custom themes, custom plugins, integrations, and using WordPress as the content system behind a separate frontend.',
      'It is for organizations whose site has outgrown its theme and plugin stack, who need WordPress to feed a faster custom frontend, or whose product has outgrown WordPress and needs to move to a purpose-built platform.',
      'Peregrine offers WordPress development and migration. We have not published a WordPress build as a case study; one published case study covers a custom platform built for a client whose content had lived partly in WordPress.',
    ],
    whatWeBuild: [
      {
        title: 'Custom themes and blocks',
        body: 'Themes and editor blocks built for your content, so editors assemble pages from components designed for the site instead of working around a general-purpose theme.',
      },
      {
        title: 'Custom plugins and integrations',
        body: 'Plugins for logic specific to your organization, and integrations between WordPress and a CRM, payment provider or internal system through its REST API and webhooks.',
      },
      {
        title: 'Headless WordPress with Next.js',
        body: 'WordPress kept as the editing tool while a Next.js frontend renders the site, for teams that want faster pages and full design control without retraining editors.',
      },
      {
        title: 'Performance and security work',
        body: 'Auditing plugins, caching, images and database queries on a slow site, and reducing the attack surface: fewer plugins, current versions, restricted admin access.',
      },
      {
        title: 'Migration from WordPress to a custom platform',
        body: 'When a product has outgrown WordPress, building the purpose-built application that replaces it. In our EdTech case study the client\'s content lived in separate systems, some in WordPress and some in Google Drive, with progress tracked in spreadsheets, before we built a custom learning platform.',
        proof: ['edtech-learning-platform'],
      },
    ],
    process: [
      { title: 'Site audit', body: 'We review the theme, plugins, hosting, content model and traffic, and separate what should be fixed from what should be replaced.' },
      { title: 'Staging build', body: 'Work is done on a staging copy of the site, with content kept in sync until launch.' },
      { title: 'Content and redirects', body: 'Content is migrated or restructured, and every changed URL gets a redirect so links and search rankings carry over.' },
      { title: 'Launch and handover', body: 'A scheduled launch, checks on forms, search and redirects, and training for the people who edit the site.' },
    ],
    stack: ['WordPress', 'PHP', 'MySQL', 'Block editor', 'WordPress REST API', 'Next.js', 'Node.js', 'CDN'],
    caseStudies: [
      { slug: 'edtech-learning-platform', note: 'A custom learning platform for a client whose content had lived partly in WordPress and partly in Google Drive, with progress tracked in spreadsheets. It is not a WordPress build.' },
    ],
    guides: [],
    answers: {
      includes:
        'Peregrine\'s WordPress development covers custom themes and editor blocks, custom plugins, integrations through the WordPress REST API, headless WordPress with a Next.js frontend, performance and security work on existing sites, and migration from WordPress to a purpose-built platform when a product has outgrown it.',
      timeline:
        'Peregrine sets the timeline for WordPress work after auditing the site: its theme, plugins, hosting, content and traffic. A performance fix, a custom theme and a migration to a custom platform are very different sizes, so each is scoped on its own and built on a staging copy before launch.',
      cost:
        `Peregrine works on WordPress development as ${MODEL}. Cost depends on whether the work is a fix, a custom theme or plugin, a headless frontend or a full migration, and on how much content is involved. We do not publish a price list.`,
      work:
        'Peregrine has not published a WordPress build as a case study. One published case study is related: an EdTech company whose content lived partly in WordPress and partly in Google Drive, with progress tracked in spreadsheets, for whom we built a custom learning platform. It is not a WordPress project.',
    },
    glance: {
      delivered: 'Custom WordPress themes and plugins, headless WordPress with Next.js, performance and security work, and migration to a custom platform',
    },
    updated: '2026-10-10',
    faq: [
      {
        question: 'When should a site move off WordPress?',
        answer: 'When it has become an application rather than a website: users log in to do work, data lives in custom tables or spreadsheets around it, and plugins are being bent to act as business logic. A content site that mostly publishes pages and posts is usually better served by staying on WordPress.',
      },
      {
        question: 'What is headless WordPress?',
        answer: 'Editors keep using WordPress to write and manage content, but the public site is a separate frontend, often Next.js, that reads the content through the WordPress API. Pages can be faster and the design is unconstrained, at the cost of a second application to maintain.',
      },
      {
        question: 'Can you speed up a slow WordPress site?',
        answer: 'Usually. The common causes are too many plugins, unoptimized images, no page caching and slow database queries. We measure first, then fix what the measurements point to rather than adding another optimization plugin.',
      },
      {
        question: 'Will a redesign or migration hurt our search rankings?',
        answer: 'It does not have to. The main risks are changed URLs without redirects and content that disappears. We map every existing URL to its new location and check redirects, titles and structured data before and after launch.',
      },
      {
        question: 'Have you published WordPress case studies?',
        answer: 'Not a WordPress build. Our EdTech case study describes a custom platform built for a client whose content had lived partly in WordPress. We will add WordPress projects here when one can be published.',
      },
    ],
    icon: 'ri-quill-pen-line',
  },
];

/** The technology page for a stack entry such as "Next.js" or "React Native", if one exists. */
const STACK_PAGES: [RegExp, string][] = [
  [/^Next\.js/, 'nextjs-development'],
  [/^React/, 'react-development'],
  [/^Shopify/, 'shopify-development'],
  [/^Laravel/, 'laravel-development'],
  [/^WordPress/, 'wordpress-development'],
];
export function technologyPageFor(stackItem: string): string | undefined {
  return STACK_PAGES.find(([pattern]) => pattern.test(stackItem))?.[1];
}

// Buyer guidance for the technology pages (see the note above `coreBuyerGuides` in
// services.ts). Vendor-neutral. The Shopify, Laravel and WordPress entries add no project
// claims; where they mention Peregrine they repeat the page's own "no case study is
// published" statement.
export const technologyBuyerGuides: Record<string, BuyerGuide> = {
  'nextjs-development': {
    fit: [
      'Public pages must load fast and be indexed by search engines, and the same product has a signed-in application behind them.',
      'You are building a portal or dashboard that shows a different view to each user or role.',
      'You serve many branded sites from one codebase, each with its own theme, domain and content.',
      'An existing Next.js or React app is slow, hard to change or several versions behind.',
    ],
    notFit: [
      { text: 'The app lives entirely behind a login and has no public pages. A plain React single-page app can be simpler.' },
      { text: 'The site is a mostly static brochure. It may not need a framework at all.' },
      { text: 'You need native iOS and Android apps:', link: { href: '/services/react-development', label: 'React and React Native development' } },
    ],
    scope: [
      { factor: 'Page types', effect: 'The number of distinct templates, not the number of pages. Ten thousand listing pages are one page type.' },
      { factor: 'Data freshness', effect: 'Whether each page type can be static, cached and revalidated, or must be rendered on every request decides the rendering and caching design.' },
      { factor: 'Backend', effect: 'Building on an API you already have is much smaller than building the API, authentication and data layer as well.' },
      { factor: 'Tenancy', effect: 'Per-tenant themes, content and custom domains add routing, configuration and testing for every tenant variation.' },
      { factor: 'Integrations', effect: 'Payments, search, a content system, analytics and third-party APIs are each their own piece of work.' },
      { factor: 'Languages', effect: 'Each language adds content and routing; right-to-left languages add layout work as well.' },
      { factor: 'Existing code', effect: 'The Next.js version, which router the app uses and how much is covered by tests set the cost of changing it.' },
      { factor: 'URLs to preserve', effect: 'A rebuild of a site with search traffic needs every old URL mapped to a new one.' },
    ],
    firstPhase:
      'A sensible first phase is a rendering and data plan for each page type, then the shared components and the one or two page types that carry the product. A performance budget set at this point costs far less than fixing speed after launch.',
    bring: [
      'A list of page types and who uses each.',
      'Which pages must be indexed by search engines and which sit behind a login.',
      'API documentation for the backend, or a note that none exists yet.',
      'Designs or a design system, if you have them.',
      'Hosting constraints: a platform you must use or cannot use.',
      'For an existing app: repository access, the Next.js version and what is slow or blocked.',
    ],
  },
  'react-development': {
    fit: [
      'The product needs iOS and Android apps and a web app working against the same data.',
      'Staff or customers must keep working without a signal: drivers, field teams, tablet point-of-sale.',
      'The app has to use device hardware such as the camera, location, Bluetooth, push notifications or payments.',
      'You have a web product with an API and want to add a mobile app to it.',
    ],
    notFit: [
      { text: 'The product depends on the newest platform features or on heavy graphics. Fully native apps are the safer choice.' },
      { text: 'You need only a web app whose public pages must rank in search:', link: { href: '/services/nextjs-development', label: 'Next.js development' } },
    ],
    scope: [
      { factor: 'Platforms', effect: 'iOS, Android, tablets and web, and how far back in operating system versions the app must run.' },
      { factor: 'Offline behavior', effect: 'What must work without a connection, and how conflicts are settled when devices sync. This is often the largest single driver.' },
      { factor: 'Device features', effect: 'Bluetooth, camera, background location, push notifications and payments each need testing on the real hardware.' },
      { factor: 'Backend', effect: 'Whether an API exists already, and whether the app needs live updates such as tracking or order status.' },
      { factor: 'Roles and apps', effect: 'A customer app, a driver app and a staff app are three products that share a backend, not one.' },
      { factor: 'Distribution', effect: 'Public app stores, private distribution inside a company, and in-app purchases follow different rules and review steps.' },
      { factor: 'Existing code', effect: 'For an app that already exists: its React Native version and how many native modules it depends on.' },
    ],
    firstPhase:
      'A sensible first phase is the few screens people use every day, running on real devices against the real API, including the hardest offline or hardware case. Once that case works, the rest of the app is ordinary work.',
    bring: [
      'The platforms and devices in scope, including specific hardware such as tablets, scanners or locks.',
      'What must keep working without a connection.',
      'API documentation, or a description of the backend the app will use.',
      'The user roles and what each does most often.',
      'Designs or wireframes, if they exist.',
      'Whether your company already has Apple Developer and Google Play accounts.',
    ],
  },
  'shopify-development': {
    fit: [
      'The store needs logic that no App Store app provides, or several apps are chained together to approximate it.',
      'Shopify has to exchange orders, inventory, products or customers with an ERP, accounting or warehouse system, and manual exports are causing errors.',
      'You want a custom storefront while Shopify keeps handling checkout and payments.',
      'You are moving to Shopify from another platform and need products, customers, order history and URLs carried over.',
    ],
    notFit: [
      { text: 'A theme from the Shopify Theme Store and existing apps cover what you need. A store-setup specialist will be quicker.' },
      { text: 'The main need is marketing, merchandising or conversion work, not engineering.' },
      // Repeats the page's own statement: no Shopify case study is published.
      { text: 'You need a firm with published Shopify case studies before shortlisting. Peregrine has none published yet.' },
    ],
    scope: [
      { factor: 'Type of work', effect: 'A theme change, a custom app, an integration and a headless storefront are different sizes and are scoped separately.' },
      { factor: 'Shopify plan', effect: 'Some features, such as certain checkout customizations, are limited to Shopify Plus.' },
      { factor: 'Systems to connect', effect: 'Whether each system has an API, and which system owns products, stock levels, prices and customers.' },
      { factor: 'Catalog and order volume', effect: 'The number of products and variants, orders on a normal day and at peak. These decide how API rate limits and sync timing are handled.' },
      { factor: 'Existing apps and theme', effect: 'Installed apps and earlier theme customizations that have to keep working alongside the new code.' },
      { factor: 'Migration', effect: 'Catalog size, customer accounts, order history, and the number of URLs that need redirects.' },
    ],
    firstPhase:
      'A sensible first phase is one flow end to end on a development store. For an integration that means a single record type, such as orders, moving in one direction with retries and a reconciliation report. Two-way sync and further record types follow once that flow is stable.',
    bring: [
      'Your Shopify plan, the store URL and a list of installed apps.',
      'The systems Shopify must connect to, and their API documentation if any.',
      'Which system should own products, stock levels, prices and customers.',
      'Order volume on a normal day and on your busiest day, and the size of the catalog.',
      'A written description or screenshots of what happens today and what you want instead.',
      'Dates to avoid for go-live, such as a sale period.',
    ],
  },
  'laravel-development': {
    fit: [
      'You have a Laravel application in production and need features, fixes or an upgrade without stopping its use.',
      'An older Laravel or plain PHP application has fallen behind supported versions.',
      'You need an API backend for a React, Next.js or mobile frontend, and your team or hosting is PHP-based.',
    ],
    notFit: [
      // Repeats the page's own statements. Source: case-studies.ts stacks (Node.js in all, Python
      // also in w3re-ai-real-estate-platform); no Laravel case study.
      { text: 'You are starting a new product with no existing PHP code, team or hosting. Every one of Peregrine\'s published case studies lists Node.js in its stack, and one also lists Python, so compare your options before choosing Laravel.' },
      { text: 'You need a firm with published Laravel case studies before shortlisting. Peregrine has none published yet.' },
    ],
    scope: [
      { factor: 'Laravel and PHP versions', effect: 'How far the application is behind the current release. Upgrades go one major version at a time.' },
      { factor: 'Test coverage', effect: 'Code without tests needs tests around the risky parts before it can be changed safely.' },
      { factor: 'Dependencies', effect: 'The number of packages, and whether any are abandoned or have been modified in place.' },
      { factor: 'Size of the application', effect: 'Models, routes, queued jobs and scheduled tasks, and whether it serves pages itself or is an API for other clients.' },
      { factor: 'Integrations', effect: 'Payment, email and third-party APIs the application depends on, each of which has to be retested after an upgrade.' },
      { factor: 'Hosting and deployment', effect: 'Whether a staging environment and a deployment pipeline exist or releases are done by hand on the server.' },
      { factor: 'Data', effect: 'Database size, and schema changes that need planning to avoid downtime.' },
    ],
    firstPhase:
      'For an existing application, a sensible first phase is a codebase and hosting review that ends in a written list: versions, dependencies, test coverage, risks and a staged order of work. For a new build it is the data model and one complete workflow through the API.',
    bring: [
      'Read access to the repository, or the composer.json and composer.lock files if access has to wait.',
      'The Laravel and PHP versions and where the application is hosted.',
      'How deployments are done today, and whether a staging environment exists.',
      'What is failing or blocked: errors, slow pages, features that cannot be added.',
      'The third-party services the application depends on.',
      'Who maintains it today and what documentation exists.',
    ],
  },
  'wordpress-development': {
    fit: [
      'The site needs a theme, blocks or a plugin built for your content and processes instead of adapted from general-purpose ones.',
      'WordPress has to exchange data with a CRM, payment provider or internal system.',
      'Editors want to keep WordPress while the public site needs faster pages or a design the theme cannot deliver.',
      'The site has become an application, with logins, custom data and plugins acting as business logic, and you are weighing a move to a purpose-built platform.',
    ],
    notFit: [
      { text: 'You need a brochure site on a stock theme. A WordPress freelancer or a site builder will cost less.' },
      { text: 'The need is ongoing content, SEO or design work, not engineering.' },
      // Repeats the page's own statement: no WordPress build is published as a case study.
      { text: 'You need a firm with published WordPress builds before shortlisting. Peregrine has none published.' },
    ],
    scope: [
      { factor: 'Type of work', effect: 'A theme or blocks, a plugin, an integration, a headless frontend, performance work and a migration are different sizes.' },
      { factor: 'Content model', effect: 'The number of content types, templates and languages, and how much existing content has to be restructured.' },
      { factor: 'Plugins', effect: 'How many are active, which of them hold business logic, and which can be removed.' },
      { factor: 'Integrations', effect: 'The systems involved, whether each has an API, and the direction data moves.' },
      { factor: 'URLs and search traffic', effect: 'The number of URLs that change, each of which needs a redirect so links and rankings carry over.' },
      { factor: 'Hosting', effect: 'Host limits, whether a staging environment exists, and how changes reach the live site.' },
    ],
    firstPhase:
      'A sensible first phase is an audit of the theme, plugins, hosting and content model that separates what to fix from what to replace, followed by one contained change on a staging copy. For a slow site, measure before changing anything.',
    bring: [
      'The site URL, the hosting provider and whether a staging environment exists.',
      'The active theme (and whether it is custom) and the list of active plugins.',
      'Who edits the site and what they find hard today.',
      'The systems WordPress has to connect to.',
      'For a redesign or migration: a URL export and the pages that bring the most search traffic.',
      'For performance work: the pages that are slow and any measurements you already have.',
    ],
  },
};
