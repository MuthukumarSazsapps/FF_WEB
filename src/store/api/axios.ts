import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/',
  baseURL: 'https://finance-full-stack-api-9xk.vercel.app/',
  // baseURL:  process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`, // Add the 'Bearer ' prefix for JWTJWT
        // 'Content-Type': 'application/json',
      };
    }
    return config;
  },
  error => {
    console.log('authonticate error', error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('error', error);
    if (error.response === undefined) {
      window.location.href = '/';
    }
    if (error.response.status == 403) {
      localStorage.removeItem('auth');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
