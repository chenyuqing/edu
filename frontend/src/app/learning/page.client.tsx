'use client';

import React, { useEffect, useState } from 'react';
import { withAuth } from '@/contexts/AuthContext';
import { ApiClient } from '@/utils/api';

interface Topic {
  id: number;
  title: string;
  description: string;
  progress: number;
}

function Learning() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setIsLoading(true);
    const response = await ApiClient.getLearningTopics();
    if (response.error) {
      setError(response.error);
    } else {
      setTopics(response.data || []);
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
          <h1 className="text-3xl font-bold mb-8">学习资源</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div key={topic.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 h-32 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 4.75 7.5 4.75a4.5 4.5 0 00-4.5 4.5c0 1.789.683 3.37 1.886 4.586M12 18.747c1.168.773 2.754 1.496 4.5 1.496a4.5 4.5 0 004.5-4.5c0-1.789-.683-3.37-1.886-4.586M12 6.253V4.75m0 13c1.168.773 2.754 1.496 4.5 1.496a4.5 4.5 0 004.5-4.5c0-1.789-.683-3.37-1.886-4.586M12 4.75c-1.168.773-2.754 1.496-4.5 1.496a4.5 4.5 0 00-4.5 4.5c0 1.789.683 3.37 1.886 4.586" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                  <p className="text-gray-600 mb-4">{topic.description}</p>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    进度: {topic.progress}%
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    继续学习
                  </button>
                </div>
              </div>
            ))}
          </div>

          {topics.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">暂无学习资源</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white p-4 text-center">
        <span>&copy; 2025 学习与工具平台. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default withAuth(Learning);
