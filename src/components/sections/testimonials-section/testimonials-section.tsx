import { CarouselArrow, Container, Section, SectionHeading } from '@/components/primitives';
import { TestimonialCard } from '@/components/composites';
import { SECTION_HEADINGS, TESTIMONIALS } from '@/data';
import { useCarousel } from '@/hooks';
import { cn } from '@/lib/cn';

const HEADING_ID = 'testimonials-heading';

/**
 * The customer-quote carousel.
 *
 * Built on native CSS scroll-snap, so swipe, momentum and keyboard scrolling
 * work without JavaScript and without a carousel dependency. There is no
 * autoplay: moving text that a reader cannot pause fails WCAG 2.2.
 */
export function TestimonialsSection() {
  const { trackRef, activeIndex, next, previous, scrollToIndex, canGoNext, canGoPrevious } =
    useCarousel<HTMLUListElement>(TESTIMONIALS.length);

  return (
    <Section id="testimonials" labelledBy={HEADING_ID} tone="cream" spacing="standard">
      <Container>
        <SectionHeading id={HEADING_ID} withLeaf>
          {SECTION_HEADINGS.testimonials}
        </SectionHeading>

        <div
          className="relative mt-4"
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
        >
          <CarouselArrow
            direction="previous"
            onClick={previous}
            disabled={!canGoPrevious}
            label="Previous testimonial"
            className="absolute top-1/2 -left-1 z-10 hidden -translate-y-1/2 md:inline-flex lg:-left-4"
          />

          <ul ref={trackRef} className="snap-strip gap-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {TESTIMONIALS.map((testimonial, index) => (
              <li
                key={testimonial.id}
                aria-label={`${index + 1} of ${TESTIMONIALS.length}`}
                className="w-[86vw] max-w-96 shrink-0 sm:w-[60vw] md:w-[45%] lg:w-auto lg:max-w-none lg:shrink"
              >
                <TestimonialCard testimonial={testimonial} className="h-full" />
              </li>
            ))}
          </ul>

          <CarouselArrow
            direction="next"
            onClick={next}
            disabled={!canGoNext}
            label="Next testimonial"
            className="absolute top-1/2 -right-1 z-10 hidden -translate-y-1/2 md:inline-flex lg:-right-4"
          />
        </div>

        {/* Dots are the only control on phones, where the arrows are hidden. */}
        <ul className="mt-3 flex justify-center gap-2 lg:hidden">
          {TESTIMONIALS.map((testimonial, index) => (
            <li key={testimonial.id}>
              <button
                type="button"
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex}
                className="inline-flex size-11 items-center justify-center"
              >
                <span
                  className={cn(
                    'block size-2 rounded-full transition-colors duration-(--duration-base)',
                    index === activeIndex ? 'bg-nl-green-800' : 'bg-nl-sand-400',
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
