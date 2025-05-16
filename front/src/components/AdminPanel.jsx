import React, { useState, useEffect, useRef } from 'react';
import './AdminPanel.css';

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

  // Ref to store the timeout id for snackbar
  const snackbarTimeoutRef = useRef(null);

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

  // Effect to auto-close snackbar for "Game deleted successfully" after 4 seconds
  useEffect(() => {
    if (
      snackbar.open &&
      snackbar.message === 'Game deleted successfully'
    ) {
      // Clear any previous timeout
      if (snackbarTimeoutRef.current) {
        clearTimeout(snackbarTimeoutRef.current);
      }
      snackbarTimeoutRef.current = setTimeout(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, 4000);
      // Cleanup on unmount or snackbar change
      return () => {
        if (snackbarTimeoutRef.current) {
          clearTimeout(snackbarTimeoutRef.current);
        }
      };
    }
  }, [snackbar.open, snackbar.message]);

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

  // Custom SVG Icons
  const AddIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );

  const DeleteIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
    </svg>
  );

  const UploadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0171f9">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
    </svg>
  );

  return (
    <div className="admin-panel-container">
      {/* Main Content */}
      <div className="admin-main-content">
        <div className="admin-header-container">
          <h1 className="admin-title">
            Products - Admin view
          </h1>
          <button 
            className="admin-add-button"
            onClick={handleDialogOpen}
          >
            <AddIcon />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner" />
          </div>
        ) : (
          <div className="products-grid">
            {games.map((game) => (
              <div key={game.id} className="product-card-container">
                <div className="product-card">
                  <img
                    src={game.preview || '/game-placeholder.jpg'}
                    alt={game.name}
                    className="product-image"
                  />
                  <div className="product-content">
                    <h3 className="product-name">
                      {game.name}
                    </h3>
                    <span className="category-chip">
                      {game.category}
                    </span>
                    <p className="stock-text">
                      Stock: {game.quantity}
                    </p>
                  </div>
                  <div className="product-actions">
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(game.id)}
                    >
                      <DeleteIcon />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Dialog */}
      {openDialog && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <h2 className="dialog-title">
              Add New Product
            </h2>
            <div className="dialog-content">
              <div className="form-group">
                <label className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={newGame.name}
                  onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Category
                </label>
                <select
                  className="form-input"
                  value={newGame.category}
                  onChange={(e) => setNewGame({ ...newGame, category: e.target.value })}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-input"
                  value={newGame.quantity}
                  onChange={(e) => setNewGame({ ...newGame, quantity: e.target.value })}
                />
              </div>
              
              <label className="form-group">
                <div className="upload-button">
                  <UploadIcon />
                  Upload Image
                </div>
                <input
                  type="file"
                  className="file-input"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              
              {newGame.preview && (
                <div className="image-preview-container">
                  <img 
                    src={newGame.preview} 
                    alt="Preview" 
                    className="image-preview"
                  />
                </div>
              )}
            </div>
            <div className="dialog-actions">
              <button 
                className="cancel-button"
                onClick={handleDialogClose}
              >
                Cancel
              </button>
              <button 
                className="submit-button"
                onClick={handleAddGame}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbar.open && (
        <div className={`snackbar ${snackbar.severity === 'error' ? 'error' : ''}`}>
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;