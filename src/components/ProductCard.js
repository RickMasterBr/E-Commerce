'use client';

import { useState } from 'react'; // Importar useState
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Button from './Button';
import Modal from './Modal'; // Importar o novo componente Modal

export default function ProductCard({ product }) {
  const router = useRouter();
  
  // Estados para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Função para abrir o modal de confirmação
  const handleOpenDeleteModal = (productId) => {
    setProductToDelete(productId);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };
  
  // Função que realmente apaga o produto, chamada pelo modal
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    const promise = fetch(`/api/produtos/${productToDelete}`, {
      method: 'DELETE',
    });

    toast.promise(
      promise,
      {
        loading: 'A apagar o produto...',
        success: (res) => {
          if (!res.ok) {
            throw new Error('Falha ao apagar.');
          }
          router.refresh(); // Atualiza a página para remover o card
          handleCloseModal(); // Fecha o modal após o sucesso
          return 'Produto apagado com sucesso!';
        },
        error: (err) => {
          handleCloseModal(); // Fecha o modal também em caso de erro
          return 'Não foi possível apagar o produto.';
        }
      }
    );
  };
  
  return (
    <>
      {/* O Modal é renderizado aqui, mas só é visível quando isModalOpen é true */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
      >
        Tem a certeza que deseja apagar o produto <strong>{product.nome}</strong>? Esta ação não pode ser revertida.
      </Modal>

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
            {/* O botão agora chama a função para abrir o modal */}
            <Button 
              onClick={() => handleOpenDeleteModal(product._id)} 
              variant="danger" 
              size="sm"
            >
              Apagar
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}