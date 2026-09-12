import type { IconLabel, ImageAsset, Product, ProductCategory } from '@/types';

/**
 * The four benefit marks printed on every pouch. Identical across all ten SKUs,
 * so they are referenced rather than repeated on each product.
 */
export const PRODUCT_BENEFITS: readonly IconLabel[] = [
  { id: 'energy', icon: 'energy', label: 'Boosts Energy' },
  { id: 'heart', icon: 'heart', label: 'Supports Heart Health' },
  { id: 'detox', icon: 'detox', label: 'Detox & Cleanse' },
  { id: 'stamina', icon: 'stamina', label: 'Improves Stamina' },
];

const WEIGHT_GRAMS = 100;

/**
 * The grid shot: the pouch surrounded by the produce it is made from, exactly
 * as composed in the comp. Cropped from the reference by `assets:artwork`.
 *
 * The client's own bare-pouch photographs are higher resolution and remain at
 * `/assets/products/<slug>.webp` for a future product page, but they show the
 * pouch alone and would not match the approved grid.
 */
function cardImage(slug: string, name: string): ImageAsset {
  return {
    src: `/assets/products/${slug}-card.webp`,
    alt: `Natural Lite Premium ${name} pouch beside the fresh ${name.replace(' Powder', '').toLowerCase()} it is made from`,
    width: 504,
    height: 428,
    placeholderColor: '#fbf7f0',
    sources: [
      { type: 'image/avif', srcSet: `/assets/products/${slug}-card.avif` },
      { type: 'image/webp', srcSet: `/assets/products/${slug}-card.webp` },
    ],
  };
}

interface ProductSeed {
  readonly slug: string;
  readonly name: string;
  readonly category: ProductCategory;
  /** Sampled from the pouch itself by assets:prepare, not chosen by eye. */
  readonly accentColor: string;
  readonly priceInPaise: number;
}

/**
 * Order matches the comp: Beetroot, Spinach, Turmeric, Moringa, Amla on the
 * first row; Tomato, Carrot, Onion, Ginger, Garlic on the second.
 *
 * Prices are placeholders — the comp shows none. See docs/CLIENT-QUESTIONS.md.
 */
const SEEDS: readonly ProductSeed[] = [
  { slug: 'beetroot', name: 'Beetroot Powder', category: 'vegetable', accentColor: '#612624', priceInPaise: 34900 },
  { slug: 'spinach', name: 'Spinach Powder', category: 'leaf', accentColor: '#565f16', priceInPaise: 29900 },
  { slug: 'turmeric', name: 'Turmeric Powder', category: 'spice', accentColor: '#b26e29', priceInPaise: 39900 },
  { slug: 'moringa', name: 'Moringa Powder', category: 'leaf', accentColor: '#45661e', priceInPaise: 44900 },
  { slug: 'amla', name: 'Amla Powder', category: 'fruit', accentColor: '#84751d', priceInPaise: 32900 },
  { slug: 'tomato', name: 'Tomato Powder', category: 'vegetable', accentColor: '#953828', priceInPaise: 31900 },
  { slug: 'carrot', name: 'Carrot Powder', category: 'vegetable', accentColor: '#b45f29', priceInPaise: 29900 },
  { slug: 'onion', name: 'Onion Powder', category: 'vegetable', accentColor: '#632947', priceInPaise: 27900 },
  { slug: 'ginger', name: 'Ginger Powder', category: 'spice', accentColor: '#a57943', priceInPaise: 36900 },
  { slug: 'garlic', name: 'Garlic Powder', category: 'vegetable', accentColor: '#845452', priceInPaise: 33900 },
];

export const PRODUCTS: readonly Product[] = SEEDS.map((seed) => ({
  id: seed.slug,
  slug: seed.slug,
  name: seed.name,
  category: seed.category,
  accentColor: seed.accentColor,
  weightGrams: WEIGHT_GRAMS,
  priceInPaise: seed.priceInPaise,
  image: cardImage(seed.slug, seed.name),
  benefits: PRODUCT_BENEFITS,
}));

export const PRODUCTS_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));
