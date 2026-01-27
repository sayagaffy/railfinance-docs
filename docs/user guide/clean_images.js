const fs = require('fs');
try {
  const html = fs.readFileSync('anggaran_raw.html', 'utf8');
  // Replace img tags with a placeholder
  const clean = html.replace(/<img[^>]*>/g, '[IMAGE]');
  fs.writeFileSync('anggaran_clean.html', clean);
  console.log('Cleaned file created');
} catch (e) {
  console.error(e);
}
