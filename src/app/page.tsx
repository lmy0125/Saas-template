import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Prices from '@/components/Prices';
import Footer from '@/components/Footer';
export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<main className="flex-1">
				<Hero />
				<Prices />
			</main>

			<Footer />
		</div>
	);
}
