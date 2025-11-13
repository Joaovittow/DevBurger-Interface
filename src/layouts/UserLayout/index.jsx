import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { useAuth } from '../../hooks/useAuth';

// Rotas que precisam de autenticação
const protectedRoutes = ['/checkout', '/complete'];

export function UserLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const isProtectedRoute = protectedRoutes.includes(location.pathname);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return null; // Ou um componente de loading
  }

  // Se a rota precisa de autenticação e o usuário não está logado, redirecionar
  if (isProtectedRoute && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
