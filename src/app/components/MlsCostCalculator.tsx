'use client';
import { useMemo, useState } from 'react';
import { CLUTCH, dataVendors, hourlyBands, idxPlugins, mlsLicenses, type Fee, type FeeOption } from '@/data/mls-fees';
import { track } from '@/lib/track';

// Adds up published fees only (src/data/mls-fees.ts). It does not estimate anything:
// counts and development hours are whatever the visitor enters.

type Line = { label: string; published: string; source: string; fee: Fee; note?: string };
type Range = [number, number];

const money = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
const range = ([a, b]: Range, suffix = '') => (a === b ? `${money(a)}${suffix}` : `${money(a)} to ${money(b)}${suffix}`);
const add = (x: Range, y?: Range): Range => (y ? [x[0] + y[0], x[1] + y[1]] : x);

// The field keeps what was typed (so it can be cleared and retyped); the fee uses at least 1.
function Count({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="cp-calc-count">
      <span>{label}</span>
      <input type="number" min={1} max={500} inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

const toCount = (v: string | undefined) => Math.max(1, Math.min(500, Math.floor(Number(v)) || 1));

export default function MlsCostCalculator() {
  const [plugin, setPlugin] = useState('');
  const [boards, setBoards] = useState<Record<string, string>>({});
  const [vendor, setVendor] = useState('');
  const [counts, setCounts] = useState<Record<string, string>>({});
  const [hours, setHours] = useState('');
  const [band, setBand] = useState('us');
  const [touched, setTouched] = useState(false);

  const touch = () => {
    if (!touched) {
      setTouched(true);
      track('calculator_use', { tool: 'mls-idx-cost' });
    }
  };

  const lines = useMemo<Line[]>(() => {
    const out: Line[] = [];
    const push = (prefix: string, o?: FeeOption) => {
      if (o) out.push({ label: `${prefix}${o.label}`, published: o.published, source: o.source, fee: o.fee(toCount(counts[o.id])), note: o.note });
    };
    push('IDX plugin: ', idxPlugins.find((p) => p.id === plugin));
    mlsLicenses.forEach(({ board, options }) => push(`${board}: `, options.find((o) => o.id === boards[board])));
    push('Data vendor: ', dataVendors.find((v) => v.id === vendor));
    return out;
  }, [plugin, boards, vendor, counts]);

  const usd = lines.filter((l) => !l.fee.currency);
  const monthly = usd.reduce<Range>((t, l) => add(t, l.fee.monthly), [0, 0]);
  const yearly = usd.reduce<Range>((t, l) => add(t, l.fee.yearly), [0, 0]);
  const oneTime = usd.reduce<Range>((t, l) => add(t, l.fee.oneTime), [0, 0]);
  const perYear: Range = [monthly[0] * 12 + yearly[0], monthly[1] * 12 + yearly[1]];
  const cad = lines.filter((l) => l.fee.currency === 'CAD');
  const hourCount = Math.max(0, Number(hours) || 0);
  const rate = hourlyBands.find((b) => b.id === band)!.rate;
  const dev: Range = [hourCount * rate[0], hourCount * rate[1]];

  const select = (value: string, onChange: (v: string) => void, options: FeeOption[], none: string, aria: string) => (
    <select value={value} aria-label={aria} onChange={(e) => { touch(); onChange(e.target.value); }}>
      <option value="">{none}</option>
      {options.map((o) => <option key={o.id} value={o.id}>{o.label}: {o.published}</option>)}
    </select>
  );
  const counter = (o?: FeeOption) => o?.per && (
    <Count label={`Number of ${o.per === 'office' ? 'offices' : `${o.per}s`}`} value={counts[o.id] ?? '1'} onChange={(v) => { touch(); setCounts((c) => ({ ...c, [o.id]: v })); }} />
  );

  return (
    <div className="cp-calc">
      <div className="cp-calc-inputs">
        <fieldset>
          <legend>1. IDX plugin or hosted IDX site</legend>
          <p className="cp-muted">Choose one if you only need listings on a website.</p>
          {select(plugin, setPlugin, idxPlugins, 'No IDX plugin', 'IDX plugin')}
        </fieldset>

        <fieldset>
          <legend>2. MLS license fees</legend>
          <p className="cp-muted">Only boards whose fee schedules are cited in our guide. Other MLSs set their own fees.</p>
          {mlsLicenses.map(({ board, options }) => {
            const chosen = options.find((o) => o.id === boards[board]);
            return (
              <div key={board} className="cp-calc-row">
                <span className="cp-calc-board">{board}</span>
                {select(boards[board] || '', (v) => setBoards((b) => ({ ...b, [board]: v })), options, 'Not needed', `${board} license`)}
                {counter(chosen)}
              </div>
            );
          })}
        </fieldset>

        <fieldset>
          <legend>3. RESO Web API data vendor</legend>
          <p className="cp-muted">If your MLS delivers data through a platform or you use an aggregator.</p>
          {select(vendor, setVendor, dataVendors, 'No data vendor', 'Data vendor')}
          {counter(dataVendors.find((v) => v.id === vendor))}
        </fieldset>

        <fieldset>
          <legend>4. Development (optional)</legend>
          <p className="cp-muted">
            Enter your own estimate of hours. We do not estimate hours here; the rate is the market band{' '}
            <a href={CLUTCH} target="_blank" rel="noopener noreferrer" className="cp-src">Clutch reports</a> for software
            development companies in each country, not Peregrine&apos;s rate.
          </p>
          <div className="cp-calc-row">
            <label className="cp-calc-count">
              <span>Hours</span>
              <input type="number" min={0} max={20000} value={hours} placeholder="0" onChange={(e) => { touch(); setHours(e.target.value); }} />
            </label>
            <select value={band} aria-label="Developer location" onChange={(e) => setBand(e.target.value)}>
              {hourlyBands.map((b) => <option key={b.id} value={b.id}>{b.label}: ${b.rate[0]} to ${b.rate[1]} per hour</option>)}
            </select>
          </div>
        </fieldset>
      </div>

      <div className="cp-calc-result" aria-live="polite">
        <h3>Your total from published fees</h3>
        {lines.length === 0 && hourCount === 0 ? (
          <p className="cp-muted">Choose at least one option to see a total.</p>
        ) : (
          <>
            <table className="cp-glance">
              <tbody>
                <tr><th scope="row">Recurring per month</th><td>{range(monthly)}</td></tr>
                <tr><th scope="row">Annual fees</th><td>{range(yearly)}</td></tr>
                <tr><th scope="row">Total per year</th><td>{range(perYear)} <span className="cp-muted">(12 × monthly, plus annual fees)</span></td></tr>
                <tr><th scope="row">One-time fees</th><td>{range(oneTime)}{cad.map((l) => ` plus CAD ${l.fee.oneTime![0].toLocaleString('en-US')}`)}</td></tr>
                {hourCount > 0 && <tr><th scope="row">Development</th><td>{range(dev)} <span className="cp-muted">({hourCount.toLocaleString('en-US')} hours × ${rate[0]} to ${rate[1]})</span></td></tr>}
              </tbody>
            </table>
            {lines.length > 0 && (
              <>
                <h3 style={{ marginTop: 24 }}>Where each figure comes from</h3>
                <ul className="cp-calc-lines">
                  {lines.map((l) => (
                    <li key={l.label}>
                      <strong>{l.label}</strong>:{' '}
                      <a href={l.source} target="_blank" rel="noopener noreferrer" className="cp-src">{l.published}</a>
                      {l.note && <> <span className="cp-muted">{l.note}</span></>}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
