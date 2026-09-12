import type { FooterColumn, IconLabel, NavItem, NavLink } from '@/types';

import { BRAND, CONTACT } from './brand';

/** Primary navigation. Only "Products" carries a dropdown in the comp. */
export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', label: 'Home', href: '#top' },
  { id: 'our-story', label: 'Our Story', href: '#brand-story' },
  {
    id: 'products',
    label: 'Products',
    href: '#products',
    children: [
      { id: 'all', label: 'All Products', href: '#products' },
      { id: 'vegetable', label: 'Vegetable Powders', href: '#product-beetroot' },
      { id: 'leaf', label: 'Leaf Powders', href: '#product-spinach' },
      { id: 'spice', label: 'Spice Powders', href: '#product-turmeric' },
    ],
  },
  { id: 'wellness', label: 'Wellness', href: '#trust' },
  { id: 'women-empowerment', label: 'Women Empowerment', href: '#impact' },
  { id: 'community', label: 'Community', href: '#community' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    id: 'shop',
    heading: 'Shop',
    links: [
      { id: 'all', label: 'All Products', href: '#products' },
      { id: 'beetroot', label: 'Beetroot Powder', href: '#product-beetroot' },
      { id: 'turmeric', label: 'Turmeric Powder', href: '#product-turmeric' },
      { id: 'moringa', label: 'Moringa Powder', href: '#product-moringa' },
      { id: 'amla', label: 'Amla Powder', href: '#product-amla' },
    ],
  },
  {
    id: 'company',
    heading: 'Company',
    links: [
      { id: 'our-story', label: 'Our Story', href: '#brand-story' },
      { id: 'women', label: 'Women Empowerment', href: '#impact' },
      { id: 'quality', label: 'Quality Promise', href: '#journey' },
      { id: 'community', label: 'Community', href: '#community' },
    ],
  },
  {
    id: 'help',
    heading: 'Help',
    links: [
      { id: 'product-help', label: 'Product questions', href: `${CONTACT.emailHref}?subject=Product%20question` },
      { id: 'shipping', label: 'Shipping questions', href: `${CONTACT.emailHref}?subject=Shipping%20question` },
      { id: 'returns', label: 'Returns support', href: `${CONTACT.emailHref}?subject=Returns%20support` },
      { id: 'whatsapp', label: 'Order on WhatsApp', href: BRAND.whatsappUrl },
      { id: 'contact', label: 'Contact us', href: '#contact' },
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
