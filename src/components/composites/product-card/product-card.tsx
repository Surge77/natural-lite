import type { CSSProperties } from 'react';

import { Button, ResponsiveImage } from '@/components/primitives';
import { QuantityStepper } from '@/components/composites/quantity-stepper';
import { useCart } from '@/hooks';
import { formatCurrency } from '@/lib/format-currency';
import { cn } from '@/lib/cn';
import type { Product } from '@/types';

export interface ProductCardProps {
  readonly product: Product;
  readonly className?: string;
}

/** Matches the grid's column widths so the browser picks the right source. */
const IMAGE_SIZES = '(min-width: 80rem) 240px, (min-width: 64rem) 260px, (min-width: 48rem) 31vw, 46vw';

/**
 * One product tile in the "Our 10 Natural Superfood Powders" grid.
 *
 * `--product-accent` is set from the pouch's own sampled colour, so the hover
 * bloom and border pick up each powder's identity without any per-product CSS.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const { add, setQuantity, quantityOf } = useCart();
  const quantity = quantityOf(product.id);

  return (
    <article
      id={`product-${product.id}`}
      style={{ '--product-accent': product.accentColor } as CSSProperties}
      className={cn(
        'group relative flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-nl-sand-400/80 bg-nl-cream-50',
        'shadow-card transition-[box-shadow,transform,border-color] duration-(--duration-base) ease-(--ease-brand)',
        'hover:-translate-y-0.5 hover:border-(--product-accent)/35 hover:shadow-card-hover',
        'motion-reduce:transform-none motion-reduce:transition-none',
        className,
      )}
    >
      <div className="relative bg-[radial-gradient(circle_at_50%_72%,color-mix(in_srgb,var(--product-accent)_14%,transparent)_0%,transparent_58%)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-(--product-accent) opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-[0.06]"
        />
        <ResponsiveImage
          image={product.image}
          sizes={IMAGE_SIZES}
          aspectRatio="6 / 5"
          className="w-full bg-transparent"
          imageClassName="object-contain px-3 pt-3 mix-blend-multiply transition-transform duration-(--duration-slow) ease-(--ease-brand) group-hover:scale-[1.025] motion-reduce:transform-none"
        />
      </div>

      <div className="flex flex-1 flex-col px-3 pt-2.5 pb-3 text-left">
        <h3 className="font-sans text-label font-semibold text-nl-ink-900">{product.name}</h3>
        <div className="mt-1 flex items-baseline justify-between gap-2">
          <span className="text-body font-semibold text-nl-green-900 tabular-nums">
            {formatCurrency(product.priceInPaise)}
          </span>
          <span className="text-caption text-nl-ink-500">{product.weightGrams} g</span>
        </div>

        <div className="mt-auto w-full pt-3">
          {quantity > 0 ? (
            <QuantityStepper
              quantity={quantity}
              productName={product.name}
              onChange={(next) => setQuantity(product.id, next)}
            />
          ) : (
            <Button
              size="sm"
              fullWidth
              trailingIcon="cart"
              onClick={() => add(product.id)}
              aria-label={`Add ${product.name}, ${formatCurrency(product.priceInPaise)} for ${product.weightGrams} grams, to cart`}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
