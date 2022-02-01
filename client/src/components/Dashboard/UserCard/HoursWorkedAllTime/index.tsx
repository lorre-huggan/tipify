import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import { isThisYear, fromUnixTime } from 'date-fns';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const HoursWorkedAllTime: React.FC<Props> = ({ user, data }) => {
  let hours: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      hours.push(wage.hours_worked);
    });
  });

  const hoursWorked = numberReducer(hours);

  return (
    <div className="user-card-analytics">
      <p>Hours Worked</p>
      <h1>{hoursWorked ? `${hoursWorked}hrs` : `0hrs`}</h1>
    </div>
  );
};

export default HoursWorkedAllTime;
