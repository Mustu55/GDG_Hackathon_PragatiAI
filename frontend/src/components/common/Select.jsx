import React, { forwardRef } from 'react';
import { cn } from '../../utils/helpers';

export const Select = forwardRef(({ className, label, error, options, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={cn(
          "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm transition-colors",
          error ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300",
          className
        )}
        {...props}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
