import { Icon } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { IconLabel } from '@/types';

export interface ValueItemProps {
  readonly value: IconLabel;
  readonly className?: string;
}

/** An icon beside its label, used for the four brand-story values. */
export function ValueItem({ value, className }: ValueItemProps) {
  return (
    <li className={cn('flex items-center gap-2.5', className)}>
      <Icon name={value.icon} size={24} className="shrink-0 text-nl-green-600" />
      <span className="text-caption leading-tight text-nl-ink-700">{value.label}</span>
    </li>
  );
}
