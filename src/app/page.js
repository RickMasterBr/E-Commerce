import Image from 'next/image';
import Button from '@/components/Button';
import ProductCarousel from '@/components/ProductCarousel'; // Importar o novo componente

async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${apiUrl}/api/produtos`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  const favoriteProducts = products.slice(0, 5); // Pega os 5 primeiros como favoritos

  return (
    <div className="min-h-screen bg-[--color-background] font-sans">
      <main className="px-4 lg:px-40 py-6">
        {/* Hero Section (sem alterações) */}
        <section
          className="relative rounded-xl bg-cover bg-center text-white min-h-[480px] flex flex-col justify-end p-6 md:p-10 gap-4"
          style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("/Capa-Home.jpg")' }}
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Unleash Your Inner Champion
            </h1>
            <p className="text-sm md:text-base font-normal">
              Premium supplements crafted for peak performance and fitness excellence.
            </p>
          </div>
          <Button href="/shop" variant="light" className="w-fit bg-[#e8b4b7] text-[#191011] font-bold rounded-full px-5 py-3 mt-2">
            Shop Now
          </Button>
        </section>


        {/* Top Categories (sem alterações) */}
        <section className="pt-10">
          <h2 className="text-[--color-text-dark] text-[22px] font-bold pb-3 px-4">Explore Our Top Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 px-4">
            {[
              { title: 'Creatine', image: '/Creatina.png' },
              { title: 'Pre-Workout Ignite', image: '/pre-treino2.png' },
              { title: 'Vital Vitamins', image: '/vitamina-2.png' },
            ].map((cat, idx) => (
              <div key={idx} className="flex flex-col gap-2">
                <div className="aspect-square bg-center bg-cover rounded-xl" style={{ backgroundImage: `url(${cat.image})` }}></div>
                <p className="text-[--color-text-dark] text-base font-medium">{cat.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SEÇÃO CUSTOMER FAVORITES ATUALIZADA --- */}
        <section className="pt-10">
          <h2 className="text-[--color-text-dark] text-center text-[22px] font-bold pb-3 px-4">Customer Favorites</h2>
          <ProductCarousel products={favoriteProducts} />
        </section>
      </main>
    </div>
  );
}