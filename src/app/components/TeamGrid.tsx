import Image from 'next/image';
import JsonLd, { ORGANIZATION_REF } from './JsonLd';
import { personId, type TeamMember } from '@/data/team';

// Team cards with Person JSON-LD (worksFor -> the Organization). Renders nothing
// until src/data/team.ts has real people in it.
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': members.map((m) => ({
      '@type': 'Person',
      '@id': personId(m.id),
      name: m.name,
      jobTitle: m.role,
      description: m.bio,
      worksFor: ORGANIZATION_REF,
      ...(m.photo ? { image: `https://peregrine-it.com${m.photo}` } : {}),
      ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
      ...(m.credentials?.length ? { hasCredential: m.credentials.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c })) } : {}),
    })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <div className="cp-grid">
        {members.map((m) => (
          <div key={m.id} id={m.id} className="cp-card">
            {m.photo && <Image src={m.photo} alt={`${m.name}, ${m.role}`} width={96} height={96} style={{ borderRadius: 999, marginBottom: 12 }} />}
            <h3>{m.name}</h3>
            <span className="cp-card-meta">{m.role}</span>
            <p style={{ marginTop: 10 }}>{m.bio}</p>
            {m.credentials?.length ? <p style={{ marginTop: 8, fontSize: 14 }}>{m.credentials.join(' · ')}</p> : null}
            {m.linkedin && <p style={{ marginTop: 10 }}><a href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></p>}
          </div>
        ))}
      </div>
    </>
  );
}
