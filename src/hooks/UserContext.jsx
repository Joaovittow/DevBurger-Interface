import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import { isTokenValid } from '../utils/jwt';

const UserContext = createContext({});

// Action types
const USER_ACTIONS = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  CLEAR_INVALID_DATA: 'CLEAR_INVALID_DATA',
};

// Estado inicial
const initialState = {
  userInfo: null,
  isLoading: true,
};

// Reducer
const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        userInfo: null,
        isLoading: false,
      };
    case USER_ACTIONS.CLEAR_INVALID_DATA:
      return {
        ...state,
        userInfo: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Função para fazer logout e limpar dados
  const logout = useCallback(() => {
    localStorage.removeItem('devburger:userData');
    dispatch({ type: USER_ACTIONS.LOGOUT });
  }, []);

  // Função para salvar dados do usuário
  const putUserData = useCallback((userInfo) => {
    if (userInfo && userInfo.token) {
      localStorage.setItem('devburger:userData', JSON.stringify(userInfo));
      dispatch({ type: USER_ACTIONS.SET_USER, payload: userInfo });
    }
  }, []);

  // Função para limpar dados inválidos
  const clearInvalidData = useCallback(() => {
    localStorage.removeItem('devburger:userData');
    dispatch({ type: USER_ACTIONS.CLEAR_INVALID_DATA });
  }, []);

  // Carregar dados do usuário do localStorage na inicialização
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userInfoLocalStorage = localStorage.getItem('devburger:userData');

        if (!userInfoLocalStorage) {
          dispatch({ type: USER_ACTIONS.CLEAR_INVALID_DATA });
          return;
        }

        const parsedUserInfo = JSON.parse(userInfoLocalStorage);

        // Verificar se tem token e se é válido
        if (parsedUserInfo?.token && isTokenValid(parsedUserInfo.token)) {
          dispatch({ type: USER_ACTIONS.SET_USER, payload: parsedUserInfo });
        } else {
          // Token inválido ou expirado, limpar dados
          clearInvalidData();
        }
      } catch (error) {
        // Erro ao fazer parse, limpar dados corrompidos
        console.error('Erro ao carregar dados do usuário:', error);
        clearInvalidData();
      }
    };

    loadUserData();
  }, [clearInvalidData]);

  // Verificar expiração do token periodicamente (a cada 5 minutos)
  useEffect(() => {
    if (!state.userInfo?.token) {
      return;
    }

    const checkTokenExpiration = () => {
      if (!isTokenValid(state.userInfo.token)) {
        clearInvalidData();
      }
    };

    // Verificar imediatamente
    checkTokenExpiration();

    // Verificar a cada 5 minutos
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [state.userInfo, clearInvalidData]);

  // Expor função de logout para uso externo (ex: interceptor do axios)
  useEffect(() => {
    // Tornar a função de logout acessível globalmente para o interceptor
    window.userLogout = logout;
    return () => {
      delete window.userLogout;
    };
  }, [logout]);

  const value = {
    userInfo: state.userInfo,
    isLoading: state.isLoading,
    putUserData,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
