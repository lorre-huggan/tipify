import React from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import { isThisMonth, fromUnixTime } from 'date-fns';
import './styles.scss';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const TipsThisMonth: React.FC<Props> = ({ user, data }) => {
  let tips: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      const fromUnix = fromUnixTime(wage.date);
      if (isThisMonth(fromUnix)) {
        tips.push(wage.tips);
      }
    });
  });

  const totalTips = numberReducer(tips);

  return (
    <div className="user-card-analytics month-tips">
      <p>This Month</p>
      <h1 style={{ color: 'hsl(174, 72%, 66%' }}>{`${handleCurrency(
        user.currency
      )}${totalTips.toFixed(2)}`}</h1>
    </div>
  );
};

export default TipsThisMonth;
