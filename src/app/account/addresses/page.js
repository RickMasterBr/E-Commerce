'use client';
import { useState, useEffect } from 'react';

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      const res = await fetch('/api/user/addresses');
      if (res.ok) {
        const data = await res.json();
        setAddresses(data.addresses);
      }
      setLoading(false);
    };
    fetchAddresses();
  }, []);

  if (loading) {
      return <p>A carregar os seus endereços...</p>
  }

  return (
      <div>
        <h1 className="text-[#1b0e0f] text-2xl font-bold mb-6">Shipping Addresses</h1>
        <div className="space-y-4">
            {addresses.length > 0 ? (
                addresses.map((addr, index) => (
                    <div key={index} className="flex justify-between items-center p-4 rounded-lg border">
                        <div>
                            <p className="font-medium">{addr.name}</p>
                            <p className="text-sm text-gray-500">{addr.street}, {addr.city}, {addr.zip}</p>
                        </div>
                        <button className="p-2">Editar</button>
                    </div>
                ))
            ) : (
                <p>Ainda não tem endereços guardados.</p>
            )}
        </div>
        <div className="mt-6">
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#f3e7e8] text-[#1b0e0f] text-sm font-bold">
                Add new address
            </button>
        </div>
      </div>
  );
}