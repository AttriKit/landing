---
title: "应用管理"
description: "学习如何管理应用信息和配置"
order: 3
category: "attrikit-web"
draft: false
---

应用管理是 AttriKit Web 的核心功能之一，用于管理移动应用的基础信息和配置。通过添加应用，为应用配置监测链接进行广告投放。

应用管理页面提供完整的应用生命周期管理功能，帮助您轻松管理多个移动应用。

**在这之前**

> 确保您已经拥有 AttriKit Web 的访问权限，并且具备应用管理权限。如果没有「应用管理」选项，请联系管理员为您授权。

**应用说明**

在 AttriKit 中，「应用」是指您需要追踪归因数据的移动应用程序。每个应用都有唯一的标识符（应用 ID），用于在归因数据中区分不同的应用。

## 操作指南

### 步骤一：进入应用管理页面

1. 登录 AttriKit Web 后台
2. 点击页面右上角的个人头像
3. 在下拉菜单中选择「应用管理」
4. 进入应用管理页面

> 如果未看到「应用管理」选项，可能是当前登录用户没有应用管理权限，请联系管理员处理。

![应用管理入口](https://vcnlov4n8sa3.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQyNGM3MDgwZTcwMWFkNWM3MDFiYzFiMzRmM2ZlZWJfaXBTclluSWpXVjFKZExtTlF6N21hcVFxMFluYk5iNmZfVG9rZW46VFZ4Z2IzOVI3b01JTlV4UEJURWNkTFR2bmxjXzE3Njk0OTEwOTM6MTc2OTQ5NDY5M19WNA)

### 步骤二：查看应用列表

应用管理页面展示所有已添加的应用：

- **应用名称** - 您设置的应用标识名称
- **应用 ID** - 应用的唯一标识符（包名或 App Store ID）
- **应用平台** - Android 或 iOS
- **创建时间** - 应用添加的日期
- **操作按钮** - 编辑和删除应用的快捷入口

![应用管理页面](https://vcnlov4n8sa3.feishu.cn/space/api/box/stream/download/asynccode/?code=NTA1NDM0NzQyNzhkMWQ2NzBjZGM2YTIwNWU0NjFiYTRfTDFtdm9HT2k1eDVtWGZTWEZKTmJyZWltS3ZjWGdzME9fVG9rZW46VGhHVmJpU3I5b1k0RWJ4bTFiTGNUc0tFbnNpXzE3Njk0OTEwOTM6MTc2OTQ5NDY5M19WNA)

### 步骤三：添加新应用

1. 点击页面右上角的「添加应用」按钮
2. 填写应用基本信息（见下方字段说明）
3. 确认信息无误后点击「保存」
4. 保存成功后，应用将出现在应用列表中

![新建应用](https://vcnlov4n8sa3.feishu.cn/space/api/box/stream/download/asynccode/?code=NmFkNjU2OGU0OGQwZjhkYmU0NTg1Mzc4MmM2YzkxOThfMlUySlIxaU9aNHAzTFBPWG1kcENYRHVJdmVXUGVaY2VfVG9rZW46TXBhNmJkZHlpbzhHYnh4WkRnQmNWMEtubnFjXzE3Njk0OTEwOTM6MTc2OTQ5NDY5M19WNA)

### 步骤四：编辑应用信息

1. 在应用列表中找到目标应用
2. 点击「操作」列中的「编辑」按钮
3. 修改需要更新的信息
4. 点击「保存」提交更改

### 步骤五：删除应用

1. 在应用列表中找到目标应用
2. 点击「操作」列中的「删除」按钮
3. 确认删除操作

> 删除应用将同时删除该应用相关的所有监测链接，但不会删除历史已归因数据，请谨慎操作。

## 字段说明

添加或编辑应用时，需要填写以下信息：

| 字段 | 说明 | 示例 | 必填 |
|------|------|------|------|
| **应用名称** | 用于标识该应用的名称 | 「AttriKit Demo App」 | 是 |
| **应用平台** | 选择 Android 或 iOS | Android / iOS | 是 |
| **应用 ID** | 应用的唯一标识符（见下方详细说明） | com.attrikit.appfast | 是 |

应用 ID 是应用的唯一标识符，格式根据应用平台不同而有所区别：

对于 Android 应用，应用 ID 应填写应用的**包名（Package Name）**：

| 项目 | 说明 |
|------|------|
| **格式** | 逆域名格式（reverse domain notation） |
| **示例** | `com.attrikit.appfast` |
| **获取方式** | 在 `AndroidManifest.xml` 文件中的 `package` 属性查看 |
| **注意事项** | 必须与 APK 中的包名完全一致，否则归因将无法匹配 |

对于 iOS 应用，应用 ID 应填写应用在 **App Store 的 Bundle ID**：

| 项目 | 说明 |
|------|------|
| **格式** | 逆域名格式或纯数字 |
| **示例** | `com.attrikit.appfast` 或 `1789012456` |
| **获取方式** | 在 App Store Connect 的应用信息中查看 |
| **注意事项** | 如果使用 Bundle ID，必须与提交到 App Store 的 Bundle ID 完全一致 |

**平台差异对比**

| 对比项 | Android | iOS |
|--------|---------|-----|
| ID 类型 | 包名（Package Name） | Bundle ID / App Store ID |
| ID 示例 | `com.company.app` | `com.company.app` 或 `1234567890` |
| 查看位置 | AndroidManifest.xml | App Store Connect / Xcode |
| 格式要求 | 必须包含至少一个点号 | 可以是纯数字 |

## 最佳实践

**实践 1：应用命名规范**

建议使用清晰、规范的应用命名方式：

- **使用产品名称** - 「AttriKit 官方应用」
- **包含平台标识** - 「AttriKit iOS 版」
- **区分测试/生产** - 「AttriKit 测试版 / 正式版」

**实践 2：应用管理建议**

- **测试隔离** - 测试应用和生产环境使用不同的应用 ID

**实践 3：应用 ID 注意事项**

- **确保唯一性** - 每个应用的应用 ID 必须唯一
- **保持一致** - 应用 ID 必须与实际应用配置完全一致
- **提前规划** - 在开发初期确定应用 ID，避免后续修改

## 常见问题

### Q1：可以修改已添加的应用ID吗？

**A：** 不可以，建议重新创建应用。

### Q2：一个应用可以添加多个应用ID吗？

**A：** 不可以。每个应用只能有一个应用ID。如果需要追踪多个应用，请分别添加。

### Q3：删除应用后，监测链接还能用吗？

**A：** 不能。删除应用会同时删除该应用的所有监测链接，但不会删除历史已归因数据，请谨慎操作。

### Q4：为什么我看不到应用管理选项？

**A：** 这可能是权限问题。请联系管理员为您分配应用管理权限。

### Q5：Android 和 iOS 应用可以只添加一个应用吗？

**A：** 不可以。Android 和 iOS 是不同的平台，即使功能相同也需要分别添加，各自使用对应平台的应用ID。

### Q6：应用 ID 填写错误会影响数据吗？

**A：** 会。应用 ID 错误会导致归因数据无法正确匹配到应用，从而影响数据准确性。

## 相关文档

- [监测链接管理](/docs/attrikit-web/tracking-links/) - 了解如何为应用创建监测链接
- [快速开始](/docs/attrikit-web/overview/) - 了解 AttriKit Web 基础使用
