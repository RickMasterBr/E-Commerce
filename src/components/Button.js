'use client';

import Link from 'next/link';

const Button = ({ 
  href, 
  variant = 'dark', 
  size = 'default', 
  className = '', 
  children, 
  loading = false,
  disabled = false,
  ...props 
}) => {
  const Comp = href ? Link : 'button';
  const isDisabled = disabled || loading;

  // Variantes de estilo
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-500',
    success: 'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500',
    dark: 'bg-[#191011] text-white hover:bg-[#2a1a1a] focus-visible:ring-[#191011]',
    light: 'bg-white text-[#191011] border border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-500',
    outline: 'border-2 border-[#191011] text-[#191011] hover:bg-[#191011] hover:text-white focus-visible:ring-[#191011]',
    ghost: 'text-[#191011] hover:bg-gray-100 focus-visible:ring-gray-500',
  };

  // Tamanhos
  const sizeClasses = {
    xs: 'h-7 px-2 text-xs',
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-6 py-2.5',
    lg: 'h-11 px-8 text-base',
    xl: 'h-12 px-10 text-lg',
    icon: 'h-10 w-10',
  };

  const baseClasses = 'inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95';
  
  const classes = `${baseClasses} ${variantClasses[variant] || variantClasses.dark} ${sizeClasses[size] || sizeClasses.default} ${className}`;

  return (
    <Comp
      href={href}
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin -ml-1 mr-2 h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Comp>
  );
};

export default Button;