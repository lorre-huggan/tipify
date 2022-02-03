import React from 'react';
import HeroGrid from './HeroGrid';
import './styles.scss';

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="hero">
      <HeroGrid />
    </section>
  );
};

export default Hero;
