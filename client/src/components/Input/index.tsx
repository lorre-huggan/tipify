import React from 'react';
import './styles.scss';

interface Props {}

const Input = (props: Props) => {
  return (
    <div className="input-container">
      <input type="text" placeholder="Input Outline" />
      <span className="bottom"></span>
      <span className="right"></span>
      <span className="top"></span>
      <span className="left"></span>
    </div>
  );
};

export default Input;
