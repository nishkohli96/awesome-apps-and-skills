import { HANDLES_BY_EMAIL } from '@/constants/authors';

const NOREPLY = /^(?:\d+\+)?([a-z\d](?:[a-z\d-]*[a-z\d])?)@users\.noreply\.github\.com$/i;

export function resolveGithubHandle(email: string): string | null {
  const trimmed = email.trim();
  return HANDLES_BY_EMAIL[trimmed.toLowerCase()] ?? NOREPLY.exec(trimmed)?.[1] ?? null;
}
