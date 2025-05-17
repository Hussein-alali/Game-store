import React, { useState } from 'react';
import api from '../config/api';

const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = async () => {
    if (isOutOfStock || adding) return;
    
    setAdding(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/signin';
        return;
      }

      await api.post('/cart/add', { 
        gameId: product._id,
        quantity: 1
      });

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: {
          message: `Added "${product.title}" to cart!`,
          type: 'success'
        }
      }));
    } catch (error) {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: {
          message: error.response?.data?.message || 'Failed to add item to cart',
          type: 'error'
        }
      }));
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card-container">
      {showSuccess && (
        <div className="add-to-cart-success-message">
          Added to Cart!
        </div>
      )}
      
      <img 
        src={product.coverImage || '/images/placeholder-game.jpg'} 
        alt={product.title} 
        className="product-image" 
        loading="lazy"
        onError={(e) => {
          e.target.src = '/images/placeholder-game.jpg';
          e.target.onerror = null;
        }}
      />
      
      <div className="product-content">
        <div className="badge-container">
          {isOutOfStock && (
            <span className="product-card-simple-badge out-of-stock">
              Out of Stock
            </span>
          )}
          {!isOutOfStock && product.isNew && (
            <span className="product-card-simple-badge new">
              New
            </span>
          )}
        </div>

        <h3 className="product-name">{product.title}</h3>
        
        <div className="platform-badge">
          <span className="platform-chip">
            {product.platform}
          </span>
        </div>

        <div className="product-card-simple-category-wrapper left-align">
          <span className="category-chip">
            {product.category || 'Game'}
          </span>
        </div>

        <p className="stock-text">
          {isOutOfStock ? 'Currently unavailable' : `${product.stock} in stock`}
        </p>
      </div>

      <div className="product-actions">
        <div className="price-and-cart-row">
          <span className="price-text">${product.price.toFixed(2)}</span>
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={isOutOfStock || adding}
          >
            {adding ? (
              <div className="spinner"></div>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .platform-badge {
          margin: 8px 0;
        }

        .platform-chip {
          display: inline-block;
          background: linear-gradient(90deg, #0606dc 0%, #1e40af 100%);
          color: #fff;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(6,6,220,0.13);
        }

        .price-and-cart-row {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 16px;
        }

        .price-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: #222;
        }

        .add-to-cart-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #e53935;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
          min-width: 120px;
        }

        .add-to-cart-button:hover:not(:disabled) {
          background: #c62828;
        }

        .add-to-cart-button:disabled {
          background: #bdbdbd;
          cursor: not-allowed;
        }

        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .add-to-cart-success-message {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #43e97b;
          color: #fff;
          padding: 8px 18px;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 700;
          box-shadow: 0 2px 8px 0 rgba(67,233,123,0.13);
          z-index: 10;
          animation: fadeInOutSuccess 3s forwards;
        }

        @keyframes fadeInOutSuccess {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          10% {
            opacity: 1;
            transform: translateY(0);
          }
          90% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;