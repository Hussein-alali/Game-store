import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-left-section">
        <h3>Welcome to G store</h3>
        <h1>Best Gaming Site ever!</h1>
        <div className="landing-page-search">
          <input 
            placeholder="Start Typing..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn" onClick={handleSearch}>SEARCH</button>
        </div>
      </div>
      <div className="landing-page-image-container">
        <img src="/imeges/banner-image.jpg" alt="Banner" />
      </div>
    </div>
  );
};

export default LandingPage;
