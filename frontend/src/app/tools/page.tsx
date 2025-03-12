'use client';

import dynamic from 'next/dynamic';

const ToolsClient = dynamic(() => import('./page.client'), {
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">加载中...</p>
      </div>
    </div>
  ),
  ssr: false
});

export default function ToolsPage() {
  return <ToolsClient />;
}
