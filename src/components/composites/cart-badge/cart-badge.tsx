import { IconButton } from '@/components/primitives';
import { useCart } from '@/hooks';

export interface CartBadgeProps {
  readonly className?: string;
}

/**
 * Header cart control with its item-count bubble.
 *
 * The count is part of the button's accessible name rather than a separate
 * node, so a screen reader hears "Cart, 3 items" as one control.
 */
export function CartBadge({ className }: CartBadgeProps) {
  const { itemCount } = useCart();
  const noun = itemCount === 1 ? 'item' : 'items';

  return (
    <IconButton
      icon="cart"
      label={`Cart, ${itemCount} ${noun}`}
      className={className}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 right-0.5 inline-flex min-w-[1.15rem] items-center justify-center rounded-full bg-nl-maroon-900 px-1 text-[0.6rem] font-semibold text-nl-cream-50 tabular-nums"
      >
        {itemCount}
      </span>
    </IconButton>
  );
}
