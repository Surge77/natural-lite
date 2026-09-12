const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const PAISE_PER_RUPEE = 100;

/**
 * Money is stored as integer paise everywhere, so totals never accumulate
 * floating-point error. Formatting is the only place it becomes a rupee value.
 */
export function formatCurrency(paise: number): string {
  return INR.format(paise / PAISE_PER_RUPEE);
}
