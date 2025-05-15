import { useState, useEffect } from 'react';
import { Container, Grid, Typography, Pagination, Box } from '@mui/material';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const productsPerPage = 6;

  // Mock API call - replace with real fetch()
  useEffect(() => {
    const fetchProducts = async () => {
      // Sample data structure
      const mockProducts = [
        {
          id: 1,
          name: "Red Dead Redemption",
          category: "storytelling",
          price: 199.99,
          image: "",
          description: "The most famous storytelling game of all time",
          rating: 4.8,
          stock: 15
        },
        // Add 5+ more products...
      ];
      setProducts(mockProducts);
    };
    fetchProducts();
  }, []);

  // Pagination logic
  const paginatedProducts = products.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        fontWeight: 700,
        mb: 4,
        textAlign: 'center'
      }}>
        Our Collection
      </Typography>

      {/* Optional: Add ProductFilter component here */}

      <Grid container spacing={4}>
        {paginatedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination
          count={Math.ceil(products.length / productsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ProductsPage;