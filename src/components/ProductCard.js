'use client';

import { useRouter } from 'next/navigation';

export default function ProductCard({ product }) {
  const router = useRouter();

  const handleDelete = async (productId) => {
    // Pedimos confirmação ao utilizador antes de apagar
    const confirmed = window.confirm('Tem a certeza que deseja apagar este produto?');

    if (confirmed) {
      try {
        const res = await fetch(`/api/produtos/${productId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          alert('Produto apagado com sucesso!');
          // Atualiza os dados da página atual, fazendo um novo pedido ao servidor.
          router.refresh();
        } else {
          const errorData = await res.json();
          alert(`Erro ao apagar o produto: ${errorData.message}`);
        }
      } catch (error) {
        console.error(error);
        alert('Falha ao comunicar com a API.');
      }
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
          {/* Adicionámos o botão de apagar aqui */}
          <button 
            onClick={() => handleDelete(product._id)}
            className="bg-red-500 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
}