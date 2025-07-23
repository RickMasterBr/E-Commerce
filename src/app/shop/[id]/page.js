'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';

// --- FUNÇÕES DE BUSCA DE DADOS ---

// Função para buscar a URL base da API
function getApiUrl() {
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
}

// Busca um único produto pelo ID
async function getProductById(id) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/produtos/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

// Busca outros produtos para a seção "Related Products"
async function getRelatedProducts(currentProductId, category) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${apiUrl}/api/produtos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Falha ao buscar produtos');
    const allProducts = await res.json();
    return allProducts
        .filter(p => p.categoria === category && p._id !== currentProductId)
        .slice(0, 3);
}


// --- COMPONENTE DA PÁGINA ---

export default function ProductPage({ params }) {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { addToCart } = useCart(); // Usar o hook do carrinho

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const productData = await getProductById(id);
            if (!productData) {
                notFound();
            }
            const relatedData = await getRelatedProducts(productData._id, productData.categoria);
            setProduct(productData);
            setRelatedProducts(relatedData);
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading || !product) {
        return <p className="text-center py-20">Carregando produto...</p>;
    }

    return (
        <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
                {/* ... (Breadcrumbs, Imagem, Detalhes, etc.) */}
                
                {/* Botão Add to Cart Atualizado */}
                <div className="flex px-4 py-3">
                    <button 
                        onClick={() => addToCart(product)}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#e82630] text-[#fcf8f8] text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors">
                        <span className="truncate">Add to Cart</span>
                    </button>
                </div>

        {/* Tabs de Descrição */}
        <div className="pb-3">
          <div className="flex border-b border-[#e7d0d1] px-4 gap-8">
            <div className="flex flex-col items-center justify-center border-b-[3px] border-b-[#e82630] text-[#1b0e0f] pb-[13px] pt-4">
              <p className="text-[#1b0e0f] text-sm font-bold leading-normal tracking-[0.015em]">Details</p>
            </div>
          </div>
        </div>

        <div className="text-[#1b0e0f] text-base font-normal leading-normal pb-3 pt-1 px-4">
            <ul className="list-disc list-inside space-y-1">
                {Object.entries(product.detalhes).map(([key, value]) => (
                    <li key={key}>
                        <span className="font-semibold capitalize">{key}:</span> {String(value)}
                    </li>
                ))}
            </ul>
        </div>

        {/* Produtos Relacionados */}
        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Related Products
        </h2>
        <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-stretch p-4 gap-4">
            {relatedProducts.map(related => (
              <Link href={`/shop/${related._id}`} key={related._id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 group">
                <div className="relative w-full aspect-[3/4] bg-cover rounded-xl flex flex-col overflow-hidden">
                    <Image 
                        src={related.imagem || '/placeholder.jpg'}
                        alt={related.nome}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div>
                  <p className="text-[#1b0e0f] text-base font-medium leading-normal">{related.nome}</p>
                  <p className="text-[#974e52] text-sm font-normal leading-normal">{related.categoria}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}