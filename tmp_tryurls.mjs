import https from 'https';
import fs from 'fs';

const urls = [
  'https://tuyensinhdanang.com',
  'http://tuyensinhdanang.com',
  'https://tuyensinhdanang.vn',
  'http://tuyensinhdanang.vn'
];

async function checkUrls() {
  for (const u of urls) {
    try {
      console.log('Trying', u);
      const res = await fetch(u, { redirect: 'follow' });
      const text = await res.text();
      const match = text.match(/<link\s+rel="[^"]*icon"[^>]*href="([^"]+)"/i);
      let favicon = match ? new URL(match[1], u).href : new URL('/favicon.ico', u).href;
      
      console.log('Found favicon:', favicon);
      const iconRes = await fetch(favicon);
      if (iconRes.ok) {
        const buf = Buffer.from(await iconRes.arrayBuffer());
        fs.writeFileSync('src/app/icon.png', buf);
        console.log('SUCCESS with', u);
        return;
      }
    } catch (e) {
      console.error('Failed', u, e.message);
    }
  }
}
checkUrls();
