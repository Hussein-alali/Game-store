import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
import AdminPage from './pages/AdminPage';
import ProductsPage from './pages/ProductsPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('loggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
      <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/UserOrders" element={<UserOrders />} />
      <Route path='/Admin' element={<AdminPage/>}/>
      <Route path='/Products' element={<ProductsPage/>}/>

       </Routes>
  );
};

export default App;
