import React from 'react';
import './styles.scss';
import { MdDashboard, MdWork } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {}

const Nav: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <section>
      <div className="icons">
        <ul>
          <li>
            <MdDashboard />
            <p>Add Job</p>
          </li>
          <li onClick={handleLogout}>
            <MdWork />
            <p>Log Out</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
