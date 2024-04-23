import React, { useState } from 'react';

function InvestmentInputForm({ onSubmit }) {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
  };

  const inputGroupStyle = {
    marginBottom: '8px'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '4px'
  };

  const inputStyle = {
    width: '100%', // Ensures input fields take the full width
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  };

  // Updated buttonStyle to match the input fields
  const buttonStyle = {
  width: '100%', // The button takes the full width of its parent
  padding: '8px', // Same padding as the inputs
  backgroundColor: 'orange',
  color: 'white',
  border: '1px solid #ccc', // Same border as the inputs
  borderRadius: '4px',
  cursor: 'pointer',
  boxSizing: 'border-box', // Include padding and border in the width and height
  marginTop: '8px', // Add some space above the button if needed
};

  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      initialInvestment,
      monthlyContribution,
      years,
      rateOfReturn
    });
  };


  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputGroupStyle}>
        <label htmlFor="initialInvestment" style={labelStyle}>Initial Investment</label>
        <input
          id="initialInvestment"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="monthlyContribution" style={labelStyle}>Monthly Contribution</label>
        <input
          id="monthlyContribution"
          type="number"
          value={monthlyContribution}
          onChange={(e) => setMonthlyContribution(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="years" style={labelStyle}>Years to Grow</label>
        <input
          id="years"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div style={inputGroupStyle}>
        <label htmlFor="rateOfReturn" style={labelStyle}>Expected Rate of Return</label>
        <input
          id="rateOfReturn"
          type="number"
          value={rateOfReturn}
          onChange={(e) => setRateOfReturn(e.target.value)}
          style={inputStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>Calculate</button>
    </form>
  );
}

export default InvestmentInputForm;
