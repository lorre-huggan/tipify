import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
  workedData: Array<number>;
}
const PieChart: React.FC<Props> = ({ tipData, labelData, workedData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        borderColor: '#111111',
        backgroundColor: [
          '#e86435',
          '#37e0d0',
          '#ff78b9',
          '#18acff',
          '#7547a3',
          '#ffe75c',
        ],
        borderWidth: 2,
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
