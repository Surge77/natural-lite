import type { FooterColumn, IconLabel, NavItem, NavLink } from '@/types';

import { CONTACT } from './brand';

/** Primary navigation. Only "Products" carries a dropdown in the comp. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'our-story', label: 'Our Story', href: '/our-story' },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    children: [
      { id: 'all', label: 'All Products', href: '/products' },
      { id: 'vegetable', label: 'Vegetable Powders', href: '/products/vegetable' },
      { id: 'leaf', label: 'Leaf Powders', href: '/products/leaf' },
      { id: 'spice', label: 'Spice Powders', href: '/products/spice' },
      { id: 'combo', label: 'Combo Packs', href: '/products/combo' },
    ],
  },
  { id: 'wellness', label: 'Wellness', href: '/wellness' },
  { id: 'women-empowerment', label: 'Women Empowerment', href: '/women-empowerment' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    id: 'shop',
    heading: 'Shop',
    links: [
      { id: 'all', label: 'All Products', href: '/products' },
      { id: 'vegetable', label: 'Vegetable Powders', href: '/products/vegetable' },
      { id: 'leaf', label: 'Leaf Powders', href: '/products/leaf' },
      { id: 'spice', label: 'Spice Powders', href: '/products/spice' },
      { id: 'combo', label: 'Combo Packs', href: '/products/combo' },
    ],
  },
  {
    id: 'company',
    heading: 'Company',
    links: [
      { id: 'our-story', label: 'Our Story', href: '/our-story' },
      { id: 'women', label: 'Women Empowerment', href: '/women-empowerment' },
      { id: 'quality', label: 'Quality Promise', href: '/quality-promise' },
      { id: 'blog', label: 'Blog', href: '/blog' },
      { id: 'careers', label: 'Careers', href: '/careers' },
    ],
  },
  {
    id: 'help',
    heading: 'Help',
    links: [
      { id: 'faqs', label: 'FAQs', href: '/faqs' },
      { id: 'shipping', label: 'Shipping & Delivery', href: '/shipping' },
      { id: 'returns', label: 'Returns & Refunds', href: '/returns' },
      { id: 'terms', label: 'Terms & Conditions', href: '/terms' },
      { id: 'privacy', label: 'Privacy Policy', href: '/privacy' },
    ],
  },
];

export const CONTACT_LINKS: readonly NavLink[] = [
  { id: 'phone', label: CONTACT.phone, href: CONTACT.phoneHref },
  { id: 'email', label: CONTACT.email, href: CONTACT.emailHref },
  { id: 'address', label: CONTACT.address, href: '#' },
];

export const CONTACT_ICONS = ['phone', 'mail', 'pin'] as const;

export const SOCIAL_LINKS: readonly (IconLabel & { href: string })[] = [
  {
    id: 'instagram',
    icon: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/naturallite.india',
  },
  {
    id: 'facebook',
    icon: 'facebook',
    label: 'Facebook',
    href: 'https://facebook.com/naturallite.india',
  },
  {
    id: 'youtube',
    icon: 'youtube',
    label: 'YouTube',
    href: 'https://youtube.com/@naturallite',
  },
  {
    id: 'whatsapp',
    icon: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/911234567890',
  },
];
