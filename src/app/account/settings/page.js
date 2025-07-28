'use client';
import { useState } from 'react';

export default function AccountSettingsPage() {
  const [formData, setFormData] = useState({ name: 'John Doe', email: 'john.doe@example.com', password: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <h1 className="text-[#1b0e0f] text-2xl font-bold mb-6">Account Settings</h1>
      <form className="max-w-md">
        <label className="block mb-4">
          <p className="text-[#1b0e0f] text-base font-medium pb-2">Name</p>
          <input name="name" value={formData.name} onChange={handleChange} className="form-input h-14 w-full rounded-xl border-[#e7d0d1] bg-[#fcf8f8]" />
        </label>
        <label className="block mb-4">
          <p className="text-[#1b0e0f] text-base font-medium pb-2">Email</p>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input h-14 w-full rounded-xl border-[#e7d0d1] bg-[#fcf8f8]" />
        </label>
        <label className="block mb-4">
          <p className="text-[#1b0e0f] text-base font-medium pb-2">Password</p>
          <input type="password" name="password" onChange={handleChange} placeholder="Enter new password" className="form-input h-14 w-full rounded-xl border-[#e7d0d1] bg-[#fcf8f8]" />
        </label>
        <div className="flex justify-end mt-6">
          <button type="submit" className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-full h-10 px-4 bg-[#e82630] text-[#fcf8f8] text-sm font-bold">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}