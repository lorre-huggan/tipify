import React, { useEffect, useState } from 'react';
import { UserJob } from '../../../types/job-types';
import { AuthUser } from '../../../types/user-types';
import './styles.scss';
import { formatDistanceToNow } from 'date-fns';
import { RiUserFill, RiSettings5Line } from 'react-icons/ri';
import Card from '../../Card';
import { AiOutlineClose } from 'react-icons/ai';
import Account from './Account';

import Analytics from './Analytics';
interface Props {
  user: AuthUser;
  data: UserJob[] | undefined;
}

const UserCard: React.FC<Props> = ({ user, data }) => {
  const [settings, setSettings] = useState<boolean>(false);

  const userSince = formatDistanceToNow(user?.createdAt, { addSuffix: true });

  const handleSettings = () => {
    setSettings(!settings);
  };

  return (
    <Card area="user">
      <div className="user-card">
        <div className="user-card-user-avatar">
          {settings ? <RiSettings5Line /> : <RiUserFill />}
        </div>
        {settings ? (
          <>
            <Account id={data![0]._id} job={data![0]} />
          </>
        ) : (
          <>
            <p className="user-card-user-since">{`User since ${userSince}`}</p>
            <h4>{user.username}</h4>
            <div className="user-card-work-grid">
              <p>{`${data![0].job_title} at ${data![0].company_name}`}</p>
            </div>
            <Analytics user={user} data={data} />
          </>
        )}
        <div className="user-card-settings-icon" onClick={handleSettings}>
          {!settings ? <RiSettings5Line /> : <AiOutlineClose />}
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
