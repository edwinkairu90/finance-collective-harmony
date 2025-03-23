
/**
 * Format a number as a currency string
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number as a percentage
 */
export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};
