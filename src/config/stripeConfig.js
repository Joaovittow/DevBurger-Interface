import { loadStripe } from '@stripe/stripe-js';

const stripePromisse = loadStripe(
  'pk_test_51QOrdhRviuW6UQUqMYuUXDDjyMOlCxmLFdWlZsBRKiuDpRGw0rG7cW43omtNb9P4yxMy0zm5ZA6YDQCEvRKxIkAE00K4a0qaYK',
);

export default stripePromisse;
