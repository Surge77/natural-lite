import { Icon } from '@/components/primitives';
import { SOCIAL_LINKS } from '@/data';
import { cn } from '@/lib/cn';

export interface SocialLinksProps {
  readonly className?: string;
  readonly iconSize?: number;
}

/** The four platform links in the footer brand block. */
export function SocialLinks({ className, iconSize = 16 }: SocialLinksProps) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {SOCIAL_LINKS.map((social) => (
        <li key={social.id}>
          <a
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Natural Lite on ${social.label}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-nl-cream-50/25 text-nl-cream-50 transition-colors duration-(--duration-base) hover:border-nl-cream-50/60 hover:bg-nl-cream-50/10"
          >
            <Icon name={social.icon} size={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  );
}
