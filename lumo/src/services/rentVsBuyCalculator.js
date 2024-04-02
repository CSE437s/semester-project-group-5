export const calculateRentVsBuy = (rentData, buyData) => {
  const loanAmount = buyData.homePrice - buyData.downPayment;
  const monthlyInterestRate = (buyData.interestRate / 100) / 12;
  const numberOfPayments = buyData.loanTerm * 12;

  // Monthly mortgage payment calculation using the formula:
  // M = P[r(1+r)^n]/[(1+r)^n-1]
  const monthlyMortgagePayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Calculate total cost of buying
  const totalBuyCost = monthlyMortgagePayment * numberOfPayments;

  // Calculate total cost of renting
  const totalRentCost = rentData.monthlyRent * numberOfPayments;

  // Calculate the monthly and total cost difference
  const monthlyCostDifference = monthlyMortgagePayment - rentData.monthlyRent;
  const totalCostDifference = totalBuyCost - totalRentCost;

  // Compile the results
  const results = {
    buy: {
      monthly: monthlyMortgagePayment,
      total: totalBuyCost,
    },
    rent: {
      monthly: rentData.monthlyRent,
      total: totalRentCost,
    },
    difference: {
      monthly: monthlyCostDifference,
      total: totalCostDifference,
    }
  };

  return results;
};


