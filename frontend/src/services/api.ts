import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const authAPI = {
  register: (username: string, password: string, email: string, role: string = 'therapist') =>
    apiClient.post('/auth/register', { username, password, email, role }),

  login: (username: string, password: string) =>
    apiClient.post('/auth/login', { username, password }),

  logout: () => apiClient.post('/auth/logout'),

  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const roomsAPI = {
  listRooms: () => apiClient.get('/rooms'),

  getRoom: (roomId: number) => apiClient.get(`/rooms/${roomId}`),

  createRoom: (roomName: string, location: string = '') =>
    apiClient.post('/rooms', { room_name: roomName, location }),
};

export const sessionsAPI = {
  listSessions: () => apiClient.get('/sessions'),

  createSession: (roomId: number, notes: string = '', isRecording: boolean = false) =>
    apiClient.post('/sessions', { room_id: roomId, notes, is_recording: isRecording }),

  updateSession: (sessionId: number, data: any) =>
    apiClient.put(`/sessions/${sessionId}`, data),
};

export const healthAPI = {
  checkHealth: () => apiClient.get('/health'),
};

export default apiClient;
