// RentVsBuyCalculatorPage.jsx

import React, { useState } from 'react';
import { Container, TextField, Button, Box } from '@mui/material';
import RentInputForm from '../components/RentVsBuyCalc/RentInputForm'; // Update this form as well if needed
import BuyInputForm from '../components/RentVsBuyCalc/BuyInputForm'; // Update this form as well if needed
import CostComparisonGraph from '../components/RentVsBuyCalc/CostComparisonGraph';
// import CostBreakdown from '../components/RentVsBuyCalc/CostBreakdown'; // Commented out as per your earlier request
import { calculateRentVsBuy } from '../services/rentVsBuyCalculator';
import styles from './RentVsBuyCalculatorPage.module.css'; // Yo

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
    <Container maxWidth="sm" sx={{  p: 2, borderRadius: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          '& .MuiTextField-root': {
            m: 1, // Space between TextField components
            width: '100%', // Full width
            '& .MuiInputBase-input': {
              color: 'white', // Make text white to stand out against the dark background
            },
            '& .MuiInputLabel-root': {
              color: 'grey', // A lighter color for labels for better visibility
            },
            '& label.Mui-focused': {
              color: 'orange', // Color of the label when the input is focused
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Border color of the TextField
              },
              '&:hover fieldset': {
                borderColor: 'orange', // Border color of the TextField on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'orange', // Border color when the input is focused
              },
            },
          }
        }}
      >
        <h1 style={{ color: 'white' }}>Rent vs Buy Calculator</h1>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Comfortable monthly rent"
            variant="outlined"
            name="monthlyRent"
            value={inputValues.monthlyRent}
            onChange={handleInputChange}
          />
          <TextField
            label="Home Price"
            variant="outlined"
            name="homePrice"
            value={inputValues.homePrice}
            onChange={handleInputChange}
          />
          <TextField
            label="Down Payment"
            variant="outlined"
            name="downPayment"
            value={inputValues.downPayment}
            onChange={handleInputChange}
          />
          <TextField
            label="Mortgage Interest Rate (%)"
            variant="outlined"
            name="interestRate"
            value={inputValues.interestRate}
            onChange={handleInputChange}
          />
          <TextField
            label="Loan Term (years)"
            variant="outlined"
            name="loanTerm"
            value={inputValues.loanTerm}
            onChange={handleInputChange}
            select
            SelectProps={{ native: true }}
          >
            <option value="15">15</option>
            <option value="30">30</option>
          </TextField>
          <Button variant="contained" type='submit' onClick={handleCalculate} fullWidth>
            Calculate
          </Button>
        </Box>
        <CostComparisonGraph rentCosts={results.rent} buyCosts={results.buy} />
      </Box>
    </Container>
  );
};

export default RentVsBuyCalculatorPage;