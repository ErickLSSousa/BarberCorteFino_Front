import axios from 'axios';

const api = axios.create({

  baseURL: "http://localhost:3001/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token (se necessário)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 👇 AQUI ESTÁ A CORREÇÃO: Exportações nomeadas corretas
export const servicesAPI = {
  getAll: () => api.get('/services'),
};

export const barbersAPI = {
  getAll: () => api.get('/barbers'),
  getAvailableTimes: (barberId, date) => 
    api.get(`/barbers/${barberId}/times?date=${date}`),
};

export const appointmentsAPI = {
  create: (data) => api.post('/appointments', data),
  getMy: () => api.get('/appointments/me'),
};

export default api;