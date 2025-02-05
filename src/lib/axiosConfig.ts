import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor to add the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    // Skip adding the Bearer token for login or logout routes
    const isLoginOrLogout = config.url?.includes('/auth/login') || config.url?.includes('/auth/logout');

    if (!isLoginOrLogout) {
      const authData = Cookies.get('authData');
      if (authData) {
        const { access_token } = JSON.parse(authData);
        if (access_token) {
          config.headers['Authorization'] = `Bearer ${access_token}`;
        }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log('Unauthorized, please login again');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { AxiosError };
