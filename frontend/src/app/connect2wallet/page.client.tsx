'use client';

interface Window {
  ethereum: any;
}

import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { useAuth } from '@/contexts/AuthContext';

// Constants for supported networks
const SUPPORTED_CHAINS = {
  mainnet: BigInt(1),
  sepolia: BigInt(11155111),
};

export default function Connect2Wallet() {
  const [account, setAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, walletAddress, isAuthenticated } = useAuth();

  const connectWallet = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError('');
    setAccount('');

    try {
      if (typeof window === "undefined") {
        throw new Error("请使用网页浏览器");
      }

      if (typeof window.ethereum === "undefined") {
        throw new Error("请先安装 MetaMask 钱包");
      }

      // Get provider and check network
      const provider = new BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      const chainId = network.chainId;

      // Check if network is supported
      if (!Object.values(SUPPORTED_CHAINS).includes(chainId)) {
        throw new Error("不支持的网络，请切换到以太坊主网或 Sepolia 测试网");
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error("未找到账户，请在 MetaMask 中创建账户");
      }

      const address = accounts[0];
      
      console.log("已连接钱包:", address);
      console.log("Chain ID:", chainId.toString());

      setAccount(address);

      try {
        // Login with wallet address
        const result = await login(address);
        if (result.success) {
          console.log("登录成功，即将跳转到首页...");
          window.location.href = '/';
          return;
        }
        throw new Error(result.error || "认证失败");
      } catch (loginError: any) {
        throw new Error(`登录失败: ${loginError.message}`);
      }

    } catch (error: any) {
      console.error("钱包连接错误:", error);
      
      // Clear account if error
      setAccount('');
      
      // Translate common MetaMask errors
      if (error.code === 4001) {
        setError("您拒绝了连接请求");
      } else if (error.code === -32002) {
        setError("MetaMask 已有待处理的请求，请检查 MetaMask");
      } else {
        setError(error.message || "连接钱包失败");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle network/account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleChainChanged = () => {
        console.log("网络已更改，正在刷新页面...");
        window.location.reload();
      };

      const handleAccountsChanged = (accounts: string[]) => {
        console.log("账户已更改，正在刷新页面...");
        window.location.reload();
      };

      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  // Check for existing connection
  useEffect(() => {
    if (isAuthenticated && walletAddress) {
      console.log("检测到已连接的钱包，正在跳转...");
      window.location.href = '/';
    }
  }, [isAuthenticated, walletAddress]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          连接钱包
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          请使用 MetaMask 连接
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    连接错误
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={connectWallet}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isLoading ? '正在连接...' : '连接 MetaMask'}
          </button>

          {account && (
            <div className="mt-4 bg-gray-50 rounded-md p-4">
              <p className="text-sm text-gray-700">
                已连接钱包: 
                <span className="ml-1 font-mono font-medium">
                  {`${account.slice(0, 6)}...${account.slice(-4)}`}
                </span>
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-xs text-gray-500 text-center">
              连接钱包即表示您同意我们的服务条款和隐私政策
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
