import React from 'react';
import InstagramUI from './InstagramUI';

async function getFollowerCount(): Promise<string> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;
  if (!accessToken || !accountId) return '1.7K';
  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${accountId}?fields=followers_count&access_token=${accessToken}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return '1.7K';
    const data = await res.json();
    const count = data.followers_count;
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count ? count.toString() : '1.7K';
  } catch (error) {
    return '1.7K';
  }
}

export default async function InstagramSection() {
  const followerCount = await getFollowerCount();

  const posts = [
    { id: 1, img: '/post1.jpg', link: 'https://www.instagram.com/p/DYwnBbtEsyX/?img_index=2', caption: 'Hardware secured. Bringing it home. 3x 🥉 from VCS 2026.' },
    { id: 2, img: '/post2.mp4', poster: '/post2_poster.jpg', link: 'https://www.instagram.com/p/DYMwYbHy66j/', caption: '12dayouts #danang #vietnamchampionshowdown2026' },
    { id: 3, img: '/post3.png', link: 'https://www.instagram.com/p/DYE-JYZEvCN/?img_index=1', caption: '15 dayouts - U20 #roadtovcs' },
    { id: 4, img: '/post_insta/post4.mp4', poster: '/post_insta/post4_poster.jpg', link: 'https://www.instagram.com/p/DXlXEJwkn8f/', caption: '27dayout ❤️‍🔥 #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 6, img: '/post_insta/post6.mp4', poster: '/post_insta/post6_poster.jpg', link: 'https://www.instagram.com/p/DXixurKkmBj/', caption: 'Hasagi ❤️‍🔥 28dayouts #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 7, img: '/post_insta/post7.jpg', link: 'https://www.instagram.com/p/DSPOnWJEoJ1/?img_index=4', caption: 'Peak condition. Love this skin 🖤🔥' },
    { id: 8, img: '/post_insta/post8.mp4', poster: '/post_insta/post8_poster.jpg', link: 'https://www.instagram.com/p/DX5gfsIyWLK/', caption: 'Giai đoạn nước rút 🥲 #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 9, img: '/post_insta/post9_new.mp4', poster: '/post_insta/post9_poster.jpg', link: 'https://www.instagram.com/p/DciUV6OygDH/', caption: 'Black magic 😉 #discipline #thebeastteamdn #rivernguyen #coachingonline #aesthetic' },
  ];

  return <InstagramUI followerCount={followerCount} posts={posts} />;
}
