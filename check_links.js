import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

async function checkUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode >= 400) {
                console.log(`BROKEN: ${url} (Status: ${res.statusCode})`);
                resolve(false);
            } else {
                resolve(true);
            }
        }).on('error', (e) => {
            console.log(`ERROR: ${url} - ${e.message}`);
            resolve(false);
        });
    });
}

async function main() {
    const html = fs.readFileSync('./index.html', 'utf8');
    const urls = html.match(/https:\/\/flyeron\.com\.br\/wp-content\/uploads\/[^"'\s]+?\.(png|jpg|jpeg|svg|webp)/g) || [];
    const unique = [...new Set(urls)];
    console.log(`Found ${unique.length} unique image urls.`);
    
    // Batch check to avoid hanging
    for (const url of unique) {
        await checkUrl(url);
    }
    console.log('Done.');
}
main();
