import React, { useState } from 'react';

function InvestmentInputForm({ onSubmit }) {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [years, setYears] = useState('');
  const [rateOfReturn, setRateOfReturn] = useState('');

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
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={initialInvestment}
        onChange={(e) => setInitialInvestment(e.target.value)}
        placeholder="Initial Investment"
      />
      <input
        type="number"
        value={monthlyContribution}
        onChange={(e) => setMonthlyContribution(e.target.value)}
        placeholder="Monthly Contribution"
      />
      <input
        type="number"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        placeholder="Years to Grow"
      />
      <input
        type="number"
        value={rateOfReturn}
        onChange={(e) => setRateOfReturn(e.target.value)}
        placeholder="Expected Rate of Return"
      />
      <button type="submit">Calculate</button>
    </form>
  );
}

export default InvestmentInputForm;
