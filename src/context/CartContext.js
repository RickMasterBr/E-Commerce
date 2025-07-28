'use client';

import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const { data: session, status } = useSession();

  // Memoize total items calculation
  const totalItems = useMemo(() => 
    cartItems.reduce((sum, item) => sum + item.quantity, 0), 
    [cartItems]
  );

  // Memoize total price calculation
  const totalPrice = useMemo(() => 
    cartItems.reduce((sum, item) => sum + (item.preco * item.quantity), 0), 
    [cartItems]
  );

  // Função para sincronizar o carrinho com a base de dados
  const syncCartWithDb = useCallback(async (cartData) => {
    if (syncing) return; // Evita múltiplas sincronizações simultâneas
    
    setSyncing(true);
    try {
      if (status === 'authenticated') {
        const response = await fetch('/api/user/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cart: cartData }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to sync cart');
        }
      } else {
        localStorage.setItem('guest_cart', JSON.stringify(cartData));
      }
    } catch (error) {
      console.error('Error syncing cart:', error);
      toast.error('Failed to save cart. Please try again.');
    } finally {
      setSyncing(false);
    }
  }, [status, syncing]);

  // Carrega o carrinho quando o estado da autenticação muda
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        if (status === 'authenticated') {
          // Limpa o carrinho de convidado quando autenticado
          localStorage.removeItem('guest_cart');
          
          const response = await fetch('/api/user/cart');
          if (response.ok) {
            const data = await response.json();
            setCartItems(data.cart || []);
          } else {
            console.error('Failed to load cart from server');
            setCartItems([]);
          }
        } else if (status === 'unauthenticated') {
          const storedCart = localStorage.getItem('guest_cart');
          setCartItems(storedCart ? JSON.parse(storedCart) : []);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [status]);

  const addToCart = useCallback(async (product) => {
    if (!product || !product._id) {
      toast.error('Invalid product');
      return;
    }

    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item._id === product._id);
      let updatedCart;

      if (itemExists) {
        updatedCart = prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: Math.min(item.quantity + 1, 99) } // Limita a 99 itens
            : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }

      // Sincroniza em background
      syncCartWithDb(updatedCart);
      return updatedCart;
    });

    toast.success(`${product.nome} added to cart!`);
  }, [syncCartWithDb]);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity < 0) return;

    setCartItems(prevItems => {
      let updatedCart;

      if (quantity === 0) {
        updatedCart = prevItems.filter(item => item._id !== productId);
        toast.success("Item removed from cart.");
      } else {
        updatedCart = prevItems.map(item =>
          item._id === productId ? { ...item, quantity: Math.min(quantity, 99) } : item
        );
      }

      // Sincroniza em background
      syncCartWithDb(updatedCart);
      return updatedCart;
    });
  }, [syncCartWithDb]);

  const removeFromCart = useCallback(async (productId) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.filter(item => item._id !== productId);
      syncCartWithDb(updatedCart);
      return updatedCart;
    });
    toast.success("Item removed from cart.");
  }, [syncCartWithDb]);

  const clearCart = useCallback(async () => {
    setCartItems([]);
    await syncCartWithDb([]);
    toast.success("Cart cleared.");
  }, [syncCartWithDb]);

  const getItemQuantity = useCallback((productId) => {
    const item = cartItems.find(item => item._id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const isInCart = useCallback((productId) => {
    return cartItems.some(item => item._id === productId);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    loading,
    syncing
  }), [
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity,
    isInCart,
    loading,
    syncing
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};