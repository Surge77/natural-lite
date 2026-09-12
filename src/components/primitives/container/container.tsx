import type { ElementType, ReactNode } from 'react';

import { cn } from '@/lib/cn';

export interface ContainerProps {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
}

/**
 * The single source of the page's horizontal rhythm.
 *
 * Width is taken from the comp, where content spans ~90% of the canvas: 1296px
 * of content inside a 1344px box. Both numbers live in tokens.css so a
 * full-bleed band can line up with this edge without restating them.
 */
export function Container({ children, as: Tag = 'div', className }: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-(--nl-container-max) px-(--nl-gutter)', className)}>
      {children}
    </Tag>
  );
}
