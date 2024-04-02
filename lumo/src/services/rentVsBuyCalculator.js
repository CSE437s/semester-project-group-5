export const calculateRentVsBuy = (rentData, buyData) => {
  const loanAmount = buyData.homePrice - buyData.downPayment;
  const monthlyInterestRate = (buyData.interestRate / 100) / 12;
  const numberOfPayments = buyData.loanTerm * 12;

  // Monthly mortgage payment calculation using the formula:
  const monthlyMortgagePayment = loanAmount * 
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Initialize the cost arrays
  const rentCostsOverTime = [];
  const buyCostsOverTime = [];

  // Populate the cost arrays
  for (let year = 1; year <= buyData.loanTerm; year++) {
    const yearlyRentCost = rentData.monthlyRent * 12 * year;
    rentCostsOverTime.push(yearlyRentCost);

    const yearlyBuyCost = monthlyMortgagePayment * 12 * year;
    buyCostsOverTime.push(yearlyBuyCost);
  }

  // Compile the results
  const results = {
    buy: buyCostsOverTime,
    rent: rentCostsOverTime,
  };

  return results;
};
