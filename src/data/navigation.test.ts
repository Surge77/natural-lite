import { describe, expect, it } from 'vitest';

import { FOOTER_COLUMNS, NAV_ITEMS } from './navigation';

describe('single-page navigation', () => {
  it('does not expose routes that the app cannot render', () => {
    const navLinks = NAV_ITEMS.flatMap((item) => [item, ...(item.children ?? [])]);
    const footerLinks = FOOTER_COLUMNS.flatMap((column) => column.links);

    for (const link of [...navLinks, ...footerLinks]) {
      expect(link.href, `${link.label} has a dead route`).toMatch(/^#|^mailto:|^tel:|^https:\/\//);
    }
  });
});
