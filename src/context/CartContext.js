'use client';

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  // Função para sincronizar o carrinho com a base de dados
  const syncCartWithDb = useCallback(async (cartData) => {
    if (status === 'authenticated') {
      await fetch('/api/user/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart: cartData }),
      });
    } else {
      localStorage.setItem('guest_cart', JSON.stringify(cartData));
    }
  }, [status]);

  // Carrega o carrinho quando o estado da autenticação muda
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      if (status === 'authenticated') {
        localStorage.removeItem('guest_cart'); // Limpa o carrinho de convidado
        const res = await fetch('/api/user/cart');
        if(res.ok) {
            const data = await res.json();
            setCartItems(data.cart || []);
        }
      } else if (status === 'unauthenticated') {
        const storedCart = localStorage.getItem('guest_cart');
        setCartItems(storedCart ? JSON.parse(storedCart) : []);
      }
      setLoading(false);
    };
    loadCart();
  }, [status]);

  const addToCart = async (product) => {
    let updatedCart;
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item._id === product._id);
      if (itemExists) {
        updatedCart = prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }
      return updatedCart;
    });
    await syncCartWithDb(updatedCart);
    toast.success(`${product.nome} adicionado ao carrinho!`);
  };

  const updateQuantity = async (productId, quantity) => {
    let updatedCart;
    setCartItems(prevItems => {
        if (quantity <= 0) {
            updatedCart = prevItems.filter(item => item._id !== productId);
            toast.error("Item removido do carrinho.");
        } else {
            updatedCart = prevItems.map(item =>
                item._id === productId ? { ...item, quantity } : item
            );
        }
        return updatedCart;
    });
    await syncCartWithDb(updatedCart);
  };
  
  const clearCart = async () => {
    setCartItems([]);
    await syncCartWithDb([]);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    clearCart,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};