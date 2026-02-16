
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Script from 'next/script'; // Ensure Script is available if we use it, though we stripped scripts

// Import extracted CSS
import '../css/case-studies-extracted.css'; // This will be replaced

export default function CaseStudies() {

  useEffect(() => {
    // Category filter logic (specific to case-studies)
    const buttons = document.querySelectorAll('.category-btn');
    const articles = document.querySelectorAll('.article-card');
    if (buttons.length > 0) {
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          const category = button.getAttribute('data-category');
          buttons.forEach((btn: any) => btn.className = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white border border-white/5 hover:border-white/10');
          button.className = 'category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-cyan-600 text-white shadow-lg shadow-cyan-500/20';
          articles.forEach((article: any) => {
            if (category === 'all' || article.getAttribute('data-category') === category) {
              article.style.display = '';
              article.style.opacity = '0';
              setTimeout(() => article.style.opacity = '1', 50);
            } else {
              article.style.display = 'none';
            }
          });
        });
      });
    }
  }, []);


  return (
    <div className="page-wrapper">
      {/* Start Migrated Content */}

      <div id="root">
        <div className="min-h-screen bg-slate-900">
          <div className="relative min-h-screen">
            <div className="absolute inset-0 z-0">
              <img alt="Hero Background" className="w-full h-full object-cover object-top"
                src="/images/case-studies-hero-bg.jpg" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900"></div>
            </div>

            <div id="hero-content" className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-40 transition-all duration-300">
              <div className="max-w-4xl mx-auto text-center">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full text-white mb-8 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
                  <i className="ri-rocket-line text-cyan-400"></i>
                  <span className="text-sm font-semibold">Explore the Future of Tech</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-7">Insights That
                  Shape<br />Tomorrow's Technology</h1>
                <p className="text-xl text-white/95 leading-relaxed mb-12 max-w-2xl mx-auto">Deep dives into artificial
                  intelligence, blockchain, quantum computing, and emerging technologies that are transforming our digital
                  landscape.</p>
                <div className="flex items-center justify-center gap-5 flex-wrap">
                  <button
                    className="group px-9 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/30 hover:shadow-2xl hover:shadow-cyan-500/40 whitespace-nowrap cursor-pointer flex items-center gap-3 font-bold text-sm border border-cyan-400/30 tracking-wide [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">
                    Start Reading
                    <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
                  </button>
                  <button
                    className="px-9 py-4 bg-white/20 backdrop-blur-md !text-white rounded-lg hover:bg-white/30 transition-all whitespace-nowrap cursor-pointer font-bold text-sm border border-white/40 hover:border-white shadow-lg shadow-black/20 tracking-wide [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)]">Watch
                    Video</button>
                </div>
              </div>

              <div className="tw-grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-20 max-w-5xl mx-auto">
                <div
                  className="text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-xl p-6 border border-cyan-400/20 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/40 transition-colors">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">3.2M+</div>
                  <div className="text-white/70 font-medium text-sm">Active Readers</div>
                </div>
                <div
                  className="text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-xl p-6 border border-cyan-400/20 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/40 transition-colors">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">1,850+</div>
                  <div className="text-white/70 font-medium text-sm">Published Articles</div>
                </div>
                <div
                  className="text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-xl p-6 border border-cyan-400/20 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/40 transition-colors">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">75+</div>
                  <div className="text-white/70 font-medium text-sm">Tech Experts</div>
                </div>
                <div
                  className="text-center bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-md rounded-xl p-6 border border-cyan-400/20 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/40 transition-colors">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2">98%</div>
                  <div className="text-white/70 font-medium text-sm">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div id="categories" className="bg-slate-900 border-b border-white/10 sticky top-[80px] z-40 shadow-xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide" id="category-container">
                <button data-category="all"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-cyan-600 text-white shadow-lg shadow-cyan-500/20">
                  <i className="ri-apps-line text-lg"></i><span>All Topics</span>
                </button>
                <button data-category="ai"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-robot-line text-lg"></i><span>Artificial Intelligence</span>
                </button>
                <button data-category="blockchain"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-links-line text-lg"></i><span>Blockchain</span>
                </button>
                <button data-category="quantum"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-cpu-line text-lg"></i><span>Quantum Computing</span>
                </button>
                <button data-category="iot"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-wifi-line text-lg"></i><span>IoT</span>
                </button>
                <button data-category="cybersecurity"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-lock-line text-lg"></i><span>Cybersecurity</span>
                </button>
                <button data-category="ar-vr"
                  className="category-btn flex items-center gap-2.5 px-6 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer font-medium text-sm bg-slate-800 !text-gray-300 hover:bg-slate-700 hover:!text-white border border-white/5 hover:border-white/10">
                  <i className="ri-glasses-line text-lg"></i><span>AR/VR</span>
                </button>
              </div>
            </div>
          </div>

          <section className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Featured Stories</h2>
                  <p className="text-gray-400 text-sm">Handpicked articles from industry leaders</p>
                </div>
                <button
                  className="hidden md:block px-6 py-2.5 bg-slate-800 text-cyan-400 rounded-lg hover:bg-slate-700 transition-all cursor-pointer font-medium text-sm border border-cyan-500/30 hover:border-cyan-500/50">View
                  All</button>
              </div>

              <div id="articles-grid" className="tw-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/*  Card 1  */}
                <article data-category="ai"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="The Rise of Generative AI"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=futuristic%20artificial%20intelligence%20neural%20network%20visualization%20with%20glowing%20orange%20and%20amber%20nodes%20connected%20by%20flowing%20data%20streams%20on%20clean%20white%20background%20representing%20machine%20learning%20and%20generative%20AI%20technology&width=800&height=600&seq=article-ai-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-cyan-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">AI</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 15, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>8 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      The Rise of Generative AI: Transforming Creative Industries</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">Explore how generative AI models like
                      GPT-4 and DALL-E are revolutionizing content creation, design, and artistic expression.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                          S</div>
                        <div className="text-sm font-medium text-white">Sarah Mitchell</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>

                {/*  Card 2  */}
                <article data-category="blockchain"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="Blockchain Beyond Crypto"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=abstract%20blockchain%20network%20with%20interconnected%20orange%20glowing%20blocks%20and%20chains%20on%20minimalist%20white%20background%20representing%20decentralized%20technology%20and%20distributed%20ledger%20systems&width=800&height=600&seq=article-blockchain-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-blue-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Blockchain</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 14, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>10 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Blockchain Beyond Cryptocurrency: Real-World Applications</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">Discover how blockchain technology is
                      being applied in supply chain management, healthcare, voting systems, and digital identity.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs">
                          M</div>
                        <div className="text-sm font-medium text-white">Marcus Chen</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>

                {/*  Card 3  */}
                <article data-category="quantum"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="Quantum Computing"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=quantum%20computing%20visualization%20with%20abstract%20orange%20and%20amber%20quantum%20particles%20and%20wave%20patterns%20on%20clean%20white%20background%20representing%20quantum%20mechanics%20and%20computational%20power&width=800&height=600&seq=article-quantum-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-purple-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Quantum</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 13, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>12 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Quantum Computing: Breaking the Classical Barrier</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">An in-depth look at recent quantum
                      breakthroughs and their potential to solve complex problems in cryptography and drug discovery.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-semibold text-xs">
                          E</div>
                        <div className="text-sm font-medium text-white">Emily Zhang</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>

                {/*  Card 4  */}
                <article data-category="iot"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="IoT Security"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=internet%20of%20things%20network%20with%20connected%20smart%20devices%20and%20orange%20glowing%20wireless%20signals%20on%20white%20background%20representing%20IoT%20ecosystem%20and%20device%20connectivity&width=800&height=600&seq=article-iot-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-green-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">IoT</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 12, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>9 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      IoT Security: Protecting the Connected World</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">Learn about the latest security
                      challenges in IoT ecosystems and best practices for securing smart devices and industrial systems.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-xs">
                          J</div>
                        <div className="text-sm font-medium text-white">James Rodriguez</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>

                {/*  Card 5  */}
                <article data-category="cybersecurity"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="Zero Trust Architecture"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=cybersecurity%20shield%20with%20orange%20glowing%20protection%20layers%20and%20digital%20lock%20symbols%20on%20clean%20white%20background%20representing%20zero%20trust%20security%20and%20data%20protection&width=800&height=600&seq=article-security-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-red-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">Cybersecurity</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 11, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>11 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Zero Trust Architecture: The Future of Cybersecurity</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">Understanding zero trust security
                      models and how organizations are implementing them to protect against modern cyber threats.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white font-semibold text-xs">
                          L</div>
                        <div className="text-sm font-medium text-white">Lisa Anderson</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>

                {/*  Card 6  */}
                <article data-category="ar-vr"
                  className="article-card group bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer">
                  <div className="relative h-56 w-full overflow-hidden">
                    <img alt="Metaverse Development"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src="https://readdy.ai/api/search-image?query=virtual%20reality%20metaverse%20environment%20with%20orange%20and%20amber%20glowing%20digital%20landscapes%20and%20VR%20headset%20elements%20on%20white%20background%20representing%20immersive%20technology%20and%20virtual%20worlds&width=800&height=600&seq=article-vr-001&orientation=landscape" />
                    <div className="absolute top-4 left-4">
                      <span
                        className="px-3 py-1 bg-indigo-600/90 text-white rounded-full text-xs font-semibold backdrop-blur-sm">AR/VR</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                      <div className="flex items-center gap-1.5"><i className="ri-calendar-line"></i><span>Jan 10, 2024</span></div>
                      <div className="flex items-center gap-1.5"><i className="ri-time-line"></i><span>10 min read</span></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      Metaverse Development: Building Virtual Worlds</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">Explore the technologies powering the
                      metaverse, from VR/AR hardware to spatial computing platforms and decentralized economies.</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs">
                          D</div>
                        <div className="text-sm font-medium text-white">David Kim</div>
                      </div>
                      <i className="ri-arrow-right-line text-cyan-400 group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/*  EXPLORE BY TOPIC SECTION  */}
          <section className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Explore by Topic</h2>
                <p className="text-gray-400 text-sm">Dive deep into the technologies shaping our future</p>
              </div>
              <div className="tw-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-robot-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Artificial
                    Intelligence</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Machine learning, neural networks, and AI
                    applications</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">342</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-links-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Blockchain &
                    Web3</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Cryptocurrency, DeFi, and decentralized
                    technologies</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">218</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-teal-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-cpu-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Quantum
                    Computing</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Quantum algorithms, qubits, and quantum
                    supremacy</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">156</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-lock-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">Cybersecurity
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Threat detection, encryption, and security
                    best practices</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">289</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-wifi-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">IoT & Edge
                    Computing</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Connected devices, sensors, and edge
                    infrastructure</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">195</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
                <div
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 flex flex-col">
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <i className="ri-glasses-line text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">AR/VR &
                    Metaverse</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-grow">Immersive experiences and virtual worlds
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-gray-400"><strong className="text-cyan-400 font-semibold">167</strong>
                      articles</span>
                    <button
                      className="text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer text-sm font-medium flex items-center gap-1">Explore<i
                        className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/*  NEWSLETTER SECTION  */}
          <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            </div>
            <div className="max-w-4xl mx-auto px-6 relative z-10">
              <div
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-12 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
                <div className="text-center mb-10">
                  <div
                    className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-cyan-400 mb-6 border border-cyan-500/30">
                    <i className="ri-mail-line"></i>
                    <span className="text-sm font-semibold">Stay Updated</span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">Get the Latest Tech Insights</h2>
                  <p className="text-gray-300 text-sm leading-relaxed max-w-2xl mx-auto">Join 50,000+ tech enthusiasts receiving
                    weekly updates on AI, blockchain, quantum computing, and emerging technologies. No spam, unsubscribe
                    anytime.</p>
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
                <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-slate-700">
                  <div className="flex items-center gap-2 text-gray-400 text-sm"><i
                    className="ri-shield-check-line text-cyan-400 text-lg"></i><span>100% Privacy</span></div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm"><i
                    className="ri-mail-check-line text-cyan-400 text-lg"></i><span>No Spam</span></div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm"><i
                    className="ri-time-line text-cyan-400 text-lg"></i><span>Weekly Updates</span></div>
                </div>
              </div>
            </div>
          </section>

          {/*  TESTIMONIALS SECTION  */}
          <section className="py-20 bg-slate-900">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-16">
                <div
                  className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 backdrop-blur-sm rounded-full text-cyan-400 mb-6 border border-cyan-500/30">
                  <i className="ri-chat-quote-line"></i>
                  <span className="text-sm font-semibold">Testimonials</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-4">Trusted by Tech Leaders</h2>
                <p className="text-gray-400 text-sm">See what industry experts say about our content</p>
              </div>
              <div className="tw-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-7 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    <i className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                      className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                        className="ri-star-fill text-cyan-400 text-lg"></i>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">"TechInsight provides the most
                    comprehensive and accurate coverage of AI developments. Their deep dives into neural architectures are
                    essential reading."</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
                      SC</div>
                    <div>
                      <div className="font-semibold text-white text-sm">Dr. Sarah Chen</div>
                      <div className="text-xs text-gray-400">AI Research Lead</div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-7 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    <i className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                      className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                        className="ri-star-fill text-cyan-400 text-lg"></i>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">"The quality of blockchain analysis here
                    is unmatched. They break down complex DeFi protocols in ways that are both accessible and technically
                    rigorous."</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
                      MR</div>
                    <div>
                      <div className="font-semibold text-white text-sm">Marcus Rodriguez</div>
                      <div className="text-xs text-gray-400">Blockchain Architect</div>
                    </div>
                  </div>
                </div>
                <div
                  className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-7 border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20 flex flex-col">
                  <div className="flex items-center gap-1 mb-5">
                    <i className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                      className="ri-star-fill text-cyan-400 text-lg"></i><i className="ri-star-fill text-cyan-400 text-lg"></i><i
                        className="ri-star-fill text-cyan-400 text-lg"></i>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">"The cybersecurity coverage is
                    outstanding. They stay ahead of emerging threats and provide actionable insights. A must-read for
                    security professionals."</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700">
                    <div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/30">
                      EK</div>
                    <div>
                      <div className="font-semibold text-white text-sm">Elena Kowalski</div>
                      <div className="text-xs text-gray-400">Security Engineer</div>
                    </div>
                  </div>
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
