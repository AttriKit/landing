---
title: "API 概览"
description: "AttriKit API 接口文档总览"
order: 1
category: "api"
draft: false
---

## API 基础信息

### Base URL

```
https://api.attrikit.com/v1
```

### 认证方式

所有 API 请求需要在 Header 中携带 API Key：

```http
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

### 请求限流

| 计划 | 请求限制 |
|------|----------|
| 免费版 | 1,000 次/天 |
| 专业版 | 100,000 次/天 |
| 企业版 | 无限制 |

## API 端点列表

### 事件上报

| 端点 | 方法 | 说明 |
|------|------|------|
| `/events/track` | POST | 上报单个事件 |
| `/events/batch` | POST | 批量上报事件 |
| `/events/validate` | POST | 验证事件数据格式 |

### 数据查询

| 端点 | 方法 | 说明 |
|------|------|------|
| `/events` | GET | 查询事件列表 |
| `/events/:id` | GET | 获取事件详情 |
| `/conversions` | GET | 查询转化数据 |
| `/attribution` | GET | 查询归因结果 |

### 用户管理

| 端点 | 方法 | 说明 |
|------|------|------|
| `/users` | GET | 获取用户列表 |
| `/users/:id` | GET | 获取用户详情 |
| `/users/:id/events` | GET | 获取用户事件 |

### 报表导出

| 端点 | 方法 | 说明 |
|------|------|------|
| `/reports/performance` | GET | 效果报表 |
| `/reports/conversion` | GET | 转化报表 |
| `/reports/export` | POST | 导出报表 |

## 通用响应格式

### 成功响应

```json
{
  "success": true,
  "data": {
    // 返回数据
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述",
    "details": {}
  }
}
```

## HTTP 状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 429 | 请求过于频繁 |
| 500 | 服务器错误 |

## 错误码参考

| 错误码 | 说明 | 解决方案 |
|--------|------|----------|
| `INVALID_API_KEY` | API Key 无效 | 检查 API Key 是否正确 |
| `MISSING_REQUIRED_FIELD` | 缺少必填字段 | 补充必填参数 |
| `INVALID_EVENT_NAME` | 事件名称无效 | 使用合法的事件名称 |
| `RATE_LIMIT_EXCEEDED` | 超出限流 | 减少请求频率或升级套餐 |
| `SERVER_ERROR` | 服务器错误 | 稍后重试或联系技术支持 |

## 快速开始

### 1. 获取 API Key

登录控制台，进入「设置 > API 管理」创建 API Key。

### 2. 发起第一个请求

```bash
curl -X POST https://api.attrikit.com/v1/events/track \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_name": "page_view",
    "properties": {
      "page_title": "首页",
      "page_url": "https://example.com"
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }'
```

### 3. 验证响应

```json
{
  "success": true,
  "data": {
    "event_id": "evt_1234567890",
    "received_at": "2024-01-15T10:30:01Z"
  }
}
```

## SDK vs API

| 特性 | SDK | API |
|------|-----|-----|
| 易用性 | 高，开箱即用 | 中，需要自行实现 |
| 自动重试 | 支持 | 需要自行实现 |
| 离线缓存 | 支持 | 需要自行实现 |
| 灵活性 | 中 | 高 |
| 适用场景 | 前端数据采集 | 后端数据同步 |

## Webhook

AttriKit 支持 Webhook 回调，当关键事件发生时会主动推送通知。

### 配置 Webhook

在控制台设置 Webhook URL：

```
https://your-domain.com/webhooks/attrikit
```

### Webhook 事件

| 事件 | 触发时机 |
|------|----------|
| `conversion.created` | 新增转化 |
| `attribution.completed` | 归因完成 |
| `threshold.alert` | 阈值告警 |

### Webhook 签名验证

为确保请求来自 AttriKit，需要验证签名：

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
}
```

## 相关文档

- [事件上报 API](/docs/api/events/) - 详细的事件上报接口
- [数据查询 API](/docs/api/queries/) - 数据查询和筛选
- [Webhook 指南](/docs/api/webhooks/) - Webhook 配置和验证
