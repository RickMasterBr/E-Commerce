'use client';

import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
        // Corrigido aqui:
        dark: 'bg-[#191011] text-white',
 // sem hover
      },
      size: {
        default: 'px-6 py-2.5', // Ajustado para corresponder ao seu design
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        // Nova variante para botões que contêm apenas um ícone
        icon: 'size-10', // size-* define altura e largura iguais
      },
    },
    defaultVariants: {
      variant: 'dark',
      size: 'default',
    },
  }
);

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