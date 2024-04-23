import React, { useState } from 'react';
import InvestmentInputForm from '../components/InvestmentCalc/InvestmentInputForm';
import InvestmentGraph from '../components/InvestmentCalc/InvestmentGraph';
// No import for InvestmentBreakdown since it's not being used

// Function to calculate investment growth (this logic remains unchanged)
const calculateInvestmentGrowth = (initialInvestment, monthlyContribution, years, rateOfReturn) => {
  const monthlyRate = rateOfReturn / 12 / 100; // Convert annual rate to a monthly rate
  let totalAmount = initialInvestment;
  let investmentData = [{ name: 'Start', value: totalAmount }];

  for (let month = 1; month <= years * 12; month++) {
    totalAmount = totalAmount * (1 + monthlyRate) + monthlyContribution;
    if (month % 12 === 0) { // Record data annually
      investmentData.push({ name: `Year ${month / 12}`, value: totalAmount });
    }
  }

  return {
    investmentData, // Data for the graph
    investmentDetails: { // Details for the breakdown
      initial: initialInvestment,
      contribution: monthlyContribution,
      years: years,
      rate: rateOfReturn,
      totalBalance: totalAmount,
      interestEarned: totalAmount - (initialInvestment + monthlyContribution * 12 * years)
    }
  };
};

function InvestmentCalculatorPage() {
  // State initialization for investment details and graph data
  const initialInvestmentDetails = {
    initial: 0,
    contribution: 0,
    years: 0,
    rate: 0,
    totalBalance: 0,
    interestEarned: 0
  };

  // State hooks for graph data and investment details
  const [investmentData, setInvestmentData] = useState([]);
  const [investmentDetails, setInvestmentDetails] = useState(initialInvestmentDetails);

  // Handler for form submission
  const handleFormSubmit = (formData) => {
    const calculatedResults = calculateInvestmentGrowth(
      Number(formData.initialInvestment),
      Number(formData.monthlyContribution),
      Number(formData.years),
      Number(formData.rateOfReturn)
    );
    setInvestmentData(calculatedResults.investmentData);
    setInvestmentDetails(calculatedResults.investmentDetails);
  }; 

  // Style for the page title
  const titleStyle = {
    color: 'white', // Adjust the color to fit your theme
    textAlign: 'center',
    margin: '20px 0', // Provides space above and below the title
    fontSize: '60px' // Adjust the size as needed
  };

  // Style for the entire page
  const pageStyle = {
    backgroundColor: 'transparent', // Set the background color to transparent
    width: '100%',
    minHeight: '100vh', // Ensures it takes at least the full viewport height
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Investment Calculator</h1> {/* Title for the page */}
      <InvestmentInputForm onSubmit={handleFormSubmit} />
      {
        investmentData && investmentData.length > 0 
        ? <InvestmentGraph data={investmentData} />
        : null // No longer rendering placeholder text
      }
      {/* The InvestmentBreakdown component has been removed as per the request */}
    </div>
  );
}

export default InvestmentCalculatorPage;

