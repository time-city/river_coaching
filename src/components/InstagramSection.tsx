import React from 'react';
import InstagramUI from './InstagramUI';

async function getFollowerCount() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/instagram`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return data.followers;
  } catch (error) {
    return '1.7K';
  }
}

export default async function InstagramSection() {
  const followerCount = await getFollowerCount();

  const posts = [
    { id: 1, img: '/post1.jpg', link: 'https://www.instagram.com/p/DYwnBbtEsyX/?img_index=2', caption: 'Hardware secured. Bringing it home. 3x 🥉 from VCS 2026.' },
    { id: 2, img: '/post2.mov', link: 'https://www.instagram.com/p/DYMwYbHy66j/', caption: '12dayouts #danang #vietnamchampionshowdown2026' },
    { id: 3, img: '/post3.png', link: 'https://www.instagram.com/p/DYE-JYZEvCN/?img_index=1', caption: '15 dayouts - U20 #roadtovcs' },
    { id: 4, img: '/post_insta/post4.mp4', link: 'https://www.instagram.com/p/DXlXEJwkn8f/', caption: '27dayout ❤️‍🔥 #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 5, img: '/post_insta/post5.jpg', link: 'https://www.instagram.com/p/DSNIM6EAc0S/?img_index=1', caption: 'Cảm ơn người anh, người thầy @cray_g_03 đã dẫn dắt em suốt mùa cutting...' },
    { id: 6, img: '/post_insta/post6.mp4', link: 'https://www.instagram.com/p/DXixurKkmBj/', caption: 'Hasagi ❤️‍🔥 28dayouts #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 7, img: '/post_insta/post7.jpg', link: 'https://www.instagram.com/p/DSPOnWJEoJ1/?img_index=4', caption: 'Peak condition. Love this skin 🖤🔥' },
    { id: 8, img: '/post_insta/post8.mp4', link: 'https://www.instagram.com/p/DX5gfsIyWLK/', caption: 'Giai đoạn nước rút 🥲 #danang #discipline #thanhnhanmoi #rivernguyen' },
    { id: 9, img: '/post_insta/post9_new.mp4', link: 'https://www.instagram.com/p/DciUV6OygDH/', caption: 'Black magic 😉 #discipline #thebeastteamdn #rivernguyen #coachingonline #aesthetic' },
  ];

  return <InstagramUI followerCount={followerCount} posts={posts} />;
}
