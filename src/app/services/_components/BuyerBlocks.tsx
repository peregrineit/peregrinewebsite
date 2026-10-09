import Link from 'next/link';
import type { BuyerGuide } from '@/data/services';
import { getCaseStudy } from '@/data/case-studies';

// Buyer-guidance blocks shared by /services/[slug] and /industries/[slug]. All text comes
// from `BuyerGuide` data (src/data/services.ts, technology-services.ts, industries.ts).

/** "A good fit when" / "Probably not the right fit when". */
export function FitBlock({ guide }: { guide: BuyerGuide }) {
  return (
    <div className="cp-grid-2">
      <div className="cp-card">
        <h3>A good fit when</h3>
        <ul className="cp-checks">
          {guide.fit.map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
      <div className="cp-card">
        <h3>Probably not the right fit when</h3>
        <ul className="cp-checks cp-checks-no">
          {guide.notFit.map(({ text, link }) => (
            <li key={text}>
              {text}
              {link && <>{' '}<Link href={link.href}>{link.label}</Link>.</>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Inputs that change the effort, then one paragraph on a sensible first phase. */
export function ScopeBlock({ guide }: { guide: BuyerGuide }) {
  return (
    <>
      <p className="cp-muted" style={{ maxWidth: 820 }}>
        These are the inputs that change the effort. None needs a final answer before the first call, but each
        one you can answer makes the estimate tighter.
      </p>
      <dl className="cp-factors">
        {guide.scope.map(({ factor, effect }) => (
          <div key={factor}>
            <dt>{factor}</dt>
            <dd>{effect}</dd>
          </div>
        ))}
      </dl>
      <h3 style={{ marginTop: 28 }}>A sensible first phase</h3>
      <p style={{ maxWidth: 820 }}>{guide.firstPhase}</p>
    </>
  );
}

/** Scoping-call checklist. */
export function BringBlock({ guide }: { guide: BuyerGuide }) {
  return (
    <>
      <h3 style={{ marginTop: 28 }}>What to bring to the scoping call</h3>
      <ul className="cp-checks">
        {guide.bring.map((t) => <li key={t}>{t}</li>)}
      </ul>
      <p className="cp-muted" style={{ fontSize: 15 }}>
        Partial answers are fine. Whatever is missing becomes the first item on the call.
      </p>
    </>
  );
}

/** "Shown in: <case study>" line on a capability card. */
export function ProofLinks({ slugs }: { slugs?: string[] }) {
  if (!slugs?.length) return null;
  return (
    <p className="cp-proof">
      Shown in:{' '}
      {slugs.map((slug, i) => (
        <span key={slug}>{i > 0 && '; '}<Link href={`/case-studies/${slug}`}>{getCaseStudy(slug).title}</Link></span>
      ))}
    </p>
  );
}
