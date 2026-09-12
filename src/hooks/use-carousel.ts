import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Drives a CSS scroll-snap strip.
 *
 * The strip itself is native overflow scrolling, so touch swipe, momentum and
 * keyboard scrolling work with no JavaScript. This only adds the arrow controls
 * and reports which slide is active, which keeps the carousel tiny and means it
 * degrades to a plain scroller if scripting fails.
 */
export function useCarousel<T extends HTMLElement = HTMLDivElement>(itemCount: number) {
  const trackRef = useRef<T>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const clamped = Math.max(0, Math.min(index, itemCount - 1));
      const item = track.children[clamped] as HTMLElement | undefined;
      if (!item) return;

      track.scrollTo({ left: item.offsetLeft - track.offsetLeft, behavior: 'smooth' });
    },
    [itemCount],
  );

  const next = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);
  const previous = useCallback(
    () => scrollToIndex(activeIndex - 1),
    [activeIndex, scrollToIndex],
  );

  // Derive the active slide from scroll position so arrows, dots and swipe all
  // stay in sync regardless of which one moved the strip.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const items = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let smallestDistance = Number.POSITIVE_INFINITY;

        items.forEach((item, index) => {
          const distance = Math.abs(item.offsetLeft - track.offsetLeft + item.clientWidth / 2 - center);
          if (distance < smallestDistance) {
            smallestDistance = distance;
            closest = index;
          }
        });

        setActiveIndex(closest);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return {
    trackRef,
    activeIndex,
    next,
    previous,
    scrollToIndex,
    canGoPrevious: activeIndex > 0,
    canGoNext: activeIndex < itemCount - 1,
  } as const;
}
