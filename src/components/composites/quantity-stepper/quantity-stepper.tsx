import { Icon } from '@/components/primitives';
import { cn } from '@/lib/cn';

export interface QuantityStepperProps {
  readonly quantity: number;
  readonly onChange: (quantity: number) => void;
  /** Named in each control's label so multiple steppers stay distinguishable. */
  readonly productName: string;
  readonly className?: string;
}

/**
 * Replaces "Add to cart" on a card once the product is in the cart.
 *
 * Keeps the button footprint identical so the grid does not reflow when a card
 * switches between the two states.
 */
export function QuantityStepper({
  quantity,
  onChange,
  productName,
  className,
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        'flex min-h-11 w-full items-center justify-between rounded-md',
        'border border-nl-green-900/20 bg-white px-1',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => onChange(quantity - 1)}
        aria-label={
          quantity === 1 ? `Remove ${productName} from cart` : `Decrease ${productName} quantity`
        }
        className="inline-flex size-11 items-center justify-center rounded text-nl-green-900 transition-[background-color,transform] hover:bg-nl-cream-100 active:scale-[0.96] motion-reduce:transform-none"
      >
        <Icon name="minus" size={14} />
      </button>

      <span aria-live="polite" className="text-label font-semibold text-nl-green-900 tabular-nums">
        {quantity}
        <span className="sr-only">{` ${productName} in cart`}</span>
      </span>

      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        aria-label={`Increase ${productName} quantity`}
        className="inline-flex size-11 items-center justify-center rounded text-nl-green-900 transition-[background-color,transform] hover:bg-nl-cream-100 active:scale-[0.96] motion-reduce:transform-none"
      >
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
