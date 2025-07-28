'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Modal from '@/components/Modal'; // Importar o Modal
import AddressForm from '@/components/AddressForm'; // Importar o novo formulário

export default function AddressesPage() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const fetchAddresses = async () => {
    setLoading(true);
    const res = await fetch('/api/user/addresses');
    if (res.ok) {
      const data = await res.json();
      setAddresses(data.addresses);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (formData) => {
    const promise = fetch('/api/user/addresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    toast.promise(promise, {
      loading: 'A guardar o endereço...',
      success: (res) => {
        if (!res.ok) throw new Error('Falha ao guardar.');
        setIsModalOpen(false);
        fetchAddresses(); // Recarrega a lista de endereços
        return 'Endereço adicionado com sucesso!';
      },
      error: 'Não foi possível adicionar o endereço.',
    });
  };

  if (loading) {
      return <p>A carregar os seus endereços...</p>
  }

  return (
      <>
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConfirm={() => {}} // O submit é feito pelo form, não pelo modal
            title="Adicionar Novo Endereço"
        >
            <AddressForm
                onSave={handleAddAddress}
                onCancel={() => setIsModalOpen(false)}
            />
        </Modal>

        <div>
            <h1 className="text-[#1b0e0f] text-2xl font-bold mb-6">Shipping Addresses</h1>
            <div className="space-y-4">
                {addresses.length > 0 ? (
                    addresses.map((addr, index) => (
                        <div key={index} className="flex justify-between items-center p-4 rounded-lg border border-gray-200">
                            <div>
                                <p className="font-medium">{addr.name}</p>
                                <p className="text-sm text-gray-500">{`${addr.street}, ${addr.city}, ${addr.zip}`}</p>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"></path></svg>
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Ainda não tem endereços guardados.</p>
                )}
            </div>
            <div className="mt-6">
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#f3e7e8] text-[#1b0e0f] text-sm font-bold"
                >
                    Add new address
                </button>
            </div>
        </div>
      </>
  );
}