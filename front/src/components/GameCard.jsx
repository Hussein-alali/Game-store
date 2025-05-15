import React from 'react';

const GameCard = ({ game }) => (
  <div className="card">
    <img className="rad" src={game.image} alt={game.title} />
    <div className="card-info">
      <div className="card-name">
        <p>{game.genre}</p>
        <h3>{game.title}</h3>
      </div>
      <a href="#">
        <img src="/imeges/online-shopping.png" alt="Buy now" />
      </a>
    </div>
  </div>
);

export default GameCard;
