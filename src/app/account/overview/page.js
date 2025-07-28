'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OverviewPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await fetch('/api/user/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p>A carregar os seus pedidos...</p>
  }

  return (
    <div>
      <h1 className="text-[#1b0e0f] text-2xl font-bold mb-6">Overview</h1>
      
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
      <div className="overflow-hidden rounded-xl border border-[#e3d4d5]">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-[#191011]">Order</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#191011]">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#191011]">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-[#191011]">Total</th>
            </tr>
          </thead>
          <tbody>
          {orders.map(order => (
                <tr key={order._id} className="border-t border-t-[#e3d4d5]">
                  <td className="h-[72px] px-4 py-2 text-[#191011]">{order._id}</td>
                  <td className="h-[72px] px-4 py-2 text-[#8b5b5d]">{order.date}</td>
                  <td className="h-[72px] px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="h-[72px] px-4 py-2 text-[#8b5b5d]">{order.total}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/contact" className="flex flex-1 gap-3 rounded-lg border border-[#e3d4d5] p-4 items-center hover:bg-gray-50">
              <p className="font-bold">Contact Us</p>
          </Link>
          {/* ... outros links rápidos ... */}
      </div>
    </div>
  );
}