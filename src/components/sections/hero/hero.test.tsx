import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Hero } from './hero';

describe('Hero', () => {
  it('links its calls to action to real sections', () => {
    render(<Hero />);

    expect(screen.getByRole('link', { name: /Shop Our Powders/i })).toHaveAttribute(
      'href',
      '#products',
    );
    expect(screen.getByRole('link', { name: /Our Women, Our Story/i })).toHaveAttribute(
      'href',
      '#brand-story',
    );
  });

  it('renders the brand statement as live text', () => {
    render(<Hero />);

    expect(screen.getAllByText('Rooted in Nature.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Driven by Women.').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Made for Wellness.').length).toBeGreaterThan(0);
  });
});
