/* FENIX.COM — SAYFA ÜRETECİ
   İçerik veri katmanından statik HTML üretir.
   Gerçek <a href> kaynak HTML'de kalır — JS-only navigasyon YOK.

   Çalıştırma:  node build/generate.js
*/
import { site, navigation } from '../content/site.js';
import { routes, titles, blocked, hubGroups } from '../content/routes.js';
import { pages } from '../content/pages.js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const OUT = new URL('../', import.meta.url).pathname;
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const depth = f => f.split('/').length - 1;
const rel = (f, p) => '../'.repeat(depth(f)) + p;

/* ── ORTAK PARÇALAR ── */
function head(p, f) {
  const abs = site.origin + p.url;
  const og = p.ogImage || site.heroImg;
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}" />
<link rel="canonical" href="${abs}" />
<meta name="robots" content="${p.robots || 'noindex, nofollow'}" />
<meta property="og:type" content="${p.ogType || 'article'}" />
<meta property="og:url" content="${abs}" />
<meta property="og:title" content="${esc(p.title)}" />
<meta property="og:description" content="${esc(p.description)}" />
<meta property="og:image" content="${og}" />
<meta property="og:image:width" content="1920" />
<meta property="og:image:height" content="1062" />
<meta property="og:image:alt" content="FM200 gazlı söndürme silindir bataryası ve dağıtım borulaması" />
<meta property="og:locale" content="tr_TR" />
<meta property="og:site_name" content="${site.name}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(p.title)}" />
<meta name="twitter:description" content="${esc(p.description)}" />
<meta name="twitter:image" content="${og}" />
<link rel="icon" href="${site.logo}" />
<link rel="apple-touch-icon" href="${site.logo}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;800&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="${rel(f,'css/tokens.css')}" />
<link rel="stylesheet" href="${rel(f,'css/base.css')}" />
<link rel="stylesheet" href="${rel(f,'css/layout.css')}" />
<link rel="stylesheet" href="${rel(f,'css/components.css')}" />
${p.home ? `<link rel="stylesheet" href="${rel(f,'css/home.css')}" />` : ''}
<script type="application/ld+json">${JSON.stringify(graph(p))}</script>
</head>
<body>
<a class="fx-skip" href="#icerik">İçeriğe geç</a>`;
}

function graph(p) {
  const org = {
    '@type': 'Organization', '@id': site.origin + '/#organization',
    name: site.name, legalName: site.legalName, foundingDate: site.founded,
    url: site.origin + '/',
    logo: { '@type': 'ImageObject', url: site.logo, width: 1200, height: 223 },
    telephone: site.tel[0], email: site.email,
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    contactPoint: site.tel.map(t => ({ '@type':'ContactPoint', telephone:t, contactType:'customer service', areaServed:'TR', availableLanguage:'Turkish' }))
      .concat([{ '@type':'ContactPoint', telephone: site.whatsapp, contactType:'technical support', areaServed:'TR', availableLanguage:'Turkish' }]),
    address: { '@type':'PostalAddress', streetAddress: site.addr.street, addressLocality: site.addr.city,
               addressRegion: site.addr.region, postalCode: site.addr.zip, addressCountry: site.addr.country }
  };
  const web = { '@type':'WebSite', '@id': site.origin + '/#website', url: site.origin + '/',
                name: site.name, publisher: { '@id': site.origin + '/#organization' }, inLanguage: 'tr-TR' };
  const page = { '@type': p.schemaType || 'WebPage', '@id': site.origin + p.url + '#webpage',
                 url: site.origin + p.url, name: p.title,
                 isPartOf: { '@id': site.origin + '/#website' },
                 about: { '@id': site.origin + '/#organization' }, inLanguage: 'tr-TR' };
  const g = [org, web, page];
  if (p.crumbs && p.crumbs.length) {
    g.push({ '@type':'BreadcrumbList', '@id': site.origin + p.url + '#breadcrumb',
      itemListElement: p.crumbs.map((c, i) => {
        const el = { '@type':'ListItem', position: i + 1, name: c.t };
        if (i !== p.crumbs.length - 1) el.item = site.origin + c.u;
        return el;
      }) });
  }
  return { '@context':'https://schema.org', '@graph': g };
}

function header(f, cur) {
  const links = navigation.map(n =>
    `<a href="${n.u}"${cur === n.u ? ' aria-current="page"' : ''}>${esc(n.t)}</a>`).join('\n      ');
  const drawer = navigation.map(n => `<li><a href="${n.u}">${esc(n.t)}</a></li>`).join('\n        ');
  return `
<header class="fx-header">
  <div class="fx-header__inner">
    <a class="fx-logo" href="/" aria-label="${site.name} ana sayfa">
      <img src="${site.logo}" alt="${site.name}" width="1200" height="223" />
    </a>
    <nav class="fx-nav" aria-label="Ana menü">
      ${links}
    </nav>
    <a class="fx-header__cta" href="/iletisim/">Teklif Al <span aria-hidden="true">→</span></a>
    <button class="fx-burger" type="button" data-burger aria-label="Menüyü aç" aria-expanded="false" aria-controls="fx-drawer"><span></span></button>
  </div>
</header>

<div class="fx-drawer" id="fx-drawer" data-drawer hidden role="dialog" aria-modal="true" aria-label="Mobil menü">
  <div class="fx-drawer__top">
    <a class="fx-logo" href="/"><img src="${site.logo}" alt="${site.name}" width="1200" height="223" /></a>
    <button class="fx-drawer__close" type="button" data-drawer-close aria-label="Menüyü kapat">×</button>
  </div>
  <nav aria-label="Mobil menü bağlantıları">
    <ul class="fx-drawer__list">
        ${drawer}
    </ul>
  </nav>
  <div class="fx-drawer__actions">
    <a href="tel:${site.tel[0]}">Ara</a>
    <a href="https://wa.me/${site.whatsapp.replace('+','')}">WhatsApp</a>
    <a href="/iletisim/" style="background:var(--fx-red);color:#fff">Teklif Al</a>
  </div>
</div>`;
}

function crumbs(list) {
  if (!list || list.length < 2) return '';
  const items = list.map((c, i) => i === list.length - 1
    ? `<li><span class="fx-crumb__sep" aria-hidden="true">/</span><span aria-current="page">${esc(c.t)}</span></li>`
    : i === 0 ? `<li><a href="${c.u}">${esc(c.t)}</a></li>`
    : `<li><span class="fx-crumb__sep" aria-hidden="true">/</span><a href="${c.u}">${esc(c.t)}</a></li>`).join('\n    ');
  return `
<nav class="fx-crumb" aria-label="Breadcrumb">
  <ol>
    ${items}
  </ol>
</nav>`;
}

function footer(f, extra) {
  return `
<aside class="fx-whatsapp-floating" aria-label="Doğrudan İletişim">
  <a href="https://wa.me/905327409097" class="fx-whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp üzerinden 7/24 ulaşın">
    <span class="fx-whatsapp-tooltip" role="tooltip">7/24 Ulaşabilirsiniz</span>
    <span class="fx-whatsapp-icon" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" fill="currentColor"/>
      </svg>
    </span>
  </a>
</aside>
<footer class="fx-footer">
  <span class="fx-footer__texture" aria-hidden="true"></span>
  <div class="fx-footer__inner">
    <div class="fx-footer__brand">
      <img class="fx-footer__logo" src="${site.logo}" alt="${site.name}" width="1200" height="223" />
      <nav aria-label="Alt menü">
        <a href="/sistemler/">Sistemler</a>
        <a href="/hizmetler/">Hizmetler</a>
        <a href="/sektorler/">Sektörler</a>
        <a href="/teknik-icerikler/">Teknik İçerikler</a>
        <a href="/kurumsal/">Kurumsal</a>
        <a href="/iletisim/">İletişim</a>
      </nav>
    </div>
    <p class="fx-footer__legal">© 2026 ${site.name}. Tüm hakları saklıdır. · ${site.legalName}</p>
  </div>
</footer>
${extra || ''}
<script src="${rel(f,'js/main.js')}" defer></script>
<script src="${rel(f,'js/nav.js')}" defer></script>
${'</bo' + 'dy>'}
${'</ht' + 'ml>'}`;
}

/* generate() — content/pages.js'deki bölüm verisini HTML'e çevirir */
export function render(id) { /* bkz. build/render.js */ }
