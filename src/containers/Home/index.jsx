import { CategoriesCarousel } from '../../components/CategoriesCarousel/index.jsx';
import { OffersCarousel } from '../../components/OffersCarousel/index.jsx';
import { Banner, Container } from './styles.js';

export function Home() {
  return (
    <main>
      <Banner>
        <h1>Bem-vindo(a)!</h1>
      </Banner>
      <Container>
        <div>
          <CategoriesCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </main>
  );
}
