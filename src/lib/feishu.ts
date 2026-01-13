import type { ConsultationData } from './types';

interface FeishuWebhookResponse {
  success: boolean;
  error?: string;
}

/**
 * Calculate signature for Feishu webhook using Web Crypto API
 * Compatible with Cloudflare Workers runtime
 */
async function calculateSignature(timestamp: number, key: string): Promise<string> {
  const stringToSign = `${timestamp}\n${key}`;
  const encoder = new TextEncoder();
  const keyData = encoder.encode(stringToSign);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    encoder.encode('')
  );

  // Convert to base64
  const bytes = new Uint8Array(signature);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

/**
 * Format consultation data into Feishu message
 */
function formatMessage(data: ConsultationData): string {
  const timestamp = new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return `📝 新的咨询请求

⏰ 提交时间：${timestamp}
👤 姓名：${data.name}
🏢 公司名称：${data.company || '未填写'}
📧 邮箱：${data.email}
📱 联系电话：${data.phone}
💬 咨询内容：
${data.message || '无'}

---
来源：AttriKit 官网咨询表单

<at user_id="all">所有人</at>`.trim();
}

/**
 * Send consultation data to Feishu webhook
 */
export async function sendToFeishu(
  data: ConsultationData
): Promise<FeishuWebhookResponse> {
  try {
    // Get environment variables
    const webhookUrl = import.meta.env.FEISHU_WEBHOOK_URL;
    const signKey = import.meta.env.FEISHU_SIGN_KEY;

    if (!webhookUrl || !signKey) {
      console.error('Missing Feishu configuration');
      return {
        success: false,
        error: 'Server configuration error'
      };
    }

    // Calculate timestamp and signature
    const timestamp = Math.floor(Date.now() / 1000);
    const sign = await calculateSignature(timestamp, signKey);

    // Prepare message
    const message = formatMessage(data);

    // Prepare webhook payload
    const payload = {
      timestamp: timestamp.toString(),
      sign,
      msg_type: 'text',
      content: {
        text: message
      }
    };

    // Send webhook request
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Feishu webhook error:', errorText);
      return {
        success: false,
        error: `Webhook request failed: ${response.status}`
      };
    }

    const result = await response.json();

    // Check if Feishu accepted the message
    if (result.code !== 0) {
      console.error('Feishu API error:', result);
      return {
        success: false,
        error: result.msg || 'Unknown Feishu API error'
      };
    }

    return { success: true };

  } catch (error) {
    console.error('Error sending to Feishu:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
