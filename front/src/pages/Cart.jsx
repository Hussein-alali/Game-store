// src/pages/Cart.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import CartTable from '../components/CartTable';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  const navigate = useNavigate();

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="cart-container" style={{ padding: '20px', maxWidth: '960px', margin: 'auto' }}>
        <hr />
        <CartTable />
        <hr />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
