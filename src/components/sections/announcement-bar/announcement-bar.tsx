import { Container, Icon } from '@/components/primitives';
import { Marquee } from '@/components/composites';
import { TRUST_MARKS } from '@/data';

function Mark({ icon, label }: { readonly icon: (typeof TRUST_MARKS)[number]['icon']; readonly label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-caption text-nl-cream-50/90">
      <Icon name={icon} size={13} className="text-nl-gold-500" />
      {label}
    </span>
  );
}

/**
 * The thin green strip above the header.
 *
 * Five marks fit comfortably from `md` up. Below that they are scrolled rather
 * than truncated or dropped, so a phone still sees every claim.
 */
export function AnnouncementBar() {
  return (
    <div className="bg-nl-green-900">
      <Container className="py-2">
        <ul className="hidden items-center justify-center gap-8 md:flex lg:gap-12">
          {TRUST_MARKS.map((mark) => (
            <li key={mark.id}>
              <Mark icon={mark.icon} label={mark.label} />
            </li>
          ))}
        </ul>

        <Marquee className="md:hidden" durationSeconds={22}>
          {TRUST_MARKS.map((mark) => (
            <Mark key={mark.id} icon={mark.icon} label={mark.label} />
          ))}
        </Marquee>
      </Container>
    </div>
  );
}
