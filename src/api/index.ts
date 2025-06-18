import type { ErrorResponse } from '@/types/api/error';
import axios, { type AxiosInstance, type AxiosError } from 'axios';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle API errors consistently
    if (error.response?.data) {
      const apiError = error.response.data as ErrorResponse;
      // You can add global error handling here
      console.error('API Error:', apiError);
      throw new Error(apiError.message);
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      throw new Error('請求超時，請稍後再試');
    }
    
    if (!error.response) {
      throw new Error('網路連接失敗，請檢查網路狀態');
    }
    
    throw error;
  }
);

export { api }; 