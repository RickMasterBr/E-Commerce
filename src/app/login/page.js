'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    
    setLoading(false);

    if (result.error) {
      toast.error('Credenciais inválidas. Tente novamente.');
    } else {
      toast.success('Login bem-sucedido!');
      router.push('/account/overview');
    }
  };

  return (
    <div className="bg-[#fbf9f9] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-[#191011] text-3xl font-bold mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input name="email" type="email" placeholder="Email" required className="form-input h-14 w-full rounded-xl border-none bg-[#f1e9ea] placeholder:text-[#8b5b5d]" />
          <input name="password" type="password" placeholder="Password" required className="form-input h-14 w-full rounded-xl border-none bg-[#f1e9ea] placeholder:text-[#8b5b5d]" />
          <button type="submit" disabled={loading} className="w-full h-12 px-4 rounded-xl bg-[#e8b4b7] text-[#191011] font-bold text-sm disabled:bg-pink-200">
            {loading ? 'A entrar...' : 'Continue'}
          </button>
        </form>
         <Link href="/reset-password" className="text-sm text-center underline text-[#974e52] mt-4 block">Forgot your password?</Link>
         
         {/* Link atualizado */}
         <p className="mt-4 text-sm text-[#974e52]">
           Ainda não tem conta?{' '}
           <Link href="/register" className="font-bold underline text-[#1b0e0f]">
             Crie uma
           </Link>
         </p>
      </div>
    </div>
  );
}