# Outreach assets and external actions (T18)

Prepared material only. **Nothing here has been sent, submitted or created.** Every action in the second half needs the owner; see also `../../SEO-OFFPAGE.md` for the step-by-step checklist and `~/Code/peregrine-it.com-audit/LINK-PROSPECTS.md` for the prospect list.

## Assets (facts as published on the site)

**Name:** Peregrine IT Solutions · **Legal name:** Peregrine IT Solutions LLP
**Website:** https://peregrine-it.com · **Email:** info@peregrine-it.com
**Office:** Suite 115, H-160, BSI Business Park, Sector 63, Noida, Uttar Pradesh 201301, India *(after Phase 11 is merged; before that the site shows no PIN on /contact)*
**Founded:** 2018 · **Team:** 25+ · **Founder:** Mukesh Swami, Founder & CEO
**Engagement model:** fixed-scope projects, monthly retainers, or a combination, agreed after the discovery call.

**One line (under 160 characters):**
Peregrine IT Solutions builds SaaS platforms, MLS/IDX and API integrations, AI automation and cloud infrastructure for B2B companies in the US and Canada.

**Short description (about 60 words):**
Peregrine IT Solutions is a software engineering firm based in Noida, India. We design, build and scale SaaS platforms, API integrations, MLS and IDX data pipelines, AI automation and cloud infrastructure for B2B companies, most of them in the United States and Canada, with real estate and proptech a large share of the work. Every engagement starts with a 30-minute technical discovery call with an engineer.

**Service list for directories:** SaaS development · API integration · MLS and IDX integration · Investor portal development · AI automation · Cloud and DevOps · Odoo ERP · Next.js · React and React Native.
List Shopify, Laravel and WordPress on a directory only once a real project can be named (B5).

**Portfolio links (published case studies):**
- https://peregrine-it.com/case-studies/w3re-ai-real-estate-platform
- https://peregrine-it.com/case-studies/scaling-real-estate-saas-platform
- https://peregrine-it.com/case-studies/proptech-investor-portal
- https://peregrine-it.com/case-studies/self-storage-management-platform
- https://peregrine-it.com/case-studies/supply-chain-visibility-platform

**Linkable resources to offer:**
- MLS and IDX cost guide: https://peregrine-it.com/blog/mls-idx-integration-cost
- MLS and IDX cost calculator: https://peregrine-it.com/tools/mls-idx-cost-calculator
- How to get MLS data access: https://peregrine-it.com/blog/how-to-get-mls-data-access

### Draft: link request to a client (not sent)
> Subject: A small favour: a "built by" link
>
> Hi [name],
>
> We list [client] among the companies we have worked with, and link to your site from ours. Would you be open to adding a short credit on your site, for example "Platform engineering by Peregrine IT Solutions" linking to https://peregrine-it.com? A footer line or a partners page is plenty.
>
> If you would rather not, no problem at all.
>
> Thanks,
> Mukesh

Use it only for the seven clients whose testimonials are on the site (Easy Agent PRO, BrokerLinx, Kypiq, Search Realty, Bahia International Realty, Torrins, MM Nova Tech). Do not ask for reviews in the same message unless you choose to.

### Draft: resource pitch for the cost guide or calculator (not sent)
> Subject: Sourced MLS and IDX fee table, if useful for [page]
>
> Hi [name],
>
> Your page [URL] covers IDX and MLS costs. We keep a fee table that links every figure to the MLS or vendor page it comes from, and a calculator that totals them per month and per year: https://peregrine-it.com/tools/mls-idx-cost-calculator. If it is useful to your readers, feel free to reference it. If any figure is out of date, tell us and we will fix it.
>
> Mukesh Swami, Peregrine IT Solutions

## Prospect criteria (added 2026-10-09)

The prospect list itself is `~/Code/peregrine-it.com-audit/LINK-PROSPECTS.md` (tiers 1–4, with `link-prospects.csv`). Use these rules to add to it or cut from it. Nothing has been contacted.

**Qualifies when all of these hold:**
1. The page's readers are people who buy or specify software in real estate, proptech, self-storage or B2B SaaS in the US or Canada, or it is a directory of firms that do this work.
2. Peregrine has a real connection: a client, a platform it builds on, a body it could truthfully join, or a page whose topic one of the sourced guides answers better than what is linked now.
3. The link would be editorial or a genuine listing. No payment for placement, no link exchange, no "write for us" networks, no sites that sell guest posts.
4. The page is indexed and gets search traffic (check in Ahrefs or Search Console links before spending time).

**Order of effort:** properties you control → clients with a published case study or testimonial → qualification-gated listings (RESO, MLS vendor lists, Odoo partners) → resource pages that already cite MLS or IDX costs → general agency directories (Clutch, GoodFirms) last.

**Skip:** general "top 10 agencies" lists that charge, directories outside software or real estate, any site where the listing needs a claim Peregrine cannot back (certified partner, award, review count).

**What to offer, by prospect type:**
| Prospect | Asset | Ask |
|---|---|---|
| Page listing IDX or MLS costs | cost guide, calculator | reference it as a source |
| Page explaining RETS retirement or RESO Web API | `/blog/reso-web-api-vs-rets` | add as further reading |
| Canadian real estate tech page | `/blog/mls-data-access-canada` | add as further reading |
| Self-storage operator association or blog | `/blog/self-storage-software-build-vs-buy` | reference; no vendor is paid or favored in it |
| Client | their case study | a "built by" credit |

### Draft: correction offer (not sent)
Use when a page cites an MLS or vendor fee that the guide shows has changed.
> Subject: A fee on [page title] looks out of date
>
> Hi [name],
>
> Your page [URL] lists [fee as they state it]. [MLS or vendor] now publishes [current figure] here: [primary source URL]. We track these in a sourced table at https://peregrine-it.com/blog/mls-idx-integration-cost in case it saves you the lookups next time.
>
> Mukesh Swami, Peregrine IT Solutions

Send only when both figures have been re-checked on the day. Fill the brackets from the primary source, never from memory.

### Draft: RETS migration resource (not sent)
> Subject: RESO Web API migration notes for [page]
>
> Hi [name],
>
> [Page URL] still describes RETS feeds. We wrote up what changes when a board moves to the RESO Web API (authentication, replication, field names), with links to RESO's own documentation: https://peregrine-it.com/blog/reso-web-api-vs-rets. Use anything from it that helps your readers.
>
> Mukesh Swami, Peregrine IT Solutions

## External actions that need the owner's authorization

| # | Action | Why it needs you | Status |
|---|---|---|---|
| 1 | Merge `seo/phase-11` and `seo/phase-12` to `main` | production deploy | waiting |
| 2 | Vercel env vars: `NEXT_PUBLIC_GA_ID`, `LEAD_WEBHOOK_URL`, `LEAD_FROM_EMAIL`; confirm `RESEND_API_KEY` | credentials and infrastructure | waiting |
| 3 | Create a GA4 property and link it to Search Console | account creation | waiting |
| 4 | Verify the sending domain in Resend (DNS records) | DNS change | waiting |
| 5 | Choose a CRM or automation tool to receive leads | may involve a paid account | waiting |
| 6 | Bing Webmaster Tools and Google Business Profile | account creation, postcard or phone verification | waiting |
| 7 | Clutch, GoodFirms, DesignRush profiles | account creation; some tiers are paid | waiting |
| 8 | Add a real link from realfoyer.com to peregrine-it.com | you control that site; not in this repo | waiting |
| 9 | Send the client link requests above | outbound messages in your name | not sent |
| 10 | Send resource pitches | outbound messages | not sent |
| 11 | RESO: confirm whether Peregrine is a member; if so, request a listing on reso.org | membership is the owner's fact; may involve dues | waiting |
| 12 | Ask clients for reviews on Clutch or GoodFirms | never done on your behalf | not done |
| 13 | Submit changed URLs to IndexNow after each deploy | outbound submission; done on request after earlier phases | after merge |
