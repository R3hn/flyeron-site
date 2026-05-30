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

  // Generic replacement for /wp-content/ and /wp-includes/ and /wp-json/
  // using string split/join to avoid complex regex logic issues
  
  newContent = newContent.split('\"/wp-content/').join('\"' + prefix + '/wp-content/');
  newContent = newContent.split('\'/wp-content/').join('\'' + prefix + '/wp-content/');
  newContent = newContent.split(' \\/wp-content/').join(' ' + prefix + '/wp-content/');
  newContent = newContent.split(', \\/wp-content/').join(', ' + prefix + '/wp-content/');
  newContent = newContent.split(',\\/wp-content/').join(',' + prefix + '/wp-content/');
  
  newContent = newContent.split('url(/wp-content/').join('url(' + prefix + '/wp-content/');
  newContent = newContent.split('url(\"/wp-content/').join('url(\"' + prefix + '/wp-content/');
  newContent = newContent.split('url(\'/wp-content/').join('url(\'' + prefix + '/wp-content/');

  // also fix some JSON encoded cases
  newContent = newContent.split('\"\\/wp-content\\/').join('\"' + prefix.replace(/\//g, '\\/') + '\\/wp-content\\/');
  
  
  // wp-includes
  newContent = newContent.split('\"/wp-includes/').join('\"' + prefix + '/wp-includes/');
  newContent = newContent.split('\'/wp-includes/').join('\'' + prefix + '/wp-includes/');
  
  // fix spaces/newlines before /wp-content/
  newContent = newContent.replace(/[\s\n]+\/wp-content\//g, (match) => {
    return match.replace('/wp-content/', prefix + '/wp-content/');
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log('Fixed paths in ' + filePath);
  }
});

console.log('All done!');
