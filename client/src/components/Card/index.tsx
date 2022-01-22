import React from 'react';
import './styles.scss';

type Props = {};

const Card: React.FC<Props> = ({ children }) => {
  return (
    <div className="card-container">
      <div className="card-inner">{children}</div>
    </div>
  );
};

export default Card;
