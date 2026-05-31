import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== 'dist' && entry.name !== '.git') {
        copyDir(srcPath, destPath);
      }
    } else {
      if (entry.name !== 'package.json' && entry.name !== 'package-lock.json' && entry.name !== 'server.js' && entry.name !== 'build.js' && entry.name !== 'fix_paths.js' && entry.name !== 'fix_more_paths.js' && entry.name !== 'find.js' && entry.name !== 'vite.config.ts' && entry.name !== 'tsconfig.json' && entry.name !== 'vercel.json') {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

copyDir('.', 'dist');
console.log('Build completed!');
