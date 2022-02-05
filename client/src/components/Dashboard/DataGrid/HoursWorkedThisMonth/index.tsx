import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { numberReducer } from '../../../../utils/helpers';
import { fromUnixTime, isThisMonth } from 'date-fns';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const HoursWorkedThisMonth: React.FC<Props> = ({ user, data }) => {
  let hours: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      const fromUnix = fromUnixTime(wage.date);
      if (isThisMonth(fromUnix)) {
        hours.push(wage.hours_worked);
      }
    });
  });

  const hoursWorked = numberReducer(hours);

  return (
    <section className="data-card">
      <h2>Hourly Rate</h2>
      <div className="data-card-data">
        <h1>{hoursWorked ? `${hoursWorked}hrs` : `0hrs`}</h1>
      </div>
    </section>
  );
};

export default HoursWorkedThisMonth;
