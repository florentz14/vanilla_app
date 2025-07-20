import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Default to localhost if env var not set
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Handle specific HTTP status codes
    if (response) {
      switch (response.status) {
        case 401: // Unauthorized
          // Clear any existing auth data
          localStorage.removeItem('token');
          // Redirect to login or show unauthorized message
          if (window.location.pathname !== '/login') {
            window.location.href =
              '/login?redirect=' + encodeURIComponent(window.location.pathname);
          }
          break;

        case 403: // Forbidden
          console.error('Access forbidden: You do not have permission to access this resource');
          break;

        case 404: // Not Found
          console.error('The requested resource was not found');
          break;

        case 500: // Internal Server Error
          console.error('A server error occurred. Please try again later.');
          break;

        default:
          console.error(`An error occurred: ${response.status} - ${response.statusText}`);
      }

      // If we have a response with data, use that as the error message
      if (response.data) {
        error.message = response.data.message || response.data.error || response.statusText;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server. Please check your network connection.');
      error.message = 'Unable to connect to the server. Please check your internet connection.';
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }

    // You can add more sophisticated error handling here, like:
    // - Showing error toasts/messages to the user
    // - Logging errors to an error tracking service
    // - Implementing retry logic for certain types of errors

    return Promise.reject(error);
    if (error.response?.status === 401) {
      // Redirect to login or handle token refresh
      console.error('Unauthorized access - please log in');
      // You might want to redirect to login page here
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
