import React from 'react';

const CheckoutForm = () => {
  return (
    <div className="checkout-left">
      <h2>Contact</h2>
      <input type="email" placeholder="Email or mobile phone number" required />
      <label><input type="checkbox" /> Email me with news and offers</label>

      <h2>Delivery</h2>
      <select>
        <option>Country/Region</option>
        <option selected>Egypt</option>
      </select>

      <div className="input-group">
        <input type="text" placeholder="First name" />
        <input type="text" placeholder="Last name" />
      </div>

      <input type="text" placeholder="Address" />
      <input type="text" placeholder="Apartment, suite, etc." />

      <div className="input-group">
        <input type="text" placeholder="City" />
        <select>
          <option selected>Cairo</option>
          <option>Giza</option>
          <option>New Cairo</option>
          <option>Nasr City</option>
        </select>
        <input type="text" placeholder="Postal code (optional)" />
      </div>

      <input type="tel" placeholder="Phone" />
      <label><input type="checkbox" /> Save this information for next time</label>
    </div>
  );
};

export default CheckoutForm;
