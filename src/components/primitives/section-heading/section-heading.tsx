import type { ReactNode } from 'react';

import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';

export interface SectionHeadingProps {
  readonly id: string;
  readonly children: ReactNode;
  /** The comp sets a small leaf beside two of the headings. */
  readonly withLeaf?: boolean;
  readonly align?: 'center' | 'left';
  readonly tone?: 'default' | 'onDark';
  readonly className?: string;
  readonly as?: 'h2' | 'h3';
}

/** The serif band title. Its id is what each Section points `aria-labelledby` at. */
export function SectionHeading({
  id,
  children,
  withLeaf = false,
  align = 'center',
  tone = 'default',
  className,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <Tag
      id={id}
      className={cn(
        'flex flex-wrap items-center gap-2 text-display-lg',
        align === 'center' ? 'justify-center text-center' : 'justify-start text-left',
        tone === 'onDark' ? 'text-nl-cream-50' : 'text-nl-green-900',
        className,
      )}
    >
      <span>{children}</span>
      {withLeaf ? <Icon name="leaf" size={20} className="text-nl-green-600" /> : null}
    </Tag>
  );
}
