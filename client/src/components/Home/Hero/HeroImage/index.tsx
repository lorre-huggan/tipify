import React from 'react';
import selfie from '../../../../img/selfie.png';
import './styles.scss';

type Props = {};

const HeroImage = (props: Props) => {
  return (
    <div className="hero-image">
      <img src={selfie} alt="selfie" />
    </div>
  );
};

export default HeroImage;
