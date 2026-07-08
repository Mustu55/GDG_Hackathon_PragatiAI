import React from 'react';
import { cn } from '../../utils/helpers';
import { motion } from 'framer-motion';

export function Card({ children, className, animate = false, delay = 0, ...props }) {
  const base = "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden";
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay }}
        className={cn(base, className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <div className={cn(base, className)} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-100 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className, ...props }) {
  return (
    <h3 className={cn("text-lg font-bold text-gray-900", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className, ...props }) {
  return <div className={cn("p-6", className)} {...props}>{children}</div>;
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn("px-6 py-4 bg-gray-50/70 border-t border-gray-100", className)} {...props}>
      {children}
    </div>
  );
}
