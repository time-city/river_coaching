import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getEnv(key: string): string | undefined {
  if (process.env[key]) return process.env[key];
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
      if (match) return match[1].trim();
    }
  } catch (e) {}
  return undefined;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, phone, height, weight, goal, details } = body;

    const timestamp = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const cleanPhone = (phone || '').replace(/\s+/g, '');

    // 1. Log and append to local backup file (data/leads.json)
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, 'leads.json');
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));
        } catch (e) {
          leads = [];
        }
      }
      leads.unshift({
        type: type || 'consult',
        name,
        phone,
        height,
        weight,
        goal,
        details,
        createdAt: timestamp,
      });
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf8');
    } catch (saveError) {
      console.error('Failed to save lead backup:', saveError);
    }

    // 2. Send Telegram Notification if configured
    const botToken = getEnv('TELEGRAM_BOT_TOKEN');
    const chatId = getEnv('TELEGRAM_CHAT_ID');

    if (botToken && chatId) {
      const isPromo = type === 'promo';
      const title = isPromo 
        ? '🔥 <b>CÓ KHÁCH ĐĂNG KÝ GÓI GIÁO ÁN 699K!</b>'
        : '🔔 <b>CÓ KHÁCH HÀNG MỚI ĐĂNG KÝ TƯ VẤN!</b>';

      const telegramMessage = `${title}
━━━━━━━━━━━━━━━━━
👤 <b>Họ và tên:</b> ${name || 'Chưa cung cấp'}
📞 <b>Số điện thoại:</b> <code>${phone || 'Chưa cung cấp'}</code>
📏 <b>Thể trạng:</b> ${height ? `${height} cm` : '--'} / ${weight ? `${weight} kg` : '--'}
🎯 <b>Mục tiêu:</b> ${goal || 'Chưa cung cấp'}
${details ? `📝 <b>Chi tiết:</b> ${details}\n` : ''}⏰ <b>Thời gian:</b> ${timestamp}
━━━━━━━━━━━━━━━━━
👉 <a href="https://zalo.me/${cleanPhone}">Bấm vào đây để nhắn Zalo cho khách</a>
👉 <a href="tel:${cleanPhone}">Gọi trực tiếp cho khách</a>`;

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      });
    } else {
      console.log('--- NEW LEAD RECEIVED (Telegram not configured yet) ---', {
        name,
        phone,
        height,
        weight,
        goal,
        timestamp,
      });
    }

    return NextResponse.json({ success: true, message: 'Lead recorded' });
  } catch (error: any) {
    console.error('Error handling notification:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
