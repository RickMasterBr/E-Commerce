import Image from 'next/image'
import Button from '@/components/Button'

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/produtos', { cache: 'no-store' });
  if (!res.ok) throw new Error('Erro ao buscar produtos');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[--color-background] font-sans">
      <main className="px-4 lg:px-40 py-6">
        {/* Hero Section */}
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
  <Button variant="light" className="w-fit bg-[#e8b4b7] text-[#191011] font-bold rounded-full px-5 py-3 mt-2">
    Shop Now
  </Button>
</section>


        {/* Top Categories */}
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

        {/* Customer Favorites */}
        <section className="pt-10">
          <h2 className="text-[--color-text-dark] text-[22px] font-bold pb-3 px-4">Customer Favorites</h2>
          <div className="flex overflow-x-auto gap-4 px-4 pb-4">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="min-w-[200px] flex flex-col bg-white rounded-xl shadow p-4">
                <div
                  className="aspect-square bg-center bg-cover rounded-xl mb-2"
                  style={{ backgroundImage: `url(${product.imagem})` }}
                ></div>
                <p className="text-[--color-text-dark] font-medium">{product.nome}</p>
                <p className="text-[--color-text-accent] text-sm">{product.categoria}</p>
                <Button className="mt-2 bg-[--color-border-subtle] text-[--color-text-dark] rounded-full py-2 font-bold text-sm">
                  View Product
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
