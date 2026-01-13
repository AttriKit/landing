import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const webhookUrl = import.meta.env.FEISHU_WEBHOOK_URL;
  const signKey = import.meta.env.FEISHU_SIGN_KEY;

  return new Response(
    JSON.stringify({
      webhookUrlExists: !!webhookUrl,
      webhookUrlPrefix: webhookUrl?.substring(0, 40) + '...',
      signKeyExists: !!signKey,
      signKeyPrefix: signKey?.substring(0, 5) + '...',
      allEnvKeys: Object.keys(import.meta.env).filter(k => !k.startsWith('astro_'))
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
