import { useCountUp } from '@/hooks/use-count-up';

export interface CountUpProps {
  readonly value: number;
  /** Rendered immediately after the number, e.g. "+". */
  readonly suffix?: string;
  /** Counting starts when this turns true. */
  readonly isActive: boolean;
  readonly className?: string;
}

const formatter = new Intl.NumberFormat('en-IN');

/**
 * An animated figure for the impact band.
 *
 * The ticking number is hidden from assistive technology and the final value is
 * exposed alongside it — otherwise a screen reader announces every frame.
 */
export function CountUp({ value, suffix = '', isActive, className }: CountUpProps) {
  const current = useCountUp(value, { isActive });

  return (
    <span className={className}>
      <span aria-hidden="true">
        {formatter.format(current)}
        {suffix}
      </span>
      <span className="sr-only">
        {formatter.format(value)}
        {suffix}
      </span>
    </span>
  );
}
