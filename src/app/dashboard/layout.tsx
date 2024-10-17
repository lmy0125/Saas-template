'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bell, CircleUser, Home, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navigationItems = [
	{ href: '/dashboard', icon: Home, label: 'Dashboard' },
	{ href: '/dashboard/a', icon: ShoppingCart, label: 'Orders', badge: 6 },
	{ href: '/dashboard/b', icon: Package, label: 'Products' },
	{ href: '/dashboard/c', icon: Users, label: 'Customers' },
];

const handleLogout = () => {
	signOut({ callbackUrl: '/' });
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="h-6 w-6" />
							<span className="">Acme Inc</span>
						</Link>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<Bell className="h-4 w-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="flex-1">
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
						</nav>
					</div>
					<div className="mt-auto p-4">
						<Card x-chunk="dashboard-02-chunk-0">
							<CardHeader className="p-2 pt-0 md:p-4">
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support team.
								</CardDescription>
							</CardHeader>
							<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="shrink-0 md:hidden">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col bg-white">
							<nav className="grid gap-2 text-lg font-medium">
								<Link href="#" className="flex items-center gap-2 text-lg font-semibold">
									<Package2 className="h-6 w-6" />
									<span className="sr-only">Acme Inc</span>
								</Link>
								{navigationItems.map((item) => (
									<SheetClose asChild>
										<Link
											key={item.label}
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
							</nav>
							<div className="mt-auto">
								<Card>
									<CardHeader>
										<CardTitle>Upgrade to Pro</CardTitle>
										<CardDescription>
											Unlock all features and get unlimited access to our support team.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Button size="sm" className="w-full">
											Upgrade
										</Button>
									</CardContent>
								</Card>
							</div>
						</SheetContent>
					</Sheet>
					<div className="ml-auto">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" size="icon" className="rounded-full border-none">
									<CircleUser className="h-5 w-5" />
									<span className="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Settings</DropdownMenuItem>
								<DropdownMenuItem>Support</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
			</div>
		</div>
	);
}
