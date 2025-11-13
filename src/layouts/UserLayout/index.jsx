import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Footer, Header } from '../../components';
import { useAuth } from '../../hooks/useAuth';

export function UserLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return null; // Ou um componente de loading
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
