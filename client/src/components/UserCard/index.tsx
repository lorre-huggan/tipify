import React from 'react';
import { UserJob, UserJobs } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import './styles.scss';
import { formatDistanceToNow } from 'date-fns';
import { RiUserFill, RiSettings5Line } from 'react-icons/ri';
interface Props {
  user: AuthUser;
  data: UserJob[] | undefined;
}

const UserCard: React.FC<Props> = ({ user, data }) => {
  const y = formatDistanceToNow(user?.createdAt, { addSuffix: true });

  //const memberSince = formatDistance(date, baseDate, [options])
  return (
    <div className="user-card-container">
      <div className="user-card-user-avatar">
        <RiUserFill />
      </div>
      <div className="user-card-settings-icon">
        <RiSettings5Line />
      </div>
      <p className="user-card-user-since">{`User since ${y}`}</p>
      <h2>{user.username}</h2>
      <p>Working at</p>
      {data?.map((job) => {
        return <p key={job._id}>{job.company_name}</p>;
      })}
      <p></p>
    </div>
  );
};

export default UserCard;
