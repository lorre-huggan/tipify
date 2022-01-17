import React from 'react';
import './styles.scss';
import {
  MdBookmark,
  MdDashboard,
  MdWork,
  MdWrongLocation,
  MdZoomOutMap,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {
  username: string;
}

const Nav: React.FC<Props> = ({ username }) => {
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
          <li>
            <MdZoomOutMap />
            <p>Account</p>
          </li>
          <li>
            <MdWrongLocation />
            <p>lorem</p>
          </li>
          <li>
            <MdWork />
            <p>logout</p>
          </li>
          <li>
            <MdWork />
            <p>lorem</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
