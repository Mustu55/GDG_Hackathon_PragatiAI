import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isCitizen = user && user.role !== 'admin' && user.role !== 'officer';

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {onMenuClick && (
              <button 
                onClick={onMenuClick}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <Link to={user ? (isCitizen ? '/dashboard' : '/admin') : '/'} className="flex-shrink-0 flex items-center ml-2 lg:ml-0 gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">PRAGATI <span className="text-brand-600">AI</span></span>
            </Link>

            {isCitizen && (
              <div className="hidden md:ml-10 md:flex md:space-x-8">
                <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Dashboard</Link>
                <Link to="/report" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Report Issue</Link>
                <Link to="/my-reports" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">My Reports</Link>
                <Link to="/status-check" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">Check Status</Link>
                <Link to="/chat" className="text-brand-600 hover:text-brand-700 px-3 py-2 text-sm font-medium flex items-center gap-1">AI Assistant</Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block text-sm text-right">
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-gray-500 capitalize">{user.role}</p>
                </div>
                <div className="h-9 w-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
                </Link>
                <Link to="/register/citizen">
                  <Button variant="primary">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
