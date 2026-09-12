import { cn } from '@/lib/cn';
import { BRAND } from '@/data';

export type LogoTone = 'default' | 'onDark';

export interface LogoProps {
  readonly tone?: LogoTone;
  /** Drops the tagline — used by the condensed sticky header. */
  readonly compact?: boolean;
  /**
   * Breaks the tagline onto two lines, as the footer lockup does in the comp.
   * The header keeps it on one.
   */
  readonly stackedTagline?: boolean;
  readonly className?: string;
}

/** Two leaves rising from a stem, centred above the wordmark. */
function Sprout({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 18" className={className} aria-hidden="true" focusable="false">
      <path
        d="M12 17.5V7.5"
        stroke="var(--color-nl-leaf-700)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M12.2 9.2c.2-4.6 2.8-7.7 6.6-8.4.5 4.6-2.1 7.9-6.6 8.4z"
        fill="var(--color-nl-leaf-500)"
      />
      <path
        d="M11.6 11.4C8.5 10.6 6.4 7.9 6 4.2c3.5.8 5.6 3.5 5.6 7.2z"
        fill="var(--color-nl-leaf-700)"
      />
    </svg>
  );
}

/**
 * The Natural Lite lockup, as drawn in the comp: a green sprout above
 * "NATURAL LITE" on a single line — "NATURAL" in the primary tone, "LITE" in
 * terracotta — with the ruled tagline beneath.
 *
 * Markup rather than an exported image, so it stays crisp at any size and
 * re-tints for the cream header and the dark footer from one source. If the
 * client supplies the official logo SVG, only this file changes.
 */
export function Logo({
  tone = 'default',
  compact = false,
  stackedTagline = false,
  className,
}: LogoProps) {
  const isDark = tone === 'onDark';
  const taglineParts = stackedTagline
    ? BRAND.tagline.split(' ').reduce<string[]>(
        (lines, word) => {
          const last = lines.length - 1;
          lines[last] = lines[last] ? `${lines[last]} ${word}` : word;
          if (word.endsWith('.') && lines.length === 1) lines.push('');
          return lines;
        },
        [''],
      )
    : [BRAND.tagline];

  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <Sprout className="h-4 w-auto md:h-5" />

      <span className="mt-0.5 font-display text-[1.2rem] font-semibold tracking-[0.045em] md:text-[1.9rem]">
        <span className={isDark ? 'text-nl-cream-50' : 'text-nl-green-900'}>NATURAL</span>{' '}
        <span className={isDark ? 'text-nl-rust-400' : 'text-nl-rust-600'}>LITE</span>
      </span>

      {compact ? null : (
        <span
          className={cn(
            'mt-0.5 text-center text-[0.5rem] leading-[1.5] font-medium tracking-[0.14em] uppercase md:text-[0.6rem]',
            isDark ? 'text-nl-cream-50/75' : 'text-nl-ink-500',
          )}
        >
          {taglineParts.filter(Boolean).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
