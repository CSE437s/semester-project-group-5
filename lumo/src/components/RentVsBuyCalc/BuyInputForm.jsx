import React, { useState } from 'react';

const BuyInputForm = ({ onBuyDataChange }) => {
  // Define state for each input field
  const [homePrice, setHomePrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('30'); // Default to 30 years

  // Update state on input change
  const handleHomePriceChange = (e) => setHomePrice(e.target.value);
  const handleDownPaymentChange = (e) => setDownPayment(e.target.value);
  const handleInterestRateChange = (e) => setInterestRate(e.target.value);
  const handleLoanTermChange = (e) => setLoanTerm(e.target.value);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the state to the parent component
    onBuyDataChange({
      homePrice,
      downPayment,
      interestRate,
      loanTerm,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="homePrice">Home Price</label>
        <input
          type="number"
          id="homePrice"
          name="homePrice"
          value={homePrice}
          onChange={handleHomePriceChange}
          required
        />
      </div>
      <div>
        <label htmlFor="downPayment">Down Payment</label>
        <input
          type="number"
          id="downPayment"
          name="downPayment"
          value={downPayment}
          onChange={handleDownPaymentChange}
          required
        />
      </div>
      <div>
        <label htmlFor="interestRate">Mortgage Interest Rate (%)</label>
        <input
          type="number"
          step="0.01"
          id="interestRate"
          name="interestRate"
          value={interestRate}
          onChange={handleInterestRateChange}
          required
        />
      </div>
      <div>
        <label htmlFor="loanTerm">Loan Term (years)</label>
        <select
          id="loanTerm"
          name="loanTerm"
          value={loanTerm}
          onChange={handleLoanTermChange}
          required
        >
          <option value="15">15</option>
          <option value="30">30</option>
          {/* Add additional options as needed */}
        </select>
      </div>
      <button type="submit">Calculate</button>
    </form>
  );
};

export default BuyInputForm;
