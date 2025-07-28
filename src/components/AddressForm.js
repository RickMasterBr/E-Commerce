'use client';

import { useState } from 'react';
import Button from './Button';

export default function AddressForm({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '', street: '', city: '', state: '', zip: '', country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nome do Endereço (ex: Casa)" className="w-full px-3 py-2 border rounded-md" required />
        <input name="street" value={formData.street} onChange={handleChange} placeholder="Rua e Número" className="w-full px-3 py-2 border rounded-md" required />
        <div className="grid grid-cols-2 gap-4">
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Cidade" className="w-full px-3 py-2 border rounded-md" required />
          <input name="state" value={formData.state} onChange={handleChange} placeholder="Estado" className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input name="zip" value={formData.zip} onChange={handleChange} placeholder="Código Postal" className="w-full px-3 py-2 border rounded-md" required />
          <input name="country" value={formData.country} onChange={handleChange} placeholder="País" className="w-full px-3 py-2 border rounded-md" required />
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-6">
        <Button type="button" variant="light" onClick={onCancel}>Cancelar</Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}