import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
type Props = {};

const Nav = (props: Props) => {
  return (
    <>
      <nav className='home-nav'>
        <div className="nav-inner-container">
          <div className="nav-logo">
            <h2>TIPiFY</h2>
          </div>
          <div className="nav-links">
            <ul>
              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
              <Link to="/login">
                <li>Log In</li>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
