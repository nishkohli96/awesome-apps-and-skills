interface IconProps {
  d: string;
  size?: number;
  strokeWidth?: number;
  filled?: boolean;
  className?: string;
}

export function Icon({
  d,
  size = 16,
  strokeWidth = 1.75,
  filled = false,
  className
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={d} />
    </svg>
  );
}
