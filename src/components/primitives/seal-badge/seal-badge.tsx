import { cn } from '@/lib/cn';

export interface SealBadgeProps {
  readonly size?: number;
  readonly className?: string;
  /** Announced to assistive tech; the curved text is not readable as text. */
  readonly label?: string;
}

const TOP_ARC = 'nl-seal-arc-top';
const BOTTOM_ARC = 'nl-seal-arc-bottom';

/**
 * The "100% NATURAL" seal, drawn to match the mark in the comp: a thin gold
 * outer ring with small sprigs, "100%" and "NATURAL" arced in bold dark green
 * around a cream inner disc, and two broad leaves rising from a stem beneath a
 * twin-lobed sprout.
 *
 * Vector rather than an extracted bitmap — the comp is only 759px wide, so a
 * crop of this mark would be about fifty pixels across. Drawn, it is exact at
 * any size.
 */
export function SealBadge({ size = 96, className, label = '100% Natural' }: SealBadgeProps) {
  return (
    <div
      className={cn('relative inline-flex shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" focusable="false">
        <defs>
          {/* Both arcs sit in the band between the rings. The lower one sweeps
              the other way so its text stays upright rather than inverted. */}
          <path id={TOP_ARC} d="M16 60a44 44 0 0 1 88 0" fill="none" />
          <path id={BOTTOM_ARC} d="M10 60a50 50 0 0 0 100 0" fill="none" />
        </defs>

        <circle cx="60" cy="60" r="57" fill="none" stroke="var(--color-nl-gold-500)" strokeWidth="1.3" />
        <circle cx="60" cy="60" r="41" fill="#f2eeea" stroke="var(--color-nl-gold-500)" strokeWidth="1.1" />

        {/* Sprigs and beads punctuating the outer band, left and right. */}
        <g stroke="var(--color-nl-gold-500)" strokeWidth="1" strokeLinecap="round" fill="none">
          <path d="M20 44c3.4-1.2 6.2-3.4 8-6.4M22.6 49.6c2.2.6 4.4.5 6.4-.2" />
          <path d="M100 44c-3.4-1.2-6.2-3.4-8-6.4M97.4 49.6c-2.2.6-4.4.5-6.4-.2" />
          <circle cx="13.5" cy="62" r="1.2" fill="var(--color-nl-gold-500)" stroke="none" />
          <circle cx="106.5" cy="62" r="1.2" fill="var(--color-nl-gold-500)" stroke="none" />
        </g>

        <g fill="var(--color-nl-green-900)" fontFamily="var(--font-sans)" fontWeight="700">
          <text fontSize="18">
            <textPath href={`#${TOP_ARC}`} startOffset="50%" textAnchor="middle">
              100%
            </textPath>
          </text>
          <text fontSize="13" letterSpacing="1">
            <textPath href={`#${BOTTOM_ARC}`} startOffset="50%" textAnchor="middle">
              NATURAL
            </textPath>
          </text>
        </g>

        {/* Twin-lobed sprout above two broad leaves on a slender stem. */}
        <g fill="var(--color-nl-green-800)">
          <rect x="52" y="31" width="7" height="17" rx="3.5" />
          <rect x="61" y="31" width="7" height="17" rx="3.5" />
        </g>

        <path d="M60 84C46 81 36 70 33.5 55c14.5 0 24 11 26.5 29z" fill="var(--color-nl-green-900)" />
        <path d="M60 84c14-3 24-14 26.5-29-14.5 0-24 11-26.5 29z" fill="var(--color-nl-green-900)" />

        {/* Light veins, as on the comp's leaves. */}
        <g
          stroke="var(--color-nl-cream-50)"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.75"
          fill="none"
        >
          <path d="M57.5 80C52 72 46 65 38 59" />
          <path d="M62.5 80c5.5-8 11.5-15 19.5-21" />
        </g>

        <path
          d="M60 86V48"
          stroke="var(--color-nl-green-900)"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}
