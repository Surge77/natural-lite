import { useSyncExternalStore } from 'react';

/**
 * Subscribes to a media query.
 *
 * useSyncExternalStore rather than useState+useEffect so the first render
 * already has the correct value — avoids a flash of the wrong layout.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);
      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
