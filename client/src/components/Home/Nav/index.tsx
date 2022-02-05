import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';
type Props = {};

const Nav = (props: Props) => {
  const [winPos, setWinPos] = useState<number>(0);
  const [isScroll, setIsScroll] = useState(false);

  window.addEventListener('scroll', () => {
    setWinPos(window.scrollY);
  });
  useEffect(() => {
    if (winPos > 80) {
      setIsScroll(true);
    }
    if (winPos < 80) {
      setIsScroll(false);
    }
  }, [winPos]);

  return (
    <>
      <nav className={winPos ? 'home-nav home-nav-scrolled' : 'home-nav'}>
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
