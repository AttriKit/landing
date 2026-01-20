# AttriKit Landing Page

AttriKit 官方网站 - 基于 Astro 5.x 构建的静态站点，部署于 Cloudflare Pages。

> **AttriKit** 是面向中国广告主的第一方广告归因系统，帮助您快速搭建属于自己的归因能力，摆脱对广告平台和第三方归因服务的依赖，获得数据的完全掌控权。

## 关于 AttriKit

### 核心价值

- **数据完全掌控** - 所有归因数据存储在您自己的服务器，归因逻辑透明可验证
- **开箱即用** - 无需专业开发团队，Docker 一键部署，1 小时内即可上线
- **成本优势明显** - 一次性部署，长期使用，相比第三方归因服务成本降低 80%+
- **合规无忧** - 数据不流出您的服务器，符合隐私保护和数据合规要求

### 主要功能

- **多渠道归因支持** - 巨量广告（字节跳动）、腾讯广告、快手广告等主流平台
- **灵活归因配置** - 支持 7 天、30 天等多种归因窗口，点击归因、曝光归因等多种模式
- **精准设备匹配** - 基于 OAID、IDFA、Android ID 等设备标识
- **API 上报** - 提供 API 接口，适合已有系统的广告主
- **自动回传** - 归因结果自动回传至广告平台

### 适用场景

- 希望获得数据掌控权，不满足广告平台归因的透明度
- 追求成本优化，希望一次性投入长期受益
- 在多个广告平台投放，需要统一管理和分析归因数据
- 金融、医疗等对数据安全要求高的行业

### 价格方案

| 版本 | 说明 | 适合对象 |
|------|------|----------|
| 标准版 | 开源免费 | 刚起步的广告主 |
| 专业版 | 付费（联系咨询） | 月投放 5 万-50 万 |
| 企业版 | 定制报价 | 月投放 50 万以上 |

---

## 项目技术栈

- **框架**: [Astro 5.x](https://astro.build) - 现代化的静态站点生成器
- **语言**: TypeScript（严格模式）
- **部署**: Cloudflare Pages + Edge Functions
- **样式**: 原生 CSS（无框架），自定义响应式设计
- **内容**: Astro Content Collections（博客系统）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 项目结构

```
src/
├── components/       # Astro UI 组件
├── content/blog/     # Markdown 博客文章
├── pages/            # 文件路由（首页、博客、API）
├── data/             # SEO 结构化数据
├── lib/              # 工具函数（飞书集成、类型定义）
└── styles/           # 全局样式
```

## 环境变量

咨询表单提交需要配置以下环境变量（在 Cloudflare Pages 中设置）：

- `FEISHU_WEBHOOK_URL` - 飞书机器人 Webhook URL
- `FEISHU_SIGN_KEY` - 飞书 Webhook 签名密钥

## 联系我们

- **官网**: https://attrikit.com
- **邮箱**: contact@attrikit.com
