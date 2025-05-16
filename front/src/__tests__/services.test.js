import { authService } from '../services/auth.service';
import { gamesService } from '../services/games.service';
import api from '../config/api';

// Mock axios
jest.mock('../config/api');

describe('Auth Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('login should store token in localStorage', async () => {
    const mockToken = 'test-token';
    api.post.mockResolvedValueOnce({ data: { token: mockToken } });

    await authService.login({ email: 'test@test.com', password: 'password' });
    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  test('logout should remove token from localStorage', () => {
    localStorage.setItem('token', 'test-token');
    authService.logout();
    expect(localStorage.getItem('token')).toBeNull();
  });
});

describe('Games Service', () => {
  const mockGames = [
    { id: 1, name: 'Game 1' },
    { id: 2, name: 'Game 2' }
  ];

  test('getAllGames should return games data', async () => {
    api.get.mockResolvedValueOnce({ data: mockGames });
    
    const result = await gamesService.getAllGames();
    expect(result).toEqual(mockGames);
    expect(api.get).toHaveBeenCalledWith('/games');
  });

  test('getGameById should return specific game', async () => {
    const mockGame = mockGames[0];
    api.get.mockResolvedValueOnce({ data: mockGame });
    
    const result = await gamesService.getGameById(1);
    expect(result).toEqual(mockGame);
    expect(api.get).toHaveBeenCalledWith('/games/1');
  });

  test('addToCart should send correct data', async () => {
    const mockCartResponse = { success: true };
    api.post.mockResolvedValueOnce({ data: mockCartResponse });
    
    const result = await gamesService.addToCart(1);
    expect(result).toEqual(mockCartResponse);
    expect(api.post).toHaveBeenCalledWith('/cart', { gameId: 1 });
  });
}); 