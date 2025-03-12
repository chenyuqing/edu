'use client';

import React, { useEffect, useState } from 'react';
import { withAuth } from '@/contexts/AuthContext';
import { ApiClient } from '@/utils/api';

interface Tool {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
}

function Tools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    setIsLoading(true);
    const response = await ApiClient.getTools();
    if (response.error) {
      setError(response.error);
    } else {
      setTools(response.data || []);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">出错了！</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">开发工具</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-indigo-600 h-32 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      tool.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : tool.status === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tool.status === 'active' ? '在线' : tool.status === 'maintenance' ? '维护中' : '离线'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <button 
                    className={`w-full flex justify-center py-2 px-4 rounded ${
                      tool.status === 'active'
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={tool.status !== 'active'}
                  >
                    {tool.status === 'active' ? '使用工具' : '暂不可用'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">暂无可用工具</p>
            </div>
          )}

          {/* Popular Tools Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">热门工具</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                {tools
                  .filter(tool => tool.status === 'active')
                  .slice(0, 2)
                  .map(tool => (
                    <div key={tool.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium">{tool.name}</h3>
                          <p className="text-sm text-gray-500">今日使用: {Math.floor(Math.random() * 1000)}次</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        使用
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-white p-4 text-center">
        <span>&copy; 2025 学习与工具平台. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default withAuth(Tools);
