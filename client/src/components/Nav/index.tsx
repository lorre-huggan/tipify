import React from 'react';
import './styles.scss';
import {
  MdBookmark,
  MdDashboard,
  MdWork,
  MdWrongLocation,
  MdZoomOutMap,
} from 'react-icons/md';
interface Props {
  username: string;
}

const Nav: React.FC<Props> = ({ username }) => {
  return (
    <section>
      <div className="icons">
        <ul>
          <li>
            <MdDashboard />
            <p>Add Job</p>
          </li>
          <li>
            <MdBookmark />
            <p>Favorite</p>
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
            <p>lorem</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nav;
