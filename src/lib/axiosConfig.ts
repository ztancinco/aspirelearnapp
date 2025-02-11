import axios from 'axios';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Configure NProgress
NProgress.configure({ showSpinner: false });

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Request Interceptor to add the Bearer token and start NProgress
axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start(); // Start progress bar

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
  (error) => {
    NProgress.done(); // Stop progress bar on request error
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token expiration and forbidden errors
axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done(); // Stop progress bar on response success
    return response;
  },
  (error) => {
    NProgress.done(); // Stop progress bar on response error

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Remove authentication data from cookies
        Cookies.remove('authData');
        Cookies.remove('userData');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
export { AxiosError };
