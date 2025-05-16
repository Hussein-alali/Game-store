import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../config/api';

const SHIPPING_COST = 50;
const DISCOUNT_PERCENT = 5; // 5% discount

const CartSummary = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const response = await api.get('/cart');
        if (response.data && Array.isArray(response.data.items)) {
          setCartItems(response.data.items);
          // Calculate subtotal from items
          const total = response.data.items.reduce((sum, item) => {
            return sum + (item.game.price * item.quantity);
          }, 0);
          setSubtotal(total);
        }
      } catch (err) {
        setError('Failed to load cart data');
        console.error('Error fetching cart:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const applyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'taher20') {
      setDiscountApplied(true);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: {
          message: `Congratulations! You got ${DISCOUNT_PERCENT}% discount!`,
          type: 'success'
        }
      }));
    } else {
      setDiscountApplied(false);
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: {
          message: 'Invalid discount code',
          type: 'error'
        }
      }));
    }
  };

  // Calculate final total with shipping and discount
  const calculateTotal = () => {
    const withShipping = subtotal + SHIPPING_COST;
    if (discountApplied) {
      const discount = withShipping * (DISCOUNT_PERCENT / 100);
      return withShipping - discount;
    }
    return withShipping;
  };

  if (loading) {
    return <div className="cart-summary loading">Loading cart summary...</div>;
  }

  if (error) {
    return <div className="cart-summary error">{error}</div>;
  }

  return (
    <div className="cart-summary">
      <h2>Order Summary</h2>
      
      <div className="cart-item-list">
        {cartItems.map(item => (
          <div key={item.game._id} className="cart-item-summary">
            <span>{item.game.title} × {item.quantity}</span>
            <span>${(item.game.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="discount-code">
        <input
          type="text"
          placeholder="Discount code"
          value={discountCode}
          onChange={e => setDiscountCode(e.target.value)}
        />
        <button onClick={applyDiscount}>Apply</button>
      </div>

      <div className="price-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="price-row">
        <span>Shipping</span>
        <span>${SHIPPING_COST.toFixed(2)}</span>
      </div>

      {discountApplied && (
        <div className="price-row discount">
          <span>Discount ({DISCOUNT_PERCENT}%)</span>
          <span>-${((subtotal + SHIPPING_COST) * (DISCOUNT_PERCENT / 100)).toFixed(2)}</span>
        </div>
      )}

      <div className="price-total">
        <span><strong>Total</strong></span>
        <span><strong>${calculateTotal().toFixed(2)}</strong></span>
      </div>

      <style jsx>{`
        .cart-summary {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          width: 100%;
        }

        h2 {
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .cart-item-list {
          margin-bottom: 1.5rem;
        }

        .cart-item-summary {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #dee2e6;
          font-size: 0.9rem;
          color: #495057;
        }

        .cart-item-summary:last-child {
          border-bottom: none;
        }

        .discount-code {
          display: flex;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .discount-code input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
        }

        .discount-code button {
          padding: 0.5rem 1rem;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .discount-code button:hover {
          background: #005bb5;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          margin: 0.5rem 0;
          color: #495057;
        }

        .discount {
          color: #28a745;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 2px solid #dee2e6;
          font-size: 1.2rem;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          color: #6c757d;
        }

        .error {
          color: #dc3545;
          text-align: center;
          padding: 1rem;
        }
      `}</style>
    </div>
  );
};

export default CartSummary;
