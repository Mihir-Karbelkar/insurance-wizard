export const formatAmount = (amount: number, locale: string = 'en-IN') => {
  return new Intl.NumberFormat(locale, {
    maximumSignificantDigits: 3,
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};
