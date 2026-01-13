// JSON-LD structured data for SEO

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
