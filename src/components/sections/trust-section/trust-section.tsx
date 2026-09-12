import { Container, SealBadge, Section, SectionHeading } from '@/components/primitives';
import { TrustItem } from '@/components/composites';
import { SECTION_HEADINGS, TRUST_PILLARS } from '@/data';

const HEADING_ID = 'trust-heading';

/**
 * "Trust in Every Spoon" — six ringed marks with the gold seal alongside.
 *
 * The seal trails the row on desktop and recentres beneath it once the marks
 * wrap, so it never crushes the last column.
 */
export function TrustSection() {
  return (
    <Section labelledBy={HEADING_ID} tone="cream">
      <Container>
        <SectionHeading id={HEADING_ID} withLeaf>
          {SECTION_HEADINGS.trust}
        </SectionHeading>

        <div className="mx-auto mt-3.5 flex max-w-[74rem] flex-col items-center gap-5 xl:flex-row xl:justify-between xl:gap-10">
          <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:flex xl:flex-1 xl:justify-between xl:gap-4">
            {TRUST_PILLARS.map((pillar) => (
              <TrustItem key={pillar.id} item={pillar} size="md" />
            ))}
          </ul>

          <SealBadge size={100} className="shrink-0" />
        </div>
      </Container>
    </Section>
  );
}
