import React, { useState } from 'react';

function SavingsForm({ onCalculate }) {
  const [startingBalance, setStartingBalance] = useState(0);
  const [apy, setApy] = useState(0);
  const [monthlyContribution, setMonthlyContribution] = useState(0);
  const [yearsToSave, setYearsToSave] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    onCalculate({ startingBalance, apy, monthlyContribution, yearsToSave });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={startingBalance}
        onChange={(e) => setStartingBalance(e.target.value)}
        placeholder="Starting Balance"
      />
      {/* ...Other inputs for APY, monthly contribution, years to save... */}
      <button type="submit">Calculate</button>
    </form>
  );
}

export default SavingsForm;
