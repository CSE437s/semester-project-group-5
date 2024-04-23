import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

function InvestmentGraph({ data }) {
  // Inline style for the XAxis and YAxis labels to ensure they are white
  const axisStyle = {
    fill: 'white', // You can replace this with your desired color
    fontSize: '14px', // Adjust the font size as needed
  };

  return (
    // Make the graph responsive and larger in height
    <ResponsiveContainer width={700} height={400}> 
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="name" style={axisStyle} />
        <YAxis style={axisStyle} />
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <Tooltip 
          cursor={false}
          contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)' }} 
          labelStyle={{ fontWeight: 'bold', color: 'black' }} 
          itemStyle={{ color: 'black' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#8884d8" 
          fillOpacity={1} 
          fill="url(#colorUv)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default InvestmentGraph;
