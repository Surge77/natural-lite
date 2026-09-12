import { Container, Icon, Section, SectionHeading } from '@/components/primitives';
import { CommunityTile } from '@/components/composites';
import { BRAND, COMMUNITY_POSTS, SECTION_HEADINGS } from '@/data';

const HEADING_ID = 'community-heading';

/** The Instagram strip: seven square tiles followed by the follow call-to-action. */
export function CommunitySection() {
  return (
    <Section labelledBy={HEADING_ID} tone="cream">
      <Container>
        <SectionHeading id={HEADING_ID}>{SECTION_HEADINGS.community}</SectionHeading>

        <ul className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {COMMUNITY_POSTS.map((post) => (
            <li key={post.id}>
              <CommunityTile post={post} />
            </li>
          ))}

          <li className="col-span-2 sm:col-span-3 lg:col-span-4 xl:col-span-1">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="flex h-full min-h-0 flex-col items-center justify-center gap-1.5 rounded-md bg-nl-maroon-900 p-3 text-center transition-colors duration-(--duration-base) hover:bg-nl-maroon-700"
            >
              <Icon name="instagram" size={26} className="text-nl-cream-50" />
              <span className="text-caption leading-tight text-nl-cream-50/85">
                Follow our journey
                <br />
                {BRAND.instagramHandle}
              </span>
              <span className="mt-1 rounded-sm border border-nl-cream-50/40 px-3 py-1.5 text-caption font-medium text-nl-cream-50">
                Follow Us
              </span>
            </a>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
