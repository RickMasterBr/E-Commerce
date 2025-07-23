import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-6 py-10 text-center">
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
                <Link href="/about" className="text-gray-300 hover:text-white text-base font-normal leading-normal min-w-40">About</Link>
                {/* AQUI A MUDANÇA */}
                <Link href="/contact" className="text-gray-300 hover:text-white text-base font-normal leading-normal min-w-40">Contact</Link>
                <Link href="#" className="text-gray-300 hover:text-white text-base font-normal leading-normal min-w-40">Privacy Policy</Link>
                <Link href="#" className="text-gray-300 hover:text-white text-base font-normal leading-normal min-w-40">Terms of Service</Link>
            </div>
            <p>&copy; {currentYear} E-Commerce Moderno. Todos os direitos reservados.</p>
            <p className="text-sm text-gray-400 mt-1">
                Um projeto construído com Next.js, Tailwind CSS e MongoDB.
            </p>
        </div>
      </footer>
    );
}