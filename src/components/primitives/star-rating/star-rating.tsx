import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';

const MAX_RATING = 5;

export interface StarRatingProps {
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly size?: number;
  readonly className?: string;
}

/**
 * Gold stars above each testimonial. The stars themselves are decorative; the
 * rating is announced once as text so it is not read out five times.
 */
export function StarRating({ rating, size = 14, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: MAX_RATING }, (_, index) => (
        <Icon
          key={index}
          name="star"
          size={size}
          className={cn(
            index < rating
              ? 'fill-nl-gold-500 text-nl-gold-500'
              : 'fill-none text-nl-sand-400',
          )}
        />
      ))}
      <span className="sr-only">{`Rated ${rating} out of ${MAX_RATING}`}</span>
    </div>
  );
}
