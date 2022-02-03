import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {};

const HeroDetails = (props: Props) => {
  return (
    <div className="hero-details">
      <div className="hero-details-container">
        <h1>Managing your tips made simple</h1>
        <Link to="/signup">
          <button>Sign Up for TIPiFY</button>
        </Link>
        <p>
          Are you tired of never knowing exactly how much money you make because
          it ends up as cash in your pocket? TIPiFy solves that.
        </p>
      </div>
    </div>
  );
};

export default HeroDetails;
