import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import '../../css/case-study-detail.css';

export const metadata: Metadata = {
  title: 'AI-Powered Multi-Market Real Estate Platform — Case Study',
  description: 'How we built an AI-native platform for W3|re — 4 MLS integrations, 62% workload reduction, 3.8× lead conversion, 94% valuation accuracy. NLP search, AVM, chatbot, and unified data pipeline.',
  keywords: ['AI real estate', 'PropTech', 'MLS integration', 'property valuation', 'NLP search', 'case study'],
  robots: { index: true, follow: true },
  authors: [{ name: 'Peregrine IT Solutions', url: 'https://peregrine-it.com' }],
  openGraph: {
    title: 'Case Study — AI-Powered Multi-Market Real Estate Platform | Peregrine IT Solutions',
    description: 'How we built an AI-native platform for W3|re — 62% workload reduction, 3.8× lead conversion, 94% valuation accuracy.',
    type: 'article',
    url: 'https://peregrine-it.com/case-studies/northbridge-realty-ai-platform',
    siteName: 'Peregrine IT Solutions',
    locale: 'en_US',
    images: [{ url: 'https://peregrine-it.com/ogimage.png', width: 1200, height: 630, alt: 'W3|re AI Platform Case Study — Peregrine IT Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Study — AI-Powered Multi-Market Real Estate Platform',
    description: 'AI-native platform: 62% workload reduction, 3.8× lead conversion, 94% valuation accuracy.',
    images: ['https://peregrine-it.com/ogimage.png'],
  },
  alternates: { canonical: 'https://peregrine-it.com/case-studies/northbridge-realty-ai-platform' },
};

export default function NorthbridgeRealtyAIPlatform() {
  return (
    <div className="case-study-detail csd-purple">
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
            Case Study — PropTech · AI/ML
          </div>

          <h1>
            How We Built an <em>AI-Powered</em> Multi-Market Real Estate Platform That Reduced Agent Workload by 62%
          </h1>

          <p className="csd-hero-sub">
            A mid-size brokerage operating across 4 MLS regions was drowning in data silos, losing leads to slow response times, and struggling with inaccurate pricing. Here&apos;s how we rebuilt their entire digital infrastructure with AI at the core.
          </p>

          <div className="csd-hero-meta">
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Industry</div>
              <div className="csd-hero-meta-value">Real Estate / PropTech</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Duration</div>
              <div className="csd-hero-meta-value">14 Months</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Services</div>
              <div className="csd-hero-meta-value">AI/ML &middot; Full-Stack &middot; Data Engineering</div>
            </div>
            <div className="csd-hero-meta-item">
              <div className="csd-hero-meta-label">Markets</div>
              <div className="csd-hero-meta-value">Texas &middot; Florida &middot; Arizona &middot; Colorado</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Hero Image — AI in Property Valuation ═══ */}
      <div className="csd-hero-image-wrapper">
        <div className="csd-hero-image" style={{ position: 'relative' }}>
          <Image
            src="/images/case-studies/Image7-e7e8a93c-2e0c-4711-85a8-0dfbba6cd59a.png"
            alt="The Emergence of AI in Property Valuation"
            fill
            sizes="(max-width: 960px) 100vw, 960px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="csd-content">
        {/* KEY STATS */}
        <div className="csd-stats-row">
          <div className="csd-stat-card">
            <div className="csd-stat-number">4</div>
            <div className="csd-stat-label">MLS Integrations</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">62%</div>
            <div className="csd-stat-label">Workload Reduced</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">3.8×</div>
            <div className="csd-stat-label">Lead Conversion</div>
          </div>
          <div className="csd-stat-card">
            <div className="csd-stat-number">94%</div>
            <div className="csd-stat-label">Valuation Accuracy</div>
          </div>
        </div>

        {/* CLIENT OVERVIEW */}
        <div className="csd-section">
          <div className="csd-section-label">Client Overview</div>
          <h2>W3|re</h2>
          <p>
            A growing brokerage with 120+ agents across multiple U.S. markets, handling residential and commercial properties with a combined annual volume of $480M+. Markets include Texas (NTREIS), Florida (Stellar MLS), Arizona (ARMLS), and Colorado (REcolorado).
          </p>
        </div>

        {/* THE CHALLENGE */}
        <div className="csd-section">
          <div className="csd-section-label">The Challenge</div>
          <h2>Five Critical Problems Bleeding Revenue</h2>
          <p>
            W3|re was losing an estimated $2.3M annually to operational inefficiencies, misqualified leads, and pricing errors. Their existing stack — a patchwork of 7 disconnected tools — was collapsing under scale.
          </p>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-database-2-line" /></div>
              <h4>Fragmented MLS Data Across 4 Markets</h4>
              <p>Each MLS used different RETS/Web API standards and schemas. Agents had no single view of cross-market inventory. Listings appeared 6–18 hours after MLS publication — by then, hot leads had moved on.</p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-time-line" /></div>
              <h4>Lead Response Time Averaged 47 Minutes</h4>
              <p>Inbound leads were routed to a shared inbox. During peak hours, response times stretched to 2+ hours. Industry data shows conversion drops 21× if response exceeds 30 minutes.</p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-price-tag-3-line" /></div>
              <h4>CMA Pricing Was Costing Deals</h4>
              <p>Agents spent 2–3 hours on each Comparative Market Analysis. 23% of listing prices were off by more than 8% from final sale price — leading to extended days-on-market.</p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-search-line" /></div>
              <h4>Property Search Was a Dead End</h4>
              <p>Their IDX only supported rigid filter-based search. Buyers couldn&apos;t search naturally. Bounce rate on search pages was 72%.</p>
            </div>
            <div className="csd-cs-card csd-challenge">
              <div className="csd-cs-card-icon"><i className="ri-smartphone-line" /></div>
              <h4>Mobile Experience Was Non-Existent</h4>
              <p>68% of traffic came from mobile, but the site was desktop-first. Property pages took 8+ seconds on 4G. Mobile lead conversion was 0.3% vs 2.1% on desktop.</p>
            </div>
          </div>
        </div>

        {/* OUR SOLUTION */}
        <div className="csd-section">
          <div className="csd-section-label">Our Solution</div>
          <h2>AI-Native Platform Built From the Ground Up</h2>
          <p>
            We engineered a unified platform where AI is embedded into every layer — from property search to lead qualification to pricing intelligence.
          </p>

          {/* Property Management Dashboard Image */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Property Management Dashboard</h3>
            <p>Real-time overview of revenue, properties, tasks, expiring leases, and outstanding balances.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/case-studies/MapImage4-08072b85-2c68-4dc0-9f9f-b799097c80f7.png"
                alt="Real Estate Property Management Dashboard with Leasing Status"
                width={1200}
                height={700}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          <div className="csd-cs-grid">
            <div className="csd-cs-card csd-solution">
              <div className="csd-cs-card-icon"><i className="ri-chat-voice-line" /></div>
              <h4>Conversational Property Search Engine</h4>
              <p>Natural language search powered by a fine-tuned LLM. Buyers type queries like &quot;modern condo downtown Austin walkable to coffee shops, 2BR, under 500k&quot; — the system parses intent, maps to MLS fields, and returns ranked results.</p>
            </div>
            <div className="csd-cs-card csd-solution">
              <div className="csd-cs-card-icon"><i className="ri-calculator-line" /></div>
              <h4>AI-Powered Property Valuation (AVM)</h4>
              <p>Custom Automated Valuation Model trained on 2.8M+ transactions. Agents generate instant CMAs in under 10 seconds vs. the previous 2–3 hour manual process.</p>
            </div>
            <div className="csd-cs-card csd-solution">
              <div className="csd-cs-card-icon"><i className="ri-robot-2-line" /></div>
              <h4>24/7 AI Lead Qualification Chatbot</h4>
              <p>AI agent handles every inbound lead within 8 seconds. Qualifies by budget, timeline, location, and pre-approval status. Handles 73% of initial conversations without human intervention.</p>
            </div>
            <div className="csd-cs-card csd-solution">
              <div className="csd-cs-card-icon"><i className="ri-flow-chart" /></div>
              <h4>Unified Multi-MLS Data Pipeline</h4>
              <p>Real-time ETL pipeline ingests from 4 MLS systems, normalizes schemas, deduplicates cross-listed properties, and syncs within 90 seconds of MLS publication. Processes 40K+ listing updates daily.</p>
            </div>
          </div>

          {/* Comparative Map Image */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Comparative Map & Market Intelligence</h3>
            <p>Geographic visualization for cross-market analysis and property discovery.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/case-studies/MapImage-adb3eb3c-aaa0-4679-bd6b-234c68a81b89.png"
                alt="Comparative map of property data"
                width={1200}
                height={700}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Real Estate Chatbot Image */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Real Estate AI Chatbot</h3>
            <p>Conversational AI assistants for realtors to convert 3× faster with smart lead qualification.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden', maxWidth: 500 }}>
              <Image
                src="/images/case-studies/ChatBotMap-31c3fd31-92b7-4e17-bd67-721497b907a9.png"
                alt="Real Estate Chatbot — Close More Deals with AI"
                width={500}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Real Estate Analytics Dashboard */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Real Estate Analytics Dashboard</h3>
            <p>Projects, builders, development costs, and market trends across districts.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/case-studies/MapImage3-659b99b9-af15-4aa1-8d36-ed81c2de5b1f.png"
                alt="Real Estate Analytics Dashboard"
                width={1200}
                height={800}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* New York Real Estate Dashboard */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Market Intelligence & Forecasting</h3>
            <p>Price per sqft, YOY changes, sales trends, and forecasts by borough and neighborhood.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden' }}>
              <Image
                src="/images/case-studies/MapImage66-73d94aa1-8291-487f-a984-76f1fa1ba679.png"
                alt="New York Real Estate Dashboard"
                width={1200}
                height={700}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>

          {/* Smart Assistant Mobile */}
          <div className="csd-section" style={{ marginTop: 32 }}>
            <h3>Smart Assistant — Mobile Lead Qualification</h3>
            <p>Guided conversation flow for budget, timeline, and preferences — converting faster on mobile.</p>
            <div className="csd-hero-image-wrapper" style={{ marginTop: 16, borderRadius: 12, overflow: 'hidden', maxWidth: 400 }}>
              <Image
                src="/images/case-studies/MapImag5-168e91db-0086-4729-bf91-29328de576d4.png"
                alt="Smart assistant chatbot for real estate"
                width={400}
                height={600}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        {/* ARCHITECTURE */}
        <div className="csd-section">
          <div className="csd-section-label">System Architecture</div>
          <h2>How It All Connects</h2>
          <p>
            Data flow from MLS ingestion through AI processing to end-user delivery.
          </p>
          <div className="csd-arch-block">
            <h3>Platform Data Flow</h3>
            <div className="csd-arch-layers">
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-database-2-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">4× MLS Feeds</div>
                  <div className="csd-arch-layer-desc">RETS · RESO · Web API</div>
                </div>
              </div>
              <div className="csd-arch-arrow">→</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-flow-chart" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Kafka Pipeline</div>
                  <div className="csd-arch-layer-desc">ETL · Normalization</div>
                </div>
              </div>
              <div className="csd-arch-arrow">→</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-robot-2-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">AI Engine</div>
                  <div className="csd-arch-layer-desc">AVM · NLP · CV · RAG</div>
                </div>
              </div>
              <div className="csd-arch-arrow">→</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-plug-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Unified API</div>
                  <div className="csd-arch-layer-desc">GraphQL · REST</div>
                </div>
              </div>
              <div className="csd-arch-arrow">→</div>
              <div className="csd-arch-layer">
                <div className="csd-arch-layer-icon"><i className="ri-apps-line" /></div>
                <div className="csd-arch-layer-content">
                  <div className="csd-arch-layer-name">Client Apps</div>
                  <div className="csd-arch-layer-desc">Web · Mobile · CRM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TECH STACK */}
        <div className="csd-section">
          <div className="csd-section-label">Technology Stack</div>
          <h2>Built to Scale</h2>
          <div className="csd-tech-grid">
            <span className="csd-tech-tag">Next.js</span>
            <span className="csd-tech-tag">React Native</span>
            <span className="csd-tech-tag">Node.js</span>
            <span className="csd-tech-tag">Python</span>
            <span className="csd-tech-tag">PostgreSQL</span>
            <span className="csd-tech-tag">Redis</span>
            <span className="csd-tech-tag">Apache Kafka</span>
            <span className="csd-tech-tag">TensorFlow</span>
            <span className="csd-tech-tag">XGBoost</span>
            <span className="csd-tech-tag">LangChain</span>
            <span className="csd-tech-tag">Pinecone</span>
            <span className="csd-tech-tag">Mapbox GL</span>
            <span className="csd-tech-tag">AWS EKS</span>
            <span className="csd-tech-tag">SageMaker</span>
          </div>
        </div>

        {/* RESULTS */}
        <div className="csd-section">
          <div className="csd-section-label">The Results</div>
          <h2>Measurable Impact Across Every Metric</h2>
          <div className="csd-results-grid">
            <div className="csd-result-card">
              <div className="csd-result-before">Agent workload</div>
              <div className="csd-result-after">62% reduction</div>
              <div className="csd-result-label">CMA generation, lead sorting, data entry</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Lead-to-showing</div>
              <div className="csd-result-after">3.8× improvement</div>
              <div className="csd-result-label">0.9% → 3.4% conversion rate</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">AVM accuracy</div>
              <div className="csd-result-after">94%</div>
              <div className="csd-result-label">Within 4% of final sale price</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Lead response</div>
              <div className="csd-result-after">8 seconds</div>
              <div className="csd-result-label">Down from 47 minutes</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Days on market</div>
              <div className="csd-result-after">41% decrease</div>
              <div className="csd-result-label">Listings priced with AVM assistance</div>
            </div>
            <div className="csd-result-card">
              <div className="csd-result-before">Annual savings</div>
              <div className="csd-result-after">$1.8M</div>
              <div className="csd-result-label">Operational efficiency & reduced tech stack</div>
            </div>
          </div>
        </div>

        {/* QUOTE */}
        <div className="csd-quote-block">
          <div className="csd-quote-text">
            &ldquo;We went from juggling seven disconnected tools to having one platform that actually thinks. The AI search alone changed how our buyers find homes — they describe what they want in plain English, and the system just gets it. Our agents now spend their time closing deals instead of fighting spreadsheets.&rdquo;
          </div>
          <div className="csd-quote-author">— Marcus Chen, Managing Broker & Co-Founder, W3|re</div>
        </div>

        {/* CTA */}
        <div className="csd-cta-section">
          <h2>Building Something Similar?</h2>
          <p>
            We help real estate companies replace outdated tools with AI-powered platforms that actually move the needle.
          </p>
          <div className="csd-cta-buttons">
            <a href="#" data-open-contact className="csd-cta-btn">
              Let&apos;s Talk About Your Project
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
