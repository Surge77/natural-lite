import { useState } from 'react';

import { cn } from '@/lib/cn';
import type { ImageAsset } from '@/types';

export interface ResponsiveImageProps {
  readonly image: ImageAsset;
  /** `sizes` for the browser's source selection. Match the CSS width. */
  readonly sizes?: string;
  /**
   * Marks this as the LCP candidate: eager, high priority, never lazy.
   * Exactly one image per page should set it — the hero portrait.
   */
  readonly priority?: boolean;
  readonly className?: string;
  /** Applied to the <img>; use for object-fit and positioning. */
  readonly imageClassName?: string;
  /** Overrides the intrinsic ratio, e.g. a square crop of a tall source. */
  readonly aspectRatio?: string;
}

/**
 * The one place images are rendered.
 *
 * It owns the aspect-ratio box, AVIF/WebP source order, lazy/eager decision and
 * the tinted placeholder that shows while bytes arrive. Because the box is sized
 * from the asset's declared dimensions, a slot never shifts layout — which is
 * what lets a placeholder be swapped for a real photograph with no code change.
 */
export function ResponsiveImage({
  image,
  sizes,
  priority = false,
  className,
  imageClassName,
  aspectRatio,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ratio = aspectRatio ?? `${image.width} / ${image.height}`;

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{
        aspectRatio: ratio,
        backgroundColor: image.placeholderColor ?? 'var(--color-nl-cream-200)',
      }}
    >
      <picture>
        {image.sources?.map((source) => (
          <source key={source.type} type={source.type} srcSet={source.srcSet} sizes={sizes} />
        ))}
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            'size-full object-cover',
            // Fading in hides the placeholder-to-photo swap. Priority images skip
            // it so the LCP element is never transparent when first painted.
            !priority &&
              'transition-opacity duration-(--duration-slow) ease-(--ease-brand) motion-reduce:transition-none',
            !priority && !isLoaded ? 'opacity-0' : 'opacity-100',
            imageClassName,
          )}
        />
      </picture>
    </div>
  );
}
