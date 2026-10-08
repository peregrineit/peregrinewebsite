# peregrinewebsite

Marketing site for Peregrine IT Solutions (https://peregrine-it.com). Next.js 16 App Router on Vercel; `main` deploys to production.

**Goal of the SEO work:** more qualified organic traffic and software-development enquiries from US and Canadian B2B companies.

## Where things are tracked
- `docs/seo/MASTER-PLAN.md` — the 90-day plan and how the audit was reconciled with the repo.
- `docs/seo/TASKS.md` — task status. `docs/seo/PROGRESS.md` — per-task log (files, hash, tests, what remains). `docs/seo/BLOCKERS.md` — what needs the owner. Update these with the work.
- `SEO-PLAN.md` — history of Phases 1–11 and implementation notes (why things are the way they are).
- `SEO-OFFPAGE.md` — manual off-site checklist for the owner.

## Rules that are not negotiable
- **Never invent facts.** No client results, integrations, MLS fees, prices, timelines or testimonials that the owner has not confirmed or that are not already published on the site. Anything only the owner knows is a `TODO(owner)` code comment, not visible text.
- **Every third-party figure is linked to its source** (`<Src>` in guides) and date-stamped. Re-check the source before changing a guide's `dateModified`.
- **Case-study figures** may be repeated elsewhere only as they appear in the case study, with a link to it.
- No "best", "leading" or "#1" in titles, H1s or JSON-LD. No meta keywords. No location (city) landing pages.
- US English, plain wording. Words on the cliché list in `scripts/seo_check.py` stay out of our own copy.
- Market is US and Canada. The office is in Noida, India; say so plainly where relevant.
- FAQ text and FAQPage JSON-LD always come from the same data, so they cannot drift.
- Titles ≤ 60 characters including the ` | Peregrine IT` suffix; descriptions ≤ 160; both unique.

## Git
- Work on a feature branch (`seo/phase-N`). Commit per task with `seo(N.x): …`. Push the branch only.
- Never push to `main`, merge, or deploy without the owner's say-so. Merging to `main` is a production change.
- `public/case-studies/` in the working copy is untracked owner material. Leave it alone.

## Commands
```bash
npm run dev                      # dev server
scripts/serve-local.sh           # production build served on http://localhost:3057
python3 scripts/seo_check.py     # SEO invariants against localhost:3057 (must print FAILS: 0)
python3 scripts/seo_check.py https://peregrine-it.com   # same checks against production
npx tsc --noEmit -p .            # types
npx eslint <changed files>       # lint (two old `any` errors in src/app/page.tsx are known)
scripts/serve-local.sh stop
```
Run `tsc`, a build and `seo_check.py` after every change to pages, metadata or schema.

## How the site is built
- **Data files drive most pages.** `src/data/services.ts` (service pages, one template at `src/app/services/[slug]/page.tsx`), `industries.ts`, `technologies.ts`, `case-studies.ts`, `guides.ts`, `team.ts`, `company.ts`, `legal.ts`. Prefer adding data over adding pages.
- **Case studies and guides** have hand-written JSX bodies (`src/app/case-studies/<slug>/page.tsx`, `src/app/blog/<slug>/page.tsx`); their metadata lives in the data files.
- **New content pages** use `src/app/css/content-pages.css` (`.cp-*` classes, dark slate theme). Reuse them; do not introduce a new visual style.
- `src/app/css/peregrine.css` has unlayered element rules (h1–h4, p, a, img, button) that beat Tailwind utilities. Scope new CSS or use inline styles when a utility seems to do nothing.
- **Icons** are a subset font. A new `ri-*` class renders blank until the subset is regenerated (see SEO-PLAN.md, implementation notes).
- **Schema:** Organization, Person and WebSite come from `src/app/layout.tsx`; page-level nodes from each page via `components/JsonLd.tsx`.
- **Forms:** `components/LeadForms.tsx` posts to `src/app/api/lead/route.ts`. Any element with `data-open-contact` or `data-open-quick-project` opens the footer popup.
- **Tracking:** `src/lib/track.ts`. GA4 loads only when `NEXT_PUBLIC_GA_ID` is set; events are documented in docs/seo/TASKS.md.
- New routes must be added to `src/app/sitemap.ts` and `public/llms.txt`.

## Environment variables (set in Vercel, never committed)
| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | lead notification and auto-reply email |
| `LEAD_FROM_EMAIL` | verified sender, e.g. `Peregrine IT <hello@peregrine-it.com>`; falls back to Resend's test sender |
| `LEAD_WEBHOOK_URL` | optional CRM/automation webhook that receives every lead as JSON |
| `NEXT_PUBLIC_GA_ID` | optional GA4 measurement ID (`G-…`) |
