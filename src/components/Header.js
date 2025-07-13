import Link from 'next/link';
// Poderíamos importar um ícone de uma biblioteca como a lucide-react (npm install lucide-react)
// import { ShoppingCart } from 'lucide-react'; 

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logotipo ou Título do Site */}
        <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          E-Commerce Moderno
        </Link>
        
        {/* Links de Navegação */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
            Catálogo
          </Link>
          <Link href="/admin/novo" className="text-gray-600 hover:text-blue-600 transition-colors">
            Administração
          </Link>
          {/* Exemplo de um ícone de carrinho, se quiséssemos adicionar mais tarde */}
          {/* <button className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
          </button> */}
        </div>
      </nav>
    </header>
  );
}