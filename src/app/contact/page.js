'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui iria a lógica para enviar os dados para uma API
    console.log('Dados do formulário:', formData);
    toast.success('Mensagem enviada! (Simulação)');
    setFormData({ name: '', email: '', subject: '', message: '' }); // Limpa o formulário
  };

  return (
    <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight">Contact Us</p>
            <p className="text-[#974e52] text-sm font-normal leading-normal">We're here to help! Reach out to us through any of the channels below.</p>
          </div>
        </div>

        <h3 className="text-[#1b0e0f] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Contact Form</h3>
        
        <form onSubmit={handleSubmit} className="max-w-[480px]">
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#1b0e0f] text-base font-medium leading-normal pb-2">Your Name</p>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e0f] focus:outline-0 focus:ring-0 border border-[#e7d0d1] bg-[#fcf8f8] focus:border-[#cb8e92] h-14 placeholder:text-[#974e52] p-[15px] text-base font-normal leading-normal" />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#1b0e0f] text-base font-medium leading-normal pb-2">Your Email</p>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e0f] focus:outline-0 focus:ring-0 border border-[#e7d0d1] bg-[#fcf8f8] focus:border-[#cb8e92] h-14 placeholder:text-[#974e52] p-[15px] text-base font-normal leading-normal" required />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#1b0e0f] text-base font-medium leading-normal pb-2">Subject</p>
              <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter the subject" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e0f] focus:outline-0 focus:ring-0 border border-[#e7d0d1] bg-[#fcf8f8] focus:border-[#cb8e92] h-14 placeholder:text-[#974e52] p-[15px] text-base font-normal leading-normal" />
            </label>
          </div>
          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#1b0e0f] text-base font-medium leading-normal pb-2">Message</p>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Enter your message" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e0f] focus:outline-0 focus:ring-0 border border-[#e7d0d1] bg-[#fcf8f8] focus:border-[#cb8e92] min-h-36 placeholder:text-[#974e52] p-[15px] text-base font-normal leading-normal"></textarea>
            </label>
          </div>
          <div className="flex px-4 py-3 justify-start">
            <button type="submit" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e82630] text-[#fcf8f8] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors">
              <span className="truncate">Submit</span>
            </button>
          </div>
        </form>

        <h3 className="text-[#1b0e0f] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Other Ways to Reach Us</h3>
        <div className="flex items-center gap-4 bg-[#fcf8f8] px-4 min-h-[72px] py-2">
            <div className="text-[#1b0e0f] flex items-center justify-center rounded-lg bg-[#f3e7e8] shrink-0 size-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z"></path></svg>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-[#1b0e0f] text-base font-medium leading-normal line-clamp-1">Phone</p>
                <p className="text-[#974e52] text-sm font-normal leading-normal line-clamp-2">Available Monday to Friday, 9 AM to 5 PM PST</p>
            </div>
        </div>
        <div className="flex items-center gap-4 bg-[#fcf8f8] px-4 min-h-[72px] py-2">
            <div className="text-[#1b0e0f] flex items-center justify-center rounded-lg bg-[#f3e7e8] shrink-0 size-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path></svg>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-[#1b0e0f] text-base font-medium leading-normal line-clamp-1">Chatbot</p>
                <p className="text-[#974e52] text-sm font-normal leading-normal line-clamp-2">Get instant answers to common questions</p>
            </div>
        </div>
      </div>
    </div>
  );
}