import fs from 'fs';
import path from 'path';

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
  'yangin-sondurucu-siniflari-nelerdir/index.html',
  'teknik-icerikler/inert-gazli-sondurme-sistemleri/index.html',
  'teknik-icerikler/lityum-iyon-bess-yangin-koruma/index.html'
];

let errors = 0;
let results = [];

// ISO 8601 regex: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss...
const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2}|Z))?$/;

for (const relPath of files) {
  const filePath = path.resolve(relPath);
  if (!fs.existsSync(filePath)) {
    console.error('File missing:', relPath);
    errors++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf8');

  // 1. JSON-LD Check
  const jsonMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let parsedJson = null;
  if (!jsonMatch) {
    console.error('Missing JSON-LD:', relPath);
    errors++;
  } else {
    try {
      parsedJson = JSON.parse(jsonMatch[1]);
      // Verify date format in Article if present
      if (parsedJson['@graph']) {
        for (const item of parsedJson['@graph']) {
          if (item['@type'] === 'Article') {
            if (item.datePublished && !isoRegex.test(item.datePublished)) {
              console.error(`Invalid datePublished format in ${relPath}: "${item.datePublished}"`);
              errors++;
            }
            if (item.dateModified && !isoRegex.test(item.dateModified)) {
              console.error(`Invalid dateModified format in ${relPath}: "${item.dateModified}"`);
              errors++;
            }
          }
        }
      }
    } catch(e) {
      console.error('Invalid JSON-LD in', relPath, e.message);
      errors++;
    }
  }

  // 2. Canonical Check
  const canMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  const canonical = canMatch ? canMatch[1] : null;

  // 3. Title & Description Check
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/);

  // 4. H1 Check
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);

  // 5. Internal Links Check
  const linkMatches = [...html.matchAll(/href="(\/[^"#?]+)/g)];
  let brokenLinks = [];
  for (const match of linkMatches) {
    const dest = match[1];
    let localFile = dest.replace(/^\//, '');
    if (localFile.endsWith('/')) {
      localFile += 'index.html';
    } else if (!localFile.includes('.')) {
      localFile += '/index.html';
    }
    if (!fs.existsSync(path.resolve(localFile)) && !fs.existsSync(path.resolve(dest.replace(/^\//, '')))) {
      brokenLinks.push(dest);
    }
  }

  // 6. Semantic Link Integrity Check (No inert gas linking to CO2)
  if (html.includes('href="/sistemler/co2/">İnert') || html.includes('href="/sistemler/co2/">inert')) {
    console.error(`Semantic mismatch in ${relPath}: "İnert gaz" points to /sistemler/co2/`);
    errors++;
  }

  const schemaTypes = parsedJson && parsedJson['@graph'] ? parsedJson['@graph'].map(g => g['@type']) : [];

  results.push({
    file: relPath,
    canonical,
    title: titleMatch ? titleMatch[1] : 'MISSING',
    descLen: descMatch ? descMatch[1].length : 0,
    h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'MISSING',
    schemaTypes: schemaTypes.join(', '),
    hasAnswer: html.includes('fx-tech-answer'),
    hasAuthor: html.includes('fx-tech-author'),
    hasFaq: html.includes('fx-tech-faq'),
    brokenLinksCount: brokenLinks.length,
    brokenLinks
  });

  if (brokenLinks.length > 0) {
    console.error('Broken links in', relPath, brokenLinks);
    errors += brokenLinks.length;
  }
}

console.log(JSON.stringify(results, null, 2));
console.log('Total files checked:', results.length, 'Errors:', errors);
if (errors > 0) process.exit(1);
