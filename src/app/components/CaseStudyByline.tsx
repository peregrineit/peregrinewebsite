import Link from 'next/link';
import { getCaseStudyAuthor } from '@/data/team';

// Author byline for case studies (author set in src/data/team.ts).
export default function CaseStudyByline() {
  const author = getCaseStudyAuthor();
  if (!author) return null;
  return (
    <div className="csd-section" style={{ marginBottom: 32 }}>
      <p style={{ fontSize: 14, color: 'var(--csd-subtle)', margin: 0 }}>
        Written by <Link href={`/about#${author.id}`} style={{ display: 'inline', color: 'var(--csd-accent)', fontWeight: 600 }}>{author.name}</Link>, {author.role}
      </p>
    </div>
  );
}
