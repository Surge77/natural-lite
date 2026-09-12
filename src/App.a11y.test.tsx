import { render } from '@testing-library/react';
import axe from 'axe-core';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('homepage accessibility', () => {
  it('has no detectable structural accessibility violations', async () => {
    const { container } = render(<App />);
    const result = await axe.run(container, {
      rules: {
        // jsdom does not calculate layout, font rendering, or composited colour.
        'color-contrast': { enabled: false },
      },
    });

    expect(
      result.violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.flatMap((node) => node.target),
      })),
    ).toEqual([]);
  });
});
