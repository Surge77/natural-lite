import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import type { FooterColumn as FooterColumnData } from '@/types';

import { FooterColumn } from './footer-column';

const column: FooterColumnData = {
  id: 'help',
  heading: 'Help',
  links: [
    { id: 'faqs', label: 'FAQs', href: '#faqs' },
    { id: 'contact', label: 'Contact us', href: '#contact' },
  ],
};

const originalMatchMedia = window.matchMedia;

/** Reports every query as matching or not, standing in for a viewport width. */
function setViewportMatches(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe('FooterColumn', () => {
  it('stands open from tablet up so the links are reachable', () => {
    setViewportMatches(true);

    const { container } = render(<FooterColumn column={column} />);

    // A closed <details> hides its content via the UA stylesheet, so `open` is
    // what actually makes the links visible — not a class on the list.
    expect(container.querySelector('details')).toHaveAttribute('open');
  });

  it('starts collapsed on phones so the footer stays short', () => {
    setViewportMatches(false);

    const { container } = render(<FooterColumn column={column} />);

    expect(container.querySelector('details')).not.toHaveAttribute('open');
  });

  it('renders every link in the column, whatever the viewport', () => {
    setViewportMatches(false);

    render(<FooterColumn column={column} />);

    expect(screen.getByRole('link', { name: 'FAQs' })).toHaveAttribute('href', '#faqs');
    expect(screen.getByRole('link', { name: 'Contact us' })).toHaveAttribute('href', '#contact');
    expect(screen.getAllByRole('link')).toHaveLength(column.links.length);
  });

  it('labels the column with its heading', () => {
    setViewportMatches(true);

    render(<FooterColumn column={column} />);

    expect(screen.getByRole('heading', { name: 'Help' })).toBeInTheDocument();
  });
});
