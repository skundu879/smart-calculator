function calculateIncomeTax(
  age,
  grossSalaryIncome,
  anualRentalIncome,
  capitalGains,
  businessIncome,
  anualIncomeFromOtherSources,
  basicDeductions,
  healthInsurance,
  educationLoan,
  donations,
  basicPay,
  hra,
  rentPaid,
  location
) {
  function calculateHRAExemption({
    actualHRAReceived,
    basicSalary,
    rentPaid,
    isMetro,
  }) {
    let metroAllowance = isMetro ? 0.5 * basicSalary : 0.4 * basicSalary;
    let rentExcess = rentPaid - 0.1 * basicSalary;
    let hraExemption = Math.min(actualHRAReceived, metroAllowance, rentExcess);
    return hraExemption;
  }

  function calculateTaxOldRegime(income, age) {
    let tax = 0;
    if (age < 60) {
      if (income <= 250000) {
        tax = 0;
      } else if (income <= 500000) {
        tax = (income - 250000) * 0.05;
      } else if (income <= 1000000) {
        tax = 12500 + (income - 500000) * 0.2;
      } else {
        tax = 12500 + 100000 + (income - 1000000) * 0.3;
      }
    } else if (age >= 60 && age < 80) {
      if (income <= 300000) {
        tax = 0;
      } else if (income <= 500000) {
        tax = (income - 300000) * 0.05;
      } else if (income <= 1000000) {
        tax = 10000 + (income - 500000) * 0.2;
      } else {
        tax = 10000 + 100000 + (income - 1000000) * 0.3;
      }
    } else {
      if (income <= 500000) {
        tax = 0;
      } else if (income <= 1000000) {
        tax = (income - 500000) * 0.2;
      } else {
        tax = 100000 + (income - 1000000) * 0.3;
      }
    }
    return tax;
  }

  function calculateTaxNewRegime(income) {
    let tax = 0;
    if (income <= 300000) {
      tax = 0;
    } else if (income <= 700000) {
      tax = (income - 300000) * 0.05;
    } else if (income <= 1000000) {
      tax = 20000 + (income - 700000) * 0.1;
    } else if (income <= 1200000) {
      tax = 50000 + (income - 1000000) * 0.15;
    } else if (income <= 1500000) {
      tax = 80000 + (income - 1200000) * 0.2;
    } else {
      tax = 140000 + (income - 1500000) * 0.3;
    }
    return tax;
  }

  let grossTotalIncome =
    grossSalaryIncome +
    anualRentalIncome +
    capitalGains +
    businessIncome +
    anualIncomeFromOtherSources;
  let netIncomeAfterExemptions =
    grossTotalIncome -
    calculateHRAExemption({
      actualHRAReceived: hra,
      basicSalary: basicPay,
      rentPaid: rentPaid,
      isMetro: location === 'metro',
    });
  let deductions =
    basicDeductions - healthInsurance - educationLoan - donations;

  let oldTaxableIncome = netIncomeAfterExemptions - deductions - 50000;

  let newTaxableIncome = grossTotalIncome - 75000;
  let oldTax;
  let newTax;
  oldTax = calculateTaxOldRegime(oldTaxableIncome, age);
  newTax = calculateTaxNewRegime(newTaxableIncome);
  let oldCess = oldTax * 0.04;
  let newCess = newTax * 0.04;
  let totalOldTax = oldTax + oldCess;
  let totalNewTax = newTax + newCess;
  return {
    grossTotalIncome,
    totalOldTax,
    totalNewTax,
    taxSaved: totalOldTax - totalNewTax,
    oldTaxableIncome,
    newTaxableIncome,
  };
}
