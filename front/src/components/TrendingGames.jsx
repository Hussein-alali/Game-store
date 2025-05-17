import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import api from '../config/api';
import './TrendingGames.css';

const TrendingGames = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        setLoading(true);
        const response = await api.get('/games/trending');
        setTrendingGames(response.data.games || []);
      } catch (err) {
        setError('Failed to load trending games');
        console.error('Error fetching trending games:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGames();
  }, []);

  if (loading) {
    return (
      <div className="trending-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trending-error">
        {error}
      </div>
    );
  }

  return (
    <div className="trending-container">
      <div className="trending-header">
        <h2 className="trending-title">Trending Games</h2>
        <Link to="/products" className="view-all-button">
          View All Games
        </Link>
      </div>

      <div className="trending-grid">
        {trendingGames.map((game) => (
          <div key={game._id} className="trending-game-card">
            <ProductCard product={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingGames;
