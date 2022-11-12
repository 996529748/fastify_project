# 前言

单纯用来学习的一个项目，暂时还没有项目定位。当前需自行下载mongodb数据库，并需要手动建表。后续会在空余时间慢慢学习并完善该项目。
当前项目链接库为【fastify_demo】，分别有【users】用户表，【tokens】用户token表。


## 技术栈

Typescript + Mongodb + Fastify + Jwt

## 提交规范

全局安装 git-cz

请使用 npm run commit 进行提交

相关提交类型文档请参阅 .cz-config.js

## 项目运行

```
版本匹配：
node：14.18.0 
```

```
npm install
```

```
npm run start
```

# 项目布局

```shell
├── config  // 全局配置
│   ├── constant.ts // 通用常量，包括路由白名单及token
│   ├── index.ts // RSA加密key
│   ├── RSA.ts // RSA公钥私钥
├── routers  // 路由（接口部分）
│   ├── main.ts // 主路由（接口统一验证token、拦截等）
│   ├── user.ts // 用户信息
├── services  // 服务（操作数据库部分）
│   ├── token.ts // token存储更新
│   ├── user.ts // 用户信息
├── types // 全局类型 
│   ├── token.d.ts
│   ├── user.d.ts 
│   ├── index.d.ts 
├── utils // 工具函数
│   ├── connect.ts // 数据库链接、中断
│   ├── rsa.ts // 数据加密（暂未使用）
├── app.ts // 应用实例化
└──
```

