import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from './AuthProvider'; // Importar o AuthProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Catálogo de E-commerce',
  description: 'Um projeto full-stack com Next.js e MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider> {/* Adicionar o AuthProvider */}
          <CartProvider>
            <Toaster position="top-center" />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}