import { auth } from '@/auth';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface CustomNextRequest extends NextRequest {
	auth: any; // Replace 'any' with the actual type of 'auth'
}

export default auth((req: CustomNextRequest) => {
	if (!req.auth && req.nextUrl.pathname !== '/signin') {
		const newUrl = new URL('/signin', req.nextUrl.origin);
		return NextResponse.redirect(newUrl);
	}
});

export const config = {
	matcher: '/dashboard/:path*',
};
