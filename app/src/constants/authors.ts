/* Not re-exported from the index: these are email addresses, so only server code may import them. */
/**
 * Git only knows an author's name and email, not their GitHub handle. A
 * GitHub noreply email carries the handle, so those resolve on their own.
 * Anyone committing from a private email needs a line here (lowercase email
 * to handle); until then the card shows their name without a profile link.
 */
export const HANDLES_BY_EMAIL: Record<string, string> = {
  'nishkohli96@gmail.com': 'nishkohli96',
};
