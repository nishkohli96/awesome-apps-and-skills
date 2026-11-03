import { TYPE_META } from '@/lib/constants';
import type { ToolType } from '@/types';
import { Icon } from './Icon';

interface TypeBadgeProps {
  type: ToolType;
  /** Square icon-only badge of this many px (search rows, type strip). */
  box?: number;
}

export function TypeBadge({ type, box }: TypeBadgeProps) {
  const icon = TYPE_META[type].icon;
  if (box) {
    return (
      <span
        className={`tb tb-${type} shrink-0 justify-center !p-0`}
        style={{ width: box, height: box, borderRadius: box >= 32 ? 8 : 6 }}
        aria-hidden="true"
      >
        <Icon d={icon} size={box >= 32 ? 15 : 14} strokeWidth={box >= 32 ? 1.75 : 2} />
      </span>
    );
  }
  return (
    <span className={`tb tb-${type}`}>
      <Icon d={icon} size={12} strokeWidth={2} />
      {type}
    </span>
  );
}
