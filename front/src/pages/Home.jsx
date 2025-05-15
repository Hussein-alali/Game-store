import React from 'react';
import Header from '../components/Header';
import LandingPage from '../components/LandingPage';
import TrendingGames from '../components/TrendingGames';
import Footer from '../components/Footer';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <LandingPage />
      <TrendingGames />
      <Footer/>
    </>
  );
};

export default Home;
