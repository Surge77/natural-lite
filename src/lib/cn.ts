import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The type scale from tokens.css. tailwind-merge has to be told these are font
 * sizes: without it, `text-caption` looks like a text *colour*, so pairing it
 * with `text-nl-cream-50` silently drops the colour and renders invisible text.
 */
const FONT_SIZES = [
  'display-xl',
  'display-lg',
  'display-md',
  'stat',
  'body-lg',
  'body',
  'label',
  'caption',
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
    },
  },
});

/** Merges conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
