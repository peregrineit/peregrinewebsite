import Link from 'next/link';
import { getCaseStudyAuthor } from '@/data/team';

// Author byline for case studies. Renders nothing until the owner sets
// caseStudyAuthorId in src/data/team.ts (TODO(owner)).
export default function CaseStudyByline() {
  const author = getCaseStudyAuthor();
  if (!author) return null;
  return (
    <div className="csd-section" style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: 'var(--csd-subtle)', margin: 0 }}>
        Written by <Link href={`/about#${author.id}`}>{author.name}</Link>, {author.role}
      </p>
    </div>
  );
}
