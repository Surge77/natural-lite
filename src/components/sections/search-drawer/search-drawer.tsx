import { useCallback, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';

import { Icon, IconButton } from '@/components/primitives';
import { PRODUCTS } from '@/data';
import { useFocusTrap, useScrollLock } from '@/hooks';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format-currency';

export interface SearchDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleEscape = useCallback(() => onClose(), [onClose]);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const results = useMemo(
    () =>
      PRODUCTS.filter((product) =>
        `${product.name} ${product.category}`.toLocaleLowerCase().includes(normalizedQuery),
      ),
    [normalizedQuery],
  );

  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, handleEscape);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const closeAndReset = () => {
    setQuery('');
    onClose();
  };

  return (
    <div aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={closeAndReset}
        className={cn(
          'fixed inset-0 z-40 bg-nl-ink-900/45 backdrop-blur-[2px] transition-opacity duration-(--duration-base)',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id="search-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-drawer-title"
        inert={!isOpen}
        className={cn(
          'fixed inset-x-0 top-0 z-50 mx-auto flex max-h-[min(44rem,92dvh)] max-w-3xl flex-col overflow-hidden rounded-b-2xl bg-nl-cream-50 shadow-[0_24px_80px_rgb(27_42_22/0.24)]',
          'transition-[transform,opacity] duration-(--duration-slow) ease-(--ease-brand) motion-reduce:transition-none',
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-6 pointer-events-none opacity-0',
        )}
      >
        <div className="flex items-center justify-between border-b border-nl-sand-400 px-4 py-4 sm:px-6">
          <div>
            <p className="text-caption font-semibold tracking-[0.12em] text-nl-gold-700 uppercase">
              Find your everyday powder
            </p>
            <h2 id="search-drawer-title" className="mt-1 text-display-md text-nl-green-900">
              Search our powders
            </h2>
          </div>
          <IconButton icon="close" label="Close product search" onClick={closeAndReset} />
        </div>

        <div className="p-4 sm:p-6">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <Icon
              name="search"
              size={20}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-nl-ink-500"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.currentTarget.value)}
              autoComplete="off"
              placeholder="Try turmeric, leaf, or vegetable…"
              className="min-h-12 w-full rounded-lg border border-nl-sand-400 bg-white pr-4 pl-12 text-body text-nl-ink-900 shadow-inner outline-none placeholder:text-nl-ink-500/70 focus:border-nl-green-600"
            />
          </label>

          <p className="mt-3 text-caption text-nl-ink-500" aria-live="polite">
            {results.length === 1 ? '1 powder found' : `${results.length} powders found`}
          </p>
        </div>

        <div className="overflow-y-auto px-4 pb-5 sm:px-6">
          {results.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2">
              {results.map((product) => (
                <li key={product.id}>
                  <a
                    href={`#product-${product.id}`}
                    onClick={closeAndReset}
                    className="group flex min-h-16 items-center justify-between rounded-lg border border-transparent bg-white px-4 py-3 transition-[border-color,transform,box-shadow] hover:-translate-y-0.5 hover:border-nl-sand-400 hover:shadow-card"
                  >
                    <span>
                      <span className="block text-label font-semibold text-nl-ink-900 group-hover:text-nl-green-900">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block text-caption text-nl-ink-500 capitalize">
                        {product.category} · {product.weightGrams} g
                      </span>
                    </span>
                    <span className="text-label font-semibold text-nl-green-900 tabular-nums">
                      {formatCurrency(product.priceInPaise)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl bg-nl-cream-100 px-5 py-10 text-center">
              <p className="font-display text-display-md text-nl-green-900">No matching powder</p>
              <p className="mt-2 text-body text-nl-ink-500">Try a product name such as amla or ginger.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
