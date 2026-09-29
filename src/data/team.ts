// Team members shown on /about (and on a /team page once there are two or more).
// Real people only. TODO(owner): add each person: name, role, 2-3 lines of
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

export const team: TeamMember[] = [];

/** Byline author for case studies. TODO(owner): set to a team member id. */
export const caseStudyAuthorId: string | null = null;

export function getCaseStudyAuthor(): TeamMember | null {
  return team.find((m) => m.id === caseStudyAuthorId) ?? null;
}

export const personId = (id: string) => `https://peregrine-it.com/about#${id}`;
