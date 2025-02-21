import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors for error handling
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'Unknown error occurred';
    return Promise.reject(new Error(message));
  }
);