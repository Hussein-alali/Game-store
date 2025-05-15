import React, { useState, useEffect } from 'react';

const SHIPPING_COST = 50;

const CartSummary = () => {
  const [subtotal, setSubtotal] = useState(0);
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const cartItems = [
    { id: 1, name: 'Item 1', price: 950 },
    { id: 2, name: 'Item 2', price: 850 },
  ];

  useEffect(() => {
    let total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setSubtotal(total);
  }, []);

  const applyDiscount = () => {
    if (discountCode.trim().toLowerCase() === 'taher20') {
      setDiscountApplied(true);
      alert('Congratulations! You got 5% discount!');
    } else {
      setDiscountApplied(false);
      alert('Invalid discount code');
    }
  };

  const total = discountApplied ? (subtotal + SHIPPING_COST) * 0.95 : subtotal + SHIPPING_COST;

  return (
    <div className="cart-summary" >
      <div className="cart-item-list">
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
        <span>{subtotal.toFixed(2)} EGP </span>
      </div>
      <div className="price-row">
        <span>Shipping</span>
        <span>{SHIPPING_COST.toFixed(2)} EGP </span>
      </div>
      <div className="price-total">
        <span><strong>Total</strong></span>
        <span><strong>{total.toFixed(2)} EGP </strong></span>
      </div>
    </div>
  );
};

export default CartSummary;
