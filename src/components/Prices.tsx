import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Bot, Zap } from 'lucide-react';

export default function Prices() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 px-4 md:px-6 lg:px-8">
			<div className="container mx-auto max-w-6xl">
				<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-4">Pricing Plans</h2>
				<p className="text-gray-500 dark:text-gray-400 text-center mb-8 md:text-xl">
					Choose the perfect plan for your business needs
				</p>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
					{[
						{
							title: 'Starter',
							price: '$29',
							description: 'Perfect for small businesses and startups',
							features: ['100 AI queries/month', 'Basic analytics', 'Email support'],
							icon: <Bot className="h-6 w-6" />,
						},
						{
							title: 'Pro',
							price: '$99',
							description: 'Ideal for growing businesses',
							features: [
								'1000 AI queries/month',
								'Advanced analytics',
								'Priority support',
								'Custom integrations',
							],
							icon: <Zap className="h-6 w-6" />,
						},
						{
							title: 'Enterprise',
							price: 'Custom',
							description: 'For large-scale operations',
							features: [
								'Unlimited AI queries',
								'Real-time analytics',
								'24/7 premium support',
								'Dedicated account manager',
							],
							icon: <Sparkles className="h-6 w-6" />,
						},
					].map((plan) => (
						<Card key={plan.title} className="flex flex-col">
							<CardHeader>
								<div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
									{plan.icon}
								</div>
								<CardTitle className="text-xl">{plan.title}</CardTitle>
								<CardDescription>{plan.description}</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-4xl font-bold mb-2">{plan.price}</div>
								<p className="text-sm text-gray-500 dark:text-gray-400">per month</p>
								<ul className="mt-4 space-y-2">
									{plan.features.map((feature) => (
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
								<Button className="w-full">Choose Plan</Button>
							</CardFooter>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
