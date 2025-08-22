import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles.css';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';

export function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const {
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    state: { dpmCheckerLink },
  } = useLocation();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe ou Elements com falha, tente novamente');
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      const products = cartProducts.map((product) => {
        return {
          id: product.id,
          quantity: product.quantity,
          price: product.price,
        };
      });
      try {
        const { status } = await api.post(
          '/orders',
          { products },
          {
            validateStatus: () => true,
          },
        );

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(
              `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
            );
            clearCart();
          }, 2500);
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
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar Agora'
            )}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
