import React from 'react';

const BuyInputForm = ({ values, onInputChange }) => {
  // Destructure the values for ease of access
  const { homePrice, downPayment, interestRate, loanTerm } = values;

  return (
    <div>
      <div>
        <label htmlFor="homePrice">Home Price</label>
        <input
          type="number"
          id="homePrice"
          name="homePrice"
          value={homePrice}
          onChange={onInputChange}
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
          onChange={onInputChange}
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
          onChange={onInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="loanTerm">Loan Term (years)</label>
        <select
          id="loanTerm"
          name="loanTerm"
          value={loanTerm}
          onChange={onInputChange}
          required
        >
          <option value="15">15</option>
          <option value="30">30</option>
          {/* Add additional options as needed */}
        </select>
      </div>
    </div>
  );
};

export default BuyInputForm;
