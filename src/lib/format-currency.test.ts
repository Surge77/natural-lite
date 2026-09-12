import { describe, expect, it } from 'vitest';

import { formatCurrency } from './format-currency';

describe('formatCurrency', () => {
  it('renders paise as whole rupees', () => {
    expect(formatCurrency(34900)).toBe('₹349');
  });

  it('groups thousands the Indian way', () => {
    // en-IN groups as 1,00,000 rather than 100,000.
    expect(formatCurrency(10000000)).toBe('₹1,00,000');
  });

  it('renders a zero price', () => {
    expect(formatCurrency(0)).toBe('₹0');
  });

  it('rounds sub-rupee amounts rather than showing decimals', () => {
    expect(formatCurrency(34950)).toBe('₹350');
  });
});
