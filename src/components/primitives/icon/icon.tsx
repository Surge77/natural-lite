import type { SVGProps } from 'react';

import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  readonly name: IconName;
  /** Rendered size in px. Icons are drawn on a 24px grid. */
  readonly size?: number;
  /** Accessible name. Omit for decorative icons — they are hidden instead. */
  readonly title?: string;
}

/**
 * Renders one symbol from the sprite mounted at the app root. Inherits colour
 * via `currentColor`, so a single definition restyles per context.
 *
 * Stroke presentation lives here rather than on the sprite because a <use>
 * instance inherits from the referencing element's ancestors, not the symbol's.
 */
export function Icon({ name, size = 24, title, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('shrink-0', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <use href={`#nl-${name}`} />
    </svg>
  );
}
