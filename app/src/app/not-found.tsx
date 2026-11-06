import { NotFoundIllustration } from '@/components/NotFoundIllustration';
import { NotFoundSearch } from '@/components/NotFoundSearch';

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex max-w-[1000px] flex-col items-center gap-[18px] px-[clamp(24px,3vw,32px)] py-24 text-center"
    >
      <NotFoundIllustration />
      <h1 className="m-0 text-[26px] font-semibold tracking-[-0.02em]">
        This shelf doesn&apos;t exist.
      </h1>
      <p className="text-ink-2 m-0 text-[15px]">
        The link may be old, or a category was renamed. Search instead:
      </p>
      <NotFoundSearch />
    </main>
  );
}
