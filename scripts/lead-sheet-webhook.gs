/**
 * Google Apps Script receiver for LEAD_WEBHOOK_URL: appends every website lead to a
 * Google Sheet, so there is a durable record that does not depend on email delivery.
 * Setup steps: docs/seo/LEAD-DELIVERY.md. Runs in the owner's Google Workspace; free.
 * Not deployed by this repo.
 *
 * Signature: when LEAD_WEBHOOK_SECRET is set, the site signs every request with an
 * X-Peregrine-Signature header (HMAC-SHA256 of the raw body). THIS RECEIVER CANNOT
 * VERIFY IT: an Apps Script web app's doPost(e) is given the body and the query string
 * but not the request headers. So with a Sheet, the only protection is that the web app
 * URL is long and secret; treat it like a password and redeploy to change it if it leaks.
 * A receiver that can read headers (a Node service, most automation tools) should verify
 * the signature: see docs/growth/lead/verify-signature.mjs.
 *
 * Alerts: using MailApp needs the "send email as you" permission; Apps Script asks for it
 * the next time the script is deployed after this code is pasted in (Deploy > Manage
 * deployments > edit > New version).
 *
 * Retries: the site retries once after a quick 5xx or connection error and sends the same
 * `ref` both times. Apps Script cannot read the Idempotency-Key header either, so this
 * script skips a `ref` that is already in the sheet's last rows.
 */
var COLUMNS = ['receivedAt', 'ref', 'name', 'email', 'company', 'form', 'projectType', 'timeline',
  'service', 'message', 'pageUrl', 'landingPage', 'referrer', 'utm', 'source',
  // Added in sprint 2. New columns go at the end so an existing sheet keeps its layout;
  // add these headings to row 1 of a sheet that already has rows.
  'lastTouchAt', 'firstLandingPage', 'firstReferrer', 'firstUtm', 'firstTouchAt', 'gclid', 'msclkid', 'fbclid',
  'ctaLocation', 'pagesViewed', 'priority', 'priorityReasons'];

function doPost(e) {
  var lead = JSON.parse(e.postData.contents);
  // Owner alert (LEAD_ALERT_WEBHOOK_URL set to this same web app URL): the site accepted a
  // lead through this sheet but its notification email failed. Mail the sheet's owner
  // through Google, which does not depend on the mail provider that just failed. The
  // alert has the reference and the reason only; the lead itself is the row with that ref.
  if (lead.event === 'lead_notification_failed') {
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(),
      'Website lead ' + lead.ref + ': notification email failed',
      'A website lead was accepted but the notification email could not be sent.\n\n' +
      'Reference: ' + lead.ref + '\nReason: ' + lead.reason + '\nHeld by: ' + lead.heldBy + '\nPriority: ' + lead.priority +
      '\nReceived: ' + lead.receivedAt + '\n\nFind the row with this reference in the "Website leads" sheet and reply to the lead from there.');
    return json({ ok: true, alerted: true });
  }
  if (lead.event) return json({ ok: true, ignored: true });   // an event this script does not know: never a row
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
  if (alreadyRecorded(sheet, lead.ref)) return json({ ok: true, duplicate: true });
  sheet.appendRow(COLUMNS.map(function (key) {
    var value = String(lead[key] == null ? '' : lead[key]);
    // Stop a cell that starts with = + - @ from being read as a formula.
    return /^[=+\-@]/.test(value) ? "'" + value : value;
  }));
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** True when `ref` is among the last 20 rows (a retry of the same lead). */
function alreadyRecorded(sheet, ref) {
  var last = sheet.getLastRow();
  if (!ref || last < 2) return false;
  var count = Math.min(20, last - 1);
  var refs = sheet.getRange(last - count + 1, COLUMNS.indexOf('ref') + 1, count, 1).getValues();
  return refs.some(function (row) { return String(row[0]) === String(ref); });
}
