// Team members shown on /about (and on a /team page once there are two or more).
// Their Person JSON-LD is emitted site-wide from src/app/layout.tsx.
// Real people only. Engineers: none supplied yet (2026-09-30).
// TODO(owner): add each person: name, role, 2-3 lines of
// background, LinkedIn URL and a photo in /public/team/. Credentials and
// certifications are only listed when the owner confirms who holds them.
export interface TeamMember {
  /** Stable id used for the Person @id (e.g. "jane-doe"). */
  id: string;
  name: string;
  role: string;
  bio: string;
  linkedin?: string;
  /** Site-relative photo path, e.g. /team/jane-doe.jpg */
  photo?: string;
  credentials?: string[];
}

export const team: TeamMember[] = [
  {
    id: 'mukesh-swami',
    name: 'Mukesh Swami',
    role: 'Founder & CEO',
    // Bio supplied by the owner (2026-09-29); used as written.
    bio: 'Mukesh Swami is the founder and CEO of Peregrine IT Solutions. He has spent more than 15 years in technology leadership, product development and team building, starting as a software engineer and engineering manager at startups and large software companies before founding Peregrine to close the gap between a good product idea and a system that ships and scales. His team builds multi-tenant SaaS platforms, MLS/IDX and API integrations, AI automation and cloud infrastructure, mostly for real estate, proptech and other B2B companies in the United States and Canada. He is based in Noida, India.',
    linkedin: 'https://www.linkedin.com/in/mukeshswami/',
    // TODO(owner): add public/images/team/mukesh-swami.jpg, then set photo: '/images/team/mukesh-swami.jpg'.
  },
];

/** Byline author for case studies and guides. */
export const caseStudyAuthorId: string | null = 'mukesh-swami';

export function getCaseStudyAuthor(): TeamMember | null {
  return team.find((m) => m.id === caseStudyAuthorId) ?? null;
}

/** Person @id, emitted site-wide from layout.tsx so any page can reference it. */
export const personId = (id: string) => `https://peregrine-it.com/#${id}`;
