import { ReactNode } from 'react';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Bell, CircleUser, Menu, Package2 } from 'lucide-react';
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
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import NavItems from '@/components/NavItems';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Sidebar from '@/components/Sidebar';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
	const session = await auth();
	if (!session) {
		redirect('/');
	}

	return (
		// <SidebarProvider>
		// 	<Sidebar />
		// 	<main>
		// 		<SidebarTrigger />
		// 		{children}
		// 	</main>
		// </SidebarProvider>

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
						<NavItems />
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
							<NavItems mobile />
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
								{/* <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem> */}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
			</div>
		</div>
	);
}
