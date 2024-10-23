import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_TEST_MODE_SECRET_KEY!;

const stripe = new Stripe(stripeSecretKey, {
	apiVersion: '2024-06-20', // Use the latest API version
});

export default stripe;
