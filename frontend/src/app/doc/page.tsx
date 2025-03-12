import React from 'react';

export default function Documentation() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Learning API</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">GET /api/learning</h3>
            <p className="text-gray-600 mb-4">Get all learning topics</p>
            <div className="bg-white p-4 rounded-lg">
              <pre className="text-sm">
{`{
  "topics": [
    {
      "id": 1,
      "title": "Python Programming",
      "description": "Learn Python programming language",
      "progress": 50
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tools API</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">GET /api/tools</h3>
            <p className="text-gray-600 mb-4">Get all available tools</p>
            <div className="bg-white p-4 rounded-lg">
              <pre className="text-sm">
{`{
  "tools": [
    {
      "id": 1,
      "name": "Code Formatter",
      "description": "Format your code in various programming languages",
      "status": "active"
    }
  ]
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Health Check API</h2>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="text-xl font-semibold mb-2">GET /api/health</h3>
            <p className="text-gray-600 mb-4">Check API health status</p>
            <div className="bg-white p-4 rounded-lg">
              <pre className="text-sm">
{`{
  "status": "healthy"
}`}
              </pre>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white p-4 text-center">
        <span>&copy; 2025 学习与工具平台. All rights reserved.</span>
      </footer>
    </div>
  );
}
