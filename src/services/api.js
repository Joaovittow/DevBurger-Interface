import Axios from 'axios';

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('devburger:userData');

  const token = userData && JSON.parse(userData).token;

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
