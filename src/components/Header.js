import Link from 'next/link';
import Button from './Button'; 

export default function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-[--color-background] px-10 py-4">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 17L12 22L22 17" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2 12L12 17L22 12" stroke="var(--color-text-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span className="text-xl font-bold text-[--color-text-dark]">E-Commerce</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Home</Link>
          <Link href="/shop" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Shop</Link>
          {/* AQUI A MUDANÇA */}
          <Link href="/community" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">Community</Link>
          <Link href="/about" className="text-sm font-medium text-[--color-text-accent] hover:text-[--color-text-dark] transition-colors">About</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        { /* ... O resto do header permanece igual ... */ }
        <button className="flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-blue-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6"><path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M21.0004 21L16.6504 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
        <Link href="/wishlist" className="flex items-center justify-center rounded-full text-[--color-text-dark] transition-colors hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path></svg>
        </Link>
        <Button href="/admin/novo" variant="dark">
          Adicionar Produto
        </Button>
      </div>
    </header>
  );
}