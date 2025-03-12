# 项目概述

本项目是一个基于 FastAPI + Next.js + Web3 的学习平台，支持钱包登录，提供学习和工具等功能。

## 功能特点

- **钱包集成**:
    - MetaMask 钱包连接
    - 支持以太坊主网和 Sepolia 测试网
    - 钱包地址作为用户标识
    - 自动账户创建

- **用户功能**:
    - 钱包登录/注册
    - 学习进度追踪
    - 社区互动
    - Buy me a coffee 打赏

- **学习系统**:
    - 在线学习内容
    - 进度跟踪
    - 工具集成
    - 社区讨论

## 技术栈

- **前端**:
    - Next.js (React框架)
    - TailwindCSS (样式)
    - ethers.js (Web3集成)
    - React Context (状态管理)

- **后端**:
    - FastAPI (Python后端框架)
    - JWT (用户认证)
    - Web3 集成
    - 内存数据存储

- **区块链**:
    - MetaMask
    - 以太坊主网
    - Sepolia 测试网

- **部署**:
    - Vercel (前端和后端部署)

## 项目结构

```
project/
├── frontend/                # Next.js前端
│   ├── src/
│   │   ├── app/           # 页面组件
│   │   ├── components/    # React组件
│   │   ├── contexts/      # Context providers
│   │   └── utils/         # 工具函数
│   └── public/            # 静态资源
├── backend/                # FastAPI后端
│   ├── app/               # 应用代码
│   │   ├── auth.py       # 认证逻辑
│   │   └── main.py       # 主应用
│   └── requirements.txt   # 依赖清单
└── vercel.json            # Vercel配置
```

## 开发指南

1. **环境准备**:
   ```bash
   # 前端
   cd frontend
   npm install
   
   # 后端
   cd backend
   pip install -r requirements.txt
   ```

2. **开发服务器**:
   ```bash
   # 前端开发
   npm run dev
   
   # 后端开发
   uvicorn app.main:app --reload
   ```

3. **MetaMask 配置**:
   - 安装 MetaMask 浏览器插件
   - 创建或导入钱包
   - 连接到以太坊主网或 Sepolia 测试网

4. **环境变量**:
   ```env
   # frontend/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   
   # backend/app/auth.py
   SECRET_KEY="your-secret-key"  # 用于JWT生成和验证
   ```

## 部署说明

1. **前端部署**:
   - 配置 Vercel 项目
   - 设置环境变量
   - 部署 `frontend` 目录

2. **后端部署**:
   - 配置 FastAPI 应用
   - 设置 SECRET_KEY 环境变量
   - 部署 `backend` 目录

3. **开发说明**:
   - 当前使用内存数据存储
   - 重启服务器会重置数据
   - 生产环境建议实现数据持久化

## 文档和API

- API 文档: `/docs` 或 `/redoc` (FastAPI自动生成的API文档)
- 前端组件文档: `frontend/docs`
- 数据结构: 
  - 用户数据: `backend/app/auth.py` 中的 `User` 和 `UserInDB` 模型
  - 业务数据: `backend/app/main.py` 中的 API 返回模型

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交改动 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证
