import Image from 'next/image';
import { Suspense } from 'react';
import Button from '@/components/Button';
import ProductCarousel from '@/components/ProductCarousel';

// Componente de loading para produtos
function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}

// Componente assíncrono para buscar produtos
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/produtos`, { 
    cache: 'no-store',
    next: { revalidate: 300 } // Revalida a cada 5 minutos
  });
  
  if (!res.ok) {
    console.error('Erro ao buscar produtos:', res.status);
    return { produtos: [] };
  }
  
  const data = await res.json();
  return data; // Retorna o objeto completo com produtos e pagination
}

// Componente para a seção de produtos favoritos
async function FavoriteProducts() {
  const data = await getProducts();
  const products = data.produtos || []; // Extrai o array de produtos
  const favoriteProducts = products.slice(0, 5);

  return <ProductCarousel products={favoriteProducts} />;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[--color-background] font-sans">
      <main className="px-4 lg:px-40 py-6">
        {/* Hero Section */}
        <section className="relative rounded-xl bg-cover bg-center text-white min-h-[480px] flex flex-col justify-end p-6 md:p-10 gap-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
          <Image
            src="/Capa-Home.jpg"
            alt="Premium Supplements Hero"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div className="relative z-20 space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Unleash Your Inner Champion
            </h1>
            <p className="text-sm md:text-base font-normal max-w-2xl">
              Premium supplements crafted for peak performance and fitness excellence.
            </p>
          </div>
          <div className="relative z-20">
            <Button 
              href="/shop" 
              variant="light" 
              className="w-fit bg-[#e8b4b7] text-[#191011] font-bold rounded-full px-5 py-3 mt-2 hover:bg-[#d4a0a3] transition-colors"
            >
              Shop Now
            </Button>
          </div>
        </section>

        {/* Top Categories */}
        <section className="pt-10">
          <h2 className="text-[--color-text-dark] text-[22px] font-bold pb-3 px-4">
            Explore Our Top Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
            {[
              { 
                title: 'Creatine', 
                image: '/Creatina.png',
                href: '/shop?category=creatine'
              },
              { 
                title: 'Pre-Workout Ignite', 
                image: '/pre-treino2.png',
                href: '/shop?category=pre-workout'
              },
              { 
                title: 'Vital Vitamins', 
                image: '/vitamina-2.png',
                href: '/shop?category=vitamins'
              },
            ].map((cat, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-square bg-center bg-cover rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                </div>
                <p className="text-[--color-text-dark] text-base font-medium mt-2 group-hover:text-[--color-text-accent] transition-colors">
                  {cat.title}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Favorites */}
        <section className="pt-10">
          <h2 className="text-[--color-text-dark] text-center text-[22px] font-bold pb-3 px-4">
            Customer Favorites
          </h2>
          <Suspense fallback={<ProductsLoading />}>
            <FavoriteProducts />
          </Suspense>
        </section>

        {/* Features Section */}
        <section className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[--color-text-dark] mb-2">
                Premium Quality
              </h3>
              <p className="text-[--color-text-accent] text-sm">
                All our supplements are made with the highest quality ingredients
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[--color-text-dark] mb-2">
                Fast Shipping
              </h3>
              <p className="text-[--color-text-accent] text-sm">
                Get your supplements delivered to your door in 2-3 business days
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e8b4b7] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[--color-text-dark] mb-2">
                Money Back Guarantee
              </h3>
              <p className="text-[--color-text-accent] text-sm">
                30-day money back guarantee on all our products
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}