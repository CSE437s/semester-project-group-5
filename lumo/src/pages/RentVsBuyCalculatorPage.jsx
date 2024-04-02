import React, { useState } from 'react';
import RentInputForm from '../components/RentVsBuyCalc/RentInputForm';
import BuyInputForm from '../components/RentVsBuyCalc/BuyInputForm';
import CostComparisonGraph from '../components/RentVsBuyCalc/CostComparisonGraph';
import CostBreakdown from '../components/RentVsBuyCalc/CostBreakdown';
import { calculateRentVsBuy } from '../services/rentVsBuyCalculator';
import styles from './RentVsBuyCalculatorPage.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const RentVsBuyCalculatorPage = () => {
  const [rentInputs, setRentInputs] = useState({});
  const [buyInputs, setBuyInputs] = useState({});
  const [results, setResults] = useState({ rent: [], buy: [] });

  const handleRentInputChange = (inputs) => {
    setRentInputs(inputs);
  };

  const handleBuyInputChange = (inputs) => {
    setBuyInputs(inputs);
  };

  const handleCalculate = async () => {
    // Perform validation if necessary
    if (isValidInput(rentInputs) && isValidInput(buyInputs)) {
      try {
        const calculatedResults = await calculateRentVsBuy(rentInputs, buyInputs);
        setResults(calculatedResults);
      } catch (error) {
        console.error('Error during calculation:', error);
      }
    } else {
      console.error('Invalid input for calculation.');
    }
  };

  // A simple validation function, you can add more complex logic
  const isValidInput = (inputs) => {
    return Object.values(inputs).every(input => input !== null && input !== '');
  };

  return (
    <div className={styles.pageContainer}>
      <h1>Rent vs Buy Calculator</h1>
      <div className={styles.formContainer}>
        <RentInputForm onRentDataChange={handleRentInputChange} />
        <BuyInputForm onBuyDataChange={handleBuyInputChange} />
        <button onClick={handleCalculate} className={styles.button}>
          Calculate
        </button>
      </div>
      <ErrorBoundary>
        {results && (
          <>
            <CostComparisonGraph rentCosts={results.rent} buyCosts={results.buy} />
            <CostBreakdown rentCosts={results.rent} buyCosts={results.buy} />
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default RentVsBuyCalculatorPage;
