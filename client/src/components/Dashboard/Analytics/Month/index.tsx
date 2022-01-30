import React, { useState } from 'react';
import './styles.scss';
import { UserJob, Wage } from '../../../../types/job-types';
import PieChart from '../../PieChart/Month';
import Card from '../../../Card';
import { getDateString, numberReducer } from '../../../../utils/helpers';
import LineChart from '../../LineChart';
import PolarChart from '../../PolarChart/Monthly';
interface Props {
  data: UserJob[] | undefined;
}

const MonthAnalytics: React.FC<Props> = ({ data }) => {
  const [chart, setChart] = useState({ one: true, two: false });
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
  let JanHours: number[] = [];
  let FebHours: number[] = [];
  let MarHours: number[] = [];
  let AprHours: number[] = [];
  let MayHours: number[] = [];
  let JunHours: number[] = [];
  let JulHours: number[] = [];
  let AugHours: number[] = [];
  let SepHours: number[] = [];
  let OctHours: number[] = [];
  let NovHours: number[] = [];
  let DecHours: number[] = [];

  shifts.forEach((shift) => {
    const { month, day } = getDateString(shift.date);
    switch (month) {
      case 'Jan':
        Jan.push(shift.tips);
        JanHours.push(shift.hours_worked);
        break;
      case 'Feb':
        Feb.push(shift.tips);
        FebHours.push(shift.hours_worked);
        break;
      case 'Mar':
        Mar.push(shift.tips);
        MarHours.push(shift.hours_worked);
        break;
      case 'Apr':
        Apr.push(shift.tips);
        AprHours.push(shift.hours_worked);
        break;
      case 'May':
        May.push(shift.tips);
        MayHours.push(shift.hours_worked);
        break;
      case 'Jun':
        Jun.push(shift.tips);
        JunHours.push(shift.hours_worked);
        break;
      case 'Jul':
        Jul.push(shift.tips);
        JulHours.push(shift.hours_worked);
        break;
      case 'Aug':
        Aug.push(shift.tips);
        AugHours.push(shift.hours_worked);
        break;
      case 'Sep':
        Sep.push(shift.tips);
        SepHours.push(shift.hours_worked);
        break;
      case 'Oct':
        Oct.push(shift.tips);
        OctHours.push(shift.hours_worked);
        break;
      case 'Nov':
        Nov.push(shift.tips);
        NovHours.push(shift.hours_worked);
        break;
      case 'Dec':
        Dec.push(shift.tips);
        DecHours.push(shift.hours_worked);
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

  let _JanHours: number = numberReducer(JanHours);
  let _FebHours: number = numberReducer(FebHours);
  let _MarHours: number = numberReducer(MarHours);
  let _AprHours: number = numberReducer(AprHours);
  let _MayHours: number = numberReducer(MayHours);
  let _JunHours: number = numberReducer(JunHours);
  let _JulHours: number = numberReducer(JulHours);
  let _AugHours: number = numberReducer(AugHours);
  let _SepHours: number = numberReducer(SepHours);
  let _OctHours: number = numberReducer(OctHours);
  let _NovHours: number = numberReducer(NovHours);
  let _DecHours: number = numberReducer(DecHours);

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
  const monthlyHours = [
    Number(_JanHours),
    Number(_FebHours),
    Number(_MarHours),
    Number(_AprHours),
    Number(_MayHours),
    Number(_JunHours),
    Number(_JulHours),
    Number(_AugHours),
    Number(_SepHours),
    Number(_OctHours),
    Number(_NovHours),
    Number(_DecHours),
  ];

  return (
    <Card area="month">
      <div className="month-analytics-container">
        <h2>Monthly tip earnings</h2>
        {data && (
          <div>
            {chart.one ? (
              <PolarChart tipData={monthlyTips} labelData={monthsArray} />
            ) : (
              <PieChart tipData={monthlyTips} labelData={monthsArray} />
            )}
          </div>
        )}
      </div>
      <div className="daily-analytics-selector">
        <button
          disabled={chart.one}
          onClick={() => setChart({ one: !chart.one, two: !chart.two })}
        />
        <button
          disabled={chart.two}
          onClick={() => setChart({ one: !chart.one, two: !chart.two })}
        />
      </div>
    </Card>
  );
};

export default MonthAnalytics;
