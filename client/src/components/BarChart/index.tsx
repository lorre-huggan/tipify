import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
  workedData: Array<number>;
}
const BarChart: React.FC<Props> = ({ tipData, labelData, workedData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = labelData;

  const data = {
    labels,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        backgroundColor: '#ff78b9',
      },
      {
        label: 'Hours',
        data: workedData,
        backgroundColor: '#18acff',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
