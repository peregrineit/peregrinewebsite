#!/usr/bin/env python3
"""SEO invariants for peregrine-it.com. Stdlib only.

Usage: python3 scripts/seo_check.py [BASE_URL]   (default http://localhost:3057)
Exits 1 if any check fails. Run against a local `next start` before every commit that
touches pages, metadata or schema, and against production after a deploy.
"""
import html, json, re, sys, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

if len(sys.argv) > 1 and sys.argv[1] in ("-h", "--help"):
    print(__doc__.strip()); sys.exit(0)
BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3057").rstrip("/")
PROD = "https://peregrine-it.com"
SUPERLATIVES = re.compile(r"\b(best|leading)\b|#1\b", re.I)
# Words we keep out of our own copy. Two client quotes use them and are allow-listed below.
CLICHES = re.compile(r"\b(drowning|bleeding|transformative|transformed|seamless(ly)?|robust|cutting-edge|game-chang\w*|world-class|state-of-the-art|revolutioni[sz]\w*|synerg\w*|best-in-class)\b", re.I)
CLICHE_ALLOW = {("/", "drowning"), ("/case-studies/proptech-investor-portal", "transformed")}
LEGACY_JS = re.compile(r"jquery[^\"]*\.js|gsap[^\"]*\.js|animejs|typed\.js|waypoints[^\"]*\.js|counterup[^\"]*\.js", re.I)

fails = []
def fail(path, msg): fails.append(f"{path}: {msg}")

def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "peregrine-seo-check"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.status, r.read().decode("utf-8", "replace")

def text_of(fragment):
    # Inline tags vanish (so "<a>word</a>." stays "word."); block tags become a space.
    fragment = re.sub(r"</?(a|strong|em|b|i|span|time|code|sup|sub)\b[^>]*>", "", fragment)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", fragment)).split())

def strip_code(page):
    """Remove script/style BEFORE stripping tags, so inline payloads are never counted as text."""
    return re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", page, flags=re.S)

def json_ld(page):
    nodes = []
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
        data = json.loads(block)
        nodes += data.get("@graph", [data]) if isinstance(data, dict) else data
    return nodes

def visible_faq(page):
    out = []
    for d in re.findall(r"<details\b[^>]*>(.*?)</details>", page, re.S):
        q = re.search(r"<summary\b[^>]*>(.*?)</summary>", d, re.S)
        a = re.search(r"</summary>\s*(.*)", d, re.S)
        if q and a: out.append((text_of(q.group(1)), text_of(a.group(1))))
    return out

_, sm = get("/sitemap.xml")
paths = [u.replace(PROD, "") or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sm)]
lastmod = dict(re.findall(r"<loc>([^<]+)</loc>\s*<lastmod>([^<]+)</lastmod>", sm))

def fetch(p):
    try: return p, get(p)
    except urllib.error.HTTPError as e: return p, (e.code, "")
pages = dict(ThreadPoolExecutor(6).map(fetch, paths))

titles, descs, links = {}, {}, {}
schema_ids, schema_refs = set(), []

def walk_ids(node, page_path, top=True):
    """Collect declared @ids (nodes with a @type) and bare {'@id': ...} references."""
    if isinstance(node, dict):
        if "@id" in node:
            if "@type" in node: schema_ids.add(node["@id"])
            elif len(node) == 1: schema_refs.append((page_path, node["@id"]))
        for v in node.values(): walk_ids(v, page_path, False)
    elif isinstance(node, list):
        for v in node: walk_ids(v, page_path, False)
for p, (status, page) in pages.items():
    if status != 200: fail(p, f"status {status}"); continue
    body = strip_code(page)
    title = html.unescape(re.search(r"<title>(.*?)</title>", page, re.S).group(1))
    desc = re.search(r'<meta name="description" content="([^"]*)"', page)
    desc = html.unescape(desc.group(1)) if desc else ""
    canon = re.search(r'<link rel="canonical" href="([^"]*)"', page)
    h1s = re.findall(r"<h1\b[^>]*>(.*?)</h1>", body, re.S)
    titles.setdefault(title, []).append(p); descs.setdefault(desc, []).append(p)
    if len(title) > 60: fail(p, f"title {len(title)} chars")
    if title.count("Peregrine") > 1: fail(p, "brand twice in title")
    if not 50 <= len(desc) <= 160: fail(p, f"description {len(desc)} chars")
    if not canon or canon.group(1).rstrip("/") != (PROD + p).rstrip("/"): fail(p, "canonical not self")
    if len(h1s) != 1: fail(p, f"{len(h1s)} H1s")
    if re.search(r'<meta name="robots" content="[^"]*noindex', page): fail(p, "noindex")
    robots = re.findall(r'<meta name="(?:robots|googlebot)" content="([^"]*)"', page)
    if not any("max-image-preview:large" in r for r in robots): fail(p, "no max-image-preview:large robots directive")
    if LEGACY_JS.search(page): fail(p, "legacy script reference")
    levels = [int(x) for x in re.findall(r"<h([1-6])\b", body)]
    if any(b > a + 1 for a, b in zip(levels, levels[1:])): fail(p, "heading level skipped")
    if re.search(r"<img\b(?![^>]*\balt=)[^>]*>", body): fail(p, "img without alt")
    try: nodes = json_ld(page)
    except json.JSONDecodeError as e: fail(p, f"JSON-LD parse error {e}"); nodes = []
    walk_ids(nodes, p)
    orgs = [n for n in nodes if n.get("@type") == "Organization"]
    if len(orgs) != 1: fail(p, f"{len(orgs)} Organization nodes")
    for where, txt in (("title", title), ("h1", text_of(h1s[0]) if h1s else ""), ("json-ld", json.dumps(nodes))):
        if SUPERLATIVES.search(txt): fail(p, f"superlative in {where}")
    for m in CLICHES.finditer(text_of(body)):
        if (p, m.group(0).lower()) not in CLICHE_ALLOW: fail(p, f"cliche '{m.group(0)}'")
    faq = [(" ".join(q["name"].split()), " ".join(q["acceptedAnswer"]["text"].split()))
           for n in nodes if n.get("@type") == "FAQPage" for q in n["mainEntity"]]
    if faq and faq != visible_faq(body): fail(p, "FAQPage JSON-LD differs from the visible FAQ")
    modified = {n["dateModified"][:10] for n in nodes if "dateModified" in n}
    lm = lastmod.get(PROD + p if p != "/" else PROD)
    if modified and (not lm or lm[:10] not in modified): fail(p, f"sitemap lastmod {lm} != dateModified {modified}")
    if lm and not modified: fail(p, "sitemap lastmod without dateModified")
    if "/case-studies/" in p or "/blog/" in p:
        if not any(n.get("@type") == "Article" for n in nodes): fail(p, "no Article schema")
        if not any(n.get("@type") == "BreadcrumbList" for n in nodes): fail(p, "no BreadcrumbList")
    if p.startswith("/services/"):
        answers = [text_of(x) for x in re.findall(r'<p class="cp-answer">(.*?)</p>', body, re.S)]
        if len(answers) != 5: fail(p, f"{len(answers)} direct answers (expected 5)")
        for ans in answers:
            n = len(ans.split())
            if not 40 <= n <= 60 or "Peregrine" not in ans: fail(p, f"direct answer {n} words / names Peregrine={'Peregrine' in ans}: {ans[:40]}")
    # Every page needs a way to enquire: a lead form, a popup trigger or a link to /contact.
    if not re.search(r'<form\b|data-open-contact|href="/contact"', body): fail(p, "no contact path (form, popup trigger or /contact link)")
    links[p] = {h.split("#")[0].split("?")[0].rstrip("/") or "/" for h in re.findall(r'<a\b[^>]*href="(/[^"]*)"', body)}

for t, ps in titles.items():
    if len(ps) > 1: fail(ps[0], f"duplicate title with {ps[1:]}")
for d, ps in descs.items():
    if len(ps) > 1: fail(ps[0], f"duplicate description with {ps[1:]}")

known = set(paths)
internal = {l for ls in links.values() for l in ls if not re.search(r"\.(png|jpe?g|webp|svg|ico|txt|xml|pdf)$", l)}
for l in sorted(internal - known):
    try: status = get(l)[0]
    except urllib.error.HTTPError as e: status = e.code
    if status != 200: fail(l, f"internal link target returns {status}")
inbound = {p: sum(1 for src, ls in links.items() if p in ls and src != p) for p in paths}
for p, n in inbound.items():
    if n < 2 and p != "/": fail(p, f"only {n} inbound internal link(s)")

# Structured data: every bare {"@id": ...} reference must point at a node declared somewhere on the site.
for page_path, ref in schema_refs:
    if ref not in schema_ids: fail(page_path, f"schema @id reference does not resolve: {ref}")

# robots.txt: crawling allowed for everyone, sitemap declared.
_, robots = get("/robots.txt")
if not re.search(r"(?im)^sitemap:\s*https://peregrine-it\.com/sitemap\.xml\s*$", robots): fail("/robots.txt", "sitemap line missing")
for group in re.split(r"(?im)^(?=user-agent:)", robots):
    if re.search(r"(?im)^disallow:\s*/\s*$", group): fail("/robots.txt", "a group disallows the whole site: " + group.splitlines()[0])

# llms.txt: every site URL it lists exists and is in the sitemap.
_, llms = get("/llms.txt")
for u in sorted(set(re.findall(r"\((https://peregrine-it\.com[^)#\s]*)", llms))):
    path = u.replace(PROD, "").rstrip("/") or "/"
    if path not in known: fail("/llms.txt", f"lists {path}, which is not in the sitemap")
missing_from_llms = [p for p in paths if p != "/" and (PROD + p) not in llms and not p.startswith("/case-studies/") and p not in ("/privacy-policy", "/terms-of-use", "/blog")]
for p in missing_from_llms: fail("/llms.txt", f"does not list {p}")

print(f"{BASE}: {len(paths)} sitemap URLs checked; {len(schema_ids)} schema nodes, {len(schema_refs)} references")
if fails:
    print(f"FAILS: {len(fails)}"); [print("  " + f) for f in fails]; sys.exit(1)
print("FAILS: 0")
