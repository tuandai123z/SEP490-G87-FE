import axios from 'axios';
import { getToken } from './constants';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const defaultBaseUrl = 'http://localhost:8080/';
