import { describe, expect, it } from 'vitest';

import { cn } from './cn';

describe('cn', () => {
  it('keeps a text colour alongside a custom font size', () => {
    // Regression: tailwind-merge treated `text-caption` as a colour and dropped
    // `text-nl-cream-50`, rendering button labels invisible against their fill.
    const result = cn('text-nl-cream-50', 'text-caption');

    expect(result).toContain('text-nl-cream-50');
    expect(result).toContain('text-caption');
  });

  it('keeps the last of two competing font sizes', () => {
    expect(cn('text-body', 'text-display-lg')).toBe('text-display-lg');
  });

  it('keeps the last of two competing text colours', () => {
    expect(cn('text-nl-ink-900', 'text-nl-green-900')).toBe('text-nl-green-900');
  });

  it('drops falsy values', () => {
    expect(cn('flex', false, undefined, null, 'gap-2')).toBe('flex gap-2');
  });
});
