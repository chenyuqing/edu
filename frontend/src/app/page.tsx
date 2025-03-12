import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">学习</h2>
            
            <Link
              href="/learning"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始学习
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">创造</h2>
            
            <Link
              href="/tools"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              浏览工具
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
