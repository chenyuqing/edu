'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();

  const isActivePath = (path: string) => pathname === path;

  return (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className={`text-lg ${
              isActivePath('/') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            首页
          </Link>
          <Link
            href="/doc"
            className={`${
              isActivePath('/doc') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            文档
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/learning"
                className={`${
                  isActivePath('/learning') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                学习
              </Link>
              <Link
                href="/tools"
                className={`${
                  isActivePath('/tools') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                工具
              </Link>
            </>
          )}
          <Link
            href="/about"
            className={`${
              isActivePath('/about') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            关于
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">{user?.username}</span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                退出
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={`${
                isActivePath('/login') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              登录/注册
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
