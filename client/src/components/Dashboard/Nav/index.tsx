import React from 'react';
import './styles.scss';
import { useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';

interface Props {}

const Nav: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <section className="dashboard-nav">
      <div className="icons">
        <ul>
          <li onClick={handleLogout}>
            <BiLogOut />
            <p>Log Out</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
