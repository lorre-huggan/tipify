import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import { isThisMonth, fromUnixTime } from 'date-fns';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const HourlyRateThisMonth: React.FC<Props> = ({ user, data }) => {
  let tips: number[] = [];
  let hours: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      const fromUnix = fromUnixTime(wage.date);
      if (isThisMonth(fromUnix)) {
        tips.push(wage.tips);
        hours.push(wage.hours_worked);
      }
    });
  });

  const totalTips = numberReducer(tips);
  const hoursWorked = numberReducer(hours);

  const hourlyRate = totalTips / hoursWorked;

  return (
    <section className="data-card">
      <h2>This Month</h2>
      <div className="data-card-data">
        <h1>
          {hourlyRate
            ? `${handleCurrency(user.currency)}${hourlyRate.toFixed(2)}/hr`
            : `${handleCurrency(user.currency)}0.00/hr`}
        </h1>
      </div>
    </section>
  );
};

export default HourlyRateThisMonth;
