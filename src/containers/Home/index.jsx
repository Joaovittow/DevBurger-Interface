import { CategoriesCarousel, OffersCarousel } from '../../components/';
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
