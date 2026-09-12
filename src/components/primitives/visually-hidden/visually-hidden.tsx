import type { ReactNode } from 'react';

export interface VisuallyHiddenProps {
  readonly children: ReactNode;
}

/** Content for screen readers only — removed from sight, kept in the a11y tree. */
export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return <span className="sr-only">{children}</span>;
}
