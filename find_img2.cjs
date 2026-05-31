const fs = require('fs');
const path = require('path');

function findImages(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === 'dist') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findImages(fullPath);
        } else if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.jpeg') || file.endsWith('.webp')) {
            if (file.toLowerCase().includes('elemento')) {
                console.log(fullPath);
            }
        }
    }
}

findImages(__dirname);
