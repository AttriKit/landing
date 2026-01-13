import type { APIRoute } from 'astro';
import { sendToFeishu } from '../../lib/feishu';
import type { ConsultationData } from '../../lib/types';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json() as ConsultationData;

    // Validate required fields
    if (!body.name || !body.email || !body.phone) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate phone format (11 digits for Chinese phone numbers)
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(body.phone)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid phone format'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Send to Feishu
    const feishuResult = await sendToFeishu(body);

    if (!feishuResult.success) {
      throw new Error(feishuResult.error);
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Consultation submitted successfully'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Consultation submission error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
