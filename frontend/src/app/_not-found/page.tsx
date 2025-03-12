import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-gray-600">Could not find the requested resource.</p>
      </div>
    </div>
  );
}
