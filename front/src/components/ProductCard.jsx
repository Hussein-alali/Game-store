import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Chip, 
  Stack, 
  IconButton, 
  Button,
  CircularProgress 
} from '@mui/material';
import { ShoppingCart, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (product.stock <= 0) return;
    
    setIsAdding(true);
    try {
      await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1
        })
      });
    } catch (error) {
      console.error('Add to cart failed:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleGoToCart = () => {
    navigate('/cart');
  };

  return (
    <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#eeeeee',
      borderRadius: '20px',
      boxShadow: 'none',
      transition: 'transform 0.3s',
      position: 'relative',
      '&:hover': {
        transform: 'scale(1.03)',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }
    }}>
      {/* Cart Icon */}
      <IconButton
        aria-label="go to cart"
        onClick={handleGoToCart}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 2,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
      >
        <ShoppingCart sx={{ color: '#0171f9' }} />
      </IconButton>

      <CardMedia
        component="img"
        sx={{ 
          width: '100%',
          height: 200,
          objectFit: 'contain',
          p: 2,
          backgroundColor: 'white',
          borderRadius: '20px 20px 0 0'
        }}
        image={product.image}
        alt={product.name}
      />
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" mb={1} alignItems="center">
          <Chip 
            label={product.category} 
            size="small" 
            sx={{ 
              backgroundColor: '#0171f9',
              color: 'white',
              fontSize: '0.7rem'
            }} 
          />
          <Typography variant="body2" sx={{ 
            color: product.stock > 0 ? '#4CAF50' : '#EE626B',
            fontWeight: 'bold'
          }}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Typography>
        </Stack>

        <Typography gutterBottom variant="h6" component="div" sx={{
          fontWeight: 'bold',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.name}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph sx={{
          fontSize: '0.875rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} mb={2}>
          <Star color="warning" fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: '500' }}>
            {product.rating}
          </Typography>
        </Stack>
      </CardContent>

      <CardContent sx={{ pt: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ 
            color: '#EE626B',
            fontWeight: 'bold'
          }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            startIcon={isAdding ? <CircularProgress size={16} /> : null}
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAdding}
            sx={{
              backgroundColor: '#0171f9',
              color: 'white',
              borderRadius: '15px',
              padding: '6px 16px',
              '&:hover': {
                backgroundColor: '#2386fe'
              },
              '&:disabled': {
                backgroundColor: '#cccccc'
              }
            }}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
export default ProductCard;