import Image from 'next/image';

/** Site mark, copied from assets/logo.svg into public/. The name is written next to it. */
export function Logo({ size = 28 }: { size?: number }) {
  return <Image src="/logo.svg" alt="" width={size} height={size} unoptimized priority className="shrink-0" />;
}
