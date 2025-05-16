import api from '../config/api';

export const uploadService = {
  uploadGameImage: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/upload/game-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteGameImage: async (publicId) => {
    const response = await api.delete(`/upload/game-image/${publicId}`);
    return response.data;
  }
}; 