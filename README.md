# 项目概述

本项目是一个基于FastAPI + ASGI + Vercel框架的网站，旨在提供学习和工具两个主题的内容。

## 技术栈

- **前端**:
    - Next.js (React框架)
    - TailwindCSS (样式)
    - React Icons (图标)
- **后端**:
    - FastAPI (Python后端框架)
    - PostgreSQL (数据库)
    - JWT (用户认证)
- **部署**:
    - Vercel (前端和后端部署)
    - Vercel Postgres (数据库服务)

## 项目结构

```
project/
├── frontend/               # Next.js前端
│   ├── components/        # React组件
│   ├── pages/            # 路由页面
│   └── styles/           # CSS样式
├── backend/               # FastAPI后端
│   ├── app/              # 应用代码
│   ├── models/           # 数据模型
│   └── routers/          # API路由
└── vercel.json           # Vercel配置
```

## 部署说明

1.  **前端**: 使用Vercel进行部署，将`frontend`目录设置为根目录。
2.  **后端**: 同样使用Vercel进行部署，确保FastAPI应用正确配置。
3.  **数据库**: 使用Vercel Postgres服务，配置数据库连接。

## 开发说明

1.  **前端**: 在`frontend`目录下使用`npm install`安装依赖，然后使用`npm run dev`启动开发服务器。
2.  **后端**: 在`backend`目录下，使用`pip install -r requirements.txt`安装依赖，然后使用`uvicorn app.main:app --reload`启动开发服务器。
