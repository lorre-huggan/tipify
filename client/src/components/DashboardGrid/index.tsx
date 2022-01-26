import React from 'react';
import { UseAuth } from '../../hooks/useAuth';
import { UserJobs } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import AddShift from '../AddShift';
import MonthAnalytics from '../Analytics/Month';
import UserCard from '../UserCard';
import DailyAnalytics from '../Analytics/Daily';

type Props = {
  data: UserJobs | undefined;
};

const DashboardGrid: React.FC<Props> = ({ data }) => {
  const { authUser }: { authUser: AuthUser } = UseAuth();
  return (
    <div className="dashboard-grid">
      <UserCard user={authUser} data={data?.UserJobs} />
      <AddShift user={authUser?.username} />
      <MonthAnalytics data={data?.UserJobs} />
      <DailyAnalytics data={data?.UserJobs} />
    </div>
  );
};

export default DashboardGrid;
