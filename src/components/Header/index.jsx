import {
  Container,
  Content,
  HeaderLink,
  LinkContainer,
  Logout,
  Navigation,
  Options,
  Profile,
} from './styles';

import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useUser } from '../../hooks/UserContext';
import { useAuth } from '../../hooks/useAuth';

import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
export function Header() {
  const navigate = useNavigate();

  const { logout } = useUser();
  const { isAuthenticated, userName } = useAuth();

  const { pathname } = useResolvedPath();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink to={'/'} $isActive={pathname === '/'}>
              Home
            </HeaderLink>
            <hr />
            <HeaderLink to={'/cardapio'} $isActive={pathname === '/cardapio'}>
              Cardárpio
            </HeaderLink>
          </div>
        </Navigation>
        <Options>
          {isAuthenticated ? (
            <>
              <Profile>
                <UserCircleIcon color="#fff" size={24} />
                <div>
                  <p>
                    Olá, <span>{userName}</span>
                  </p>
                  <Logout onClick={handleLogout}>Sair</Logout>
                </div>
              </Profile>
              <LinkContainer>
                <ShoppingCartIcon color="#fff" size={24} />
                <HeaderLink to={'/carrinho'} $isActive={pathname === '/carrinho'}>
                  Carrinho
                </HeaderLink>
              </LinkContainer>
            </>
          ) : (
            <LinkContainer>
              <HeaderLink to={'/login'}>Entrar</HeaderLink>
            </LinkContainer>
          )}
        </Options>
      </Content>
    </Container>
  );
}
