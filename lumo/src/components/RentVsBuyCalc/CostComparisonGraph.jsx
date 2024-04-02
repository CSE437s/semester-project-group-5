import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CostComparisonGraph = ({ rentCosts, buyCosts }) => {
  // Assuming rentCosts and buyCosts are arrays of numbers representing costs over time

  const data = {
    labels: rentCosts.map((_, index) => `Year ${index + 1}`),
    datasets: [
      {
        label: 'Rent Costs',
        data: rentCosts,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Buy Costs',
        data: buyCosts,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
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
          text: 'Time',
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
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CostComparisonGraph;
