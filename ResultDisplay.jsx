import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ResultDisplay({ prediction }) {
  const chartData = {
    labels: Object.keys(prediction.probabilities),
    datasets: [
      {
        label: 'Probability',
        data: Object.values(prediction.probabilities),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Crop Probability Distribution'
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Recommendation Results</h2>
      
      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">
          Recommended Crop:
          <span className="text-green-600 ml-2">{prediction.recommendedCrop}</span>
        </p>
        <p className="text-gray-600">
          Confidence: {(prediction.confidence * 100).toFixed(2)}%
        </p>
      </div>
      
      <div className="mt-6">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default ResultDisplay;