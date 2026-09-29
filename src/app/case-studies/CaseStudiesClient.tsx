
'use client';
import React, { useEffect } from 'react';
import CaseStudyCard from '../components/CaseStudyCard';
import { caseStudies } from '@/data/case-studies';

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
              <img alt="" className="w-full h-full object-cover object-top"
                src="/images/case-studies-hero-bg.jpg" width="1024" height="571" fetchPriority="high" />
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
                {caseStudies.map((study) => (
                  <CaseStudyCard key={study.slug} study={study} />
                ))}

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
