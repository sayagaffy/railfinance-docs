const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, 'unit_atasan_temp.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

const headers = [];
$('h1, h2, h3, h4, p strong').each((i, elem) => {
    const text = $(elem).text().trim();
    if (text.length > 0 && text.length < 100) { // Filter out long paragraphs that happen to be bold
        headers.push({
            tag: elem.tagName,
            text: text
        });
    }
});

console.log(JSON.stringify(headers, null, 2));
