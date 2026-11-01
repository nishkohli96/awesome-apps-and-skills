import { NotFoundSearch } from '@/components/NotFoundSearch';

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex max-w-[1000px] flex-col gap-[18px] px-[clamp(16px,3vw,24px)] py-24">
      <span className="font-serif text-[120px] leading-[0.85] text-accent">404</span>
      <h1 className="m-0 text-[26px] font-semibold tracking-[-0.02em]">This shelf doesn’t exist.</h1>
      <p className="m-0 text-[15px] text-ink-2">
        The link may be old, or a category was renamed. Search instead:
      </p>
      <NotFoundSearch />
    </main>
  );
}
