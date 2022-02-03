import React from 'react';
import BodyGrid from './BodyGrid';
import './styles.scss';

type Props = {};

const Body = (props: Props) => {
  return (
    <section className="home-body">
      <div className="home-body-header">
        <h1>Tipify Features</h1>
      </div>
      <BodyGrid />
    </section>
  );
};

export default Body;
