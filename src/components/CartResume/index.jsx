import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/CartContext';
import { api } from '../../services/api';

import { formatPrice } from '../../utils/formatPrice';

import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { Container } from './styles';

export function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [deliveryTax] = useState(500);

  const navigate = useNavigate();

  const { cartProducts, clearCart } = useCart();

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);

    setFinalPrice(sumAllItems);
  }, [cartProducts]);

  const submitOrder = async () => {
    const products = cartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity };
    });

    try {
      const { status } = await api.post(
        '/orders', { products }, {
        validateStatus: () => true,
      },
      );

      if (status === 200 || status === 201) {
        setTimeout(() => {
          navigate('/');
          clearCart();
        }, 2000);
        toast.success('Pedido realizado com sucesso!');
      } else if (status === 400) {
        toast.error('Falha ao realizar pedido!');
      } else {
        throw new Error();
      }
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente');
    }
  };

  return (
    <div>
      <Container>
        <div className="container-top">
          <h2 className="title">Resumo do Pedido</h2>
          <p className="items">Itens</p>
          <p className="items-price">{formatPrice(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatPrice(deliveryTax)}</p>
        </div>

        <div className="container-bottom">
          <p>Total</p>
          <p>{formatPrice(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
      <Button onClick={submitOrder}>Finalizar Pedido</Button>
    </div>
  );
}
