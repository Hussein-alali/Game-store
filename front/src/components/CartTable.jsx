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
        <p>Your cart is empty</p>
        <button onClick={() => navigate('/games')}>Browse Games</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.map((item) => {
          if (!item.game) return null; // Skip invalid items
          
          const imageUrl = item.game.coverImage?.url || '/images/placeholder-game.jpg';
          const imageAlt = item.game.coverImage?.alt || item.game.title || 'Game image';
          
          return (
            <div key={item.game._id} className="cart-item">
              <div className="game-info">
                <img 
                  src={imageUrl}
                  alt={imageAlt}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-game.jpg';
                    e.target.onerror = null;
                  }}
                />
                <div className="game-details">
                  <h3>{item.game.title}</h3>
                  <p>Platform: {item.game.platform}</p>
                  <p>Price: ${item.game.price?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
              <div className="quantity-controls">
                <button 
                  onClick={() => updateQuantity(item.game._id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.game._id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <div className="item-total">
                ${((item.game.price || 0) * (item.quantity || 0)).toFixed(2)}
              </div>
              <button 
                className="remove-button"
                onClick={() => removeItem(item.game._id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="total">
          <span>Total:</span>
          <span>${calculateTotal().toFixed(2)}</span>
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
