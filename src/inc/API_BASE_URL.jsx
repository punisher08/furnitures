import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://ignacio-server.test/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;