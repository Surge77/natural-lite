import { Icon } from '@/components/primitives';
import { useMediaQuery } from '@/hooks';
import { cn } from '@/lib/cn';
import { MD_BREAKPOINT_QUERY } from '@/lib/constants';
import type { FooterColumn as FooterColumnData } from '@/types';

export interface FooterColumnProps {
  readonly column: FooterColumnData;
  readonly className?: string;
}

/**
 * One footer link column: a native, keyboard-operable accordion on phones, and
 * an open column from tablet up.
 *
 * `open` has to be driven from the media query rather than from CSS on the list.
 * A closed <details> hides everything but its summary through the UA's
 * ::details-content, which sets content-visibility: hidden — a `display`
 * utility on the <ul> cannot override that, so the links vanished at desktop
 * width. Passing undefined below `md` rather than false leaves the element
 * uncontrolled there, so a re-render cannot collapse a column the reader opened.
 */
export function FooterColumn({ column, className }: FooterColumnProps) {
  const isDesktop = useMediaQuery(MD_BREAKPOINT_QUERY);

  return (
    <details
      open={isDesktop || undefined}
      className={cn(
        'group border-b border-nl-cream-50/12 md:border-0',
        // Comp separates the footer columns with a hairline from tablet up.
        'md:border-l md:border-nl-cream-50/12 md:pl-5',
        className,
      )}
    >
      <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between text-label font-semibold text-nl-cream-50 md:pointer-events-none md:min-h-0 md:cursor-default">
        <span className="flex flex-col">
          <h2 className="text-label font-semibold">{column.heading}</h2>
          <span aria-hidden="true" className="mt-1 hidden h-px w-7 bg-nl-gold-500 md:block" />
        </span>
        <Icon
          name="chevron-down"
          size={16}
          className="text-nl-cream-50/70 transition-transform duration-(--duration-base) group-open:rotate-180 md:hidden motion-reduce:transition-none"
        />
      </summary>

      <ul className="hidden flex-col pb-2 group-open:flex md:flex md:pt-2 md:pb-0">
        {column.links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="inline-flex min-h-7 items-center text-caption text-nl-cream-50/75 transition-colors duration-(--duration-base) hover:text-nl-cream-50"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
