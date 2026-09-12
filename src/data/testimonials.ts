import type { CommunityPost, Testimonial } from '@/types';

import { BRAND } from './brand';
import { lifestyleImage } from './images';

/**
 * Customer quotes exactly as written in the comp.
 * Named quotes are treated as real copy — see docs/CLIENT-QUESTIONS.md on consent.
 */
export const TESTIMONIALS: readonly Testimonial[] = [
  {
    id: 'priya-pune',
    quote:
      'Natural Lite powders have become a part of our daily routine. Pure, fresh and so easy to use. I love the women empowerment story behind this brand.',
    authorName: 'Priya S.',
    authorLocation: 'Pune',
    rating: 5,
    avatar: lifestyleImage('avatar-1', 'Portrait of Priya S. from Pune', 123, 123),
  },
  {
    id: 'neha-bengaluru',
    quote:
      'The quality is outstanding! You can feel the purity in every spoon. Proud to support a brand that empowers rural women.',
    authorName: 'Neha R.',
    authorLocation: 'Bengaluru',
    rating: 5,
    avatar: lifestyleImage('avatar-2', 'Portrait of Neha R. from Bengaluru', 123, 123),
  },
  {
    id: 'anjali-nashik',
    quote:
      "From my kitchen to my family's health – Natural Lite is my trusted partner.",
    authorName: 'Anjali M.',
    authorLocation: 'Nashik',
    rating: 5,
    avatar: lifestyleImage('avatar-3', 'Portrait of Anjali M. from Nashik', 123, 123),
  },
];

const COMMUNITY_ALTS = [
  'Two Natural Lite pouches styled with fresh beetroot and greens',
  'Bowls and spoons of bright green moringa powder on a pale surface',
  'A woman holding two Natural Lite pouches in her kitchen',
  'Natural Lite pouches in a flat lay with bowls of fresh produce',
  'A pink beetroot smoothie bowl garnished with seeds and cream',
  'A woman at a kitchen counter with Natural Lite pouches and vegetables',
];

/** The six social tiles preceding the follow call-to-action. */
export const COMMUNITY_POSTS: readonly CommunityPost[] = COMMUNITY_ALTS.map(
  (alt, index) => ({
    id: `community-${index + 1}`,
    href: BRAND.instagramUrl,
    image: lifestyleImage(`community-${index + 1}`, alt, 276, 276),
  }),
);
