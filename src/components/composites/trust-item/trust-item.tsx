import { IconBadge, type IconBadgeSize, type IconBadgeTone } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { IconLabel } from '@/types';

export interface TrustItemProps {
  readonly item: IconLabel;
  readonly size?: IconBadgeSize;
  readonly tone?: IconBadgeTone;
  readonly className?: string;
}

/**
 * A ringed icon above a short caption. Repeated in the hero badge row and the
 * "Trust in Every Spoon" band, which differ only in badge size.
 */
export function TrustItem({ item, size = 'md', tone = 'default', className }: TrustItemProps) {
  return (
    <li className={cn('flex flex-col items-center gap-2 text-center', className)}>
      <IconBadge icon={item.icon} size={size} tone={tone} />
      <span
        className={cn(
          'max-w-[7.5rem] text-caption leading-tight',
          tone === 'onDark' ? 'text-nl-cream-50/90' : 'text-nl-ink-700',
        )}
      >
        {item.label}
      </span>
    </li>
  );
}
