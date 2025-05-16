import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import api from '../config/api';

// For navigation to /cart
// Use the correct relative public path for images: "/images/logo.png"
// Do NOT use a Windows absolute path or "imeges" typo.

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get('/games');
        
        // Extract games array and pagination info from response
        const { games, pagination: paginationData } = response.data;
        
        if (!Array.isArray(games)) {
          throw new Error('Invalid data format received from server');
        }
        
        setProducts(games);
        setPagination(paginationData);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#222",
      }}
    >
      {}
      <div
        style={{
          width: "100%",
          height: 100,
          background: "#2563eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Cart Icon in the top right corner */}
        <Link
          to="/cart"
          style={{
            position: "absolute",
            right: 32,
            top: "50%",
            transform: "translateY(-50%)",
            textDecoration: "none",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "50%",
            padding: 10,
            transition: "background 0.18s",
          }}
          aria-label="Go to cart"
          title="Go to cart"
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
        >
          {/* SVG Cart Icon */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "block" }}
          >
            <circle cx="9" cy="21" r="1.5" />
            <circle cx="19" cy="21" r="1.5" />
            <path d="M5 6h2l1.68 9.39a2 2 0 0 0 2 1.61h6.72a2 2 0 0 0 2-1.61L21 8H7" />
          </svg>
        </Link>
        {/* Empty: just blue rectangle */}
      </div>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 40px 20px",
        }}
      >
        {/* "Our Collection" as a professional, non-button heading */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 32,
            marginBottom: 40,
          }}
        >
          <h2
            style={{
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(90deg, #2563eb 0%, #1e40af 100%)",
              borderRadius: "999px",
              boxShadow: "0 4px 24px rgba(30,64,175,0.13)",
              letterSpacing: "1px",
              textShadow: "0 2px 8px rgba(30,64,175,0.10)",
              userSelect: "none",
              outline: "none",
              position: "relative",
              zIndex: 2,
              padding: "18px 48px",
              margin: 0,
              transition: "background 0.2s, box-shadow 0.2s, transform 0.15s",
              cursor: "default",
              display: "inline-block",
            }}
          >
            Our Collection
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 32,
          }}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                background: "linear-gradient(135deg, #fff 60%, #f1f5f9 100%)",
                borderRadius: 18,
                boxShadow: "0 6px 24px rgba(30,64,175,0.08)",
                overflow: "hidden",
                transition: "transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1), border 0.2s",
                cursor: "pointer",
                border: "2.5px solid transparent",
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
                justifyContent: "stretch",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-10px) scale(1.025)";
                e.currentTarget.style.boxShadow = "0 16px 32px rgba(220,38,38,0.18)";
                e.currentTarget.style.borderColor = "#dc2626";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(30,64,175,0.08)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;