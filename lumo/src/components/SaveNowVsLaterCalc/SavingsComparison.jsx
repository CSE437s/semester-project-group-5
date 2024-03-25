import React from 'react';
import './SaveNowVsLaterCalc.css'; // Assuming the CSS file is in the same directory

function SavingsComparison({ userApy }) {
  // These widths are just placeholders, you might calculate them based on the APY values
  const nationalAverageApyWidth = '10%';
  const onlineAverageApyWidth = '60%';
  const todaysTopApyWidth = '100%';

  return (
    <div className="apy-comparison">
      <h3>How Interest Can Impact Your Savings</h3>
      <div className="apy-item">
        <span>Your Rate: {userApy}% APY</span>
        <div className="apy-bar your-apy" style={{ width: `${userApy}%` }}></div>
      </div>
      <div className="apy-item">
        <span>National Average: 0.09% APY</span>
        <div className="apy-bar national-apy" style={{ width: nationalAverageApyWidth }}></div>
      </div>
      <div className="apy-item">
        <span>Online Average: 1.1% APY</span>
        <div className="apy-bar online-apy" style={{ width: onlineAverageApyWidth }}></div>
      </div>
      <div className="apy-item">
        <span>Today's Top Rate: 1.86% APY</span>
        <div className="apy-bar todays-apy" style={{ width: todaysTopApyWidth }}></div>
      </div>
    </div>
  );
}

export default SavingsComparison;
