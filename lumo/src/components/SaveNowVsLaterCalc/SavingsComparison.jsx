import React from "react";

function SavingsComparison({ currentApy }) {
  // Assuming these rates are static or fetched from an external source
  const comparisonRates = {
    nationalAverage: 0.09,
    onlineAverage: 1.1,
    todaysTopRate: 1.86,
  };

  // Calculate the width of each bar relative to the highest rate for visual comparison
  const maxWidth = Math.max(
    currentApy,
    comparisonRates.nationalAverage,
    comparisonRates.onlineAverage,
    comparisonRates.todaysTopRate
  );
  const calculateWidth = (value) => `${(value / maxWidth) * 100}%`;

  return (
    <div className="comparison-container">
      <h3>APY Comparison</h3>
      <div className="comparison-bars">
        <div
          className="comparison-bar"
          style={{ width: calculateWidth(currentApy), backgroundColor: "#4caf50" }}
        >
          Your APY: {currentApy}%
        </div>
        <div
          className="comparison-bar"
          style={{
            width: calculateWidth(comparisonRates.nationalAverage),
            backgroundColor: "#f44336",
          }}
        >
          National Average: {comparisonRates.nationalAverage}%
        </div>
        <div
          className="comparison-bar"
          style={{
            width: calculateWidth(comparisonRates.onlineAverage),
            backgroundColor: "#2196f3",
          }}
        >
          Online Average: {comparisonRates.onlineAverage}%
        </div>
        <div
          className="comparison-bar"
          style={{
            width: calculateWidth(comparisonRates.todaysTopRate),
            backgroundColor: "#ffeb3b",
          }}
        >
          Today's Top Rate: {comparisonRates.todaysTopRate}%
        </div>
      </div>
    </div>
  );
}

export default SavingsComparison;
