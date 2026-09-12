import type { IconLabel, ImageAsset } from './content';

export type ProductCategory = 'vegetable' | 'leaf' | 'spice' | 'fruit';

export interface Product {
  readonly id: string;
  readonly slug: string;
  /** Display name exactly as it appears on the pouch, e.g. "Beetroot Powder". */
  readonly name: string;
  readonly category: ProductCategory;
  /** The pouch's own colour, surfaced as --product-accent on the card. */
  readonly accentColor: string;
  readonly weightGrams: number;
  /** Integer paise — never a float. Formatted by lib/format-currency. */
  readonly priceInPaise: number;
  readonly image: ImageAsset;
  /** Identical across all ten pouches; referenced, not duplicated. */
  readonly benefits: readonly IconLabel[];
}

export interface CartLine {
  readonly productId: string;
  readonly quantity: number;
}
