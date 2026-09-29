You are working in the Next.js repo for peregrine-it.com at ~/Code/peregrinewebsite (deployed on Vercel). Implement the SEO plan below, phase by phase, in order.

> **Progress tracking:** steps are ticked `[x]` as they are committed. Resume from the first unticked step on the branch for that phase. Notes from implementation are under "Implementation notes" at the bottom.

## Ground rules
- First, save this whole message as SEO-PLAN.md at the repo root and tick steps off as you complete them, so a fresh session can resume.
- One branch per phase: seo/phase-1, seo/phase-2, … Never push to main. Commit after every numbered step, e.g. `seo(1.3): merge Organization schema into one node`.
- Read a file before changing it. Don't change visual design, layout or copy beyond what a step asks. Ask me before deleting content or changing any URL/slug (a slug change needs a 301 in next.config).
- Never invent facts: no made-up client names, metrics, team members, credentials, addresses or prices. Where a step needs something only the owner knows, insert `TODO(owner): …`, keep the build passing, and list it in the phase report.
- All new copy in your own words, US English. Do not copy text from any other website.
- Market: US/Canada B2B buyers (real estate/proptech, SaaS). No city/location pages, no physical-office claims, no meta keywords, no "best"/"leading"/"#1" in schema or titles, no unsourced statistics.
- Verify by parsing, not grepping: extract `<script type="application/ld+json">` blocks and JSON.parse them; use an HTML parser for headings and canonicals. String-matching raw HTML has produced false findings on this site before (text split across spans, sed stripping a bare-origin URL).
- After each phase: `npm run build`, run that phase's checks against a local `npm start`, then STOP and give me a short report: files changed, check results, every TODO(owner). Wait for "continue".

## Known state (2026-09-29 audit — trust this; re-verify only if the code disagrees)
- Site = homepage + /case-studies hub + case studies (20 in repo, 19 in sitemap) + /privacy-policy + /terms-of-use. No /services, /about, /team, /contact, /blog.
- /case-studies inherits the homepage title, description, canonical (https://peregrine-it.com) and og:url because src/app/case-studies/page.tsx has no metadata. privacy-policy/page.tsx has none either.
- src/app/layout.tsx sets og:type "article" with a fixed publish date and carries a site-wide Organization JSON-LD named "Peregrine IT" (sameAs = LinkedIn only, contactType "customer support"). The homepage @graph has a second Organization "Peregrine IT Solutions" (sameAs [], logo https://peregrine-it.com/og.png which 404s, contactType "sales"). Neither has an @id. Facebook and Instagram links exist in the page HTML. Working logo: /images/peregrine-logo-new.png (1024×180). Working OG image: /ogimage.png.
- src/app/page.tsx: the hero "We Build the Systems Behind Scalable Products" is a div.hero-title; three <h1>s: "Built for Scale. Architected for Complexity.", "Technologies We Work With", "Let's Talk About Your Project".
- FAQPage JSON-LD exists on the homepage but its questions are not visible text.
- /case-studies/northbridge-realty-ai-platform: body never says "Northbridge", names "W3|re" three times including the quote "Marcus Chen, Managing Broker & Co-Founder, W3|re"; contains "conversion drops 21× if response exceeds 30 minutes" (unsourced) and "forecasts by borough" (wrong market). The hub card shows "62% workload reduction, 3.8× lead conversion, 94% valuation accuracy", none of which appear in the body.
- Case studies carry only the site-wide Organization block: no Article or BreadcrumbList. The homepage links to zero case studies.
- Sitemap: all lastmod identical (a build timestamp), changefreq/priority on every entry, privacy/terms missing. /llms.txt → 404. robots.ts is a general allow-all.
- Performance (mobile LCP 3.5–10.7 s): 9.52 MB page, ~7.1 MB hero video from uploads-ssl.webflow.com (3.97 MB webm + 2.41 MB mp4 + 473 KB); 0 of 75 images use next/image; none have width/height (CLS 0.055); 54 eager / 8 lazy; 24 `<link rel="preload" as="image">` for marquee SVGs; handshake-p-800.png is 631 KB; 9 images have empty alt; jQuery, GSAP and a web-font loader load before interaction; remixicon.css from jsDelivr is render-blocking (~1.35 s). The LCP element is unknown — find it.

## Phase 1 — Fix what's broken
- [x] 1.1 Metadata for /case-studies and /privacy-policy: own title, description, alternates.canonical, openGraph url/title/description. Confirm the case-study [slug] route sets a self-canonical.
- [x] 1.2 Logo: point every `logo` at /images/peregrine-logo-new.png as an ImageObject with width/height. If a square logo exists in the repo, use it; else TODO(owner).
- [x] 1.3 One Organization node in layout.tsx: @id https://peregrine-it.com/#organization, name "Peregrine IT Solutions", url, logo, description, sameAs [LinkedIn, Facebook, Instagram from the HTML], one contactPoint, areaServed. Delete the duplicate; make ProfessionalService/WebSite/WebPage nodes reference it by @id. Set og:type "website" and remove the fixed article dates.
- [x] 1.4 Northbridge: the real client name is TODO(owner) — do not guess. Meanwhile remove or source the 21× line, replace "borough and neighborhood" with market-appropriate wording, and reconcile the hub card stats with the body (remove from the card if absent). Then scan all 20 case studies: slug/title vs names in body, unattributed statistics, leftover placeholder names. Fix only what is unambiguous; report the rest.
- [x] 1.5 Headings: hero becomes the single <h1>; the three section <h1>s become <h2>. Keep the rendered look identical (move classes).
- [x] 1.6 Sitemap (src/app/sitemap.ts or equivalent): add privacy/terms, drop changefreq/priority, lastmod from real content dates if case studies have them, else omit. Add public/llms.txt in your own words: what Peregrine does, who it's for, services (link once they exist), 5 strongest case studies, contact. robots.ts: explicit Allow for GPTBot, ClaudeBot, PerplexityBot, keeping existing disallows. FAQ: render the five FAQPage questions as a visible section, or drop the schema — schema must match visible text.
- [x] 1.7 (added) Remove meta keywords from layout.tsx and all 19 case studies.
- [x] 1.8 (added) Remove ProfessionalService; fold serviceType into Organization.knowsAbout; WebPage.about → org.
- [x] 1.9 (added) Ignore public/case-studies/*.html; no untracked export covers a new client.
- [x] 1.10 (added) Northbridge client name: owner confirmed W3|re. Slug renamed to /case-studies/w3re-ai-real-estate-platform with a 301 from /case-studies/northbridge-realty-ai-platform.
Checks: every sitemap URL returns 200 with a self-canonical; exactly one <h1> on the homepage; all JSON-LD parses; exactly one Organization node per page; logo URL returns 200; /llms.txt returns 200; "og.png" appears nowhere.

## Phase 2 — Case studies
- [x] 2.1 In the case-study route emit Article (headline, description, image, datePublished/dateModified from front matter if present else TODO(owner), author and publisher → {"@id": "https://peregrine-it.com/#organization"}) plus BreadcrumbList (Home › Case Studies › title).
- [x] 2.2 Homepage: a "Selected work" section linking the hub and 3–4 featured case studies (pick the ones with the richest technical detail). Each case study: "Related case studies" with 2–3 links by shared industry or stack.
- [x] 2.3 Confirm whether the 20th case study is intentionally excluded from the sitemap; report.
Checks: every case study has Article + BreadcrumbList that parse; homepage has ≥4 links into /case-studies/*; no case study is an orphan.

## Phase 3 — Mobile performance
- [x] 3.1 Hero video: on mobile render the poster image only (no video element, or preload="none" + poster, gated by a breakpoint). On desktop serve a self-hosted re-encoded version ≤1.5 MB (ffmpeg, same dimensions and duration) from the repo — stop pulling from webflow.
- [x] 3.2 Images: handshake-p-800.png and anything over 150 KB → WebP/AVIF via next/image; width/height on every image; lazy-load marquee logos and everything below the fold; delete the 24 image preloads; fetchpriority="high" on the LCP element only.
- [x] 3.3 Scripts: jQuery/GSAP via next/script strategy="lazyOnload" (afterInteractive only if something visible depends on them — test); replace the web-font loader with next/font; self-host only the Remix icons actually used, or subset the CSS.
- [x] 3.4 Alt text: describe the 9 images; decorative ones get alt="".
- [x] 3.5 Add @vercel/speed-insights.
Checks: clean build; zero rel="preload" as="image" for marquee logos; every <img> has width and height; mobile page weight under 2.5 MB (measure from the built app); screenshot desktop before/after and confirm no visual regression.

## Phase 4 — Service pages, about, team, contact
- [x] 4.1 Create /services hub + /services/{saas-development, api-integration, mls-idx-integration, ai-automation, cloud-devops, odoo-erp} from one template: answer-first intro (2–3 sentences: what it is, who it's for, what Peregrine delivers), "What we build", process, stack, 2–3 linked case studies (match from the existing 20 by content), engagement model (prices TODO(owner)), visible FAQ (5 real questions, real answers). Schema per page: Service (provider → org @id, serviceType, areaServed), FAQPage identical to the visible FAQ, BreadcrumbList. Title/H1 in the buyer's language, e.g. "SaaS Development Company for Real Estate & Proptech". 800+ words of specific content per page; cite the case studies instead of making claims.
- [x] 4.2 /about: what the company builds, how it works, the certifications claim only if the owner names who holds them (TODO(owner)). /team: Person entries (name, role, photo, credentials, LinkedIn) as TODO(owner); build the template and Person schema (worksFor → org @id). Add an author byline component to case studies wired to a TODO(owner) author.
- [x] 4.3 /contact: page with the existing form and contact details; ContactPage schema.
- [x] 4.4 Nav and footer: Services, Case Studies, About, Contact. Link each case study to its service page and each service page to the hub.
- [x] 4.5 Update sitemap and llms.txt with the new pages.
Checks: all new routes 200, self-canonical, unique titles; every service page links to ≥2 case studies and is in the nav; FAQ schema text equals visible text; no page contains "best", "leading" or "#1".

## Phase 5 — Guides
- [x] 5.1 Create /blog with Article schema, author byline, dates. Draft three: "MLS/IDX integration cost (2026)", "Custom SaaS vs off-the-shelf CRM for brokerages", "Cost to build a real estate platform". Every figure must link to a source or be labelled as Peregrine's own rates (TODO(owner)). Link each guide to a service page and a case study.
- [x] 5.2 /industries/real-estate linking service pages ↔ real-estate case studies.
Checks: no unsourced numbers; Article schema parses; pages in sitemap and llms.txt.

## Phase 6 — Off-page (report only; I'll do these by hand)
- [x] Write SEO-OFFPAGE.md: Search Console + Bing Webmaster setup and sitemap submission; the 7 testimonial clients to ask for a "Built by Peregrine" link (list them from the site); the 7 outbound client links to check for reciprocation; Clutch / GoodFirms / The Manifest / DesignRush profiles with the exact name and description to use (consistent with the schema); make the "Peregrine IT Solutions LLP" mention on realfoyer.com a link; a 4-week re-audit reminder. If the /seo audit skill is installed, run it against the Vercel preview URL for the branch and report the score against the 58/100 baseline.

Start with Phase 1 now.

## Phase 7 — Re-audit fixes
Source: ~/Code/peregrine-it.com-audit/RE-AUDIT-2026-09-29.md (score 74/100, up from 58). Branch seo/phase-7 from main.
Owner answers (2026-09-29): all slots left as brackets, so the fallbacks apply — W3|re: keep the Results figure (47 min → 8 s) and rewrite the Challenge sentence to match it, no new numbers; Odoo: not an official partner; engineers: none named yet, so no copy promises named engineers.
- [ ] 7.1 Legacy scripts: load /js/peregrine.js, jQuery, animation.js, CounterUp and Waypoints only on the homepage route. Diff homepage behaviour with peregrine.js removed against the Phase 3 behaviour map; remove it if nothing depends on it, else extract the parts used. Checks: no /js/* request on any non-homepage page; homepage mobile Lighthouse median of 3 runs: Speed Index < 3.0 s, TBT < 200 ms. If Speed Index stays > 3.0 s, report whether the hero letter animation is the remaining cause and stop there.
- [ ] 7.2 Titles ≤ 60 chars on all pages: suffix "| Peregrine IT", drop "— Case Study", brand never named twice. Descriptions ≤ 160 chars. Fix the &amp;amp; double-encoding on the HR/payroll case study. Checks: 0 titles > 60, 0 descriptions > 160.
- [ ] 7.3 Internal links: each service page links its matching guide (mls-idx-integration ↔ mls-idx-integration-cost first); homepage "From the blog" block (three guides) and a "Selected work" block of 6 case studies; every blog post ≥ 6 inbound links; every case study ≥ 3.
- [ ] 7.4 Retarget /services/mls-idx-integration to "RESO Web API & MLS data feed development" and /services/odoo-erp to "Odoo custom module and API integration development" (not a partner): title, H1, intro and FAQ wording only; keep the body.
- [ ] 7.5 W3|re case study: remove the "districts" caption and the "expiring leases / outstanding balances" caption; reconcile the response-time contradiction (fallback above).
- [ ] 7.6 Small fixes: /industries hub with the one industry card and a correct BreadcrumbList; footer copyright from the current year; 404 page robots meta consistent and no canonical; security headers in next.config (nosniff, frame-ancestors 'self', Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, CSP Report-Only); fixed bottom CTA bar: bottom padding at phone widths and hidden on /contact.
- [ ] 7.7 Backlog (don't write yet): MLS data access guide; RESO Web API vs RETS migration guide; brokerage CRM development page; IDX vendor vs custom build; Odoo for real estate (SERP-check first).
Checks: all Phase 1–5 checks plus the new ones; commit per step; push the branch only.

---

## Implementation notes
- Repo reality vs audit (verified 2026-09-29): case studies are 19 static routes under `src/app/case-studies/<slug>/page.tsx` (no `[slug]` route, no front matter); all 19 are in the sitemap. The "20th" is likely the untracked `public/case-studies/*.html` exports or a miscount — see 2.3.
- The site-wide Organization JSON-LD lived in `src/app/components/Footer.tsx`, not layout.tsx.
- Homepage, /case-studies and /privacy-policy are client components (`'use client'`), so their metadata lives in a sibling server `layout.tsx`.
- 2.3 closed by owner: there are 19 case studies.
- Phase 2 owner changes: case-study data lives in src/data/case-studies.ts; a shared CaseStudySchema component emits Article + BreadcrumbList; datePublished/dateModified are omitted (no real dates; do not derive from git).
- Role-only testimonials stay as they are; no Review schema.
- Stop a local server with `lsof -tiTCP:<port> -sTCP:LISTEN | xargs kill`; `pkill -f "next start"` does not match the next-server process.
- Phase 3: the ~2.4 MB webflow video was the CTA background (bottom of the homepage), not the hero; the hero video's poster is the LCP element. Both videos are self-hosted in public/media and only attached at >= 768px (components/BackgroundVideo.tsx).
- Legacy scripts (jQuery, GSAP, anime, Typed, Waypoints, CounterUp, /js/animation.js, /js/peregrine.js) load via components/DeferredScripts.tsx in dependency order after load+idle. Add new legacy scripts there, not with next/script.
- Remix Icon is a bundled subset (src/app/css/remixicon-subset.css + public/fonts/remixicon-subset.woff2, v3.5.0). A new `ri-*` icon renders blank until the subset is regenerated: collect `grep -rhoE "ri-[a-z0-9-]+" src | sort -u` (pass the single directory `src`; multiple paths returned an incomplete list), take their codepoints from remixicon@3.5.0/fonts/remixicon.css, and run `pyftsubset remixicon.woff2 --unicodes=... --flavor=woff2`.
- 3.5: @vercel/speed-insights was already installed and rendered in layout.tsx.
- Phase 4 owner answers were not supplied (template placeholders), so: the six plan services were built with TODO(owner) to confirm them; no prices and no Offer schema; no team members, so no /team page and no team section on /about (src/data/team.ts + components/TeamGrid.tsx are ready); certifications claim dropped; case-study byline renders nothing until caseStudyAuthorId is set in src/data/team.ts.
- Service copy lives in src/data/services.ts; the FAQ arrays feed both the visible FAQ and FAQPage JSON-LD. New pages use src/app/css/content-pages.css (scoped .cp-* classes, because peregrine.css's unlayered element rules beat Tailwind utilities).
- Lead forms live in components/LeadForms.tsx (Footer popups + /contact). Popup triggers are delegated (any `[data-open-contact]` / `[data-open-quick-project]` works on any page).
- Owner answers (2026-09-29): keep all six services including Odoo. The owner asked to fill the remaining answers from web data about small Indian IT firms; that can't supply Peregrine's own prices, team, certifications or contract terms, so the conservative defaults stay: no prices or Offer schema, ownership FAQ withheld, no team/byline author, no certifications, no location line on /about. Market figures from the web are used only in the Phase 5 guides, linked to their sources.
- Superlative check ("best", "leading", "#1") covers titles, H1s and JSON-LD only (owner decision); body copy is not checked.
- Phase 5: guides live in src/app/blog/<slug>/page.tsx with metadata in src/data/guides.ts. Every figure is wrapped in <Src> (a.cp-src) linking its third-party source, or in a link to the Peregrine case study it comes from; sources were checked 2026-09-29 and dates are stated on each page. No Peregrine prices (none supplied). Re-verify prices before updating dateModified.
- Phase 6: SEO-OFFPAGE.md written. The /seo audit against a Vercel preview needs the branch pushed (a preview deploy); not done without the owner's go-ahead.
- Owner answers (2026-09-29, second round): founder Mukesh Swami (Person @id https://peregrine-it.com/#mukesh-swami, Organization.founder, byline author on case studies and guides; photo TODO(owner)); office Suite 115, H-160, BSI Business Park, Sector 63, Noida, Uttar Pradesh, India (PIN TODO(owner)) as Organization.address and visible on /contact, footer, /about, llms.txt; no phone published; Odoo has no project yet, so /services/odoo-erp is a capability page (HR, CRM, Inventory, Accounting) with no case studies (exempt from the ">=2 case studies" check) and manufacturing-erp-system links to API Integration instead.
- Blog backlog: "Odoo ERP implementation cost" (sourced figures only, same rules as Phase 5).
