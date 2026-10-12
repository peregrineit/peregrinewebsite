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

PAGES = {"cheapest-idx-options": cheapest, "idx-website-features-checklist": features, "mls-boards-compared": boards,
         "real-estate-platform-tech-stack": stack, "real-estate-website-seo-aeo-geo": seo,
         "mls-data-pipeline-architecture": pipeline, "investor-portal-security-checklist": security, "laravel-upgrade-checklist": laravel,
         "odoo-shopify-marketplace-integration": odoo, "self-storage-software-build-vs-buy": storage}
if __name__ == "__main__":
    for slug, doc in PAGES.items():
        open(os.path.join(D, slug + ".html"), "w").write(doc); print("wrote", slug + ".html")
