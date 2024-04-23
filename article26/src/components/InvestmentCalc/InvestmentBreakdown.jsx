import React from 'react';

function InvestmentBreakdown({ investmentDetails }) {
  // Inline style for white text
  const breakdownStyle = {
    color: 'white', // This will make the text color white
    textAlign: 'left', // Align text to the left
    padding: '10px', // Add some padding around the text
    fontSize: '16px', // Set a font size
    // Add any other styles you want to apply to the breakdown container
  };

  const labelStyle = {
    fontWeight: 'bold', // Make labels bold
    // You can add more styling to labels if needed
  };

  return (
    <div style={breakdownStyle}>
      <h3>Investment Breakdown</h3>
      <p style={labelStyle}>Initial Investment:</p>
      <p>${investmentDetails.initial.toLocaleString()}</p>
      <p style={labelStyle}>Monthly Contribution:</p>
      <p>${investmentDetails.contribution.toLocaleString()}</p>
      <p style={labelStyle}>Years to Grow:</p>
      <p>{investmentDetails.years}</p>
      <p style={labelStyle}>Rate of Return:</p>
      <p>{investmentDetails.rate}%</p>
      <p style={labelStyle}>Total Balance:</p>
      <p>${investmentDetails.totalBalance.toLocaleString()}</p>
    </div>
  );
}

export default InvestmentBreakdown;
