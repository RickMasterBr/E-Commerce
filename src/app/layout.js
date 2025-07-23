import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext'; // 1. Importe o Provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Catálogo de E-commerce',
  description: 'Um projeto full-stack com Next.js e MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50`}>
        <CartProvider> {/* 2. Adicione o Provider a envolver a aplicação */}
          <Toaster position="top-center" />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}