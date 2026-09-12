import { cn } from '@/lib/cn';

export interface OrnamentDividerProps {
  readonly className?: string;
  /** Gold on cream by default; `onDark` switches to the maroon band treatment. */
  readonly tone?: 'default' | 'onDark';
  readonly width?: number;
}

/**
 * The small gold rule with a centre diamond that sits under several headings.
 * Purely decorative, so it is hidden from assistive technology.
 */
export function OrnamentDivider({
  className,
  tone = 'default',
  width = 96,
}: OrnamentDividerProps) {
  const stroke = tone === 'onDark' ? 'var(--color-nl-gold-500)' : 'var(--color-nl-gold-500)';
  return (
    <svg
      width={width}
      height={10}
      viewBox="0 0 96 10"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <path d="M0 5h37M59 5h37" stroke={stroke} strokeWidth={1} opacity={0.75} />
      <path d="M48 1.2 51.8 5 48 8.8 44.2 5z" stroke={stroke} strokeWidth={1} />
    </svg>
  );
}
