import React from 'react';

const CostBreakdown = () => {
  // Static values for testing
  const rentMonthlyCost = 1000; // Static test value
  const rentTotalCost = 12000; // Static test value
  const buyMonthlyCost = 1500; // Static test value
  const buyTotalCost = 18000; // Static test value

  return (
    <div className="cost-breakdown">
      <h2>Cost Breakdown</h2>
      <div className="breakdown-section">
        <h3>Rent</h3>
        <p>Monthly Cost: ${rentMonthlyCost.toLocaleString()}</p>
        <p>Total Cost: ${rentTotalCost.toLocaleString()}</p>
      </div>
      <div className="breakdown-section">
        <h3>Buy</h3>
        <p>Monthly Cost: ${buyMonthlyCost.toLocaleString()}</p>
        <p>Total Cost: ${buyTotalCost.toLocaleString()}</p>
      </div>
      <div className="breakdown-comparison">
        <h3>Comparison</h3>
        <p>
          Buying is cheaper than renting in the long run.
        </p>
        <p>
          You will save by renting an estimated $${Math.abs(rentTotalCost - buyTotalCost).toLocaleString()} over the period.
        </p>
      </div>
    </div>
  );
};

export default CostBreakdown;
