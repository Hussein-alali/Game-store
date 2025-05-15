import React from 'react';

const OrderRow = ({ image, title, genre, price, quantity, total, status }) => {
  return (
    <tr className="order-item">
      <td><img className="order-image" src={image} alt={title} /></td>
      <td><strong>{title}</strong><br />{genre}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td><span className="status">{status}</span></td>
    </tr>
  );
};

export default OrderRow;
