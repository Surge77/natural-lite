import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Icon } from '@/components/primitives/icon';
import { cn } from '@/lib/cn';
import type { IconName } from '@/types';

export type ButtonVariant = 'primary' | 'outline' | 'onDark';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  /** Icon rendered after the label, matching the comp's cart and play buttons. */
  readonly trailingIcon?: IconName;
  readonly leadingIcon?: IconName;
  readonly fullWidth?: boolean;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-nl-green-900 text-nl-cream-50 hover:bg-nl-green-800 active:bg-nl-green-950',
  outline:
    'border border-nl-green-900/25 bg-white text-nl-green-900 hover:border-nl-green-900/50 hover:bg-nl-cream-100',
  onDark:
    'border border-nl-cream-50/35 text-nl-cream-50 hover:border-nl-cream-50/70 hover:bg-nl-cream-50/10',
};

/** Min height keeps every size at or above the 44px comfortable touch target. */
const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-9 gap-1.5 px-3 text-caption',
  md: 'min-h-11 gap-2 px-5 text-label',
  lg: 'min-h-[3.25rem] gap-2.5 px-7 text-body',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  trailingIcon,
  leadingIcon,
  fullWidth = false,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium tracking-wide',
        'transition-colors duration-(--duration-base) ease-(--ease-brand)',
        'disabled:pointer-events-none disabled:opacity-55',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        className,
      )}
      {...rest}
    >
      {leadingIcon ? <Icon name={leadingIcon} size={16} /> : null}
      <span className="whitespace-nowrap">{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={16} /> : null}
    </button>
  );
}
