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
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CostComparisonGraph = ({ rentCosts, buyCosts }) => {
  // Ensure rentCosts and buyCosts are arrays
  rentCosts = Array.isArray(rentCosts) ? rentCosts : [];
  buyCosts = Array.isArray(buyCosts) ? buyCosts : [];

  // Generating labels based on the larger of the two arrays
  const labels = Array.from({ length: Math.max(rentCosts.length, buyCosts.length) }, (_, i) => `Year ${i + 1}`);

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Rent Costs',
        data: rentCosts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'Buy Costs',
        data: buyCosts,
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
