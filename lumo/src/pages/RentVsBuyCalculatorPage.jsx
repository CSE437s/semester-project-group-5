import React, { useState } from 'react';
import RentInputForm from '../components/RentVsBuyCalc/RentInputForm';
import BuyInputForm from '../components/RentVsBuyCalc/BuyInputForm';
import CostComparisonGraph from '../components/RentVsBuyCalc/CostComparisonGraph';
//import CostBreakdown from '../components/RentVsBuyCalc/CostBreakdown';
import { calculateRentVsBuy } from '../services/rentVsBuyCalculator';
import styles from './RentVsBuyCalculatorPage.module.css';

const RentVsBuyCalculatorPage = () => {
  const [inputValues, setInputValues] = useState({
    monthlyRent: '',
    homePrice: '',
    downPayment: '',
    interestRate: '',
    loanTerm: '30', // Default to 30 years
  });
  const [results, setResults] = useState({ rent: [], buy: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleCalculate = () => {
    const rentInputs = { monthlyRent: parseFloat(inputValues.monthlyRent) || 0 };
    const buyInputs = {
      homePrice: parseFloat(inputValues.homePrice) || 0,
      downPayment: parseFloat(inputValues.downPayment) || 0,
      interestRate: parseFloat(inputValues.interestRate) || 0,
      loanTerm: parseInt(inputValues.loanTerm, 10) || 0
    };

    if (isValidInput(rentInputs) && isValidInput(buyInputs)) {
      const calculatedResults = calculateRentVsBuy(rentInputs, buyInputs);
      setResults(calculatedResults);
    } else {
      console.error('Invalid input for calculation.');
    }
  };

  const isValidInput = (inputs) => {
    return Object.values(inputs).every((input) => !isNaN(parseFloat(input)));
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Rent vs Buy Calculator</h1>
      <div className={styles.formContainer}>
        <RentInputForm
          monthlyRent={inputValues.monthlyRent}
          onInputChange={handleInputChange}
        />
        <BuyInputForm
          values={inputValues}
          onInputChange={handleInputChange}
        />
        <button onClick={handleCalculate} className={styles.button}>
          Calculate
        </button>
      </div>
      <CostComparisonGraph rentCosts={results.rent} buyCosts={results.buy} />
      {/* CostBreakdown component has been removed */}
      {/* <CostBreakdown rentCosts={results.rent} buyCosts={results.buy} /> */}
    </div>
  );
};

export default RentVsBuyCalculatorPage;
