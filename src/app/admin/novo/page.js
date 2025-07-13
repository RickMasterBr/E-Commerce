// A diretiva 'use client' é essencial aqui.
// Ela diz ao Next.js que este componente precisa de interatividade
// no navegador (usando hooks como useState e tratando de eventos).
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importamos o router para redirecionar

export default function NovoProdutoPage() {
  const router = useRouter(); // Inicializamos o router

  // Usamos useState para guardar os dados de todos os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: 0,
    stock: 0,
    detalhes: {
      material: '',
      cor: '',
      tamanho: '',
    },
  });

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Se o campo pertence ao objeto 'detalhes'
    if (name in formData.detalhes) {
      setFormData(prevState => ({
        ...prevState,
        detalhes: {
          ...prevState.detalhes,
          [name]: value,
        },
      }));
    } else {
      // Se for um campo de nível superior (nome, categoria, etc.)
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento padrão da página

    try {
      const response = await fetch('/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          // Convertemos preço e stock para números, pois os inputs retornam strings
          preco: parseFloat(formData.preco),
          stock: parseInt(formData.stock, 10),
        }),
      });

      if (response.ok) {
        alert('Produto criado com sucesso!');
        router.push('/'); // Redireciona para a página inicial
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar produto: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Falha ao submeter o formulário:', error);
      alert('Ocorreu um erro. Verifique a consola.');
    }
  };

  // O JSX do nosso formulário, estilizado com Tailwind CSS
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Adicionar Novo Produto</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        
        {/* Campo Nome */}
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-700 font-bold mb-2">Nome do Produto</label>
          <input type="text" name="nome" id="nome" value={formData.nome} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        {/* Campo Categoria */}
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-gray-700 font-bold mb-2">Categoria</label>
          <input type="text" name="categoria" id="categoria" value={formData.categoria} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        {/* Campos Preço e Stock (lado a lado) */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="preco" className="block text-gray-700 font-bold mb-2">Preço (R$)</label>
            <input type="number" name="preco" id="preco" step="0.01" value={formData.preco} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="stock" className="block text-gray-700 font-bold mb-2">Stock</label>
            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-4 border-t pt-4">Detalhes</h2>

        {/* Campo Material */}
        <div className="mb-4">
          <label htmlFor="material" className="block text-gray-700 font-bold mb-2">Material</label>
          <input type="text" name="material" id="material" value={formData.detalhes.material} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        {/* Campo Cor */}
        <div className="mb-4">
          <label htmlFor="cor" className="block text-gray-700 font-bold mb-2">Cor</label>
          <input type="text" name="cor" id="cor" value={formData.detalhes.cor} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        {/* Campo Tamanho */}
        <div className="mb-4">
          <label htmlFor="tamanho" className="block text-gray-700 font-bold mb-2">Tamanho</label>
          <input type="text" name="tamanho" id="tamanho" value={formData.detalhes.tamanho} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        {/* Botão de Submissão */}
        <div className="mt-8 text-right">
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
            Salvar Produto
          </button>
        </div>
      </form>
    </div>
  );
}