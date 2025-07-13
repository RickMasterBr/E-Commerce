'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'; // Importe o toast
import Button from './Button';

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleDelete = async (productId) => {
    const confirmed = window.confirm('Tem a certeza que deseja apagar este produto?');

    if (confirmed) {
      const promise = fetch(`/api/produtos/${productId}`, {
        method: 'DELETE',
      });

      // Usando toast.promise para uma UX ainda melhor!
      toast.promise(
        promise,
        {
          loading: 'A apagar o produto...',
          success: (res) => {
            if (!res.ok) {
              throw new Error('Falha ao apagar.');
            }
            router.refresh();
            return 'Produto apagado com sucesso!';
          },
          error: 'Não foi possível apagar o produto.',
        }
      );
    }
  };
  
  return (
    <div className="border rounded-lg p-6 shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
      <div className="flex-grow">
        <h2 className="text-2xl font-semibold mb-2">{product.nome}</h2>
        <p className="text-gray-500 mb-4">{product.categoria}</p>
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <h3 className="font-bold mb-2 text-sm text-gray-600">Detalhes:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {Object.entries(product.detalhes).map(([key, value]) => (
              <li key={key}><span className="font-semibold capitalize">{key}:</span> {String(value)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t mt-auto pt-4 flex justify-between items-center">
        <div>
          <p className="text-3xl font-light">R$ {product.preco.toFixed(2)}</p>
          <p className="text-sm text-gray-400 mt-1">{product.stock} unidades</p>
        </div>
        <div className="flex gap-2">
        <Button 
        href={`/admin/editar/${product._id}`} 
        variant="warning" 
        size="sm"
  >
        Editar
    </Button>
    <Button 
        onClick={() => handleDelete(product._id)} 
        variant="danger" 
        size="sm"
    >
     Apagar
    </Button>
    </div>
      </div>
    </div>
  );
}