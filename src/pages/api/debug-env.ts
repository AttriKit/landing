import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  // Access Cloudflare runtime env
  const runtimeEnv = (locals as any).runtime?.env || {};

  return new Response(
    JSON.stringify({
      runtimeEnv: {
        FEISHU_WEBHOOK_URL: !!runtimeEnv.FEISHU_WEBHOOK_URL,
        FEISHU_SIGN_KEY: !!runtimeEnv.FEISHU_SIGN_KEY,
        webhookUrlPrefix: runtimeEnv.FEISHU_WEBHOOK_URL?.substring(0, 40) + '...',
        signKeyPrefix: runtimeEnv.FEISHU_SIGN_KEY?.substring(0, 5) + '...',
      },
      importMeta: {
        FEISHU_WEBHOOK_URL: !!import.meta.env.FEISHU_WEBHOOK_URL,
        FEISHU_SIGN_KEY: !!import.meta.env.FEISHU_SIGN_KEY,
      },
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
