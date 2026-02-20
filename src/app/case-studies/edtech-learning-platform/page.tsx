import type { Metadata } from 'next';
import Link from 'next/link';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'EdTech Learning Platform with LMS & Video Streaming — Case Study',
  description: 'How we built a full-stack EdTech platform with LMS, HLS video streaming, and course management — serving 12K+ enrollments across 500+ courses with 99.2% uptime.',
  keywords: ['EdTech', 'LMS', 'video streaming', 'e-learning', 'course management', 'SaaS', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — EdTech Learning Platform with LMS & Video Streaming | Peregrine IT Solutions',
    description: 'How we built a full-stack EdTech platform with LMS, HLS video streaming, and course management — serving 12K+ enrollments.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/edtech-learning-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'EdTech Learning Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — EdTech Learning Platform with LMS & Video Streaming',
    description: 'How we built an EdTech platform with LMS, HLS video streaming, and course management for 12K+ enrollments and 500+ courses.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/edtech-learning-platform' },
};

export default function EdTechLearningPlatform() {
  return (
    <div className="case-study-detail csd-teal">
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
            EdTech Learning Platform with <em>LMS &amp; Video Streaming</em>
          </h1>

          <p className="csd-hero-sub">
            How we built a full-stack EdTech platform with course management, progress tracking, HLS
            video delivery, and subscription payments — serving 12K+ enrollments across 500+ courses.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Education / EdTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">9 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">Full-Stack &middot; Video &middot; DevOps</div>
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
                <i className="ri-video-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-book-open-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-progress-3-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-cloud-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-money-dollar-circle-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
              <div className="csd-placeholder-node">
                <i className="ri-dashboard-3-line" style={{ fontSize: 28, color: '#2dd4bf' }} />
              </div>
            </div>
            <p>EdTech LMS &middot; HLS Video Pipeline</p>
          </div>
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">12K+</div>
            <div className="csd-stat-label">Enrollments</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">500+</div>
            <div className="csd-stat-label">Courses</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">99.2%</div>
            <div className="csd-stat-label">Uptime</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">HLS</div>
            <div className="csd-stat-label">Video Delivery</div>
          </div>
        </div>

        {/* OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Overview</div>
          <h2>The Client&apos;s Vision</h2>
          <p>
            A growing EdTech company had built a successful content library across multiple niche
            verticals — from professional certifications to creative skills — but their platform was
            held together by legacy tools and manual workflows. Course content lived in disparate
            systems: some in WordPress, some in Google Drive, and progress was tracked in spreadsheets.
            Learners had no unified experience, and instructors had no way to see engagement or
            completion rates across their courses.
          </p>
          <p>
            They needed a modern learning management system with a single learner app, an admin CMS
            for course creators, video streaming that could scale to thousands of concurrent viewers,
            and a subscription engine that handled one-time purchases, monthly plans, and enterprise
            licenses. The goal was to consolidate everything into one platform that could grow from
            hundreds to tens of thousands of learners without hitting scaling walls.
          </p>
        </div>

        {/* CHALLENGES */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>What Was Breaking</h2>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-folder-open-line" />
              </div>
              <h4>Fragmented Content</h4>
              <p>
                Course videos, PDFs, and quizzes lived across multiple storage systems. There was no
                single source of truth — instructors spent hours manually uploading content to
                different buckets, and learners often hit broken links or outdated materials.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-progress-3-line" />
              </div>
              <h4>No Progress Tracking</h4>
              <p>
                There was no way to know if a learner had completed a module, paused mid-video, or
                dropped off. Certificates were issued manually after instructors checked spreadsheets.
                Analytics were nonexistent.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-video-line" />
              </div>
              <h4>Scaling Video Delivery</h4>
              <p>
                Raw MP4 uploads to S3 caused buffering during peak hours. There was no adaptive
                bitrate — mobile users on slow connections couldn&apos;t watch smoothly. CDN
                configuration was minimal.
              </p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon">
                <i className="ri-bank-card-line" />
              </div>
              <h4>Payment &amp; Subscription Chaos</h4>
              <p>
                Some courses used Stripe, others used PayPal. Subscriptions were tracked in a custom
                database that didn&apos;t sync with payment webhooks. Renewals failed silently, and
                refunds required manual database edits.
              </p>
            </div>
          </div>
        </div>

        {/* SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Approach</div>
          <h2>The Architecture We Built</h2>
          <p>
            We designed a layered architecture with the learner app and admin CMS as separate
            frontends sharing a common API. Video content flows through an AWS MediaConvert pipeline
            that transcodes uploads to HLS, enabling adaptive bitrate streaming. Redis caches
            enrollment state and progress, and PostgreSQL holds the canonical data. Stripe powers
            all payments with a single webhook handler that updates subscriptions, access, and
            invoices.
          </p>

          <div className="csd-arch-block">
            <h3>System Architecture</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-smartphone-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Learner App &amp; Admin CMS</div>
                  <div className="csd-arch-layer-desc">
                    Next.js learner portal for course browsing, video playback, and progress. Next.js
                    admin for instructors to manage courses, upload content, and view analytics
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-server-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">API Gateway &amp; Auth</div>
                  <div className="csd-arch-layer-desc">
                    Node.js API with JWT auth. Role-based access for learners, instructors, and
                    admins. Rate limiting and request validation
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-film-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Video Pipeline — HLS Transcoding</div>
                  <div className="csd-arch-layer-desc">
                    AWS MediaConvert transcodes uploads to HLS. CloudFront CDN for global delivery.
                    Signed URLs for secure, time-limited streaming
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-database-2-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">PostgreSQL — Core Data Store</div>
                  <div className="csd-arch-layer-desc">
                    Courses, modules, enrollments, progress snapshots, and user profiles. Multi-tenant
                    support for B2B enterprise customers
                  </div>
                </div>
              </div>
              <div className="csd-arch-arrow">↓</div>

              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon">
                  <i className="ri-flashlight-line" />
                </div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Redis Cache &amp; Session Layer</div>
                  <div className="csd-arch-layer-desc">
                    Caches enrollment status, progress percentages, and video metadata. Reduces
                    database load during peak watch times
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p>
            The video pipeline was the most complex piece. We built an event-driven flow: uploads go
            to S3, trigger Lambda to start MediaConvert jobs, and on completion we write HLS manifest
            URLs to PostgreSQL. The learner app requests signed CloudFront URLs at playback time,
            so we never expose raw S3 paths. Adaptive bitrate means learners on mobile get lower
            quality segments automatically, eliminating buffering complaints.
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
              <span className="csd-tech-icon"><i className="ri-flashlight-line" /></span> Redis
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-film-line" /></span> AWS MediaConvert
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-bank-card-line" /></span> Stripe
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-amazon-line" /></span> AWS
            </div>
            <div className="csd-tech-tag">
              <span className="csd-tech-icon"><i className="ri-cloud-line" /></span> CloudFront
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
              <div className="csd-timeline-phase">Phase 1 — Weeks 1–5</div>
              <div className="csd-timeline-title">Discovery &amp; Content Migration</div>
              <p className="csd-timeline-desc">
                Audited all existing content sources and instructor workflows. Mapped course structure
                to a normalized schema. Designed the HLS transcoding pipeline and CDN strategy.
                Migrated 200+ courses from legacy systems.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 2 — Weeks 6–16</div>
              <div className="csd-timeline-title">Learner App &amp; Admin CMS</div>
              <p className="csd-timeline-desc">
                Built the Next.js learner portal with course catalog, enrollment flow, and video
                player (HLS.js). Built the admin CMS for course creation, module ordering, and
                content upload. Implemented progress tracking and certificate generation.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 3 — Weeks 17–28</div>
              <div className="csd-timeline-title">Video Pipeline &amp; Payments</div>
              <p className="csd-timeline-desc">
                Integrated AWS MediaConvert and CloudFront. Built Stripe subscription and one-time
                purchase flows. Implemented webhook handlers for payment events, access grants, and
                refunds. Added Redis caching for enrollment state.
              </p>
            </div>
            <div className="csd-timeline-item">
              <div className="csd-timeline-dot" />
              <div className="csd-timeline-phase">Phase 4 — Weeks 29–36</div>
              <div className="csd-timeline-title">Analytics, Testing &amp; Launch</div>
              <p className="csd-timeline-desc">
                Built instructor dashboards for completion rates and engagement. Load-tested video
                delivery with 2K concurrent streams. Phased rollout — beta with 500 learners, then
                full launch to 12K+ enrollments.
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
              <div className="csd-result-before">Content sprawl</div>
              <div className="csd-result-after">Unified platform</div>
              <div className="csd-result-label">500+ courses in single LMS</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Video buffering</div>
              <div className="csd-result-after">Adaptive HLS</div>
              <div className="csd-result-label">Smooth streaming for 12K+ learners</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Manual progress</div>
              <div className="csd-result-after">Real-time tracking</div>
              <div className="csd-result-label">Completion and engagement analytics</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Payment failures</div>
              <div className="csd-result-after">99.2% uptime</div>
              <div className="csd-result-label">Stripe webhooks and retry logic</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from three different systems and spreadsheets to one platform that
            actually shows us how learners engage. The video streaming alone — no more buffering
            complaints. Our completion rates improved by 40% in the first quarter.&rdquo;
          </div>
          <div className="csd-quote-author">— Head of Product, EdTech Company</div>
        </div>

        {/* KEY TAKEAWAYS */}
        <div className="csd-section">
          <div className="csd-section-label">Key Takeaways</div>
          <h2>What Made This Work</h2>
          <p>
            EdTech platforms look simple on the surface — courses, videos, progress bars — but the
            complexity comes from content lifecycle (upload, transcode, distribute), payment
            orchestration (subscriptions, upgrades, enterprise billing), and progress tracking at
            scale. Treating the video pipeline as a first-class service with event-driven transcoding
            meant we could add new formats (e.g., 4K) without rewriting the learner app.
          </p>
          <p>
            Stripe webhooks were critical. We handle subscription created, updated, canceled, and
            payment failed events in a single idempotent handler. That ensures access grants and
            revocations stay in sync with billing, and failed payments trigger retries before
            learners lose access.
          </p>
          <p>
            Progress tracking drove the biggest product improvement. By storing granular
            checkpoints — which videos were watched, how far, and quiz scores — we gave instructors
            actionable analytics. They could see drop-off points, identify struggling modules, and
            iterate on content. The client reported a 40% increase in certificate completions
            after launch.
          </p>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building an EdTech or Learning Platform?</h2>
          <p>
            We help education companies build production-grade LMS, video streaming, and payment
            systems. Let&apos;s talk about your architecture.
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
