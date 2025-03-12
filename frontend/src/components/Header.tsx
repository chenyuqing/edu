'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { isAuthenticated, user, walletAddress, logout } = useAuth();
  const [connecting, setConnecting] = useState(false);
  const pathname = usePathname();

  const isActivePath = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const displayAddress = walletAddress ? 
    `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 
    user?.username;

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
              <Link
                href="/community"
                className={`${
                  isActivePath('/community') ? 'text-blue-600 font-medium' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                社区
              </Link>
              <Link
                href="https://www.buymeacoffee.com/example"
                className="text-gray-700 hover:text-blue-600 font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                请我喝杯咖啡
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
              <span className="text-gray-700 font-mono">
                {displayAddress}
              </span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                退出
              </button>
            </>
          ) : (
            <Link
              href="/connect2wallet"
              className="text-gray-700 hover:text-blue-600 font-medium"
              style={{ pointerEvents: connecting ? 'none' : 'auto', opacity: connecting ? 0.5 : 1 }}
            >
              连接钱包
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
