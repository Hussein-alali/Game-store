import React from 'react';
import CartSummary from '../components/CartSummary';
import PaymentSection from '../components/PaymentSection';
import './CheckoutPage.css';

const CheckoutPage = () => {
  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-sections">
        <CartSummary />
        <PaymentSection />
      </div>
    </div>
  );
};

export default CheckoutPage; 