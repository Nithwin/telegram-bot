import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/lib/telegram';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    // Obfuscate token for display
    const visibleToken = token ? `${token.substring(0, 5)}...` : 'MISSING';
    const visibleChatId = chatId ? `${chatId.substring(0, 3)}...` : 'MISSING';

    console.log('Testing Telegram...');
    await sendTelegramMessage(`👋 Manual Test Message from Vercel!\n\nToken Status: ${visibleToken}\nChatID: ${visibleChatId}`);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent!',
      debug: {
        hasToken: !!token,
        hasChatId: !!chatId,
        nodeEnv: process.env.NODE_ENV,
      }
    });
  } catch (error: any) {
    console.error('Test failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
