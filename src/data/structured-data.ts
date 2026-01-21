// JSON-LD structured data for SEO

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "什么是私有化部署？和第三方归因有什么区别？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "私有化部署是指将 AttriKit 系统部署在您自己的服务器上，所有归因数据都存储在您的服务器中，您拥有完全的数据掌控权。而第三方归因服务需要将数据发送到他们的服务器处理，数据不在您的掌控范围内。私有化部署也称为第一方归因，归因逻辑透明可验证，长期使用成本更低。"
      }
    },
    {
      "@type": "Question",
      "name": "AttriKit 支持哪些广告平台？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "目前支持巨量广告（字节跳动），专业版和企业版支持腾讯广告、快手广告等更多主流平台。我们持续增加对新平台的支持，如有特定需求可联系我们咨询。"
      }
    },
    {
      "@type": "Question",
      "name": "部署需要多长时间？需要什么技术能力？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AttriKit 以 Docker 镜像形式提供，普通运维人员即可完成部署，通常 1 小时内即可上线。不需要专业的开发团队，我们提供详细的部署文档和安装指南。"
      }
    },
    {
      "@type": "Question",
      "name": "数据安全如何保障？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "所有归因数据都存储在您自己的服务器上，数据不流转至任何第三方。这天然符合隐私保护和数据合规要求，特别适合金融、医疗等对数据安全敏感的行业。"
      }
    },
    {
      "@type": "Question",
      "name": "可以和现有系统集成吗？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "是的，AttriKit 提供 API 接口，可以方便地与您现有的系统集成。同时也提供 SDK 集成方式，只需几分钟即可完成 App 端的接入。"
      }
    },
    {
      "@type": "Question",
      "name": "售后支持如何？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "标准版提供社区支持，专业版提供优先技术支持，企业版配备专属技术顾问和 7×24 小时技术支持。我们也提供完整的在线文档和使用指南。"
      }
    },
    {
      "@type": "Question",
      "name": "有免费试用或免费版本吗？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "是的，我们有开源免费的标准版，包含完整的第一方归因能力，适合刚起步的广告主或预算有限的团队。当您的业务规模增长后，可以随时升级到专业版或企业版。"
      }
    },
    {
      "@type": "Question",
      "name": "月投放预算多少适合使用 AttriKit？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "月投放预算在 5 万以下的广告主，平台归因通常已经够用。月投放 5 万-50 万是第一方归因的最佳区间，通常 1-2 年就能收回成本。月投放 50 万以上，第一方归因几乎是必选项，长期节省的费用非常可观。"
      }
    }
  ]
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AttriKit",
  "url": "https://attrikit.com",
  "logo": "https://attrikit.com/favicon.png",
  "description": "AttriKit 是面向国内广告主的第一方广告归因系统",
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@attrikit.com",
    "contactType": "customer service"
  }
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AttriKit",
  "url": "https://attrikit.com/",
  "description": "第一方广告归因系统 - 完全掌控数据，开箱即用，成本降低80%+"
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AttriKit",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web, Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "CNY"
  }
};
