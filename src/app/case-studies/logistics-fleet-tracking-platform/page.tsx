import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Real-Time Fleet Tracking Platform — Case Study',
  keywords: ['fleet tracking', 'logistics SaaS', 'GPS', 'route optimization', 'driver app', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  description:
    'How we built a GPS-powered fleet management system with live tracking, route optimization, driver mobile apps, and customer ETA notifications — managing 500+ vehicles across the MENA region.',
  openGraph: {
    title: 'Case Study — Real-Time Fleet Tracking Platform | Peregrine IT Solutions',
    description: 'How we built a GPS-powered fleet management system with live tracking, route optimization, and driver apps for 500+ vehicles across the MENA region.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/logistics-fleet-tracking-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Fleet Tracking Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Real-Time Fleet Tracking Platform',
    description: 'GPS-powered fleet management with live tracking, route optimization, and driver apps for 500+ vehicles across the MENA region.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: {
    canonical: 'https://peregrine-it.com/case-studies/logistics-fleet-tracking-platform',
  },
};

export default function LogisticsFleetTrackingPlatform() {
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
            Real-Time Fleet Tracking Platform for a <em>Regional Logistics Company</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a GPS-powered fleet management system with live tracking, route
            optimization, driver mobile apps, and customer ETA notifications — managing 500+
            vehicles across the MENA region.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Logistics / Transportation</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">7 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Mobile &middot; Real-Time Systems</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">Middle East &amp; North Africa</div>
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
                <i className="ri-truck-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-map-pin-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-route-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-smartphone-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-time-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#fdba74' }} />
              </div>
            </div>
            <p>Fleet Management &middot; Real-Time Tracking</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">500+</div>
            <div className="csd-stat-label">Active Vehicles</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">12K+</div>
            <div className="csd-stat-label">Daily Deliveries</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;30s</div>
            <div className="csd-stat-label">ETA Accuracy</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">23%</div>
            <div className="csd-stat-label">Fuel Savings</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Challenge</h2>
          <p>
            A regional logistics company operating across the UAE, Saudi Arabia, and Egypt was
            running its fleet operations on phone calls and WhatsApp messages. Dispatchers had no
            real-time visibility into where trucks were, drivers had no digital route sheets, and
            customers had no way to track their deliveries. As the fleet grew past 500 vehicles,
            operational chaos was costing them clients and money.
          </p>
          <p>
            They needed a unified platform — real-time GPS tracking for dispatchers, a mobile app
            for drivers, automated route optimization, and a customer-facing portal with live ETAs.
            The entire system had to work reliably across regions with spotty cellular coverage.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>
          <p>
            When we assessed the client&apos;s operations across three countries, we identified four
            critical breakdowns that were bleeding money and losing customers.
          </p>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-map-pin-line" />
              </div>
              <h4>No Fleet Visibility</h4>
              <p>
                Dispatchers relied on phone calls to locate trucks. During peak hours, a single
                dispatcher would make 80+ calls per shift just to get location updates. Route
                deviations went undetected until delivery complaints came in.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-route-line" />
              </div>
              <h4>Manual Route Planning</h4>
              <p>
                Routes were planned on paper maps and WhatsApp. Drivers followed familiar roads
                rather than optimal paths, resulting in 30%+ excess fuel consumption and frequent
                missed delivery windows.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-smartphone-line" />
              </div>
              <h4>No Driver App</h4>
              <p>
                Drivers had no digital proof of delivery, no turn-by-turn navigation, and no way to
                report issues. Everything was communicated verbally, leading to constant disputes
                over delivery times and conditions.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-time-line" />
              </div>
              <h4>Customer Blind Spot</h4>
              <p>
                Customers had no tracking visibility. They would call the operations center
                repeatedly asking &ldquo;Where is my delivery?&rdquo; — consuming 3 full-time staff
                just to answer location inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>System Architecture</h2>
          <p>
            We designed a real-time event-streaming architecture built on WebSockets and MQTT. GPS
            data flows from vehicle OBD devices through our ingestion pipeline, gets processed for
            geofencing and route deviation detection, and pushes live updates to every connected
            dashboard within seconds.
          </p>

          <div className="csd-arch-block">
            <h3>Data Flow Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-truck-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Vehicle OBD + GPS Trackers</div>
                  <div className="csd-arch-layer-desc">
                    GPS coordinates streamed every 10 seconds via cellular/satellite. Supports
                    offline buffering for areas with poor coverage
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">MQTT Ingestion Pipeline</div>
                  <div className="csd-arch-layer-desc">
                    Processes 500+ concurrent vehicle streams. Handles geofencing triggers, speed
                    alerts, and route deviation detection in real-time
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">TimescaleDB + PostgreSQL</div>
                  <div className="csd-arch-layer-desc">
                    Time-series data for GPS history and analytics. PostgreSQL for fleet, driver,
                    and delivery management
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-route-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Route Optimization Engine</div>
                  <div className="csd-arch-layer-desc">
                    Google OR-Tools based optimizer considering traffic, vehicle capacity, delivery
                    windows, and driver hours. Recalculates dynamically on delays
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Driver App + Customer Portal</div>
                  <div className="csd-arch-layer-desc">
                    React Native driver app with offline-first architecture. Customer portal with
                    live map tracking and push notification ETAs
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The offline-first architecture for the driver app was critical. In parts of the MENA
            region, cellular coverage drops frequently on highway routes. The app queues all delivery
            confirmations, GPS pings, and photo proofs locally, then syncs automatically when
            connectivity returns — ensuring zero data loss even in coverage dead zones.
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
              <span className="csd-tech-icon"><i className="ri-database-2-line" /></span> TimescaleDB
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-wifi-line" /></span> MQTT
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-map-pin-line" /></span> Google Maps API
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–3</div>
              <div className="csd-timeline-title">Discovery &amp; Architecture</div>
              <p className="csd-timeline-desc">
                Rode along with drivers across three countries. Documented dispatch workflows,
                identified cellular coverage gaps, designed the real-time streaming architecture and
                offline-first mobile strategy.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 4–12</div>
              <div className="csd-timeline-title">Core Platform &amp; Tracking</div>
              <p className="csd-timeline-desc">
                Built the MQTT ingestion pipeline, real-time tracking dashboard, and fleet management
                backend. Integrated GPS hardware from three OBD vendors behind a unified device
                abstraction layer.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 13–22</div>
              <div className="csd-timeline-title">Driver App &amp; Route Engine</div>
              <p className="csd-timeline-desc">
                Developed the React Native driver app with offline sync, proof-of-delivery camera,
                and turn-by-turn navigation. Built the route optimization engine with dynamic
                re-routing on delays.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 23–28</div>
              <div className="csd-timeline-title">Customer Portal &amp; Launch</div>
              <p className="csd-timeline-desc">
                Built customer-facing tracking portal with live maps and ETA notifications.
                Load-tested with 500 concurrent vehicle streams. Phased rollout: UAE first, then
                Saudi Arabia and Egypt.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">Results</div>
          <h2>The Impact</h2>
          <p>
            Within weeks of going live, the platform transformed fleet operations across all three
            countries — eliminating manual processes and delivering measurable ROI.
          </p>

          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Dispatcher calls per shift</div>
              <div className="csd-result-after">80+ → 5</div>
              <div className="csd-result-label">94% reduction in manual check-ins</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Fuel costs</div>
              <div className="csd-result-after">-23% reduction</div>
              <div className="csd-result-label">Optimized routes save $840K/year</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Customer &ldquo;where is it?&rdquo; calls</div>
              <div className="csd-result-after">-91% reduction</div>
              <div className="csd-result-label">Live tracking eliminates call center load</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Delivery accuracy</div>
              <div className="csd-result-after">97.3% on-time</div>
              <div className="csd-result-label">Up from 71% with manual routing</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;Before this system, I was spending my entire shift on the phone trying to find
            trucks. Now I can see every vehicle on one screen and focus on actually solving problems
            instead of just locating drivers.&rdquo;
          </div>
          <div className="csd-quote-author">— Senior Dispatcher, Operations Center</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Fleet management systems fail when they treat GPS tracking as the product. Tracking is
            table stakes — the real value is in what you do with the data. Route optimization,
            geofencing alerts, and predictive ETAs are what transform a tracking dashboard into an
            operational command center.
          </p>
          <p>
            The offline-first mobile architecture was non-negotiable for this region. We tested on
            actual highway routes between Dubai and Abu Dhabi, finding 15+ cellular dead zones per
            trip. Without offline queuing, nearly 20% of delivery confirmations would have been lost.
          </p>
          <p>
            The fuel savings alone paid for the entire platform within 4 months. By replacing
            paper-based routing with algorithmic optimization that considers traffic patterns, vehicle
            capacity, and delivery time windows, the client saved over $840K annually across their
            500-vehicle fleet.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Scaling a Logistics Operation?</h2>
          <p>
            We build fleet management systems, driver apps, and real-time tracking platforms for
            logistics companies. Let&apos;s discuss your operations.
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
