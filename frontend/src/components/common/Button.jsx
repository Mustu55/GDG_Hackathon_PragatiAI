import React from 'react';
import { cn } from '../../utils/helpers';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading,
  disabled,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]";

  const variants = {
    primary: "bg-gradient-to-r from-brand-600 to-brand-700 text-white hover:from-brand-700 hover:to-brand-800 focus:ring-brand-500 shadow-md shadow-brand-200/50",
    secondary: "bg-accent-100 text-accent-700 hover:bg-accent-200 focus:ring-accent-500",
    outline: "border-2 border-gray-200 bg-transparent hover:bg-gray-50 hover:border-gray-300 text-gray-700 focus:ring-brand-500",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 focus:ring-red-500 shadow-md shadow-red-200/50",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
