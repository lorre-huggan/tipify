import React from 'react';
import './styles.scss';

type Props = {
  currency: string;
  totalTips: number;
};

const AllTips: React.FC<Props> = ({ currency, totalTips }) => {
  return (
    <div className="user-card-analytics">
      <p>My all time tips</p>
      <h1>{`${currency}${totalTips.toFixed(2)}`}</h1>
    </div>
  );
};

export default AllTips;
