import { useEffect, useRef, useState } from 'react';

import { STICKY_HEADER_OFFSET } from '@/lib/constants';

/**
 * True once the page has scrolled past the point where the header should pin
 * and condense.
 *
 * Uses a zero-height sentinel plus IntersectionObserver instead of a scroll
 * listener, so nothing runs on the main thread between state changes.
 */
export function useStickyHeader() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isCondensed, setIsCondensed] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsCondensed(entry ? !entry.isIntersecting : false),
      { rootMargin: `-${STICKY_HEADER_OFFSET}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, isCondensed } as const;
}
