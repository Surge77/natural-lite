import type { ImageAsset } from '@/types';

/**
 * Builds the asset record for one photo slot.
 *
 * Every slot currently points at a generated placeholder. Because the slot's
 * dimensions, alt text and sources are declared here rather than in a component,
 * shipping the real photograph means dropping `<id>.avif` and `<id>.webp` into
 * `public/assets/lifestyle/` — nothing in `src/components` changes.
 *
 * Slot specs: docs/ASSET-MANIFEST.md
 */
export function lifestyleImage(
  id: string,
  alt: string,
  width: number,
  height: number,
  placeholderColor = '#e9dfcc',
  retinaWidth?: number,
): ImageAsset {
  const srcSet = (extension: 'avif' | 'webp') =>
    retinaWidth
      ? `/assets/lifestyle/${id}.${extension} ${width}w, /assets/lifestyle/${id}@2x.${extension} ${retinaWidth}w`
      : `/assets/lifestyle/${id}.${extension}`;

  return {
    src: `/assets/lifestyle/${id}.webp`,
    alt,
    width,
    height,
    placeholderColor,
    sources: [
      { type: 'image/avif', srcSet: srcSet('avif') },
      { type: 'image/webp', srcSet: srcSet('webp') },
    ],
  };
}
