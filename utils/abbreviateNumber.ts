export const abbreviateNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact', // Use "compact" notation for short form
    minimumFractionDigits: 1, // Show at least one decimal place
    maximumFractionDigits: 2, // Show at most two decimal places
  });
  return formatter.format(number);
};
