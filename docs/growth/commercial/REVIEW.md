# Commercial page review (Sprint 2, stream B)

Date: 2026-10-10. Each page was read as a US or Canadian buyer deciding whether to contact the firm.
"Gap" means something the buyer could not learn or do on the page. "Fixed" refers to this branch.

Rule applied to every fix: a statement about Peregrine is either in `src/data/case-studies.ts` / a case-study
page, or one of the owner-confirmed facts (founded 2018, 25+ team, Noida office, founder, engagement model,
30-minute discovery call, discovery sprint and two-week sprints with weekly demos, IP ownership, reply within
1 business day, 4-6 week MVP / 8-12 week complex platform, US and Canada client base, no price list).
Everything else added is vendor-neutral buying guidance.

## Gaps shared by every service page (one template)

| # | Gap | Fixed |
|---|---|---|
| S1 | No way to self-qualify. The intro says who the service is for, never who it is not for, so a buyer with the wrong problem finds out on a call | "Is this the right fit?" block: good fit / probably not, with a link to the cheaper alternative where a guide covers it |
| S2 | "Cost depends on features, integrations, data volume" is one sentence. The buyer cannot tell which of their own facts move the estimate | "What determines scope" block: named inputs and why each changes effort. No prices, no durations |
| S3 | The page says a project starts with a discovery call but not what to prepare, so the first call is spent collecting basics | "What to bring to the scoping call" checklist per service |
| S4 | No description of a sensible first phase; the process cards describe a whole project | "A sensible first phase" paragraph per service, worded as guidance |
| S5 | "What we build" cards mention "our case study" in prose without a link; the proof is four sections further down | Cards with published proof link the case study directly (`proof` field) |
| S6 | No related services. From MLS you cannot reach the SaaS or AI page except through the stack tags | "Related services" list with one line on when each applies |
| S7 | Offshore-vendor questions (who is the team, contract model, how progress is shown, reply time) are answered only on the homepage FAQ | Answered once on `/services#working-with-us` (FAQPage schema from the same array); each service page links there instead of repeating it |

## Page by page

### Homepage (`/`)
1. The "Deep Industry Expertise" cards (real estate, logistics and space management, supply chain) link nowhere, so the strongest commercial pages (`/services/mls-idx-integration`, `/services/investor-portal-development`, `/industries/*`) cannot be reached from the body of the page. **Fixed:** one line of links per card.
2. Two of the six service tiles point at `/services` generically. Left as is: the tiles describe offers ("Product Architecture & Prototyping", "Workflow Automation & Internal Tools") that have no page of their own, and the index is now grouped by need.
3. The technology lists name frameworks and clouds that appear in no case study (B11, C2). **Not changed** (owner decision). See `HOMEPAGE-TECH-PROPOSAL.md` for the exact split.
4. Working-hours wording ("North American and European") disagrees with About (C8). Not changed: unresolved owner question.

### `/services` (index)
1. Seven core services in one undifferentiated grid; a buyer has to read all seven to find theirs. **Fixed:** grouped by need (build or rebuild a product, connect systems and data, automate and operate) with jump links, so every service is two taps from the top on a phone.
2. Nothing for a buyer comparing offshore vendors. **Fixed:** "Working with Peregrine" FAQ from confirmed facts only, plus a vendor-neutral list of questions to ask any engineering firm, marked with where this site answers each.

### `/services/mls-idx-integration`
1. Does not say when a turnkey IDX vendor is the right answer; the buyer who needs a plugin wastes a call. **Fixed** (S1, links the vendor-or-custom guide and the data-access guide).
2. "Cost depends on the number of boards" without saying why or what else matters (feed type, license type, listing volume, what sits on top). **Fixed** (S2).
3. No checklist of what to have ready (boards, license status, credentials, display rules). **Fixed** (S3).
4. Capabilities are proven by two case studies but the cards do not link them. **Fixed** (S5): sync engine and search to the real estate SaaS case study; multi-board normalization to W3|re.
5. No approval timelines are given, correctly (B8). Unchanged.

### `/industries/self-storage`
1. States when custom is worth considering, but not which operator facts drive the size of the build (facility count, lock hardware, billing rules, what is replaced). **Fixed:** scope block.
2. No fit / not-fit split and no preparation checklist. **Fixed.**
3. "In our case study" appears in four cards with no link. **Fixed:** proof links.
4. Lock vendors stay unnamed (B10). Unchanged.

### `/services/investor-portal-development`
1. The FAQ says off-the-shelf is often right, but the top of the page does not, and it never says a portal is not fund accounting. **Fixed** (S1).
2. Nothing on what drives effort beyond "the permission model". **Fixed** (S2): participation structures, roles, document controls, where calculations live, workflows, migration, integrations.
3. No preparation checklist (structure sketch, sample documents, how figures are produced today). **Fixed** (S3).
4. One case study backs the page; cards cite it without a link. **Fixed** (S5).

### `/services/shopify-development`, `/services/wordpress-development`, `/services/laravel-development`
1. Honest that no case study is published, but then give the buyer no way to judge fit. **Fixed:** fit / not-fit (including "you need a vendor with published work on this platform: we have none"), scope inputs and a checklist. All vendor-neutral; no project claims added.
2. Laravel: a buyer starting a new product is not told the published backends are Node.js until the "case studies" answer. **Fixed:** stated in the not-fit list.
3. No related services. **Fixed** (S6): Shopify to Odoo and API integration; WordPress to Next.js (headless) and SaaS; Laravel to React/Next.js frontends.

### `/services/react-development`, `/services/nextjs-development`
1. Strong proof but prose-only references. **Fixed** (S5): each card that cites a case study links it.
2. No scope inputs (platforms, offline rules, device features; page types, data freshness, tenancy). **Fixed** (S2).
3. The two pages do not point at each other for the buyer who picked the wrong one. **Fixed** (S1 not-fit links and S6).

### `/services/odoo-erp`
1. No project claims and no named integrations, correctly (B6). Unchanged.
2. Buyer cannot tell which of their facts matter: edition, hosting, version, existing customizations. **Fixed** (S2, S3).
3. Does not say that a packaged implementation is cheaper when standard modules fit. **Fixed** (S1, links the Odoo cost guide).

### `/contact`
1. Two forms side by side with one line of difference; on a phone the second form is far below the first. **Fixed:** "Which route to use" list in the hero with jump links to each form and the Calendly link.
2. Nothing about what happens after submitting. **Fixed:** three steps (reply within 1 business day; 30-minute technical discovery call with an engineer; engagement model agreed after the call). No new promise.
3. No guidance on what to write. **Fixed:** "What to include" checklist, and a pointer to the per-service checklists.
4. "Daily overlap with North American and European business hours" (C8). Not changed.

## Also covered
`/services/saas-development`, `/services/api-integration`, `/services/ai-automation` and `/services/cloud-devops`
share the template, so they received the same blocks (S1 to S6) with their own content.

## Not changed, and why
- Homepage technology lists and business-hours wording: owner decisions (C2, C8).
- Lead forms, navbar and footer, case-study pages, guides, `llms.txt`: owned by other streams.
- Case-study section anchors: the case-study pages have no section ids and are outside this stream, so proof
  links go to the case-study page and name what it shows.
- Timelines on MLS, investor portal, Odoo, Shopify, Laravel, WordPress: none confirmed, none added.

## Batch 2 (2026-10-10)
- **Real estate, logistics, healthcare and insurance, HR and recruitment, e-commerce and food ordering industry pages:** each had only case-study cards, service cards and guides, so a buyer could not self-qualify or prepare. **Fixed:** "what we build" cards that restate the linked case studies with proof links, plus fit / scope / first phase / checklist written for that industry. Regulated topics (patient data, payroll tax, card data) are phrased as decisions and documents the buyer brings; no certification or compliance status is claimed and no legal requirement is restated.
- **Laravel and Next.js pages:** "the backends in our published case studies are Node.js" ignored Python in the W3|re stack. **Fixed** in all four places: every stack lists Node.js and one also lists Python.
- **Self-storage scope:** the unsourced statement that late-fee and lien rules differ by state is now a request to bring your procedures for each state.
- **`/industries` index:** industry pages and case studies were already one tap from their card, but at 375 px the sixth card starts about four screens down and the stacked case-study links were only 6 px apart. **Fixed:** a row of 44 px industry links under the intro and more spacing between case-study links on phones.
