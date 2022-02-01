import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import { isThisWeek, fromUnixTime } from 'date-fns';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const HoursWorkedThisWeek: React.FC<Props> = ({ user, data }) => {
  let hours: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      const fromUnix = fromUnixTime(wage.date);
      if (isThisWeek(fromUnix)) {
        hours.push(wage.hours_worked);
      }
    });
  });

  const hoursWorked = numberReducer(hours);

  return (
    <div className="user-card-analytics">
      <p>This Week</p>
      <h1>{hoursWorked ? `${hoursWorked}hrs` : `0hrs`}</h1>
    </div>
  );
};

export default HoursWorkedThisWeek;
