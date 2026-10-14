#!/usr/bin/env python3
"""Generates the five guide illustrations in public/images/blog/ as SVG (1200x630).

Every number and name comes from the guide it illustrates (checked 2026-10-12); when a
guide's table changes, change the data here and re-run:  python3 scripts/make_blog_images.py
"""
import os, html
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images", "blog")
W, H = 1200, 630
BG1, BG2, CARD, LINE = "#0b1220", "#111c33", "#162036", "#2a3a59"
INK, MUTED, ACCENT, ACCENT2, WARM = "#f1f5f9", "#94a3b8", "#22d3ee", "#60a5fa", "#fbbf24"
FONT = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
e = html.escape

def frame(title, subtitle, body, desc, foot):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="t d" font-family="{FONT}">
<title id="t">{e(title)}</title><desc id="d">{e(desc)}</desc>
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{BG1}"/><stop offset="1" stop-color="{BG2}"/></linearGradient>
<linearGradient id="ac" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{ACCENT}"/><stop offset="1" stop-color="{ACCENT2}"/></linearGradient></defs>
<rect width="{W}" height="{H}" fill="url(#bg)"/>
<rect x="48" y="44" width="56" height="6" rx="3" fill="url(#ac)"/>
<text x="48" y="92" fill="{INK}" font-size="34" font-weight="700">{e(title)}</text>
<text x="48" y="124" fill="{MUTED}" font-size="18">{e(subtitle)}</text>
{body}
<text x="48" y="{H-28}" fill="{MUTED}" font-size="14">{e(foot)}</text>
<text x="{W-48}" y="{H-28}" fill="{MUTED}" font-size="14" text-anchor="end">peregrine-it.com</text>
</svg>
'''

def chip(x, y, w, text, h=34, fill=CARD, ink=INK, size=15, stroke=LINE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}"/><text x="{x+w/2}" y="{y+h/2+5}" fill="{ink}" font-size="{size}" text-anchor="middle">{e(text)}</text>'

def boards():
    cols = [("MLS Grid", ["Stellar MLS", "MRED", "OneKey MLS", "NWMLS", "NorthstarMLS"]), ("Trestle", ["CRMLS", "NTREIS", "MIAMI MLS"]),
            ("Bridge Interactive", ["Stellar MLS", "MIAMI MLS", "FMLS", "REcolorado"]), ("Spark", ["ARMLS"]), ("Its own API", ["Bright MLS", "MLS PIN", "Realcomp", "Metro MLS"])]
    b, cw, gap, x = [], 206, 18.5, 48
    for name, items in cols:
        b.append(f'<rect x="{x}" y="150" width="{cw}" height="56" rx="12" fill="url(#ac)"/><text x="{x+cw/2}" y="185" fill="#06202b" font-size="19" font-weight="700" text-anchor="middle">{e(name)}</text>')
        b.append(f'<line x1="{x+cw/2}" y1="206" x2="{x+cw/2}" y2="226" stroke="{LINE}" stroke-width="2"/>')
        for j, it in enumerate(items):
            b.append(chip(x, 226 + j * 52, cw, it, h=40, size=16))
        x += cw + gap
    return frame("Which data platform delivers which MLS", "15 US MLSs, as each one's own site describes its data delivery. Two use more than one platform.", "\n".join(b),
                 "Five data platforms and the MLSs delivered through each. MLS Grid: Stellar MLS, MRED, OneKey MLS, NWMLS, NorthstarMLS. Trestle: CRMLS, NTREIS, MIAMI MLS. Bridge Interactive: Stellar MLS, MIAMI MLS, FMLS, REcolorado. Spark: ARMLS. Its own API: Bright MLS, MLS PIN, Realcomp, Metro MLS.",
                 "As stated on each MLS's site, October 12, 2026. Stellar MLS and MIAMI MLS appear twice.")

def stack():
    layers = [("System of record", ["PostgreSQL + PostGIS", "MongoDB", "MySQL"]), ("Search", ["Elasticsearch / OpenSearch", "PostgreSQL full-text + PostGIS", "Hosted search"]),
              ("Cache", ["Redis"]), ("Backend", ["Node.js / TypeScript", "Python", "PHP / Laravel", ".NET", "Go"]),
              ("Frontend rendering", ["Server-rendered pages", "Static generation", "Client-only SPA"]), ("Media", ["Object storage", "CDN"]),
              ("Hosting", ["Platform + managed database", "Containers + managed services", "Own virtual servers"])]
    b = []
    for i, (name, opts) in enumerate(layers):
        y = 148 + i * 60
        b.append(f'<rect x="48" y="{y}" width="1104" height="50" rx="12" fill="{CARD}" stroke="{LINE}"/>')
        b.append(f'<text x="70" y="{y+31}" fill="{ACCENT}" font-size="17" font-weight="700">{i+1}. {e(name)}</text>')
        x = 300
        for o in opts:
            w = 26 + len(o) * 8.6
            b.append(chip(x, y + 9, w, o, h=32, fill="#0f1a2e", size=14.5)); x += w + 12
    return frame("Seven layers of a real estate platform stack", "The realistic options at each layer. Several combinations work; listing data decides most of it.", "\n".join(b),
                 "Seven stack layers with their options, numbered as in the guide: system of record, search, cache, backend, frontend rendering, media and hosting.",
                 "From the real estate platform tech stack guide.")

def seo():
    cols = [("SEO", "Classic search results", ["Listing pages on your own domain", "HTML in the first response", "Status codes for ended listings", "Sitemaps with accurate lastmod", "Core Web Vitals on photo pages"]),
            ("AEO", "Answer features", ["Direct answers near the top", "Tables and dated facts", "Named author and sources", "Structured data that matches", "Original area data, not doorways"]),
            ("GEO", "AI-generated answers", ["Let the AI search crawlers in", "Decide on training crawlers", "No published ranking formula", "llms.txt: a proposal, not a lever", "Same foundations as SEO"])]
    b, cw, gap, x = [], 356, 18, 48
    for name, sub, items in cols:
        b.append(f'<rect x="{x}" y="150" width="{cw}" height="412" rx="14" fill="{CARD}" stroke="{LINE}"/>')
        b.append(f'<text x="{x+24}" y="206" fill="{ACCENT}" font-size="44" font-weight="800">{name}</text>')
        b.append(f'<text x="{x+24}" y="236" fill="{MUTED}" font-size="16">{e(sub)}</text>')
        b.append(f'<line x1="{x+24}" y1="256" x2="{x+cw-24}" y2="256" stroke="{LINE}"/>')
        for j, it in enumerate(items):
            yy = 296 + j * 52
            b.append(f'<path d="M{x+26} {yy-6} l6 6 l11 -12" fill="none" stroke="{ACCENT2}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><text x="{x+56}" y="{yy}" fill="{INK}" font-size="16.5">{e(it)}</text>')
        x += cw + gap
    return frame("SEO, AEO and GEO for a real estate website", "What to build for each. The foundations are shared; the promises are not.", "\n".join(b),
                 "Three columns. SEO: listing pages on your own domain, HTML in the first response, status codes for ended listings, sitemaps, Core Web Vitals. AEO: direct answers, tables and dated facts, authorship, matching structured data, original area data. GEO: allow AI search crawlers, decide on training crawlers, no published ranking formula, llms.txt is a proposal, same foundations as SEO.",
                 "From the SEO, AEO and GEO guide, based on primary documentation read October 12, 2026.")

IMAGES = {"mls-boards-compared": boards,
          "real-estate-platform-tech-stack": stack, "real-estate-website-seo-aeo-geo": seo}
if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for slug, make in IMAGES.items():
        open(os.path.join(OUT, slug + ".svg"), "w").write(make()); print("wrote", slug + ".svg")
