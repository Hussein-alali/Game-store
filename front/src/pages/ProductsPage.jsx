import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const sampleProducts = [
    {
      _id: '1',
      name: 'Sample Game 1',
      price: 59.99,
      description: 'An exciting adventure game',
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Adventure',
      stock: 15,
      rating: 4.5
    },
    {
      _id: '2',
      name: 'Sample Game 2',
      price: 49.99,
      description: 'A thrilling action game',
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'Action',
      stock: 8,
      rating: 4.2
    },
    {
      _id: '3',
      name: 'Sample Game 3',
      price: 39.99,
      description: 'An immersive RPG',
      imageUrl: 'https://via.placeholder.com/300x200',
      category: 'RPG',
      stock: 12,
      rating: 4.7
    }
  ];

  const [products] = useState(sampleProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "10px" }}>
      {/* Title Section */}
      <h1 style={{ textAlign: "center", margin: "20px 0", fontSize: "2rem",  color:"red"}}>
        Our Collection
      </h1>

      {/* Product Grid */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "flex-start"
        }}
      >
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}; // ← missing this before!

export default ProductsPage;
