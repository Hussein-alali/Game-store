import React from 'react';
import GameCard from './GameCard';

const TrendingGames = () => {
  const games = new Array(4).fill({
    genre: 'Action',
    title: 'Assasins Creed',
    image: '/imeges/trending-01.jpg',
  });

  return (
    <div className="Trending-Container">
      <span>Trending</span>
      <div className="TrendingHeader">
        <h1>Trenging Games</h1>
        <button className="btn">view all</button>
      </div>
      <div className="Trending-Cards">
        {games.map((game, index) => (
          <GameCard key={index} game={game} />
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;
