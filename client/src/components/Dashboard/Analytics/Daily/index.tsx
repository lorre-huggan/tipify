import React from 'react';
import './styles.scss';
import { UserJob, Wage } from '../../../../types/job-types';
import PieChart from '../../PieChart/Daily';
import Card from '../../../Card';
import { getDateString, numberReducer } from '../../../../utils/helpers';

interface Props {
  data: UserJob[] | undefined;
}

const DayAnalytics: React.FC<Props> = ({ data }) => {
  const wages: Wage[][] = [];
  const shifts: Wage[] = [];

  data?.forEach((wage) => {
    wages.push(wage.wages);
  });

  wages[0].forEach((wage: Wage) => {
    shifts.push(wage);
  });

  let Mon: number[] = [];
  let Tue: number[] = [];
  let Wed: number[] = [];
  let Thu: number[] = [];
  let Fri: number[] = [];
  let Sat: number[] = [];
  let Sun: number[] = [];

  const dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  shifts.forEach((shift) => {
    const { day } = getDateString(shift.date);
    switch (day) {
      case 'Mon':
        Mon.push(shift.tips);
        break;
      case 'Tue':
        Tue.push(shift.tips);
        break;
      case 'Wed':
        Wed.push(shift.tips);
        break;
      case 'Thu':
        Thu.push(shift.tips);
        break;
      case 'Fri':
        Fri.push(shift.tips);
        break;
      case 'Sat':
        Sat.push(shift.tips);
        break;
      case 'Sun':
        Sun.push(shift.tips);
        break;
      default:
        break;
    }
  });

  let MonTips: number = numberReducer(Mon);
  let TueTips: number = numberReducer(Tue);
  let WedTips: number = numberReducer(Wed);
  let ThuTips: number = numberReducer(Thu);
  let FriTips: number = numberReducer(Fri);
  let SatTips: number = numberReducer(Sat);
  let SunTips: number = numberReducer(Sun);

  const weeklyTips = [
    Number(MonTips.toFixed(2)),
    Number(TueTips.toFixed(2)),
    Number(WedTips.toFixed(2)),
    Number(ThuTips.toFixed(2)),
    Number(FriTips.toFixed(2)),
    Number(SatTips.toFixed(2)),
    Number(SunTips.toFixed(2)),
  ];

  return (
    <Card>
      <div className="analytics-container">
        <h2>Daily tip earnings</h2>
        <div>
          <PieChart tipData={weeklyTips} labelData={dayArray} />
        </div>
      </div>
    </Card>
  );
};

export default DayAnalytics;
