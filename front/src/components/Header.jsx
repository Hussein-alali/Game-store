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
        <Link to="/cart">Cart</Link>
        {isAdmin && <Link to="/admin">Admin Panel</Link>}
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
