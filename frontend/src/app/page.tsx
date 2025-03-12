import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">欢迎来到学习与创造平台</h1>


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

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">社区</h2>
            
            <Link
              href="/community"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              加入社区
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">请我喝杯咖啡</h2>
            
            <Link
              href="https://www.buymeacoffee.com/example"
              className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              支持一下
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
