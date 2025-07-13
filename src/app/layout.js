import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header'; // 1. Importe o Header
import Footer from '@/components/Footer'; // 2. Importe o Footer

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Catálogo de E-commerce',
  description: 'Um projeto full-stack com Next.js e MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} bg-gray-50`}>
        <Toaster position="top-center" />
        
        {/* 3. Estruture a página com Header, main (conteúdo) e Footer */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}