import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://blogapp-7ooo.onrender.com',
  timeout: 15000, // Increased timeout for Render's cold start
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    
    // Add retry logic for Render cold starts
    config.metadata = { startTime: new Date() };
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken');
      // Don't redirect here - let components handle it
      console.warn('Authentication token expired or invalid');
    } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      // Handle timeout errors (common with Render cold starts)
      console.error('Request timeout - server may be starting up. Please try again.');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error - please try again later');
    }
    return Promise.reject(error);
  }
);

export default api;

