import Link from 'next/link';
import ProductList from '@/components/ProductList'; // Importamos o nosso novo componente de lista

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
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">Nosso Catálogo</h1>
        <Link href="/admin/novo" className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
          + Adicionar Produto
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        // Usamos o nosso novo componente animado aqui
        <ProductList products={products} />
      )}
    </main>
  );
}