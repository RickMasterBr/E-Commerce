import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast'; // 1. Importe o Toaster

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Catálogo de E-commerce',
  description: 'Um projeto full-stack com Next.js e MongoDB',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Toaster position="top-center" /> {/* 2. Adicione o componente aqui */}
        {children}
      </body>
    </html>
  );
}