import React from 'react';
import './styles.scss';
import { Bar } from 'react-chartjs-2';
import BarChart from '../BarChart';
import LineChart from '../LineChart';
import { UserJob, UserJobs, Wage } from '../../types/job-types';
import { fromUnixTime } from 'date-fns';
import PieChart from '../PieChart';
interface Props {
  data: UserJob[] | undefined;
}

interface Index {
  date: string;
  tips: number;
  hours: number;
}

const Analytics: React.FC<Props> = ({ data }) => {
  const tips: number[] = [];
  const dates: number[] = [];
  const hours: number[] = [];
  const months: string[] = [];
  const wages: any = [];
  const index: Index[] = [];

  data?.forEach((wage) => {
    wages.push(wage.wages);
  });

  wages[0].forEach((x: any) => {
    tips.push(x.tips);
    dates.push(x.date);
    hours.push(x.hours_worked);
    months.push(fromUnixTime(x.date).toString().split(' ')[1]);
    index.push({
      date: fromUnixTime(x.date).toString().split(' ')[1],
      tips: x.tips,
      hours: x.hours_worked,
    });
  });

  const monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const sorted: any = [];

  monthsArray.forEach((month) => {
    const filter = index.filter((idx) => {
      return idx.date === month;
    });

    if (filter.length > 0) {
      sorted.push([...filter]);
    }
  });

  const usedMonths: string[] = [];
  const tipMonthTotal: number[] = [];
  const workedHoursTotal: number[] = [];

  sorted.forEach((sort: Index[]) => {
    const eachDate = sort.map((s: Index) => s.date);
    const eachTip = sort.map((t: Index) => {
      return t.tips;
    });
    const tipTotal = eachTip.reduce((total: number, item: number) => {
      return total + item;
    });
    tipMonthTotal.push(Number(tipTotal.toFixed(2)));

    const eachHours = sort.map((h: Index) => h.hours);

    const workedTotal = eachHours.reduce((total: number, item: number) => {
      return total + item;
    });

    workedHoursTotal.push(workedTotal);

    eachDate.map((x: string) => {
      usedMonths.push(x);
      return x;
    });
  });

  const setMonths = new Set(usedMonths);
  const singleMonths: string[] = Array.from(setMonths);

  console.log(tipMonthTotal);

  return (
    <div className="analytics-container">
      <p>Analytics</p>
      <div>
        <PieChart
          tipData={tipMonthTotal}
          workedData={workedHoursTotal}
          labelData={singleMonths}
        />
      </div>
    </div>
  );
};

export default Analytics;
