import React from 'react';
interface Props {}

const Home = (props: Props) => {
  const newArr = new Array(200).fill(0);
  return (
    <div>
      {newArr.map(() => {
        return <p>Home</p>;
      })}
    </div>
  );
};

export default Home;
