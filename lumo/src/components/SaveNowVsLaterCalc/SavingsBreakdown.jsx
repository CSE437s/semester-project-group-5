import React from 'react';

function SavingsBreakdown({ data }) {
  return (
    <div>
      <h3>Breakdown by Year</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Starting Balance</th>
            <th>Contributions</th>
            <th>Interest Earned</th>
            <th>End Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>${item.startingBalance.toFixed(2)}</td>
              <td>${item.contributions.toFixed(2)}</td>
              <td>${item.interestEarned.toFixed(2)}</td>
              <td>${item.endBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavingsBreakdown;
