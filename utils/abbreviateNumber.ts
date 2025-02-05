export const abbreviateNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-IN', {
    notation: 'compact', // Use "compact" notation for short form
    minimumFractionDigits: 2, // Show at least one decimal place
    maximumFractionDigits: 3,
    style: 'currency',
    currency: 'INR', // Show at most two decimal places
  });
  return formatter.format(number);
};
