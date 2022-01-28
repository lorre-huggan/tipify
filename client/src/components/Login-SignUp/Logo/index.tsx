import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Logo = () => {
  return (
    <Link to="/">
      <h1 className="logo">TIPiFY</h1>
    </Link>
  );
};

export default Logo;
