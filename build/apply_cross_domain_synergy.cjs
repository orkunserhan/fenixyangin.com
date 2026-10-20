const fs = require('fs');
const path = require('path');

console.log('--- APPLYING SYNERGY CROSS-LINKS ON FENIX.COM ---');

// 1. teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/index.html
const calcGuidePath = path.join(__dirname, '..', 'teknik-icerikler/gazli-sondurme-ajan-miktari-hesabi/index.html');
let calcGuideHtml = fs.readFileSync(calcGuidePath, 'utf8');

const toolCallout = `
          <!-- Interaktif Hesaplama Aracına Geçiş -->
          <div class="fx-tool-callout" style="background:#F0FDF4;border:1px solid #BBF7D0;border-left:4px solid #16A34A;border-radius:8px;padding:16px 20px;margin:24px 0;">
            <strong style="color:#166534;font-size:15px;display:block;margin-bottom:6px;">Hızlı Online Gaz Miktarı Simülasyonu:</strong>
            <p style="font-size:13.5px;color:#15803D;line-height:1.55;margin:0 0 8px 0;">Mahalinizin en, boy ve tavan yüksekliği ölçülerini girerek FM200, Novec 1230 ve CO₂ için anında ön gaz kütlesi ve tahmini silindir adedini simüle etmek isterseniz kardeş platformumuzdaki <a href="https://fenixyangin.com.tr/pages/gazli-yangin-sondurme-hesaplama.html" target="_blank" rel="noopener" style="color:#166534;font-weight:700;text-decoration:underline;">İnteraktif Yangın Söndürme Hesaplama Aracını</a> kullanabilirsiniz.</p>
            <span style="font-size:12px;color:#166534;opacity:0.9;">*Resmi ihale ve onaylı hidrolik borulama projeleri VdS / UL lisanslı simülasyon yazılımlarımızla hazırlanmaktadır.</span>
          </div>
`;

if (!calcGuideHtml.includes('gazli-yangin-sondurme-hesaplama.html')) {
  calcGuideHtml = calcGuideHtml.replace(
    '</dl>\n          </div>',
    '</dl>\n          </div>\n' + toolCallout
  );
  calcGuideHtml = calcGuideHtml.replace(
    '</dl>\r\n          </div>',
    '</dl>\r\n          </div>\r\n' + toolCallout
  );
  fs.writeFileSync(calcGuidePath, calcGuideHtml, 'utf8');
  console.log('Added interactive tool callout to gazli-sondurme-ajan-miktari-hesabi');
}

// 2. sistemler/fm200/index.html
const fm200Path = path.join(__dirname, '..', 'sistemler/fm200/index.html');
let fm200Html = fs.readFileSync(fm200Path, 'utf8');

if (!fm200Html.includes('gazli-yangin-sondurme-hesaplama.html')) {
  fm200Html = fm200Html.replace(
    '<span>10 saniyelik homojen boşalma süresi akredite <a href="/hizmetler/muhendislik/">hidrolik hesaplama</a> ile simüle edilir; boşalma sonrası hızlı devreye alma için <a href="/hizmetler/dolum/">FM200 gaz dolumu</a> tesisimiz kesintisiz hizmet verir.</span>',
    '<span>10 saniyelik homojen boşalma süresi akredite <a href="/hizmetler/muhendislik/">hidrolik hesaplama</a> ile simüle edilir. Hızlı ön keşif ölçümü için <a href="https://fenixyangin.com.tr/pages/gazli-yangin-sondurme-hesaplama.html" target="_blank" rel="noopener">interaktif hesaplama aracımızı</a> kullanabilir; dolum ihtiyaçları için <a href="/hizmetler/dolum/">gaz dolumu</a> tesisimizden destek alabilirsiniz.</span>'
  );
  fs.writeFileSync(fm200Path, fm200Html, 'utf8');
  console.log('Added interactive tool link to sistemler/fm200/index.html');
}

// 3. sistemler/novec-1230/index.html
const novecPath = path.join(__dirname, '..', 'sistemler/novec-1230/index.html');
let novecHtml = fs.readFileSync(novecPath, 'utf8');

if (!novecHtml.includes('gazli-yangin-sondurme-hesaplama.html')) {
  novecHtml = novecHtml.replace(
    'Fenix Yangın mühendisleri projenizin mevcut boru çaplarını simüle ederek uygunluğunu raporlar.',
    'Fenix Yangın mühendisleri projenizin mevcut boru çaplarını simüle ederek uygunluğunu raporlar. Ön hacim tahmini için <a href="https://fenixyangin.com.tr/pages/gazli-yangin-sondurme-hesaplama.html" target="_blank" rel="noopener">online yangın söndürme hesaplayıcımızı</a> inceleyebilirsiniz.'
  );
  fs.writeFileSync(novecPath, novecHtml, 'utf8');
  console.log('Added interactive tool link to sistemler/novec-1230/index.html');
}

console.log('--- COMPLETED FENIX.COM UPDATES ---');
