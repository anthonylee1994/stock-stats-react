import axios from 'axios';

axios.defaults.baseURL = API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axios.interceptors.response.use((config) => {
  if (config.headers && typeof config.headers.Authorization === 'string') {
    localStorage.setItem('token', config.headers.Authorization.split(' ')[1]);
  }

  return config;
});

export const apiClient = axios;
