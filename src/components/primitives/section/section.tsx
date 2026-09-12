import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

export type SectionTone = 'cream' | 'creamWarm' | 'soft' | 'white' | 'green' | 'maroon';

export interface SectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  /** id of the heading that names this landmark. */
  readonly labelledBy: string;
  readonly tone?: SectionTone;
  readonly className?: string;
  /** Bands with their own vertical rhythm (the impact band) opt out. */
  readonly padded?: boolean;
  readonly spacing?: 'compact' | 'standard' | 'spacious';
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
  id,
  labelledBy,
  tone = 'cream',
  className,
  padded = true,
  spacing = 'standard',
}: SectionProps) {
  const spacingClass = {
    compact: 'py-7 md:py-9',
    standard: 'py-10 md:py-14',
    spacious: 'py-12 md:py-18',
  }[spacing];

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(TONES[tone], 'scroll-mt-24', padded && spacingClass, className)}
    >
      {children}
    </section>
  );
}
