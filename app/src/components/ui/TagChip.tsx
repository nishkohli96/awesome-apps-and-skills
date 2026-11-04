import Link from 'next/link';

const base
  = 'inline-flex h-[26px] items-center rounded-[6px] border px-2 font-mono text-[12px] leading-none font-medium';
const idle = 'border-border bg-surface text-ink-2 hover:border-border-strong hover:text-ink';
const pressed = 'border-accent bg-accent-soft text-accent-ink';

interface TagChipProps {
  tag: string;
  /** Renders a toggle button instead of a link to the tag page. */
  onToggle?: () => void;
  pressed?: boolean;
}

export function TagChip({ tag, onToggle, pressed: isPressed = false }: TagChipProps) {
  if (onToggle) {
    return (
      <button
        type="button"
        aria-pressed={isPressed}
        onClick={onToggle}
        className={`${base} ${isPressed ? pressed : idle}`}
      >
        {tag}
      </button>
    );
  }
  return (
    <Link
      href={`/tag/${encodeURIComponent(tag)}`}
      className={`${base} ${idle} no-underline`}
    >
      {tag}
    </Link>
  );
}
