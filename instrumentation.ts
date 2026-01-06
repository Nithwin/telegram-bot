import { sendTelegramMessage } from '@/lib/telegram';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
      try {
        const env = process.env.NODE_ENV || 'development';
        await sendTelegramMessage(`🚀 Bot Application Started!\n\nEnvironment: ${env}\nTimestamp: ${new Date().toISOString()}`);
      } catch (error) {
        console.error('Failed to send startup notification:', error);
      }
  }
}
