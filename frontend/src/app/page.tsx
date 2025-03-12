import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">欢迎来到学习与工具平台</h1>
        <p className="text-xl text-gray-600 mb-12">
          在这里，你可以学习新技能，使用实用工具，提高工作效率
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">学习资源</h2>
            <p className="text-gray-600 mb-6">
              探索丰富的学习资源，包括编程、Web开发和人工智能等领域的教程
            </p>
            <Link
              href="/learning"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              开始学习
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">实用工具</h2>
            <p className="text-gray-600 mb-6">
              使用我们精心开发的工具，提高开发效率，简化工作流程
            </p>
            <Link
              href="/tools"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              浏览工具
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">为什么选择我们？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">优质内容</h3>
              <p className="text-gray-600">
                精心策划的学习资源，确保学习效果
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">实用工具</h3>
              <p className="text-gray-600">
                专业的开发工具，提升工作效率
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">持续更新</h3>
              <p className="text-gray-600">
                定期更新内容和工具，保持与时俱进
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
