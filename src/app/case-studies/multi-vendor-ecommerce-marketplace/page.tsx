import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'Multi-Vendor E-Commerce Marketplace — Case Study',
  description: 'How we engineered a marketplace platform for 400+ vendors in the Gulf region — with automated split payments, vendor self-service onboarding, real-time inventory sync, and full Arabic/English bilingual support.',
  keywords: ['multi-vendor marketplace', 'e-commerce', 'split payments', 'Stripe Connect', 'bilingual', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — Multi-Vendor E-Commerce Marketplace | Peregrine IT Solutions',
    description: 'How we engineered a marketplace platform for 400+ vendors in the Gulf region with automated split payments and full Arabic/English bilingual support.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/multi-vendor-ecommerce-marketplace',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'Multi-Vendor E-Commerce Marketplace Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — Multi-Vendor E-Commerce Marketplace',
    description: 'Marketplace platform for 400+ vendors in the Gulf region with split payments, vendor onboarding, and bilingual Arabic/English support.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/multi-vendor-ecommerce-marketplace' },
};

export default function MultiVendorEcommerceMarketplace() {
  return (
    <div className="case-study-detail csd-green-accent">
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
            Multi-Vendor E-Commerce Marketplace with <em>Split Payments &amp; Bilingual UX</em>
          </h1>

          <p className="csd-hero-sub">
            How we engineered a marketplace platform for 400+ vendors in the Gulf region — with
            automated split payments, vendor self-service onboarding, real-time inventory sync, and
            full Arabic/English bilingual support.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">E-Commerce / Marketplace</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">9 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Payments &middot; Localization</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">Saudi Arabia &amp; UAE</div>
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
                <i className="ri-store-2-line" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-bank-card-line" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-translate-2" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-box-3-line" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-user-add-line" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#86efac' }} />
              </div>
            </div>
            <p>E-Commerce &middot; Multi-Vendor Marketplace</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">400+</div>
            <div className="csd-stat-label">Active Vendors</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">85K+</div>
            <div className="csd-stat-label">Monthly Orders</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">&lt;2s</div>
            <div className="csd-stat-label">Page Load</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.8%</div>
            <div className="csd-stat-label">Payment Success</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Challenge</h2>
          <p>
            A Gulf-based retail conglomerate wanted to launch a regional marketplace — think
            Amazon-style multi-vendor platform, but tailored for the Saudi and UAE markets. The
            platform needed to support hundreds of independent vendors selling everything from
            electronics to fashion, with automated commission-based split payments, and a fully
            bilingual Arabic/English experience that went beyond simple text translation.
          </p>
          <p>
            The existing plan was to use an off-the-shelf marketplace solution, but they quickly
            discovered that none of the available platforms handled Arabic RTL layouts properly,
            supported regional payment gateways (Tabby, Tamara for BNPL), or provided the vendor
            analytics dashboard they needed. They came to us to build it from scratch.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-bank-card-line" />
              </div>
              <h4>Complex Split Payments</h4>
              <p>
                Every order could contain products from multiple vendors. The platform needed to
                automatically split payments — deducting marketplace commission, calculating VAT per
                vendor, and routing payouts to individual vendor bank accounts on different schedules.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-translate-2" />
              </div>
              <h4>True Bilingual RTL/LTR Support</h4>
              <p>
                Arabic isn&apos;t just right-to-left text — it requires mirrored layouts, different
                number formats, and culturally appropriate imagery. The entire UI needed to work
                natively in both directions, not just as a CSS flip.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-box-3-line" />
              </div>
              <h4>Vendor Inventory Chaos</h4>
              <p>
                Vendors managed inventory in spreadsheets, WhatsApp, and legacy POS systems. The
                platform needed real-time stock sync to prevent overselling — a common problem in the
                region where vendors sell on multiple channels simultaneously.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-user-add-line" />
              </div>
              <h4>Vendor Onboarding Friction</h4>
              <p>
                The client needed 400+ vendors onboarded within 3 months of launch. The onboarding
                flow had to handle commercial registration validation, bank account verification,
                product catalog upload, and shipping rate configuration — all self-service.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>Platform Architecture</h2>
          <p>
            We built a modular marketplace architecture with dedicated microservices for payments,
            inventory, vendor management, and order orchestration. The split payment engine operates
            as an independent service that calculates commissions, VAT, and vendor payouts in
            real-time as orders are placed.
          </p>

          <div className="csd-arch-block">
            <h3>Platform Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Storefront (Next.js + i18n)</div>
                  <div className="csd-arch-layer-desc">
                    Server-rendered bilingual storefront with true RTL layout engine. Automatic
                    language detection with manual override. Shared component library for AR/EN
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-store-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Vendor Dashboard</div>
                  <div className="csd-arch-layer-desc">
                    Self-service portal for product management, order fulfillment, analytics, and
                    payout tracking. Supports bulk CSV import and real-time inventory sync
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Order Orchestration Engine</div>
                  <div className="csd-arch-layer-desc">
                    Manages multi-vendor cart splitting, order routing, fulfillment tracking, and
                    delivery coordination across vendors
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-bank-card-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Split Payment Engine</div>
                  <div className="csd-arch-layer-desc">
                    Stripe Connect integration with custom commission rules per vendor. Supports
                    Tabby/Tamara BNPL, Apple Pay, and card payments. Automated VAT calculation and
                    payout scheduling
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL + Elasticsearch</div>
                  <div className="csd-arch-layer-desc">
                    Product catalog with Elasticsearch for fast search and filtering. PostgreSQL for
                    orders, vendors, and financial data with full audit trail
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The RTL implementation was architecturally significant. We didn&apos;t just flip CSS — we
            built a bidirectional component system where every UI element (navigation, cards, forms,
            data tables) adapts its layout, spacing, and reading flow based on the active locale.
            Calendar components show Hijri dates in Arabic mode, currency formatting follows regional
            conventions, and even image carousels reverse direction.
          </p>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology</div>
          <h2>Tech Stack</h2>
          <div className="csd-tech-grid">
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
              <span className="csd-tech-icon"><i className="ri-search-eye-line" /></span> Elasticsearch
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe Connect
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-smartphone-line" /></span> React Native
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–4</div>
              <div className="csd-timeline-title">Market Research &amp; Architecture</div>
              <p className="csd-timeline-desc">
                Analyzed 15 regional competitors. Documented payment gateway requirements (Tabby,
                Tamara, Apple Pay). Designed the split payment engine and bilingual component system.
                Defined vendor onboarding flow.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 5–16</div>
              <div className="csd-timeline-title">Core Platform Build</div>
              <p className="csd-timeline-desc">
                Built the storefront with true RTL/LTR support, product catalog with Elasticsearch,
                and order management system. Implemented Stripe Connect for split payments with custom
                commission structures per vendor category.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 17–28</div>
              <div className="csd-timeline-title">Vendor Ecosystem</div>
              <p className="csd-timeline-desc">
                Developed the self-service vendor onboarding portal, inventory management dashboard,
                and analytics suite. Built bulk product import tools and real-time stock sync to
                prevent overselling across channels.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 29–36</div>
              <div className="csd-timeline-title">Payment Integration &amp; Launch</div>
              <p className="csd-timeline-desc">
                Integrated Tabby and Tamara BNPL providers, Apple Pay, and regional card processors.
                Load-tested with simulated 10K concurrent users during flash sale scenarios. Soft
                launch with 50 vendors, then scaled to 400+.
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
              <div className="csd-result-before">Vendor onboarding time</div>
              <div className="csd-result-after">72hrs → 4hrs</div>
              <div className="csd-result-label">Self-service onboarding with auto-verification</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Payment processing</div>
              <div className="csd-result-after">99.8% success rate</div>
              <div className="csd-result-label">Split payments across 400+ vendors</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Page load time</div>
              <div className="csd-result-after">&lt;2s (AR &amp; EN)</div>
              <div className="csd-result-label">SSR + CDN for both language variants</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Monthly GMV</div>
              <div className="csd-result-after">$2.8M by month 6</div>
              <div className="csd-result-label">340% above initial projections</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;Most marketplace platforms treat Arabic as an afterthought — flip the CSS and call
            it done. Peregrine built true bilingual support from the ground up. Our Arabic-speaking
            customers say the experience feels native, not translated. That&apos;s the
            difference.&rdquo;
          </div>
          <div className="csd-quote-author">— Head of Digital, Retail Conglomerate</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            Multi-vendor payment splitting is where most marketplace builds get stuck. The complexity
            isn&apos;t in sending money to vendors — it&apos;s in handling partial refunds across
            split orders, calculating per-vendor VAT correctly, managing different payout schedules,
            and reconciling everything for accounting. We treated the payment engine as an independent
            service with its own data store and audit trail.
          </p>
          <p>
            True bilingual support is an architectural decision, not a translation task. Every
            component — from the navigation bar to the checkout flow — needs to be designed
            bidirectionally from the start. Retrofitting RTL onto an LTR codebase always produces a
            broken experience. We built a shared component library where directionality is a
            first-class prop, not a CSS override.
          </p>
          <p>
            The vendor self-service onboarding was critical to hitting the 400-vendor target. We
            automated commercial registration verification against government APIs, built bank account
            validation workflows, and created guided product catalog upload with AI-assisted
            categorization. The result: vendors could go from signup to first sale in under 4 hours,
            with zero manual review needed for 85% of applications.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building a Marketplace Platform?</h2>
          <p>
            We engineer multi-vendor marketplaces, payment systems, and bilingual platforms for the
            MENA region and beyond. Let&apos;s talk about your platform.
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
