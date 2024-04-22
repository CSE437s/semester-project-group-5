import React from 'react';

function InvestmentBreakdown({ investmentDetails }) {
  return (
    <div>
      <h3>Investment Breakdown</h3>
      <p>Initial Investment: ${investmentDetails.initial}</p>
      <p>Monthly Contribution: ${investmentDetails.contribution}</p>
      <p>Years to Grow: {investmentDetails.years}</p>
      <p>Rate of Return: {investmentDetails.rate}%</p>
      <p>Total Balance: ${investmentDetails.totalBalance}</p>
    </div>
  );
}

export default InvestmentBreakdown;
