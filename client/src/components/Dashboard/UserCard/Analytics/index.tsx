import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import TipsAllTips from '../TipsAllTime';
import TipsThisMonth from '../TipsThisMonth';
import TipsThisWeek from '../TipsThisWeek';
import './styles.scss';

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
    </div>
  );
};

export default Analytics;
