import React from 'react';
// import './style.css';

const GameCard = ({ game }) => {
  const imageUrl = game.coverImage?.url || '/images/placeholder-game.jpg';
  const imageAlt = game.coverImage?.alt || game.title;

  return (
    <div className="card">
      <div className="image-container">
        <img 
          className="game-image" 
          src={imageUrl} 
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
