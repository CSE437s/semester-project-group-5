import React, { useState } from 'react';
import RentInputForm from '../components/RentVsBuyCalc/RentInputForm';
import BuyInputForm from '../components/RentVsBuyCalc/BuyInputForm';
import CostComparisonGraph from '../components/RentVsBuyCalc/CostComparisonGraph';
import CostBreakdown from '../components/RentVsBuyCalc/CostBreakdown';
import { calculateRentVsBuy } from '../services/rentVsBuyCalculator';

const RentVsBuyCalculatorPage = () => {
  const [rentData, setRentData] = useState(null);
  const [buyData, setBuyData] = useState(null);
  const [calculationResults, setCalculationResults] = useState(null);

  const handleRentDataChange = (data) => {
    setRentData(data);
    // Perform calculations if both rentData and buyData are available
    if (buyData && data) {
      setCalculationResults(calculateRentVsBuy(data, buyData));
    }
  };

  const handleBuyDataChange = (data) => {
    setBuyData(data);
    // Perform calculations if both rentData and buyData are available
    if (rentData && data) {
      setCalculationResults(calculateRentVsBuy(rentData, data));
    }
  };

  return (
    <div>
      <RentInputForm onRentDataChange={handleRentDataChange} />
      <BuyInputForm onBuyDataChange={handleBuyDataChange} />
      {calculationResults && (
        <>
          <CostComparisonGraph rentCosts={calculationResults.rentCosts} buyCosts={calculationResults.buyCosts} />
          <CostBreakdown rentCosts={calculationResults.rentCosts} buyCosts={calculationResults.buyCosts} />
        </>
      )}
    </div
