'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { SheetClose } from '@/components/ui/sheet';

const navigationItems = [
	{ href: '/dashboard', icon: Home, label: 'Dashboard' },
	{ href: '/dashboard/a', icon: ShoppingCart, label: 'Orders', badge: 6 },
	{ href: '/dashboard/b', icon: Package, label: 'Products' },
	{ href: '/dashboard/c', icon: Users, label: 'Customers' },
];

export default function NavItems({ mobile = false }: { mobile?: boolean }) {
	const pathname = usePathname();
	if (mobile) {
		return (
			<nav className="grid gap-2 text-lg font-medium">
				<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
					<Package2 className="h-6 w-6" />
					<span className="sr-only">Acme Inc</span>
				</Link>
				{navigationItems.map((item) => (
					<SheetClose asChild key={item.label}>
						<Link
							href={item.href}
							className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
								pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
							}`}>
							<item.icon className="h-5 w-5" />
							{item.label}
							{item.badge && (
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									{item.badge}
								</Badge>
							)}
						</Link>
					</SheetClose>
				))}
				<Button
					className={'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'}
					onClick={() => signOut({ callbackUrl: '/' })}>
					Sign out
				</Button>
			</nav>
		);
	}

	return (
		<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
			{navigationItems.map((item) => (
				<Link
					key={item.label}
					href={item.href}
					className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
						pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground'
					}`}>
					<item.icon className="h-4 w-4" />
					{item.label}
					{item.badge && (
						<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
							{item.badge}
						</Badge>
					)}
				</Link>
			))}
			<Button
				className={'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary'}
				onClick={() => signOut({ callbackUrl: '/' })}>
				Sign out
			</Button>
		</nav>
	);
}
