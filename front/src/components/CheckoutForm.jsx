import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../config/api';

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, total } = location.state || { cartItems: [], total: 0 };
  
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create order
      const orderResponse = await api.post('/orders', {
        items: cartItems.map(item => ({
          gameId: item.game._id,
          quantity: item.quantity,
          price: item.game.price
        })),
        total: total,
        paymentDetails: {
          ...formData,
          cvv: undefined // Don't send CVV to backend
        }
      });

      // Clear cart after successful order
      await api.delete('/cart');

      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: orderResponse.data.orderId,
          total: total
        }
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to process order');
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return <div>No items in cart</div>;
  }

  
    };

export default CheckoutForm;
