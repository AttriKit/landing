import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  // Try different ways to access env vars
  const importMetaWebhook = import.meta.env.FEISHU_WEBHOOK_URL;
  const importMetaKey = import.meta.env.FEISHU_SIGN_KEY;
  const localsWebhook = (locals as any).FEISHU_WEBHOOK_URL;
  const localsKey = (locals as any).FEISHU_SIGN_KEY;
  const processWebhook = (globalThis as any).process?.env?.FEISHU_WEBHOOK_URL;

  return new Response(
    JSON.stringify({
      importMeta: {
        webhookUrlExists: !!importMetaWebhook,
        webhookUrlPrefix: importMetaWebhook?.substring(0, 40) + '...',
        signKeyExists: !!importMetaKey,
        signKeyPrefix: importMetaKey?.substring(0, 5) + '...',
      },
      locals: {
        webhookUrlExists: !!localsWebhook,
        signKeyExists: !!localsKey,
      },
      processEnv: {
        webhookUrlExists: !!processWebhook,
      },
      allEnvKeys: Object.keys(import.meta.env).filter(k => !k.startsWith('astro_'))
    }, null, 2),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
};
