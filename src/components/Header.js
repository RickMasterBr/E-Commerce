import Link from 'next/link';
import Button from './Button'; // Importe o nosso componente de botão

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[--color-background] px-10 py-4">
      <div className="flex items-center gap-8">
        {/* ... (resto do lado esquerdo do header) ... */}
        <Link href="/" className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 17L12 22L22 17" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12L12 17L22 12" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span className="text-xl font-bold text-[--color-text-dark]">E-Commerce</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Home</Link>
          <Link href="#" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Shop</Link>
          <Link href="#" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">About</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* ... (botão de pesquisa continua igual) ... */}
        <button className="flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-blue-600"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.0004 21L16.6504 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></button>
        {/* Usando o nosso componente Button. Como tem 'href', ele vira um Link. */}
        <Button href="/admin/novo" variant="dark">
          Adicionar Produto
        </Button>
      </div>
    </header>
  );
}