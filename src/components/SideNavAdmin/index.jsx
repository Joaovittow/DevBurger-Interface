import { navLinks } from './navLinks';
import Logo from '../../assets/logo.svg';
import { SignOutIcon } from '@phosphor-icons/react';
import { Container, Footer, NavLink, NavLinkContainer } from './styles';
import { useUser } from '../../hooks/UserContext';

export function SideNavAdmin() {
  const { logout } = useUser();
  return (
    <Container>
      <img src={Logo} alt="Logo DevBuger" />
      <NavLinkContainer>
        {navLinks.map((link) => (
          <NavLink key={link.id} to={link.path}>
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </NavLinkContainer>
      <Footer>
        <NavLink to="/login" onClick={logout}>
          <SignOutIcon />
          <span>Sair</span>
        </NavLink>
      </Footer>
    </Container>
  );
}
