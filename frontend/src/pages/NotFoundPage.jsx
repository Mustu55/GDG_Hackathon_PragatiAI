import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-9xl font-extrabold text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
