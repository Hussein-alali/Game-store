import React, { useState, useEffect } from 'react';
import api from '../config/api';
import './OrderHistory.css';
import Header from './Header';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="order-history-loading">
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="order-history-error">
          <p>{error}</p>
        </div>
      </>
    );
  }

  if (orders.length === 0) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="order-history-empty">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="#666">
            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="blue-header">
        <div className="header-content">
          <h1>Order History</h1>
          <p>Track and manage your orders</p>
        </div>
      </div>
      <div className="order-history-container">
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <span className={`order-status ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="order-date">
                  {formatDate(order.orderDate)}
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.coverImage} 
                      alt={item.title} 
                      className="item-image"
                      onError={(e) => {
                        e.target.src = '/images/placeholder-game.jpg';
                        e.target.onerror = null;
                      }}
                    />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>Platform: {item.platform}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">${order.total}</span>
                </div>
                {order.statusHistory && (
                  <div className="status-history">
                    <h4>Order Status History</h4>
                    {order.statusHistory.map((status, index) => (
                      <div key={index} className="status-entry">
                        <span className={getStatusColor(status.status)}>
                          {status.status.charAt(0).toUpperCase() + status.status.slice(1)}
                        </span>
                        <span className="status-date">
                          {formatDate(status.date)}
                        </span>
                        {status.note && (
                          <p className="status-note">{status.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistory; 