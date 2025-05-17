import React from 'react';
import api from '../config/api';
// import './style.css';

const GameCard = ({ game }) => {
  // Get the correct image URL from the game's imageUrl virtual property
  const imageUrl = game.imageUrl || '/images/placeholder-game.jpg';
  const imageAlt = game.title || 'Game cover';

  return (
    <div className="card">
      <div className="image-container">
        <img 
          className="game-image" 
          src={`${api.defaults.baseURL}${imageUrl}`} 
          alt={imageAlt}
          onError={(e) => {
            e.target.src = '/images/placeholder-game.jpg';
            e.target.onerror = null;
          }}
        />
      </div>
      <div className="card-info">
        <div className="card-name">
          <p>{game.platform}</p>
          <h3>{game.title}</h3>
          <p className="price">${game.price}</p>
        </div>
        <button className="buy-button">
          <img src="/images/cart-icon.png" alt="Add to cart" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
