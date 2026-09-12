import { lifestyleImage } from './images';

/**
 * The hero is a single photograph in the comp: the woman, the five pouches, the
 * produce, the counter and the kitchen are one composited scene, not separate
 * elements. The replacement artwork follows that composition while removing
 * the low-resolution screenshot dependency.
 *
 * Desktop and mobile use separate art-directed photographs. Brand messaging is
 * rendered as live text in the component, never baked into either image.
 */
export const HERO_SCENE = lifestyleImage(
  'hero-scene',
  'A smiling woman in a cream kurta and green dupatta stands behind five Natural Lite powders arranged with fresh beetroot, spinach, turmeric, moringa and amla on a warm kitchen counter.',
  1457,
  1079,
  '#f3ebdd',
);

export const HERO_MOBILE_SCENE = lifestyleImage(
  'hero-mobile',
  HERO_SCENE.alt,
  900,
  1124,
  '#f3ebdd',
);

export const BRAND_STORY_IMAGE = lifestyleImage(
  'brand-story',
  'A woman eating a bowl of food prepared with Natural Lite powders at her kitchen table',
  960,
  400,
  '#efe2d6',
  1800,
);
