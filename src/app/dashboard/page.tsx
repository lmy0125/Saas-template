'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

export default function page() {
	const { data: session } = useSession();

	return (
		<div>
			<div>{session?.user?.name}</div>
			<div>{session?.user?.email}</div>
		</div>
	);
}
