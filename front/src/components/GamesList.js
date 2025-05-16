import React, { useState, useEffect } from 'react';
import { gamesService } from '../services/games.service';

const GamesList = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gamesService.getAllGames();
        setGames(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch games. ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const handleAddToCart = async (gameId) => {
    try {
      await gamesService.addToCart(gameId);
      alert('Game added to cart successfully!');
    } catch (err) {
      alert('Failed to add game to cart: ' + err.message);
    }
  };

  if (loading) return <div>Loading games...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Available Games</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {games.map(game => (
          <div key={game._id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h3>{game.title}</h3>
            <p>Price: ${game.price}</p>
            <button 
              onClick={() => handleAddToCart(game._id)}
              style={{
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesList; 