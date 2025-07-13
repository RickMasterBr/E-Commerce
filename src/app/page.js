import Link from 'next/link';
import ProductCard from '@/components/ProductCard'; // Importamos o nosso novo componente

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/produtos', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Falha ao buscar produtos da API');
  }
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Nosso Catálogo</h1>
        <Link href="/admin/novo" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
          + Adicionar Produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mapeamos e usamos o componente ProductCard para cada produto */}
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}