'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Carregar o carrinho do localStorage quando o componente é montado
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Salvar o carrinho no localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item._id === product._id);
      if (itemExists) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        // Remove o item se a quantidade for 0 ou menor
        return prevItems.filter(item => item._id !== productId);
      }
      return prevItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    toast.error("Item removido do carrinho.");
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};