import React from 'react';
import SavingsForm from './SavingsForm';
import SavingsSummary from './SavingsSummary';
import SavingsBreakdown from './SavingsBreakdown';
import SavingsComparison from './SavingsComparison';

function SaveNowVsLater() {
  // State for the results to pass down to child components
  // You would replace this with actual state logic
  const [savingsData, setSavingsData] = React.useState(null);

  // Function to handle form submission and calculation
  // This will get data from SavingsForm and possibly make an API call
  const handleCalculate = (formData) => {
    // Perform the calculation (either here or via an API call)
    // Update the savingsData with the result
  };

  return (
    <div>
      <SavingsForm onCalculate={handleCalculate} />
      {savingsData && (
        <>
          <SavingsSummary data={savingsData} />
          <SavingsBreakdown data={savingsData} />
          <SavingsComparison currentApy={savingsData.apy} />
        </>
      )}
    </div>
  );
}

export default SaveNowVsLater;
