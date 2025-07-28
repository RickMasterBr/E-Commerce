'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

function AdminSidebar() {
  // Links de navegação do painel de admin
  const adminLinks = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/produtos', label: 'Produtos' },
    { href: '/admin/orders', label: 'Pedidos' },
    { href: '/admin/users', label: 'Utilizadores' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-semibold mb-8">Admin</h2>
      <nav>
        <ul>
          {adminLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="block py-2 px-4 rounded hover:bg-gray-700 transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Se o status não for 'loading' e não houver sessão, redireciona para o login
    if (status !== 'loading' && !session) {
      router.push('/login');
    }
  }, [session, status, router]);

  // Enquanto verifica a sessão, exibe uma mensagem de carregamento
  if (status === 'loading') {
    return <p className="text-center p-20">A carregar...</p>;
  }

  // Se o usuário não estiver logado, não renderiza nada (será redirecionado)
  if (!session) {
    return null;
  }

  // Se o usuário estiver logado, mostra o layout de admin
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}