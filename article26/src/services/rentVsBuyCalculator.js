export const calculateRentVsBuy = (rentData, buyData) => {
  // Convert input data to numbers
  const homePrice = Number(buyData.homePrice);
  const downPayment = Number(buyData.downPayment);
  const interestRate = Number(buyData.interestRate);
  const loanTerm = Number(buyData.loanTerm);
  const monthlyRent = Number(rentData.monthlyRent);

  // Check for valid numerical input values
  const invalidInputs = {};
  if (isNaN(homePrice)) invalidInputs.homePrice = buyData.homePrice;
  if (isNaN(downPayment)) invalidInputs.downPayment = buyData.downPayment;
  if (isNaN(interestRate)) invalidInputs.interestRate = buyData.interestRate;
  if (isNaN(loanTerm)) invalidInputs.loanTerm = buyData.loanTerm;
  if (isNaN(monthlyRent)) invalidInputs.monthlyRent = rentData.monthlyRent;

  if (Object.keys(invalidInputs).length > 0) {
    console.error('Invalid number inputs', invalidInputs);
    return { rent: [], buy: [] };
  }

  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;

  // Monthly mortgage payment calculation using the formula
  const monthlyMortgagePayment = loanAmount *
    (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  // Initialize the cost arrays
  const rentCostsOverTime = [];
  const buyCostsOverTime = [];

  // Populate the cost arrays
  for (let year = 1; year <= loanTerm; year++) {
    const yearlyRentCost = monthlyRent * 12 * year;
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
