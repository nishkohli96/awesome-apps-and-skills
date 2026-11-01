'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { DataProvider } from '@/lib/data-context';
import type { Category, Tool } from '@/lib/types';

interface ProvidersProps {
  tools: Tool[];
  categories: Category[];
  children: ReactNode;
}

export function Providers({ tools, categories, children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <DataProvider tools={tools} categories={categories}>
        {children}
      </DataProvider>
    </ThemeProvider>
  );
}
