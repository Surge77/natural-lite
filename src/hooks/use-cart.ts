import { use } from 'react';

import { CartContext, type CartContextValue } from '@/context/cart-store';

/** Throws outside a CartProvider — a silently empty cart would hide the bug. */
export function useCart(): CartContextValue {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
