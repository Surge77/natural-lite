import type { IconLabel, ImpactStat } from '@/types';

/**
 * The five short marks used in the announcement bar and the hero badge row.
 * The comp repeats this set in both places, so it is defined once.
 */
export const TRUST_MARKS: readonly IconLabel[] = [
  { id: 'natural', icon: 'leaf', label: '100% Natural' },
  { id: 'no-additives', icon: 'no-additives', label: 'No Additives' },
  { id: 'nutrients', icon: 'nutrients', label: 'Rich in Nutrients' },
  { id: 'lab-tested', icon: 'lab-tested', label: 'Lab Tested' },
  { id: 'made-in-india', icon: 'made-in-india', label: 'Made in India' },
];

/**
 * The six longer marks in the "Trust in Every Spoon" band. Labels wrap to two
 * lines in the comp; the break is left to the layout rather than hardcoded.
 */
export const TRUST_PILLARS: readonly IconLabel[] = [
  { id: 'natural-pure', icon: 'leaf', label: '100% Natural & Pure' },
  { id: 'no-preservatives', icon: 'no-additives', label: 'No Additives or Preservatives' },
  { id: 'rich-nutrients', icon: 'nutrients', label: 'Rich in Nutrients' },
  { id: 'lab-tested', icon: 'lab-tested', label: 'Lab Tested' },
  { id: 'hygienic', icon: 'hygienic', label: 'Hygienically Processed' },
  { id: 'made-in-india', icon: 'made-in-india', label: 'Made in India' },
];

/** The four values beside the brand-story photo. */
export const BRAND_VALUES: readonly IconLabel[] = [
  { id: 'pure', icon: 'pure', label: 'Pure Ingredients' },
  { id: 'empowered', icon: 'empowered', label: 'Women Empowered' },
  { id: 'nutrition', icon: 'nutrition', label: 'Nutrition for Every Family' },
  { id: 'trust', icon: 'trust', label: 'Trust in Every Spoon' },
];

/**
 * Impact-band figures. `value` is kept numeric so the count-up animation can
 * read it; `suffix` carries the "+" that follows.
 */
export const IMPACT_STATS: readonly ImpactStat[] = [
  {
    id: 'sourcing-partners',
    icon: 'women-partners',
    value: 500,
    suffix: '+',
    label: 'Women-led sourcing partners',
  },
  {
    id: 'fair-opportunity',
    icon: 'women-opportunity',
    value: 250,
    suffix: '+',
    label: 'Women given fair opportunity',
  },
  {
    id: 'communities',
    icon: 'communities',
    value: 20,
    suffix: '+',
    label: 'Rural communities impacted',
  },
  {
    id: 'families',
    icon: 'families',
    value: 10000,
    suffix: '+',
    label: 'Families choosing natural wellness',
  },
];
