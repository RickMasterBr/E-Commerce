'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast'; // Importe o toast

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams(); // Hook para aceder aos parâmetros da rota (o [id])
  const { id } = params;

  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: 0,
    stock: 0,
    detalhes: { material: '', cor: '', tamanho: '' },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect para buscar os dados do produto quando a página carrega
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/produtos/${id}`);
          if (!res.ok) throw new Error('Produto não encontrado');
          const data = await res.json();
          setFormData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]); // O efeito depende do ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.detalhes) {
      setFormData(prevState => ({ ...prevState, detalhes: { ...prevState.detalhes, [name]: value } }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/produtos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          preco: parseFloat(formData.preco),
          stock: parseInt(formData.stock, 10),
        }),
      });

      if (response.ok) {
        toast.success('Produto atualizado com sucesso!');
        router.push('/');
      } else {
        const errorData = await response.json();
        toast.error(`Erro ao atualizar produto: ${errorData.message}`);
      }
    } catch (error) {
      toast.error('Falha ao submeter o formulário.');
    }
  };

  if (loading) return <p className="text-center mt-8">A carregar dados do produto...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Erro: {error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Editar Produto</h1>
      {/* Reutilizamos a mesma estrutura de formulário */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">Nome do Produto</label>
          <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">Categoria</label>
          <input type="text" name="categoria" id="categoria" value={formData.categoria} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="preco" className="block text-gray-700 font-bold mb-2">Preço (R$)</label>
            <input type="number" name="preco" step="0.01" value={formData.preco} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">Stock</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-6 mb-4 border-t pt-4">Detalhes</h2>
        <div className="mb-4">
          <label htmlFor="material" className="block text-gray-700 font-bold mb-2">Material</label>
          <input type="text" name="material" id="material" value={formData.detalhes.material} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="cor" className="block text-gray-700 font-bold mb-2">Cor</label>
          <input type="text" name="cor" id="cor" value={formData.detalhes.cor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="tamanho" className="block text-gray-700 font-bold mb-2">Tamanho</label>
          <input type="text" name="tamanho" id="tamanho" value={formData.detalhes.tamanho} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
        </div>
        <div className="mt-8 text-right">
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}