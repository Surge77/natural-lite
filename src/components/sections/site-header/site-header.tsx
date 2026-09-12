import { useState } from 'react';

import { Container, IconButton } from '@/components/primitives';
import { CartBadge, Logo, NavItem } from '@/components/composites';
import { CartDrawer } from '@/components/sections/cart-drawer';
import { MobileNavDrawer } from '@/components/sections/mobile-nav-drawer';
import { SearchDrawer } from '@/components/sections/search-drawer';
import { NAV_ITEMS } from '@/data';
import { useStickyHeader } from '@/hooks';
import { cn } from '@/lib/cn';

/**
 * The main site header.
 *
 * Past 120px of scroll it pins and condenses — only height, shadow and the
 * tagline change, all via transform/opacity so nothing reflows. A zero-height
 * sentinel drives that instead of a scroll listener.
 */
export function SiteHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { sentinelRef, isCondensed } = useStickyHeader();

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0" />

      <header
        className={cn(
          'sticky top-0 z-30 bg-nl-cream-200/95 backdrop-blur-sm',
          'transition-shadow duration-(--duration-base) ease-(--ease-brand) motion-reduce:transition-none',
          isCondensed && 'shadow-header',
        )}
      >
        <Container>
          <div
            className={cn(
              'flex items-center justify-between gap-4',
              'transition-[height] duration-(--duration-base) ease-(--ease-brand) motion-reduce:transition-none',
              isCondensed ? 'h-16' : 'h-[4.75rem] lg:h-[5.25rem]',
            )}
          >
            <a href="#top" className="shrink-0" aria-label="Natural Lite — home">
              <Logo compact={isCondensed} />
            </a>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-6 xl:gap-8">
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.id} item={item} />
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-0.5">
              <IconButton
                icon="search"
                label="Search products"
                aria-expanded={isSearchOpen}
                aria-controls="search-drawer"
                onClick={() => {
                  setIsCartOpen(false);
                  setIsSearchOpen(true);
                }}
              />
              <CartBadge
                isOpen={isCartOpen}
                onClick={() => {
                  setIsSearchOpen(false);
                  setIsCartOpen(true);
                }}
              />
              <IconButton
                icon="menu"
                label="Open navigation menu"
                aria-expanded={isDrawerOpen}
                onClick={() => setIsDrawerOpen(true)}
                className="xl:hidden"
              />
            </div>
          </div>
        </Container>
      </header>

      <MobileNavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
