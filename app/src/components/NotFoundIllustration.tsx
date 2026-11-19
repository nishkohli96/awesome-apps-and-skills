import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * public/not-found-illustration.svg, inlined so its colours follow the site's
 * light/dark variables (an <img> could only follow the OS setting) and its
 * text uses the site fonts. Read once at build time; the file is our own.
 */
const svg = readFileSync(
  path.join(process.cwd(), 'public', 'not-found-illustration.svg'),
  'utf8'
)
  .replace(/<metadata>[\s\S]*?<\/metadata>/, '')
  .replace(
    "font-family:'Instrument Serif'",
    "font-family:var(--font-instrument-serif),'Instrument Serif'"
  )
  .replace("'Geist Mono'", "var(--font-geist-mono),'Geist Mono'");

export function NotFoundIllustration() {
  return (
    <div
      className="w-full max-w-[480px] [&>svg]:h-auto [&>svg]:w-full"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
