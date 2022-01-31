import React, { useState } from 'react';
import './styles.scss';
import { UserJob, Wage } from '../../../../types/job-types';
import PieChart from '../../Charts/PieChart/Daily';
import Card from '../../../Card';
import { getDateString, numberReducer } from '../../../../utils/helpers';
import RadarChart from '../../Charts/RadarChart/Daily';

interface Props {
  data: UserJob[] | undefined;
}

const DayAnalytics: React.FC<Props> = ({ data }) => {
  const [chart, setChart] = useState({ one: true, two: false });
  const wages: Wage[][] = [];
  const shifts: Wage[] = [];

  data?.forEach((wage) => {
    wages.push(wage.wages);
  });

  wages[0].forEach((wage: Wage) => {
    shifts.push(wage);
  });

  const dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let _MonTips: number[] = [];
  let _TueTips: number[] = [];
  let _WedTips: number[] = [];
  let _ThuTips: number[] = [];
  let _FriTips: number[] = [];
  let _SatTips: number[] = [];
  let _SunTips: number[] = [];

  let _MonHours: number[] = [];
  let _TueHours: number[] = [];
  let _WedHours: number[] = [];
  let _ThuHours: number[] = [];
  let _FriHours: number[] = [];
  let _SatHours: number[] = [];
  let _SunHours: number[] = [];

  shifts.forEach((shift) => {
    const { day } = getDateString(shift.date);
    switch (day) {
      case 'Mon':
        _MonTips.push(shift.tips);
        _MonHours.push(shift.hours_worked);
        break;
      case 'Tue':
        _TueTips.push(shift.tips);
        _TueHours.push(shift.hours_worked);
        break;
      case 'Wed':
        _WedTips.push(shift.tips);
        _WedHours.push(shift.hours_worked);
        break;
      case 'Thu':
        _ThuTips.push(shift.tips);
        _ThuHours.push(shift.hours_worked);
        break;
      case 'Fri':
        _FriTips.push(shift.tips);
        _FriHours.push(shift.hours_worked);
        break;
      case 'Sat':
        _SatTips.push(shift.tips);
        _SatHours.push(shift.hours_worked);
        break;
      case 'Sun':
        _SunTips.push(shift.tips);
        _SunHours.push(shift.hours_worked);
        break;
      default:
        break;
    }
  });

  let MonTips: number = numberReducer(_MonTips);
  let TueTips: number = numberReducer(_TueTips);
  let WedTips: number = numberReducer(_WedTips);
  let ThuTips: number = numberReducer(_ThuTips);
  let FriTips: number = numberReducer(_FriTips);
  let SatTips: number = numberReducer(_SatTips);
  let SunTips: number = numberReducer(_SunTips);

  let MonHours: number = numberReducer(_MonHours);
  let TueHours: number = numberReducer(_TueHours);
  let WedHours: number = numberReducer(_WedHours);
  let ThuHours: number = numberReducer(_ThuHours);
  let FriHours: number = numberReducer(_FriHours);
  let SatHours: number = numberReducer(_SatHours);
  let SunHours: number = numberReducer(_SunHours);

  const weeklyTips = [
    Number(MonTips.toFixed(2)),
    Number(TueTips.toFixed(2)),
    Number(WedTips.toFixed(2)),
    Number(ThuTips.toFixed(2)),
    Number(FriTips.toFixed(2)),
    Number(SatTips.toFixed(2)),
    Number(SunTips.toFixed(2)),
  ];
  const weeklyHours = [
    Number(MonHours),
    Number(TueHours),
    Number(WedHours),
    Number(ThuHours),
    Number(FriHours),
    Number(SatHours),
    Number(SunHours),
  ];

  return (
    <Card area="daily">
      <div className="daily-analytics">
        <h2>Daily tip earnings</h2>
        <div className="daily-analytics-charts">
          {chart.one ? (
            <PieChart tipData={weeklyTips} labelData={dayArray} />
          ) : (
            <RadarChart
              tipData={weeklyTips}
              hourData={weeklyHours}
              labelData={dayArray}
            />
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
      </div>
    </Card>
  );
};

export default DayAnalytics;
