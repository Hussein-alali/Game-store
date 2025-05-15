// src/pages/Cart.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import CartTable from '../components/CartTable';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      // Optional: redirect or other actions on sign out
    } else {
      navigate('/signin');
    }
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onAuthClick={handleAuthClick} />
      <div className="cart-container" style={{ padding: '20px', maxWidth: '960px', margin: 'auto' }}>
        <hr />
        <CartTable />
        <hr />
        <div style={{ marginTop: '1rem' }}>
            
          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
            disabled={false /* optionally disable if cart empty */}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
