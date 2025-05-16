import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';  // استيراد فقط Routes و Route
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
import Admin from './pages/AdminPage';
import Products from './pages/ProductsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('token');
    }
  }, [isLoggedIn]);

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} logout={logout} />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/products" element={<Products />} />
      <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/UserOrders" element={<UserOrders />} />
    </Routes>
  );
};

export default App;
