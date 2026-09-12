import { useEffect, useRef, useState } from 'react';

import { useReducedMotion } from './use-reduced-motion';

const DEFAULT_DURATION = 1600;

/** Decelerating curve — fast start, gentle settle. Matches the brand easing. */
const easeOut = (t: number) => 1 - (1 - t) ** 3;

export interface CountUpOptions {
  readonly durationMs?: number;
  /** Counting starts when this flips true, usually from useRevealOnScroll. */
  readonly isActive: boolean;
}

/**
 * Animates 0 -> target once, the first time `isActive` turns true.
 *
 * The resting value is the target, not zero: a figure that only becomes correct
 * after an observer fires would report "0+" in print, in screenshots, and
 * anywhere the animation never runs. Zero is set only in the same tick the
 * animation starts, so it is never painted on its own.
 *
 * Callers must also render the final value in the accessibility tree, since a
 * ticking number is noise to a screen reader.
 */
export function useCountUp(target: number, { durationMs = DEFAULT_DURATION, isActive }: CountUpOptions) {
  const prefersReducedMotion = useReducedMotion();
  const [value, setValue] = useState(target);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isActive || hasRun.current) return;
    hasRun.current = true;

    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    setValue(0);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      setValue(Math.round(easeOut(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [durationMs, isActive, prefersReducedMotion, target]);

  return value;
}
