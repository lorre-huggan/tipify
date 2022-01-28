import React, { useEffect, useState } from 'react';
import { UserJob } from '../../../../types/job-types';
import { AuthUser } from '../../../../types/user-types';
import { handleCurrency, numberReducer } from '../../../../utils/helpers';
import './styles.scss';

type Props = {
  user: AuthUser;
  data: UserJob[] | undefined;
};

const AllTips: React.FC<Props> = ({ user, data }) => {
  let tips: number[] = [];

  data?.forEach((_data) => {
    _data.wages.forEach((wage) => {
      tips.push(wage.tips);
    });
  });

  const totalTips = numberReducer(tips);

  return (
    <div className="user-card-analytics">
      <h1>{`${handleCurrency(user.currency)}${totalTips.toFixed(2)}`}</h1>
    </div>
  );
};

export default AllTips;
