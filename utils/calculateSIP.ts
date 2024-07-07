export const calculateSIP = (
  investment: number,
  interest: number,
  time: number
) => {
  // Calculate number of months
  const months = time * 12;
  const total_investment = investment * time * 12;
  // Calculate monthly interest rate
  const monthlyInterestRate = interest / 100 / 12;

  // Calculate future value of SIP installments
  const total_earn = Math.round(
    ((investment * (Math.pow(1 + monthlyInterestRate, months) - 1)) /
      monthlyInterestRate) *
      (1 + monthlyInterestRate)
  );

  const profit = Math.round(total_earn - total_investment);

  return { total_investment, profit, total_earn };
};
