import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { Appbar } from '@/components/Appbar';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';
import { SITE_NAME } from '@/lib/constants';
import { getCategories, getTools } from '@/lib/data';
import { SITE_URL } from '@/lib/site';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/logo.svg' },
  title: {
    template: `%s | ${SITE_NAME}`,
    default: `${SITE_NAME}: a human-curated index of AI tools`
  },
  description:
    'Claude skills, MCP servers, apps and web tools, picked by a techie and linked straight to the source.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#131210' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} relative min-w-0`}
      >
        <Providers tools={getTools()} categories={getCategories()}>
          <a
            href="#main"
            className="absolute top-[-48px] left-4 z-50 rounded-[8px] bg-btn px-3.5 py-2.5 !text-btn-text focus:top-3"
          >
            Skip to content
          </a>
          <Appbar />
          {children}
          <Footer categories={getCategories()} />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
