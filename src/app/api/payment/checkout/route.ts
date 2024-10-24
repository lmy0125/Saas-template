import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const session = await auth();
	if (!session) {
		return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user?.email ?? undefined },
	});

	if (!user) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	}

	const { priceId } = await req.json();

	try {
		let stripeCustomerId = user.stripeCustomerId;

		if (!stripeCustomerId) {
			// Create a new Stripe customer if one doesn't exist
			const customer = await stripe.customers.create({
				email: user.email,
				name: user.name ?? undefined,
			});
			stripeCustomerId = customer.id;

			// Update the user in the database with the new Stripe customer ID
			await prisma.user.update({
				where: { id: user.id },
				data: { stripeCustomerId: customer.id },
			});
		}

		const stripeSession = await stripe.checkout.sessions.create({
			customer: stripeCustomerId,
			mode: 'subscription',
			payment_method_types: ['card'],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${process.env.NEXTAUTH_URL}/dashboard`,
			cancel_url: `${process.env.NEXTAUTH_URL}/dashboard`,
		});

		return NextResponse.json({ sessionId: stripeSession.id });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
	}
}
