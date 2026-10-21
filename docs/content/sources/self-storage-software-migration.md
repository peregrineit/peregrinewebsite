# Sources: self-storage-software-migration

All pages fetched and read on 2026-10-21 with curl (tags and scripts stripped, whitespace normalized), and each phrase below matched with `grep -F` in the fetched text.

| URL | Relied on | Date |
|---|---|---|
| https://www.insideselfstorage.com/software/iss-blog-upgrading-my-self-storage-management-software-hiccups-and-lessons-learned (Inside Self-Storage blog; byline "Tim Davis, Owner, American Storage", "January 16, 2026"; JSON-LD `datePublished` 2026-01-16T08:00:00.000Z, author Tim Davis) | "I started with my smallest self-storage facility first." / "With 188 units, I figured it would be the easiest one to update and change back if it didn't work out." / "I left the gate open on the first day until I was sure all the data had transferred." Cited as one operator's experience, not a technical source. | 2026-10-21 |

## Owner decision 2026-10-21

Gate, lock and payment vendors are not named in the guide. The Stripe, SpiderDoor, PTI, Janus/Nokē and DaVinci Lock pages fetched on 2026-10-21 are no longer cited, and the passages that relied on them were rewritten as generic questions for the operator's own vendors. Stripe appears once, as the case study states it ("Stripe-powered billing with auto-retry logic"). The guide makes no statement about whether the case study involved a data conversion.

## Peregrine statements (from published pages only)

Source: `src/app/case-studies/self-storage-management-platform/page.tsx` (live at /case-studies/self-storage-management-platform), read 2026-10-21.

- "A mid-size self-storage operator running 150+ facilities across 12 states"
- "Each facility used a different gate access vendor. Some had keypads, others had Bluetooth locks, and a few still used physical keys."
- "The reservation system, billing engine, and access control software were three separate vendors with no API integration. Data lived in silos, and syncing required nightly CSV exports."
- "We built an abstraction layer that normalizes commands (lock, unlock, check status) across all vendors"
- "Integrated three smart lock vendors behind a unified API"
- "When the client later added a fourth lock vendor, integration took two weeks instead of two months."
- "Phased rollout across facilities — 10 pilot sites, then full 150+ deployment."
- "Stripe-powered billing with auto-retry logic."


## Not used

- Stora migrations page, Storeganise switching guide, Storman API page: search evidence only, not fetched; not used.
- State lien, notice and late-fee statutes: deliberately not researched or stated.
