import React from 'react';
import OrderRow from './OrderRow';

const OrderTable = () => {
  const orders = [
    {
      image: '/imeges/categories-02.jpg',
      title: 'Dota 2',
      genre: 'Action | Shooter',
      price: '250 EGP',
      quantity: 3,
      total: '750 EGP',
      status: 'Delivered'
    },
    {
      image: '/imeges/categories-04.jpg',
      title: 'Super People',
      genre: 'Action | Shooter',
      price: '310 EGP',
      quantity: 1,
      total: '310 EGP',
      status: 'Shipped'
    }
  ];

  return (
    <table className="cart-table">
      <thead>
        <tr>
          <th>Game</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => (
          <OrderRow key={index} {...order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
