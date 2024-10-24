'use client';

import React from 'react';
import { Sparkles, Bot, Zap } from 'lucide-react';
import PriceCard from '@/components/PriceCard';

export default function Prices() {
	const plans = [
		{
			title: 'Plus',
			price: '$29',
			description: 'Perfect for small businesses and startups',
			features: ['100 AI queries/month', 'Basic analytics', 'Email support'],
			icon: <Bot className="h-6 w-6" />,
			priceId: process.env.NEXT_PUBLIC_SubScription_Plus!,
		},
		{
			title: 'Pro',
			price: '$99',
			description: 'Ideal for growing businesses',
			features: ['1000 AI queries/month', 'Advanced analytics', 'Priority support', 'Custom integrations'],
			icon: <Zap className="h-6 w-6" />,
			priceId: process.env.NEXT_PUBLIC_SubScription_Pro!,
		},
		{
			title: 'Ultimate',
			price: 'Custom',
			description: 'For large-scale operations',
			features: ['Unlimited AI queries', 'Real-time analytics', '24/7 premium support', 'Dedicated account manager'],
			icon: <Sparkles className="h-6 w-6" />,
			priceId: process.env.NEXT_PUBLIC_SubScription_Ultimate!,
		},
	];

	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 md:px-6 lg:px-8">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Pricing Plans</h2>
				<p className="text-gray-500 dark:text-gray-400 text-center mb-8 md:text-xl">
					Choose the perfect plan for your business needs
				</p>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
					{plans.map((plan) => (
						<PriceCard key={plan.title} {...plan} />
					))}
				</div>
			</div>
		</section>
	);
}
