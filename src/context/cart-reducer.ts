import type { CartLine } from '@/types';

export interface CartState {
  readonly lines: readonly CartLine[];
}

export type CartAction =
  | { type: 'ADD'; productId: string; quantity?: number }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'CLEAR' };

export const EMPTY_CART: CartState = { lines: [] };

const MAX_QUANTITY_PER_LINE = 99;

const clamp = (quantity: number) =>
  Math.max(0, Math.min(Math.trunc(quantity), MAX_QUANTITY_PER_LINE));

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const quantity = clamp(action.quantity ?? 1);
      if (quantity === 0) return state;

      const existing = state.lines.find((line) => line.productId === action.productId);
      if (!existing) {
        return { lines: [...state.lines, { productId: action.productId, quantity }] };
      }

      return {
        lines: state.lines.map((line) =>
          line.productId === action.productId
            ? { ...line, quantity: clamp(line.quantity + quantity) }
            : line,
        ),
      };
    }

    case 'UPDATE_QTY': {
      const quantity = clamp(action.quantity);
      // Dropping to zero removes the line rather than leaving an empty one.
      if (quantity === 0) {
        return { lines: state.lines.filter((line) => line.productId !== action.productId) };
      }

      return {
        lines: state.lines.map((line) =>
          line.productId === action.productId ? { ...line, quantity } : line,
        ),
      };
    }

    case 'REMOVE':
      return { lines: state.lines.filter((line) => line.productId !== action.productId) };

    case 'CLEAR':
      return EMPTY_CART;
  }
}

/**
 * Validates a payload read back from localStorage.
 *
 * Storage survives deploys, so a stale or hand-edited value must fail closed to
 * an empty cart rather than crash the page on hydration.
 */
export function parseStoredCart(raw: string | null): CartState {
  if (!raw) return EMPTY_CART;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return EMPTY_CART;

    const lines = (parsed as { lines?: unknown }).lines;
    if (!Array.isArray(lines)) return EMPTY_CART;

    const valid = lines.filter(
      (line): line is CartLine =>
        typeof line === 'object' &&
        line !== null &&
        typeof (line as CartLine).productId === 'string' &&
        Number.isInteger((line as CartLine).quantity) &&
        (line as CartLine).quantity > 0,
    );

    return { lines: valid };
  } catch {
    return EMPTY_CART;
  }
}
