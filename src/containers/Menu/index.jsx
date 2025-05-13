import {
  Banner,
  CategoryMenu,
  Container,
  ProductsContainer,
} from './styles.js';
export function Menu() {
  return (
    <Container>
      <Banner>
        <h1>
          O MELHOR
          <br />
          HAMBURGUER
          <br />
          ESTÁ AQUI!
          <span>Esse cardápio está irresistivel</span>
        </h1>
      </Banner>
      <CategoryMenu></CategoryMenu>

      <ProductsContainer></ProductsContainer>
    </Container>
  );
}
