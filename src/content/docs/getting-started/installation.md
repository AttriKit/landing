---
title: "安装指南"
description: "详细的 SDK 安装和环境配置说明"
order: 3
category: "getting-started"
draft: false
---

## 系统要求

| 平台 | 最低版本 | 推荐版本 |
|------|----------|----------|
| Web 浏览器 | Chrome 90+, Safari 14+, Firefox 88+ | 最新版本 |
| 小程序 | 微信 8.0+ | 最新版本 |
| Node.js | 16.x | 20.x LTS |
| iOS | 12.0+ | 最新版本 |
| Android | 8.0+ | 最新版本 |

## Web SDK 安装方式

### 方式一：CDN 引入（推荐）

```html
<script src="https://cdn.attrikit.com/sdk/latest/attrikit.min.js"></script>
```

### 方式二：NPM 安装

```bash
npm install @attrikit/web-sdk
```

```javascript
import AttriKit from '@attrikit/web-sdk';

AttriKit.init({
  appId: 'YOUR_APP_ID'
});
```

### 方式三：Yarn 安装

```bash
yarn add @attrikit/web-sdk
```

## 配置选项

### 初始化参数

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| appId | string | 是 | - | 应用唯一标识 |
| autoTrack | boolean | 否 | true | 是否自动采集页面浏览 |
| debug | boolean | 否 | false | 是否开启调试模式 |
| endpoint | string | 否 | 官方 endpoint | 自定义数据上报地址 |
| batchSize | number | 否 | 10 | 批量上报事件数量 |
| batchTimeout | number | 否 | 5000 | 批量上报超时时间(ms) |

### 高级配置

```javascript
AttriKit.init({
  appId: 'YOUR_APP_ID',
  autoTrack: true,
  debug: false,

  // 自定义 endpoint（私有部署时使用）
  endpoint: 'https://your-domain.com/api/events',

  // 批量上报配置
  batchSize: 20,
  batchTimeout: 3000,

  // 用户识别
  userId: 'user_12345',  // 自定义用户 ID
  userTraits: {
    plan: 'premium',
    signup_date: '2024-01-01'
  },

  // 生命周期钩子
  onReady: () => console.log('SDK ready'),
  onError: (error) => console.error('SDK error:', error)
});
```

## 环境变量配置

在生产环境中，建议通过环境变量管理敏感配置：

```javascript
// .env.production
VITE_ATTRIKIT_APP_ID=prod_app_id_xxx
VITE_ATTRIKIT_ENDPOINT=https://api.attrikit.com

// .env.development
VITE_ATTRIKIT_APP_ID=dev_app_id_xxx
VITE_ATTRIKIT_ENDPOINT=https://dev-api.attrikit.com
```

```javascript
// config.js
const config = {
  appId: import.meta.env.VITE_ATTRIKIT_APP_ID,
  endpoint: import.meta.env.VITE_ATTRIKIT_ENDPOINT,
  debug: import.meta.env.DEV
};
```

## 验证安装

运行以下命令检查 SDK 是否正确安装：

```bash
# 检查 CDN 加载状态
curl -I https://cdn.attrikit.com/sdk/latest/attrikit.min.js

# 检查 NPM 包版本
npm list @attrikit/web-sdk
```

在浏览器控制台输入：

```javascript
console.log(AttriKit.version);  // 输出版本号
```

## 故障排查

### SDK 未加载

1. 检查网络连接是否正常
2. 确认 CDN 地址是否可访问
3. 查看浏览器控制台是否有报错

### 数据未上报

1. 确认 appId 是否正确
2. 开启 debug 模式查看详细日志
3. 检查是否被广告拦截器拦截

### 跨域问题

如果使用自定义 endpoint，需要配置 CORS：

```javascript
// 服务端配置
Access-Control-Allow-Origin: https://your-domain.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, X-AttriKit-Signature
```
