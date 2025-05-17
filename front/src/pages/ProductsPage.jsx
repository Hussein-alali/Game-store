import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../config/api';
import Header from '../components/Header';

// For navigation to /cart
// Use the correct relative public path for images: "/images/logo.png"
// Do NOT use a Windows absolute path or "imeges" typo.

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
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
        setFilteredProducts(games);
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

  // Filter products when search query changes
  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery && products.length > 0) {
      const query = searchQuery.toLowerCase();
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.platform.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchParams, products]);

  if (loading) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <div className="loading-spinner"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </>
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
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px 40px 20px",
        }}
      >
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
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'Our Collection'}
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p>No products found matching your search criteria.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            {filteredProducts.map((product) => (
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
        )}
      </div>
    </div>
  );
};

export default ProductsPage;