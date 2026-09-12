import { useEffect, useId, useRef, useState } from 'react';

import { Icon } from '@/components/primitives';
import { cn } from '@/lib/cn';
import type { NavItem as NavItemData } from '@/types';

export interface NavItemProps {
  readonly item: NavItemData;
  readonly className?: string;
}

const LINK_CLASSES =
  'inline-flex min-h-11 items-center gap-1 px-1 text-label text-nl-ink-700 transition-colors duration-(--duration-base) hover:text-nl-green-900';

/**
 * One top-level navigation entry. "Products" is the only item with children, so
 * it renders a disclosure; everything else is a plain link.
 *
 * Pointer users get hover-to-open; keyboard users get Enter/Space, Escape to
 * close and focus returned to the trigger. Hover alone would strand keyboard
 * and touch users, so the click handler is always present.
 */
export function NavItem({ item, className }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const hasChildren = Boolean(item.children?.length);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  if (!hasChildren) {
    return (
      <li className={className}>
        <a href={item.href} className={LINK_CLASSES}>
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      ref={wrapperRef}
      className={cn('relative', className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={() => setIsOpen((open) => !open)}
        className={LINK_CLASSES}
      >
        {item.label}
        <Icon
          name="chevron-down"
          size={14}
          className={cn(
            'transition-transform duration-(--duration-base) motion-reduce:transition-none',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      <ul
        id={menuId}
        hidden={!isOpen}
        className="absolute top-full left-0 z-50 min-w-52 rounded-md border border-nl-sand-400 bg-white py-2 shadow-card-hover"
      >
        {item.children?.map((child) => (
          <li key={child.id}>
            <a
              href={child.href}
              className="flex min-h-11 items-center px-4 text-label text-nl-ink-700 transition-colors hover:bg-nl-cream-100 hover:text-nl-green-900"
            >
              {child.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
