import axios from 'axios';
import NProgress from 'nprogress';
import qs from 'qs';

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`;
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.paramsSerializer = (params) => qs.stringify(params);

// Request interceptor to handle progress bar
axios.interceptors.request.use(
  (config) => {
    if (config.headers?.progress !== false) {
      NProgress.start();
    }
    console.log('Request URL:', config.url);
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

// Response interceptor to handle progress bar and response
axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default axios;
