---
title: "最佳实践"
description: "提升归因数据质量和分析效果的实用建议"
order: 2
category: "guides"
draft: false
---

## SDK 集成最佳实践

### 1. 选择合适的初始化时机

```javascript
// ✅ 推荐：在 head 标签中尽早初始化
<head>
  <script>
    AttriKit.init({ appId: 'YOUR_APP_ID' });
  </script>
</head>

// ❌ 避免：在页面底部或异步加载
<body>
  <!-- ... -->
  <script>
    // 可能遗漏早期事件
    AttriKit.init({ appId: 'YOUR_APP_ID' });
  </script>
</body>
```

### 2. 合理设置批量上报参数

```javascript
// 高流量网站
AttriKit.init({
  appId: 'YOUR_APP_ID',
  batchSize: 20,      // 增加批量大小
  batchTimeout: 5000  // 减少上报频率
});

// 低流量网站
AttriKit.init({
  appId: 'YOUR_APP_ID',
  batchSize: 5,       // 减少批量大小
  batchTimeout: 2000  // 增加上报频率
});
```

### 3. 使用有意义的事件命名

```javascript
// ✅ 推荐：使用动词_名词格式
AttriKit('track', 'view_product');
AttriKit('track', 'add_to_cart');
AttriKit('track', 'complete_purchase');

// ❌ 避免：模糊的命名
AttriKit('track', 'action1');
AttriKit('track', 'click');
```

## 事件跟踪最佳实践

### 1. 事件属性规范

| 属性类型 | 命名规范 | 示例 |
|----------|----------|------|
| 金额 | 使用金额单位 | `revenue_cny`, `price_usd` |
| 日期 | 使用 ISO 8601 | `2024-01-15`, `2024-01-15T10:30:00Z` |
| ID | 使用下划线分隔 | `order_12345`, `user_abcde` |
| 布尔值 | 使用 is/has 前缀 | `is_new_user`, `has_discount` |

### 2. 核心事件清单

建议至少跟踪以下事件：

| 事件 | 触发时机 | 关键属性 |
|------|----------|----------|
| `page_view` | 页面加载 | `page_title`, `page_url` |
| `user_signup` | 注册完成 | `signup_method`, `user_id` |
| `purchase` | 购买成功 | `order_id`, `revenue`, `currency` |
| `add_to_cart` | 加入购物车 | `product_id`, `price`, `quantity` |
| `search` | 搜索内容 | `search_query`, `results_count` |

### 3. 事件去重

```javascript
// 防止重复上报
const trackedEvents = new Set();

function trackOnce(eventName, properties) {
  const eventKey = `${eventName}_${JSON.stringify(properties)}`;

  if (!trackedEvents.has(eventKey)) {
    AttriKit('track', eventName, properties);
    trackedEvents.add(eventKey);
  }
}
```

## 数据质量保障

### 1. 数据验证

上报前验证事件数据：

```javascript
function validateEvent(eventName, properties) {
  // 必填字段检查
  if (eventName === 'purchase' && !properties.order_id) {
    console.error('purchase event requires order_id');
    return false;
  }

  // 数据类型检查
  if (properties.revenue && typeof properties.revenue !== 'number') {
    console.error('revenue must be a number');
    return false;
  }

  return true;
}
```

### 2. 异常处理

```javascript
AttriKit.init({
  appId: 'YOUR_APP_ID',
  onError: (error) => {
    // 上报错误到监控系统
    console.error('[AttriKit Error]', error);

    // 可选：存储到本地队列稍后重试
    saveToOfflineQueue(error);
  }
});
```

### 3. 数据采样

对于高流量网站，可以考虑采样：

```javascript
const SAMPLING_RATE = 0.1; // 10% 采样

if (Math.random() < SAMPLING_RATE) {
  AttriKit('track', 'page_view', properties);
}
```

## 隐私合规

### 1. 用户同意

```javascript
// 检查用户是否同意跟踪
if (userHasConsented()) {
  AttriKit.init({ appId: 'YOUR_APP_ID' });
} else {
  // 只在用户同意后初始化
  document.getElementById('accept-consent').addEventListener('click', () => {
    AttriKit.init({ appId: 'YOUR_APP_ID' });
  });
}
```

### 2. 敏感数据处理

```javascript
// ❌ 避免：直接上报敏感信息
AttriKit('track', 'purchase', {
  email: 'user@example.com',
  phone: '13812345678'
});

// ✅ 推荐：使用哈希或匿名化
AttriKit('track', 'purchase', {
  email_hash: hashEmail('user@example.com'),
  phone_last_4: '5678'
});
```

## 性能优化

### 1. 异步上报

SDK 默认使用异步上报，不会阻塞主线程：

```javascript
// 确保 async: true（默认值）
AttriKit.init({
  appId: 'YOUR_APP_ID',
  async: true
});
```

### 2. 资源预加载

```html
<!-- 预连接到 CDN -->
<link rel="preconnect" href="https://cdn.attrikit.com">
<link rel="dns-prefetch" href="https://cdn.attrikit.com">
```

### 3. 懒加载 SDK

```javascript
// 仅在需要时加载 SDK
function loadAttriKit() {
  if (shouldTrackUser()) {
    const script = document.createElement('script');
    script.src = 'https://cdn.attrikit.com/sdk/latest/attrikit.min.js';
    script.onload = () => {
      AttriKit.init({ appId: 'YOUR_APP_ID' });
    };
    document.head.appendChild(script);
  }
}
```

## 监控告警

### 1. 数据量监控

设置以下指标的告警：

| 指标 | 告警条件 |
|------|----------|
| 每日事件数 | 低于平均值的 50% |
| 上报成功率 | 低于 95% |
| API 响应时间 | 高于 500ms |

### 2. 数据一致性检查

定期对比 AttriKit 数据与业务数据：

```javascript
// 每日检查订单数量
const attrikitOrders = await getAttrikitOrderCount();
const actualOrders = await getActualOrderCount();

if (Math.abs(attrikitOrders - actualOrders) / actualOrders > 0.1) {
  alert('数据差异超过 10%，请检查');
}
```

## 常见问题

### Q: 如何处理 SPA 路由变化？
A: 监听路由变化并手动上报 page_view 事件：

```javascript
router.afterEach((to) => {
  AttriKit('track', 'page_view', {
    page_title: to.meta.title,
    page_url: window.location.href
  });
});
```

### Q: 如何跟踪外部链接点击？
A: 在链接跳转前上报事件：

```javascript
function trackExternalLink(url) {
  AttriKit('track', 'click_outbound', { url });

  // 延迟跳转，确保事件发送
  setTimeout(() => {
    window.location.href = url;
  }, 100);
}
```
