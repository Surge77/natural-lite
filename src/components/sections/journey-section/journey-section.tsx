import { Fragment } from 'react';

import { Container, Icon, Section, SectionHeading } from '@/components/primitives';
import { JourneyStep } from '@/components/composites';
import { JOURNEY_STEPS, SECTION_HEADINGS } from '@/data';

const HEADING_ID = 'journey-heading';

/**
 * The five-stage process band.
 *
 * Chevrons sit between steps on wide screens only — once the steps wrap they
 * would point at the wrong neighbour, so they are dropped rather than rotated.
 * Below `md` the row becomes a swipeable strip instead of shrinking to unreadable.
 */
export function JourneySection() {
  return (
    <Section labelledBy={HEADING_ID} tone="cream">
      <Container>
        <SectionHeading id={HEADING_ID}>{SECTION_HEADINGS.journey}</SectionHeading>

        <div className="mt-4 rounded-xl border border-nl-sand-400 bg-nl-cream-100/70 p-3 md:p-4 lg:p-5">
          <ol className="snap-strip gap-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:flex xl:items-start xl:gap-2">
            {JOURNEY_STEPS.map((step, index) => (
              <Fragment key={step.id}>
                <JourneyStep
                  step={step}
                  index={index}
                  total={JOURNEY_STEPS.length}
                  className="w-[70vw] max-w-72 shrink-0 md:w-auto md:max-w-none md:shrink xl:flex-1"
                />
                {index < JOURNEY_STEPS.length - 1 ? (
                  <Icon
                    name="chevron-right"
                    size={18}
                    className="mt-16 hidden shrink-0 text-nl-ink-500/50 xl:block"
                  />
                ) : null}
              </Fragment>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
