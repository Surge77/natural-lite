import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import { CartProvider } from '@/context/cart-context';
import { PRODUCTS } from '@/data';
import { useCart } from '@/hooks';

import { RootLayout } from './root-layout';

function AddFirstProduct() {
  const { add } = useCart();
  return <button onClick={() => add(PRODUCTS[0]!.id)}>Add fixture product</button>;
}

const renderLayout = () =>
  render(
    <CartProvider>
      <RootLayout>
        <AddFirstProduct />
      </RootLayout>
    </CartProvider>,
  );

describe('RootLayout commerce controls', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('opens a product search dialog and filters the catalogue', async () => {
    const user = userEvent.setup();
    renderLayout();

    await user.click(screen.getByRole('button', { name: 'Search products' }));
    const dialog = screen.getByRole('dialog', { name: 'Search our powders' });
    expect(dialog).toBeInTheDocument();

    await user.type(screen.getByRole('searchbox', { name: 'Search products' }), 'turmeric');
    const result = within(dialog).getByRole('link', { name: /Turmeric Powder/i });
    expect(result).toHaveAttribute(
      'href',
      '#product-turmeric',
    );
    expect(within(dialog).queryByRole('link', { name: /Beetroot Powder/i })).not.toBeInTheDocument();

    await user.click(result);
    expect(screen.queryByRole('dialog', { name: 'Search our powders' })).not.toBeInTheDocument();
  });

  it('shows a composed empty search state', async () => {
    const user = userEvent.setup();
    renderLayout();

    await user.click(screen.getByRole('button', { name: 'Search products' }));
    const dialog = screen.getByRole('dialog', { name: 'Search our powders' });
    await user.type(screen.getByRole('searchbox', { name: 'Search products' }), 'coffee');

    expect(within(dialog).getByText('No matching powder')).toBeInTheDocument();
  });

  it('opens a useful cart drawer from the header control', async () => {
    const user = userEvent.setup();
    renderLayout();

    await user.click(screen.getByRole('button', { name: 'Add fixture product' }));
    await user.click(screen.getByRole('button', { name: 'Cart, 1 item' }));

    const dialog = screen.getByRole('dialog', { name: 'Your cart' });
    expect(within(dialog).getByText('Beetroot Powder')).toBeInTheDocument();
    expect(within(dialog).getByText('₹349')).toBeInTheDocument();
    expect(within(dialog).getByText('Subtotal')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: 'Increase Beetroot Powder quantity' }));
    expect(within(dialog).getByText('₹349 × 2')).toBeInTheDocument();

    await user.click(within(dialog).getByRole('button', { name: 'Clear cart' }));
    expect(within(dialog).getByText('Your cart is empty')).toBeInTheDocument();
  });
});
