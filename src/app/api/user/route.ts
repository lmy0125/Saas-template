import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();
	if (!session) {
		return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
	}

	const user = await prisma.user.findUnique({
		where: { email: session.user?.email ?? undefined },
	});

	return NextResponse.json(user);
}
