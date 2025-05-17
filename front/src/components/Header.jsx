import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin from stored user data
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decode the JWT token to get user data
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(tokenData.isAdmin);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
      }
    }
  }, [isLoggedIn]); // Re-check when login status changes

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/signin');
  };

  return (
    <div className="header">
      <img className="logo" src="/imeges/logo.png" alt="G Logo" />
      <div className="header_link">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        {isAdmin && <Link to="/admin">Admin Panel</Link>}
        <Link to="/cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          Cart
        </Link>
        <Link to="/orders">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          Orders
        </Link>

        {isLoggedIn ? (
          <button className="btn" onClick={handleSignOut}>
            Sign out
          </button>
        ) : (
          <Link to="/signin">
            <button className="btn">Sign in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
