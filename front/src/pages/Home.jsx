import React from 'react';
import Headerforhome from '../components/Headerforhome';
import LandingPage from '../components/LandingPage';
import TrendingGames from '../components/TrendingGames';
import Footer from '../components/Footer';

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Headerforhome isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <LandingPage />
      <TrendingGames />
      <Footer/>
    </>
  );
};

export default Home;
