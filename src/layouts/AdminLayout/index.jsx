import { Outlet, Navigate } from 'react-router-dom';
import { SideNavAdmin } from '../../components/SideNavAdmin';
import { Container } from './styles';
import { Footer } from '../../components';
import { useAuth } from '../../hooks/useAuth';

export function AdminLayout() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return null; // Ou um componente de loading
  }

  // Verificar se usuário está autenticado e é admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <SideNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
      <Footer />
    </Container>
  );
}
