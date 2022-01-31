import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import '../../styles.scss';
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface Props {
  tipData: Array<number>;
  labelData: Array<string>;
  hourData: Array<number>;
}

const RadarChart: React.FC<Props> = ({ tipData, labelData, hourData }) => {
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
    <div className="chart">
      <Radar data={data} />
    </div>
  );
};

export default RadarChart;
