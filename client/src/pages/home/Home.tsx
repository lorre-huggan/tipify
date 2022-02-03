import React from 'react';
import Body from '../../components/Home/Body';
import Footer from '../../components/Home/Footer';
import Hero from '../../components/Home/Hero';
import Nav from '../../components/Home/Nav';
import './styles.scss';

interface Props {}

const Home = (props: Props) => {
  return (
    <main className="home-container">
      <Nav />
      <Hero />
      <Body />
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
