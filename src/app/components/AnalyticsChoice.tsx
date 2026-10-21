'use client';
import { analyticsConfigured, chooseAnalytics, useConsent } from './Tracking';

/** Shows this browser's analytics choice and lets the visitor change or withdraw it. */
export default function AnalyticsChoice() {
  const consent = useConsent();
  if (!analyticsConfigured) return null;
  const label = consent === 'granted' ? 'accepted' : consent === 'denied' ? 'declined' : 'not made yet';
  return (
    <div className="analytics-choice" role="group" aria-label="Analytics cookies choice">
      <p>Your analytics choice in this browser: <strong>{label}</strong>.</p>
      <div className="consent-bar-actions">
        {consent !== 'denied' && (
          <button type="button" onClick={() => chooseAnalytics('denied')}>
            {consent === 'granted' ? 'Withdraw consent' : 'Decline'}
          </button>
        )}
        {consent !== 'granted' && (
          <button type="button" className="consent-accept" onClick={() => chooseAnalytics('granted')}>Accept</button>
        )}
      </div>
    </div>
  );
}
