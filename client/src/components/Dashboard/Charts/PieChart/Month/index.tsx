import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../../styles.scss';
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
          '#e86435',
          '#37e0d0',
          '#ff78b9',
          '#18acff',
          '#7547a3',
          '#ffe75c',
          '#e18868',
          '#aee2dd',
          '#ffbddd',
          '#a5ddfd',
          '#8d7c9e',
          '#fcf2b7',
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart">
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
