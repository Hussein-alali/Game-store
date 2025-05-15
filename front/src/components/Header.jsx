import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    navigate('/signin');
  };

  return (
    <div className="header">
      <img className="logo" src="/imeges/logo.png" alt="G Logo" />
      <div className="header_link">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

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
