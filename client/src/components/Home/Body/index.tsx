import React from 'react';
import BodyFeatures from './BodyFeatures';
import './styles.scss';

type Props = {};

const Body = (props: Props) => {
  return (
    <section className="home-body">
      <div className="home-body-header">
        <h1>Tipify Features</h1>
      </div>
      <BodyFeatures />
    </section>
  );
};

export default Body;
