import React from 'react';

function SavingsComparison({ userApy }) {
  const nationalAverageApy = 0.09;
  const onlineAverageApy = 1.1;
  const todaysTopApy = 1.86;

  return (
    <div>
      <h3>How Interest Can Impact Your Savings</h3>
      <p>Your Rate: {userApy}% APY</p>
      <p>National Average: {nationalAverageApy}% APY</p>
      <p>Online Average: {onlineAverageApy}% APY</p>
      <p>Today's Top Rate: {todaysTopApy}% APY</p>
    </div>
  );
}

export default SavingsComparison;
