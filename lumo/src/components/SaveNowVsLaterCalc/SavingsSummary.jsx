import React from 'react';
// If using recharts for example
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SavingsSummary({ data }) {
  // Assuming 'data' is an array of objects with 'year', 'balance', and other relevant data

  return (
    <div>
      <h2>Your savings balance at the end of the period will be {data[data.length - 1].balance}</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="balance" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default SavingsSummary;
