/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import { loadStripe } from '@stripe/stripe-js';

export const bookTour = async (tourId) => {
  const stripe = await loadStripe(
    'pk_test_51NItFYFHjCQPZAwaxkOXfiSP0C3ZzcKjTwB5kwM7fwC2AMY5Hi93ul5q50h042qTnIENXSehggCAd2vUqNtwa8oK00lR7nTttY',
  );

  try {
    // 1) Get Checkout session
    const response = await axios.get(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    const session = response.data.session;

    // 2) Redirect to checkout form
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
