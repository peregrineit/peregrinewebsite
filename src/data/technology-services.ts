import type { Service } from './services';
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
const RN_COUNT = usingStack('React Native');
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
      },
      {
        title: 'Portals and dashboards',
        body: 'Signed-in applications with a personalized view per user and role-based access: investor portals, shipper portals, clinician dashboards and claims workspaces all appear in our case studies as Next.js apps.',
      },
      {
        title: 'Admin consoles and internal tools',
        body: 'The operating side of a product: HR and payroll admin, course management for instructors, plant dashboards and a bill-of-materials editor, each sharing one API with the customer-facing app.',
      },
      {
        title: 'White-label and multi-tenant sites',
        body: 'Many branded sites served from one codebase, such as agent IDX websites or per-company career pages, with each tenant\'s theme, domain and content kept separate.',
      },
      {
        title: 'Performance work on existing Next.js apps',
        body: 'Incremental static regeneration, dynamic imports and image delivery through a CDN. That is how the frontend in our real estate SaaS case study was optimized before launch.',
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
        `Peregrine works on Next.js development as ${MODEL}. Cost depends on the number of page types, the integrations behind them and whether we are also building the backend. We do not publish a price list. A single, well-defined task can get a scoped estimate within 48 hours.`,
      work:
        `${NEXT_COUNT} of Peregrine's ${TOTAL} published case studies use Next.js. Five are listed here: a bilingual marketplace storefront, agent IDX websites for a real estate SaaS, an investor portal, a recruiter portal with branded career pages, and an insurance claims workspace. Each case study describes the architecture around the frontend.`,
    },
    glance: {
      delivered: 'Next.js web application: server-rendered pages, portals and dashboards, admin tools, with the API and data layer behind them',
    },
    updated: '2026-10-09',
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
        answer: 'Yes. In our published case studies the Next.js frontend sits on a Node.js API with PostgreSQL or MongoDB, plus Redis and Elasticsearch where search and caching need them. We can also build a Next.js frontend on an API you already have.',
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
      `Peregrine builds both sides. ${RN_COUNT} of our ${TOTAL} published case studies include a React Native app, each paired with a React web app built on Next.js and a shared API.`,
    ],
    whatWeBuild: [
      {
        title: 'Offline-first field and driver apps',
        body: 'Apps that keep working without a signal and sync when it returns. Our fleet tracking case study has a React Native driver app with offline sync, proof-of-delivery photos and turn-by-turn navigation.',
      },
      {
        title: 'Tablet point-of-sale and kitchen displays',
        body: 'React Native apps on tablets with a local database, so orders can be taken and paid for during an outage. Our restaurant POS case study stores orders in SQLite on the device and syncs them later.',
      },
      {
        title: 'Customer and tenant apps',
        body: 'Consumer-facing apps for ordering, payments and live tracking, and a tenant app that controls a smart lock over Bluetooth or remotely, as in our food delivery and self-storage case studies.',
      },
      {
        title: 'Video and subscription apps',
        body: 'Streaming video playback with workout sync and an offline mode, as built for the subscription app in our fitness case study.',
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
        `Peregrine works on React and React Native development as ${MODEL}. Cost depends on the platforms, the offline requirements, device features and whether the backend exists already. We do not publish a price list. A single, well-defined task can get a scoped estimate within 48 hours.`,
      work:
        `${RN_COUNT} of Peregrine's ${TOTAL} published case studies include a React Native app. Five are listed here: an offline-first driver app, a tablet point-of-sale that works offline, customer, driver and kitchen apps for food delivery, a tenant app with smart-lock control, and a fitness subscription app with video.`,
    },
    glance: {
      delivered: 'React web apps and React Native mobile apps for iOS and Android, with the shared API behind them',
    },
    updated: '2026-10-09',
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
    updated: '2026-10-09',
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
    guides: [],
    answers: {
      includes:
        'Peregrine\'s Laravel development covers REST APIs for web and mobile frontends, multi-tenant SaaS backends with roles and Stripe billing, admin panels, queued and scheduled jobs, third-party integrations, and staged upgrades of older Laravel and PHP applications. Existing applications start with a review of the codebase, its tests and its hosting.',
      timeline:
        'Peregrine sets the timeline for Laravel work after reviewing the codebase or the requirements. An upgrade depends on how many versions behind the application is and how well it is tested; new work depends on the features and integrations. We split both into stages that can be released separately.',
      cost:
        `Peregrine works on Laravel development as ${MODEL}. Cost depends on the size and condition of the existing codebase, the features needed and the integrations involved. We do not publish a price list. A single, well-defined task can get a scoped estimate within 48 hours.`,
      work:
        'Peregrine has no published Laravel case study yet, so this page makes no project claims. The backends in our published case studies are built on Node.js; they show how we approach multi-tenancy, billing and integrations. Ask about Laravel specifically on a discovery call.',
    },
    glance: {
      delivered: 'Laravel APIs and SaaS backends, admin panels, queues and integrations, and staged upgrades of older PHP applications',
    },
    updated: '2026-10-09',
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
        answer: 'Not yet. The backends in our published case studies are Node.js. We will add Laravel work here when a project can be published.',
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
    // Capability page: no WordPress build has been published. One case study describes
    // a client moving off WordPress to a custom platform; it is cited as exactly that.
    offer: 'Custom themes and plugins, headless WordPress, and moves from WordPress to a custom platform.',
    intro: [
      'WordPress development is building and maintaining sites on WordPress beyond what stock themes and plugins provide: custom themes, custom plugins, integrations, and using WordPress as the content system behind a separate frontend.',
      'It is for organizations whose site has outgrown its theme and plugin stack, who need WordPress to feed a faster custom frontend, or whose product has outgrown WordPress and needs to move to a purpose-built platform.',
      'Peregrine offers WordPress development and migration. We have not published a WordPress build as a case study; one published case study covers a client moving off WordPress to a custom platform.',
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
        body: 'When a product has outgrown WordPress, moving its content and users to a purpose-built application. In our EdTech case study the client\'s course content had been spread across WordPress, Google Drive and spreadsheets before the custom learning platform replaced them.',
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
      { slug: 'edtech-learning-platform', note: 'A custom learning platform that replaced course content spread across WordPress, Google Drive and spreadsheets. It shows a move off WordPress, not a WordPress build.' },
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
        'Peregrine has not published a WordPress build as a case study. One published case study is related: an EdTech company whose course content was spread across WordPress, Google Drive and spreadsheets moved to a custom learning platform we built. It shows a move off WordPress, not WordPress development.',
    },
    glance: {
      delivered: 'Custom WordPress themes and plugins, headless WordPress with Next.js, performance and security work, and migration to a custom platform',
    },
    updated: '2026-10-09',
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
        answer: 'Not a WordPress build. Our EdTech case study describes a client moving from WordPress and other tools to a custom platform. We will add WordPress projects here when one can be published.',
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
