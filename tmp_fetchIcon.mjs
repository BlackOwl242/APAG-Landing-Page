import fs from 'fs';

async function fetchIcon() {
  try {
    const htmlRes = await fetch('https://tuyensinhdanang.com', {
        headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const html = await htmlRes.text();
    let url = 'https://tuyensinhdanang.com/favicon.ico'; // default fallback
    const match = html.match(/<link\s+rel="[^"]*icon"[^>]*href="([^"]+)"/i);
    if (match) {
      url = match[1];
      if (!url.startsWith('http')) {
        url = new URL(url, 'https://tuyensinhdanang.com').href;
      }
    }
    console.log('Fetching icon from:', url);
    
    const iconRes = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!iconRes.ok) throw new Error(`HTTP error! status: ${iconRes.status}`);
    const arrayBuffer = await iconRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Determine the path: if it's png vs ico
    const ext = url.toLowerCase().includes('.png') ? '.png' : '.ico';
    
    // If we're updating src/app/icon, we should probably delete the other ones first
    if (fs.existsSync('src/app/icon.png')) fs.unlinkSync('src/app/icon.png');
    if (fs.existsSync('src/app/icon.ico')) fs.unlinkSync('src/app/icon.ico');
    if (fs.existsSync('src/app/favicon.ico')) fs.unlinkSync('src/app/favicon.ico');
    if (fs.existsSync('src/app/favicon.png')) fs.unlinkSync('src/app/favicon.png');

    const filePath = `src/app/icon${ext}`;
    fs.writeFileSync(filePath, buffer);
    console.log('Saved to:', filePath);
  } catch (err) {
    console.error(err);
  }
}

fetchIcon();
