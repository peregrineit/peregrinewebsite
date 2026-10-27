import Link from 'next/link';
import type { ServiceSection } from '@/data/services';

// Optional extra sections on /services/[slug], driven by `Service.sections`.
// Text may contain [label](href) links: internal hrefs (starting with "/") become <Link>,
// anything else is an external primary source and opens in a new tab (same as `Src`).

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function RichText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const [whole, label, href] = m;
    const at = m.index ?? 0;
    if (at > last) out.push(text.slice(last, at));
    out.push(
      href.startsWith('/')
        ? <Link key={at} href={href}>{label}</Link>
        : <a key={at} href={href} target="_blank" rel="noopener noreferrer" className="cp-src">{label}</a>,
    );
    last = at + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

export function ServiceSections({ sections }: { sections?: ServiceSection[] }) {
  if (!sections?.length) return null;
  return (
    <>
      {sections.map((s) => (
        <section key={s.id} className="cp-section" id={s.id}>
          <div className="cp-container">
            <span className="cp-label">{s.label}</span>
            <h2>{s.heading}</h2>
            {s.paragraphs?.map((p, i) => (
              <p key={i} style={{ maxWidth: 820 }}><RichText text={p} /></p>
            ))}
            {s.list && (
              <ul className="cp-checks" style={{ maxWidth: 820 }}>
                {s.list.map((t) => <li key={t}><RichText text={t} /></li>)}
              </ul>
            )}
            {s.items && (
              <dl className="cp-factors" style={{ marginTop: 20 }}>
                {s.items.map(({ title, body }) => (
                  <div key={title}>
                    <dt>{title}</dt>
                    <dd><RichText text={body} /></dd>
                  </div>
                ))}
              </dl>
            )}
            {s.table && (
              <div className="cp-prose" style={{ maxWidth: 820, marginTop: 20 }}>
                <div className="cp-table-wrap">
                  <table>
                    <thead>
                      <tr>{s.table.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map(([head, ...cells]) => (
                        <tr key={head}>
                          <th scope="row">{head}</th>
                          {cells.map((cell, i) => <td key={i}><RichText text={cell} /></td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {s.after?.map((p, i) => (
              <p key={i} style={{ maxWidth: 820, marginTop: 20 }}><RichText text={p} /></p>
            ))}
            {s.note && <p className="cp-note" style={{ maxWidth: 820, marginTop: 20 }}><RichText text={s.note} /></p>}
          </div>
        </section>
      ))}
    </>
  );
}
