import { lifestyleImage } from './images';

/**
 * The hero is a single photograph in the comp: the woman, the five pouches, the
 * produce, the counter and the kitchen are one composited scene, not separate
 * elements. It is cropped from the reference artwork by `assets:artwork`.
 *
 * The gold seal and the three-line brand statement are part of that artwork, so
 * they are described in the alt text rather than duplicated as markup.
 */
export const HERO_SCENE = lifestyleImage(
  'hero-scene',
  'A smiling woman in a saree and green dupatta stands behind the five Natural Lite powders — beetroot, spinach, turmeric, moringa and amla — arranged on a kitchen counter with the fresh produce each is made from. Alongside them a gold seal reads 100% Natural, above the words: Rooted in Nature. Driven by Women. Made for Wellness.',
  1852,
  1372,
  '#f3ebdd',
);

export const BRAND_STORY_IMAGE = lifestyleImage(
  'brand-story',
  'A woman eating a bowl of food prepared with Natural Lite powders at her kitchen table',
  864,
  363,
  '#efe2d6',
);
