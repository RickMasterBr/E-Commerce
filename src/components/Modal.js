'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

export default function Modal({ isOpen, onClose, onConfirm, title, children }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={onClose} // Fecha o modal ao clicar no fundo
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()} // Impede que o clique dentro do modal o feche
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              <div className="text-gray-600 mb-6">
                {children}
              </div>
              <div className="flex justify-end gap-4">
                <Button variant="light" onClick={onClose}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                  Confirmar
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}