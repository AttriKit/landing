---
title: "快速开始"
description: "5 分钟内完成 AttriKit SDK 集成"
order: 2
category: "getting-started"
draft: false
---

## 前置条件

在开始集成前，请确保您已：

1. 注册 AttriKit 账号并获取 **App ID**
2. 拥有一个可访问的网站或应用
3. 具备基本的开发能力

## Web 集成

### 1. 安装 SDK

将以下代码添加到您网站的 `<head>` 标签中：

```html
<script>
  (function(w,d,s,id){
    w.AttriKit = w.AttriKit || {};
    w.AttriKit.init = function(){(w.AttriKit.q=w.AttriKit.q||[]).push(arguments)};
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s);
    j.async = true;
    j.id = id;
    j.src = 'https://cdn.attrikit.com/sdk/latest/attrikit.min.js';
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'attrikit-sdk');

  // 初始化 SDK
  AttriKit.init({
    appId: 'YOUR_APP_ID',  // 替换为您的 App ID
    autoTrack: true,       // 自动采集页面浏览
    debug: false           // 生产环境设为 false
  });
</script>
```

### 2. 验证集成

保存代码后，刷新您的网站。打开浏览器控制台，如果看到以下日志，说明集成成功：

```
[AttriKit] SDK initialized successfully
[AttriKit] Page view tracked
```

## 跟踪转化事件

SDK 初始化后，您可以开始跟踪自定义转化事件：

```javascript
// 跟踪按钮点击
AttriKit('track', 'button_click', {
  button_name: 'purchase_now',
  page_location: 'homepage'
});

// 跟踪表单提交
AttriKit('track', 'form_submit', {
  form_type: 'contact',
  form_id: 'main_contact_form'
});

// 跟踪购买行为
AttriKit('track', 'purchase', {
  order_id: 'ORD-12345',
  revenue: 299.00,
  currency: 'CNY',
  product_count: 2
});
```

## 小程序集成

### 1. 安装 SDK

```bash
npm install @attrikit/miniprogram-sdk
```

### 2. 初始化

在 `app.js` 中：

```javascript
import AttriKit from '@attrikit/miniprogram-sdk';

AttriKit.init({
  appId: 'YOUR_APP_ID',
  autoTrack: true
});

App({
  onLaunch() {
    // SDK 已自动初始化
  }
});
```

## 下一步

- [归因原理](/docs/guides/attribution-basics/) - 了解如何解读归因数据
- [最佳实践](/docs/guides/best-practices/) - 提升数据准确性的技巧
- [API 参考](/docs/api/overview/) - 完整的 API 文档

## 常见问题

### Q: SDK 是否会影响网站性能？
A: 不会。我们的 SDK 经过优化，文件大小小于 20KB，加载时间 < 100ms。

### Q: 是否支持离线数据上报？
A: 支持。SDK 会自动缓存离线事件，网络恢复后批量上报。

### Q: 如何测试集成是否成功？
A: 开启 `debug: true` 模式，控制台会输出详细的调试信息。
