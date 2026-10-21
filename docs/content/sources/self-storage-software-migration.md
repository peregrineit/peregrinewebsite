# Sources: self-storage-software-migration

All pages fetched and read on 2026-10-21 with curl (tags and scripts stripped, whitespace normalized), and each phrase below matched with `grep -F` in the fetched text. The PTI integrations table loads with JavaScript, so that page was also rendered in headless Chromium (Playwright with chrome-headless-shell 1243) and the phrase matched in the rendered `innerText`. Each row is the sentence the article relies on. Vendors are quoted as examples of published behavior; Peregrine has not evaluated these products and claims no partnership with any of them.

| URL | Relied on | Date |
|---|---|---|
| https://docs.stripe.com/get-started/data-migrations/pan-import ("Request a payments data import") | "Stripe enables you to retain your existing customer and payment data when you migrate to Stripe. We work with your team and current payment provider, as needed, to securely migrate your information." | 2026-10-21 |
| same | "Many processors require the account owner to request a data transfer." / "Your previous processor might take a few days or several weeks to transfer the final data to Stripe." | 2026-10-21 |
| same | "This process allows you to accept and charge new customers on Stripe and continue charging your existing customers with your current processor until the migration is complete." | 2026-10-21 |
| same | "If customers update their payment information with your previous processor in the window between transferring the data and completing the import, those changes are lost." | 2026-10-21 |
| same | "After completing the import, Stripe sends you a choice of a CSV or JSON file that shows the mapped relationship between your current processor's IDs and the imported Stripe object IDs." | 2026-10-21 |
| same | "Use caution because retrying numerous cards (such as after a migration) can appear suspicious to issuers." | 2026-10-21 |
| same | Section "Monitor decline reasons for optimisation opportunities": table of decline codes (e.g. incorrect_number, expired_card, generic_decline, do_not_honor) with "Migration effect", "Do" and "Don't" columns | 2026-10-21 |
| https://docs.stripe.com/get-started/data-migrations/pan-export ("Request a payment data export") | "To meet PCI compliance obligations, we can only transfer your card data to another PCI DSS Level 1-compliant payment processor." / "Stripe doesn't export your account's payment history, subscriptions, or other objects." / "We exclude any credentials saved through Link from our exports." | 2026-10-21 |
| https://www.spiderdoor.com/multi-site-gate-access-control/ (canonical; the draft's `https://www.spiderdoor.com/?p=6713` redirects here with HTTP 200 and the page's `<link rel="canonical">` is this URL; author André Rosdahl, `article:published_time` 2026-08-20) | "The management software at that location decides how fast a code reaches the keypad. Some platforms sync in real time. Others sync every eight to twelve minutes. Edited codes are slower than new ones: on SiteLink, an edited gate code syncs roughly three times in a twenty four hour period." | 2026-10-21 |
| same | "If they run different software, you get a separate SpiderDoor account for each platform" | 2026-10-21 |
| https://www.ptisecurity.com/us/en/pti-partners/pms-integrations | "Our access control platform, StorLogix Cloud, integrates with nearly every PMS on the market." (in the curl HTML and the render) / integrations table with columns "PMS", "BridgeApp", "API" (render only; not defined on the page; e.g. "6Storage Software solutions Yes No", "CC Storage No Yes", "Cubby Yes Yes") | 2026-10-21 |
| https://www.janusintl.com/products/noke/noke-faqs | "The Nokē® Smart Entry System integrates with all major property management software providers." / "New integrations typically take 4-6 weeks." | 2026-10-21 |
| https://support.davincilock.com/facility-management-software-integration-partners | "the software will attempt to retroactively assign the locks to your units in your FMS. So no errors occur, ensure the unit numbers match the naming convention within your FMS." | 2026-10-21 |
| https://www.insideselfstorage.com/software/iss-blog-upgrading-my-self-storage-management-software-hiccups-and-lessons-learned (Inside Self-Storage blog; byline "Tim Davis, Owner, American Storage", "January 16, 2026"; JSON-LD `datePublished` 2026-01-16T08:00:00.000Z, author Tim Davis) | "I started with my smallest self-storage facility first." / "With 188 units, I figured it would be the easiest one to update and change back if it didn't work out." / "I left the gate open on the first day until I was sure all the data had transferred." Cited as one operator's experience, not a technical source. | 2026-10-21 |

## Peregrine statements (from published pages only)

Source: `src/app/case-studies/self-storage-management-platform/page.tsx` (live at /case-studies/self-storage-management-platform), read 2026-10-21.

- "A mid-size self-storage operator running 150+ facilities across 12 states"
- "Each facility used a different gate access vendor. Some had keypads, others had Bluetooth locks, and a few still used physical keys."
- "The reservation system, billing engine, and access control software were three separate vendors with no API integration. Data lived in silos, and syncing required nightly CSV exports."
- "We built an abstraction layer that normalizes commands (lock, unlock, check status) across all vendors"
- "Integrated three smart lock vendors behind a unified API"
- "When the client later added a fourth lock vendor, integration took two weeks instead of two months."
- "Phased rollout across facilities — 10 pilot sites, then full 150+ deployment."

The case study does not describe a data conversion from the operator's previous systems, so the guide claims no migration experience (owner question in the draft, still open).

## Not used

- Stripe pan-import: "After leaving your payment processor, confirm they have cancelled all automatic billing of your customers." The sentence is in the page's embedded data but not in the rendered page text on 2026-10-21 (curl text and Chromium `innerText`), so the draft's attribution was removed; the article keeps the check ("confirm that the old processor has stopped billing tenants") as Peregrine's own recommendation.
- PTI "tenant information, payments, and access are automatically synced": not in the curl HTML (draft note); not used.
- Stora migrations page, Storeganise switching guide, Storman API page: search evidence only, not fetched; not used.
- State lien, notice and late-fee statutes: deliberately not researched or stated.
