'use client';

import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

// 1. Definimos todas as nossas variantes de estilo com 'cva'
const buttonVariants = cva(
  // Estilos base aplicados a todos os botões
  'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      // Nossas variantes de "intenção" (cor)
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        success: 'bg-green-500 text-white hover:bg-green-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
      // Nossas variantes de tamanho
      size: {
        default: 'py-2 px-4',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    // Valores padrão se nenhuma variante for passada
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// 2. Criamos o nosso componente React
const Button = ({ href, variant, size, className, children, ...props }) => {
  const Comp = href ? Link : 'button';

  return (
    <Comp
      href={href}
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Button;