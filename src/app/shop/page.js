'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import Button from '@/components/Button';

// Hook para debounce
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

// Componente de paginação
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = useMemo(() => {
    const pagesArray = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
        pagesArray.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pagesArray.push(1);
        pagesArray.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pagesArray.push(i);
        }
      } else {
        pagesArray.push(1);
        pagesArray.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pagesArray.push(i);
        }
        pagesArray.push('...');
        pagesArray.push(totalPages);
      }
    }
    
    return pagesArray;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      
      {pages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'dark' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )}
        </div>
      ))}
      
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  
  // Estados para os filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('nome');
  const [sortOrder, setSortOrder] = useState('asc');

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
      if (selectedCategory) params.append('category', selectedCategory);
      params.append('page', pagination.page.toString());
      params.append('limit', pagination.limit.toString());
      params.append('sortBy', sortBy);
      params.append('sortOrder', sortOrder);

      const res = await fetch(`/api/produtos?${params.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await res.json();
      setProducts(data.produtos || []);
      setPagination(data.pagination || pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, selectedCategory, pagination.page, pagination.limit, sortBy, sortOrder]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/produtos');
        if (res.ok) {
          const data = await res.json();
          const allProducts = data.produtos || [];
          const uniqueCategories = [...new Set(allProducts.map(p => p.categoria))].sort();
          setAllCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const handleSearchChange = useCallback((search) => {
    setSearchTerm(search);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  const handleSortChange = useCallback((newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, []);

  return (
    <div className="bg-[#fcf8f8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1b0e0f] mb-2">
            Supplements
          </h1>
          <p className="text-[#8b5b5d]">
            Discover our premium collection of high-quality supplements
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <input 
                id="search"
                type="text"
                placeholder="Search by name or description..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#191011] focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#191011] focus:border-transparent transition-colors"
              >
                <option value="">All Categories</option>
                {allCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort"
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [newSortBy, newSortOrder] = e.target.value.split('-');
                  handleSortChange(newSortBy, newSortOrder);
                }}
                className="w-full h-12 px-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#191011] focus:border-transparent transition-colors"
              >
                <option value="nome-asc">Name (A-Z)</option>
                <option value="nome-desc">Name (Z-A)</option>
                <option value="preco-asc">Price (Low to High)</option>
                <option value="preco-desc">Price (High to Low)</option>
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-600">
              Showing {products.length} of {pagination.total} products
            </p>
            {pagination.total > 0 && (
              <p className="text-sm text-gray-600">
                Page {pagination.page} of {pagination.totalPages}
              </p>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: pagination.limit }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : products.length > 0 ? (
            // Products
            products.map((product) => (
              <Link 
                href={`/shop/${product._id}`} 
                key={product._id} 
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.imagem || '/placeholder.jpg'}
                    alt={product.nome}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  />
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">Out of Stock</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-[#1b0e0f] text-sm line-clamp-2 mb-1 group-hover:text-[#8b5b5d] transition-colors">
                    {product.nome}
                  </h3>
                  <p className="text-lg font-bold text-[#191011]">
                    R$ {product.preco.toFixed(2)}
                  </p>
                  {product.stock > 0 && (
                    <p className="text-xs text-green-600 mt-1">
                      {product.stock} in stock
                    </p>
                  )}
                </div>
              </Link>
            ))
          ) : (
            // No products found
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zM7 5h10v2H7V5z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}