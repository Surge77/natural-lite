import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';

export interface CarouselArrowProps {
  readonly direction: 'previous' | 'next';
  readonly onClick: () => void;
  readonly disabled?: boolean;
  readonly label: string;
  readonly className?: string;
}

/** Circular previous/next control flanking the testimonial carousel. */
export function CarouselArrow({
  direction,
  onClick,
  disabled = false,
  label,
  className,
}: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full',
        'border border-nl-sand-400 bg-white text-nl-green-800 shadow-card',
        'transition-colors duration-(--duration-base) ease-(--ease-brand)',
        'hover:border-nl-green-800/40 hover:bg-nl-cream-100',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white',
        className,
      )}
    >
      <Icon name={direction === 'previous' ? 'chevron-left' : 'chevron-right'} size={18} />
    </button>
  );
}
