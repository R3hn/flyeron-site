const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules') continue;
        
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            findFiles(fullPath, pattern);
        } else if (file.includes(pattern)) {
            console.log(fullPath);
        }
    }
}

findFiles(__dirname, 'Elementos-WordPress');
