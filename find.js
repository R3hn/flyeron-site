import fs from 'fs';
import path from 'path';

function findFile(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        findFile(fullPath);
      } else {
        if (fullPath.endsWith('.png') || fullPath.endsWith('.webp') || fullPath.endsWith('.jpg') || fullPath.endsWith('.jpeg')) {
          console.log(fullPath);
        }
      }
    }
  } catch (e) {}
}

findFile('wp-content');

