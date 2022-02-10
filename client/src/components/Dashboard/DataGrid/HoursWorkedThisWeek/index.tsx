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

  const headerColor = {
    color: 'hsl(202, 100%, 65%)',
  };

  return (
    <section className="data-card">
      <h2>This Week</h2>
      <div className="data-card-data">
        <h1 style={headerColor}>
          {hoursWorked ? `${hoursWorked}hrs` : `0hrs`}
        </h1>
      </div>
    </section>
  );
};

export default HoursWorkedThisWeek;
