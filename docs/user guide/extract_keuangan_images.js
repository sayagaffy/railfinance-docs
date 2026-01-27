const fs = require('fs');
const path = require('path');

const rawHtmlPath = 'keuangan_raw.html';
const outputDir = '../../static/img/railfinance/keuangan/media';

// Ensure directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    const html = fs.readFileSync(rawHtmlPath, 'utf8');
    let imageCount = 0;

    // Regex to capture src
    // Note: mammoth produces <img src="data:image/png;base64,..." />
    // We use a non-greedy match for the attributes if needed, but the structure is usually consistent from mammoth
    const regex = /<img\s+src="data:image\/([a-zA-Z]+);base64,([^"]+)"[^>]*>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
        imageCount++;
        const ext = match[1] === 'jpeg' ? 'jpg' : match[1]; // Normalize jpeg to jpg if preferred, or keep as is.
        const base64Data = match[2];
        const filename = `image${imageCount}.${ext}`;
        const filePath = path.join(outputDir, filename);
        
        fs.writeFileSync(filePath, base64Data, 'base64');
    }

    console.log(`Total images extracted: ${imageCount}`);
} catch (error) {
    console.error('Error extracting images:', error);
}
