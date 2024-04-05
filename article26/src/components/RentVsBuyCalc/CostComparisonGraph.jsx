import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler from 'chart.js'
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register Filler plugin
);

const CostComparisonGraph = ({ rentCosts, buyCosts }) => {
  // Provide default values if data is not available
  const rentData = rentCosts && rentCosts.length > 0 ? rentCosts : [0];
  const buyData = buyCosts && buyCosts.length > 0 ? buyCosts : [0];

  // Generating labels based on the larger of the two arrays
  const labels = Array.from({ length: Math.max(rentData.length, buyData.length) }, (_, i) => `Year ${i + 1}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rent Costs',
        data: rentData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Buy Costs',
        data: buyData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time (Years)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cost Comparison over Time',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ width: '100%', height: '400px' }}> {/* Set a height for the chart container */}
      <Line data={data} options={options} />
    </div>
  );
};

export default CostComparisonGraph;
