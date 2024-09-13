'use client';

import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const { data: session } = useSession();

	const handleEmailSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		await signIn('email', { email, callbackUrl: '/' });
	};

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};

	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<Button onClick={() => signOut()}>Sign out</Button>
			</>
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
