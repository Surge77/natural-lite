import { RootLayout } from '@/components/layout';
import { CartProvider } from '@/context/cart-context';
import { HomePage } from '@/pages/home-page';

export function App() {
  return (
    <CartProvider>
      <RootLayout>
        <HomePage />
      </RootLayout>
    </CartProvider>
  );
}
