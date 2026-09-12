import { ResponsiveImage, StarRating } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { Testimonial } from '@/types';

export interface TestimonialCardProps {
  readonly testimonial: Testimonial;
  readonly className?: string;
}

/** One customer quote in the "Loved by Women. Trusted by Families." carousel. */
export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col gap-2 rounded-lg border border-nl-sand-400 bg-white p-4 shadow-card',
        className,
      )}
    >
      <StarRating rating={testimonial.rating} />

      <div className="flex items-start gap-4">
        <ResponsiveImage
          image={testimonial.avatar}
          sizes="56px"
          aspectRatio="1 / 1"
          className="w-14 shrink-0 rounded-full"
        />
        <blockquote className="text-caption leading-relaxed text-nl-ink-700">
          {testimonial.quote}
        </blockquote>
      </div>

      <figcaption className="mt-auto text-caption font-medium text-nl-ink-900">
        <span aria-hidden="true">– </span>
        {`${testimonial.authorName}, ${testimonial.authorLocation}`}
      </figcaption>
    </figure>
  );
}
