import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { FooterColumn as FooterColumnData } from '@/types';

import { FooterColumn } from './footer-column';

const column: FooterColumnData = {
  id: 'help',
  heading: 'Help',
  links: [{ id: 'contact', label: 'Contact us', href: '#contact' }],
};

describe('FooterColumn', () => {
  it('starts collapsed on mobile while keeping its links available at desktop sizes', () => {
    const { container } = render(<FooterColumn column={column} />);

    expect(container.querySelector('details')).not.toHaveAttribute('open');
    expect(screen.getByRole('list')).toHaveClass('hidden', 'md:flex');
  });
});
