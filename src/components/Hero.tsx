import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Hero() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6 lg:px-8">
			<div className="container mx-auto max-w-5xl">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
							AI-Powered Solutions for Your Business
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
							Harness the power of artificial intelligence to streamline your workflows, boost productivity, and
							gain valuable insights.
						</p>
					</div>
					<div className="w-full max-w-sm space-y-2">
						<form className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
							<Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
							<Button type="submit">Get Started</Button>
						</form>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							Start your free trial. No credit card required.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
