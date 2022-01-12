import React from 'react';
import { useUserState } from '../../context/user/userProvider';
import './styles.scss';

interface Props {}

const Dashboard = (props: Props) => {
  const [{ username, email }, dispatch] = useUserState();
  return (
    <div className="test">
      <p>{username}</p>
      <p>{email}</p>
    </div>
  );
};

export default Dashboard;
