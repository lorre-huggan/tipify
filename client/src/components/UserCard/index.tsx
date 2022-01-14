import React from 'react';
import { UserJob, UserJobs } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import './styles.scss';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  user: AuthUser;
  data: UserJob[] | undefined;
}

const UserCard: React.FC<Props> = ({ user, data }) => {
  const y = formatDistanceToNow(user?.createdAt, { addSuffix: true });

  //const memberSince = formatDistance(date, baseDate, [options])
  return (
    <div className="user-card-container">
      <h2>{user.username}</h2>
      <p>{`User since ${y}`}</p>
    </div>
  );
};

export default UserCard;
