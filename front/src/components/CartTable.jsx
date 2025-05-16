// src/components/CartTable.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';
import './CartTable.css';

const CartTable = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart items from backend
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your cart');
        setLoading(false);
        return;
      }
      
      const response = await api.get('/cart');
      if (response.data && Array.isArray(response.data.items)) {
        setCartItems(response.data.items);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error('Cart fetch error:', err);
      setError(err.response?.data?.message || 'Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  // Update quantity in backend
  const updateQuantity = async (gameId, newQuantity) => {
    try {
      setError(null);
      const response = await api.put(`/cart/item/${gameId}`, { quantity: newQuantity });
      if (response.data && Array.isArray(response.data.items)) {
        setCartItems(response.data.items);
      }
    } catch (err) {
      console.error('Update quantity error:', err);
      setError('Failed to update quantity');
    }
  };

  // Remove item from cart
  const removeItem = async (gameId) => {
    try {
      setError(null);
      const response = await api.delete(`/cart/item/${gameId}`);
      if (response.data && Array.isArray(response.data.items)) {
        setCartItems(response.data.items);
      }
    } catch (err) {
      console.error('Remove item error:', err);
      setError('Failed to remove item');
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.game?.price || 0) * (item.quantity || 0);
    }, 0);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading) {
    return (
      <div className="cart-loading">
        <div className="loader"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-error">
        <p>{error}</p>
        <button onClick={fetchCartItems}>Try Again</button>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="empty-cart">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="#666">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any games yet!</p>
        <button onClick={() => navigate('/products')}>Browse Games</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      <div className="cart-grid">
        {cartItems.map((item) => {
          if (!item.game) return null;
          
          const imageUrl = item.game.coverImage || '/images/placeholder-game.jpg';
          const imageAlt = item.game.coverImage?.alt || item.game.title || 'Game image';
          
          return (
            <div key={item.game._id} className="cart-item-card">
              <div className="cart-item-image">
                <img 
                  src={imageUrl}
                  alt={imageAlt}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-game.jpg';
                    e.target.onerror = null;
                  }}
                />
              </div>
              <div className="cart-item-details">
                <h3>{item.game.title}</h3>
                <div className="platform-badge">
                  <span>{item.game.platform}</span>
                </div>
                <div className="price-tag">${item.game.price?.toFixed(2) || '0.00'}</div>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.game._id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-display">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.game._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-subtotal">
                  Subtotal: ${((item.game.price || 0) * (item.quantity || 0)).toFixed(2)}
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.game._id)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <button 
          className="checkout-button"
          onClick={() => navigate('/checkout', { 
            state: { 
              cartItems,
              total: calculateTotal()
            }
          })}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTable;
