import api from '../config/api';

export const gamesService = {
  getAllGames: async (page = 1, limit = 10) => {
    const response = await api.get('/games', {
      params: { page, limit }
    });
    return response.data;
  },

  getGameById: async (id) => {
    const response = await api.get(`/games/${id}`);
    return response.data;
  },

  addToCart: async (gameId) => {
    const response = await api.post('/cart/add', { gameId });
    return response.data;
  },

  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  }
}; 