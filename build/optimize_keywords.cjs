const fs = require('fs');
const path = require('path');

const WA_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/></svg>';

function updateSystemDetailPages() {
  const systemPages = [
    {
      file: 'sistemler/fm200/index.html',
      title: 'FM200 Yangın Söndürme Sistemi (HFC-227ea) | Fenix',
      desc: 'FM200 yangın söndürme ve gazlı söndürme sistemleri. Keşif, hidrolik hesap, dolum ve montaj. NFPA 2001 ve ISO 14520 standartlarına tam uyumlu çözümler.',
      enhanceContent: (html) => {
        // Semantic keywords in overview
        html = html.replace(
          'FM200 (kimyasal adıyla Heptafluoropropane - HFC-227ea), oda sıcaklığında gaz halinde bulunan, elektrik iletkenliği olmayan, renksiz ve kokusuz bir temiz yangın söndürme ajanıdır. Yangın üçgenindeki serbest radikallerle kimyasal olarak etkileşime girip alevdeki ısı enerjisini hızla soğurarak yanma reaksiyonunu 10 saniye gibi son derece kısa bir sürede sonlandırır.',
          'FM200 yangın söndürme sistemi (kimyasal adıyla Heptafluoropropane - HFC-227ea), oda sıcaklığında gaz halinde bulunan, elektrik iletkenliği olmayan, renksiz ve kokusuz bir temiz yangın söndürme ajanıdır. Yangın üçgenindeki serbest radikallerle kimyasal olarak etkileşime girip alevdeki ısı enerjisini hızla soğurarak yanma reaksiyonunu 10 saniye gibi son derece kısa bir sürede sonlandırır. Sektörde FM 200 yangın söndürme sistemi olarak da anılan bu teknoloji, kritik hacimlerde can ve ekipman güvenliğini en üst düzeye çıkarır.'
        );
        html = html.replace(
          'Geleneksel su veya köpük bazlı söndürme sistemlerinin aksine FM200, boşalma sonrasında ortamda hiçbir artık, toz, yağ veya korozif tortu bırakmaz. Bu sayede <a href="/sektorler/veri-merkezi/">veri merkezleri</a>, switch odaları, arşiv belgeleri ve hassas elektronik altyapılar hiçbir fiziksel hasar görmeden çalışmasını sürdürür. Ajan seçimi aşamasında Novec 1230 ile teknik karşılaştırma için <a href="/novec-1230-ve-fm200-farki/">Novec 1230 ve FM200 farkı</a> rehberimizi inceleyebilirsiniz.',
          'Geleneksel su veya köpük bazlı söndürme sistemlerinin aksine FM200 gazlı söndürme sistemi, boşalma sonrasında ortamda hiçbir artık, toz, yağ veya korozif tortu bırakmaz. Bu sayede <a href="/sektorler/veri-merkezi/">veri merkezleri</a>, server ve switch odaları, arşiv belgeleri ve hassas elektronik altyapılar hiçbir fiziksel hasar görmeden çalışmasını sürdürür. Ajan seçimi aşamasında teknik karşılaştırma için <a href="/novec-1230-ve-fm200-farki/">Novec 1230 ve FM200 farkı</a> ile <a href="/teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/">gazlı söndürme ajan miktarı hesabı</a> rehberlerimizi inceleyebilirsiniz.'
        );
        // Project scope enrichment in standards section
        const scopeSnippet = `
            <div style="background:#FFFFFF;border:1px solid #E5E7EB;border-left:4px solid #A90432;border-radius:8px;padding:20px;margin-top:20px;box-shadow:0 1px 3px rgba(0,0,0,0.05);">
              <h3 style="font-size:16px;font-weight:800;color:#111827;margin:0 0 10px 0;">FM200 Gazlı Söndürme Proje Kapsamı ve Uygulama Adımları</h3>
              <p style="font-size:13.5px;line-height:1.6;color:#4B5563;margin-bottom:12px;">Fenix Yangın bünyesinde yürütülen FM200 projeleri, ilk keşiften periyodik bakıma kadar 6 aşamalı anahtar teslim mühendislik döngüsüyle teslim edilir:</p>
              <ol style="font-size:13px;line-height:1.65;color:#374151;padding-left:20px;margin:0 0 14px 0;">
                <li><strong>Mahal Analizi ve Ön Keşif:</strong> Odanın net hacmi, yükseltilmiş taban, asma tavan payları ve sızdırmazlık durumu yerinde incelenir.</li>
                <li><strong>Akredite Hidrolik Hesap:</strong> NFPA 2001 ve ISO 14520-9 standartlarına göre VdS lisanslı yazılımla boru çapları, nozul delik çapları ve 10 saniyelik boşalma simülasyonu doğrulanır.</li>
                <li><strong>Mekanik ve Elektriksel Montaj:</strong> SCH 40 dikişsiz çelik borulama, boru askı destekleri ve çapraz zon duman algılama hatları standartlara tam uygun kurulur.</li>
                <li><strong>Sertifikalı Gaz Dolumu:</strong> Orijinal HFC-227ea temiz söndürücü ajan ve 25 bar / 42 bar kuru azot basınçlandırmasıyla silindir dolumu yapılır.</li>
                <li><strong>Oda Sızdırmazlık Testi (Door Fan):</strong> Gazın en az 10 dakika mahalde tutunabileceği kapı fanı testi ile sahada belgelenir.</li>
                <li><strong>TSE-HYB Periyodik Bakım:</strong> Yıllık periyotlarla manometre kontrolleri, kaçak testleri ve sistem işlerlik raporu düzenlenir.</li>
              </ol>
              <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
                <a href="/hizmetler/muhendislik/" style="font-size:13px;color:#A90432;font-weight:700;text-decoration:none;">Mühendislik Sürecimiz →</a>
                <span style="color:#D1D5DB;">·</span>
                <a href="/teknik-icerikler/oda-sizdirmazlik-testi-yontemi/" style="font-size:13px;color:#A90432;font-weight:700;text-decoration:none;">Oda Sızdırmazlık Testi Rehberi →</a>
                <span style="color:#D1D5DB;">·</span>
                <a href="/fm-200-gazli-sondurme-sistemleri-teknik-sartnamesi/" style="font-size:13px;color:#A90432;font-weight:700;text-decoration:none;">Teknik Şartname Örneği →</a>
              </div>
            </div>`;
        if (!html.includes('FM200 Gazlı Söndürme Proje Kapsamı ve Uygulama Adımları')) {
          html = html.replace('</section>\r\n\r\n                    <!-- MALİYET FAKTÖRLERİ BÖLÜMÜ -->', scopeSnippet + '\r\n          </section>\r\n\r\n          <!-- MALİYET FAKTÖRLERİ BÖLÜMÜ -->');
          html = html.replace('</section>\n\n                    <!-- MALİYET FAKTÖRLERİ BÖLÜMÜ -->', scopeSnippet + '\n          </section>\n\n          <!-- MALİYET FAKTÖRLERİ BÖLÜMÜ -->');
        }
        return html;
      }
    },
    {
      file: 'sistemler/novec-1230/index.html',
      title: 'Novec 1230 Gazlı Söndürme Sistemi (FK-5-1-12) | Fenix',
      desc: 'Novec 1230 (FK-5-1-12) gazlı yangın söndürme sistemleri. 0 ODP, GWP 1 çevre dostu, 10 saniyede hızlı söndürme, NFPA 2001 ve EN 15004 uyumlu mühendislik.',
      enhanceContent: (html) => html
    },
    {
      file: 'sistemler/davlumbaz/index.html',
      title: 'Davlumbaz Yangın Söndürme Sistemi (UL 300) | Fenix',
      desc: 'Endüstriyel mutfaklar için Amerex UL 300 ve NFPA 96 onaylı davlumbaz otomatik söndürme sistemleri, sıvı kimyasal sabunlaşma ve uzman montaj.',
      enhanceContent: (html) => html
    },
    {
      file: 'sistemler/pano-ici/index.html',
      title: 'Pano İçi Yangın Söndürme Sistemi | Fenix Yangın',
      desc: 'Elektrik panoları ve MCC kabinleri için mikro algılama borulu otomatik pano içi yangın söndürme sistemleri. Kaynağında doğrudan ve hızlı müdahale.',
      enhanceContent: (html) => html
    },
    {
      file: 'sistemler/aerosol/index.html',
      title: 'Aerosol Yangın Söndürme Sistemi | Fenix Yangın',
      desc: 'Kondanse aerosol yangın söndürme sistemleri. Borusuz ve basınçsız mimariyle rüzgar türbini, trafo ve pano odalarında NFPA 2010 onaylı koruma.',
      enhanceContent: (html) => html
    },
    {
      file: 'sistemler/co2/index.html',
      title: 'CO₂ Gazlı Yangın Söndürme Sistemi | Fenix Yangın',
      desc: 'Karbondioksitli (CO₂) gazlı yangın söndürme sistemleri. Trafo, jeneratör odaları ve kablo kanallarında NFPA 12 ve ISO 14520 onaylı mühendislik.',
      enhanceContent: (html) => html
    }
  ];

  for (const page of systemPages) {
    const filePath = path.join(__dirname, '..', page.file);
    let html = fs.readFileSync(filePath, 'utf8');

    // Update Title
    html = html.replace(/<title>[^<]+<\/title>/, `<title>${page.title}</title>`);
    html = html.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${page.title}" />`);
    html = html.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${page.title}" />`);

    // Update Meta Description
    html = html.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${page.desc}" />`);
    html = html.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${page.desc}" />`);
    html = html.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${page.desc}" />`);

    // Update WebPage Schema name
    html = html.replace(/"@type":"WebPage","@id":"([^"]+)","url":"([^"]+)","name":"[^"]+"/, `"@type":"WebPage","@id":"$1","url":"$2","name":"${page.title}"`);

    // Hero WhatsApp CTA Button
    const heroWaBtn = `
              <a class="fx-sys-btn-wa" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">
                ${WA_SVG}
                <span>WhatsApp'tan Teklif Al</span>
              </a>`;
    if (!html.includes('class="fx-sys-btn-wa"')) {
      html = html.replace(
        /(<div class="fx-sys-hero__cta-row">\s*<a class="fx-sys-btn-primary" href="\/iletisim\/">[\s\S]*?<\/a>)/,
        `$1${heroWaBtn}`
      );
    }

    // Dark Bottom Banner WhatsApp CTA Button
    const darkWaBtn = `
          <a class="fx-sys-dark-cta__btn-wa" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">
            ${WA_SVG}
            <span>WhatsApp Destek</span>
          </a>`;
    if (!html.includes('class="fx-sys-dark-cta__btn-wa"')) {
      html = html.replace(
        /(<div class="fx-sys-dark-cta__right">\s*<a class="fx-sys-btn-primary" href="\/iletisim\/">[\s\S]*?<\/a>)/,
        `$1${darkWaBtn}`
      );
    }

    // Apply any content enhancements
    if (page.enhanceContent) {
      html = page.enhanceContent(html);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated system page: ${page.file} (Title len: ${page.title.length}, Desc len: ${page.desc.length})`);
  }
}

function updateHubAndArticles() {
  // 1. sistemler/index.html
  const hubPath = path.join(__dirname, '..', 'sistemler/index.html');
  let hubHtml = fs.readFileSync(hubPath, 'utf8');
  const hubTitle = 'Otomatik & Gazlı Yangın Söndürme Sistemleri | Fenix';
  const hubDesc = 'Otomatik yangın söndürme ve gazlı söndürme sistemleri. FM200, Novec 1230, CO₂ ve pano içi sistemlerde hidrolik hesap, montaj ve periyodik bakım.';
  hubHtml = hubHtml.replace(/<title>[^<]+<\/title>/, `<title>${hubTitle}</title>`);
  hubHtml = hubHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${hubTitle}" />`);
  hubHtml = hubHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${hubTitle}" />`);
  hubHtml = hubHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${hubDesc}" />`);
  hubHtml = hubHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${hubDesc}" />`);
  hubHtml = hubHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${hubDesc}" />`);
  hubHtml = hubHtml.replace(/"@type":"CollectionPage","@id":"([^"]+)","url":"([^"]+)","name":"[^"]+"/, `"@type":"CollectionPage","@id":"$1","url":"$2","name":"${hubTitle}"`);

  // Add WhatsApp to hub bottom CTA if not present
  if (!hubHtml.includes('fx-hub-cta__btn-wa')) {
    hubHtml = hubHtml.replace(
      /(<a href="\/iletisim\/" class="fx-hub-cta__btn-red">[\s\S]*?<\/a>)/,
      `$1\n            <a href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer" class="fx-hub-cta__btn-wa">${WA_SVG}<span>WhatsApp Teklif</span></a>`
    );
  }
  fs.writeFileSync(hubPath, hubHtml, 'utf8');
  console.log(`Updated sistemler hub: sistemler/index.html`);

  // 2. kurumsal/hakkimizda/index.html
  const aboutPath = path.join(__dirname, '..', 'kurumsal/hakkimizda/index.html');
  let aboutHtml = fs.readFileSync(aboutPath, 'utf8');
  const aboutTitle = 'Hakkımızda — Yangın Söndürme Sistemleri Firması | Fenix';
  const aboutDesc = 'Fenix Yangın; 2011\'den bu yana gazlı yangın söndürme sistemlerinde mühendislik, hidrolik hesap, anahtar teslim montaj ve periyodik bakım hizmeti sunar.';
  aboutHtml = aboutHtml.replace(/<title>[^<]+<\/title>/, `<title>${aboutTitle}</title>`);
  aboutHtml = aboutHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${aboutTitle}" />`);
  aboutHtml = aboutHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${aboutTitle}" />`);
  aboutHtml = aboutHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${aboutDesc}" />`);
  aboutHtml = aboutHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${aboutDesc}" />`);
  aboutHtml = aboutHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${aboutDesc}" />`);
  aboutHtml = aboutHtml.replace(/"@type":"AboutPage","@id":"([^"]+)","url":"([^"]+)","name":"[^"]+"/, `"@type":"AboutPage","@id":"$1","url":"$2","name":"${aboutTitle}"`);

  // Add trust & Istanbul scope signals to about text
  if (!aboutHtml.includes('İstanbul Bayrampaşa merkezli mühendislik')) {
    aboutHtml = aboutHtml.replace(
      'Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş., 2011 yılından bu yana gazlı yangın söndürme sistemleri alanında mühendislik, uygulama ve bakım hizmetleri veriyor.',
      'Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş., 2011 yılından bu yana İstanbul Bayrampaşa merkezli mühendislik kadrosuyla Türkiye genelinde gazlı yangın söndürme sistemleri, otomatik söndürme projeleri ve periyodik bakım hizmetleri sunan öncü yangın firmaları arasında yer almaktadır.'
    );
  }
  // Add WhatsApp CTA in about bottom actions
  if (!aboutHtml.includes('fx-btn--whatsapp')) {
    aboutHtml = aboutHtml.replace(
      /(<a class="fx-btn fx-btn--primary" href="\/iletisim\/">[\s\S]*?<\/a>)/,
      `$1\n              <a class="fx-btn fx-btn--whatsapp" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">${WA_SVG}<span>WhatsApp Destek</span></a>`
    );
  }
  fs.writeFileSync(aboutPath, aboutHtml, 'utf8');
  console.log(`Updated about page: kurumsal/hakkimizda/index.html`);

  // 3. iletisim/index.html
  const contactPath = path.join(__dirname, '..', 'iletisim/index.html');
  let contactHtml = fs.readFileSync(contactPath, 'utf8');
  const contactTitle = 'İletişim — Yangın Söndürme Sistemleri | Fenix Yangın';
  const contactDesc = 'Fenix Yangın iletişim: 0212 618 07 01 · Yıldırım Mah. Buğday Sok. No:16, Bayrampaşa / İstanbul. Yangın söndürme sistemleri keşif ve teklif hattı.';
  contactHtml = contactHtml.replace(/<title>[^<]+<\/title>/, `<title>${contactTitle}</title>`);
  contactHtml = contactHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${contactTitle}" />`);
  contactHtml = contactHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${contactTitle}" />`);
  contactHtml = contactHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${contactDesc}" />`);
  contactHtml = contactHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${contactDesc}" />`);
  contactHtml = contactHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${contactDesc}" />`);
  contactHtml = contactHtml.replace(/"@type":"ContactPage","@id":"([^"]+)","url":"([^"]+)","name":"[^"]+"/, `"@type":"ContactPage","@id":"$1","url":"$2","name":"${contactTitle}"`);
  fs.writeFileSync(contactPath, contactHtml, 'utf8');
  console.log(`Updated contact page: iletisim/index.html`);

  // 4. yangin-sondurucu-siniflari-nelerdir/index.html
  const fireClassPath = path.join(__dirname, '..', 'yangin-sondurucu-siniflari-nelerdir/index.html');
  let fireClassHtml = fs.readFileSync(fireClassPath, 'utf8');
  const fireClassTitle = 'Yangın Sınıfları Nelerdir? Yangın Söndürücü Seçimi | Fenix';
  const fireClassDesc = 'TS EN 2 ve NFPA standartlarına göre A, B, C, D ve F yangın sınıfları, elektrik tehlikeleri ve her risk sınıfına uygun söndürme maddesi seçimi rehberi.';
  fireClassHtml = fireClassHtml.replace(/<title>[^<]+<\/title>/, `<title>${fireClassTitle}</title>`);
  fireClassHtml = fireClassHtml.replace(/<meta property="og:title" content="[^"]+" \/>/, `<meta property="og:title" content="${fireClassTitle}" />`);
  fireClassHtml = fireClassHtml.replace(/<meta name="twitter:title" content="[^"]+" \/>/, `<meta name="twitter:title" content="${fireClassTitle}" />`);
  fireClassHtml = fireClassHtml.replace(/<meta name="description" content="[^"]+" \/>/, `<meta name="description" content="${fireClassDesc}" />`);
  fireClassHtml = fireClassHtml.replace(/<meta property="og:description" content="[^"]+" \/>/, `<meta property="og:description" content="${fireClassDesc}" />`);
  fireClassHtml = fireClassHtml.replace(/<meta name="twitter:description" content="[^"]+" \/>/, `<meta name="twitter:description" content="${fireClassDesc}" />`);
  fireClassHtml = fireClassHtml.replace(/"@type":"WebPage","@id":"([^"]+)","url":"([^"]+)","name":"[^"]+"/, `"@type":"WebPage","@id":"$1","url":"$2","name":"${fireClassTitle}"`);

  // Enrich fire classes list with commercial system cross-links
  fireClassHtml = fireClassHtml.replace(
    /<li><strong>A sınıfı:<\/strong> Yüzey yangınında yüksek hız ve etkinlik[^<]*<\/li>/i,
    '<li><strong>A Sınıfı (Katı Madde &amp; Kablo):</strong> Yüzey yangınlarında kalıntısız ve hızlı müdahale için <a href="/sistemler/fm200/">FM200</a> ve <a href="/sistemler/novec-1230/">Novec 1230</a> temiz gazlı sistemler uygulanır.</li>'
  );
  fireClassHtml = fireClassHtml.replace(
    /<li><strong>B sınıfı:<\/strong> Alevli sıvı yüzeylerinde oksijen seyrelterek[^<]*<\/li>/i,
    '<li><strong>B Sınıfı (Yanıcı Sıvılar):</strong> Akaryakıt, boya ve solvent risklerinde oksijeni boğan mekanik köpük ve kapalı hacimlerde <a href="/sistemler/co2/">CO₂ gazlı söndürme</a> tercih edilir.</li>'
  );
  fireClassHtml = fireClassHtml.replace(
    /<li><strong>C sınıfı:<\/strong> Gaz beslemesi vanadan kesilmeden[^<]*<\/li>/i,
    '<li><strong>C Sınıfı &amp; Elektrik Panoları:</strong> Elektrik arkı ve pano içi tutuşmalarda doğrudan kaynağa müdahale eden <a href="/sistemler/pano-ici/">pano içi mikro otomatik söndürme sistemleri</a> etkilidir.</li>'
  );
  fireClassHtml = fireClassHtml.replace(
    /<li><strong>F sınıfı:<\/strong> Sabunlaşma reaksiyonu oluşturan[^<]*<\/li>/i,
    '<li><strong>F Sınıfı (Bitkisel &amp; Hayvansal Pişirme Yağları):</strong> Restoran ve endüstriyel mutfaklarda sabunlaşma köpüğü üreten UL 300 onaylı <a href="/sistemler/davlumbaz/">davlumbaz yangın söndürme sistemi</a> yasal zorunluluktur.</li>\n            <li><strong>Transformatör ve Türbin Riskleri:</strong> Basınçsız ve borusuz mimariyle kritik elektrik ve makine odalarında <a href="/sistemler/aerosol/">kondanse aerosol söndürme</a> çözümleri kullanılır.</li>'
  );

  // Add WhatsApp CTA to dark CTA section
  if (!fireClassHtml.includes('fx-btn-whatsapp')) {
    fireClassHtml = fireClassHtml.replace(
      /(<a class="fx-btn-red" href="\/iletisim\/">[\s\S]*?<\/a>)/,
      `$1\n            <a class="fx-btn-whatsapp" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">${WA_SVG}<span>WhatsApp Destek</span></a>`
    );
  }
  fs.writeFileSync(fireClassPath, fireClassHtml, 'utf8');
  console.log(`Updated fire class article: yangin-sondurucu-siniflari-nelerdir/index.html`);

  // 5. elektrik-panosu-otomatik-yangin-sondurme-sistemi/index.html
  const panoArticlePath = path.join(__dirname, '..', 'elektrik-panosu-otomatik-yangin-sondurme-sistemi/index.html');
  let panoArticleHtml = fs.readFileSync(panoArticlePath, 'utf8');
  if (!panoArticleHtml.includes('fx-btn-whatsapp')) {
    panoArticleHtml = panoArticleHtml.replace(
      /(<a class="fx-btn-red" href="\/iletisim\/">[\s\S]*?<\/a>)/,
      `$1\n            <a class="fx-btn-whatsapp" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">${WA_SVG}<span>WhatsApp Destek</span></a>`
    );
    fs.writeFileSync(panoArticlePath, panoArticleHtml, 'utf8');
    console.log(`Updated pano article: elektrik-panosu-otomatik-yangin-sondurme-sistemi/index.html`);
  }
}

console.log('--- STARTING KEYWORD & CTA OPTIMIZATION ---');
updateSystemDetailPages();
updateHubAndArticles();
console.log('--- ALL KEYWORDS & CTAS SUCCESSFULLY OPTIMIZED ---');
