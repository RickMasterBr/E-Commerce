'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from './Button';

export default function ProductCarousel({ products }) {
  const [page, setPage] = useState(0);
  
  // Quantos itens mostrar de cada vez
  const ITEMS_PER_PAGE = 3;
  // Quantos itens avançar/recuar de cada vez
  const SLIDE_BY = 3;
  
  const totalPages = Math.ceil(products.length / SLIDE_BY);
  const currentPage = page % totalPages;

  const paginate = (direction) => {
    let newPage = (page + direction);
    // Loop contínuo
    if (newPage < 0) {
      newPage = totalPages - 1;
    } else if (newPage >= totalPages) {
      newPage = 0;
    }
    setPage(newPage);
  };
  
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full max-w-screen-md mx-auto py-6">
      {/* Container que mascara os slides */}
      <div className="overflow-hidden relative h-[420px]">
        <motion.div
          key={currentPage} // A chave força a re-animação quando a página muda
          className="flex gap-4"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
          {products.slice(currentPage * SLIDE_BY, (currentPage * SLIDE_BY) + ITEMS_PER_PAGE).map(product => (
            <div
              key={product._id}
              className="flex-shrink-0 w-[240px] flex flex-col bg-white rounded-xl shadow-lg p-4"
            >
              <div
                className="aspect-square bg-center bg-cover rounded-xl mb-2"
                style={{ backgroundImage: `url(${product.imagem})` }}
              />
              <p className="text-[--color-text-dark] font-medium truncate">{product.nome}</p>
              <p className="text-[--color-text-accent] text-sm">{product.categoria}</p>
              <Button href={`/shop/${product._id}`} className="mt-4 w-full">
                View Product
              </Button>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Botões de Navegação */}
      {products.length > ITEMS_PER_PAGE && (
        <>
          <button 
            onClick={() => paginate(-1)}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 bg-white/70 rounded-full p-2 hover:bg-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 bg-white/70 rounded-full p-2 hover:bg-white transition-colors shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>
          </button>
        </>
      )}
    </div>
  );
}