import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly icon: IconName;
  /** Required: an icon-only control has no visible text to name it. */
  readonly label: string;
  readonly iconSize?: number;
  /** Rendered alongside the icon, e.g. the cart's item-count bubble. */
  readonly children?: ReactNode;
}

/**
 * Icon-only control. Always 44x44 so it meets the comfortable touch target even
 * where the comp draws the glyph much smaller.
 */
export function IconButton({
  icon,
  label,
  iconSize = 20,
  children,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'relative inline-flex size-11 items-center justify-center rounded-full',
        'transition-[color,background-color,transform] duration-(--duration-base) ease-(--ease-brand)',
        'hover:bg-nl-green-900/8 active:scale-[0.96] motion-reduce:transform-none',
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={iconSize} />
      {children}
    </button>
  );
}
