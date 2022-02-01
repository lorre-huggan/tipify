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

  return (
    <div className="user-card-analytics">
      <p>Hourly Rate</p>

      <h1>
        {hourlyRate
          ? `${handleCurrency(user.currency)}${hourlyRate.toFixed(2)}/hr`
          : `${handleCurrency(user.currency)}0.00/hr`}
      </h1>
    </div>
  );
};

export default HourlyRateAllTime;
