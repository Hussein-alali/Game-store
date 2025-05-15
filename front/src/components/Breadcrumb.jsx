import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <div className="breadcrumb order-heading">
      <Link to="/">Back To Home Page</Link>
    </div>
  );
};

export default Breadcrumb;
