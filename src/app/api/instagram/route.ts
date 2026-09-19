import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour to prevent hitting rate limits

export async function GET() {
  try {
    // ---------------------------------------------------------
    // IMPORTANT: Setup instructions for Instagram Graph API
    // ---------------------------------------------------------
    // 1. Get an INSTAGRAM_ACCESS_TOKEN via Facebook Developer Portal
    // 2. Get your INSTAGRAM_ACCOUNT_ID
    // 3. Add them to your .env file:
    //    INSTAGRAM_ACCESS_TOKEN=your_token_here
    //    INSTAGRAM_ACCOUNT_ID=your_account_id_here
    // ---------------------------------------------------------
    
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

    if (!accessToken || !accountId) {
      // Fallback value for development without credentials
      return NextResponse.json({ followers: "1.7K" });
    }

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?fields=followers_count&access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Instagram API');
    }

    const data = await response.json();
    
    // Format the number (e.g., 15200 -> "15.2K", 1771 -> "1.7K")
    const formatFollowers = (count: number) => {
      if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
      if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
      return count.toString();
    };

    const formattedFollowers = formatFollowers(data.followers_count);

    return NextResponse.json({ followers: formattedFollowers });
  } catch (error) {
    console.error('Error fetching Instagram followers:', error);
    // Fallback value if API fails
    return NextResponse.json({ followers: "1.7K" });
  }
}
