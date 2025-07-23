'use client'; // Necessário para usar o hook do carrinho

import Link from 'next/link';
import Button from './Button';
import { useCart } from '@/context/CartContext'; // Importar o hook

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[--color-background] px-10 py-4">
      {/* ... (links de navegação) ... */}
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 17L12 22L22 17" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12L12 17L22 12" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span className="text-xl font-bold text-[--color-text-dark]">E-Commerce</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Shop</Link>
          <Link href="/community" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Community</Link>
          <Link href="/about" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">About</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.0004 21L16.6504 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
        <Link href="/wishlist" className="flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path></svg>
        </Link>
        {/* Ícone do Carrinho Atualizado */}
        <Link href="/cart" className="relative flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path></svg>
            {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {totalItems}
                </span>
            )}
        </Link>
        <Button href="/admin/novo" variant="dark">
          Adicionar Produto
        </Button>
      </div>
    </header>
  );
}