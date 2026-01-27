const fs = require('fs');
const path = require('path');

const rawHtmlPath = 'manager_keuangan_raw.html';
const outputDir = '../../static/img/railfinance/manager-keuangan/media';

// Ensure directory exists
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

try {
    const html = fs.readFileSync(path.join(__dirname, rawHtmlPath), 'utf8');
    let imageCount = 0;

    console.log('Current CWD:', process.cwd());
    console.log('Script dir:', __dirname);
    console.log('Output dir resolved:', path.resolve(path.join(__dirname, outputDir)));

    // Regex to capture src
    const regex = /<img\s+src="data:image\/([a-zA-Z]+);base64,([^"]+)"[^>]*>/g;

    let match;
    while ((match = regex.exec(html)) !== null) {
        imageCount++;
        const ext = match[1] === 'jpeg' ? 'jpg' : match[1]; 
        const base64Data = match[2];
        const filename = `image${imageCount}.${ext}`;
        const filePath = path.join(__dirname, outputDir, filename);
        
        fs.writeFileSync(filePath, base64Data, 'base64');
        if (imageCount === 644) {
            console.log(`Wrote image 644 to: ${filePath}`);
        }
    }

    console.log(`Total images extracted: ${imageCount}`);
} catch (error) {
    console.error('Error extracting images:', error);
}
