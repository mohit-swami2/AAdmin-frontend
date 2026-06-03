/**
 * Formats a number as USD currency.
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(amount));
};
