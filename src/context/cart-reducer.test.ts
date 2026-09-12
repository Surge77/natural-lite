import { describe, expect, it } from 'vitest';

import { cartReducer, EMPTY_CART, parseStoredCart, type CartState } from './cart-reducer';

const cartWith = (...lines: readonly { productId: string; quantity: number }[]): CartState => ({
  lines,
});

describe('cartReducer', () => {
  describe('ADD', () => {
    it('adds a new line with quantity one by default', () => {
      const result = cartReducer(EMPTY_CART, { type: 'ADD', productId: 'beetroot' });

      expect(result.lines).toEqual([{ productId: 'beetroot', quantity: 1 }]);
    });

    it('increments an existing line rather than duplicating it', () => {
      const state = cartWith({ productId: 'beetroot', quantity: 2 });

      const result = cartReducer(state, { type: 'ADD', productId: 'beetroot', quantity: 3 });

      expect(result.lines).toEqual([{ productId: 'beetroot', quantity: 5 }]);
    });

    it('keeps other lines untouched', () => {
      const state = cartWith(
        { productId: 'beetroot', quantity: 1 },
        { productId: 'amla', quantity: 4 },
      );

      const result = cartReducer(state, { type: 'ADD', productId: 'beetroot' });

      expect(result.lines).toContainEqual({ productId: 'amla', quantity: 4 });
    });

    it('caps a line at ninety-nine', () => {
      const state = cartWith({ productId: 'beetroot', quantity: 98 });

      const result = cartReducer(state, { type: 'ADD', productId: 'beetroot', quantity: 50 });

      expect(result.lines[0]?.quantity).toBe(99);
    });

    it('ignores an add of zero', () => {
      const result = cartReducer(EMPTY_CART, { type: 'ADD', productId: 'beetroot', quantity: 0 });

      expect(result).toBe(EMPTY_CART);
    });

    it('does not mutate the previous state', () => {
      const state = cartWith({ productId: 'beetroot', quantity: 1 });

      cartReducer(state, { type: 'ADD', productId: 'beetroot' });

      expect(state.lines[0]?.quantity).toBe(1);
    });
  });

  describe('UPDATE_QTY', () => {
    it('sets an absolute quantity', () => {
      const state = cartWith({ productId: 'amla', quantity: 2 });

      const result = cartReducer(state, { type: 'UPDATE_QTY', productId: 'amla', quantity: 7 });

      expect(result.lines).toEqual([{ productId: 'amla', quantity: 7 }]);
    });

    it('removes the line when the quantity reaches zero', () => {
      const state = cartWith({ productId: 'amla', quantity: 1 });

      const result = cartReducer(state, { type: 'UPDATE_QTY', productId: 'amla', quantity: 0 });

      expect(result.lines).toEqual([]);
    });

    it('treats a negative quantity as a removal', () => {
      const state = cartWith({ productId: 'amla', quantity: 3 });

      const result = cartReducer(state, { type: 'UPDATE_QTY', productId: 'amla', quantity: -5 });

      expect(result.lines).toEqual([]);
    });

    it('ignores a product that is not in the cart', () => {
      const state = cartWith({ productId: 'amla', quantity: 3 });

      const result = cartReducer(state, { type: 'UPDATE_QTY', productId: 'ginger', quantity: 2 });

      expect(result.lines).toEqual([{ productId: 'amla', quantity: 3 }]);
    });
  });

  describe('REMOVE and CLEAR', () => {
    it('removes only the named line', () => {
      const state = cartWith(
        { productId: 'amla', quantity: 1 },
        { productId: 'ginger', quantity: 2 },
      );

      const result = cartReducer(state, { type: 'REMOVE', productId: 'amla' });

      expect(result.lines).toEqual([{ productId: 'ginger', quantity: 2 }]);
    });

    it('empties the cart', () => {
      const state = cartWith({ productId: 'amla', quantity: 9 });

      expect(cartReducer(state, { type: 'CLEAR' }).lines).toEqual([]);
    });
  });
});

describe('parseStoredCart', () => {
  it('returns an empty cart for missing storage', () => {
    expect(parseStoredCart(null)).toEqual(EMPTY_CART);
  });

  it('returns an empty cart for malformed JSON', () => {
    expect(parseStoredCart('{ not json')).toEqual(EMPTY_CART);
  });

  it('returns an empty cart when lines is not an array', () => {
    expect(parseStoredCart('{"lines":"nope"}')).toEqual(EMPTY_CART);
  });

  it('returns an empty cart for a JSON primitive', () => {
    expect(parseStoredCart('42')).toEqual(EMPTY_CART);
  });

  it('reads back a valid cart', () => {
    const raw = '{"lines":[{"productId":"amla","quantity":3}]}';

    expect(parseStoredCart(raw).lines).toEqual([{ productId: 'amla', quantity: 3 }]);
  });

  it('drops entries with a non-positive or fractional quantity', () => {
    // A stale or hand-edited payload must degrade, not crash the page.
    const raw =
      '{"lines":[{"productId":"a","quantity":0},{"productId":"b","quantity":1.5},{"productId":"c","quantity":2}]}';

    expect(parseStoredCart(raw).lines).toEqual([{ productId: 'c', quantity: 2 }]);
  });

  it('drops entries missing a product id', () => {
    expect(parseStoredCart('{"lines":[{"quantity":2}]}').lines).toEqual([]);
  });
});
