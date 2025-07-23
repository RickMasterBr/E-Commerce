'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

export default function CartPage() {
  const { cartItems, updateQuantity } = useCart();

  const orderSummary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    const shipping = 0; // Frete grátis como no exemplo
    const taxes = subtotal * 0.05; // Exemplo de 5% de imposto
    const total = subtotal + shipping + taxes;
    return { subtotal, shipping, taxes, total };
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">O seu carrinho está vazio</h1>
        <Link href="/shop" className="text-blue-600 hover:underline">
          Continuar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#fbf9f9] px-4 sm:px-10 lg:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        <div className="p-4">
          <h1 className="text-[#191011] tracking-light text-[32px] font-bold leading-tight min-w-72">Your Cart</h1>
        </div>
        
        {/* Itens do Carrinho */}
        {cartItems.map(item => (
          <div key={item._id} className="flex items-center gap-4 bg-[#fbf9f9] px-4 min-h-[72px] py-2 justify-between border-b border-gray-200">
            <div className="flex items-center gap-4">
              <Link href={`/shop/${item._id}`}>
                <div className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 overflow-hidden">
                  <Image src={item.imagem} alt={item.nome} fill style={{objectFit: 'cover'}}/>
                </div>
              </Link>
              <div className="flex flex-col justify-center">
                 <Link href={`/shop/${item._id}`} className="text-[#191011] text-base font-medium leading-normal line-clamp-1 hover:underline">{item.nome}</Link>
                <p className="text-[#8b5b5d] text-sm font-normal leading-normal line-clamp-2">Size: {item.detalhes.tamanho}</p>
              </div>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2 text-[#191011]">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f1e9ea] cursor-pointer">-</button>
                <span className="text-base font-medium leading-normal w-4 p-0 text-center">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-base font-medium leading-normal flex h-7 w-7 items-center justify-center rounded-full bg-[#f1e9ea] cursor-pointer">+</button>
              </div>
            </div>
          </div>
        ))}

        {/* Order Summary */}
        <h3 className="text-[#191011] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-8">Order Summary</h3>
        <div className="p-4">
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#8b5b5d] text-sm font-normal leading-normal">Subtotal</p>
                <p className="text-[#191011] text-sm font-normal leading-normal text-right">$ {orderSummary.subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#8b5b5d] text-sm font-normal leading-normal">Shipping</p>
                <p className="text-[#191011] text-sm font-normal leading-normal text-right">{orderSummary.shipping === 0 ? 'Free' : `$${orderSummary.shipping.toFixed(2)}`}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-2">
                <p className="text-[#8b5b5d] text-sm font-normal leading-normal">Taxes</p>
                <p className="text-[#191011] text-sm font-normal leading-normal text-right">$ {orderSummary.taxes.toFixed(2)}</p>
            </div>
            <div className="flex justify-between gap-x-6 py-2 border-t mt-2 pt-2 border-gray-300">
                <p className="text-[#1b0e0f] text-base font-bold leading-normal">Total</p>
                <p className="text-[#191011] text-base font-bold leading-normal text-right">$ {orderSummary.total.toFixed(2)}</p>
            </div>
        </div>
        <div className="flex px-4 py-3 justify-end">
        <Link href="/checkout" className="flex min-w-[84px] w-full sm:w-auto cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#e8b4b7] text-[#191011] text-base font-bold leading-normal tracking-[0.015em] hover:bg-pink-300 transition-colors">
                <span className="truncate">Proceed to Checkout</span>
            </Link>
        </div>
      </div>
    </div>
  );
}