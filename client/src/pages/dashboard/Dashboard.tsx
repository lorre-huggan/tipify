import React, { useEffect, useState } from 'react';
import { useUserState } from '../../context/user/userProvider';
import './styles.scss';
import { UseAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav';

interface Props {}

const Dashboard = (props: Props) => {
  const {
    authUser: { username, email },
  } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <main className="dashboard">
      {/* Nav */}
      <Nav username={username} />
      {/* components */}
      <div className="surface">{username}</div>
      <div className="surface">Tips this month</div>

      {/* footer */}
      <button onClick={handleLogout}>click</button>
    </main>
  );
};

export default Dashboard;
