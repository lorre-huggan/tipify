import React from 'react';
import { UserJob, UserJobs } from '../../../types/job-types';
import { AuthUser } from '../../../types/user-types';
import HourlyRateAllTime from './HourlyRateAllTime';
import HourlyRateThisMonth from './HourlyRateThisMonth';
import HourlyRateThisWeek from './HourlyRateThisWeek';
import HoursWorkedAllTime from './HoursWorkedAllTime';
import HoursWorkedThisMonth from './HoursWorkedThisMonth';
import HoursWorkedThisWeek from './HoursWorkedThisWeek';
import './styles.scss';

type Props = {
  data: UserJob[] | undefined;
  user: AuthUser;
};

const DataGrid: React.FC<Props> = ({ data, user }) => {
  return (
    <section className="data-grid">
      <HourlyRateAllTime user={user} data={data} />
      <HourlyRateThisWeek user={user} data={data} />
      <HourlyRateThisMonth user={user} data={data} />
      <HoursWorkedAllTime user={user} data={data} />
      <HoursWorkedThisWeek user={user} data={data} />
      <HoursWorkedThisMonth user={user} data={data} />
    </section>
  );
};

export default DataGrid;
