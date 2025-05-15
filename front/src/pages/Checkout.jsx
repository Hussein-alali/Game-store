// src/pages/Checkout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSummary from '../components/CartSummary';
import CheckoutForm from '../components/CheckoutForm';
import PaymentSection from '../components/PaymentSection';

const Checkout = () => {
  return (
    <>
      <Header />
<br />
<br />
      <div className="checkout-container" style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Left: Cart Summary */}
          <div style={{ flex: '1 1 40%' }}>
            <CartSummary />
            <PaymentSection />
          </div>

          {/* Right: Checkout Form and Payment */}
          <div style={{ flex: '1 1 55%' }}>
            <CheckoutForm />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
