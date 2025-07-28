'use client';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-[#fbf9f9] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-[#191011] text-3xl font-bold mb-4">Sign in or create an account</h2>
        <div className="space-y-3 my-6">
          <button className="w-full h-10 rounded-xl bg-[#f1e9ea] text-[#191011] font-bold text-sm">Continue with social media</button>
          <button className="w-full h-10 rounded-xl bg-[#f1e9ea] text-[#191011] font-bold text-sm">Continue with social media</button>
        </div>
        <p className="text-[#8b5b5d] text-sm">or</p>
        <form className="space-y-4 mt-6">
          <input placeholder="Email" type="email" className="form-input h-14 w-full rounded-xl border-none bg-[#f1e9ea] placeholder:text-[#8b5b5d]" />
          <input placeholder="Password" type="password" className="form-input h-14 w-full rounded-xl border-none bg-[#f1e9ea] placeholder:text-[#8b5b5d]" />
          <button type="submit" className="w-full h-12 px-4 rounded-xl bg-[#e8b4b7] text-[#191011] font-bold text-sm">
            Continue
          </button>
        </form>
        <p className="text-[#8b5b5d] text-sm mt-4">
          By continuing, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
        </p>
         <Link href="/reset-password" className="text-sm text-center underline text-[#974e52] mt-4 block">Forgot your password?</Link>
      </div>
    </div>
  );
}