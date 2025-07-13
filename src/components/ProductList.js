'use client';

import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  // Variantes para a animação do container da grid.
  // 'staggerChildren' faz com que os filhos animem um após o outro.
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Atraso de 0.1s entre cada cartão
      },
    },
  };

  // Variantes para a animação de cada cartão individual.
  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Começa 20px para baixo e invisível
    visible: { y: 0, opacity: 1 }, // Anima para a posição original e visível
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product._id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}