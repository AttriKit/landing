import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  // Try PUBLIC_ prefix (Cloudflare Pages limitation workaround)
  const publicWebhook = import.meta.env.PUBLIC_FEISHU_WEBHOOK_URL;
  const publicKey = import.meta.env.PUBLIC_FEISHU_SIGN_KEY;
  const secretWebhook = import.meta.env.FEISHU_WEBHOOK_URL;
  const secretKey = import.meta.env.FEISHU_SIGN_KEY;

  return new Response(
    JSON.stringify({
      public: {
        webhookUrlExists: !!publicWebhook,
        webhookUrlPrefix: publicWebhook?.substring(0, 40) + '...',
        signKeyExists: !!publicKey,
        signKeyPrefix: publicKey?.substring(0, 5) + '...',
      },
      secret: {
        webhookUrlExists: !!secretWebhook,
        webhookUrlPrefix: secretWebhook?.substring(0, 40) + '...',
        signKeyExists: !!secretKey,
        signKeyPrefix: secretKey?.substring(0, 5) + '...',
      },
      allEnvKeys: Object.keys(import.meta.env)
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
