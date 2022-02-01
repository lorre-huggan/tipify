import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import TipsAllTips from '../TipsAllTime';
import TipsThisMonth from '../TipsThisMonth';
import TipsThisWeek from '../TipsThisWeek';
import HourlyRateAllTime from '../HourlyRateAllTime';
import './styles.scss';
import HourlyRateThisWeek from '../HourlyRateThisWeek/indext';
import HourlyRateThisMonth from '../HourlyRateThisMonth/indext';
import HoursWorkedAllTime from '../HoursWorkedAllTime';
import HoursWorkedThisWeek from '../HoursWorkedThisWeek';
import HoursWorkedThisMonth from '../HoursWorkedThisMonth';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const Analytics: React.FC<Props> = ({ user, data }) => {
  return (
    <div className="user-card-tip-grid">
      <TipsAllTips user={user} data={data} />
      <TipsThisWeek user={user} data={data} />
      <TipsThisMonth user={user} data={data} />
      <HourlyRateAllTime user={user} data={data} />
      <HourlyRateThisWeek user={user} data={data} />
      <HourlyRateThisMonth user={user} data={data} />
      <HoursWorkedAllTime user={user} data={data} />
      <HoursWorkedThisWeek user={user} data={data} />
      <HoursWorkedThisMonth user={user} data={data} />
    </div>
  );
};

export default Analytics;
