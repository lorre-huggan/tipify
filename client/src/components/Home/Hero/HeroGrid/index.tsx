import React from 'react';
import HeroDetails from '../HeroDetails';
import HeroImage from '../HeroImage';
import './styles.scss';

type Props = {};

const HeroGrid = (props: Props) => {
  return (
    <div className="hero-grid">
      <HeroDetails />
      <HeroImage />
    </div>
  );
};

export default HeroGrid;
