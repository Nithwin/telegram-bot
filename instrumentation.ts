import { sendTelegramMessage } from '@/lib/telegram';

export async function register() {
  console.log('Instrumentation register function called');
  try {
    const env = process.env.NODE_ENV || 'development';
    const runtime = process.env.NEXT_RUNTIME || 'unknown';
    console.log(`Attempting to send startup message. Runtime: ${runtime}, Env: ${env}`);
    await sendTelegramMessage(`🚀 Bot Application Started!\n\nEnvironment: ${env}\nRuntime: ${runtime}\nTimestamp: ${new Date().toISOString()}`);
    console.log('Startup message sent successfully');
  } catch (error) {
    console.error('Failed to send startup notification:', error);
  }
}
