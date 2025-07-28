import Image from 'next/image';
import Link from 'next/link';

export default function OrderConfirmedPage() {
    return (
        <div className="bg-[#fbf9f9] flex justify-center py-10 px-4">
            <div className="flex flex-col w-full max-w-lg text-center">
                <h2 className="text-[#191011] text-3xl font-bold mb-2">Order confirmed</h2>
                <p className="text-[#191011] text-base mb-6">Thank you, your order has been placed and is on its way!</p>

                <div className="relative w-full aspect-[4/3] mb-6">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuApkknPKfeuOa-ARZbyQxwLNocZITcKhAW2a-l0f3qX0Yy91LviW0XQvZ6fen2xHXlHqP47Be6LqHwkxNooYW_3dDBHWh8VJCW9s1X6Y3c_UaWs-SuVkZHIbyDveBa7wiRDIQcPE6Qc4iYAWaI0CxfgYE7xEAi5pqGAyGxL82bBWb3bHgRd4H5sgaOntcHKpDHOA1kMI2gSZc9tw0STkBBUUn70GYWhSlwGhMd6edZ6Ik7nR80pjJFEdOIPMnYq7B5J-zcPGnBQNVoM" alt="Order confirmation illustration" layout="fill" objectFit="contain" />
                </div>
                
                <div className="text-left border-t py-4">
                    <h3 className="font-bold text-lg mb-4">Order #123456789</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between"><p className="text-[#8b5b5d]">Order Date</p><p>July 28, 2025</p></div>
                        <div className="flex justify-between"><p className="text-[#8b5b5d]">Shipping Address</p><p>123 Elm Street, Anytown</p></div>
                        <div className="flex justify-between"><p className="text-[#8b5b5d]">Payment Method</p><p>Visa ending in 1234</p></div>
                    </div>
                </div>

                <div className="mt-6">
                    <Link href="/account/orders" className="w-full h-12 flex items-center justify-center rounded-xl bg-[#e8b4b7] text-[#191011] font-bold">
                        View Order Details
                    </Link>
                </div>
            </div>
        </div>
    );
}