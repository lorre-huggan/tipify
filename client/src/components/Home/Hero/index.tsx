import React from 'react';
import './styles.scss';

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>track your tips today</h1>
        <p>
          Tipify is the worlds smartest tip tracker. Powerful and simple to use,
          tip track lets you track your tips from multiple jobs and shifts and
          lets you create custom metrics to track the tips you earn
        </p>
      </div>
      <div className="hero-right">Hello World</div>
    </section>
  );
};

export default Hero;
