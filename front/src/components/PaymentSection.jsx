import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const PaymentSection = () => {
  return (
    <div>
      <h2>Payment</h2>
      <p className="secure-text">All transactions are secure and encrypted.</p>

      <div className="payment-method">
        <label>
          <input type="radio" name="payment" defaultChecked /> Credit card
          <div className="cards">
            <img src="https://img.icons8.com/color/48/000000/visa.png" />
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" />
          </div>
        </label>

        <input type="text" placeholder="Card number" />
        <div className="input-group">
          <input type="text" placeholder="Expiration date (MM / YY)" />
          <input type="text" placeholder="Security code" />
        </div>
        <input type="text" placeholder="Name on card" />
        <label><input type="radio" name="payment" /> Cash on Delivery (COD)</label>
        <br />
        <label><input type="checkbox" /> Use shipping address as billing address</label>
      </div>
      <br />
      <div className="pay-now">
         <Link to="/UserOrders">
            <button >Pay Now</button>
          </Link>
      </div>
    </div>
  );
};

export default PaymentSection;
