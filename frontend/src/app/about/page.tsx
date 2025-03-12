import React from 'react';

export default function About() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-6">关于我们</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">我们的愿景</h2>
          <p className="text-gray-600 mb-4">
            我们致力于为用户提供优质的学习资源和实用工具，帮助用户提升技能，实现目标。
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">平台特点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">学习资源</h3>
              <p className="text-gray-600">
                提供丰富的学习材料，包括教程、视频和实践项目，帮助用户系统地学习新技能。
              </p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">实用工具</h3>
              <p className="text-gray-600">
                提供各种开发工具和实用程序，提高工作效率。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-600 mb-2">如果您有任何问题或建议，请通过以下方式联系我们：</p>
            <ul className="list-disc list-inside text-gray-600">
              <li>邮箱：contact@example.com</li>
              <li>GitHub：github.com/example</li>
            </ul>
          </div>
        </section>
      </main>
      
      
    </div>
  );
}
