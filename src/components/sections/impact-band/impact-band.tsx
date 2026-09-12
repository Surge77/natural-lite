import { Container, OrnamentDivider, SectionHeading } from '@/components/primitives';
import { StatItem } from '@/components/composites';
import { IMPACT_STATS, SECTION_HEADINGS } from '@/data';
import { useRevealOnScroll } from '@/hooks';

const HEADING_ID = 'impact-heading';

/**
 * The maroon impact band.
 *
 * Its own reveal observer rather than the shared Section wrapper, because the
 * same signal has to start the stat count-up at the moment the band appears.
 */
export function ImpactBand() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby={HEADING_ID} className="bg-nl-maroon-900 py-7 md:py-8">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          <div className="lg:w-72 lg:shrink-0">
            <SectionHeading id={HEADING_ID} tone="onDark" align="left" className="text-display-md">
              {SECTION_HEADINGS.impact}
            </SectionHeading>
            <OrnamentDivider tone="onDark" width={72} className="mt-3" />
          </div>

          <ul className="grid flex-1 grid-cols-2 gap-x-4 gap-y-7 lg:flex lg:justify-between lg:gap-6 lg:divide-x lg:divide-nl-cream-50/20">
            {IMPACT_STATS.map((stat) => (
              <StatItem key={stat.id} stat={stat} isActive={isVisible} className="lg:pl-6 lg:first:pl-0" />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
