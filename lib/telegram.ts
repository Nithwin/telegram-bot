import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Initialize bot only if token allows (polling is false for serverless)
// For sending messages we strictly don't need the polling instance, 
// but using the library makes it easier.
// Note: In a serverless environment like Vercel, extensive polling is bad. 
// We are just using it to send messages.

let bot: TelegramBot | null = null;
if (token) {
  bot = new TelegramBot(token, { polling: false });
}

export async function sendTelegramMessage(message: string) {
  if (!bot) { 
    console.warn('Telegram token not setup, skipping message send.');
    console.log('Would send:', message);
    return;
  }
  
  if (!chatId) {
    console.warn('Telegram Chat ID not setup, skipping message send.');
    return;
  }

  try {
    await bot.sendMessage(chatId, message);
    console.log('Message sent to Telegram');
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    throw error;
  }
}
