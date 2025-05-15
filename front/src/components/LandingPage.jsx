import React from 'react';

const LandingPage = () => (
  <div className="landing-page">
    <div className="landing-page-left-section">
      <h3>Welcome to G store</h3>
      <h1>Best Gaming Site ever!</h1>
      <p>This is my first website to practice HTML and CSS</p>
      <div className="landing-page-search">
        <input placeholder="Start Typing..." />
        <button className="btn">SEARCH</button>
      </div>
    </div>
    <div className="landing-page-image-container">
      <img src="/imeges/banner-image.jpg" alt="Banner" />
    </div>
  </div>
);

export default LandingPage;
