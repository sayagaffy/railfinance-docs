const fs = require('fs');
const path = require('path');

const rawHtmlPath = 'manager_keuangan_raw.html';
const cleanedHtmlPath = 'manager_keuangan_tagged.html';

try {
    const html = fs.readFileSync(path.join(__dirname, rawHtmlPath), 'utf8');
    let imageCount = 0;

    // Regex to match img tags with base64 src
    const regex = /<img\s+src="data:image\/([a-zA-Z]+);base64,([^"]+)"[^>]*>/g;
    
    const tagged = html.replace(regex, (match, type, content) => {
        imageCount++;
        const ext = type === 'jpeg' ? 'jpg' : type;
        return `![Image ${imageCount}](/img/railfinance/manager-keuangan/media/image${imageCount}.${ext})`;
    });

    fs.writeFileSync(path.join(__dirname, cleanedHtmlPath), tagged);
    console.log(`Tagged file created with ${imageCount} images replaced.`);

} catch (error) {
    console.error('Error tagging images:', error);
}
