'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { loadStripe } from '@stripe/stripe-js';
import { type User } from '@prisma/client';

const stripePublicKey =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!
		: process.env.NEXT_PUBLIC_STRIPE_TEST_MODE_PUBLIC_KEY!;

const stripePromise = loadStripe(stripePublicKey);

export default function SignIn() {
	const [email, setEmail] = useState('');
	const { data: session } = useSession();
	const [userData, setUserData] = useState<User | null>(null);

	useEffect(() => {
		if (session) {
			fetch('/api/user')
				.then((res) => res.json())
				.then((data) => setUserData(data));
		}
	}, [session]);
	console.log('userData', session, userData);

	const handleEmailSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		await signIn('email', { email, callbackUrl: '/' });
	};

	const handleGoogleSignIn = async () => {
		await signIn('google', { callbackUrl: '/dashboard' });
	};

	const handleSignOut = async () => {
		await signOut();
	};

	const handleSubscribe = async (priceId: string) => {
		const stripe = await stripePromise;
		const response = await fetch('/api/stripe/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ priceId }),
		});
		const { sessionId } = await response.json();
		const result = await stripe?.redirectToCheckout({ sessionId });
		if (result?.error) {
			console.error(result.error);
		}
	};

	if (session) {
		return (
			<div className="flex flex-col space-y-2 p-10">
				Signed in as {session.user?.email} <br />
				{userData && (
					<>
						<p>User ID: {userData.id}</p>
						<p>Subscription Status: {userData.subscriptionStatus || 'No active subscription'}</p>
					</>
				)}
				{(!userData?.subscriptionStatus || userData.subscriptionStatus === 'canceled') && (
					<div>
						<Button onClick={() => handleSubscribe('price_1Pz1lN03uGFAC1Mkg0uUwbTh')}>Subscribe</Button>
					</div>
				)}
				<div>
					<Button onClick={handleSignOut}>Sign out</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-[350px]">
				<CardHeader>
					<CardTitle>Sign In</CardTitle>
					<CardDescription>Choose your preferred sign-in method</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleEmailSignIn} className="space-y-4">
						<div className="space-y-2">
							<Input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full">
							Sign in with Magic Link
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
						Sign in with Google
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
