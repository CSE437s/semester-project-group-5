import React from 'react';

const CostBreakdown = ({ rentCosts, buyCosts }) => {
  // Assuming rentCosts and buyCosts contain 'monthly' and 'total' cost properties
  // If your data structure is different, you'll need to adjust the code accordingly

  return (
    <div className="cost-breakdown">
      <h2>Cost Breakdown</h2>
      <div className="breakdown-section">
        <h3>Rent</h3>
        <p>Monthly Cost: ${rentCosts.monthly.toLocaleString()}</p>
        <p>Total Cost: ${rentCosts.total.toLocaleString()}</p>
      </div>
      <div className="breakdown-section">
        <h3>Buy</h3>
        <p>Monthly Cost: ${buyCosts.monthly.toLocaleString()}</p>
        <p>Total Cost: ${buyCosts.total.toLocaleString()}</p>
      </div>
      <div className="breakdown-comparison">
        <h3>Comparison</h3>
        <p>
          {rentCosts.total < buyCosts.total
            ? 'Renting is cheaper than buying in the long run.'
            : 'Buying is cheaper than renting in the long run.'}
        </p>
        <p>
          {`You will ${
            rentCosts.total < buyCosts.total
              ? 'save'
              : 'spend more'
          } by ${
            rentCosts.total < buyCosts.total ? 'renting' : 'buying'
          } an estimated $${Math.abs(rentCosts.total - buyCosts.total).toLocaleString()} over the period.`}
        </p>
      </div>
      <style jsx>{`
        .cost-breakdown {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-top: 20px;
        }
        .breakdown-section {
          margin-bottom: 10px;
        }
        .breakdown-comparison {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
      `}</style>
    </div>
  );
};

export default CostBreakdown;
