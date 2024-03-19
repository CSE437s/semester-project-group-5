import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SavingsSummary({ data }) {
  // You'll need to map your data to the format expected by Recharts
  const chartData = data.map(item => ({
    year: item.year,
    balance: item.endBalance
  }));

  return (
    <div className="chart-container">
      <h2>Your savings balance at the end of the period will be ${data[data.length - 1].endBalance.toFixed(2)}</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default SavingsSummary;
