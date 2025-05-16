import React, { useState } from 'react';
import './ProductCard.css';
 <h1 className="product-title">
            Our Collection
          </h1>
const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = () => {
    if (product.stock <= 0 || adding) return;
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      alert(`Product ${product._id || product.id} added to cart!`);
    }, 1500);
  };

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => {
          const isFullStar = i < fullStars;
          const isHalfStar = i === fullStars && hasHalfStar;
          return (
            <span
              key={i}
              className={`star ${isFullStar || isHalfStar ? 'filled' : ''}`}
            >
              {isFullStar ? '★' : isHalfStar ? '½' : '☆'}
            </span>
          );
        })}
        <span className="rating-text">{rating}</span>
      </div>
    );
  };

  const CartIcon = () => (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="#fff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="product-card-container">
      <img
        src={product.imageUrl || product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        <span className="category-chip">
          {product.category}
        </span>

        <p className="stock-text">
          Stock: {product.stock}
        </p>

        <p className="product-description" title={product.description}>
          {product.description}
        </p>

        <StarRating rating={product.rating} />
      </div>

      <div className="product-actions">
        <div className="price-container">
          <span className="price-text">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock || adding}
            className="add-to-cart-button"
          >
            {adding ? (
              <>
                <div className="spinner" />
                Adding...
              </>
            ) : (
              <>
                <CartIcon />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;