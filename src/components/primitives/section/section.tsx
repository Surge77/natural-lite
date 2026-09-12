import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type SectionTone = 'cream' | 'creamWarm' | 'soft' | 'white' | 'green' | 'maroon';

export interface SectionProps {
  readonly children: ReactNode;
  /** id of the heading that names this landmark. */
  readonly labelledBy: string;
  readonly tone?: SectionTone;
  readonly className?: string;
  /** Bands with their own vertical rhythm (the impact band) opt out. */
  readonly padded?: boolean;
}

const TONES: Record<SectionTone, string> = {
  cream: 'bg-nl-cream-50 text-nl-ink-900',
  creamWarm: 'bg-nl-cream-200 text-nl-ink-900',
  soft: 'bg-nl-cream-100 text-nl-ink-900',
  white: 'bg-white text-nl-ink-900',
  green: 'bg-nl-green-900 text-nl-cream-50',
  maroon: 'bg-nl-maroon-900 text-nl-cream-50',
};

/**
 * One band of the page. Owns the landmark, the background tone and the vertical
 * rhythm so no section re-implements them.
 *
 * Deliberately has no entrance animation: the reference comp has none, and a
 * fade keyed to scroll position leaves bands transparent anywhere the timeline
 * does not advance — print, screenshots, and any non-scrolling render.
 */
export function Section({
  children,
  labelledBy,
  tone = 'cream',
  className,
  padded = true,
}: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(TONES[tone], padded && 'py-6 md:py-7', className)}
    >
      {children}
    </section>
  );
}
