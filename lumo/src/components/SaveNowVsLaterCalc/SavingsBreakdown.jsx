import React from 'react';

function SavingsBreakdown({ data }) {
  return (
    <div>
      <h3>Breakdown by Year</h3>
      <table>
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
          {data.map((yearData, index) => (
            <tr key={index}>
              <td>{yearData.year}</td>
              <td>${yearData.startingBalance.toFixed(2)}</td>
              <td>${yearData.contributions.toFixed(2)}</td>
              <td>${yearData.interestEarned.toFixed(2)}</td>
              <td>${yearData.endBalance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavingsBreakdown;
