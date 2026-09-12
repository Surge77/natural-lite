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

  it('shows the price and weight before the add control', () => {
    renderCard();

    expect(screen.getByText('₹349')).toBeInTheDocument();
    expect(screen.getByText('100 g')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /₹349 for 100 grams/ }),
    ).toBeInTheDocument();
  });

  it('uses the supplied high-resolution pouch photograph', () => {
    renderCard();

    expect(screen.getByRole('img', { name: /Beetroot Powder/i })).toHaveAttribute(
      'src',
      '/assets/products/beetroot@2x.webp',
    );
  });

  it('labels the product shot for screen readers', () => {
    renderCard();

    expect(
      screen.getByRole('img', { name: /Natural Lite Premium Beetroot Powder pouch/i }),
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
