import { Suspense } from 'react';
import type { Metadata } from 'next';
import { SearchResults } from '@/components/SearchResults';

export const metadata: Metadata = { title: 'Search' };

export default function SearchPage() {
  return (
    <main
      id="main"
      className="mx-auto max-w-[1200px] px-[clamp(24px,3vw,32px)] pt-10 pb-24"
    >
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
