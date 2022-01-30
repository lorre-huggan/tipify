import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
}
const PolarChart: React.FC<Props> = ({ tipData, labelData }) => {
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
    <div className="pie-chart">
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart;
