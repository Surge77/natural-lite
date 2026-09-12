import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

export type IconBadgeTone = 'default' | 'onDark';
export type IconBadgeSize = 'sm' | 'md' | 'lg';

export interface IconBadgeProps {
  readonly icon: IconName;
  readonly size?: IconBadgeSize;
  readonly tone?: IconBadgeTone;
  readonly className?: string;
}

const RING: Record<IconBadgeSize, string> = {
  sm: 'size-11',
  md: 'size-14',
  lg: 'size-[4.5rem]',
};

const GLYPH: Record<IconBadgeSize, number> = { sm: 19, md: 26, lg: 30 };

/**
 * The thin-ruled circle that frames a trust or value icon. Used in the hero
 * badge row, the trust band and the brand-story value list.
 *
 * Decorative on its own — the caption beside it carries the meaning, so the
 * icon inside stays hidden from assistive technology.
 */
export function IconBadge({ icon, size = 'md', tone = 'default', className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full border',
        tone === 'onDark'
          ? 'border-nl-cream-50/30 text-nl-cream-50'
          : 'border-nl-gold-500/45 bg-white text-nl-green-800',
        RING[size],
        className,
      )}
    >
      <Icon name={icon} size={GLYPH[size]} />
    </span>
  );
}
