import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Food Delivery Aggregator for Multi-Restaurant Marketplace — Case Study',
  description: 'How we built a FoodTech aggregator platform with 200+ restaurants, 50K+ orders/month, real-time driver dispatch, and sub-3min average delivery — powering a regional multi-restaurant marketplace.',
  keywords: ['food delivery', 'FoodTech', 'restaurant aggregator', 'driver app', 'e-commerce', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Food Delivery Aggregator for Multi-Restaurant Marketplace | Peregrine IT Solutions',
    description: 'How we built a FoodTech aggregator with 200+ restaurants, 50K+ orders/month, and real-time driver dispatch.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/food-delivery-aggregator-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Food Delivery Aggregator Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Food Delivery Aggregator for Multi-Restaurant Marketplace',
    description: 'FoodTech aggregator with 200+ restaurants, 50K+ orders/month, and sub-3min delivery.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/food-delivery-aggregator-platform' },
};

export default function FoodDeliveryAggregatorPlatform() {
  return (
    <div className="case-study-detail csd-orange">
      {/* ═══ HERO ═══ */}
      <section className="csd-hero">
        <div className="csd-back-nav" style={{ maxWidth: 960, margin: '0 auto', paddingBottom: 24 }}>
          <Link href="/case-studies" className="csd-back-link">
            <i className="ri-arrow-left-s-line" style={{ fontSize: 18 }} />
            Back to Case Studies
          </Link>
        </div>

        <div className="csd-hero-inner">
          <div className="csd-hero-badge">
            <span className="csd-badge-dot" />
            Case Study
          </div>

          <h1>
            Food Delivery Aggregator for <em>Multi-Restaurant Marketplace</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a FoodTech aggregator platform connecting 200+ restaurants with diners —
            with intelligent order routing, driver dispatch, and real-time tracking achieving
            &lt;3min average delivery times.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">FoodTech / E-Commerce</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">11 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Mobile &middot; Real-Time</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">United States</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Image ═══ */}
      <div className="csd-hero-image-wrapper">
        <div className="csd-hero-image">
          <div className="csd-hero-image-placeholder">
            <div className="csd-icon-grid">
              <div className="csd-placeholder-node">
                <i className="ri-restaurant-2-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-truck-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-map-pin-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-notification-3-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-store-2-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-bank-card-line" style={{ fontSize: 28, color: '#fb923c' }} />
              </div>
            </div>
            <p>FoodTech Marketplace &middot; Real-Time Dispatch</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">200+</div>
            <div className="csd-stat-label">Restaurants</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">50K+</div>
            <div className="csd-stat-label">Orders/Month</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;3min</div>
            <div className="csd-stat-label">Avg Delivery</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">Real-Time</div>
            <div className="csd-stat-label">Tracking</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A regional food delivery operator had successfully onboarded 200+ restaurants across a
            dense urban market, but their operations were collapsing under scale. Orders were
            manually assigned to drivers via WhatsApp groups. Restaurants had no visibility into
            when drivers would arrive. Customers called support to ask &ldquo;where&apos;s my
            order?&rdquo; — and support had no real-time data to answer. Kitchen staff at popular
            restaurants were overwhelmed during lunch peaks because order flow was unpredictable.
          </p>
          <p>
            The client needed a platform that could route orders to the nearest available restaurant
            location, dispatch drivers optimally based on proximity and capacity, sync order status
            in real time between restaurant tablets, driver apps, and the customer app, and handle
            payments and commissions across thousands of daily transactions. Speed and reliability
            were non-negotiable — the market was competitive, and a bad experience meant lost
            repeat business.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-route-line" />
              </div>
              <h4>Order Routing</h4>
              <p>
                Orders came in without clear assignment to the right restaurant branch. Multi-location
                chains had to manually forward orders to the nearest kitchen. Duplicate orders
                sometimes went to wrong locations, causing delays and customer complaints.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-star-line" />
              </div>
              <h4>Driver Dispatch</h4>
              <p>
                Drivers were assigned via human dispatchers or WhatsApp. Load balancing was poor —
                some drivers got too many orders while others sat idle. No visibility into driver
                availability or ETA back to restaurant zones.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-store-3-line" />
              </div>
              <h4>Restaurant Onboarding</h4>
              <p>
                Each restaurant had different menu formats, operating hours, and POS systems. Manual
                data entry caused menu errors and pricing mismatches. New restaurant signup took
                weeks instead of days.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-map-pin-line" />
              </div>
              <h4>Real-Time Tracking</h4>
              <p>
                Customers had no live view of their order. Drivers shared location via WhatsApp, which
                was unreliable. Restaurants couldn&apos;t anticipate pickup times, leading to food
                sitting too long or drivers waiting.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We built a three-sided marketplace: a Next.js web app for diners and restaurant
            management, React Native apps for drivers and restaurant kitchen displays, and a Node.js
            backend with Firebase for real-time events. Order routing uses geo-based rules to assign
            orders to the nearest restaurant branch. Driver dispatch uses a queue with proximity
            scoring — the system pushes assignments to the closest available driver. PostgreSQL
            holds orders, menus, and payments; Redis caches availability and live driver positions.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">React Native — Customer, Driver &amp; Kitchen Apps</div>
                  <div className="csd-arch-layer-desc">
                    Customer app for ordering and live tracking. Driver app for accepting orders and
                    sharing GPS. Kitchen tablet for order queue and status updates
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-reactjs-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Next.js — Web App &amp; Restaurant Portal</div>
                  <div className="csd-arch-layer-desc">
                    Customer web ordering, restaurant dashboard for menus and orders, and admin
                    portal for operations and reporting
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Node.js API &amp; Order Engine</div>
                  <div className="csd-arch-layer-desc">
                    Order placement, routing logic, driver dispatch queue, and payment processing.
                    Geo-based restaurant and driver matching
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Orders, Menus &amp; Users</div>
                  <div className="csd-arch-layer-desc">
                    Restaurants, menus, orders, drivers, and transaction history. Optimized for
                    high write throughput and real-time queries
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis &amp; Firebase — Cache &amp; Real-Time</div>
                  <div className="csd-arch-layer-desc">
                    Redis for driver availability, restaurant capacity, and rate limiting. Firebase
                    Realtime Database for live order status and driver location sync
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The driver dispatch algorithm was the hardest piece. We score drivers by distance to
            pickup, current load, and historical performance. Orders are pushed to the top-ranked
            available driver; if they don&apos;t accept within 30 seconds, we cascade to the next.
            Firebase syncs acceptance and status changes to all clients within milliseconds, so
            restaurants and customers see updates instantly.
          </p>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology</div>
          <h2>Tech Stack</h2>
          <div className="csd-tech-grid">
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-smartphone-line" /></span> React Native
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-reactjs-line" /></span> Next.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-nodejs-line" /></span> Node.js
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-database-2-line" /></span> PostgreSQL
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-firebase-fill" /></span> Firebase
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-map-pin-line" /></span> Geo Services
            </div>
          </div>
        </div>

        {/* EXECUTION TIMELINE */}
        <div className="csd-section">
          <div className="csd-section-label">Execution</div>
          <h2>How We Delivered It</h2>

          <div className="csd-timeline">
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–6</div>
              <div className="csd-timeline-title">Discovery &amp; Order Model</div>
              <p className="csd-timeline-desc">
                Mapped restaurant and driver workflows. Designed order lifecycle and status flow.
                Built geo-routing rules and restaurant branch assignment logic. Defined menu and
                menu-item data model for multi-vendor support.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 7–20</div>
              <div className="csd-timeline-title">Core Platform &amp; Apps</div>
              <p className="csd-timeline-desc">
                Built Node.js order API and Stripe integration. Developed React Native customer and
                driver apps. Implemented restaurant portal for menus and order management. Firebase
                integration for real-time order status.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 21–36</div>
              <div className="csd-timeline-title">Dispatch &amp; Tracking</div>
              <p className="csd-timeline-desc">
                Built driver dispatch queue with proximity scoring. Implemented GPS streaming and
                live map in customer app. Kitchen display tablet for order queue. Optimized for
                &lt;3min average delivery in pilot zone.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 37–44</div>
              <div className="csd-timeline-title">Restaurant Onboarding &amp; Scale</div>
              <p className="csd-timeline-desc">
                Built restaurant self-signup and menu import tools. Load-tested with 50K orders/month.
                Rolled out to full 200+ restaurant network. Monitored and tuned dispatch algorithm
                based on real-world performance.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Manual routing</div>
              <div className="csd-result-after">Automated dispatch</div>
              <div className="csd-result-label">Geo-based order and driver assignment</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">No visibility</div>
              <div className="csd-result-after">Real-time tracking</div>
              <div className="csd-result-label">Live updates for customers and restaurants</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Weeks to onboard</div>
              <div className="csd-result-after">Days</div>
              <div className="csd-result-label">Self-service restaurant signup and menu import</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Support call volume</div>
              <div className="csd-result-after">-65% reduction</div>
              <div className="csd-result-label">Customers check app instead of calling</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from WhatsApp and spreadsheets to a platform that routes orders and
            dispatches drivers in seconds. Our average delivery time dropped to under three minutes
            in the pilot zone. Restaurant partners love the kitchen display — they know exactly when
            to start cooking.&rdquo;
          </div>
          <div className="csd-quote-author">— COO, Food Delivery Operator</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Food delivery aggregates three real-time flows: customer orders, restaurant preparation,
            and driver movement. Any latency in syncing status between these sides creates friction
            — drivers arriving before food is ready, or food cooling while waiting for a driver.
            Firebase gave us sub-second updates across all clients without building a custom
            WebSocket infrastructure.
          </p>
          <p>
            The dispatch algorithm had to balance fairness (drivers get equal opportunity), efficiency
            (minimize total delivery time), and availability (don&apos;t overload a single driver).
            We iterated on scoring weights using real order data — proximity mattered most, but
            load balancing prevented driver burnout during lunch peaks.
          </p>
          <p>
            Restaurant onboarding was a hidden complexity. Menus vary wildly in structure — categories,
            modifiers, combos, availability windows. We built a flexible schema and a CSV import
            tool that maps columns to our model. New restaurants could go live in a day instead of
            a week, which was critical for scaling from 50 to 200+ partners.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Food Delivery or Marketplace Platform?</h2>
          <p>
            We help FoodTech companies build real-time ordering, dispatch, and tracking systems.
            Let&apos;s talk about your architecture.
          </p>
          <div className="csd-cta-buttons">
            <a href="#" data-open-contact className="csd-cta-btn">
              Tell Us About Your Project
              <i className="ri-arrow-right-line" />
            </a>
            <a
              href="https://calendly.com/mukesh-peregrine-it/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="csd-cta-btn csd-cta-btn-secondary"
            >
              Book a Strategy Call
              <i className="ri-calendar-line" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
