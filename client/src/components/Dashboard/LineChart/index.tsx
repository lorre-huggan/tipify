import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
  hourData: Array<number>;
}

const LineChart: React.FC<Props> = ({ tipData, labelData, hourData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        backgroundColor: '#37e0d080',
        borderColor: '#262626',
        borderWidth: 2,
      },
      {
        label: 'Hours',
        data: hourData,
        backgroundColor: '#e0803780',
        borderColor: '#262626',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="pie-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart;
