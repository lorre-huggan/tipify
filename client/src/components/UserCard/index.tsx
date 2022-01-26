import React, { useEffect, useState } from 'react';
import { UserJob } from '../../types/job-types';
import { AuthUser } from '../../types/user-types';
import './styles.scss';
import { formatDistanceToNow } from 'date-fns';
import { RiUserFill, RiSettings5Line } from 'react-icons/ri';
import Card from '../Card';
import { numberReducer } from '../../utils/helpers';
import { AiOutlineClose } from 'react-icons/ai';
interface Props {
  user: AuthUser;
  data: UserJob[] | undefined;
}

const UserCard: React.FC<Props> = ({ user, data }) => {
  const [currency, setCurrency] = useState<string>('£');
  const [settings, setSettings] = useState<boolean>(false);

  useEffect(() => {
    switch (user?.currency) {
      case 'GBP':
        setCurrency('£');
        break;
      case 'USD':
        setCurrency('$');
        break;
      case 'EUR':
        setCurrency('€');
        break;
      default:
        setCurrency('£');
        break;
    }
  }, [user.currency]);

  const userSince = formatDistanceToNow(user?.createdAt, { addSuffix: true });

  let tips: number[] = [];

  data?.forEach((dat) => {
    dat.wages.forEach((wage) => {
      tips.push(wage.tips);
    });
  });

  const totalTips = numberReducer(tips);

  const handleSettings = () => {
    setSettings(!settings);
  };

  return (
    <Card>
      <div className="user-card-container">
        <div className="user-card-user-avatar">
          {settings ? <RiSettings5Line /> : <RiUserFill />}
        </div>
        {settings ? (
          <>
            <div>Settings</div>
          </>
        ) : (
          <>
            <p className="user-card-user-since">{`User since ${userSince}`}</p>
            <h4>{user.username}</h4>
            <div className="user-card-work-grid">
              {data?.map((job) => {
                return (
                  <div key={job._id}>
                    <p>{`${job.job_title} at ${job.company_name}`}</p>
                  </div>
                );
              })}
            </div>
            <div className="user-card-analytics">
              <p>My all time tips</p>
              <h1>{`${currency}${totalTips.toFixed(2)}`}</h1>
            </div>
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
