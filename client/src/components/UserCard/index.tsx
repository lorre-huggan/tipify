import React, { useState } from 'react';
import { UserJob, UserJobs } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import './styles.scss';
import { formatDistanceToNow } from 'date-fns';
import {
  RiUserFill,
  RiSettings5Line,
  RiMoneyDollarCircleLine,
  RiMoneyEuroCircleLine,
  RiMoneyPoundCircleLine,
} from 'react-icons/ri';
interface Props {
  user: AuthUser;
  data: UserJob[] | undefined;
}

const UserCard: React.FC<Props> = ({ user, data }) => {
  const y = formatDistanceToNow(user?.createdAt, { addSuffix: true });

  let tips: number[] = [];
  data?.forEach((dat) => {
    dat.wages.forEach((wage) => {
      tips.push(wage.tips);
    });
  });

  const totalTips = tips.reduce((total, item) => {
    return total + item;
  }, 0);

  return (
    <div className="user-card-container">
      <p className="user-card-user-since">{`User since ${y}`}</p>
      <div className="user-card-user-avatar">
        <RiUserFill />
      </div>
      <h2>{user.username}</h2>
      <p>Working at</p>
      <div className="user-card-work-grid">
        {data?.map((job) => {
          return (
            <div key={job._id}>
              <p>{job.company_name}</p>
            </div>
          );
        })}
      </div>
      <div className="user-card-analytics">
        <p>All time tips</p>
        <p>{`£${totalTips.toFixed(2)}`}</p>
      </div>
      <div className="user-card-settings-icon">
        <RiSettings5Line />
      </div>
    </div>
  );
};

export default UserCard;
