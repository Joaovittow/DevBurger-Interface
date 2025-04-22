import { CategoriesCarousel } from '../../components/CategoriesCarousel/index.jsx';
import { OffersCarousel } from '../../components/OffersCarousel/index.jsx';
import { Banner, Container, Content } from './styles.js';

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-vindo(a)!</h1>
      </Banner>
      <Container>
        <Content>
          <CategoriesCarousel />
          <OffersCarousel />
        </Content>
      </Container>
    </main>
  );
}
