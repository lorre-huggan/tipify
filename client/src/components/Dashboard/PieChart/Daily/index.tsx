import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './styles.scss';

ChartJS.register(ArcElement, Tooltip, Legend);
interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
}
const PieChart: React.FC<Props> = ({ tipData, labelData }) => {
  const data = {
    labels: labelData,
    datasets: [
      {
        label: 'Tips',
        data: tipData,
        borderColor: '#111111',
        backgroundColor: [
          '#ff78b9',
          '#18acff',
          '#ffe75c',
          '#37e0d0',
          '#7547a3',
          '#e03f4f',
          '#e86435',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {};

  return (
    <div className="pie-chart">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
