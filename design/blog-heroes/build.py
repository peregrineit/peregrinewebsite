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
.brand img{width:40px;height:40px;display:block;filter:drop-shadow(0 0 14px rgba(34,211,238,.45))}
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
<div class="wrap"><div class="left"><div class="brand"><img src="../../public/favicons/favicon-192x192.png" alt="">PEREGRINE IT</div><div class="pill">{pill}</div>
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

features = page("Engineering · IDX platform", "<em>Engineering Requirements</em> for a Production-Ready IDX Platform", "Architecture, data reliability, security, performance and operations, each as a requirement you can verify.",
 "<b>Testable requirements</b><span class='dot'></span>How to verify each one",
 """<div class="ly glass l1"><i>1</i><b>Architecture</b><small>data ownership · boundaries</small><u></u></div>
<div class="ly glass glow l2"><i>2</i><b>Data reliability</b><small>freshness · removals · reconciliation</small><u></u></div>
<div class="ly glass l3"><i>3</i><b>Security</b><small>credentials · access · display rules</small><u></u></div>
<div class="ly glass l4"><i>4</i><b>Performance</b><small>page and search budgets</small><u></u></div>
<div class="ly glass l5"><i>5</i><b>Operations</b><small>monitoring · restore · runbooks</small><u></u></div>""",
 ".left{width:590px}.sub{font-size:19.5px;max-width:540px}"+"""h1{font-size:40px}.ly{position:absolute;right:0;width:500px;height:70px;border-radius:16px;padding:0 20px 0 72px;display:flex;flex-direction:column;justify-content:center}
.ly b{font-size:19px;font-weight:800}.ly small{font-size:14px;color:#94a3b8;margin-top:3px}
.ly i{position:absolute;left:18px;top:17px;width:36px;height:36px;border-radius:50%;border:2px solid #22d3ee;color:#a5f3fc;font-style:normal;font-weight:800;font-size:16px;display:flex;align-items:center;justify-content:center}
.ly u{position:absolute;right:22px;top:26px;width:22px;height:11px;border-left:3px solid #22d3ee;border-bottom:3px solid #22d3ee;transform:rotate(-45deg);text-decoration:none}
.l1{top:6px}.l2{top:88px}.l3{top:170px}.l4{top:252px}.l5{top:334px}.l3 i,.l4 i{border-color:#818cf8;color:#c7d2fe}.l3 u,.l4 u{border-color:#818cf8}.l5 i{border-color:#c084fc;color:#e9d5ff}.l5 u{border-color:#c084fc}""")

boards = page("Reference · MLS data access", "15 US MLS Boards: A <em>Data Access Reference</em>", "Who each serves, how data is delivered, feed types, who may license and where to apply.",
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
 "h1{font-size:50px}.left{width:540px}.net{position:absolute;right:-6px;top:10px;width:540px;height:520px;filter:drop-shadow(0 20px 50px rgba(2,6,23,.7))}")

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


pipeline = page("Guide · MLS data pipeline", "How an <em>MLS data pipeline</em> works", "A nine-stage reference design for the RESO Web API, with failure modes.",
 "<b>Replication</b><span class='dot'></span><b>Normalization</b><span class='dot'></span><b>Compliance</b><span class='dot'></span><b>Monitoring</b>",
 """<div class="flow"><div class="nd glass"><i>1</i><b>Connector</b><small>OAuth 2 · paging · rate limits</small></div><div class="ar"></div>
<div class="nd glass"><i>2</i><b>Replication</b><small>cursor per feed</small></div><div class="ar"></div>
<div class="nd glass glow"><i>3</i><b>Normalize</b><small>RESO Data Dictionary</small></div><div class="ar"></div>
<div class="nd glass"><i>4</i><b>Canonical store</b><small>one row per listing per feed</small></div><div class="ar"></div>
<div class="nd glass"><i>5</i><b>Search index &amp; API</b><small>rebuildable from the store</small></div></div>
<div class="side glass">Media worker</div><div class="side s2 glass">Display policy</div>""",
 """.left{width:540px}h1{font-size:54px}.flow{position:absolute;right:120px;top:12px;width:330px;display:flex;flex-direction:column;align-items:stretch}
.nd{display:grid;grid-template-columns:44px 1fr;column-gap:14px;align-items:center;padding:13px 18px;border-radius:16px}.nd i{grid-row:span 2;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;font-size:19px;color:#04121c;background:linear-gradient(135deg,#22d3ee,#818cf8)}
.nd b{font-size:20px}.nd small{font-size:14px;color:#94a3b8}.ar{height:22px;width:2px;margin:0 auto;background:linear-gradient(#22d3ee,#818cf8);position:relative}.ar:after{content:'';position:absolute;left:-5px;bottom:-2px;border:6px solid transparent;border-top-color:#818cf8}
.side{position:absolute;right:0;top:214px;font-size:15px;font-weight:700;color:#a5f3fc;padding:12px 14px;border-radius:14px;writing-mode:vertical-rl}.side.s2{top:380px;color:#c4b5fd}""")

security = page("Guide · Investor portal security", "Investor portal <em>security checklist</em>", "Access by role and entity, document controls, audit trail and sign-in, mapped to public standards.",
 "<b>OWASP ASVS 5.0</b><span class='dot'></span><b>NIST SP 800-63B</b>",
 """<svg class="sh" viewBox="0 0 300 340"><defs><linearGradient id="s1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#6366f1"/></linearGradient><filter id="b"><feGaussianBlur stdDeviation="14"/></filter></defs>
<path d="M150 14 L276 60 V168 C276 244 222 300 150 326 C78 300 24 244 24 168 V60 Z" fill="#22d3ee" opacity=".35" filter="url(#b)"/>
<path d="M150 14 L276 60 V168 C276 244 222 300 150 326 C78 300 24 244 24 168 V60 Z" fill="#0b1630" stroke="url(#s1)" stroke-width="5"/>
<path d="M150 44 L250 80 V168 C250 228 208 274 150 296 C92 274 50 228 50 168 V80 Z" fill="url(#s1)" opacity=".16"/>
<rect x="104" y="150" width="92" height="76" rx="14" fill="url(#s1)"/><path d="M122 150 v-22 a28 28 0 0 1 56 0 v22" fill="none" stroke="url(#s1)" stroke-width="13" stroke-linecap="round"/>
<circle cx="150" cy="182" r="9" fill="#06202b"/><rect x="146" y="184" width="8" height="22" rx="4" fill="#06202b"/></svg>
<div class="ck glass k1">✓ Access by role and entity</div><div class="ck glass k2">✓ Watermarked documents</div><div class="ck glass k3">✓ Audit trail</div><div class="ck glass k4">✓ Sessions and sign-in</div>""",
 """.left{width:560px}h1{font-size:54px}.sh{position:absolute;right:150px;top:44px;width:270px;height:306px}
.ck{position:absolute;font-size:16.5px;font-weight:700;color:#e2e8f0;padding:12px 18px;border-radius:14px}.k1{right:0;top:6px}.k2{right:-6px;top:156px}.k3{right:330px;top:300px}.k4{right:20px;top:372px}.k1,.k3{color:#a5f3fc}""")

laravel = page("Guide · Laravel upgrade", "Laravel <em>upgrade</em> checklist", "Upgrade in place, replace in stages or rewrite: a decision table and six phases.",
 "<b>From Laravel's own upgrade guides</b><span class='dot'></span>No project claims",
 """<div class="hop"><span>9</span><u></u><span>10</span><u></u><span>11</span><u></u><span>12</span><u></u><span class="on">13</span></div>
<div class="lc glass glow"><div class="hd"><i></i><i></i><i></i><b>upgrade-plan.md</b></div>
<p><s>✓</s>Inventory versions and packages</p><p><s>✓</s>Add tests around what matters</p><p><s>✓</s>One major version per hop</p><p><s>✓</s>Fix deprecations, then upgrade</p><p><s>✓</s>Rehearse the deploy and rollback</p><p class="todo"><s></s>Go live, then watch the queues</p></div>
<div class="opt glass o1">Upgrade in place</div><div class="opt glass o2">Replace in stages</div><div class="opt glass o3">Rewrite</div>""",
 """.hop{position:absolute;right:26px;top:6px;display:flex;align-items:center;gap:8px}.hop span{width:50px;height:50px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:20px;background:rgba(30,41,69,.85);border:1px solid rgba(148,163,184,.3);color:#cbd5e1}
.hop span.on{background:linear-gradient(135deg,#fb7185,#f43f5e);color:#fff;border:0;box-shadow:0 0 26px rgba(244,63,94,.6)}.hop u{width:22px;height:2px;background:#475569;display:block}
.lc{position:absolute;right:20px;top:84px;width:430px;padding:0 0 14px;overflow:hidden}.hd{display:flex;align-items:center;gap:7px;padding:13px 16px;border-bottom:1px solid rgba(148,163,184,.18);margin-bottom:8px}.hd i{width:11px;height:11px;border-radius:50%;background:#475569}.hd b{margin-left:8px;font-size:13.5px;color:#94a3b8;font-weight:600}
.lc p{display:flex;align-items:center;gap:12px;font-size:17px;padding:9px 20px;color:#e2e8f0}.lc s{text-decoration:none;width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#22d3ee,#6366f1);color:#04121c;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center}
.lc p.todo{color:#94a3b8}.lc p.todo s{background:transparent;border:2px solid #475569}
.opt{position:absolute;top:446px;font-size:15.5px;font-weight:700;padding:11px 16px;border-radius:13px;color:#a5f3fc}.o1{right:300px}.o2{right:128px}.o3{right:22px;color:#fda4af}""")

odoo = page("Guide · Odoo + Shopify integration", "<em>Odoo and Shopify</em> integration guide", "Which system owns each record, webhooks plus polling, rate limits and failure modes.",
 "<b>From Odoo and Shopify documentation</b>",
 """<div class="sys glass a"><b>Odoo</b><small>ERP · stock · accounting</small></div><div class="sys glass glow b"><b>Shopify</b><small>storefront · checkout</small></div>
<svg class="lk" viewBox="0 0 160 110"><defs><linearGradient id="l" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#818cf8"/></linearGradient></defs>
<path d="M12 36 H140 M124 20 L142 36 L124 52" fill="none" stroke="url(#l)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M148 78 H20 M36 62 L18 78 L36 94" fill="none" stroke="url(#l)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div class="rec"><div class="glass">Products<small>Odoo → Shopify</small></div><div class="glass">Stock<small>Odoo → Shopify</small></div><div class="glass">Orders<small>Shopify → Odoo</small></div><div class="glass">Refunds<small>Shopify → Odoo</small></div></div>""",
 """.left{width:540px}h1{font-size:54px}.sys{position:absolute;top:36px;width:206px;height:150px;display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:24px}.sys b{font-size:34px;font-weight:800;letter-spacing:-.02em}.sys small{font-size:14px;color:#94a3b8;margin-top:6px}
.sys.a{right:330px}.sys.a b{color:#e9d5ff}.sys.b{right:0}.sys.b b{color:#a7f3d0}.lk{position:absolute;right:212px;top:62px;width:112px;height:78px}
.rec{position:absolute;right:0;top:236px;width:536px;display:grid;grid-template-columns:1fr 1fr;gap:14px}.rec div{padding:16px 20px;border-radius:16px;font-size:20px;font-weight:800;display:flex;flex-direction:column}.rec small{font-size:14.5px;font-weight:600;color:#67e8f9;margin-top:4px}""")

storage = page("Guide · Self-storage software", "Self-storage software: <em>build or buy?</em>", "What the published products cover, where they stop, and when a custom build pays off.",
 "<b>Costs</b><span class='dot'></span><b>Integrations</b><span class='dot'></span><b>Gate and lock access</b><span class='dot'></span><b>Billing</b>",
 """<div class="ch glass c1"><b>Buy</b><small>faster start</small></div><div class="ch glass glow c2"><b>Build</b><small>your workflow · your data</small></div>
<div class="units"><div class="roof"></div><div class="row"><u></u><u></u><u></u><u></u><u></u></div><div class="ground"></div></div>""",
 """.left{width:560px}h1{font-size:52px}.ch{position:absolute;top:14px;width:236px;padding:20px 22px;border-radius:20px;display:flex;flex-direction:column}.ch b{font-size:34px;font-weight:800}.ch small{font-size:15px;color:#94a3b8;margin-top:4px}
.c1{right:262px}.c2{right:0}.c2 b{background:linear-gradient(90deg,#22d3ee,#a5b4fc);-webkit-background-clip:text;background-clip:text;color:transparent}
.units{position:absolute;right:0;top:186px;width:500px}.roof{height:26px;background:linear-gradient(180deg,#334155,#1e293b);border-radius:8px 8px 0 0;border:1px solid rgba(148,163,184,.3)}
.row{display:flex;gap:12px;padding:14px 14px 0;background:linear-gradient(180deg,#16233f,#0e1830);border-left:1px solid rgba(148,163,184,.25);border-right:1px solid rgba(148,163,184,.25)}
.row u{flex:1;height:176px;border-radius:6px 6px 0 0;display:block;background:repeating-linear-gradient(180deg,#f59e0b 0 13px,#d97706 13px 15px);box-shadow:inset 0 0 0 2px rgba(120,53,15,.5),0 0 26px rgba(245,158,11,.25)}
.row u:nth-child(2),.row u:nth-child(5){background:repeating-linear-gradient(180deg,#22d3ee 0 13px,#0891b2 13px 15px);box-shadow:inset 0 0 0 2px rgba(8,51,68,.6),0 0 26px rgba(34,211,238,.3)}
.ground{height:14px;background:#334155;border-radius:0 0 8px 8px;box-shadow:0 30px 60px rgba(2,6,23,.8)}""")


# ---------------------------------------------------------------------------------------
# Technical article batch, 2026-10-12. Each cover carries the article's exact title.
# ---------------------------------------------------------------------------------------
X = ".left{width:590px}.sub{font-size:19.5px;max-width:540px}.bx{position:absolute;border-radius:16px;padding:12px 16px;font-weight:700;font-size:16px}"
ARROW = "<defs><linearGradient id='ga' gradientUnits='userSpaceOnUse' x1='0' y1='0' x2='520' y2='440'><stop offset='0' stop-color='#22d3ee'/><stop offset='1' stop-color='#818cf8'/></linearGradient><marker id='ah' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'><path d='M0 0L10 5L0 10z' fill='#818cf8'/></marker></defs>"

sync = page("Architecture · MLS data", "Building a Scalable <em>MLS Synchronization</em> Engine", "Full import, incremental sync, checkpoints, backoff and recovery.",
 "<b>Checkpoints</b><span class='dot'></span><b>Idempotency</b><span class='dot'></span><b>Backoff</b>",
 """<div class="tl"><div class="ev"><i></i><b>Initial full import</b><small>page by page, in order</small></div><div class="ev"><i class="c"></i><b>Checkpoint saved</b><small>after the durable write</small></div>
<div class="ev"><i></i><b>Incremental sync</b><small>changes since the cursor</small></div><div class="ev w"><i></i><b>Rate limited</b><small>back off, then retry</small></div><div class="ev"><i class="c"></i><b>Resume from checkpoint</b><small>no gaps, no duplicates</small></div></div>""",
 X+"""h1{font-size:50px}.tl{position:absolute;right:10px;top:16px;width:420px;border-left:3px solid;border-image:linear-gradient(#22d3ee,#818cf8) 1;padding-left:0}
.ev{position:relative;margin:0 0 16px 34px;padding:13px 18px;border-radius:14px;background:linear-gradient(180deg,rgba(30,41,69,.85),rgba(15,23,42,.85));border:1px solid rgba(148,163,184,.22);display:flex;flex-direction:column}
.ev b{font-size:19px}.ev small{font-size:14px;color:#94a3b8;margin-top:2px}.ev i{position:absolute;left:-45px;top:22px;width:18px;height:18px;border-radius:50%;background:#0b1630;border:3px solid #22d3ee}.ev i.c{background:#22d3ee;box-shadow:0 0 18px #22d3ee}
.ev.w{border-color:rgba(251,191,36,.6)}.ev.w i{border-color:#fbbf24}.ev.w b{color:#fde68a}""")

lifecycle = page("Architecture · Listing lifecycle", "Handling <em>Deleted, Expired and Sold</em> Listings Correctly", "Status changes, removals, index cleanup and what the page should return.",
 "<b>Reconcile</b><span class='dot'></span><b>Clean the index</b><span class='dot'></span><b>Respect the license</b>",
 f"""<svg class="st" viewBox="0 0 520 470">{ARROW}<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)">
<path d="M150 70 H330"/><path d="M400 100 V190"/><path d="M110 100 V190"/><path d="M150 230 C230 230 250 330 300 372"/><path d="M400 250 V350"/><path d="M110 250 C110 330 200 392 290 392"/></g>
<g font-size="20" font-weight="800" text-anchor="middle" fill="#f8fafc">
<rect x="30" y="40" width="160" height="60" rx="16" fill="#0e3a4a" stroke="#22d3ee" stroke-width="2"/><text x="110" y="78">Active</text>
<rect x="330" y="40" width="160" height="60" rx="16" fill="#1a2550" stroke="#818cf8" stroke-width="2"/><text x="410" y="78">Pending</text>
<rect x="30" y="190" width="160" height="60" rx="16" fill="#162036" stroke="#64748b" stroke-width="2"/><text x="110" y="228">Expired</text>
<rect x="330" y="190" width="160" height="60" rx="16" fill="#132a22" stroke="#34d399" stroke-width="2"/><text x="410" y="228">Sold</text>
<rect x="300" y="350" width="190" height="64" rx="16" fill="#2a1622" stroke="#fb7185" stroke-width="2"/><text x="395" y="390">Removed</text></g>
<text x="30" y="300" fill="#94a3b8" font-size="15">Withdrawn · Canceled</text></svg>""",
 X+"h1{font-size:45px}.st{position:absolute;right:0;top:10px;width:500px;height:452px}")

normalize = page("Architecture · MLS data", "<em>MLS Data Normalization</em> Across Multiple Real Estate Boards", "Field mapping, identifiers, units and provenance in one canonical schema.",
 "<b>RESO Data Dictionary</b><span class='dot'></span><b>Raw payload kept</b>",
 f"""<div class="src glass s1"><small>Board A</small><code>ListPrice</code><code>LivingArea</code></div><div class="src glass s2"><small>Board B</small><code>list_price</code><code>sqft_total</code></div><div class="src glass s3"><small>Board C</small><code>LP</code><code>BldgSqFt</code></div>
<svg class="mg" viewBox="0 0 130 440">{ARROW}<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M0 60 C70 60 60 210 122 214"/><path d="M0 220 H122"/><path d="M0 380 C70 380 60 230 122 226"/></g></svg>
<div class="can glass glow"><small>Canonical listing</small><code>ListPrice</code><code>LivingArea</code><code>LivingAreaUnits</code><code>OriginatingSystemName</code><em>raw payload retained</em></div>""",
 X+"""h1{font-size:43px}.src{position:absolute;right:340px;width:184px;padding:14px 16px;display:flex;flex-direction:column;gap:6px}.s1{top:6px}.s2{top:166px}.s3{top:326px}
.src small,.can small{font-size:13px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#67e8f9}code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:15.5px;color:#e2e8f0;background:rgba(2,6,23,.5);border-radius:7px;padding:4px 9px}
.mg{position:absolute;right:210px;top:6px;width:128px;height:440px}.can{position:absolute;right:0;top:112px;width:212px;padding:16px;display:flex;flex-direction:column;gap:7px}.can em{font-style:normal;font-size:13.5px;color:#c4b5fd;margin-top:4px}""")

migrate = page("Strategy · Platform migration", "<em>Data Migration</em> Strategies for Legacy Real Estate Platforms", "Parallel run, validation gates, cutover and a rollback window.",
 "<b>Map</b><span class='dot'></span><b>Reconcile</b><span class='dot'></span><b>Cut over</b><span class='dot'></span><b>Roll back</b>",
 f"""<svg class="mv" viewBox="0 0 540 440">{ARROW}
<text x="0" y="62" fill="#94a3b8" font-size="16" font-weight="700">LEGACY</text><rect x="0" y="76" width="350" height="54" rx="14" fill="#1e293b" stroke="#64748b" stroke-width="2"/><rect x="350" y="76" width="120" height="54" rx="14" fill="#1e293b" stroke="#64748b" stroke-width="2" stroke-dasharray="6 6" opacity=".55"/>
<text x="24" y="109" fill="#e2e8f0" font-size="17" font-weight="700">serving traffic</text><text x="372" y="109" fill="#94a3b8" font-size="15" font-weight="600">rollback</text>
<text x="0" y="262" fill="#67e8f9" font-size="16" font-weight="700">NEW PLATFORM</text><rect x="110" y="276" width="240" height="54" rx="14" fill="#0e3a4a" stroke="#22d3ee" stroke-width="2" stroke-dasharray="6 6"/><rect x="350" y="276" width="190" height="54" rx="14" fill="#0e3a4a" stroke="#22d3ee" stroke-width="2.5"/>
<text x="130" y="309" fill="#e2e8f0" font-size="17" font-weight="700">parallel run</text><text x="372" y="309" fill="#f8fafc" font-size="17" font-weight="800">serving traffic</text>
<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M150 132 V270"/><path d="M230 132 V270"/><path d="M310 132 V270"/></g>
<text x="176" y="206" fill="#94a3b8" font-size="14">sync</text><line x1="350" y1="40" x2="350" y2="370" stroke="#fbbf24" stroke-width="3" stroke-dasharray="4 6"/><text x="350" y="30" fill="#fde68a" font-size="17" font-weight="800" text-anchor="middle">Cutover</text>
<g font-size="14.5" font-weight="700" fill="#a5f3fc"><rect x="96" y="372" width="124" height="38" rx="11" fill="#101c38" stroke="#22d3ee"/><text x="158" y="396" text-anchor="middle">Counts match</text><rect x="232" y="372" width="112" height="38" rx="11" fill="#101c38" stroke="#22d3ee"/><text x="288" y="396" text-anchor="middle">Samples OK</text></g></svg>""",
 X+"h1{font-size:44px}.mv{position:absolute;right:-4px;top:16px;width:536px;height:438px}")

elastic = page("Architecture · Search", "Designing a <em>Real Estate Search Engine</em> with Elasticsearch", "Mappings, filters, geo queries, autocomplete and zero-downtime reindexing.",
 "<b>Index design</b><span class='dot'></span><b>Filters</b><span class='dot'></span><b>Reindex behind an alias</b>",
 """<div class="sb glass glow"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>3 bed house near the lake<span></span></div>
<div class="fl"><b>Price range</b><b>Beds 3+</b><b>Status: Active</b><b>Within drawn area</b></div>
<div class="al glass"><small>alias</small><b>listings</b></div><div class="ln"></div>
<div class="ix v2 glass glow"><b>listings_v2</b><small>live</small></div><div class="ix v3 glass"><b>listings_v3</b><small>reindexing</small></div>""",
 X+"""h1{font-size:47px}.sb{position:absolute;right:0;top:10px;width:480px;display:flex;align-items:center;gap:12px;padding:16px 20px;border-radius:16px;font-size:19px;color:#e2e8f0}.sb span{width:2px;height:22px;background:#67e8f9;display:block}
.fl{position:absolute;right:0;top:92px;width:480px;display:flex;flex-wrap:wrap;gap:10px}.fl b{font-size:15px;padding:9px 14px;border-radius:999px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.4);color:#a5f3fc}
.al{position:absolute;right:160px;top:206px;width:160px;padding:14px;text-align:center;border-radius:16px}.al small,.ix small{display:block;font-size:13px;color:#94a3b8;font-weight:600}.al b{font-size:22px;color:#c4b5fd}
.ln{position:absolute;right:238px;top:286px;width:3px;height:46px;background:linear-gradient(#818cf8,#22d3ee)}.ix{position:absolute;top:332px;width:224px;padding:18px;border-radius:16px}.ix b{font-family:ui-monospace,Menlo,monospace;font-size:20px}.v2{right:256px}.v3{right:0;opacity:.72;border-style:dashed}""")

mapsearch = page("Architecture · Map search", "Building <em>Map-Based Property Search</em> with Geospatial Queries", "Viewport queries, drawn areas, clustering and a list that stays in sync.",
 "<b>Bounding box</b><span class='dot'></span><b>Polygon</b><span class='dot'></span><b>Clusters</b>",
 """<div class="mp glass glow"><svg viewBox="0 0 480 400"><defs><pattern id="gr" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="rgba(148,163,184,.13)"/></pattern></defs>
<rect width="480" height="400" fill="#0a1428"/><rect width="480" height="400" fill="url(#gr)"/>
<path d="M-10 250 C100 210 160 300 260 262 S420 180 500 214" fill="none" stroke="#1d4ed8" stroke-width="22" opacity=".35"/><path d="M180 -10 C200 120 150 240 210 410" fill="none" stroke="#334155" stroke-width="10" opacity=".7"/><path d="M-10 110 H500" stroke="#334155" stroke-width="8" opacity=".6"/>
<path d="M120 70 L300 46 L400 130 L372 276 L220 316 L104 214 Z" fill="rgba(34,211,238,.13)" stroke="#22d3ee" stroke-width="3" stroke-dasharray="9 7"/>
<g fill="#22d3ee" stroke="#06202b" stroke-width="2"><circle cx="190" cy="120" r="9"/><circle cx="262" cy="98" r="9"/><circle cx="330" cy="168" r="9"/><circle cx="238" cy="250" r="9"/><circle cx="172" cy="200" r="9"/></g>
<g><circle cx="300" cy="226" r="24" fill="#6366f1" opacity=".35"/><circle cx="300" cy="226" r="16" fill="#818cf8" stroke="#e0e7ff" stroke-width="2"/><circle cx="294" cy="226" r="2.5" fill="#fff"/><circle cx="300" cy="226" r="2.5" fill="#fff"/><circle cx="306" cy="226" r="2.5" fill="#fff"/></g>
<g fill="#475569"><circle cx="60" cy="330" r="7"/><circle cx="436" cy="320" r="7"/><circle cx="440" cy="60" r="7"/></g></svg></div>
<div class="lg glass"><i class="a"></i>listing<i class="b"></i>cluster<i class="c"></i>outside the area</div>""",
 X+"""h1{font-size:46px}.mp{position:absolute;right:0;top:6px;width:500px;height:400px;overflow:hidden;padding:0}.mp svg{display:block;width:100%;height:100%}
.lg{position:absolute;right:0;top:422px;display:flex;align-items:center;gap:10px;font-size:15px;color:#cbd5e1;padding:10px 16px;border-radius:999px}.lg i{width:12px;height:12px;border-radius:50%;display:block;margin-left:8px}.lg i.a{background:#22d3ee;margin-left:0}.lg i.b{background:#818cf8}.lg i.c{background:#475569}""")

alerts = page("Architecture · Alerts", "Designing Reliable <em>Saved Searches and Listing Alerts</em>", "Matching, change detection, deduplication, schedules and delivery failures.",
 "<b>Match</b><span class='dot'></span><b>Deduplicate</b><span class='dot'></span><b>Deliver</b>",
 f"""<div class="ss glass"><small>Saved search</small><b>3+ beds · drawn area</b></div><div class="nl glass"><small>Listing change</small><b>New listing</b></div>
<svg class="jn" viewBox="0 0 500 120">{ARROW}<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M120 0 C120 60 220 50 240 98"/><path d="M380 0 C380 60 280 50 260 98"/></g></svg>
<div class="mt glass glow">Match<small>once per change</small></div>
<svg class="jn2" viewBox="0 0 500 70">{ARROW}<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M250 0 C250 34 130 30 120 62"/><path d="M250 0 C250 34 370 30 380 62"/></g></svg>
<div class="nt glass n1"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7 2.5 7h-17S6 15 6 9"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>Instant alert</div>
<div class="nt glass n2"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7l8.5 6 8.5-6"/></svg>Daily digest</div>""",
 X+"""h1{font-size:48px}.ss,.nl{position:absolute;top:8px;width:232px;padding:14px 16px;border-radius:16px;display:flex;flex-direction:column}.ss{right:262px}.nl{right:0}small{font-size:13px;color:#94a3b8;font-weight:600}.ss b,.nl b{font-size:17px;margin-top:3px}
.jn{position:absolute;right:0;top:86px;width:494px;height:118px}.mt{position:absolute;right:157px;top:204px;width:180px;text-align:center;padding:16px;border-radius:18px;font-size:26px;font-weight:800}.mt small{display:block}
.jn2{position:absolute;right:0;top:296px;width:494px;height:70px}.nt{position:absolute;top:372px;width:218px;display:flex;align-items:center;gap:10px;padding:15px 18px;border-radius:16px;font-size:18px;font-weight:700}.n1{right:268px}.n2{right:8px}""")

vitals = page("Performance · Core Web Vitals", "Real Estate Website Performance: Optimizing Listing Pages for <em>Core Web Vitals</em>", "The hero photo, galleries, maps and third-party scripts on a listing page.",
 "<b>LCP</b><span class='dot'></span><b>INP</b><span class='dot'></span><b>CLS</b>",
 """<div class="pg glass glow"><div class="ph"><span>LCP candidate: hero photo</span></div><div class="rw"><div class="tx"><u></u><u class="s"></u><u class="t"></u></div><div class="mpb">map: load on demand</div></div><div class="gl"><i></i><i></i><i></i><i></i><em>gallery: lazy</em></div></div>
<div class="gg"><div class="g"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="31" fill="none" stroke="#1e293b" stroke-width="9"/><circle cx="40" cy="40" r="31" fill="none" stroke="#22d3ee" stroke-width="9" stroke-linecap="round" stroke-dasharray="150 195" transform="rotate(-90 40 40)"/></svg><b>LCP</b></div>
<div class="g"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="31" fill="none" stroke="#1e293b" stroke-width="9"/><circle cx="40" cy="40" r="31" fill="none" stroke="#818cf8" stroke-width="9" stroke-linecap="round" stroke-dasharray="130 195" transform="rotate(-90 40 40)"/></svg><b>INP</b></div>
<div class="g"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="31" fill="none" stroke="#1e293b" stroke-width="9"/><circle cx="40" cy="40" r="31" fill="none" stroke="#c084fc" stroke-width="9" stroke-linecap="round" stroke-dasharray="165 195" transform="rotate(-90 40 40)"/></svg><b>CLS</b></div></div>""",
 X+"""h1{font-size:40px}.left{width:600px}.pg{position:absolute;right:112px;top:4px;width:380px;padding:14px;border-radius:18px}.ph{height:150px;border-radius:12px;background:linear-gradient(135deg,#164e63,#312e81);border:2px dashed #22d3ee;display:flex;align-items:flex-end;padding:10px}.ph span{font-size:14px;font-weight:800;color:#a5f3fc;background:rgba(2,6,23,.6);padding:5px 10px;border-radius:8px}
.rw{display:flex;gap:12px;margin-top:12px}.tx{flex:1;display:flex;flex-direction:column;gap:9px;padding-top:6px}.tx u{height:13px;border-radius:6px;background:#334155;display:block}.tx u.s{width:78%}.tx u.t{width:54%}.mpb{width:150px;height:84px;border-radius:12px;border:2px dashed #818cf8;color:#c4b5fd;font-size:13.5px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;padding:6px}
.gl{display:flex;gap:9px;margin-top:12px;align-items:center}.gl i{width:58px;height:44px;border-radius:9px;background:#1e293b;border:1px solid #334155;display:block}.gl em{font-style:normal;font-size:13.5px;color:#94a3b8;font-weight:700;margin-left:4px}
.gg{position:absolute;right:0;top:20px;display:flex;flex-direction:column;gap:14px}.g{position:relative;width:92px;height:92px}.g svg{width:100%;height:100%}.g b{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:800}""")

tenant = page("Architecture · SaaS", "Building a <em>Multi-Tenant</em> Real Estate SaaS Platform", "Tenant boundaries, data isolation, branding and per-brokerage data licenses.",
 "<b>Isolation</b><span class='dot'></span><b>Tenant resolution</b><span class='dot'></span><b>Per-tenant config</b>",
 """<div class="edge glass">Edge · tenant resolution by domain</div>
<div class="tn glass t1"><b>Brokerage A</b><small>brand · users · leads</small><i></i></div><div class="tn glass glow t2"><b>Brokerage B</b><small>brand · users · leads</small><i></i></div><div class="tn glass t3"><b>Team C</b><small>brand · users · leads</small><i></i></div>
<div class="sh glass">Shared services<small>application · jobs · listing store</small></div>""",
 X+"""h1{font-size:46px}.edge{position:absolute;right:0;top:8px;width:500px;text-align:center;padding:14px;border-radius:16px;font-size:17px;font-weight:700;color:#a5f3fc}
.tn{position:absolute;top:92px;width:156px;height:216px;padding:16px 14px;border-radius:18px;display:flex;flex-direction:column}.tn b{font-size:18px}.tn small{font-size:13.5px;color:#94a3b8;margin-top:4px}.tn i{margin-top:auto;height:74px;border-radius:12px;display:block;background:repeating-linear-gradient(180deg,rgba(34,211,238,.28) 0 12px,rgba(34,211,238,.1) 12px 24px);border:1px solid rgba(34,211,238,.4)}
.t1{right:344px}.t2{right:172px}.t3{right:0}.t2 i{background:repeating-linear-gradient(180deg,rgba(129,140,248,.4) 0 12px,rgba(129,140,248,.14) 12px 24px);border-color:rgba(129,140,248,.6)}.t3 i{background:repeating-linear-gradient(180deg,rgba(192,132,252,.34) 0 12px,rgba(192,132,252,.12) 12px 24px);border-color:rgba(192,132,252,.5)}
.sh{position:absolute;right:0;top:330px;width:500px;text-align:center;padding:18px;border-radius:16px;font-size:20px;font-weight:800;background:linear-gradient(90deg,rgba(34,211,238,.2),rgba(129,140,248,.22))}.sh small{display:block;font-size:14.5px;color:#cbd5e1;font-weight:600;margin-top:4px}""")

crm = page("Architecture · CRM", "Real Estate CRM Architecture: From <em>Property Enquiry to Lead Management</em>", "Capture, attribution, assignment and an append-only lead timeline.",
 "<b>Capture</b><span class='dot'></span><b>Assign</b><span class='dot'></span><b>Follow up</b>",
 """<div class="prop glass"><u></u><p><b>Enquiry on a listing</b><small>source · campaign · search that led here</small></p></div>
<div class="ctl"><div class="c glass"><i>1</i><p><b>Contact matched</b><small>deduplicated by email and phone</small></p></div><div class="c glass glow"><i>2</i><p><b>Assigned to an agent</b><small>routing rule, with a fallback</small></p></div>
<div class="c glass"><i>3</i><p><b>Call logged</b><small>appended to the timeline</small></p></div><div class="c glass"><i>4</i><p><b>Viewing booked</b><small>stage moves forward</small></p></div></div>""",
 X+"""h1{font-size:43px}.prop{position:absolute;right:0;top:4px;width:480px;display:flex;gap:14px;align-items:center;padding:14px;border-radius:18px}.prop u{width:86px;height:64px;border-radius:12px;display:block;background:linear-gradient(135deg,#155e75,#3730a3)}
p{display:flex;flex-direction:column}p b{font-size:18px}p small{font-size:14px;color:#94a3b8;margin-top:3px}.ctl{position:absolute;right:0;top:112px;width:440px;display:flex;flex-direction:column;gap:12px;border-left:3px solid rgba(34,211,238,.5);padding-left:26px}
.c{position:relative;display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:15px}.c i{position:absolute;left:-44px;width:32px;height:32px;border-radius:50%;font-style:normal;font-weight:800;font-size:15px;display:flex;align-items:center;justify-content:center;color:#04121c;background:linear-gradient(135deg,#22d3ee,#818cf8)}""")

webhooks = page("Engineering · Integrations", "Building Reliable <em>Webhook and Event-Driven</em> Integrations", "Signatures, idempotency, retries with backoff, dead letters and reconciliation.",
 "<b>Verify</b><span class='dot'></span><b>Acknowledge fast</b><span class='dot'></span><b>Process once</b>",
 f"""<svg class="wh" viewBox="0 0 520 450">{ARROW}
<g font-weight="800" fill="#f8fafc" text-anchor="middle"><rect x="0" y="30" width="130" height="64" rx="16" fill="#162036" stroke="#64748b" stroke-width="2"/><text x="65" y="69" font-size="19">Sender</text>
<rect x="196" y="30" width="134" height="64" rx="16" fill="#0e3a4a" stroke="#22d3ee" stroke-width="2.5"/><text x="263" y="62" font-size="18">Verify</text><text x="263" y="82" font-size="13" fill="#a5f3fc" font-weight="600">signature · time</text>
<rect x="392" y="30" width="128" height="64" rx="16" fill="#162036" stroke="#818cf8" stroke-width="2"/><text x="456" y="69" font-size="19">Queue</text>
<rect x="392" y="190" width="128" height="64" rx="16" fill="#1a2550" stroke="#818cf8" stroke-width="2"/><text x="456" y="229" font-size="19">Worker</text>
<rect x="170" y="190" width="170" height="64" rx="16" fill="#132a22" stroke="#34d399" stroke-width="2"/><text x="255" y="222" font-size="18">Apply once</text><text x="255" y="242" font-size="13" fill="#a7f3d0" font-weight="600">idempotency key</text>
<rect x="392" y="356" width="128" height="60" rx="16" fill="#2a1622" stroke="#fb7185" stroke-width="2"/><text x="456" y="392" font-size="17">Dead letter</text></g>
<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M132 62 H190"/><path d="M332 62 H386"/><path d="M456 96 V184"/><path d="M390 222 H346"/><path d="M456 256 V350"/><path d="M500 190 C560 150 560 120 506 98" stroke-dasharray="6 6"/></g>
<text x="196" y="132" fill="#94a3b8" font-size="14">2xx at once</text><text x="318" y="322" fill="#94a3b8" font-size="14">after the last retry</text><text x="0" y="392" fill="#c4b5fd" font-size="15" font-weight="700">retry with backoff and jitter</text></svg>""",
 X+"h1{font-size:45px}.wh{position:absolute;right:-6px;top:6px;width:530px;height:458px}")

bullmq = page("Engineering · Background jobs", "Designing Reliable <em>Background Jobs</em> with Redis and BullMQ", "Retries, backoff, concurrency, stalled jobs and idempotent handlers.",
 "<b>Job lifecycle</b><span class='dot'></span><b>Retries</b><span class='dot'></span><b>Idempotency</b>",
 f"""<svg class="jb" viewBox="0 0 520 450">{ARROW}<g font-size="20" font-weight="800" text-anchor="middle" fill="#f8fafc">
<rect x="10" y="60" width="150" height="62" rx="31" fill="#162036" stroke="#64748b" stroke-width="2"/><text x="85" y="98">waiting</text>
<rect x="210" y="60" width="130" height="62" rx="31" fill="#0e3a4a" stroke="#22d3ee" stroke-width="2.5"/><text x="275" y="98">active</text>
<rect x="370" y="60" width="150" height="62" rx="31" fill="#132a22" stroke="#34d399" stroke-width="2"/><text x="445" y="98">completed</text>
<rect x="210" y="230" width="130" height="62" rx="31" fill="#2a1622" stroke="#fb7185" stroke-width="2"/><text x="275" y="268">failed</text>
<rect x="10" y="230" width="150" height="62" rx="31" fill="#1a2550" stroke="#818cf8" stroke-width="2"/><text x="85" y="268">delayed</text></g>
<g fill="none" stroke="url(#ga)" stroke-width="2.5" marker-end="url(#ah)"><path d="M162 91 H204"/><path d="M342 91 H364"/><path d="M275 124 V224"/><path d="M208 261 H166"/><path d="M85 228 V128"/></g>
<text x="290" y="180" fill="#94a3b8" font-size="14.5">error</text><text x="100" y="186" fill="#94a3b8" font-size="14.5">backoff elapsed</text><text x="170" y="316" fill="#c4b5fd" font-size="15" font-weight="700">retry</text>
<rect x="10" y="360" width="510" height="56" rx="16" fill="#101c38" stroke="#2a3a59"/><text x="265" y="394" text-anchor="middle" fill="#e2e8f0" font-size="17" font-weight="700">Redis: queues, locks and job state</text></svg>""",
 X+"h1{font-size:47px}.jb{position:absolute;right:-4px;top:6px;width:524px;height:454px}")

PAGES = {"cheapest-idx-options": cheapest, "idx-website-features-checklist": features, "mls-boards-compared": boards,
         "real-estate-platform-tech-stack": stack, "real-estate-website-seo-aeo-geo": seo,
         "mls-data-pipeline-architecture": pipeline, "investor-portal-security-checklist": security, "laravel-upgrade-checklist": laravel,
         "odoo-shopify-marketplace-integration": odoo, "self-storage-software-build-vs-buy": storage,
         "mls-sync-engine": sync, "listing-lifecycle-sold-expired-deleted": lifecycle, "mls-data-normalization": normalize,
         "legacy-real-estate-platform-data-migration": migrate, "real-estate-search-elasticsearch": elastic, "map-based-property-search": mapsearch,
         "saved-searches-listing-alerts": alerts, "listing-page-core-web-vitals": vitals, "multi-tenant-real-estate-saas": tenant,
         "real-estate-crm-architecture": crm, "webhook-event-driven-integrations": webhooks, "background-jobs-redis-bullmq": bullmq}
if __name__ == "__main__":
    for slug, doc in PAGES.items():
        open(os.path.join(D, slug + ".html"), "w").write(doc); print("wrote", slug + ".html")
