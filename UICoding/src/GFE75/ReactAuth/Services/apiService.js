import axios from "axios";
import { API_URL } from "./mockApi";
import authService from "./authService";

// axios interceptor

const apiService = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

//Request Interceptor to add auth Token
apiService.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token expiration
apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired/invalid
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiService;
