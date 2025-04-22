import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { api } from '../../services/api';

import 'react-multi-carousel/lib/styles.css';

import { Container, ContainerItems, Title } from './styles';

export function OffersCarousel() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      const onlyOffers = data.filter((product) => product.offer);

      setOffers(onlyOffers);
    }
    loadProducts();
  }, []);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1280, min: 690 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 690, min: 0 },
      items: 2,
    },
  };

  return (
    <Container>
      <Title>Ofertas do Dia</Title>

      <Carousel
        responsive={responsive}
        infinite={true}
        partialVisible={false}
        itemClass="carousel-item"
      >
        {offers.map((product) => (
          <ContainerItems key={product.id} imageUrl={product.url}>
            <p>{product.name}</p>
          </ContainerItems>
        ))}
      </Carousel>
    </Container>
  );
}
