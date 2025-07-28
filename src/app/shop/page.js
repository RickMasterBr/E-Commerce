'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardSkeleton from '@/components/ProductCardSkeleton'; // Importar o novo componente

// ... (o hook useDebounce continua aqui)
function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}


export default function ShopPage() {
    const [products, setProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para os filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
        if (selectedCategory) params.append('category', selectedCategory);

        const res = await fetch(`/api/produtos?${params.toString()}`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    }, [debouncedSearchTerm, selectedCategory]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch('/api/produtos');
            const allProducts = await res.json();
            const uniqueCategories = [...new Set(allProducts.map(p => p.categoria))];
            setAllCategories(uniqueCategories);
        };
        fetchCategories();
    }, []);

    return (
        <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
            <div className="max-w-[960px] mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-3 p-4">
                    <h1 className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight min-w-72">
                        Supplements
                    </h1>
                </div>

                {/* --- SEÇÃO DE FILTROS (sem alterações) --- */}
                <div className="flex flex-col md:flex-row gap-4 p-4 mb-6 bg-white rounded-lg shadow-sm">
                    <input 
                        type="text"
                        placeholder="Procurar por nome..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-input flex-grow h-12 rounded-xl border-gray-300"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="form-select h-12 rounded-xl border-gray-300"
                    >
                        <option value="">Todas as Categorias</option>
                        {allCategories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* --- Grade de Produtos ATUALIZADA com Skeleton Loading --- */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
                    {loading ? (
                        // Se estiver a carregar, mostra 8 "esqueletos"
                        Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))
                    ) : products.length > 0 ? (
                        // Se não estiver a carregar e houver produtos, mostra os produtos
                        products.map((product) => (
                            <Link href={`/shop/${product._id}`} key={product._id} className="flex flex-col gap-3 pb-3 group">
                                <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${product.imagem || '/placeholder.jpg'})` }}>
                                </div>
                                <p className="text-[#1b0e0f] text-base font-medium leading-normal">{product.nome}</p>
                            </Link>
                        ))
                    ) : (
                        // Se não estiver a carregar e não houver produtos, mostra a mensagem
                        <p className="col-span-full text-center text-gray-500">Nenhum produto encontrado com estes filtros.</p>
                    )}
                </div>
            </div>
        </div>
    );
}