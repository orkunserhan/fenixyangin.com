# -*- coding: utf-8 -*-
import sys, re
sys.stdout.reconfigure(encoding='utf-8')

html_content = '''<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Yangın Algılama Sistemleri: Adresli, Konvansiyonel | Fenix</title>
<meta name="description" content="Yangın algılama ve ihbar sistemi nedir, adresli ile konvansiyonel farkı ne? Dedektör seçimi, VESDA, gazlı söndürme paneli entegrasyonu, EN 54 ve BYKHY." />
<link rel="canonical" href="https://www.fenixyangin.com/sistemler/yangin-algilama/" />
<meta name="robots" content="index, follow" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.fenixyangin.com/sistemler/yangin-algilama/" />
<meta property="og:title" content="Yangın Algılama Sistemleri: Adresli, Konvansiyonel | Fenix" />
<meta property="og:description" content="Yangın algılama ve ihbar sistemi nedir, adresli ile konvansiyonel farkı ne? Dedektör seçimi, VESDA, gazlı söndürme paneli entegrasyonu, EN 54 ve BYKHY." />
<meta property="og:image" content="https://www.fenixyangin.com/assets/img/sistemler/gazli-yangin-sondurme-paneli.webp" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="750" />
<meta property="og:image:alt" content="Yangın Algılama ve Söndürme Kontrol Paneli" />
<meta property="og:locale" content="tr_TR" />
<meta property="og:site_name" content="Fenix Yangın" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Yangın Algılama Sistemleri: Adresli, Konvansiyonel | Fenix" />
<meta name="twitter:description" content="Yangın algılama ve ihbar sistemi nedir, adresli ile konvansiyonel farkı ne? Dedektör seçimi, VESDA, gazlı söndürme paneli entegrasyonu, EN 54 ve BYKHY." />
<meta name="twitter:image" content="https://www.fenixyangin.com/assets/img/sistemler/gazli-yangin-sondurme-paneli.webp" />
<link rel="icon" type="image/png" sizes="32x32" href="../../assets/favicon/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="../../assets/favicon/favicon-16x16.png" />
<link rel="icon" href="../../favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="../../assets/favicon/favicon-192x192.png" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../../css/tokens.css?v=bc9c5d2e" />
<link rel="stylesheet" href="../../css/base.css?v=1a6dfb87" />
<link rel="stylesheet" href="../../css/layout.css?v=8111c226" />
<link rel="stylesheet" href="../../css/components.css?v=705f136b" />
<link rel="stylesheet" href="../../css/system-detail.css?v=63afd07d" />
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://www.fenixyangin.com/#organization","name":"Fenix Yangın","legalName":"Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.","foundingDate":"2011","url":"https://www.fenixyangin.com/","logo":{"@type":"ImageObject","url":"https://www.fenixyangin.com/assets/fenix-logo.png","width":1200,"height":223},"telephone":"+902126180701","email":"info@fenixyangin.com.tr","areaServed":{"@type":"Country","name":"Türkiye"},"contactPoint":[{"@type":"ContactPoint","telephone":"+902126180701","contactType":"customer service","areaServed":"TR","availableLanguage":"Turkish"},{"@type":"ContactPoint","telephone":"+905327409097","contactType":"technical support","areaServed":"TR","availableLanguage":"Turkish"}],"address":{"@type":"PostalAddress","streetAddress":"Yıldırım Mah. Buğday Sok. No:16","addressLocality":"Bayrampaşa","addressRegion":"İstanbul","postalCode":"34405","addressCountry":"TR"},"sameAs":["https://www.youtube.com/channel/UCJOlJcpl9AGOz0U1Rsq9wbA","https://www.linkedin.com/in/fenix-yang%C4%B1n-m%C3%BChendislik-a-%C5%9F-926914b6/","https://www.instagram.com/fenixyangin/","https://www.facebook.com/fenixyangin","https://x.com/fenixyangin","https://www.tiktok.com/@fenixyangin"]},{"@type":"WebSite","@id":"https://www.fenixyangin.com/#website","url":"https://www.fenixyangin.com/","name":"Fenix Yangın","publisher":{"@id":"https://www.fenixyangin.com/#organization"},"inLanguage":"tr-TR"},{"@type":"WebPage","@id":"https://www.fenixyangin.com/sistemler/yangin-algilama/#webpage","url":"https://www.fenixyangin.com/sistemler/yangin-algilama/","name":"Yangın Algılama Sistemleri: Adresli, Konvansiyonel | Fenix","isPartOf":{"@id":"https://www.fenixyangin.com/#website"},"about":{"@id":"https://www.fenixyangin.com/#organization"},"inLanguage":"tr-TR"},{"@type":"BreadcrumbList","@id":"https://www.fenixyangin.com/sistemler/yangin-algilama/#breadcrumb","itemListElement":[{"@type":"ListItem","position":1,"name":"Ana Sayfa","item":"https://www.fenixyangin.com/"},{"@type":"ListItem","position":2,"name":"Sistemler","item":"https://www.fenixyangin.com/sistemler/"},{"@type":"ListItem","position":3,"name":"Yangın Algılama Sistemleri"}]},{"@type":"Service","@id":"https://www.fenixyangin.com/sistemler/yangin-algilama/#service","name":"Yangın Algılama ve İhbar Sistemleri","description":"Adresli, konvansiyonel ve hava örneklemeli yangın algılama sistemleri mühendisliği, dedektör montajı, panel entegrasyonu ve periyodik bakım çözümleri.","provider":{"@id":"https://www.fenixyangin.com/#organization"},"serviceType":"Yangın Algılama ve Alarm Sistemleri","areaServed":{"@type":"Country","name":"Türkiye"}},{"@type":"FAQPage","@id":"https://www.fenixyangin.com/sistemler/yangin-algilama/#faq","mainEntity":[{"@type":"Question","name":"Yangın algılama sistemi zorunlu mu?","acceptedAnswer":{"@type":"Answer","text":"Evet. Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) Madde 75 gereğince tehlike sınıfı yüksek olan tüm binalarda, kullanım alanı 1000 metrekareyi aşan orta tehlike sınıfı yapılarda, otellerde, sağlık kurumlarında ve endüstriyel tesislerde otomatik algılama ve uyarı sistemi tesis edilmesi yasal zorunluluktur."}},{"@type":"Question","name":"Adresli mi konvansiyonel mi seçmeliyim?","acceptedAnswer":{"@type":"Answer","text":"Küçük ölçekli tek hacimli atölye, dükkan veya tek katlı ofislerde ilk yatırım bütçesi öncelikliyse konvansiyonel sistemler tercih edilebilir. Ancak çok katlı yapılar, plazalar, hastaneler, veri merkezleri ve geniş kampüslerde alarmın tam oda ve cihaz bazında anında tespiti için kesinlikle adresli yangın alarm sistemi projelendirilmelidir."}},{"@type":"Question","name":"VESDA (hava örneklemeli algılama) nedir, nerede kullanılır?","acceptedAnswer":{"@type":"Answer","text":"VESDA (Very Early Warning Smoke Detection), mahal havasını sürekli boru tesisatıyla emip lazer analiz hücresinde inceleyen çok erken uyarı sistemidir. Standart dedektörlerin dumanı görmesinden çok önce, yanma öncesi piroliz gazlarını tespit eder. Sunucu odaları, veri merkezleri, temiz odalar ve yüksek tavanlı depolarda hayati önem taşır."}},{"@type":"Question","name":"Gazlı söndürmede neden iki dedektör onayı aranır?","acceptedAnswer":{"@type":"Answer","text":"EN 12094-1 standardına göre tasarlanan gazlı söndürme kontrol panellerinde çapraz zon (cross-zone) prensibi uygulanır. Tek bir dedektörün toz veya nem kaynaklı hatalı alarmında gazın gereksiz boşalmasını engellemek için, aynı mahalde iki bağımsız dedektörün birden alarm vermesi şart koşulur."}},{"@type":"Question","name":"Yangın algılama sistemi ne sıklıkla test edilir?","acceptedAnswer":{"@type":"Answer","text":"CEN/TS 54-14 ve BYKHY standartlarına göre yangın algılama sistemleri günlük gösterge kontrolleri, 3 aylık işletme fonksiyon testleri ve yıllık akredite uzman servis tarafından gerçekleştirilen %100 uç eleman simülasyon testleriyle denetlenmelidir."}},{"@type":"Question","name":"Mevcut alarm panelime gazlı söndürme eklenebilir mi?","acceptedAnswer":{"@type":"Answer","text":"Genel yangın alarm panelleri gaz deşarj butonları, solenoid tetikleme ve gecikme sayaçlarını doğrudan süremez. Gazlı söndürme için EN 12094-1 onaylı özel bir söndürme kontrol paneli kurulmalı ve bu panel bina ana yangın algılama paneline röle modülleriyle entegre edilmelidir."}},{"@type":"Question","name":"Yangın ihbar ile yangın algılama sistemi aynı şey mi?","acceptedAnswer":{"@type":"Answer","text":"Genellikle birlikte anılmakla birlikte farklı işlevleri ifade ederler. Yangın algılama duman, ısı veya alevi tespit eden dedektör grubunu; yangın ihbar ise tespit edilen yangını siren, flaşör ve acil anons cihazlarıyla mahaldekilere duyuran uyarı altyapısını tanımlar."}}]}]}</script>
</head>
<body>
<a class="fx-skip" href="#icerik">İçeriğe geç</a>

<header class="fx-header">
  <div class="fx-header__inner">
    <a class="fx-logo" href="/" aria-label="Fenix Yangın ana sayfa"><img src="../../assets/fenix-logo.png" alt="Fenix Yangın" width="1200" height="223" decoding="async"></a>
    <nav class="fx-nav" aria-label="Ana menü">
      <a href="/sistemler/" aria-current="page">Sistemler</a>
      <div class="fx-nav-item fx-nav-item--dropdown" data-nav-dropdown>
        <a href="/hizmetler/" class="fx-nav-link fx-nav-link--dropdown" aria-haspopup="true" aria-expanded="false">
          <span>Hizmetler</span>
          <svg class="fx-nav-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m1 1 4 4 4-4"/>
          </svg>
        </a>
        <div class="fx-nav-dropdown" role="menu" aria-label="Yangın Söndürme Hizmetleri">
          <div class="fx-nav-dropdown__header">
            <span class="fx-nav-dropdown__eyebrow">YANGIN SÖNDÜRME HİZMETLERİ</span>
          </div>
          <div class="fx-nav-dropdown__list">
            <a href="/hizmetler/muhendislik/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Mühendislik</strong>
              <span class="fx-nav-dropdown__item-desc">Yangın danışmanlığı, hidrolik hesap ve projelendirme</span>
            </a>
            <a href="/hizmetler/kurulum/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Kurulum</strong>
              <span class="fx-nav-dropdown__item-desc">Anahtar teslim sistem kurulumu ve entegrasyon</span>
            </a>
            <a href="/hizmetler/montaj/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Montaj</strong>
              <span class="fx-nav-dropdown__item-desc">Standartlara uygun mekanik ve elektriksel montaj</span>
            </a>
            <a href="/hizmetler/tedarik/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Tedarik</strong>
              <span class="fx-nav-dropdown__item-desc">Onaylı silindir, vana, nozul ve ekipman temini</span>
            </a>
            <a href="/hizmetler/dolum/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Dolum</strong>
              <span class="fx-nav-dropdown__item-desc">FM200 ve Novec 1230 sertifikalı gaz dolumu</span>
            </a>
            <a href="/hizmetler/bakim/" class="fx-nav-dropdown__item" role="menuitem">
              <strong class="fx-nav-dropdown__item-title">Bakım</strong>
              <span class="fx-nav-dropdown__item-desc">TSE-HYB onaylı periyodik bakım ve kontrol</span>
            </a>
          </div>
          <a href="/hizmetler/" class="fx-nav-dropdown__footer" role="menuitem">
            <span>Tüm Hizmetleri İnceleyin</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
      <a href="/sektorler/">Sektörler</a>
      <a href="/projeler/">Projeler</a>
      <a href="/referanslar/">Referanslar</a>
      <a href="/teknik-icerikler/">Teknik İçerikler</a>
      <a href="/kurumsal/">Kurumsal</a>
      <a href="/iletisim/">İletişim</a>
    </nav>
    <a class="fx-header__cta" href="/iletisim/">Teklif Al <span aria-hidden="true">→</span></a>
    <button class="fx-burger" type="button" data-burger aria-label="Menüyü aç" aria-expanded="false" aria-controls="fx-drawer"><span></span></button>
  </div>
</header>

<div class="fx-drawer" id="fx-drawer" data-drawer hidden role="dialog" aria-modal="true" aria-label="Mobil menü">
  <div class="fx-drawer__top">
    <a class="fx-logo" href="/" aria-label="Fenix Yangın ana sayfa"><img src="../../assets/fenix-logo.png" alt="Fenix Yangın" width="1200" height="223" loading="lazy" decoding="async"></a>
    <button class="fx-drawer__close" type="button" data-drawer-close aria-label="Menüyü kapat">×</button>
  </div>
  <nav aria-label="Mobil menü bağlantıları"><ul class="fx-drawer__list">
    <li><a href="/sistemler/">Sistemler</a></li>
      <li class="fx-drawer__group fx-drawer__group--hizmetler">
        <div class="fx-drawer__item-row">
          <a href="/hizmetler/" class="fx-drawer__item">
            <span class="fx-drawer__item-left">
              <svg class="fx-drawer__item-icon" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span class="fx-drawer__item-label">Hizmetler</span>
            </span>
          </a>
          <button type="button" class="fx-drawer__sub-toggle" aria-label="Hizmetler alt menüsünü aç" aria-expanded="false" data-drawer-sub-toggle>
            <svg class="fx-drawer__sub-chevron" viewBox="0 0 24 24" fill="none" stroke="#A90432" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>
        <div class="fx-drawer__sub" data-drawer-sub hidden>
          <div class="fx-drawer__sub-inner">
            <span class="fx-drawer__sub-eyebrow">YANGIN SÖNDÜRME HİZMETLERİ</span>
            <div class="fx-drawer__sub-list">
              <a href="/hizmetler/muhendislik/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Mühendislik</strong>
                <span class="fx-drawer__sub-desc">Yangın danışmanlığı, hidrolik hesap ve projelendirme</span>
              </a>
              <a href="/hizmetler/kurulum/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Kurulum</strong>
                <span class="fx-drawer__sub-desc">Anahtar teslim sistem kurulumu ve entegrasyon</span>
              </a>
              <a href="/hizmetler/montaj/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Montaj</strong>
                <span class="fx-drawer__sub-desc">Standartlara uygun mekanik ve elektriksel montaj</span>
              </a>
              <a href="/hizmetler/tedarik/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Tedarik</strong>
                <span class="fx-drawer__sub-desc">Onaylı silindir, vana, nozul ve ekipman temini</span>
              </a>
              <a href="/hizmetler/dolum/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Dolum</strong>
                <span class="fx-drawer__sub-desc">FM200 ve Novec 1230 sertifikalı gaz dolumu</span>
              </a>
              <a href="/hizmetler/bakim/" class="fx-drawer__sub-link">
                <strong class="fx-drawer__sub-title">Bakım</strong>
                <span class="fx-drawer__sub-desc">TSE-HYB onaylı periyodik bakım ve kontrol</span>
              </a>
            </div>
            <a href="/hizmetler/" class="fx-drawer__sub-footer">
              <span>Tüm Hizmetleri İnceleyin</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </li>
    <li><a href="/sektorler/">Sektörler</a></li>
    <li><a href="/projeler/">Projeler</a></li>
    <li><a href="/referanslar/">Referanslar</a></li>
    <li><a href="/teknik-icerikler/">Teknik İçerikler</a></li>
    <li><a href="/kurumsal/">Kurumsal</a></li>
    <li><a href="/iletisim/">İletişim</a></li>
  </ul></nav>
  <div class="fx-drawer__actions">
    <a href="tel:+902126180701" data-call-trigger>Ara</a>
    <a href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href="/iletisim/" style="background:var(--fx-red);color:#fff">Teklif Al</a>
  </div>
</div>

<nav class="fx-crumb" aria-label="Breadcrumb"><ol>
  <li><a href="/">Ana Sayfa</a></li>
  <li><span class="fx-crumb__sep" aria-hidden="true">/</span><a href="/sistemler/">Sistemler</a></li>
  <li><span class="fx-crumb__sep" aria-hidden="true">/</span><span aria-current="page">Yangın Algılama Sistemleri</span></li>
</ol></nav>

<main id="icerik">
  <article>
    <!-- HERO SECTION -->
    <header class="fx-sys-hero">
      <div class="fx-sys-container">
        <div class="fx-sys-hero__grid">
          <div class="fx-sys-hero__left">
            <span class="fx-sys-hero__eyebrow">YANGIN ALGILAMA VE İHBAR SİSTEMLERİ</span>
            <h1 class="fx-sys-hero__title">Yangın Algılama Sistemleri: <span class="fx-text-red">Adresli, Konvansiyonel ve Hava Örneklemeli</span></h1>
            <p class="fx-sys-hero__desc">Yangın algılama ve ihbar sistemi; ortamdaki duman, ısı, alev veya yanıcı gaz konsantrasyonunu dedektörler aracılığıyla erkenden tespit edip ana kontrol paneline ileten, sesli ve ışıklı uyarı cihazlarını devreye alarak tahliyeyi başlatan ve söndürme sistemlerine aktivasyon komutu gönderen entegre elektronik güvenlik altyapısıdır. Tesis büyüklüğüne göre adresli veya konvansiyonel mimaride projelendirilir.</p>
            <div class="fx-sys-hero__cta-row">
              <a class="fx-sys-btn-primary" href="/iletisim/">
                <span>Keşif &amp; Teklif Al</span>
                <span aria-hidden="true">→</span>
              </a>
              <a class="fx-sys-btn-wa" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/></svg>
                <span>WhatsApp Danışma</span>
              </a>
              <a class="fx-sys-btn-tel" href="tel:+902126180701" data-call-trigger>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>0212 618 07 01</span>
              </a>
            </div>
          </div>
          <div class="fx-sys-hero__right">
            <div class="fx-sys-hero__media-wrap">
              <img class="fx-sys-hero__img" src="../../assets/img/sistemler/gazli-yangin-sondurme-paneli.webp" alt="Yangın Algılama ve Söndürme Kontrol Paneli" width="800" height="500" fetchpriority="high" />
              <div class="fx-sys-hero__badge">
                <p>TS EN 54 &amp; NFPA 72 UYUMLU · ÇAPRAZ ZON ENTEGRASYONU</p>
                <span class="fx-sys-hero__badge-line"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- HIZLI BİLGİLER ŞERİDİ -->
    <section class="fx-sys-highlights" aria-label="Temel Sistem Vurguları">
      <div class="fx-sys-container">
        <div class="fx-sys-highlights__grid">
        <div class="fx-sys-highlight-item">
          <svg class="fx-sys-highlight-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <div class="fx-sys-highlight-text">
            <strong>Milisaniyeler İçinde Algılama</strong>
            <span>Duman ve ısıyı ilk anda yakalar</span>
          </div>
        </div>
        <div class="fx-sys-highlight-item">
          <svg class="fx-sys-highlight-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
          <div class="fx-sys-highlight-text">
            <strong>Noktasal Adres Tespiti</strong>
            <span>Oda ve cihaz bazında kesin konum</span>
          </div>
        </div>
        <div class="fx-sys-highlight-item">
          <svg class="fx-sys-highlight-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <div class="fx-sys-highlight-text">
            <strong>Otomasyon Entegrasyonu</strong>
            <span>Damper, asansör ve gaz kontrolü</span>
          </div>
        </div>
        <div class="fx-sys-highlight-item">
          <svg class="fx-sys-highlight-icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <div class="fx-sys-highlight-text">
            <strong>TS EN 54 &amp; NFPA 72 Onaylı</strong>
            <span>Mevzuata tam uyumlu mühendislik</span>
          </div>
        </div>
        </div>
      </div>
    </section>

    <!-- ANA İÇERİK BÖLÜMÜ -->
    <div class="fx-sys-container">
      <div class="fx-sys-main-grid">
        
        <!-- SOL STICKY SIDEBAR -->
        <aside class="fx-sys-sidebar" aria-label="Sayfa İçi Gezinti">
          <p class="fx-sys-nav__label">BU SAYFADA</p>
          <ul class="fx-sys-nav__list">
            <li><a href="#genel-bakis" class="is-active">Genel Bakış</a></li>
            <li><a href="#nasil-calisir">Nasıl Çalışır?</a></li>
            <li><a href="#adresli-konvansiyonel">Adresli ve Konvansiyonel</a></li>
            <li><a href="#dedektor-turleri">Dedektör Türleri</a></li>
            <li><a href="#gazli-sondurme-entegrasyon">Söndürme Entegrasyonu</a></li>
            <li><a href="#standartlar">Standartlar &amp; Mevzuat</a></li>
            <li><a href="#projelendirme">Kurulum &amp; Devreye Alma</a></li>
            <li><a href="#bakim-test">Bakım ve Test</a></li>
            <li><a href="#fiyat-faktorleri">Maliyet Parametreleri</a></li>
            <li><a href="#kaynaklar">Kaynaklar ve Standartlar</a></li>
            <li><a href="#faq">Sıkça Sorulan Sorular</a></li>
          </ul>

          <div class="fx-sys-brochure-card">
            <svg width="28" height="28" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <strong>Yangın Algılama Keşif &amp; Proje</strong>
            <p>Mevzuat standartlarına uygun dedektör yerleşimi ve panel kapasite hesabı.</p>
            <a class="fx-sys-brochure-link" href="/iletisim/">
              <span>Ücretsiz Keşif Talep Edin</span>
              <span aria-hidden="true">→</span>
            </a>
            <a href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:10px;font-size:12px;color:#CBD5E1;text-decoration:underline;">Mühendisimizle WhatsApp'tan Görüşün →</a>
          </div>
        </aside>

        <!-- SAĞ İÇERİK ALANI -->
        <div class="fx-sys-content">

          <!-- 1. GENEL BAKIŞ -->
          <section class="fx-sys-section" id="genel-bakis">
            <h2 class="fx-sys-sec-title">Yangın Algılama ve İhbar Sistemlerine Genel Bakış</h2>
            <p>Yangın güvenlik mimarisinin ilk savunma hattı olan yangın algılama ve ihbar sistemleri; ortamdaki fiziksel ve kimyasal değişimleri henüz alevlenme safhasına ulaşmadan tespit ederek can ve mal kaybını önleyen elektronik denetim ağlarıdır. Yanma reaksiyonunun başlangıcında ortaya çıkan aerosol partikülleri, duman, ortam sıcaklığındaki ani artış veya alev ışıması farklı algılama prensipleriyle çalışan dedektörler vasıtasıyla ölçülür.</p>
            <p>Modern endüstriyel tesislerde, veri merkezlerinde ve ticari binalarda yangın algılama sistemi sadece bir alarm sireni çalmaktan ibaret değildir. Sistem; duman tahliye damperlerini açan, yangın kapılarını serbest bırakan, asansörleri acil tahliye katına yönlendiren, iklimlendirme santrallerini kapatarak oksijen beslemesini kesen ve kritik hacimlerdeki <a href="/sistemler/fm200/">FM200</a>, <a href="/sistemler/novec-1230/">Novec 1230</a> veya <a href="/sistemler/co2/">CO₂</a> gazlı yangın söndürme sistemlerini tetikleyen merkezi bir bina otomasyon beyni olarak çalışır.</p>
          </section>

          <!-- 2. NASIL ÇALIŞIR? (4 AŞAMALI MÜDAHALE DÖNGÜSÜ) -->
          <section class="fx-sys-section" id="nasil-calisir">
            <h2 class="fx-sys-sec-title">Yangın algılama sistemi nasıl çalışır?</h2>
            <p>Sistem, bir tehlike algılandığı andan itibaren birbirini takip eden ve milisaniyeler düzeyinde denetlenen 4 aşamalı müdahale döngüsünü yürütür:</p>
            
            <div class="fx-sys-cycle">
              <div class="fx-sys-cycle-step">
                <span class="fx-sys-cycle-num">01</span>
                <strong class="fx-sys-cycle-title">Algılama</strong>
                <p class="fx-sys-cycle-desc">Mahaldeki optik duman, sıcaklık artışı, alev ışıması veya hava örnekleme hattından çekilen partiküller dedektör sensörleri tarafından anında algılanır.</p>
              </div>
              <div class="fx-sys-cycle-step">
                <span class="fx-sys-cycle-num">02</span>
                <strong class="fx-sys-cycle-title">Kontrol Paneli Analizi</strong>
                <p class="fx-sys-cycle-desc">Sinyal merkezi yangın alarm paneline ulaşır. Mikroişlemci algoritması sinyali doğrular, çevresel parazitleri eler ve yangın senaryosunu aktif konuma getirir.</p>
              </div>
              <div class="fx-sys-cycle-step">
                <span class="fx-sys-cycle-num">03</span>
                <strong class="fx-sys-cycle-title">Sesli ve Işıklı İhbar</strong>
                <p class="fx-sys-cycle-desc">Flaşörlü sirenler, acil durum yönlendirme armatürleri ve acil anons sistemleri eşzamanlı devreye girerek binadakilerin güvenli tahliyesini başlatır.</p>
              </div>
              <div class="fx-sys-cycle-step">
                <span class="fx-sys-cycle-num">04</span>
                <strong class="fx-sys-cycle-title">Kontrol Çıkışları ve Entegrasyon</strong>
                <p class="fx-sys-cycle-desc">Yangın damperleri kapanır, taze hava fanları durdurulur, manyetik kapı tutucular bırakılır ve gazlı söndürme sistemlerine aktivasyon komutu iletilir.</p>
              </div>
            </div>
          </section>

          <!-- 3. ADRESLİ VE KONVANSİYONEL FARK TABLOSU -->
          <section class="fx-sys-section" id="adresli-konvansiyonel">
            <h2 class="fx-sys-sec-title">Adresli ve konvansiyonel yangın alarm sistemi farkı</h2>
            <p>Yangın algılama projelerinde en temel karar, yapının büyüklüğüne ve risk dağılımına bağlı olarak sistem topolojisinin seçilmesidir. İki teknoloji arasındaki temel mühendislik farkları aşağıda özetlenmiştir:</p>

            <div class="fx-table-wrap">
              <table class="fx-table">
                <thead>
                  <tr>
                    <th>Ölçüt</th>
                    <th>Konvansiyonel Sistem</th>
                    <th>Adresli (Adreslenebilir) Sistem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Algılama Birimi</strong></td>
                    <td>Zon (bölge) bazlı; hatta bağlı tüm cihazlar tek grup görünür</td>
                    <td>Dedektör başına benzersiz tekil elektronik adres</td>
                  </tr>
                  <tr>
                    <td><strong>Arıza ve Alarm Yeri Tespiti</strong></td>
                    <td>Yalnızca bölgenin geneli bilinir, oda tespiti sahada aranır</td>
                    <td>Panel ekranında noktasal mahal adı ve dedektör numarası yazar</td>
                  </tr>
                  <tr>
                    <td><strong>Kablolama Mimarisi</strong></td>
                    <td>Her zon için santralden bağımsız radyal hat kablolaması</td>
                    <td>Kapalı çevrim (loop) mimarisi; tek döngüde 127–250 cihaz</td>
                  </tr>
                  <tr>
                    <td><strong>Genişleme ve Esneklik</strong></td>
                    <td>Sınırlıdır; ilave zon için yeni kart ve hat çekilmesi gerekir</td>
                    <td>Yüksektir; mevcut çevrim hattına modül ve dedektör kolayca eklenir</td>
                  </tr>
                  <tr>
                    <td><strong>Tipik Bina Ölçeği</strong></td>
                    <td>Küçük atölyeler, tek katlı mağaza ve depolar</td>
                    <td>Çok katlı binalar, hastaneler, veri merkezleri ve kampüsler</td>
                  </tr>
                  <tr>
                    <td><strong>İlk Yatırım ve İşletme</strong></td>
                    <td>Ekipman maliyeti daha düşük, işletme ve arıza tespiti zahmetli</td>
                    <td>Ekipman maliyeti daha yüksek, işletme, test ve bakım son derece pratik</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 class="fx-sys-h3" style="margin-top:24px;">Hangisini seçmeli?</h3>
            <p>Tek bir açık alana sahip, oda bölmeleri bulunmayan ve dedektör sayısı 20–30 adedi geçmeyen küçük yapılarda konvansiyonel sistem ekonomik bir çözüm sunabilir. Buna karşılık oteller, çok katlı plazalar, hastaneler, endüstriyel tesisler ve veri merkezlerinde olası bir yangın veya hat arızasının saniyeler içinde tam oda ve koordinat bazında tespit edilebilmesi için kesinlikle <strong>akıllı adresli yangın algılama sistemi</strong> projelendirilmelidir. Adresli sistemler ayrıca kirlilik seviyesini panele bildirerek yanlış alarmları önler ve bakım maliyetlerini düşürür.</p>
          </section>

          <!-- 4. DEDEKTÖR TÜRLERİ VE MAHAL SEÇİMİ -->
          <section class="fx-sys-section" id="dedektor-turleri">
            <h2 class="fx-sys-sec-title">Dedektör türleri ve mahal seçimi</h2>
            <p>Doğru yangın algılama tasarımının esası, korunacak mahaldeki muhtemel yangın yükü ve yanma karakteristiğine en uygun sensör tipinin konumlandırılmasıdır:</p>

            <h3 class="fx-sys-h3">Optik Duman Dedektörü</h3>
            <p>İçerisindeki optik hücrede ışık saçılması prensibiyle çalışır. Ahşap, kağıt, kumaş ve kablo izolasyonu gibi için için yanan ve yoğun duman üreten yangın başlangıçlarını çok erken tespit eder. Ofisler, koridorlar, otel odaları ve elektrik panosu civarında standart algılama elemanıdır.</p>

            <h3 class="fx-sys-h3">Isı Dedektörü (Sabit Sıcaklık ve Sıcaklık Artış Hızı)</h3>
            <p>Sabit sıcaklık tipi ortam derecesi belirlenen eşiğe (genellikle 58°C veya 78°C) ulaştığında; artış hızı (ror - rate of rise) tipi ise sıcaklık dakikada 8–10°C'den hızlı yükseldiğinde alarm verir. Mutfaklar, kazan daireleri, otoparklar ve duman/buhar bulunan mahallerde yanlış alarmı engellemek için tercih edilir.</p>

            <h3 class="fx-sys-h3">Çoklu Sensör (Kombine Optik + Isı)</h3>
            <p>Aynı gövde içerisinde optik duman hücresi ve termal sensörü birleştirir. Mikroişlemci algoritması her iki sensör çıktısını birlikte değerlendirerek hem hızlı alevlenen hem de yavaş gelişen yangınları yüksek doğrulukla yakalar; toz ve buhar kaynaklı asılsız alarmları eler.</p>

            <h3 class="fx-sys-h3">Alev Dedektörü (UV, IR, UV/IR)</h3>
            <p>Yanma sonucu ortaya çıkan ultraviyole (UV) veya kızılötesi (IR) dalga boyundaki elektromanyetik ışıımayı algılar. Duman oluşumu beklenmeksizin anında alev alan hidrokarbon yakıt depoları, boyahaneler, uçak hangarları ve kimyasal proses sahalarında milisaniyeler seviyesinde tetikleme sağlar.</p>

            <h3 class="fx-sys-h3">Işın Tipi (Beam) Duman Dedektörü</h3>
            <p>Bir verici ve yansıtıcı prizma (veya alıcı) arasında kızılötesi ışın demeti oluşturur. Yüksek tavanlı depolarda, atriumlarda, hangarlarda ve fabrikalarda duman katmanlaşması nedeniyle tavan dedektörlerinin geç devreye gireceği geniş hacimlerde 100 metreye varan menziliyle etkili koruma sunar.</p>

            <h3 class="fx-sys-h3">Hava Örneklemeli (VESDA) Dedektör</h3>
            <p>Mahal içerisine döşenen boru tesisatı üzerindeki deliklerden sürekli hava emişi yaparak havayı merkezi bir lazer analiz odasında tarar. Klasik optik dedektörlerin eşik değerinden 100 kat daha hassas çalışarak henüz görünür duman çıkmadan piroliz fazındaki gazları tespit eder. <a href="/sektorler/server-odasi/">Server odası</a>, veri merkezi ve temiz oda uygulamalarının vazgeçilmez standardıdır.</p>

            <h3 class="fx-sys-h3">Gaz Algılama Dedektörleri (Yanıcı ve Toksik Gazlar)</h3>
            <p>Metan, propan (LPG), karbonmonoksit (CO) veya hidrojen ($H_2$) gazlarının havadaki konsantrasyonunu patlama alt limiti (LEL) seviyesine ulaşmadan ölçer. Akü şarj odaları, kazan daireleri ve kapalı otoparklarda havalandırma fanlarını kademeli çalıştırır.</p>

            <h3 class="fx-sys-h3">Kıvılcım Algılama Dedektörü</h3>
            <p>Pnömatik talaş taşıma boruları, tekstil filtre kanalları ve toz toplama hatları içerisinde ışık hızında hareket eden mikroskobik kıvılcımları kızılötesi sensörlerle algılayarak milisaniyeler içinde nozullardan su sisi sıkarak yangını boru hattında söndürür.</p>
          </section>

          <!-- 5. GAZLI SÖNDÜRME SİSTEMLERİYLE ENTEGRASYON -->
          <section class="fx-sys-section" id="gazli-sondurme-entegrasyon">
            <h2 class="fx-sys-sec-title">Gazlı söndürme sistemleriyle entegrasyon</h2>
            <p>Gazlı söndürme sistemlerinde kullanılan temiz gazlar veya karbondioksit, sistem boşaldığında yüksek maliyet ve operasyonel duruş oluşturur. Bu nedenle yangın algılama sistemi ile gazlı söndürme paneli entegrasyonunda uluslararası standartlar sıkı güvenlik mantıkları tanımlamıştır:</p>

            <div class="fx-sys-features">
              <div class="fx-sys-feature">
                <div class="fx-sys-feature-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <div class="fx-sys-feature-body">
                  <strong>Çapraz Zon (Cross-Zoning) Doğrulaması</strong>
                  <p>Gaz deşarj komutunun verilebilmesi için mahalde en az iki bağımsız dedektör zonunun (örneğin A ve B zonları) birden yangın doğrulaması yapması zorunludur. Tek dedektör alarmında sadece 1. kademe ön alarm verilir; gaz boşaltılmaz.</p>
                </div>
              </div>

              <div class="fx-sys-feature">
                <div class="fx-sys-feature-icon">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div class="fx-sys-feature-body">
                  <strong>Ön Alarm ve Geri Sayım Süresi (30 Saniye)</strong>
                  <p>İkinci dedektör de aktive olduğunda panel 2. kademe sesli ve ışıklı uyarıyı başlatır ve 30 saniyelik ayarlanabilir geri sayım sayacını devreye alır. Bu süre, personelin mahali güvenle terk etmesi için tanınan hayati aralıktır.</p>
                </div>
              </div>

              <div class="fx-sys-feature">
                <div class="fx-sys-feature-icon">
                  <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
                </div>
                <div class="fx-sys-feature-body">
                  <strong>Manuel Boşaltma ve İptal Butonları</strong>
                  <p>Mahal kapısı yanında bulunan sarı acil durdurma (abort) butonu basılı tutulduğu sürece geri sayım durur ve gaz boşalması engellenir. Sarı manuel boşaltma butonu ise otomatik algılama beklenmeden anında deşarj komutu üretir.</p>
                </div>
              </div>

              <div class="fx-sys-feature">
                <div class="fx-sys-feature-icon">
                  <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <div class="fx-sys-feature-body">
                  <strong>Damper ve Havalandırma Kilitlemesi</strong>
                  <p>Gaz deşarj edilmeden önce veya deşarj anında havalandırma kanallarındaki motorlu yangın damperleri kapatılır, klima santralleri durdurulur. Böylece gaz konsantrasyonunun mahalde en az 10 dakika muhafaza edilmesi garanti altına alınır.</p>
                </div>
              </div>
            </div>

            <p style="margin-top:20px;">Fenix Yangın mühendislik kadrosu; sektörde yaygın olarak kullanılan C-Tec, Kentec, Mavigard, Teletek ve Global yangın alarm ve söndürme kontrol panellerinin saha montajı, adresleme programlaması, çapraz zon senaryoları ve periyodik teknik servisini üretici standartlarına uygun olarak yürütmektedir. Entegre edilen gazlı söndürme çözümlerimiz için <a href="/sistemler/fm200/">FM200 gazlı söndürme</a>, <a href="/sistemler/novec-1230/">Novec 1230 gazlı söndürme</a> ve <a href="/sistemler/co2/">CO₂ sistemleri</a> sayfalarımızı inceleyebilirsiniz.</p>
          </section>

          <!-- 6. STANDARTLAR VE MEVZUAT -->
          <section class="fx-sys-section" id="standartlar">
            <h2 class="fx-sys-sec-title">Standartlar ve mevzuat uyumu</h2>
            <p>Türkiye'de ve uluslararası projelerde yangın algılama sistemlerinin tasarımı, ürün kalitesi ve montajı kesin kurallara bağlanmıştır. Fenix Yangın mühendislik süreçlerinde şu mevzuat esas alınır:</p>

            <ul class="fx-sys-check-list">
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><strong>TS EN 54 Serisi:</strong> Yangın algılama ve yangın alarm sistemleri donanım standardı (Kontrol panelleri EN 54-2/4, duman dedektörleri EN 54-7, ısı dedektörleri EN 54-5, butonlar EN 54-11, sirenler EN 54-3).</span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><strong>CEN/TS 54-14:</strong> Yangın tespit ve yangın alarm sistemleri – Planlama, tasarım, montaj, işletmeye alma, kullanım ve bakım kılavuzu. Dedektör yerleşim mesafeleri ve tavan yükseklik katsayıları bu standartla hesaplanır.</span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><strong>NFPA 72:</strong> National Fire Alarm and Signaling Code – Uluslararası projelerde kablolama bütünlüğü, sinyal iletim yolları ve acil durum uyarı senaryolarında referans kabul edilen temel standart.</span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><strong>Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY):</strong> Madde 74 (Tasarım ilkeleri), Madde 75 (Algılama ve uyarı sistemlerinin zorunlu olduğu binalar) ve Madde 76 (Buton ve siren yerleşim kriterleri).</span>
              </li>
            </ul>
          </section>

          <!-- 7. PROJELENDİRME, KURULUM VE DEVREYE ALMA -->
          <section class="fx-sys-section" id="projelendirme">
            <h2 class="fx-sys-sec-title">Projelendirme, kurulum ve devreye alma</h2>
            <p>Yangın algılama projesi, mimari ve mekanik projelerle tam koordinasyon halinde yürütülmesi gereken çok disiplinli bir mühendislik çalışmasıdır:</p>

            <div class="fx-sys-steps">
              <div class="fx-sys-step">
                <div class="fx-sys-step-header">
                  <span class="fx-sys-step-num">1</span>
                  <strong class="fx-sys-step-title">Mimari Keşif ve Zon Planlaması</strong>
                </div>
                <p class="fx-sys-step-desc">Mahal kullanım tipleri, tavan geometrisi, asma tavan ve yükseltilmiş döşeme hacimleri yerinde incelenerek <a href="/hizmetler/muhendislik/">yangın mühendisliği</a> kriterlerine göre dedektör konumları belirlenir.</p>
              </div>

              <div class="fx-sys-step">
                <div class="fx-sys-step-header">
                  <span class="fx-sys-step-num">2</span>
                  <strong class="fx-sys-step-title">Kablo Güzergahı ve Tesisat</strong>
                </div>
                <p class="fx-sys-step-desc">Yangına dayanıklı (JE-H(St)H FE180 PH120) halojensiz kablolarla çevrim (loop) hatları çekilir. Kabloların mekanik darbelere ve elektromanyetik parazitlere karşı korumalı kanallardan geçişi sağlanır.</p>
              </div>

              <div class="fx-sys-step">
                <div class="fx-sys-step-header">
                  <span class="fx-sys-step-num">3</span>
                  <strong class="fx-sys-step-title">Uç Eleman Montajı ve Adresleme</strong>
                </div>
                <p class="fx-sys-step-desc">Dedektör soketleri, yangın ihbar butonları, sirenler, giriş/çıkış kontrol modülleri monte edilir. Her bir cihaza benzersiz yazılımsal ve elektriksel adres atanır.</p>
              </div>

              <div class="fx-sys-step">
                <div class="fx-sys-step-header">
                  <span class="fx-sys-step-num">4</span>
                  <strong class="fx-sys-step-title">Yangın Senaryosu ve Devreye Alma Testleri</strong>
                </div>
                <p class="fx-sys-step-desc">Sisteme yangın senaryo matrisi yüklenir. Yapay test dumanı ve aerosol simülatörleri ile tüm dedektörler tek tek test edilir; havalandırma, damper ve kapı kontaklarının tepkileri <a href="/teknik-icerikler/devreye-alma-ve-kabul-testleri/">devreye alma ve kabul testleri</a> kapsamında onaylanır.</p>
              </div>
            </div>
          </section>

          <!-- 8. PERİYODİK BAKIM VE TEST -->
          <section class="fx-sys-section" id="bakim-test">
            <h2 class="fx-sys-sec-title">Periyodik bakım ve test programı</h2>
            <p>Yangın algılama sistemi yıllarca beklemede kalabilen ancak acil bir durumda hatasız çalışması gereken bir güvenlik yatırımıdır. Tozlanmış duman hazneleri, gevşemiş klemens bağlantıları veya ömrünü tamamlamış aküler sistemin felç olmasına yol açabilir.</p>
            <p>BYKHY ve CEN/TS 54-14 standartları gereğince yılda en az iki kez periyodik kontrol yapılması yasal zorunluluktur. Fenix Yangın, TSE-HYB belgeli servis kadrosuyla sistemin panel akü kapasitelerini, loop direnç dengelerini, dedektör kirlilik oranlarını ve siren ses seviyelerini periyodik olarak denetler. Detaylı servis kapsamı için <a href="/hizmetler/bakim/">yangın sistemleri bakım</a> ve <a href="/teknik-icerikler/periyodik-kontrol-programi/">periyodik kontrol programı</a> sayfalarımızı inceleyebilirsiniz.</p>
          </section>

          <!-- 9. FİYATI BELİRLEYEN KALEMLER -->
          <section class="fx-sys-section" id="fiyat-faktorleri">
            <h2 class="fx-sys-sec-title">Yangın algılama sistemi fiyatını belirleyen kalemler</h2>
            <p>Yangın algılama ve alarm sistemi yatırımlarında maliyet sabit bir paket fiyat üzerinden değil, tesisin fiziksel parametreleri ve mühendislik gereksinimlerine göre şekillenen kalemlerin toplamıyla belirlenir:</p>

            <ul class="fx-sys-list">
              <li><strong>Sistem Topolojisi:</strong> Adresli akıllı sistemler ile konvansiyonel sistemler arasında kontrol paneli ve uç birim donanım maliyeti farkı.</li>
              <li><strong>Korunacak Alan ve Çevrim (Loop) Sayısı:</strong> Binanın toplam inşaat alanı, kat adedi, bağımsız bölüm ve yangın kompartımanlarının genişliği.</li>
              <li><strong>Dedektör Çeşitliliği ve Adetleri:</strong> Standart optik duman ve ısı dedektörlerine kıyasla VESDA hava örneklemeli üniteler, alev dedektörleri veya patlamaya dayanıklı (Ex-Proof) dedektör ihtiyaçları.</li>
              <li><strong>Yangına Dayanıklı Kablolama Metrajı:</strong> Standartlara uygun FE180 / PH120 alev iletmez kablo metrajı, tava, boru ve montaj işçiliği.</li>
              <li><strong>Otomasyon ve Entegrasyon Modülleri:</strong> Gazlı söndürme, asansör, duman damperi, turnike ve acil anons sistemleriyle haberleşecek röle ve izleme modülü sayısı.</li>
              <li><strong>Mühendislik, Test ve Onay Süreçleri:</strong> Uygulama projesi çizimi, yangın senaryo matrisi yazılımı, saha fonksiyon testleri ve itfaiye kabul evraklarının hazırlanması.</li>
            </ul>
          </section>

          <!-- 10. KAYNAKLAR VE STANDARTLAR -->
          <section class="fx-sys-section" id="kaynaklar">
            <h2 class="fx-sys-sec-title">Kaynaklar ve Standartlar</h2>
            <p>Bu sayfada yer alan yangın algılama ve ihbar sistemleri teknik bilgileri, tasarım kuralları ve yasal gereklilikler aşağıdaki birincil ve resmî normlara dayanmaktadır:</p>
            <ul class="fx-sys-check-list">
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><a href="https://standards.cencenelec.eu/" target="_blank" rel="noopener">TS EN 54 Serisi — Yangın Algılama ve Yangın Alarm Sistemleri</a></span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><a href="https://standards.cencenelec.eu/" target="_blank" rel="noopener">CEN/TS 54-14 — Yangın Tespit ve Yangın Alarm Sistemleri - Planlama, Tasarım, Montaj, İşletmeye Alma, Kullanım ve Bakım</a></span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><a href="https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=72" target="_blank" rel="noopener">NFPA 72 — National Fire Alarm and Signaling Code</a></span>
              </li>
              <li class="fx-sys-check-item">
                <span class="fx-sys-check-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>
                <span class="fx-sys-check-text"><a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=200712937&MevzuatTur=3&MevzuatTertip=5" target="_blank" rel="noopener">Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY)</a></span>
              </li>
            </ul>
          </section>

          <!-- 11. SIKÇA SORULAN SORULAR -->
          <section class="fx-sys-section" id="faq">
            <h2 class="fx-sys-sec-title">Sıkça Sorulan Sorular</h2>
            <div class="fx-sys-faq-list">
              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Yangın algılama sistemi zorunlu mu?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>Evet. Binaların Yangından Korunması Hakkında Yönetmelik (BYKHY) Madde 75 gereğince tehlike sınıfı yüksek olan tüm binalarda, kullanım alanı 1000 metrekareyi aşan orta tehlike sınıfı yapılarda, otellerde, sağlık kurumlarında ve endüstriyel tesislerde otomatik algılama ve uyarı sistemi tesis edilmesi yasal zorunluluktur.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Adresli mi konvansiyonel mi seçmeliyim?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>Küçük ölçekli tek hacimli atölye, dükkan veya tek katlı ofislerde ilk yatırım bütçesi öncelikliyse konvansiyonel sistemler tercih edilebilir. Ancak çok katlı yapılar, plazalar, hastaneler, veri merkezleri ve geniş kampüslerde alarmın tam oda ve cihaz bazında anında tespiti için kesinlikle adresli yangın alarm sistemi projelendirilmelidir.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>VESDA (hava örneklemeli algılama) nedir, nerede kullanılır?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>VESDA (Very Early Warning Smoke Detection), mahal havasını sürekli boru tesisatıyla emip lazer analiz hücresinde inceleyen çok erken uyarı sistemidir. Standart dedektörlerin dumanı görmesinden çok önce, yanma öncesi piroliz gazlarını tespit eder. Sunucu odaları, veri merkezleri, temiz odalar ve yüksek tavanlı depolarda hayati önem taşır.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Gazlı söndürmede neden iki dedektör onayı aranır?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>EN 12094-1 standardına göre tasarlanan gazlı söndürme kontrol panellerinde çapraz zon (cross-zone) prensibi uygulanır. Tek bir dedektörün toz veya nem kaynaklı hatalı alarmında gazın gereksiz boşalmasını engellemek için, aynı mahalde iki bağımsız dedektörün birden alarm vermesi şart koşulur.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Yangın algılama sistemi ne sıklıkla test edilir?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>CEN/TS 54-14 ve BYKHY standartlarına göre yangın algılama sistemleri günlük gösterge kontrolleri, 3 aylık işletme fonksiyon testleri ve yıllık akredite uzman servis tarafından gerçekleştirilen %100 uç eleman simülasyon testleriyle denetlenmelidir.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Mevcut alarm panelime gazlı söndürme eklenebilir mi?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>Genel yangın alarm panelleri gaz deşarj butonları, solenoid tetikleme ve gecikme sayaçlarını doğrudan süremez. Gazlı söndürme için EN 12094-1 onaylı özel bir söndürme kontrol paneli kurulmalı ve bu panel bina ana yangın algılama paneline röle modülleriyle entegre edilmelidir.</p>
                </div>
              </details>

              <details class="fx-sys-faq-item">
                <summary class="fx-sys-faq-summary">
                  <span class="fx-sys-faq-plus">+</span>
                  <span>Yangın ihbar ile yangın algılama sistemi aynı şey mi?</span>
                </summary>
                <div class="fx-sys-faq-answer">
                  <p>Genellikle birlikte anılmakla birlikte farklı işlevleri ifade ederler. Yangın algılama duman, ısı veya alevi tespit eden dedektör grubunu; yangın ihbar ise tespit edilen yangını siren, flaşör ve acil anons cihazlarıyla mahaldekilere duyuran uyarı altyapısını tanımlar.</p>
                </div>
              </details>
            </div>
            <a class="fx-sys-faq-all-link" href="/iletisim/">
              <span>Daha fazla soru ve teknik danışmanlık için bize ulaşın</span>
              <span aria-hidden="true">→</span>
            </a>
          </section>

          <!-- İLGİLİ SİSTEMLER -->
          <section class="fx-sys-section" id="ilgili-sistemler">
            <h2 class="fx-sys-sec-title">Entegre Yangın Söndürme Çözümleri</h2>
            <div class="fx-sys-rel-grid">
              <a class="fx-sys-rel-card" href="/sistemler/fm200/">
                <img class="fx-sys-rel-thumb" src="../../assets/img/sistemler/thumb-fm200.webp" alt="FM200 Gazlı Yangın Söndürme" width="400" height="250" loading="lazy" />
                <div class="fx-sys-rel-info">
                  <div>
                    <span class="fx-sys-rel-title">FM200 Gazlı Söndürme</span>
                    <span class="fx-sys-rel-sub">Temiz Gazlı Hızlı Koruma</span>
                  </div>
                  <span class="fx-sys-rel-arrow">→</span>
                </div>
              </a>
              <a class="fx-sys-rel-card" href="/sistemler/novec-1230/">
                <img class="fx-sys-rel-thumb" src="../../assets/img/sistemler/thumb-novec.webp" alt="Novec 1230 Söndürme Sistemi" width="400" height="250" loading="lazy" />
                <div class="fx-sys-rel-info">
                  <div>
                    <span class="fx-sys-rel-title">Novec 1230 Söndürme</span>
                    <span class="fx-sys-rel-sub">Sıfır ODP, Çevre Dostu Teknoloji</span>
                  </div>
                  <span class="fx-sys-rel-arrow">→</span>
                </div>
              </a>
              <a class="fx-sys-rel-card" href="/sistemler/co2/">
                <img class="fx-sys-rel-thumb" src="../../assets/img/sistemler/thumb-co2.webp" alt="CO₂ Gazlı Söndürme Sistemi" width="400" height="250" loading="lazy" />
                <div class="fx-sys-rel-info">
                  <div>
                    <span class="fx-sys-rel-title">CO₂ Gazlı Söndürme Sistemi</span>
                    <span class="fx-sys-rel-sub">Endüstriyel &amp; Yüksek Risk Mahalli</span>
                  </div>
                  <span class="fx-sys-rel-arrow">→</span>
                </div>
              </a>
            </div>
          </section>

        </div>
      </div>

      <!-- ALT KOYU BANNER CTA -->
      <aside class="fx-sys-dark-cta" aria-label="Doğrudan Teklif Alın">
        <div class="fx-sys-dark-cta__left">
          <svg class="fx-sys-dark-cta__icon" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          <div>
            <h3 class="fx-sys-dark-cta__title">Tesisiniz İçin En Doğru Yangın Algılama Sistemini Projelendirelim</h3>
            <p class="fx-sys-dark-cta__sub">Kat planlarınızı ve risk tiplerinizi iletin; EN 54 normlarına tam uyumlu dedektör yerleşimi ve keşif özetinizi hazırlayalım.</p>
          </div>
        </div>
        <div class="fx-sys-dark-cta__right">
          <a class="fx-sys-btn-primary" href="/iletisim/">
            <span>Teklif Al</span>
            <span aria-hidden="true">→</span>
          </a>
          <a class="fx-sys-dark-cta__btn-wa" href="https://wa.me/905327409097" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.89 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.952 3.71 1.453 5.711 1.454h.005c6.554 0 11.89-5.336 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/></svg>
            <span>WhatsApp Destek</span>
          </a>
          <a class="fx-sys-dark-cta__btn-tel" href="tel:+902126180701" data-call-trigger>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>0212 618 07 01</span>
          </a>
        </div>
      </aside>

    </div>
  </article>
</main>

<footer class="fx-footer">
  <span class="fx-footer__texture" aria-hidden="true"></span>
  <div class="fx-footer__inner">
    <div class="fx-footer__brand">
      <div class="fx-footer__brand-left">
        <img class="fx-footer__logo" src="../../assets/fenix-logo.png" alt="Fenix Yangın" width="1200" height="223" loading="lazy" decoding="async">
        <span class="fx-footer__tagline-sep" aria-hidden="true"></span>
        <span class="fx-footer__tagline">Daha Güvenli Yapılar İçin Mühendislik Çözümleri</span>
      </div>
      <div class="fx-footer__brand-right">
        <nav aria-label="Alt menü">
        <a href="/sistemler/" aria-current="page">Sistemler</a>
        <a href="/hizmetler/">Hizmetler</a>
        <a href="/sektorler/">Sektörler</a>
        <a href="/projeler/">Projeler</a>
        <a href="/referanslar/">Referanslar</a>
        <a href="/teknik-icerikler/">Teknik İçerikler</a>
        <a href="/kurumsal/">Kurumsal</a>
        <a href="/iletisim/">İletişim</a>
        </nav>
        <div class="fx-footer__social" aria-label="Sosyal medya bağlantıları">
          <a href="https://linkedin.com/company/fenixyangin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
          <a href="https://youtube.com/@fenixyangin" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
          <a href="https://instagram.com/fenixyangin" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
        </div>
      </div>
    </div>
    <div class="fx-footer__bottom">
      <p class="fx-footer__legal">© 2026 Fenix Yangın. Tüm hakları saklıdır. · Fenix Sistem Yangın Mühendislik Sanayi ve Ticaret A.Ş.</p>
      <div class="fx-footer__legal-links">
        <a href="/kvkk/">KVKK</a>
        <a href="/gizlilik-politikasi/">Gizlilik</a>
        <a href="/cerez-politikasi/">Çerez Politikası</a>
        <a href="/kullanim-kosullari/">Kullanım Koşulları</a>
      </div>
    </div>
  </div>
</footer>

<script src="../../js/config.js?v=339e5335" defer></script>
<script src="../../js/main.js?v=4884665f" defer></script>
<script src="../../js/nav.js?v=f31c7b14" defer></script>

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

<script>
(function() {
  var navLinks = document.querySelectorAll('.fx-sys-nav__list a');
  var sections = [];
  navLinks.forEach(function(link) {
    var id = link.getAttribute('href');
    if (id && id.startsWith('#')) {
      var sec = document.querySelector(id);
      if (sec) sections.push({ link: link, sec: sec });
    }
  });
  if (!sections.length) return;
  function updateActive() {
    var scrollPos = window.scrollY + 130;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].sec.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }
    navLinks.forEach(function(l) { l.classList.remove('is-active'); });
    if (current) current.link.classList.add('is-active');
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
</script>
</body>
</html>
'''

target_path = 'C:/Users/orkun/.gemini/antigravity/scratch/FENIX.COM/fenix-com/sistemler/yangin-algilama/index.html'
with open(target_path, 'w', encoding='utf-8') as f:
    f.write(html_content.strip() + '\n')

# Count visible words
text = re.sub(r'<script.*?</script>', ' ', html_content, flags=re.DOTALL)
text = re.sub(r'<style.*?</style>', ' ', text, flags=re.DOTALL)
text = re.sub(r'<header.*?</header>', ' ', text, flags=re.DOTALL)
text = re.sub(r'<footer.*?</footer>', ' ', text, flags=re.DOTALL)
text = re.sub(r'<nav.*?</nav>', ' ', text, flags=re.DOTALL)
text = re.sub(r'<[^>]+>', ' ', text)
words = len(text.split())
print(f'sistemler/yangin-algilama/index.html created successfully. Visible words: {words}')
