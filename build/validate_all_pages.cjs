const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'build' || file === 'scratch_audit') continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      if (file === '404.html') continue; // 404 is error page
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const rootDir = path.join(__dirname, '..');
const htmlFiles = getAllHtmlFiles(rootDir);
console.log(`Auditing canonical site HTML files: ${htmlFiles.length}`);

let totalErrors = 0;
const results = [];

for (const file of htmlFiles) {
  const relPath = path.relative(rootDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  // Title check
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const titleLen = title.length;

  // Desc check: handles content="..." or content='...'
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]*)"/i) ||
                    content.match(/<meta\s+name=["']description["']\s+content='([^']*)'/i);
  const desc = descMatch ? descMatch[1].trim() : '';
  const descLen = desc.length;

  // Canonical check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href="([^"]*)"/i) ||
                         content.match(/<link\s+rel=["']canonical["']\s+href='([^']*)'/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

  // Img without alt check
  const imgMatches = content.match(/<img(?![^>]*\balt=)[^>]*>/gi);
  const missingAltCount = imgMatches ? imgMatches.length : 0;

  const errors = [];
  if (!title) errors.push('Missing <title>');
  if (titleLen > 60) errors.push(`Title too long (${titleLen} > 60): "${title}"`);
  if (!desc) errors.push('Missing meta description');
  if (descLen < 120 || descLen > 160) errors.push(`Meta desc length out of range (${descLen}): "${desc}"`);
  if (!canonical) errors.push('Missing canonical tag');
  if (missingAltCount > 0) errors.push(`${missingAltCount} image(s) missing alt tag`);

  if (errors.length > 0) {
    totalErrors += errors.length;
    console.error(`[FAIL] ${relPath}:`);
    errors.forEach(e => console.error(`   - ${e}`));
  } else {
    results.push({ relPath, title, titleLen, descLen });
  }
}

console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Total HTML files checked: ${htmlFiles.length}`);
console.log(`Total files passed: ${results.length}`);
console.log(`Total errors: ${totalErrors}`);

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log(`SUCCESS: 100% of all ${htmlFiles.length} pages adhere strictly to Title <= 60, Desc 120-160, valid canonical, and 0 missing alt tags!`);
}
