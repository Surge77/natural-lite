import { Container, ResponsiveImage, Section, SectionHeading } from '@/components/primitives';
import { ValueItem } from '@/components/composites';
import { BRAND_STORY, BRAND_STORY_IMAGE, BRAND_VALUES } from '@/data';

const HEADING_ID = 'brand-story-heading';

/** Decorative botanical line-art bleeding off the right edge of the band. */
function BotanicalOrnament() {
  return (
    <svg
      viewBox="0 0 180 220"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute top-6 -right-6 hidden h-56 w-44 text-nl-green-600/25 lg:block"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    >
      <path d="M150 8C110 52 82 104 70 168" />
      <path d="M138 34c-20 2-34 14-40 32 20 2 35-10 40-32z" />
      <path d="M124 72c-21 1-36 12-43 30 21 3 36-8 43-30z" />
      <path d="M108 112c-21 2-35 13-42 31 21 2 36-9 42-31z" />
      <path d="M92 154c-20 3-34 15-40 33 21 1 35-11 40-33z" />
      <path d="M150 8c18 10 26 24 24 42-18-6-26-20-24-42z" />
    </svg>
  );
}

/**
 * "From Her Hands to Your Home" — the arch-masked lifestyle photo beside the
 * brand statement and the four values.
 *
 * On phones the image leads and the copy follows, matching the comp's reading
 * order rather than the desktop column order.
 */
export function BrandStorySection() {
  return (
    <Section labelledBy={HEADING_ID} tone="soft" className="relative overflow-hidden">
      <Container className="relative">
        <BotanicalOrnament />

        <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <ResponsiveImage
              image={BRAND_STORY_IMAGE}
              sizes="(min-width: 64rem) 40vw, 88vw"
              className="mx-auto w-[min(28rem,96%)] rounded-l-[7rem] rounded-r-lg lg:w-full"
            />
          </div>

          <div className="lg:col-span-7">
            <SectionHeading id={HEADING_ID} align="left" className="text-display-md lg:text-display-lg">
              {BRAND_STORY.heading}
            </SectionHeading>

            <div className="mt-3 space-y-0.5">
              {BRAND_STORY.body.map((line) => (
                <p key={line} className="text-body text-nl-ink-500">
                  {line}
                </p>
              ))}
            </div>

            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-4">
              {BRAND_VALUES.map((value) => (
                <ValueItem key={value.id} value={value} />
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
