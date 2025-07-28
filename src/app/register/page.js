'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }
    setLoading(true);
    
    // O campo 'name' será uma combinação de 'firstName' e 'lastName'
    const name = `${e.target.firstName.value} ${e.target.lastName.value}`;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Conta criada com sucesso!');
        router.push('/login');
      } else {
        toast.error(data.message || 'Ocorreu um erro ao criar a conta.');
      }
    } catch (error) {
      toast.error('Não foi possível ligar ao servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fcf8f8] flex justify-center py-10 px-4">
      <div className="layout-content-container flex flex-col w-full max-w-lg">
        <h2 className="text-[#191011] text-3xl font-bold text-center mb-8">Create your account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="firstName" placeholder="First Name" required className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52] p-4 text-base" />
          <input name="lastName" placeholder="Last Name" required className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52] p-4 text-base" />
          <input name="email" type="email" placeholder="Email" required className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52] p-4 text-base" />
          <input name="password" type="password" placeholder="Password" required className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52] p-4 text-base" />
          <input name="phone" placeholder="Phone Number" className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52] p-4 text-base" />
          
          {/* ... (Os campos de select como Country, Gender, etc., podem ser adicionados da mesma forma) ... */}

          <div className="px-1 py-2">
            <label className="flex items-center gap-x-3">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={(e) => setAgreed(e.target.checked)} 
                className="h-5 w-5 rounded border-[#e7d0d1] border-2 bg-transparent text-[#e82630] focus:ring-0 focus:ring-offset-0" 
              />
              <p className="text-[#1b0e0f] text-base font-normal">I agree to the Terms of Service and Privacy Policy</p>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full h-12 px-5 rounded-full bg-[#e82630] text-[#fcf8f8] text-base font-bold disabled:bg-red-300 transition-colors"
          >
            {loading ? 'A criar...' : 'Create Account'}
          </button>
        </form>

        <p className="text-[#974e52] text-sm text-center mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline font-medium text-[#1b0e0f]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}