import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  const skipDirs = ['node_modules', '.git'];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
         if(!skipDirs.includes(file)) {
            walkDir(fullPath, callback);
         }
      } else {
        if (fullPath.endsWith('.html')) {
            callback(fullPath);
        }
      }
    });
  } catch (err) {}
}

const prefix = 'https://flyeron.com.br';

walkDir('.', (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;

  // wp-json
  newContent = newContent.split('href=\"/wp-json/').join('href=\"' + prefix + '/wp-json/');
  
  // JSON encoded string
  newContent = newContent.split('\"\\/wp-admin').join('\"' + prefix.replace(/\//g, '\\/') + '\\/wp-admin');
  newContent = newContent.split('\"/wp-admin').join('\"' + prefix + '/wp-admin');
  
  // Check for any remaining '\/?simply_static_page=...' (JetBlogSettings ajax URL)
  newContent = newContent.split('\"\\/?simply_static_page=').join('\"' + prefix.replace(/\//g, '\\/') + '\\/?simply_static_page=');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Fixed more paths in ' + filePath);
  }
});

console.log('All done!');
