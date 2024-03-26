import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function SavingsSummary({ data }) {
  // Convert the data to a format that can be used by Recharts, if necessary
  const chartData = data.map(item => ({
    name: `Year ${item.year}`,
    Balance: item.endBalance
  }));

  return (
    <div className="chart-container">
      <h2>Your savings balance at the end of the period will be ${data[data.length - 1].endBalance.toFixed(2)}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="Balance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SavingsSummary;
