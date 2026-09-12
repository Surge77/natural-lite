import { cn } from '@/lib/cn';

import { MastercardMark, RupayMark, UpiMark, VisaMark } from './payment-marks';

export interface PaymentMethodsProps {
  readonly className?: string;
}

/** Order matches the comp: UPI, Visa, Mastercard, RuPay. */
const MARKS = [UpiMark, VisaMark, MastercardMark, RupayMark];

/** Accepted payment marks in the footer bar. */
export function PaymentMethods({ className }: PaymentMethodsProps) {
  return (
    <ul
      className={cn('flex flex-wrap items-center gap-2', className)}
      aria-label="Accepted payment methods"
    >
      {MARKS.map((Mark, index) => (
        <li key={index} className="flex items-center">
          <Mark />
        </li>
      ))}
    </ul>
  );
}
