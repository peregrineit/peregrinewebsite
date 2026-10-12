#!/usr/bin/env python3
"""Hero images for the guides, as self-contained HTML (1200x630). Open any .html in a browser,
edit the text or colors, and screenshot it; or run this file to rewrite the HTML and
`design/blog-heroes/render.sh` to produce the PNG and WebP files in public/images/blog/."""
import os
D = os.path.dirname(os.path.abspath(__file__))
CSS = """
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1200px;height:630px;overflow:hidden}
body{font-family:Inter,'SF Pro Display',system-ui,-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#f8fafc;
 background:#060b18;position:relative}
.bg{position:absolute;inset:0;background:
 radial-gradient(620px 420px at 86% 18%,rgba(34,211,238,.30),transparent 62%),
 radial-gradient(560px 460px at 96% 96%,rgba(129,140,248,.34),transparent 60%),
 radial-gradient(520px 380px at 4% 100%,rgba(14,165,233,.20),transparent 60%),
 linear-gradient(135deg,#060b18 0%,#0b1630 55%,#0a1026 100%)}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(148,163,184,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,.07) 1px,transparent 1px);
 background-size:44px 44px;mask-image:radial-gradient(900px 520px at 70% 45%,#000 20%,transparent 75%);-webkit-mask-image:radial-gradient(900px 520px at 70% 45%,#000 20%,transparent 75%)}
.wrap{position:absolute;inset:0;padding:52px 56px;display:flex;gap:28px}
.left{width:560px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:10px;font-weight:800;letter-spacing:.14em;font-size:15px;color:#e2e8f0}
.brand i{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#22d3ee,#6366f1);display:block;box-shadow:0 0 24px rgba(34,211,238,.55)}
.pill{margin-top:44px;align-self:flex-start;font-size:13.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#67e8f9;
 padding:8px 14px;border-radius:999px;background:rgba(34,211,238,.10);border:1px solid rgba(34,211,238,.35)}
h1{margin-top:22px;font-size:58px;line-height:1.04;font-weight:800;letter-spacing:-.025em}
h1 em{font-style:normal;background:linear-gradient(90deg,#22d3ee,#818cf8 70%,#c084fc);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{margin-top:20px;font-size:21px;line-height:1.45;color:#cbd5e1;max-width:520px}
.foot{margin-top:auto;display:flex;gap:18px;align-items:center;font-size:15px;color:#94a3b8}
.foot b{color:#e2e8f0;font-weight:600}
.dot{width:5px;height:5px;border-radius:50%;background:#475569}
.right{flex:1;position:relative}
.glass{background:linear-gradient(180deg,rgba(30,41,69,.82),rgba(15,23,42,.82));border:1px solid rgba(148,163,184,.22);border-radius:20px;
 box-shadow:0 30px 80px rgba(2,6,23,.65),inset 0 1px 0 rgba(255,255,255,.07);backdrop-filter:blur(6px)}
.glow{box-shadow:0 0 0 1px rgba(34,211,238,.45),0 24px 70px rgba(34,211,238,.28),inset 0 1px 0 rgba(255,255,255,.1)}
.muted{color:#94a3b8}.cy{color:#67e8f9}
"""
def page(pill, title, sub, foot, right, extra=""):
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1200">
<title>{pill}</title><style>{CSS}{extra}</style></head><body><div class="bg"></div><div class="grid"></div>
<div class="wrap"><div class="left"><div class="brand"><i></i>PEREGRINE IT</div><div class="pill">{pill}</div>
<h1>{title}</h1><p class="sub">{sub}</p><div class="foot">{foot}</div></div><div class="right">{right}</div></div></body></html>"""

cheapest = page("Guide · IDX pricing 2026", "The <em>cheapest IDX</em> options, compared", "Lowest published plan from nine vendors, and what each price leaves out.",
 "<b>From $49 / month</b><span class='dot'></span>Prices as published Oct 12, 2026",
 """<div class="card c3 glass"><div class="muted t">Realtyna</div><div class="p">$99<span>/mo</span></div></div>
<div class="card c2 glass"><div class="muted t">IDX Broker · Core</div><div class="p">$60<span>/mo</span></div></div>
<div class="card c1 glass glow"><div class="tag">Lowest published</div><div class="muted t">Buying Buddy · MLSImport · Flexmls IDX</div><div class="p big">$49<span>/mo</span></div>
<div class="bars"><b style="height:38%"></b><b style="height:38%"></b><b style="height:38%"></b><b style="height:46%"></b><b style="height:46%"></b><b style="height:47%"></b><b style="height:55%"></b><b style="height:75%"></b><b style="height:78%"></b></div></div>""",
 """.card{position:absolute;padding:22px 24px}.card .t{font-size:15px;font-weight:600}.p{font-size:46px;font-weight:800;letter-spacing:-.02em;margin-top:6px}.p span{font-size:18px;color:#94a3b8;font-weight:600;margin-left:4px}
.c3{right:0;top:22px;width:250px;transform:rotate(5deg);opacity:.75}.c2{right:150px;top:96px;width:270px;transform:rotate(-4deg);opacity:.9}
.c1{right:20px;top:214px;width:440px;padding:26px 28px}.p.big{font-size:92px;line-height:1;background:linear-gradient(90deg,#fff,#a5f3fc);-webkit-background-clip:text;background-clip:text;color:transparent}.p.big span{-webkit-text-fill-color:#94a3b8;font-size:24px}
.tag{display:inline-block;font-size:12.5px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#06202b;background:linear-gradient(90deg,#22d3ee,#a5b4fc);padding:6px 11px;border-radius:999px;margin-bottom:12px}
.bars{display:flex;align-items:flex-end;gap:9px;height:96px;margin-top:18px}.bars b{flex:1;border-radius:6px 6px 2px 2px;background:linear-gradient(180deg,#22d3ee,#6366f1);opacity:.55}.bars b:nth-child(-n+3){opacity:1;box-shadow:0 0 18px rgba(34,211,238,.6)}""")

features = page("Guide · Requirements checklist", "IDX website <em>features</em> that matter", "25 features, grouped by who they serve, with a question to ask for each.",
 "<b>Buyers</b><span class='dot'></span><b>Agents</b><span class='dot'></span><b>Brokerage</b><span class='dot'></span><b>Search engines</b>",
 """<div class="win glass glow"><div class="bar"><i></i><i></i><i></i><div class="url">yourbrokerage.com/search</div></div>
<div class="search"><span>3+ beds · under $650k · draw area</span><b>Search</b></div>
<div class="body"><div class="map"><svg viewBox="0 0 250 250"><path d="M40 70 L120 38 L205 78 L190 170 L95 210 L38 150 Z" fill="rgba(34,211,238,.14)" stroke="#22d3ee" stroke-width="2.5" stroke-dasharray="7 6"/>
<g fill="#22d3ee"><circle cx="92" cy="96" r="8"/><circle cx="150" cy="84" r="8"/><circle cx="128" cy="150" r="8"/><circle cx="170" cy="136" r="8" fill="#a5b4fc"/><circle cx="78" cy="152" r="8" fill="#a5b4fc"/></g></svg></div>
<div class="list"><div class="it"><u></u><p><b>$612,000</b><s>3 bd · 2 ba · Active</s></p></div><div class="it"><u></u><p><b>$589,500</b><s>4 bd · 3 ba · Active</s></p></div><div class="it"><u></u><p><b>$640,000</b><s>3 bd · 2 ba · Pending</s></p></div></div></div></div>
<div class="chk k1 glass">✓ Saved searches &amp; alerts</div><div class="chk k2 glass">✓ Attribution per MLS</div><div class="chk k3 glass">✓ Pages in the HTML</div>""",
 """.win{position:absolute;right:0;top:28px;width:500px;height:400px;overflow:hidden}.bar{display:flex;align-items:center;gap:7px;padding:14px 16px;border-bottom:1px solid rgba(148,163,184,.18)}
.bar i{width:11px;height:11px;border-radius:50%;background:#475569}.url{margin-left:10px;flex:1;font-size:13px;color:#94a3b8;background:rgba(2,6,23,.5);border-radius:8px;padding:6px 12px}
.search{margin:16px;display:flex;align-items:center;justify-content:space-between;background:rgba(2,6,23,.55);border:1px solid rgba(34,211,238,.35);border-radius:12px;padding:10px 10px 10px 16px;font-size:15px;color:#e2e8f0}
.search b{background:linear-gradient(90deg,#22d3ee,#6366f1);color:#04121c;padding:8px 16px;border-radius:9px;font-size:14px}
.body{display:flex;gap:14px;padding:0 16px}.map{width:250px;height:250px;border-radius:14px;background:radial-gradient(circle at 30% 30%,#13233f,#0a1326);border:1px solid rgba(148,163,184,.18)}
.list{flex:1;display:flex;flex-direction:column;gap:10px}.it{display:flex;gap:10px;align-items:center;background:rgba(2,6,23,.45);border:1px solid rgba(148,163,184,.16);border-radius:12px;padding:9px}
.it u{width:54px;height:54px;border-radius:9px;background:linear-gradient(135deg,#1e3a5f,#312e81);display:block}.it p{display:flex;flex-direction:column;font-size:16px}.it s{text-decoration:none;white-space:nowrap;font-size:12px;color:#94a3b8;margin-top:3px}
.chk{position:absolute;font-size:16px;font-weight:700;padding:12px 18px;border-radius:14px;color:#a5f3fc}.k1{left:-10px;top:448px}.k2{left:96px;top:506px}.k3{right:0;top:448px}""")

boards = page("Reference · 15 US MLS boards", "MLS boards, <em>side by side</em>", "Data platform, feed types, who may license and published fees for each.",
 "<b>MLS Grid</b><span class='dot'></span><b>Trestle</b><span class='dot'></span><b>Bridge</b><span class='dot'></span><b>Spark</b><span class='dot'></span><b>Own API</b>",
 """<svg class="net" viewBox="0 0 520 500"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#818cf8"/></linearGradient>
<filter id="f"><feGaussianBlur stdDeviation="6"/></filter></defs>
<g stroke="url(#g)" stroke-width="1.6" opacity=".55" fill="none">
<path d="M260 250 L96 70"/><path d="M260 250 L250 40"/><path d="M260 250 L420 76"/><path d="M260 250 L470 210"/><path d="M260 250 L452 372"/><path d="M260 250 L320 452"/><path d="M260 250 L160 446"/><path d="M260 250 L52 356"/><path d="M260 250 L36 206"/>
<path d="M96 70 L250 40 L420 76 L470 210 L452 372 L320 452 L160 446 L52 356 L36 206 Z" opacity=".35"/></g>
<circle cx="260" cy="250" r="78" fill="#22d3ee" opacity=".22" filter="url(#f)"/><circle cx="260" cy="250" r="62" fill="#0b1630" stroke="url(#g)" stroke-width="3"/>
<text x="260" y="243" text-anchor="middle" fill="#f8fafc" font-size="19" font-weight="800">RESO</text><text x="260" y="266" text-anchor="middle" fill="#94a3b8" font-size="14" font-weight="600">Web API</text>
<g font-size="15" font-weight="700" fill="#e2e8f0" text-anchor="middle">
<g><rect x="36" y="50" width="120" height="40" rx="12" fill="#101c38" stroke="#22d3ee"/><text x="96" y="76">CRMLS</text></g>
<g><rect x="186" y="20" width="128" height="40" rx="12" fill="#101c38" stroke="#22d3ee"/><text x="250" y="46">Bright MLS</text></g>
<g><rect x="354" y="56" width="132" height="40" rx="12" fill="#101c38" stroke="#818cf8"/><text x="420" y="82">Stellar MLS</text></g>
<g><rect x="412" y="190" width="108" height="40" rx="12" fill="#101c38" stroke="#818cf8"/><text x="466" y="216">NTREIS</text></g>
<g><rect x="392" y="352" width="120" height="40" rx="12" fill="#101c38" stroke="#22d3ee"/><text x="452" y="378">ARMLS</text></g>
<g><rect x="262" y="432" width="116" height="40" rx="12" fill="#101c38" stroke="#22d3ee"/><text x="320" y="458">MRED</text></g>
<g><rect x="92" y="426" width="136" height="40" rx="12" fill="#101c38" stroke="#818cf8"/><text x="160" y="452">REcolorado</text></g>
<g><rect x="0" y="336" width="104" height="40" rx="12" fill="#101c38" stroke="#818cf8"/><text x="52" y="362">FMLS</text></g>
<g><rect x="0" y="186" width="110" height="40" rx="12" fill="#101c38" stroke="#22d3ee"/><text x="55" y="212">NWMLS</text></g></g></svg>""",
 ".net{position:absolute;right:-6px;top:10px;width:540px;height:520px;filter:drop-shadow(0 20px 50px rgba(2,6,23,.7))}")

stack = page("Decision guide · Architecture", "Choosing a <em>tech stack</em> for a real estate platform", "Database, search, cache, backend and frontend: what listing data asks of each.",
 "<b>7 layers in the guide</b><span class='dot'></span>From each technology's own documentation",
 """<div class="iso"><div class="ly l1"><span>Frontend</span><small>Server-rendered pages</small></div><div class="ly l2"><span>Backend</span><small>API · sync workers</small></div>
<div class="ly l3"><span>Search</span><small>Filters · geo · autocomplete</small></div><div class="ly l4"><span>Cache</span><small>Redis</small></div><div class="ly l5"><span>System of record</span><small>PostgreSQL · MongoDB</small></div></div>""",
 """.left{width:600px}h1{font-size:52px}.iso{position:absolute;right:6px;top:30px;width:440px;height:480px}
.ly{position:absolute;left:0;width:440px;height:96px;border-radius:22px;transform:perspective(1100px) rotateX(52deg) rotateZ(-8deg);transform-origin:center;display:flex;align-items:center;justify-content:space-between;padding:0 34px;
 border:1.5px solid rgba(255,255,255,.28);box-shadow:0 34px 50px rgba(2,6,23,.75),inset 0 2px 0 rgba(255,255,255,.25)}
.ly span{font-size:24px;font-weight:800;letter-spacing:-.01em;white-space:nowrap}.ly small{font-size:15px;font-weight:600;opacity:.92;white-space:nowrap}
.l1{top:0;background:linear-gradient(90deg,#22d3ee,#38bdf8);color:#04121c}.l2{top:92px;background:linear-gradient(90deg,#38bdf8,#6366f1);color:#04121c}
.l3{top:184px;background:linear-gradient(90deg,#6366f1,#8b5cf6)}.l4{top:276px;background:linear-gradient(90deg,#8b5cf6,#c026d3)}.l5{top:368px;background:linear-gradient(90deg,#1e293b,#334155)}""")

seo = page("Guide · Search visibility", "<em>SEO, AEO &amp; GEO</em> for real estate websites", "What to build to be found in search, in answer features and in AI answers.",
 "<b>What to build</b><span class='dot'></span>and which claims to doubt",
 """<div class="ring r1"><b>SEO</b><small>search results</small></div><div class="ring r2"><b>AEO</b><small>answer features</small></div><div class="ring r3"><b>GEO</b><small>AI answers</small></div>
<div class="core">Indexable<br>listing pages</div>
<div class="q glass"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>homes for sale near me with a pool</div>""",
 """.ring{position:absolute;width:290px;height:290px;border-radius:50%;display:flex;flex-direction:column;align-items:center;mix-blend-mode:screen;border:1.5px solid rgba(255,255,255,.28)}
.ring b{font-size:44px;font-weight:800;letter-spacing:-.02em}.ring small{font-size:15px;font-weight:600;color:#e2e8f0;opacity:.9}
.r1{right:206px;top:74px;background:radial-gradient(circle at 35% 30%,rgba(34,211,238,.85),rgba(34,211,238,.28));padding-top:54px;padding-right:70px}
.r2{right:10px;top:74px;background:radial-gradient(circle at 65% 30%,rgba(99,102,241,.9),rgba(99,102,241,.3));padding-top:54px;padding-left:70px}
.r3{right:108px;top:236px;background:radial-gradient(circle at 50% 70%,rgba(192,132,252,.9),rgba(192,132,252,.3));justify-content:flex-end;padding-bottom:50px}
.core{position:absolute;right:186px;top:246px;width:136px;text-align:center;font-size:16px;font-weight:800;line-height:1.25;color:#04121c;background:#f8fafc;border-radius:14px;padding:10px 8px;box-shadow:0 10px 30px rgba(2,6,23,.6)}
.q{position:absolute;right:38px;top:6px;display:flex;gap:10px;align-items:center;font-size:16.5px;color:#e2e8f0;padding:12px 18px;border-radius:999px}""")

PAGES = {"cheapest-idx-options": cheapest, "idx-website-features-checklist": features, "mls-boards-compared": boards,
         "real-estate-platform-tech-stack": stack, "real-estate-website-seo-aeo-geo": seo}
if __name__ == "__main__":
    for slug, doc in PAGES.items():
        open(os.path.join(D, slug + ".html"), "w").write(doc); print("wrote", slug + ".html")
