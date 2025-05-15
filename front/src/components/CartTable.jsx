// src/components/CartTable.jsx
import React, { useState } from 'react';

const initialCartItems = [
  {
    id: 1,
    image: '/imeges/categories-02.jpg',
    name: 'Dota 2',
    description: 'Action | Shooter',
    unitPrice: 250,
    quantity: 1,
  },
  {
    id: 2,
    image: '/imeges/categories-01.jpg',
    name: 'Brawlhalla',
    description: 'Adventure | RPG',
    unitPrice: 390,
    quantity: 1,
  },
  {
    id: 3,
    image: '/imeges/categories-04.jpg',
    name: 'Super People',
    description: 'Action | Shooter',
    unitPrice: 310,
    quantity: 1,
  },
  {
    id: 4,
    image: '/imeges/categories-05.jpg',
    name: 'Warframe',
    description: 'Adventure | RPG',
    unitPrice: 150,
    quantity: 1,
  },
  {
    id: 5,
    image: '/imeges/top-game-02.jpg',
    name: 'Pubg Battlegrounds',
    description: 'Action | Shooter',
    unitPrice: 450,
    quantity: 1,
  },
];

const CartTable = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateTotalPrice = (unitPrice, quantity) => unitPrice * quantity;

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th>Game</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartItems.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
              Your cart is empty.
            </td>
          </tr>
        ) : (
          cartItems.map(({ id, image, name, description, unitPrice, quantity }) => (
            <tr key={id}>
              <td>
                <img src={image} alt={name} />
              </td>
              <td>
                <strong>{name}</strong>
                <br />
                {description}
              </td>
              <td className="unit-price">{unitPrice} EGP</td>
              <td>
                <input
                  type="number"
                  min="1"
                  className="quantity-input"
                  value={quantity}
                  onChange={(e) => updateQuantity(id, parseInt(e.target.value) || 1)}
                />
              </td>
              <td className="total-price">{calculateTotalPrice(unitPrice, quantity)} EGP</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(id)}
                  aria-label={`Remove ${name} from cart`}
                >
                  &times;
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CartTable;
