import Image from 'next/image';
import type { TeamMember } from '@/data/team';

// Team cards. The matching Person JSON-LD is emitted site-wide from layout.tsx.
export default function TeamGrid({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;
  return (
    <>
      <div className="cp-grid" style={members.length === 1 ? { gridTemplateColumns: '1fr', maxWidth: 820 } : undefined}>
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
