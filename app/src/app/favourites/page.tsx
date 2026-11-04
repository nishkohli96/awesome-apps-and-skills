import type { Metadata } from 'next';
import { FavouritesList } from '@/components/FavouritesList';

export const metadata: Metadata = { title: 'Favourites' };

export default function FavouritesPage() {
  return (
    <main
      id="main"
      className="mx-auto max-w-[1200px] px-[clamp(16px,3vw,24px)] pt-12 pb-24"
    >
      <FavouritesList />
    </main>
  );
}
