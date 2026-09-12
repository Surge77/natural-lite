/**
 * Shared content shapes. Every section reads its copy from `src/data` through
 * these types, so nothing in `src/components` holds a hardcoded string.
 */

/**
 * One image slot. `src` may point at a placeholder today; swapping in the real
 * photo is a file replacement because width/height/ratio are declared here.
 */
export interface ImageAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  /** Flat colour shown while the image decodes — prevents a white flash. */
  readonly placeholderColor?: string;
  /** Sources for a <picture>, most-preferred first. */
  readonly sources?: readonly ImageSource[];
}

export interface ImageSource {
  readonly srcSet: string;
  readonly type: 'image/avif' | 'image/webp';
}

/** Name of an icon in the sprite at `public/assets/brand/icons.svg`. */
export type IconName =
  | 'leaf'
  | 'sprout'
  | 'no-additives'
  | 'nutrients'
  | 'lab-tested'
  | 'made-in-india'
  | 'hygienic'
  | 'farmer'
  | 'processing'
  | 'testing'
  | 'packaging'
  | 'hands'
  | 'energy'
  | 'heart'
  | 'detox'
  | 'stamina'
  | 'women-partners'
  | 'women-opportunity'
  | 'communities'
  | 'families'
  | 'pure'
  | 'empowered'
  | 'nutrition'
  | 'trust'
  | 'search'
  | 'account'
  | 'cart'
  | 'play'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-down'
  | 'menu'
  | 'close'
  | 'star'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'whatsapp'
  | 'minus'
  | 'plus';

/** Icon paired with a short caption — the page's most repeated pattern. */
export interface IconLabel {
  readonly id: string;
  readonly icon: IconName;
  readonly label: string;
}

export interface JourneyStep {
  readonly id: string;
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
  readonly image: ImageAsset;
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly authorName: string;
  readonly authorLocation: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly avatar: ImageAsset;
}

export interface ImpactStat {
  readonly id: string;
  readonly icon: IconName;
  /** Numeric part, used by the count-up animation. */
  readonly value: number;
  /** Rendered after the number, e.g. "+". */
  readonly suffix: string;
  readonly label: string;
}

export interface CommunityPost {
  readonly id: string;
  readonly image: ImageAsset;
  readonly href: string;
}
