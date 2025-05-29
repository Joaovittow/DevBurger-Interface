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

import { ShoppingCartIcon, UserCircleIcon } from '@phosphor-icons/react';
export function Header() {
  return (
    <Container>
      <Content>
        <Navigation>
          <div>
            <HeaderLink>Home</HeaderLink>
            <HeaderLink>Cardárpio</HeaderLink>
          </div>
        </Navigation>
        <Options>
          <Profile>
            <UserCircleIcon color="#fff" size={24} />
            <div>
              <p>
                Olá, <span>João</span>
              </p>
              <Logout>Sair</Logout>
            </div>
          </Profile>
          <LinkContainer>
            <ShoppingCartIcon color="#fff" size={24} />
            <HeaderLink>Carrinho</HeaderLink>
          </LinkContainer>
        </Options>
      </Content>
    </Container>
  );
}
