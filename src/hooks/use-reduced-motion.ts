import { useMediaQuery } from './use-media-query';

/**
 * True when the visitor has asked their OS to reduce motion.
 *
 * CSS handles most of this via `motion-reduce:`; this hook covers the cases CSS
 * cannot reach — skipping a count-up, or not auto-scrolling a marquee.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
