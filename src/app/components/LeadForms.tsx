'use client';
import React, { useEffect, useState } from 'react';
import { getAttribution, track } from '@/lib/track';

// The site's two lead forms (strategy call and quick project request). Used in the
// Footer popups, inline on /contact and at the foot of service and landing pages.
// Both post to /api/lead with attribution (landing page, referrer, UTM) and fire
// lead_submit / lead_error events (see docs/seo/TASKS.md).
/** `fallback` is a pre-filled mailto: link, set when the server could not accept the lead.
 *  `receipt` is what the server reported when it did: accepted by the mail provider, which
 *  is not the same as delivered. */
type Receipt = { ref: string; acknowledgement: string; ids: string[]; notificationId?: string };
type Status = { loading: boolean; success: boolean; error: string; fallback?: string; receipt?: Receipt };
const idle: Status = { loading: false, success: false, error: '' };

// If nothing on the server accepted the lead (502) or the request never arrived, the
// visitor can still send the same details from their own mail client.
function mailtoFallback(d: Record<string, string>) {
  const body = [
    `Name: ${d.name}`,
    d.company ? `Company: ${d.company}` : '',
    d.projectType ? `Project type: ${d.projectType}` : '',
    d.timeline ? `Timeline: ${d.timeline}` : '',
    '',
    d.message,
  ].filter((line, i) => line || i === 4).join('\n');
  return `mailto:info@peregrine-it.com?subject=${encodeURIComponent('Project inquiry')}&body=${encodeURIComponent(body)}`;
}
/** Named form controls, read by name in the submit handlers. */
type Fields = Record<string, HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

// One id per attempt, kept while the outcome is unknown (network error, gateway timeout)
// so a retry reaches the server as the same submission and cannot produce a second email.
const pendingIds: Record<string, string> = {};

async function submitLead(formData: Record<string, string>, setStatus: (s: Status) => void) {
  setStatus({ loading: true, success: false, error: '' });
  const page = window.location.pathname;
  const event = { form: formData.form, page, service: formData.service || '' };
  const submissionId = (pendingIds[formData.form] ??= crypto.randomUUID());
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, submissionId, ...getAttribution(), pageUrl: window.location.href }),
    });
    const json = await res.json();
    // The server gave a definite answer; the next attempt is a new submission.
    if (res.status < 500 || json.status) delete pendingIds[formData.form];
    // "accepted" = the mail provider or the webhook took the lead. Anything else is not a lead.
    if (res.ok && json.success && json.status === 'accepted' && json.ref) {
      const ids = [json.notification?.id, json.acknowledgement?.id].filter((id): id is string => typeof id === 'string');
      setStatus({
        loading: false,
        success: true,
        error: '',
        receipt: { ref: json.ref, acknowledgement: json.acknowledgement?.status || 'skipped', ids, notificationId: json.notification?.id },
      });
      track('lead_submit', event);
    } else {
      setStatus({
        loading: false,
        success: false,
        error: json.error || 'Something went wrong.',
        fallback: res.status >= 500 ? mailtoFallback(formData) : undefined,
      });
      track('lead_error', event);
    }
  } catch {
    setStatus({ loading: false, success: false, error: 'Network error. Please try again.', fallback: mailtoFallback(formData) });
    track('lead_error', event);
  }
}

// Hidden from people (and from assistive technology); bots that fill every field
// reveal themselves. The API drops any submission where it has a value. The name is
// deliberately meaningless so autofill and password managers do not fill it.
// It sits in a display:none wrapper: browsers and password managers skip fields that are
// not rendered, while form-filling bots that only read the HTML still fill it.
const Honeypot = () => (
  <div style={{ display: 'none' }} aria-hidden="true">
    <input type="text" name="pit_confirm_field" tabIndex={-1} autoComplete="off" defaultValue="" />
  </div>
);

const DELIVERY_PROBLEMS = ['bounced', 'failed', 'complained', 'suppressed', 'canceled'];

/** Shown once the server accepted the lead. Says "received", never "delivered", unless the
 *  mail provider itself later reports delivery; and says so plainly if it reports a problem. */
function Received({ receipt, form, children }: { receipt: Receipt; form: string; children: React.ReactNode }) {
  const [delivery, setDelivery] = useState<'unknown' | 'delivered' | 'problem'>('unknown');
  useEffect(() => {
    if (!receipt.notificationId) return;
    let stopped = false;
    const timers = [4000, 10000, 20000].map((ms) =>
      setTimeout(async () => {
        if (stopped) return;
        try {
          const res = await fetch(`/api/lead?delivery=${receipt.ids.join(',')}`);
          const json: { events?: { id: string; lastEvent: string | null }[] } = await res.json();
          const mine = json.events?.find((e) => e.id === receipt.notificationId)?.lastEvent;
          if (stopped || !mine) return;
          if (mine === 'delivered') setDelivery('delivered');
          else if (DELIVERY_PROBLEMS.includes(mine)) {
            stopped = true;
            setDelivery('problem');
            track('lead_delivery_failed', { form, page: window.location.pathname });
          }
        } catch {
          // Unknown stays unknown.
        }
      }, ms)
    );
    return () => { stopped = true; timers.forEach(clearTimeout); };
  }, [receipt, form]);

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }} role="status">
      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>&#10003;</div>
      <p style={{ color: '#22d3ee', fontWeight: '600', fontSize: '1.05rem', margin: '0 0 0.5rem' }}>Request received</p>
      <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 0.5rem' }}>{children}</p>
      <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0' }}>
        Reference: <strong style={{ color: '#e2e8f0' }}>{receipt.ref}</strong>
        {receipt.acknowledgement === 'accepted' && <>. We have sent you a confirmation email; if it does not arrive, keep this reference.</>}
        {receipt.acknowledgement === 'failed' && <>. We could not send you a confirmation email, so please keep this reference.</>}
      </p>
      {delivery === 'problem' && (
        <p role="alert" style={{ color: '#f87171', fontSize: '0.85rem', margin: '0.75rem 0 0' }}>
          Our mail system reported a problem delivering your request. Please email{' '}
          <a href={`mailto:info@peregrine-it.com?subject=${encodeURIComponent(`Project inquiry (${receipt.ref})`)}`} style={{ color: '#22d3ee', textDecoration: 'underline', display: 'inline' }}>info@peregrine-it.com</a>{' '}
          and quote the reference.
        </p>
      )}
    </div>
  );
}

/** `service` records which service or landing page the form sits on. */
export function StrategyCallForm({ service = '' }: { service?: string }) {
  const [formStatus, setFormStatus] = useState<Status>(idle);
  return (
    <>
    {formStatus.success && formStatus.receipt ? (
      <Received receipt={formStatus.receipt} form="strategy-call">An engineer will review it and reply within 1 business day.</Received>
    ) : (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const f = e.currentTarget as HTMLFormElement & Fields;
      submitLead({
        form: 'strategy-call',
        service,
        name: f.scName.value,
        email: f.scEmail.value,
        company: f.scCompany.value,
        projectType: f.scType.value,
        timeline: f.scTimeline.value,
        message: f.scMessage.value || 'Strategy call request',
        pit_confirm_field: f.pit_confirm_field.value,
      }, setFormStatus);
    }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input type="text" name="scName" aria-label="Your name" placeholder="Your name" required
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
      <input type="email" name="scEmail" aria-label="Work email" placeholder="Work email" required
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
      <input type="text" name="scCompany" aria-label="Company (optional)" placeholder="Company (optional)" autoComplete="organization"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
      <Honeypot />
      <select name="scType" aria-label="Project type" required defaultValue=""
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', appearance: 'none' as const, WebkitAppearance: 'none' as const }}>
        <option value="" disabled style={{ color: '#64748b' }}>Select project type...</option>
        <option value="new-build">New platform or product build</option>
        <option value="integration">Integration or automation</option>
        <option value="performance">Performance / infrastructure fix</option>
        <option value="other">Other / not sure yet</option>
      </select>
      <select name="scTimeline" aria-label="Expected timeline" required defaultValue=""
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', appearance: 'none' as const, WebkitAppearance: 'none' as const }}>
        <option value="" disabled style={{ color: '#64748b' }}>Expected timeline...</option>
        <option value="asap">ASAP (within 2 weeks)</option>
        <option value="1-2-months">1–2 months</option>
        <option value="2-6-months">2–6 months</option>
        <option value="exploring">Just exploring</option>
      </select>
      <textarea name="scMessage" aria-label="What you need" placeholder="Tell us briefly what you need" rows={2}
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', resize: 'vertical' as const }} />
      {formStatus.error && (
        <p role="alert" style={{ color: '#f87171', fontSize: '0.85rem', margin: '0', textAlign: 'center' }}>
          {formStatus.error}
          {formStatus.fallback && (
            <> <a href={formStatus.fallback} style={{ color: '#22d3ee', textDecoration: 'underline', display: 'inline' }}>Send it by email instead</a></>
          )}
        </p>
      )}
      <button type="submit" className="newsletter-btn" disabled={formStatus.loading}
        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.25rem', opacity: formStatus.loading ? 0.6 : 1 }}>
        {formStatus.loading ? 'Sending...' : 'Book a Strategy Call'}
      </button>
      <p style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', margin: '0' }}>
        We&apos;ll review your details and reach out within 1 business day.
      </p>
    </form>
    )}
    </>
  );
}

export function QuickProjectForm() {
  const [qpFormStatus, setQpFormStatus] = useState<Status>(idle);
  return (
    <>
    {qpFormStatus.success && qpFormStatus.receipt ? (
      <Received receipt={qpFormStatus.receipt} form="quick-project">We&apos;ll review your request and reply within 1 business day.</Received>
    ) : (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const f = e.currentTarget as HTMLFormElement & Fields;
      submitLead({
        form: 'quick-project',
        name: f.qpName.value,
        email: f.qpEmail.value,
        projectType: 'Quick Project Request',
        timeline: f.qpTimeline.value,
        message: f.qpNeed.value,
        pit_confirm_field: f.pit_confirm_field.value,
      }, setQpFormStatus);
    }} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <input type="text" name="qpName" aria-label="Your name" placeholder="Your name" required
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
      <input type="email" name="qpEmail" aria-label="Work email" placeholder="Work email" required
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%' }} />
      <Honeypot />
      <textarea name="qpNeed" aria-label="What you need help with" placeholder="What do you need help with?" rows={3} required
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', resize: 'vertical' as const }} />
      <select name="qpTimeline" aria-label="Desired timeline" required defaultValue=""
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.75rem', padding: '0.75rem 1rem', color: 'white', fontSize: '0.95rem', outline: 'none', width: '100%', appearance: 'none' as const, WebkitAppearance: 'none' as const }}>
        <option value="" disabled style={{ color: '#64748b' }}>Desired timeline...</option>
        <option value="asap">ASAP (within 2 weeks)</option>
        <option value="1-2-months">1–2 months</option>
        <option value="2-6-months">2–6 months</option>
        <option value="exploring">Just exploring</option>
      </select>
      {qpFormStatus.error && (
        <p role="alert" style={{ color: '#f87171', fontSize: '0.85rem', margin: '0', textAlign: 'center' }}>
          {qpFormStatus.error}
          {qpFormStatus.fallback && (
            <> <a href={qpFormStatus.fallback} style={{ color: '#22d3ee', textDecoration: 'underline', display: 'inline' }}>Send it by email instead</a></>
          )}
        </p>
      )}
      <button type="submit" className="newsletter-btn" disabled={qpFormStatus.loading}
        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.75rem', fontSize: '0.95rem', fontWeight: '600', marginTop: '0.25rem', opacity: qpFormStatus.loading ? 0.6 : 1 }}>
        {qpFormStatus.loading ? 'Sending...' : 'Send Request'}
      </button>
      <p style={{ color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center', margin: '0' }}>
        We&apos;ll review your request and reply within 1 business day.
      </p>
    </form>
    )}
    </>
  );
}
