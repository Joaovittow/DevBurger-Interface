import Axios from 'axios';
import { isTokenValid } from '../utils/jwt';

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor de requisição - adiciona token às requisições
api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem('devburger:userData');

    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        const token = parsedUserData?.token;

        // Verificar se o token existe e é válido antes de adicionar
        if (token && isTokenValid(token)) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // Token inválido ou expirado, limpar dados
          localStorage.removeItem('devburger:userData');
          // Chamar logout se estiver disponível
          if (window.userLogout) {
            window.userLogout();
          }
        }
      } catch (error) {
        // Se houver erro ao fazer parse, não adiciona o token
        console.error('Erro ao fazer parse dos dados do usuário:', error);
        localStorage.removeItem('devburger:userData');
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor de resposta - trata erros de autenticação
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber 401 (Não autorizado), fazer logout
    if (error.response?.status === 401) {
      // Limpar dados do localStorage
      localStorage.removeItem('devburger:userData');

      // Chamar função de logout se estiver disponível
      // Os componentes AdminLayout e UserLayout já fazem redirecionamento automaticamente
      if (window.userLogout) {
        window.userLogout();
      }
    }

    return Promise.reject(error);
  },
);
