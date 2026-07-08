import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/helpers';
import { 
  Home, FileText, Map, BarChart2, Bell, Settings, User, Bot, AlertTriangle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const adminLinks = [
    { name: 'Overview', to: '/admin', icon: Home },
    { name: 'Prioritized Issues', to: '/admin/issues', icon: AlertTriangle },
    { name: 'Map View', to: '/admin/map', icon: Map },
    { name: 'Analytics', to: '/admin/analytics', icon: BarChart2 },
    { name: 'Governance Brief', to: '/admin/brief', icon: FileText },
    { name: 'Notifications', to: '/admin/notifications', icon: Bell },
  ];

  const commonLinks = [
    { name: 'Settings', to: '/admin/settings', icon: Settings },
    { name: 'Profile', to: '/admin/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <div className="space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Command Center
              </p>
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/admin'}
                  onClick={onClose}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                    isActive 
                      ? "bg-brand-50 text-brand-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <link.icon className={cn("mr-3 h-5 w-5 flex-shrink-0", "text-gray-400 group-hover:text-gray-500")} />
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="mt-8 space-y-1">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                System
              </p>
              {commonLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors group",
                    isActive 
                      ? "bg-brand-50 text-brand-700" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <link.icon className={cn("mr-3 h-5 w-5 flex-shrink-0", "text-gray-400 group-hover:text-gray-500")} />
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50/50">
            <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Bot className="h-6 w-6 text-brand-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-brand-800">PRAGATI AI</h3>
                  <p className="mt-1 text-xs text-brand-600">System is active and monitoring.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
