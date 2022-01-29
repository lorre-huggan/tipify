import React from 'react';
import './styles.scss';

type Props = {
  area: string;
};

const Card: React.FC<Props> = ({ children, area }) => {
  return (
    <div className="card-container" style={{ gridArea: area }}>
      <div className="card-inner">{children}</div>
    </div>
  );
};

export default Card;
