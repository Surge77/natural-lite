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
    <Section labelledBy={HEADING_ID} tone="creamWarm">
      <Container>
        <SectionHeading id={HEADING_ID}>{SECTION_HEADINGS.products}</SectionHeading>

        <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
