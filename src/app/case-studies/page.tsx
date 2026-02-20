
'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';

// Import extracted CSS
import '../css/case-studies-extracted.css'; // This will be replaced

export default function CaseStudies() {

  useEffect(() => {
    const buttons = document.querySelectorAll('.category-btn');
    const grid = document.getElementById('articles-grid');
    const baseInactive = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10';
    const baseActive = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-cyan-600 text-white shadow-lg shadow-cyan-500/20';

    const filterByCategory = (category: string) => {
      const articles = grid?.querySelectorAll('.article-card') ?? [];
      articles.forEach((article: Element) => {
        const cats = (article.getAttribute('data-category') || '').split(/\s+/).filter(Boolean);
        const match = category === 'all' || cats.includes(category);
        (article as HTMLElement).style.display = match ? 'block' : 'none';
        if (match) {
          (article as HTMLElement).style.opacity = '0';
          setTimeout(() => { (article as HTMLElement).style.opacity = '1'; }, 50);
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category') || 'all';
        buttons.forEach((b: Element) => { (b as HTMLElement).className = baseInactive; });
        (btn as HTMLElement).className = baseActive;
        filterByCategory(category);
      });
    });
  }, []);


  return (
    <div className="page-wrapper">
      {/* Start Migrated Content */}

      <div id="root">
        <div className="bg-slate-900">
          <div className="relative">
            <div className="absolute inset-0 z-0">
              <img alt="Hero Background" className="w-full h-full object-cover object-top"
                src="/images/case-studies-hero-bg.jpg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900"></div>
            </div>

            <div id="hero-content" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-8 sm:pb-10 transition-all duration-300">
              <div className="max-w-4xl mx-auto text-center">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white mb-8 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                  <i className="ri-folder-chart-line text-cyan-400"></i>
                  <span className="text-sm font-semibold">Real Projects. Real Results.</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white leading-tight mt-6 sm:mt-10 mb-5 md:mb-7">Case Studies<br />That Speak for Themselves</h1>
                <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed mb-8 md:mb-12 max-w-2xl mx-auto">Deep dives into how we&apos;ve helped companies scale platforms, automate operations, and build production-grade software across industries.</p>
                <div className="flex items-center justify-center gap-3 sm:gap-5 flex-wrap mt-14 sm:mt-20">
                  <a href="#articles-grid"
                    className="group px-6 sm:px-9 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 whitespace-nowrap cursor-pointer flex items-center gap-3 font-bold text-sm border border-cyan-400/30 tracking-wide [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)] !no-underline">
                    Explore Case Studies
                    <i className="ri-arrow-down-line text-xl group-hover:translate-y-1 transition-transform"></i>
                  </a>
                  <button
                    data-open-contact
                    className="px-6 sm:px-9 py-3 sm:py-4 bg-white/20 backdrop-blur-md !text-white rounded-lg hover:bg-white/30 transition-all whitespace-nowrap cursor-pointer font-bold text-sm border border-white/40 hover:border-white shadow-lg shadow-black/20 tracking-wide [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">Start a Project</button>
                </div>
              </div>

            </div>
          </div>

          <div id="categories" className="bg-slate-900 border-b border-white/10 sticky top-[80px] z-40 shadow-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" id="category-container">
                <button type="button" data-category="all"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-cyan-600 text-white shadow-lg shadow-cyan-500/20">
                  <i className="ri-apps-line text-lg"></i><span>All Projects</span>
                </button>
                <button type="button" data-category="proptech"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-building-line text-lg"></i><span>PropTech &amp; Real Estate</span>
                </button>
                <button type="button" data-category="logistics"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-truck-line text-lg"></i><span>Logistics</span>
                </button>
                <button type="button" data-category="healthcare"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-heart-pulse-line text-lg"></i><span>Healthcare</span>
                </button>
                <button type="button" data-category="ecommerce"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-store-2-line text-lg"></i><span>E-Commerce</span>
                </button>
                <button type="button" data-category="mobile"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-smartphone-line text-lg"></i><span>Mobile App</span>
                </button>
                <button type="button" data-category="saas"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-cloud-line text-lg"></i><span>SaaS &amp; Platforms</span>
                </button>
                <button type="button" data-category="fintech"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-bank-card-line text-lg"></i><span>FinTech</span>
                </button>
                <button type="button" data-category="iot"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10">
                  <i className="ri-wifi-line text-lg"></i><span>IoT &amp; Integration</span>
                </button>
              </div>
            </div>
          </div>

          <section className="pt-6 sm:pt-8 pb-12 sm:pb-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div id="articles-grid" className="tw-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Real Estate SaaS Case Study */}
                <Link href="/case-studies/scaling-real-estate-saas-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer !no-underline"
                  data-category="proptech saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c1222 0%, #1a2847 40%, #0f1a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
                            <i className="ri-search-line text-xl text-blue-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
                            <i className="ri-database-2-line text-xl text-blue-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
                            <i className="ri-flashlight-line text-xl text-blue-400"></i>
                          </div>
                        </div>
                        <p className="text-blue-300/60 text-xs font-mono tracking-wider">MongoDB → Elasticsearch → Redis</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-building-line"></i><span>Real Estate / PropTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>8 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Scaling a Real Estate SaaS Platform from 5 Agents to 200+</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we re-architected a property search platform across the US and Canada — handling millions of MLS listings with sub-second response times.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">94% faster search</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">99.9% uptime</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Self-Storage Management SaaS Case Study */}
                <Link href="/case-studies/self-storage-management-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer !no-underline"
                  data-category="proptech saas iot mobile">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 40%, #1a0a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-door-lock-box-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-wifi-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-dashboard-3-line text-xl text-purple-400"></i>
                          </div>
                        </div>
                        <p className="text-purple-300/60 text-xs font-mono tracking-wider">IoT Locks → Billing → Occupancy</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-building-3-line"></i><span>Self-Storage / PropTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>10 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      Self-Storage Management Platform with IoT-Powered Access Control</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we engineered a full-stack SaaS platform for 150+ storage facilities — with smart lock integration, automated billing, and real-time occupancy dashboards.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">150+ facilities</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">IoT access</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Logistics & Fleet Management Case Study */}
                <Link href="/case-studies/logistics-fleet-tracking-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer !no-underline"
                  data-category="logistics saas mobile iot">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0e00 0%, #3d2200 40%, #1a0e00 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-truck-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-map-pin-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-route-line text-xl text-orange-400"></i>
                          </div>
                        </div>
                        <p className="text-orange-300/60 text-xs font-mono tracking-wider">GPS → Routes → Live ETAs</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-truck-line"></i><span>Logistics / Transportation</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>7 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                      Real-Time Fleet Tracking Platform for a Regional Logistics Company</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a GPS-powered fleet management system with live tracking, route optimization, driver mobile apps, and customer ETA notifications — managing 500+ vehicles.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">23% fuel savings</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">500+ vehicles</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-orange-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Healthcare Clinic Management Case Study */}
                <Link href="/case-studies/multi-location-clinic-management"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer !no-underline"
                  data-category="healthcare saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002220 0%, #003d38 40%, #002220 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-heart-pulse-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-shield-check-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-video-chat-line text-xl text-teal-400"></i>
                          </div>
                        </div>
                        <p className="text-teal-300/60 text-xs font-mono tracking-wider">EHR → Telehealth → Claims</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-teal-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-heart-pulse-line"></i><span>Healthcare / HealthTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>12 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                      Unified Clinic Management System for a Multi-Location Healthcare Network</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a HIPAA-compliant practice management platform — unifying patient records, telehealth, and insurance billing across 35 clinic locations.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">HIPAA compliant</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">35 clinics</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-teal-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Multi-Vendor E-Commerce Marketplace Case Study */}
                <Link href="/case-studies/multi-vendor-ecommerce-marketplace"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/10 cursor-pointer !no-underline"
                  data-category="ecommerce saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002210 0%, #003d1a 40%, #002210 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-store-2-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-bank-card-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-translate-2 text-xl text-green-400"></i>
                          </div>
                        </div>
                        <p className="text-green-300/60 text-xs font-mono tracking-wider">Vendors → Payments → AR/EN</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-green-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-store-2-line"></i><span>E-Commerce / Marketplace</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>9 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      Multi-Vendor E-Commerce Marketplace with Split Payments &amp; Bilingual UX</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we engineered a marketplace for 400+ vendors in the Gulf region — with automated split payments, vendor onboarding, and full Arabic/English support.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">400+ vendors</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">RTL/LTR</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-green-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* PropTech Investor Portal Case Study */}
                <Link href="/case-studies/proptech-investor-portal"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer !no-underline"
                  data-category="proptech fintech saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1400 0%, #3d3000 40%, #1a1400 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-funds-box-line text-xl text-amber-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-file-lock-line text-xl text-amber-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-pie-chart-line text-xl text-amber-400"></i>
                          </div>
                        </div>
                        <p className="text-amber-300/60 text-xs font-mono tracking-wider">Documents → RBAC → Reporting</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-amber-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-funds-box-line"></i><span>Real Estate / Investment</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>6 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                      Investor Communication Portal for a Real Estate Development Firm</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a secure, role-based portal for 280+ investors — with document management, milestone tracking, and automated distribution reporting across a $450M portfolio.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">$450M AUM</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">85% time saved</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-amber-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* EdTech Learning Platform Case Study */}
                <Link href="/case-studies/edtech-learning-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer !no-underline"
                  data-category="saas mobile">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002220 0%, #003d38 40%, #002220 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-video-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-book-open-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-progress-3-line text-xl text-teal-400"></i>
                          </div>
                        </div>
                        <p className="text-teal-300/60 text-xs font-mono tracking-wider">LMS → HLS Video → 12K+ enrollments</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-teal-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-book-open-line"></i><span>Education / EdTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>9 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                      EdTech Learning Platform with LMS &amp; Video Streaming</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a full-stack EdTech platform with course management, HLS video delivery, and progress tracking — serving 12K+ enrollments and 500+ courses.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">500+ courses</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">99.2% uptime</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-teal-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Food Delivery Aggregator Case Study */}
                <Link href="/case-studies/food-delivery-aggregator-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer !no-underline"
                  data-category="ecommerce mobile saas logistics">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0e00 0%, #3d2200 40%, #1a0e00 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-restaurant-2-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-truck-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-map-pin-line text-xl text-orange-400"></i>
                          </div>
                        </div>
                        <p className="text-orange-300/60 text-xs font-mono tracking-wider">200+ Restaurants → Real-Time Dispatch</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-restaurant-2-line"></i><span>FoodTech / E-Commerce</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>11 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                      Food Delivery Aggregator for Multi-Restaurant Marketplace</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a FoodTech aggregator with 200+ restaurants, 50K+ orders/month, and real-time driver dispatch achieving &lt;3min delivery.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">50K+ orders/mo</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">Real-time</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-orange-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* HR Payroll SaaS Case Study */}
                <Link href="/case-studies/hr-payroll-saas-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer !no-underline"
                  data-category="saas fintech">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 40%, #1a0a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-user-3-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-money-dollar-circle-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-shield-check-line text-xl text-purple-400"></i>
                          </div>
                        </div>
                        <p className="text-purple-300/60 text-xs font-mono tracking-wider">Multi-State Tax → 99.9% Accuracy</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-user-3-line"></i><span>HR Tech / FinTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>10 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      HR &amp; Payroll SaaS for Mid-Market Companies</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built an HR &amp; payroll SaaS for 85+ companies and 12K employees — with multi-state tax, benefits integration, and 99.9% payroll accuracy.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">12K employees</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">SOC 2</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Insurance Claims Automation Case Study */}
                <Link href="/case-studies/insurance-claims-automation-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer !no-underline"
                  data-category="fintech saas healthcare">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c1222 0%, #1a2847 40%, #0f1a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-file-search-line text-xl text-cyan-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-robot-2-line text-xl text-cyan-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-shield-check-line text-xl text-cyan-400"></i>
                          </div>
                        </div>
                        <p className="text-cyan-300/60 text-xs font-mono tracking-wider">Textract → Multi-Carrier → HIPAA</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-shield-check-line"></i><span>InsurTech / FinTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>14 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Insurance Claims Automation for Claims Processing</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built an InsurTech claims platform processing 45K+ claims/year — with document extraction, multi-carrier rules, and 60% faster processing.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">45K+ claims/yr</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">HIPAA</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Restaurant POS & Ordering Case Study */}
                <Link href="/case-studies/restaurant-pos-ordering-system"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/10 cursor-pointer !no-underline"
                  data-category="ecommerce saas mobile">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002210 0%, #003d1a 40%, #002210 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-tablet-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-restaurant-2-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-shopping-bag-line text-xl text-green-400"></i>
                          </div>
                        </div>
                        <p className="text-green-300/60 text-xs font-mono tracking-wider">Offline POS → KDS → 120+ Locations</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-green-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-restaurant-2-line"></i><span>Hospitality / FoodTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>8 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      Restaurant POS &amp; Online Ordering for QSR Chains</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a POS and online ordering platform for 120+ locations — with offline-first tablets, kitchen display, and 25K daily orders.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">25K daily</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">98% uptime</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-green-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Legal Document Automation Case Study */}
                <Link href="/case-studies/legal-document-automation-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-amber-500/50 transition-all hover:shadow-xl hover:shadow-amber-500/10 cursor-pointer !no-underline"
                  data-category="fintech saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a1400 0%, #3d3000 40%, #1a1400 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-file-text-line text-xl text-amber-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-user-add-line text-xl text-amber-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                            <i className="ri-shield-check-line text-xl text-amber-400"></i>
                          </div>
                        </div>
                        <p className="text-amber-300/60 text-xs font-mono tracking-wider">15K+ docs &middot; DocuSign &middot; SOC2</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-amber-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-file-text-line"></i><span>Legal Tech / FinTech</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>9 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                      Legal Document Automation for Contract Generation &amp; E-Signature</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a legal document automation platform processing 15K+ documents/month with multi-party e-signature and SOC2 compliance.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">40% faster</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">SOC2</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-amber-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Manufacturing ERP Case Study */}
                <Link href="/case-studies/manufacturing-erp-system"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer !no-underline"
                  data-category="saas iot">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #0c1222 0%, #1a2847 40%, #0f1a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-factory-line text-xl text-cyan-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-stack-line text-xl text-cyan-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                            <i className="ri-bar-chart-box-line text-xl text-cyan-400"></i>
                          </div>
                        </div>
                        <p className="text-cyan-300/60 text-xs font-mono tracking-wider">8 Factories &middot; 50K SKUs &middot; SAP</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-factory-line"></i><span>Manufacturing / Industrial</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>12 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Manufacturing ERP for Production &amp; Inventory</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a manufacturing ERP spanning 8 factories and 50K SKUs with MQTT shop floor data and 30% inventory reduction.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">30% reduction</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">Real-time</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Recruitment ATS Case Study */}
                <Link href="/case-studies/recruitment-ats-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-teal-500/50 transition-all hover:shadow-xl hover:shadow-teal-500/10 cursor-pointer !no-underline"
                  data-category="saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002220 0%, #003d38 40%, #002220 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-user-search-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-file-search-line text-xl text-teal-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-teal-500/30 bg-teal-500/10 flex items-center justify-center">
                            <i className="ri-calendar-check-line text-xl text-teal-400"></i>
                          </div>
                        </div>
                        <p className="text-teal-300/60 text-xs font-mono tracking-wider">200+ Companies &middot; 80K+ Candidates</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-teal-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-user-3-line"></i><span>HR Tech / SaaS</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>8 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors line-clamp-2">
                      Recruitment ATS for Applicant Tracking &amp; Hiring</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a recruitment ATS for 200+ companies and 80K+ candidates with resume parsing and 65% time-to-hire reduction.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">65% faster</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">Elasticsearch</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-teal-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Event Ticketing Platform Case Study */}
                <Link href="/case-studies/event-ticketing-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-green-500/50 transition-all hover:shadow-xl hover:shadow-green-500/10 cursor-pointer !no-underline"
                  data-category="ecommerce saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #002210 0%, #003d1a 40%, #002210 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-calendar-event-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-ticket-2-line text-xl text-green-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center">
                            <i className="ri-shopping-cart-line text-xl text-green-400"></i>
                          </div>
                        </div>
                        <p className="text-green-300/60 text-xs font-mono tracking-wider">500+ Events &middot; 120K Tickets &middot; Redis</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-green-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-event-line"></i><span>Events / E-Commerce</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>7 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                      Event Ticketing Platform with Real-Time Availability</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built an event ticketing platform for 500+ events and 120K tickets with 99.5% availability accuracy and fraud prevention.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">99.5% accuracy</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">Stripe</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-green-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Supply Chain Visibility Case Study */}
                <Link href="/case-studies/supply-chain-visibility-platform"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-orange-500/50 transition-all hover:shadow-xl hover:shadow-orange-500/10 cursor-pointer !no-underline"
                  data-category="logistics saas">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0e00 0%, #3d2200 40%, #1a0e00 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-truck-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-map-pin-line text-xl text-orange-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-orange-500/30 bg-orange-500/10 flex items-center justify-center">
                            <i className="ri-error-warning-line text-xl text-orange-400"></i>
                          </div>
                        </div>
                        <p className="text-orange-300/60 text-xs font-mono tracking-wider">2M+ Shipments &middot; 12 Carriers</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-truck-line"></i><span>Logistics / Supply Chain</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>10 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors line-clamp-2">
                      Supply Chain Visibility for Shipment Tracking &amp; Alerts</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a supply chain visibility platform for 2M+ shipments across 12 carriers with ETA prediction and 45% fewer inquiries.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">45% fewer</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">TimescaleDB</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-orange-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Real-Time Collaboration Tool Case Study */}
                <Link href="/case-studies/realtime-collaboration-tool"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer !no-underline"
                  data-category="saas mobile">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 40%, #1a0a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-file-edit-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-chat-3-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-user-follow-line text-xl text-purple-400"></i>
                          </div>
                        </div>
                        <p className="text-purple-300/60 text-xs font-mono tracking-wider">5K+ Workspaces &middot; &lt;100ms Sync</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-cloud-line"></i><span>SaaS / Productivity</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>11 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      Real-Time Collaboration Tool for Documents &amp; Chat</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a real-time collaboration platform for 5K+ workspaces and 25K users with CRDT, presence, and &lt;100ms sync.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">25K users</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">WebSocket</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

                {/* Fitness Wellness Subscription App Case Study */}
                <Link href="/case-studies/fitness-wellness-subscription-app"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-purple-500/50 transition-all hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer !no-underline"
                  data-category="mobile saas healthcare">
                  <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 40%, #1a0a2e 100%)' }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="flex items-center justify-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-run-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-video-line text-xl text-purple-400"></i>
                          </div>
                          <div className="w-12 h-12 rounded-xl border border-purple-500/30 bg-purple-500/10 flex items-center justify-center">
                            <i className="ri-pie-chart-line text-xl text-purple-400"></i>
                          </div>
                        </div>
                        <p className="text-purple-300/60 text-xs font-mono tracking-wider">80K+ Subs → 2M+ Workouts → 4.8★</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Case Study</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-run-line"></i><span>Health &amp; Wellness</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>7 month project</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                      Fitness Subscription App with Workout Tracking &amp; Live Classes</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">How we built a fitness app with 80K+ subscribers, 2M+ workouts logged, and 4.8 rating — with video streaming, offline mode, and live classes.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">2M+ workouts</span>
                          <span className="px-2 py-0.5 bg-slate-700/80 rounded text-gray-300">4.8 rating</span>
                        </div>
                      </div>
                      <i className="ri-arrow-right-line text-purple-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>

              </div>
            </div>
          </section>

          {/*  INDUSTRIES WE SERVE SECTION  */}
          <section className="pt-6 sm:pt-10 pb-12 sm:pb-20 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Industries We Serve</h2>
                <p className="text-gray-400 text-sm">Deep domain expertise across verticals that matter</p>
              </div>
              <div className="tw-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-building-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">PropTech &amp; Real Estate</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">SaaS platforms, investor portals, IoT-enabled facility management, and MLS integration systems</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">3</strong> case studies</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-truck-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Logistics &amp; Transportation</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Fleet tracking, route optimization, driver apps, real-time GPS systems, and delivery management</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">1</strong> case study</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-heart-pulse-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Healthcare &amp; HealthTech</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">HIPAA-compliant platforms, telehealth, patient record systems, and insurance billing automation</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">1</strong> case study</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-store-2-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">E-Commerce &amp; Marketplace</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Multi-vendor platforms, split payments, bilingual storefronts, and inventory management systems</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">1</strong> case study</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-wifi-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">IoT &amp; Smart Hardware</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Connected device integration, MQTT pipelines, smart lock systems, and sensor data platforms</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">2</strong> case studies</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-funds-box-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Finance &amp; Investment</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Investor portals, document management, reporting automation, and compliance-grade security</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">1</strong> case study</span>
                    <span className="text-cyan-400 text-sm font-medium flex items-center gap-1">Explore<i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*  NEWSLETTER SECTION  */}
          <section className="py-14 sm:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
              <div
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <div className="text-center mb-8 sm:mb-10">
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-cyan-400 mb-4 sm:mb-6 border border-cyan-500/30">
                    <i className="ri-mail-line"></i>
                    <span className="text-sm font-semibold">Stay Updated</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Get Project Insights Delivered</h2>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">Subscribe to receive new case studies, architecture deep-dives, and lessons learned from real production projects. No spam, unsubscribe anytime.</p>
                </div>
                <form className="max-w-xl mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input placeholder="Enter your email address"
                      className="flex-1 px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
                      type="email" required />
                    <button type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all whitespace-nowrap cursor-pointer font-semibold text-sm shadow-lg shadow-cyan-500/40">Subscribe
                      Now</button>
                  </div>
                </form>
                <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-slate-700 flex-wrap">
                  <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"><i
                    className="ri-shield-check-line text-cyan-400 text-lg"></i><span>100% Privacy</span></div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"><i
                    className="ri-mail-check-line text-cyan-400 text-lg"></i><span>No Spam</span></div>
                  <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm"><i
                    className="ri-time-line text-cyan-400 text-lg"></i><span>Weekly Updates</span></div>
                </div>
              </div>
            </div>
          </section>


        </div >
      </div >

      {/* Script removed */}




      {/* Script removed */}


      {/* End Migrated Content */}
    </div >
  );
}
