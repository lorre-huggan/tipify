import React from 'react';
import './styles.scss';
import { UserJob, Wage } from '../../../types/job-types';
import { fromUnixTime } from 'date-fns';
import PieChart from '../../PieChart/Month';
import Card from '../../Card';
import { getDateString, numberReducer } from '../../../utils/helpers';
interface Props {
  data: UserJob[] | undefined;
}

const MonthAnalytics: React.FC<Props> = ({ data }) => {
  const wages: Wage[][] = [];
  const shifts: Wage[] = [];

  data?.forEach((wage) => {
    wages.push(wage.wages);
  });

  wages[0].forEach((x: Wage) => {
    shifts.push(x);
  });

  const monthsArray = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  let Jan: number[] = [];
  let Feb: number[] = [];
  let Mar: number[] = [];
  let Apr: number[] = [];
  let May: number[] = [];
  let Jun: number[] = [];
  let Jul: number[] = [];
  let Aug: number[] = [];
  let Sep: number[] = [];
  let Oct: number[] = [];
  let Nov: number[] = [];
  let Dec: number[] = [];

  shifts.forEach((shift) => {
    const { month } = getDateString(shift.date);
    switch (month) {
      case 'Jan':
        Jan.push(shift.tips);
        break;
      case 'Feb':
        Feb.push(shift.tips);
        break;
      case 'Mar':
        Mar.push(shift.tips);
        break;
      case 'Apr':
        Apr.push(shift.tips);
        break;
      case 'May':
        May.push(shift.tips);
        break;
      case 'Jun':
        Jun.push(shift.tips);
        break;
      case 'Jul':
        Jul.push(shift.tips);
        break;
      case 'Aug':
        Aug.push(shift.tips);
        break;
      case 'Sep':
        Sep.push(shift.tips);
        break;
      case 'Oct':
        Oct.push(shift.tips);
        break;
      case 'Nov':
        Nov.push(shift.tips);
        break;
      case 'Dec':
        Dec.push(shift.tips);
        break;
      default:
        break;
    }
  });

  let JanTips: number = numberReducer(Jan);
  let FebTips: number = numberReducer(Feb);
  let MarTips: number = numberReducer(Mar);
  let AprTips: number = numberReducer(Apr);
  let MayTips: number = numberReducer(May);
  let JunTips: number = numberReducer(Jun);
  let JulTips: number = numberReducer(Jul);
  let AugTips: number = numberReducer(Aug);
  let SepTips: number = numberReducer(Sep);
  let OctTips: number = numberReducer(Oct);
  let NovTips: number = numberReducer(Nov);
  let DecTips: number = numberReducer(Dec);

  const monthlyTips = [
    Number(JanTips.toFixed(2)),
    Number(FebTips.toFixed(2)),
    Number(MarTips.toFixed(2)),
    Number(AprTips.toFixed(2)),
    Number(MayTips.toFixed(2)),
    Number(JunTips.toFixed(2)),
    Number(JulTips.toFixed(2)),
    Number(AugTips.toFixed(2)),
    Number(SepTips.toFixed(2)),
    Number(OctTips.toFixed(2)),
    Number(NovTips.toFixed(2)),
    Number(DecTips.toFixed(2)),
  ];

  return (
    <Card>
      <div className="analytics-container">
        <h2>Month</h2>
        <div>
          <PieChart tipData={monthlyTips} labelData={monthsArray} />
        </div>
      </div>
    </Card>
  );
};

export default MonthAnalytics;
