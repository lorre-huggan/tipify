import React from 'react';
import './styles.scss';
import { UserJob, Wage } from '../../../types/job-types';
import { fromUnixTime } from 'date-fns';
import PieChart from '../../PieChart/Month';
import Card from '../../Card';
interface Props {
  data: UserJob[] | undefined;
}

interface Index {
  date: string;
  tips: number;
  hours: number;
}

const MonthAnalytics: React.FC<Props> = ({ data }) => {
  const tips: number[] = [];
  const dates: number[] = [];
  const hours: number[] = [];
  const months: string[] = [];
  const wages: Wage[][] = [];
  const index: Index[] = [];

  data?.forEach((wage) => {
    wages.push(wage.wages);
  });

  wages[0].forEach((x: Wage) => {
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
    const eachDate = sort.map((date: Index) => date.date);
    const eachTip = sort.map((tip: Index) => {
      return tip.tips;
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

    eachDate.forEach((x: string) => {
      usedMonths.push(x);
    });
  });

  const setMonths = new Set(usedMonths);
  const singleMonths: string[] = Array.from(setMonths);

  return (
    <Card>
      <div className="analytics-container">
        <p>Month</p>
        <div>
          <PieChart
            tipData={tipMonthTotal}
            workedData={workedHoursTotal}
            labelData={singleMonths}
          />
        </div>
      </div>
    </Card>
  );
};

export default MonthAnalytics;
