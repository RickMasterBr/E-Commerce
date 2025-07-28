import ProductList from '@/components/ProductList';
import Button from '@/components/Button';

// A mesma função que você usa na Home
async function getProducts() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/produtos`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Falha ao buscar os produtos');
    }
    return res.json();
}


export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerir Produtos</h1>
        <Button href="/admin/novo">
          Adicionar Novo Produto
        </Button>
      </div>
      
      {/* Reutilizamos o componente que você já tinha */}
      <ProductList products={products} />
    </div>
  );
}