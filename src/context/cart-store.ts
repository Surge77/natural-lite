import { createContext } from 'react';

import type { CartState } from './cart-reducer';

export interface CartContextValue {
  readonly state: CartState;
  readonly itemCount: number;
  readonly subtotalInPaise: number;
  readonly quantityOf: (productId: string) => number;
  readonly add: (productId: string, quantity?: number) => void;
  readonly setQuantity: (productId: string, quantity: number) => void;
  readonly remove: (productId: string) => void;
  readonly clear: () => void;
}

/** Lives apart from the provider so the provider file only exports components. */
export const CartContext = createContext<CartContextValue | null>(null);
