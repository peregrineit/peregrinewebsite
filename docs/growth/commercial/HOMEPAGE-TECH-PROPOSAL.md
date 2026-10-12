# Homepage technology lists vs. published case studies

Sprint 2 item 14 (proposal only; the homepage is unchanged). Blockers B11 and C2.

Computed on 2026-10-10 from `src/app/page.tsx` (the six lists under "Technologies We Work With" and the logo strip) and the `stack` arrays of the 19 case studies in `src/data/case-studies.ts`.

Match rule: a technology counts as present when a case-study stack entry is that name, or begins with it (so "AWS S3" and "AWS (HIPAA BAA)" count for AWS; "React Native" does not count for React).

## Frontend

| Technology | Case studies listing it | Note |
|---|---|---|
| React | 0 of 19 | No stack lists "React" on its own; Next.js (a React framework) is in 18 and React Native in 7 |
| Vue.js | 0 of 19 |  |
| Angular | 0 of 19 |  |
| Next.js | 18 of 19 |  |
| Nuxt.js | 0 of 19 |  |
| Svelte | 0 of 19 |  |
| Tailwind CSS | 0 of 19 |  |

## Backend

| Technology | Case studies listing it | Note |
|---|---|---|
| Laravel | 0 of 19 |  |
| .NET | 0 of 19 |  |
| Node.js | 19 of 19 |  |
| Python | 1 of 19 | w3re-ai-real-estate-platform |
| NestJS | 0 of 19 |  |
| Django | 0 of 19 |  |
| FastAPI | 0 of 19 |  |
| Spring Boot | 0 of 19 |  |

## Mobile

| Technology | Case studies listing it | Note |
|---|---|---|
| React Native | 7 of 19 |  |
| Flutter | 0 of 19 |  |
| Swift | 0 of 19 |  |
| Kotlin | 0 of 19 |  |
| Ionic | 0 of 19 |  |

## Cloud

| Technology | Case studies listing it | Note |
|---|---|---|
| AWS | 13 of 19 |  |
| Azure | 0 of 19 |  |
| Google Cloud Platform | 0 of 19 |  |
| DigitalOcean | 0 of 19 |  |
| Linode | 1 of 19 | scaling-real-estate-saas-platform |
| Vultr | 0 of 19 |  |

## DevOps

| Technology | Case studies listing it | Note |
|---|---|---|
| Docker | 0 of 19 |  |
| Kubernetes | 0 of 19 | Not listed by name; one stack lists "AWS EKS" (managed Kubernetes): w3re-ai-real-estate-platform |
| Jenkins | 0 of 19 |  |
| GitHub Actions | 0 of 19 |  |
| GitLab CI | 0 of 19 |  |
| Terraform | 0 of 19 |  |
| Ansible | 0 of 19 |  |

## Database

| Technology | Case studies listing it | Note |
|---|---|---|
| MongoDB | 1 of 19 | scaling-real-estate-saas-platform |
| PostgreSQL | 17 of 19 |  |
| MySQL | 0 of 19 |  |
| Redis | 15 of 19 |  |
| Elasticsearch | 3 of 19 | scaling-real-estate-saas-platform, multi-vendor-ecommerce-marketplace, recruitment-ats-platform |
| Cassandra | 0 of 19 |  |
| DynamoDB | 0 of 19 |  |

## Logo strip

| Technology | Case studies listing it | Note |
|---|---|---|
| n8n | 0 of 19 |  |
| Odoo | 0 of 19 | No Odoo case study is published (B6); the Odoo service page says so |
| Next.js | 18 of 19 |  |
| React | 0 of 19 | No stack lists "React" on its own; Next.js (a React framework) is in 18 and React Native in 7 |
| Docker | 0 of 19 |  |
| AWS | 13 of 19 |  |
| Supabase | 0 of 19 |  |
| Python | 1 of 19 | w3re-ai-real-estate-platform |
| TypeScript | 0 of 19 | Not listed in any stack |
| Tailwind CSS | 0 of 19 |  |
| JavaScript | 0 of 19 | Not listed by name; Node.js is in 19 |
| Swift | 0 of 19 |  |
| CSS | 0 of 19 | Not a stack item in any case study (implied by every web frontend) |
| MySQL | 0 of 19 |  |

## Summary

- Listed on the homepage and present in at least one case-study stack (10): Next.js, Node.js, Python, React Native, AWS, Linode, MongoDB, PostgreSQL, Redis, Elasticsearch.
- Listed on the homepage and present in no case-study stack (30): React, Vue.js, Angular, Nuxt.js, Svelte, Tailwind CSS, Laravel, .NET, NestJS, Django, FastAPI, Spring Boot, Flutter, Swift, Kotlin, Ionic, Azure, Google Cloud Platform, DigitalOcean, Vultr, Docker, Kubernetes, Jenkins, GitHub Actions, GitLab CI, Terraform, Ansible, MySQL, Cassandra, DynamoDB.
- Logo strip with no case-study stack behind it: n8n, Odoo, React, Docker, Supabase, TypeScript, Tailwind CSS, JavaScript, Swift, CSS, MySQL.

## Options for the owner

1. **Trim to evidence.** Each list keeps only the technologies in the first summary line. Frontend becomes Next.js (React could stay as the library under Next.js and React Native, though no stack lists it by name); Backend becomes Node.js and Python; Mobile becomes React Native; Cloud becomes AWS and Linode; Database becomes PostgreSQL, Redis, Elasticsearch and MongoDB; DevOps would need rewording, since only AWS EKS appears.
2. **Split in two.** "Used in our published case studies" (the evidence list, each item linking to `/case-studies`) and "Also offered" for technologies the owner confirms the team works in. Laravel, Shopify and WordPress already have service pages that state no case study is published; the same wording would apply.
3. **Keep as is.** The list is a capability statement, not a performance claim. The risk is a buyer asking for a Vue, .NET or Flutter reference that cannot be shown.

Recommendation: option 2. It keeps the breadth the owner may want while making the proven stack obvious, and it needs one fact from the owner: which of the unlisted technologies the current team has delivered in production.

## What the owner needs to supply for option 2

For each technology in the second summary line: yes or no, and if yes, one project (it does not have to be publishable) so the claim has a source on file.

## Reproduce

```bash
python3 - <<'PY'
import re
src = open('src/data/case-studies.ts').read()
stacks = {m.group(1): re.findall(r'"([^"]+)"', m.group(2)) for m in re.finditer(r'slug: "([^"]+)".*?stack: \[(.*?)\]', src, re.S)}
home = open('src/app/page.tsx').read()
for l in re.findall(r'<div className="cert-title">(.*?)</div>', home, re.S):
    cat, items = ' '.join(l.split()).split(': ', 1)
    for t in [i.strip() for i in items.split(',')]:
        n = sum(any(x == t or x.startswith(t + ' ') or x.startswith(t + '/') for x in st) for st in stacks.values())
        print(cat, '|', t, '|', n)
PY
```

The command uses the plain rule; the table above also applies the special cases named in the notes (React, Vue.js, Nuxt.js, Spring Boot, Google Cloud Platform, Linode).
