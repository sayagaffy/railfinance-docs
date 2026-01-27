const fs = require('fs');
const path = require('path');

const files = [
    'docs/internal/unit-pengaju/umds.mdx',
    'docs/external/unit-pengaju/pembayaran.mdx',
    'docs/external/unit-pengaju/verifikasi-pendanaan.mdx',
    'docs/internal/unit-pengaju/index.mdx',
    'docs/external/unit-pengaju/index.mdx'
];

files.forEach(relativePath => {
    const fullPath = path.join(process.cwd(), relativePath);
    if (!fs.existsSync(fullPath)) {
        console.log(`Skipping missing file: ${fullPath}`);
        return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Fix broken lists where number is on separate line
    content = content.replace(/^(\d+)\n\n/gm, '$1. ');

    // 2. Fix bold punctuation: **Word,** -> **Word**,
    content = content.replace(/\*\*([^*]+),\*\*/g, '**$1**,');
    content = content.replace(/\*\*([^*]+)\.\*\*/g, '**$1**.');

    // 3. Fix bold spacing
    content = content.replace(/([^\s*])(\*\*[^*]+\*\*)/g, '$1 $2');
    content = content.replace(/(\*\*[^*]+\*\*)([a-zA-Z0-9])/g, '$1 $2');

    // 4. Cleanup excessive newlines
    content = content.replace(/\n{3,}/g, '\n\n');

    // 5. Trim internal bold spaces
    content = content.replace(/\*\*([^*]*?)\*\*/g, (match, inner) => {
        return '**' + inner.trim() + '**';
    });

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Fixed formatting in: ${relativePath}`);
});
