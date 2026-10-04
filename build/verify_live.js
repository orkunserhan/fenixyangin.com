const urls = [
  'https://www.fenixyangin.com/teknik-icerikler/',
  'https://www.fenixyangin.com/novec-1230-ve-fm200-farki/',
  'https://www.fenixyangin.com/teknik-icerikler/fm200-f-gaz-mevzuati/',
  'https://www.fenixyangin.com/teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/',
  'https://www.fenixyangin.com/teknik-icerikler/gazli-sondurme-standartlari-ve-onaylar/',
  'https://www.fenixyangin.com/teknik-icerikler/mahal-bazli-sondurme-sistemi-secimi/',
  'https://www.fenixyangin.com/teknik-icerikler/oda-sizdirmazlik-testi-yontemi/',
  'https://www.fenixyangin.com/teknik-icerikler/devreye-alma-ve-kabul-testleri/',
  'https://www.fenixyangin.com/teknik-icerikler/periyodik-kontrol-programi/',
  'https://www.fenixyangin.com/teknik-icerikler/gazli-sondurme-ariza-rehberi/',
  'https://www.fenixyangin.com/teknik-icerikler/veri-merkezi-yangin-koruma-tasarimi/',
  'https://www.fenixyangin.com/teknik-icerikler/yangin-sondurme-sistemi-zorunlulugu/',
  'https://www.fenixyangin.com/elektrik-panosu-otomatik-yangin-sondurme-sistemi/',
  'https://www.fenixyangin.com/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/',
  'https://www.fenixyangin.com/teknik-icerikler/gazli-sondurme-ajanlari-insanlara-zararli-mi/',
  'https://www.fenixyangin.com/yangin-sondurucu-siniflari-nelerdir/',
  'https://www.fenixyangin.com/teknik-icerikler/inert-gazli-sondurme-sistemleri/',
  'https://www.fenixyangin.com/teknik-icerikler/lityum-iyon-bess-yangin-koruma/'
];

async function check() {
  console.log('--- VERIFYING ALL 16 TECHNICAL URLS ON LIVE PRODUCTION ---');
  let passed = 0;
  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: { 'User-Agent': 'Mozilla/5.0 (LiveFullVerification)' },
        cache: 'no-store'
      });
      const text = await res.text();
      const isHub = u.endsWith('/teknik-icerikler/');
      const hasAnswer = isHub || text.includes('fx-tech-answer');
      const hasAuthor = isHub || text.includes('fx-tech-author');
      const hasFaq = isHub || text.includes('fx-tech-faq');
      const hasSchema = isHub ? text.includes('"hasPart"') : (text.includes('"FAQPage"') && text.includes('"Article"'));
      
      const ok = res.status === 200 && hasAnswer && hasAuthor && hasFaq && hasSchema;
      if (ok) {
        passed++;
        console.log(`[PASS] ${u}`);
      } else {
        console.log(`[FAIL] ${u} (HTTP ${res.status}, Answer:${hasAnswer}, Author:${hasAuthor}, FAQ:${hasFaq}, Schema:${hasSchema})`);
      }
    } catch (e) {
      console.error(`[ERROR] ${u}:`, e.message);
    }
  }
  console.log(`\nRESULT: ${passed}/${urls.length} pages verified in production.`);
}

check();
