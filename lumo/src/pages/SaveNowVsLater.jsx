import React, { useState } from "react";
import SavingsForm from "../components/SaveNowVsLaterCalc/SavingsForm";
import SavingsBreakdown from "../components/SaveNowVsLaterCalc/SavingsBreakdown";
import SavingsComparison from "../components/SaveNowVsLaterCalc/SavingsComparison";
import SavingsSummary from "../components/SaveNowVsLaterCalc/SavingsSummary";
import { mockSavingsData } from "../__mocks__/MockData"; // Make sure the path is correct

function SaveNowVsLater() {
  const [savingsData, setSavingsData] = useState(mockSavingsData);

  // Replace this with your actual calculation logic
  const handleCalculate = (formData) => {
    // Assume calculateSavings is a function that returns the updated data
    const updatedData = calculateSavings(formData);
    setSavingsData(updatedData);
  };

  return (
    <div className="save-now-vs-later-container">
      <SavingsForm onCalculate={handleCalculate} />
      <SavingsSummary data={savingsData} />
      <SavingsBreakdown data={savingsData} />
      <SavingsComparison currentApy={1.2} />
    </div>
  );
}

export default SaveNowVsLater;

// Add a calculateSavings function that handles the calculation logic
// This is a placeholder - you will need to implement this based on your own logic
function calculateSavings(formData) {
  // Perform calculation here
  return mockSavingsData; // return the calculated data
}
