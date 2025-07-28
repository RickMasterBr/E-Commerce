import Link from 'next/link';

export default function ResetPasswordPage() {
    return (
        <div className="bg-[#fcf8f8] flex items-center justify-center py-20">
            <div className="max-w-md w-full text-center">
                <h2 className="text-[#1b0e0f] text-3xl font-bold mb-2">Reset your password</h2>
                <p className="text-[#1b0e0f] text-base font-normal mb-6">Enter the email address associated with your account, and we'll send you a link to reset your password.</p>
                <form className="space-y-4 px-4">
                    <input placeholder="Email" className="form-input h-14 w-full rounded-xl border-none bg-[#f3e7e8] placeholder:text-[#974e52]" />
                    <button type="submit" className="w-full h-10 px-4 rounded-full bg-[#e82630] text-white font-bold text-sm">
                        Send reset link
                    </button>
                </form>
                <p className="text-[#974e52] text-sm mt-4">
                    <Link href="#" className="underline">Remember your password? Log in</Link>
                </p>
            </div>
        </div>
    );
}