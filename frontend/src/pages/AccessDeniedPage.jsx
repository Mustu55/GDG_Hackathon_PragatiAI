import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ShieldOff, ArrowLeft, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-red-500/10 blur-[100px] pointer-events-none rounded-full" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 bg-white p-10 md:p-16 rounded-3xl shadow-2xl shadow-red-900/5 border border-red-50 max-w-lg w-full text-center"
      >
        <div className="w-24 h-24 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-8 border-4 border-white shadow-lg shadow-red-100/50">
          <ShieldOff className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Access Denied</h1>
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          You do not have permission to view this page. This area is restricted to verified government officers and administrators.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full bg-white hover:bg-gray-50">
              <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
            </Button>
          </Link>
          <Link to="/login" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full shadow-xl shadow-brand-200/50">
              <LogIn className="w-5 h-5 mr-2" /> Login as Officer
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
