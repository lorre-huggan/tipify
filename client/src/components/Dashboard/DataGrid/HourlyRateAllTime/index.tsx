import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import { isThisYear, fromUnixTime } from 'date-fns';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const HourlyRateAllTime: React.FC<Props> = ({ user, data }) => {
  let tips: number[] = [];
  let hours: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      tips.push(wage.tips);
      hours.push(wage.hours_worked);
    });
  });

  const totalTips = numberReducer(tips);
  const hoursWorked = numberReducer(hours);
  const hourlyRate = totalTips / hoursWorked;

  const headerColor = {
    color: 'hsl(331, 100%, 54%)',
  };

  return (
    <section className="data-card">
      <h2>Hourly Rate</h2>
      <div className="data-card-data">
        <h1 style={headerColor}>
          {hourlyRate
            ? `${handleCurrency(user.currency)}${hourlyRate.toFixed(2)}`
            : `${handleCurrency(user.currency)}0.00`}
        </h1>
        <span>/hr</span>
      </div>
    </section>
  );
};

export default HourlyRateAllTime;
