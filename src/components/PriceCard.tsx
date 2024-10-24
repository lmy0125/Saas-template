'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
export default function PriceCard({
	title,
	price,
	description,
	features,
	icon,
	priceId,
}: {
	title: string;
	price: string;
	description: string;
	features: string[];
	icon: React.ReactNode;
	priceId: string;
}) {
	const { data: session } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleSubscribe = async () => {
		// Handle choose plan
		if (!session) {
			// Redirect to login page
			router.push('/signin');
		} else {
			const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string);
			if (!stripe) {
				return;
			}
			// Handle choose plan
			setLoading(true);
			try {
				const res = await axios.post('/api/payment/checkout', { priceId });
				const { subscription, sessionId } = res.data;
				console.log('Subscription created:', subscription);
				// Redirect to Stripe checkout or show confirmation to the user
				await stripe.redirectToCheckout({
					sessionId: sessionId,
				});
			} catch (error: any) {
				console.error('Error creating subscription:', error.message);
			} finally {
				setLoading(false);
			}
		}
	};
	return (
		<Card className="flex flex-col">
			<CardHeader>
				<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">{icon}</div>
				<CardTitle className="text-xl">{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="text-4xl font-bold mb-2">{price}</div>
				<p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
				<ul className="mt-4 space-y-2">
					{features.map((feature) => (
						<li key={feature} className="flex items-center">
							<svg
								className=" h-5 w-5 text-green-500"
								fill="none"
								height="24"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								width="24"
								xmlns="http://www.w3.org/2000/svg">
								<polyline points="20 6 9 17 4 12" />
							</svg>
							<span className="ml-2 text-sm">{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter className="mt-auto">
				<Button className="w-full" disabled={loading} onClick={handleSubscribe}>
					{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
					Choose Plan
				</Button>
			</CardFooter>
		</Card>
	);
}
