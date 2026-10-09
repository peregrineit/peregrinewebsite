/**
 * Google Apps Script receiver for LEAD_WEBHOOK_URL: appends every website lead to a
 * Google Sheet, so there is a durable record that does not depend on email delivery.
 * Setup steps: docs/seo/LEAD-DELIVERY.md. Runs in the owner's Google Workspace; free.
 * Not deployed by this repo.
 */
var COLUMNS = ['receivedAt', 'ref', 'name', 'email', 'company', 'form', 'projectType', 'timeline',
  'service', 'message', 'pageUrl', 'landingPage', 'referrer', 'utm', 'source',
  // Added in sprint 2. New columns go at the end so an existing sheet keeps its layout;
  // add these headings to row 1 of a sheet that already has rows.
  'lastTouchAt', 'firstLandingPage', 'firstReferrer', 'firstUtm', 'firstTouchAt', 'gclid', 'msclkid', 'fbclid',
  'ctaLocation', 'pagesViewed', 'priority', 'priorityReasons'];

function doPost(e) {
  var lead = JSON.parse(e.postData.contents);
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sheet.getLastRow() === 0) sheet.appendRow(COLUMNS);
  sheet.appendRow(COLUMNS.map(function (key) {
    var value = String(lead[key] == null ? '' : lead[key]);
    // Stop a cell that starts with = + - @ from being read as a formula.
    return /^[=+\-@]/.test(value) ? "'" + value : value;
  }));
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
