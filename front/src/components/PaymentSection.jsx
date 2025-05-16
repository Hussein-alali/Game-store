import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

const PaymentSection = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [useBillingAddress, setUseBillingAddress] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate card details if credit card is selected
      if (paymentMethod === 'credit_card') {
        if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
          throw new Error('Please fill in all card details');
        }
      }

      // Create order
      const response = await api.post('/orders', {
        paymentDetails: {
          method: paymentMethod,
          ...cardDetails,
          cvv: undefined // Don't send CVV to backend
        }
      });

      // Clear cart after successful order
      await api.delete('/cart');

      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: response.data._id,
          total: response.data.total
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to process payment');
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: {
          message: err.response?.data?.message || err.message || 'Failed to process payment',
          type: 'error'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-section">
      <h2>Payment Method</h2>
      <p className="secure-text">All transactions are secure and encrypted.</p>

      <div className="payment-methods">
        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Credit Card</span>
          <div className="cards">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" />
          </div>
        </label>

        {paymentMethod === 'credit_card' && (
          <div className="card-details">
            <input
              type="text"
              name="number"
              placeholder="Card number"
              value={cardDetails.number}
              onChange={handleInputChange}
              maxLength="16"
              pattern="[0-9]*"
            />
            <div className="input-group">
              <input
                type="text"
                name="expiry"
                placeholder="MM / YY"
                value={cardDetails.expiry}
                onChange={handleInputChange}
                maxLength="5"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleInputChange}
                maxLength="4"
                pattern="[0-9]*"
              />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Name on card"
              value={cardDetails.name}
              onChange={handleInputChange}
            />
          </div>
        )}

        <label className="payment-method">
          <input
            type="radio"
            name="payment"
            value="cash_on_delivery"
            checked={paymentMethod === 'cash_on_delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Cash on Delivery (COD)</span>
        </label>

        <label className="billing-address">
          <input
            type="checkbox"
            checked={useBillingAddress}
            onChange={(e) => setUseBillingAddress(e.target.checked)}
          />
          <span>Use shipping address as billing address</span>
        </label>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="pay-now">
        <button
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>

      <style jsx>{`
        .payment-section {
          margin-top: 1rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          width: 100%;
        }

        h2 {
          text-align: center;
          margin-bottom: 1rem;
        }

        .secure-text {
          text-align: center;
          color: #6c757d;
          margin-bottom: 1.5rem;
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin: 1rem 0;
        }

        .payment-method {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          cursor: pointer;
          background: white;
        }

        .payment-method:hover {
          background: #f8f9fa;
        }

        .cards {
          display: flex;
          gap: 0.5rem;
          margin-left: auto;
        }

        .cards img {
          height: 24px;
          width: auto;
        }

        .card-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          margin-top: -0.5rem;
          background: white;
        }

        .input-group {
          display: flex;
          gap: 1rem;
        }

        input[type="text"] {
          padding: 0.75rem;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          font-size: 1rem;
          width: 100%;
        }

        .error-message {
          color: #dc3545;
          margin: 1rem 0;
          padding: 0.75rem;
          background: #f8d7da;
          border: 1px solid #f5c6cb;
          border-radius: 4px;
          text-align: center;
        }

        .pay-now {
          margin-top: 1.5rem;
        }

        .pay-now button {
          width: 100%;
          padding: 1rem;
          background: #0071e3;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .pay-now button:hover:not(:disabled) {
          background: #005bb5;
        }

        .pay-now button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .billing-address {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
};

export default PaymentSection;
