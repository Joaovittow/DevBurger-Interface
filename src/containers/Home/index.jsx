import { CategoriesCarousel } from '../../components/CategoriesCarousel/index.jsx';
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
          <div> Carrossel Produtos</div>
        </Content>
      </Container>
    </main>
  );
}
