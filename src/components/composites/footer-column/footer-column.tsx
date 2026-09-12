import { Icon } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { FooterColumn as FooterColumnData } from '@/types';

export interface FooterColumnProps {
  readonly column: FooterColumnData;
  readonly className?: string;
}

/**
 * One footer link column.
 *
 * Built on <details> so it is a collapsed accordion on phones and a visible
 * native, keyboard-operable accordion on phones — no JavaScript, no ARIA to
 * column from tablet up — no JavaScript or ARIA state to keep in sync.
 */
export function FooterColumn({ column, className }: FooterColumnProps) {
  return (
    <details
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
