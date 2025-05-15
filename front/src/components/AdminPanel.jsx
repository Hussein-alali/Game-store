import React, { useState, useEffect } from 'react';
import {
  Box, Button, Card, CardContent, CardMedia, Chip,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Grid, TextField, Typography,
  Snackbar, Alert, CircularProgress, MenuItem
} from '@mui/material';
import { Add, Delete, CloudUpload } from '@mui/icons-material';

const AdminPanel = () => {
  const [games, setGames] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newGame, setNewGame] = useState({
    name: '',
    category: '',
    quantity: '',
    image: null,
    preview: null
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const categories = ['Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Puzzle', 'Horror', 'Simulation'];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setGames([
        { id: 1, name: 'Epic Adventure', category: 'Adventure', quantity: 10, preview: '/game-placeholder.jpg' },
        { id: 2, name: 'Space Warriors', category: 'Action', quantity: 5, preview: '/game-placeholder.jpg' },
        { id: 3, name: 'Football Pro', category: 'Sports', quantity: 8, preview: '/game-placeholder.jpg' },
        { id: 4, name: 'Mystery Puzzle', category: 'Puzzle', quantity: 15, preview: '/game-placeholder.jpg' },
        { id: 5, name: 'Zombie Survival', category: 'Horror', quantity: 7, preview: '/game-placeholder.jpg' },
        { id: 6, name: 'City Builder', category: 'Simulation', quantity: 12, preview: '/game-placeholder.jpg' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewGame({ name: '', category: '', quantity: '', image: null, preview: null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewGame({
        ...newGame,
        image: file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleAddGame = () => {
    const { name, category, quantity, image, preview } = newGame;
    if (!name || !category || !quantity || !image) {
      setSnackbar({ open: true, message: 'Please fill all fields and add an image', severity: 'error' });
      return;
    }
    const newId = games.length > 0 ? Math.max(...games.map(g => g.id)) + 1 : 1;
    setGames([...games, { id: newId, name, category, quantity, preview }]);
    setSnackbar({ open: true, message: 'Game added successfully', severity: 'success' });
    handleDialogClose();
  };

  const handleDelete = (id) => {
    setGames(games.filter(game => game.id !== id));
    setSnackbar({ open: true, message: 'Game deleted successfully', severity: 'success' });
  };

  return (
    <Box sx={{ 
      margin: 0,
      fontFamily: '"Roboto", sans-serif',
      backgroundColor: '#f7f9fc',
      minHeight: '100vh'
    }}>
      {/* Main Content */}
      <Box sx={{ 
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: '1500px',
        margin: '0 auto'
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="h4" fontWeight="bold" sx={{ 
            color: '#EE626B',
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}>
            Products - Admin view
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleDialogOpen}
            sx={{
              backgroundColor: '#EE626B',
              color: 'white',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '15px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f2858c'
              },
              whiteSpace: 'nowrap'
            }}
          >
            Add Product
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {games.map((game) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={game.id} sx={{
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Card sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#eeeeee',
                  borderRadius: '20px',
                  boxShadow: 'none',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                      borderRadius: '20px 20px 0 0'
                    }}
                    image={game.preview || '/game-placeholder.jpg'}
                    alt={game.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" fontWeight="bold" sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {game.name}
                    </Typography>
                    <Chip 
                      label={game.category} 
                      sx={{ 
                        mr: 1,
                        backgroundColor: '#0171f9',
                        color: 'white'
                      }} 
                    />
                    <Typography variant="body2" sx={{ color: '#555', mt: 1 }}>
                      Stock: {game.quantity}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(game.id)}
                      sx={{
                        backgroundColor: '#EE626B',
                        color: 'white',
                        borderRadius: '15px',
                        '&:hover': {
                          backgroundColor: '#f2858c'
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Add Product Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleDialogClose} 
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: '8px',
            border: '2px solid #0171f9',
            boxShadow: '0 0 10px rgba(1, 113, 249, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: '#0171f9', 
          textAlign: 'center',
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}>
          Add New Product
        </DialogTitle>
        <DialogContent sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2, 
          padding: '20px',
          '& .MuiTextField-root': {
            my: 1
          }
        }}>
          <TextField
            label="Product Name"
            value={newGame.name}
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Category"
            value={newGame.category}
            onChange={(e) => setNewGame({ ...newGame, category: e.target.value })}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Quantity"
            type="number"
            value={newGame.quantity}
            onChange={(e) => setNewGame({ ...newGame, quantity: e.target.value })}
            fullWidth
          />
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUpload />}
            sx={{
              borderColor: '#0171f9',
              color: '#0171f9',
              '&:hover': {
                borderColor: '#2386fe',
                backgroundColor: 'rgba(1, 113, 249, 0.1)'
              },
              mt: 1
            }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {newGame.preview && (
            <Box sx={{ 
              mt: 2, 
              textAlign: 'center',
              maxHeight: '200px',
              overflow: 'hidden'
            }}>
              <img 
                src={newGame.preview} 
                alt="Preview" 
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '10px'
                }} 
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ 
          padding: '0 20px 20px',
          flexWrap: 'wrap'
        }}>
          <Button 
            onClick={handleDialogClose}
            sx={{
              color: '#555',
              '&:hover': {
                color: '#0171f9'
              },
              order: { xs: 2, sm: 1 }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleAddGame}
            sx={{
              backgroundColor: '#0171f9',
              color: 'white',
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: '#2386fe'
              },
              order: { xs: 1, sm: 2 },
              mb: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            borderRadius: '15px',
            alignItems: 'center'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;