import type { ReactNode } from 'react';

import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/cn';

export interface MarqueeProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly durationSeconds?: number;
}

/**
 * Continuous horizontal scroll for content too wide to fit on a phone.
 *
 * The track is duplicated so the loop has no visible seam; the copy is hidden
 * from assistive technology so nothing is announced twice. When the visitor
 * prefers reduced motion the animation is dropped entirely and the row becomes
 * a plain swipeable strip.
 */
export function Marquee({ children, className, durationSeconds = 24 }: MarqueeProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn('snap-strip gap-6', className)}>{children}</div>;
  }

  return (
    <div className={cn('group relative flex overflow-hidden', className)}>
      <div
        className="flex shrink-0 animate-[nl-marquee_var(--marquee-duration)_linear_infinite] gap-6 pr-6 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className="flex shrink-0 animate-[nl-marquee_var(--marquee-duration)_linear_infinite] gap-6 pr-6 group-hover:[animation-play-state:paused]"
        style={{ '--marquee-duration': `${durationSeconds}s` } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
