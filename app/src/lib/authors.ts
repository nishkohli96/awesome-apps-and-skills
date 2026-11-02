/**
 * Git only knows an author's name and email, not their GitHub handle. A
 * GitHub noreply email carries the handle, so those resolve on their own.
 * Anyone committing from a private email needs a line here (lowercase email
 * to handle); until then the card shows their name without a profile link.
 */
const HANDLES_BY_EMAIL: Record<string, string> = {
  'nishkohli96@gmail.com': 'nishkohli96',
};

const NOREPLY = /^(?:\d+\+)?([a-z\d](?:[a-z\d-]*[a-z\d])?)@users\.noreply\.github\.com$/i;

export function resolveGithubHandle(email: string): string | null {
  const trimmed = email.trim();
  return HANDLES_BY_EMAIL[trimmed.toLowerCase()] ?? NOREPLY.exec(trimmed)?.[1] ?? null;
}
