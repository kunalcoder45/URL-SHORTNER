import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

console.log('Using API URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiError = (error) => {
  let errorMessage = 'An unexpected error occurred';

  if (error.response) {
    errorMessage = error.response.data || `Error: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'No response from server. Please check your connection.';
  } else {
    errorMessage = error.message;
  }

  return Promise.reject(errorMessage);
};

export const shortenUrl = async (url) => {
  try {
    const response = await api.post('/create', { url });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export default api;
