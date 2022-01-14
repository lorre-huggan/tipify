import React from 'react';
import './styles.scss';

interface Props {}

const LoadingBox: React.FC<Props> = ({}) => {
  return (
    <div className="balls">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingBox;
