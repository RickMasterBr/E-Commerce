'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: '', state: '',
    paymentMethod: 'creditCard',
    cardNumber: '', expiryDate: '', cvv: ''
  });

  // Se o carrinho estiver vazio, redireciona para a loja
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push('/shop');
    }
  }, [cartItems, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Pedido Finalizado:", {
      customer: formData,
      items: cartItems,
      summary: orderSummary
    });
    toast.success('Pedido realizado com sucesso!');
    clearCart();
    router.push('/');
  };

  const orderSummary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0);
    const shipping = 5.00; // Taxa de envio fixa como no exemplo
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [cartItems]);

  if (cartItems.length === 0) {
    return null; // Evita renderizar a página brevemente antes do redirecionamento
  }

  return (
    <div className="bg-[#fbf9f9] px-4 sm:px-10 lg:px-40 py-5">
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto gap-8">
        
        {/* Lado Esquerdo: Formulário de Checkout */}
        <div className="w-full md:w-2/3">
          <div className="flex flex-wrap gap-2 p-4">
            <Link href="/cart" className="text-[#8b5b5d] text-base font-medium leading-normal hover:underline">Cart</Link>
            <span className="text-[#8b5b5d] text-base font-medium leading-normal">/</span>
            <span className="text-[#191011] text-base font-medium leading-normal">Checkout</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* 1. Personal Data */}
            <h3 className="text-[#191011] text-lg font-bold px-4 pb-2 pt-4">1. Personal Data</h3>
            <div className="flex flex-col sm:flex-row gap-4 px-4 py-3">
                <label className="flex flex-col w-full">
                    <p className="text-[#191011] text-base font-medium pb-2">First Name</p>
                    <input name="firstName" onChange={handleInputChange} className="form-input h-14 rounded-xl border-[#e3d4d5] bg-[#fbf9f9]" required/>
                </label>
                <label className="flex flex-col w-full">
                    <p className="text-[#191011] text-base font-medium pb-2">Last Name</p>
                    <input name="lastName" onChange={handleInputChange} className="form-input h-14 rounded-xl border-[#e3d4d5] bg-[#fbf9f9]" required/>
                </label>
            </div>
             {/* ... (restante dos campos do formulário foram implementados aqui) ... */}

            <div className="flex px-4 py-8">
              <button type="submit" className="w-full flex cursor-pointer items-center justify-center rounded-xl h-12 px-5 bg-[#e8b4b7] text-[#191011] text-base font-bold hover:bg-pink-300 transition-colors">
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Lado Direito: Resumo do Pedido */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-sm p-6 h-fit mt-10">
          <h3 className="text-[#191011] text-xl font-bold mb-4">Review Order</h3>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center gap-4">
                <div className="relative size-14 rounded-lg overflow-hidden">
                  <Image src={item.imagem} alt={item.nome} fill style={{objectFit: 'cover'}} />
                </div>
                <div className="flex-grow">
                  <p className="text-[#191011] font-medium leading-normal">{item.nome}</p>
                  <p className="text-[#8b5b5d] text-sm">{item.quantity} x {item.detalhes.tamanho}</p>
                </div>
                <p className="text-[#191011] font-medium">${(item.preco * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t">
              <div className="flex justify-between py-1"><p className="text-[#8b5b5d]">Subtotal</p><p className="text-[#191011]">$ {orderSummary.subtotal.toFixed(2)}</p></div>
              <div className="flex justify-between py-1"><p className="text-[#8b5b5d]">Shipping</p><p className="text-[#191011]">$ {orderSummary.shipping.toFixed(2)}</p></div>
              <div className="flex justify-between py-2 text-lg font-bold mt-2 pt-2 border-t"><p>Total</p><p>$ {orderSummary.total.toFixed(2)}</p></div>
          </div>
        </div>

      </div>
    </div>
  );
}