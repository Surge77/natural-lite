import { useEffect, useRef, useState } from 'react';

import { REVEAL_ROOT_MARGIN, REVEAL_THRESHOLD } from '@/lib/constants';

export interface RevealOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  /** Skip the animation entirely and report visible from the first render. */
  readonly disabled?: boolean;
}

/**
 * Reports when an element first enters the viewport, then stops observing.
 *
 * `isHidden` — not `isVisible` — is what callers style from, and it only ever
 * becomes true after the observer is actually attached. Content is therefore
 * visible by default and the animation is a pure enhancement: if scripting is
 * unavailable or the observer never fires, the page still reads correctly
 * rather than silently rendering blank.
 *
 * One observer per element, disconnected on first hit, because a scroll
 * listener would run on the main thread for the whole of a very long page.
 */
export function useRevealOnScroll<T extends HTMLElement>(options: RevealOptions = {}) {
  const {
    threshold = REVEAL_THRESHOLD,
    rootMargin = REVEAL_ROOT_MARGIN,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isArmed, setIsArmed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (disabled || !element) {
      setIsVisible(true);
      return;
    }

    // Anything already on screen at mount is revealed without animating in.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    setIsArmed(true);

    return () => observer.disconnect();
  }, [disabled, rootMargin, threshold]);

  return { ref, isVisible, isHidden: isArmed && !isVisible } as const;
}
