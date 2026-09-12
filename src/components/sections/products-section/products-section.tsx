import { Container, Section, SectionHeading } from '@/components/primitives';
import { ProductCard } from '@/components/composites';
import { PRODUCTS, SECTION_HEADINGS } from '@/data';

const HEADING_ID = 'products-heading';

/**
 * The ten-product grid.
 *
 * Columns step 5 -> 4 -> 3 -> 2 and stop at two: a single column on phones would
 * make the page enormously long and is not how shoppers scan a range.
 */
export function ProductsSection() {
  return (
    <Section id="products" labelledBy={HEADING_ID} tone="creamWarm">
      <Container>
        <SectionHeading id={HEADING_ID}>{SECTION_HEADINGS.products}</SectionHeading>

        <p className="mx-auto mt-2 max-w-xl text-center text-body text-nl-ink-500">
          Pure ingredients, carefully processed in small batches and packed for everyday cooking.
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4">
          {PRODUCTS.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} className="h-full" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
