import { useCallback, useMemo, useRef } from 'react';

import { QuantityStepper } from '@/components/composites';
import { Button, ButtonLink, IconButton, ResponsiveImage } from '@/components/primitives';
import { BRAND, PRODUCTS_BY_ID } from '@/data';
import { useCart, useFocusTrap, useScrollLock } from '@/hooks';
import { cn } from '@/lib/cn';
import { formatCurrency } from '@/lib/format-currency';

export interface CartDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { state, subtotalInPaise, setQuantity, clear } = useCart();
  const handleEscape = useCallback(() => onClose(), [onClose]);
  const lines = useMemo(
    () =>
      state.lines.flatMap((line) => {
        const product = PRODUCTS_BY_ID.get(line.productId);
        return product ? [{ ...line, product }] : [];
      }),
    [state.lines],
  );
  const orderMessage = encodeURIComponent(
    `Hello Natural Lite, I would like to order:\n${lines
      .map(({ product, quantity }) => `${quantity} × ${product.name}`)
      .join('\n')}\nSubtotal: ${formatCurrency(subtotalInPaise)}`,
  );

  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, handleEscape);

  return (
    <div aria-hidden={!isOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-40 bg-nl-ink-900/45 backdrop-blur-[2px] transition-opacity duration-(--duration-base)',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
      />

      <div
        id="cart-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        inert={!isOpen}
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[min(26rem,94vw)] flex-col bg-nl-cream-50 shadow-[-24px_0_80px_rgb(27_42_22/0.2)]',
          'transition-transform duration-(--duration-slow) ease-(--ease-brand) motion-reduce:transition-none',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-nl-sand-400 px-5 py-4">
          <div>
            <p className="text-caption font-semibold tracking-[0.12em] text-nl-gold-700 uppercase">
              Your selection
            </p>
            <h2 id="cart-drawer-title" className="mt-1 text-display-md text-nl-green-900">
              Your cart
            </h2>
          </div>
          <IconButton icon="close" label="Close cart" onClick={onClose} />
        </div>

        {lines.length > 0 ? (
          <>
            <ul className="flex-1 divide-y divide-nl-sand-400 overflow-y-auto px-5">
              {lines.map(({ product, quantity }) => (
                <li key={product.id} className="grid grid-cols-[4.75rem_1fr] gap-4 py-4">
                  <ResponsiveImage
                    image={product.image}
                    sizes="76px"
                    aspectRatio="1 / 1"
                    className="rounded-lg bg-white"
                    imageClassName="object-contain p-1"
                  />
                  <div className="min-w-0">
                    <h3 className="font-sans text-label font-semibold text-nl-ink-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-caption text-nl-ink-500">
                      {`${formatCurrency(product.priceInPaise)} × ${quantity}`}
                    </p>
                    <QuantityStepper
                      quantity={quantity}
                      productName={product.name}
                      onChange={(next) => setQuantity(product.id, next)}
                      className="mt-3 max-w-36"
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-nl-sand-400 bg-white px-5 py-5">
              <div className="flex items-center justify-between">
                <span className="text-body text-nl-ink-700">Subtotal</span>
                <strong className="text-body-lg text-nl-green-900 tabular-nums">
                  {formatCurrency(subtotalInPaise)}
                </strong>
              </div>
              <p className="mt-1 text-caption text-nl-ink-500">Shipping is confirmed on WhatsApp.</p>
              <ButtonLink
                href={`${BRAND.whatsappUrl}?text=${orderMessage}`}
                target="_blank"
                rel="noreferrer noopener"
                fullWidth
                className="mt-4"
                trailingIcon="whatsapp"
              >
                Send order on WhatsApp
              </ButtonLink>
              <Button variant="outline" fullWidth onClick={clear} className="mt-2">
                Clear cart
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <p className="font-display text-display-md text-nl-green-900">Your cart is empty</p>
            <p className="mt-2 max-w-64 text-body text-nl-ink-500">
              Choose a powder and it will be kept here while you browse.
            </p>
            <ButtonLink href="#products" onClick={onClose} className="mt-5">
              Browse powders
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}
