const https = require('https');
const fs = require('fs');

const posts = [
  { id: 1, url: 'https://www.instagram.com/p/DaNoQt6MWV4/' },
  { id: 2, url: 'https://www.instagram.com/p/DYMwYbHy66j/' },
  { id: 3, url: 'https://www.instagram.com/p/DYAF_oEyH8O/' },
  { id: 4, url: 'https://www.instagram.com/p/DXlXEJwkn8f/' },
  { id: 5, url: 'https://www.instagram.com/p/DXixurKkmBj/' },
];

async function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const post of posts) {
    try {
      console.log(`Fetching ${post.url}...`);
      const html = await fetchHtml(post.url);
      const match = html.match(/<meta property="og:image" content="([^"]+)"/);
      if (match && match[1]) {
        let imgUrl = match[1].replace(/&amp;/g, '&');
        console.log(`Found image for ${post.id}`);
        await downloadImage(imgUrl, `./public/ig-post-${post.id}.jpg`);
        console.log(`Downloaded ig-post-${post.id}.jpg`);
      } else {
        console.log(`No og:image found for ${post.id}`);
      }
    } catch (e) {
      console.error(`Error for ${post.id}:`, e.message);
    }
  }
}

run();
