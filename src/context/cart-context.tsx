import { useCallback, useEffect, useMemo, useReducer, type ReactNode } from 'react';

import { PRODUCTS_BY_ID } from '@/data';
import { CART_STORAGE_KEY } from '@/lib/constants';

import { cartReducer, EMPTY_CART, parseStoredCart, type CartState } from './cart-reducer';
import { CartContext, type CartContextValue } from './cart-store';

/**
 * Reads the saved cart once, before the first render.
 *
 * There is no server render to match, so this can happen during initialisation
 * rather than in an effect — which avoids an extra render pass and the flash of
 * an empty cart badge. Storage access throws in private-mode Safari and wherever
 * site data is blocked, so a failure yields an empty cart instead of a crash.
 */
function readStoredCart(): CartState {
  try {
    return parseStoredCart(localStorage.getItem(CART_STORAGE_KEY));
  } catch {
    return EMPTY_CART;
  }
}

export function CartProvider({ children }: { readonly children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readStoredCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Persistence is a convenience; the in-memory cart works without it.
    }
  }, [state]);

  const quantityOf = useCallback(
    (productId: string) =>
      state.lines.find((line) => line.productId === productId)?.quantity ?? 0,
    [state.lines],
  );

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.lines.reduce((total, line) => total + line.quantity, 0);
    const subtotalInPaise = state.lines.reduce((total, line) => {
      const product = PRODUCTS_BY_ID.get(line.productId);
      return product ? total + product.priceInPaise * line.quantity : total;
    }, 0);

    return {
      state,
      itemCount,
      subtotalInPaise,
      quantityOf,
      add: (productId, quantity) =>
        dispatch({ type: 'ADD', productId, ...(quantity !== undefined && { quantity }) }),
      setQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
      remove: (productId) => dispatch({ type: 'REMOVE', productId }),
      clear: () => dispatch({ type: 'CLEAR' }),
    };
  }, [quantityOf, state]);

  return <CartContext value={value}>{children}</CartContext>;
}
