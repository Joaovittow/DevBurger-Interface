import PropTypes from 'prop-types';
import { useCart } from '../../hooks/CartContext';
import { CartButton } from '../CartButton';
import { CardImage, Container } from './styles';
export function CardProduct({ product }) {
  const { putProductInCart } = useCart();

  return (
    <Container>
      <CardImage src={product.url} alt={product.name} />
      <div>
        <p>{product.name}</p>
        <strong>{product.currencyValue}</strong>
      </div>
      <CartButton onClick={() => putProductInCart(product)} />
    </Container>
  );
}

CardProduct.propTypes = {
  product: PropTypes.shape({
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
