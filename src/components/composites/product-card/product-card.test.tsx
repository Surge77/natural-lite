import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { CartProvider } from '@/context/cart-context';
import { PRODUCTS } from '@/data';

import { ProductCard } from './product-card';

const product = PRODUCTS[0]!;

// The cart persists to localStorage, which jsdom shares across tests in a file.
// Without this, each test would inherit the previous test's cart.
beforeEach(() => {
  localStorage.clear();
});

const renderCard = () =>
  render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>,
  );

describe('ProductCard', () => {
  it('shows the product name', () => {
    renderCard();

    expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
  });

  it('keeps price and weight out of sight but in the add control name', () => {
    // The approved comp shows no price on the card, so it reaches screen
    // readers through the button's accessible name instead of visible text.
    renderCard();

    expect(screen.queryByText(/₹349/)).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /₹349 for 100 grams/ }),
    ).toBeInTheDocument();
  });

  it('labels the product shot for screen readers', () => {
    renderCard();

    expect(
      screen.getByRole('img', { name: /Beetroot Powder pouch beside the fresh beetroot/i }),
    ).toBeInTheDocument();
  });

  it('swaps the buy button for a quantity stepper once added', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /Add Beetroot Powder/ }));

    expect(screen.queryByRole('button', { name: /Add Beetroot Powder/ })).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: `Increase ${product.name} quantity` }),
    ).toBeInTheDocument();
  });

  it('increments and decrements the quantity', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /Add Beetroot Powder/ }));
    await user.click(screen.getByRole('button', { name: `Increase ${product.name} quantity` }));

    expect(screen.getByText('2')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: `Decrease ${product.name} quantity` }));

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('returns to the buy button when the last unit is removed', async () => {
    const user = userEvent.setup();
    renderCard();

    await user.click(screen.getByRole('button', { name: /Add Beetroot Powder/ }));
    await user.click(screen.getByRole('button', { name: `Remove ${product.name} from cart` }));

    expect(screen.getByRole('button', { name: /Add Beetroot Powder/ })).toBeInTheDocument();
  });
});
