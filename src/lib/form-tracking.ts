// Form abandonment: who started a lead form and left without sending it.
//
// Two events, each at most once per form per page view, carrying the form name and the
// page path and nothing else. Field names and values are never read.
//   lead_form_start    first input in a lead form
//   lead_form_abandon  the page is hidden or unloaded while a started form is unsent
//
// "Hidden" includes switching tabs, so a visitor who comes back and submits produces
// lead_form_abandon followed by lead_submit. Count abandonment as abandon minus those.
//
// No imports: unit-tested with `node --experimental-strip-types scripts/test_lead_client.mjs`.

export type FormEvent = { event: 'lead_form_start' | 'lead_form_abandon'; form: string; page: string };

/** The state machine, with the event sink passed in so it can be tested without a browser. */
export function createFormTracker(emit: (e: FormEvent) => void) {
  // Key: form + page. Value: how far that form got on that page view.
  const seen = new Map<string, { form: string; page: string; state: 'started' | 'abandoned' | 'submitted' }>();
  return {
    /** The visitor typed in or changed a field of `form` while on `page`. */
    input(form: string, page: string) {
      const key = `${form}|${page}`;
      if (!form || seen.has(key)) return;
      seen.set(key, { form, page, state: 'started' });
      emit({ event: 'lead_form_start', form, page });
    },
    /** The server accepted the form: it can no longer be abandoned. */
    submitted(form: string) {
      for (const entry of seen.values()) if (entry.form === form) entry.state = 'submitted';
    },
    /** The page was hidden or is being unloaded. */
    hidden() {
      for (const entry of seen.values()) {
        if (entry.state !== 'started') continue;
        entry.state = 'abandoned';
        emit({ event: 'lead_form_abandon', form: entry.form, page: entry.page });
      }
    },
  };
}

export type FormTracker = ReturnType<typeof createFormTracker>;
