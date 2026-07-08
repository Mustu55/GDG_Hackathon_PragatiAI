import React from 'react';
import { cn } from '../../utils/helpers';

export const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
      {Icon && (
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
