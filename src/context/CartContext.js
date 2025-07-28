'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react'; // Hook para verificar a sessão
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { data: session, status } = useSession(); // Obter dados da sessão

  // Sincronizar carrinho com o backend
  const syncCartWithDb = async (cartData) => {
    if (session) {
      await fetch('/api/user/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cartData }),
      });
    }
  };

  // Carregar carrinho quando a sessão é carregada
  useEffect(() => {
    const loadCart = async () => {
      if (status === 'authenticated') {
        const res = await fetch('/api/user/cart');
        const data = await res.json();
        setCartItems(data.cart || []);
      } else if (status === 'unauthenticated') {
        const storedCart = localStorage.getItem('guest_cart');
        setCartItems(storedCart ? JSON.parse(storedCart) : []);
      }
    };
    loadCart();
  }, [status]);

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