import fs from 'fs';

async function getIcon() {
  try {
    const htmlRes = await fetch('https://tuyensinhapagdanang.com/index.html');
    const html = await htmlRes.text();
    const match = html.match(/<link[^>]*rel="[^"]*(icon|shortcut icon)[^"]*"[^>]*href="([^"]+)"/i);
    let iconUrl = 'https://tuyensinhapagdanang.com/favicon.ico';
    if (match) {
      iconUrl = match[2];
      if (!iconUrl.startsWith('http')) {
        iconUrl = new URL(iconUrl, 'https://tuyensinhapagdanang.com').href;
      }
    }
    console.log('Fetching icon:', iconUrl);
    
    const iconRes = await fetch(iconUrl);
    if (!iconRes.ok) {
        console.log('Failed to fetch icon', iconRes.status);
        return;
    }
    const buffer = Buffer.from(await iconRes.arrayBuffer());
    const ext = iconUrl.endsWith('.png') ? '.png' : '.ico';
    
    if (fs.existsSync('src/app/icon.png')) fs.unlinkSync('src/app/icon.png');
    if (fs.existsSync('src/app/icon.ico')) fs.unlinkSync('src/app/icon.ico');
    if (fs.existsSync('src/app/favicon.ico')) fs.unlinkSync('src/app/favicon.ico');
    
    fs.writeFileSync(`src/app/icon${ext}`, buffer);
    console.log(`Saved src/app/icon${ext} Successfully!`);
  } catch (e) {
    console.error(e);
  }
}
getIcon();
