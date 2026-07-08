import React from 'react';
import { cn } from '../../utils/helpers';

export const Badge = ({ children, variant = 'default', className, dot = false, ...props }) => {
  const variants = {
    default:  "bg-gray-100 text-gray-700 ring-1 ring-gray-200/50",
    primary:  "bg-brand-100 text-brand-700 ring-1 ring-brand-200/50",
    success:  "bg-green-100 text-green-700 ring-1 ring-green-200/50",
    warning:  "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-200/50",
    danger:   "bg-red-100 text-red-700 ring-1 ring-red-200/50",
    info:     "bg-blue-100 text-blue-700 ring-1 ring-blue-200/50",
  };

  const dotColors = {
    default: "bg-gray-400",
    primary: "bg-brand-500",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger:  "bg-red-500",
    info:    "bg-blue-500",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColors[variant])} />
      )}
      {children}
    </span>
  );
};
