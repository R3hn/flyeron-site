import fs from 'fs';
import path from 'path';

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === 'dist') continue;
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const target = 'https://flyeron.com.br/wp-content/uploads/elementor/thumbs/Elementos-WordPress-7-qtm9pfq2qwu5fp379rkdvilxoxdzma255e5x6kri04.png';
            if (content.includes(target)) {
                content = content.split(target).join('https://flyeron.com.br/wp-content/uploads/2024/09/Elementos-WordPress.png');
                fs.writeFileSync(fullPath, content);
                console.log(`Replaced in ${fullPath}`);
            }
        }
    }
}
processDir('.');
console.log('Done.');
