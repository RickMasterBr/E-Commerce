import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import AuthProvider from './AuthProvider';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'E-Commerce - Premium Supplements',
    template: '%s | E-Commerce'
  },
  description: 'Premium supplements crafted for peak performance and fitness excellence. Discover our collection of high-quality products.',
  keywords: ['supplements', 'fitness', 'health', 'creatine', 'pre-workout', 'vitamins'],
  authors: [{ name: 'E-Commerce Team' }],
  creator: 'E-Commerce',
  publisher: 'E-Commerce',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    title: 'E-Commerce - Premium Supplements',
    description: 'Premium supplements crafted for peak performance and fitness excellence.',
    siteName: 'E-Commerce',
    images: [
      {
        url: '/Capa-Home.jpg',
        width: 1200,
        height: 630,
        alt: 'E-Commerce Hero Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'E-Commerce - Premium Supplements',
    description: 'Premium supplements crafted for peak performance and fitness excellence.',
    images: ['/Capa-Home.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#191011" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} bg-gray-50 antialiased`}>
        <AuthProvider>
          <CartProvider>
            <Toaster 
              position="top-center" 
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
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