import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrderTable from '../components/OrderTable';
import Breadcrumb from '../components/Breadcrumb';

const UserOrders = () => {
  return (
    <>
      <Header />
      <div className="orders-container">
        <h2 className="order-heading">Your Orders</h2>
        <OrderTable />
        <Breadcrumb />
      </div>
      <Footer />
    </>
  );
};

export default UserOrders;
