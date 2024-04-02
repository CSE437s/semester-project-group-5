import React from 'react';

const CostBreakdown = ({ rentCosts, buyCosts }) => {
  return (
    <div className="cost-breakdown">
      <h2>Cost Breakdown</h2>
      <div className="breakdown-section">
        <h3>Rent</h3>
        <p>Monthly Cost: ${rentCosts?.monthly?.toLocaleString() || '0'}</p>
        <p>Total Cost: ${rentCosts?.total?.toLocaleString() || '0'}</p>
      </div>
      <div className="breakdown-section">
        <h3>Buy</h3>
        <p>Monthly Cost: ${buyCosts?.monthly?.toLocaleString() || '0'}</p>
        <p>Total Cost: ${buyCosts?.total?.toLocaleString() || '0'}</p>
      </div>
      <div className="breakdown-comparison">
        <h3>Comparison</h3>
        {/* Perform a comparison only if both values are available */}
        {rentCosts?.total != null && buyCosts?.total != null && (
          <p>
            {rentCosts.total < buyCosts.total
              ? 'Renting is cheaper than buying in the long run.'
              : 'Buying is cheaper than renting in the long run.'}
          </p>
        )}
        {/* Display comparison calculation only if both values are available */}
        {rentCosts?.total != null && buyCosts?.total != null && (
          <p>
            {`You will ${
              rentCosts.total < buyCosts.total
                ? 'save'
                : 'spend more'
            } by ${
              rentCosts.total < buyCosts.total ? 'renting' : 'buying'
            } an estimated $${Math.abs(rentCosts.total - buyCosts.total).toLocaleString()} over the period.`}
          </p>
        )}
      </div>
    </div>
  );
};

export default CostBreakdown;
