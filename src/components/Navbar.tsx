'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
	return (
		<header className="lg:container lg:mx-auto lg:px-6 px-4 h-14 flex items-center">
			<Link className="flex items-center justify-center" href="#">
				<Sparkles className="h-6 w-6" />
				<span className="sr-only">AI SaaS Company</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					Features
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					Pricing
				</Link>
				<Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
					Contact
				</Link>
			</nav>
			<Button className="ml-4" size="sm">
				<Link href="/signin">Sign In</Link>
			</Button>
		</header>
	);
}
