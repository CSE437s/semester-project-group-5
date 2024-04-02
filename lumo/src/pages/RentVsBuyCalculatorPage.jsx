import React, { useState } from 'react';
import RentInputForm from '../components/RentVsBuyCalc/RentInputForm';
import BuyInputForm from '../components/RentVsBuyCalc/BuyInputForm';
import CostComparisonGraph from '../components/RentVsBuyCalc/CostComparisonGraph';
import CostBreakdown from '../components/RentVsBuyCalc/CostBreakdown';
import { calculateRentVsBuy } from '../services/rentVsBuyCalculator';
import styles from './RentVsBuyCalculatorPage.module.css';

const RentVsBuyCalculatorPage = () => {
  // States to hold form inputs for rent and buy calculations
  const [rentInputs, setRentInputs] = useState({ monthlyRent: '' });
  const [buyInputs, setBuyInputs] = useState({
    homePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: 30, // Default loan term
  });
  const [results, setResults] = useState(null);

  const handleRentInputChange = (inputs) => {
    setRentInputs(inputs);
  };

  const handleBuyInputChange = (inputs) => {
    setBuyInputs(inputs);
  };

  const handleSubmit = () => {
    // Perform validation if necessary
    const calculatedResults = calculateRentVsBuy(rentInputs, buyInputs);
    setResults(calculatedResults);
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Rent vs Buy Calculator</h1>
      <div className={styles.formContainer}>
        <RentInputForm onRentDataChange={handleRentInputChange} />
        <BuyInputForm onBuyDataChange={handleBuyInputChange} />
        <button onClick={handleSubmit} className={styles.button}>
          Calculate
        </button>
      </div>
      {results && (
        <>
          <CostComparisonGraph rentCosts={results.rent} buyCosts={results.buy} />
          <CostBreakdown rentCosts={results.rent} buyCosts={results.buy} />
        </>
      )}
    </div>
  );
};

export default RentVsBuyCalculatorPage;
