# Off-page SEO checklist — peregrine-it.com

Manual tasks for the owner (Phase 6 of SEO-PLAN.md). Nothing here was done automatically.
Written 2026-09-29, after Phases 1–5 were built on the `seo/phase-*` branches.

Use the same name, description and URL everywhere, matching the Organization schema in `src/app/layout.tsx`:

- **Name:** Peregrine IT Solutions
- **Legal name:** Peregrine IT Solutions LLP
- **Website:** https://peregrine-it.com
- **Email:** info@peregrine-it.com
- **Headquarters / office:** Suite 115, H-160, BSI Business Park, Sector 63, Noida, Uttar Pradesh 201301, India (no phone number is published)
- **Founded:** 2018
- **Team size:** 25+
- **Founder:** Mukesh Swami, Founder & CEO — https://www.linkedin.com/in/mukeshswami/
- **Short description (≤160 characters):**
  Peregrine IT Solutions builds SaaS platforms, API and MLS/IDX integrations, AI automation and cloud infrastructure for real estate, proptech and B2B companies.
- **Long description:**
  Peregrine IT Solutions is a software engineering firm that designs, builds and scales the systems behind software products: multi-tenant SaaS platforms, API and MLS/IDX integrations, AI automation, cloud infrastructure and Odoo ERP. Most clients are B2B companies in the United States and Canada, with a strong focus on real estate and proptech. Every engagement starts with a technical discovery call with an engineer, and development runs in two-week sprints with weekly demos. Published case studies: https://peregrine-it.com/case-studies
- **Services (use these names):** SaaS Development · API Integration · MLS & IDX Integration · AI Automation · Cloud & DevOps · Odoo ERP
- **Social:** LinkedIn https://www.linkedin.com/company/peregrine-it-solutions/ · Facebook https://www.facebook.com/peregrineitsolution · Instagram https://www.instagram.com/peregrineitsolution/

Do not add claims to directory profiles that the site doesn't make (awards, certifications, "best"/"leading"/"#1", unsourced statistics, or any office other than the Noida address above).

---

## 1. Google Search Console

1. Go to https://search.google.com/search-console and add a **Domain** property for `peregrine-it.com`.
2. Verify it with the DNS TXT record Google gives you. Add the record wherever the domain's DNS is hosted (Vercel → Project → Domains, or your registrar).
3. Under **Sitemaps**, submit `https://peregrine-it.com/sitemap.xml`.
4. Under **URL Inspection**, request indexing for the new pages once they are live: `/services`, the six `/services/*` pages, `/about`, `/contact`, `/blog`, the three `/blog/*` guides and `/industries/real-estate`.
5. Check **Pages → Why pages aren't indexed** after 1–2 weeks. Expect redirects for `/case-studies/northbridge-realty-ai-platform` and the old `/case-studies/case-study-*.html` exports; those are intended 301s.
6. Check **Enhancements** for FAQ, Breadcrumb and Article structured-data reports.

## 2. Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters and choose **Import from Google Search Console**. This copies the verified site and sitemaps.
2. If importing isn't possible, add the site manually, verify it with a DNS CNAME or meta tag, and submit `https://peregrine-it.com/sitemap.xml`.
3. Optional: enable IndexNow in Bing Webmaster Tools so new pages are submitted as soon as they're published.

## 2a. Google Business Profile (Noida office)

1. Create a profile at https://business.google.com for **Peregrine IT Solutions** at the Noida office address above.
2. Primary category: **Software company**. Website: https://peregrine-it.com. Use the short description from the top of this file; don't add a phone number unless you decide to publish one on the site too.
3. Complete Google's verification (postcard, phone or video, whichever Google offers).
4. Once verified, copy the profile's Google Maps URL and add it to the Organization node in `src/app/layout.tsx`:
   - `hasMap: "<Maps URL>"`
   - append the profile URL to `sameAs`.
   Then redeploy.
5. Ask the testimonial clients in section 3 for a Google review as well.

## 3. Ask the seven testimonial clients for a "Built by Peregrine" link

These seven clients are quoted on the homepage testimonials section. Ask each for a small credit link (for example "Built by Peregrine IT Solutions" in the footer or on a partners page) pointing to `https://peregrine-it.com` or to the most relevant service page.

| # | Client | Person quoted | Suggested link target |
|---|---|---|---|
| 1 | Easy Agent PRO | Josh Keeton, CEO | https://peregrine-it.com/services/saas-development |
| 2 | BrokerLinx | William Betancourt, Founder | https://peregrine-it.com/services/api-integration |
| 3 | Kypiq | Iván Palacios, CEO | https://peregrine-it.com/services/saas-development |
| 4 | Torrins | Manpreet Singh, Co-Founder | https://peregrine-it.com/services/cloud-devops |
| 5 | Bahia International Realty | Raul Aleman, Broker/Owner | https://peregrine-it.com/services/mls-idx-integration |
| 6 | Search Realty | Sterling Wong, Founder & CEO | https://peregrine-it.com |
| 7 | MM Nova Tech | Deepak Kumar, CEO | https://peregrine-it.com/services/ai-automation |

Also ask whether each would be willing to leave a review on Clutch or GoodFirms (section 5). Reviews there are verified by the directory and count for more than a testimonial on your own site.

## 4. Check the seven outbound client links for reciprocation

The homepage links out to these client sites. Check whether each one links back to peregrine-it.com (search each site for "peregrine" or look at its footer and partners pages):

- [ ] https://www.easyagentpro.com
- [ ] https://www.brokerlinx.com
- [ ] https://www.kypiq.com
- [ ] https://www.torrins.com
- [ ] https://www.bahiainternationalrealty.com
- [ ] https://www.searchrealty.ca
- [ ] https://www.mmnovatech.com

Where there's no link back, fold the request into the section 3 email.

## 5. Directory profiles

Create or claim a profile on each directory, using the name, descriptions and service names at the top of this file:

- [ ] **Clutch** — https://clutch.co. Sign up as a service provider and choose the service lines Custom Software Development, Web Development, AI Development and IT Integration. Clutch profiles also feed **The Manifest** (https://themanifest.com), which belongs to the same company, so check The Manifest after the Clutch profile is live.
- [ ] **GoodFirms** — https://www.goodfirms.co. Choose Software Development, Web Development and Artificial Intelligence.
- [ ] **DesignRush** — https://www.designrush.com. Choose Software Development and Web Development.

Set the **headquarters** field on every directory to the Noida office address above, exactly as written. Use the same facts the site publishes:
- **Team size:** 25+ (the Organization schema says minValue 25). Choose whichever size band on the directory contains 25+.
- **Engagement model / pricing model:** fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call. Where a directory offers pricing-model checkboxes, tick only the ones that match fixed-scope and retainer work.
- **Typical timeline** (if asked): a SaaS MVP ships in 4 to 6 weeks; complex platforms take 8 to 12 weeks.

- **Founding year:** 2018.
- **IP ownership** (if a directory asks): the client owns the IP rights once the work is paid for.

Fields only the owner can fill in: minimum project size and hourly rate range. Make sure these match whatever you decide to publish on the site; the site currently publishes no prices.

Use real portfolio items only: link the published case studies on peregrine-it.com rather than writing new claims.

- [ ] **When each profile goes live, append its URL to `sameAs` on the Organization node in `src/app/layout.tsx`** (Clutch, GoodFirms, The Manifest, DesignRush, Google Business Profile), then redeploy. Keep the list to profiles you control.

## 6. RealFoyer

realfoyer.com is Peregrine's own product. Make its "Peregrine IT Solutions LLP" mention a link to `https://peregrine-it.com`. Use the anchor text "Peregrine IT Solutions" or "Built by Peregrine IT Solutions".

## 7. Keep the guides' figures current (quarterly)

The three guides at /blog cite vendor and MLS prices that change. Every quarter (next: **late December 2026**):

- [ ] Open every source link in each guide (`grep -o "https://[^']*" src/app/blog/*/page.tsx`) and check each figure against the live page.
- [ ] Update any figure that changed. Remove any that are no longer published.
- [ ] Bump `dateModified` for that guide in `src/data/guides.ts`, and the "checked on" date in the guide's note.
- [ ] Redeploy. The sitemap's `lastmod` and the Article schema pick up the new date.

## 8. Re-audit in four weeks

- [ ] **On or after 2026-10-27**, re-run the SEO audit against production (baseline 58/100) and compare it with the Phase 5 run.
- [ ] Before that, check:
  - Search Console **Pages** (indexed count);
  - **Core Web Vitals**, both mobile and desktop, fed by real traffic now that `@vercel/speed-insights` is on;
  - the **Enhancements** reports;
  - that each testimonial link or reciprocation request has had a response.

## Owner TODOs still open in the codebase

`grep -rn "TODO(owner)" src` lists them. At the time of writing:
- prices (no Offer schema until real prices exist); the engagement model and team size are now published;
- an Odoo case study once a project can be published (the Odoo page is currently a capability page);
- additional team members and certifications;
- any vendor-partnership disclosure in the CRM guide.
