import fs from 'node:fs';
import path from 'node:path';

const files = [
  'teknik-icerikler/index.html',
  'novec-1230-ve-fm200-farki/index.html',
  'teknik-icerikler/fm200-f-gaz-mevzuati/index.html',
  'teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/index.html',
  'teknik-icerikler/gazli-sondurme-standartlari-ve-onaylar/index.html',
  'teknik-icerikler/mahal-bazli-sondurme-sistemi-secimi/index.html',
  'teknik-icerikler/oda-sizdirmazlik-testi-yontemi/index.html',
  'teknik-icerikler/devreye-alma-ve-kabul-testleri/index.html',
  'teknik-icerikler/periyodik-kontrol-programi/index.html',
  'teknik-icerikler/gazli-sondurme-ariza-rehberi/index.html',
  'teknik-icerikler/veri-merkezi-yangin-koruma-tasarimi/index.html',
  'teknik-icerikler/yangin-sondurme-sistemi-zorunlulugu/index.html',
  'elektrik-panosu-otomatik-yangin-sondurme-sistemi/index.html',
  'fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/index.html',
  'teknik-icerikler/gazli-sondurme-ajanlari-insanlara-zararli-mi/index.html',
  'yangin-sondurucu-siniflari-nelerdir/index.html'
];

let issues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  
  // 1. H1 check
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  if (h1Matches.length !== 1) {
    issues.push({ file: f, issue: `H1 count: ${h1Matches.length}` });
  }

  // 2. Canonical check
  const canonicalMatch = content.match(/<link rel="canonical" href="([^"]+)"/);
  if (!canonicalMatch) {
    issues.push({ file: f, issue: 'Missing canonical' });
  }

  // 3. Robots check
  const robotsMatch = content.match(/<meta name="robots" content="([^"]+)"/);
  if (!robotsMatch || robotsMatch[1] !== 'index, follow') {
    issues.push({ file: f, issue: `Robots not index, follow: ${robotsMatch ? robotsMatch[1] : 'none'}` });
  }

  // 4. Title & Description
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
  if (!titleMatch) issues.push({ file: f, issue: 'Missing title' });
  if (!descMatch) issues.push({ file: f, issue: 'Missing description' });

  // 5. Schema check
  const jsonLdMatch = content.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!jsonLdMatch) {
    issues.push({ file: f, issue: 'Missing JSON-LD' });
  } else {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      if (!parsed['@graph'] || !Array.isArray(parsed['@graph'])) {
        issues.push({ file: f, issue: 'JSON-LD missing @graph' });
      }
    } catch (e) {
      issues.push({ file: f, issue: `Invalid JSON-LD JSON: ${e.message}` });
    }
  }

  // 6. Direct Answer, Author, FAQ (for the 15 articles)
  if (f !== 'teknik-icerikler/index.html') {
    if (!content.includes('fx-tech-answer')) issues.push({ file: f, issue: 'Missing fx-tech-answer' });
    if (!content.includes('fx-tech-author')) issues.push({ file: f, issue: 'Missing fx-tech-author' });
    if (!content.includes('fx-tech-faq')) issues.push({ file: f, issue: 'Missing fx-tech-faq' });
  }

  // 7. Check for hardcoded wide widths like width: 700px or min-width: 600px in inline styles
  const wideStyles = content.match(/style="[^"]*(?:min-)?width:\s*[4-9]\d{2,}px[^"]*"/gi);
  if (wideStyles) {
    issues.push({ file: f, issue: `Hardcoded wide width style: ${wideStyles.join(', ')}` });
  }
});

console.log('Comprehensive Audit Results:');
console.log('Checked files:', files.length);
console.log('Issues found:', issues.length);
if (issues.length > 0) {
  console.log(JSON.stringify(issues, null, 2));
} else {
  console.log('ALL 16 FILES PASSED AUDIT PERFECTLY!');
}
