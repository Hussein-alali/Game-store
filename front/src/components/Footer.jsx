// src/components/Footer.jsx
import React from 'react';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: <a href="mailto:support@Lugxstore.com">support@Lugxstore.com</a></p>
        <p>Customer Service: +92 300 1234567</p>
      </div>
      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{' '}
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> |{' '}
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">&copy; 2025 LugxStore. All rights reserved.</div>
  </footer>
);

export default Footer;
