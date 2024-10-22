import SignInForm from '@/components/SignInForm';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SignIn() {
	const session = await auth();
	if (session) {
		redirect('/dashboard');
	}

	return <SignInForm />;
}
