import { useCallback, useRef } from 'react';

import { Icon, IconButton } from '@/components/primitives';
import { Logo } from '@/components/composites';
import { NAV_ITEMS } from '@/data';
import { useFocusTrap, useScrollLock } from '@/hooks';
import { cn } from '@/lib/cn';

export interface MobileNavDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

/**
 * Full-screen navigation for viewports below `lg`.
 *
 * Scroll is locked while open, Tab is trapped inside, Escape closes, and focus
 * returns to the hamburger on close. The panel stays mounted so the slide
 * transition can play in both directions; `inert` keeps it out of the tab order
 * and the accessibility tree when hidden.
 */
export function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);

  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, handleEscape);

  return (
    <div className="lg:hidden" aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-nl-ink-900/45 transition-opacity duration-(--duration-base)',
          'motion-reduce:transition-none',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        ref={panelRef}
        inert={!isOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(20rem,88vw)] flex-col bg-nl-cream-50 shadow-card-hover',
          'transition-transform duration-(--duration-slow) ease-(--ease-brand) motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-nl-sand-400 px-4 py-3">
          <Logo compact />
          <IconButton icon="close" label="Close navigation menu" onClick={onClose} />
        </div>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="border-b border-nl-sand-400/60 last:border-0">
                <a
                  href={item.href}
                  className="flex min-h-12 items-center justify-between text-body text-nl-ink-900"
                >
                  {item.label}
                  {item.children ? (
                    <Icon name="chevron-right" size={16} className="text-nl-ink-500" />
                  ) : null}
                </a>

                {item.children ? (
                  <ul className="flex flex-col pb-2 pl-3">
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={child.href}
                          className="flex min-h-10 items-center text-caption text-nl-ink-500"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
