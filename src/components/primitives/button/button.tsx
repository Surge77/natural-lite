import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

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
  sm: 'min-h-11 gap-1.5 px-3 text-caption',
  md: 'min-h-11 gap-2 px-5 text-label',
  lg: 'min-h-[3.25rem] gap-2.5 px-7 text-body',
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
) {
  return cn(
    'inline-flex items-center justify-center rounded-md font-semibold tracking-wide',
    'transition-[color,background-color,border-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-brand)',
    'active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none',
    'disabled:pointer-events-none disabled:opacity-55',
    VARIANTS[variant],
    SIZES[size],
    fullWidth && 'w-full',
    className,
  );
}

function ButtonContents({
  children,
  leadingIcon,
  trailingIcon,
}: {
  readonly children: ReactNode;
  readonly leadingIcon: IconName | undefined;
  readonly trailingIcon: IconName | undefined;
}) {
  return (
    <>
      {leadingIcon ? <Icon name={leadingIcon} size={16} /> : null}
      <span className="whitespace-nowrap">{children}</span>
      {trailingIcon ? <Icon name={trailingIcon} size={16} /> : null}
    </>
  );
}

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
      className={buttonClasses(variant, size, fullWidth, className)}
      {...rest}
    >
      <ButtonContents leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContents>
    </button>
  );
}

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly trailingIcon?: IconName;
  readonly leadingIcon?: IconName;
  readonly fullWidth?: boolean;
}

/** A navigation action with the same visual language as Button. */
export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  trailingIcon,
  leadingIcon,
  fullWidth = false,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <a className={buttonClasses(variant, size, fullWidth, className)} {...rest}>
      <ButtonContents leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContents>
    </a>
  );
}
