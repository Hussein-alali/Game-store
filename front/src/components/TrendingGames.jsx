import React from "react";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";

const TrendingGames = () => {
  const games = new Array(4).fill({
    genre: "Action",
    title: "Assasins Creed",
    image: "/imeges/trending-01.jpg",
  });

  return (
    <div className="Trending-Container">
      <span>Trending</span>
      <div className="TrendingHeader">
        <h1>Trenging Games</h1>

        <Link to="/products">
          <button className="btn">view all</button>
        </Link>
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
