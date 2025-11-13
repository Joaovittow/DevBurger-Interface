import { useMemo } from 'react';
import { useUser } from './UserContext';
import { isTokenValid } from '../utils/jwt';

/**
 * Hook personalizado que encapsula lógica de autenticação
 * @returns {object} - Objeto com informações de autenticação
 */
export const useAuth = () => {
  const { userInfo, isLoading } = useUser();

  const isAuthenticated = useMemo(() => {
    return !!(userInfo && userInfo.token && isTokenValid(userInfo.token));
  }, [userInfo]);

  const isAdmin = useMemo(() => {
    return !!(isAuthenticated && userInfo?.admin);
  }, [isAuthenticated, userInfo]);

  const userId = useMemo(() => {
    return userInfo?.id || null;
  }, [userInfo]);

  const userName = useMemo(() => {
    return userInfo?.name || null;
  }, [userInfo]);

  const userEmail = useMemo(() => {
    return userInfo?.email || null;
  }, [userInfo]);

  return {
    isAuthenticated,
    isAdmin,
    userId,
    userName,
    userEmail,
    userInfo,
    isLoading,
  };
};

